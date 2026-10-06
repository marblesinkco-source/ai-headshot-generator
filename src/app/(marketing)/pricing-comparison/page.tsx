import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { siteConfig } from '@/config/site';
import { CATEGORIES, type CategoryPackage } from '@/config/categories';
import { BASE_PRICE_DISPLAY, TEAM_PRICES } from '@/config/pricing';
import { formatPrice } from '@/lib/utils';
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

const TEAM_SMALL = formatPrice(TEAM_PRICES.small.perPersonCents, 'usd', true);
const TEAM_LARGE = formatPrice(TEAM_PRICES.large.perPersonCents, 'usd', true);

const OG_TITLE = `Pricing Comparison | ${siteConfig.name}`;
const OG_DESCRIPTION = `Compare AI headshot pricing: ${siteConfig.name} from ${BASE_PRICE_DISPLAY} one-time vs traditional studios vs other AI services.`;

export const metadata: Metadata = {
  title: { absolute: 'TailorPic vs Traditional Photography: Price Comparison' },
  description: 'Compare TailorPic AI headshots with traditional photography studios and other AI services. See how you can save time and money with professional results.',
  alternates: { canonical: '/pricing-comparison' },
  openGraph: generateOGMetadata({
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    type: 'vs',
    subtitle: 'Studio vs other AI vs TailorPic',
    path: '/pricing-comparison',
  }),
  twitter: generateTwitterMetadata({
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    type: 'vs',
  }),
};

/* ------------------------------------------------------------------ */
/*  Pricing data from config                                           */
/* ------------------------------------------------------------------ */

