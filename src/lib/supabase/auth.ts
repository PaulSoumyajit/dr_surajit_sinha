import type { User, SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "./server";

/**
 * Checks whether an authenticated user possesses administrative clearance.
 *
 * CRITICAL SECURITY RULES:
 * - Checks trusted server-controlled `app_metadata.role === 'admin'`.
 * - Cross-checks with optional server-side ADMIN_EMAILS environment allowlist.
 * - STRICTLY REJECTS user-controlled `user_metadata` to prevent privilege escalation.
 */
export function isUserAdmin(user: User | null): boolean {
  if (!user || !user.email) return false;

  // 1. Check trusted app_metadata (set only via Supabase Dashboard or Service Role SQL)
  if (user.app_metadata && user.app_metadata.role === "admin") {
    return true;
  }

  // 2. Check server-side environment allowlist
  const allowlist = process.env.ADMIN_EMAILS;
  if (allowlist) {
    const authorizedEmails = allowlist
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    if (authorizedEmails.includes(user.email.toLowerCase())) {
      return true;
    }
  }

  return false;
}

/**
 * Server-side authorization barrier for Server Actions and Server Components.
 * Validates the current user's session with Supabase Auth servers and asserts admin clearance.
 *
 * Throws an Error if unauthenticated or unauthorized.
 */
export async function requireAdmin(): Promise<{ user: User; supabase: SupabaseClient }> {
  const supabase = await createClient();

  if (!supabase) {
    throw new Error("INFRASTRUCTURE_UNAVAILABLE: Supabase database is not configured.");
  }

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    throw new Error("UNAUTHENTICATED: Active session required.");
  }

  if (!isUserAdmin(data.user)) {
    throw new Error("UNAUTHORIZED: Administrative privileges required.");
  }

  return { user: data.user, supabase };
}

