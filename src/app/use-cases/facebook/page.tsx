import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Camera, Check, Globe, Heart, MessageCircle, Shield, Sparkles, ThumbsUp, Upload, UserCheck, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs } from '@/components/marketing/breadcrumbs';
import { FAQSchema, ProductSchema, BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

const pageTitle = 'AI Profile Photos for Facebook | TailorPic';
const pageDescription =
  `Get a friendly, polished Facebook profile picture from a few selfies. AI photos that look natural in the circular crop, for profiles and pages. From ${BASE_PRICE_DISPLAY}.`;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/use-cases/facebook' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/use-cases/facebook', type: 'usecase' }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'usecase' }),
};

const benefits = [
  {
    icon: UserCheck,
    title: "A Face People Recognize and Trust",
    description: "Friends, colleagues, and customers scan Facebook by faces. A clear, well-lit portrait makes you instantly recognizable in comments, groups, and Messenger.",
  },
  {
    icon: Heart,
    title: "Warm, Approachable Look",
    description: "Facebook is social first. Choose relaxed, smiling styles that feel friendly and genuine rather than stiff or overly corporate.",
  },
  {
    icon: Camera,
    title: "Cropped for the Circle",
    description: "Photos are composed so your face stays centered and sharp inside Facebook's circular profile frame on both mobile and desktop.",
  },
  {
    icon: Globe,
    title: "One Photo, Every Place",
    description: "Use the same look for your profile, cover collage, Facebook Page, Marketplace listings, and group admin badges for a consistent presence.",
  },
  {
    icon: Shield,
    title: "Your Photos, Your Rights",
    description: "You own every image with no watermarks. Upload, update, and reuse them anywhere without licensing worries.",
  },
  {
    icon: Sparkles,
    title: "Refresh Without a Photoshoot",
    description: "Update your profile for a new job, a milestone, or just a new season without asking a friend to snap another photo.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Share a Few Selfies",
    description: "Upload 6-10 clear phone photos with different expressions and angles. Natural daylight works best, and no retouching is needed.",
  },
  {
    icon: Users,
    title: "Pick a Friendly Style",
    description: "Choose casual, business-casual, or outdoor looks and a background that matches how you want to show up on Facebook.",
  },
  {
    icon: Check,
    title: "Download and Update Your Profile",
    description: "Get your high-resolution photos within hours, then set your favorite as your new Facebook profile picture in seconds.",
  },
];

const features = [
  {
    icon: Briefcase,
    title: "Local Business Owners",
    description: "Put a real, trustworthy face on your Facebook Page and Marketplace listings to win over neighbors and customers.",
  },
  {
    icon: Users,
    title: "Group Admins & Community Leaders",
    description: "Look approachable and credible to the members you moderate, teach, or organize.",
  },
  {
    icon: ThumbsUp,
    title: "Sellers on Marketplace",
    description: "Buyers respond more to sellers who show a clear, friendly photo. Build trust before the first message.",
  },
  {
    icon: MessageCircle,
    title: "Everyday Users",
    description: "Reconnect with family and old friends using a fresh, flattering photo you actually like.",
  },
];

const faqs = [
  {
    question: "Why should I update my Facebook profile photo?",
    answer: "Your profile picture appears next to every comment, post, and message you send. A clear, current photo helps people recognize you and makes your profile feel more trustworthy, especially for business or Marketplace use.",
  },
  {
    question: "Will my photos look like me?",
    answer: "Yes. TailorPic is trained on your own selfies, so the results keep your real features and natural expression. The goal is the best version of you, not a stranger.",
  },
  {
    question: "Are the photos sized correctly for Facebook?",
    answer: "Every photo is delivered in high resolution with your face framed for the circular profile crop. You can also use the same images for Page logos and cover collages.",
  },
  {
    question: "Can I use them on a Facebook Page or for my business?",
    answer: "Absolutely. You own full rights to your photos, so they are fine for personal profiles, business Pages, ads, and Marketplace listings.",
  },
  {
    question: "How much does it cost?",
    answer: `TailorPic starts at ${BASE_PRICE_DISPLAY} per pack, far less than a photographer session, and you never need to leave the house.`,
  },
  {
    question: "How long does delivery take?",
    answer: "Most orders arrive within hours after you upload your selfies, so you can update your profile the same day.",
  },
];

export default function FacebookUseCasePage() {
  return (
    <>
      <ProductSchema
        name="AI Profile Photos for Facebook"
        description="AI-generated profile photos optimized for Facebook profiles, Pages, groups, and Marketplace."
        price={990}
        category="Professional Services"
        slug="use-cases/facebook"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
          items={[
            { name: 'Home', url: siteConfig.url },
            { name: 'Use Cases', url: `${siteConfig.url}/use-cases` },
            { name: 'Facebook', url: `${siteConfig.url}/use-cases/facebook` },
          ]}
        />
      <Header />
      <main id="main-content">
      <div className="bg-tp-paper pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Use Cases', href: '/use-cases' }, { label: 'Facebook' }]} currentPath="/use-cases/facebook" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Users className="h-4 w-4" />
              Facebook Profile Photos
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              AI Profile Photos for{' '}
              <span className="not-italic text-tp-bronze">Facebook</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Stop using a blurry crop from a family picture. Get a warm, flattering Facebook profile photo from a handful of selfies, no photographer required. Delivered within hours, starting at just {BASE_PRICE_DISPLAY}.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Facebook Photos
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
            Framed for Facebook
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Delivered Within Hours
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
              Why Your Facebook Photo Matters
            </h2>
            <p className="mt-4 text-lg text-tp-muted">A friendly, clear portrait makes every connection feel more personal.</p>
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
            <p className="mt-4 text-lg text-tp-muted">From selfie to new Facebook profile picture in three steps.</p>
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
              Who Uses TailorPic for Facebook
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Great photos for everyone who shows up on Facebook.</p>
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
            Give Your Facebook a Fresh Face
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Show up as the best version of yourself to friends, family, and customers. Starting at just {BASE_PRICE_DISPLAY}.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Facebook Photos
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
