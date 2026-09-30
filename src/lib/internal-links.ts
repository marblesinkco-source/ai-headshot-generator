/**
 * TailorPic - Internal linking utility
 *
 * Produces related-page suggestions for every programmatic page type
 * (blog, industries, styles, use-cases, vs, glossary).
 *
 * Industries, use-cases and vs pages are hardcoded page.tsx files (no config),
 * so they are registered here with topic groups. Blog posts and styles are
 * read from their config files. Relationships are computed from shared
 * topic groups; ties rotate by the current slug so links spread across the
 * whole site instead of always pointing at the same pages.
 *
 * When adding a new industry/use-case/vs page, add it to the registry below.
 */

import { getAllBlogPosts } from '@/config/blog';
import { getAllPhotoStyles, getPhotoStyle } from '@/config/styles';

export interface RelatedLink {
  title: string;
  href: string;
}

const DEFAULT_LIMIT = 4;

// ---------------------------------------------------------------------------
// Registries: [slug, title, topic groups]
// ---------------------------------------------------------------------------

type Entry = readonly [slug: string, title: string, groups: readonly string[]];

const INDUSTRIES: Entry[] = [
  ['accountants', 'Accountants', ['finance', 'professional']],
  ['actors', 'Actors', ['creative', 'media']],
  ['architects', 'Architects', ['creative', 'professional']],
  ['authors', 'Authors', ['media', 'creative']],
  ['barbers', 'Barbers', ['trades', 'beauty']],
  ['bartenders', 'Bartenders', ['trades', 'social']],
  ['chefs', 'Chefs', ['trades', 'creative']],
  ['chiropractors', 'Chiropractors', ['health', 'wellness']],
  ['coaches', 'Coaches', ['coaching', 'wellness']],
  ['consultants', 'Consultants', ['professional', 'coaching']],
  ['data-scientists', 'Data Scientists', ['tech', 'professional']],
  ['dentists', 'Dentists', ['health', 'professional']],
  ['djs', 'DJs', ['media', 'creative']],
  ['doctors', 'Doctors', ['health', 'professional']],
  ['ecommerce', 'E-commerce Sellers', ['business', 'social']],
  ['electricians', 'Electricians', ['trades']],
  ['engineers', 'Engineers', ['tech', 'professional']],
  ['event-planners', 'Event Planners', ['events', 'business']],
  ['executives', 'Executives', ['professional', 'leadership']],
  ['financial-advisors', 'Financial Advisors', ['finance', 'professional']],
  ['firefighters', 'Firefighters', ['public-service']],
  ['fitness-trainers', 'Fitness Trainers', ['wellness', 'social']],
  ['flight-attendants', 'Flight Attendants', ['public-service', 'travel']],
  ['florists', 'Florists', ['trades', 'events']],
  ['graphic-designers', 'Graphic Designers', ['creative', 'tech']],
  ['hr-professionals', 'HR Professionals', ['business', 'professional']],
  ['insurance-agents', 'Insurance Agents', ['finance', 'business']],
  ['interior-designers', 'Interior Designers', ['creative', 'business']],
  ['journalists', 'Journalists', ['media', 'professional']],
  ['lawyers', 'Lawyers', ['legal', 'professional']],
  ['librarians', 'Librarians', ['education', 'public-service']],
  ['life-coaches', 'Life Coaches', ['coaching', 'wellness']],
  ['makeup-artists', 'Makeup Artists', ['beauty', 'creative']],
  ['marketing-professionals', 'Marketing Professionals', ['business', 'media']],
  ['models', 'Models', ['creative', 'beauty', 'media']],
  ['musicians', 'Musicians', ['creative', 'media']],
  ['notaries', 'Notaries', ['legal', 'public-service']],
  ['nurses', 'Nurses', ['health', 'public-service']],
  ['nutritionists', 'Nutritionists', ['health', 'wellness']],
  ['paramedics', 'Paramedics', ['health', 'public-service']],
  ['personal-trainers', 'Personal Trainers', ['wellness', 'social']],
  ['pharmacists', 'Pharmacists', ['health', 'professional']],
  ['photographers', 'Photographers', ['creative', 'media']],
  ['pilots', 'Pilots', ['public-service', 'travel']],
  ['plumbers', 'Plumbers', ['trades']],
  ['podcasters', 'Podcasters', ['media', 'social']],
  ['politicians', 'Politicians', ['public-service', 'leadership']],
  ['professors', 'Professors', ['education', 'professional']],
  ['psychologists', 'Psychologists', ['health', 'wellness']],
  ['public-speakers', 'Public Speakers', ['events', 'leadership', 'media']],
  ['real-estate-brokers', 'Real Estate Brokers', ['real-estate', 'business']],
  ['real-estate', 'Real Estate Agents', ['real-estate', 'business']],
  ['recruiters', 'Recruiters', ['business', 'professional']],
  ['sales-professionals', 'Sales Professionals', ['business', 'professional']],
  ['scientists', 'Scientists', ['education', 'tech']],
  ['security-guards', 'Security Guards', ['public-service']],
  ['social-workers', 'Social Workers', ['health', 'public-service']],
  ['tattoo-artists', 'Tattoo Artists', ['creative', 'beauty']],
  ['teachers', 'Teachers', ['education', 'public-service']],
  ['therapists', 'Therapists', ['health', 'wellness']],
  ['tour-guides', 'Tour Guides', ['travel', 'social']],
  ['translators', 'Translators', ['media', 'professional']],
  ['veterinarians', 'Veterinarians', ['health', 'professional']],
  ['yoga-instructors', 'Yoga Instructors', ['wellness', 'social']],
];

