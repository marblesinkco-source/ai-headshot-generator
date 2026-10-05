import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Check, Heart, Image, Palette, Shield, Sparkles, Sun, Target, Upload, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const pageTitle = 'AI Photos for Instagram Profile & Feed | TailorPic';
const pageDescription =
  'Create scroll-stopping Instagram photos from a few selfies. AI profile pictures and feed-worthy portraits that elevate your personal brand. From $1.99.';

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/use-cases/instagram' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/use-cases/instagram', type: 'usecase' }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'usecase' }),
};

const benefits = [
  {
    icon: Heart,
    title: "Boost Engagement Instantly",
    description: "High-quality photos help your posts stand out and attract more attention. A polished profile picture sets the tone for every interaction on your page.",
  },
  {
    icon: Target,
    title: "Perfect for the Instagram Grid",
    description: "Every photo is framed for Instagram's square crop and circular profile thumbnail, looking sharp across feed posts, stories, and reels.",
  },
  {
    icon: Palette,
    title: "Match Your Aesthetic",
    description: "Choose from warm, cool, moody, or bright tones. Get photos that blend seamlessly with your existing feed and visual brand.",
  },
  {
    icon: Sun,
    title: "Studio-Quality Lighting",
    description: "Golden hour glow, soft studio light, or natural outdoor tones. Our AI recreates professional lighting setups from your casual selfies.",
  },
  {
    icon: Shield,
    title: "Full Ownership, No Watermarks",
    description: "You own every photo outright. Post them to your feed, use them in stories, or repurpose for other platforms without any restrictions.",
  },
  {
    icon: Camera,
    title: "Content-Ready Portraits",
    description: "Get photos that work as profile pictures, feed posts, story covers, and highlight thumbnails, all from a single order.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload 6-10 Selfies",
    description: "Snap clear photos with your phone in good lighting. Vary your angles slightly. No need for makeup or professional styling.",
  },
  {
    icon: Sparkles,
    title: "Choose Your Vibe",
    description: "Select a style that fits your brand: casual, editorial, lifestyle, or glam. Pick your preferred background and color palette.",
  },
  {
    icon: Check,
    title: "Download and Post",
    description: "Receive polished, high-resolution photos in about 2 hours. Upload your favorites to Instagram and watch the likes roll in.",
  },
];

const features = [
  {
    icon: Camera,
    title: "Influencers & Creators",
    description: "Maintain a consistent, polished aesthetic across your feed without booking a photographer for every post.",
  },
  {
    icon: Users,
    title: "Small Business Owners",
    description: "Put a professional face on your brand's Instagram page and build trust with potential customers.",
  },
  {
    icon: Image,
    title: "Personal Brands",
    description: "Elevate your personal profile with photos that look curated and intentional, not like random snapshots.",
  },
  {
    icon: Heart,
    title: "Lifestyle & Dating Profiles",
    description: "Get flattering, natural-looking photos that show you at your best for social and dating apps.",
  },
];

const faqs = [
  {
    question: "Why does my Instagram profile photo matter?",
    answer: "Your profile picture is the first thing people see when they discover your page. A high-quality photo signals credibility and encourages new visitors to follow you, especially when it matches a cohesive feed aesthetic.",
  },
  {
    question: "Will the photos look natural or obviously AI-generated?",
    answer: "TailorPic photos look like they were taken by a professional photographer. The AI captures natural expressions and realistic lighting, so your followers will not be able to tell the difference.",
  },
  {
    question: "How much do Instagram-ready photos cost?",
    answer: "TailorPic starts at $1.99 per pack. You receive multiple high-resolution photos optimized for Instagram's feed, profile, and story formats, all for less than a single hour with a photographer.",
  },
  {
    question: "Can I use these photos for stories and reels covers?",
    answer: "Yes. Every photo is delivered in high resolution so you can crop and resize for any Instagram format, including stories, reels thumbnails, highlights, and feed posts.",
  },
  {
    question: "How long until I receive my photos?",
    answer: "Most orders are delivered in about 2 hours. Upload your selfies in the morning and have fresh content ready to post by lunchtime.",
  },
];

export default function InstagramUseCasePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name="AI Photos for Instagram"
        description="AI-generated photos optimized for Instagram profiles, feed posts, stories, and personal branding."
        price={990}
        category="Professional Services"
        slug="use-cases/instagram"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Use Cases', url: `${siteConfig.url}/use-cases` },
          { name: 'Instagram', url: `${siteConfig.url}/use-cases/instagram` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Camera className="h-4 w-4" />
              Instagram Photos
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              AI Photos for{' '}
              <span className="not-italic text-tp-bronze">Instagram</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Your Instagram profile deserves more than a cropped group photo. Get scroll-stopping portraits from a few phone selfies, no photographer or studio needed. Delivered in about 2 hours, starting at just $1.99.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Instagram Photos
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
            Optimized for Instagram
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Delivered in About 2 Hours
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Starting at $1.99
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
              Why Great Instagram Photos Matter
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Stand out in crowded feeds with photos that look professionally shot.</p>
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
            <p className="mt-4 text-lg text-tp-muted">From selfie to Instagram-ready photo in three steps.</p>
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
              Who Uses TailorPic for Instagram
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Stunning photos for every type of Instagram creator.</p>
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
            Level Up Your Instagram Today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Transform your Instagram presence with studio-quality AI photos. Starting at just $1.99.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Instagram Photos
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
