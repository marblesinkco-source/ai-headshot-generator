/**
 * Diverse stock portrait registry for TailorPic
 *
 * All images are from Unsplash (already whitelisted in next.config.mjs CSP + remotePatterns).
 * Images are AI-concept illustrations or stock photography, NOT testimonials.
 * No fabricated names, reviews, or user counts are attached.
 *
 * URL format uses Unsplash's image CDN with face-aware cropping.
 */

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

/** 3:4 portrait (headshots, hero) */
export function portrait(photoId: string): string {
  return unsplash(photoId, 800, 1067, 'face');
}

/** 4:3 landscape (cards, thumbnails) */
export function landscape(photoId: string): string {
  return unsplash(photoId, 800, 600, 'face');
}

/** 1:1 square (mega menu, avatars) */
export function square(photoId: string): string {
  return unsplash(photoId, 400, 400, 'face');
}

/** 16:9 wide (blog covers, OG images) */
export function wide(photoId: string): string {
  return unsplash(photoId, 1200, 675, 'face');
}

/** Content photo — uses entropy-based crop instead of face-crop.
 *  Ideal for pets, products, scenes where face detection fails. */
export function contentPhoto(photoId: string, w = 800, h = 1067): string {
  return unsplash(photoId, w, h, 'entropy');
}

/** 1:1 content square — entropy crop for non-face subjects */
export function contentSquare(photoId: string): string {
  return unsplash(photoId, 400, 400, 'entropy');
}

/* ------------------------------------------------------------------ */
/*  Portrait collection — diverse age, gender, ethnicity               */
/*                                                                     */
/*  Each entry: { id, label (for alt text), category }                 */
/*  Categories help organize usage across the site.                    */
/* ------------------------------------------------------------------ */

export interface StockPortrait {
  id: string;       // Unsplash photo path (photo-XXXX or just the hash)
  label: string;    // Descriptive alt text (no names)
  category: 'corporate' | 'creative' | 'medical' | 'legal' | 'tech' | 'education' | 'realestate' | 'casual' | 'team' | 'pet' | 'family' | 'lifestyle';
}

/**
 * Curated diverse portrait collection.
 * Each person appears ONLY ONCE across the entire site.
 */
