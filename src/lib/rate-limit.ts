/**
 * Rate limiter with Upstash Redis (production) and in-memory fallback (dev).
 *
 * Production: Uses Upstash Redis sliding window for cross-instance rate limiting.
 * Development: Falls back to in-memory Map when UPSTASH env vars are not set.
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// ── Upstash Redis client (lazy, singleton) ──────────────────────────────────

let _redis: Redis | null = null;

function getRedis(): Redis | null {
  if (_redis) return _redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  _redis = new Redis({ url, token });
  return _redis;
}

// ── Ratelimit instances cache ───────────────────────────────────────────────

const limiters = new Map<string, Ratelimit>();

function getLimiter(prefix: string, limit: number, windowMs: number): Ratelimit | null {
  const redis = getRedis();
  if (!redis) return null;

  const cacheKey = `${prefix}:${limit}:${windowMs}`;
  let limiter = limiters.get(cacheKey);
  if (!limiter) {
    const windowSec = Math.max(1, Math.round(windowMs / 1000));
    limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, `${windowSec} s`),
      prefix: `rl:${prefix}`,
      analytics: true,
    });
    limiters.set(cacheKey, limiter);
  }
  return limiter;
}

// ── In-memory fallback ──────────────────────────────────────────────────────

interface MemEntry {
  count: number;
  resetAt: number;
}

const memStore = new Map<string, MemEntry>();

let memCleanup: ReturnType<typeof setInterval> | null = null;

function ensureMemCleanup() {
  if (memCleanup) return;
  memCleanup = setInterval(() => {
    const now = Date.now();
    memStore.forEach((e, k) => { if (e.resetAt <= now) memStore.delete(k); });
  }, 5 * 60 * 1000);
  if (typeof memCleanup === 'object' && 'unref' in memCleanup) {
    memCleanup.unref();
  }
}

function memRateLimit(key: string, limit: number, windowMs: number): { success: boolean; remaining: number } {
  ensureMemCleanup();
  const now = Date.now();
  const entry = memStore.get(key);

  if (!entry || entry.resetAt <= now) {
    memStore.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: Math.max(0, limit - 1) };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0 };
  }

  entry.count += 1;
  return { success: true, remaining: Math.max(0, limit - entry.count) };
}

// ── Public API ──────────────────────────────────────────────────────────────

export async function rateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string;
  limit: number;
  windowMs: number;
}): Promise<{ success: boolean; remaining: number }> {
  const prefix = key.split(':')[0] || 'default';
  const limiter = getLimiter(prefix, limit, windowMs);

  if (limiter) {
    try {
      const result = await limiter.limit(key);
      return { success: result.success, remaining: result.remaining };
    } catch (err) {
      // Redis error — fall back to in-memory so the app doesn't break
      console.error('[rate-limit] Upstash error, falling back to memory:', err);
      return memRateLimit(key, limit, windowMs);
    }
  }

  // No Redis configured — use in-memory
  return memRateLimit(key, limit, windowMs);
}

/** Best-effort client IP from proxy headers. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim() || 'unknown';
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}
