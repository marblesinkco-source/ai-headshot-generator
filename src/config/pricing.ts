import { formatPrice } from '@/lib/utils';

/**
 * Central pricing constants — DISPLAY ONLY.
 *
 * The amount actually charged is defined server-side (Paddle / API routes).
 * Never use these values to compute what a customer is billed.
 */

/**
 * Entry price in the smallest currency unit (cents).
 * Must match the cheapest headshots package in config/categories.ts (TailorPic 1).
 */
export const BASE_PRICE_CENTS = 199;

/** Entry price in major units (1.99). */
export const BASE_PRICE = BASE_PRICE_CENTS / 100;

export const CURRENCY = 'usd';

export { formatPrice };

/** Per-person team pricing in cents, keyed by team-size tier. */
export const TEAM_PRICES = {
  small: { min: 5, max: 15, perPersonCents: 3900 },
  large: { min: 16, max: 50, perPersonCents: 2900 },
  premium: { flat: true, priceCents: 19990, maxMembers: 10 },
} as const;

/** "$1.99" */
export const BASE_PRICE_DISPLAY = formatPrice(BASE_PRICE_CENTS, CURRENCY);

/* ------------------------------------------------------------------ */
/*  Upload requirements — single source of truth for marketing copy   */
/* ------------------------------------------------------------------ */

/**
 * Standard headshot upload requirements.
 * Authoritative min/max lives in categories.ts per category.
 * These constants are for consistent marketing copy across the site.
 */
export const UPLOAD_REQUIREMENTS = {
  /** Main headshot categories (professional, linkedin, etc.) */
  headshots: {
    range: '4–10',
    min: 4,
    max: 10,
    recommendation: '6–10',
    instruction: 'Upload 4–10 clear selfies. We recommend 6–10 for best results.',
    shortLabel: 'Upload 4–10 selfies',
  },
  /** Ultra-realistic / avatar categories */
  ultraRealistic: {
    range: '10–20',
    min: 10,
    max: 20,
    recommendation: '10–15',
    instruction: 'Upload 10–20 clear selfies from different angles. We recommend 10–15 for best results.',
    shortLabel: 'Upload 10–20 selfies',
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Payment provider — Paddle (Merchant of Record)                    */
/* ------------------------------------------------------------------ */

export const PAYMENT_PROVIDER = {
  /** Display name shown in marketing copy */
  name: 'Paddle',
  /** Short checkout badge text */
  checkoutBadge: 'Secure checkout via Paddle',
  /** Longer trust copy */
  trustStatement: 'Payments are processed by Paddle.com Market Ltd, our Merchant of Record. Paddle handles all payment processing, tax compliance, and invoicing. Your card details are never stored on our servers.',
  /** Privacy copy */
  privacyStatement: 'Card details are handled by Paddle, our Merchant of Record, and never stored on our servers.',
  /** URL to provider's security page (for legal references) */
  securityUrl: 'https://www.paddle.com/legal/security',
  /** URL to provider's privacy policy */
  privacyUrl: 'https://www.paddle.com/legal/privacy',
  /** Merchant of Record badge (Paddle-specific) */
  morBadge: 'Paddle is our Merchant of Record',
  /** Tax handling copy */
  taxStatement: 'All applicable taxes (VAT, GST, sales tax) are calculated and collected by Paddle automatically based on your location.',
} as const;
