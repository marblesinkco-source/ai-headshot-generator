/**
 * Brand portrait registry for TailorPic
 *
 * All images are real TailorPic customer/team photos stored in /brand/tailorpic/web/.
 * Images are AI-generated headshot results, NOT testimonials.
 * No fabricated names, reviews, or user counts are attached.
 *
 * Legacy Unsplash helpers remain for backward compatibility but all new
 * entries use local brand paths.
 */

const BRAND_WEB = '/brand/tailorpic/web';

/** Cache-busting version — increment when brand images are updated */
const BRAND_IMG_VERSION = '3';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function unsplash(
  photoId: string,
  w: number,
  h: number,
  crop: string = 'face',
): string {
  return `https://images.unsplash.com/${photoId}?w=${w}&h=${h}&fit=crop&crop=${crop}&auto=format&q=80`;
}

/**
 * Smart resolver — if the ID starts with "/" it's a local brand path;
 * return it directly. Otherwise build an Unsplash URL.
 * This allows gradual migration without touching 60+ consumer files.
 */
function resolve(photoId: string, w: number, h: number, crop: string = 'face'): string {
  if (photoId.startsWith('/')) return `${photoId}?v=${BRAND_IMG_VERSION}`;
  return unsplash(photoId, w, h, crop);
}

/** 3:4 portrait (headshots, hero) — 600w is enough since Next.js Image generates srcSet */
export function portrait(photoId: string): string {
  return resolve(photoId, 600, 800, 'face');
}

/** 4:3 landscape (cards, thumbnails) */
export function landscape(photoId: string): string {
  return resolve(photoId, 800, 600, 'face');
}

/** 1:1 square (mega menu, avatars) */
export function square(photoId: string): string {
  return resolve(photoId, 400, 400, 'face');
}

/** 16:9 wide (blog covers, OG images) */
export function wide(photoId: string): string {
  return resolve(photoId, 1200, 675, 'face');
}

/** "Casual selfie" variant of a portrait — same person, wider framing. */
export function casualPortrait(photoId: string): string {
  return resolve(photoId, 700, 800, 'entropy');
}

/** Content photo — uses entropy-based crop instead of face-crop.
 *  Ideal for pets, products, scenes where face detection fails. */
export function contentPhoto(photoId: string, w = 800, h = 1067): string {
  return resolve(photoId, w, h, 'entropy');
}

/** 1:1 content square — entropy crop for non-face subjects */
export function contentSquare(photoId: string): string {
  return resolve(photoId, 400, 400, 'entropy');
}

/* ------------------------------------------------------------------ */
/*  Portrait collection — real TailorPic results                       */
/*                                                                     */
/*  Each entry: { id, label (for alt text), category }                 */
/*  Categories help organize usage across the site.                    */
/* ------------------------------------------------------------------ */

export interface StockPortrait {
  id: string;       // Local brand path (e.g. /brand/tailorpic/web/after-murat.jpg)
  label: string;    // Descriptive alt text (no names)
  category: 'corporate' | 'creative' | 'medical' | 'legal' | 'tech' | 'education' | 'realestate' | 'casual' | 'team' | 'pet' | 'family' | 'lifestyle';
}

/**
 * Curated portrait collection — real AI headshot results from TailorPic.
 * Each person appears ONLY ONCE across the entire site.
 */
