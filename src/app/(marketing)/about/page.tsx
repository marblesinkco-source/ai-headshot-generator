import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { siteConfig } from '@/config/site';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import {
  ArrowRight,
  Camera,
  Clock,
  DollarSign,
  Eye,
  Globe,
  Lock,
  RefreshCw,
  Shield,
  Sparkles,
  Trash2,
  type LucideIcon,
} from 'lucide-react';

export const revalidate = 3600;

const PAGE_TITLE = `About ${siteConfig.name} — AI-Powered Professional Headshots`;
const PAGE_DESC = `${siteConfig.name} makes professional headshots accessible to everyone through AI. Upload selfies, get studio-quality results — from ${BASE_PRICE_DISPLAY}, no studio visit required.`;

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESC,
  alternates: { canonical: '/about' },
  openGraph: generateOGMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESC,
    path: '/about',
  }),
  twitter: generateTwitterMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESC,
  }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Differentiator {
  icon: LucideIcon;
  title: string;
  description: string;
}

const differentiators: Differentiator[] = [
  {
    icon: Sparkles,
    title: 'AI-Powered Quality',
    description:
      'Our AI trains a custom model on your features to generate headshots that look like they came from a professional studio session.',
  },
  {
    icon: Camera,
    title: 'No Studio Visit',
    description:
      'Upload a few selfies from wherever you are. No scheduling, no commuting, no awkward poses under studio lights.',
  },
  {
    icon: DollarSign,
    title: `Starting from ${BASE_PRICE_DISPLAY}`,
    description:
      'One-time payment, no subscription. Get professional results at a fraction of what a traditional photography session costs.',
  },
  {
    icon: Clock,
    title: 'Fast Delivery',
    description:
      'Most orders are completed within hours. Upload your selfies and get notified when your headshots are ready to download.',
  },
  {
    icon: RefreshCw,
    title: 'Quality Commitment',
    description:
      'Not happy with a photo? Regenerate it within your package at no extra cost. We work with you until the results look right.',
  },
  {
    icon: Globe,
    title: 'Available Worldwide',
    description:
      'No matter where you are, get professional headshots 24/7. All you need is a phone or computer with a few good selfies.',
  },
];

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
}

const values: Value[] = [
  {
    icon: Eye,
    title: 'Privacy First',
    description:
      'Your photos are used only to generate the headshots you ordered. We do not use them for advertising or unrelated purposes, and you can request deletion at any time.',
  },
  {
    icon: Shield,
    title: 'Quality Commitment',
    description:
      'Every package includes regeneration at no extra cost. If your results need adjusting, our support team will work with you to resolve it.',
  },
  {
    icon: Lock,
    title: 'Security',
    description:
      'Photos are transferred over encrypted connections and stored securely. We follow industry-standard practices to keep your data safe.',
  },
  {
    icon: Trash2,
    title: 'Transparency',
    description:
      'Clear pricing with no hidden fees or recurring charges. What you see at checkout is what you pay — once.',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Upload Your Selfies',
    description:
      'Take 4 to 10 photos of yourself from different angles with good, natural lighting. No professional camera needed — your phone works great.',
  },
  {
    step: '02',
    title: 'AI Trains on You',
    description:
      'Our AI builds a custom model based on your unique features — your face shape, skin tone, and expressions — so results look like you, not a generic avatar.',
  },
  {
    step: '03',
    title: 'Professional Headshots Generated',
    description:
      'The AI generates studio-quality headshots in your chosen styles, backgrounds, and outfits. Review, regenerate if needed, and download in high resolution.',
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'About', url: `${siteConfig.url}/about` },
        ]}
      />
      <Header />

      <main id="main-content">
        {/* ---- Hero ---- */}
        <section className="bg-tp-black py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-tp-bronze">
              About Us
            </p>
            <h1 className="font-display font-normal text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              About {siteConfig.name}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/80">
              We are building a simpler way to get professional headshots.
              Upload a few selfies, and our AI delivers studio-quality results
              — no appointment, no travel, no waiting weeks for retouched images.
            </p>
          </div>
        </section>

        {/* ---- Mission ---- */}
        <section className="bg-tp-paper py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
              Our Mission
            </h2>
            <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-tp-muted">
              <p>
                A great headshot opens doors. It is the first impression on
                a LinkedIn profile, a company website, or a conference badge.
                But getting one has traditionally meant booking a photographer,
                traveling to a studio, and waiting days or weeks for retouched
                results — at a cost that puts many people off.
              </p>
              <p>
                {siteConfig.name} exists to change that. We use AI to generate
                professional-quality headshots from ordinary selfies, making
                the process faster, more affordable, and available to anyone
                with a phone.
              </p>
              <p>
                Whether you are a job seeker updating your LinkedIn, a startup
                team that needs consistent photos, or a professional who simply
                wants a better headshot without the hassle, we want to make
                that easy.
              </p>
            </div>
          </div>
        </section>

        {/* ---- How We're Different ---- */}
        <section className="border-y border-tp-line bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4">
            <div className="text-center">
              <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
                How We Are Different
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-tp-muted">
                Professional headshots without the traditional trade-offs.
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {differentiators.map((d) => (
                <div
                  key={d.title}
                  className="rounded-tp-card border border-tp-line bg-tp-paper/50 p-6"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-bronze/10">
                    <d.icon className="h-5 w-5 text-tp-bronze-ink" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-tp-ink">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    {d.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Technology / How It Works ---- */}
        <section className="bg-tp-paper py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4">
            <div className="text-center">
              <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
                The Technology Behind Your Headshots
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-tp-muted">
                A custom AI model trained specifically on your features — not a
                one-size-fits-all filter.
              </p>
            </div>

            <div className="mt-12 space-y-0">
              {processSteps.map((s, i) => (
                <div
                  key={s.step}
                  className="relative flex gap-6 pb-10 last:pb-0"
                >
                  {/* Vertical connector line */}
                  {i < processSteps.length - 1 && (
                    <div
                      className="absolute left-[23px] top-12 bottom-0 w-px bg-tp-line"
                      aria-hidden="true"
                    />
                  )}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-tp-bronze bg-tp-bronze/10">
                    <span className="text-sm font-semibold text-tp-bronze-ink">
                      {s.step}
                    </span>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg font-semibold text-tp-ink">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-tp-muted">
                      {s.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Values ---- */}
        <section className="border-y border-tp-line bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4">
            <div className="text-center">
              <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
                What We Stand For
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-tp-muted">
                The principles behind every decision we make.
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {values.map((v) => (
                <div key={v.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tp-bronze/10">
                    <v.icon className="h-5 w-5 text-tp-bronze-ink" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-tp-ink">{v.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-tp-muted">
                      {v.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Contact CTA ---- */}
        <section className="bg-tp-black py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display font-normal text-3xl text-white sm:text-4xl">
              Questions? We Are Here to Help
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-tp-beige/70">
              Whether you have a question about our technology, need help
              choosing a package, or want to discuss team pricing — reach out
              and we will get back to you.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'bg-tp-bronze text-tp-black hover:bg-tp-bronze/90 active:bg-tp-bronze/80',
                )}
              >
                Contact Us
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/help"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'border-tp-beige/30 text-tp-beige hover:bg-tp-beige/10',
                )}
              >
                Help Center
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
