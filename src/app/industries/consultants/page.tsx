import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, ProductSchema, FAQSchema } from '@/components/structured-data';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import {
  CheckCircle,
  DollarSign,
  CalendarX,
  ImageOff,
  Star,
  Shield,
  ArrowRight,
  Lightbulb,
  Presentation,
  Globe,
  Handshake,
  Layers,
  Zap,
} from 'lucide-react';

import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
export const metadata: Metadata = {
  title: 'AI Headshots for Consultants & Advisors | TailorPic',
  description:
    'Get professional headshots for consultants, advisors, and independent professionals. Multiple styles for proposals, LinkedIn, and speaking engagements — delivered in 2 hours.',
  alternates: { canonical: '/industries/consultants' },
  openGraph: generateOGMetadata({ title: 'AI Headshots for Consultants & Advisors | TailorPic', description: 'AI-powered professional headshots for consultants. Boardroom, casual professional, and speaker styles delivered in hours.', path: '/industries/consultants', type: 'industry' }),
  
  twitter: generateTwitterMetadata({ title: 'AI Headshots for Consultants & Advisors | TailorPic', description: 'AI-powered professional headshots for consultants. Boardroom, casual professional, and speaker styles delivered in hours.', type: 'industry' }),
};

const painPoints = [
  {
    icon: CalendarX,
    title: 'Always on the Road',
    description:
      'Between client sites, workshops, and conferences, consultants rarely have time to sit for a studio session. By the time you schedule one, you need the headshot yesterday.',
  },
  {
    icon: DollarSign,
    title: 'Multiple Looks, Multiple Costs',
    description:
      'You need different headshots for LinkedIn, your website, proposals, and speaking bios. Traditional studios charge $300-600+ per session — and that only covers one style.',
  },
  {
    icon: ImageOff,
    title: 'Credibility Gap',
    description:
      'A low-quality or outdated headshot on a proposal or LinkedIn profile quietly undermines your authority. Clients are evaluating you before the first meeting even starts.',
  },
];

const benefits = [
  {
    icon: Presentation,
    title: 'Boardroom-Ready Portraits',
    description:
      'Polished, executive-style headshots that convey authority and expertise — perfect for proposals, pitch decks, and consulting firm websites.',
  },
  {
    icon: Handshake,
    title: 'Casual Professional Options',
    description:
      'Approachable yet polished headshots for LinkedIn, personal websites, and networking profiles. Show clients you are both competent and easy to work with.',
  },
  {
    icon: Globe,
    title: 'Speaking Engagement Shots',
    description:
      'Dynamic, confident headshots designed for conference bios, event programs, and speaker pages. Stand out on the agenda before you take the stage.',
  },
  {
    icon: Zap,
    title: 'Quick Turnaround',
    description:
      'Upload selfies from your phone and receive finished headshots within 2 hours. Perfect for last-minute proposals or conference deadlines.',
  },
  {
    icon: Layers,
    title: 'Multiple Styles in One Order',
    description:
      'Get several distinct looks from a single upload — formal, approachable, creative. Cover every use case without multiple photo sessions.',
  },
  {
    icon: Shield,
    title: 'Personal Brand Consistency',
    description:
      'Maintain a cohesive visual identity across all platforms. Same quality, same professionalism, whether it is your LinkedIn or a client-facing deck.',
  },
];

const stats = [
  { value: '40+', label: 'Photos per order' },
  { value: '11+', label: 'Professional styles' },
  { value: '< 2hrs', label: 'From selfies to finished headshots' },
  { value: '11+', label: 'Professional styles available' },
];

