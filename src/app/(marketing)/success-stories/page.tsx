import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import {
  ArrowRight,
  Clock,
  Shield,
  Users,
  Camera,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const title = 'Success Stories | AI Headshot Scenarios';
const description =
  'See how professionals use TailorPic to get polished, consistent AI headshots for their careers, teams, and businesses.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/success-stories' },
  openGraph: generateOGMetadata({
    title: `Success Stories | ${siteConfig.name}`,
    description,
    path: '/success-stories',
  }),
  twitter: generateTwitterMetadata({
    title: `Success Stories | ${siteConfig.name}`,
    description,
  }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Story {
  name: string;
  initial: string;
  role: string;
  industry: string;
  challenge: string;
  solution: string;
  outcome: string;
  feature: string;
  accentColor: string;
}

const stories: Story[] = [
  {
    name: 'Sarah K.',
    initial: 'S',
    role: 'Software Engineer',
    industry: 'Technology',
    challenge:
      'Needed a polished headshot for her new LinkedIn profile and conference speaker bios but had no time to book a photographer between sprint deadlines.',
    solution:
      'Uploaded three casual selfies and generated a set of clean, professional headshots in minutes from her home office.',
    outcome:
      'Updated her LinkedIn, GitHub, and conference profiles the same afternoon with a consistent, confident look.',
    feature: 'AI Style Selection',
    accentColor: 'bg-blue-500/10 text-blue-700',
  },
  {
    name: 'James R.',
    initial: 'J',
    role: 'Operations Manager',
    industry: 'Healthcare',
    challenge:
      'His hospital department needed updated staff directory photos for 20+ team members, but coordinating schedules across shifts was nearly impossible.',
    solution:
      'Each team member uploaded selfies on their own time and received headshots in a shared, uniform style that matched department guidelines.',
    outcome:
      'The entire team directory was refreshed within a week, with no disruption to patient care schedules.',
    feature: 'Team Batch Processing',
    accentColor: 'bg-emerald-500/10 text-emerald-700',
  },
  {
    name: 'Priya M.',
    initial: 'P',
    role: 'Financial Advisor',
    industry: 'Finance',
    challenge:
      'Wanted trustworthy, approachable photos for her client-facing materials but found traditional studio sessions expensive and time-consuming.',
    solution:
      'Created multiple headshot variations to use across her website, email signature, and marketing brochures, all from a single upload session.',
    outcome:
      'Achieved a cohesive personal brand across all client touchpoints without the cost of a professional shoot.',
    feature: 'Multiple Style Variations',
    accentColor: 'bg-amber-500/10 text-amber-700',
  },
  {
    name: 'David L.',
    initial: 'D',
    role: 'Graphic Designer',
    industry: 'Creative',
    challenge:
      'As a freelancer, he needed a headshot that felt creative yet professional for his portfolio site and Behance profile, but studio photos felt too corporate.',
    solution:
      'Experimented with different backgrounds and styles until finding a look that matched his creative identity while still appearing polished.',
    outcome:
      'His updated profile photo helped him stand out on freelance platforms and attracted more inbound project inquiries.',
    feature: 'Background Customization',
    accentColor: 'bg-purple-500/10 text-purple-700',
  },
  {
    name: 'Maria C.',
    initial: 'M',
    role: 'Real Estate Agent',
    industry: 'Real Estate',
    challenge:
      'Needed consistent, high-quality photos for property listings, yard signs, and social media but updated her look frequently and could not reshoot every time.',
    solution:
      'Generated fresh headshots whenever she wanted a new look, keeping her marketing materials current without rebooking a photographer.',
    outcome:
      'Maintained a professional, up-to-date presence across all her listing platforms and print materials year-round.',
    feature: 'Quick Regeneration',
    accentColor: 'bg-rose-500/10 text-rose-700',
  },
  {
    name: 'Robert A.',
    initial: 'R',
    role: 'Immigration Attorney',
    industry: 'Legal',
    challenge:
      'His law firm was rebranding and needed all attorney photos to share a unified style, but partners and associates were spread across three offices.',
    solution:
      'Each attorney generated headshots independently using the same style preset, producing a visually consistent set without anyone traveling.',
    outcome:
      'The firm launched its new website on schedule with a cohesive team page that reinforced its refreshed brand identity.',
    feature: 'Consistent Style Presets',
    accentColor: 'bg-sky-500/10 text-sky-700',
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
    stat: 'Minutes',
    label: 'Not hours',
    description:
      'Skip the scheduling, commuting, and waiting. Upload selfies and receive polished headshots in minutes.',
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
      'Your photos are processed securely and never shared. You control your images from upload to download.',
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
          { name: 'Success Stories', url: `${siteConfig.url}/success-stories` },
        ]}
      />
      <Header />

      <main id="main-content" className="min-h-screen">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-tp-black py-20 sm:py-28">
          <div className="absolute inset-0 opacity-[0.04]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#C9A98A_0%,transparent_50%)]" />
          </div>
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Success Stories
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              See how professionals use {siteConfig.name} to get polished,
              consistent headshots that elevate their personal brand.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/auth/register"
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
          </div>
        </section>

        {/* ── Story Cards ── */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl text-tp-ink sm:text-4xl">
                Real-world use cases, illustrated
              </h2>
              <p className="mt-4 text-tp-muted">
                These illustrative stories show how professionals across
                industries solve their headshot challenges with{' '}
                {siteConfig.name}.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((s) => (
                <article
                  key={s.name}
                  className="flex flex-col rounded-tp-card border border-tp-line bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-tp-black/5"
                >
                  {/* Avatar + meta */}
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tp-black text-lg font-semibold text-tp-bronze"
                    >
                      {s.initial}
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-lg text-tp-ink">
                        {s.name}
                      </p>
                      <p className="truncate text-xs text-tp-muted">
                        {s.role} &middot; {s.industry}
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
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-tp-bronze">
                        Challenge
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-tp-muted">
                        {s.challenge}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-tp-bronze">
                        Solution
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-tp-muted">
                        {s.solution}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-tp-bronze">
                        Outcome
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-tp-muted">
                        {s.outcome}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mx-auto mt-10 max-w-2xl rounded-tp-card border border-tp-line bg-tp-paper px-6 py-4 text-center">
              <p className="text-xs leading-relaxed text-tp-muted">
                * Illustrative success stories for demonstration purposes. These
                scenarios are fictional and do not describe real individuals,
                companies, or measured results. Names, roles, and industries are
                used for illustration only.
              </p>
            </div>
          </div>
        </section>

        {/* ── Value Props / Stats ── */}
        <section className="bg-tp-paper py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl text-tp-ink sm:text-4xl">
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
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-tp-black/5">
                    <v.icon
                      className="h-5 w-5 text-tp-bronze"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="font-display text-2xl text-tp-ink">{v.stat}</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-tp-bronze">
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

        {/* ── CTA ── */}
        <section className="bg-tp-black py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Write your own success story
            </h2>
            <p className="mt-4 text-tp-beige/60">
              Join thousands of professionals who trust {siteConfig.name} for
              polished, consistent AI headshots. No studio visit required.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
              >
                Get Started Today <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-tp-button border border-tp-beige/20 px-7 py-3.5 text-sm font-semibold text-tp-beige transition-all hover:border-tp-beige/40 hover:bg-white/5"
              >
                View Pricing
              </Link>
            </div>
            <p className="mt-6 text-xs text-tp-beige/40">
              * Illustrative success stories for demonstration purposes.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
