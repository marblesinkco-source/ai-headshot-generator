/**
 * Provider registry — returns the adapter for a given provider name.
 * Only Stripe has a real implementation; others are scaffolds.
 */

import type { PaymentProviderAdapter } from '@/types/accounting';
import { StripeAdapter } from './stripe-adapter';

const adapters: Record<string, PaymentProviderAdapter> = {
  stripe: new StripeAdapter(),
};

export function getProviderAdapter(provider: string): PaymentProviderAdapter | null {
  return adapters[provider] || null;
}

export function listProviders(): string[] {
  return Object.keys(adapters);
}

export { StripeAdapter };
