import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BeforeAfterIllustration } from '@/components/marketing/illustrations';
import { BreadcrumbSchema } from '@/components/structured-data';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { siteConfig } from '@/config/site';
import {
  ArrowRight,
  Clock,
  Shield,
  Users,
  Camera,
  Sparkles,
  Briefcase,
  Building2,
  Palette,
  LineChart,
  Scale,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const title = 'How Professionals Use AI Headshots | TailorPic';
const description =
  'See how professionals use TailorPic to get polished, consistent AI headshots for their careers, teams and businesses, from solo profiles to whole teams.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/success-stories' },
  openGraph: generateOGMetadata({
    title: title,
    description,
    path: '/success-stories',
  }),
  twitter: generateTwitterMetadata({
    title: title,
    description,
  }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Scenario {
  icon: LucideIcon;
  industry: string;
  challenge: string;
  solution: string;
  outcome: string;
  feature: string;
  accentColor: string;
}

const scenarios: Scenario[] = [
  {
    icon: Briefcase,
    industry: 'Technology',
    challenge:
      'Engineers and developers need polished headshots for LinkedIn and conference speaker bios but rarely have time to schedule studio sessions between sprint deadlines.',
    solution:
      'Upload casual selfies and generate clean, professional headshots within hours from the home office — no travel or scheduling required.',
    outcome:
      'Consistent, professional profiles across LinkedIn, GitHub, and conference bios updated the same day.',
    feature: 'AI Style Selection',
    accentColor: 'bg-tp-bronze/15 text-tp-bronze-ink',
  },
  {
    icon: Building2,
    industry: 'Healthcare',
    challenge:
      'Hospital departments need updated staff directory photos for dozens of team members, but coordinating schedules across shifts is nearly impossible.',
    solution:
      'Each team member uploads selfies on their own time and receives headshots in a uniform style that matches department guidelines.',
    outcome:
      'An entire team directory refreshed within a week, with no disruption to patient care schedules.',
    feature: 'Team Batch Processing',
    accentColor: 'bg-tp-bronze/15 text-tp-bronze-ink',
  },
  {
    icon: LineChart,
    industry: 'Finance',
    challenge:
      'Financial professionals need trustworthy, approachable photos for client-facing materials but find traditional studio sessions expensive and time-consuming.',
    solution:
      'Create multiple headshot variations for websites, email signatures, and marketing brochures — all from a single upload session.',
    outcome:
      'A cohesive personal brand across all client touchpoints without the cost of a professional shoot.',
    feature: 'Multiple Style Variations',
    accentColor: 'bg-tp-bronze/15 text-tp-bronze-ink',
  },
  {
    icon: Palette,
    industry: 'Creative',
    challenge:
      'Freelancers and designers need headshots that feel creative yet professional for portfolio sites, but studio photos can feel too corporate.',
    solution:
      'Experiment with different backgrounds and styles to find a look that matches a creative identity while still appearing polished.',
    outcome:
      'Stand out on freelance platforms with a profile photo that attracts inbound project inquiries.',
    feature: 'Background Customization',
    accentColor: 'bg-tp-bronze/15 text-tp-bronze-ink',
  },
  {
    icon: Camera,
    industry: 'Real Estate',
    challenge:
      'Agents need consistent, high-quality photos for property listings, yard signs, and social media — but updating looks frequently means constant reshoots.',
    solution:
      'Generate fresh headshots whenever a new look is needed, keeping marketing materials current without rebooking a photographer.',
    outcome:
      'A professional, up-to-date presence across all listing platforms and print materials year-round.',
    feature: 'Quick Regeneration',
    accentColor: 'bg-tp-bronze/15 text-tp-bronze-ink',
  },
  {
    icon: Scale,
    industry: 'Legal',
    challenge:
      'Law firms rebranding need all attorney photos to share a unified style, but partners and associates are often spread across multiple offices.',
    solution:
      'Each attorney generates headshots independently using the same style preset, producing a visually consistent set without anyone traveling.',
    outcome:
      'A new website launches on schedule with a cohesive team page that reinforces the refreshed brand identity.',
    feature: 'Consistent Style Presets',
    accentColor: 'bg-tp-bronze/15 text-tp-bronze-ink',
  },
];

interface ValueProp {
  icon: LucideIcon;
  stat: string;
  label: string;
  description: string;
}

const valueProps: ValueProp[] = [
  {
    icon: Clock,
    stat: 'Hours',
    label: 'Not days',
    description:
      'Skip the scheduling, commuting, and waiting. Upload selfies and receive polished headshots within hours.',
  },
  {
    icon: Sparkles,
    stat: 'Unlimited',
    label: 'Style options',
    description:
      'Explore different backgrounds, lighting, and looks until you find the one that represents you best.',
  },
  {
    icon: Shield,
    stat: 'Privacy',
    label: 'First approach',
    description:
      'Your photos are processed securely, shared only with our AI processing partner to generate your headshots, and never sold. You control your images from upload to download.',
  },
  {
    icon: Users,
    stat: 'Teams',
    label: 'Of any size',
    description:
      'From solo professionals to large organizations, everyone gets consistent, on-brand headshots.',
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SuccessStoriesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Use Cases', url: `${siteConfig.url}/success-stories` },
        ]}
      />
      <Header />

      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden bg-tp-black py-20 sm:py-28">
          <div className="absolute inset-0 opacity-[0.04]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#C9A98A_0%,transparent_50%)]" />
          </div>
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="font-display font-normal text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Use Cases by Industry
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              See how professionals across industries use {siteConfig.name} to get polished,
              consistent headshots that elevate their personal brand.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
                className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
              >
                Get Your Headshot <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/samples"
                className="inline-flex items-center gap-2 rounded-tp-button border border-tp-beige/20 px-7 py-3.5 text-sm font-semibold text-tp-beige transition-all hover:border-tp-beige/40 hover:bg-white/5"
              >
                View Samples
              </Link>
            </div>
            <div className="mx-auto mt-10 max-w-sm">
              <BeforeAfterIllustration className="w-full h-auto" />
            </div>
          </div>
        </section>

        {/* Scenario Cards */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
                Common Headshot Challenges, Solved
              </h2>
              <p className="mt-4 text-tp-muted">
                How professionals across industries solve their headshot challenges with{' '}
                {siteConfig.name}.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {scenarios.map((s) => {
                const Icon = s.icon;
                return (
                  <article
                    key={s.industry}
                    className="flex flex-col rounded-tp-card border border-tp-line bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-tp-black/5"
                  >
                    {/* Icon + Industry */}
                    <div className="flex items-center gap-4">
                      <span
                        aria-hidden="true"
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tp-black text-tp-bronze"
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-display font-normal text-lg text-tp-ink">
                          {s.industry}
                        </p>
                      </div>
                    </div>

                    {/* Feature tag */}
                    <span
                      className={`mt-4 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${s.accentColor}`}
                    >
                      <Camera className="h-3 w-3" aria-hidden="true" />
                      {s.feature}
                    </span>

                    {/* Challenge / Solution / Outcome */}
                    <div className="mt-5 flex-1 space-y-4">
                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-tp-bronze-ink">
                          Challenge
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-tp-muted">
                          {s.challenge}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-tp-bronze-ink">
                          Solution
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-tp-muted">
                          {s.solution}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-tp-bronze-ink">
                          Outcome
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-tp-muted">
                          {s.outcome}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="bg-tp-paper py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
                Why professionals choose {siteConfig.name}
              </h2>
              <p className="mt-4 text-tp-muted">
                The benefits that make AI headshots the modern choice for
                individuals and teams.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {valueProps.map((v) => (
                <div
                  key={v.label}
                  className="rounded-tp-card border border-tp-line bg-white p-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-black/5">
                    <v.icon
                      className="h-5 w-5 text-tp-bronze"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="font-display font-normal text-2xl text-tp-ink">{v.stat}</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-tp-bronze-ink">
                    {v.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-tp-muted">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-tp-black py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-display font-normal text-3xl text-white sm:text-4xl">
              Ready to Upgrade Your Professional Image?
            </h2>
            <p className="mt-4 text-tp-beige/60">
              Upload a few selfies and get studio-quality headshots delivered in
              within hours. Starting from just {BASE_PRICE_DISPLAY}.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
                className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
              >
                Get Your Headshots <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-tp-button border border-tp-beige/20 px-7 py-3.5 text-sm font-semibold text-tp-beige transition-all hover:border-tp-beige/40 hover:bg-white/5"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
