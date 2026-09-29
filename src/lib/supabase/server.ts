/**
 * Server-side Supabase client.
 *
 * Creates a client that reads/writes auth tokens from Next.js cookies,
 * enabling seamless auth in Server Components, Route Handlers, and
 * Server Actions.
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

/**
 * Create a Supabase client for server-side use.
 *
 * Must be called inside a Server Component, Route Handler, or Server Action
 * where the cookies() API is available.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // setAll is called from Server Components where cookies
            // are read-only. The middleware will pick up the refresh
            // on the next request instead.
          }
        },
      },
    },
  );
}

/**
 * Create a Supabase admin client using the service role key.
 *
 * Bypasses RLS -- use only in trusted server-side contexts such as
 * webhook handlers or background jobs.
 */
export function createAdminClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // Admin client does not interact with cookies
        },
      },
    },
  );
}
