import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { FAQIllustration } from '@/components/marketing/illustrations';
import { faqs, faqCategories } from '@/config/faqs';
import { siteConfig } from '@/config/site';
import { FAQSchema, BreadcrumbSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const FaqSearch = dynamic(() => import('@/components/marketing/faq-search'));

const DESCRIPTION = 'Answers about TailorPic AI headshots: how it works, pricing, privacy and delivery time. Find what you need quickly.';

export const metadata: Metadata = {
  title: { absolute: 'TailorPic FAQ: Pricing, Privacy, Delivery & Guarantee' },
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
    <>
    <Header />
    <main id="main-content" className="min-h-screen">
      <FAQSchema items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'FAQ', url: `${siteConfig.url}/faq` },
        ]}
      />
      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
          <h1 className="font-display font-normal text-4xl tracking-tight text-tp-black sm:text-5xl">
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
          <div className="mx-auto mt-8 max-w-xs">
            <FAQIllustration className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Searchable categorized FAQ (native details/summary, server-rendered) */}
      <section className="bg-tp-paper/40 py-16 sm:py-20">
        <FaqSearch faqs={faqs} groups={groups} />
        <div className="mx-auto mt-14 max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-tp-muted">
            See also our{' '}
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
          <h2 className="font-display font-normal text-3xl text-tp-black">Still Have Questions?</h2>
          <p className="mt-4 text-tp-muted">
            Our support team is happy to help. Reach out and we aim to respond within 1 business day.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-tp-button bg-tp-black px-8 py-3 text-sm font-semibold text-tp-bronze shadow-sm transition-all hover:bg-tp-black/90"
            >
              Contact Us
            </Link>
            <Link
              href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
              className="inline-flex items-center justify-center rounded-tp-button border border-tp-line px-8 py-3 text-sm font-semibold text-tp-ink transition-all hover:bg-tp-paper"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

    </main>
    <Footer />
    </>
  );
}
