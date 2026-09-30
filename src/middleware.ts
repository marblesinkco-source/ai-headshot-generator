/**
 * Next.js root middleware.
 *
 * Runs on every matched request to:
 * 1. Refresh the Supabase auth session (keeps cookies alive).
 * 2. Protect /dashboard routes -- unauthenticated visitors are
 *    redirected to /login.
 */

import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/** Routes that require an authenticated user. */
const PROTECTED_PREFIXES = ["/dashboard"];

/** Routes that authenticated users should not see (login, signup, etc.). */
const AUTH_ROUTES = ["/auth/login", "/auth/register", "/auth/forgot-password", "/auth/reset-password"];

export async function middleware(request: NextRequest) {
  const { user, response } = await updateSession(request);
  const { pathname } = request.nextUrl;

  // Redirect unauthenticated users away from protected routes
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/auth/login";
    // Preserve the intended destination so we can redirect back after login
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages to the dashboard
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isAuthRoute && user) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/dashboard/overview";
    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}

/**
 * Matcher: run middleware on all routes except static assets and
 * internal Next.js paths.
 */
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
