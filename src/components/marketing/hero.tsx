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
                Your Best Photo,<br />
                <em className="text-tp-bronze-ink not-italic font-normal font-display italic">Tailored</em> by AI.
              </h1>

              <p className="text-[15px] text-tp-muted leading-[1.75] max-w-[485px] mb-4">
                Get 40+ studio-quality photos in under 2 hours — no studio, no photographer, no scheduling hassle.
              </p>
              <p className="text-[13px] text-tp-muted/70 leading-[1.6] max-w-[485px] mb-7">
                <span className="line-through text-tp-muted/50">Traditional photoshoot: $200–$500</span>
                {' '}→ Starting at <span className="font-semibold text-tp-bronze-ink">$9.90</span>
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => categoryDialog.current?.showModal()}
                  className="inline-flex items-center gap-5 rounded-tp-button border border-tp-black bg-tp-black px-8 py-4 text-[15px] font-semibold text-tp-paper shadow-md transition-all hover:-translate-y-0.5 hover:bg-tp-ink hover:shadow-xl hover:animate-cta-pulse motion-reduce:hover:animate-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze whitespace-nowrap"
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

              {/* Payment trust row */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-tp-muted">
                <span className="inline-flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5 text-tp-bronze-ink" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                  Secure checkout via Stripe
                </span>
                <ul className="flex items-center gap-1.5" aria-label="Accepted cards">
                  {['Visa', 'Mastercard', 'Amex'].map((brand) => (
                    <li
                      key={brand}
                      className="rounded-md border border-tp-line bg-[#FEFCF8] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-tp-ink"
                    >
                      {brand}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Before / after (placeholder visuals) */}
              <div className="mt-7 flex max-w-[485px] items-center gap-3" aria-label="Selfie to AI headshot transformation">
                <figure className="flex-1 m-0">
                  <div className="aspect-[4/5] rounded-tp-card border border-tp-line bg-gradient-to-br from-tp-line via-tp-beige/60 to-tp-muted/30" role="img" aria-label="Placeholder for a casual selfie" />
                  <figcaption className="mt-2 text-center text-[11px] font-semibold text-tp-muted">Your selfie</figcaption>
                </figure>
                <span aria-hidden="true" className="text-[26px] leading-none text-tp-bronze-ink">&rarr;</span>
                <figure className="flex-1 m-0">
                  <div className="aspect-[4/5] rounded-tp-card border border-tp-bronze bg-gradient-to-br from-tp-bronze via-tp-beige to-tp-paper" role="img" aria-label="Placeholder for an AI headshot" />
                  <figcaption className="mt-2 text-center text-[11px] font-semibold text-tp-bronze-ink">AI headshot</figcaption>
                </figure>
              </div>

              {/* Social proof stats */}
              <div className="hidden lg:flex gap-6 mt-8 pt-7 border-t border-tp-line/50">
                <div>
                  <p className="text-[22px] font-bold text-tp-ink tracking-tight">2 hrs</p>
                  <p className="text-[11px] text-tp-muted mt-0.5">Average delivery</p>
                </div>
                <div className="w-px bg-tp-line/50" />
                <div>
                  <p className="text-[22px] font-bold text-tp-ink tracking-tight">{categories.length}</p>
                  <p className="text-[11px] text-tp-muted mt-0.5">Photo categories</p>
                </div>
                <div className="w-px bg-tp-line/50" />
                <div>
                  <p className="text-[22px] font-bold text-tp-ink tracking-tight">100%</p>
                  <p className="text-[11px] text-tp-muted mt-0.5">14-day money-back guarantee</p>
                </div>
              </div>
            </div>

            {/* Mobile social proof */}
            <div className="flex lg:hidden gap-4 mt-2 mb-4 order-2">
              <div className="flex items-center gap-1.5 text-[11px] text-tp-muted">
                <svg className="h-3.5 w-3.5 text-tp-bronze" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" /></svg>
                <span>2hr delivery</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-tp-muted">
                <svg className="h-3.5 w-3.5 text-tp-bronze" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>100% guarantee</span>
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
            <div className="relative overflow-hidden rounded-[160px_14px_14px_14px] bg-tp-beige min-h-[432px] lg:min-h-[508px] self-stretch mt-2.5 order-4 lg:order-2">
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
