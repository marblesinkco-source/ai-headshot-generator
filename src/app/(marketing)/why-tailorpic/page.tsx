import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { siteConfig } from '@/config/site';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  DollarSign,
  GraduationCap,
  Layers,
  Lock,
  MinusCircle,
  Palette,
  Briefcase,
  Rocket,
  Shield,
  Sparkles,
  Upload,
  Users,
  XCircle,
  Camera,
  Download,
  CalendarOff,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

const OG_TITLE = `Why ${siteConfig.name} — Professional AI Headshots`;
const OG_DESCRIPTION = `Discover why ${siteConfig.name} is the smartest way to get professional headshots. Studio quality from $9.90, ready in hours, with a money-back guarantee.`;

export const metadata: Metadata = {
  title: `Why ${siteConfig.name} — Professional AI Headshots Done Right`,
  description: OG_DESCRIPTION,
  alternates: { canonical: '/why-tailorpic' },
  openGraph: generateOGMetadata({
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    type: 'vs',
    subtitle: 'Why choose TailorPic',
    path: '/why-tailorpic',
  }),
  twitter: generateTwitterMetadata({
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    type: 'vs',
  }),
};

/* ------------------------------------------------------------------ */
/*  Differentiator cards                                               */
/* ------------------------------------------------------------------ */

const differentiators = [
  {
    icon: DollarSign,
    title: 'Studio Quality at a Fraction of the Cost',
    description:
      'Professional headshots starting at $9.90 as a one-time payment. Traditional studios typically charge $200 to $500 or more for fewer images.',
  },
  {
    icon: Clock,
    title: 'Results in Hours, Not Weeks',
    description:
      'Most orders are completed within about 2 hours. No waiting days for retouching or weeks for a studio appointment to open up.',
  },
  {
    icon: Palette,
    title: 'Multiple Styles from One Photo Set',
    description:
      'Upload 10-20 selfies and get headshots in a range of backgrounds, outfits, and styles. A single studio session rarely offers that variety.',
  },
  {
    icon: Shield,
    title: '14-Day Money-Back Guarantee',
    description:
      'Not satisfied with your results? Contact our support team within 14 days and we will review your order for a refund.',
  },
  {
    icon: Lock,
    title: 'Privacy-First Approach',
    description:
      'Your photos are automatically deleted after 30 days. We follow GDPR-compliant practices to keep your data safe.',
  },
  {
    icon: CalendarOff,
    title: 'No Scheduling, No Commute, No Retakes',
    description:
      'Skip the calendar juggling and travel. Take your selfies at home, upload them, and let the AI handle the rest.',
  },
];

/* ------------------------------------------------------------------ */
/*  Comparison table                                                   */
/* ------------------------------------------------------------------ */

type RowStatus = 'yes' | 'no' | 'partial' | string;

interface ComparisonRow {
  feature: string;
  traditional: RowStatus;
  otherAI: RowStatus;
  tailorpic: RowStatus;
}

const comparisonRows: ComparisonRow[] = [
  {
    feature: 'Starting price',
    traditional: '$200 - $500+',
    otherAI: '$20 - $60',
    tailorpic: '$9.90',
  },
  {
    feature: 'Turnaround time',
    traditional: '1 - 2 weeks',
    otherAI: '1 - 24 hours',
    tailorpic: 'Most orders ~2 hours',
  },
  {
    feature: 'Multiple styles & backgrounds',
    traditional: 'partial',
    otherAI: 'partial',
    tailorpic: 'yes',
  },
  {
    feature: 'Money-back guarantee',
    traditional: 'no',
    otherAI: 'partial',
    tailorpic: 'yes',
  },
  {
    feature: 'No scheduling or travel',
    traditional: 'no',
    otherAI: 'yes',
    tailorpic: 'yes',
  },
  {
    feature: 'Photo auto-deletion (privacy)',
    traditional: 'no',
    otherAI: 'partial',
    tailorpic: 'yes',
  },
  {
    feature: 'HD / 4K resolution',
    traditional: 'yes',
    otherAI: 'partial',
    tailorpic: 'yes',
  },
  {
    feature: 'Team pricing available',
    traditional: 'partial',
    otherAI: 'partial',
    tailorpic: 'yes',
  },
];

/* ------------------------------------------------------------------ */
/*  How It Works steps                                                 */
/* ------------------------------------------------------------------ */

const steps = [
  {
    icon: Upload,
    step: '1',
    title: 'Upload Your Selfies',
    description:
      'Take 10-20 casual photos of yourself following our simple guidelines. No professional equipment needed.',
  },
  {
    icon: Sparkles,
    step: '2',
    title: 'AI Generates Your Headshots',
    description:
      'Our AI creates professional headshots with different backgrounds, lighting, and styles tailored to you.',
  },
  {
    icon: Download,
    step: '3',
    title: 'Download and Use',
    description:
      'Review your headshots, pick your favorites, and download them in high resolution, ready for LinkedIn, your resume, or your website.',
  },
];

/* ------------------------------------------------------------------ */
/*  Who Uses TailorPic                                                 */
/* ------------------------------------------------------------------ */

