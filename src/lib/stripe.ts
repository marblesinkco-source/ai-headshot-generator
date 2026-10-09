/**
 * Legacy Stripe client — retained ONLY for historical transaction lookups.
 *
 * All new payments are processed through Paddle (src/lib/paddle.ts).
 * This module is lazily initialized: it does nothing unless STRIPE_SECRET_KEY
 * is present in the environment, which keeps production builds clean once
 * the Stripe account is fully decommissioned.
 *
 * @deprecated Use Paddle for all new payment operations.
 */

let _stripe: import('stripe').default | null = null;

/**
 * Returns the shared Stripe client, or null when STRIPE_SECRET_KEY is unset.
 * Callers must handle the null case — in practice only the StripeAdapter
 * and the legacy webhook route use this.
 */
export function getStripe(): import('stripe').default | null {
  if (_stripe) return _stripe;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;

  // Dynamic require so the stripe package tree-shakes away when unused.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Stripe = require('stripe').default || require('stripe');
  _stripe = new Stripe(key, {
    apiVersion: '2024-12-18.acacia' as import('stripe').default.LatestApiVersion,
  });

  return _stripe;
}

/**
 * @deprecated — kept for backward compatibility with the legacy webhook route.
 * New code should call getStripe() and handle null.
 */
export const stripe = new Proxy({} as import('stripe').default, {
  get(_target, prop) {
    const client = getStripe();
    if (!client) {
      throw new Error(
        'Stripe is not configured (STRIPE_SECRET_KEY missing). ' +
        'All new payments should use Paddle.'
      );
    }
    return (client as Record<string | symbol, unknown>)[prop];
  },
});
