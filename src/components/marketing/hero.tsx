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
                Professional photos. Tailored by AI.
              </p>

              <h1
                id="tp-title"
                className="font-display text-[clamp(48px,5.6vw,86px)] leading-[1.04] tracking-[-0.057em] font-normal mb-6 max-w-[720px]"
              >
                Your Best Photo,<br />
                <em className="text-tp-bronze-ink not-italic font-normal font-display italic">Tailored</em> by AI.
              </h1>

              <p className="text-[15px] text-tp-muted leading-[1.75] max-w-[485px] mb-7">
                Professional, personal and creative photos, shaped around you.
                Choose your category and find your next photo direction.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => categoryDialog.current?.showModal()}
                  className="inline-flex items-center gap-5 rounded-xl border border-tp-black bg-tp-black px-6 py-3.5 text-sm font-semibold text-tp-paper transition-all hover:-translate-y-0.5 hover:shadow-lg whitespace-nowrap"
                >
                  Create Your Photos <span aria-hidden="true" className="text-[22px] leading-none">&#8599;</span>
                </button>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-3 rounded-xl border border-[#B5A696] bg-transparent px-6 py-3.5 text-sm font-semibold text-tp-ink transition-all hover:bg-tp-beige/20 whitespace-nowrap"
                >
                  See How It Works <span aria-hidden="true" className="text-[22px] leading-none">&#8595;</span>
                </a>
              </div>

              <div className="hidden lg:flex gap-[22px] mt-7 text-[11px] text-tp-muted flex-wrap">
                <span>{categories.length} photo categories</span>
                <span>Desktop &amp; mobile</span>
                <span>Tailored to your direction</span>
              </div>
            </div>

            {/* Mobile product chooser (between copy and hero image on mobile) */}
            <div className="lg:hidden order-2">
              <QuickCategories
                suffix="mobile"
                categories={quickCategories}
                allCount={categories.length}
                onSeeAll={() => categoryDialog.current?.showModal()}
              />
            </div>

            {/* Hero Art */}
            <div className="relative overflow-hidden rounded-[160px_14px_14px_14px] bg-tp-beige min-h-[432px] lg:min-h-[508px] self-stretch mt-2.5 order-3 lg:order-2">
              <Image
                src="/brand/tailorpic/web/portrait-woman-editorial.webp"
                alt="AI-generated editorial portrait"
                width={503}
                height={743}
                className="absolute inset-0 w-full h-full object-cover object-[50%_58%]"
                priority
              />
              <span className="absolute right-4 bottom-3 bg-tp-black/75 text-white text-[9px] tracking-[0.01em] px-2.5 py-1.5 rounded-md">
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
