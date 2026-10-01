import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
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
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Headshot Generator — Professional Photos in Minutes | TailorPic',
  description:
    'Try a free AI headshot generator. Upload a few selfies and get studio-quality professional headshots for LinkedIn, resumes and more, without a photoshoot.',
  alternates: { canonical: '/free-headshot-generator' },
  openGraph: {
    title: 'Free AI Headshot Generator | TailorPic',
    description:
      'Upload a few selfies and get professional AI headshots. Start with a free trial.',
    url: `${siteConfig.url}/free-headshot-generator`,
  },
};

const steps = [
  {
    icon: Upload,
    title: 'Upload your selfies',
    description:
      'Add a handful of casual selfies taken with your phone. Good light and a clear view of your face is all you need.',
  },
  {
    icon: Sparkles,
    title: 'AI generates your headshots',
    description:
      'Our AI learns your features and creates professional headshots in the styles and backgrounds you pick.',
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
  { label: 'Cost', free: 'Start at no cost', paid: 'One-time payment, packages from $9.90' },
  { label: 'Get started', free: 'Create an account and explore the process', paid: 'Upload selfies and generate your full set' },
  { label: 'Style categories', free: 'Browse what is available', paid: 'Choose from 11 categories, including professional headshots and dating photos' },
  { label: 'Terms', free: 'See the pricing page for current trial terms', paid: 'Covered by a 14-day money-back guarantee' },
  { label: 'Subscription', free: 'None required to start', paid: 'Single packages, no subscription to cancel' },
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
  { label: 'Cost', traditional: 'Often hundreds of dollars per session', ai: 'Starting from $9.90' },
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
      'TailorPic lets you start with a free trial so you can see the quality before committing. Check the pricing page for the current trial terms and what is included.',
  },
  {
    question: 'What do I need to get started?',
    answer:
      'Just a few clear selfies from your phone. Use good natural light, face the camera, and include a couple of different angles and expressions.',
  },
  {
    question: 'Can I use the headshots on LinkedIn and my resume?',
    answer:
      'Yes. The photos are designed for professional use, including LinkedIn, resumes, company websites and email signatures.',
  },
  {
    question: 'How long does it take?',
    answer:
      'Much less time than a traditional photoshoot. There is no booking or travel, and you can upload from anywhere.',
  },
  {
    question: 'What is the difference between the free trial and a paid package?',
    answer:
      'The free trial lets you start and see how TailorPic works before you commit. A paid package, starting from $9.90, is where you generate your full set of headshots. Check the pricing page for current trial terms and what each package includes.',
  },
  {
    question: 'Can I get a refund?',
    answer:
      'Yes. Every order is covered by a 14-day money-back guarantee. See our refund policy for the details.',
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
      'AI headshot generator that turns selfies into professional headshots. Start with a free trial.',
    offers: {
      '@type': 'Offer',
      price: '9.90',
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
          <h1 className="font-display text-4xl font-bold tracking-tight text-tp-ink sm:text-6xl">
            Professional headshots from your selfies. No photoshoot needed.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-muted">
            Upload a few selfies, pick your styles, and get studio-quality headshots for LinkedIn,
            resumes and more. Start with a free trial, with packages from $9.90 and a 14-day
            money-back guarantee.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/auth/register" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
              Start your free trial
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/samples" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              See sample photos
            </Link>
          </div>
          <ul className="mt-8 flex flex-col items-center justify-center gap-2 text-sm text-tp-muted sm:flex-row sm:gap-6">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-tp-bronze-ink" />No studio or booking</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-tp-bronze-ink" />No subscription</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-tp-bronze-ink" />14-day money-back guarantee</li>
          </ul>
        </div>
      </section>

      {/* What you get */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-3xl font-bold text-tp-ink">What You Get</h2>
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
          <h2 className="font-display text-center text-3xl font-bold text-tp-ink">How It Works</h2>
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
          <h2 className="font-display text-center text-3xl font-bold text-tp-ink">
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
          <h2 className="font-display text-center text-3xl font-bold text-tp-ink">
            Free Trial vs Full Package
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-tp-muted">
            Start free to see how it works, then upgrade when you are ready for your full set.
          </p>
          <div className="mt-10 overflow-x-auto rounded-tp-card border border-tp-line bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-tp-line bg-tp-paper">
                  <th className="px-5 py-4 font-semibold text-tp-ink"></th>
                  <th className="px-5 py-4 font-semibold text-tp-ink">Free Trial</th>
                  <th className="px-5 py-4 font-semibold text-tp-bronze-ink">Full Package</th>
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
            <Link href="/auth/register" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
              Start your free trial
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-sm text-tp-muted">
              Details on the{' '}
              <Link href="/pricing" className="text-tp-bronze-ink underline underline-offset-2">
                pricing page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-center text-3xl font-bold text-tp-ink">
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
          <h2 className="font-display text-center text-3xl font-bold text-tp-ink">Choose Your Style</h2>
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
          <h2 className="font-display text-3xl font-bold text-tp-ink">
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
          <h2 className="font-display text-center text-3xl font-bold text-tp-ink">
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
          <h2 className="font-display text-3xl font-bold text-white">Start with your free trial</h2>
          <p className="mt-3 text-tp-beige">
            Upload a few selfies and see your professional headshots.
          </p>
          <Link
            href="/auth/register"
            className={`${buttonVariants({ variant: 'secondary', size: 'lg' })} mt-8 bg-tp-bronze text-tp-ink hover:bg-tp-beige`}
          >
            Get started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
