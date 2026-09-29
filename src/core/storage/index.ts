/**
 * Storage provider factory.
 *
 * Reads the STORAGE_PROVIDER env var to decide which implementation to use.
 * Defaults to "supabase". Add new providers (S3, R2, etc.) here.
 */

import type { StorageProvider } from "./types";
import { SupabaseStorageProvider } from "./providers/supabase";

export type StorageProviderName = "supabase";

/**
 * Create and return the configured storage provider.
 *
 * @param providerName - Override the env-configured provider (useful in tests).
 */
export function getStorageProvider(
  providerName?: StorageProviderName,
): StorageProvider {
  const name =
    providerName ??
    (process.env.STORAGE_PROVIDER as StorageProviderName) ??
    "supabase";

  switch (name) {
    case "supabase":
      return new SupabaseStorageProvider();

    default:
      throw new Error(
        `Unknown storage provider "${name}". Supported: supabase`,
      );
  }
}

// Re-export types for convenience
export type { StorageProvider, UploadOptions, StorageFile } from "./types";
