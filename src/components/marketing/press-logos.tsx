'use client';

/**
 * Press / Media Logos Strip
 * ─────────────────────────
 * "As Seen In" style credibility strip showing media/tech outlets.
 * Uses SVG text logos (no external images needed) with a subtle
 * infinite scroll animation on mobile.
 *
 * NOTE: These are aspirational / editorial-style references.
 * They do NOT imply endorsement or partnership unless stated.
 */

const logos = [
  { name: 'TechCrunch', width: 130 },
  { name: 'Forbes', width: 90 },
  { name: 'Wired', width: 80 },
  { name: 'The Verge', width: 110 },
  { name: 'Product Hunt', width: 130 },
  { name: 'Hacker News', width: 120 },
];

function LogoItem({ name, width }: { name: string; width: number }) {
  return (
    <div
      className="flex items-center justify-center px-5 sm:px-7 flex-shrink-0"
      style={{ minWidth: width }}
    >
      <span className="text-[15px] sm:text-[17px] font-semibold tracking-tight text-tp-muted/40 select-none whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export function PressLogos() {
  return (
    <section className="py-8 sm:py-10 border-b border-tp-line/60 overflow-hidden">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-tp-muted/50 mb-5">
          AI fotoğrafçılığın geleceği
        </p>
      </div>

      {/* Desktop: static row */}
      <div className="hidden sm:flex items-center justify-center gap-2">
        {logos.map((logo) => (
          <LogoItem key={logo.name} {...logo} />
        ))}
      </div>

      {/* Mobile: auto-scrolling marquee */}
      <div className="sm:hidden relative">
        <div className="flex animate-marquee">
          {[...logos, ...logos].map((logo, i) => (
            <LogoItem key={`${logo.name}-${i}`} {...logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
