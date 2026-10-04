import Image from 'next/image';
import { getIndustryVisual, portrait } from '@/config/stock-portraits';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Star } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { ContentPhoto } from '@/components/marketing/content-photo';
const pageTitle = "AI Headshots for Engineers & Tech Professionals | TailorPic";
const pageDescription =
  'Professional AI headshots for software, civil and mechanical engineers and tech professionals. Ready for LinkedIn, GitHub, conference bios and team pages.';

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/engineers' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/industries/engineers', type: 'industry' }),
  
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'industry' }),
};

const benefits = [
  {
    title: "LinkedIn Profiles That Get Replies",
    description: "A confident, approachable photo helps recruiters and collaborators take your profile seriously.",
  },
  {
    title: "GitHub & Developer Profiles",
    description: "Square-crop friendly portraits that look crisp as a small avatar on GitHub, Stack Overflow, and social profiles.",
  },
  {
    title: "Startup Team Pages",
    description: "Give your whole founding team matching headshots for your About page and investor decks, with no coordination headaches.",
  },
  {
    title: "Conference & Speaker Bios",
    description: "High-resolution images suitable for speaker pages, program guides, and slide decks.",
  },
  {
    title: "Fast, No Studio Needed",
    description: "Upload selfies and get headshots in about 2 hours, so you can get back to shipping.",
  },
  {
    title: "Consistent Company Branding",
    description: "Match backgrounds and style across a team so engineering pages look unified and professional.",
  },
];

const steps = [
  {
    title: "Upload 6-10 Selfies",
    description: "Take clear photos with your phone in good light. Vary angles and expressions slightly. Casual clothes are fine.",
  },
  {
    title: "Choose Your Style",
    description: "Pick business casual, a tech-forward look, or formal attire, and a background that fits your brand.",
  },
  {
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots in about 2 hours, ready for LinkedIn, GitHub, and your team page.",
  },
];

const audiences = [
  {
    title: "Software Engineers",
    description: "Refresh your LinkedIn, GitHub, and personal site with a polished photo.",
  },
  {
    title: "Civil & Mechanical Engineers",
    description: "Add a professional image to firm websites, proposals, and licensure profiles.",
  },
  {
    title: "Students & New Grads",
    description: "Stand out in internship and first-job applications without a studio budget.",
  },
  {
    title: "Founders & Tech Leads",
    description: "Look credible on pitch decks, podcasts, and conference stages.",
  },
];

const faqs = [
  {
    question: "Will the headshot work as a GitHub avatar?",
    answer: "Yes. The portraits are framed so they crop cleanly to a square and stay recognizable at small sizes.",
  },
  {
    question: "Can I get matching headshots for my startup team?",
    answer: "Yes. Each team member uploads their own selfies and can choose the same background and style for a consistent team page.",
  },
  {
    question: "What attire can I choose?",
    answer: "Options include business casual, formal business attire, and other professional styles that suit tech and engineering workplaces.",
  },
  {
    question: "How many selfies do I need?",
    answer: "We recommend 6 to 10 clear, well-lit selfies with different angles and expressions for the best results.",
  },
  {
    question: "Can I use the headshots for conference bios?",
    answer: "Yes. You receive high-resolution files with full commercial rights, suitable for speaker pages, programs, and slides.",
  },
];

export default function EngineersIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name={"Professional Headshots for Engineers"}
        description={"AI-generated professional headshots for software engineers, civil and mechanical engineers, and tech professionals."}
        price={990}
        category="Professional Services"
        slug="industries/engineers"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Industries', url: `${siteConfig.url}/industries` },
          { name: "Engineers", url: `${siteConfig.url}/industries/engineers` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Image src={portrait(getIndustryVisual("engineers").heroPortraitId)} alt={getIndustryVisual("engineers").alt} width={20} height={20} className="h-5 w-5 rounded-full object-cover" />
              For Engineers &amp; Tech Professionals
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Engineers</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Your code and your designs speak for you, but your photo is the first thing people see on LinkedIn, GitHub, and conference pages. Get a sharp, credible headshot from a few selfies, with no photographer and no weekend lost.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=/headshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Engineer Headshot
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
          
            {/* Hero portrait */}
            <div className="mx-auto mt-12 h-32 w-32 overflow-hidden rounded-full ring-4 ring-tp-bronze/20 sm:h-40 sm:w-40">
              <Image
                src={portrait(getIndustryVisual("engineers").heroPortraitId)}
                alt={getIndustryVisual("engineers").alt}
                width={320}
                height={427}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-tp-line bg-tp-paper py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm text-tp-muted sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            LinkedIn &amp; GitHub Ready
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Delivered in About 2 Hours
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Full Commercial Rights
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
              Headshots for Every Place Engineers Show Up Online
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you a consistent image across your profiles, talks, and team pages.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              return (
                <div
                  key={benefit.title}
                  className="tp-card rounded-tp-card border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <ContentPhoto slug="engineers" seed={benefit.title} className="h-12 w-12 rounded-xl" />
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
            <p className="mt-4 text-lg text-tp-muted">Three simple steps from selfie to finished headshot.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {steps.map((step, index) => {
              return (
                <div key={step.title} className="text-center">
                  <ContentPhoto slug="engineers" seed={step.title} className="mx-auto h-14 w-14 rounded-full" />
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
              Who Uses TailorPic
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Headshots for builders of software and the physical world.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((item) => {
              return (
                <div key={item.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                  <ContentPhoto slug="engineers" seed={item.title} className="h-10 w-10 rounded-lg" />
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
            Make Your First Impression Match Your Work
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get polished headshots for LinkedIn, GitHub, and your next talk from a few selfies.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=/headshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Engineer Headshot
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