const headshots = CATEGORIES.headshots;
const _fallback: CategoryPackage = {
  id: 'fallback',
  name: 'Headshots',
  price: 199,
  currency: 'usd',
  outputCount: 1,
  features: ['HD resolution'],
};
const _first = headshots.packages[0] ?? _fallback;
const _last = headshots.packages[headshots.packages.length - 1] ?? _first;
const tailorpic1Package = headshots.packages.find((p) => p.id === 'headshots-tailorpic1') ?? _first; // TailorPic 1: $1.99, 1 headshot
const litePackage = headshots.packages.find((p) => p.id === 'headshots-lite') ?? _first; // Lite: $9.90, 5 headshots
const basicPackage = headshots.packages.find((p) => p.id === 'headshots-express') ?? _first; // Basic: $19.90, 10 headshots
const starterPackage = headshots.packages.find((p) => p.id === 'headshots-starter') ?? _first; // Starter: $29.90, 40 headshots
const proPackage = headshots.packages.find((p) => p.id === 'headshots-professional') ?? _first; // Professional: $49.90, 80 headshots
const execPackage = headshots.packages.find((p) => p.id === 'headshots-executive') ?? _last; // Executive: $89.90, 160 headshots

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
    tailorpic: `${formatPrice(tailorpic1Package.price)} - ${formatPrice(execPackage.price)}`,
  },
  {
    feature: 'Number of photos included',
    traditional: '3 - 10 retouched',
    otherAI: '10 - 40',
    tailorpic: `${tailorpic1Package.outputCount} - ${execPackage.outputCount}`,
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
    feature: 'Satisfaction guarantee',
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
    description: `Starting at just ${perPhotoPrice(tailorpic1Package.price, tailorpic1Package.outputCount)} per headshot with our TailorPic 1 package, compared to $30-$100+ per retouched photo at a traditional studio.`,
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
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    question: `How much does ${siteConfig.name} cost?`,
    answer: `Individual orders start at ${BASE_PRICE_DISPLAY} as a one-time payment, with no subscription. Larger packages add more headshots, backgrounds and styles. Team pricing is ${TEAM_SMALL} per person for ${TEAM_PRICES.small.min}-${TEAM_PRICES.small.max} people and ${TEAM_LARGE} per person for ${TEAM_PRICES.large.min}-${TEAM_PRICES.large.max} people, confirmed at checkout.`,
  },
  {
    question: 'How does the price compare to a photography studio?',
    answer: `Traditional studio sessions typically cost $150 to $500 or more and deliver a small number of retouched images. ${siteConfig.name} is a one-time payment starting at ${BASE_PRICE_DISPLAY}. Studio figures are rough, typical ranges and vary by provider and market.`,
  },
  {
    question: 'Are there subscriptions or hidden fees?',
    answer: `No. You pay once per order. Many other AI headshot services charge monthly or per-order fees that vary by provider, so check their current terms.`,
  },
  {
    question: 'How fast will I get my headshots?',
    answer: 'Most orders are completed within about 2 hours. A traditional studio typically takes one to two weeks including scheduling and retouching.',
  },
  {
    question: 'Is there a satisfaction guarantee?',
    answer: `Yes. If you are not satisfied, contact our support team and we will review your order for a resolution.`,
  },
  {
    question: 'Do you offer team or bulk pricing?',
    answer: 'Yes. Team pricing lowers the per-person cost for groups of 5 to 50, and everyone gets a consistent professional style.',
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
        <FAQSchema items={faqs} />
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
            <h1 className="font-display text-4xl font-normal leading-tight text-white sm:text-5xl lg:text-6xl">
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
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'bg-tp-bronze text-tp-black hover:bg-tp-bronze/90',
                )}
              >
                Start from {BASE_PRICE_DISPLAY}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-tp-beige/80">
              <li className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-tp-bronze" aria-hidden="true" />
                {BASE_PRICE_DISPLAY} one-time
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-tp-bronze" aria-hidden="true" />
                Most orders in ~2 hours
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-tp-bronze" aria-hidden="true" />
                Many backgrounds &amp; styles
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-tp-bronze" aria-hidden="true" />
                Satisfaction guarantee
              </li>
            </ul>
          </div>
        </section>

        {/* ---- Side-by-Side Comparison Table ---- */}
        <section className="border-b border-tp-line bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="font-display text-center text-3xl font-normal text-tp-ink sm:text-4xl">
              How the Options Stack Up
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-tp-muted">
              A side-by-side look at traditional studios, other AI headshot
              services, and {siteConfig.name}.
            </p>

            <p className="mx-auto mt-3 max-w-2xl text-center text-xs text-tp-muted">
              Traditional studio and other AI service figures are rough,
              typical ranges and vary by provider and market. {siteConfig.name}{' '}
              figures come from our current plans. Individual orders start at{' '}
              {BASE_PRICE_DISPLAY}; team pricing is {TEAM_SMALL} per person for{' '}
              {TEAM_PRICES.small.min}-{TEAM_PRICES.small.max} people and {TEAM_LARGE} per
              person for {TEAM_PRICES.large.min}-{TEAM_PRICES.large.max} people, confirmed at checkout.{' '}
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
                      <span className="mt-1 block text-xs font-normal text-tp-bronze-ink">
                        {formatPrice(tailorpic1Package.price)} -{' '}
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
                  {formatPrice(tailorpic1Package.price)} -{' '}
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
            <h2 className="font-display text-center text-3xl font-normal text-tp-ink sm:text-4xl">
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
                  <p className="font-display font-normal mt-2 text-3xl text-tp-bronze-ink">
                    {formatPrice(pkg.price)}
                  </p>
                  <p className="mt-1 text-sm text-tp-muted">
                    {pkg.outputCount} {pkg.outputCount === 1 ? 'headshot' : 'headshots'} included
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
              <h3 className="font-display font-normal text-xl text-tp-ink sm:text-2xl">
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
            <h2 className="font-display text-center text-3xl font-normal text-tp-ink sm:text-4xl">
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

        {/* ---- FAQ ---- */}
        <section className="bg-tp-paper py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="font-display text-center text-3xl font-normal text-tp-ink sm:text-4xl">
              Pricing Questions
            </h2>
            <div className="mt-10 space-y-4">
              {faqs.map((f) => (
                <details
                  key={f.question}
                  className="group rounded-tp-card border border-tp-line bg-white p-5"
                >
                  <summary className="cursor-pointer list-none font-semibold text-tp-ink">
                    {f.question}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-tp-muted">
                    {f.answer}
                  </p>
                </details>
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
              Professional Headshots from {BASE_PRICE_DISPLAY}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-tp-beige/80">
              One-time payment, most orders ready in about 2 hours, and a
              satisfaction guarantee. Pick the package that fits your needs.
            </p>
            <Link
              href="/pricing"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'mt-8 bg-tp-bronze text-tp-black shadow-lg shadow-tp-bronze/20 hover:bg-tp-bronze/90',
              )}
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
