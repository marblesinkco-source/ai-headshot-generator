import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/structured-data';
import { CalculatorForm } from './calculator-form';

const title = 'Team Headshot ROI Calculator: Photographer vs AI';
const description =
  'Free calculator: enter your team size and your own photographer estimate to compare traditional team headshots with TailorPic team pricing, including estimated time saved.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/tools/team-headshot-calculator' },
  openGraph: generateOGMetadata({ title: title, description: description, path: '/tools/team-headshot-calculator' }),
  twitter: generateTwitterMetadata({ title: title, description: description }),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Team Headshot ROI Calculator',
  description,
  url: `${siteConfig.url}/tools/team-headshot-calculator`,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

export default function TeamHeadshotCalculatorPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'Team Headshot Calculator', url: `${siteConfig.url}/tools/team-headshot-calculator` },
      ]} />
      <Header />

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Free tool</p>
          <h1 className="mt-3 text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-5xl">
            Team Headshot ROI Calculator
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Enter your team size and your own photographer quote to see the difference in cost and
            time compared with {siteConfig.name} team pricing.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <CalculatorForm />
      </section>

      <Footer />
    </main>
  );
}
