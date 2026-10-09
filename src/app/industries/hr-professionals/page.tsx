import Image from 'next/image';
import { getIndustryVisual, portrait } from '@/config/stock-portraits';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs } from '@/components/marketing/breadcrumbs';
import { FAQSchema, ProductSchema, BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { ContentPhoto } from '@/components/marketing/content-photo';
const pageTitle = "AI Headshots for HR Professionals | TailorPic";
const pageDescription =
  'Professional AI headshots for HR managers, recruiters and talent leaders. Build trust on LinkedIn, careers pages and internal profiles.';

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/hr-professionals' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/industries/hr-professionals', type: 'industry' }),
  
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'industry' }),
};

const benefits = [
  {
    title: "Approachable First Impressions",
    description: "Candidates often look you up before an interview. A warm, professional headshot helps set a welcoming tone from the very first touchpoint.",
  },
  {
    title: "LinkedIn Recruiting Presence",
    description: "Recruiters live on LinkedIn. A clear, current photo makes your outreach messages feel more credible and human.",
  },
  {
    title: "Credibility for Sensitive Conversations",
    description: "HR handles important topics. A confident, trustworthy portrait supports the authority your role requires.",
  },
  {
    title: "Careers Page & Employer Brand",
    description: "Put a real face on your team page, job postings, and employer branding so candidates see who they would work with.",
  },
  {
    title: "Consistent Across Platforms",
    description: "Use matching portraits on your email signature, internal directory, conference bios, and social profiles.",
  },
  {
    title: "Skip the Scheduling Hassle",
    description: "No coordinating photographers or calendars. Get a professional result from home on your own timeline.",
  },
];

const steps = [
  {
    title: "Upload 6-10 Selfies",
    description: "Take clear, well-lit photos of yourself. Vary your angles and expressions so the AI captures your natural, friendly look.",
  },
  {
    title: "Choose Your Style",
    description: "Pick backgrounds and looks that fit your workplace, from relaxed and welcoming to polished and corporate.",
  },
  {
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots within hours, ready for LinkedIn, your careers page, and your email signature.",
  },
];

const audiences = [
  {
    title: "Recruiters & Talent Acquisition",
    description: "Make outreach feel personal and trustworthy with a photo candidates can connect with.",
  },
  {
    title: "HR Managers & Generalists",
    description: "Project approachable authority across internal profiles and company pages.",
  },
  {
    title: "HR Directors & CHROs",
    description: "Show executive presence on leadership pages, conference bios, and press mentions.",
  },
  {
    title: "People & Culture Leads",
    description: "Represent your culture with a photo that feels warm, current, and on brand.",
  },
];

const faqs = [
  {
    question: "Will my headshot look approachable as well as professional?",
    answer: "Yes. You can choose styles that balance warmth and authority, which suits HR roles where people need to feel both comfortable and respected.",
  },
  {
    question: "Can I use the headshot on LinkedIn and our careers page?",
    answer: "Yes. You receive full commercial rights, so you can use your headshots on LinkedIn, company websites, job postings, and presentations.",
  },
  {
    question: "Will it match my company's dress code?",
    answer: "You can choose looks from business casual to formal. Pick the style that fits your workplace and industry.",
  },
  {
    question: "Should I check my company's policy on profile photos?",
    answer: "It is a good idea. Some employers have guidelines for directory or badge photos, so confirm the requirements before replacing an official image.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most headshots are ready within hours, so you can refresh your profile the same day.",
  },
  {
    question: "How many headshots do I get?",
    answer: "Each package delivers multiple variations across backgrounds and styles, giving you options for different platforms.",
  },
];

export default function HrProfessionalsIndustryPage() {
  return (
    <>
      <ProductSchema
        name={"Professional Headshots for HR Professionals"}
        description={"Professional AI headshots for HR managers, recruiters, and talent leaders."}
        price={990}
        category="Human Resources"
        slug="industries/hr-professionals"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
          items={[
            { name: 'Home', url: siteConfig.url },
            { name: 'Industries', url: `${siteConfig.url}/industries` },
            { name: 'HR Professionals', url: `${siteConfig.url}/industries/hr-professionals` },
          ]}
        />
      <Header />
      <main id="main-content">
      <div className="bg-tp-paper pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Industries', href: '/industries' }, { label: 'HR Professionals' }]} currentPath="/industries/hr-professionals" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Image src={portrait(getIndustryVisual("hr-professionals").heroPortraitId)} alt={getIndustryVisual("hr-professionals").alt} width={20} height={20} className="h-5 w-5 rounded-full object-cover" />
              For HR Professionals
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">HR Professionals</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              You represent your company to every candidate and employee. Get a polished, approachable headshot for LinkedIn, your careers page, and internal profiles, without booking a photo shoot.</p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your HR Headshot
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
              ))}
          
            {/* Hero portrait */}
            <div className="mx-auto mt-12 h-32 w-32 overflow-hidden rounded-full ring-4 ring-tp-bronze/20 sm:h-40 sm:w-40">
              <Image
                src={portrait(getIndustryVisual("hr-professionals").heroPortraitId)}
                alt={getIndustryVisual("hr-professionals").alt}
                width={320}
                height={427}
                sizes="160px"
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
            Approachable, Professional Looks
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Delivered Within Hours
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Full Commercial Rights
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Quality Commitment
          </span>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              Be the Friendly Face of Your Company
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you portraits for LinkedIn, your careers page, and internal directories.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              return (
                <div
                  key={benefit.title}
                  className="tp-card rounded-tp-card border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <ContentPhoto slug="hr-professionals" seed={benefit.title} className="h-12 w-12 rounded-xl" />
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
                  <ContentPhoto slug="hr-professionals" seed={step.title} className="mx-auto h-14 w-14 rounded-full" />
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
            <p className="mt-4 text-lg text-tp-muted">Headshots for every kind of people operations and talent professional.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((item) => {
              return (
                <div key={item.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                  <ContentPhoto slug="hr-professionals" seed={item.title} className="h-10 w-10 rounded-lg" />
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
            Put a Friendly, Credible Face on HR
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get a headshot that helps candidates and colleagues feel welcome from the first interaction.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your HR Headshot
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

      </main>
      <Footer />
    </>
  );
}
