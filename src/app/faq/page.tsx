import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { faqs, faqCategories } from '@/config/faqs';
import { siteConfig } from '@/config/site';
import { FAQSchema, BreadcrumbSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const DESCRIPTION = `Answers about ${siteConfig.name} AI headshots: how it works, pricing, privacy, delivery time, and our 14-day money-back guarantee.`;

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: DESCRIPTION,
  alternates: { canonical: '/faq' },
  openGraph: generateOGMetadata({
    title: `FAQ | ${siteConfig.name}`,
    description: DESCRIPTION,
    path: '/faq',
  }),
  twitter: generateTwitterMetadata({
    title: `FAQ | ${siteConfig.name}`,
    description: DESCRIPTION,
  }),
};

const slug = (c: string) => c.toLowerCase();

export default function FAQPage() {
  const groups = faqCategories
    .map((category) => ({
      category,
      items: faqs.filter((f) => f.category === category),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <main id="main-content" className="min-h-screen">
      <FAQSchema items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'FAQ', url: `${siteConfig.url}/faq` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
          <h1 className="font-display text-4xl tracking-tight text-tp-black sm:text-5xl">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-tp-bronze-ink to-tp-bronze bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-muted">
            Everything you need to know about {siteConfig.name} and AI-powered photo generation.
          </p>
          <nav aria-label="FAQ categories" className="mt-8 flex flex-wrap justify-center gap-2">
            {groups.map((g) => (
              <a
                key={g.category}
                href={`#${slug(g.category)}`}
                className="rounded-tp-button border border-tp-line bg-white px-4 py-2 text-sm font-medium text-tp-ink transition-colors hover:bg-tp-paper"
              >
                {g.category}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Categorized FAQ (native details/summary: accessible, no JS) */}
      <section className="bg-tp-paper/40 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-14 px-4 sm:px-6 lg:px-8">
          {groups.map((g) => (
            <div key={g.category} id={slug(g.category)} className="scroll-mt-24">
              <h2 className="font-display text-2xl text-tp-black sm:text-3xl">{g.category}</h2>
              <div className="mt-6 divide-y divide-tp-line/50 rounded-tp-card border border-tp-line bg-white">
                {g.items.map((faq) => (
                  <details key={faq.question} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-tp-paper/50 [&::-webkit-details-marker]:hidden">
                      <span className="text-base font-medium text-tp-black">{faq.question}</span>
                      <span
                        aria-hidden="true"
                        className="text-xl leading-none text-tp-bronze-ink transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="px-6 pb-5 text-base leading-relaxed text-tp-muted">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
          <p className="text-center text-sm text-tp-muted">
            See also our{' '}
            <Link href="/refund-policy" className="font-medium text-tp-bronze-ink underline underline-offset-2">
              refund policy
            </Link>{' '}
            and{' '}
            <Link href="/security" className="font-medium text-tp-bronze-ink underline underline-offset-2">
              security overview
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-tp-black">Still Have Questions?</h2>
          <p className="mt-4 text-tp-muted">
            Our support team is happy to help. Reach out and we will get back to you within hours.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-tp-button bg-tp-black px-8 py-3 text-sm font-semibold text-tp-bronze shadow-sm transition-all hover:bg-tp-black/90"
            >
              Contact Us
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center rounded-tp-button border border-tp-line px-8 py-3 text-sm font-semibold text-tp-ink transition-all hover:bg-tp-paper"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
