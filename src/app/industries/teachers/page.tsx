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
const pageTitle = 'AI Headshots for Teachers & Educators | TailorPic';
const pageDescription =
  'Professional AI headshots for teachers, professors, tutors, and school staff. Ready for school websites, academic profiles, and conference materials.';

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/teachers' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/industries/teachers', type: 'industry' }),
  
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'industry' }),
};

const benefits = [
  {
    title: "School Website & Staff Pages",
    description: "Consistent, high-resolution portraits that make faculty directories look cohesive and welcoming.",
  },
  {
    title: "Academic & Faculty Profiles",
    description: "Polished photos for university pages, Google Scholar, ResearchGate, and departmental bios.",
  },
  {
    title: "Conference Materials",
    description: "Speaker-ready images for programs, panels, and presentation slides.",
  },
  {
    title: "Warm and Approachable",
    description: "Friendly expressions help families and students feel comfortable before the first day of class.",
  },
  {
    title: "Affordable Without a Studio",
    description: "Skip the school picture day scramble. Upload selfies and get results within hours.",
  },
  {
    title: "Matching Headshots for Staff",
    description: "Give a whole department or school the same background and style with no scheduling.",
  },
];

const steps = [
  {
    title: "Upload 6-10 Selfies",
    description: "Take clear photos with your phone in good light. Vary angles and expressions slightly. Casual clothes are fine.",
  },
  {
    title: "Choose Your Style",
    description: "Pick a professional or smart-casual look and a background that suits your school or institution.",
  },
  {
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots within hours, ready for your school site, profiles, and conference bios.",
  },
];

const audiences = [
  {
    title: "Teachers & Tutors",
    description: "Update your classroom page, tutoring profile, and LinkedIn with a friendly professional photo.",
  },
  {
    title: "Professors & Researchers",
    description: "Add a polished image to faculty pages, publications, and grant materials.",
  },
  {
    title: "School Staff & Administrators",
    description: "Create matching headshots for principals, counselors, and office teams.",
  },
  {
    title: "Education Entrepreneurs",
    description: "Build trust for online courses, coaching, and education businesses.",
  },
];

const faqs = [
  {
    question: "Can I use the headshot on my school website?",
    answer: "Yes. You receive high-resolution files with full commercial rights. Check with your school or district about any photo guidelines.",
  },
  {
    question: "Can a whole school or department get matching headshots?",
    answer: "Yes. Each person uploads their own selfies and can choose the same background and style for a unified look.",
  },
  {
    question: "Are these suitable for academic profiles?",
    answer: "Yes. They work well for faculty pages, Google Scholar, ResearchGate, and conference speaker bios.",
  },
  {
    question: "How many selfies do I need?",
    answer: "We recommend 6 to 10 clear, well-lit selfies with different angles and expressions for the best results.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most headshots are ready within hours, so you can upload during a free period and have them by the end of the day.",
  },
];

export default function TeachersIndustryPage() {
  return (
    <>
      <ProductSchema
        name={"Professional Headshots for Teachers"}
        description={"AI-generated professional headshots for teachers, professors, tutors, and school staff."}
        price={990}
        category="Professional Services"
        slug="industries/teachers"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
          items={[
            { name: 'Home', url: siteConfig.url },
            { name: 'Industries', url: `${siteConfig.url}/industries` },
            { name: 'Teachers', url: `${siteConfig.url}/industries/teachers` },
          ]}
        />
      <Header />
      <main id="main-content">
      <div className="bg-tp-paper pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Industries', href: '/industries' }, { label: 'Teachers' }]} currentPath="/industries/teachers" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Image src={portrait(getIndustryVisual("teachers").heroPortraitId)} alt={getIndustryVisual("teachers").alt} width={20} height={20} className="h-5 w-5 rounded-full object-cover" />
              For Teachers &amp; Educators
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Educators</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Parents, students, and colleagues look you up before they ever meet you. Get warm, professional headshots for your school website and academic profiles from a few selfies, with no photographer and no lost planning period.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Educator Headshot
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
                src={portrait(getIndustryVisual("teachers").heroPortraitId)}
                alt={getIndustryVisual("teachers").alt}
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
            School Website Ready
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
              Headshots for Classrooms, Campuses, and Conferences
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you portraits for every place your students and peers find you.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              return (
                <div
                  key={benefit.title}
                  className="tp-card rounded-tp-card border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <ContentPhoto slug="teachers" seed={benefit.title} className="h-12 w-12 rounded-xl" />
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
                  <ContentPhoto slug="teachers" seed={step.title} className="mx-auto h-14 w-14 rounded-full" />
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
            <p className="mt-4 text-lg text-tp-muted">Headshots for everyone who teaches and supports learning.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((item) => {
              return (
                <div key={item.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                  <ContentPhoto slug="teachers" seed={item.title} className="h-10 w-10 rounded-lg" />
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
            Show Up as the Educator You Are
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get polished headshots for your school site and academic profiles from a few selfies.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Educator Headshot
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
