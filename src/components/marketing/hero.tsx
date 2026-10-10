'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getActiveCategories, FEATURED_CATEGORIES } from '@/config/categories';
import { BASE_PRICE_DISPLAY, BASE_PRICE_LABEL } from '@/config/pricing';
import { HeroPattern } from '@/components/marketing/illustrations';
import { homeHero, categoryVisuals } from '@/config/category-visuals';
import { portrait } from '@/config/stock-portraits';

const categories = getActiveCategories();
const quickCategories = categories.filter((c) =>
  FEATURED_CATEGORIES.includes(c.id)
).slice(0, 6);

/* Floating thumbnail data — diverse AI-concept portraits around the hero image */
const floatingThumbs = [
  { id: 'photo-1580489944761-15a19d654956', alt: 'AI headshot concept — professional woman', style: 'LinkedIn', x: '-12%', y: '8%', size: 72, r: '-3deg', d: '4.2s', delay: '0s', floatY: '-7px' },
  { id: 'photo-1507003211169-0a1dd7228f2d', alt: 'AI headshot concept — corporate man', style: 'Corporate', x: '-8%', y: '62%', size: 64, r: '2deg', d: '5.1s', delay: '0.8s', floatY: '-5px' },
  { id: 'photo-1531746020798-e6953c6e8e04', alt: 'AI headshot concept — creative portrait', style: 'Creative', x: '88%', y: '18%', size: 68, r: '3deg', d: '4.6s', delay: '0.4s', floatY: '-8px' },
  { id: 'photo-1573496359142-b8d87734a5a2', alt: 'AI headshot concept — business woman', style: 'Business', x: '92%', y: '70%', size: 60, r: '-2deg', d: '5.4s', delay: '1.2s', floatY: '-6px' },
];

/* Style gallery marquee items — showcasing variety of AI headshot styles */
const marqueeItems = [
  { id: 'photo-1580489944761-15a19d654956', label: 'LinkedIn Profile' },
  { id: 'photo-1507003211169-0a1dd7228f2d', label: 'Corporate' },
  { id: 'photo-1531746020798-e6953c6e8e04', label: 'Creative' },
  { id: 'photo-1573496359142-b8d87734a5a2', label: 'Business' },
  { id: 'photo-1519085360753-af0119f7cbe7', label: 'Executive' },
  { id: 'photo-1534528741775-53994a69daeb', label: 'Fashion' },
  { id: 'photo-1506794778202-cad84cf45f1d', label: 'Modern' },
  { id: 'photo-1472099645785-5658abf4ff4e', label: 'Casual Pro' },
];

const rotatingWords = ['LinkedIn', 'Business', 'Dating', 'Creative', 'Corporate'] as const;

function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % rotatingWords.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="tp-rotating-word-wrapper">
      <span
        className={`tp-rotating-word ${isAnimating ? 'tp-rotating-out' : 'tp-rotating-in'}`}
        aria-live="polite"
      >
        {rotatingWords[index]}
      </span>
    </span>
  );
}