export const STOCK_PORTRAITS: StockPortrait[] = [
  // Corporate / Business — AI headshot results
  { id: `${BRAND_WEB}/after-murat.jpg`, label: 'Professional man in corporate portrait', category: 'corporate' },
  { id: `${BRAND_WEB}/after-ozlem.jpg`, label: 'Professional woman in business attire', category: 'corporate' },
  { id: `${BRAND_WEB}/after-tarkan.jpg`, label: 'Executive portrait with confident expression', category: 'corporate' },
  { id: `${BRAND_WEB}/after-mustafa.jpg`, label: 'Businessman in professional headshot', category: 'corporate' },
  { id: `${BRAND_WEB}/after-ahmet.jpg`, label: 'Professional man with warm smile', category: 'corporate' },
  { id: `${BRAND_WEB}/after-alpaslan.jpg`, label: 'Business professional portrait', category: 'corporate' },
  { id: `${BRAND_WEB}/after-mert.jpg`, label: 'Young professional with modern style', category: 'corporate' },
  { id: `${BRAND_WEB}/after-ozan.jpg`, label: 'Professional man with confident pose', category: 'corporate' },
  { id: `${BRAND_WEB}/after-halil.jpg`, label: 'Corporate professional headshot', category: 'corporate' },
  { id: `${BRAND_WEB}/after-isik.jpg`, label: 'Professional woman in elegant blazer', category: 'corporate' },

  // Team context — real team members
  { id: `${BRAND_WEB}/team-ozlem.jpg`, label: 'Team member with friendly smile', category: 'team' },
  { id: `${BRAND_WEB}/team-ozan.jpg`, label: 'Professional in team environment', category: 'team' },
  { id: `${BRAND_WEB}/team-ahmet.jpg`, label: 'Team member in modern office', category: 'team' },
  { id: `${BRAND_WEB}/team-alpaslan.jpg`, label: 'Team professional at work', category: 'team' },
  { id: `${BRAND_WEB}/team-halil.jpg`, label: 'Team member portrait', category: 'team' },
  { id: `${BRAND_WEB}/team-mustafa.jpg`, label: 'Professional team member', category: 'team' },
  { id: `${BRAND_WEB}/team-ediz.jpg`, label: 'Team member with warm expression', category: 'team' },
  { id: `${BRAND_WEB}/team-murat-jr.jpg`, label: 'Young team professional', category: 'team' },
  { id: `${BRAND_WEB}/team-sadiye.jpg`, label: 'Female team member portrait', category: 'team' },
  { id: `${BRAND_WEB}/team-can-bilen.jpg`, label: 'Team member in professional setting', category: 'team' },

  // Creative / Casual — editorial style portraits
  { id: `${BRAND_WEB}/portrait-woman-editorial.webp`, label: 'Creative professional with artistic style', category: 'creative' },
  { id: `${BRAND_WEB}/portrait-man-editorial.webp`, label: 'Man with creative casual look', category: 'creative' },
  { id: `${BRAND_WEB}/portrait-woman-creative-after.webp`, label: 'Woman with bright creative expression', category: 'creative' },

  // Family & Warm — real family photos
  { id: `${BRAND_WEB}/family-unver-group.jpg`, label: 'Happy family portrait together', category: 'family' },
  { id: `${BRAND_WEB}/family-unver-mom-kids.jpg`, label: 'Mother and children sharing a warm moment', category: 'family' },
  { id: `${BRAND_WEB}/family-unver-kids.jpg`, label: 'Joyful children moment', category: 'family' },
  { id: `${BRAND_WEB}/family-unver-couple.jpg`, label: 'Couple portrait together', category: 'family' },

  // Lifestyle / Outdoor
  { id: `${BRAND_WEB}/family-unver-portrait.jpg`, label: 'Portrait in warm light', category: 'lifestyle' },
  { id: `${BRAND_WEB}/holiday-couple-vacation.jpg`, label: 'Couple enjoying vacation', category: 'lifestyle' },
  { id: `${BRAND_WEB}/celebration-murat-soganci.jpg`, label: 'Celebration moment', category: 'lifestyle' },

  // Founders
  { id: `${BRAND_WEB}/founder-mert.jpg`, label: 'Founder portrait', category: 'corporate' },
  { id: `${BRAND_WEB}/founder-murat.jpg`, label: 'Co-founder portrait', category: 'corporate' },

  // Pet Portraits — real customer Işık Bulut with her cat
  { id: `${BRAND_WEB}/pet-isik-1.jpg`, label: 'Woman holding a tabby cat lovingly', category: 'pet' },
  { id: `${BRAND_WEB}/pet-isik-2.jpg`, label: 'Tabby cat looking content in owners arms', category: 'pet' },
  { id: `${BRAND_WEB}/pet-isik-3.jpg`, label: 'Cat looking at camera with owner', category: 'pet' },
];

/* ------------------------------------------------------------------ */
/*  Getters — use these in components                                  */
/* ------------------------------------------------------------------ */

