/**
 * TailorPic — Annual Credit Packages
 *
 * Credits are a cross-category currency:
 *   1 credit = 1 AI-generated photo (any category)
 *
 * Credit packages are annual plans (one-time payment, not recurring subscription).
 * Credits expire 12 months after purchase.
 */

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;          // cents (USD)
  currency: string;
  validityDays: number;   // how long credits are valid
  perCreditPrice: number; // cents, pre-calculated for display
  savings: string;        // display string for savings vs. à la carte
  features: string[];
  recommended?: boolean;
  badge?: string;         // e.g. "Best Value"
}

export const CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: 'credits-starter',
    name: 'Starter Credits',
    credits: 50,
    price: 4900,
    currency: 'usd',
    validityDays: 365,
    perCreditPrice: 98,
    savings: 'Save 20% vs. single packs',
    features: [
      '50 credits — any category',
      'Use across all 11 photo types',
      'Valid for 12 months',
      'HD resolution',
    ],
  },
  {
    id: 'credits-annual',
    name: 'Annual Pass',
    credits: 200,
    price: 14900,
    currency: 'usd',
    validityDays: 365,
    perCreditPrice: 75,
    savings: 'Save 40% vs. single packs',
    recommended: true,
    badge: 'Best Value',
    features: [
      '200 credits — any category',
      'Use across all 11 photo types',
      'Valid for 12 months',
      'HD resolution',
      'Priority generation queue',
      'Early access to new categories',
    ],
  },
  {
    id: 'credits-pro',
    name: 'Pro Studio',
    credits: 500,
    price: 29900,
    currency: 'usd',
    validityDays: 365,
    perCreditPrice: 60,
    savings: 'Save 52% vs. single packs',
    badge: 'For Teams',
    features: [
      '500 credits — any category',
      'Use across all 11 photo types',
      'Valid for 12 months',
      'HD resolution',
      'Priority generation queue',
      'Early access to new categories',
      'Dedicated support',
      'Team sharing (up to 5 users)',
    ],
  },
];

/** Average price per photo across all single packages (~$1.25/photo) */
export const AVERAGE_SINGLE_PRICE_PER_PHOTO = 125; // cents
