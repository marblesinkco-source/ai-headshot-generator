/**
 * AI provider factory.
 *
 * Reads the AI_PROVIDER env var to decide which implementation to use.
 * Defaults to "replicate". Add new providers here as they are implemented.
 */

import type { AIProvider } from "./types";
import { ReplicateProvider } from "./providers/replicate";

export type AIProviderName = "replicate";

/**
 * Create and return the configured AI provider.
 *
 * @param providerName - Override the env-configured provider (useful in tests).
 */
export function getAIProvider(providerName?: AIProviderName): AIProvider {
  const name = providerName ?? (process.env.AI_PROVIDER as AIProviderName) ?? "replicate";

  switch (name) {
    case "replicate":
      return new ReplicateProvider();

    default:
      throw new Error(
        `Unknown AI provider "${name}". Supported: replicate`,
      );
  }
}

// Re-export types for convenience
export type { AIProvider } from "./types";
export { processOrder } from "./pipeline";