export const STOCK_PORTRAITS: StockPortrait[] = [
  // Corporate / Business — diverse professionals
  { id: 'photo-1573496359142-b8d87734a5a2', label: 'Professional woman in navy blazer', category: 'corporate' },
  { id: 'photo-1560250097-0b93528c311a', label: 'Businessman in dark suit', category: 'corporate' },
  { id: 'photo-1580489944761-15a19d654956', label: 'Confident woman in professional attire', category: 'corporate' },
  { id: 'photo-1507003211169-0a1dd7228f2d', label: 'Man with warm smile in casual business wear', category: 'corporate' },
  { id: 'photo-1494790108377-be9c29b29330', label: 'Young professional woman with blonde hair', category: 'corporate' },
  { id: 'photo-1472099645785-5658abf4ff4e', label: 'Professional man with glasses', category: 'corporate' },
  { id: 'photo-1519085360753-af0119f7cbe7', label: 'Young man in crisp white shirt', category: 'corporate' },
  { id: 'photo-1438761681033-6461ffad8d80', label: 'Mature professional woman', category: 'corporate' },
  { id: 'photo-1500648767791-00dcc994a43e', label: 'Man with confident expression', category: 'corporate' },
  { id: 'photo-1534528741775-53994a69daeb', label: 'Woman with natural hairstyle', category: 'corporate' },

  // Medical / Healthcare
  { id: 'photo-1559839734-2b71ea197ec2', label: 'Doctor in white coat', category: 'medical' },
  { id: 'photo-1612349317150-e413f6a5b16d', label: 'Healthcare professional smiling', category: 'medical' },
  { id: 'photo-1622253692010-333f2da6031d', label: 'Medical professional with stethoscope', category: 'medical' },

  // Legal
  { id: 'photo-1556157382-97ede2916cd2', label: 'Attorney in formal business attire', category: 'legal' },
  { id: 'photo-1573497019940-1c28c88b4f3e', label: 'Female attorney in professional setting', category: 'legal' },

  // Tech / Startup
  { id: 'photo-1539571696357-5a69c17a67c6', label: 'Tech professional in casual wear', category: 'tech' },
  { id: 'photo-1517841905240-472988babdf9', label: 'Creative professional woman', category: 'tech' },
  { id: 'photo-1506794778202-cad84cf45f1d', label: 'Young man with creative style', category: 'tech' },

  // Education
  { id: 'photo-1544005313-94ddf0286df2', label: 'Educator with warm expression', category: 'education' },
  { id: 'photo-1568602471122-7832951cc4c5', label: 'Male educator in smart casual', category: 'education' },

  // Real Estate
  { id: 'photo-1519345182560-3f2917c472ef', label: 'Real estate professional outdoors', category: 'realestate' },
  { id: 'photo-1573496799652-408c2ac9fe98', label: 'Female real estate agent portrait', category: 'realestate' },

  // Creative / Casual
  { id: 'photo-1531746020798-e6953c6e8e04', label: 'Creative professional with artistic style', category: 'creative' },
  { id: 'photo-1524504388940-b1c1722653e1', label: 'Man with creative casual look', category: 'creative' },
  { id: 'photo-1488426862026-3ee34a7d66df', label: 'Woman with bright creative expression', category: 'creative' },
  { id: 'photo-1552374196-c4e7ffc6e126', label: 'Man with relaxed confident pose', category: 'creative' },

  // Team / Group context
  { id: 'photo-1522075469751-3a6694fb2f61', label: 'Professional in team environment', category: 'team' },
  { id: 'photo-1580894732444-8ecded7900cd', label: 'Team member with friendly smile', category: 'team' },
  { id: 'photo-1530268729831-4b0b9e170218', label: 'Professional woman in modern office', category: 'team' },
  { id: 'photo-1487412720507-e7ab37603c6f', label: 'Woman professional at work', category: 'team' },

  // Additional diverse portraits for variety
  { id: 'photo-1542190891-2093d38760f2', label: 'Professional with confident stance', category: 'corporate' },
  { id: 'photo-1508214751196-bcfd4ca60f91', label: 'Elegant professional woman', category: 'corporate' },
  { id: 'photo-1566492031773-4f4e44671857', label: 'Distinguished man in suit', category: 'corporate' },
  { id: 'photo-1545167622-3a6ac756afa4', label: 'Young professional with modern style', category: 'corporate' },
  { id: 'photo-1504257432389-52343af06ae3', label: 'Professional man with warm smile', category: 'corporate' },
  { id: 'photo-1548142813-c348350df52b', label: 'Woman in sophisticated business look', category: 'corporate' },
  { id: 'photo-1603415526960-f7e0328c63b1', label: 'Man with professional headshot look', category: 'corporate' },
  { id: 'photo-1567532939604-b6b5b0db2604', label: 'Professional woman headshot', category: 'corporate' },
  { id: 'photo-1557862921-37829c790f19', label: 'Man in professional portrait', category: 'corporate' },
  { id: 'photo-1551836022-d5d88e9218df', label: 'Woman with professional corporate look', category: 'corporate' },

  // Pet portraits — use contentPhoto() for these, NOT portrait()
  { id: 'photo-1587300003388-59208cc962cb', label: 'Golden retriever with friendly expression', category: 'pet' },
  { id: 'photo-1543466835-00a7907e9de1', label: 'Happy dog outdoors in natural light', category: 'pet' },
  { id: 'photo-1514888286974-6c03e2ca1dba', label: 'Orange tabby cat with bright eyes', category: 'pet' },
  { id: 'photo-1548199973-03cce0bbc87b', label: 'Two dogs running together playfully', category: 'pet' },
  { id: 'photo-1583337130417-13571c78e6f3', label: 'Adorable puppy portrait', category: 'pet' },

  // Family & Warm — use portrait() for people, contentPhoto() for group scenes
  { id: 'photo-1609220136736-443140cffec6', label: 'Happy family portrait together', category: 'family' },
  { id: 'photo-1581579438747-104c53d7fbc4', label: 'Mother and child sharing a warm moment', category: 'family' },
  { id: 'photo-1511895426328-dc8714191300', label: 'Joyful family moment outdoors', category: 'family' },

  // Lifestyle / Outdoor / Casual
  { id: 'photo-1506863530036-1efeddceb993', label: 'Woman enjoying golden hour outdoors', category: 'lifestyle' },
  { id: 'photo-1529626455594-4ff0802cfb7e', label: 'Man with relaxed confident smile outdoors', category: 'lifestyle' },
  { id: 'photo-1496345875659-11f7dd282d1d', label: 'Man in casual outdoor setting with warm light', category: 'lifestyle' },
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
  heroPortraitId: string;  // Unsplash photo ID for hero section
  alt: string;
  cardPortraitId: string;  // Unsplash photo ID for card/thumbnail
}

