import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Briefcase, Check, Clock, GraduationCap, Palette, Shield, Sparkles, Upload, Users, Wallet } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs } from '@/components/marketing/breadcrumbs';
import { FAQSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const pageTitle = "AI Headshots for Graduation Photos | TailorPic";
const pageDescription =
  'Polished AI headshots for graduation announcements, yearbooks and your first job search. Get professional portraits from a few selfies. Starting at $1.99.';

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: 'https://www.tailorpic.com/use-cases/graduation-photo' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/use-cases/graduation-photo', type: 'usecase' }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'usecase' }),
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: "AI Headshots for Graduation Photos",
  description: "Professional AI portraits for graduation announcements and new-graduate profiles",
  url: 'https://www.tailorpic.com/use-cases/graduation-photo',
  brand: { '@type': 'Brand', name: 'TailorPic' },
  category: 'Professional Services',
  offers: {
    '@type': 'Offer',
    price: '1.99',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://www.tailorpic.com/use-cases/graduation-photo',
  },
};

const benefits = [
  {
    icon: GraduationCap,
    title: "Mark the Milestone",
    description: "Get a polished portrait for announcements, social posts and family keepsakes.",
  },
  {
    icon: Briefcase,
    title: "Ready for Your Job Search",
    description: "Use the same session for a LinkedIn and resume photo as you enter the workforce.",
  },
  {
    icon: Wallet,
    title: "Student-Friendly Price",
    description: "Skip a photographer session. Packs start at $1.99.",
  },
  {
    icon: Sparkles,
    title: "No Studio Shoot Needed",
    description: "Your portrait is generated from selfies, so there is nothing to book or schedule.",
  },
  {
    icon: Shield,
    title: "Your Photos, Your Rights",
    description: "You own every image with no watermarks. Reuse them anywhere.",
  },
  {
    icon: Clock,
    title: "Ready Before the Ceremony",
    description: "Upload selfies today and have your portrait within hours.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload a Few Selfies",
    description: "Share 6-10 clear phone photos with different expressions and angles. Natural daylight works best.",
  },
  {
    icon: Palette,
    title: "Choose a Graduate-Ready Style",
    description: "Pick a formal, smart-casual or friendly look that fits the occasion.",
  },
  {
    icon: Check,
    title: "Download and Share",
    description: "Get high-resolution photos within hours for announcements, profiles and prints.",
  },
];

const features = [
  {
    icon: GraduationCap,
    title: "College Graduates",
    description: "Celebrate your degree with a portrait for announcements and profiles.",
  },
  {
    icon: BookOpen,
    title: "Graduate Students",
    description: "Get a professional look for academic and job profiles.",
  },
  {
    icon: Briefcase,
    title: "Job Seekers",
    description: "Start your search with a polished LinkedIn photo.",
  },
  {
    icon: Users,
    title: "Families and Parents",
    description: "Create a keepsake portrait to share with relatives.",
  },
];

const faqs = [
  {
    "question": "Can I use it for graduation announcements?",
    "answer": "Yes. You receive high-resolution files suitable for announcements, social posts and prints."
  },
  {
    "question": "Will the photo look like me?",
    "answer": "Yes. TailorPic is trained on your own selfies, so results keep your real features and natural expression."
  },
  {
    "question": "Can I also use it for LinkedIn?",
    "answer": "Yes. The same session can give you photos for LinkedIn, resumes and job applications."
  },
  {
    "question": "Do I need a cap and gown?",
    "answer": "No. You can choose a style that suits you, from formal to smart casual."
  },
  {
    "question": "How much does it cost?",
    "answer": "TailorPic starts at $1.99 per pack, far less than a photographer session."
  },
  {
    "question": "How long does delivery take?",
    "answer": "Most orders arrive within hours after you upload your selfies."
  }
];

export default function GraduationPhotoUseCasePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <FAQSchema items={faqs} />
      <Header />
      <div className="bg-tp-paper pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Use Cases', href: '/use-cases' }, { label: 'Graduation Photo' }]} currentPath="/use-cases/graduation-photo" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <GraduationCap className="h-4 w-4" />
              {"Graduation Photos"}
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              {"AI Headshots for "}
              <span className="not-italic text-tp-bronze">{"Graduation Photos"}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              {"Mark the milestone with a portrait you are proud of. Get polished photos from a handful of selfies, delivered within hours, starting at just $1.99."}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                {"Get Your Graduation Headshot"}
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
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-tp-line bg-tp-paper py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm text-tp-muted sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {"Announcement and Profile Ready"}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {"Delivered Within Hours"}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {"Starting at $1.99"}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {"Quality Commitment"}
          </span>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              {"Why Your Graduation Portrait Matters"}
            </h2>
            <p className="mt-4 text-lg text-tp-muted">{"One photo that works for the announcement and the job hunt."}</p>
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
            <p className="mt-4 text-lg text-tp-muted">{"From selfie to graduation portrait in three steps."}</p>
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
              {"Who Uses TailorPic for Graduation Photos"}
            </h2>
            <p className="mt-4 text-lg text-tp-muted">{"Portraits for graduates at every level."}</p>
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
            {"Celebrate With a Portrait You Love"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            {"Look your best for the big day and what comes next. Starting at just $1.99."}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              {"Get Your Graduation Headshot"}
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
