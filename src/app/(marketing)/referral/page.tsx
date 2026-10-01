import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import {
  Gift,
  Users,
  CreditCard,
  ArrowRight,
  Share2,
  ChevronDown,
  Sparkles,
  Heart,
  Repeat,
  Trophy,
  Clock,
  Zap,
} from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'TailorPic Referral Program: Share and Get Rewarded' },
  description:
    'Share TailorPic with friends and colleagues. They get professional AI headshots, you get rewarded. Join our referral program today.',
  alternates: { canonical: '/referral' },
  openGraph: generateOGMetadata({
    title: `Referral Program | ${siteConfig.name}`,
    description:
      'Share TailorPic with your network. Your friends get great headshots, you get rewarded for every referral.',
    path: '/referral',
  }),
  twitter: generateTwitterMetadata({
    title: `Referral Program | ${siteConfig.name}`,
    description:
      'Share TailorPic with your network. Your friends get great headshots, you get rewarded for every referral.',
  }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const steps = [
  {
    step: '01',
    icon: Share2,
    title: 'Share Your Link',
    desc: 'Grab your unique referral link from your dashboard and share it with friends, colleagues, or across social media.',
  },
  {
    step: '02',
    icon: Users,
    title: 'Friend Orders',
    desc: 'When someone uses your link to sign up and place their first headshot order, the referral is tracked automatically.',
  },
  {
    step: '03',
    icon: Gift,
    title: 'You Earn Rewards',
    desc: 'You receive credits toward your next order. The more people you refer, the more you earn -- with no cap on referrals.',
  },
];

const referrerBenefits = [
  { icon: CreditCard, text: 'Earn credits for every successful referral' },
  { icon: Repeat, text: 'No limit on how many friends you can refer' },
  { icon: Clock, text: 'Credits never expire once earned' },
  { icon: Trophy, text: 'Stack credits for bigger orders or upgrades' },
];

const refereeBenefits = [
  { icon: Sparkles, text: 'Welcome discount on their first order' },
  { icon: Zap, text: 'Works on any headshot package' },
  { icon: Heart, text: 'Applied automatically at checkout' },
  { icon: Gift, text: 'No minimum purchase required' },
];

const faqItems = [
  {
    q: 'How does the referral program work?',
    a: 'You receive a unique referral link from your dashboard. Share it with anyone you think would benefit from AI-generated headshots. When they sign up and make a purchase using your link, both of you earn credits.',
  },
  {
    q: 'Is there a limit to how many people I can refer?',
    a: 'No. You can refer as many friends and colleagues as you like. Each successful referral earns you credits, with no cap on the total amount you can accumulate.',
  },
  {
    q: 'When do I receive my referral credits?',
    a: 'Credits are added to your account once your referred friend completes their first purchase. You will receive a notification when the credits are available.',
  },
  {
    q: 'Do my referral credits expire?',
    a: 'No, your earned referral credits never expire. You can use them whenever you are ready to place your next order or upgrade a package.',
  },
  {
    q: 'Can I use referral credits with other promotions?',
    a: 'Yes, referral credits can typically be combined with other active promotions. Check your dashboard for the most up-to-date information on credit stacking.',
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
      <FAQSchema
        items={faqItems.map((item) => ({ question: item.q, answer: item.a }))}
      />
      <Header />

      {/* ── Hero ── */}
      <section className="relative bg-tp-black py-24 sm:py-32 overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#C9A98A_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,#C9A98A_0%,transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-xs font-semibold text-tp-bronze mb-8">
            <Gift className="h-3.5 w-3.5" />
            Referral Program
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            Share TailorPic,
            <br className="hidden sm:block" />
            <span className="text-tp-bronze"> Get Rewarded</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-tp-beige/70 max-w-2xl mx-auto leading-relaxed">
            Recommend professional AI headshots to friends and colleagues. They
            get stunning photos, you earn credits toward your next order.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-8 py-4 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-tp-bronze/20"
            >
              Start Referring <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-tp-button border border-white/20 px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-white/5"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
              Simple Process
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-tp-ink">
              How It Works
            </h2>
            <p className="mt-4 text-tp-muted max-w-xl mx-auto">
              Three steps to start earning credits with every referral you make.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.step} className="relative text-center">
                {/* Connector line on desktop */}
                {i < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-7 left-[60%] w-[80%] border-t border-dashed border-tp-line" />
                )}
                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tp-black mb-5">
                  <s.icon className="h-6 w-6 text-tp-bronze" />
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-tp-bronze text-[11px] font-semibold text-tp-black">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-tp-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed max-w-xs mx-auto">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="bg-tp-paper py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
              Everyone Wins
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-tp-ink">
              Benefits for Both of You
            </h2>
            <p className="mt-4 text-tp-muted max-w-xl mx-auto">
              Your referrals are rewarded generously -- for you and for the
              friend you bring along.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {/* For the referrer */}
            <div className="rounded-tp-card border border-tp-line bg-white p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-tp-black px-4 py-1.5 text-xs font-semibold text-tp-bronze mb-6">
                <Trophy className="h-3.5 w-3.5" />
                For You
              </div>
              <h3 className="text-xl font-display text-tp-ink mb-5">
                Earn credits with every referral
              </h3>
              <ul className="space-y-4">
                {referrerBenefits.map((item) => (
                  <li
                    key={item.text}
                    className="flex items-start gap-3 text-sm text-tp-muted"
                  >
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-tp-paper">
                      <item.icon className="h-3.5 w-3.5 text-tp-bronze" />
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* For the referred friend */}
            <div className="rounded-tp-card border border-tp-line bg-white p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-tp-black px-4 py-1.5 text-xs font-semibold text-tp-bronze mb-6">
                <Heart className="h-3.5 w-3.5" />
                For Your Friend
              </div>
              <h3 className="text-xl font-display text-tp-ink mb-5">
                Save on professional headshots
              </h3>
              <ul className="space-y-4">
                {refereeBenefits.map((item) => (
                  <li
                    key={item.text}
                    className="flex items-start gap-3 text-sm text-tp-muted"
                  >
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-tp-paper">
                      <item.icon className="h-3.5 w-3.5 text-tp-bronze" />
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof / Trust ── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-tp-card border border-tp-line bg-tp-paper p-8 sm:p-12 text-center">
            <div className="flex items-center justify-center gap-6 sm:gap-10 mb-8">
              <div>
                <p className="font-display text-3xl sm:text-4xl text-tp-ink">
                  Unlimited
                </p>
                <p className="text-sm text-tp-muted mt-1">Referrals</p>
              </div>
              <div className="h-10 w-px bg-tp-line" />
              <div>
                <p className="font-display text-3xl sm:text-4xl text-tp-ink">
                  No Expiry
                </p>
                <p className="text-sm text-tp-muted mt-1">On Credits</p>
              </div>
              <div className="h-10 w-px bg-tp-line hidden sm:block" />
              <div className="hidden sm:block">
                <p className="font-display text-3xl sm:text-4xl text-tp-ink">
                  Both
                </p>
                <p className="text-sm text-tp-muted mt-1">Sides Earn</p>
              </div>
            </div>
            <p className="text-tp-muted max-w-lg mx-auto leading-relaxed">
              There is no cap on how many people you can refer and no deadline on
              using your credits. Share as much as you like -- your rewards keep
              growing.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-tp-paper py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
              Got Questions?
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-tp-ink">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.q}
                className="group rounded-tp-card border border-tp-line bg-white"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-sm font-semibold text-tp-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown className="h-4 w-4 text-tp-muted transition-transform group-open:rotate-180 flex-shrink-0 ml-4" />
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
      <section className="bg-tp-black py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#C9A98A_0%,transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Gift className="h-10 w-10 text-tp-bronze mx-auto mb-6" />
          <h2 className="font-display text-3xl sm:text-4xl text-white">
            Ready to Start Referring?
          </h2>
          <p className="mt-5 text-lg text-tp-beige/60 max-w-xl mx-auto">
            Create your account, grab your unique referral link, and start
            earning credits every time a friend orders headshots.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-8 py-4 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-tp-bronze/20"
            >
              Start Referring <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-tp-button border border-white/20 px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-white/5"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