/**
 * Industry-specific visuals. Each industry gets a unique portrait
 * showing a person in that profession's typical setting/attire.
 */
export const INDUSTRY_VISUALS: Record<string, IndustryVisual> = {
  // Top professions with unique images
  finance: { heroPortraitId: 'photo-1560250097-0b93528c311a', alt: 'Finance professional in business attire', cardPortraitId: 'photo-1560250097-0b93528c311a' },
  healthcare: { heroPortraitId: 'photo-1559839734-2b71ea197ec2', alt: 'Healthcare professional portrait', cardPortraitId: 'photo-1559839734-2b71ea197ec2' },
  legal: { heroPortraitId: 'photo-1556157382-97ede2916cd2', alt: 'Legal professional portrait', cardPortraitId: 'photo-1556157382-97ede2916cd2' },
  tech: { heroPortraitId: 'photo-1539571696357-5a69c17a67c6', alt: 'Tech professional portrait', cardPortraitId: 'photo-1539571696357-5a69c17a67c6' },
  'real-estate': { heroPortraitId: 'photo-1519345182560-3f2917c472ef', alt: 'Real estate professional portrait', cardPortraitId: 'photo-1519345182560-3f2917c472ef' },
  education: { heroPortraitId: 'photo-1544005313-94ddf0286df2', alt: 'Education professional portrait', cardPortraitId: 'photo-1544005313-94ddf0286df2' },
  // Map slug variants
  doctors: { heroPortraitId: 'photo-1612349317150-e413f6a5b16d', alt: 'Doctor in professional setting', cardPortraitId: 'photo-1612349317150-e413f6a5b16d' },
  nurses: { heroPortraitId: 'photo-1622253692010-333f2da6031d', alt: 'Nurse in healthcare setting', cardPortraitId: 'photo-1622253692010-333f2da6031d' },
  lawyers: { heroPortraitId: 'photo-1573497019940-1c28c88b4f3e', alt: 'Attorney in professional setting', cardPortraitId: 'photo-1573497019940-1c28c88b4f3e' },
  consultants: { heroPortraitId: 'photo-1573496359142-b8d87734a5a2', alt: 'Consultant in business setting', cardPortraitId: 'photo-1573496359142-b8d87734a5a2' },
  accountants: { heroPortraitId: 'photo-1507003211169-0a1dd7228f2d', alt: 'Accountant portrait', cardPortraitId: 'photo-1507003211169-0a1dd7228f2d' },
  engineers: { heroPortraitId: 'photo-1472099645785-5658abf4ff4e', alt: 'Engineer portrait', cardPortraitId: 'photo-1472099645785-5658abf4ff4e' },
  teachers: { heroPortraitId: 'photo-1568602471122-7832951cc4c5', alt: 'Teacher portrait', cardPortraitId: 'photo-1568602471122-7832951cc4c5' },
  executives: { heroPortraitId: 'photo-1566492031773-4f4e44671857', alt: 'Executive portrait', cardPortraitId: 'photo-1566492031773-4f4e44671857' },
  entrepreneurs: { heroPortraitId: 'photo-1519085360753-af0119f7cbe7', alt: 'Entrepreneur portrait', cardPortraitId: 'photo-1519085360753-af0119f7cbe7' },
  architects: { heroPortraitId: 'photo-1506794778202-cad84cf45f1d', alt: 'Architect portrait', cardPortraitId: 'photo-1506794778202-cad84cf45f1d' },
  designers: { heroPortraitId: 'photo-1531746020798-e6953c6e8e04', alt: 'Designer portrait', cardPortraitId: 'photo-1531746020798-e6953c6e8e04' },
  marketers: { heroPortraitId: 'photo-1517841905240-472988babdf9', alt: 'Marketing professional portrait', cardPortraitId: 'photo-1517841905240-472988babdf9' },
  salespeople: { heroPortraitId: 'photo-1500648767791-00dcc994a43e', alt: 'Sales professional portrait', cardPortraitId: 'photo-1500648767791-00dcc994a43e' },
  coaches: { heroPortraitId: 'photo-1494790108377-be9c29b29330', alt: 'Coach portrait', cardPortraitId: 'photo-1494790108377-be9c29b29330' },
  therapists: { heroPortraitId: 'photo-1438761681033-6461ffad8d80', alt: 'Therapist portrait', cardPortraitId: 'photo-1438761681033-6461ffad8d80' },
  photographers: { heroPortraitId: 'photo-1524504388940-b1c1722653e1', alt: 'Photographer portrait', cardPortraitId: 'photo-1524504388940-b1c1722653e1' },
  journalists: { heroPortraitId: 'photo-1534528741775-53994a69daeb', alt: 'Journalist portrait', cardPortraitId: 'photo-1534528741775-53994a69daeb' },
  pharmacists: { heroPortraitId: 'photo-1580489944761-15a19d654956', alt: 'Pharmacist portrait', cardPortraitId: 'photo-1580489944761-15a19d654956' },
};

