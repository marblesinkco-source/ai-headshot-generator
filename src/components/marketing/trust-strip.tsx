'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getActiveCategories } from '@/config/categories';
import { BeforeAfterSlider } from './before-after-slider';

const categories = getActiveCategories();

export function TrustStrip() {
  const categoryDialog = useRef<HTMLDialogElement>(null);

  return (
    <section
      id="examples"
      className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14"
    >
      <div className="bg-tp-black rounded-[22px] text-tp-paper grid lg:grid-cols-2 gap-10 lg:gap-16 p-6 sm:p-[52px] my-4 lg:my-14 items-center">
        {/* Copy side */}
        <div>
          <h2 className="font-display font-normal text-[41px] lg:text-[55px] leading-[1.06] tracking-[-0.04em] mb-4">
            Same You.<br />
            <em className="text-tp-bronze not-italic font-display italic">Better Photo.</em>
          </h2>
          <p className="text-tp-beige text-sm leading-[1.7] mb-1">
            Drag the slider to see how AI transforms a casual selfie into a professional portrait.
          </p>
          <p className="text-[11px] text-tp-muted leading-[1.7] mb-6">
            AI-generated comparison. Not a verified customer result.
          </p>
          <button
            onClick={() => categoryDialog.current?.showModal()}
            className="inline-flex items-center gap-5 rounded-tp-button border-transparent bg-tp-bronze px-6 py-3.5 text-sm font-semibold text-tp-black transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Explore Categories <span aria-hidden="true" className="text-[22px] leading-none">&#8599;</span>
          </button>
        </div>

        {/* Interactive Before / After slider */}
        <div className="w-full max-w-[520px] mx-auto lg:mx-0">
          <BeforeAfterSlider
            beforeSrc="/brand/tailorpic/web/portrait-man-before.webp"
            afterSrc="/brand/tailorpic/web/portrait-man-after.webp"
            beforeAlt="AI-generated casual portrait, illustrative before example"
            afterAlt="AI-generated professional portrait, illustrative after example"
            width={528}
            height={499}
          />
        </div>
      </div>

      {/* Categories Dialog (shared) */}
      <dialog
        ref={categoryDialog}
        className="rounded-[20px] border border-tp-line bg-tp-paper p-5 sm:p-[30px] text-tp-ink w-[min(760px,calc(100vw-28px))] max-h-[85vh] overflow-auto backdrop:bg-tp-black/56"
      >
        <div className="flex items-center justify-between gap-5 mb-5">
          <h2 className="font-display text-[29px] sm:text-[35px] font-normal leading-tight">
            Find your photo direction.
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
            </Link>
          ))}
        </div>
      </dialog>
    </section>
  );
}
