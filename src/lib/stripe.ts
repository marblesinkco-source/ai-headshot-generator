import Stripe from 'stripe';

/**
 * Shared Stripe client — single instance reused across all API routes.
 * Uses the server-only STRIPE_SECRET_KEY env var.
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion,
});
