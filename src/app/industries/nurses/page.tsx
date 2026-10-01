import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Building2, Camera, Check, GraduationCap, Heart, ShieldCheck, Sparkles, Star, Upload, UserCheck, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
const pageTitle = "AI Headshots for Nurses & Healthcare Staff | TailorPic";
const pageDescription =
  "Professional AI headshots for nurses, nurse practitioners, nursing students, and healthcare staff. Scrubs or formal portraits for hospital ID photos, LinkedIn, and staff directories, delivered in about 2 hours.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/nurses' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/industries/nurses', type: 'industry' }),
  
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'industry' }),
};

const benefits = [
  {
    icon: Camera,
    title: "Scrubs or Formal Portraits",
    description: "Choose clinical scrubs for unit pages and ID badges, or a blazer and blouse for leadership, education, and advanced practice profiles.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy-Conscious Process",
    description: "We only use the selfies you upload. No patient information or clinical settings are ever involved.",
  },
  {
    icon: Building2,
    title: "Hospital ID & Directory Ready",
    description: "Clean, front-facing framing on neutral backgrounds that suits staff directories, badge photos, and department pages. Check your employer's photo rules first.",
  },
  {
    icon: Briefcase,
    title: "LinkedIn & Job Applications",
    description: "Stand out for travel nursing, NP roles, and management positions with a profile photo that looks confident and approachable.",
  },
  {
    icon: UserCheck,
    title: "Approachable, Trustworthy Look",
    description: "Warm expressions and natural lighting convey the compassion and competence patients expect from their care team.",
  },
  {
    icon: GraduationCap,
    title: "Great for Students & New Grads",
    description: "Nursing students can put a professional photo on residency applications and first-job profiles without a studio budget.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload 6-10 Selfies",
    description: "Take clear photos with your phone in good light. Vary angles and expressions slightly. Scrubs or casual clothes are fine.",
  },
  {
    icon: Sparkles,
    title: "Choose Your Style",
    description: "Pick scrubs, business professional, or both, plus a background that fits your workplace.",
  },
  {
    icon: Check,
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots in about 2 hours, ready for your badge, resume, and LinkedIn.",
  },
];

const audiences = [
  {
    icon: Heart,
    title: "Registered Nurses",
    description: "Update your unit page, badge, and LinkedIn with a consistent professional look.",
  },
  {
    icon: UserCheck,
    title: "Nurse Practitioners",
    description: "Show patients and referring providers a polished, credentialed image.",
  },
  {
    icon: GraduationCap,
    title: "Nursing Students",
    description: "Prepare for residency and new-grad applications with a photo that shows you are ready.",
  },
  {
    icon: Users,
    title: "Healthcare Staff & Teams",
    description: "Give an entire department matching headshots without coordinating a photographer.",
  },
];

const faqs = [
  {
    question: "Can I get headshots in scrubs?",
    answer: "Yes. You can choose scrubs, business professional attire, or both, so you have the right photo for clinical and professional settings.",
  },
  {
    question: "Will these work as my hospital ID photo?",
    answer: "Many employers require a specific badge photo taken on site. Our headshots suit directories, profiles, and internal pages, so check your facility's policy before using one for a badge.",
  },
  {
    question: "Is my data kept private?",
    answer: "We only process the selfies you upload to create your headshots. Do not upload photos that include patients or patient information.",
  },
  {
    question: "How many selfies do I need?",
    answer: "We recommend 6 to 10 clear, well-lit selfies with different angles and expressions for the best results.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most headshots are ready in about 2 hours, so you can upload on a break and have them by the end of your shift.",
  },
];

export default function NursesIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name={"Professional Headshots for Nurses"}
        description={"AI-generated professional headshots for nurses, nurse practitioners, nursing students, and healthcare staff, in scrubs or formal attire."}
        price={990}
        category="Professional Services"
        slug="industries/nurses"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Industries', url: `${siteConfig.url}/industries` },
          { name: "Nurses", url: `${siteConfig.url}/industries/nurses` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Heart className="h-4 w-4" />
              For Nurses &amp; Healthcare Staff
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Nurses</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              From hospital ID badges to LinkedIn, your photo is part of how patients, colleagues, and recruiters see you. Get polished, approachable headshots from a few selfies, with no studio visit after a twelve-hour shift.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Nurse Headshot
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
            Scrubs &amp; Formal Options
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
            14-Day Money-Back Guarantee
          </span>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              Headshots for Every Stage of a Nursing Career
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you portraits for the badge office, your résumé, and your professional profiles.</p>
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
            <p className="mt-4 text-lg text-tp-muted">Three simple steps from selfie to finished headshot.</p>
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
              Who Uses TailorPic
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Headshots for every role on the care team.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((item) => {
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
            Look as Caring and Capable as You Are
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get polished headshots for your badge, resume, and LinkedIn from a few selfies.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Nurse Headshot
            </Link>
            <Link href="/pricing" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              View Pricing
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
