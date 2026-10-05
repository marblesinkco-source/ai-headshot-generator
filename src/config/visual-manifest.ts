/**
 * Visual Asset Manifest — TailorPic
 * ==================================
 * Maps every visual need on the site to a specific Flux-dev generation spec.
 * Used by scripts/generate-site-visuals.ts to produce all marketing images.
 *
 * These are GENERIC headshot samples (no LoRA training needed).
 * The base Flux-dev model generates professional portrait concepts
 * using our style + background combinations from ai.ts.
 */

import type { BackgroundId, StyleId } from './ai';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type VisualCategory =
  | 'samples'       // /samples page cards
  | 'hero'          // Homepage hero section
  | 'before-after'  // Before/after pairs
  | 'category-hero' // Category page hero images
  | 'blog-cover'    // Blog post cover images
  | 'style-preview' // Style preview thumbnails
  | 'social-og'     // OG/social share images
  | 'city-hero';    // City landing page visuals

export type Gender = 'male' | 'female';
export type AgeRange = 'young' | 'mid' | 'mature';
export type Ethnicity = 'caucasian' | 'black' | 'asian' | 'hispanic' | 'south-asian' | 'middle-eastern';

export interface VisualSpec {
  /** Unique ID for the generated image file */
  id: string;
  /** Which section of the site this is for */
  category: VisualCategory;
  /** Style from ai.ts */
  styleId: StyleId;
  /** Background from ai.ts */
  backgroundId: BackgroundId;
  /** Subject description for diversity */
  subject: {
    gender: Gender;
    ageRange: AgeRange;
    ethnicity: Ethnicity;
    /** Additional subject descriptors */
    details?: string;
  };
  /** Output dimensions */
  width: number;
  height: number;
  /** Output filename (relative to public/images/generated/) */
  outputPath: string;
  /** Alt text for accessibility */
  alt: string;
}

/* ------------------------------------------------------------------ */
/*  Subject pool — ensures diverse representation                      */
/* ------------------------------------------------------------------ */

const DIVERSE_SUBJECTS: Array<VisualSpec['subject']> = [
  { gender: 'female', ageRange: 'young', ethnicity: 'black', details: 'with natural curly hair' },
  { gender: 'male', ageRange: 'mid', ethnicity: 'caucasian', details: 'with short brown hair and subtle beard' },
  { gender: 'female', ageRange: 'mid', ethnicity: 'asian', details: 'with straight dark hair' },
  { gender: 'male', ageRange: 'mature', ethnicity: 'hispanic', details: 'with salt-and-pepper hair' },
  { gender: 'female', ageRange: 'young', ethnicity: 'south-asian', details: 'with long dark hair' },
  { gender: 'male', ageRange: 'young', ethnicity: 'middle-eastern', details: 'with dark wavy hair' },
  { gender: 'female', ageRange: 'mature', ethnicity: 'caucasian', details: 'with blonde shoulder-length hair' },
  { gender: 'male', ageRange: 'mid', ethnicity: 'black', details: 'with closely cropped hair' },
  { gender: 'female', ageRange: 'mid', ethnicity: 'hispanic', details: 'with warm brown hair' },
  { gender: 'male', ageRange: 'young', ethnicity: 'asian', details: 'with modern styled dark hair' },
  { gender: 'female', ageRange: 'young', ethnicity: 'caucasian', details: 'with auburn wavy hair' },
  { gender: 'male', ageRange: 'mature', ethnicity: 'south-asian', details: 'with distinguished gray hair' },
  { gender: 'female', ageRange: 'mid', ethnicity: 'middle-eastern', details: 'with elegant dark hair' },
  { gender: 'male', ageRange: 'mid', ethnicity: 'caucasian', details: 'with glasses and neat dark hair' },
];

function getSubject(index: number): VisualSpec['subject'] {
  return DIVERSE_SUBJECTS[index % DIVERSE_SUBJECTS.length];
}

/* ------------------------------------------------------------------ */
/*  Manifest — every visual the site needs                             */
/* ------------------------------------------------------------------ */

