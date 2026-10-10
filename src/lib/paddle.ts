/**
 * Shared Paddle client — lazy singleton reused across all API routes.
 * Uses the server-only PADDLE_API_KEY env var.
 *
 * Paddle acts as Merchant of Record: handles tax, VAT, compliance globally.
 * This is the primary payment module for all new transactions.
 */

import { Paddle, Environment } from '@paddle/paddle-node-sdk';
import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Lazily initialised Paddle SDK client.
 * Avoids module-scope throws when PADDLE_API_KEY is unset during build.
 */
let _paddle: Paddle | null = null;

export function getPaddle(): Paddle {
  if (!_paddle) {
    const apiKey = process.env.PADDLE_API_KEY;
    if (!apiKey) {
      throw new Error('PADDLE_API_KEY environment variable is not set');
    }
    _paddle = new Paddle(apiKey, {
      environment:
        process.env.NEXT_PUBLIC_PADDLE_ENV === 'production'
          ? Environment.production
          : Environment.sandbox,
    });
  }
  return _paddle;
}

/** @deprecated Use getPaddle() instead — kept for backward compatibility */
export const paddle = new Proxy({} as Paddle, {
  get(_target, prop) {
    return (getPaddle() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

/**
 * Verify Paddle webhook signature.
 * Paddle uses `Paddle-Signature` header with format: ts=<timestamp>;h1=<hash>
 *
 * Uses timing-safe comparison and rejects stale timestamps (>30 s).
 */
const MAX_WEBHOOK_AGE_MS = 300_000; // 5 minutes — Paddle recommends tolerating delays up to this

export function verifyPaddleWebhook(
  rawBody: string,
  signature: string | null,
): boolean {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!signature || !secret) return false;

  const parts = Object.fromEntries(
    signature.split(';').map((part) => {
      const [key, ...rest] = part.split('=');
      return [key, rest.join('=')];
    }),
  );

  const ts = parts['ts'];
  const h1 = parts['h1'];
  if (!ts || !h1) return false;

  // Reject stale timestamps (replay protection) and future-dated webhooks
  const tsMs = parseInt(ts, 10) * 1000;
  const webhookAge = Date.now() - tsMs;
  if (isNaN(webhookAge) || webhookAge < 0 || webhookAge > MAX_WEBHOOK_AGE_MS) return false;

  // Build signed payload: ts:rawBody
  const signedPayload = `${ts}:${rawBody}`;

  // HMAC-SHA256 with timing-safe comparison
  const expectedSig = createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');

  try {
    return timingSafeEqual(
      Buffer.from(h1, 'hex'),
      Buffer.from(expectedSig, 'hex'),
    );
  } catch {
    return false;
  }
}

/**
 * Paddle-specific type helpers.
 */
export interface PaddleTransactionCustomData {
  orderId: string;
  packageId: string;
  categoryId: string;
  userId: string;
  orderType?: 'credits' | 'category' | 'legacy';
  creditCount?: string;
  validityDays?: string;
  withdrawalConsentGiven?: string;
  consentTimestamp?: string;
  consentText?: string;
}