export function Hero() {
  const categoryDialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <section className="relative overflow-hidden" aria-labelledby="tp-title">
        <HeroPattern />
        <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
          {/* Desktop: two-column editorial layout */}
          <div className="grid gap-9 pt-7 lg:grid-cols-[1.1fr_1fr] lg:min-h-[553px]">
            {/* Copy — staggered entrance */}
            <div className="pt-6 pb-6 lg:pt-[52px] lg:pb-[42px] relative z-10">
              <p
                className="tp-hero-enter uppercase text-[11px] font-semibold tracking-[0.25em] text-tp-bronze-ink mb-5"
                style={{ '--enter-i': 0 } as React.CSSProperties}
              >
                AI-Powered Headshots
              </p>

              <h1
                id="tp-title"
                className="tp-hero-enter font-display text-[clamp(44px,5.6vw,82px)] leading-[1.04] tracking-[-0.04em] font-normal mb-5 max-w-[680px]"
                style={{ '--enter-i': 1 } as React.CSSProperties}
              >
                AI Headshots&nbsp;&mdash;{' '}<br className="hidden lg:inline" /><em className="tp-hero-shimmer font-normal font-display italic">Without&nbsp;a&nbsp;Studio</em>
              </h1>

              {/* Rotating use case */}
              <p
                className="tp-hero-enter text-[15px] text-tp-ink/60 mb-1 flex items-center gap-2"
                style={{ '--enter-i': 1.5 } as React.CSSProperties}
              >
                Perfect for <RotatingWord /> profiles
              </p>

              <p
                className="tp-hero-enter text-[16px] text-tp-ink/75 leading-[1.7] max-w-[460px] mb-4"
                style={{ '--enter-i': 2 } as React.CSSProperties}
              >
                Upload a few selfies, get studio-quality headshots within hours. Up to 160 photos across 12 categories. Pay once&nbsp;&mdash; no subscription.
              </p>

              {/* Delivery speed promise */}
              <div
                className="tp-hero-enter mb-4 inline-flex items-center gap-2 text-[13px]"
                style={{ '--enter-i': 2.2 } as React.CSSProperties}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                <span className="font-medium text-tp-ink/70">Upload now, get results within hours</span>
              </div>

              {/* Studio cost anchoring — verifiable industry fact */}
              <div
                className="tp-hero-enter mb-8 inline-flex items-center gap-3 rounded-tp-button border border-tp-bronze/25 bg-tp-beige/40 px-4 py-2.5"
                style={{ '--enter-i': 2.5 } as React.CSSProperties}
              >
                <span className="text-[13px] text-tp-muted line-through decoration-tp-muted/50">Studio: $250–$500</span>
                <span aria-hidden="true" className="text-tp-line">|</span>
                <span className="text-[13px] font-semibold text-tp-bronze-ink">TailorPic: from {BASE_PRICE_DISPLAY}</span>
              </div>

              <div
                className="tp-hero-enter flex flex-wrap items-center gap-3 mb-5"
                style={{ '--enter-i': 3 } as React.CSSProperties}
              >
                <Link
                  href={`/auth/register?redirect=${encodeURIComponent('/dashboard/upload?category=headshots')}`}
                  className="inline-flex w-full justify-center items-center gap-4 rounded-tp-button bg-tp-black px-6 py-4 text-[15px] font-semibold text-tp-paper shadow-md transition-[transform,box-shadow,border-color,background-color] hover:-translate-y-0.5 hover:bg-tp-ink hover:shadow-xl hover:animate-cta-pulse motion-reduce:hover:animate-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze sm:w-auto sm:px-8 whitespace-nowrap cta-ring"
                >
                  Get My Headshots &mdash; {BASE_PRICE_LABEL} <span aria-hidden="true" className="text-[20px] leading-none">&#8599;</span>
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex w-full justify-center items-center gap-2.5 rounded-tp-button border border-tp-line bg-transparent px-6 py-3.5 text-sm font-semibold text-tp-ink transition-[transform,box-shadow,border-color,background-color] hover:-translate-y-0.5 hover:border-tp-bronze-ink hover:bg-tp-beige/30 whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze-ink sm:w-auto"
                >
                  See How It Works <span aria-hidden="true" className="text-[18px] leading-none">&#8595;</span>
                </a>
              </div>

              {/* Compact trust strip */}
              <div
                className="tp-hero-enter flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-tp-muted"
                style={{ '--enter-i': 4 } as React.CSSProperties}
              >
                {[
                  { label: 'No subscription, pay once', d: 'M12 8c-1.7 0-3 .9-3 2s1.3 2 3 2 3 .9 3 2-1.3 2-3 2m0-8V6m0 12v-2m9-4a9 9 0 11-18 0 9 9 0 0118 0z' },
                  { label: 'Ready within hours', d: 'M12 6v6l4 2m5-2a9 9 0 11-18 0 9 9 0 0118 0z' },
                  { label: 'Satisfaction guarantee', d: 'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z' },
                  { label: 'Full commercial rights', d: 'M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                ].map((t) => (
                  <span key={t.label} className="inline-flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 text-tp-bronze-ink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d={t.d} /></svg>
                    {t.label}
                  </span>
                ))}
              </div>

            </div>

            {/* Mobile product chooser (between copy and hero image on mobile) */}
            <div className="lg:hidden order-3">
              <QuickCategories
                suffix="mobile"
                categories={quickCategories}
                allCount={categories.length}
                onSeeAll={() => categoryDialog.current?.showModal()}
              />
            </div>

            {/* Hero Art — with floating style thumbnails */}
            <div className="tp-hero-image-enter relative overflow-visible min-h-[420px] lg:min-h-[508px] self-stretch mt-2.5 order-4 lg:order-2">
              {/* Main portrait */}
              <div className="relative overflow-hidden rounded-[120px_16px_16px_16px] bg-tp-beige h-full">
                <Image
                  src={homeHero.src}
                  alt={homeHero.alt}
                  width={503}
                  height={743}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: homeHero.desktopObjectPosition }}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority
                />
                <span className="absolute right-4 bottom-3 bg-tp-black/75 text-tp-paper text-[11px] tracking-[0.01em] px-2.5 py-1.5 rounded-tp-button">
                  AI-generated concept image
                </span>
              </div>

              {/* Floating style thumbnails — desktop only */}
              {floatingThumbs.map((thumb) => (
                <div
                  key={thumb.id}
                  className="tp-float-thumb hidden lg:block absolute z-20 group"
                  style={{
                    left: thumb.x,
                    top: thumb.y,
                    '--float-r': thumb.r,
                    '--float-d': thumb.d,
                    '--float-delay': thumb.delay,
                    '--float-y': thumb.floatY,
                  } as React.CSSProperties}
                  aria-hidden="true"
                >
                  <div
                    className="overflow-hidden rounded-xl border-2 border-white shadow-lg shadow-tp-black/15 transition-transform duration-200 group-hover:scale-105"
                    style={{ width: thumb.size, height: thumb.size }}
                  >
                    <Image
                      src={portrait(thumb.id)}
                      alt={thumb.alt}
                      width={thumb.size * 2}
                      height={thumb.size * 2}
                      className="w-full h-full object-cover"
                      sizes={`${thumb.size}px`}
                      loading="lazy"
                    />
                  </div>
                  <span className="mt-1 block text-center text-[9px] font-semibold text-tp-muted/70 uppercase tracking-wider">
                    {thumb.style}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Style Gallery Marquee — continuous scrolling strip */}
          <div
            className="tp-hero-enter relative mt-6 lg:mt-8 py-5 border-y border-tp-line overflow-hidden"
            style={{ '--enter-i': 5 } as React.CSSProperties}
            aria-label="AI headshot style examples"
          >
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-tp-paper to-transparent" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-tp-paper to-transparent" aria-hidden="true" />

            <div className="tp-marquee-track" aria-hidden="true">
              {/* Duplicate items for seamless loop */}
              {[...marqueeItems, ...marqueeItems].map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex-shrink-0 mx-3 flex flex-col items-center gap-2">
                  <div className="w-[72px] h-[90px] sm:w-[80px] sm:h-[100px] overflow-hidden rounded-lg border border-tp-line bg-tp-beige shadow-sm">
                    <Image
                      src={portrait(item.id)}
                      alt={item.label}
                      width={160}
                      height={200}
                      className="w-full h-full object-cover"
                      sizes="80px"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[10px] font-medium text-tp-muted whitespace-nowrap">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop product chooser */}
          <div className="hidden lg:block">
            <QuickCategories
              suffix="desktop"
              categories={quickCategories}
              allCount={categories.length}
              onSeeAll={() => categoryDialog.current?.showModal()}
            />
          </div>
        </div>
      </section>

      {/* All Categories Dialog */}
      <dialog
        ref={categoryDialog}
        className="rounded-tp-dialog border border-tp-line bg-tp-paper p-5 sm:p-[30px] text-tp-ink w-[min(760px,calc(100vw-28px))] max-h-[85vh] overflow-auto backdrop:bg-tp-black/56"
        aria-labelledby="tp-categories-title"
      >
        <div className="flex items-center justify-between gap-5 mb-5">
          <h2 id="tp-categories-title" className="font-display text-[29px] sm:text-[35px] font-normal leading-tight">
            Find your photo direction.
          </h2>
          <button
            type="button"
            className="h-11 w-11 rounded-full border border-tp-line bg-transparent text-[23px] flex-shrink-0 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze-ink"
            aria-label="Close categories"
            onClick={() => categoryDialog.current?.close()}
          >
            &#215;
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="flex items-center gap-3 border border-tp-line bg-tp-paper rounded-tp-card min-h-[70px] sm:min-h-[84px] p-3 text-left hover:border-tp-bronze-ink transition-colors"
              onClick={() => categoryDialog.current?.close()}
            >
              <div className="w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] rounded-tp-button overflow-hidden flex-shrink-0 bg-gradient-to-br from-tp-beige to-tp-line">
                <Image
                  src={categoryVisuals[cat.id]?.quickCard?.src ?? `/images/categories/${cat.id}.jpg`}
                  alt={categoryVisuals[cat.id]?.quickCard?.alt ?? cat.name}
                  width={120}
                  height={120}
                  className="w-full h-full object-cover"
                  sizes="60px"
                  loading="lazy"
                />
              </div>
              <span>
                <strong className="block text-[13px]">{cat.name}</strong>
                <small className="text-[11px] text-tp-muted leading-snug">{cat.tagline}</small>
              </span>
            </Link>
          ))}
        </div>
      </dialog>
    </>
  );
}

