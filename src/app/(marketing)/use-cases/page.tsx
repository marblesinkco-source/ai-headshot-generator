import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  generateOGMetadata,
  generateTwitterMetadata,
} from '@/lib/og-metadata';
import { siteConfig } from '@/config/site';
import {
  Briefcase,
  Linkedin,
  Heart,
  Users,
  PawPrint,
  Home,
  Building2,
  ShoppingBag,
  GraduationCap,
  HeartHandshake,
  Gift,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const OG_TITLE = `AI Photo Use Cases | ${siteConfig.name}`;
const OG_DESC =
  'Explore all the ways you can use TailorPic to create AI-generated photos for work, social, and personal projects.';

export const metadata: Metadata = {
  title: 'AI Photo Use Cases | TailorPic',
  description:
    'Discover how TailorPic AI photos work for every occasion — professional headshots, LinkedIn profiles, dating apps, team photos, pet portraits, and more.',
  alternates: { canonical: '/use-cases' },
  openGraph: generateOGMetadata({
    title: OG_TITLE,
    description: OG_DESC,
    type: 'usecase',
    subtitle: 'Headshots, dating, team, pet and family photos',
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

interface UseCase {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

const useCases: UseCase[] = [
  {
    icon: Briefcase,
    title: 'Professional Headshots',
    description:
      'Studio-quality headshots for resumes, websites, and business profiles.',
    href: '/headshots',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn Photos',
    description:
      'Stand out on LinkedIn with a polished, professional profile photo.',
    href: '/linkedin-headshots',
  },
  {
    icon: Heart,
    title: 'Dating Photos',
    description:
      'Make a great first impression with natural, flattering dating photos.',
    href: '/dating-photos',
  },
  {
    icon: Users,
    title: 'Team Photos',
    description:
      'Consistent, on-brand headshots for your entire team in minutes.',
    href: '/team-headshots',
  },
  {
    icon: PawPrint,
    title: 'Pet Portraits',
    description:
      'Turn your pet photos into adorable, frame-worthy AI portraits.',
    href: '/pet-portraits',
  },
  {
    icon: Home,
    title: 'Family Portraits',
    description:
      'Beautiful family portraits without the hassle of coordinating a photo shoot.',
    href: '/family-portraits',
  },
  {
    icon: Building2,
    title: 'Real Estate',
    description:
      'Professional agent headshots that build trust with buyers and sellers.',
    href: '/industries/real-estate',
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce Product',
    description:
      'High-quality product photos that help drive conversions online.',
    href: '/product-photography',
  },
  {
    icon: GraduationCap,
    title: 'Graduation Photos',
    description:
      'Celebrate the milestone with polished portraits for announcements and keepsakes.',
    href: '/graduation-photos',
  },
  {
    icon: HeartHandshake,
    title: 'Couple & Engagement Photos',
    description:
      'Romantic portraits for save-the-dates, invitations, and wedding websites.',
    href: '/couple-engagement-photos',
  },
  {
    icon: Gift,
    title: 'Holiday Cards',
    description:
      'Personalized card photos ready to send, without scheduling a session.',
    href: '/holiday-cards',
  },
];

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'AI Photo Use Cases',
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
          <h1 className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            AI Photos for Every Occasion
          </h1>
          <p className="mt-5 text-lg text-tp-beige/70 max-w-2xl mx-auto leading-relaxed">
            From professional headshots to pet portraits, TailorPic helps you
            create stunning photos for any purpose — fast, affordable, and
            without a photo shoot.
          </p>
        </div>
      </section>

      {/* ── Use-Case Grid ── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only font-display font-normal">Browse AI photo use cases</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {useCases.map((uc) => (
              <Link
                key={uc.href}
                href={uc.href}
                className="group rounded-tp-card border border-tp-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-tp-bronze hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-tp-button bg-tp-paper border border-tp-line mb-4 transition-colors group-hover:bg-tp-black group-hover:border-tp-black">
                  <uc.icon className="h-5 w-5 text-tp-bronze-ink transition-colors group-hover:text-tp-bronze" />
                </div>
                <h3 className="text-base font-semibold text-tp-ink">
                  {uc.title}
                </h3>
                <p className="mt-1.5 text-sm text-tp-muted leading-relaxed">
                  {uc.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-tp-bronze-ink transition-transform group-hover:translate-x-0.5">
                  Learn more<span className="sr-only"> about {uc.title}</span> <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative overflow-hidden bg-tp-black py-16 sm:py-20">
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#C9A98A_0%,transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto mb-6 h-px w-16 bg-tp-bronze" />
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-white">
            Ready to Create Your Photos?
          </h2>
          <p className="mt-4 text-tp-beige/70">
            Upload your selfies and get professional-quality AI photos in
            minutes. No studio visit required.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/auth/register"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-tp-bronze text-tp-black shadow-none hover:bg-tp-bronze/90'
              )}
            >
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/headshots"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'border-tp-bronze/50 text-tp-bronze hover:border-tp-bronze hover:bg-tp-bronze/10'
              )}
            >
              View headshot packages
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
