import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Validates that a redirect path is internal and safe from open redirect vulnerabilities.
 */
function getSafeReturnTo(returnTo: string | null): string {
  if (!returnTo) return "/admin/dashboard";
  // Must start with a single slash, not double slash or external protocol
  if (returnTo.startsWith("/") && !returnTo.startsWith("//") && !returnTo.includes("://")) {
    return returnTo;
  }
  return "/admin/dashboard";
}

/**
 * Supabase Auth Callback Route Handler
 *
 * Processes Magic-Link and OAuth PKCE exchange codes server-side.
 * Sets session cookies and redirects authorized administrators to the target panel.
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const returnTo = getSafeReturnTo(requestUrl.searchParams.get("returnTo"));

  if (code) {
    const supabase = await createClient();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(new URL(returnTo, request.url));
      }
    }
  }

  // If code exchange fails or token is expired, redirect back to login with error parameter
  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("error", "The authentication token has expired or is invalid.");
  return NextResponse.redirect(loginUrl);
}

