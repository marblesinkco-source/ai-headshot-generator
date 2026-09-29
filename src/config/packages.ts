export const PACKAGES = {
  starter: {
    id: 'starter',
    name: 'Starter',
    price: 2900,
    currency: 'usd',
    headshots: 40,
    backgrounds: 5,
    styles: 3,
    resolution: 'standard',
    features: [],
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    price: 4900,
    currency: 'usd',
    headshots: 80,
    backgrounds: 10,
    styles: 6,
    resolution: 'hd',
    features: ['linkedin_banner'],
    recommended: true,
  },
  executive: {
    id: 'executive',
    name: 'Executive',
    price: 7900,
    currency: 'usd',
    headshots: 120,
    backgrounds: 15,
    styles: 10,
    resolution: '4k',
    features: ['linkedin_banner', 'email_signature', 'priority_support'],
  },
} as const;

export type PackageId = keyof typeof PACKAGES;
export type Package = (typeof PACKAGES)[PackageId];