const audiences = [
  {
    icon: Briefcase,
    title: 'Professionals',
    description:
      'Update your LinkedIn, company bio, and business cards with a polished headshot that matches your role.',
  },
  {
    icon: Rocket,
    title: 'Job Seekers',
    description:
      'Make a strong first impression on recruiters with a professional photo, without the studio expense.',
  },
  {
    icon: Layers,
    title: 'Entrepreneurs',
    description:
      'Get consistent, professional imagery across your website, pitch decks, and social profiles.',
  },
  {
    icon: Users,
    title: 'Teams',
    description:
      'Give every team member the same professional look without coordinating schedules or locations.',
  },
  {
    icon: GraduationCap,
    title: 'Students',
    description:
      'Start your career with a polished headshot for internship applications and academic profiles.',
  },
];

/* ------------------------------------------------------------------ */
/*  Cell renderer                                                      */
/* ------------------------------------------------------------------ */

function StatusCell({ value }: { value: RowStatus }) {
  if (value === 'yes') {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700">
        <CheckCircle2 className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
        Yes
      </span>
    );
  }
  if (value === 'no') {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600">
        <XCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
        No
      </span>
    );
  }
  if (value === 'partial') {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600">
        <MinusCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
        Limited
      </span>
    );
  }
  return <span className="text-sm text-tp-muted">{value}</span>;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function WhyTailorPicPage() {
  return (
    <>
      <Header />

      <main id="main-content">
        <BreadcrumbSchema
          items={[
            { name: 'Home', url: siteConfig.url },
            {
              name: `Why ${siteConfig.name}`,
              url: `${siteConfig.url}/why-tailorpic`,
            },
          ]}
        />

        {/* ---- Hero ---- */}
        <section className="relative overflow-hidden bg-tp-black py-24 sm:py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-tp-bronze/10 blur-[120px]"
          />
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <span className="mb-4 inline-block rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium tracking-wide text-tp-bronze">
              Why {siteConfig.name}
            </span>
            <h1 className="font-display text-4xl font-normal leading-tight text-white sm:text-5xl lg:text-6xl">
              Why Choose {siteConfig.name}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-beige/80">
              AI-powered professional headshots that look like they came from a
              studio&mdash;delivered in hours, not weeks, starting at just $9.90.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/auth/register"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'bg-tp-bronze text-tp-black hover:bg-tp-bronze/90',
                )}
              >
                Get Your Headshots
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ---- The Problem ---- */}
        <section className="border-b border-tp-line bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="font-display text-center text-3xl font-normal text-tp-ink sm:text-4xl">
              The Problem with Traditional Headshots
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-tp-muted">
              Getting a professional headshot has long meant paying too much,
              waiting too long, and settling for too few options.
            </p>

            <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
              {[
                {
                  label: '$200 - $500+',
                  detail: 'Typical cost for a single studio session with a handful of retouched photos.',
                },
                {
                  label: '1 - 2 Weeks',
                  detail: 'Average wait time for scheduling, shooting, and retouching at a traditional studio.',
                },
                {
                  label: 'Limited Variety',
                  detail: 'Most sessions deliver 3 to 10 final images with one background and one outfit.',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-tp-card border border-tp-line bg-tp-paper p-6 text-center"
                >
                  <p className="font-display text-2xl text-tp-ink">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm text-tp-muted">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- How TailorPic Is Different ---- */}
        <section className="bg-tp-paper py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="font-display text-center text-3xl font-normal text-tp-ink sm:text-4xl">
              How {siteConfig.name} Is Different
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-tp-muted">
              We built {siteConfig.name} to solve every pain point of the
              traditional headshot experience.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {differentiators.map((d) => (
                <div
                  key={d.title}
                  className="rounded-tp-card border border-tp-line bg-white p-6 transition hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-tp-bronze/10">
                    <d.icon
                      className="h-5 w-5 text-tp-bronze-ink"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    {d.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Side-by-Side Comparison Table ---- */}
        <section className="border-y border-tp-line bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="font-display text-center text-3xl font-normal text-tp-ink sm:text-4xl">
              Side-by-Side Comparison
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-tp-muted">
              See how {siteConfig.name} stacks up against traditional studios
              and other AI headshot services.
            </p>

            <p className="mx-auto mt-3 max-w-2xl text-center text-xs text-tp-muted">
              Traditional studio and other AI service figures are rough, typical
              ranges and vary by provider and market. {siteConfig.name} figures
              reflect our current pricing.
            </p>

            {/* Desktop table */}
            <div className="mt-12 hidden overflow-hidden rounded-tp-card border border-tp-line md:block">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-tp-line bg-tp-paper">
                    <th className="px-6 py-4 text-sm font-semibold text-tp-ink">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-tp-ink">
                      <div className="flex items-center gap-2">
                        <Camera
                          className="h-4 w-4 text-tp-muted"
                          aria-hidden="true"
                        />
                        Traditional Studio
                      </div>
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-tp-ink">
                      <div className="flex items-center gap-2">
                        <Sparkles
                          className="h-4 w-4 text-tp-muted"
                          aria-hidden="true"
                        />
                        Other AI Services
                      </div>
                    </th>
                    <th className="bg-tp-bronze/15 px-6 py-4 text-sm font-semibold text-tp-ink">
                      <div className="flex items-center gap-2">
                        <Shield
                          className="h-4 w-4 text-tp-bronze-ink"
                          aria-hidden="true"
                        />
                        <span className="text-tp-bronze-ink">
                          {siteConfig.name}
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={i % 2 === 0 ? 'bg-white' : 'bg-tp-paper/50'}
                    >
                      <td className="border-t border-tp-line px-6 py-4 text-sm font-medium text-tp-ink">
                        {row.feature}
                      </td>
                      <td className="border-t border-tp-line px-6 py-4">
                        <StatusCell value={row.traditional} />
                      </td>
                      <td className="border-t border-tp-line px-6 py-4">
                        <StatusCell value={row.otherAI} />
                      </td>
                      <td className="border-t border-tp-line bg-tp-bronze/10 px-6 py-4">
                        <StatusCell value={row.tailorpic} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="mt-12 space-y-8 md:hidden">
              <div className="rounded-tp-card border border-tp-line bg-white p-6">
                <div className="flex items-center gap-2">
                  <Camera
                    className="h-5 w-5 text-tp-muted"
                    aria-hidden="true"
                  />
                  <h3 className="text-lg font-semibold text-tp-ink">
                    Traditional Studio
                  </h3>
                </div>
                <dl className="mt-4 space-y-3">
                  {comparisonRows.map((row) => (
                    <div
                      key={row.feature}
                      className="flex items-start justify-between gap-4"
                    >
                      <dt className="text-sm text-tp-muted">{row.feature}</dt>
                      <dd>
                        <StatusCell value={row.traditional} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-tp-card border border-tp-line bg-white p-6">
                <div className="flex items-center gap-2">
                  <Sparkles
                    className="h-5 w-5 text-tp-muted"
                    aria-hidden="true"
                  />
                  <h3 className="text-lg font-semibold text-tp-ink">
                    Other AI Services
                  </h3>
                </div>
                <dl className="mt-4 space-y-3">
                  {comparisonRows.map((row) => (
                    <div
                      key={row.feature}
                      className="flex items-start justify-between gap-4"
                    >
                      <dt className="text-sm text-tp-muted">{row.feature}</dt>
                      <dd>
                        <StatusCell value={row.otherAI} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-tp-card border-2 border-tp-bronze bg-white p-6">
                <div className="flex items-center gap-2">
                  <Shield
                    className="h-5 w-5 text-tp-bronze-ink"
                    aria-hidden="true"
                  />
                  <h3 className="text-lg font-semibold text-tp-bronze-ink">
                    {siteConfig.name}
                  </h3>
                </div>
                <dl className="mt-4 space-y-3">
                  {comparisonRows.map((row) => (
                    <div
                      key={row.feature}
                      className="flex items-start justify-between gap-4"
                    >
                      <dt className="text-sm text-tp-muted">{row.feature}</dt>
                      <dd>
                        <StatusCell value={row.tailorpic} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ---- How It Works ---- */}
        <section className="bg-tp-paper py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="font-display text-center text-3xl font-normal text-tp-ink sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-tp-muted">
              Three simple steps from selfies to studio-quality headshots.
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {steps.map((s) => (
                <div key={s.step} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tp-bronze/10">
                    <s.icon
                      className="h-6 w-6 text-tp-bronze-ink"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="mt-4 inline-block rounded-full bg-tp-ink px-3 py-0.5 text-xs font-semibold text-white">
                    Step {s.step}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-tp-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Who Uses TailorPic ---- */}
        <section className="border-y border-tp-line bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="font-display text-center text-3xl font-normal text-tp-ink sm:text-4xl">
              Who Uses {siteConfig.name}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-tp-muted">
              From corporate teams to recent graduates, {siteConfig.name} works
              for anyone who needs a professional photo.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {audiences.slice(0, 3).map((a) => (
                <div
                  key={a.title}
                  className="rounded-tp-card border border-tp-line bg-white p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-tp-bronze/10">
                    <a.icon
                      className="h-5 w-5 text-tp-bronze-ink"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    {a.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:mx-auto sm:max-w-2xl lg:max-w-none lg:grid-cols-2">
              {audiences.slice(3).map((a) => (
                <div
                  key={a.title}
                  className="rounded-tp-card border border-tp-line bg-white p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-tp-bronze/10">
                    <a.icon
                      className="h-5 w-5 text-tp-bronze-ink"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    {a.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- CTA ---- */}
        <section className="relative overflow-hidden bg-tp-black py-20 sm:py-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-tp-bronze/15 blur-[120px]"
          />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-display text-3xl font-normal text-white sm:text-4xl">
              Ready to Get Your Professional Headshot?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-tp-beige/80">
              One-time payment starting at $9.90, most orders ready in about 2
              hours, and a money-back guarantee if you are not satisfied.
            </p>
            <Link
              href="/auth/register"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'mt-8 bg-tp-bronze text-tp-black shadow-lg shadow-tp-bronze/20 hover:bg-tp-bronze/90',
              )}
            >
              Get Started Now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
