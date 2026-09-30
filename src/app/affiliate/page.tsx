import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { siteConfig } from '@/config/site';
import {
  ArrowRight,
  UserPlus,
  Share2,
  DollarSign,
  TrendingUp,
  Cookie,
  ShoppingCart,
  CalendarCheck,
  RefreshCw,
  Image,
  BarChart3,
  Headset,
  PenTool,
  Camera,
  Briefcase,
  Users,
  Megaphone,
  ChevronDown,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Affiliate Program — Earn 35% Commission',
  description: `Join the ${siteConfig.name} Partner Program and earn 35% commission on every sale. 90-day cookie, monthly payouts, and dedicated support for bloggers, influencers, and professionals.`,
  alternates: { canonical: '/affiliate' },
  openGraph: {
    title: `Affiliate Program | ${siteConfig.name}`,
    description: `Earn 35% recurring commission promoting ${siteConfig.name}. 90-day cookie window, real-time dashboard, and monthly payouts.`,
    url: `${siteConfig.url}/affiliate`,
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const steps = [
  {
    icon: UserPlus,
    title: 'Sign Up',
    description:
      'Apply in under two minutes. We review every application and get back to you within 24 hours.',
  },
  {
    icon: Share2,
    title: 'Share Your Link',
    description:
      'Promote TailorPic with your unique referral link, banners, and ready-made content we provide.',
  },
  {
    icon: DollarSign,
    title: 'Earn Commission',
    description:
      'Earn 35% on every sale your referrals make. Track everything in real time and get paid monthly.',
  },
];

const stats = [
  { icon: TrendingUp, value: '35%', label: 'Commission per sale' },
  { icon: Cookie, value: '90-day', label: 'Cookie window' },
  { icon: ShoppingCart, value: '$50+', label: 'Avg order value' },
  { icon: CalendarCheck, value: 'Monthly', label: 'Payouts' },
];

const benefits = [
  {
    icon: RefreshCw,
    title: 'Recurring Income',
    description:
      'Every customer you refer keeps earning you commissions — build a reliable revenue stream over time.',
  },
  {
    icon: Image,
    title: 'Marketing Materials',
    description:
      'Get banners, email templates, social assets, and landing page copy — all designed to convert.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Dashboard',
    description:
      'Track clicks, conversions, and earnings live. Full transparency, no guesswork.',
  },
  {
    icon: Headset,
    title: 'Dedicated Support',
    description:
      'Your own affiliate manager plus priority email support to help you maximize earnings.',
  },
];

const audiences = [
  { icon: PenTool, title: 'Bloggers & Content Creators' },
  { icon: Megaphone, title: 'Social Media Influencers' },
  { icon: Camera, title: 'Photographers' },
  { icon: Briefcase, title: 'Career Coaches' },
  { icon: Users, title: 'HR Consultants' },
];

const earningsExamples = [
  { referrals: 10, monthly: '$175', annual: '$2,100' },
  { referrals: 50, monthly: '$875', annual: '$10,500' },
  { referrals: 100, monthly: '$1,750', annual: '$21,000' },
];

const faqs = [
  {
    question: 'How does the 90-day cookie work?',
    answer:
      'When someone clicks your referral link, a cookie is stored in their browser for 90 days. If they purchase within that window — even if they leave and come back — you earn the commission.',
  },
  {
    question: 'When and how do I get paid?',
    answer:
      'Commissions are paid monthly via PayPal or bank transfer once you reach the $50 minimum threshold. Payments are processed on the 15th of each month for the previous month\'s earnings.',
  },
  {
    question: 'Do I need a website to join?',
    answer:
      'Not necessarily. While a website or blog is helpful, you can also promote TailorPic through social media, email newsletters, YouTube, or any other platform where you have an audience.',
  },
  {
    question: 'Is there a cost to join the program?',
    answer:
      'No. The TailorPic Partner Program is completely free to join. There are no setup fees, monthly fees, or hidden costs of any kind.',
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AffiliatePage() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-tp-black py-24 sm:py-32">
          {/* decorative bronze gradient */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-tp-bronze/10 blur-[120px]"
          />
          <div className="relative mx-auto max-w-4xl px-4 text-center">
            <span className="mb-4 inline-block rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium tracking-wide text-tp-bronze">
              Partner Program
            </span>
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Earn <span className="text-tp-bronze">35% Commission</span> on
              Every Sale
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-beige/80">
              Join the {siteConfig.name} affiliate program and turn your
              audience into a revenue stream. Share AI headshots your followers
              will love — and get paid for every customer you send our way.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-tp-bronze px-8 py-3.5 text-base font-semibold text-tp-black transition hover:bg-tp-bronze/90"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 text-base font-medium text-tp-beige/70 transition hover:text-white"
              >
                Learn more
                <ChevronDown className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────────────── */}
        <section
          id="how-it-works"
          className="bg-tp-paper py-20 sm:py-28"
        >
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="font-display text-center text-3xl text-tp-ink sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-tp-muted">
              Getting started takes less than five minutes. Here is the
              process:
            </p>

            <div className="mt-14 grid gap-10 sm:grid-cols-3">
              {steps.map((step, i) => (
                <div key={step.title} className="text-center">
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-tp-bronze/10">
                    <step.icon className="h-7 w-7 text-tp-bronze-ink" />
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-tp-bronze text-xs font-bold text-tp-black">
                      {i + 1}
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

        {/* ── Stats ────────────────────────────────────────────── */}
        <section className="border-y border-tp-line bg-white py-16">
          <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center"
              >
                <stat.icon className="mb-3 h-6 w-6 text-tp-bronze-ink" />
                <span className="font-display text-3xl text-tp-ink">
                  {stat.value}
                </span>
                <span className="mt-1 text-sm text-tp-muted">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Benefits ─────────────────────────────────────────── */}
        <section className="bg-tp-paper py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="font-display text-center text-3xl text-tp-ink sm:text-4xl">
              Why Partners Love Us
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-tp-muted">
              Everything you need to succeed — from day one.
            </p>

            <div className="mt-14 grid gap-8 sm:grid-cols-2">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl border border-tp-line bg-white p-6 transition hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-tp-bronze/10">
                    <b.icon className="h-5 w-5 text-tp-bronze-ink" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who It's For ─────────────────────────────────────── */}
        <section className="border-y border-tp-line bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="font-display text-center text-3xl text-tp-ink sm:text-4xl">
              Who Is It For?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-tp-muted">
              If your audience cares about looking their best online, this
              program is for you.
            </p>

            <div className="mt-14 flex flex-wrap justify-center gap-4">
              {audiences.map((a) => (
                <div
                  key={a.title}
                  className="flex items-center gap-3 rounded-full border border-tp-line bg-tp-paper px-5 py-3"
                >
                  <a.icon className="h-5 w-5 text-tp-bronze-ink" />
                  <span className="text-sm font-medium text-tp-ink">
                    {a.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Earnings Calculator ──────────────────────────────── */}
        <section className="bg-tp-paper py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="font-display text-center text-3xl text-tp-ink sm:text-4xl">
              See Your Earning Potential
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-tp-muted">
              Based on our average order value of $50 and 35% commission rate.
            </p>

            <div className="mt-12 overflow-hidden rounded-2xl border border-tp-line bg-white">
              <div className="grid grid-cols-3 border-b border-tp-line bg-tp-ink px-6 py-3 text-sm font-semibold text-tp-beige">
                <span>Referrals / mo</span>
                <span className="text-center">Monthly</span>
                <span className="text-right">Annual</span>
              </div>
              {earningsExamples.map((row, i) => (
                <div
                  key={row.referrals}
                  className={`grid grid-cols-3 px-6 py-4 text-sm ${
                    i < earningsExamples.length - 1
                      ? 'border-b border-tp-line'
                      : ''
                  }`}
                >
                  <span className="font-medium text-tp-ink">
                    {row.referrals} customers
                  </span>
                  <span className="text-center font-semibold text-tp-bronze-ink">
                    {row.monthly}
                  </span>
                  <span className="text-right text-tp-muted">
                    {row.annual}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section className="border-y border-tp-line bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="font-display text-center text-3xl text-tp-ink sm:text-4xl">
              Frequently Asked Questions
            </h2>

            <div className="mt-12 divide-y divide-tp-line">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-tp-ink">
                    {faq.question}
                    <ChevronDown className="h-5 w-5 shrink-0 text-tp-muted transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-tp-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="bg-tp-black py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Join the {siteConfig.name} Partner Program
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-tp-beige/70">
              Start earning 35% commission today. Free to join, no minimums,
              and support every step of the way.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-tp-bronze px-8 py-3.5 text-base font-semibold text-tp-black transition hover:bg-tp-bronze/90"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
