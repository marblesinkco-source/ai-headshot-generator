/**
 * Resolve Paddle price IDs from environment variables.
 *
 * Each package's Paddle price ID is stored as an env var:
 *   PADDLE_PRICE_<PACKAGE_ID_UPPER_SNAKE> = pri_...
 *
 * Example: headshots-professional → PADDLE_PRICE_HEADSHOTS_PROFESSIONAL
 *          credits-annual        → PADDLE_PRICE_CREDITS_ANNUAL
 *
 * This keeps secrets out of the codebase while letting operators configure
 * Paddle products without code changes.
 */

function toEnvKey(packageId: string): string {
  return `PADDLE_PRICE_${packageId.toUpperCase().replace(/-/g, '_')}`;
}

/**
 * Returns the Paddle price ID (pri_...) for a given package,
 * reading from the environment variable at runtime.
 */
export function getPaddlePriceId(packageId: string): string | undefined {
  const envVal = process.env[toEnvKey(packageId)];
  return envVal && envVal.trim() !== '' ? envVal.trim() : undefined;
}

/**
 * Returns package IDs that are missing a Paddle price ID env var.
 * Useful for health checks and startup validation.
 */
export function getMissingPaddlePrices(packageIds: string[]): string[] {
  return packageIds.filter((id) => !getPaddlePriceId(id));
}
