import type { Metadata } from 'next';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Pricing } from '@/components/marketing/pricing';
import { CreditPackages } from '@/components/marketing/credit-packages';
import { FAQ } from '@/components/marketing/faq';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Pricing',
  description: `${siteConfig.name} pricing plans — AI photos from $9.90. Choose single packages across 11 categories or save up to 52% with annual credit packs.`,
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: `Pricing | ${siteConfig.name}`,
    description: `Affordable AI photo packages for every need. Professional headshots, dating photos, pet portraits and more.`,
    url: `${siteConfig.url}/pricing`,
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen">
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

      <Pricing />

      {/* Divider */}
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-tp-line" />
          <span className="text-sm font-medium text-tp-muted">or save with credits</span>
          <div className="h-px flex-1 bg-tp-line" />
        </div>
      </div>

      <CreditPackages />

      {/* Money-back guarantee */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-green-200 bg-green-50/50 p-8">
            <p className="text-lg font-semibold text-tp-black">100% Money-Back Guarantee</p>
            <p className="mt-2 text-sm text-tp-muted">
              Not happy with your photos? Get a full refund within 14 days, no questions asked.
              We are confident you will love the results.
            </p>
          </div>
        </div>
      </section>

      <FAQ />

      <Footer />
    </main>
  );
}
