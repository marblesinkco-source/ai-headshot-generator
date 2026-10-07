// Central visual data registry for TailorPic
// All components should consume images from this file
// Never hard-code image paths in components
//
// Notes
// - People-centric categories use diverse Unsplash stock portraits from stock-portraits.ts.
//   Non-people categories (pets, rooms, products, cards) keep local images.
// - Portraits here are AI-generated concepts or stock photos, never testimonial evidence.
// - Keys are CategoryId values from src/config/categories.ts (not URL slugs). Use
//   getCategoryVisualsBySlug() when you only have the route slug.
// - Before/after pairs use two distinct portraits: a casual/candid "before" and
//   a polished "after". Consumers also apply CSS `filter: grayscale(1)` on the
//   "before" src for additional visual contrast.

import { CATEGORIES, type CategoryId } from '@/config/categories';
import { portrait, landscape, square } from '@/config/stock-portraits';

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

function asset(src: string, alt: string, pos: Pos): ImageAsset {
  return {
    src,
    alt,
    desktopObjectPosition: pos.desktop,
    mobileObjectPosition: pos.mobile,
  };
}

/** Build a portrait asset from an Unsplash photo ID (3:4 crop). */
function portraitAsset(photoId: string, alt: string): ImageAsset {
  return asset(portrait(photoId), alt, POS.portrait);
}

/** Build a square asset from an Unsplash photo ID (1:1 crop). */
function squareAsset(photoId: string, alt: string): ImageAsset {
  return asset(square(photoId), alt, POS.portrait);
}

/** Build a landscape asset from an Unsplash photo ID (4:3 crop). */
function landscapeAsset(photoId: string, alt: string): ImageAsset {
  return asset(landscape(photoId), alt, POS.portrait);
}

/**
 * Build a before/after pair from TWO distinct Unsplash portraits.
 * The "before" photo is a more casual/candid shot; the "after" is the
 * polished professional result. Consumers apply CSS `filter: grayscale(1)`
 * on the "before" src for additional visual contrast.
 */
