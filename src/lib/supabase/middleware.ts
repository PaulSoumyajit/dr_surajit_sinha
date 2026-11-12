import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import type { User, SupabaseClient } from "@supabase/supabase-js";

export interface SessionResult {
  response: NextResponse;
  user: User | null;
  supabase: SupabaseClient | null;
}

/**
 * Reusable Supabase session update helper for Next.js Middleware.
 * Refreshes auth tokens and synchronizes session cookies across requests.
 */
export async function updateSession(request: NextRequest): Promise<SessionResult> {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey || url.includes("your-project-id")) {
    return { response, user: null, supabase: null };
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: Avoid using getSession() in server environments as it does not validate with Supabase Auth servers.
  // getUser() validates the auth token against Supabase Auth servers securely.
  let user: User | null = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    user = null;
  }

  return { response, user, supabase };
}

