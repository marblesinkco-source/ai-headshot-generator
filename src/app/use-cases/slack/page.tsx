import type { Metadata } from 'next';
import Link from 'next/link';
import { Building, Check, HeadphonesIcon, Monitor, Shield, Smile, Sparkles, Star, Target, Upload, Users, Video } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const pageTitle = "AI Profile Photos for Slack & Teams | Professional Workspace Photos | TailorPic";
const pageDescription =
  "Get a polished profile photo for Slack and Microsoft Teams from a few selfies. AI-generated workspace headshots that look professional in every channel, call, and DM, delivered in about 2 hours. Starting at $9.90.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/use-cases/slack' },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}/use-cases/slack`,
  },
};

const benefits = [
  {
    icon: Users,
    title: "Be Recognizable Across Channels",
    description: "In busy Slack workspaces and Teams calls, a clear profile photo helps colleagues instantly identify you in threads, mentions, and huddles.",
  },
  {
    icon: Target,
    title: "Optimized for Tiny Thumbnails",
    description: "Slack and Teams display photos as small squares. Every headshot is tightly framed so your face is clear even at 36 pixels wide.",
  },
  {
    icon: Smile,
    title: "Approachable and Professional",
    description: "Our AI creates photos that look friendly yet competent, the right balance for internal communication with teammates and clients.",
  },
  {
    icon: Building,
    title: "Consistent Team Branding",
    description: "Order headshots for your entire team with matching styles and backgrounds. Create a cohesive, professional look across your workspace.",
  },
  {
    icon: Shield,
    title: "Privacy-Friendly Alternative",
    description: "Use a polished AI headshot instead of sharing personal photos at work. Look professional without uploading vacation or family photos to company tools.",
  },
  {
    icon: Monitor,
    title: "Great on Video Calls Too",
    description: "Your profile photo doubles as your camera-off avatar. A professional image keeps you looking put-together even when your camera is off.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload 6-10 Selfies",
    description: "Take clear photos with your phone in good lighting. Casual clothes are fine since our AI handles the rest.",
  },
  {
    icon: Sparkles,
    title: "Pick a Professional Look",
    description: "Select a clean, workspace-appropriate style. Choose from business casual, smart casual, or creative looks with neutral backgrounds.",
  },
  {
    icon: Check,
    title: "Download and Set Your Photo",
    description: "Receive polished headshots in about 2 hours. Upload to Slack, Teams, Google Workspace, and Zoom all at once.",
  },
];

const features = [
  {
    icon: HeadphonesIcon,
    title: "Remote Workers",
    description: "Look polished in every Slack channel and Teams meeting without booking a studio near your home office.",
  },
  {
    icon: Building,
    title: "New Hires",
    description: "Make a great first impression on day one with a professional profile photo that is ready before your laptop arrives.",
  },
  {
    icon: Users,
    title: "Team Leads & Managers",
    description: "Order matching headshots for your entire team to create a unified, professional look across your workspace.",
  },
  {
    icon: Video,
    title: "Client-Facing Roles",
    description: "Present a polished image in shared channels and external meetings where first impressions shape client relationships.",
  },
];

const faqs = [
  {
    question: "Why do I need a professional photo for Slack or Teams?",
    answer: "Your profile photo appears in every message, thread, and video call. A professional headshot helps colleagues and clients recognize you quickly and builds credibility, especially in remote or hybrid workplaces.",
  },
  {
    question: "What style works best for workplace messaging apps?",
    answer: "Clean, well-lit photos with neutral backgrounds work best. TailorPic offers business casual and professional styles with solid or subtle gradient backgrounds that look great at any thumbnail size.",
  },
  {
    question: "How much does a workspace headshot cost?",
    answer: "TailorPic starts at $9.90 per pack. Each pack includes multiple headshot variations, enough to update your photo on Slack, Teams, Zoom, Google Workspace, and your company directory.",
  },
  {
    question: "Can I order headshots for my entire team?",
    answer: "Yes. Many teams use TailorPic to create consistent, professional profile photos across their workspace. Each team member uploads their own selfies and receives individually tailored headshots.",
  },
  {
    question: "How long until I receive my headshots?",
    answer: "Most headshot packs are delivered in about 2 hours. Upload your selfies during your morning standup and have a polished profile photo set before lunch.",
  },
];

export default function SlackUseCasePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name="AI Profile Photos for Slack & Teams"
        description="AI-generated professional headshots optimized for Slack, Microsoft Teams, Zoom, and workplace communication tools."
        price={990}
        category="Professional Services"
        slug="use-cases/slack"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Use Cases', url: `${siteConfig.url}/use-cases` },
          { name: 'Slack & Teams', url: `${siteConfig.url}/use-cases/slack` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Monitor className="h-4 w-4" />
              Slack & Teams Profile Photos
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              AI Profile Photos for{' '}
              <span className="not-italic text-tp-bronze">Slack & Teams</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Your workspace photo follows you through every channel, thread, and video call. Get a polished, professional headshot from a few phone selfies, no studio visit required. Delivered in about 2 hours, starting at just $9.90.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Workspace Headshot
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
            Optimized for Slack & Teams
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
              Why Your Workspace Photo Matters
            </h2>
            <p className="mt-4 text-lg text-tp-muted">A professional profile photo builds trust and recognition across every tool your team uses.</p>
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
            <p className="mt-4 text-lg text-tp-muted">From selfie to workspace-ready headshot in three steps.</p>
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
              Who Uses TailorPic for Slack & Teams
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Professional headshots for every role in the modern workplace.</p>
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
            Upgrade Your Workspace Profile Today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Polish your workspace presence with a studio-quality AI headshot. Starting at just $9.90.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Workspace Headshot
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
