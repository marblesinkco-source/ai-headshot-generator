import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Check, Clock, Globe, GraduationCap, Mail, Monitor, Shield, Upload, UserCheck, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs } from '@/components/marketing/breadcrumbs';
import { FAQSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const pageTitle = "AI Headshots for Microsoft Teams Profiles | TailorPic";
const pageDescription =
  "A professional Microsoft Teams profile photo from a few selfies. Look polished in chats, meetings and Outlook. Delivered in about 2 hours. Starting at $1.99.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: 'https://www.tailorpic.com/use-cases/microsoft-teams' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/use-cases/microsoft-teams', type: 'usecase' }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'usecase' }),
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: "AI Headshots for Microsoft Teams",
  description: "Professional profile photos for Microsoft Teams, Outlook and Microsoft 365",
  url: 'https://www.tailorpic.com/use-cases/microsoft-teams',
  brand: { '@type': 'Brand', name: 'TailorPic' },
  category: 'Professional Services',
  offers: {
    '@type': 'Offer',
    price: '1.99',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://www.tailorpic.com/use-cases/microsoft-teams',
  },
};

const benefits = [
  {
    icon: Monitor,
    title: "Seen in Every Chat and Meeting",
    description: "Your photo appears beside each message, in participant lists, and whenever your camera is off.",
  },
  {
    icon: Mail,
    title: "Syncs Across Microsoft 365",
    description: "One photo appears in Teams, Outlook, SharePoint, and your org directory.",
  },
  {
    icon: Users,
    title: "Stay Recognizable in Small Avatars",
    description: "Faces are framed large and centered so you are clear even in tiny circular avatars.",
  },
  {
    icon: Briefcase,
    title: "Look Polished for Internal and Client Calls",
    description: "A professional photo builds credibility with new teammates, leaders, and external guests.",
  },
  {
    icon: Shield,
    title: "You Own Every Image",
    description: "No watermarks, and you can upload the photo anywhere it is accepted.",
  },
  {
    icon: Clock,
    title: "Ready Before Your Next Meeting",
    description: "Upload selfies now and have a new profile photo in about 2 hours.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload a Few Selfies",
    description: "Share 6-10 clear phone photos with different expressions and angles.",
  },
  {
    icon: Users,
    title: "Choose a Workplace-Ready Style",
    description: "Pick a business or business-casual look and a clean background.",
  },
  {
    icon: Check,
    title: "Download and Upload to Teams",
    description: "Get your photos in about 2 hours, then set your favorite in Teams and Outlook in seconds.",
  },
];

const features = [
  {
    icon: Briefcase,
    title: "Corporate Employees",
    description: "Show up professionally in company-wide chats and town halls.",
  },
  {
    icon: UserCheck,
    title: "New Hires",
    description: "Make a great first impression while everyone is learning new names.",
  },
  {
    icon: Globe,
    title: "Remote & Hybrid Workers",
    description: "Look as present as in-office teammates on days your camera is off.",
  },
  {
    icon: GraduationCap,
    title: "Students & Educators",
    description: "Stay recognizable in online classes and Teams for Education.",
  },
];

const faqs = [
  {
    question: "How do I change my Microsoft Teams profile picture?",
    answer: "Open Teams, select your profile icon, choose Edit profile, and upload your new photo. Some organizations manage photos centrally, so check with your IT team if the option is unavailable.",
  },
  {
    question: "Will the photo also appear in Outlook?",
    answer: "Usually yes. Microsoft 365 syncs your profile photo across Teams, Outlook, and other apps, though it can take some time to update.",
  },
  {
    question: "Will the photo look like me?",
    answer: "Yes. TailorPic is trained on your own selfies, so results keep your real features and natural expression.",
  },
  {
    question: "What size should a Teams profile photo be?",
    answer: "Teams displays your photo as a small circle, so a centered headshot works best. You receive high-resolution files you can crop as needed.",
  },
  {
    question: "How much does it cost?",
    answer: "TailorPic starts at $1.99 per pack, far less than a photographer session.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most orders arrive in about 2 hours after you upload your selfies.",
  },
];

export default function MicrosoftTeamsPage() {
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
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Use Cases', href: '/use-cases' }, { label: 'Microsoft Teams' }]} currentPath="/use-cases/microsoft-teams" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Monitor className="h-4 w-4" />
              Microsoft Teams Profile Photos
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              AI Headshots for{' '}
              <span className="not-italic text-tp-bronze">Microsoft Teams</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Your Teams photo shows up in every chat, meeting, and Outlook email. Get a crisp, professional headshot for Microsoft 365 from a handful of selfies. Delivered in about 2 hours, starting at just $1.99.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Teams Headshot
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
            Works in Teams &amp; Outlook
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
              Why Your Teams Profile Photo Matters
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Colleagues see it dozens of times a day. Make it count.</p>
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
            <p className="mt-4 text-lg text-tp-muted">From selfie to Teams profile photo in three steps.</p>
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
              Who Uses TailorPic for Microsoft Teams
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Great for anyone who works in the Microsoft ecosystem.</p>
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
            Make Every Teams Chat Look Professional
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Put a confident face next to every message. Starting at just $1.99.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Teams Headshot
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
