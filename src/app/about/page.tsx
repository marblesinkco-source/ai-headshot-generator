import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, AboutPageSchema } from '@/components/structured-data';
import { AboutMissionIllustration } from '@/components/marketing/illustrations';
import {
  Shield,
  Zap,
  Wallet,
  Sparkles,
  Eye,
  Clock,
  Gem,
  Cpu,
  Upload,
  Paintbrush,
  Download,
  Check,
  ArrowRight,
} from 'lucide-react';

const aboutDescription = 'Learn about TailorPic, the AI photo platform that creates professional, personalized photos. Our mission, what sets us apart, and our privacy commitment.';

export const metadata: Metadata = {
  title: { absolute: 'About TailorPic: The AI Photo Platform Built Around You' },
  description: aboutDescription,
  alternates: { canonical: '/about' },
  openGraph: generateOGMetadata({ title: `About | ${siteConfig.name}`, description: `Learn about ${siteConfig.name} and our mission to make professional photography accessible to everyone.`, path: '/about' }),
  twitter: generateTwitterMetadata({ title: `About | ${siteConfig.name}`, description: `Learn about ${siteConfig.name} and our mission to make professional photography accessible to everyone.` }),
};

const differentiators = [
  {
    icon: Sparkles,
    title: 'Personalized, not filtered',
    description:
      'We do not apply a generic filter to your selfie. Generative AI is personalized to the person in your photos, so results look like you in the style you choose.',
  },
  {
    icon: Zap,
    title: 'No studio, no scheduling',
    description:
      'Upload your photos, pick a style, and we take care of the rest. Results arrive in hours, not weeks of booking and waiting.',
  },
  {
    icon: Wallet,
    title: 'Simple one-time pricing',
    description:
      'Clear package pricing with no subscription lock-in and no hidden fees, so professional-looking photos stay within reach.',
  },
  {
    icon: Shield,
    title: 'Your photos stay yours',
    description:
      'Uploads are used to create your photos and are automatically deleted within 30 days. We do not sell your photos.',
  },
];

const technologySteps = [
  {
    icon: Upload,
    title: 'You upload photos',
    description:
      'A set of clear photos of you gives the AI the information it needs to capture your features.',
  },
  {
    icon: Cpu,
    title: 'AI learns your likeness',
    description:
      'Generative image models are personalized to the person in your photos, so results stay true to how you look.',
  },
  {
    icon: Paintbrush,
    title: 'Photos are generated',
    description:
      'Photos are created in the styles and settings you select, such as professional headshots or creative portraits.',
  },
  {
    icon: Download,
    title: 'You review and download',
    description:
      'Your finished photos are delivered to your account, ready to use on profiles, websites, and more.',
  },
];

const values = [
  {
    icon: Wallet,
    title: 'Accessibility',
    description:
      'Professional photos should not cost a fortune. We keep pricing simple and affordable so anyone can look their best online.',
  },
  {
    icon: Eye,
    title: 'Privacy',
    description:
      'Your data is yours. We delete uploads after processing and never sell your photos or use your likeness beyond your order.',
  },
  {
    icon: Gem,
    title: 'Quality',
    description:
      'Every portrait is trained on your unique features, producing studio-quality results that genuinely look like you — not a generic filter.',
  },
  {
    icon: Clock,
    title: 'Speed',
    description:
      'From upload to download within hours. No scheduling, no waiting weeks for a photographer.',
  },
];

const stats = [
  { value: 'Up to 160', label: 'Photos per order' },
  { value: '12', label: 'Photo categories' },
  { value: 'Within hours', label: 'Typical delivery' },
  { value: 'From $1.99', label: 'Starting price' },
];

const explore = [
  {
    href: '/technology',
    title: 'Our technology',
    description: 'A closer look at how personalized generative AI creates photos that look like you.',
  },
  {
    href: '/security',
    title: 'Security and privacy',
    description: 'How we handle, protect, and delete the photos you upload.',
  },
  {
    href: '/team-headshots',
    title: 'Team headshots',
    description: 'Consistent, professional headshots for your whole team, without a photo day.',
  },
];

const commitments = [
  'Automatic deletion of your uploads within 30 days',
  'We do not sell your photos',
  'No subscription lock-in',
];

