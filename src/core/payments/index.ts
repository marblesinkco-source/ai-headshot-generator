/**
 * Payment provider factory.
 *
 * Reads the PAYMENT_PROVIDER env var to decide which implementation to use.
 * Defaults to "stripe". Add new providers here as they are implemented.
 */

import type { PaymentProvider } from "./types";
import { StripeProvider } from "./providers/stripe";

export type PaymentProviderName = "stripe";

/**
 * Create and return the configured payment provider.
 *
 * @param providerName - Override the env-configured provider (useful in tests).
 */
export function getPaymentProvider(
  providerName?: PaymentProviderName,
): PaymentProvider {
  const name =
    providerName ??
    (process.env.PAYMENT_PROVIDER as PaymentProviderName) ??
    "stripe";

  switch (name) {
    case "stripe":
      return new StripeProvider();

    default:
      throw new Error(
        `Unknown payment provider "${name}". Supported: stripe`,
      );
  }
}

// Re-export types for convenience
export type { PaymentProvider, CheckoutSessionOptions, WebhookEvent } from "./types";
