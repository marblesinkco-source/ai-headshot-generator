// Central visual data registry for TailorPic
// All components should consume images from this file
// Never hard-code image paths in components
//
// Notes
// - Only one real photo per category exists today (/images/categories/{id}.jpg), so every
//   slot of a category points at that file and differs only by object-position. When new
//   art lands, change `src` here and nothing else.
// - Portraits here are AI-generated concepts or stock photos, never testimonial evidence.
// - Keys are CategoryId values from src/config/categories.ts (not URL slugs). Use
//   getCategoryVisualsBySlug() when you only have the route slug.

import { CATEGORIES, type CategoryId } from '@/config/categories';

export interface ImageAsset {
  src: string;
  alt: string;
  desktopObjectPosition: string;
  mobileObjectPosition: string;
}

export interface BeforeAfterPair {
  before: ImageAsset;
  after: ImageAsset;
}

export interface CategoryVisuals {
  megaMenu: ImageAsset; // 1:1, 160-240px square
  quickCard: ImageAsset; // 4:3, real photo thumbnail
  heroDesktop: ImageAsset; // 16:9 or 3:2
  heroMobile: ImageAsset; // 4:5 or 3:4
  gallery: ImageAsset[]; // varies by category
  beforeAfter?: BeforeAfterPair;
}

/* ------------------------------------------------------------------ */
/*  Object-position presets                                            */
/* ------------------------------------------------------------------ */

type Pos = { desktop: string; mobile: string };

const POS = {
  portrait: { desktop: '50% 38%', mobile: '50% 28%' }, // eyes near upper third
  product: { desktop: '50% 50%', mobile: '50% 50%' },
  room: { desktop: '50% 45%', mobile: '50% 45%' }, // architectural center
  card: { desktop: '50% 50%', mobile: '50% 50%' }, // fully visible
  group: { desktop: '50% 40%', mobile: '50% 40%' }, // preserve faces
  pet: { desktop: '50% 35%', mobile: '50% 35%' }, // face focus
} as const satisfies Record<string, Pos>;

const CATEGORY_IMG = '/images/categories';
const BRAND_WEB = '/brand/tailorpic/web';

function asset(src: string, alt: string, pos: Pos): ImageAsset {
  return {
    src,
    alt,
    desktopObjectPosition: pos.desktop,
    mobileObjectPosition: pos.mobile,
  };
}

/** Build a full CategoryVisuals block from one base photo. */
function fromBase(id: CategoryId, alt: string, pos: Pos, galleryAlt?: string[]): CategoryVisuals {
  const src = `${CATEGORY_IMG}/${id}.jpg`;
  const make = () => asset(src, alt, pos);
  return {
    megaMenu: make(),
    quickCard: make(),
    heroDesktop: make(),
    heroMobile: make(),
    gallery: (galleryAlt ?? [alt]).map((a) => asset(src, a, pos)),
  };
}

/* ------------------------------------------------------------------ */
/*  Homepage / brand assets (/brand/tailorpic/web)                     */
/* ------------------------------------------------------------------ */

/** Homepage hero art (hero.tsx currently uses object-[50%_58%]). */
export const homeHero: ImageAsset = asset(
  `${BRAND_WEB}/portrait-woman-editorial.webp`,
  'AI-generated editorial portrait',
  { desktop: '50% 58%', mobile: '50% 40%' },
);

export interface HomeBeforeAfter extends BeforeAfterPair {
  label: string;
  detail: string;
}

/** Homepage before/after pairs (mirrors before-after-showcase.tsx EXAMPLES). */
export const homeBeforeAfterPairs: HomeBeforeAfter[] = [
  {
    label: 'LinkedIn Profile',
    detail: 'Clean, approachable, ready for recruiters',
    before: asset(
      `${BRAND_WEB}/portrait-woman-before.webp`,
      'Casual selfie of a woman before AI processing',
      POS.portrait,
    ),
    after: asset(
      `${BRAND_WEB}/portrait-woman-after.webp`,
      'Polished AI headshot of a woman for a LinkedIn profile',
      POS.portrait,
    ),
  },
  {
    label: 'Corporate Team',
    detail: 'Consistent look across your whole company',
    before: asset(
      `${BRAND_WEB}/portrait-man-before.webp`,
      'Casual selfie of a man before AI processing',
      POS.portrait,
    ),
    after: asset(
      `${BRAND_WEB}/portrait-man-after.webp`,
      'Polished AI headshot of a man for a corporate team page',
      POS.portrait,
    ),
  },
  {
    label: 'Creative Portfolio',
    detail: 'Distinctive style that still feels polished',
    before: asset(
      `${BRAND_WEB}/portrait-woman-creative-before.webp`,
      'Professional woman before AI processing',
      POS.portrait,
    ),
    after: asset(
      `${BRAND_WEB}/portrait-woman-creative-after.webp`,
      'Editorial-style AI portrait of a woman for a creative portfolio',
      POS.portrait,
    ),
  },
];

