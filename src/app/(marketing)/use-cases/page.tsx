import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { UseCasesIllustration } from '@/components/marketing/illustrations';
import { BreadcrumbSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  generateOGMetadata,
  generateTwitterMetadata,
} from '@/lib/og-metadata';
import { siteConfig } from '@/config/site';
import {
  Linkedin,
  Users,
  Building2,
  FileText,
  Mic,
  Share2,
  CreditCard,
  UserPlus,
  Globe,
  Briefcase,
  ArrowRight,
  User,
  Building,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const OG_TITLE = 'How Professionals Use TailorPic AI Headshots and Photos';
const OG_DESC =
  'See how individuals, teams, and enterprises use TailorPic AI headshots for LinkedIn, company pages, real estate, resumes, conferences, and more.';

export const metadata: Metadata = {
  title: { absolute: OG_TITLE },
  description:
    'Discover how professionals use TailorPic AI headshots for LinkedIn, team pages, real estate, job applications, conferences, social media and onboarding.',
  alternates: { canonical: '/use-cases' },
  openGraph: generateOGMetadata({
    title: OG_TITLE,
    description: OG_DESC,
    type: 'usecase',
    subtitle: 'Individual, Team & Enterprise headshot solutions',
    path: '/use-cases',
  }),
  twitter: generateTwitterMetadata({
    title: OG_TITLE,
    description: OG_DESC,
    type: 'usecase',
  }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Category = 'individual' | 'teams' | 'enterprise';

interface UseCase {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  category: Category;
}

const categories: { id: Category; label: string; icon: LucideIcon; description: string }[] = [
  {
    id: 'individual',
    label: 'Individual',
    icon: User,
    description: 'Professionals building their personal brand',
  },
  {
    id: 'teams',
    label: 'Teams',
    icon: Users,
    description: 'Groups that need consistent, polished photos',
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    icon: Building,
    description: 'Large organizations scaling visual identity',
  },
];

const useCases: UseCase[] = [
  {
    icon: Linkedin,
    title: 'LinkedIn Profile Photos',
    description:
      'Your LinkedIn photo is often the first impression recruiters and clients see. Get a polished, professional headshot that builds credibility and helps you stand out in search results.',
    href: '/linkedin-headshots',
    category: 'individual',
  },
  {
    icon: FileText,
    title: 'Job Applications & Resumes',
    description:
      'A professional photo on your resume or job portal profile signals competence and attention to detail. Create a clean, confident headshot without booking a photographer.',
    href: '/use-cases/job-application',
    category: 'individual',
  },
  {
    icon: Building2,
    title: 'Real Estate Agent Photos',
    description:
      'Buyers and sellers choose agents they trust. A sharp, approachable headshot on every listing, business card, and yard sign helps you close more deals.',
    href: '/industries/real-estate',
    category: 'individual',
  },
  {
    icon: Mic,
    title: 'Conference Speaker Photos',
    description:
      'Event organizers need your headshot fast. Generate a high-resolution, stage-ready photo that looks great on event websites, programs, and social media promotions.',
    href: '/use-cases/conference-speaker',
    category: 'individual',
  },
  {
    icon: Share2,
    title: 'Social Media Profiles',
    description:
      'Present a cohesive professional identity across every platform. Create variations optimized for different aspect ratios and styles, all from the same set of selfies.',
    href: '/use-cases/social-media',
    category: 'individual',
  },
  {
    icon: Globe,
    title: 'Company Team Pages',
    description:
      'Inconsistent team photos make your website look disjointed. Give every team member a consistent, on-brand headshot with matching lighting, background, and style.',
    href: '/team-headshots',
    category: 'teams',
  },
  {
    icon: CreditCard,
    title: 'Business Cards & Marketing',
    description:
      'From printed business cards to digital brochures and pitch decks, a professional headshot adds a personal touch that builds rapport before the first conversation.',
    href: '/use-cases/business-card',
    category: 'teams',
  },
  {
    icon: UserPlus,
    title: 'New Hire Onboarding',
    description:
      'Welcome new employees with a professional headshot on day one. Skip the awkward "we\'ll schedule your photo later" and get every new hire camera-ready immediately.',
    href: '/team-headshots',
    category: 'teams',
  },
  {
    icon: Briefcase,
    title: 'Enterprise Brand Consistency',
    description:
      'Standardize headshots across departments, offices, and regions. Enforce brand guidelines for backgrounds, lighting, and attire at scale without coordinating photo shoots.',
    href: '/enterprise',
    category: 'enterprise',
  },
  {
    icon: Sparkles,
    title: 'Professional Directories',
    description:
      'Law firms, medical practices, and consulting groups need every member to look polished. Generate directory-ready headshots that meet your organization\'s visual standards.',
    href: '/use-cases/professional-directory',
    category: 'enterprise',
  },
];

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'How Professionals Use TailorPic',
  url: `${siteConfig.url}/use-cases`,
  description: OG_DESC,
  isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: useCases.length,
    itemListElement: useCases.map((uc, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: uc.title,
      description: uc.description,
      url: `${siteConfig.url}${uc.href}`,
    })),
  },
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function UseCasesPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Use Cases', url: `${siteConfig.url}/use-cases` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Header />

      {/* ── Hero ── */}
      <section className="relative bg-tp-black py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#C9A98A_0%,transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-tp-bronze">
            Use Cases
          </p>
          <h1 className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            How Professionals Use TailorPic
          </h1>
          <p className="mt-5 text-lg text-tp-beige/70 max-w-2xl mx-auto leading-relaxed">
            Whether you need a single LinkedIn headshot or consistent photos for
            an entire organization, TailorPic delivers studio-quality results in
            minutes.
          </p>

          <div className="mx-auto mt-10 max-w-sm">
            <UseCasesIllustration className="w-full h-auto" />
          </div>

          {/* Category pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="group inline-flex items-center gap-2.5 rounded-tp-button border border-tp-bronze/30 bg-tp-bronze/5 px-5 py-2.5 text-sm text-tp-beige/80 transition-all hover:border-tp-bronze/60 hover:bg-tp-bronze/10 hover:text-white"
              >
                <cat.icon className="h-4 w-4 text-tp-bronze" />
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Sections ── */}
      {categories.map((cat) => {
        const categoryUseCases = useCases.filter((uc) => uc.category === cat.id);
        return (
          <section
            key={cat.id}
            id={cat.id}
            className="border-b border-tp-line py-16 sm:py-24 last:border-b-0"
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              {/* Section header */}
              <div className="mb-12 flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-tp-button bg-tp-paper border border-tp-line">
                  <cat.icon className="h-5 w-5 text-tp-bronze-ink" />
                </div>
                <div>
                  <h2 className="font-display font-normal text-2xl sm:text-3xl text-tp-ink">
                    {cat.label}
                  </h2>
                  <p className="mt-1 text-sm text-tp-muted">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Cards */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categoryUseCases.map((uc) => (
                  <Link
                    key={uc.href}
                    href={uc.href}
                    className="group flex flex-col rounded-tp-card border border-tp-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-tp-bronze hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-tp-button bg-tp-paper border border-tp-line mb-4 transition-colors group-hover:bg-tp-black group-hover:border-tp-black">
                      <uc.icon className="h-5 w-5 text-tp-bronze-ink transition-colors group-hover:text-tp-bronze" />
                    </div>
                    <h3 className="text-base font-semibold text-tp-ink">
                      {uc.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-tp-muted leading-relaxed">
                      {uc.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-tp-bronze-ink transition-transform group-hover:translate-x-0.5">
                      Learn more
                      <span className="sr-only"> about {uc.title}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── Find Your Use Case CTA ── */}
      <section className="relative overflow-hidden bg-tp-black py-16 sm:py-20">
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#C9A98A_0%,transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto mb-6 h-px w-16 bg-tp-bronze" />
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-white">
            Find Your Use Case
          </h2>
          <p className="mt-4 text-tp-beige/70 max-w-xl mx-auto">
            No matter your industry or role, a professional headshot opens
            doors. Upload your selfies and get results in minutes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-tp-bronze text-tp-black shadow-none hover:bg-tp-bronze/90'
              )}
            >
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'border-tp-bronze/50 text-tp-bronze hover:border-tp-bronze hover:bg-tp-bronze/10'
              )}
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