function QuickCategories({
  suffix,
  categories,
  allCount,
  onSeeAll,
}: {
  suffix: string;
  categories: ReturnType<typeof getActiveCategories>;
  allCount: number;
  onSeeAll: () => void;
}) {
  return (
    <section className="relative mt-6 lg:mt-7 pt-6 lg:pt-7 pb-6 lg:pb-10 border-b border-tp-line" aria-labelledby={`photo-title-${suffix}`}>
      <div className="flex justify-between items-center gap-4 mb-5">
        <h2
          id={`photo-title-${suffix}`}
          className="font-display text-[24px] lg:text-[30px] leading-tight tracking-[-0.02em] font-normal text-tp-ink"
        >
          Choose your photo type.
        </h2>
        <button
          type="button"
          aria-haspopup="dialog"
          className="border-0 bg-transparent text-xs font-semibold text-tp-ink flex items-center gap-2 min-h-[44px] whitespace-nowrap rounded-tp-button focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze-ink"
          onClick={onSeeAll}
        >
          All {allCount} categories <span aria-hidden="true">&#8599;</span>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-6 lg:gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/${cat.slug}`}
            className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze-ink border border-tp-line bg-tp-paper rounded-tp-card overflow-hidden flex flex-row lg:flex-col min-h-[85px] lg:min-h-0 items-stretch tp-lift hover:border-tp-bronze-ink"
          >
            {/* Category thumbnail */}
            <div className="w-[72px] lg:w-full h-[85px] lg:h-[130px] bg-gradient-to-br from-tp-beige to-tp-line flex-shrink-0 overflow-hidden">
              <Image
                src={categoryVisuals[cat.id]?.quickCard?.src ?? `/images/categories/${cat.id}.jpg`}
                alt={categoryVisuals[cat.id]?.quickCard?.alt ?? cat.name}
                width={160}
                height={120}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                sizes="(max-width: 1024px) 72px, 16vw"
                loading="lazy"
              />
            </div>
            <span className="flex items-center justify-between gap-1.5 px-2.5 py-2.5 lg:px-3 lg:py-3 text-[12px] font-semibold flex-1 min-h-0 lg:min-h-[48px]">
              <span className="max-w-[calc(100%-16px)]">{cat.shortName}</span>
              <i className="not-italic text-[15px] lg:text-[18px]" aria-hidden="true">&#8599;</i>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
