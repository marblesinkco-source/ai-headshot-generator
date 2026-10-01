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
  ShieldCheck,
  Check,
  ArrowRight,
  ChevronDown,
  Cpu,
  Lock,
  Trash2,
  Globe,
  Layers,
  Sparkles,
  Eye,
  MonitorCheck,
  ImageUp,
  Zap,
} from 'lucide-react';

const PAGE_TITLE = 'The Technology Behind Your AI Headshots | TailorPic';
const PAGE_DESC =
  'Discover how TailorPic turns everyday selfies into studio-quality headshots. Learn about our process, quality standards and privacy commitments.';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESC,
  alternates: { canonical: '/technology' },
  openGraph: generateOGMetadata({
    title: 'The Technology Behind TailorPic',
    description: PAGE_DESC,
    subtitle: 'State-of-the-art AI for professional headshots',
    path: '/technology',
  }),
  twitter: generateTwitterMetadata({
    title: 'The Technology Behind TailorPic',
    description: PAGE_DESC,
  }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const steps = [
  {
    icon: Upload,
    title: 'Upload',
    subtitle: 'Send your selfies',
    desc: 'Upload a handful of everyday photos from your phone. They are transferred over an encrypted connection to our secure processing environment.',
  },
  {
    icon: Cpu,
    title: 'AI Processing',
    subtitle: 'Feature analysis',
    desc: 'Advanced neural networks study your facial features, skin tone, and hair to build an accurate representation of your unique appearance.',
  },
  {
    icon: BadgeCheck,
    title: 'Quality Check',
    subtitle: 'Automated review',
    desc: 'Every generated image is scored for likeness, lighting, and visual quality. Results that fall short are filtered out automatically.',
  },
  {
    icon: ImageUp,
    title: 'Delivery',
    subtitle: 'Download your headshots',
    desc: 'Your finished headshots arrive in high resolution, ready for LinkedIn, your website, business cards, or anywhere you need a professional photo.',
  },
];

const technologyPillars = [
  {
    icon: Sparkles,
    title: 'AI Generation',
    desc: 'State-of-the-art generative AI creates photorealistic headshots from your selfies, producing images with natural lighting, professional composition, and authentic expressions.',
  },
  {
    icon: Palette,
    title: 'Style Transfer',
    desc: 'Choose from 40+ professional styles and the AI applies clothing, backgrounds, and poses while preserving your unique features and natural appearance.',
  },
  {
    icon: ScanFace,
    title: 'Face Detection',
    desc: 'Precise facial landmark detection ensures accurate feature mapping, so your headshots look unmistakably like you rather than a generic approximation.',
  },
  {
    icon: Eye,
    title: 'Quality Assurance',
    desc: 'Multi-pass quality scoring evaluates each image for likeness, sharpness, color accuracy, and professional composition before delivery.',
  },
  {
    icon: Layers,
    title: 'Background Processing',
    desc: 'Intelligent background generation creates clean, contextually appropriate environments, from studio gradients to office settings and outdoor scenes.',
  },
  {
    icon: MonitorCheck,
    title: 'Resolution Enhancement',
    desc: 'Output images are generated at 4K resolution, suitable for everything from web profiles to large-format print materials.',
  },
];

const qualityPoints = [
  {
    label: 'Natural skin tones',
    detail: 'Colors stay true to life, not over-smoothed or artificially shifted.',
  },
  {
    label: 'Consistent lighting',
    detail: 'Images in a set share coherent lighting for a unified look across profiles.',
  },
  {
    label: 'Professional composition',
    detail: 'Framing follows studio photography conventions: eye line, headroom, and centering.',
  },
  {
    label: 'Authentic expressions',
    detail: 'Your natural expression is preserved, not replaced by a generic smile.',
  },
  {
    label: 'Detail preservation',
    detail: 'Fine details like hair texture and accessories carry through accurately.',
  },
  {
    label: 'Commercial-ready output',
    detail: '4K resolution with a full commercial license included in every package.',
  },
];

const trustSignals = [
  {
    icon: Lock,
    title: 'Encrypted end-to-end',
    desc: 'Photos travel over TLS and are encrypted at rest. Your data is handled with the same care as sensitive personal information.',
  },
  {
    icon: Trash2,
    title: 'Automatic deletion',
    desc: 'Uploaded photos are deleted automatically after generation. You can request deletion of all your data at any time.',
  },
  {
    icon: Globe,
    title: 'GDPR & CCPA ready',
    desc: 'We honor GDPR and CCPA requests for access, correction, and deletion. Your rights come first.',
  },
  {
    icon: ShieldCheck,
    title: 'Never used for training',
    desc: 'Your photos are used only to create your headshots. They are never fed back into AI training data.',
  },
];

const faqItems = [
  {
    q: 'How does the AI generate my headshots?',
    a: 'Our AI analyzes your uploaded selfies to understand your facial features, skin tone, and hair. It then generates new images that carry your appearance into professional settings with studio-quality lighting, clothing, and backgrounds. The result is a headshot that looks like you in a real photo shoot.',
  },
  {
    q: 'Are my photos used to train the AI?',
    a: 'No. Your photos are processed solely to generate your headshots and are then deleted from our systems. They are never used to train or improve our AI models.',
  },
  {
    q: 'What resolution and quality can I expect?',
    a: 'Headshots are delivered at 4K resolution, suitable for web profiles, print materials, and large-format displays. Every image goes through automated quality checks for likeness, sharpness, and color accuracy before delivery.',
  },
  {
    q: 'How long does the generation process take?',
    a: 'Typically under 2 hours. We prioritize quality over speed, running multiple validation passes before delivering your results. Timing may vary slightly with demand.',
  },
  {
    q: 'Is the result a real photograph?',
    a: 'No. Your headshots are AI-generated images created from your selfies, not photographs taken in a studio. We believe in being transparent about this. The quality is comparable to professional photography, but the images are generated, not captured.',
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
            headline: 'The Technology Behind TailorPic',
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
      <section className="relative bg-tp-black py-24 sm:py-32 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-[0.035]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#C9A98A_0%,transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,#C9A98A_0%,transparent_40%)]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,rgba(0,0,0,0.4))]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-xs font-semibold text-tp-bronze mb-8">
            <Zap className="h-3.5 w-3.5" />
            How It Works
          </div>
          <h1 className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight">
            The Technology Behind{' '}
            <span className="text-tp-bronze">TailorPic</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-tp-beige/70 max-w-2xl mx-auto leading-relaxed">
            State-of-the-art AI transforms a few everyday selfies into
            studio-quality headshots. Here is exactly how the process works
            and how we keep your photos safe.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/register"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-tp-bronze text-tp-black hover:bg-tp-bronze/90 active:bg-tp-bronze/80 font-semibold'
              )}
            >
              Try It Yourself <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/samples"
              className="inline-flex items-center gap-2 text-sm font-semibold text-tp-beige/80 hover:text-tp-bronze transition-colors"
            >
              View Sample Results <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Process Flow ── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              The Process
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              From Selfie to Studio Quality
            </h2>
            <p className="mt-4 text-tp-muted max-w-xl mx-auto leading-relaxed">
              Four automated stages take your everyday photos and deliver
              polished, professional headshots.
            </p>
          </div>

          <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Connector line (desktop only) */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-8 hidden border-t-2 border-dashed border-tp-bronze/30 lg:block"
            />
            {steps.map((s, i) => (
              <li key={s.title} className="relative text-center group">
                <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-tp-black shadow-lg shadow-tp-black/10 transition-transform group-hover:-translate-y-0.5">
                  <s.icon className="h-7 w-7 text-tp-bronze" />
                  <span className="absolute -top-2.5 -right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-tp-bronze text-xs font-semibold text-tp-black shadow-sm">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-tp-ink">{s.title}</h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-tp-bronze-ink mt-1">
                  {s.subtitle}
                </p>
                <p className="mt-3 text-sm text-tp-muted leading-relaxed">
                  {s.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Technology Pillars ── */}
      <section className="bg-tp-paper py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              Under the Hood
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              Technology That Powers Your Headshots
            </h2>
            <p className="mt-4 text-tp-muted max-w-2xl mx-auto leading-relaxed">
              Six core capabilities work together to deliver headshots
              that are accurate, consistent, and professionally composed.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {technologyPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group rounded-tp-card border border-tp-line bg-white p-7 transition-all hover:border-tp-bronze/30 hover:shadow-md hover:shadow-tp-bronze/5"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-tp-black">
                  <pillar.icon className="h-6 w-6 text-tp-bronze" />
                </div>
                <h3 className="text-lg font-semibold text-tp-ink mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-tp-muted leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quality Comparison ── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
                Quality Standards
              </p>
              <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
                What Makes AI Headshots Look Professional
              </h2>
              <p className="mt-4 text-tp-muted leading-relaxed">
                The difference between a convincing headshot and an obvious
                AI output comes down to dozens of small details. Here is
                what we focus on to deliver results you would be proud to
                use anywhere.
              </p>
              <div className="mt-8">
                <Link
                  href="/samples"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-tp-bronze-ink hover:text-tp-ink transition-colors"
                >
                  See real examples <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              {qualityPoints.map((point) => (
                <div
                  key={point.label}
                  className="flex items-start gap-4 rounded-tp-card border border-tp-line bg-tp-paper p-5"
                >
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-tp-black">
                    <Check className="h-3.5 w-3.5 text-tp-bronze" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-tp-ink">
                      {point.label}
                    </h3>
                    <p className="mt-1 text-sm text-tp-muted leading-relaxed">
                      {point.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust & Privacy ── */}
      <section className="bg-tp-black py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
              Privacy & Security
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-white">
              Your Photos Are Safe With Us
            </h2>
            <p className="mt-4 text-tp-beige/60 max-w-xl mx-auto leading-relaxed">
              We treat your photos as sensitive data from the moment you
              upload them to the moment they are deleted.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trustSignals.map((t) => (
              <div
                key={t.title}
                className="rounded-tp-card border border-tp-bronze/15 bg-gradient-to-b from-tp-ink to-tp-black p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-tp-bronze/20 bg-tp-bronze/10">
                  <t.icon className="h-5 w-5 text-tp-bronze" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{t.title}</h3>
                <p className="text-sm text-tp-beige/60 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-tp-beige/50">
            Full details in our{' '}
            <Link href="/privacy" className="font-medium text-tp-bronze underline underline-offset-2 hover:text-tp-bronze/80">
              Privacy Policy
            </Link>
            {' '}and{' '}
            <Link href="/security" className="font-medium text-tp-bronze underline underline-offset-2 hover:text-tp-bronze/80">
              Security
            </Link>
            {' '}pages.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-tp-paper py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              Common Questions
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              Technology FAQ
            </h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.q}
                className="group rounded-tp-card border border-tp-line bg-white transition-shadow hover:shadow-sm"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-[15px] font-semibold text-tp-ink">
                  {item.q}
                  <ChevronDown className="h-4 w-4 flex-shrink-0 text-tp-muted transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-sm text-tp-muted leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative bg-tp-black py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#C9A98A_0%,transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            See the Results for Yourself
          </h2>
          <p className="mt-5 text-lg text-tp-beige/60 max-w-lg mx-auto leading-relaxed">
            Upload a few selfies and get back studio-quality headshots.
            No camera, no studio, no scheduling.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/register"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-tp-bronze text-tp-black hover:bg-tp-bronze/90 active:bg-tp-bronze/80 font-semibold shadow-lg shadow-tp-bronze/20'
              )}
            >
              Create Your Headshots <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-sm font-semibold text-tp-beige/70 hover:text-tp-bronze transition-colors"
            >
              View Pricing <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <p className="mt-6 text-xs text-tp-beige/40">
            Starting at $9.90 &middot; No subscription required
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
