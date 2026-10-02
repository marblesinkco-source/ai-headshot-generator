import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ShieldCheck,
  RefreshCcw,
  Sparkles,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Mail,
  Lock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'Quality & Satisfaction Guarantee | TailorPic' },
  description:
    'TailorPic is committed to delivering studio-quality AI headshots. Not happy with your results? We will regenerate your photos until they look great.',
  alternates: { canonical: '/guarantee' },
  openGraph: generateOGMetadata({
    title: 'Quality & Satisfaction Guarantee | TailorPic',
    description:
      'Studio-quality AI headshots, guaranteed. We work with you until every photo is right.',
    path: '/guarantee',
  }),
  twitter: generateTwitterMetadata({
    title: 'Quality & Satisfaction Guarantee | TailorPic',
    description:
      'Studio-quality AI headshots, guaranteed. We work with you until every photo is right.',
  }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const guaranteeSteps = [
  {
    step: '1',
    icon: Sparkles,
    title: 'Upload & Generate',
    desc: 'Upload your selfies and choose your style. Our AI generates your professional headshots in under two hours.',
  },
  {
    step: '2',
    icon: RefreshCcw,
    title: 'Review & Regenerate',
    desc: 'Not happy with a photo? Regenerate it within your package. Fine-tune poses, expressions and backgrounds until every shot is right.',
  },
  {
    step: '3',
    icon: CheckCircle,
    title: 'Download with Confidence',
    desc: 'Download your final headshots in high resolution and use them anywhere — LinkedIn, your website, business cards and more.',
  },
];

const coveredItems = [
  'Unlimited regenerations within your package',
  'Dedicated support if results need adjusting',
  'Full commercial usage rights on every photo',
  'Privacy-first: photos encrypted and auto-deleted within 30 days',
];

const faqItems = [
  {
    q: 'What if I am not happy with my photos?',
    a: 'You can regenerate any photo within your package at no additional cost. If you are still not satisfied after regeneration, contact our support team and we will work with you to resolve the issue.',
  },
  {
    q: 'How many times can I regenerate?',
    a: 'You can regenerate photos within your purchased package as many times as needed until you are satisfied with the results.',
  },
  {
    q: 'What does the satisfaction guarantee cover?',
    a: 'Our guarantee covers the quality of the AI-generated headshots. If the results do not meet professional standards, we will work with you on regenerations or adjustments until the photos are right.',
  },
  {
    q: 'What if I purchased a team plan?',
    a: `Team and enterprise plans are also covered by our satisfaction guarantee. Contact us at ${siteConfig.supportEmail} and we will work with you to resolve any concerns.`,
  },
  {
    q: 'How do I contact support?',
    a: `Email us at ${siteConfig.supportEmail} with your order details and a description of the issue. Our team aims to respond within one business day.`,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function GuaranteePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Satisfaction Guarantee', url: `${siteConfig.url}/guarantee` },
        ]}
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
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-tp-bronze/30 bg-tp-bronze/10">
            <ShieldCheck className="h-12 w-12 text-tp-bronze" strokeWidth={1.5} />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-tp-bronze mb-4">
            Our Promise
          </p>
          <h1 className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            Satisfaction Guaranteed
          </h1>
          <p className="mt-5 text-lg text-tp-beige/70 max-w-2xl mx-auto leading-relaxed">
            We are committed to delivering studio-quality results. If your
            headshots do not meet your expectations, we will work with you
            until every photo is right.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/auth/register"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-tp-bronze text-tp-black hover:bg-tp-bronze/90'
              )}
            >
              Get Your Headshots <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-tp-beige/80 hover:text-white"
            >
              <Mail className="h-4 w-4" /> {siteConfig.supportEmail}
            </a>
          </div>
        </div>
      </section>

      {/* ── What's Covered ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
              Quality First
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              What&apos;s Included
            </h2>
            <p className="mt-3 text-tp-muted max-w-xl mx-auto">
              Every order is backed by our commitment to quality.
            </p>
          </div>
          <div className="mx-auto max-w-lg">
            <div className="rounded-tp-card border border-tp-line bg-white p-7">
              <ShieldCheck className="h-8 w-8 text-tp-bronze mb-4" />
              <h3 className="text-lg font-semibold text-tp-ink mb-3">
                Satisfaction Guarantee
              </h3>
              <ul className="space-y-2.5">
                {coveredItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-tp-muted"
                  >
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              How It Works
            </h2>
            <p className="mt-3 text-tp-muted max-w-xl mx-auto">
              From upload to download, quality at every step.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {guaranteeSteps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-tp-card bg-tp-black mb-4">
                  <s.icon className="h-6 w-6 text-tp-bronze" />
                </div>
                <h3 className="text-lg font-semibold text-tp-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.q}
                className="group rounded-tp-card border border-tp-line bg-white"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-sm font-semibold text-tp-ink">
                  {item.q}
                  <ChevronDown className="h-4 w-4 text-tp-muted transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-5 text-sm text-tp-muted leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-tp-black py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-white">
            Start with Confidence
          </h2>
          <p className="mt-4 text-tp-beige/60">
            Studio-quality headshots, backed by our satisfaction guarantee.
          </p>
          <div className="mt-8">
            <Link
              href="/auth/register"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-tp-bronze text-tp-black hover:bg-tp-bronze/90'
              )}
            >
              Get Started for $1.99 <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-sm text-tp-beige/50">
              One-time payment. Satisfaction guaranteed.{' '}
              <Link href="/pricing" className="underline underline-offset-2 hover:text-tp-beige">
                See pricing
              </Link>{' '}
              &middot;{' '}
              <Link href="/help" className="underline underline-offset-2 hover:text-tp-beige">
                Help Center
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