const USE_CASES: Entry[] = [
  ['alumni-directory', 'Alumni Directory Photos', ['directory', 'education']],
  ['annual-report', 'Annual Report Photos', ['business', 'leadership', 'professional']],
  ['author-bio', 'Author Bio Photos', ['media', 'creative']],
  ['award-nomination', 'Award Nomination Photos', ['professional', 'events']],
  ['book-cover', 'Book Cover Author Photos', ['media', 'creative']],
  ['business-card', 'Business Card Photos', ['business', 'professional']],
  ['church-directory', 'Church Directory Photos', ['directory', 'public-service']],
  ['coaching-profile', 'Coaching Profile Photos', ['coaching', 'wellness']],
  ['company-intranet', 'Company Intranet Photos', ['directory', 'business']],
  ['company-newsletter', 'Company Newsletter Photos', ['business', 'media']],
  ['conference-speaker', 'Conference Speaker Photos', ['events', 'leadership', 'media']],
  ['corporate-teams', 'Corporate Team Photos', ['business', 'professional', 'leadership']],
  ['crowdfunding-campaign', 'Crowdfunding Campaign Photos', ['business', 'social']],
  ['dating-apps', 'Dating App Photos', ['personal', 'social']],
  ['dating-profile-photo', 'Dating Profile Photos', ['personal', 'social']],
  ['discord', 'Discord Profile Photos', ['social', 'tech']],
  ['email-signature', 'Email Signature Photos', ['business', 'professional']],
  ['event-badge', 'Event Badge Photos', ['events', 'directory']],
  ['facebook', 'Facebook Profile Photos', ['social']],
  ['github', 'GitHub Profile Photos', ['tech', 'social']],
  ['government-id-photo', 'Government ID Photos', ['official', 'public-service']],
  ['graduation-photo', 'Graduation Photos', ['education', 'personal']],
  ['instagram', 'Instagram Profile Photos', ['social', 'creative']],
  ['investor-pitch', 'Investor Pitch Photos', ['business', 'leadership', 'finance']],
  ['job-application', 'Job Application Photos', ['professional', 'business']],
  ['linkedin', 'LinkedIn Profile Photos', ['professional', 'social', 'business']],
  ['magazine-feature', 'Magazine Feature Photos', ['media', 'creative']],
  ['medical-staff-directory', 'Medical Staff Directory Photos', ['directory', 'health']],
  ['membership-directory', 'Membership Directory Photos', ['directory']],
  ['mentorship-profile', 'Mentorship Profile Photos', ['coaching', 'education']],
  ['microsoft-teams', 'Microsoft Teams Profile Photos', ['business', 'tech']],
  ['newsletter', 'Newsletter Author Photos', ['media', 'business']],
  ['nonprofit-fundraising', 'Nonprofit Fundraising Photos', ['public-service', 'social']],
  ['online-course', 'Online Course Instructor Photos', ['education', 'media', 'coaching']],
  ['personal-branding', 'Personal Branding Photos', ['professional', 'creative', 'social']],
  ['podcast-cover', 'Podcast Cover Photos', ['media', 'creative']],
  ['podcast-guest-bio', 'Podcast Guest Bio Photos', ['media', 'events']],
  ['portfolio-website', 'Portfolio Website Photos', ['creative', 'professional']],
  ['press-kit', 'Press Kit Photos', ['media', 'professional']],
  ['professional-directory', 'Professional Directory Photos', ['directory', 'professional']],
  ['real-estate-listing', 'Real Estate Listing Photos', ['real-estate', 'business']],
  ['resume', 'Resume Photos', ['professional', 'business']],
  ['sales-deck', 'Sales Deck Photos', ['business', 'professional']],
  ['school-yearbook', 'School Yearbook Photos', ['education', 'directory', 'personal']],
  ['slack', 'Slack Profile Photos', ['business', 'tech']],
  ['social-media', 'Social Media Profile Photos', ['social', 'creative']],
  ['speaking-engagement', 'Speaking Engagement Photos', ['events', 'leadership']],
  ['sports-team-roster', 'Sports Team Roster Photos', ['directory', 'wellness']],
  ['tiktok', 'TikTok Profile Photos', ['social', 'creative']],
  ['twitter', 'X (Twitter) Profile Photos', ['social', 'media']],
  ['upwork-fiverr', 'Upwork and Fiverr Photos', ['business', 'professional']],
  ['visa-application', 'Visa Application Photos', ['official', 'travel']],
  ['volunteer-directory', 'Volunteer Directory Photos', ['directory', 'public-service']],
  ['website-team-page', 'Website Team Page Photos', ['business', 'directory', 'professional']],
  ['wedding-guest', 'Wedding Guest Photos', ['events', 'personal']],
  ['whatsapp', 'WhatsApp Profile Photos', ['social', 'personal']],
  ['youtube', 'YouTube Channel Photos', ['media', 'social']],
  ['zoom', 'Zoom Profile Photos', ['business', 'tech']],
];

