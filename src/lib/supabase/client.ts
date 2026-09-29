/**
 * Browser-side Supabase client.
 *
 * Uses @supabase/ssr's createBrowserClient, which stores the session in
 * cookies so that server components and middleware can read it without
 * an extra round-trip.
 */

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

/**
 * Returns a singleton Supabase client for use in client components.
 * Safe to call multiple times -- the underlying SDK deduplicates.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
