'use client';

import { useState } from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

const STYLES = [
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Clean, polished look for the boardroom. Neutral backgrounds, professional attire.',
    tags: ['LinkedIn', 'Resume', 'Website'],
    bgClass: 'bg-gradient-to-br from-slate-100 to-slate-200',
    darkBgClass: 'bg-gradient-to-br from-slate-700 to-slate-800',
    accent: 'text-blue-700',
    features: ['Neutral background', 'Business attire', 'Sharp focus'],
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold colors and artistic lighting for creatives, designers, and artists.',
    tags: ['Portfolio', 'Social Media', 'Personal Brand'],
    bgClass: 'bg-gradient-to-br from-violet-100 to-fuchsia-100',
    darkBgClass: 'bg-gradient-to-br from-violet-700 to-fuchsia-800',
    accent: 'text-violet-700',
    features: ['Colorful backdrops', 'Dramatic lighting', 'Artistic flair'],
  },
  {
    id: 'natural',
    name: 'Natural Light',
    description: 'Warm, approachable photos with soft window or golden-hour lighting.',
    tags: ['Dating Profile', 'Blog', 'Newsletter'],
    bgClass: 'bg-gradient-to-br from-amber-50 to-orange-100',
    darkBgClass: 'bg-gradient-to-br from-amber-700 to-orange-800',
    accent: 'text-amber-700',
    features: ['Golden hour glow', 'Warm tones', 'Relaxed pose'],
  },
  {
    id: 'editorial',
    name: 'Editorial',
    description: 'Magazine-quality portraits with cinematic depth and professional styling.',
    tags: ['Press Kit', 'Speaker Page', 'About Page'],
    bgClass: 'bg-gradient-to-br from-stone-100 to-stone-200',
    darkBgClass: 'bg-gradient-to-br from-stone-700 to-stone-800',
    accent: 'text-stone-700',
    features: ['Cinematic depth', 'Studio backdrop', 'Magazine quality'],
  },
  {
    id: 'outdoor',
    name: 'Outdoor',
    description: 'Fresh, vibrant photos with natural greenery and urban backdrops.',
    tags: ['Real Estate', 'Coaching', 'Lifestyle'],
    bgClass: 'bg-gradient-to-br from-emerald-50 to-teal-100',
    darkBgClass: 'bg-gradient-to-br from-emerald-700 to-teal-800',
    accent: 'text-emerald-700',
    features: ['Green environments', 'City backdrops', 'Dynamic feel'],
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean white or single-color backgrounds for maximum versatility.',
    tags: ['ID Badge', 'Directory', 'Team Page'],
    bgClass: 'bg-gradient-to-br from-gray-50 to-white',
    darkBgClass: 'bg-gradient-to-br from-gray-600 to-gray-700',
    accent: 'text-gray-700',
    features: ['White background', 'Clean & simple', 'Versatile use'],
  },
] as const;

export function StyleShowcase() {
  const [active, setActive] = useState(0);
  const style = STYLES[active];

  function prev() {
    setActive((i) => (i === 0 ? STYLES.length - 1 : i - 1));
  }
  function next() {
    setActive((i) => (i === STYLES.length - 1 ? 0 : i + 1));
  }

  return (
    <section
      className="bg-tp-paper py-20 sm:py-28"
      aria-labelledby="style-showcase-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tp-bronze-ink">
            Choose Your Look
          </p>
          <h2
            id="style-showcase-heading"
            className="mt-3 font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-5xl"
          >
            6 Professional Styles
          </h2>
          <p className="mt-4 text-base text-tp-muted">
            From boardroom-ready to creative portfolios — pick the aesthetic that
            fits your brand.
          </p>
        </div>

        {/* Style selector tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {STYLES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-tp-button px-4 py-2 text-sm font-medium transition-all ${
                i === active
                  ? 'bg-tp-bronze-ink text-white shadow-sm'
                  : 'border border-tp-line bg-white text-tp-muted hover:border-tp-bronze hover:text-tp-ink'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Preview card */}
        <div className="mt-8 overflow-hidden rounded-tp-card border border-tp-line bg-white shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Visual preview */}
            <div
              className={`relative flex min-h-[320px] items-center justify-center p-8 ${style.bgClass}`}
            >
              {/* Simulated portrait grid */}
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="flex h-24 w-20 items-center justify-center rounded-tp-button bg-white/70 shadow-sm backdrop-blur-sm sm:h-28 sm:w-24"
                  >
                    <div className="h-12 w-12 rounded-full bg-tp-line/60 sm:h-14 sm:w-14" />
                  </div>
                ))}
              </div>

              {/* Nav arrows */}
              <button
                type="button"
                onClick={prev}
                aria-label="Previous style"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-sm transition-colors hover:bg-white"
              >
                <ChevronLeft className="h-5 w-5 text-tp-ink" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next style"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-sm transition-colors hover:bg-white"
              >
                <ChevronRight className="h-5 w-5 text-tp-ink" />
              </button>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <p className={`text-xs font-semibold uppercase tracking-wider ${style.accent}`}>
                {style.name} Style
              </p>
              <h3 className="mt-2 font-display text-2xl font-normal text-tp-ink">
                {style.description}
              </h3>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {style.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-tp-beige/60 px-3 py-1 text-xs font-medium text-tp-ink"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Features */}
              <ul className="mt-5 space-y-2">
                {style.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-tp-ink">
                    <Check className="h-4 w-4 shrink-0 text-tp-bronze" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Link
                  href="/auth/register"
                  className={buttonVariants({
                    variant: 'primary',
                    size: 'lg',
                  })}
                >
                  Try This Style
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="mt-6 text-center text-sm text-tp-muted">
          All styles included with every plan. Mix and match for the perfect set.
        </p>
      </div>
    </section>
  );
}

export default StyleShowcase;
