import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/structured-data';
import { CalculatorForm } from './calculator-form';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

const title = 'AI Headshot Cost Calculator: Photographer vs AI Prices';
const description =
  'Free calculator: see what a professional photographer costs for headshots, dating photos, pet portraits or product shots, and how much you save with AI.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/tools/headshot-cost-calculator' },
  openGraph: generateOGMetadata({ title: title, description: description, path: '/tools/headshot-cost-calculator' }),
  twitter: generateTwitterMetadata({ title: title, description: description }),
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

const faqs = [
  {
    q: "How much does a professional headshot photographer cost?",
    a: "Prices vary widely by location, photographer experience and what is included. Studio time, retouching, makeup and travel can all add to the total. The calculator lets you enter your own figures so you can see the full cost for your situation.",
  },
  {
    q: "How does AI compare with a photographer on cost?",
    a: `AI headshots generally cost less because there is no studio, travel or scheduling. TailorPic plans start from ${BASE_PRICE_DISPLAY}, and the calculator shows the difference using the figures you enter.`,
  },
  {
    q: "What does the calculator include?",
    a: "It estimates photographer costs such as the session fee, makeup and travel, and compares them with AI photos. It covers headshots as well as dating photos, pet portraits and product shots.",
  },
  {
    q: "Is the cost calculator free?",
    a: "Yes, the calculator is free to use and you do not need an account. The results are estimates based on the values you enter, not quotes from any photographer.",
  },
];

export default function HeadshotCostCalculatorPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'Headshot Cost Calculator', url: `${siteConfig.url}/tools/headshot-cost-calculator` },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
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

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">Frequently asked questions</h2>
          <div className="mt-8 divide-y divide-tp-line rounded-tp-card border border-tp-line bg-white">
            {faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-tp-ink">
                  {f.q}
                  <span className="text-tp-bronze-ink transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-tp-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-tp-line bg-tp-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-display font-normal text-tp-ink sm:text-3xl">Ready to skip the studio?</h2>
          <p className="mt-3 text-tp-muted">
            Upload a few selfies and get studio-quality photos in hours, from {BASE_PRICE_DISPLAY}.
          </p>
          <Link
            href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
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
