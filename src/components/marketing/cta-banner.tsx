'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getActiveCategories } from '@/config/categories';

const categories = getActiveCategories();

const trustPoints = [
  '$9.90 one-time, no subscription',
  '14-day money-back guarantee',
  '40+ styles, ready to download',
];

export function CTABanner() {
  const categoryDialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
          <div className="relative overflow-hidden rounded-tp-card bg-tp-black p-8 sm:p-12 lg:p-20 text-center">
            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-tp-bronze/35 via-tp-black to-tp-bronze/20" />
            <div
              aria-hidden="true"
              className="absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-tp-bronze/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#C9A98A_1px,transparent_1px)] [background-size:22px_22px]"
            />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/40 bg-tp-bronze/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-tp-bronze">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 2l2.4 5 5.6.7-4.1 3.8 1.1 5.5L10 14.4 5 17l1.1-5.5L2 7.7 7.6 7z" />
                </svg>
                Best value &middot; $9.90 one-time
              </span>
              <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-tp-paper leading-tight tracking-[-0.03em]">
                Skip the studio. Get headshots you&rsquo;ll actually use.
              </h2>
              <p className="mt-4 text-tp-beige/70 text-base sm:text-lg max-w-xl mx-auto">
                Upload a few selfies and get polished, studio-quality portraits for LinkedIn, your resume and
                more. Pay $9.90 once. No subscription, and if you&rsquo;re not happy, get your money back within 14 days.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/auth/register"
                  className={cn(
                    buttonVariants({ variant: 'primary', size: 'lg' }),
                    'h-14 gap-3 bg-tp-bronze px-10 text-base font-semibold text-tp-black shadow-lg shadow-tp-bronze/20 hover:-translate-y-0.5 hover:bg-tp-bronze hover:shadow-xl hover:shadow-tp-bronze/30'
                  )}
                >
                  Get my headshots <span aria-hidden="true" className="text-lg">&#8599;</span>
                </Link>
                <button
                  type="button"
                  onClick={() => categoryDialog.current?.showModal()}
                  className="text-sm font-medium text-tp-beige underline underline-offset-4 transition-colors hover:text-tp-paper"
                >
                  Browse categories
                </button>
              </div>

              <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-tp-beige/90">
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
        className="rounded-[20px] border border-tp-line bg-tp-paper p-5 sm:p-[30px] text-tp-ink w-[min(760px,calc(100vw-28px))] max-h-[85vh] overflow-auto backdrop:bg-tp-black/56"
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
            <a
              key={cat.id}
              href={`/${cat.slug}`}
              className="flex items-center gap-3 border border-tp-line bg-[#FEFCF8] rounded-tp-button min-h-[70px] p-3 text-left hover:border-tp-bronze-ink transition-colors"
              onClick={() => categoryDialog.current?.close()}
            >
              <div className="w-[52px] h-[52px] rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-tp-beige to-tp-line">
                <Image
                  src={`/images/categories/${cat.id}.jpg`}
                  alt={cat.name}
                  width={120}
                  height={120}
                  className="w-full h-full object-cover"
                  sizes="52px"
                />
              </div>
              <span>
                <strong className="block text-[13px]">{cat.name}</strong>
                <small className="text-[10px] text-tp-muted">{cat.tagline}</small>
              </span>
            </a>
          ))}
        </div>
      </dialog>
    </>
  );
}
