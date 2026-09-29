/**
 * Email provider factory.
 *
 * Reads the EMAIL_PROVIDER env var to decide which implementation to use.
 * Defaults to "resend". Add new providers (SendGrid, Postmark, etc.) here.
 */

import type { EmailProvider } from "./types";
import { ResendProvider } from "./providers/resend";

export type EmailProviderName = "resend";

/**
 * Create and return the configured email provider.
 *
 * @param providerName - Override the env-configured provider (useful in tests).
 */
export function getEmailProvider(
  providerName?: EmailProviderName,
): EmailProvider {
  const name =
    providerName ??
    (process.env.EMAIL_PROVIDER as EmailProviderName) ??
    "resend";

  switch (name) {
    case "resend":
      return new ResendProvider();

    default:
      throw new Error(
        `Unknown email provider "${name}". Supported: resend`,
      );
  }
}

// Re-export types for convenience
export type { EmailProvider, SendOptions, SendTemplateOptions } from "./types";
