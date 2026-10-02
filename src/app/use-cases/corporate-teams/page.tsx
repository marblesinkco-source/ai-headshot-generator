import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Check, Clock, CreditCard, Globe, Palette, Shield, Sparkles, Star, Upload, UserCheck, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const pageTitle = 'AI Headshots for Corporate Teams | TailorPic';
const pageDescription =
  'Get consistent, professional headshots for your whole team without coordinating a photographer. Team photos for websites, directories and decks. From $1.99.';

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/use-cases/corporate-teams' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/use-cases/corporate-teams', type: 'usecase' }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'usecase' }),
};

const benefits = [
  {
    icon: Users,
    title: "Consistent Look Across the Team",
    description: "Every team member gets headshots with matching backgrounds, lighting, and style, so your About page and pitch decks look unified.",
  },
  {
    icon: Clock,
    title: "No Scheduling Headaches",
    description: "Skip the logistics of booking a photographer and coordinating dozens of calendars. Each person uploads selfies on their own time.",
  },
  {
    icon: Globe,
    title: "Works for Remote and Distributed Teams",
    description: "Team members in different cities, countries, or time zones can all submit selfies independently and get matching results.",
  },
  {
    icon: CreditCard,
    title: "Fraction of Studio Cost",
    description: "Starting at $1.99 per person, outfitting a 50-person team costs less than a single on-site photographer session.",
  },
  {
    icon: Palette,
    title: "Custom Backgrounds and Attire",
    description: "Choose branded backgrounds, neutral studio tones, or specific attire to match your company culture, from suits to smart casual.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Privacy",
    description: "Photos are processed securely and used only for headshot generation. Employee data is never shared with third parties.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Each Person Uploads Selfies",
    description: "Share a link with your team. Each member uploads 6-10 selfies from their phone on their own schedule.",
  },
  {
    icon: Sparkles,
    title: "Select a Unified Style",
    description: "Choose a consistent background, attire, and lighting style that fits your brand. Apply it across every team member.",
  },
  {
    icon: Check,
    title: "Download All Headshots",
    description: "Receive polished, high-resolution headshots for the entire team in about 2 hours, ready for your website and directories.",
  },
];

const features = [
  {
    icon: Building2,
    title: "Startups",
    description: "Build credibility with polished team photos on your website and investor decks without a studio budget.",
  },
  {
    icon: Users,
    title: "Growing Companies",
    description: "Onboard new hires with professional headshots from day one, matching your existing team's look.",
  },
  {
    icon: Globe,
    title: "Remote-First Companies",
    description: "Give distributed teams a cohesive visual identity without flying everyone to the same location.",
  },
  {
    icon: UserCheck,
    title: "HR & People Ops",
    description: "Standardize employee photos for directories, org charts, and internal tools without chasing people down.",
  },
];

const faqs = [
  {
    question: "How do I order headshots for my whole team?",
    answer: "You can share a signup link with your team. Each person uploads their own selfies and receives individual headshots with the same style and background for a consistent look across the company.",
  },
  {
    question: "Can we match our brand colors for backgrounds?",
    answer: "Yes. You can choose from a range of neutral and colored backgrounds, including options that complement your brand identity. This ensures every headshot looks at home on your company website.",
  },
  {
    question: "What if a team member does not like their result?",
    answer: "TailorPic is committed to quality. If someone on your team is not satisfied, we will work with you to regenerate photos until they look great.",
  },
  {
    question: "How much does it cost per person?",
    answer: "TailorPic starts at $1.99 per person. For a team of 20, that is under $200 total, a fraction of what one session with a professional photographer costs.",
  },
  {
    question: "Can new hires get matching headshots later?",
    answer: "Absolutely. New team members can order headshots at any time using the same style settings, so their photos match the rest of the team without another photo session.",
  },
];

export default function CorporateTeamsUseCasePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name="AI Headshots for Corporate Teams"
        description="AI-generated consistent professional headshots for corporate teams, matching backgrounds and styles for company websites and directories."
        price={990}
        category="Professional Services"
        slug="use-cases/corporate-teams"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Use Cases', url: `${siteConfig.url}/use-cases` },
          { name: 'Corporate Teams', url: `${siteConfig.url}/use-cases/corporate-teams` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Building2 className="h-4 w-4" />
              Corporate Team Photos
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              AI Headshots for{' '}
              <span className="not-italic text-tp-bronze">Corporate Teams</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Give your entire team polished, consistent headshots without scheduling a photographer. Each person uploads selfies on their own time, and everyone gets matching professional photos. Starting at $1.99 per person.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=/headshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Team Headshots
              </Link>
              <Link
                href="/pricing"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'border-tp-beige/30 text-tp-beige hover:bg-tp-beige/10'
                )}
              >
                View Pricing
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-tp-bronze text-tp-bronze" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-tp-line bg-tp-paper py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm text-tp-muted sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Consistent Team Look
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            No Scheduling Required
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Starting at $1.99/Person
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Satisfaction Guaranteed
          </span>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              Why Teams Choose TailorPic
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Professional headshots for every team member, without the logistical nightmare of a group photo shoot.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="tp-card rounded-tp-card border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
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

      {/* How it works */}
      <section className="bg-tp-paper py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Three simple steps to outfit your entire team.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tp-black">
                    <Icon className="h-6 w-6 text-tp-bronze" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-tp-bronze-ink">Step {index + 1}</p>
                  <h3 className="mt-1 text-lg font-semibold text-tp-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              Who Uses TailorPic for Teams
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Consistent headshots for companies of every size.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                  <Icon className="h-6 w-6 text-tp-bronze" />
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{item.description}</p>
                </div>
              );
            })}
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
            Unify Your Team's Professional Image
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Give every team member a polished headshot that matches, no matter where they are located. Starting at $1.99 per person.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=/headshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Team Headshots
            </Link>
            <Link href="/pricing" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              View Pricing
            </Link>
          </div>
          <p className="mt-6 text-sm text-tp-muted">
            No subscription required. One-time payment.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
