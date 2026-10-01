import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { FAQ } from '@/components/marketing/faq';
import { faqs } from '@/config/faqs';
import { siteConfig } from '@/config/site';
import { FAQSchema, BreadcrumbSchema } from '@/components/structured-data';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: `Common questions about ${siteConfig.name} — how AI photos work, pricing, privacy, delivery time, and more.`,
  alternates: { canonical: '/faq' },
  openGraph: {
    title: `FAQ | ${siteConfig.name}`,
    description: `Find answers to common questions about ${siteConfig.name} AI photo generation.`,
    url: `${siteConfig.url}/faq`,
  },
};

export default function FAQPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <FAQSchema items={faqs.map(f => ({ question: f.question, answer: f.answer }))} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'FAQ', url: `${siteConfig.url}/faq` },
      ]} />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-tp-black sm:text-5xl">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-tp-bronze-ink to-tp-bronze bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-muted">
            Everything you need to know about {siteConfig.name} and AI-powered photo generation.
          </p>
        </div>
      </section>

      <FAQ />

      {/* Still have questions CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-tp-black">Still Have Questions?</h2>
          <p className="mt-4 text-tp-muted">
            Our support team is happy to help. Reach out and we will get back to you within hours.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-tp-black px-8 py-3 text-sm font-semibold text-tp-bronze shadow-sm transition-all hover:bg-tp-black/90"
            >
              Contact Us
            </Link>
            <Link
              href="/dashboard/upload"
              className="inline-flex items-center justify-center rounded-xl border border-tp-line px-8 py-3 text-sm font-semibold text-tp-ink transition-all hover:bg-tp-paper"
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
