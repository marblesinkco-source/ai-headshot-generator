import type { Metadata } from 'next';
import Link from 'next/link';
import { AtSign, Check, Globe, MessageCircle, Pen, Shield, Sparkles, Star, Target, Upload, Users, Zap } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const pageTitle = 'AI Profile Photos for X (Twitter) | TailorPic';
const pageDescription =
  'Create a sharp, memorable X (Twitter) profile photo from a few selfies. AI-generated portraits that build credibility in replies, threads, and DMs. From $1.99.';

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/use-cases/twitter' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/use-cases/twitter', type: 'usecase' }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'usecase' }),
};

const benefits = [
  {
    icon: MessageCircle,
    title: "Credibility in Every Reply",
    description: "Your profile photo appears next to every post, reply, and repost. A polished headshot signals you are a real person worth engaging with, not a bot or throwaway account.",
  },
  {
    icon: Target,
    title: "Optimized for X's Circular Crop",
    description: "Every photo is framed for X's circular thumbnail, keeping your face centered and recognizable in timelines, notifications, and Spaces.",
  },
  {
    icon: Pen,
    title: "Build Your Personal Brand",
    description: "Whether you are building an audience or networking with industry leaders, a professional photo helps your posts get taken seriously.",
  },
  {
    icon: Globe,
    title: "Clean, Distraction-Free Backgrounds",
    description: "Solid and gradient backgrounds keep attention on your face, making your tiny profile thumbnail instantly recognizable in busy timelines.",
  },
  {
    icon: Shield,
    title: "Full Commercial Rights",
    description: "You own every photo outright. Use them on X, your blog, newsletters, podcast artwork, and anywhere else you show up online.",
  },
  {
    icon: Zap,
    title: "Update Your Look Anytime",
    description: "Rebrand, refresh, or match a seasonal campaign. Get a new set of profile photos in about 2 hours whenever your online identity evolves.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload 6-10 Selfies",
    description: "Take clear photos with your phone in good lighting. Different angles help our AI capture a natural, authentic look.",
  },
  {
    icon: Sparkles,
    title: "Choose Your Style",
    description: "Select a look that fits your X persona: professional, creative, casual, or editorial. Pick a background that makes your thumbnail pop.",
  },
  {
    icon: Check,
    title: "Download and Update Your Profile",
    description: "Receive polished, high-resolution photos in about 2 hours. Set your new profile photo and start making better impressions in every thread.",
  },
];

const features = [
  {
    icon: Pen,
    title: "Writers & Thought Leaders",
    description: "Pair your insights with a photo that commands respect. A professional headshot makes your threads and newsletters more credible.",
  },
  {
    icon: Users,
    title: "Founders & Entrepreneurs",
    description: "Build trust with investors, customers, and collaborators who check your profile before replying to your DM.",
  },
  {
    icon: AtSign,
    title: "Community Builders",
    description: "Stand out as a host in X Spaces and group chats with a recognizable, high-quality profile photo.",
  },
  {
    icon: Globe,
    title: "Developers & Tech Professionals",
    description: "Look approachable and competent in tech Twitter threads, open-source communities, and professional networking.",
  },
];

const faqs = [
  {
    question: "Why does my X (Twitter) profile photo matter?",
    answer: "Your profile photo is the visual anchor of every post, reply, and DM you send. A clear, professional photo builds trust and makes people more likely to follow, engage, and take your content seriously.",
  },
  {
    question: "What style works best for X?",
    answer: "It depends on your niche. Business and tech accounts benefit from clean, professional looks, while creative accounts can go bolder. TailorPic offers multiple style options so you can match your brand voice.",
  },
  {
    question: "How much does an X profile photo cost?",
    answer: "TailorPic starts at $1.99 per pack. You receive multiple headshot variations so you can choose the one that best represents your online persona.",
  },
  {
    question: "Can I use these photos on other platforms too?",
    answer: "Yes. Every photo is high-resolution and yours to use anywhere: X, LinkedIn, Substack, your personal website, podcast cover art, and more.",
  },
  {
    question: "How long until I receive my photos?",
    answer: "Most photo packs are delivered in about 2 hours. Upload your selfies during a break and have your new profile photo set before your next post.",
  },
];

export default function TwitterUseCasePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name="AI Profile Photos for X (Twitter)"
        description="AI-generated profile photos optimized for X (Twitter) profiles, personal branding, and online credibility."
        price={990}
        category="Professional Services"
        slug="use-cases/twitter"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Use Cases', url: `${siteConfig.url}/use-cases` },
          { name: 'X (Twitter)', url: `${siteConfig.url}/use-cases/twitter` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <AtSign className="h-4 w-4" />
              X (Twitter) Profile Photos
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              AI Profile Photos for{' '}
              <span className="not-italic text-tp-bronze">X (Twitter)</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Your X profile photo follows every post, reply, and DM. Get a sharp, credibility-building headshot from a few phone selfies, no studio needed. Delivered in about 2 hours, starting at just $1.99.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your X Profile Photo
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
            Optimized for X (Twitter)
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
              Why Your X Profile Photo Matters
            </h2>
            <p className="mt-4 text-lg text-tp-muted">A professional photo turns your posts from anonymous noise into trusted opinions.</p>
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
            <p className="mt-4 text-lg text-tp-muted">From selfie to X-ready profile photo in three steps.</p>
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
              Who Uses TailorPic for X
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Professional profile photos for every corner of X.</p>
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
            Upgrade Your X Profile Today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Boost your X presence with a studio-quality AI profile photo. Starting at just $1.99.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your X Profile Photo
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
