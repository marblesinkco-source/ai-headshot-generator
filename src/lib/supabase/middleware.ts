/**
 * Supabase auth middleware helper.
 *
 * Refreshes the user session on every request so server-side code always
 * has an up-to-date token. Called from the root Next.js middleware.
 */

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refresh the Supabase session and forward updated cookies.
 *
 * Returns a { supabase, response } tuple. The response object carries
 * any Set-Cookie headers that the token refresh produced -- the caller
 * must return this response (or merge its headers) to keep the session
 * alive.
 */
export async function updateSession(request: NextRequest) {
  // Start with a plain "next" response so middleware can modify headers
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Mirror cookies onto the request (for downstream server code)
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          // Rebuild response so Set-Cookie headers are present
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // Trigger the token refresh. getUser() is the recommended way to
  // validate the session server-side (getSession() only reads the JWT
  // without verifying it).
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabase, user, response: supabaseResponse };
}
