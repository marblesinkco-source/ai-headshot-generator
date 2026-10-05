import Image from 'next/image';
import { getIndustryVisual, portrait } from '@/config/stock-portraits';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs } from '@/components/marketing/breadcrumbs';
import { FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { ContentPhoto } from '@/components/marketing/content-photo';
const pageTitle = "AI Headshots for Veterinarians | TailorPic";
const pageDescription =
  'Professional AI headshots for veterinarians, vet techs and animal care teams. Build pet owner trust on your clinic website, Google profile and directories.';

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/veterinarians' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/industries/veterinarians', type: 'industry' }),
  
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'industry' }),
};

const benefits = [
  {
    title: "Earn Pet Owner Trust",
    description: "Pet owners want a caring, capable vet. A friendly, professional headshot helps new clients feel confident before their first visit.",
  },
  {
    title: "Clinic Website & Google Profile",
    description: "High-resolution portraits for your team page, Google Business Profile, and local directories help your clinic stand out in search.",
  },
  {
    title: "Consistent Team Photos",
    description: "Give every veterinarian and technician matching headshots without pulling the team away from the clinic for a photo day.",
  },
  {
    title: "Credibility for Specialists",
    description: "Referral vets and pet owners look for expertise. A polished image next to your credentials supports your authority.",
  },
  {
    title: "Looks Great in a Coat or Scrubs",
    description: "Choose looks that suit your setting, from white coat and scrubs to business casual for speaking and publishing.",
  },
  {
    title: "Fits a Busy Schedule",
    description: "Skip the studio booking. Upload a few selfies between appointments and get finished portraits without disrupting surgery days.",
  },
];

const steps = [
  {
    title: "Upload 6-10 Selfies",
    description: "Take clear, well-lit selfies with a friendly expression. Varied angles and natural smiles work best.",
  },
  {
    title: "Choose Your Style",
    description: "Choose a clinical, business casual, or approachable look with backgrounds that suit your practice.",
  },
  {
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots in about 2 hours, ready for your clinic website, Google profile, and directories.",
  },
];

const audiences = [
  {
    title: "Small Animal & Equine Vets",
    description: "Put a caring face on your clinic website so pet owners book with confidence.",
  },
  {
    title: "Specialists & Emergency Vets",
    description: "Show referring clinics and owners you are a trusted expert in your field.",
  },
  {
    title: "Vet Techs & Clinic Staff",
    description: "Give your whole care team a professional presence on your team page.",
  },
  {
    title: "Practice Owners & Associates",
    description: "Build a consistent brand across your clinic locations, recruiting pages, and social media.",
  },
];

const faqs = [
  {
    question: "Will the headshot work for my clinic website and Google profile?",
    answer: "Yes. You receive high-resolution portraits that suit team pages, Google Business Profiles, directories, and print materials.",
  },
  {
    question: "Can I get headshots in a white coat or scrubs?",
    answer: "You can choose looks that match your setting, including clinical attire or business casual, and the AI adapts your attire to the selected style.",
  },
  {
    question: "Can my whole clinic team get matching headshots?",
    answer: "Yes. Each team member uploads their own selfies and selects the same style and background for a consistent look.",
  },
  {
    question: "Can I use the headshots commercially?",
    answer: "Yes. Every headshot includes full commercial rights for your website, marketing materials, social media, and professional directories.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most headshots are ready in about 2 hours, so you can update your clinic profiles the same day.",
  },
  {
    question: "How many headshots do I get?",
    answer: "Each package delivers multiple variations so you can pick options for your website, social media, and professional listings.",
  },
];

export default function VeterinariansIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name={"Professional Headshots for Veterinarians"}
        description={"AI-generated professional headshots for veterinarians, vet techs, and animal care teams for clinic websites, Google profiles, and directories."}
        price={990}
        category="Professional Services"
        slug="industries/veterinarians"
      />
      <FAQSchema items={faqs} />
      <Header />
      <div className="bg-tp-paper pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Industries', href: '/industries' }, { label: 'Veterinarians' }]} currentPath="/industries/veterinarians" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Image src={portrait(getIndustryVisual("veterinarians").heroPortraitId)} alt={getIndustryVisual("veterinarians").alt} width={20} height={20} className="h-5 w-5 rounded-full object-cover" />
              For Veterinarians &amp; Animal Care Teams
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Veterinarians</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Pet owners trust the people who care for their family. Get a friendly, professional headshot for your clinic website and profiles, without taking time away from your patients.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Veterinarian Headshot
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
                src={portrait(getIndustryVisual("veterinarians").heroPortraitId)}
                alt={getIndustryVisual("veterinarians").alt}
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
            Clinical & Casual Looks
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
              Show the Care Behind Your Clinic
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you portraits for your team page, Google profile, and professional directories.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              return (
                <div
                  key={benefit.title}
                  className="tp-card rounded-tp-card border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <ContentPhoto slug="veterinarians" seed={benefit.title} className="h-12 w-12 rounded-xl" />
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
                  <ContentPhoto slug="veterinarians" seed={step.title} className="mx-auto h-14 w-14 rounded-full" />
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
            <p className="mt-4 text-lg text-tp-muted">Headshots for veterinarians and animal care professionals.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((item) => {
              return (
                <div key={item.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                  <ContentPhoto slug="veterinarians" seed={item.title} className="h-10 w-10 rounded-lg" />
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
            Help Pet Owners Choose You With Confidence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get a headshot that shows the skill and compassion you bring to every patient.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Veterinarian Headshot
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
