import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { Quote, CreditCard, Image as ImageIcon, ArrowRight } from 'lucide-react';

const pageTitle = 'TailorPic Testimonials: How Professionals Use AI Headshots';
const pageDescription = `See how professionals use ${siteConfig.name} for headshots, team photos, LinkedIn profiles and more. Illustrative testimonials covering real use cases.`;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  keywords: [
    'AI headshot reviews',
    'AI headshot feedback',
    'professional headshot testimonials',
    `${siteConfig.name} reviews`,
    'AI team headshots feedback',
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

/* ------------------------------------------------------------------ */
/*  NOTE: These are illustrative testimonials for demonstration        */
/*  purposes. They are not verified reviews. Names use first name +    */
/*  last initial format. No real people or companies referenced.       */
/* ------------------------------------------------------------------ */

type Review = {
  name: string;
  role: string;
  quote: string;
  tag: string;
  initialBg: string;
};

const reviews: Review[] = [
  {
    name: 'Sarah M.',
    role: 'Marketing Director',
    quote:
      'I uploaded a few casual selfies before a conference and got back headshots that looked like I had spent an afternoon at a studio. My LinkedIn profile finally matches my actual role.',
    tag: 'LinkedIn',
    initialBg: 'bg-tp-bronze/20 text-tp-bronze-ink',
  },
  {
    name: 'James R.',
    role: 'Startup Founder',
    quote:
      'We needed consistent headshots for our pitch deck and website. Every co-founder uploaded their own photos and the results looked cohesive without anyone leaving their desk.',
    tag: 'Business',
    initialBg: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'Priya K.',
    role: 'UX Designer',
    quote:
      'As a creative professional, I wanted headshots that felt polished but still showed personality. The variety of styles let me pick ones that fit my portfolio site perfectly.',
    tag: 'Creative',
    initialBg: 'bg-purple-100 text-purple-700',
  },
  {
    name: 'Michael T.',
    role: 'Sales Manager',
    quote:
      'Updated headshots for my entire team in one afternoon. No more mismatched photos in our CRM and email signatures. The consistency makes us look like the professional outfit we are.',
    tag: 'Teams',
    initialBg: 'bg-green-100 text-green-700',
  },
  {
    name: 'Elena V.',
    role: 'Real Estate Agent',
    quote:
      'First impressions matter in real estate. I got headshots that project trust and approachability without the hassle of booking a photographer between showings.',
    tag: 'Business',
    initialBg: 'bg-rose-100 text-rose-700',
  },
  {
    name: 'David L.',
    role: 'Software Engineer',
    quote:
      'I had been using the same blurry conference photo for three years. Took five minutes to upload selfies and I finally have a headshot I am not embarrassed by on LinkedIn.',
    tag: 'LinkedIn',
    initialBg: 'bg-sky-100 text-sky-700',
  },
  {
    name: 'Rachel W.',
    role: 'HR Director',
    quote:
      'Onboarding twelve new hires last quarter meant twelve headshots needed fast. Everyone had matching photos on our team page within their first week. The process was seamless.',
    tag: 'Teams',
    initialBg: 'bg-amber-100 text-amber-700',
  },
  {
    name: 'Carlos F.',
    role: 'Freelance Photographer',
    quote:
      'I was skeptical as a photographer myself, but the quality surprised me. For quick professional headshots when you cannot schedule a proper shoot, this is genuinely useful.',
    tag: 'Creative',
    initialBg: 'bg-teal-100 text-teal-700',
  },
  {
    name: 'Aisha N.',
    role: 'Management Consultant',
    quote:
      'Clients expect polished profiles. I needed updated headshots for a new firm bio and conference speaker page. Had them within hours, not weeks.',
    tag: 'Business',
    initialBg: 'bg-indigo-100 text-indigo-700',
  },
  {
    name: 'Tom B.',
    role: 'Financial Advisor',
    quote:
      'Trust is everything in financial services. These headshots strike the right balance between professional authority and personal warmth. My clients comment on how approachable I look.',
    tag: 'LinkedIn',
    initialBg: 'bg-orange-100 text-orange-700',
  },
  {
    name: 'Nina S.',
    role: 'Content Creator',
    quote:
      'I rotate through different headshots for different platforms. The variety in one order means I have options for YouTube, Instagram, and my personal website without looking like stock photos.',
    tag: 'Creative',
    initialBg: 'bg-pink-100 text-pink-700',
  },
  {
    name: 'Robert H.',
    role: 'VP of Engineering',
    quote:
      'Our engineering team is fully remote across four time zones. Getting everyone to a photographer was never going to happen. Now every profile in Slack and GitHub looks professional and consistent.',
    tag: 'Teams',
    initialBg: 'bg-cyan-100 text-cyan-700',
  },
  {
    name: 'Laura C.',
    role: 'Attorney',
    quote:
      'I needed headshots for our firm directory and bar association profile. The results were polished enough to use across all platforms without any retouching.',
    tag: 'Business',
    initialBg: 'bg-emerald-100 text-emerald-700',
  },
  {
    name: 'Kevin P.',
    role: 'Product Manager',
    quote:
      'Switched jobs and needed a fresh headshot fast. The whole process from upload to finished photos took less time than my morning commute. LinkedIn profile updated same day.',
    tag: 'LinkedIn',
    initialBg: 'bg-violet-100 text-violet-700',
  },
  {
    name: 'Danielle G.',
    role: 'Operations Lead',
    quote:
      'We rolled this out to our entire department of twenty-five people. The per-person cost compared to a studio shoot saved us thousands, and the photos look just as good on our website.',
    tag: 'Teams',
    initialBg: 'bg-lime-100 text-lime-700',
  },
];

const filterTabs = ['All', 'Business', 'Creative', 'Teams', 'LinkedIn'] as const;

const trustItems = [
  { icon: CreditCard, label: 'From $1.99' },
  { icon: ImageIcon, label: 'Up to 160 Photos' },
];

function ReviewCard({ review }: { review: Review }) {
  const initial = review.name[0];
  return (
    <figure className="break-inside-avoid rounded-tp-card border border-tp-line bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-tp-button bg-tp-beige/40 px-2.5 py-1 text-xs font-medium text-tp-bronze-ink">
          {review.tag}
        </span>
        <Quote className="h-6 w-6 text-tp-beige" aria-hidden="true" />
      </div>
      <blockquote className="text-[15px] leading-relaxed text-tp-ink/80">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-tp-line pt-4">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${review.initialBg}`}
        >
          {initial}
        </span>
        <div>
          <p className="font-semibold text-tp-ink">{review.name}</p>
          <p className="text-sm text-tp-muted">{review.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Reviews', url: `${siteConfig.url}/reviews` },
        ]}
      />
      <Header />
      <main id="main-content" className="min-h-screen bg-tp-paper">
        {/* Hero */}
        <section className="px-4 pb-10 pt-28 text-center sm:pt-32">
          <div className="mx-auto max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze-ink">
              <Quote className="h-4 w-4" />
              Customer Feedback
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal tracking-tight text-tp-ink sm:text-5xl md:text-6xl">
              What Professionals{' '}
              <span className="italic text-tp-bronze-ink">Are Saying</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-tp-muted">
              See how people across industries use {siteConfig.name} for headshots,
              team photos, LinkedIn profiles and creative projects.
            </p>
            <p className="mx-auto mt-4 max-w-xl rounded-tp-button border border-tp-line bg-white px-4 py-3 text-sm text-tp-ink/80">
              * Illustrative testimonials for demonstration purposes.
            </p>
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

        {/* Filter tabs + Reviews grid (CSS-only tabs) */}
        <section className="py-12">
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
                aria-label={`Show ${tab} reviews`}
              />
            ))}

            {/* Tab nav */}
            <nav
              aria-label="Filter reviews by category"
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
              {filterTabs.map((tab, i) => {
                const filtered =
                  tab === 'All' ? reviews : reviews.filter((r) => r.tag === tab);
                /*
                 * CSS-only visibility: each panel corresponds to the Nth radio.
                 * We use the group of radio + sibling selectors via a wrapper
                 * approach. Since pure CSS sibling selectors across arbitrary
                 * depths are complex, we use a simple inline style trick with
                 * the :has() pseudo-class in a style tag below.
                 */
                return (
                  <div
                    key={tab}
                    data-tab={tab.toLowerCase()}
                    className="hidden columns-1 gap-6 sm:columns-2 lg:columns-3"
                  >
                    {filtered.map((review) => (
                      <div key={review.name} className="mb-6 break-inside-avoid">
                        <ReviewCard review={review} />
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

          <p className="mx-auto mt-10 max-w-2xl px-4 text-center text-xs text-tp-muted">
            * Illustrative testimonials for demonstration purposes. Names and roles
            are representative. No real individuals or companies are referenced.
          </p>
        </section>

        {/* CTA section */}
        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto max-w-4xl rounded-tp-card border border-tp-line bg-tp-black px-6 py-14 text-center sm:px-12">
            <h2 className="font-display text-3xl font-normal text-tp-paper md:text-4xl">
              Ready to See for Yourself?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-tp-beige/70">
              Upload a few selfies and get studio-quality headshots delivered in
              under 2 hours. No subscription, no studio appointment needed.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/auth/register"
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
