import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import {
  Gift,
  Users,
  CreditCard,
  ArrowRight,
  Mail,
  Share2,
  CheckCircle,
  ChevronDown,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Referral Program — Earn Credits by Referring Friends | TailorPic',
  description:
    'Share TailorPic with friends and earn credits when they sign up. Our referral program rewards both you and the people you refer.',
  alternates: { canonical: '/referral' },
  openGraph: {
    title: `Referral Program | ${siteConfig.name}`,
    description:
      'Earn credits by sharing TailorPic with your network. Your friends get a discount, you get credits toward your next order.',
    url: `${siteConfig.url}/referral`,
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const steps = [
  {
    step: '1',
    icon: Share2,
    title: 'Share Your Link',
    desc: 'Get your unique referral link from your dashboard and share it with friends, colleagues, or on social media.',
  },
  {
    step: '2',
    icon: Users,
    title: 'Friend Signs Up',
    desc: 'When someone uses your link to create an account and place their first order, they receive a welcome discount.',
  },
  {
    step: '3',
    icon: CreditCard,
    title: 'You Both Earn Credits',
    desc: 'You receive credits toward your next order, and your friend enjoys savings on theirs. Everyone benefits.',
  },
];

const faqItems = [
  {
    q: 'How does the referral program work?',
    a: 'Once the program launches, you will receive a unique referral link from your dashboard. Share it with anyone you think would benefit from AI-generated headshots. When they sign up and make a purchase using your link, both of you earn credits.',
  },
  {
    q: 'Is there a limit to how many people I can refer?',
    a: 'No. You can refer as many friends and colleagues as you like. Each successful referral earns you credits, with no cap on the total amount you can accumulate.',
  },
  {
    q: 'When will the referral program be available?',
    a: 'We are putting the finishing touches on the referral system and plan to launch it soon. Join the waitlist below and we will notify you the moment it goes live.',
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ReferralPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Referral Program', url: `${siteConfig.url}/referral` },
        ]}
      />
      <Header />

      {/* ── Hero ── */}
      <section className="relative bg-tp-black py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#C9A98A_0%,transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-xs font-semibold text-tp-bronze mb-6">
            <Gift className="h-3.5 w-3.5" />
            Coming Soon
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            Earn Credits by Referring Friends
          </h1>
          <p className="mt-5 text-lg text-tp-beige/70 max-w-2xl mx-auto leading-relaxed">
            Share TailorPic with your network and get rewarded. Your friends save on
            professional AI headshots, and you earn credits toward your next order.
          </p>
          <div className="mt-8">
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
            >
              Join the Waitlist <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl text-tp-ink">
              How It Works
            </h2>
            <p className="mt-3 text-tp-muted max-w-xl mx-auto">
              Three simple steps to start earning credits with every referral.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-tp-card bg-tp-black mb-4">
                  <s.icon className="h-6 w-6 text-tp-bronze" />
                </div>
                <h3 className="text-lg font-semibold text-tp-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
              Why Refer
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-tp-ink">
              Benefits for Both of You
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {/* For the referred friend */}
            <div className="rounded-tp-card border border-tp-line bg-white p-7">
              <Gift className="h-8 w-8 text-tp-bronze mb-4" />
              <h3 className="text-lg font-semibold text-tp-ink mb-3">
                For Your Friend
              </h3>
              <ul className="space-y-2.5">
                {[
                  'Discount on their first order',
                  'Works on any headshot package',
                  'Applied automatically at checkout',
                  'No minimum purchase required',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-tp-muted"
                  >
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* For the referrer */}
            <div className="rounded-tp-card border border-tp-line bg-white p-7">
              <CreditCard className="h-8 w-8 text-tp-bronze mb-4" />
              <h3 className="text-lg font-semibold text-tp-ink mb-3">For You</h3>
              <ul className="space-y-2.5">
                {[
                  'Earn credits for every successful referral',
                  'No limit on how many friends you refer',
                  'Credits never expire',
                  'Stack credits for bigger orders',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-tp-muted"
                  >
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Waitlist / Email Capture ── */}
      <section id="waitlist" className="py-16 sm:py-20">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="h-10 w-10 text-tp-bronze mx-auto mb-4" />
          <h2 className="font-display text-3xl sm:text-4xl text-tp-ink">
            Join the Waitlist
          </h2>
          <p className="mt-3 text-tp-muted max-w-md mx-auto">
            Be the first to know when our referral program launches. Drop your
            email and we will send you an invite as soon as it is ready.
          </p>
          <form
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={undefined}
          >
            <input
              type="email"
              placeholder="you@example.com"
              required
              className="flex-1 rounded-tp-button border border-tp-line bg-white px-4 py-3 text-sm text-tp-ink placeholder:text-tp-muted focus:outline-none focus:ring-2 focus:ring-tp-bronze/40"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-tp-button bg-tp-bronze px-6 py-3 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
            >
              Notify Me <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-3 text-xs text-tp-muted">
            No spam, ever. We will only email you about the referral program launch.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl text-tp-ink">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.q}
                className="group rounded-tp-card border border-tp-line bg-white"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-sm font-semibold text-tp-ink">
                  {item.q}
                  <ChevronDown className="h-4 w-4 text-tp-muted transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-5 text-sm text-tp-muted leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-tp-black py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-white">
            Ready to Start Earning?
          </h2>
          <p className="mt-4 text-tp-beige/60">
            Join the waitlist today and be among the first to earn credits when our
            referral program goes live.
          </p>
          <div className="mt-8">
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
            >
              Join the Waitlist <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
