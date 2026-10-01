import type { Metadata } from 'next';
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
import { TrustBadges } from '@/components/marketing/trust-badges';
import { BreadcrumbSchema } from '@/components/structured-data';

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

export default function PricingPage() {
  return (
    <main className="min-h-screen">
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
        </div>
      </section>

      <FAQ />

      <Footer />
    </main>
  );
}
