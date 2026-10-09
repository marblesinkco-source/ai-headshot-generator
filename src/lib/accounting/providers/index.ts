/**
 * Provider registry — returns the adapter for a given provider name.
 *
 * Paddle is the ACTIVE payment provider (Merchant of Record).
 * Stripe adapter is loaded lazily and only when STRIPE_SECRET_KEY is
 * configured — it exists solely for historical transaction lookups.
 */

import type { PaymentProviderAdapter } from '@/types/accounting';
import { PaddleAdapter } from './paddle-adapter';

const adapters: Record<string, PaymentProviderAdapter> = {
  paddle: new PaddleAdapter(),
};

// Lazily register the legacy Stripe adapter only when the key is present.
// This avoids importing the stripe SDK at module scope when it's not needed.
let _stripeRegistered = false;
function ensureStripeAdapter(): void {
  if (_stripeRegistered) return;
  _stripeRegistered = true;

  if (process.env.STRIPE_SECRET_KEY) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { StripeAdapter } = require('./stripe-adapter');
    adapters.stripe = new StripeAdapter();
  }
}

/** The default provider for new transactions */
export const DEFAULT_PROVIDER = 'paddle';

export function getProviderAdapter(provider: string): PaymentProviderAdapter | null {
  if (provider === 'stripe') ensureStripeAdapter();
  return adapters[provider] || null;
}

export function listProviders(): string[] {
  ensureStripeAdapter();
  return Object.keys(adapters);
}

export { PaddleAdapter };
// Re-export StripeAdapter type for historical usage
export type { StripeAdapter } from './stripe-adapter';
