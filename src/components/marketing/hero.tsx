'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getActiveCategories, FEATURED_CATEGORIES } from '@/config/categories';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { HeroPattern } from '@/components/marketing/illustrations';
import { homeHero, categoryVisuals } from '@/config/category-visuals';

const categories = getActiveCategories();
const quickCategories = categories.filter((c) =>
  FEATURED_CATEGORIES.includes(c.id)
).slice(0, 6);

export function Hero() {
  const categoryDialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <section className="relative overflow-hidden" aria-labelledby="tp-title">
        <HeroPattern />
        <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
          {/* Desktop: two-column editorial layout */}
          <div className="grid gap-9 pt-7 lg:grid-cols-[1.1fr_1fr] lg:min-h-[553px]">
            {/* Copy */}
            <div className="pt-6 pb-6 lg:pt-[52px] lg:pb-[42px] relative z-10">
              <p className="uppercase text-[11px] font-semibold tracking-[0.25em] text-tp-bronze-ink mb-5">
                No studio needed.
              </p>

              <h1
                id="tp-title"
                className="font-display text-[clamp(44px,5.6vw,82px)] leading-[1.04] tracking-[-0.04em] font-normal mb-5 max-w-[680px]"
              >
                Professional Photos&nbsp;&mdash;{' '}<br className="hidden lg:inline" /><em className="text-tp-bronze-ink font-normal font-display italic">Without&nbsp;a&nbsp;Studio</em>
              </h1>

              <p className="text-[16px] text-tp-ink/75 leading-[1.7] max-w-[460px] mb-8">
                Upload a few selfies and get studio-quality headshots for work, business and life. Ready in ~2&nbsp;hours. Pay once&nbsp;&mdash; no subscription.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-5">
                <Link
                  href="/auth/register?redirect=/dashboard/upload"
                  className="inline-flex w-full justify-center items-center gap-4 rounded-tp-button bg-tp-black px-6 py-4 text-[15px] font-semibold text-tp-paper shadow-md transition-[transform,box-shadow,border-color,background-color] hover:-translate-y-0.5 hover:bg-tp-ink hover:shadow-xl hover:animate-cta-pulse motion-reduce:hover:animate-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze sm:w-auto sm:px-8 whitespace-nowrap"
                >
                  Get My Headshots &mdash; From {BASE_PRICE_DISPLAY} <span aria-hidden="true" className="text-[20px] leading-none">&#8599;</span>
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex w-full justify-center items-center gap-2.5 rounded-tp-button border border-tp-line bg-transparent px-6 py-3.5 text-sm font-semibold text-tp-ink transition-[transform,box-shadow,border-color,background-color] hover:-translate-y-0.5 hover:border-tp-bronze-ink hover:bg-tp-beige/30 whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze-ink sm:w-auto"
                >
                  See How It Works <span aria-hidden="true" className="text-[18px] leading-none">&#8595;</span>
                </a>
              </div>

              {/* Compact trust strip */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-tp-muted">
                {[
                  { label: `From ${BASE_PRICE_DISPLAY}, one-time`, d: 'M12 8c-1.7 0-3 .9-3 2s1.3 2 3 2 3 .9 3 2-1.3 2-3 2m0-8V6m0 12v-2m9-4a9 9 0 11-18 0 9 9 0 0118 0z' },
                  { label: 'Ready in ~2 hours', d: 'M12 6v6l4 2m5-2a9 9 0 11-18 0 9 9 0 0118 0z' },
                  { label: 'Satisfaction guarantee', d: 'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z' },
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

            {/* Hero Art */}
            <div className="relative overflow-hidden rounded-[120px_16px_16px_16px] bg-tp-beige min-h-[420px] lg:min-h-[508px] self-stretch mt-2.5 order-4 lg:order-2">
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
            className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze-ink border border-tp-line bg-tp-paper rounded-tp-card overflow-hidden flex flex-row lg:flex-col min-h-[85px] lg:min-h-0 items-stretch transition-[transform,box-shadow,border-color] duration-150 hover:-translate-y-[3px] hover:border-tp-bronze-ink"
          >
            {/* Category thumbnail */}
            <div className="w-[72px] lg:w-full h-[85px] lg:h-[130px] bg-gradient-to-br from-tp-beige to-tp-line flex-shrink-0 overflow-hidden">
              <Image
                src={categoryVisuals[cat.id]?.quickCard?.src ?? `/images/categories/${cat.id}.jpg`}
                alt={categoryVisuals[cat.id]?.quickCard?.alt ?? cat.name}
                width={160}
                height={120}
                className="w-full h-full object-cover"
                sizes="(max-width: 1024px) 59px, 16vw"
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
