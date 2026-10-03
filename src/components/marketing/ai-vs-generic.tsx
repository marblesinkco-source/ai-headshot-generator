'use client';

import { Check, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

const FEATURES = [
  {
    feature: 'Identity-accurate results',
    tailorpic: true,
    generic: false,
    detail: 'Trained on your photos to look exactly like you',
  },
  {
    feature: 'Professional backgrounds',
    tailorpic: true,
    generic: false,
    detail: 'Studio-quality backdrops designed for business use',
  },
  {
    feature: 'Consistent look across photos',
    tailorpic: true,
    generic: false,
    detail: 'Same person, same quality, every shot',
  },
  {
    feature: 'Business-ready resolution',
    tailorpic: true,
    generic: false,
    detail: 'High-resolution output for print and digital',
  },
  {
    feature: 'Multiple outfit options',
    tailorpic: true,
    generic: false,
    detail: 'Professional attire matched to your style',
  },
  {
    feature: 'Photos auto-deleted',
    tailorpic: true,
    generic: false,
    detail: 'Your uploads are permanently removed after 30 days',
  },
] as const;

export function AIvsGeneric() {
  return (
    <section
      className="bg-white py-20 sm:py-28"
      aria-labelledby="ai-comparison-heading"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tp-bronze-ink">
            Purpose-Built AI
          </p>
          <h2
            id="ai-comparison-heading"
            className="mt-3 font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-5xl"
          >
            Why not just use ChatGPT?
          </h2>
          <p className="mt-4 text-base text-tp-muted">
            General-purpose AI image generators can&apos;t replicate your exact
            features. TailorPic is specifically trained on your photos to create
            headshots that actually look like you.
          </p>
        </div>

        {/* Comparison grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Generic AI card */}
          <div className="rounded-tp-card border border-tp-line bg-tp-beige/20 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tp-line/60">
                <X className="h-5 w-5 text-tp-muted" />
              </div>
              <div>
                <p className="text-sm font-semibold text-tp-ink">
                  Generic AI Tools
                </p>
                <p className="text-xs text-tp-muted">
                  ChatGPT, Midjourney, DALL-E
                </p>
              </div>
            </div>
            <ul className="mt-6 space-y-3">
              {[
                'Creates someone who looks "similar" to you',
                'Random, inconsistent backgrounds',
                'No control over outfit or pose',
                'Low resolution, not print-ready',
                'Your data used for further training',
                'Each image looks like a different person',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-tp-muted"
                >
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-tp-muted/60" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* TailorPic card */}
          <div className="rounded-tp-card border border-tp-bronze bg-tp-bronze/5 p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tp-bronze/20">
                <Check className="h-5 w-5 text-tp-bronze" />
              </div>
              <div>
                <p className="text-sm font-semibold text-tp-bronze-ink">
                  TailorPic
                </p>
                <p className="text-xs text-tp-muted">
                  Purpose-built for headshots
                </p>
              </div>
            </div>
            <ul className="mt-6 space-y-3">
              {FEATURES.map(({ feature, detail }) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-tp-ink"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze" />
                  <span>
                    <span className="font-medium">{feature}</span>
                    <span className="text-tp-muted"> — {detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/auth/register?redirect=/dashboard/upload"
            className={buttonVariants({ variant: 'primary', size: 'lg' })}
          >
            Get Your Real Headshots
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <p className="mt-3 text-xs text-tp-muted">
            From $1.99 · No subscription · Photos look exactly like you
          </p>
        </div>
      </div>
    </section>
  );
}

export default AIvsGeneric;
