import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let clientInstance: SupabaseClient | null = null;

/**
 * Creates or retrieves the singleton browser Supabase client.
 * Strictly constrained to browser-safe operations governed by Row Level Security (RLS).
 *
 * Never uses or exposes the SUPABASE_SERVICE_ROLE_KEY.
 * Gracefully returns null if environment variables are not provisioned.
 */
export function createClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey || url.includes("your-project-id")) {
    return null;
  }

  if (clientInstance) {
    return clientInstance;
  }

  clientInstance = createBrowserClient(url, anonKey);
  return clientInstance;
}

