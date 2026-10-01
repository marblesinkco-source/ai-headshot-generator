import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Pricing } from '@/components/marketing/pricing';
import { CreditPackages } from '@/components/marketing/credit-packages';
import { FAQ } from '@/components/marketing/faq';
import { TrustBar } from '@/components/marketing/trust-bar';
import { CostCalculator } from '@/components/marketing/cost-calculator';
import { PricingPsychology } from '@/components/marketing/pricing-psychology';
import { GuaranteeBadge } from '@/components/marketing/guarantee-badge';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { siteConfig } from '@/config/site';
import { getActiveCategories } from '@/config/categories';
import { TrustBadges } from '@/components/marketing/trust-badges';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { ChevronDown } from 'lucide-react';
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
];

const OG_DESCRIPTION =
  'Affordable AI photo packages for every need. Professional headshots, dating photos, pet portraits and more.';

export const metadata: Metadata = {
  title: 'Pricing',
  description: `${siteConfig.name} pricing plans — AI photos from $9.90. Choose single packages across 11 categories or save up to 52% with annual credit packs.`,
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
          <h1 className="text-4xl font-extrabold tracking-tight text-tp-black sm:text-5xl">
            Simple,{' '}
            <span className="bg-gradient-to-r from-tp-bronze-ink to-tp-bronze bg-clip-text text-transparent">
              Transparent
            </span>{' '}
            Pricing
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-muted">
            One-time payment, no subscriptions. Choose your category, pick a package,
            and get studio-quality AI photos delivered in hours.
          </p>
        </div>
      </section>

      <TrustBar />

      <Pricing />

      <TrustBadges />

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

      <FAQ />

      {/* Pricing FAQs */}
      <section className="py-16 sm:py-20" aria-labelledby="pricing-faq-heading">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2
            id="pricing-faq-heading"
            className="text-center font-display text-3xl font-normal italic text-tp-ink sm:text-4xl"
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
