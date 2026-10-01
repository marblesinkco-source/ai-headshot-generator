import { Camera, Sparkles } from 'lucide-react';

const EXAMPLES = [
  { label: 'LinkedIn Profile' },
  { label: 'Corporate Team' },
  { label: 'Creative Portfolio' },
] as const;

const DOT_PATTERN = {
  backgroundImage:
    'repeating-linear-gradient(45deg, rgba(95,90,84,0.10) 0px, rgba(95,90,84,0.10) 1px, transparent 1px, transparent 10px)',
} as const;

export function BeforeAfterShowcase() {
  return (
    <section className="py-20 sm:py-28 bg-tp-paper" aria-labelledby="before-after-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="before-after-heading"
            className="text-3xl font-semibold tracking-tight text-tp-ink sm:text-4xl"
          >
            From everyday photo to polished headshot
          </h2>
          <p className="mt-4 text-base text-tp-muted">
            A look at the kinds of professional headshot styles you can create.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {EXAMPLES.map(({ label }) => (
            <figure
              key={label}
              className="rounded-tp-card border border-tp-line overflow-hidden bg-white"
            >
              <div className="grid grid-cols-2">
                {/* Before */}
                <div
                  className="relative flex aspect-[3/4] flex-col items-center justify-center gap-3 bg-tp-paper"
                  style={DOT_PATTERN}
                  role="img"
                  aria-label={`${label} before placeholder`}
                >
                  <span className="absolute left-3 top-3 text-[10px] font-medium uppercase tracking-wide text-tp-muted">
                    Before
                  </span>
                  <Camera className="h-8 w-8 text-tp-muted" aria-hidden="true" />
                </div>

                {/* After */}
                <div
                  className="relative flex aspect-[3/4] flex-col items-center justify-center gap-3 border-l border-tp-line bg-gradient-to-br from-tp-beige via-tp-paper to-tp-bronze/40"
                  role="img"
                  aria-label={`${label} after placeholder`}
                >
                  <span className="absolute left-3 top-3 text-[10px] font-medium uppercase tracking-wide text-tp-bronze-ink">
                    After
                  </span>
                  <Sparkles className="h-8 w-8 text-tp-bronze-ink" aria-hidden="true" />
                </div>
              </div>

              <figcaption className="border-t border-tp-line px-4 py-4 text-center text-sm font-medium text-tp-ink">
                {label}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-tp-muted">
          Results shown are representative examples. Individual results vary.
        </p>
      </div>
    </section>
  );
}

export default BeforeAfterShowcase;
