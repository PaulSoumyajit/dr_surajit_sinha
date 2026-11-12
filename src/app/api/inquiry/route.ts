import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { validateInquiryPayload } from "@/lib/validation";
import { createAdminClient } from "@/lib/supabase/admin";

// Maximum allowable request payload size (15 KB)
const MAX_PAYLOAD_BYTES = 15 * 1024;

// Rate-limiting parameters: 5 inquiries per hashed IP per hour (3600 seconds)
const RATE_LIMIT_WINDOW_SECONDS = 3600;
const MAX_INQUIRIES_PER_WINDOW = 5;

// In-process fallback rate limiter cache (used when Supabase is unconfigured)
const inMemoryRateLimitCache = new Map<string, { count: number; resetAt: number }>();

/**
 * Computes a privacy-preserving SHA-256/HMAC hash of the client IP.
 * Guarantees zero raw IP addresses are persisted or logged.
 */
function hashClientIp(ip: string): string {
  const secret =
    process.env.RATE_LIMIT_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "ss_chambers_salt_default_secure_token";
  return crypto.createHmac("sha256", secret).update(ip).digest("hex");
}

/**
 * Extracts client IP from trusted deployment headers.
 */
function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ips = forwardedFor.split(",").map((s) => s.trim());
    if (ips[0]) return ips[0];
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

/**
 * Verifies rate limit for the client IP hash using atomic database RPC when Supabase
 * is provisioned, with safe fallback to in-memory registry when unconfigured.
 */
async function verifyRateLimit(
  adminClient: ReturnType<typeof createAdminClient>,
  ipHash: string
): Promise<{ allowed: boolean; retryAfterSeconds?: number }> {
  // 1. Persistent Atomic Rate-Limiting via Supabase RPC (Stored Procedure)
  if (adminClient) {
    try {
      const { data, error } = await adminClient.rpc("check_and_increment_rate_limit", {
        p_ip_hash: ipHash,
        p_window_seconds: RATE_LIMIT_WINDOW_SECONDS,
        p_max_requests: MAX_INQUIRIES_PER_WINDOW,
      });

      if (!error && data && data.length > 0) {
        const { allowed, retry_after_seconds } = data[0];
        return {
          allowed: !!allowed,
          retryAfterSeconds: retry_after_seconds || RATE_LIMIT_WINDOW_SECONDS,
        };
      }
    } catch {
      // If RPC fails (e.g. table not migrated yet), gracefully proceed to in-memory check
    }
  }

  // 2. In-memory rate limiting fallback
  const now = Date.now();
  const entry = inMemoryRateLimitCache.get(ipHash);

  if (!entry || now > entry.resetAt) {
    inMemoryRateLimitCache.set(ipHash, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_SECONDS * 1000,
    });
    return { allowed: true };
  }

  if (entry.count >= MAX_INQUIRIES_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  entry.count += 1;
  return { allowed: true };
}

/**
 * Consultation Inquiry Ingestion Endpoint (P8-03 & P9-07)
 *
 * Implements secure server-side inquiry intake:
 * 1. Method verification: POST only.
 * 2. Payload size guard: Rejects requests exceeding 15KB.
 * 3. Content-Type check: application/json.
 * 4. Privacy-preserving HMAC-SHA-256 IP hashing (Zero raw IP storage).
 * 5. Atomic persistent rate limiting: 5 inquiries per hashed IP per hour.
 * 6. Server-side validation: Enforces strict data models and non-solicitation acknowledgment.
 * 7. Real Supabase persistence: Ingests directly into `public.contact_inquiries`.
 * 8. Controlled No-Configuration Behaviour: When Supabase is not provisioned,
 *    gracefully returns HTTP 503 rather than fabricating fake success or leaking PII.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Content-Type inspection
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type must be application/json." },
        { status: 415 }
      );
    }

    // 2. Payload size guard
    const contentLength = parseInt(req.headers.get("content-length") || "0", 10);
    if (contentLength > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { error: "Payload exceeds maximum allowed size (15KB)." },
        { status: 413 }
      );
    }

    // 3. Privacy-preserving IP extraction and hashing
    const clientIp = getClientIp(req);
    const ipHash = hashClientIp(clientIp);

    // 4. Initialize privileged server-only database client
    const adminClient = createAdminClient();

    // 5. Persistent Atomic Rate-Limit Enforcement
    const rateCheck = await verifyRateLimit(adminClient, ipHash);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: "Submission rate limit exceeded. Please wait before transmitting additional inquiries.",
          code: "RATE_LIMITED",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.retryAfterSeconds || RATE_LIMIT_WINDOW_SECONDS),
          },
        }
      );
    }

    // 6. Read and parse JSON body
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Malformed JSON payload in request." },
        { status: 400 }
      );
    }

    // 7. Comprehensive Server-Side Validation
    const validation = validateInquiryPayload(rawBody);
    if (!validation.isValid || !validation.data) {
      return NextResponse.json(
        {
          error: "Validation failed. Please correct the indicated errors.",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const { full_name, organization, email, telephone, category, message, disclaimer_accepted } =
      validation.data;

    // 8. Verify Database Configuration & Persistence (Critical No-Configuration Guard)
    if (!adminClient) {
      // Per Section 3.D & P9-07: Never pretend an enquiry was stored; never print raw PII to logs.
      return NextResponse.json(
        {
          success: false,
          error:
            "Consultation inquiry intake is currently undergoing scheduled infrastructure configuration. Please arrange appointments directly with chambers.",
          code: "PERSISTENCE_NOT_CONFIGURED",
        },
        { status: 503 }
      );
    }

    // 9. Persist Inquiry to Supabase contact_inquiries Table
    const { error: insertError } = await adminClient.from("contact_inquiries").insert({
      full_name,
      organization: organization || null,
      email,
      telephone: telephone || null,
      category,
      message,
      disclaimer_accepted,
      ip_hash: ipHash,
      status: "unread",
      created_at: new Date().toISOString(),
    });

    if (insertError) {
      return NextResponse.json(
        {
          success: false,
          error: "An internal database error occurred while recording the inquiry. Please try again later.",
          code: "DATABASE_ERROR",
        },
        { status: 500 }
      );
    }

    // 10. Clean success response (zero stored PII leaked)
    return NextResponse.json(
      {
        success: true,
        message: "Enquiry recorded successfully. Direct matter briefing confirmed.",
      },
      { status: 200 }
    );
  } catch {
    // Top-level unhandled exception: Return generic non-leaking server error
    return NextResponse.json(
      {
        error: "An unexpected server error occurred while processing your request.",
        code: "SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}
