import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { siteConfig } from '@/config/site';
import {
  Handshake,
  DollarSign,
  BarChart3,
  Zap,
  ArrowRight,
  UserPlus,
  Share2,
  CalendarClock,
  Clock,
  LayoutDashboard,
} from 'lucide-react';

const AFFILIATE_OG_TITLE = `Affiliate Program | ${siteConfig.name}`;
const AFFILIATE_OG_DESCRIPTION = `Partner with ${siteConfig.name} and earn competitive commissions promoting AI headshots. Referral tracking dashboard and monthly payouts.`;

export const metadata: Metadata = {
  title: { absolute: 'TailorPic Affiliate Program: Earn on Every Referred Sale' },
  description: `Join the ${siteConfig.name} affiliate program and earn commissions on every sale you refer. Competitive rates, marketing materials, and dedicated partner support.`,
  alternates: { canonical: '/affiliate' },
  openGraph: generateOGMetadata({
    title: AFFILIATE_OG_TITLE,
    description: AFFILIATE_OG_DESCRIPTION,
    subtitle: 'Earn competitive commissions per sale',
    path: '/affiliate',
  }),
  twitter: generateTwitterMetadata({
    title: AFFILIATE_OG_TITLE,
    description: AFFILIATE_OG_DESCRIPTION,
  }),
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
      'Earn competitive commissions on every sale you refer. A generous cookie window ensures you get credited even if the customer returns days later.',
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
    title: 'Sign Up',
    description:
      'Fill out a short application through our contact form. We review every submission and respond within a few business days.',
  },
  {
    icon: Share2,
    number: '2',
    title: 'Share Your Link',
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

const trustSignals = [
  {
    icon: Clock,
    title: 'Cookie-based tracking',
    description: 'Referrals are tracked with a cookie window so you are credited when customers return later.',
  },
  {
    icon: CalendarClock,
    title: 'Monthly payouts',
    description: 'Approved commissions are paid out once a month after you reach the minimum threshold.',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard access',
    description: 'Follow clicks, referrals, and commissions in your affiliate tracking dashboard.',
  },
];

const affiliateFaqs = [
  {
    question: 'How much commission can I earn?',
    answer: 'You earn competitive commissions on every qualifying sale you refer. Your exact rate is confirmed when your application is approved.',
  },
  {
    question: 'How and when do I get paid?',
    answer: 'Commissions are tracked in your dashboard and paid out monthly once you reach the minimum payout threshold. Payout details are shared when you are approved.',
  },
  {
    question: 'How long does the referral cookie last?',
    answer: 'We use a cookie window so you are credited even if a customer returns later to purchase. The exact duration is confirmed in your affiliate agreement.',
  },
  {
    question: 'Does it cost anything to join?',
    answer: 'No. The affiliate program is free to join. Every application is reviewed by our team.',
  },
  {
    question: 'Who is a good fit for the program?',
    answer: 'Bloggers, career coaches, resume writers, recruiters, newsletter authors, and creators whose audience needs professional headshots.',
  },
  {
    question: 'How do I track my referrals?',
    answer: 'Once approved you receive a unique referral link and access to a tracking dashboard showing your referrals and commissions.',
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
      <FAQSchema items={affiliateFaqs} />
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
            <h1 className="font-display font-normal text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Partner with{' '}
              <span className="text-tp-bronze">{siteConfig.name}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-beige/80">
              Earn competitive commissions on every sale you refer. Join our
              affiliate program and turn your audience into a revenue stream
              while helping people look their professional best.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact?subject=affiliate"
                className={cn(buttonVariants({ size: 'lg' }), 'bg-tp-bronze text-tp-black shadow-lg shadow-tp-bronze/20 hover:bg-tp-bronze/90 active:bg-tp-bronze/80')}
              >
                Join Affiliate Program
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Commission Structure ─────────────────────────────── */}
        <section className="border-b border-tp-line bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
              Commission Structure
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-tp-muted">
              Earn competitive commissions on every qualifying sale. Our program
              features a generous cookie window so you get credited even when
              customers take their time to decide. Commissions are tracked in
              real time and paid out monthly once you reach the minimum
              threshold.
            </p>
            <div className="mx-auto mt-10 max-w-3xl rounded-tp-card bg-tp-black p-8 text-center sm:p-10">
              <p className="text-sm font-medium uppercase tracking-widest text-tp-bronze-ink">
                Your commission
              </p>
              <p className="mt-3 font-display font-normal text-6xl text-tp-bronze-ink sm:text-7xl">
                Competitive
              </p>
              <p className="mt-3 text-tp-beige/80">
                on every qualifying sale you refer. Your exact rate is confirmed on approval.
              </p>
            </div>
            <div className="mx-auto mt-6 grid max-w-3xl gap-6 sm:grid-cols-3">
              <div className="rounded-tp-card border border-tp-line bg-tp-paper p-6 text-center">
                <span className="font-display font-normal text-3xl text-tp-bronze-ink">
                  Competitive
                </span>
                <p className="mt-2 text-sm text-tp-muted">
                  Commission rate
                </p>
              </div>
              <div className="rounded-tp-card border border-tp-line bg-tp-paper p-6 text-center">
                <span className="font-display font-normal text-3xl text-tp-bronze-ink">
                  Monthly
                </span>
                <p className="mt-2 text-sm text-tp-muted">
                  Payout schedule
                </p>
              </div>
              <div className="rounded-tp-card border border-tp-line bg-tp-paper p-6 text-center">
                <span className="font-display font-normal text-3xl text-tp-bronze-ink">
                  Real-Time
                </span>
                <p className="mt-2 text-sm text-tp-muted">
                  Tracking dashboard
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust Signals ────────────────────────────────────── */}
        <section className="border-b border-tp-line bg-tp-paper py-12">
          <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:grid-cols-3">
            {trustSignals.map((t) => (
              <div key={t.title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-tp-button bg-tp-bronze/10">
                  <t.icon className="h-5 w-5 text-tp-bronze-ink" />
                </div>
                <div>
                  <h3 className="font-semibold text-tp-ink">{t.title}</h3>
                  <p className="mt-1 text-sm text-tp-muted">{t.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Why Partner ──────────────────────────────────────── */}
        <section className="bg-tp-paper py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="font-display font-normal text-center text-3xl text-tp-ink sm:text-4xl">
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
                  <div className="flex h-11 w-11 items-center justify-center rounded-tp-button bg-tp-bronze/10">
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

        {/* ── How It Works ─────────────────────────────────────── */}
        <section className="border-y border-tp-line bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="font-display font-normal text-center text-3xl text-tp-ink sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-tp-muted">
              Three simple steps from sign-up to your first commission.
            </p>

            <div className="mt-14 grid gap-10 sm:grid-cols-3">
              {steps.map((step) => (
                <div key={step.title} className="text-center">
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-tp-card bg-tp-bronze/10">
                    <step.icon className="h-7 w-7 text-tp-bronze-ink" />
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-tp-bronze text-xs font-semibold text-tp-black">
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

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section className="bg-tp-paper py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="text-center font-display text-3xl font-normal text-tp-ink sm:text-4xl">
              Affiliate FAQ
            </h2>
            <div className="mt-10 divide-y divide-tp-line rounded-tp-card border border-tp-line bg-white">
              {affiliateFaqs.map((f) => (
                <details key={f.question} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-tp-ink">
                    {f.question}
                    <span className="text-tp-bronze-ink transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-tp-muted">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="bg-tp-black py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display font-normal text-3xl text-white sm:text-4xl">
              Ready to Start Earning?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-tp-beige/70">
              Apply to the {siteConfig.name} affiliate program today. It is free
              to join and we provide everything you need to get started.
            </p>
            <Link
              href="/contact?subject=affiliate"
              className={cn(buttonVariants({ size: 'lg' }), 'mt-8 bg-tp-bronze text-tp-black shadow-lg shadow-tp-bronze/20 hover:bg-tp-bronze/90 active:bg-tp-bronze/80')}
            >
              Join Affiliate Program
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