/** groups: 'headshot' = AI headshot service, 'editor' = photo editor, 'generator' = general image AI, 'fun' = filters/stylizers */
const VS_PAGES: Entry[] = [
  ['adobe-firefly', 'Adobe Firefly', ['generator', 'editor']],
  ['ai-headshot-generator', 'AI Headshot Generator', ['headshot']],
  ['aiphotoshoot', 'AI Photoshoot', ['headshot']],
  ['aishots', 'AIShots', ['headshot']],
  ['aragon', 'Aragon AI', ['headshot']],
  ['artbreeder', 'Artbreeder', ['generator', 'fun']],
  ['befunky', 'BeFunky', ['editor']],
  ['betterpic', 'BetterPic', ['headshot']],
  ['canva-ai', 'Canva AI', ['editor', 'generator']],
  ['chatgpt-image', 'ChatGPT Image', ['generator']],
  ['clipdrop', 'Clipdrop', ['editor', 'generator']],
  ['copilot-designer', 'Copilot Designer', ['generator']],
  ['craiyon', 'Craiyon', ['generator']],
  ['dall-e', 'DALL-E', ['generator']],
  ['deepart', 'DeepArt', ['fun']],
  ['dreamwave', 'Dreamwave', ['headshot']],
  ['epik-ai', 'Epik AI', ['headshot', 'fun']],
  ['faceapp', 'FaceApp', ['fun', 'editor']],
  ['facetune', 'Facetune', ['editor', 'fun']],
  ['facetune2', 'Facetune 2', ['editor', 'fun']],
  ['fotor-ai-headshot', 'Fotor AI Headshot', ['headshot', 'editor']],
  ['fotor', 'Fotor', ['editor']],
  ['headmagic', 'HeadMagic', ['headshot']],
  ['headphotopro', 'HeadPhotoPro', ['headshot']],
  ['headpix', 'Headpix', ['headshot']],
  ['headshot-ai', 'Headshot AI', ['headshot']],
  ['headshotpro', 'HeadshotPro', ['headshot']],
  ['headshotsbyai', 'Headshots by AI', ['headshot']],
  ['hotpot-ai', 'Hotpot AI', ['generator', 'editor']],
  ['icon8-ai', 'Icons8 AI', ['generator', 'editor']],
  ['imagine-ai', 'Imagine AI', ['generator']],
  ['imglarger', 'Imglarger', ['editor']],
  ['instaheadshots', 'InstaHeadshots', ['headshot']],
  ['kapwing', 'Kapwing', ['editor']],
  ['lensa', 'Lensa', ['fun', 'editor']],
  ['leonardo-ai', 'Leonardo AI', ['generator']],
  ['lightroom', 'Adobe Lightroom', ['editor']],
  ['luminar-ai', 'Luminar AI', ['editor']],
  ['magicshot', 'MagicShot', ['headshot']],
  ['meitu', 'Meitu', ['fun', 'editor']],
  ['midjourney', 'Midjourney', ['generator']],
  ['myheadshots-ai', 'MyHeadshots AI', ['headshot']],
  ['neural-love', 'Neural Love', ['generator', 'editor']],
  ['nightcafe', 'NightCafe', ['generator', 'fun']],
  ['passport-photo-ai', 'Passport Photo AI', ['headshot', 'official']],
  ['pfpmaker', 'PFPMaker', ['headshot', 'fun']],
  ['photoai', 'Photo AI', ['headshot']],
  ['photodirector', 'PhotoDirector', ['editor']],
  ['photolab', 'PhotoLab', ['fun', 'editor']],
  ['photomatic', 'Photomatic', ['editor']],
  ['photoroom', 'PhotoRoom', ['editor']],
  ['photoshop', 'Adobe Photoshop', ['editor']],
  ['picofme', 'Pic of Me', ['headshot']],
  ['picsart', 'Picsart', ['editor', 'fun']],
  ['pictura', 'Pictura', ['headshot']],
  ['pixar-style', 'Pixar Style Generators', ['fun', 'generator']],
  ['pixelcut', 'Pixelcut', ['editor']],
  ['pixlr', 'Pixlr', ['editor']],
  ['portret', 'Portret', ['headshot']],
  ['prequel-app', 'Prequel', ['fun', 'editor']],
  ['prisma-app', 'Prisma', ['fun']],
  ['profilepicture-ai', 'ProfilePicture AI', ['headshot']],
  ['profilephoto', 'ProfilePhoto', ['headshot']],
  ['prophotos-ai', 'ProPhotos AI', ['headshot']],
  ['reface-ai', 'Reface', ['fun']],
  ['remini', 'Remini', ['editor', 'fun']],
  ['remove-bg', 'Remove.bg', ['editor']],
  ['runway-ml', 'Runway ML', ['generator']],
  ['secta', 'Secta AI', ['headshot']],
  ['snapheadshots', 'SnapHeadshots', ['headshot']],
  ['snapseed', 'Snapseed', ['editor']],
  ['stable-diffusion', 'Stable Diffusion', ['generator']],
  ['studio-shot', 'Studio Shot', ['headshot']],
  ['supawork-ai', 'Supawork AI', ['headshot', 'editor']],
  ['the-multiverse-ai', 'The Multiverse AI', ['headshot']],
  ['topaz-ai', 'Topaz AI', ['editor']],
  ['tryitonai', 'TryItOn AI', ['headshot']],
  ['vivid-headshots', 'Vivid Headshots', ['headshot']],
  ['wondershare-ai', 'Wondershare AI', ['editor', 'generator']],
  ['youcan-ai', 'YouCan AI', ['generator', 'editor']],
];

