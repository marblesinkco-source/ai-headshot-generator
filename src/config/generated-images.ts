/**
 * Generated Image Registry — TailorPic
 * ======================================
 * Provides URLs for AI-generated marketing visuals.
 * Falls back to Unsplash stock photos when generated images are not yet available.
 *
 * Usage:
 *   import { getSampleImage, getHeroImage, getBeforeAfterPair } from '@/config/generated-images';
 *
 *   <Image src={getSampleImage(0)} ... />
 *   <Image src={getHeroImage(1)} ... />
 */

import { portrait, wide, square } from './stock-portraits';

/* ------------------------------------------------------------------ */
/*  Path prefix — generated images live under /images/generated/       */
/* ------------------------------------------------------------------ */

const GEN_PREFIX = '/images/generated';

/**
 * Check if a generated image exists at build time.
 * In production, all generated images should exist after the workflow runs.
 * During development, falls back to Unsplash stock photos.
 */
function genPath(relativePath: string): string {
  return `${GEN_PREFIX}/${relativePath}`;
}

/* ------------------------------------------------------------------ */
/*  Fallback Unsplash IDs (same as stock-portraits.ts)                */
/* ------------------------------------------------------------------ */

const SAMPLE_FALLBACKS = [
  'photo-1573496359142-b8d87734a5a2',
  'photo-1560250097-0b93528c311a',
  'photo-1580489944761-15a19d654956',
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1494790108377-be9c29b29330',
  'photo-1472099645785-5658abf4ff4e',
  'photo-1519085360753-af0119f7cbe7',
  'photo-1438761681033-6461ffad8d80',
  'photo-1500648767791-00dcc994a43e',
  'photo-1534528741775-53994a69daeb',
  'photo-1559839734-2b71ea197ec2',
  'photo-1539571696357-5a69c17a67c6',
  'photo-1544005313-94ddf0286df2',
  'photo-1531746020798-e6953c6e8e04',
];

const HERO_FALLBACKS = [
  'photo-1573496359142-b8d87734a5a2',
  'photo-1560250097-0b93528c311a',
  'photo-1580489944761-15a19d654956',
];

/* ------------------------------------------------------------------ */
/*  Style labels — maps styleId to display name                        */
/* ------------------------------------------------------------------ */

export const STYLE_LABELS: Record<string, string> = {
  business_formal: 'Business Formal',
  smart_casual: 'Smart Casual',
  creative: 'Creative',
  minimal: 'Minimal',
  executive: 'Executive',
  tech_startup: 'Tech Startup',
  academic: 'Academic',
  real_estate: 'Real Estate',
  healthcare: 'Healthcare',
  legal: 'Legal',
  finance: 'Finance',
};

export const BACKGROUND_LABELS: Record<string, string> = {
  studio_white: 'Studio White',
  studio_gray: 'Studio Gray',
  office: 'Modern Office',
  outdoor_park: 'Outdoor',
  gradient_blue: 'Gradient Blue',
  gradient_purple: 'Gradient Purple',
  brick_wall: 'Brick Wall',
  cityscape: 'Cityscape',
  abstract_dark: 'Abstract Dark',
  bookshelf: 'Bookshelf',
  conference_room: 'Conference Room',
  nature_green: 'Nature',
  minimalist_beige: 'Minimalist',
  window_light: 'Window Light',
  gradient_warm: 'Warm Gradient',
};

/* ------------------------------------------------------------------ */
/*  Sample images (for /samples page)                                  */
/* ------------------------------------------------------------------ */

export interface SampleImage {
  src: string;
  alt: string;
  style: string;
  background: string;
}

const SAMPLE_SPECS: Array<{ styleId: string; backgroundId: string }> = [
  { styleId: 'business_formal', backgroundId: 'studio_white' },
  { styleId: 'smart_casual', backgroundId: 'office' },
  { styleId: 'creative', backgroundId: 'brick_wall' },
  { styleId: 'executive', backgroundId: 'studio_gray' },
  { styleId: 'tech_startup', backgroundId: 'gradient_blue' },
  { styleId: 'academic', backgroundId: 'bookshelf' },
  { styleId: 'healthcare', backgroundId: 'minimalist_beige' },
  { styleId: 'real_estate', backgroundId: 'window_light' },
  { styleId: 'legal', backgroundId: 'conference_room' },
  { styleId: 'finance', backgroundId: 'abstract_dark' },
  { styleId: 'minimal', backgroundId: 'gradient_warm' },
  { styleId: 'business_formal', backgroundId: 'cityscape' },
  { styleId: 'smart_casual', backgroundId: 'outdoor_park' },
  { styleId: 'creative', backgroundId: 'gradient_purple' },
];