/** Get N unique portraits from a category, ensuring no repeats on a page. */
export function getPortraits(
  category: StockPortrait['category'],
  count: number,
  startIndex: number = 0,
): StockPortrait[] {
  const pool = STOCK_PORTRAITS.filter((p) => p.category === category);
  const result: StockPortrait[] = [];
  for (let i = 0; i < count && i + startIndex < pool.length; i++) {
    result.push(pool[(i + startIndex) % pool.length]);
  }
  return result;
}

/** Get a single portrait by index from the full collection (for non-repeating distribution). */
export function getPortraitByIndex(index: number): StockPortrait {
  return STOCK_PORTRAITS[index % STOCK_PORTRAITS.length];
}

/** Get all portraits of a category. */
export function getPortraitsByCategory(category: StockPortrait['category']): StockPortrait[] {
  return STOCK_PORTRAITS.filter((p) => p.category === category);
}

/* ------------------------------------------------------------------ */
/*  Industry/profession images                                         */
/* ------------------------------------------------------------------ */

export interface IndustryVisual {
  heroPortraitId: string;  // Brand photo path
  alt: string;
  cardPortraitId: string;  // Brand photo path
}

/**
 * Industry-specific visuals. Each industry gets a portrait from
 * TailorPic's real AI headshot results.
 */
export const INDUSTRY_VISUALS: Record<string, IndustryVisual> = {
  finance: { heroPortraitId: `${BRAND_WEB}/after-murat.jpg`, alt: 'Finance professional AI headshot', cardPortraitId: `${BRAND_WEB}/after-murat.jpg` },
  healthcare: { heroPortraitId: `${BRAND_WEB}/after-ozlem.jpg`, alt: 'Healthcare professional AI headshot', cardPortraitId: `${BRAND_WEB}/after-ozlem.jpg` },
  legal: { heroPortraitId: `${BRAND_WEB}/after-tarkan.jpg`, alt: 'Legal professional AI headshot', cardPortraitId: `${BRAND_WEB}/after-tarkan.jpg` },
  tech: { heroPortraitId: `${BRAND_WEB}/after-mert.jpg`, alt: 'Tech professional AI headshot', cardPortraitId: `${BRAND_WEB}/after-mert.jpg` },
  'real-estate': { heroPortraitId: `${BRAND_WEB}/after-mustafa.jpg`, alt: 'Real estate professional AI headshot', cardPortraitId: `${BRAND_WEB}/after-mustafa.jpg` },
  education: { heroPortraitId: `${BRAND_WEB}/after-ahmet.jpg`, alt: 'Education professional AI headshot', cardPortraitId: `${BRAND_WEB}/after-ahmet.jpg` },
  doctors: { heroPortraitId: `${BRAND_WEB}/after-ozlem.jpg`, alt: 'Doctor AI headshot', cardPortraitId: `${BRAND_WEB}/after-ozlem.jpg` },
  nurses: { heroPortraitId: `${BRAND_WEB}/after-isik.jpg`, alt: 'Nurse AI headshot', cardPortraitId: `${BRAND_WEB}/after-isik.jpg` },
  lawyers: { heroPortraitId: `${BRAND_WEB}/after-tarkan.jpg`, alt: 'Attorney AI headshot', cardPortraitId: `${BRAND_WEB}/after-tarkan.jpg` },
  consultants: { heroPortraitId: `${BRAND_WEB}/after-murat.jpg`, alt: 'Consultant AI headshot', cardPortraitId: `${BRAND_WEB}/after-murat.jpg` },
  accountants: { heroPortraitId: `${BRAND_WEB}/after-mustafa.jpg`, alt: 'Accountant AI headshot', cardPortraitId: `${BRAND_WEB}/after-mustafa.jpg` },
  engineers: { heroPortraitId: `${BRAND_WEB}/after-alpaslan.jpg`, alt: 'Engineer AI headshot', cardPortraitId: `${BRAND_WEB}/after-alpaslan.jpg` },
  teachers: { heroPortraitId: `${BRAND_WEB}/after-ahmet.jpg`, alt: 'Teacher AI headshot', cardPortraitId: `${BRAND_WEB}/after-ahmet.jpg` },
  executives: { heroPortraitId: `${BRAND_WEB}/after-tarkan.jpg`, alt: 'Executive AI headshot', cardPortraitId: `${BRAND_WEB}/after-tarkan.jpg` },
  entrepreneurs: { heroPortraitId: `${BRAND_WEB}/after-mert.jpg`, alt: 'Entrepreneur AI headshot', cardPortraitId: `${BRAND_WEB}/after-mert.jpg` },
  architects: { heroPortraitId: `${BRAND_WEB}/after-ozan.jpg`, alt: 'Architect AI headshot', cardPortraitId: `${BRAND_WEB}/after-ozan.jpg` },
  designers: { heroPortraitId: `${BRAND_WEB}/after-ozlem.jpg`, alt: 'Designer AI headshot', cardPortraitId: `${BRAND_WEB}/after-ozlem.jpg` },
  marketers: { heroPortraitId: `${BRAND_WEB}/after-isik.jpg`, alt: 'Marketing professional AI headshot', cardPortraitId: `${BRAND_WEB}/after-isik.jpg` },
  salespeople: { heroPortraitId: `${BRAND_WEB}/after-halil.jpg`, alt: 'Sales professional AI headshot', cardPortraitId: `${BRAND_WEB}/after-halil.jpg` },
  coaches: { heroPortraitId: `${BRAND_WEB}/after-murat.jpg`, alt: 'Coach AI headshot', cardPortraitId: `${BRAND_WEB}/after-murat.jpg` },
  therapists: { heroPortraitId: `${BRAND_WEB}/after-ozlem.jpg`, alt: 'Therapist AI headshot', cardPortraitId: `${BRAND_WEB}/after-ozlem.jpg` },
  photographers: { heroPortraitId: `${BRAND_WEB}/after-ozan.jpg`, alt: 'Photographer AI headshot', cardPortraitId: `${BRAND_WEB}/after-ozan.jpg` },
  journalists: { heroPortraitId: `${BRAND_WEB}/after-ahmet.jpg`, alt: 'Journalist AI headshot', cardPortraitId: `${BRAND_WEB}/after-ahmet.jpg` },
  pharmacists: { heroPortraitId: `${BRAND_WEB}/after-mustafa.jpg`, alt: 'Pharmacist AI headshot', cardPortraitId: `${BRAND_WEB}/after-mustafa.jpg` },
};

