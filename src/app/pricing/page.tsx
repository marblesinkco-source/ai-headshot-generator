import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Pricing } from '@/components/marketing/pricing';
import { CreditPackages } from '@/components/marketing/credit-packages';
import { TrustBar } from '@/components/marketing/trust-bar';
import { CostCalculator } from '@/components/marketing/cost-calculator';
import { PricingPsychology } from '@/components/marketing/pricing-psychology';
import { GuaranteeBadge } from '@/components/marketing/guarantee-badge';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { getActiveCategories } from '@/config/categories';
import { TrustBadges } from '@/components/marketing/trust-badges';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { ChevronDown, Check, Lock, RefreshCcw, CreditCard, BadgeCheck, Minus } from 'lucide-react';
import { PricingViewToggle } from '@/components/marketing/pricing-view-toggle';
import { PricingComparisonBar } from '@/components/marketing/pricing-comparison-bar';

const pricingFaqs = [
  {
    question: 'Is there a subscription?',
    answer:
      'No. You pay once for the package you choose. There are no recurring charges and nothing to cancel.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards. Payments are processed securely through Stripe.',
  },
  {
    question: 'Can I get a refund?',
    answer:
      'Yes. Every order is covered by our 14-day money-back guarantee. See our refund policy for the details.',
  },
  {
    question: 'How many photos do I get?',
    answer:
      'You receive 40+ professional headshots in a variety of styles from a single upload.',
  },
  {
    question: 'Do I need to upload many selfies?',
    answer:
      'Upload around 10-20 selfies from different angles for the best results. A minimum of 8 photos is required.',
  },
  {
    question: 'Can I use the headshots commercially?',
    answer:
      'Yes. You get full commercial rights to your headshots, so you can use them on LinkedIn, your website, print materials and advertising.',
  },
  {
    question: 'How does team pricing work?',
    answer:
      'Team pricing is per person and one-time: $39 per person for 5-15 people and $29 per person for 16-50 people. For 50+ people we offer custom pricing, so get in touch with us.',
  },
  {
    question: 'How does this compare with a studio photoshoot?',
    answer:
      'A traditional headshot session typically runs $200-$500 once you add photographer, studio, styling and travel. A TailorPic package starts at $9.90 with no studio visit or scheduling.',
  },
  {
    question: 'What do credit packages save me?',
    answer:
      'Credit packages save 20%, 40% or 52% compared with buying single packages, depending on the pack you choose. Credits are a one-time purchase, not a subscription.',
  },
  {
    question: 'Are there any hidden fees?',
    answer:
      'No. The price you see at checkout is the price you pay. There are no extra charges for downloads, resolution or commercial use.',
  },
];

const comparisonRows: { label: string; individual: boolean | string; team: boolean | string; studio: boolean | string }[] = [
  { label: 'Starting price', individual: '$9.90', team: '$29-$39 per person', studio: '$200-$500' },
  { label: 'Payment model', individual: 'One-time', team: 'One-time', studio: 'Per session' },
  { label: 'No studio visit or scheduling', individual: true, team: true, studio: false },
  { label: 'Delivered in hours', individual: true, team: true, studio: false },
  { label: 'Consistent look across a team', individual: false, team: true, studio: 'Extra coordination' },
  { label: 'Full commercial rights', individual: true, team: true, studio: 'Varies' },
  { label: '14-day money-back guarantee', individual: true, team: true, studio: false },
];

const includedFeatures = [
  {
    title: 'Photos',
    items: [
      '40+ professional headshots from a single upload',
      'A variety of styles, backgrounds and outfits',
      'High-resolution downloads',
    ],
  },
  {
    title: 'Process',
    items: [
      'Upload 10-20 selfies (minimum 8)',
      'No studio visit, no scheduling',
      'Delivered in hours',
    ],
  },
  {
    title: 'Payment & protection',
    items: [
      'One-time payment, no subscription',
      '14-day money-back guarantee',
      'Secure Stripe checkout',
    ],
  },
];

const trustSignals = [
  { icon: CreditCard, label: 'One-time payment, no subscription' },
  { icon: RefreshCcw, label: '14-day money-back guarantee' },
  { icon: BadgeCheck, label: 'Full commercial rights' },
  { icon: Lock, label: 'Secure Stripe checkout' },
];

const OG_DESCRIPTION =
  'Affordable AI photo packages for every need. Professional headshots, dating photos, pet portraits and more.';

export const metadata: Metadata = {
  title: 'Pricing',
  description: `${siteConfig.name} pricing plans — AI photos from $9.90. Choose single packages across 11 categories or save with credit packs.`,
  alternates: { canonical: '/pricing' },
  openGraph: generateOGMetadata({
    title: `Pricing | ${siteConfig.name}`,
    description: OG_DESCRIPTION,
    path: '/pricing',
  }),
  twitter: generateTwitterMetadata({
    title: `Pricing | ${siteConfig.name}`,
    description: OG_DESCRIPTION,
  }),
};

