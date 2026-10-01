'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { getActiveCategories } from '@/config/categories';

const categories = getActiveCategories();

export function CTABanner() {
  const categoryDialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
          <div className="relative overflow-hidden rounded-[22px] bg-tp-black p-8 sm:p-12 lg:p-16 text-center">
            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-tp-bronze/10 via-transparent to-tp-bronze/5" />

            <div className="relative z-10">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-tp-paper leading-tight tracking-[-0.03em]">
                Ready for Your Best Photo?
              </h2>
              <p className="mt-4 text-tp-beige/70 text-base sm:text-lg max-w-xl mx-auto">
                40+ studio-quality portraits in under 2 hours.
                Starting at just $9.90. 14-day money-back guarantee.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => categoryDialog.current?.showModal()}
                  className="inline-flex items-center gap-3 rounded-xl bg-tp-bronze px-7 py-4 text-sm font-semibold text-tp-black transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-tp-bronze/20"
                >
                  Get Started Now <span aria-hidden="true" className="text-lg">&#8599;</span>
                </button>
              </div>

              <p className="mt-5 text-[11px] text-tp-muted">
                No subscription required &middot; Pay once, own forever &middot; Secure Stripe payment
              </p>
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
              className="flex items-center gap-3 border border-tp-line bg-[#FEFCF8] rounded-xl min-h-[70px] p-3 text-left hover:border-tp-bronze-ink transition-colors"
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
