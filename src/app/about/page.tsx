import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/structured-data';
import {
  Shield,
  Zap,
  Wallet,
  Sparkles,
  Eye,
  Accessibility,
  Gem,
  Cpu,
  Upload,
  Paintbrush,
  Download,
  Check,
} from 'lucide-react';

const aboutDescription = `Learn about ${siteConfig.name}, the AI photo platform that creates professional, personalized photos in hours. Our mission, how we're different, and our commitment to privacy.`;

export const metadata: Metadata = {
  title: 'About Us',
  description: aboutDescription,
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: `About | ${siteConfig.name}`,
    description: `Learn about ${siteConfig.name} and our mission to make professional photography accessible to everyone.`,
    url: `${siteConfig.url}/about`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: `${siteConfig.name} - About` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `About | ${siteConfig.name}`,
    description: `Learn about ${siteConfig.name} and our mission to make professional photography accessible to everyone.`,
    images: [siteConfig.ogImage],
  },
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
    icon: Eye,
    title: 'Privacy-first',
    description:
      'Your photos are yours. We handle them with care, limit how long we keep them, and never treat your likeness as a product.',
  },
  {
    icon: Gem,
    title: 'Quality obsession',
    description:
      'We aim for natural, professional results that look like you, and we back our work with a money-back guarantee.',
  },
  {
    icon: Wallet,
    title: 'Fair pricing',
    description:
      'Straightforward one-time pricing. You should know what you are paying for before you upload a single photo.',
  },
  {
    icon: Accessibility,
    title: 'Accessibility',
    description:
      'Great photos should not depend on your budget, location, or schedule. We design for simple, approachable use.',
  },
];

const commitments = [
  'Automatic deletion of your uploads within 30 days',
  'We do not sell your photos',
  '14-day money-back guarantee',
  'No subscription lock-in',
];

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen bg-tp-paper">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'About', url: `${siteConfig.url}/about` },
        ]}
      />
      <Header />

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
            <Link href="/auth/register" className={buttonVariants({ size: 'lg' })}>
              Get Started
            </Link>
            <Link href="/samples" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              See Sample Photos
            </Link>
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
            Make professional photos{' '}
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

      {/* How we're different */}
      <section className="py-24">
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
                  className="rounded-tp-card border border-tp-line bg-white p-6 shadow-sm"
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
                    <span className="font-display text-4xl text-tp-bronze-ink">{i + 1}</span>
                    <Icon className="h-5 w-5 text-tp-bronze-ink" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-tp-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{step.description}</p>
                </li>
              );
            })}
          </ol>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-tp-muted">
            AI-generated images can vary from one result to the next. That is why we offer a
            money-back guarantee if you are not happy with your photos.
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
              The principles that guide how we build and run {siteConfig.name}.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="flex gap-5 rounded-tp-card border border-tp-line bg-white p-6 shadow-sm"
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

      {/* Commitments / trust */}
      <section className="pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-tp-dialog border border-tp-line bg-white p-8 shadow-sm sm:p-10">
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
              </Link>{' '}
              or{' '}
              <Link href="/guarantee" className="font-medium text-tp-bronze-ink underline underline-offset-4">
                guarantee
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
            Ready to see your <span className="italic text-tp-bronze">best photo?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-tp-beige/80">
            Upload your photos, choose a style, and let {siteConfig.name} do the rest. Not happy?
            Our money-back guarantee has you covered.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register" className={buttonVariants({ size: 'lg' })}>
              Create Your Photos
            </Link>
            <Link href="/contact" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
