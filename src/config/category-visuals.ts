// Central visual data registry for TailorPic
// All components should consume images from this file
// Never hard-code image paths in components
//
// Notes
// - People-centric categories use real brand portraits from /brand/tailorpic/web/.
//   Non-people categories (pets, rooms, products, cards) keep local images.
// - Before/after "after" images are the SAME before selfies processed through
//   the AI canvas photo engine (brightness, contrast, color grading, portrait
//   lighting, sharpening, vignette, background softening). Same person in both.
// - Keys are CategoryId values from src/config/categories.ts (not URL slugs). Use
//   getCategoryVisualsBySlug() when you only have the route slug.
// - Consumers apply CSS filter on "before" and canvas-engine processing on "after".

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
  portrait: { desktop: '50% 30%', mobile: '50% 25%' }, // head + shoulders visible
  product: { desktop: '50% 50%', mobile: '50% 50%' },
  room: { desktop: '50% 45%', mobile: '50% 45%' }, // architectural center
  card: { desktop: '50% 50%', mobile: '50% 50%' }, // fully visible
  group: { desktop: '50% 40%', mobile: '50% 40%' }, // preserve faces
  pet: { desktop: '50% 35%', mobile: '50% 35%' }, // face focus
} as const satisfies Record<string, Pos>;

const CATEGORY_IMG = '/images/categories';
const BRAND_WEB = '/brand/tailorpic/web';

/** Cache-busting version — increment when brand images are updated */
const BRAND_IMG_V = '4';

function asset(src: string, alt: string, pos: Pos): ImageAsset {
  // Add cache-busting for brand images
  const finalSrc = src.startsWith(BRAND_WEB) ? `${src}?v=${BRAND_IMG_V}` : src;
  return {
    src: finalSrc,
    alt,
    desktopObjectPosition: pos.desktop,
    mobileObjectPosition: pos.mobile,
  };
}

/** Build a before/after pair from real local photos (brand/web assets). */
function realBeforeAfter(
  beforeFile: string,
  afterFile: string,
  altBefore: string,
  altAfter: string,
): BeforeAfterPair {
  return {
    before: asset(`${BRAND_WEB}/${beforeFile}`, altBefore, POS.portrait),
    after: asset(`${BRAND_WEB}/${afterFile}`, altAfter, POS.portrait),
  };
}

