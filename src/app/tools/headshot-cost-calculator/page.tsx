import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { CalculatorForm } from './calculator-form';

const title = 'AI Headshot Cost Calculator — Compare Photography vs AI Prices | TailorPic';
const description =
  'Free calculator: see how much a professional photographer costs for headshots, dating photos, pet portraits or product shots, and how much you save with AI from $9.90.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/tools/headshot-cost-calculator' },
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}/tools/headshot-cost-calculator`,
    siteName: siteConfig.name,
    type: 'website',
    images: [siteConfig.ogImage],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AI Headshot Cost Calculator',
  description,
  url: `${siteConfig.url}/tools/headshot-cost-calculator`,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

export default function HeadshotCostCalculatorPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Free tool</p>
          <h1 className="mt-3 text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-5xl">
            AI Headshot Cost Calculator
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Find out what a professional photographer really costs once studio, makeup and travel are
            included, and compare it with AI photos from {siteConfig.name}.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <CalculatorForm />
      </section>

      <section className="border-t border-tp-line bg-tp-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-tp-ink sm:text-3xl">Ready to skip the studio?</h2>
          <p className="mt-3 text-tp-muted">
            Upload a few selfies and get studio-quality photos in hours, from $9.90.
          </p>
          <Link
            href="/auth/register"
            className={buttonVariants({ size: 'lg', className: 'mt-6' })}
          >
            Get Started
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
