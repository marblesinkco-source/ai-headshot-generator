import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { customAlphabet } from 'nanoid';

/**
 * Merge Tailwind CSS classes with proper precedence.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a price in the smallest currency unit (e.g. cents) to a display string.
 *
 * @example formatPrice(4900) // "$49.00"
 * @example formatPrice(4900, 'eur') // "EUR 49.00"
 */
export function formatPrice(amount: number, currency = 'usd'): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  });
  return formatter.format(amount / 100);
}

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 12);

/**
 * Generate a unique order ID with an optional prefix.
 *
 * @example generateOrderId() // "ord_a1b2c3d4e5f6"
 */
export function generateOrderId(prefix = 'ord'): string {
  return `${prefix}_${nanoid()}`;
}

/**
 * Return the application base URL, suitable for both server and client usage.
 */
export function getBaseUrl(): string {
  // Browser — use relative path
  if (typeof window !== 'undefined') {
    return '';
  }

  // Vercel / production
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // Vercel preview deployments
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Local development
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

/**
 * Sleep for a given number of milliseconds (useful for polling / retries).
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Clamp a number between a minimum and maximum value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
