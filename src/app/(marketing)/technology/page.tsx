import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  generateOGMetadata,
  generateTwitterMetadata,
} from '@/lib/og-metadata';
import {
  Upload,
  ScanFace,
  Palette,
  BadgeCheck,
  Camera,
  ShieldCheck,
  Gauge,
  Check,
  ArrowRight,
  ChevronDown,
  Cpu,
  Lock,
  Trash2,
  Globe,
} from 'lucide-react';

const PAGE_TITLE = 'The Technology Behind Your AI Headshots | TailorPic';
const PAGE_DESC =
  'Learn how TailorPic turns your selfies into professional headshots: what the AI does, how your photos are handled, and what quality checks happen before delivery.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: '/technology' },
  openGraph: generateOGMetadata({
    title: 'The Technology Behind Your AI Headshots',
    description: PAGE_DESC,
    subtitle: 'How it works and how your photos are protected',
    path: '/technology',
  }),
  twitter: generateTwitterMetadata({
    title: 'The Technology Behind Your AI Headshots',
    description: PAGE_DESC,
  }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const steps = [
  {
    icon: Upload,
    title: 'Upload Photos',
    desc: 'You upload a handful of selfies taken with an ordinary phone camera. Your photos are sent over an encrypted connection to our processing environment.',
  },
  {
    icon: ScanFace,
    title: 'AI Analysis',
    desc: 'The AI studies your photos to understand your facial features, skin tone, and hair. This is what lets the results look like you rather than a generic stand-in.',
  },
  {
    icon: Palette,
    title: 'Style Transfer',
    desc: 'Using the style you choose, the AI generates new images with professional lighting, clothing, backgrounds, and poses. Your own features are carried across into each new scene.',
  },
  {
    icon: BadgeCheck,
    title: 'Quality Check',
    desc: 'Generated images are checked for likeness and visual quality before they reach you. Results that fall short are filtered out so you see the strongest options.',
  },
];

const approachCards = [
  {
    icon: Camera,
    title: 'Trained on Professional Photography',
    desc: 'The AI learns from professional lighting, composition, and posing patterns, so the images it creates follow the conventions of a real studio shoot instead of looking like a filtered selfie.',
  },
  {
    icon: ShieldCheck,
    title: 'Your Privacy Matters',
    desc: 'Your photos are processed securely and automatically deleted after generation. They are never used to train our AI. See our Privacy Policy and Security page for details.',
  },
  {
    icon: Gauge,
    title: 'Quality Over Speed',
    desc: 'We run multiple quality checks before delivery. We would rather take a little longer than hand you images that do not meet the bar.',
  },
];

const technicalFeatures = [
  {
    title: 'High-resolution output (4K)',
    desc: 'Images are delivered at a resolution suitable for web, print, and large-format use.',
  },
  {
    title: '40+ professional styles',
    desc: 'Choose from a wide range of looks, from corporate to creative.',
  },
  {
    title: 'Natural skin tone preservation',
    desc: 'The goal is to keep your skin tone true to life rather than over-smoothed or shifted.',
  },
  {
    title: 'Consistent lighting across sets',
    desc: 'Images in a set share a coherent lighting look, which helps when you use several together.',
  },
  {
    title: 'Background customization',
    desc: 'Pick the backdrop that fits your brand or industry.',
  },
  {
    title: 'Commercial usage rights',
    desc: 'Your generated headshots come with a commercial license.',
  },
];

const trustSignals = [
  {
    icon: Lock,
    title: 'Encrypted',
    desc: 'Photos travel over encrypted connections (TLS) and are encrypted at rest.',
  },
  {
    icon: Trash2,
    title: 'Automatic deletion',
    desc: 'Your uploaded photos are deleted automatically after generation, and you can request deletion of your data at any time.',
  },
  {
    icon: Globe,
    title: 'GDPR and CCPA rights',
    desc: 'We honor GDPR (EU) and CCPA (California) requests for access, correction, and deletion.',
  },
  {
    icon: ShieldCheck,
    title: 'Never used for training',
    desc: 'Your photos are used only to create your headshots, not to train our AI.',
  },
];

const faqItems = [
  {
    q: 'Are my photos used to train the AI?',
    a: 'No. Your photos are processed to generate your headshots and are then deleted. They are not used to train our AI.',
  },
  {
    q: 'How long does generation take?',
    a: 'Typically under 2 hours. Timing can vary with demand, and we run quality checks before delivery rather than rushing results out.',
  },
  {
    q: 'What photo quality is needed?',
    a: 'Standard phone camera quality is sufficient. Clear, well-lit photos where your face is visible and unobstructed give the AI the most to work with.',
  },
  {
    q: 'Is the output commercially usable?',
    a: 'Yes. A full commercial license is included, so you can use your headshots for business profiles, websites, marketing, and more.',
  },
  {
    q: 'Is the result a real photograph?',
    a: 'No. Your headshots are AI-generated images created from your selfies, not photographs taken in a studio. We think it is important to be upfront about that.',
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TechnologyPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Technology', url: `${siteConfig.url}/technology` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: 'The Technology Behind Your AI Headshots',
            description: PAGE_DESC,
            url: `${siteConfig.url}/technology`,
            inLanguage: 'en-US',
            about: 'AI headshot generation',
            author: { '@type': 'Organization', name: siteConfig.name },
            publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
            mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteConfig.url}/technology` },
          }).replace(/</g, '\\u003c'),
        }}
      />
      <FAQSchema
        items={faqItems.map((item) => ({ question: item.q, answer: item.a }))}
      />
      <Header />

      {/* ── Hero ── */}
      <section className="relative bg-tp-black py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#C9A98A_0%,transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-xs font-semibold text-tp-bronze mb-6">
            <Cpu className="h-3.5 w-3.5" />
            Transparency
          </div>
          <h1 className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            The Technology Behind Your Headshots
          </h1>
          <p className="mt-5 text-lg text-tp-beige/70 max-w-2xl mx-auto leading-relaxed">
            TailorPic uses AI-powered photo generation to turn a few everyday
            selfies into professional headshots. Here is a plain-language look
            at how it works and how we handle your photos.
          </p>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              The Process
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              How It Works
            </h2>
            <p className="mt-3 text-tp-muted max-w-xl mx-auto">
              Four stages take you from selfie to finished headshot.
            </p>
          </div>
          <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div aria-hidden className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden border-t border-dashed border-tp-bronze/50 lg:block" />
            {steps.map((s, i) => (
              <li key={s.title} className="relative text-center">
                <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-tp-card bg-tp-black">
                  <s.icon className="h-6 w-6 text-tp-bronze" />
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-tp-bronze text-xs font-semibold text-tp-black">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-tp-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">
                  {s.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Our Approach ── */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              Our Principles
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              Our Approach
            </h2>
            <p className="mt-3 text-tp-muted max-w-xl mx-auto">
              Three commitments guide how we build and run the service.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {approachCards.map((card) => (
              <div
                key={card.title}
                className="rounded-tp-card border border-tp-line bg-white p-7"
              >
                <card.icon className="h-8 w-8 text-tp-bronze mb-4" />
                <h3 className="text-lg font-semibold text-tp-ink mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-tp-muted leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-tp-muted">
            Read more in our{' '}
            <Link
              href="/privacy"
              className="font-medium text-tp-bronze-ink underline underline-offset-2 hover:text-tp-ink"
            >
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link
              href="/security"
              className="font-medium text-tp-bronze-ink underline underline-offset-2 hover:text-tp-ink"
            >
              Security
            </Link>{' '}
            pages.
          </p>
        </div>
      </section>

      {/* ── Trust ── */}
      <section className="bg-tp-black py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
              Data Protection
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-white">
              How We Protect Your Photos
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustSignals.map((t) => (
              <div
                key={t.title}
                className="rounded-tp-card border border-tp-bronze/20 bg-tp-ink p-6"
              >
                <t.icon className="h-7 w-7 text-tp-bronze mb-4" />
                <h3 className="text-base font-semibold text-white mb-2">{t.title}</h3>
                <p className="text-sm text-tp-beige/70 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-tp-beige/60">
            Full details on our{' '}
            <Link href="/security" className="font-medium text-tp-bronze underline underline-offset-2">
              Security page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── Technical Details ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              What You Get
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              Technical Details
            </h2>
          </div>
          <ul className="divide-y divide-tp-line rounded-tp-card border border-tp-line bg-white">
            {technicalFeatures.map((f) => (
              <li key={f.title} className="flex items-start gap-4 px-6 py-5">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-tp-paper">
                  <Check className="h-4 w-4 text-tp-bronze-ink" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-tp-ink">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm text-tp-muted leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              Technology FAQ
            </h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.q}
                className="group rounded-tp-card border border-tp-line bg-white"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 text-sm font-semibold text-tp-ink">
                  {item.q}
                  <ChevronDown className="h-4 w-4 flex-shrink-0 text-tp-muted transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-5 text-sm text-tp-muted leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-tp-black py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-white">
            Try It Yourself
          </h2>
          <p className="mt-4 text-tp-beige/60">
            See what the technology can do with your own photos.
          </p>
          <div className="mt-8">
            <Link
              href="/auth/register"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-tp-bronze text-tp-black hover:bg-tp-bronze/90 active:bg-tp-bronze/80 font-semibold'
              )}
            >
              Create Your Headshots <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