export const VISUAL_MANIFEST: VisualSpec[] = [
  // ─── SAMPLES PAGE (14 cards) ─────────────────────────────────────────
  ...([
    { styleId: 'business_formal' as const, backgroundId: 'studio_white' as const },
    { styleId: 'smart_casual' as const, backgroundId: 'office' as const },
    { styleId: 'creative' as const, backgroundId: 'brick_wall' as const },
    { styleId: 'executive' as const, backgroundId: 'studio_gray' as const },
    { styleId: 'tech_startup' as const, backgroundId: 'gradient_blue' as const },
    { styleId: 'academic' as const, backgroundId: 'bookshelf' as const },
    { styleId: 'healthcare' as const, backgroundId: 'minimalist_beige' as const },
    { styleId: 'real_estate' as const, backgroundId: 'window_light' as const },
    { styleId: 'legal' as const, backgroundId: 'conference_room' as const },
    { styleId: 'finance' as const, backgroundId: 'abstract_dark' as const },
    { styleId: 'minimal' as const, backgroundId: 'gradient_warm' as const },
    { styleId: 'business_formal' as const, backgroundId: 'cityscape' as const },
    { styleId: 'smart_casual' as const, backgroundId: 'outdoor_park' as const },
    { styleId: 'creative' as const, backgroundId: 'gradient_purple' as const },
  ] as const).map((combo, i) => ({
    id: `sample-${i + 1}`,
    category: 'samples' as const,
    styleId: combo.styleId,
    backgroundId: combo.backgroundId,
    subject: getSubject(i),
    width: 800,
    height: 1067,
    outputPath: `samples/sample-${i + 1}.jpg`,
    alt: `AI-generated professional headshot concept — ${combo.styleId.replace('_', ' ')} style`,
  })),

  // ─── HERO SECTION (3 featured portraits) ─────────────────────────────
  ...[
    { styleId: 'business_formal' as const, backgroundId: 'studio_white' as const, subjectIdx: 0 },
    { styleId: 'executive' as const, backgroundId: 'studio_gray' as const, subjectIdx: 3 },
    { styleId: 'smart_casual' as const, backgroundId: 'office' as const, subjectIdx: 2 },
  ].map((spec, i) => ({
    id: `hero-${i + 1}`,
    category: 'hero' as const,
    styleId: spec.styleId,
    backgroundId: spec.backgroundId,
    subject: getSubject(spec.subjectIdx),
    width: 1024,
    height: 1344,
    outputPath: `hero/hero-${i + 1}.jpg`,
    alt: 'AI-generated professional headshot concept',
  })),

  // ─── BEFORE/AFTER PAIRS (3 pairs = 6 images) ────────────────────────
  // "Before" is a casual/amateur look; "After" is the polished version
  ...[0, 1, 2].flatMap((i) => [
    {
      id: `before-${i + 1}`,
      category: 'before-after' as const,
      styleId: 'minimal' as const,
      backgroundId: 'nature_green' as const,
      subject: { ...getSubject(i * 3), details: `${getSubject(i * 3).details}, casual selfie look, slightly off-center, natural ambient lighting` },
      width: 768,
      height: 1024,
      outputPath: `before-after/before-${i + 1}.jpg`,
      alt: 'Original casual photo before AI enhancement',
    },
    {
      id: `after-${i + 1}`,
      category: 'before-after' as const,
      styleId: 'business_formal' as const,
      backgroundId: 'studio_white' as const,
      subject: getSubject(i * 3),
      width: 768,
      height: 1024,
      outputPath: `before-after/after-${i + 1}.jpg`,
      alt: 'AI-generated professional headshot concept',
    },
  ]),

  // ─── STYLE PREVIEW THUMBNAILS (11 styles) ────────────────────────────
  ...([
    'business_formal', 'smart_casual', 'creative', 'minimal', 'executive',
    'tech_startup', 'academic', 'real_estate', 'healthcare', 'legal', 'finance',
  ] as const).map((styleId, i) => ({
    id: `style-${styleId}`,
    category: 'style-preview' as const,
    styleId,
    backgroundId: 'studio_white' as const,
    subject: getSubject(i),
    width: 400,
    height: 400,
    outputPath: `styles/${styleId}.jpg`,
    alt: `${styleId.replace('_', ' ')} style headshot preview`,
  })),

  // ─── BLOG COVER IMAGES (top 15 posts) ───────────────────────────────
  ...([
    { slug: 'ai-headshot-revolution', styleId: 'tech_startup' as const, bgId: 'gradient_blue' as const },
    { slug: 'perfect-linkedin-photo', styleId: 'business_formal' as const, bgId: 'studio_gray' as const },
    { slug: 'headshot-tips-professionals', styleId: 'executive' as const, bgId: 'office' as const },
    { slug: 'ai-vs-traditional-photography', styleId: 'creative' as const, bgId: 'studio_white' as const },
    { slug: 'corporate-headshot-guide', styleId: 'business_formal' as const, bgId: 'conference_room' as const },
    { slug: 'remote-work-headshots', styleId: 'smart_casual' as const, bgId: 'window_light' as const },
    { slug: 'personal-branding-photos', styleId: 'creative' as const, bgId: 'brick_wall' as const },
    { slug: 'team-photos-guide', styleId: 'business_formal' as const, bgId: 'office' as const },
    { slug: 'executive-portrait-guide', styleId: 'executive' as const, bgId: 'abstract_dark' as const },
    { slug: 'startup-team-photos', styleId: 'tech_startup' as const, bgId: 'gradient_purple' as const },
    { slug: 'medical-headshots', styleId: 'healthcare' as const, bgId: 'minimalist_beige' as const },
    { slug: 'legal-headshots', styleId: 'legal' as const, bgId: 'bookshelf' as const },
    { slug: 'real-estate-agent-headshots', styleId: 'real_estate' as const, bgId: 'window_light' as const },
    { slug: 'headshot-lighting-tips', styleId: 'minimal' as const, bgId: 'studio_white' as const },
    { slug: 'social-media-photos', styleId: 'smart_casual' as const, bgId: 'outdoor_park' as const },
  ]).map((spec, i) => ({
    id: `blog-${spec.slug}`,
    category: 'blog-cover' as const,
    styleId: spec.styleId,
    backgroundId: spec.bgId,
    subject: getSubject(i),
    width: 1200,
    height: 675,
    outputPath: `blog/${spec.slug}.jpg`,
    alt: `Blog cover — ${spec.slug.replace(/-/g, ' ')}`,
  })),

  // ─── OG/SOCIAL SHARE IMAGES (generic) ───────────────────────────────
  {
    id: 'og-default',
    category: 'social-og',
    styleId: 'business_formal' as const,
    backgroundId: 'studio_white' as const,
    subject: getSubject(0),
    width: 1200,
    height: 630,
    outputPath: 'og/default.jpg',
    alt: 'TailorPic — AI Professional Headshots',
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Get all visuals for a specific category */
export function getVisualsByCategory(category: VisualCategory): VisualSpec[] {
  return VISUAL_MANIFEST.filter((v) => v.category === category);
}

/** Get a specific visual by ID */
export function getVisualById(id: string): VisualSpec | undefined {
  return VISUAL_MANIFEST.find((v) => v.id === id);
}

/** Total image count for progress tracking */
export const TOTAL_VISUALS = VISUAL_MANIFEST.length;
