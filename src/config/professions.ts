/**
 * Profession-specific landing page configuration.
 * Each entry generates a page at /headshots/for-[slug].
 */

export interface ProfessionPage {
  slug: string;
  title: string;
  profession: string;
  headline: string;
  subheadline: string;
  whyMatters: string;
  useCases: string[];
  recommendedStyles: string[];
  seoTitle: string;
  seoDescription: string;
}

export const PROFESSIONS: ProfessionPage[] = [
  {
    slug: 'lawyers',
    title: 'Headshots for Lawyers',
    profession: 'Legal Professionals',
    headline: 'AI Headshots for Lawyers & Attorneys',
    subheadline:
      'A polished headshot builds trust before the first consultation. Get studio-quality portraits for your firm website, bar directory, and LinkedIn — from your own photos.',
    whyMatters:
      'Clients research attorneys online before making contact. A professional headshot on your firm profile, Avvo listing, or LinkedIn signals competence and approachability. Traditional studio sessions require scheduling around billable hours — AI headshots take minutes to upload and deliver in about 2 hours.',
    useCases: [
      'Law firm website bios',
      'State bar directory listings',
      'LinkedIn and Avvo profiles',
      'Legal conference materials',
      'Martindale-Hubbell profile',
    ],
    recommendedStyles: ['corporate', 'executive', 'studio-classic'],
    seoTitle: 'AI Headshots for Lawyers & Attorneys | TailorPic',
    seoDescription:
      'Professional headshots for lawyers, attorneys and legal professionals. Studio-quality portraits for firm websites, bar directories and LinkedIn. From $1.99.',
  },
  {
    slug: 'realtors',
    title: 'Headshots for Realtors',
    profession: 'Real Estate Agents',
    headline: 'AI Headshots for Real Estate Agents',
    subheadline:
      'Your face is your brand. Get professional portraits for yard signs, MLS listings, business cards, and social media — without the studio appointment.',
    whyMatters:
      'In real estate, your photo appears everywhere: yard signs, Zillow, Realtor.com, business cards, and mailers. A consistent, professional image across all touchpoints builds recognition and trust with potential clients. AI headshots let you update your look across all platforms at once.',
    useCases: [
      'MLS and Zillow listings',
      'Yard signs and business cards',
      'Brokerage website profile',
      'Social media marketing',
      'Email signature and newsletters',
    ],
    recommendedStyles: ['natural-light', 'corporate', 'outdoor'],
    seoTitle: 'AI Headshots for Real Estate Agents | TailorPic',
    seoDescription:
      'Professional headshots for realtors and real estate agents. Perfect for MLS listings, yard signs, business cards and social media. From $1.99.',
  },
  {
    slug: 'developers',
    title: 'Headshots for Developers',
    profession: 'Software Engineers',
    headline: 'AI Headshots for Software Developers',
    subheadline:
      'Stand out on GitHub, LinkedIn, and your company page with a professional photo — no studio trip required.',
    whyMatters:
      'A professional headshot helps developers stand out in job searches, conference talks, and open-source contributions. Many engineers skip the studio because of the hassle and cost. AI headshots let you get a polished look in minutes — upload selfies, pick a style, and get results in about 2 hours.',
    useCases: [
      'LinkedIn and GitHub profiles',
      'Company team pages',
      'Conference speaker bios',
      'Dev.to and personal blog',
      'Slack and Teams avatars',
    ],
    recommendedStyles: ['minimalist', 'startup-founder', 'casual'],
    seoTitle: 'AI Headshots for Software Developers | TailorPic',
    seoDescription:
      'Professional headshots for developers and software engineers. For LinkedIn, GitHub, conference bios and team pages. From $1.99.',
  },
  {
    slug: 'doctors',
    title: 'Headshots for Doctors',
    profession: 'Healthcare Professionals',
    headline: 'AI Headshots for Doctors & Healthcare Professionals',
    subheadline:
      'Patients choose providers online. A professional portrait for your practice website, Healthgrades listing, and hospital directory builds confidence before the first visit.',
    whyMatters:
      'Studies show patients evaluate healthcare providers partly on their online presence. A professional, approachable headshot on your practice website, insurance directory, and Healthgrades profile helps patients feel comfortable choosing you. AI headshots eliminate the need to schedule around patient appointments.',
    useCases: [
      'Practice and hospital websites',
      'Healthgrades and Zocdoc profiles',
      'Insurance provider directories',
      'Medical conference materials',
      'LinkedIn and professional networks',
    ],
    recommendedStyles: ['corporate', 'natural-light', 'studio-classic'],
    seoTitle: 'AI Headshots for Doctors & Healthcare | TailorPic',
    seoDescription:
      'Professional headshots for doctors, physicians and healthcare professionals. For practice websites, Healthgrades, Zocdoc and directories. From $1.99.',
  },
  {
    slug: 'consultants',
    title: 'Headshots for Consultants',
    profession: 'Consultants & Freelancers',
    headline: 'AI Headshots for Consultants & Freelancers',
    subheadline:
      'Your personal brand is your business. Get professional portraits that convey expertise and credibility across your website, proposals, and LinkedIn.',
    whyMatters:
      'As an independent consultant, your headshot is often the first impression potential clients get. A polished photo on your website, LinkedIn, and proposal documents signals professionalism and builds confidence in your expertise. Multiple styles let you tailor your image to different audiences.',
    useCases: [
      'Personal website and portfolio',
      'LinkedIn and professional networks',
      'Client proposals and pitch decks',
      'Speaking engagement bios',
      'Upwork, Fiverr, and Toptal profiles',
    ],
    recommendedStyles: ['professional-linkedin', 'executive', 'natural-light'],
    seoTitle: 'AI Headshots for Consultants & Freelancers | TailorPic',
    seoDescription:
      'Professional headshots for consultants and freelancers. Build your personal brand with studio-quality portraits for websites, proposals and LinkedIn. From $1.99.',
  },
  {
    slug: 'executives',
    title: 'Headshots for Executives',
    profession: 'C-Suite & Senior Leaders',
    headline: 'AI Headshots for Executives & C-Suite Leaders',
    subheadline:
      'Executive presence starts with your image. Get premium portraits for board materials, press releases, and company leadership pages.',
    whyMatters:
      'Executive headshots appear in annual reports, press releases, investor presentations, and industry publications. The stakes are higher, and the image needs to convey authority and approachability. Our Executive package includes up to 160 photos across 10 styles in 4K resolution — enough variety for every platform and publication.',
    useCases: [
      'Company leadership pages',
      'Annual reports and investor decks',
      'Press releases and media kits',
      'Board and advisory profiles',
      'Industry conference materials',
    ],
    recommendedStyles: ['executive', 'corporate', 'studio-classic'],
    seoTitle: 'AI Headshots for Executives & C-Suite | TailorPic',
    seoDescription:
      'Premium AI headshots for executives and C-suite leaders. 4K resolution portraits for leadership pages, press, and board materials. From $1.99.',
  },
];

export function getProfessionBySlug(slug: string): ProfessionPage | undefined {
  return PROFESSIONS.find((p) => p.slug === slug);
}

export function getAllProfessionSlugs(): string[] {
  return PROFESSIONS.map((p) => p.slug);
}
