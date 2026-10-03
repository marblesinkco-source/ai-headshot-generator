import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { FreeTrialIllustration } from '@/components/marketing/illustrations';
import {
  Camera,
  Sparkles,
  Clock,
  DollarSign,
  ArrowRight,
  Check,
  Star,
  Upload,
  Download,
  Briefcase,
  Linkedin,
  Palette,
  Coffee,
  Laptop,
  Building2,
  UserCircle,
  Users,
  ShieldCheck,
  CreditCard,
  Lock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'Free AI Headshot Generator Alternative: Try Risk-Free' },
  description:
    'Looking for a free AI headshot generator? Try TailorPic risk-free: from $1.99 for studio-quality headshots with no subscription.',
  alternates: { canonical: '/free-headshot-generator' },
  openGraph: generateOGMetadata({
    title: 'Free AI Headshot Generator | TailorPic',
    description:
      'Upload your selfies and get professional AI headshots from $1.99. No subscription required.',
    path: '/free-headshot-generator',
  }),
  twitter: generateTwitterMetadata({
    title: 'Free AI Headshot Generator | TailorPic',
    description:
      'Professional AI headshots from your selfies. From $1.99, no subscription.',
  }),
};

const steps = [
  {
    icon: Upload,
    title: 'Upload your selfies',
    description:
      'Add 10-20 casual selfies from your phone (minimum 8). Good light and a clear view of your face is all you need.',
  },
  {
    icon: Sparkles,
    title: 'AI generates your headshots',
    description:
      'Our AI learns your features and creates 40+ professional photos across 12 categories. Most orders are ready within 2 hours.',
  },
  {
    icon: Download,
    title: 'Download and use',
    description:
      'Pick your favorites and download them in high resolution for LinkedIn, your resume, your website or your team page.',
  },
];

const headshotTypes = [
  { icon: Briefcase, title: 'Corporate', description: 'Polished, classic looks in office and boardroom settings for executives and client-facing roles.' },
  { icon: Linkedin, title: 'LinkedIn', description: 'Approachable, professional profile photos built to make a strong first impression.' },
  { icon: Palette, title: 'Creative', description: 'Expressive backdrops and relaxed styling for designers, artists and freelancers.' },
  { icon: Coffee, title: 'Casual', description: 'Friendly, natural portraits for social profiles, bios and personal sites.' },
  { icon: Laptop, title: 'Startup & Tech', description: 'Modern, smart-casual looks for founders, engineers and product teams.' },
  { icon: Building2, title: 'Studio Backdrop', description: 'Clean, neutral studio backgrounds that suit resumes and company pages.' },
  { icon: UserCircle, title: 'Actor & Model', description: 'Clear, expressive portraits for casting profiles and portfolios.' },
  { icon: Users, title: 'Team Consistency', description: 'Matching style and framing across a group for team and About pages.' },
];

const trialComparison = [
  { label: 'Price', free: 'Free tools: $0', paid: 'from $1.99 per person' },
  { label: 'Teams', free: 'Usually one photo at a time', paid: '$39 (5-15 people) or $29 (16-50 people)' },
  { label: 'Output', free: 'Often a few photos, sometimes watermarked', paid: 'photos across 12 categories' },
  { label: 'Risk', free: 'No payment, but no guarantee of quality', paid: 'One-time payment, no subscription' },
  { label: 'Subscription', free: 'Varies by tool', paid: 'None. One-time payment, no subscription to cancel' },
];

const trustSignals = [
  { icon: ShieldCheck, title: 'Privacy first', description: 'Uploads are used only to create your photos and are deleted within 30 days.' },
  { icon: CreditCard, title: 'One-time payment', description: 'No subscription and nothing to cancel.' },
  { icon: Lock, title: 'Secure Stripe checkout', description: 'Payments are processed by Stripe. Card details never touch our servers.' },
  { icon: Clock, title: 'Most orders within 2 hours', description: 'No booking, travel or waiting for a photographer.' },
];

const features = [
  { icon: Camera, title: 'Studio Quality', description: 'Balanced lighting, sharp detail and natural skin tones that look like a real photoshoot.' },
  { icon: Clock, title: 'Fast Delivery', description: 'Skip the scheduling and the studio trip. Your photos are ready in a fraction of the time of a traditional session.' },
  { icon: Sparkles, title: 'Background Options', description: 'Choose clean studio, office or neutral backdrops to match your industry and personal brand.' },
  { icon: Star, title: 'Multiple Styles', description: 'Get a range of outfits, poses and looks so you have the right photo for every platform.' },
  { icon: Check, title: 'Privacy First', description: 'Your uploads are used to create your photos. Read our privacy policy and security page for details on how data is handled.' },
  { icon: DollarSign, title: 'Affordable Pricing', description: 'Professional results at a fraction of what a photographer typically charges.' },
];

