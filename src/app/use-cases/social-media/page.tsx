import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Check, Globe, Image, Instagram, Layers, Palette, Sparkles, Star, TrendingUp, Upload, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const pageTitle = 'AI Profile Photos for Social Media | TailorPic';
const pageDescription =
  'Create stunning profile photos for Instagram, Twitter, Facebook, TikTok, and other social media platforms. AI-generated photos that stop the scroll. From $9.90.';

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/use-cases/social-media' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/use-cases/social-media', type: 'usecase' }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'usecase' }),
};

const benefits = [
  {
    icon: Image,
    title: "Scroll-Stopping Profile Photos",
    description: "Stand out in crowded feeds with a profile picture that looks sharp and intentional, whether viewed as a tiny thumbnail or a full-size image.",
  },
  {
    icon: Palette,
    title: "Match Any Aesthetic",
    description: "From clean and minimal to warm and vibrant, choose a style that fits your feed's aesthetic and personal vibe.",
  },
  {
    icon: Layers,
    title: "Content for Every Platform",
    description: "Get multiple photo variations so you can use different images on Instagram, Twitter, Facebook, TikTok, YouTube, and Discord.",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Following",
    description: "Accounts with high-quality profile photos attract more followers and engagement. First impressions matter, even in a profile circle.",
  },
  {
    icon: Camera,
    title: "No Photography Skills Needed",
    description: "Take a few selfies with your phone and let the AI handle composition, lighting, and backgrounds. Professional results, zero photography knowledge required.",
  },
  {
    icon: Globe,
    title: "Use Anywhere, No Restrictions",
    description: "Full commercial rights mean you can use your photos on any platform, in promotional posts, on your website, and in collaborations.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload 6-10 Selfies",
    description: "Take clear photos in decent lighting. Mix up your expressions. Any casual outfit works since the AI can change your look.",
  },
  {
    icon: Sparkles,
    title: "Pick Your Style",
    description: "Choose from lifestyle, creative, professional, or casual aesthetics. Select backgrounds that complement your social media brand.",
  },
  {
    icon: Check,
    title: "Refresh All Your Profiles",
    description: "Receive high-resolution photos in about 2 hours. Update your profile pictures across every social platform in one sitting.",
  },
];

const features = [
  {
    icon: Instagram,
    title: "Content Creators",
    description: "Keep your profile photo fresh and on-brand without dedicating a full content day to self-portraits.",
  },
  {
    icon: Users,
    title: "Influencers",
    description: "Maintain a polished, recognizable image across all platforms where your audience finds you.",
  },
  {
    icon: TrendingUp,
    title: "Small Business Owners",
    description: "Put a trustworthy face on your brand's social accounts without a professional photo budget.",
  },
  {
    icon: Globe,
    title: "Anyone Online",
    description: "Whether you are job hunting, networking, or just want to look good online, a great profile photo makes a difference.",
  },
];

const faqs = [
  {
    question: "Will the photos work as Instagram profile pictures?",
    answer: "Yes. TailorPic photos are high resolution and look sharp in Instagram's circular crop, as well as on Twitter, Facebook, TikTok, YouTube, Discord, and any other platform that uses profile photos.",
  },
  {
    question: "Can I get photos that match my feed aesthetic?",
    answer: "Absolutely. You can choose from a variety of backgrounds, lighting styles, and attire options to create photos that blend naturally with your existing content and brand aesthetic.",
  },
  {
    question: "How often should I update my social media profile photo?",
    answer: "Most social media experts recommend refreshing your profile photo every few months to keep your presence feeling current and active. With TailorPic starting at $9.90, regular updates are easy and affordable.",
  },
  {
    question: "Can I use these photos in paid promotions or sponsored posts?",
    answer: "Yes. You receive full commercial rights with every order, so you can use your photos in ads, sponsored content, brand collaborations, and any other commercial context.",
  },
  {
    question: "What resolution are the photos?",
    answer: "All TailorPic photos are delivered in high resolution, suitable for both social media uploads and print materials. They look sharp on any screen size, from phone thumbnails to desktop displays.",
  },
];

export default function SocialMediaUseCasePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name="AI Profile Photos for Social Media"
        description="AI-generated profile photos optimized for Instagram, Twitter, Facebook, TikTok, and other social media platforms."
        price={990}
        category="Professional Services"
        slug="use-cases/social-media"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Use Cases', url: `${siteConfig.url}/use-cases` },
          { name: 'Social Media', url: `${siteConfig.url}/use-cases/social-media` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Instagram className="h-4 w-4" />
              Social Media Photos
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              AI Profile Photos for{' '}
              <span className="not-italic text-tp-bronze">Social Media</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Your profile photo is the first thing people notice on every platform. Get polished, eye-catching photos for Instagram, Twitter, TikTok, and beyond, from a few quick selfies. Starting at just $9.90.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Social Media Photos
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
            Works on Every Platform
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
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              Why Your Profile Photo Matters
            </h2>
            <p className="mt-4 text-lg text-tp-muted">On social media, your profile photo is your brand. Make sure it represents the best version of you.</p>
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
            <p className="mt-4 text-lg text-tp-muted">Three steps to profile photos that turn heads.</p>
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
              Who Uses TailorPic for Social Media
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Great profile photos for anyone who wants to stand out online.</p>
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
            Level Up Your Social Media Presence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get profile photos that make people stop scrolling and start following. Multiple styles for every platform, starting at $9.90.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Social Media Photos
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
