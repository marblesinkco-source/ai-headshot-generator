'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getActiveCategories } from '@/config/categories';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { categoryVisuals } from '@/config/category-visuals';

const categories = getActiveCategories();

const trustPoints = ['No subscription', 'Ready in hours', 'Satisfaction guarantee', 'Full commercial rights'];

export function CTABanner() {
  const categoryDialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
          <div className="scroll-fade-in relative overflow-hidden rounded-tp-card bg-tp-black p-8 sm:p-12 lg:p-20 text-center">
            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-tp-bronze/35 via-tp-black to-tp-bronze/20" />
            <div
              aria-hidden="true"
              className="absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-tp-bronze/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(var(--tp-bronze)_1px,transparent_1px)] [background-size:22px_22px]"
            />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/40 bg-tp-bronze/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-tp-bronze">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="animate-pulse" aria-hidden="true">
                  <circle cx="7" cy="7" r="3" fill="currentColor" opacity="0.6" />
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                </svg>
                Ready when you are
              </span>
              <h2 className="mt-5 font-display text-[30px] sm:text-[40px] font-normal text-tp-paper leading-tight tracking-[-0.03em]">
                Your next headshot is a selfie away.
              </h2>
              <p className="mt-4 text-tp-beige/70 text-base sm:text-lg max-w-xl mx-auto">
                Skip the studio, skip the $250+ price tag. Upload a few selfies and get polished, professional portraits within hours.
              </p>

              {/* Price anchoring */}
              <div className="mx-auto mt-8 inline-flex flex-col items-center gap-1 rounded-tp-button border border-tp-bronze/30 bg-tp-paper/5 px-6 py-4 sm:flex-row sm:gap-5">
                <p className="text-tp-paper">
                  <span className="text-sm text-tp-beige/60">1 photo from </span>
                  <span className="font-display text-4xl font-normal tracking-[-0.03em]">{BASE_PRICE_DISPLAY}</span>
                  <span className="ml-2 text-sm text-tp-beige/80">· up to 160 photos</span>
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
                  className={cn(
                    buttonVariants({ variant: 'primary', size: 'lg' }),
                    'group h-14 gap-3 bg-tp-bronze px-10 text-base font-semibold text-tp-black shadow-lg shadow-tp-bronze/20 transition-all duration-200 hover:-translate-y-0.5 cta-ring hover:bg-tp-bronze hover:shadow-xl hover:shadow-tp-bronze/30 tp-glow-cta'
                  )}
                >
                  Get My Headshots &mdash; from {BASE_PRICE_DISPLAY}{' '}
                  <span aria-hidden="true" className="text-lg transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">&#8599;</span>
                </Link>
                <button
                  type="button"
                  onClick={() => categoryDialog.current?.showModal()}
                  className="rounded-tp-button px-2 py-2 text-sm font-medium text-tp-beige underline underline-offset-4 transition-colors hover:text-tp-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze"
                >
                  Browse categories
                </button>
              </div>

              <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-tp-beige/90">
                {trustPoints.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 text-tp-bronze" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 10.5l4 4 8-9" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Dialog */}
      <dialog
        ref={categoryDialog}
        className="rounded-tp-dialog border border-tp-line bg-tp-paper p-5 sm:p-[30px] text-tp-ink w-[min(760px,calc(100vw-28px))] max-h-[85vh] overflow-auto backdrop:bg-tp-black/56"
      >
        <div className="flex items-center justify-between gap-5 mb-5">
          <h2 className="font-display text-[29px] sm:text-[35px] font-normal leading-tight">
            Choose your category.
          </h2>
          <button
            className="h-11 w-11 rounded-full border border-tp-line bg-transparent text-[23px] flex-shrink-0 flex items-center justify-center"
            aria-label="Close"
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
              className="flex items-center gap-3 border border-tp-line bg-tp-paper rounded-tp-button min-h-[70px] p-3 text-left hover:border-tp-bronze-ink transition-colors"
              onClick={() => categoryDialog.current?.close()}
            >
              <div className="w-[52px] h-[52px] rounded-tp-button overflow-hidden flex-shrink-0 bg-gradient-to-br from-tp-beige to-tp-line">
                <Image
                  src={categoryVisuals[cat.id]?.quickCard?.src ?? `/images/categories/${cat.id}.jpg`}
                  alt={categoryVisuals[cat.id]?.quickCard?.alt ?? cat.name}
                  width={120}
                  height={120}
                  className="w-full h-full object-cover"
                  sizes="52px"
                />
              </div>
              <span>
                <strong className="block text-[13px]">{cat.name}</strong>
                <small className="text-[11px] text-tp-muted">{cat.tagline}</small>
              </span>
            </Link>
          ))}
        </div>
      </dialog>
    </>
  );
}
