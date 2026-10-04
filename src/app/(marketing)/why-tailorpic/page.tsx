import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { siteConfig } from '@/config/site';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  DollarSign,
  Images,
  Lock,
  MinusCircle,
  Shield,
  Sparkles,
  Users,
  XCircle,
  Camera,
  Sofa,
  RefreshCw,
  Trash2,
  FileCheck,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

const OG_TITLE = `Why ${siteConfig.name} — Professional AI Headshots`;
const OG_DESCRIPTION = `Discover why ${siteConfig.name} is the smartest way to get professional headshots. Studio quality from ${BASE_PRICE_DISPLAY}, ready in hours, with a satisfaction guarantee.`;

export const metadata: Metadata = {
  title: { absolute: 'Why TailorPic: Professional AI Headshots Done Right' },
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
/*  Value proposition cards                                            */
/* ------------------------------------------------------------------ */

const valueProps = [
  {
    icon: DollarSign,
    title: 'Unbeatable Price',
    stat: BASE_PRICE_DISPLAY,
    description:
      'One-time payment, no subscriptions. Traditional studios typically charge $200–$500 for a single session with far fewer photos.',
  },
  {
    icon: Clock,
    title: 'Ready in Hours',
    stat: '~2 hours',
    description:
      'Most orders are completed within about 2 hours. No waiting days for retouching or weeks for a studio appointment.',
  },
  {
    icon: Images,
    title: 'Massive Variety',
    stat: 'Up to 160',
    description:
      'Get headshots across multiple backgrounds, outfits, and styles from a single set of selfies. A studio session rarely offers that range.',
  },
  {
    icon: Users,
    title: 'Team Consistency',
    stat: 'Matching styles',
    description:
      'Give every team member the same polished, professional look without coordinating schedules, locations, or photographers.',
  },
  {
    icon: Sofa,
    title: 'Total Convenience',
    stat: 'No studio needed',
    description:
      'Skip the commute, the calendar juggling, and the awkward posing. Take your selfies at home and let the AI handle the rest.',
  },
  {
    icon: Shield,
    title: 'Satisfaction Guarantee',
    stat: '100%',
    description:
      'Not satisfied with your results? Contact our support team and we will work with you to resolve the issue.',
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
    traditional: '$200–$500+',
    otherAI: '$20–$60',
    tailorpic: BASE_PRICE_DISPLAY,
  },
  {
    feature: 'Turnaround time',
    traditional: '1–2 weeks',
    otherAI: '1–24 hours',
    tailorpic: 'Most orders ~2 hours',
  },
  {
    feature: 'Multiple styles & backgrounds',
    traditional: 'partial',
    otherAI: 'partial',
    tailorpic: 'yes',
  },
  {
    feature: 'Satisfaction guarantee',
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
/*  Trust commitments                                                  */
/* ------------------------------------------------------------------ */

const trustItems = [
  {
    icon: Lock,
    title: 'Privacy-First',
    description:
      'Your uploaded photos are processed securely and never shared with third parties. We follow GDPR-compliant practices.',
  },
  {
    icon: FileCheck,
    title: 'Full Commercial Rights',
    description:
      'Every headshot you generate is yours to use however you want—LinkedIn, resumes, company websites, business cards.',
  },
  {
    icon: Trash2,
    title: 'Automatic Deletion',
    description:
      'Your source photos are automatically deleted from our servers after 30 days. You stay in control of your data.',
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
              The Smart Choice
            </span>
            <h1 className="font-display text-4xl font-normal leading-tight text-white sm:text-5xl lg:text-6xl">
              Why Choose {siteConfig.name}?
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-beige/80">
              Studio-quality professional headshots powered by AI&mdash;delivered
              in hours, not weeks, starting at just {BASE_PRICE_DISPLAY}. No photographer, no
              appointment, no compromise.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/auth/register?redirect=/headshots"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'bg-tp-bronze text-tp-black hover:bg-tp-bronze/90',
                )}
              >
                Get Your Headshots
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/pricing"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'border-tp-beige/30 text-tp-beige hover:bg-tp-beige/10 hover:text-white',
                )}
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* ---- Value Props (6 cards) ---- */}
        <section className="bg-tp-paper py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="font-display text-center text-3xl font-normal text-tp-ink sm:text-4xl">
              Six Reasons to Choose {siteConfig.name}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-tp-muted">
              We built {siteConfig.name} to solve every pain point of the
              traditional headshot experience.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {valueProps.map((v) => (
                <div
                  key={v.title}
                  className="rounded-tp-card border border-tp-line bg-white p-6 transition hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-tp-bronze/10">
                    <v.icon
                      className="h-5 w-5 text-tp-bronze-ink"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-4 font-display text-2xl text-tp-ink">
                    {v.stat}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-tp-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- How We Compare ---- */}
        <section className="border-y border-tp-line bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="font-display text-center text-3xl font-normal text-tp-ink sm:text-4xl">
              How We Compare
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

        {/* ---- Trust & Privacy ---- */}
        <section className="bg-tp-paper py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="font-display text-center text-3xl font-normal text-tp-ink sm:text-4xl">
              Your Privacy, Our Priority
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-tp-muted">
              We take data protection seriously so you can focus on looking your
              best.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {trustItems.map((t) => (
                <div
                  key={t.title}
                  className="rounded-tp-card border border-tp-line bg-white p-6 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-tp-bronze/10">
                    <t.icon
                      className="h-5 w-5 text-tp-bronze-ink"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    {t.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- How It Works ---- */}
        <section className="border-y border-tp-line bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <h2 className="font-display text-3xl font-normal text-tp-ink sm:text-4xl">
              Studio-Quality in 3 Simple Steps
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-tp-bronze/10 text-lg font-semibold text-tp-bronze-ink">
                  1
                </div>
                <h3 className="mt-4 text-base font-semibold text-tp-ink">Upload Selfies</h3>
                <p className="mt-2 text-sm text-tp-muted">Take a few casual selfies with your phone — no studio visit needed.</p>
              </div>
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-tp-bronze/10 text-lg font-semibold text-tp-bronze-ink">
                  2
                </div>
                <h3 className="mt-4 text-base font-semibold text-tp-ink">AI Generates</h3>
                <p className="mt-2 text-sm text-tp-muted">Our AI creates professional headshots in multiple styles and backgrounds.</p>
              </div>
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-tp-bronze/10 text-lg font-semibold text-tp-bronze-ink">
                  3
                </div>
                <h3 className="mt-4 text-base font-semibold text-tp-ink">Download & Use</h3>
                <p className="mt-2 text-sm text-tp-muted">Get your headshots in under 2 hours, ready for LinkedIn, team pages, and more.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Final CTA ---- */}
        <section className="relative overflow-hidden bg-tp-black py-20 sm:py-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-tp-bronze/15 blur-[120px]"
          />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <RefreshCw
              className="mx-auto mb-4 h-8 w-8 text-tp-bronze/60"
              aria-hidden="true"
            />
            <h2 className="font-display text-3xl font-normal text-white sm:text-4xl">
              Ready to Upgrade Your Image?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-tp-beige/80">
              Join thousands of professionals who have switched from expensive
              studios to {siteConfig.name}. One-time payment, most orders ready
              in about 2 hours, and a satisfaction guarantee if you are not
              satisfied.
            </p>
            <Link
              href="/auth/register?redirect=/headshots"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'mt-8 bg-tp-bronze text-tp-black shadow-lg shadow-tp-bronze/20 hover:bg-tp-bronze/90',
              )}
            >
              Get Started Now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <p className="mt-4 text-sm text-tp-beige/60">
              Starting at {BASE_PRICE_DISPLAY} &middot; No subscription required
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