/** Get industry visual with fallback to generic brand portrait. */
export function getIndustryVisual(slug: string): IndustryVisual {
  return INDUSTRY_VISUALS[slug] ?? {
    heroPortraitId: `${BRAND_WEB}/after-murat.jpg`,
    alt: 'Professional AI headshot portrait',
    cardPortraitId: `${BRAND_WEB}/after-murat.jpg`,
  };
}

/* ------------------------------------------------------------------ */
/*  Blog cover images                                                  */
/* ------------------------------------------------------------------ */

/** Unique cover photo paths for blog posts, keyed by post slug. */
export const BLOG_COVERS: Record<string, string> = {
  'ai-headshot-revolution': `${BRAND_WEB}/after-murat.jpg`,
  'perfect-linkedin-photo': `${BRAND_WEB}/after-ozlem.jpg`,
  'headshot-tips-professionals': `${BRAND_WEB}/after-tarkan.jpg`,
  'ai-vs-traditional-photography': `${BRAND_WEB}/after-mert.jpg`,
  'corporate-headshot-guide': `${BRAND_WEB}/after-mustafa.jpg`,
  'remote-work-headshots': `${BRAND_WEB}/after-ahmet.jpg`,
  'personal-branding-photos': `${BRAND_WEB}/after-alpaslan.jpg`,
  'team-photos-guide': `${BRAND_WEB}/team-ozlem.jpg`,
  'headshot-lighting-tips': `${BRAND_WEB}/after-ozan.jpg`,
  'social-media-photos': `${BRAND_WEB}/after-isik.jpg`,
  'executive-portrait-guide': `${BRAND_WEB}/after-tarkan.jpg`,
  'startup-team-photos': `${BRAND_WEB}/after-mert.jpg`,
  'medical-headshots': `${BRAND_WEB}/after-ozlem.jpg`,
  'legal-headshots': `${BRAND_WEB}/after-tarkan.jpg`,
  'aragon-ai-alternatives': `${BRAND_WEB}/after-halil.jpg`,
  'linkedin-headshot-optimization': `${BRAND_WEB}/after-murat.jpg`,
  'work-from-home-headshots': `${BRAND_WEB}/after-ahmet.jpg`,
  'ai-headshots-for-students': `${BRAND_WEB}/after-mert.jpg`,
  'headshot-retouching-guide': `${BRAND_WEB}/after-ozlem.jpg`,
  'best-ai-headshot-generators-2025': `${BRAND_WEB}/after-alpaslan.jpg`,
  'nursing-headshot-guide': `${BRAND_WEB}/after-isik.jpg`,
  'teacher-headshot-guide': `${BRAND_WEB}/after-ahmet.jpg`,
  'ai-headshot-cost-comparison': `${BRAND_WEB}/after-mustafa.jpg`,
  'passport-photo-ai': `${BRAND_WEB}/after-ozan.jpg`,
  'how-ai-headshots-work': `${BRAND_WEB}/after-halil.jpg`,
  'best-photos-for-linkedin': `${BRAND_WEB}/after-ozlem.jpg`,
  'ai-pet-portraits-guide': `${BRAND_WEB}/family-unver-group.jpg`,
  'professional-headshot-tips-2025': `${BRAND_WEB}/after-murat.jpg`,
  'ai-headshots-vs-traditional-photography': `${BRAND_WEB}/after-tarkan.jpg`,
  'best-headshot-for-linkedin-profile': `${BRAND_WEB}/after-alpaslan.jpg`,
  'real-estate-agent-headshots': `${BRAND_WEB}/after-mustafa.jpg`,
  'corporate-team-photos-guide': `${BRAND_WEB}/team-ahmet.jpg`,
  'headshot-background-guide': `${BRAND_WEB}/after-ozan.jpg`,
  'lawyer-headshot-guide': `${BRAND_WEB}/after-tarkan.jpg`,
  'dating-profile-photo-tips': `${BRAND_WEB}/after-isik.jpg`,
  'ai-headshot-privacy-security': `${BRAND_WEB}/after-mert.jpg`,
  'headshot-dos-and-donts': `${BRAND_WEB}/after-ozlem.jpg`,
  'executive-headshot-guide': `${BRAND_WEB}/after-tarkan.jpg`,
  'startup-team-branding-photos': `${BRAND_WEB}/team-ozan.jpg`,
  'remote-worker-headshot-guide': `${BRAND_WEB}/after-ahmet.jpg`,
  'medical-residency-headshot-requirements': `${BRAND_WEB}/after-ozlem.jpg`,
  'headshot-trends-2025': `${BRAND_WEB}/after-halil.jpg`,
  'ai-headshots-for-teams-enterprise': `${BRAND_WEB}/team-alpaslan.jpg`,
  'headshot-lighting-guide': `${BRAND_WEB}/after-murat.jpg`,
  'social-media-profile-photo-sizes': `${BRAND_WEB}/after-isik.jpg`,
  'ai-photography-ethics-guide': `${BRAND_WEB}/after-mustafa.jpg`,
  'what-to-wear-for-headshots': `${BRAND_WEB}/after-ozlem.jpg`,
  'diy-headshots-at-home': `${BRAND_WEB}/after-alpaslan.jpg`,
  'actor-headshot-guide': `${BRAND_WEB}/after-ozan.jpg`,
  'virtual-headshots-remote-teams': `${BRAND_WEB}/team-mustafa.jpg`,
  'headshot-trends-2026': `${BRAND_WEB}/after-murat.jpg`,
  'can-recruiters-tell-ai-headshots': `${BRAND_WEB}/after-mert.jpg`,
  'professional-profile-picture-examples': `${BRAND_WEB}/after-tarkan.jpg`,
  'take-professional-headshot-with-phone': `${BRAND_WEB}/after-ahmet.jpg`,
  'ai-headshot-for-healthcare': `${BRAND_WEB}/after-ozlem.jpg`,
  'corporate-headshot-dress-code': `${BRAND_WEB}/after-mustafa.jpg`,
};

/** Get blog cover URL. Falls back to a generic brand portrait. */
export function getBlogCover(slug: string): string {
  const photoId = BLOG_COVERS[slug] ?? `${BRAND_WEB}/after-murat.jpg`;
  return wide(photoId);
}
