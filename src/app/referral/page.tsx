import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import {
  Gift,
  Users,
  TrendingUp,
  Wallet,
  ArrowRight,
  Share2,
  CheckCircle2,
} from 'lucide-react';

const pageTitle = 'Referral Program: Refer Friends, Earn Rewards';
const pageDescription = `Share ${siteConfig.name} with friends, colleagues and your audience and earn rewards when they sign up. Get in touch to join the referral program.`;

export const metadata: Metadata = {
  title: { absolute: `${pageTitle} | ${siteConfig.name}` },
  description: pageDescription,
  alternates: { canonical: '/referral' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/referral' }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription }),
};

const steps = [
  {
    icon: Share2,
    title: 'Share your link',
    description: `Tell friends, colleagues or your audience about ${siteConfig.name} with your personal referral link.`,
  },
  {
    icon: Users,
    title: 'Friend signs up',
    description: 'Someone you referred creates an account and starts creating their own professional AI photos.',
  },
  {
    icon: Gift,
    title: 'You earn rewards',
    description: 'Receive competitive commissions for the people you bring to the platform.',
  },
];

const benefits = [
  {
    icon: Gift,
    title: 'Generous Rewards',
    description: 'Earn competitive commissions every time someone you refer becomes a customer.',
  },
  {
    icon: TrendingUp,
    title: 'No Cap on Earnings',
    description: 'There is no ceiling on what you can earn. The more people you refer, the more you can earn.',
  },
  {
    icon: CheckCircle2,
    title: 'Easy Tracking',
    description: 'Keep an eye on your referrals and rewards in one simple place.',
  },
  {
    icon: Wallet,
    title: 'Fast Payouts',
    description: 'Get paid promptly once your rewards are confirmed, with no unnecessary hurdles.',
  },
];

const faqs = [
  {
    q: 'Who can join the referral program?',
    a: 'Anyone. Whether you are a happy customer, a creator, a career coach or simply someone with a network, you are welcome to get in touch and join.',
  },
  {
    q: 'How do I get started?',
    a: 'Contact our team through the contact page and tell us a little about how you plan to share TailorPic. We will follow up with the next steps.',
  },
  {
    q: 'How are rewards calculated?',
    a: 'Rewards are based on competitive commissions for customers you refer. We will share the full details with you when you get in touch.',
  },
  {
    q: 'When and how do I get paid?',
    a: 'Once your rewards are confirmed, we pay them out promptly. Payout details are shared when you join the program.',
  },
];

export default function ReferralPage() {
  return (
    <div className="min-h-screen bg-tp-paper font-sans text-tp-ink">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Referral Program', url: `${siteConfig.url}/referral` },
        ]}
      />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="px-4 pb-16 pt-20 sm:px-6 sm:pt-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-tp-bronze-ink">
              Referral Program
            </p>
            <h1 className="font-display text-4xl font-normal text-tp-black sm:text-5xl lg:text-6xl">
              Refer Friends, Earn Rewards
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-muted">
              Love {siteConfig.name}? Share it with the people around you and earn rewards when they
              join. It is a simple way to turn a good recommendation into something more.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/contact" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
                Join the Program
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="how-it-works">
          <div className="mx-auto max-w-5xl">
            <h2 id="how-it-works" className="text-center font-display text-3xl font-normal text-tp-black sm:text-4xl">
              How It Works
            </h2>
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((step, i) => (
                <li key={step.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-tp-button bg-tp-black text-tp-bronze">
                      <step.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-tp-bronze-ink">Step {i + 1}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-tp-black">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-tp-beige/30 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="benefits">
          <div className="mx-auto max-w-5xl">
            <h2 id="benefits" className="text-center font-display text-3xl font-normal text-tp-black sm:text-4xl">
              Why Refer With Us
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {benefits.map((b) => (
                <div key={b.title} className="rounded-tp-card border border-tp-line bg-tp-paper p-6">
                  <b.icon className="h-6 w-6 text-tp-bronze-ink" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-semibold text-tp-black">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who can join */}
        <section className="px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="who-can-join">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="who-can-join" className="font-display text-3xl font-normal text-tp-black sm:text-4xl">
              Who Can Join
            </h2>
            <p className="mt-5 text-tp-muted">
              Anyone can join. You do not need a large following or a business. If you know people
              who could use professional AI photos, you are a great fit, from customers and
              creators to coaches, recruiters and community leaders.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-tp-card bg-tp-black px-6 py-14 text-center sm:px-12">
            <h2 className="font-display text-3xl font-normal text-white sm:text-4xl">
              Ready to Start Earning?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              Get in touch and we will walk you through how to join the referral program.
            </p>
            <Link
              href="/contact"
              className={buttonVariants({ variant: 'secondary', size: 'lg', className: 'mt-8 bg-tp-bronze text-tp-black hover:bg-tp-bronze/90' })}
            >
              Contact Us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 pb-24 sm:px-6 lg:px-8" aria-labelledby="referral-faq">
          <div className="mx-auto max-w-3xl">
            <h2 id="referral-faq" className="text-center font-display text-3xl font-normal text-tp-black sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-10 space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-tp-card border border-tp-line bg-white p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-tp-black [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="text-tp-bronze-ink transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-tp-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
