import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Briefcase,
  Building2,
  Check,
  GraduationCap,
  Heart,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
  Upload,
  Users,
} from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
const pageTitle = "AI Headshots for Dentists & Dental Staff | TailorPic";
const pageDescription =
  "Professional AI headshots for dentists, orthodontists, hygienists, and dental office staff. Clean, trustworthy portraits for practice websites, patient directories, and marketing materials, delivered in about 2 hours.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/dentists' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/industries/dentists', type: 'industry' }),
  
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'industry' }),
};

const benefits = [
  {
    icon: Smile,
    title: "Warm, Approachable Portraits",
    description: "Patients choose dentists they feel comfortable with. Your headshot conveys warmth and confidence before they ever sit in your chair.",
  },
  {
    icon: Building2,
    title: "Practice Website Ready",
    description: "Clean, professionally lit headshots on neutral backgrounds that look polished on your Meet the Team page and Google Business Profile.",
  },
  {
    icon: ShieldCheck,
    title: "White Coat or Business Attire",
    description: "Choose a lab coat for clinical credibility or a blazer for a more personal touch. You can generate both from the same selfies.",
  },
  {
    icon: Briefcase,
    title: "Insurance & Directory Listings",
    description: "Stand out on insurance provider directories, Healthgrades, Zocdoc, and other platforms where patients compare providers.",
  },
  {
    icon: Heart,
    title: "Patient Trust at First Glance",
    description: "A professional headshot on your new-patient forms, welcome emails, and office signage helps patients feel at ease before their appointment.",
  },
  {
    icon: Users,
    title: "Consistent Team Photos",
    description: "Give your entire office, from front desk staff to associates, matching headshots without coordinating schedules for a group photo session.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload 6-10 Selfies",
    description: "Take clear photos in good light. Vary angles and expressions slightly. Scrubs, lab coat, or casual attire all work.",
  },
  {
    icon: Sparkles,
    title: "Choose Your Style",
    description: "Pick white coat, business professional, or both, plus a background that suits your practice branding.",
  },
  {
    icon: Check,
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots in about 2 hours, ready for your website, directories, and office displays.",
  },
];

const audiences = [
  {
    icon: Stethoscope,
    title: "General Dentists",
    description: "Update your practice website, Google listing, and insurance directories with a polished, current headshot.",
  },
  {
    icon: Smile,
    title: "Orthodontists & Specialists",
    description: "Show patients the confident, credentialed professional behind their treatment plan.",
  },
  {
    icon: GraduationCap,
    title: "New Associates & Graduates",
    description: "Start your career with a professional photo for job applications and your first practice website bio.",
  },
  {
    icon: Users,
    title: "Dental Office Teams",
    description: "Give every team member, from hygienists to office managers, consistent headshots for the practice website.",
  },
];

const faqs = [
  {
    question: "Can I get headshots in a white coat?",
    answer: "Yes. You can choose a lab coat, business attire, or both, so you have the right headshot for clinical profiles and professional networking.",
  },
  {
    question: "Will these work for my practice website?",
    answer: "Absolutely. Our headshots are high-resolution with clean, neutral backgrounds that look polished on Meet the Team pages, Google Business Profiles, and directory listings.",
  },
  {
    question: "Can I get headshots for my entire team?",
    answer: "Yes. Each team member uploads their own selfies and receives individual headshots. This is much easier than coordinating a group photography session across everyone's schedules.",
  },
  {
    question: "How many selfies do I need?",
    answer: "We recommend 6 to 10 clear, well-lit selfies with slightly varied angles and expressions for the best results.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most headshots are ready in about 2 hours. Upload between patients and have finished portraits by the end of your day.",
  },
  {
    question: "Is my data kept private?",
    answer: "We only process the selfies you upload to create your headshots. Your photos are never shared or used for other purposes.",
  },
];

export default function DentistsIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name={"Professional Headshots for Dentists"}
        description={"AI-generated professional headshots for dentists, orthodontists, hygienists, and dental staff in white coat or business attire."}
        price={990}
        category="Professional Services"
        slug="industries/dentists"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Industries', url: `${siteConfig.url}/industries` },
          { name: "Dentists", url: `${siteConfig.url}/industries/dentists` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Smile className="h-4 w-4" />
              For Dentists &amp; Dental Staff
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Dentists</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Patients pick their dentist before they pick up the phone. A warm, professional headshot on your website and directory listings builds trust from the first impression.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Dentist Headshot
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
            White Coat &amp; Business Options
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
              Headshots That Help Patients Choose You
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you portraits for your practice site, directories, and marketing materials.</p>
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
            <p className="mt-4 text-lg text-tp-muted">Headshots for every role in the dental practice.</p>
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
            Make a Great First Impression on Every Patient
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get polished headshots for your practice website, directories, and marketing from a few selfies.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Dentist Headshot
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
