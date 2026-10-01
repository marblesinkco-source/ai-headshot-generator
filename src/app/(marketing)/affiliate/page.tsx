import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import {
  Handshake,
  DollarSign,
  BarChart3,
  Zap,
  ArrowRight,
  UserPlus,
  Share2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: `Affiliate Program — Partner with ${siteConfig.name}`,
  description: `Join the ${siteConfig.name} affiliate program and earn commissions on every sale you refer. Competitive rates, marketing materials, and dedicated partner support.`,
  alternates: { canonical: '/affiliate' },
  openGraph: {
    title: `Affiliate Program | ${siteConfig.name}`,
    description: `Partner with ${siteConfig.name} and earn commissions promoting AI headshots. Competitive rates, long cookie window, and monthly payouts.`,
    url: `${siteConfig.url}/affiliate`,
    siteName: siteConfig.name,
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const whyPartner = [
  {
    icon: BarChart3,
    title: 'High Conversion Rates',
    description:
      'AI headshots are a fast-growing category. Our optimized funnel and competitive pricing mean more of your referrals convert into paying customers.',
  },
  {
    icon: DollarSign,
    title: 'Competitive Commissions',
    description:
      'Earn up to 30% commission on every sale you refer. A generous cookie window ensures you get credited even if the customer returns days later.',
  },
  {
    icon: Zap,
    title: 'Ready-Made Marketing Materials',
    description:
      'We provide banners, email templates, social media assets, and landing page copy so you can start promoting right away without creating anything from scratch.',
  },
  {
    icon: Handshake,
    title: 'Dedicated Partner Support',
    description:
      'Every affiliate gets access to a dedicated partner manager and priority email support to help you optimize campaigns and maximize earnings.',
  },
];

const steps = [
  {
    icon: UserPlus,
    number: '1',
    title: 'Apply',
    description:
      'Fill out a short application through our contact form. We review every submission and respond within a few business days.',
  },
  {
    icon: Share2,
    number: '2',
    title: 'Get Your Link & Assets',
    description:
      'Once approved, you receive a unique referral link, tracking dashboard, and a library of marketing materials to use across your channels.',
  },
  {
    icon: DollarSign,
    number: '3',
    title: 'Earn Commissions',
    description:
      'Share your link with your audience. Every qualifying sale earns you a commission, tracked in real time and paid out monthly.',
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AffiliatePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Affiliate Program', url: `${siteConfig.url}/affiliate` },
        ]}
      />
      <Header />
      <main id="main-content">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-tp-black py-24 sm:py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-tp-bronze/10 blur-[120px]"
          />
          <div className="relative mx-auto max-w-4xl px-4 text-center">
            <span className="mb-4 inline-block rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium tracking-wide text-tp-bronze">
              Partner Program
            </span>
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Partner with{' '}
              <span className="text-tp-bronze">{siteConfig.name}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-beige/80">
              Earn up to 30% commission on every sale you refer. Join our
              affiliate program and turn your audience into a revenue stream
              while helping people look their professional best.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-8 py-3.5 text-base font-semibold text-tp-black transition hover:bg-tp-bronze/90"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Commission Structure ─────────────────────────────── */}
        <section className="border-b border-tp-line bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="font-display text-3xl text-tp-ink sm:text-4xl">
              Commission Structure
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-tp-muted">
              Earn up to 30% commission on every qualifying sale. Our program
              features a generous cookie window so you get credited even when
              customers take their time to decide. Commissions are tracked in
              real time and paid out monthly once you reach the minimum
              threshold.
            </p>
            <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-3">
              <div className="rounded-tp-card border border-tp-line bg-tp-paper p-6 text-center">
                <span className="font-display text-3xl text-tp-bronze-ink">
                  Up to 30%
                </span>
                <p className="mt-2 text-sm text-tp-muted">
                  Commission per sale
                </p>
              </div>
              <div className="rounded-tp-card border border-tp-line bg-tp-paper p-6 text-center">
                <span className="font-display text-3xl text-tp-bronze-ink">
                  Monthly
                </span>
                <p className="mt-2 text-sm text-tp-muted">
                  Payout schedule
                </p>
              </div>
              <div className="rounded-tp-card border border-tp-line bg-tp-paper p-6 text-center">
                <span className="font-display text-3xl text-tp-bronze-ink">
                  Real-Time
                </span>
                <p className="mt-2 text-sm text-tp-muted">
                  Tracking dashboard
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Partner ──────────────────────────────────────── */}
        <section className="bg-tp-paper py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="font-display text-center text-3xl text-tp-ink sm:text-4xl">
              Why Partner with Us
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-tp-muted">
              Everything you need to succeed as an affiliate — from day one.
            </p>

            <div className="mt-14 grid gap-8 sm:grid-cols-2">
              {whyPartner.map((item) => (
                <div
                  key={item.title}
                  className="rounded-tp-card border border-tp-line bg-white p-6 transition hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-tp-bronze/10">
                    <item.icon className="h-5 w-5 text-tp-bronze-ink" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How to Apply ─────────────────────────────────────── */}
        <section className="border-y border-tp-line bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="font-display text-center text-3xl text-tp-ink sm:text-4xl">
              How to Apply
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-tp-muted">
              Getting started is simple. Here is how it works:
            </p>

            <div className="mt-14 grid gap-10 sm:grid-cols-3">
              {steps.map((step) => (
                <div key={step.title} className="text-center">
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-tp-bronze/10">
                    <step.icon className="h-7 w-7 text-tp-bronze-ink" />
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-tp-bronze text-xs font-bold text-tp-black">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-tp-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="bg-tp-black py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Ready to Start Earning?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-tp-beige/70">
              Apply to the {siteConfig.name} affiliate program today. It is free
              to join and we provide everything you need to get started.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-8 py-3.5 text-base font-semibold text-tp-black transition hover:bg-tp-bronze/90"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-sm text-tp-beige/50">
              All applications are reviewed by our team. We will get back to you
              within a few business days.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