const faqs = [
  {
    question: "Can I get different styles for proposals, LinkedIn, and speaking bios?",
    answer:
      "Yes. You receive multiple looks from a single upload, from polished boardroom portraits to more approachable casual professional shots. One order can cover your proposals, website, and conference materials.",
  },
  {
    question: "How fast can I get headshots before a conference deadline?",
    answer:
      "Most headshots are ready in about 2 hours after you upload your selfies. That makes it practical for last-minute proposals, speaker bios, and event programs.",
  },
  {
    question: "Do I need to be in one place to take the photos?",
    answer:
      "No. You only need selfies taken on your phone, so you can do it from a hotel, airport, or client site. There is no studio session to schedule.",
  },
  {
    question: "Can I use the headshots on client-facing materials?",
    answer:
      "Yes. Your order includes full commercial rights, so you can use the images on proposals, pitch decks, your website, and social profiles.",
  },
  {
    question: "How much does it cost compared to a photographer?",
    answer:
      "Headshots start at $9.90 with no subscription. Traditional studio sessions often cost several hundred dollars and usually cover only a single look.",
  },
  {
    question: "What if the results are not what I expected?",
    answer:
      "Every order is backed by our 14-day money-back guarantee, so you can try it with confidence.",
  },
];

export default function ConsultantsIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name="Professional Headshots for Consultants & Advisors"
        description="AI-generated professional headshots for consultants, advisors, and independent professionals, with multiple styles for proposals, LinkedIn, and speaking bios."
        price={990}
        category="Professional Services"
        slug="industries/consultants"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'Industries', url: `${siteConfig.url}/industries` },
        { name: 'Consultants', url: `${siteConfig.url}/industries/consultants` },
      ]} />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Lightbulb className="h-4 w-4" />
              For Consultants &amp; Advisors
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Headshots That{' '}
              <span className="not-italic text-tp-bronze">Win Client Trust</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Clients evaluate your credibility before the first handshake. Make every proposal,
              profile, and speaking bio work harder with AI-powered headshots that project
              expertise, confidence, and approachability.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="gap-2">
                  Get Your Consulting Headshot
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="border-tp-beige/30 text-tp-beige hover:bg-tp-beige/10">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-tp-line bg-tp-paper py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm text-tp-muted sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-tp-bronze" />
            Multiple Style Options
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-tp-bronze" />
            Same-Day Delivery
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-tp-bronze" />
            Full Commercial Rights
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-tp-bronze" />
            14-Day Money-Back Guarantee
          </span>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              Your Image Is Part of Your Value Proposition
            </h2>
            <p className="mt-4 text-lg text-tp-muted">
              Don&apos;t let an outdated photo undermine the expertise you bring to the table.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {painPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="rounded-tp-card border border-tp-line bg-tp-paper/50 p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tp-muted/10">
                    <Icon className="h-6 w-6 text-tp-muted" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{point.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-tp-black py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-tp-bronze sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm text-tp-beige/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              Built for Consultants &amp; Independent Advisors
            </h2>
            <p className="mt-4 text-lg text-tp-muted">
              Every headshot style you need — from boardroom authority to approachable expert — in a single order.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="rounded-tp-card border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tp-black">
                    <Icon className="h-6 w-6 text-tp-bronze" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-tp-black py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-tp-bronze text-tp-bronze" />
              ))}
            </div>
            <blockquote className="mt-6 font-display text-2xl font-normal italic leading-relaxed text-tp-paper sm:text-3xl">
              &ldquo;I needed headshots for a keynote bio, my LinkedIn refresh, and a new
              consulting website — all in the same week. TailorPic delivered three different
              styles from one set of selfies. Each one looked like it came from a different
              professional shoot.&rdquo;
            </blockquote>
            <div className="mt-8">
              <p className="font-semibold text-tp-bronze">David K.</p>
              <p className="mt-1 text-sm text-tp-beige/60">Management Consultant</p>
            </div>
            <p className="mt-4 text-xs text-tp-beige/40">
              * Illustrative testimonial for demonstration purposes.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-tp-paper py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-tp-card border border-tp-line bg-white p-6">
                <h3 className="text-lg font-semibold text-tp-ink">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
            Clients Judge the Book by Its Cover. Make Yours Count.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Upgrade your professional image with TailorPic.
            Studio-quality headshots starting at just $9.90.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="gap-2">
                Get Your Consulting Headshot
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Sales
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-tp-muted">
            No subscription required. 14-day money-back guarantee.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
