'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getActiveCategories, FEATURED_CATEGORIES } from '@/config/categories';

const categories = getActiveCategories();
const quickCategories = categories.filter((c) =>
  FEATURED_CATEGORIES.includes(c.id)
).slice(0, 6);

export function Hero() {
  const categoryDialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <section className="relative" aria-labelledby="tp-title">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
          {/* Desktop: two-column editorial layout */}
          <div className="grid gap-9 pt-7 lg:grid-cols-[1.1fr_1fr] lg:min-h-[553px]">
            {/* Copy */}
            <div className="pt-6 pb-6 lg:pt-[45px] lg:pb-[42px] relative z-10">
              <p className="uppercase text-[10px] font-semibold tracking-[0.25em] text-tp-bronze-ink mb-5 sm:text-[10px]">
                Studio quality. Without the studio.
              </p>

              <h1
                id="tp-title"
                className="font-display text-[clamp(48px,5.6vw,86px)] leading-[1.04] tracking-[-0.057em] font-normal mb-6 max-w-[720px]"
              >
                Professional{' '}<em className="text-tp-bronze-ink not-italic font-normal font-display italic">AI&nbsp;Headshots</em><br />
                in Under 2&nbsp;Hours
              </h1>

              <p className="text-[16px] text-tp-ink/80 leading-[1.7] max-w-[485px] mb-4">
                Upload a few selfies and get 40+ studio-quality headshots in about 2 hours. Pay once &mdash; no subscription, no studio, no scheduling.
              </p>
              <p className="text-[13px] text-tp-muted/70 leading-[1.6] max-w-[485px] mb-7">
                <span className="line-through text-tp-muted/50">Traditional photoshoot: $200&ndash;$500</span>
                {' '}&rarr; <span className="font-semibold text-tp-bronze-ink">$9.90 one-time</span>
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center gap-5 rounded-tp-button border border-tp-black bg-tp-black px-8 py-4 text-[15px] font-semibold text-tp-paper shadow-md transition-all hover:-translate-y-0.5 hover:bg-tp-ink hover:shadow-xl hover:animate-cta-pulse motion-reduce:hover:animate-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze whitespace-nowrap"
                >
                  Get My Headshots <span aria-hidden="true" className="text-[22px] leading-none">&#8599;</span>
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-3 rounded-xl border border-[#B5A696] bg-transparent px-6 py-3.5 text-sm font-semibold text-tp-ink transition-all hover:bg-tp-beige/20 whitespace-nowrap"
                >
                  See How It Works <span aria-hidden="true" className="text-[22px] leading-none">&#8595;</span>
                </a>
              </div>

              {/* Friction reducer */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-tp-muted mt-2">
                <span className="inline-flex items-center gap-1">
                  <svg className="h-3 w-3 text-tp-bronze-ink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
                  No credit card needed
                </span>
                <span className="inline-flex items-center gap-1">
                  <svg className="h-3 w-3 text-tp-bronze-ink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
                  14-day money-back guarantee
                </span>
              </div>

              {/* Trust signals */}
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-medium text-tp-ink" aria-label="Why buy with confidence">
                {[
                  { label: 'One-time $9.90, no subscription', d: 'M12 8c-1.7 0-3 .9-3 2s1.3 2 3 2 3 .9 3 2-1.3 2-3 2m0-8V6m0 12v-2m9-4a9 9 0 11-18 0 9 9 0 0118 0z' },
                  { label: 'Delivered in about 2 hours', d: 'M12 6v6l4 2m5-2a9 9 0 11-18 0 9 9 0 0118 0z' },
                  { label: '14-day money-back guarantee', d: 'M9 12l2 2 4-4m5.6-3a12 12 0 01-8.6 3.9A12 12 0 013.4 7 12 12 0 003 10c0 5.6 3.8 10.3 9 11.6 5.2-1.3 9-6 9-11.6 0-1-.1-2-.4-3z' },
                ].map((t) => (
                  <li key={t.label} className="inline-flex items-center gap-1.5">
                    <svg className="h-4 w-4 text-tp-bronze-ink" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d={t.d} /></svg>
                    {t.label}
                  </li>
                ))}
              </ul>

              {/* Micro social proof */}
              <p className="text-[11px] text-tp-muted/60 mt-3 italic">
                Trusted by professionals at companies worldwide
              </p>
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
            <div className="relative overflow-hidden rounded-[160px_14px_14px_14px] bg-tp-beige min-h-[432px] lg:min-h-[508px] self-stretch mt-2.5 order-4 lg:order-2">
              <Image
                src="/brand/tailorpic/web/portrait-woman-editorial.webp"
                alt="AI-generated editorial portrait"
                width={503}
                height={743}
                className="absolute inset-0 w-full h-full object-cover object-[50%_58%]"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
              />
              <span className="absolute right-4 bottom-3 bg-tp-black/75 text-white text-[9px] tracking-[0.01em] px-2.5 py-1.5 rounded-md">
                AI-generated concept image
              </span>

              {/* Secondary portrait: offset card beside main image (hidden on small phones) */}
              <div className="hidden min-[480px]:block absolute -left-[6%] bottom-[12%] w-[28%] max-w-[180px] lg:w-[30%] lg:max-w-[200px] aspect-[3/4] -rotate-[3deg] rounded-2xl border-[3.5px] border-white bg-tp-beige shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5),0_8px_20px_-6px_rgba(0,0,0,0.3)] overflow-hidden ring-1 ring-black/5">
                <Image
                  src="/brand/tailorpic/web/portrait-man-editorial.webp"
                  alt="AI-generated editorial portrait of a man"
                  width={503}
                  height={743}
                  className="absolute inset-0 w-full h-full object-cover object-[50%_25%]"
                  sizes="(max-width: 1024px) 28vw, 14vw"
                />
                <span className="absolute left-1.5 bottom-1.5 bg-tp-black/80 text-white text-[7px] tracking-[0.01em] px-1.5 py-0.5 rounded-sm backdrop-blur-sm">
                  AI-generated concept
                </span>
              </div>
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
        className="rounded-[20px] border border-tp-line bg-tp-paper p-5 sm:p-[30px] text-tp-ink w-[min(760px,calc(100vw-28px))] max-h-[85vh] overflow-auto backdrop:bg-tp-black/56"
        aria-labelledby="tp-categories-title"
      >
        <div className="flex items-center justify-between gap-5 mb-5">
          <h2 id="tp-categories-title" className="font-display text-[29px] sm:text-[35px] font-normal leading-tight">
            Find your photo direction.
          </h2>
          <button
            className="h-11 w-11 rounded-full border border-tp-line bg-transparent text-[23px] flex-shrink-0 flex items-center justify-center"
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
              className="flex items-center gap-3 border border-tp-line bg-[#FEFCF8] rounded-xl min-h-[70px] sm:min-h-[84px] p-3 text-left hover:border-tp-bronze-ink transition-colors"
              onClick={() => categoryDialog.current?.close()}
            >
              <div className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-tp-beige to-tp-line">
                <Image
                  src={`/images/categories/${cat.id}.jpg`}
                  alt={cat.name}
                  width={120}
                  height={120}
                  className="w-full h-full object-cover"
                  sizes="60px"
                  loading="lazy"
                />
              </div>
              <span>
                <strong className="block text-[13px]">{cat.name}</strong>
                <small className="text-[10px] sm:text-[11px] text-tp-muted">{cat.tagline}</small>
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
    <section className="relative mt-6 lg:mt-[26px] pt-6 lg:pt-[26px] pb-6 lg:pb-9 border-b border-tp-line" aria-labelledby={`photo-title-${suffix}`}>
      <div className="flex justify-between items-center gap-4 mb-4">
        <h2
          id={`photo-title-${suffix}`}
          className="font-display text-[25px] lg:text-[33px] leading-tight tracking-[-0.03em] font-normal"
        >
          Choose your photo type.
        </h2>
        <button
          className="border-0 bg-transparent text-[11px] sm:text-[12px] font-semibold flex items-center gap-2 min-h-[44px] whitespace-nowrap"
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
            className="group border border-tp-line bg-[#FEFCF8] rounded-xl overflow-hidden flex flex-row lg:flex-col min-h-[69px] lg:min-h-0 items-stretch transition-all duration-150 hover:-translate-y-[3px] hover:border-tp-bronze-ink"
          >
            {/* Category thumbnail */}
            <div className="w-[59px] lg:w-full h-[69px] lg:h-[98px] bg-gradient-to-br from-tp-beige to-tp-line flex-shrink-0 overflow-hidden">
              <Image
                src={`/images/categories/${cat.id}.jpg`}
                alt={cat.name}
                width={800}
                height={600}
                className="w-full h-full object-cover"
                sizes="(max-width: 1024px) 59px, 16vw"
              />
            </div>
            <span className="flex items-center justify-between gap-1.5 px-2 py-2 lg:px-3 lg:py-3 text-[11px] font-semibold flex-1 min-h-0 lg:min-h-[52px]">
              <span className="max-w-[calc(100%-16px)]">{cat.shortName}</span>
              <i className="not-italic text-[15px] lg:text-[18px]" aria-hidden="true">&#8599;</i>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
