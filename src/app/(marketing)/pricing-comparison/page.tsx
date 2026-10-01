import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { CATEGORIES } from '@/config/categories';
import {
  Clock,
  Camera,
  CheckCircle2,
  XCircle,
  MinusCircle,
  ArrowRight,
  Shield,
  Sparkles,
  DollarSign,
  Users,
} from 'lucide-react';

export const metadata: Metadata = {
  title: `Pricing Comparison — ${siteConfig.name} vs Traditional Photography`,
  description: `Compare ${siteConfig.name} AI headshots with traditional photography studios and other AI services. See how you can save time and money while getting professional results.`,
  alternates: { canonical: '/pricing-comparison' },
  openGraph: {
    title: `Pricing Comparison | ${siteConfig.name}`,
    description: `Compare AI headshot pricing: ${siteConfig.name} vs traditional studios vs other AI services. Find the best value for professional photos.`,
    url: `${siteConfig.url}/pricing-comparison`,
    siteName: siteConfig.name,
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Pricing Comparison | ${siteConfig.name}`,
    description: `Compare ${siteConfig.name} AI headshots with traditional studios and other AI services.`,
    images: [siteConfig.ogImage],
  },
};

/* ------------------------------------------------------------------ */
/*  Pricing data from config                                           */
/* ------------------------------------------------------------------ */

const headshots = CATEGORIES.headshots;
const expressPackage = headshots.packages[0]; // Express: $9.90, 5 headshots
const starterPackage = headshots.packages[1]; // Starter: $29.00, 40 headshots
const proPackage = headshots.packages[2]; // Professional: $49.00, 80 headshots
const execPackage = headshots.packages[3]; // Executive: $79.00, 140 headshots

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function perPhotoPrice(cents: number, count: number): string {
  return `$${(cents / 100 / count).toFixed(2)}`;
}

/* ------------------------------------------------------------------ */
/*  Comparison table data                                              */
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
    feature: 'Price range',
    traditional: '$150 - $500+',
    otherAI: '$20 - $60',
    tailorpic: `${formatPrice(expressPackage.price)} - ${formatPrice(execPackage.price)}`,
  },
  {
    feature: 'Number of photos included',
    traditional: '3 - 10 retouched',
    otherAI: '10 - 40',
    tailorpic: `${expressPackage.outputCount} - ${execPackage.outputCount}`,
  },
  {
    feature: 'Turnaround time',
    traditional: '1 - 2 weeks',
    otherAI: '1 - 24 hours',
    tailorpic: 'Most orders within 2 hours',
  },
  {
    feature: 'Travel required',
    traditional: 'yes',
    otherAI: 'no',
    tailorpic: 'no',
  },
  {
    feature: 'Multiple backgrounds',
    traditional: 'partial',
    otherAI: 'partial',
    tailorpic: 'yes',
  },
  {
    feature: 'Multiple outfit styles',
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
    feature: 'Scheduling flexibility',
    traditional: 'no',
    otherAI: 'yes',
    tailorpic: 'yes',
  },
  {
    feature: 'Money-back guarantee',
    traditional: 'no',
    otherAI: 'partial',
    tailorpic: 'yes',
  },
  {
    feature: 'Team / bulk pricing',
    traditional: 'partial',
    otherAI: 'partial',
    tailorpic: 'yes',
  },
];

/* ------------------------------------------------------------------ */
/*  ROI reasons                                                        */
/* ------------------------------------------------------------------ */

const roiReasons = [
  {
    icon: DollarSign,
    title: 'Lower Cost Per Photo',
    description: `Starting at just ${perPhotoPrice(expressPackage.price, expressPackage.outputCount)} per headshot with our Express package, compared to $30-$100+ per retouched photo at a traditional studio.`,
  },
  {
    icon: Clock,
    title: 'Time Savings',
    description:
      'No scheduling, commuting, or waiting for retouching. Upload your selfies and receive your headshots, with most orders completed within 2 hours.',
  },
  {
    icon: Sparkles,
    title: 'Variety and Flexibility',
    description: `Get up to ${execPackage.outputCount} headshots with different backgrounds, styles, and outfits in a single order. A traditional shoot typically delivers fewer than 10 final images.`,
  },
  {
    icon: Users,
    title: 'Consistent Team Branding',
    description:
      'Every team member gets the same professional style without coordinating schedules or flying everyone to the same studio.',
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

export default function PricingComparisonPage() {
  return (
    <>
      <Header />

      <main id="main-content">
        <BreadcrumbSchema
          items={[
            { name: 'Home', url: siteConfig.url },
            { name: 'Pricing', url: `${siteConfig.url}/pricing` },
            {
              name: 'Pricing Comparison',
              url: `${siteConfig.url}/pricing-comparison`,
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
              Compare &amp; Save
            </span>
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              {siteConfig.name} vs Traditional Photography
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-beige/80">
              See how AI-powered headshots deliver professional quality at a
              fraction of the cost&mdash;without the scheduling hassle, travel,
              or long wait times.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-8 py-3.5 text-base font-semibold text-tp-black transition hover:bg-tp-bronze/90"
              >
                View Our Plans
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ---- Side-by-Side Comparison Table ---- */}
        <section className="border-b border-tp-line bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="font-display text-center text-3xl text-tp-ink sm:text-4xl">
              How the Options Stack Up
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-tp-muted">
              A side-by-side look at traditional studios, other AI headshot
              services, and {siteConfig.name}.
            </p>

            <p className="mx-auto mt-3 max-w-2xl text-center text-xs text-tp-muted">
              Traditional studio and other AI service figures are rough,
              typical ranges and vary by provider and market. {siteConfig.name}
              figures come from our current plans. Individual orders start at
              $9.90; team pricing is $39 per person for 5-15 people and $29 per
              person for 16-50 people, confirmed at checkout.{' '}
              <Link
                href="/team-headshots"
                className="font-medium text-tp-bronze-ink underline underline-offset-2"
              >
                See team pricing
              </Link>
              .
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
                      <span className="mt-1 block text-xs font-normal text-tp-muted">
                        $150 - $500+
                      </span>
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-tp-ink">
                      <div className="flex items-center gap-2">
                        <Sparkles
                          className="h-4 w-4 text-tp-muted"
                          aria-hidden="true"
                        />
                        Other AI Services
                      </div>
                      <span className="mt-1 block text-xs font-normal text-tp-muted">
                        $20 - $60
                      </span>
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-tp-ink">
                      <div className="flex items-center gap-2">
                        <Shield
                          className="h-4 w-4 text-tp-bronze-ink"
                          aria-hidden="true"
                        />
                        <span className="text-tp-bronze-ink">
                          {siteConfig.name}
                        </span>
                      </div>
                      <span className="mt-1 block text-xs font-normal text-tp-bronze-ink">
                        {formatPrice(expressPackage.price)} -{' '}
                        {formatPrice(execPackage.price)}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={
                        i % 2 === 0
                          ? 'bg-white'
                          : 'bg-tp-paper/50'
                      }
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
                      <td className="border-t border-tp-line px-6 py-4">
                        <StatusCell value={row.tailorpic} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="mt-12 space-y-8 md:hidden">
              {/* Traditional */}
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
                <p className="mt-1 text-sm text-tp-muted">$150 - $500+</p>
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

              {/* Other AI */}
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
                <p className="mt-1 text-sm text-tp-muted">$20 - $60</p>
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

              {/* TailorPic */}
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
                <p className="mt-1 text-sm text-tp-bronze-ink">
                  {formatPrice(expressPackage.price)} -{' '}
                  {formatPrice(execPackage.price)}
                </p>
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

        {/* ---- Cost Breakdown ---- */}
        <section className="bg-tp-paper py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="font-display text-center text-3xl text-tp-ink sm:text-4xl">
              Cost Per Photo Breakdown
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-tp-muted">
              When you compare the per-photo value, the difference becomes even
              more clear.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {headshots.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-tp-card border p-6 text-center ${
                    pkg.recommended
                      ? 'border-tp-bronze bg-white shadow-md'
                      : 'border-tp-line bg-white'
                  }`}
                >
                  {pkg.recommended && (
                    <span className="mb-3 inline-block rounded-full bg-tp-bronze/10 px-3 py-1 text-xs font-semibold text-tp-bronze-ink">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-tp-ink">
                    {pkg.name}
                  </h3>
                  <p className="font-display mt-2 text-3xl text-tp-bronze-ink">
                    {formatPrice(pkg.price)}
                  </p>
                  <p className="mt-1 text-sm text-tp-muted">
                    {pkg.outputCount} headshots included
                  </p>
                  <div className="mt-4 rounded-lg bg-tp-paper px-4 py-3">
                    <span className="text-sm text-tp-muted">Per photo: </span>
                    <span className="font-semibold text-tp-ink">
                      {perPhotoPrice(pkg.price, pkg.outputCount)}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2 text-left">
                    {pkg.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-tp-muted"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600"
                          aria-hidden="true"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-tp-card border border-tp-line bg-white p-6 sm:p-8">
              <h3 className="font-display text-xl text-tp-ink sm:text-2xl">
                Traditional Studio Comparison
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-tp-muted">
                A typical photography studio session costs $150 to $500 or more
                and delivers 3 to 10 retouched images&mdash;that works out to
                roughly $30 to $100+ per final photo. With {siteConfig.name},
                our most popular Professional package gives you{' '}
                {proPackage.outputCount} headshots for just{' '}
                {formatPrice(proPackage.price)}, bringing the per-photo cost
                down to {perPhotoPrice(proPackage.price, proPackage.outputCount)}
                . That is a significant difference, especially for teams or
                anyone who needs variety across backgrounds and styles.
              </p>
            </div>
          </div>
        </section>

        {/* ---- ROI Section ---- */}
        <section className="border-y border-tp-line bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="font-display text-center text-3xl text-tp-ink sm:text-4xl">
              Why Professionals Choose AI Headshots
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-tp-muted">
              Beyond the price tag, AI headshots offer practical advantages that
              traditional photography simply cannot match.
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {roiReasons.map((reason) => (
                <div
                  key={reason.title}
                  className="rounded-tp-card border border-tp-line bg-white p-6 transition hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-tp-bronze/10">
                    <reason.icon
                      className="h-5 w-5 text-tp-bronze-ink"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- CTA ---- */}
        <section className="bg-tp-black py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Ready to See the Difference?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-tp-beige/80">
              Browse our plans and pick the package that fits your needs.
              Professional headshots delivered fast&mdash;starting at just{' '}
              {formatPrice(expressPackage.price)}.
            </p>
            <Link
              href="/pricing"
              className="mt-8 inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-8 py-3.5 text-base font-semibold text-tp-black transition hover:bg-tp-bronze/90"
            >
              View Pricing Plans
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
