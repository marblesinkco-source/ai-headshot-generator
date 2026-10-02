/**
 * Next.js root middleware.
 *
 * Runs on every matched request to:
 * 1. Refresh the Supabase auth session (keeps cookies alive).
 * 2. Protect /dashboard routes -- unauthenticated visitors are
 *    redirected to /auth/login.
 * 3. TEST MODE: When enabled, only whitelisted test users can
 *    access the site. Everyone else sees the /gate page.
 */

import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/* ------------------------------------------------------------------ */
/*  TEST MODE CONFIGURATION                                           */
/*  Set TEST_MODE=true in env to restrict site to test users only.    */
/*  Add allowed emails to TEST_USER_EMAILS (comma-separated).        */
/* ------------------------------------------------------------------ */
const TEST_MODE = process.env.TEST_MODE === "true";

const TEST_USER_EMAILS: string[] = (process.env.TEST_USER_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

/** Routes that bypass the test-mode gate (always accessible). */
const GATE_BYPASS_PREFIXES = [
  "/gate",          // the gate page itself
  "/auth",          // login/register/callback — need to sign in
  "/api",           // API routes & webhooks must always work
  "/_next",         // Next.js internals
  "/favicon",       // favicon
  "/brand",         // brand assets
  "/images",        // category images & static assets
  "/samples",       // sample gallery images
  "/sitemap",       // sitemaps
  "/robots",        // robots.txt
  "/icon",          // app icons
  "/apple-icon",    // apple touch icons
];

/** Routes that require an authenticated user. */
const PROTECTED_PREFIXES = ["/dashboard"];

/** Routes that authenticated users should not see (login, signup, etc.). */
const AUTH_ROUTES = ["/auth/login", "/auth/register", "/auth/forgot-password"];

export async function middleware(request: NextRequest) {
  const { user, response } = await updateSession(request);
  const { pathname } = request.nextUrl;

  /* ---- TEST MODE GATE ---- */
  if (TEST_MODE) {
    const isBypassed = GATE_BYPASS_PREFIXES.some((prefix) =>
      pathname.startsWith(prefix),
    );

    if (!isBypassed) {
      // Not logged in → gate page
      if (!user) {
        const gateUrl = request.nextUrl.clone();
        gateUrl.pathname = "/gate";
        return NextResponse.redirect(gateUrl);
      }

      // Logged in but not a test user → gate page
      const email = user.email?.toLowerCase() || "";
      if (!TEST_USER_EMAILS.includes(email)) {
        const gateUrl = request.nextUrl.clone();
        gateUrl.pathname = "/gate";
        return NextResponse.redirect(gateUrl);
      }

      // Test user → proceed normally
    }
  }

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
