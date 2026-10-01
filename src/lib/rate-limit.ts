/**
 * Basic in-memory rate limiter.
 *
 * NOTE: State lives in the memory of a single server instance, so it resets on
 * deploy/restart and is not shared across serverless instances. Production
 * should use a shared store such as Redis/Upstash.
 */

interface Entry {
  count: number;
  resetAt: number;
}

const store = new Map<string, Entry>();
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;

let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function ensureCleanup() {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    store.forEach((entry, key) => {
      if (entry.resetAt <= now) store.delete(key);
    });
  }, CLEANUP_INTERVAL_MS);
  // Don't keep the process alive just for cleanup.
  if (typeof cleanupTimer === 'object' && 'unref' in cleanupTimer) {
    cleanupTimer.unref();
  }
}

export function rateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string;
  limit: number;
  windowMs: number;
}): { success: boolean; remaining: number } {
  ensureCleanup();
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: Math.max(0, limit - 1) };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0 };
  }

  entry.count += 1;
  return { success: true, remaining: Math.max(0, limit - entry.count) };
}

/** Best-effort client IP from proxy headers. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim() || 'unknown';
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}
