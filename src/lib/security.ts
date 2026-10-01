import { timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';

/** Constant-time string comparison (for secrets / bearer tokens). */
export function safeEqual(a: string | null | undefined, b: string | null | undefined): boolean {
  if (!a || !b) return false;
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/**
 * CSRF defence for cookie-authenticated state-changing routes.
 * Rejects requests whose Origin header (or Sec-Fetch-Site) shows a cross-site
 * source. Requests without an Origin header (non-browser clients) pass; they
 * cannot ride on a victim's cookies.
 */
export function isSameOrigin(request: Request): boolean {
  const fetchSite = request.headers.get('sec-fetch-site');
  if (fetchSite && fetchSite !== 'same-origin' && fetchSite !== 'none' && fetchSite !== 'same-site') {
    return false;
  }
  const origin = request.headers.get('origin');
  if (!origin) return true;
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  try {
    return !!host && new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** Returns a 403 response when the request fails the CSRF check, else null. */
export function csrfGuard(request: Request): NextResponse | null {
  return isSameOrigin(request) ? null : NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

/** Returns a 429 response when the per-key limit is exceeded, else null. */
export function tooManyRequests(): NextResponse {
  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    { status: 429, headers: { 'Retry-After': '60' } },
  );
}
