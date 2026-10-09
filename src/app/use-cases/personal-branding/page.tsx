import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Briefcase, Check, Crown, Mic, Palette, Sparkles, Target, TrendingUp, Upload, Zap } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs } from '@/components/marketing/breadcrumbs';
import { FAQSchema, ProductSchema, BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

const pageTitle = 'AI Photos for Personal Branding | TailorPic';
const pageDescription =
  `Create a consistent visual identity with AI-generated professional photos for your personal brand. Ideal for coaches, speakers and authors. From ${BASE_PRICE_DISPLAY}.`;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/use-cases/personal-branding' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/use-cases/personal-branding', type: 'usecase' }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'usecase' }),
};

const benefits = [
  {
    icon: Crown,
    title: "Build Recognition Across Platforms",
    description: "Use a consistent, high-quality photo across your website, social profiles, podcast pages, and email signature to become instantly recognizable.",
  },
  {
    icon: Palette,
    title: "Multiple Looks, One Session",
    description: "Get photos in different styles, from polished professional to approachable casual, so you have the right image for every platform and context.",
  },
  {
    icon: Target,
    title: "Tailored to Your Niche",
    description: "Whether you are a coach, consultant, creator, or entrepreneur, choose attire and settings that resonate with your specific audience.",
  },
  {
    icon: TrendingUp,
    title: "Stay Current Without Reshooting",
    description: "Update your look whenever you want by uploading new selfies. No need to book a photographer every time you change your hair or glasses.",
  },
  {
    icon: Zap,
    title: "Ready in Hours, Not Weeks",
    description: `Traditional branding shoots take weeks to schedule and edit. TailorPic delivers polished photos within hours, from ${BASE_PRICE_DISPLAY}.`,
  },
  {
    icon: Briefcase,
    title: "Full Commercial Usage Rights",
    description: "Use your photos on your website, ads, course materials, book covers, media kits, and anywhere else your brand appears. No extra licensing fees.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload 6-10 Selfies",
    description: "Take clear photos in good lighting with your phone. Include a mix of expressions. Casual clothes are fine since the AI handles attire.",
  },
  {
    icon: Sparkles,
    title: "Define Your Brand Look",
    description: "Choose backgrounds, attire, and lighting that match your personal brand. Go for executive polish, creative energy, or warm approachability.",
  },
  {
    icon: Check,
    title: "Build Your Brand Asset Library",
    description: "Receive high-resolution photos ready for your website hero, social profiles, speaker one-sheet, media kit, and email signature.",
  },
];

const features = [
  {
    icon: Mic,
    title: "Speakers & Coaches",
    description: "Get stage-ready headshots for conference bios, speaker pages, and coaching profiles that project authority and warmth.",
  },
  {
    icon: BookOpen,
    title: "Authors & Creators",
    description: "Professional author photos for book jackets, blog headers, and course landing pages without a studio session.",
  },
  {
    icon: TrendingUp,
    title: "Entrepreneurs & Founders",
    description: "Present a polished image on your startup website, pitch deck, and press mentions from day one.",
  },
  {
    icon: Briefcase,
    title: "Consultants & Freelancers",
    description: "Build trust with prospective clients through a professional image that matches the quality of your work.",
  },
];

const faqs = [
  {
    question: "How is this different from a regular headshot?",
    answer: "Personal branding photos go beyond a single headshot. TailorPic gives you multiple photos with different styles, backgrounds, and moods so you have a cohesive visual library for every touchpoint of your brand, from social media to speaker pages.",
  },
  {
    question: "Can I use these photos for advertising and marketing?",
    answer: "Yes. You own full commercial rights to every photo TailorPic generates. Use them in ads, landing pages, email campaigns, printed materials, and anywhere else your brand appears.",
  },
  {
    question: "What if my brand style changes?",
    answer: `Simply upload new selfies and choose updated styles whenever you rebrand. There is no need to rebook a photographer. With pricing from ${BASE_PRICE_DISPLAY}, refreshing your visual identity is affordable and fast.`,
  },
  {
    question: "Do I need professional makeup or styling?",
    answer: "No. Upload selfies as you normally look. TailorPic handles lighting, attire, and backgrounds digitally. The results look naturally polished without professional hair and makeup.",
  },
  {
    question: "How quickly can I get my photos?",
    answer: "Most orders are delivered within hours. You can refresh your entire brand presence across platforms in a single afternoon.",
  },
];

export default function PersonalBrandingUseCasePage() {
  return (
    <>
      <ProductSchema
        name="AI Photos for Personal Branding"
        description="AI-generated professional photos for personal branding, suitable for coaches, speakers, authors, entrepreneurs, and consultants."
        price={990}
        category="Professional Services"
        slug="use-cases/personal-branding"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
          items={[
            { name: 'Home', url: siteConfig.url },
            { name: 'Use Cases', url: `${siteConfig.url}/use-cases` },
            { name: 'Personal Branding', url: `${siteConfig.url}/use-cases/personal-branding` },
          ]}
        />
      <Header />
      <main id="main-content">
      <div className="bg-tp-paper pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Use Cases', href: '/use-cases' }, { label: 'Personal Branding' }]} currentPath="/use-cases/personal-branding" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Crown className="h-4 w-4" />
              Personal Branding
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              AI Photos for{' '}
              <span className="not-italic text-tp-bronze">Personal Branding</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Your personal brand deserves a visual identity as strong as your expertise. Get a library of polished, on-brand photos from a few quick selfies. No studio, no photographer, no scheduling hassle. Starting at {BASE_PRICE_DISPLAY}.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Build Your Brand Photos
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
            Multiple Brand Styles
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Full Commercial Rights
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Starting at {BASE_PRICE_DISPLAY}
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
              Why Your Personal Brand Needs Great Photos
            </h2>
            <p className="mt-4 text-lg text-tp-muted">People connect with faces, not logos. A strong visual identity builds trust and recognition before you ever speak a word.</p>
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
            <p className="mt-4 text-lg text-tp-muted">Three steps to a complete personal brand photo library.</p>
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
              Who Uses TailorPic for Personal Branding
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Professional photos for people who are their brand.</p>
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
            Elevate Your Personal Brand Today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get a complete set of on-brand photos for your website, social profiles, and marketing materials. Starting at just {BASE_PRICE_DISPLAY}.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Build Your Brand Photos
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
