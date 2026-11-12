import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only privileged Supabase client powered by SUPABASE_SERVICE_ROLE_KEY.
 *
 * CRITICAL SECURITY CONSTRAINTS:
 * 1. MUST NEVER be imported into client components.
 * 2. MUST NEVER be exposed to the browser.
 * 3. Used strictly for trusted administrative mutations, server-side atomic rate-limiting,
 *    and secure inquiry ingestion.
 * 4. Gracefully returns null if environment variables are not provisioned.
 */
export function createAdminClient(): SupabaseClient | null {
  if (typeof window !== "undefined") {
    throw new Error(
      "SECURITY VIOLATION: Attempted to initialize Supabase admin client in a client-side environment."
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey || url.includes("your-project-id")) {
    return null;
  }

  return createSupabaseClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