/** Extra brand portraits usable in galleries (samples page). */
export const brandPortraits = {
  manAfter: asset(`${BRAND_WEB}/portrait-man-after.webp`, 'AI-generated executive portrait of a man', POS.portrait),
  manEditorial: asset(`${BRAND_WEB}/portrait-man-editorial.webp`, 'AI-generated editorial portrait of a man', POS.portrait),
  womanAfter: asset(`${BRAND_WEB}/portrait-woman-after.webp`, 'AI-generated studio portrait of a woman', POS.portrait),
  womanEditorial: homeHero,
} as const;

/** Blog default images (blog.ts coverImage currently uses the SVG placeholder). */
export const blogDefaults = {
  cover: asset('/images/blog/placeholder.svg', 'TailorPic blog article cover', POS.card),
  og: asset(`${BRAND_WEB}/og-tailorpic-1200x630.jpg`, 'TailorPic', POS.card),
} as const;

/* ------------------------------------------------------------------ */
/*  Per-category registry                                              */
/* ------------------------------------------------------------------ */

export const categoryVisuals: Record<string, CategoryVisuals> = {
  headshots: {
    ...fromBase('headshots', 'Professional woman in business attire', POS.portrait),
    gallery: [
      asset(`${CATEGORY_IMG}/headshots.jpg`, 'Professional woman in business attire', POS.portrait),
      brandPortraits.manAfter,
      brandPortraits.womanAfter,
      brandPortraits.womanEditorial,
    ],
    beforeAfter: {
      before: homeBeforeAfterPairs[0].before,
      after: homeBeforeAfterPairs[0].after,
    },
  },

  dating: fromBase('dating', 'Confident woman smiling warmly', POS.portrait),

  'pet-portraits': fromBase('pet-portraits', 'Two golden retriever puppies sitting on grass with orange flowers', POS.pet),

  'linkedin-team': {
    ...fromBase('linkedin-team', 'Corporate team collaborating in modern office', POS.group),
    beforeAfter: {
      before: homeBeforeAfterPairs[1].before,
      after: homeBeforeAfterPairs[1].after,
    },
  },

  'baby-shower': fromBase('baby-shower', 'Mother holding and kissing a baby in a nursery room', POS.portrait),

  graduation: fromBase('graduation', 'Two graduates celebrating on campus steps wearing caps and gowns', POS.group),

  'holiday-cards': fromBase('holiday-cards', 'Family decorating a Christmas tree together under staircase', POS.group),

  'family-portraits': fromBase('family-portraits', 'Happy family portrait together', POS.group),

  'couple-engagement': fromBase('couple-engagement', 'Romantic couple engagement portrait', POS.group),

  'real-estate': fromBase('real-estate', 'Modern living room interior with sofa and wooden staircase', POS.room),

  'ecommerce-product': fromBase('ecommerce-product', 'Luxury chronograph watch on polished wooden surface', POS.product),

  avatars: fromBase('avatars', 'AI avatar style variations of a portrait', POS.portrait),
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

export function getCategoryVisuals(categoryId: string): CategoryVisuals | undefined {
  return categoryVisuals[categoryId];
}

/** Resolve visuals from a route slug (e.g. 'dating-photos' -> dating). */
export function getCategoryVisualsBySlug(slug: string): CategoryVisuals | undefined {
  const cat = Object.values(CATEGORIES).find((c) => c.slug === slug);
  return cat ? categoryVisuals[cat.id] : undefined;
}

/**
 * Returns a single ImageAsset for a slot. Array/pair slots collapse to one image:
 * `gallery` -> first item, `beforeAfter` -> the "after" image.
 */
export function getCategoryImage(
  categoryId: string,
  slot: keyof CategoryVisuals,
): ImageAsset | undefined {
  const visuals = categoryVisuals[categoryId];
  if (!visuals) return undefined;
  switch (slot) {
    case 'gallery':
      return visuals.gallery[0];
    case 'beforeAfter':
      return visuals.beforeAfter?.after;
    default:
      return visuals[slot];
  }
}
