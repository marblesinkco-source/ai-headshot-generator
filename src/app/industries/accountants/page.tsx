import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, ProductSchema, FAQSchema } from '@/components/structured-data';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import {
  Camera,
  Clock,
  Users,
  CheckCircle,
  DollarSign,
  CalendarX,
  ImageOff,
  Star,
  Shield,
  Sparkles,
  ArrowRight,
  Calculator,
  Building,
  UserPlus,
  Palette,
  BadgeCheck,
  RefreshCw,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Headshots for Accountants & Financial Professionals | TailorPic',
  description:
    'Get professional headshots for accountants, CPAs, and financial professionals. Firm-wide consistency, CPA directory photos, and quick updates for new hires — delivered in 2 hours.',
  alternates: { canonical: '/industries/accountants' },
  openGraph: {
    title: `AI Headshots for Accountants & Financial Professionals | ${siteConfig.name}`,
    description:
      'AI-powered professional headshots for accounting and financial professionals. Firm-consistent, directory-ready photos delivered in hours.',
    url: `${siteConfig.url}/industries/accountants`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `AI Headshots for Accountants & Financial Professionals | ${siteConfig.name}`,
    description: 'AI-powered professional headshots for accounting and financial professionals. Firm-consistent, directory-ready photos delivered in hours.',
    images: [siteConfig.ogImage],
  },
};

const painPoints = [
  {
    icon: CalendarX,
    title: 'Tax Season Never Ends',
    description:
      'Between tax deadlines, audits, and quarterly filings, accountants are perpetually busy. Scheduling a studio session feels impossible — especially during Q1 and Q4 crunch time.',
  },
  {
    icon: ImageOff,
    title: 'Inconsistent Firm Photos',
    description:
      'Partners photographed five years ago, associates shot last month, and new hires with no headshot at all. Your team page looks like a patchwork instead of a unified, trustworthy firm.',
  },
  {
    icon: DollarSign,
    title: 'High Cost Per Person',
    description:
      'Professional studio sessions run $300-700+ per person. For a growing firm that adds staff every year, the cost of keeping everyone current is hard to justify — especially when you advise clients on spending wisely.',
  },
];

const benefits = [
  {
    icon: Users,
    title: 'Firm-Wide Consistency',
    description:
      'Give every team member — from senior partner to new hire — a headshot with matching style, background, and quality. Your team page will finally look cohesive.',
  },
  {
    icon: BadgeCheck,
    title: 'CPA Directory Ready',
    description:
      'Meet the photo requirements for state CPA society directories, professional association listings, and credential verification platforms with properly formatted headshots.',
  },
  {
    icon: Shield,
    title: 'Professional & Approachable',
    description:
      'Strike the right balance between professional authority and personal warmth. Clients want to trust you with their finances and feel comfortable in your office.',
  },
  {
    icon: UserPlus,
    title: 'Quick Updates for New Hires',
    description:
      'New staff member starting Monday? They upload selfies on day one and have matching headshots by lunch. No scheduling, no studio visit, no delay on updating your website.',
  },
  {
    icon: Clock,
    title: '2-Hour Delivery',
    description:
      'Upload selfies between client calls and receive polished headshots the same day. No blocked calendar time, no travel to a photography studio.',
  },
  {
    icon: RefreshCw,
    title: 'Easy Annual Refreshes',
    description:
      'Keep your firm looking current with affordable annual photo updates. As staff changes and styles evolve, your online presence stays fresh and professional.',
  },
];

const stats = [
  { value: '40+', label: 'Photos per order' },
  { value: '11+', label: 'Professional styles' },
  { value: '< 2hrs', label: 'From selfies to finished headshots' },
  { value: '$9.90', label: 'Starting price per person' },
];

const faqs = [
  {
    question: "Can I get my headshots during tax season?",
    answer:
      "Yes. Upload selfies from your phone between client calls and your headshots are typically ready in about 2 hours. There is no studio visit or calendar block required, even during Q1 and Q4 crunch time.",
  },
  {
    question: "Will the headshots work for CPA society and association directories?",
    answer:
      "The headshots are high-resolution and professionally framed, which suits most state CPA society and professional association listings. Always check your directory's specific size and format requirements before uploading.",
  },
  {
    question: "How do I keep my whole firm's photos consistent?",
    answer:
      "Each team member uploads their own selfies and chooses the same style, so backgrounds and overall look match across your team page. Partners and new hires end up with a cohesive set without any group photo session.",
  },
  {
    question: "What if a new hire starts and needs a headshot quickly?",
    answer:
      "They can upload selfies on day one and receive finished headshots within about 2 hours. That means your website team page can be updated the same day.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Headshots start at $9.90 per person with no subscription required. That is far less than a traditional studio session.",
  },
  {
    question: "What if I am not happy with the results?",
    answer:
      "Every order is covered by our 14-day money-back guarantee. You also get full commercial rights to use your headshots on your website, LinkedIn, and firm materials.",
  },
];

export default function AccountantsIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name="Professional Headshots for Accountants & Financial Professionals"
        description="AI-generated professional headshots for accountants, CPAs, and financial professionals, with firm-consistent styling and directory-ready formatting."
        price={990}
        category="Professional Services"
        slug="industries/accountants"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'Industries', url: `${siteConfig.url}/industries` },
        { name: 'Accountants', url: `${siteConfig.url}/industries/accountants` },
      ]} />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Calculator className="h-4 w-4" />
              For Financial Professionals
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Photos for{' '}
              <span className="not-italic text-tp-bronze">Financial Experts</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Clients trust accountants who look trustworthy. Make your firm&apos;s online
              presence as polished as your financial advice with AI-powered headshots that
              project competence, reliability, and professionalism.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="gap-2">
                  Get Your Professional Headshot
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
            CPA Directory Compliant
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
              Your Firm Deserves Photos as Sharp as Your Numbers
            </h2>
            <p className="mt-4 text-lg text-tp-muted">
              Outdated headshots and mismatched team photos don&apos;t reflect the precision your
              clients expect.
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
              Built for Accountants &amp; Financial Professionals
            </h2>
            <p className="mt-4 text-lg text-tp-muted">
              Headshots that balance professionalism with approachability — exactly what your clients are looking for.
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
              &ldquo;We onboarded twelve new staff last busy season and every single one had a
              matching headshot on our website within their first week. The consistency across
              our team page finally looks like the professional firm we are.&rdquo;
            </blockquote>
            <div className="mt-8">
              <p className="font-semibold text-tp-bronze">Rachel T.</p>
              <p className="mt-1 text-sm text-tp-beige/60">Managing Partner, CPA Firm</p>
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
            Look as Professional as Your Work
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Upgrade your professional image with TailorPic.
            Studio-quality headshots starting at just $9.90.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="gap-2">
                Get Your Professional Headshot
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Sales for Firms
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
