/**
 * Profession-specific landing page configuration.
 * Each entry generates a page at /headshots/for-[slug].
 */

import { BASE_PRICE_DISPLAY } from '@/config/pricing';

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
      'Clients research attorneys online before making contact. A professional headshot on your firm profile, Avvo listing, or LinkedIn signals competence and approachability. Traditional studio sessions require scheduling around billable hours — AI headshots take minutes to upload and deliver within hours.',
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
      `Professional headshots for lawyers, attorneys and legal professionals. Studio-quality portraits for firm websites, bar directories and LinkedIn. From ${BASE_PRICE_DISPLAY}.`,
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
      `Professional headshots for realtors and real estate agents. Perfect for MLS listings, yard signs, business cards and social media. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'developers',
    title: 'Headshots for Developers',
    profession: 'Software Engineers',
    headline: 'AI Headshots for Software Developers',
    subheadline:
      'Stand out on GitHub, LinkedIn, and your company page with a professional photo — no studio trip required.',
    whyMatters:
      'A professional headshot helps developers stand out in job searches, conference talks, and open-source contributions. Many engineers skip the studio because of the hassle and cost. AI headshots let you get a polished look in minutes — upload selfies, pick a style, and get results within hours.',
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
      `Professional headshots for developers and software engineers. For LinkedIn, GitHub, conference bios and team pages. From ${BASE_PRICE_DISPLAY}.`,
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
      `Professional headshots for doctors, physicians and healthcare professionals. For practice websites, Healthgrades, Zocdoc and directories. From ${BASE_PRICE_DISPLAY}.`,
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
      `Professional headshots for consultants and freelancers. Build your personal brand with studio-quality portraits for websites, proposals and LinkedIn. From ${BASE_PRICE_DISPLAY}.`,
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
      `Premium AI headshots for executives and C-suite leaders. 4K resolution portraits for leadership pages, press, and board materials. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'accountants',
    title: 'Headshots for Accountants',
    profession: 'Accountants & CPAs',
    headline: 'AI Headshots for Accountants & CPAs',
    subheadline:
      'Build client confidence with a polished professional portrait for your firm website, CPA directory, and LinkedIn — ready within hours.',
    whyMatters:
      'Clients entrust accountants with their most sensitive financial information. A professional headshot on your firm bio, CPA directory, and LinkedIn profile communicates the reliability and attention to detail your clients expect. Skip the studio scheduling — upload selfies and get results within hours.',
    useCases: [
      'Accounting firm website bios',
      'CPA directory listings',
      'LinkedIn and professional networks',
      'Client-facing reports and proposals',
      'Tax season marketing materials',
    ],
    recommendedStyles: ['corporate', 'studio-classic', 'professional-linkedin'],
    seoTitle: 'AI Headshots for Accountants & CPAs | TailorPic',
    seoDescription:
      `Professional headshots for accountants and CPAs. Studio-quality portraits for firm websites, CPA directories and LinkedIn. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'architects',
    title: 'Headshots for Architects',
    profession: 'Architects & Designers',
    headline: 'AI Headshots for Architects & Designers',
    subheadline:
      'Your design sensibility extends to your professional image. Get modern, polished portraits for your portfolio site, AIA profile, and competition entries.',
    whyMatters:
      'Architecture is a visual profession — clients and collaborators judge your aesthetic sense before they see your portfolio. A well-composed headshot on your website, AIA directory, and project submissions signals creative credibility. AI headshots give you multiple styles to match different contexts.',
    useCases: [
      'Architecture firm websites',
      'AIA and professional directories',
      'Competition and award submissions',
      'Design publication bios',
      'LinkedIn and Houzz profiles',
    ],
    recommendedStyles: ['minimalist', 'natural-light', 'studio-classic'],
    seoTitle: 'AI Headshots for Architects & Designers | TailorPic',
    seoDescription:
      `Professional headshots for architects and designers. Modern portraits for portfolio sites, AIA directories and publications. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'dentists',
    title: 'Headshots for Dentists',
    profession: 'Dentists & Orthodontists',
    headline: 'AI Headshots for Dentists & Orthodontists',
    subheadline:
      'Patients want to see a friendly, trustworthy face before their first appointment. Get professional portraits that put patients at ease.',
    whyMatters:
      'Dental anxiety is real — patients choose providers who look approachable and professional online. A warm, polished headshot on your practice website, Google Business Profile, and insurance directories helps patients feel comfortable booking. AI headshots let you update your image without closing the office.',
    useCases: [
      'Dental practice websites',
      'Google Business Profile',
      'Insurance provider directories',
      'Patient welcome materials',
      'LinkedIn and dental association profiles',
    ],
    recommendedStyles: ['natural-light', 'corporate', 'studio-classic'],
    seoTitle: 'AI Headshots for Dentists & Orthodontists | TailorPic',
    seoDescription:
      `Professional headshots for dentists and orthodontists. Approachable portraits for practice websites, Google Business and directories. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'teachers',
    title: 'Headshots for Teachers',
    profession: 'Teachers & Educators',
    headline: 'AI Headshots for Teachers & Educators',
    subheadline:
      'Make a great first impression on students and parents with professional portraits for school directories, conference bios, and your LinkedIn.',
    whyMatters:
      `Parents and students look up their teachers online. A professional headshot on the school website, conference programs, and educational publications shows you take your role seriously. Teacher budgets are tight — AI headshots deliver studio quality starting from ${BASE_PRICE_DISPLAY}.`,
    useCases: [
      'School and district websites',
      'Conference speaker bios',
      'Educational publications',
      'LinkedIn and academic profiles',
      'Parent communication materials',
    ],
    recommendedStyles: ['natural-light', 'casual', 'corporate'],
    seoTitle: 'AI Headshots for Teachers & Educators | TailorPic',
    seoDescription:
      `Professional headshots for teachers and educators. Affordable studio-quality portraits for school websites, conferences and LinkedIn. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'nurses',
    title: 'Headshots for Nurses',
    profession: 'Nurses & Nursing Professionals',
    headline: 'AI Headshots for Nurses & Nursing Professionals',
    subheadline:
      'Whether you are advancing your career or building a personal brand in healthcare, get professional portraits that reflect your dedication.',
    whyMatters:
      'Nursing is evolving — nurse practitioners, travel nurses, and nursing educators all need professional online presence. A polished headshot for your NPI profile, hospital directory, or LinkedIn helps you stand out in a competitive field. No need to find time between shifts for a studio session.',
    useCases: [
      'Hospital and clinic directories',
      'NPI and credentialing profiles',
      'LinkedIn and Indeed profiles',
      'Nursing conference materials',
      'Personal healthcare blogs',
    ],
    recommendedStyles: ['natural-light', 'corporate', 'casual'],
    seoTitle: 'AI Headshots for Nurses | TailorPic',
    seoDescription:
      `Professional headshots for nurses and nursing professionals. For hospital directories, NPI profiles and LinkedIn. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'financial-advisors',
    title: 'Headshots for Financial Advisors',
    profession: 'Financial Advisors & Planners',
    headline: 'AI Headshots for Financial Advisors',
    subheadline:
      'Trust is your currency. A professional headshot for your advisory firm website, FINRA BrokerCheck, and client-facing materials helps clients feel confident choosing you.',
    whyMatters:
      'Clients are entrusting you with their financial future — they need to see someone trustworthy and competent. A professional headshot on your firm website, BrokerCheck profile, and marketing materials builds the credibility that drives referrals. Multiple styles let you match your brand across platforms.',
    useCases: [
      'Advisory firm websites',
      'FINRA BrokerCheck profile',
      'Client proposals and reports',
      'LinkedIn and industry directories',
      'Seminar and webinar materials',
    ],
    recommendedStyles: ['executive', 'corporate', 'professional-linkedin'],
    seoTitle: 'AI Headshots for Financial Advisors | TailorPic',
    seoDescription:
      `Professional headshots for financial advisors and planners. Trusted portraits for firm websites, BrokerCheck and client materials. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'coaches',
    title: 'Headshots for Coaches',
    profession: 'Life & Business Coaches',
    headline: 'AI Headshots for Coaches',
    subheadline:
      'Your coaching presence starts online. Get approachable, professional portraits for your coaching website, social media, and course materials.',
    whyMatters:
      'Coaching is a personal business — clients hire the person, not just the service. An authentic, professional headshot on your website, Instagram, and course landing pages helps potential clients connect with you before the discovery call. AI headshots give you both polished and approachable options.',
    useCases: [
      'Coaching practice website',
      'Social media profiles',
      'Online course platforms',
      'Podcast and webinar thumbnails',
      'Speaking engagement bios',
    ],
    recommendedStyles: ['natural-light', 'casual', 'startup-founder'],
    seoTitle: 'AI Headshots for Coaches | TailorPic',
    seoDescription:
      `Professional headshots for life coaches and business coaches. Approachable portraits for coaching websites, courses and social media. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'photographers',
    title: 'Headshots for Photographers',
    profession: 'Photographers & Creatives',
    headline: 'AI Headshots for Photographers',
    subheadline:
      'Even the person behind the camera needs a great headshot. Get polished self-portraits for your portfolio site, vendor listings, and social media.',
    whyMatters:
      'Clients hire photographers whose style they trust — and that trust starts with your own professional image. A well-crafted headshot on your portfolio site, The Knot profile, and Instagram bio shows you practice what you preach. No need to call in a favor from a colleague.',
    useCases: [
      'Photography portfolio website',
      'The Knot and wedding vendor listings',
      'Instagram and social media bios',
      'Photography association directories',
      'Workshop and course materials',
    ],
    recommendedStyles: ['creative', 'natural-light', 'minimalist'],
    seoTitle: 'AI Headshots for Photographers | TailorPic',
    seoDescription:
      `Professional headshots for photographers and creatives. Portfolio-ready portraits for websites, vendor listings and social media. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'therapists',
    title: 'Headshots for Therapists',
    profession: 'Therapists & Counselors',
    headline: 'AI Headshots for Therapists & Counselors',
    subheadline:
      'Clients choose therapists who feel safe and approachable. Get warm, professional portraits for Psychology Today, your practice website, and insurance directories.',
    whyMatters:
      'Finding a therapist is deeply personal — clients scroll through dozens of profiles looking for someone who feels right. A warm, approachable headshot on Psychology Today, your practice website, and telehealth platform helps clients take that first step. Natural lighting styles work especially well for mental health professionals.',
    useCases: [
      'Psychology Today profile',
      'Private practice website',
      'Insurance and EAP directories',
      'Telehealth platform profiles',
      'Professional association listings',
    ],
    recommendedStyles: ['natural-light', 'casual', 'studio-classic'],
    seoTitle: 'AI Headshots for Therapists & Counselors | TailorPic',
    seoDescription:
      `Professional headshots for therapists and counselors. Warm, approachable portraits for Psychology Today, practice websites and directories. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'sales-professionals',
    title: 'Headshots for Sales Professionals',
    profession: 'Sales Professionals',
    headline: 'AI Headshots for Sales Professionals',
    subheadline:
      'Your LinkedIn profile is your digital handshake. Get headshots that build rapport before the first outreach — polished, approachable, and ready to close.',
    whyMatters:
      'In sales, first impressions are everything — and your headshot is usually the first impression. Prospects check your LinkedIn before responding to cold outreach. A professional, approachable headshot increases connection acceptance rates and helps you stand out in crowded inboxes.',
    useCases: [
      'LinkedIn outreach and profile',
      'Sales enablement materials',
      'CRM profile photos',
      'Email signatures',
      'Company team pages',
    ],
    recommendedStyles: ['professional-linkedin', 'corporate', 'natural-light'],
    seoTitle: 'AI Headshots for Sales Professionals | TailorPic',
    seoDescription:
      `Professional headshots for sales professionals. LinkedIn-optimized portraits for outreach, email signatures and team pages. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'engineers',
    title: 'Headshots for Engineers',
    profession: 'Engineers',
    headline: 'AI Headshots for Engineers',
    subheadline:
      'Stand out in your field with professional portraits for LinkedIn, conference talks, and your company profile — no studio trip needed.',
    whyMatters:
      'Whether you are in civil, mechanical, electrical, or any engineering discipline, a professional headshot helps you stand out when applying for jobs, speaking at conferences, or representing your firm. Engineers rarely prioritize studio sessions — AI headshots make it effortless.',
    useCases: [
      'LinkedIn and professional networks',
      'Engineering firm websites',
      'Conference and journal bios',
      'PE license and association profiles',
      'Patent and publication author photos',
    ],
    recommendedStyles: ['corporate', 'minimalist', 'professional-linkedin'],
    seoTitle: 'AI Headshots for Engineers | TailorPic',
    seoDescription:
      `Professional headshots for engineers. Polished portraits for LinkedIn, firm websites, conferences and publications. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'recruiters',
    title: 'Headshots for Recruiters',
    profession: 'Recruiters & Talent Acquisition',
    headline: 'AI Headshots for Recruiters',
    subheadline:
      'Candidates evaluate you before they evaluate the role. A professional, friendly headshot helps you attract top talent on LinkedIn and beyond.',
    whyMatters:
      'Your headshot is part of your employer brand. Candidates check your LinkedIn profile before responding to outreach — a professional, approachable photo increases response rates and builds trust. As a recruiter, you know how much first impressions matter. Practice what you preach.',
    useCases: [
      'LinkedIn recruiter profiles',
      'Job postings and career pages',
      'Email signatures and InMails',
      'Recruiting agency websites',
      'Industry event materials',
    ],
    recommendedStyles: ['professional-linkedin', 'natural-light', 'corporate'],
    seoTitle: 'AI Headshots for Recruiters | TailorPic',
    seoDescription:
      `Professional headshots for recruiters and talent acquisition. Approachable portraits for LinkedIn, career pages and outreach. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'actors',
    title: 'Headshots for Actors',
    profession: 'Actors & Performers',
    headline: 'AI Headshots for Actors & Performers',
    subheadline:
      'Casting directors see your headshot before they see your talent. Get versatile portraits that capture your range — from commercial to dramatic.',
    whyMatters:
      'In the entertainment industry, your headshot IS your resume. Casting directors flip through hundreds of submissions — a compelling, current headshot gets you in the room. AI headshots let you generate multiple looks and moods without the cost of multiple studio sessions, so you can tailor submissions to each role.',
    useCases: [
      'Casting submissions and auditions',
      'IMDb and Actors Access profiles',
      'Talent agency websites',
      'Social media and personal branding',
      'Theater and film festival programs',
    ],
    recommendedStyles: ['studio-classic', 'natural-light', 'creative'],
    seoTitle: 'AI Headshots for Actors & Performers | TailorPic',
    seoDescription:
      `Professional headshots for actors and performers. Versatile portraits for casting, IMDb, agency sites and auditions. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'journalists',
    title: 'Headshots for Journalists',
    profession: 'Journalists & Writers',
    headline: 'AI Headshots for Journalists & Writers',
    subheadline:
      'Your byline photo builds reader trust. Get professional portraits for your publication bio, author page, and social media profiles.',
    whyMatters:
      'In journalism, credibility is everything — and your headshot is part of that credibility. A professional byline photo tells readers you are a serious journalist. Whether you are staff, freelance, or building an independent publication, a polished headshot adds authority to your work.',
    useCases: [
      'Publication and byline photos',
      'Author pages and contributor bios',
      'Twitter/X and social media',
      'Press credentials and media kits',
      'Book jacket author photos',
    ],
    recommendedStyles: ['studio-classic', 'minimalist', 'natural-light'],
    seoTitle: 'AI Headshots for Journalists & Writers | TailorPic',
    seoDescription:
      `Professional headshots for journalists and writers. Credible portraits for bylines, author pages and media profiles. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'professors',
    title: 'Headshots for Professors',
    profession: 'Professors & Academics',
    headline: 'AI Headshots for Professors & Academics',
    subheadline:
      'From faculty directories to research publications, get portraits that reflect your academic standing — without the campus photo day look.',
    whyMatters:
      'Students check faculty pages before choosing courses, and research collaborators form impressions from your institutional profile. A professional headshot that goes beyond the generic department photo elevates your academic presence across university websites, Google Scholar, and conference programs.',
    useCases: [
      'University faculty directories',
      'Google Scholar and ResearchGate',
      'Academic conference programs',
      'Research publication author photos',
      'Course and syllabus pages',
    ],
    recommendedStyles: ['studio-classic', 'corporate', 'natural-light'],
    seoTitle: 'AI Headshots for Professors & Academics | TailorPic',
    seoDescription:
      `Professional headshots for professors and academics. Distinguished portraits for faculty pages, Google Scholar and conferences. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'insurance-agents',
    title: 'Headshots for Insurance Agents',
    profession: 'Insurance Agents & Brokers',
    headline: 'AI Headshots for Insurance Agents',
    subheadline:
      'Clients buy insurance from people they trust. A professional headshot for your agency website, carrier directory, and marketing materials builds that trust.',
    whyMatters:
      'Insurance is a relationship business. Your photo appears on business cards, agency websites, carrier directories, and local advertising. A consistent, professional image across all these touchpoints builds recognition and trust with potential policyholders.',
    useCases: [
      'Agency and carrier websites',
      'Business cards and mailers',
      'Local advertising and signage',
      'LinkedIn and professional networks',
      'Insurance association directories',
    ],
    recommendedStyles: ['corporate', 'natural-light', 'professional-linkedin'],
    seoTitle: 'AI Headshots for Insurance Agents | TailorPic',
    seoDescription:
      `Professional headshots for insurance agents and brokers. Trustworthy portraits for agency websites, directories and marketing. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'hr-professionals',
    title: 'Headshots for HR Professionals',
    profession: 'HR Professionals',
    headline: 'AI Headshots for HR Professionals',
    subheadline:
      'You set the standard for professional presence at your company. Lead by example with polished portraits for your LinkedIn, company page, and HR materials.',
    whyMatters:
      'HR professionals are often the first face candidates see during the hiring process. Your headshot on LinkedIn, the company careers page, and onboarding materials sets the tone for your organization. A professional, welcoming image reflects the culture you are building.',
    useCases: [
      'LinkedIn and professional networks',
      'Company careers and team pages',
      'Onboarding and welcome materials',
      'HR conference speaker bios',
      'Internal communications',
    ],
    recommendedStyles: ['professional-linkedin', 'natural-light', 'corporate'],
    seoTitle: 'AI Headshots for HR Professionals | TailorPic',
    seoDescription:
      `Professional headshots for HR professionals. Welcoming portraits for LinkedIn, careers pages and company communications. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'marketing-professionals',
    title: 'Headshots for Marketers',
    profession: 'Marketing Professionals',
    headline: 'AI Headshots for Marketing Professionals',
    subheadline:
      'You know better than anyone how much visuals matter. Get headshots that match your personal brand across every platform.',
    whyMatters:
      'As a marketer, your personal brand is a reflection of your professional skills. A polished, on-brand headshot across LinkedIn, your company bio, and speaking engagements demonstrates that you practice what you teach. Multiple styles let you tailor your image to different audiences and channels.',
    useCases: [
      'LinkedIn and Twitter/X profiles',
      'Company and agency team pages',
      'Marketing conference bios',
      'Podcast and webinar thumbnails',
      'Personal blog and newsletter',
    ],
    recommendedStyles: ['startup-founder', 'professional-linkedin', 'creative'],
    seoTitle: 'AI Headshots for Marketing Professionals | TailorPic',
    seoDescription:
      `Professional headshots for marketing professionals. On-brand portraits for LinkedIn, conferences, podcasts and team pages. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'models',
    title: 'Headshots for Models',
    profession: 'Models',
    headline: 'AI Headshots for Models',
    subheadline:
      'Keep your comp card and portfolio fresh with versatile headshots across multiple looks — without booking another studio session.',
    whyMatters:
      'Modeling agencies and clients expect current, high-quality headshots in your portfolio. Keeping your comp card updated with new looks can be expensive with traditional photography. AI headshots let you generate fresh portraits across multiple styles, so your portfolio stays current between professional shoots.',
    useCases: [
      'Comp cards and portfolios',
      'Agency submissions',
      'Model Mayhem and casting platforms',
      'Social media profiles',
      'Personal website and lookbook',
    ],
    recommendedStyles: ['glamour', 'studio-classic', 'creative'],
    seoTitle: 'AI Headshots for Models | TailorPic',
    seoDescription:
      `Professional headshots for models. Versatile portraits for comp cards, agency submissions, casting platforms and portfolios. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'pharmacists',
    title: 'Headshots for Pharmacists',
    profession: 'Pharmacists',
    headline: 'AI Headshots for Pharmacists',
    subheadline:
      'Patients trust pharmacists who look professional and approachable. Get polished portraits for your pharmacy website, LinkedIn, and credentialing profiles.',
    whyMatters:
      'Pharmacists are among the most trusted healthcare professionals. As pharmacy practice expands into clinical services, immunizations, and consultations, your professional image matters more than ever. A polished headshot builds patient confidence and supports your credibility in collaborative care settings.',
    useCases: [
      'Pharmacy and clinic websites',
      'State board and credentialing profiles',
      'LinkedIn and professional networks',
      'Continuing education materials',
      'Health system directories',
    ],
    recommendedStyles: ['corporate', 'natural-light', 'studio-classic'],
    seoTitle: 'AI Headshots for Pharmacists | TailorPic',
    seoDescription:
      `Professional headshots for pharmacists. Trusted portraits for pharmacy websites, credentialing profiles and LinkedIn. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'psychologists',
    title: 'Headshots for Psychologists',
    profession: 'Psychologists',
    headline: 'AI Headshots for Psychologists',
    subheadline:
      'Clients seek psychologists who feel trustworthy and empathetic. Get warm, professional portraits for your practice website and APA profile.',
    whyMatters:
      'Finding a psychologist is a vulnerable step for clients. Your headshot on Psychology Today, your practice website, and referral networks needs to convey both professional competence and genuine warmth. Natural, approachable styling helps clients feel comfortable reaching out.',
    useCases: [
      'Psychology Today profile',
      'Private practice website',
      'APA and state association listings',
      'Telehealth platform profiles',
      'Research and publication author photos',
    ],
    recommendedStyles: ['natural-light', 'casual', 'studio-classic'],
    seoTitle: 'AI Headshots for Psychologists | TailorPic',
    seoDescription:
      `Professional headshots for psychologists. Warm, trustworthy portraits for Psychology Today, practice websites and associations. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'veterinarians',
    title: 'Headshots for Veterinarians',
    profession: 'Veterinarians',
    headline: 'AI Headshots for Veterinarians',
    subheadline:
      'Pet owners want to see a caring, trustworthy face before bringing in their furry family members. Get professional portraits that show your compassionate side.',
    whyMatters:
      'Pet owners are fiercely protective — they want a vet who genuinely cares. A warm, professional headshot on your clinic website, Google Business Profile, and Yelp listing helps pet parents feel confident choosing your practice. No need to close the clinic for a photo session.',
    useCases: [
      'Veterinary clinic websites',
      'Google Business Profile',
      'Yelp and pet service directories',
      'LinkedIn and AVMA profiles',
      'Client welcome materials',
    ],
    recommendedStyles: ['natural-light', 'casual', 'studio-classic'],
    seoTitle: 'AI Headshots for Veterinarians | TailorPic',
    seoDescription:
      `Professional headshots for veterinarians. Caring, approachable portraits for clinic websites, Google Business and directories. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'podcasters',
    title: 'Headshots for Podcasters',
    profession: 'Podcasters & Content Creators',
    headline: 'AI Headshots for Podcasters & Creators',
    subheadline:
      'Your podcast art and social profiles need a professional face. Get versatile portraits for thumbnails, show pages, and cross-platform branding.',
    whyMatters:
      'Listeners scroll through thousands of podcasts — your cover art and host photo are what stop the scroll. A professional, recognizable headshot used consistently across Apple Podcasts, Spotify, YouTube, and social media builds your personal brand and helps listeners find you everywhere.',
    useCases: [
      'Podcast cover art and show pages',
      'Apple Podcasts and Spotify profiles',
      'YouTube channel and thumbnails',
      'Social media profiles',
      'Guest appearance bios',
    ],
    recommendedStyles: ['creative', 'startup-founder', 'casual'],
    seoTitle: 'AI Headshots for Podcasters & Content Creators | TailorPic',
    seoDescription:
      `Professional headshots for podcasters and content creators. Eye-catching portraits for podcast art, YouTube, social media and bios. From ${BASE_PRICE_DISPLAY}.`,
  },
  {
    slug: 'personal-trainers',
    title: 'Headshots for Personal Trainers',
    profession: 'Personal Trainers & Fitness Coaches',
    headline: 'AI Headshots for Personal Trainers',
    subheadline:
      'Clients hire trainers who look fit, confident, and professional. Get headshots that match your energy for your website, social media, and gym profile.',
    whyMatters:
      'In the fitness industry, your image IS your marketing. Potential clients scroll through trainer profiles looking for someone who embodies the results they want. A professional headshot that looks confident and approachable — not just a gym selfie — sets you apart on your website, Instagram, and training platforms.',
    useCases: [
      'Personal training website',
      'Gym and studio profiles',
      'Instagram and social media',
      'Online coaching platforms',
      'Fitness app and marketplace listings',
    ],
    recommendedStyles: ['natural-light', 'casual', 'startup-founder'],
    seoTitle: 'AI Headshots for Personal Trainers | TailorPic',
    seoDescription:
      `Professional headshots for personal trainers and fitness coaches. Confident portraits for websites, Instagram and training platforms. From ${BASE_PRICE_DISPLAY}.`,
  },
];

export function getProfessionBySlug(slug: string): ProfessionPage | undefined {
  return PROFESSIONS.find((p) => p.slug === slug);
}

export function getAllProfessionSlugs(): string[] {
  return PROFESSIONS.map((p) => p.slug);
}
