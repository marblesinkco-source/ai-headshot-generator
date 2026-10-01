/**
 * TailorPic - Multi-Category AI Photo Platform
 * Category configuration for all 11 product categories
 */

export type CategoryId =
  | 'headshots'
  | 'dating'
  | 'pet-portraits'
  | 'linkedin-team'
  | 'baby-shower'
  | 'graduation'
  | 'holiday-cards'
  | 'family-portraits'
  | 'couple-engagement'
  | 'real-estate'
  | 'ecommerce-product';

export interface CategoryPackage {
  id: string;
  name: string;
  price: number; // cents
  currency: string;
  outputCount: number;
  features: string[];
  recommended?: boolean;
}

export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  description: string;
  tagline: string;
  icon: string; // emoji
  color: string; // tailwind color class
  gradient: string; // tailwind gradient
  uploadInstructions: string;
  minPhotos: number;
  maxPhotos: number;
  outputLabel: string; // "headshots", "portraits", "photos", etc.
  packages: CategoryPackage[];
  promptTemplate: string;
  negativePrompt: string;
  seoTitle: string;
  seoDescription: string;
  slug: string;
  active: boolean;
}

export const CATEGORIES: Record<CategoryId, Category> = {
  headshots: {
    id: 'headshots',
    name: 'Professional Headshots',
    shortName: 'Headshots',
    description: 'AI-powered professional headshots for LinkedIn, resumes, and corporate profiles.',
    tagline: 'Studio-quality headshots in minutes, not hours',
    icon: '👔',
    color: 'blue',
    gradient: 'from-blue-600 to-blue-800',
    uploadInstructions: 'Upload 4-10 clear photos of yourself. Include different angles and expressions for best results.',
    minPhotos: 4,
    maxPhotos: 10,
    outputLabel: 'headshots',
    packages: [
      {
        id: 'headshots-express',
        name: 'Express',
        price: 990,
        currency: 'usd',
        outputCount: 5,
        features: ['1 background', '1 style', 'HD resolution', '24-hour delivery'],
      },
      {
        id: 'headshots-starter',
        name: 'Starter',
        price: 2900,
        currency: 'usd',
        outputCount: 40,
        features: ['5 backgrounds', '3 styles', 'Standard resolution'],
      },
      {
        id: 'headshots-professional',
        name: 'Professional',
        price: 4900,
        currency: 'usd',
        outputCount: 80,
        features: ['10 backgrounds', '6 styles', 'HD resolution', 'LinkedIn banner'],
        recommended: true,
      },
      {
        id: 'headshots-executive',
        name: 'Executive',
        price: 7900,
        currency: 'usd',
        outputCount: 140,
        features: ['15 backgrounds', '10 styles', '4K resolution', 'LinkedIn banner', 'Email signature', 'Priority support'],
      },
    ],
    promptTemplate: 'A professional headshot portrait photograph of a person. {style_prompt}. Set against a {background_prompt}. Sharp focus on the face, professional studio-quality lighting, natural skin tone. Shot with an 85mm lens at f/2.8.',
    negativePrompt: 'deformed, distorted, disfigured, poorly drawn face, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, mutated hands, extra fingers, blurry, low quality, watermark, text, logo, cartoon, 3d render, anime, illustration',
    seoTitle: 'AI Professional Headshots | TailorPic',
    seoDescription: 'Get studio-quality professional headshots powered by AI. Perfect for LinkedIn, resumes, and corporate profiles. Ready in minutes.',
    slug: 'headshots',
    active: true,
  },

  dating: {
    id: 'dating',
    name: 'Dating Profile Photos',
    shortName: 'Dating Photos',
    description: 'Stand out on dating apps with natural, attractive photos that show the real you.',
    tagline: 'Get more matches with photos that truly represent you',
    icon: '💝',
    color: 'pink',
    gradient: 'from-pink-500 to-rose-600',
    uploadInstructions: 'Upload 5-10 casual, clear photos of yourself. Include full body shots and close-ups with natural expressions.',
    minPhotos: 5,
    maxPhotos: 10,
    outputLabel: 'photos',
    packages: [
      {
        id: 'dating-express',
        name: 'Express',
        price: 990,
        currency: 'usd',
        outputCount: 5,
        features: ['1 scene style', 'Natural lighting', 'HD resolution', '24-hour delivery'],
      },
      {
        id: 'dating-basic',
        name: 'Basic',
        price: 1900,
        currency: 'usd',
        outputCount: 20,
        features: ['5 scene styles', 'Natural lighting', 'Standard resolution'],
      },
      {
        id: 'dating-popular',
        name: 'Popular',
        price: 3900,
        currency: 'usd',
        outputCount: 50,
        features: ['10 scene styles', 'Golden hour lighting', 'HD resolution', 'Travel backgrounds'],
        recommended: true,
      },
      {
        id: 'dating-premium',
        name: 'Premium',
        price: 5900,
        currency: 'usd',
        outputCount: 100,
        features: ['15 scene styles', 'All lighting options', '4K resolution', 'Activity photos', 'Full body shots'],
      },
    ],
    promptTemplate: 'A natural, candid-looking photograph of a person in a {scene_prompt}. {style_prompt}. Warm, inviting expression. Natural lighting, shot with a 50mm lens at f/1.8 for pleasant bokeh.',
    negativePrompt: 'deformed, distorted, disfigured, poorly drawn face, bad anatomy, blurry, low quality, watermark, text, logo, cartoon, 3d render, anime, illustration, overly posed, stiff, unnatural',
    seoTitle: 'AI Dating Profile Photos | TailorPic',
    seoDescription: 'Get more matches with AI-enhanced dating profile photos. Natural, attractive photos for Tinder, Bumble, Hinge and more. Backed by a 14-day money-back guarantee.',
    slug: 'dating-photos',
    active: true,
  },

  'pet-portraits': {
    id: 'pet-portraits',
    name: 'Pet Portraits',
    shortName: 'Pet Portraits',
    description: 'Transform your pet photos into stunning artistic portraits, from royal styles to pop art.',
    tagline: 'Turn your furry friend into a work of art',
    icon: '🐾',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600',
    uploadInstructions: 'Upload 5-10 clear photos of your pet. Include different angles, ensure good lighting, and show the full face.',
    minPhotos: 5,
    maxPhotos: 10,
    outputLabel: 'portraits',
    packages: [
      {
        id: 'pet-express',
        name: 'Express',
        price: 990,
        currency: 'usd',
        outputCount: 5,
        features: ['1 art style', 'Digital delivery', 'HD resolution', 'Try before you commit'],
      },
      {
        id: 'pet-basic',
        name: 'Basic',
        price: 1900,
        currency: 'usd',
        outputCount: 15,
        features: ['5 art styles', 'Digital delivery', 'Standard resolution'],
      },
      {
        id: 'pet-popular',
        name: 'Popular',
        price: 3400,
        currency: 'usd',
        outputCount: 30,
        features: ['10 art styles', 'HD resolution', 'Royal & Renaissance styles'],
        recommended: true,
      },
      {
        id: 'pet-premium',
        name: 'Premium',
        price: 5400,
        currency: 'usd',
        outputCount: 50,
        features: ['All art styles', '4K resolution', 'Custom backgrounds', 'Multi-pet compositions'],
      },
    ],
    promptTemplate: 'A {style_prompt} portrait of a pet. {background_prompt}. Detailed fur texture, expressive eyes, high quality artistic rendering.',
    negativePrompt: 'deformed, distorted, extra limbs, blurry, low quality, watermark, text, logo, human features on animal, uncanny valley',
    seoTitle: 'AI Pet Portraits | TailorPic',
    seoDescription: 'Transform your pet into stunning art with AI pet portraits. Royal, Renaissance, pop art and more styles available. Backed by a 14-day money-back guarantee.',
    slug: 'pet-portraits',
    active: true,
  },

  'linkedin-team': {
    id: 'linkedin-team',
    name: 'LinkedIn & Corporate Team Photos',
    shortName: 'Team Photos',
    description: 'Unified, professional team headshots with consistent style for your entire organization.',
    tagline: 'Consistent team branding, one member at a time',
    icon: '🏢',
    color: 'indigo',
    gradient: 'from-indigo-600 to-indigo-800',
    uploadInstructions: 'Upload 4-8 clear photos per team member. Ensure good lighting and natural expressions.',
    minPhotos: 4,
    maxPhotos: 8,
    outputLabel: 'headshots',
    packages: [
      {
        id: 'team-small',
        name: 'Small Team (5)',
        price: 9900,
        currency: 'usd',
        outputCount: 200,
        features: ['Up to 5 members', '~$19/person', '40 headshots each', 'Consistent style', 'HD resolution'],
      },
      {
        id: 'team-medium',
        name: 'Medium Team (15)',
        price: 24900,
        currency: 'usd',
        outputCount: 600,
        features: ['Up to 15 members', '~$16/person', '40 headshots each', 'Brand color matching', '4K resolution'],
        recommended: true,
      },
      {
        id: 'team-large',
        name: 'Large Team (50)',
        price: 59900,
        currency: 'usd',
        outputCount: 2000,
        features: ['Up to 50 members', '~$12/person', '40 headshots each', 'Brand kit integration', '4K resolution', 'Account manager'],
      },
    ],
    promptTemplate: 'A professional corporate headshot photograph with consistent {background_prompt}. {style_prompt}. Uniform lighting, matching color tone and style across all portraits.',
    negativePrompt: 'deformed, distorted, disfigured, poorly drawn face, bad anatomy, blurry, low quality, watermark, text, logo, cartoon, 3d render, inconsistent lighting',
    seoTitle: 'AI Corporate Team Headshots | TailorPic',
    seoDescription: 'Professional, consistent team headshots powered by AI. Perfect for LinkedIn company pages, websites, and marketing. Backed by a 14-day money-back guarantee.',
    slug: 'team-headshots',
    active: true,
  },

  'baby-shower': {
    id: 'baby-shower',
    name: 'Baby Shower Invitations',
    shortName: 'Baby Shower',
    description: 'Beautiful, personalized digital baby shower invitation designs with AI-generated artwork.',
    tagline: 'Celebrate with custom AI-designed invitations',
    icon: '🍼',
    color: 'sky',
    gradient: 'from-sky-400 to-pink-400',
    uploadInstructions: 'Upload 1-3 photos of the parents-to-be. Include any theme preferences or color schemes.',
    minPhotos: 1,
    maxPhotos: 3,
    outputLabel: 'designs',
    packages: [
      {
        id: 'babyshower-express',
        name: 'Express',
        price: 990,
        currency: 'usd',
        outputCount: 5,
        features: ['1 design theme', 'Digital download', 'HD resolution', '24-hour delivery'],
      },
      {
        id: 'babyshower-basic',
        name: 'Basic',
        price: 1400,
        currency: 'usd',
        outputCount: 10,
        features: ['5 design themes', 'Digital download', 'Standard resolution'],
      },
      {
        id: 'babyshower-popular',
        name: 'Popular',
        price: 2400,
        currency: 'usd',
        outputCount: 20,
        features: ['10 design themes', 'HD resolution', 'Thank you cards', 'Editable text'],
        recommended: true,
      },
      {
        id: 'babyshower-premium',
        name: 'Premium',
        price: 3900,
        currency: 'usd',
        outputCount: 40,
        features: ['All themes', '4K resolution', 'Complete stationery set', 'Social media templates'],
      },
    ],
    promptTemplate: 'A beautiful baby shower invitation design with {style_prompt}. {theme_prompt}. Elegant typography, soft pastel colors, whimsical illustration elements.',
    negativePrompt: 'blurry, low quality, pixelated, distorted text, hard to read, dark, gloomy, inappropriate',
    seoTitle: 'AI Baby Shower Invitations | TailorPic',
    seoDescription: 'Create stunning digital baby shower invitations with AI. Personalized designs, multiple themes, instant download. Backed by a 14-day money-back guarantee.',
    slug: 'baby-shower-invitations',
    active: true,
  },

  graduation: {
    id: 'graduation',
    name: 'Graduation Photos',
    shortName: 'Graduation',
    description: 'Professional graduation portraits with cap, gown, and academic settings.',
    tagline: 'Celebrate your achievement with perfect portraits',
    icon: '🎓',
    color: 'emerald',
    gradient: 'from-emerald-600 to-teal-700',
    uploadInstructions: 'Upload 4-8 clear photos of yourself. Include close-ups and full body shots with natural expressions.',
    minPhotos: 4,
    maxPhotos: 8,
    outputLabel: 'photos',
    packages: [
      {
        id: 'grad-express',
        name: 'Express',
        price: 990,
        currency: 'usd',
        outputCount: 5,
        features: ['1 academic setting', 'Cap & gown', 'HD resolution', '24-hour delivery'],
      },
      {
        id: 'grad-basic',
        name: 'Basic',
        price: 1900,
        currency: 'usd',
        outputCount: 20,
        features: ['5 academic settings', 'Cap & gown styles', 'Standard resolution'],
      },
      {
        id: 'grad-popular',
        name: 'Popular',
        price: 3400,
        currency: 'usd',
        outputCount: 40,
        features: ['10 settings', 'Multiple gown colors', 'HD resolution', 'Announcement templates'],
        recommended: true,
      },
      {
        id: 'grad-premium',
        name: 'Premium',
        price: 5400,
        currency: 'usd',
        outputCount: 80,
        features: ['All settings', 'Custom school colors', '4K resolution', 'Thank you cards', 'Social media pack'],
      },
    ],
    promptTemplate: 'A professional graduation portrait photograph. {style_prompt}. {background_prompt}. Academic cap and gown, proud expression, beautiful lighting.',
    negativePrompt: 'deformed, distorted, disfigured, poorly drawn face, bad anatomy, blurry, low quality, watermark, text, logo, cartoon, 3d render',
    seoTitle: 'AI Graduation Photos | TailorPic',
    seoDescription: 'Professional AI graduation portraits with cap and gown. Multiple academic settings and announcement templates. Backed by a 14-day money-back guarantee.',
    slug: 'graduation-photos',
    active: true,
  },

  'holiday-cards': {
    id: 'holiday-cards',
    name: 'Holiday & Bayram Cards',
    shortName: 'Holiday Cards',
    description: 'Personalized digital holiday and celebration cards for every occasion and festival.',
    tagline: 'Share the joy with custom AI-designed cards',
    icon: '🎄',
    color: 'red',
    gradient: 'from-red-600 to-green-700',
    uploadInstructions: 'Upload 1-5 family or individual photos. Include any pets you want featured.',
    minPhotos: 1,
    maxPhotos: 5,
    outputLabel: 'designs',
    packages: [
      {
        id: 'holiday-express',
        name: 'Express',
        price: 990,
        currency: 'usd',
        outputCount: 5,
        features: ['1 holiday theme', 'Digital download', 'HD resolution', '24-hour delivery'],
      },
      {
        id: 'holiday-basic',
        name: 'Basic',
        price: 1400,
        currency: 'usd',
        outputCount: 10,
        features: ['5 holiday themes', 'Digital download', 'Standard resolution'],
      },
      {
        id: 'holiday-popular',
        name: 'Popular',
        price: 2400,
        currency: 'usd',
        outputCount: 25,
        features: ['All holiday themes', 'HD resolution', 'Custom greetings', 'Multi-format export'],
        recommended: true,
      },
      {
        id: 'holiday-premium',
        name: 'Premium',
        price: 3900,
        currency: 'usd',
        outputCount: 50,
        features: ['All themes + Bayram', '4K resolution', 'Animated versions', 'Social media templates'],
      },
    ],
    promptTemplate: 'A beautiful {holiday_type} greeting card design featuring {style_prompt}. {theme_prompt}. Festive, warm, celebratory mood with elegant typography.',
    negativePrompt: 'blurry, low quality, pixelated, distorted text, dark, gloomy, inappropriate, offensive',
    seoTitle: 'AI Holiday & Bayram Cards | TailorPic',
    seoDescription: 'Create personalized digital holiday cards with AI. Christmas, Eid/Bayram, New Year and more. Instant download. Backed by a 14-day money-back guarantee.',
    slug: 'holiday-cards',
    active: true,
  },

  'family-portraits': {
    id: 'family-portraits',
    name: 'Family Portraits',
    shortName: 'Family Photos',
    description: 'Beautiful AI family portraits in various artistic styles and settings.',
    tagline: 'Picture-perfect family moments, reimagined by AI',
    icon: '👨‍👩‍👧‍👦',
    color: 'violet',
    gradient: 'from-violet-600 to-purple-700',
    uploadInstructions: 'Upload 5-10 photos of family members. Include individual and group shots with clear faces.',
    minPhotos: 5,
    maxPhotos: 10,
    outputLabel: 'portraits',
    packages: [
      {
        id: 'family-express',
        name: 'Express',
        price: 990,
        currency: 'usd',
        outputCount: 5,
        features: ['1 portrait style', 'Standard resolution', 'Digital delivery', '24-hour delivery'],
      },
      {
        id: 'family-basic',
        name: 'Basic',
        price: 2400,
        currency: 'usd',
        outputCount: 15,
        features: ['5 portrait styles', 'Standard resolution', 'Digital delivery'],
      },
      {
        id: 'family-popular',
        name: 'Popular',
        price: 3900,
        currency: 'usd',
        outputCount: 30,
        features: ['10 portrait styles', 'HD resolution', 'Seasonal themes', 'Photo collage'],
        recommended: true,
      },
      {
        id: 'family-premium',
        name: 'Premium',
        price: 5900,
        currency: 'usd',
        outputCount: 60,
        features: ['All styles', '4K resolution', 'Custom compositions', 'Holiday themes', 'Wall art sizes'],
      },
    ],
    promptTemplate: 'A beautiful family portrait photograph in {style_prompt} style. {background_prompt}. Warm, loving atmosphere, natural expressions, professional lighting.',
    negativePrompt: 'deformed, distorted, disfigured, poorly drawn face, bad anatomy, blurry, low quality, watermark, text, logo, cartoon, 3d render, unnatural poses',
    seoTitle: 'AI Family Portraits | TailorPic',
    seoDescription: 'Beautiful AI-generated family portraits in stunning artistic styles. From classic to modern, create lasting memories. Backed by a 14-day money-back guarantee.',
    slug: 'family-portraits',
    active: true,
  },

  'couple-engagement': {
    id: 'couple-engagement',
    name: 'Couple & Engagement Photos',
    shortName: 'Couple Photos',
    description: 'Romantic couple and engagement photos in beautiful settings and artistic styles.',
    tagline: 'Capture your love story with AI photography',
    icon: '💍',
    color: 'rose',
    gradient: 'from-rose-500 to-pink-600',
    uploadInstructions: 'Upload 5-10 photos of the couple together and individually. Natural, relaxed poses work best.',
    minPhotos: 5,
    maxPhotos: 10,
    outputLabel: 'photos',
    packages: [
      {
        id: 'couple-express',
        name: 'Express',
        price: 990,
        currency: 'usd',
        outputCount: 5,
        features: ['1 romantic setting', 'HD resolution', 'Digital delivery', '24-hour delivery'],
      },
      {
        id: 'couple-basic',
        name: 'Basic',
        price: 2400,
        currency: 'usd',
        outputCount: 20,
        features: ['5 romantic settings', 'Standard resolution', 'Digital delivery'],
      },
      {
        id: 'couple-popular',
        name: 'Popular',
        price: 3900,
        currency: 'usd',
        outputCount: 40,
        features: ['10 settings', 'HD resolution', 'Save the date templates', 'Golden hour lighting'],
        recommended: true,
      },
      {
        id: 'couple-premium',
        name: 'Premium',
        price: 6900,
        currency: 'usd',
        outputCount: 80,
        features: ['All settings', '4K resolution', 'Engagement announcement', 'Album layout', 'Social media pack'],
      },
    ],
    promptTemplate: 'A romantic couple portrait photograph in {scene_prompt}. {style_prompt}. Warm, intimate atmosphere, natural expressions of love, soft golden lighting.',
    negativePrompt: 'deformed, distorted, disfigured, poorly drawn face, bad anatomy, blurry, low quality, watermark, text, logo, cartoon, 3d render, awkward poses',
    seoTitle: 'AI Couple & Engagement Photos | TailorPic',
    seoDescription: 'Create stunning AI couple and engagement photos. Beautiful romantic settings, save-the-date templates included. Backed by a 14-day money-back guarantee.',
    slug: 'couple-engagement-photos',
    active: true,
  },

  'real-estate': {
    id: 'real-estate',
    name: 'Real Estate Virtual Staging',
    shortName: 'Virtual Staging',
    description: 'Transform empty rooms into beautifully staged spaces to sell properties faster.',
    tagline: 'Stage any property virtually in seconds',
    icon: '🏠',
    color: 'teal',
    gradient: 'from-teal-600 to-cyan-700',
    uploadInstructions: 'Upload 3-10 photos of empty rooms. Ensure good lighting and show the full room from different angles.',
    minPhotos: 3,
    maxPhotos: 10,
    outputLabel: 'staged photos',
    packages: [
      {
        id: 'realestate-express',
        name: 'Express',
        price: 990,
        currency: 'usd',
        outputCount: 5,
        features: ['1 furniture style', 'Living room only', 'HD resolution', '24-hour delivery'],
      },
      {
        id: 'realestate-basic',
        name: 'Basic',
        price: 2400,
        currency: 'usd',
        outputCount: 15,
        features: ['5 furniture styles', 'Standard resolution', 'Living room & bedroom'],
      },
      {
        id: 'realestate-popular',
        name: 'Popular',
        price: 4900,
        currency: 'usd',
        outputCount: 35,
        features: ['10 furniture styles', 'HD resolution', 'All room types', 'Day & night versions'],
        recommended: true,
      },
      {
        id: 'realestate-premium',
        name: 'Premium',
        price: 7900,
        currency: 'usd',
        outputCount: 60,
        features: ['All styles', '4K resolution', 'Custom color schemes', 'Exterior staging', 'MLS-ready'],
      },
    ],
    promptTemplate: 'A beautifully staged interior photograph of a {room_type}. {style_prompt}. {furniture_prompt}. Professional real estate photography, well-lit, inviting atmosphere.',
    negativePrompt: 'blurry, low quality, distorted perspective, floating furniture, unrealistic shadows, pixelated, dark, cluttered',
    seoTitle: 'AI Virtual Staging for Real Estate | TailorPic',
    seoDescription: 'Virtual staging powered by AI. Transform empty properties into beautifully furnished spaces. MLS-ready quality. Backed by a 14-day money-back guarantee.',
    slug: 'virtual-staging',
    active: true,
  },

  'ecommerce-product': {
    id: 'ecommerce-product',
    name: 'E-commerce Product Photography',
    shortName: 'Product Photos',
    description: 'Professional product photos with clean backgrounds, lifestyle scenes, and marketing-ready shots.',
    tagline: 'Product photos that sell, powered by AI',
    icon: '📦',
    color: 'orange',
    gradient: 'from-orange-500 to-amber-600',
    uploadInstructions: 'Upload 3-8 photos of your product from different angles. Use a clean, well-lit background.',
    minPhotos: 3,
    maxPhotos: 8,
    outputLabel: 'product photos',
    packages: [
      {
        id: 'product-express',
        name: 'Express',
        price: 990,
        currency: 'usd',
        outputCount: 5,
        features: ['White background', '1 lifestyle scene', 'HD resolution', '24-hour delivery'],
      },
      {
        id: 'product-basic',
        name: 'Basic',
        price: 1900,
        currency: 'usd',
        outputCount: 15,
        features: ['White background', '5 lifestyle scenes', 'Standard resolution'],
      },
      {
        id: 'product-popular',
        name: 'Popular',
        price: 3400,
        currency: 'usd',
        outputCount: 30,
        features: ['All backgrounds', 'HD resolution', 'Lifestyle scenes', 'Infographic layouts'],
        recommended: true,
      },
      {
        id: 'product-premium',
        name: 'Premium',
        price: 5900,
        currency: 'usd',
        outputCount: 60,
        features: ['All styles', '4K resolution', 'Amazon/Shopify optimized', 'Social media ads', 'A+ content'],
      },
    ],
    promptTemplate: 'A professional product photograph on {background_prompt}. {style_prompt}. Clean, sharp focus on the product, professional studio lighting, e-commerce quality.',
    negativePrompt: 'blurry, low quality, distorted, shadows on product, reflections, fingerprints, dust, pixelated, text, watermark',
    seoTitle: 'AI Product Photography | TailorPic',
    seoDescription: 'Professional AI product photos for e-commerce. Clean backgrounds, lifestyle scenes, Amazon and Shopify optimized. Backed by a 14-day money-back guarantee.',
    slug: 'product-photography',
    active: true,
  },
} as const;