/** Glossary terms live on a single page (/glossary); [slug, term, groups]. */
const GLOSSARY: Entry[] = [
  ['aspect-ratio', 'Aspect Ratio', ['framing']],
  ['ai-headshot', 'AI Headshot', ['ai', 'headshot']],
  ['ai-training-data', 'AI Training Data', ['ai', 'privacy']],
  ['background-removal', 'Background Removal', ['background', 'editing']],
  ['batch-processing', 'Batch Processing', ['team']],
  ['bokeh', 'Bokeh', ['background']],
  ['broad-lighting', 'Broad Lighting', ['lighting']],
  ['butterfly-lighting', 'Butterfly Lighting', ['lighting']],
  ['catch-light', 'Catch Light', ['lighting']],
  ['clamshell-lighting', 'Clamshell Lighting', ['lighting']],
  ['color-temperature', 'Color Temperature', ['lighting', 'editing']],
  ['rim-lighting', 'Rim Lighting', ['lighting']],
  ['color-grading', 'Color Grading', ['editing', 'style']],
  ['compositing', 'Compositing', ['background']],
  ['crop-framing', 'Crop / Framing', ['framing']],
  ['diffusion-model', 'Diffusion Model', ['ai']],
  ['dpi-ppi', 'DPI / PPI', ['resolution']],
  ['face-detection', 'Face Detection', ['ai']],
  ['facial-recognition', 'Facial Recognition', ['ai', 'privacy']],
  ['feathering', 'Feathering', ['background', 'editing']],
  ['fill-light', 'Fill Light', ['lighting']],
  ['fine-tuning', 'Fine-tuning', ['ai']],
  ['gaussian-blur', 'Gaussian Blur', ['background']],
  ['golden-hour', 'Golden Hour', ['lighting']],
  ['headshot', 'Headshot', ['headshot']],
  ['high-dynamic-range-hdr', 'High Dynamic Range (HDR)', ['lighting']],
  ['image-generation', 'Image Generation', ['ai']],
  ['image-upscaling', 'Image Upscaling', ['resolution', 'editing']],
  ['image-resolution', 'Image Resolution', ['resolution']],
  ['key-light', 'Key Light', ['lighting']],
  ['latent-space', 'Latent Space', ['ai']],
  ['loop-lighting', 'Loop Lighting', ['lighting']],
  ['lora', 'LoRA', ['ai']],
  ['lora-fine-tuning', 'LoRA Fine-Tuning', ['ai']],
  ['natural-lighting', 'Natural Lighting', ['lighting']],
  ['noise-reduction', 'Noise Reduction', ['resolution', 'editing']],
  ['photo-editing', 'Photo Editing', ['editing']],
  ['portrait-photography', 'Portrait Photography', ['ai', 'framing', 'style']],
  ['posing', 'Posing', ['framing', 'style']],
  ['prompt', 'Prompt', ['ai']],
  ['raw-vs-jpeg', 'RAW vs JPEG', ['resolution']],
  ['rembrandt-lighting', 'Rembrandt Lighting', ['lighting']],
  ['resolution', 'Resolution', ['resolution']],
  ['retouching', 'Retouching', ['editing']],
  ['skin-retouching', 'Skin Retouching', ['editing']],
  ['split-lighting', 'Split Lighting', ['lighting']],
  ['studio-lighting', 'Studio Lighting', ['lighting']],
  ['tethered-shooting', 'Tethered Shooting', ['framing']],
  ['three-point-lighting', 'Three-Point Lighting', ['lighting']],
  ['vignette', 'Vignette', ['lighting', 'style']],
  ['upscaling', 'Upscaling', ['resolution', 'editing']],
  ['depth-of-field', 'Depth of Field', ['framing', 'background']],
  ['exposure', 'Exposure', ['lighting']],
  ['focal-length', 'Focal Length', ['framing']],
  ['image-metadata', 'Image Metadata', ['editing', 'privacy']],
  ['white-balance', 'White Balance', ['lighting']],
  ['ambient-light', 'Ambient Light', ['lighting']],
  ['lens-flare', 'Lens Flare', ['lighting']],
  ['rule-of-thirds', 'Rule of Thirds', ['framing']],
  ['dynamic-range', 'Dynamic Range', ['lighting']],
  ['framing', 'Framing', ['framing']],
  ['softbox', 'Softbox', ['lighting']],
];

