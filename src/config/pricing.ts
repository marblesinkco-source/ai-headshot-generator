import { formatPrice } from '@/lib/utils';

/**
 * Central pricing constants — DISPLAY ONLY.
 *
 * The amount actually charged is defined server-side (Stripe / API routes).
 * Never use these values to compute what a customer is billed.
 */

/** Entry price in the smallest currency unit (cents). */
export const BASE_PRICE_CENTS = 990;

/** Entry price in major units (9.9). */
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