const comparison = [
  { label: 'Cost', traditional: 'Often hundreds of dollars per session', ai: 'Starting from $1.99' },
  { label: 'Time', traditional: 'Booking, travel and waiting for edits', ai: 'Upload from home, get results quickly' },
  { label: 'Outfit Changes', traditional: 'Limited by what you bring and studio time', ai: 'Multiple outfit styles in one order' },
  { label: 'Retakes', traditional: 'Usually means another session and another fee', ai: 'Generate again with different styles' },
  { label: 'Quality', traditional: 'Depends on the photographer', ai: 'Consistent studio-style lighting and framing' },
];

const styles = [
  { label: 'Professional Headshots', href: '/headshots', description: 'Resume, LinkedIn and company profiles' },
  { label: 'LinkedIn Headshots', href: '/linkedin-headshots', description: 'Profile photos built for first impressions' },
  { label: 'Dating Profile Photos', href: '/dating-photos', description: 'Natural, friendly and approachable' },
  { label: 'Team Headshots', href: '/team-headshots', description: 'Consistent photos across your whole team' },
  { label: 'Graduation Photos', href: '/graduation-photos', description: 'Celebrate the milestone in style' },
  { label: 'Pet Portraits', href: '/pet-portraits', description: 'Creative portraits of your companion' },
];

const faqs = [
  {
    question: 'Is there really a free AI headshot generator?',
    answer:
      'TailorPic is not free, but packages start from $1.99 with no subscription or long-term commitment.',
  },
  {
    question: 'How much does TailorPic cost?',
    answer:
      'Packages start from $1.99. Team pricing is $39 for 5-15 people and $29 for 16-50 people. There is no subscription.',
  },
  {
    question: 'What do I need to get started?',
    answer:
      'Upload 10-20 selfies from your phone (minimum 8). Use good natural light, face the camera, and include a few different angles and expressions.',
  },
  {
    question: 'How many photos do I get?',
    answer: 'You get photos across 12 categories, including professional headshots, LinkedIn photos and more.',
  },
  {
    question: 'Can I use the headshots on LinkedIn and my resume?',
    answer:
      'Yes. The photos are designed for professional use, including LinkedIn, resumes, company websites and email signatures.',
  },
  {
    question: 'How long does it take?',
    answer:
      'Most orders are delivered within 2 hours. There is no booking or travel, and you can upload from anywhere.',
  },
  {
    question: 'Is payment secure?',
    answer:
      'Yes. Payments are processed by Stripe, and card details are never stored on our servers.',
  },
  {
    question: 'Is my data kept private?',
    answer:
      'We take privacy seriously. See our privacy policy and security page for how uploads are stored and handled.',
  },
];