// Helper functions
export function getCategoryById(id: CategoryId): Category {
  return CATEGORIES[id];
}

export function getActiveCategories(): Category[] {
  return Object.values(CATEGORIES).filter((cat) => cat.active);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return Object.values(CATEGORIES).find((cat) => cat.slug === slug);
}

export function getCategoryPackages(categoryId: CategoryId): CategoryPackage[] {
  return CATEGORIES[categoryId].packages;
}

export function getPackageById(categoryId: CategoryId, packageId: string): CategoryPackage | undefined {
  return CATEGORIES[categoryId].packages.find((pkg) => pkg.id === packageId);
}

// Featured categories for homepage
export const FEATURED_CATEGORIES: CategoryId[] = [
  'headshots',
  'dating',
  'pet-portraits',
  'real-estate',
  'ecommerce-product',
  'family-portraits',
];

// Category groups for organized display
export const CATEGORY_GROUPS = [
  {
    title: 'Professional',
    description: 'For your career and business',
    categories: ['headshots', 'linkedin-team', 'ecommerce-product', 'real-estate'] as CategoryId[],
  },
  {
    title: 'Personal',
    description: 'For life\'s special moments',
    categories: ['dating', 'family-portraits', 'couple-engagement', 'graduation'] as CategoryId[],
  },
  {
    title: 'Creative',
    description: 'Artistic designs and portraits',
    categories: ['pet-portraits', 'baby-shower', 'holiday-cards'] as CategoryId[],
  },
];
