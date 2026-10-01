import Image from 'next/image';
import { ArrowDown, ArrowRight } from 'lucide-react';

const BASE = '/brand/tailorpic/web';

const EXAMPLES = [
  {
    label: 'LinkedIn Profile',
    detail: 'Clean, approachable, ready for recruiters',
    before: { src: `${BASE}/portrait-woman-before.webp`, alt: 'Casual selfie of a woman before AI processing' },
    after: { src: `${BASE}/portrait-woman-after.webp`, alt: 'Polished AI headshot of a woman for a LinkedIn profile' },
  },
  {
    label: 'Corporate Team',
    detail: 'Consistent look across your whole company',
    before: { src: `${BASE}/portrait-man-before.webp`, alt: 'Casual selfie of a man before AI processing' },
    after: { src: `${BASE}/portrait-man-after.webp`, alt: 'Polished AI headshot of a man for a corporate team page' },
  },
  {
    label: 'Creative Portfolio',
    detail: 'Distinctive style that still feels polished',
    before: { src: `${BASE}/portrait-man-before.webp`, alt: 'Casual selfie of a man before AI processing' },
    after: { src: `${BASE}/portrait-man-editorial.webp`, alt: 'Editorial-style AI portrait of a man for a creative portfolio' },
  },
] as const;

const IMAGE_SIZES = '(min-width: 768px) 16vw, (min-width: 640px) 45vw, 90vw';

export function BeforeAfterShowcase() {
  return (
    <section className="bg-tp-paper py-20 sm:py-28" aria-labelledby="before-after-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tp-bronze-ink">
            Before &amp; After
          </p>
          <h2
            id="before-after-heading"
            className="mt-3 font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-5xl"
          >
            See the Transformation
          </h2>
          <p className="mt-4 text-base text-tp-muted">
            From an everyday selfie to a polished, professional headshot. Here are the kinds of
            styles you can create.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {EXAMPLES.map(({ label, detail, before, after }) => (
            <figure
              key={label}
              className="overflow-hidden rounded-tp-card border border-tp-line bg-white"
            >
              {/* Stack on mobile, side-by-side from sm up */}
              <div className="relative grid grid-cols-1 sm:grid-cols-2">
                {/* Before */}
                <div className="relative aspect-[4/3] overflow-hidden bg-tp-beige sm:aspect-[3/4]">
                  <Image
                    src={before.src}
                    alt={before.alt}
                    fill
                    sizes={IMAGE_SIZES}
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-tp-button border border-tp-line bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-tp-muted">
                    Selfie
                  </span>
                </div>

                {/* Arrow between panels */}
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-tp-line bg-tp-black text-tp-bronze shadow-md"
                  aria-hidden="true"
                >
                  <ArrowDown className="h-4 w-4 sm:hidden" />
                  <ArrowRight className="hidden h-4 w-4 sm:block" />
                </div>

                {/* After */}
                <div className="relative aspect-[4/3] overflow-hidden border-t border-tp-line bg-tp-beige sm:aspect-[3/4] sm:border-l sm:border-t-0">
                  <Image
                    src={after.src}
                    alt={after.alt}
                    fill
                    sizes={IMAGE_SIZES}
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-tp-button bg-tp-black px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-tp-bronze">
                    AI Headshot
                  </span>
                  <span className="absolute bottom-2 right-2 rounded-tp-button bg-tp-black/70 px-2 py-0.5 text-[11px] font-medium text-tp-paper">
                    AI-generated concept image
                  </span>
                </div>
              </div>

              <figcaption className="border-t border-tp-line px-4 py-4 text-center">
                <span className="block text-sm font-medium text-tp-ink">{label}</span>
                <span className="mt-1 block text-xs text-tp-muted">{detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-tp-muted">
          Results based on AI-generated concept images. Individual results vary.
        </p>
      </div>
    </section>
  );
}

export default BeforeAfterShowcase;
