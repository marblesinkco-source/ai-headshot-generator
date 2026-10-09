import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Check, Clock, Globe, GraduationCap, Mail, Shield, Sparkles, Upload, UserCheck, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs } from '@/components/marketing/breadcrumbs';
import { FAQSchema, ProductSchema, BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { FAQAccordion } from '@/components/marketing/faq-accordion';

const pageTitle = "AI Headshots for Newsletter Authors | TailorPic";
const pageDescription =
  `Professional author photos for Substack, Beehiiv, Ghost and email newsletters. Put a face to your writing from a few selfies. Starting at ${BASE_PRICE_DISPLAY}.`;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/use-cases/newsletter' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/use-cases/newsletter', type: 'usecase' }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'usecase' }),
};


const benefits = [
  {
    icon: UserCheck,
    title: "Put a Face to Your Writing",
    description: "A friendly, professional photo helps readers feel a personal connection with the voice behind the newsletter.",
  },
  {
    icon: Mail,
    title: "Looks Good in the Inbox",
    description: "Photos are framed with your face large and centered so you stay recognizable as a small avatar next to your sender name.",
  },
  {
    icon: Globe,
    title: "One Photo, Every Platform",
    description: "Use the same headshot on Substack, Beehiiv, Ghost, Medium, and your social profiles.",
  },
  {
    icon: Sparkles,
    title: "No Photographer Needed",
    description: "Skip the shoot. Your portrait is generated from selfies, so you can refresh it whenever you like.",
  },
  {
    icon: Shield,
    title: "Your Photos, Your Rights",
    description: "You own every image with no watermarks. Reuse them on your about page, guest posts, and podcasts.",
  },
  {
    icon: Clock,
    title: "Ready Before Your Next Issue",
    description: "Upload selfies today and have your new author photo within hours.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload a Few Selfies",
    description: "Share 6-10 clear phone photos with different expressions and angles. Natural daylight works best.",
  },
  {
    icon: Users,
    title: "Choose an Author-Ready Style",
    description: "Pick a warm, editorial, or professional look and a clean background that suits your topic.",
  },
  {
    icon: Check,
    title: "Download and Update Your Profiles",
    description: "Get high-resolution photos within hours, then add your favorite to your newsletter platform.",
  },
];

const features = [
  {
    icon: Mail,
    title: "Independent Writers",
    description: "Build a personal brand that readers recognize and trust.",
  },
  {
    icon: Briefcase,
    title: "B2B Newsletter Founders",
    description: "Give your industry newsletter a credible, professional author.",
  },
  {
    icon: Users,
    title: "Creators & Analysts",
    description: "Look consistent across your newsletter, social, and guest posts.",
  },
  {
    icon: GraduationCap,
    title: "Academics & Experts",
    description: "Share your expertise with a polished author profile.",
  },
];

const faqs = [
  {
    question: "Where do I use my author photo?",
    answer: "On your newsletter about page, sender avatar, subscribe page, guest posts, and social profiles.",
  },
  {
    question: "Will the photo look like me?",
    answer: "Yes. TailorPic is trained on your own selfies, so results keep your real features and natural expression.",
  },
  {
    question: "Can I use it on Substack, Beehiiv and Ghost?",
    answer: "Yes. You receive high-resolution files that work on any platform that accepts a profile picture.",
  },
  {
    question: "Will it look good as a small avatar?",
    answer: "Yes. Photos are framed with your face large and centered so you stay recognizable at small sizes.",
  },
  {
    question: "How much does it cost?",
    answer: `TailorPic starts at ${BASE_PRICE_DISPLAY} per pack, far less than a photographer session.`,
  },
  {
    question: "How long does delivery take?",
    answer: "Most orders arrive within hours after you upload your selfies.",
  },
];

export default function NewsletterUseCasePage() {
  return (
    <>
      <ProductSchema
        name="TailorPic"
        description="Professional author headshots for Substack, Beehiiv and email newsletters"
        price={199}
        category="Professional Services"
        slug="use-cases/newsletter"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
          items={[
            { name: 'Home', url: siteConfig.url },
            { name: 'Use Cases', url: `${siteConfig.url}/use-cases` },
            { name: 'Newsletter', url: `${siteConfig.url}/use-cases/newsletter` },
          ]}
        />
      <Header />
      <main id="main-content">
      <div className="bg-tp-paper pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Use Cases', href: '/use-cases' }, { label: 'Newsletters' }]} currentPath="/use-cases/newsletter" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Mail className="h-4 w-4" />
              {"Newsletter Authors"}
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              {"AI Headshots for "}
              <span className="not-italic text-tp-bronze">{"Newsletter Authors"}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              {`Readers subscribe to people, not just publications. Get a crisp, professional author photo for your newsletter from a handful of selfies, delivered within hours, starting at just ${BASE_PRICE_DISPLAY}.`}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                {"Get Your Author Headshot"}
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
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-tp-line bg-tp-paper py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm text-tp-muted sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {"Works on Substack & Beehiiv"}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {"Delivered Within Hours"}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {`Starting at ${BASE_PRICE_DISPLAY}`}
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
              {"Why Your Newsletter Photo Matters"}
            </h2>
            <p className="mt-4 text-lg text-tp-muted">{"A familiar face turns a cold subscribe page into a personal invitation."}</p>
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
            <p className="mt-4 text-lg text-tp-muted">{"From selfie to new author photo in three steps."}</p>
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
              {"Who Uses TailorPic for Newsletters"}
            </h2>
            <p className="mt-4 text-lg text-tp-muted">{"Great photos for everyone who writes to an audience."}</p>
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
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
            {"Give Your Newsletter a Face Readers Trust"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            {`Turn subscribers into a community with a photo they recognize. Starting at just ${BASE_PRICE_DISPLAY}.`}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              {"Get Your Author Headshot"}
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