export default function FreeHeadshotGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${siteConfig.name} Free AI Headshot Generator`,
    applicationCategory: 'PhotographyApplication',
    operatingSystem: 'Web',
    url: `${siteConfig.url}/free-headshot-generator`,
    description:
      'AI headshot generator that turns your selfies into professional headshots. From $1.99, no subscription.',
    offers: {
      '@type': 'Offer',
      price: '1.99',
      priceCurrency: 'USD',
    },
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free AI Headshot Generator', url: `${siteConfig.url}/free-headshot-generator` },
        ]}
      />
      <FAQSchema items={faqs} />
      <Header />

      {/* Hero */}
      <section className="bg-tp-paper px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wide text-tp-bronze-ink">
            Free AI Headshot Generator
          </p>
          <h1 className="font-display text-4xl font-normal tracking-tight text-tp-ink sm:text-6xl">
            Professional headshots from your selfies. No photoshoot needed.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-muted">
            Upload a few selfies, pick your styles, and get studio-quality headshots for LinkedIn,
            resumes and more. From $1.99, no subscription, most orders ready within 2 hours.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/auth/register?redirect=/headshots" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
              Try it risk-free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/samples" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              See sample photos
            </Link>
          </div>
          <ul className="mt-8 flex flex-col items-center justify-center gap-2 text-sm text-tp-muted sm:flex-row sm:gap-6">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-tp-bronze-ink" />No studio or booking</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-tp-bronze-ink" />From $1.99, no subscription</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-tp-bronze-ink" />Most orders within 2 hours</li>
          </ul>
          <div className="mx-auto mt-10 max-w-xs">
            <FreeTrialIllustration className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="border-y border-tp-line bg-white px-4 py-10">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustSignals.map((t) => (
            <div key={t.title} className="flex items-start gap-3">
              <t.icon className="mt-0.5 h-5 w-5 shrink-0 text-tp-bronze-ink" />
              <div>
                <p className="text-sm font-semibold text-tp-ink">{t.title}</p>
                <p className="mt-0.5 text-sm text-tp-muted">{t.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">What You Get</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-tp-muted">
            One set of selfies, a range of looks. Pick the styles that fit where your photo will be used.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {headshotTypes.map((t) => (
              <div key={t.title} className="rounded-tp-card border border-tp-line bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-beige/40 text-tp-bronze-ink">
                  <t.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-lg font-semibold text-tp-ink">{t.title}</h3>
                <p className="mt-1 text-sm text-tp-muted">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-tp-paper px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">How It Works</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-tp-button bg-tp-beige/40 text-tp-bronze-ink">
                  <step.icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm font-medium text-tp-bronze-ink">Step {i + 1}</p>
                <h3 className="font-display mt-1 text-lg font-semibold text-tp-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-tp-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">
            Everything You Need for a Great Headshot
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <f.icon className="h-6 w-6 text-tp-bronze-ink" />
                <h3 className="font-display mt-4 text-lg font-semibold text-tp-ink">{f.title}</h3>
                <p className="mt-2 text-sm text-tp-muted">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free trial vs full package */}
      <section className="bg-tp-paper px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">
            Free Tools vs TailorPic
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-tp-muted">
            Free generators are tempting, but results vary. TailorPic starts at $1.99 with no subscription.
          </p>
          <div className="mt-10 overflow-x-auto rounded-tp-card border border-tp-line bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-tp-line bg-tp-paper">
                  <th className="px-5 py-4 font-semibold text-tp-ink"></th>
                  <th className="px-5 py-4 font-semibold text-tp-ink">Typical Free Tools</th>
                  <th className="px-5 py-4 font-semibold text-tp-bronze-ink">TailorPic</th>
                </tr>
              </thead>
              <tbody>
                {trialComparison.map((row) => (
                  <tr key={row.label} className="border-b border-tp-line last:border-0">
                    <th scope="row" className="px-5 py-4 font-medium text-tp-ink">{row.label}</th>
                    <td className="px-5 py-4 text-tp-muted">{row.free}</td>
                    <td className="px-5 py-4 text-tp-ink">{row.paid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 text-center">
            <Link href="/auth/register?redirect=/headshots" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
              Get my headshots from $1.99
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-sm text-tp-muted">
              See the{' '}
              <Link href="/pricing" className="text-tp-bronze-ink underline underline-offset-2">
                pricing page
              </Link>{' '}
              for all options.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">
            Traditional Photography vs AI Headshots
          </h2>
          <div className="mt-10 overflow-x-auto rounded-tp-card border border-tp-line bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-tp-line bg-tp-paper">
                  <th className="px-5 py-4 font-semibold text-tp-ink"></th>
                  <th className="px-5 py-4 font-semibold text-tp-ink">Traditional Photography</th>
                  <th className="px-5 py-4 font-semibold text-tp-bronze-ink">AI Headshots</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-b border-tp-line last:border-0">
                    <th scope="row" className="px-5 py-4 font-medium text-tp-ink">{row.label}</th>
                    <td className="px-5 py-4 text-tp-muted">{row.traditional}</td>
                    <td className="px-5 py-4 text-tp-ink">{row.ai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Sample styles */}
      <section className="bg-tp-paper px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">Choose Your Style</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-tp-muted">
            Headshots are just the start. Explore the categories available on TailorPic.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {styles.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group rounded-tp-card border border-tp-line bg-white p-5 transition-colors hover:border-tp-bronze"
              >
                <h3 className="font-display flex items-center justify-between font-semibold text-tp-ink">
                  {s.label}
                  <ArrowRight className="h-4 w-4 text-tp-bronze-ink transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="mt-1 text-sm text-tp-muted">{s.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-normal text-tp-ink">
            Built for professionals who want to look their best
          </h2>
          <p className="mt-4 text-tp-muted">
            From job seekers to founders and whole teams, people use TailorPic to show up with a
            polished, consistent first impression. Browse{' '}
            <Link href="/reviews" className="text-tp-bronze-ink underline underline-offset-2">
              customer reviews
            </Link>{' '}
            or read how we{' '}
            <Link href="/security" className="text-tp-bronze-ink underline underline-offset-2">
              protect your data
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-tp-paper px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">
            Free AI Headshot FAQ
          </h2>
          <div className="mt-10 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-tp-card border border-tp-line bg-white p-5"
              >
                <summary className="cursor-pointer list-none font-semibold text-tp-ink">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm text-tp-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-2xl rounded-tp-card bg-tp-ink px-6 py-12 text-center">
          <h2 className="font-display text-3xl font-normal text-white">Try it risk-free</h2>
          <p className="mt-3 text-tp-beige">
            From $1.99, secure Stripe checkout, no subscription.
          </p>
          <Link
            href="/auth/register?redirect=/headshots"
            className={`${buttonVariants({ variant: 'secondary', size: 'lg' })} mt-8 bg-tp-bronze text-tp-ink hover:bg-tp-beige`}
          >
            Get my headshots
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