/**
 * Get a sample image for the /samples page.
 * Returns AI-generated image path with Unsplash fallback.
 */
export function getSampleImage(index: number): SampleImage {
  const spec = SAMPLE_SPECS[index % SAMPLE_SPECS.length];
  const genFile = `samples/sample-${index + 1}.jpg`;

  return {
    src: genPath(genFile),
    alt: `AI-generated professional headshot concept — ${STYLE_LABELS[spec.styleId] || spec.styleId} style`,
    style: STYLE_LABELS[spec.styleId] || spec.styleId,
    background: BACKGROUND_LABELS[spec.backgroundId] || spec.backgroundId,
  };
}

/**
 * Get Unsplash fallback URL for a sample image (when AI images not yet generated).
 */
export function getSampleFallback(index: number): string {
  return portrait(SAMPLE_FALLBACKS[index % SAMPLE_FALLBACKS.length]);
}

/**
 * Get all sample images with metadata.
 */
export function getAllSamples(): SampleImage[] {
  return SAMPLE_SPECS.map((_, i) => getSampleImage(i));
}

/* ------------------------------------------------------------------ */
/*  Hero images                                                        */
/* ------------------------------------------------------------------ */

/**
 * Get a hero section image (1024x1344, portrait orientation).
 */
export function getHeroImage(index: number): string {
  return genPath(`hero/hero-${(index % 3) + 1}.jpg`);
}

export function getHeroFallback(index: number): string {
  return portrait(HERO_FALLBACKS[index % HERO_FALLBACKS.length]);
}

/* ------------------------------------------------------------------ */
/*  Before/After pairs                                                 */
/* ------------------------------------------------------------------ */

export interface BeforeAfterPair {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
}

/**
 * Get a before/after image pair (0-2).
 */
export function getBeforeAfterPair(index: number): BeforeAfterPair {
  const i = (index % 3) + 1;
  return {
    before: {
      src: genPath(`before-after/before-${i}.jpg`),
      alt: 'Original casual photo before AI enhancement',
    },
    after: {
      src: genPath(`before-after/after-${i}.jpg`),
      alt: 'AI-generated professional headshot concept',
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Style preview thumbnails                                           */
/* ------------------------------------------------------------------ */

/**
 * Get a style preview thumbnail (400x400, square).
 */
export function getStylePreview(styleId: string): string {
  return genPath(`styles/${styleId}.jpg`);
}

export function getStylePreviewFallback(styleId: string): string {
  // Map styles to approximate Unsplash equivalents
  const map: Record<string, string> = {
    business_formal: 'photo-1560250097-0b93528c311a',
    smart_casual: 'photo-1507003211169-0a1dd7228f2d',
    creative: 'photo-1531746020798-e6953c6e8e04',
    minimal: 'photo-1494790108377-be9c29b29330',
    executive: 'photo-1566492031773-4f4e44671857',
    tech_startup: 'photo-1539571696357-5a69c17a67c6',
    academic: 'photo-1544005313-94ddf0286df2',
    real_estate: 'photo-1519345182560-3f2917c472ef',
    healthcare: 'photo-1559839734-2b71ea197ec2',
    legal: 'photo-1556157382-97ede2916cd2',
    finance: 'photo-1573496359142-b8d87734a5a2',
  };
  return square(map[styleId] || 'photo-1573496359142-b8d87734a5a2');
}

/* ------------------------------------------------------------------ */
/*  Blog cover images                                                  */
/* ------------------------------------------------------------------ */

/**
 * Get a blog cover image (1200x675, landscape).
 * Falls back to Unsplash via stock-portraits.ts BLOG_COVERS.
 */
export function getBlogCoverGenerated(slug: string): string {
  return genPath(`blog/${slug}.jpg`);
}

/* ------------------------------------------------------------------ */
/*  OG / Social share image                                            */
/* ------------------------------------------------------------------ */

export function getOGImage(): string {
  return genPath('og/default.jpg');
}