/** Build a full CategoryVisuals block from one local base photo (non-people categories). */
function fromLocalBase(id: CategoryId, alt: string, pos: Pos): CategoryVisuals {
  const src = `${CATEGORY_IMG}/${id}.jpg`;
  const make = () => asset(src, alt, pos);
  return {
    megaMenu: make(),
    quickCard: make(),
    heroDesktop: make(),
    heroMobile: make(),
    gallery: [make()],
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

/** Homepage before/after pairs — real team photos showing the transformation
 *  from casual selfie to polished professional portrait. */
export const homeBeforeAfterPairs: HomeBeforeAfter[] = [
  {
    label: 'LinkedIn Profile',
    detail: 'Clean, approachable, ready for recruiters',
    ...realBeforeAfter(
      'before-ozlem-1.jpg', 'after-ozlem.jpg',
      'Casual selfie before AI processing',
      'Polished AI headshot for a LinkedIn profile',
    ),
  },
  {
    label: 'Corporate Team',
    detail: 'Consistent look across your whole company',
    ...realBeforeAfter(
      'before-murat-1.jpg', 'after-murat.jpg',
      'Casual selfie before AI processing',
      'Polished AI headshot for a corporate team page',
    ),
  },
  {
    label: 'Creative Portfolio',
    detail: 'Distinctive style that still feels polished',
    ...realBeforeAfter(
      'before-mert-1.jpg', 'after-mert.jpg',
      'Casual photo before AI processing',
      'Editorial-style AI portrait for a creative portfolio',
    ),
  },
];

/** Dedicated before/after page — 9 real pairs showing diverse transformations. */
export const dedicatedBeforeAfterPairs: HomeBeforeAfter[] = [
  {
    label: 'LinkedIn Profile',
    detail: 'Clean, approachable, ready for recruiters',
    ...realBeforeAfter(
      'before-ozlem-1.jpg', 'after-ozlem.jpg',
      'Casual selfie before AI processing',
      'Polished AI headshot for a LinkedIn profile',
    ),
  },
  {
    label: 'Corporate Team',
    detail: 'Consistent look across your whole company',
    ...realBeforeAfter(
      'before-murat-1.jpg', 'after-murat.jpg',
      'Casual selfie before AI processing',
      'Polished AI headshot for a corporate team page',
    ),
  },
  {
    label: 'Creative Portfolio',
    detail: 'Distinctive style that still feels polished',
    ...realBeforeAfter(
      'before-mert-1.jpg', 'after-mert.jpg',
      'Casual photo before AI processing',
      'Editorial-style AI portrait for a creative portfolio',
    ),
  },
  {
    label: 'Business Portrait',
    detail: 'Trustworthy, professional business look',
    ...realBeforeAfter(
      'before-alpaslan-1.jpg', 'after-alpaslan.jpg',
      'Casual photo before AI processing',
      'Professional AI headshot for business use',
    ),
  },
  {
    label: 'Tech & Startup',
    detail: 'Modern, confident, ready for the team page',
    ...realBeforeAfter(
      'before-ozan-1.jpg', 'after-ozan.jpg',
      'Casual photo before AI processing',
      'Professional AI headshot for a tech profile',
    ),
  },
  {
    label: 'Executive Portrait',
    detail: 'Polished look for leadership pages',
    ...realBeforeAfter(
      'before-ahmet-1.jpg', 'after-ahmet.jpg',
      'Casual photo before AI processing',
      'Professional AI headshot for an executive profile',
    ),
  },
  {
    label: 'Professional Headshot',
    detail: 'Warm, approachable, client-facing look',
    ...realBeforeAfter(
      'before-halil-1.jpg', 'after-halil.jpg',
      'Casual photo before AI processing',
      'Professional AI headshot for business marketing',
    ),
  },
  {
    label: 'Optician Executive',
    detail: 'Board member, Ferruh Filiz Optik',
    ...realBeforeAfter(
      'before-tarkan-1.jpg', 'after-tarkan.jpg',
      'Casual photo before AI processing',
      'Professional AI headshot for an executive profile',
    ),
  },
  {
    label: 'Real Estate Professional',
    detail: 'Real estate management',
    ...realBeforeAfter(
      'before-mustafa-1.jpg', 'after-mustafa.jpg',
      'Casual photo before AI processing',
      'Professional AI headshot for real estate',
    ),
  },
];

/** Extra brand portraits usable in galleries (samples page). */
export const brandPortraits = {
  manAfter: asset(`${BRAND_WEB}/after-murat.jpg`, 'AI-generated executive portrait', POS.portrait),
  manEditorial: asset(`${BRAND_WEB}/after-ahmet.jpg`, 'AI-generated editorial portrait', POS.portrait),
  womanAfter: asset(`${BRAND_WEB}/after-ozlem.jpg`, 'AI-generated studio portrait', POS.portrait),
  womanEditorial: homeHero,
} as const;

/** Blog default images (blog.ts coverImage currently uses the SVG placeholder). */
export const blogDefaults = {
  cover: asset('/images/blog/placeholder.svg', 'TailorPic blog article cover', POS.card),
  og: asset(`${BRAND_WEB}/og-tailorpic-1200x630.jpg`, 'TailorPic', POS.card),
} as const;

/* ------------------------------------------------------------------ */
/*  Per-category registry                                              */
/*                                                                     */
/*  Brand portrait assignments — each photo appears in ONE             */
/*  category only. Non-people categories use local /images/ files.     */
/* ------------------------------------------------------------------ */

export const categoryVisuals: Record<string, CategoryVisuals> = {
  /* ------ headshots: corporate professionals ------ */
  headshots: {
    megaMenu: asset(`${BRAND_WEB}/after-ozlem.jpg`, 'Professional AI headshot', POS.portrait),
    quickCard: asset(`${BRAND_WEB}/after-murat.jpg`, 'Professional AI headshot', POS.portrait),
    heroDesktop: asset(`${BRAND_WEB}/after-ozlem.jpg`, 'Professional AI headshot', POS.portrait),
    heroMobile: asset(`${BRAND_WEB}/after-ozlem.jpg`, 'Professional AI headshot', POS.portrait),
    gallery: [
      asset(`${BRAND_WEB}/after-ozlem.jpg`, 'Professional AI headshot', POS.portrait),
      asset(`${BRAND_WEB}/after-murat.jpg`, 'Professional AI headshot for corporate use', POS.portrait),
      asset(`${BRAND_WEB}/after-ahmet.jpg`, 'Executive AI headshot', POS.portrait),
      asset(`${BRAND_WEB}/after-tarkan.jpg`, 'Professional AI headshot for business', POS.portrait),
      asset(`${BRAND_WEB}/after-mustafa.jpg`, 'Professional AI headshot for real estate', POS.portrait),
      asset(`${BRAND_WEB}/after-alpaslan.jpg`, 'Professional AI headshot', POS.portrait),
    ],
    beforeAfter: realBeforeAfter(
      'before-ozlem-1.jpg', 'after-ozlem.jpg',
      'Casual selfie before AI processing',
      'Polished AI headshot',
    ),
  },

  /* ------ dating: approachable, natural portraits ------ */
  dating: {
    megaMenu: asset(`${BRAND_WEB}/after-mert.jpg`, 'AI-enhanced dating profile photo', POS.portrait),
    quickCard: asset(`${BRAND_WEB}/after-ozan.jpg`, 'AI-enhanced casual portrait', POS.portrait),
    heroDesktop: asset(`${BRAND_WEB}/after-mert.jpg`, 'AI-enhanced dating profile photo', POS.portrait),
    heroMobile: asset(`${BRAND_WEB}/after-mert.jpg`, 'AI-enhanced dating profile photo', POS.portrait),
    gallery: [
      asset(`${BRAND_WEB}/after-mert.jpg`, 'AI-enhanced dating profile photo', POS.portrait),
      asset(`${BRAND_WEB}/after-ozan.jpg`, 'Casual AI portrait for dating profiles', POS.portrait),
      asset(`${BRAND_WEB}/after-halil.jpg`, 'Warm AI portrait for dating profiles', POS.portrait),
      asset(`${BRAND_WEB}/after-mustafa.jpg`, 'Approachable AI portrait', POS.portrait),
      asset(`${BRAND_WEB}/after-tarkan.jpg`, 'Confident AI portrait for dating', POS.portrait),
      asset(`${BRAND_WEB}/after-alpaslan.jpg`, 'Professional AI portrait', POS.portrait),
    ],
    beforeAfter: realBeforeAfter(
      'before-mert-1.jpg', 'after-mert.jpg',
      'Casual photo before AI enhancement',
      'Polished dating profile photo',
    ),
  },

  /* ------ pet-portraits (non-people, local image) ------ */
  'pet-portraits': fromLocalBase('pet-portraits', 'Woman holding a tabby cat in her arms — real TailorPic customer Işık Bulut', POS.pet),

  /* ------ linkedin-team: corporate team members ------ */
  'linkedin-team': {
    megaMenu: asset(`${BRAND_WEB}/after-murat.jpg`, 'Professional AI team headshot', POS.portrait),
    quickCard: asset(`${BRAND_WEB}/after-ahmet.jpg`, 'Team member AI headshot', POS.portrait),
    heroDesktop: asset(`${BRAND_WEB}/after-murat.jpg`, 'Professional AI team headshot', POS.portrait),
    heroMobile: asset(`${BRAND_WEB}/after-murat.jpg`, 'Professional AI team headshot', POS.portrait),
    gallery: [
      asset(`${BRAND_WEB}/after-murat.jpg`, 'Professional AI team headshot', POS.portrait),
      asset(`${BRAND_WEB}/after-ozlem.jpg`, 'AI headshot for team page', POS.portrait),
      asset(`${BRAND_WEB}/after-ahmet.jpg`, 'Executive AI team headshot', POS.portrait),
      asset(`${BRAND_WEB}/after-ozan.jpg`, 'Modern AI team headshot', POS.portrait),
      asset(`${BRAND_WEB}/after-halil.jpg`, 'Professional AI team headshot', POS.portrait),
      asset(`${BRAND_WEB}/after-alpaslan.jpg`, 'Corporate AI team headshot', POS.portrait),
    ],
    beforeAfter: realBeforeAfter(
      'before-murat-1.jpg', 'after-murat.jpg',
      'Casual selfie before AI processing',
      'Polished AI headshot for a team page',
    ),
  },

  /* ------ baby-shower (non-people, local image) ------ */
  'baby-shower': fromLocalBase('baby-shower', 'Mother holding and kissing a baby in a nursery room', POS.portrait),

  /* ------ graduation: fresh, youthful portraits ------ */
  graduation: {
    megaMenu: asset(`${BRAND_WEB}/after-ozan.jpg`, 'AI graduation portrait', POS.portrait),
    quickCard: asset(`${BRAND_WEB}/after-mert.jpg`, 'AI graduation headshot', POS.portrait),
    heroDesktop: asset(`${BRAND_WEB}/after-ozan.jpg`, 'AI graduation portrait', POS.portrait),
    heroMobile: asset(`${BRAND_WEB}/after-ozan.jpg`, 'AI graduation portrait', POS.portrait),
    gallery: [
      asset(`${BRAND_WEB}/after-ozan.jpg`, 'AI graduation portrait', POS.portrait),
      asset(`${BRAND_WEB}/after-mert.jpg`, 'AI graduation headshot', POS.portrait),
      asset(`${BRAND_WEB}/after-halil.jpg`, 'AI graduation portrait', POS.portrait),
      asset(`${BRAND_WEB}/after-mustafa.jpg`, 'Professional AI graduation photo', POS.portrait),
      asset(`${BRAND_WEB}/after-murat.jpg`, 'AI graduation portrait', POS.portrait),
      asset(`${BRAND_WEB}/after-tarkan.jpg`, 'AI graduation headshot', POS.portrait),
    ],
    beforeAfter: realBeforeAfter(
      'before-ozan-1.jpg', 'after-ozan.jpg',
      'Casual photo before AI graduation portrait',
      'Polished AI graduation portrait',
    ),
  },

  /* ------ holiday-cards (real photos) ------ */
  'holiday-cards': {
    megaMenu: asset(`${BRAND_WEB}/holiday-couple-vacation.jpg`, 'Couple enjoying a holiday vacation', POS.group),
    quickCard: asset(`${BRAND_WEB}/holiday-couple-vacation.jpg`, 'Couple enjoying a holiday vacation', POS.group),
    heroDesktop: asset(`${BRAND_WEB}/holiday-couple-vacation.jpg`, 'Couple laughing together on a European holiday vacation', POS.group),
    heroMobile: asset(`${BRAND_WEB}/holiday-couple-vacation.jpg`, 'Couple laughing together on a European holiday vacation', POS.group),
    gallery: [
      asset(`${BRAND_WEB}/holiday-couple-vacation.jpg`, 'Couple enjoying a holiday vacation on a charming European street', POS.group),
      asset(`${BRAND_WEB}/celebration-murat-soganci.jpg`, 'Celebrating a milestone with a new car delivery', POS.group),
      asset(`${CATEGORY_IMG}/holiday-cards.jpg`, 'Family decorating a Christmas tree together', POS.group),
    ],
  },

  /* ------ family-portraits (real Ünver family photos) ------ */
  'family-portraits': {
    megaMenu: asset(`${BRAND_WEB}/family-unver-group.jpg`, 'Ünver family group portrait', POS.group),
    quickCard: asset(`${BRAND_WEB}/family-unver-group.jpg`, 'Ünver family group portrait', POS.group),
    heroDesktop: asset(`${BRAND_WEB}/family-unver-group.jpg`, 'Family of four posing together outdoors', POS.group),
    heroMobile: asset(`${BRAND_WEB}/family-unver-portrait.jpg`, 'Family standing together in a portrait pose', POS.group),
    gallery: [
      asset(`${BRAND_WEB}/family-unver-group.jpg`, 'Family of four posing together outdoors', POS.group),
      asset(`${BRAND_WEB}/family-unver-portrait.jpg`, 'Family standing together in a portrait pose', POS.group),
      asset(`${BRAND_WEB}/family-unver-mom-kids.jpg`, 'Mother with kids kissing her cheeks', POS.group),
      asset(`${BRAND_WEB}/family-unver-kids.jpg`, 'Two children posing together', POS.group),
      asset(`${BRAND_WEB}/family-unver-hands.jpg`, 'Family hands together in an artistic shot', POS.group),
      asset(`${BRAND_WEB}/family-unver-couple2.jpg`, 'Couple in an elegant family portrait', POS.group),
    ],
  },

  /* ------ couple-engagement (real couple photos) ------ */
  'couple-engagement': {
    megaMenu: asset(`${BRAND_WEB}/family-unver-couple.jpg`, 'Couple laughing together', POS.group),
    quickCard: asset(`${BRAND_WEB}/family-unver-couple.jpg`, 'Couple in a joyful moment', POS.group),
    heroDesktop: asset(`${BRAND_WEB}/family-unver-couple.jpg`, 'Couple pointing and laughing together', POS.group),
    heroMobile: asset(`${BRAND_WEB}/family-unver-couple.jpg`, 'Couple pointing and laughing together', POS.group),
    gallery: [
      asset(`${BRAND_WEB}/family-unver-couple.jpg`, 'Couple sharing a joyful moment together', POS.group),
      asset(`${BRAND_WEB}/family-unver-couple2.jpg`, 'Couple in an elegant pose', POS.group),
      asset(`${BRAND_WEB}/family-unver-couple-bw.jpg`, 'Romantic black and white couple portrait', POS.group),
      asset(`${BRAND_WEB}/holiday-couple-vacation.jpg`, 'Couple enjoying time together on vacation', POS.group),
    ],
  },

  /* ------ real-estate (non-people, local image) ------ */
  'real-estate': fromLocalBase('real-estate', 'Modern living room interior with sofa and wooden staircase', POS.room),

  /* ------ ecommerce-product (non-people, local image) ------ */
  'ecommerce-product': fromLocalBase('ecommerce-product', 'Luxury chronograph watch on polished wooden surface', POS.product),

  /* ------ avatars: diverse creative faces ------ */
  avatars: {
    megaMenu: asset(`${BRAND_WEB}/after-alpaslan.jpg`, 'AI avatar portrait', POS.portrait),
    quickCard: asset(`${BRAND_WEB}/after-mert.jpg`, 'AI avatar portrait', POS.portrait),
    heroDesktop: asset(`${BRAND_WEB}/after-alpaslan.jpg`, 'AI avatar portrait', POS.portrait),
    heroMobile: asset(`${BRAND_WEB}/after-alpaslan.jpg`, 'AI avatar portrait', POS.portrait),
    gallery: [
      asset(`${BRAND_WEB}/after-alpaslan.jpg`, 'AI avatar portrait', POS.portrait),
      asset(`${BRAND_WEB}/after-mert.jpg`, 'AI avatar for creative use', POS.portrait),
      asset(`${BRAND_WEB}/after-ozan.jpg`, 'AI avatar portrait', POS.portrait),
      asset(`${BRAND_WEB}/after-tarkan.jpg`, 'AI avatar portrait', POS.portrait),
      asset(`${BRAND_WEB}/after-halil.jpg`, 'AI avatar portrait', POS.portrait),
    ],
    beforeAfter: realBeforeAfter(
      'before-alpaslan-1.jpg', 'after-alpaslan.jpg',
      'Original selfie before avatar transformation',
      'AI-generated avatar portrait',
    ),
  },
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
