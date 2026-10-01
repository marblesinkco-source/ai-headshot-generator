import { ArrowDown, ArrowRight, Camera, Sparkles } from 'lucide-react';

const EXAMPLES = [
  { label: 'LinkedIn Profile', detail: 'Clean, approachable, ready for recruiters' },
  { label: 'Corporate Team', detail: 'Consistent look across your whole company' },
  { label: 'Creative Portfolio', detail: 'Distinctive style that still feels polished' },
] as const;

const DOT_PATTERN = {
  backgroundImage:
    'repeating-linear-gradient(45deg, rgba(95,90,84,0.10) 0px, rgba(95,90,84,0.10) 1px, transparent 1px, transparent 10px)',
} as const;

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
          {EXAMPLES.map(({ label, detail }) => (
            <figure
              key={label}
              className="overflow-hidden rounded-tp-card border border-tp-line bg-white"
            >
              {/* Stack on mobile, side-by-side from sm up (within each card) */}
              <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
                {/* Before */}
                <div
                  className="relative flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-tp-paper sm:aspect-[3/4]"
                  style={DOT_PATTERN}
                  role="img"
                  aria-label={`${label} selfie placeholder`}
                >
                  <span className="absolute left-3 top-3 rounded-tp-button border border-tp-line bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-tp-muted">
                    Selfie
                  </span>
                  <Camera className="h-9 w-9 text-tp-muted" aria-hidden="true" />
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
                <div
                  className="relative flex aspect-[4/3] flex-col items-center justify-center gap-3 border-t border-tp-line bg-gradient-to-br from-tp-beige via-tp-paper to-tp-bronze/50 sm:aspect-[3/4] sm:border-l sm:border-t-0"
                  role="img"
                  aria-label={`${label} AI headshot placeholder`}
                >
                  <span className="absolute left-3 top-3 rounded-tp-button bg-tp-black px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-tp-bronze">
                    AI Headshot
                  </span>
                  <Sparkles className="h-9 w-9 text-tp-bronze-ink" aria-hidden="true" />
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