// Product + AggregateOffer built from the real package prices in config/categories.ts
const allPackagePrices = getActiveCategories()
  .flatMap((c) => c.packages)
  .map((p) => p.price / 100);

const pricingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: `${siteConfig.name} AI Photo Packages`,
  description: OG_DESCRIPTION,
  url: `${siteConfig.url}/pricing`,
  brand: { '@type': 'Brand', name: siteConfig.name },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: Math.min(...allPackagePrices).toFixed(2),
    highPrice: Math.max(...allPackagePrices).toFixed(2),
    offerCount: allPackagePrices.length,
    availability: 'https://schema.org/InStock',
    url: `${siteConfig.url}/pricing`,
  },
};

export default function PricingPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Pricing', url: `${siteConfig.url}/pricing` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
          <h1 className="text-4xl font-display font-normal tracking-tight text-tp-black sm:text-5xl">
            Simple,{' '}
            <span className="bg-gradient-to-r from-tp-bronze-ink to-tp-bronze bg-clip-text text-transparent">
              Transparent
            </span>{' '}
            Pricing
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-muted">
            One-time payment, no subscriptions. Choose your category, pick a package,
            and get studio-quality AI photos delivered in hours. Individual packages start at $9.90;
            teams pay $39 or $29 per person.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/auth/register" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
              Get your headshots from $9.90
            </Link>
            <Link href="/for-teams" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              See team pricing
            </Link>
          </div>
        </div>
      </section>

      <TrustBar />

      <section aria-label="Why buy with confidence" className="pt-8">
        <ul className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4">
          {trustSignals.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-sm font-medium text-tp-ink">
              <Icon className="h-4 w-4 text-tp-bronze-ink" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </section>

      <PricingViewToggle individual={<Pricing />} />

      <TrustBadges />

      {/* Feature comparison */}
      <section className="py-16" aria-labelledby="compare-heading">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 id="compare-heading" className="text-center font-display text-3xl font-normal text-tp-black sm:text-4xl">
            Compare your options
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-tp-muted">
            Studio price range reflects typical market estimates and varies by location.
          </p>
          <div className="mt-10 overflow-x-auto rounded-tp-card border border-tp-line bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-tp-line bg-tp-paper text-tp-ink">
                  <th scope="col" className="px-5 py-4 font-semibold">Feature</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Individual</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Team</th>
                  <th scope="col" className="px-5 py-4 font-semibold text-tp-muted">Photo studio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tp-line">
                {comparisonRows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className="px-5 py-4 font-medium text-tp-ink">{r.label}</th>
                    {([r.individual, r.team, r.studio] as const).map((v, i) => (
                      <td key={i} className="px-5 py-4 text-tp-muted">
                        {v === true ? (
                          <>
                            <Check className="h-4 w-4 text-tp-bronze-ink" aria-hidden="true" />
                            <span className="sr-only">Included</span>
                          </>
                        ) : v === false ? (
                          <>
                            <Minus className="h-4 w-4 text-tp-muted" aria-hidden="true" />
                            <span className="sr-only">Not included</span>
                          </>
                        ) : (
                          v
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16" aria-labelledby="included-heading">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2
            id="included-heading"
            className="text-center font-display text-3xl text-tp-black sm:text-4xl"
          >
            What&apos;s included
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {includedFeatures.map((g) => (
              <div key={g.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <h3 className="text-lg font-semibold text-tp-ink">{g.title}</h3>
                <ul className="mt-4 space-y-3">
                  {g.items.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-tp-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/auth/register" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
              Get your headshots from $9.90
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-tp-line" />
          <span className="text-sm font-medium text-tp-muted">or save with credits</span>
          <div className="h-px flex-1 bg-tp-line" />
        </div>
      </div>

      <CreditPackages />

      <CostCalculator />

      <section className="pb-8">
        <div className="mx-auto max-w-sm px-4 sm:px-6 lg:px-8">
          <PricingPsychology mostPopular={true} />
        </div>
      </section>

      {/* Money-back guarantee */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <GuaranteeBadge variant="card" />
          <p className="mt-3 text-center text-sm text-tp-muted">
            See exactly how refunds work in our{' '}
            <Link
              href="/refund-policy"
              className="font-medium text-tp-bronze-ink underline underline-offset-2 hover:text-tp-ink"
            >
              refund policy
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="py-16 sm:py-20" aria-labelledby="pricing-faq-heading">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2
            id="pricing-faq-heading"
            className="text-center font-display text-3xl font-normal text-tp-ink sm:text-4xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-tp-muted">
            Quick answers about pricing, payment and refunds.
          </p>
          <div className="mt-10 divide-y divide-tp-line rounded-tp-card border border-tp-line bg-white px-6">
            {pricingFaqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between text-left">
                  <span className="text-base font-medium text-tp-ink group-hover:text-tp-bronze-ink">
                    {faq.question}
                  </span>
                  <ChevronDown className="ml-4 h-5 w-5 shrink-0 text-tp-muted transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-tp-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <FAQSchema items={pricingFaqs} />

      <Footer />

      <PricingComparisonBar />
    </main>
  );
}
