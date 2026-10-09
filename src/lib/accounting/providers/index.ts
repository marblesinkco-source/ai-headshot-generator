/**
 * Provider registry — returns the adapter for a given provider name.
 * Paddle is the active payment provider (Merchant of Record).
 * Stripe adapter is retained for historical transaction lookups.
 */

import type { PaymentProviderAdapter } from '@/types/accounting';
import { StripeAdapter } from './stripe-adapter';
import { PaddleAdapter } from './paddle-adapter';

const adapters: Record<string, PaymentProviderAdapter> = {
  paddle: new PaddleAdapter(),
  stripe: new StripeAdapter(), // retained for legacy transaction lookups
};

/** The default provider for new transactions */
export const DEFAULT_PROVIDER = 'paddle';

export function getProviderAdapter(provider: string): PaymentProviderAdapter | null {
  return adapters[provider] || null;
}

export function listProviders(): string[] {
  return Object.keys(adapters);
}

export { StripeAdapter, PaddleAdapter };