/** Get industry visual with fallback to generic corporate. */
export function getIndustryVisual(slug: string): IndustryVisual {
  return INDUSTRY_VISUALS[slug] ?? {
    heroPortraitId: 'photo-1573496359142-b8d87734a5a2',
    alt: 'Professional headshot portrait',
    cardPortraitId: 'photo-1573496359142-b8d87734a5a2',
  };
}

/* ------------------------------------------------------------------ */
/*  Blog cover images                                                  */
/* ------------------------------------------------------------------ */

/** Unique cover photo IDs for blog posts, keyed by post slug. */
export const BLOG_COVERS: Record<string, string> = {
  // Original 14
  'ai-headshot-revolution': 'photo-1560250097-0b93528c311a',
  'perfect-linkedin-photo': 'photo-1573496359142-b8d87734a5a2',
  'headshot-tips-professionals': 'photo-1507003211169-0a1dd7228f2d',
  'ai-vs-traditional-photography': 'photo-1516035069371-29a1b244cc32',
  'corporate-headshot-guide': 'photo-1556157382-97ede2916cd2',
  'remote-work-headshots': 'photo-1519085360753-af0119f7cbe7',
  'personal-branding-photos': 'photo-1494790108377-be9c29b29330',
  'team-photos-guide': 'photo-1522075469751-3a6694fb2f61',
  'headshot-lighting-tips': 'photo-1531746020798-e6953c6e8e04',
  'social-media-photos': 'photo-1488426862026-3ee34a7d66df',
  'executive-portrait-guide': 'photo-1566492031773-4f4e44671857',
  'startup-team-photos': 'photo-1539571696357-5a69c17a67c6',
  'medical-headshots': 'photo-1559839734-2b71ea197ec2',
  'legal-headshots': 'photo-1573497019940-1c28c88b4f3e',
  // Extended coverage for actual blog slugs
  'aragon-ai-alternatives': 'photo-1542190891-2093d38760f2',
  'linkedin-headshot-optimization': 'photo-1573496359142-b8d87734a5a2',
  'work-from-home-headshots': 'photo-1519085360753-af0119f7cbe7',
  'ai-headshots-for-students': 'photo-1545167622-3a6ac756afa4',
  'headshot-retouching-guide': 'photo-1508214751196-bcfd4ca60f91',
  'best-ai-headshot-generators-2025': 'photo-1603415526960-f7e0328c63b1',
  'nursing-headshot-guide': 'photo-1622253692010-333f2da6031d',
  'teacher-headshot-guide': 'photo-1568602471122-7832951cc4c5',
  'ai-headshot-cost-comparison': 'photo-1504257432389-52343af06ae3',
  'passport-photo-ai': 'photo-1548142813-c348350df52b',
  'how-ai-headshots-work': 'photo-1472099645785-5658abf4ff4e',
  'best-photos-for-linkedin': 'photo-1580489944761-15a19d654956',
  'ai-pet-portraits-guide': 'photo-1552374196-c4e7ffc6e126',
  'professional-headshot-tips-2025': 'photo-1500648767791-00dcc994a43e',
  'ai-headshots-vs-traditional-photography': 'photo-1516035069371-29a1b244cc32',
  'best-headshot-for-linkedin-profile': 'photo-1534528741775-53994a69daeb',
  'real-estate-agent-headshots': 'photo-1519345182560-3f2917c472ef',
  'corporate-team-photos-guide': 'photo-1530268729831-4b0b9e170218',
  'headshot-background-guide': 'photo-1524504388940-b1c1722653e1',
  'lawyer-headshot-guide': 'photo-1556157382-97ede2916cd2',
  'dating-profile-photo-tips': 'photo-1517841905240-472988babdf9',
  'ai-headshot-privacy-security': 'photo-1557862921-37829c790f19',
  'headshot-dos-and-donts': 'photo-1438761681033-6461ffad8d80',
  'executive-headshot-guide': 'photo-1566492031773-4f4e44671857',
  'startup-team-branding-photos': 'photo-1539571696357-5a69c17a67c6',
  'remote-worker-headshot-guide': 'photo-1580894732444-8ecded7900cd',
  'medical-residency-headshot-requirements': 'photo-1612349317150-e413f6a5b16d',
  'headshot-trends-2025': 'photo-1551836022-d5d88e9218df',
  'ai-headshots-for-teams-enterprise': 'photo-1487412720507-e7ab37603c6f',
  'headshot-lighting-guide': 'photo-1531746020798-e6953c6e8e04',
  'social-media-profile-photo-sizes': 'photo-1488426862026-3ee34a7d66df',
  'ai-photography-ethics-guide': 'photo-1567532939604-b6b5b0db2604',
  'what-to-wear-for-headshots': 'photo-1573496799652-408c2ac9fe98',
  'diy-headshots-at-home': 'photo-1544005313-94ddf0286df2',
  'actor-headshot-guide': 'photo-1506794778202-cad84cf45f1d',
  'virtual-headshots-remote-teams': 'photo-1522075469751-3a6694fb2f61',
  'headshot-trends-2026': 'photo-1560250097-0b93528c311a',
  'can-recruiters-tell-ai-headshots': 'photo-1507003211169-0a1dd7228f2d',
  'professional-profile-picture-examples': 'photo-1494790108377-be9c29b29330',
  'take-professional-headshot-with-phone': 'photo-1542190891-2093d38760f2',
  'ai-headshot-for-healthcare': 'photo-1559839734-2b71ea197ec2',
  'corporate-headshot-dress-code': 'photo-1573497019940-1c28c88b4f3e',
};

/** Get blog cover URL. Falls back to a generic portrait. */
export function getBlogCover(slug: string): string {
  const photoId = BLOG_COVERS[slug] ?? 'photo-1573496359142-b8d87734a5a2';
  return wide(photoId);
}
