import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import {
  Gift, Share2, CreditCard, ArrowRight, Users, Heart,
  CheckCircle, Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refer a Friend & Earn Credits | TailorPic',
  description:
    'Share TailorPic with friends. They get 20% off their first order, you earn $10 credit for every referral.',
};

export default function ReferralPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative bg-tp-black py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#C9A98A_0%,transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-xs font-semibold text-tp-bronze mb-6">
            <Gift className="h-3.5 w-3.5" />
            Referral Program
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            Give <em className="text-tp-bronze not-italic font-display italic">20% Off</em>,{' '}
            Get <em className="text-tp-bronze not-italic font-display italic">$10 Credit</em>
          </h1>
          <p className="mt-5 text-lg text-tp-beige/70 max-w-2xl mx-auto leading-relaxed">
            Share TailorPic with your friends and colleagues. They save on their first order,
            you earn credit for your next one. Everybody wins.
          </p>
          <div className="mt-8">
            <Link
              href="/auth/login?redirect=/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
            >
              Get Your Referral Link <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl text-tp-ink">
              How It Works
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: '1',
                icon: Share2,
                title: 'Share Your Link',
                desc: 'Sign in to get your unique referral link. Share it via email, social media, or text.',
              },
              {
                step: '2',
                icon: Users,
                title: 'Friends Sign Up',
                desc: 'When your friends use your link, they automatically get 20% off their first order.',
              },
              {
                step: '3',
                icon: CreditCard,
                title: 'You Earn Credit',
                desc: 'For every friend who makes a purchase, you receive $10 credit toward your next order.',
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-tp-black mb-4">
                  <s.icon className="h-6 w-6 text-tp-bronze" />
                </div>
                <h3 className="text-lg font-semibold text-tp-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
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
            <div className="rounded-2xl border border-tp-line bg-white p-7">
              <Gift className="h-8 w-8 text-tp-bronze mb-4" />
              <h3 className="text-lg font-semibold text-tp-ink mb-3">For Your Friend</h3>
              <ul className="space-y-2.5">
                {[
                  '20% off their first order',
                  'Works on any package — Express to Executive',
                  'No minimum purchase required',
                  'Applied automatically at checkout',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-tp-muted">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-tp-line bg-white p-7">
              <Heart className="h-8 w-8 text-tp-bronze mb-4" />
              <h3 className="text-lg font-semibold text-tp-ink mb-3">For You</h3>
              <ul className="space-y-2.5">
                {[
                  '$10 credit per successful referral',
                  'No limit on how many friends you refer',
                  'Credits never expire',
                  'Stack credits for bigger orders',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-tp-muted">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Earning examples */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Sparkles className="h-8 w-8 text-tp-bronze mx-auto mb-3" />
            <h2 className="font-display text-3xl sm:text-4xl text-tp-ink">
              Your Earnings Add Up
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { referrals: 5, credit: '$50' },
              { referrals: 10, credit: '$100' },
              { referrals: 25, credit: '$250' },
            ].map((tier) => (
              <div
                key={tier.referrals}
                className="rounded-2xl border border-tp-line bg-white p-6 text-center hover:border-tp-bronze/40 transition-colors"
              >
                <p className="text-3xl font-bold text-tp-ink">{tier.referrals}</p>
                <p className="text-xs text-tp-muted mt-1">referrals</p>
                <div className="my-4 h-px bg-tp-line" />
                <p className="text-2xl font-bold text-tp-bronze-ink">{tier.credit}</p>
                <p className="text-xs text-tp-muted mt-1">in credits</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-tp-black py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-white">
            Start Sharing, Start Earning
          </h2>
          <p className="mt-4 text-tp-beige/60">
            Sign in to get your unique referral link and start earning credits today.
          </p>
          <div className="mt-8">
            <Link
              href="/auth/login?redirect=/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
            >
              Get Your Referral Link <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
