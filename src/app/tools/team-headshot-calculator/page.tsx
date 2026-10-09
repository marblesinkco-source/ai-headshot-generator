import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { siteConfig } from '@/config/site';
import { TEAM_PRICE_SMALL_DISPLAY, TEAM_PRICE_LARGE_DISPLAY } from '@/config/pricing';
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

const faqs = [
  {
    q: 'How does the team headshot calculator work?',
    a: 'You enter your team size and your own photographer quote, and the calculator compares the cost and time with TailorPic team pricing.',
  },
  {
    q: 'How much does TailorPic charge per person for teams?',
    a: `Team pricing is ${TEAM_PRICE_SMALL_DISPLAY} per person for 5 to 15 people and ${TEAM_PRICE_LARGE_DISPLAY} per person for 16 to 50 people.`,
  },
  {
    q: 'Does the calculator include the cost of my own photographer?',
    a: 'It uses the quote you enter, so the comparison reflects your own figures rather than a generic estimate.',
  },
  {
    q: 'Is the calculator result a binding quote?',
    a: 'No. It is an estimate to help you compare options. Check the pricing page for current team plans.',
  },
];

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

      <Footer />
    </main>
  );
}
