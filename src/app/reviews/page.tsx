import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BeforeAfterIllustration } from '@/components/marketing/illustrations';
import { BreadcrumbSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import {
  Briefcase,
  Users,
  Palette,
  Linkedin,
  CreditCard,
  Image as ImageIcon,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

const pageTitle = 'How Professionals Use AI Headshots | TailorPic';
const pageDescription = `See how professionals use ${siteConfig.name} for headshots, team photos, LinkedIn profiles and more. Use cases across industries.`;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  keywords: [
    'AI headshot use cases',
    'professional headshot scenarios',
    `${siteConfig.name} use cases`,
    'AI team headshots',
    'AI LinkedIn headshots',
  ],
  alternates: { canonical: '/reviews' },
  openGraph: generateOGMetadata({
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    path: '/reviews',
  }),
  twitter: generateTwitterMetadata({
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
  }),
};

type UseCase = {
  icon: LucideIcon;
  role: string;
  scenario: string;
  tag: string;
};

const useCases: UseCase[] = [
  {
    icon: Linkedin,
    role: 'Job Seekers',
    scenario:
      'Upload a few casual selfies before applying for new roles and get back polished headshots that make your LinkedIn profile stand out to recruiters — no studio visit needed.',
    tag: 'LinkedIn',
  },
  {
    icon: Briefcase,
    role: 'Startup Founders',
    scenario:
      'Get consistent headshots for your pitch deck and website. Every co-founder uploads their own photos and the results look cohesive without anyone leaving their desk.',
    tag: 'Business',
  },
  {
    icon: Palette,
    role: 'Designers & Creatives',
    scenario:
      'Find headshots that feel polished but still show personality. The variety of styles lets you pick ones that fit your portfolio site and creative brand.',
    tag: 'Creative',
  },
  {
    icon: Users,
    role: 'Sales Teams',
    scenario:
      'Update headshots for your entire team in one afternoon. No more mismatched photos in CRM and email signatures — consistent photos that project professionalism.',
    tag: 'Teams',
  },
  {
    icon: Briefcase,
    role: 'Real Estate Agents',
    scenario:
      'First impressions matter in real estate. Get headshots that project trust and approachability without the hassle of booking a photographer between showings.',
    tag: 'Business',
  },
  {
    icon: Linkedin,
    role: 'Software Engineers',
    scenario:
      'Replace that blurry conference photo from three years ago. Upload selfies in five minutes and get a headshot you can be proud of on LinkedIn and GitHub.',
    tag: 'LinkedIn',
  },
  {
    icon: Users,
    role: 'HR & People Teams',
    scenario:
      'Onboarding new hires means headshots needed fast. Everyone gets matching photos on the team page within their first week — the process is seamless.',
    tag: 'Teams',
  },
  {
    icon: Palette,
    role: 'Photographers',
    scenario:
      'For quick professional headshots when you cannot schedule a proper shoot, AI-generated options provide genuinely useful quality and variety.',
    tag: 'Creative',
  },
  {
    icon: Briefcase,
    role: 'Management Consultants',
    scenario:
      'Clients expect polished profiles. Get updated headshots for firm bios and conference speaker pages within hours, not weeks.',
    tag: 'Business',
  },
  {
    icon: Linkedin,
    role: 'Financial Advisors',
    scenario:
      'Trust is everything in financial services. Get headshots that strike the right balance between professional authority and personal warmth.',
    tag: 'LinkedIn',
  },
  {
    icon: Palette,
    role: 'Content Creators',
    scenario:
      'Rotate through different headshots for different platforms. The variety in one order means options for YouTube, Instagram, and your personal website.',
    tag: 'Creative',
  },
  {
    icon: Users,
    role: 'Remote Engineering Teams',
    scenario:
      'Fully remote team across multiple time zones? Getting everyone to a photographer is impossible. Now every profile in Slack and GitHub looks professional and consistent.',
    tag: 'Teams',
  },
  {
    icon: Briefcase,
    role: 'Attorneys',
    scenario:
      'Get headshots for firm directories and bar association profiles. Polished enough to use across all platforms without any retouching.',
    tag: 'Business',
  },
  {
    icon: Linkedin,
    role: 'Product Managers',
    scenario:
      'Switching jobs means needing a fresh headshot fast. The whole process from upload to finished photos takes less time than a morning commute.',
    tag: 'LinkedIn',
  },
  {
    icon: Users,
    role: 'Operations Leaders',
    scenario:
      'Roll out headshots for an entire department. The per-person cost compared to a studio shoot saves thousands, and the photos look just as good on the company website.',
    tag: 'Teams',
  },
];

const filterTabs = ['All', 'Business', 'Creative', 'Teams', 'LinkedIn'] as const;

const trustItems = [
  { icon: CreditCard, label: `From ${BASE_PRICE_DISPLAY}` },
  { icon: ImageIcon, label: 'Up to 160 Photos' },
];


function UseCaseCard({ useCase }: { useCase: UseCase }) {
  const Icon = useCase.icon;
  return (
    <div className="break-inside-avoid rounded-tp-card border border-tp-line bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-tp-button bg-tp-beige/40 px-2.5 py-1 text-xs font-medium text-tp-bronze-ink">
          {useCase.tag}
        </span>
        <Icon className="h-5 w-5 text-tp-beige" aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold text-tp-ink">{useCase.role}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-tp-ink/80">
        {useCase.scenario}
      </p>
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Use Cases', url: `${siteConfig.url}/reviews` },
        ]}
      />
      <Header />
      <main id="main-content" className="min-h-screen bg-tp-paper">
        {/* Hero */}
        <section className="px-4 pb-10 pt-28 text-center sm:pt-32">
          <div className="mx-auto max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze-ink">
              <Briefcase className="h-4 w-4" />
              Use Cases
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal tracking-tight text-tp-ink sm:text-5xl md:text-6xl">
              How Professionals{' '}
              <span className="italic text-tp-bronze-ink">Use TailorPic</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-tp-muted">
              See how people across industries use {siteConfig.name} for headshots,
              team photos, LinkedIn profiles and creative projects.
            </p>
            <div className="mx-auto mt-8 max-w-xs">
              <BeforeAfterIllustration className="w-full h-auto" />
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="border-y border-tp-line bg-white py-5">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 text-sm text-tp-muted">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <span key={item.label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-tp-bronze" />
                  {item.label}
                </span>
              );
            })}
          </div>
        </section>

        {/* Filter tabs + Use case grid (CSS-only tabs) */}
        <section className="py-12">
          <p className="text-center text-sm text-tp-muted italic mb-6">The scenarios below are illustrative examples — not customer testimonials.</p>
          <div className="reviews-filter-group">
            {/* Hidden radio inputs for CSS-only tab filtering */}
            {filterTabs.map((tab, i) => (
              <input
                key={tab}
                type="radio"
                name="review-filter"
                id={`filter-${tab.toLowerCase()}`}
                className="peer sr-only"
                defaultChecked={i === 0}
                aria-label={`Show ${tab} use cases`}
              />
            ))}

            {/* Tab nav */}
            <nav
              aria-label="Filter use cases by category"
              className="mb-10 px-4"
            >
              <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2">
                {filterTabs.map((tab) => (
                  <label
                    key={tab}
                    htmlFor={`filter-${tab.toLowerCase()}`}
                    className="inline-flex h-10 cursor-pointer items-center rounded-tp-button border border-tp-line bg-white px-5 text-sm font-medium text-tp-ink transition-colors hover:border-tp-bronze hover:bg-tp-beige/30 has-[:checked]:border-tp-bronze has-[:checked]:bg-tp-bronze/10 has-[:checked]:text-tp-bronze-ink peer-checked:border-tp-bronze peer-checked:bg-tp-bronze/10 peer-checked:text-tp-bronze-ink [input:checked+&]:border-tp-bronze [input:checked+&]:bg-tp-bronze/10 [input:checked+&]:text-tp-bronze-ink"
                  >
                    {tab}
                  </label>
                ))}
              </div>
            </nav>

            {/* All tab content */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              {filterTabs.map((tab) => {
                const filtered =
                  tab === 'All' ? useCases : useCases.filter((r) => r.tag === tab);
                return (
                  <div
                    key={tab}
                    data-tab={tab.toLowerCase()}
                    className="hidden columns-1 gap-6 sm:columns-2 lg:columns-3"
                  >
                    {filtered.map((useCase) => (
                      <div key={useCase.role} className="mb-6 break-inside-avoid">
                        <UseCaseCard useCase={useCase} />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* CSS-only tab switching via :has() */}
            <style
              dangerouslySetInnerHTML={{
                __html: filterTabs
                  .map(
                    (tab) =>
                      `.reviews-filter-group:has(#filter-${tab.toLowerCase()}:checked) [data-tab="${tab.toLowerCase()}"] { display: columns; column-count: 1; }
@media (min-width: 640px) { .reviews-filter-group:has(#filter-${tab.toLowerCase()}:checked) [data-tab="${tab.toLowerCase()}"] { column-count: 2; } }
@media (min-width: 1024px) { .reviews-filter-group:has(#filter-${tab.toLowerCase()}:checked) [data-tab="${tab.toLowerCase()}"] { column-count: 3; } }`
                  )
                  .join('\n'),
              }}
            />
          </div>
        </section>

        {/* Explore Samples */}
        <section className="px-4 pb-16 sm:px-6" aria-labelledby="explore-samples-heading">
          <div className="mx-auto max-w-4xl text-center">
            <h2
              id="explore-samples-heading"
              className="font-display text-3xl font-normal text-tp-ink md:text-4xl"
            >
              See the Results
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-tp-muted">
              Browse real AI-generated headshot samples across different styles
              and backgrounds.
            </p>
            <div className="mt-8">
              <Link
                href="/samples"
                className={buttonVariants({
                  variant: 'outline',
                  size: 'lg',
                  className: 'gap-2',
                })}
              >
                View Sample Gallery
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto max-w-4xl rounded-tp-card border border-tp-line bg-tp-black px-6 py-14 text-center sm:px-12">
            <h2 className="font-display text-3xl font-normal text-tp-paper md:text-4xl">
              Ready to See for Yourself?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-tp-beige/70">
              Upload a few selfies and get studio-quality headshots delivered
              within hours. No subscription, no studio appointment needed.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
                className={buttonVariants({
                  variant: 'primary',
                  size: 'lg',
                  className: 'gap-2',
                })}
              >
                Get Your Headshots
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className={buttonVariants({
                  variant: 'outline',
                  size: 'lg',
                  className: 'border-tp-beige/30 text-tp-beige hover:bg-tp-beige/10',
                })}
              >
                View Pricing
              </Link>
            </div>
            <div className="mx-auto mt-8 flex max-w-md flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-tp-beige/60">
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <span key={item.label} className="flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5 text-tp-bronze" />
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
