import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { isUserAdmin } from "@/lib/supabase/auth";

/**
 * Validates that an internal return path is safe against open-redirect attacks.
 */
function isSafeInternalPath(path: string): boolean {
  return path.startsWith("/") && !path.startsWith("//") && !path.includes("://");
}

/**
 * Next.js Edge Middleware for Administrative Route Protection (P9-03)
 *
 * Enforces server-side authentication and chamber administration clearance:
 * 1. Synchronizes and refreshes Supabase session tokens on every request.
 * 2. Intercepts all `/admin/*` routes (except `/admin/login`).
 * 3. Enforces valid session + chamber admin privileges (`app_metadata.role === 'admin'`).
 * 4. Redirects unauthorized/unauthenticated visitors to `/admin/login` with safe `returnTo`.
 * 5. Redirects authenticated administrators away from `/admin/login` to `/admin/dashboard`.
 * 6. Adds Cache-Control: private, no-store to protect sensitive chambers data.
 */
export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Refresh session and validate user against Supabase Auth servers
  const { response, user } = await updateSession(request);

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  // Case A: Accessing protected administrative routes (/admin/dashboard, /admin/articles, etc.)
  if (isAdminRoute && !isLoginPage) {
    if (!user) {
      const loginUrl = new URL("/admin/login", request.url);
      const targetPath = `${pathname}${search}`;
      if (isSafeInternalPath(targetPath)) {
        loginUrl.searchParams.set("returnTo", targetPath);
      }
      const redirectResponse = NextResponse.redirect(loginUrl);
      // Preserve refreshed session cookies onto redirect
      response.cookies.getAll().forEach((c) => {
        redirectResponse.cookies.set(c.name, c.value, c);
      });
      return redirectResponse;
    }

    // Verify authorized administrative role (reject normal non-admin authenticated users)
    if (!isUserAdmin(user)) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set(
        "error",
        "Access denied. Your account lacks chambers administrative clearance."
      );
      const redirectResponse = NextResponse.redirect(loginUrl);
      response.cookies.getAll().forEach((c) => {
        redirectResponse.cookies.set(c.name, c.value, c);
      });
      return redirectResponse;
    }

    // Enforce private, non-cacheable responses for authorized admin views
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    return response;
  }

  // Case B: Already authenticated administrator visiting /admin/login
  if (isLoginPage && user && isUserAdmin(user)) {
    const returnTo = request.nextUrl.searchParams.get("returnTo");
    const targetUrl =
      returnTo && isSafeInternalPath(returnTo) ? returnTo : "/admin/dashboard";
    const redirectResponse = NextResponse.redirect(new URL(targetUrl, request.url));
    response.cookies.getAll().forEach((c) => {
      redirectResponse.cookies.set(c.name, c.value, c);
    });
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all admin routes and auth callback
     */
    "/admin/:path*",
    "/auth/callback",
  ],
};

