import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Clapperboard, Eye, Film, Flame, Palette, Shield, Sparkles, Star, Target, Upload, Users, Zap } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const pageTitle = "AI Photos for TikTok | Profile Pictures & Thumbnails | TailorPic";
const pageDescription =
  "Create eye-catching TikTok profile photos and video thumbnails from a few selfies. AI-generated portraits that help you grow your audience, delivered in about 2 hours. Starting at $9.90.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/use-cases/tiktok' },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}/use-cases/tiktok`,
  },
};

const benefits = [
  {
    icon: Eye,
    title: "Stop the Scroll",
    description: "A striking profile photo makes people pause and check out your page. First impressions on TikTok happen in milliseconds, make yours count.",
  },
  {
    icon: Target,
    title: "Optimized for TikTok's Crop",
    description: "Every photo is framed for TikTok's circular profile thumbnail, ensuring your face stays centered on the For You page and in comment sections.",
  },
  {
    icon: Flame,
    title: "Trend-Ready Styles",
    description: "Choose from bold, creative, and editorial looks that match TikTok's high-energy vibe. Stand out without looking out of place.",
  },
  {
    icon: Palette,
    title: "Vibrant, Eye-Catching Colors",
    description: "Our AI creates photos with punchy colors and contrast that pop on phone screens, exactly where your TikTok audience is watching.",
  },
  {
    icon: Shield,
    title: "Use Anywhere, No Restrictions",
    description: "You own full rights to every photo. Use them on TikTok, cross-post to other platforms, or feature them in your merch and media kits.",
  },
  {
    icon: Zap,
    title: "Fresh Content in Hours",
    description: "Update your profile photo to match trends, seasons, or campaigns. Get new looks delivered in about 2 hours without leaving home.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload 6-10 Selfies",
    description: "Take clear, well-lit photos with your phone. A mix of angles helps our AI capture your best look. No ring light required.",
  },
  {
    icon: Sparkles,
    title: "Pick Your Style",
    description: "Select a creative direction: bold and colorful, clean and minimal, or edgy and dramatic. Choose backgrounds and vibes that fit your brand.",
  },
  {
    icon: Check,
    title: "Download and Go Live",
    description: "Receive polished, high-resolution photos in about 2 hours. Update your TikTok profile and start attracting new followers.",
  },
];

const features = [
  {
    icon: Clapperboard,
    title: "Content Creators",
    description: "Keep your profile looking fresh and professional while you focus on creating videos that go viral.",
  },
  {
    icon: Users,
    title: "Growing Creators",
    description: "Make a memorable first impression on new viewers discovering your content through the For You page.",
  },
  {
    icon: Film,
    title: "Brand Ambassadors",
    description: "Present a polished, brand-ready image that makes sponsors confident in partnering with you.",
  },
  {
    icon: Flame,
    title: "TikTok Shop Sellers",
    description: "Build buyer trust with a professional profile photo that makes your shop look established and credible.",
  },
];

const faqs = [
  {
    question: "Why does my TikTok profile photo matter?",
    answer: "Your profile picture appears on every video, comment, and duet. A professional, eye-catching photo builds recognition and encourages viewers to follow you after watching your content.",
  },
  {
    question: "What style works best for TikTok?",
    answer: "TikTok favors bold, expressive photos with good contrast. TailorPic lets you choose from creative and vibrant styles that match the platform's energy while still looking authentically you.",
  },
  {
    question: "How much does a TikTok profile photo cost?",
    answer: "TailorPic starts at $9.90 per pack. You receive multiple photo variations so you can test different looks and update your profile whenever you want a fresh vibe.",
  },
  {
    question: "Can I use these photos as video thumbnails?",
    answer: "Yes. Every photo is delivered in high resolution, so you can crop and use them for custom video thumbnails, cover images, and promotional graphics across all your social platforms.",
  },
  {
    question: "How long until I receive my photos?",
    answer: "Most TikTok photo packs are delivered in about 2 hours. Upload your selfies between videos and have a brand-new profile photo ready before your next post.",
  },
];

export default function TikTokUseCasePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name="AI Photos for TikTok"
        description="AI-generated photos optimized for TikTok profiles, video thumbnails, and creator branding."
        price={990}
        category="Professional Services"
        slug="use-cases/tiktok"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Use Cases', url: `${siteConfig.url}/use-cases` },
          { name: 'TikTok', url: `${siteConfig.url}/use-cases/tiktok` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Clapperboard className="h-4 w-4" />
              TikTok Profile Photos
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              AI Photos for{' '}
              <span className="not-italic text-tp-bronze">TikTok</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Your TikTok profile photo is your brand at a glance. Get bold, scroll-stopping portraits from a few phone selfies, no photoshoot needed. Delivered in about 2 hours, starting at just $9.90.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your TikTok Photos
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
            Optimized for TikTok
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Delivered in About 2 Hours
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Starting at $9.90
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Money-Back Guarantee
          </span>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
              Why Your TikTok Photo Matters
            </h2>
            <p className="mt-4 text-lg text-tp-muted">A standout profile photo turns casual viewers into loyal followers.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="tp-card rounded-2xl border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
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
            <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-tp-muted">From selfie to TikTok-ready photo in three steps.</p>
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
            <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
              Who Uses TailorPic for TikTok
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Bold photos for every type of TikTok creator.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-tp-line bg-white p-6">
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
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-tp-line bg-white p-6">
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
          <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
            Upgrade Your TikTok Profile Today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Level up your TikTok presence with studio-quality AI photos. Starting at just $9.90.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your TikTok Photos
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