function stockBeforeAfter(
  beforePhotoId: string,
  afterPhotoId: string,
  altBefore: string,
  altAfter: string,
): BeforeAfterPair {
  return {
    before: portraitAsset(beforePhotoId, altBefore),
    after: portraitAsset(afterPhotoId, altAfter),
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

/** Homepage before/after pairs — each pair uses two distinct Unsplash portraits:
 *  a casual/candid "before" and a polished professional "after".
 *  Consumers also apply CSS `filter: grayscale(1)` on the "before" image. */
export const homeBeforeAfterPairs: HomeBeforeAfter[] = [
  {
    label: 'LinkedIn Profile',
    detail: 'Clean, approachable, ready for recruiters',
    ...stockBeforeAfter(
      'photo-1529626455594-4ff0802cfb7e',       // casual outdoor snap
      'photo-1580489944761-15a19d654956',        // polished studio result
      'Casual selfie before AI processing',
      'Polished AI headshot for a LinkedIn profile',
    ),
  },
  {
    label: 'Corporate Team',
    detail: 'Consistent look across your whole company',
    ...stockBeforeAfter(
      'photo-1496345875659-11f7dd282d1d',        // casual warm-light snap
      'photo-1507003211169-0a1dd7228f2d',        // polished corporate result
      'Casual selfie before AI processing',
      'Polished AI headshot for a corporate team page',
    ),
  },
  {
    label: 'Creative Portfolio',
    detail: 'Distinctive style that still feels polished',
    ...stockBeforeAfter(
      'photo-1506863530036-1efeddceb993',        // casual golden-hour snap
      'photo-1531746020798-e6953c6e8e04',        // editorial-style result
      'Casual photo before AI processing',
      'Editorial-style AI portrait for a creative portfolio',
    ),
  },
];

/** Dedicated before/after page — 6 pairs for more diversity.
 *  Each pair uses two distinct photos: casual before, polished after. */
export const dedicatedBeforeAfterPairs: HomeBeforeAfter[] = [
  {
    label: 'LinkedIn Profile',
    detail: 'Clean, approachable, ready for recruiters',
    ...stockBeforeAfter(
      'photo-1529626455594-4ff0802cfb7e',        // casual outdoor snap
      'photo-1580489944761-15a19d654956',         // polished studio result
      'Casual selfie before AI processing',
      'Polished AI headshot for a LinkedIn profile',
    ),
  },
  {
    label: 'Corporate Team',
    detail: 'Consistent look across your whole company',
    ...stockBeforeAfter(
      'photo-1496345875659-11f7dd282d1d',         // casual warm-light snap
      'photo-1507003211169-0a1dd7228f2d',         // polished corporate result
      'Casual selfie before AI processing',
      'Polished AI headshot for a corporate team page',
    ),
  },
  {
    label: 'Creative Portfolio',
    detail: 'Distinctive style that still feels polished',
    ...stockBeforeAfter(
      'photo-1506863530036-1efeddceb993',         // casual golden-hour snap
      'photo-1531746020798-e6953c6e8e04',         // editorial-style result
      'Casual photo before AI processing',
      'Editorial-style AI portrait for a creative portfolio',
    ),
  },
  {
    label: 'Medical Professional',
    detail: 'Trustworthy, approachable healthcare look',
    ...stockBeforeAfter(
      'photo-1612349317150-e413f6a5b16d',         // casual healthcare snap
      'photo-1559839734-2b71ea197ec2',            // polished medical portrait
      'Casual photo before AI processing',
      'Professional AI headshot for a medical profile',
    ),
  },
  {
    label: 'Tech & Startup',
    detail: 'Modern, confident, Silicon Valley ready',
    ...stockBeforeAfter(
      'photo-1552374196-c4e7ffc6e126',            // relaxed casual pose
      'photo-1506794778202-cad84cf45f1d',         // polished tech headshot
      'Casual photo before AI processing',
      'Professional AI headshot for a tech profile',
    ),
  },
  {
    label: 'Real Estate Agent',
    detail: 'Warm, trustworthy, client-facing look',
    ...stockBeforeAfter(
      'photo-1544005313-94ddf0286df2',            // warm casual expression
      'photo-1573496799652-408c2ac9fe98',         // polished real estate portrait
      'Casual photo before AI processing',
      'Professional AI headshot for real estate marketing',
    ),
  },
];

/** Extra brand portraits usable in galleries (samples page). */
export const brandPortraits = {
  manAfter: portraitAsset('photo-1507003211169-0a1dd7228f2d', 'AI-generated executive portrait of a man'),
  manEditorial: portraitAsset('photo-1560250097-0b93528c311a', 'AI-generated editorial portrait of a man'),
  womanAfter: portraitAsset('photo-1580489944761-15a19d654956', 'AI-generated studio portrait of a woman'),
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
/*  Unsplash portrait assignments — each photo ID appears in ONE       */
/*  category only. Non-people categories use local /images/ files.     */
/* ------------------------------------------------------------------ */

export const categoryVisuals: Record<string, CategoryVisuals> = {
  /* ------ headshots: corporate professionals ------ */
  headshots: {
    megaMenu: squareAsset('photo-1573496359142-b8d87734a5a2', 'Professional woman in navy blazer'),
    quickCard: landscapeAsset('photo-1560250097-0b93528c311a', 'Businessman in dark suit'),
    heroDesktop: portraitAsset('photo-1573496359142-b8d87734a5a2', 'Professional woman in navy blazer'),
    heroMobile: portraitAsset('photo-1573496359142-b8d87734a5a2', 'Professional woman in navy blazer'),
    gallery: [
      portraitAsset('photo-1580489944761-15a19d654956', 'Confident woman in professional attire'),
      portraitAsset('photo-1507003211169-0a1dd7228f2d', 'Man with warm smile in casual business wear'),
      portraitAsset('photo-1494790108377-be9c29b29330', 'Young professional woman with blonde hair'),
      portraitAsset('photo-1472099645785-5658abf4ff4e', 'Professional man with glasses'),
      portraitAsset('photo-1519085360753-af0119f7cbe7', 'Young man in crisp white shirt'),
      portraitAsset('photo-1438761681033-6461ffad8d80', 'Mature professional woman'),
    ],
    beforeAfter: stockBeforeAfter(
      'photo-1529626455594-4ff0802cfb7e',
      'photo-1580489944761-15a19d654956',
      'Casual selfie before AI processing',
      'Polished AI headshot',
    ),
  },

  /* ------ dating: approachable, natural portraits ------ */
  dating: {
    megaMenu: squareAsset('photo-1534528741775-53994a69daeb', 'Woman with natural hairstyle'),
    quickCard: landscapeAsset('photo-1539571696357-5a69c17a67c6', 'Relaxed man in casual wear'),
    heroDesktop: portraitAsset('photo-1534528741775-53994a69daeb', 'Woman with natural hairstyle'),
    heroMobile: portraitAsset('photo-1534528741775-53994a69daeb', 'Woman with natural hairstyle'),
    gallery: [
      portraitAsset('photo-1517841905240-472988babdf9', 'Creative professional woman'),
      portraitAsset('photo-1506794778202-cad84cf45f1d', 'Young man with creative style'),
      portraitAsset('photo-1488426862026-3ee34a7d66df', 'Woman with bright creative expression'),
      portraitAsset('photo-1552374196-c4e7ffc6e126', 'Man with relaxed confident pose'),
      portraitAsset('photo-1524504388940-b1c1722653e1', 'Man with creative casual look'),
      portraitAsset('photo-1531746020798-e6953c6e8e04', 'Woman with artistic style'),
    ],
    beforeAfter: stockBeforeAfter(
      'photo-1552374196-c4e7ffc6e126',
      'photo-1500648767791-00dcc994a43e',
      'Casual photo before AI enhancement',
      'Polished dating profile photo',
    ),
  },

  /* ------ pet-portraits (non-people, local image) ------ */
  'pet-portraits': fromLocalBase('pet-portraits', 'Two golden retriever puppies sitting on grass with orange flowers', POS.pet),

  /* ------ linkedin-team: corporate team members ------ */
  'linkedin-team': {
    megaMenu: squareAsset('photo-1522075469751-3a6694fb2f61', 'Professional in team environment'),
    quickCard: landscapeAsset('photo-1580894732444-8ecded7900cd', 'Team member with friendly smile'),
    heroDesktop: portraitAsset('photo-1522075469751-3a6694fb2f61', 'Professional in team environment'),
    heroMobile: portraitAsset('photo-1522075469751-3a6694fb2f61', 'Professional in team environment'),
    gallery: [
      portraitAsset('photo-1530268729831-4b0b9e170218', 'Professional woman in modern office'),
      portraitAsset('photo-1487412720507-e7ab37603c6f', 'Woman professional at work'),
      portraitAsset('photo-1542190891-2093d38760f2', 'Professional with confident stance'),
      portraitAsset('photo-1508214751196-bcfd4ca60f91', 'Elegant professional woman'),
      portraitAsset('photo-1566492031773-4f4e44671857', 'Distinguished man in suit'),
      portraitAsset('photo-1545167622-3a6ac756afa4', 'Young professional with modern style'),
    ],
    beforeAfter: stockBeforeAfter(
      'photo-1496345875659-11f7dd282d1d',
      'photo-1507003211169-0a1dd7228f2d',
      'Casual selfie before AI processing',
      'Polished AI headshot for a team page',
    ),
  },

  /* ------ baby-shower (non-people, local image) ------ */
  'baby-shower': fromLocalBase('baby-shower', 'Mother holding and kissing a baby in a nursery room', POS.portrait),

  /* ------ graduation: fresh, youthful portraits ------ */
  graduation: {
    megaMenu: squareAsset('photo-1548142813-c348350df52b', 'Young woman in sophisticated look'),
    quickCard: landscapeAsset('photo-1603415526960-f7e0328c63b1', 'Man with professional headshot look'),
    heroDesktop: portraitAsset('photo-1548142813-c348350df52b', 'Young woman in sophisticated look'),
    heroMobile: portraitAsset('photo-1548142813-c348350df52b', 'Young woman in sophisticated look'),
    gallery: [
      portraitAsset('photo-1567532939604-b6b5b0db2604', 'Professional woman headshot'),
      portraitAsset('photo-1557862921-37829c790f19', 'Man in professional portrait'),
      portraitAsset('photo-1551836022-d5d88e9218df', 'Woman with professional corporate look'),
      portraitAsset('photo-1568602471122-7832951cc4c5', 'Young man in smart casual'),
      portraitAsset('photo-1573497019940-1c28c88b4f3e', 'Woman in professional setting'),
      portraitAsset('photo-1556157382-97ede2916cd2', 'Professional in formal business attire'),
    ],
    beforeAfter: stockBeforeAfter(
      'photo-1568602471122-7832951cc4c5',
      'photo-1504257432389-52343af06ae3',
      'Casual photo before AI graduation portrait',
      'Polished AI graduation portrait',
    ),
  },

  /* ------ holiday-cards (non-people, local image) ------ */
  'holiday-cards': fromLocalBase('holiday-cards', 'Family decorating a Christmas tree together under staircase', POS.group),

  /* ------ family-portraits (non-people, local image) ------ */
  'family-portraits': fromLocalBase('family-portraits', 'Happy family portrait together', POS.group),

  /* ------ couple-engagement (non-people, local image) ------ */
  'couple-engagement': fromLocalBase('couple-engagement', 'Romantic couple engagement portrait', POS.group),

  /* ------ real-estate (non-people, local image) ------ */
  'real-estate': fromLocalBase('real-estate', 'Modern living room interior with sofa and wooden staircase', POS.room),

  /* ------ ecommerce-product (non-people, local image) ------ */
  'ecommerce-product': fromLocalBase('ecommerce-product', 'Luxury chronograph watch on polished wooden surface', POS.product),

  /* ------ avatars: diverse creative faces ------ */
  avatars: {
    megaMenu: squareAsset('photo-1559839734-2b71ea197ec2', 'Portrait with professional styling'),
    quickCard: landscapeAsset('photo-1612349317150-e413f6a5b16d', 'Portrait with creative styling'),
    heroDesktop: portraitAsset('photo-1559839734-2b71ea197ec2', 'Portrait with professional styling'),
    heroMobile: portraitAsset('photo-1559839734-2b71ea197ec2', 'Portrait with professional styling'),
    gallery: [
      portraitAsset('photo-1622253692010-333f2da6031d', 'Portrait for avatar generation'),
      portraitAsset('photo-1573496799652-408c2ac9fe98', 'Woman portrait for avatar styling'),
      portraitAsset('photo-1519345182560-3f2917c472ef', 'Man portrait for avatar transformation'),
      portraitAsset('photo-1544005313-94ddf0286df2', 'Woman with warm expression for avatar'),
      portraitAsset('photo-1559839734-2b71ea197ec2', 'Portrait with versatile styling'),
    ],
    beforeAfter: stockBeforeAfter(
      'photo-1544005313-94ddf0286df2',
      'photo-1573496799652-408c2ac9fe98',
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