export default function AboutPage() {
  return (
    <>
    <Header />
    <main id="main-content" className="min-h-screen bg-tp-paper">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'About', url: `${siteConfig.url}/about` },
        ]}
      />
      <AboutPageSchema />
      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-tp-bronze-ink">
            About {siteConfig.name}
          </p>
          <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-tp-black sm:text-6xl">
            Your Best Photo,{' '}
            <span className="italic text-tp-bronze-ink">Tailored by AI</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-muted">
            {siteConfig.name} uses generative AI to create personalized photos for every
            occasion, from professional headshots to creative portraits. Studio-style quality,
            delivered in hours.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={buttonVariants({ size: 'lg' })}>
              Try it yourself
            </Link>
            <Link href="/samples" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              See Sample Photos
            </Link>
          </div>
          <div className="mx-auto mt-12 max-w-sm">
            <AboutMissionIllustration className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-tp-black py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-tp-bronze">
            Our Mission
          </p>
          <h2 className="mt-4 font-display text-3xl font-normal text-tp-paper sm:text-5xl">
            Making professional photography{' '}
            <span className="italic text-tp-bronze">accessible to everyone</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/80">
            Traditional photography can be expensive, time-consuming, and hard to fit into a busy
            life. We are building AI tools that make professional-looking photos fast,
            affordable, and available to anyone, anywhere, without compromising on privacy.
          </p>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-tp-beige/70">
            We are a small, early-stage company, and we would rather be honest about that than
            pretend otherwise. It means we listen closely and every message you send us
            gets a personal response.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-tp-line bg-tp-paper py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-2 text-sm text-tp-muted">{stat.label}</dt>
                <dd className="font-display text-4xl font-normal text-tp-black sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Why we built it */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-tp-bronze-ink">
            Our Story
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal text-tp-black sm:text-4xl">
            Why we built {siteConfig.name}
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-tp-muted">
            <p>
              A good photo of yourself matters more than most people expect. It is often the first
              thing a client, recruiter, or colleague sees. Yet getting one has usually meant
              booking a studio, taking time off, and paying for a session before knowing whether
              you will like the result.
            </p>
            <p>
              We built {siteConfig.name} because we believed generative AI could remove that
              friction. Upload a few photos, choose a style, and receive polished images that
              still look like you, not like a filter or a stranger.
            </p>
            <p>
              We also wanted it done responsibly: simple pricing and clear privacy practices.
            </p>
          </div>
        </div>
      </section>

      {/* How we're different */}
      <section className="border-t border-tp-line py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-tp-bronze-ink">
              Our Approach
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal text-tp-black sm:text-4xl">
              How {siteConfig.name} is different
            </h2>
            <p className="mt-4 text-tp-muted">
              Four things we focus on to make getting a great photo simple.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-tp-card border border-tp-line bg-tp-paper p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-black">
                    <Icon className="h-6 w-6 text-tp-bronze" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-normal text-tp-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Built with */}
      <section className="border-y border-tp-line bg-tp-beige/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-tp-bronze-ink">
              Built With
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal text-tp-black sm:text-4xl">
              Generative AI, applied with care
            </h2>
            <p className="mt-4 leading-relaxed text-tp-muted">
              {siteConfig.name} is built on generative AI image models. Rather than applying a
              generic filter, the system is personalized to the person in your photos so that
              generated images reflect your own features in the style you choose. Here is the
              process at a high level.
            </p>
          </div>
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {technologySteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.title}
                  className="rounded-tp-card border border-tp-line bg-tp-paper p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-normal text-4xl text-tp-bronze-ink">{i + 1}</span>
                    <Icon className="h-5 w-5 text-tp-bronze-ink" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-tp-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{step.description}</p>
                </li>
              );
            })}
          </ol>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-tp-muted">
            AI-generated images can vary from one result to the next.{' '}
            <Link href="/technology" className="font-medium text-tp-bronze-ink underline underline-offset-4">
              Learn more about our technology
            </Link>.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-tp-bronze-ink">
              What We Stand For
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal text-tp-black sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 text-tp-muted">
              The principles that guide how we build and run {siteConfig.name}. See how we protect your data on our{' '}
              <Link href="/security" className="font-medium text-tp-bronze-ink underline underline-offset-4">security page</Link>.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="flex gap-5 rounded-tp-card border border-tp-line bg-tp-paper p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-tp-button bg-tp-black">
                    <Icon className="h-6 w-6 text-tp-bronze" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-normal text-tp-ink">{value.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-tp-muted">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Explore */}
      <section className="border-t border-tp-line pb-24 pt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-normal text-tp-black sm:text-4xl">
            Go deeper
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {explore.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-tp-card border border-tp-line bg-tp-paper p-6 transition-colors hover:border-tp-bronze"
              >
                <h3 className="font-display text-xl font-normal text-tp-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-tp-bronze-ink">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments / trust */}
      <section className="pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-tp-card border border-tp-line bg-tp-paper p-8 shadow-sm sm:p-10">
            <h2 className="font-display text-2xl font-normal text-tp-black sm:text-3xl">
              Our commitments to you
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {commitments.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-tp-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-tp-muted">
              Want the details? Read our{' '}
              <Link href="/security" className="font-medium text-tp-bronze-ink underline underline-offset-4">
                security overview
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-tp-black py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-normal text-tp-paper sm:text-5xl">
            Try it <span className="italic text-tp-bronze">yourself</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-tp-beige/80">
            Upload your photos, choose a style, and let {siteConfig.name} do the rest. Need headshots for your whole team?{' '}
            <Link href="/team-headshots" className="font-medium text-tp-bronze underline underline-offset-4">
              See our team plans
            </Link>.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={buttonVariants({ size: 'lg' })}>
              Try it yourself
            </Link>
            <Link href="/contact" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </main>
    <Footer />
    </>
  );
}