// Cross-type bridge: which groups of one registry are relevant to another.
// Used so e.g. "health" industries map to "health" use-cases while
// "headshot" vs pages map to business/professional use-cases.
const VS_TO_TOPICS: Record<string, string[]> = {
  headshot: ['professional', 'business'],
  editor: ['social', 'creative'],
  generator: ['creative', 'media'],
  fun: ['social', 'personal'],
  official: ['official'],
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function groupsOf(entries: Entry[], slug: string): readonly string[] {
  return entries.find((e) => e[0] === slug)?.[2] ?? [];
}

function overlap(a: readonly string[], b: readonly string[]): number {
  let n = 0;
  for (const g of a) if (b.includes(g)) n++;
  return n;
}

/**
 * Rank candidates by score desc, then by a slug-seeded rotation so different
 * pages surface different neighbours. Zero-score items fill remaining slots.
 */
function rank<T extends { key: string; score: number }>(
  items: T[],
  seed: string,
  limit: number
): T[] {
  return items
    .map((it) => ({ it, tie: hash(seed + '|' + it.key) }))
    .sort((a, b) => b.it.score - a.it.score || a.tie - b.tie)
    .slice(0, Math.max(0, limit))
    .map((x) => x.it);
}

function fromRegistry(
  entries: Entry[],
  basePath: string,
  currentSlug: string,
  wanted: readonly string[],
  limit: number,
  suffix = ''
): RelatedLink[] {
  const candidates = entries
    .filter((e) => e[0] !== currentSlug)
    .map((e) => ({
      key: e[0],
      title: e[1] + suffix,
      href: `${basePath}/${e[0]}`,
      score: overlap(e[2], wanted),
    }));
  return rank(candidates, currentSlug, limit).map(({ title, href }) => ({ title, href }));
}

/** Topic groups describing the page that is currently being viewed. */
function contextGroups(currentSlug: string): readonly string[] {
  const direct = [
    ...groupsOf(INDUSTRIES, currentSlug),
    ...groupsOf(USE_CASES, currentSlug),
    ...groupsOf(GLOSSARY, currentSlug),
  ];
  const vs = groupsOf(VS_PAGES, currentSlug).flatMap((g) => VS_TO_TOPICS[g] ?? []);
  return [...direct, ...vs];
}

const STYLE_CATEGORIES: Record<string, string[]> = {
  professional: [
    'corporate', 'executive', 'business-casual', 'professional-linkedin', 'corporate-formal',
    'corporate-team', 'studio-classic', 'headshot-close-up', 'startup-founder', 'tech-startup',
    'minimalist', 'black-and-white-classic', 'gradient-backdrop',
  ],
  natural: [
    'natural-light', 'outdoor', 'warm-golden', 'environmental', 'natural-bokeh', 'rustic-outdoor',
    'sunset-golden', 'casual', 'warm-portrait', 'soft-focus', 'pastel-soft', 'tropical',
    'cottagecore', 'bohemian',
  ],
  editorial: [
    'editorial', 'fashion-editorial', 'magazine-cover', 'glamour', 'old-money', 'black-tie',
    'high-contrast', 'bold-color', 'urban-street', 'creative', 'industrial',
  ],
  retro: [
    'vintage', 'film-noir', 'noir-detective', 'monochrome', 'art-deco', 'renaissance',
    'yearbook', 'marble-bust', 'cinematic', 'dark-moody',
  ],
  stylized: [
    'neon-glow', 'pop-art', 'watercolor', 'cyberpunk', 'glass-morphism', 'vaporwave',
    'anime-portrait', 'holographic', 'grunge',
  ],
};

function styleCategoryOf(slug: string): string | undefined {
  return Object.keys(STYLE_CATEGORIES).find((c) => STYLE_CATEGORIES[c].includes(slug));
}

// Which style categories suit which topic groups.
const TOPIC_TO_STYLE_CATEGORY: Record<string, string[]> = {
  professional: ['professional'],
  business: ['professional'],
  leadership: ['professional'],
  finance: ['professional'],
  legal: ['professional'],
  health: ['professional', 'natural'],
  education: ['professional', 'natural'],
  tech: ['professional'],
  coaching: ['natural', 'professional'],
  wellness: ['natural'],
  directory: ['professional'],
  official: ['professional'],
  creative: ['editorial', 'stylized'],
  media: ['editorial'],
  beauty: ['editorial'],
  social: ['natural', 'editorial'],
  personal: ['natural', 'retro'],
  events: ['editorial', 'professional'],
  trades: ['natural'],
  'public-service': ['professional'],
  travel: ['natural'],
  'real-estate': ['professional', 'natural'],
};

function styleCategoriesFor(groups: readonly string[]): string[] {
  const out: string[] = [];
  for (const g of groups) for (const c of TOPIC_TO_STYLE_CATEGORY[g] ?? []) if (!out.includes(c)) out.push(c);
  return out;
}

function styleLink(slug: string, name: string): RelatedLink {
  return { title: name, href: `/styles/${slug}` };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Blog posts sharing the most tags with the current post (case-insensitive).
 * Posts with no shared tags are used only to fill remaining slots, newest first.
 */
export function getRelatedBlogPosts(
  tags: string[],
  currentSlug: string,
  limit: number = DEFAULT_LIMIT
): RelatedLink[] {
  const wanted = new Set(tags.map((t) => t.toLowerCase()));
  const posts = getAllBlogPosts().filter((p) => p.slug !== currentSlug);
  const scored = posts.map((p) => ({
    p,
    score: p.tags.reduce((n, t) => n + (wanted.has(t.toLowerCase()) ? 1 : 0), 0),
  }));
  scored.sort(
    (a, b) =>
      b.score - a.score ||
      new Date(b.p.updatedAt || b.p.publishedAt).getTime() -
        new Date(a.p.updatedAt || a.p.publishedAt).getTime()
  );
  return scored
    .slice(0, Math.max(0, limit))
    .map(({ p }) => ({ title: p.title, href: `/blog/${p.slug}` }));
}

/** Industry pages related to the current page (industry, use-case or vs slug). */
export function getRelatedIndustries(
  currentSlug: string,
  limit: number = DEFAULT_LIMIT
): RelatedLink[] {
  return fromRegistry(
    INDUSTRIES,
    '/industries',
    currentSlug,
    contextGroups(currentSlug),
    limit,
    ' Headshots'
  );
}

/**
 * Style pages related to the current page. For a style slug: same category
 * first, then styles that list it in relatedBlogPosts neighbours. For any
 * other slug: styles in categories that suit the page's topics.
 */
export function getRelatedStyles(
  currentSlug: string,
  limit: number = DEFAULT_LIMIT
): RelatedLink[] {
  const all = getAllPhotoStyles().filter((s) => s.slug !== currentSlug);
  const current = getPhotoStyle(currentSlug);
  const ownCategory = styleCategoryOf(currentSlug);
  const wantedCats = current
    ? ownCategory
      ? [ownCategory]
      : []
    : styleCategoriesFor(contextGroups(currentSlug));

  const candidates = all.map((s) => {
    let score = 0;
    const cat = styleCategoryOf(s.slug);
    if (cat && wantedCats.includes(cat)) score += 2 + (wantedCats.length - wantedCats.indexOf(cat)) * 0.1;
    if (current) {
      score += overlap(s.relatedBlogPosts, current.relatedBlogPosts);
      score += overlap(s.relatedCategories, current.relatedCategories) * 0.5;
    }
    return { key: s.slug, score, name: s.name, slug: s.slug };
  });
  return rank(candidates, currentSlug, limit).map((c) => styleLink(c.slug, c.name));
}

/** Use-case pages related to the current page (industry, vs, glossary or use-case slug). */
export function getRelatedUseCases(
  currentSlug: string,
  limit: number = DEFAULT_LIMIT
): RelatedLink[] {
  return fromRegistry(USE_CASES, '/use-cases', currentSlug, contextGroups(currentSlug), limit);
}

/**
 * Comparison pages. For a vs slug: same kind of competitor first. For other
 * pages: headshot-service comparisons (most relevant to buyers) first.
 */
export function getRelatedVsPages(
  currentSlug: string,
  limit: number = DEFAULT_LIMIT
): RelatedLink[] {
  const own = groupsOf(VS_PAGES, currentSlug);
  const wanted = own.length ? own : ['headshot'];
  return fromRegistry(VS_PAGES, '/vs', currentSlug, wanted, limit, ' vs TailorPic');
}

/**
 * Glossary terms related to the current page. All terms live on /glossary, so
 * hrefs are anchors (/glossary#term-slug); the page falls back to the top of
 * /glossary if an anchor id is not present.
 */
export function getRelatedGlossaryTerms(
  currentSlug: string,
  limit: number = DEFAULT_LIMIT
): RelatedLink[] {
  const own = groupsOf(GLOSSARY, currentSlug);
  let wanted: readonly string[] = own;
  if (!own.length) {
    const ctx = contextGroups(currentSlug);
    wanted = ['ai', 'headshot'];
    if (ctx.some((g) => ['creative', 'media', 'beauty'].includes(g))) wanted = [...wanted, 'lighting', 'style'];
    if (ctx.some((g) => ['business', 'directory', 'professional'].includes(g))) wanted = [...wanted, 'team', 'background'];
    const cat = styleCategoryOf(currentSlug);
    if (cat) wanted = [...wanted, 'lighting', 'style', 'editing'];
  }
  const candidates = GLOSSARY.filter((e) => e[0] !== currentSlug).map((e) => ({
    key: e[0],
    title: e[1],
    href: `/glossary#${e[0]}`,
    score: overlap(e[2], wanted),
  }));
  return rank(candidates, currentSlug, limit).map(({ title, href }) => ({ title, href }));
}
