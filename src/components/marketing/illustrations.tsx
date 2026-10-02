// Decorative inline SVG illustrations (no external assets, CSP-safe, no hooks → server/client safe).
// Colors use brand hex values from tailwind.config.ts tokens via currentColor / explicit token hexes.
// tp-bronze #C9A98A · tp-bronze-ink #76563D · tp-beige #DCCDBB · tp-paper #F8F5EF · tp-ink #171613

const BRONZE = '#C9A98A';
const BRONZE_INK = '#76563D';
const BEIGE = '#DCCDBB';
const PAPER = '#F8F5EF';
const INK = '#171613';

/** Subtle dot + grid pattern for the hero background (tp-bronze at low opacity). */
export function HeroPattern({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id="tp-hero-dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill={BRONZE} fillOpacity="0.28" />
        </pattern>
        <pattern id="tp-hero-grid" width="96" height="96" patternUnits="userSpaceOnUse">
          <path d="M96 0H0V96" fill="none" stroke={BRONZE} strokeOpacity="0.14" strokeWidth="1" />
        </pattern>
        <radialGradient id="tp-hero-fade" cx="30%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="tp-hero-mask">
          <rect width="100%" height="100%" fill="url(#tp-hero-fade)" />
        </mask>
      </defs>
      <g mask="url(#tp-hero-mask)">
        <rect width="100%" height="100%" fill="url(#tp-hero-grid)" />
        <rect width="100%" height="100%" fill="url(#tp-hero-dots)" />
      </g>
    </svg>
  );
}

/** Generic professional bust silhouette. */
function Bust({ x = 0, y = 0, scale = 1, fill = BRONZE_INK, opacity = 1 }: { x?: number; y?: number; scale?: number; fill?: string; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <circle cx="0" cy="-14" r="13" fill={fill} />
      <path d="M-26 34c0-17 11-27 26-27s26 10 26 27z" fill={fill} />
    </g>
  );
}

/** Step 1 — pick a style: three stacked style cards, one selected. */
export function StepStyleIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 110" className={className} role="img" aria-label="Choose a photo style" fill="none">
      <rect x="8" y="22" width="44" height="64" rx="8" fill={PAPER} stroke={BEIGE} />
      <Bust x={30} y={50} scale={0.6} fill={BEIGE} />
      <rect x="108" y="22" width="44" height="64" rx="8" fill={PAPER} stroke={BEIGE} />
      <Bust x={130} y={50} scale={0.6} fill={BEIGE} />
      <rect x="48" y="10" width="64" height="88" rx="10" fill={PAPER} stroke={BRONZE_INK} strokeWidth="1.5" />
      <rect x="54" y="16" width="52" height="56" rx="6" fill={BEIGE} fillOpacity="0.55" />
      <Bust x={80} y={52} scale={0.95} />
      <rect x="56" y="80" width="30" height="5" rx="2.5" fill={INK} fillOpacity="0.75" />
      <rect x="56" y="88" width="20" height="4" rx="2" fill={BRONZE} />
      <circle cx="104" cy="18" r="9" fill={INK} />
      <path d="M99.5 18l3 3 5-6" stroke={BRONZE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Step 2 — upload selfies: photo grid with an upload arrow. */
export function StepUploadIllustration({ className = '' }: { className?: string }) {
  const tiles = [
    [14, 34], [58, 34], [102, 34],
    [14, 70], [58, 70],
  ];
  return (
    <svg viewBox="0 0 160 110" className={className} role="img" aria-label="Upload your selfies" fill="none">
      {tiles.map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="40" height="30" rx="6" fill={PAPER} stroke={BEIGE} />
          <circle cx={x + 20} cy={y + 12} r="6" fill={i % 2 ? BRONZE : BEIGE} />
          <path d={`M${x + 9} ${y + 28}c0-7 5-10 11-10s11 3 11 10z`} fill={i % 2 ? BRONZE : BEIGE} />
        </g>
      ))}
      <rect x="102" y="70" width="40" height="30" rx="6" fill={PAPER} stroke={BRONZE_INK} strokeDasharray="4 3" />
      <path d="M122 92V78m0 0l-5 5m5-5l5 5" stroke={BRONZE_INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="122" cy="16" r="12" fill={INK} />
      <path d="M122 21v-9m0 0l-4 4m4-4l4 4" stroke={BRONZE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M94 16h-20M70 16h-4" stroke={BRONZE} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 5" />
    </svg>
  );
}

/** Step 3 — download portraits: before/after pair with download badge. */
export function StepDownloadIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 110" className={className} role="img" aria-label="Download your portraits" fill="none">
      <rect x="10" y="26" width="52" height="66" rx="8" fill={PAPER} stroke={BEIGE} />
      <circle cx="36" cy="52" r="10" fill={BEIGE} />
      <path d="M17 88c0-14 8-22 19-22s19 8 19 22z" fill={BEIGE} />
      <path d="M68 59h22m0 0l-5-5m5 5l-5 5" stroke={BRONZE_INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="96" y="12" width="54" height="80" rx="9" fill={INK} />
      <rect x="101" y="17" width="44" height="58" rx="6" fill={BRONZE} fillOpacity="0.28" />
      <Bust x={123} y={50} scale={1} fill={BRONZE} />
      <rect x="104" y="80" width="38" height="6" rx="3" fill={BRONZE} />
      <circle cx="140" cy="92" r="11" fill={BRONZE} stroke={PAPER} strokeWidth="2" />
      <path d="M140 87v8m0 0l-3.5-3.5m3.5 3.5l3.5-3.5" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Custom trust-badge glyphs (stroke icons, 24x24, currentColor). */
export function TrustGlyph({ kind, className = '' }: { kind: 'no-subscription' | 'auto-delete' | 'commercial' | 'one-time'; className?: string }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" {...common}>
      {kind === 'no-subscription' && (
        <>
          <path d="M20 12a8 8 0 10-2.3 5.6" />
          <path d="M20 5v5h-5" />
          <path d="M5.5 5.5l13 13" />
        </>
      )}
      {kind === 'auto-delete' && (
        <>
          <rect x="4" y="5" width="16" height="15" rx="3" />
          <path d="M4 10h16M9 3v4M15 3v4" />
          <path d="M9.5 14.5l5 3m0-3l-5 3" />
        </>
      )}
      {kind === 'commercial' && (
        <>
          <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
          <path d="M8.8 12l2.4 2.4 4-4.6" />
        </>
      )}
      {kind === 'one-time' && (
        <>
          <rect x="3" y="6" width="18" height="12" rx="3" />
          <path d="M3 10h18M7 15h4" />
          <circle cx="17" cy="15" r="1" />
        </>
      )}
    </svg>
  );
}

/** Fallback illustration for category cards with no photo (replaces emoji). Varies by id for visual rhythm. */
export function CategoryFallbackIllustration({ seed = 0, className = '' }: { seed?: number; className?: string }) {
  const variant = seed % 3;
  const uid = `tp-cat-${seed}`;
  return (
    <svg viewBox="0 0 400 300" className={className} role="presentation" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={PAPER} />
          <stop offset="100%" stopColor={BEIGE} />
        </linearGradient>
        <pattern id={`${uid}-dots`} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill={BRONZE} fillOpacity="0.45" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill={`url(#${uid}-bg)`} />
      <rect width="400" height="300" fill={`url(#${uid}-dots)`} />
      {variant === 0 && (
        <g>
          <circle cx="200" cy="150" r="96" fill={BRONZE} fillOpacity="0.2" />
          <circle cx="200" cy="150" r="68" fill="none" stroke={BRONZE_INK} strokeOpacity="0.35" strokeDasharray="3 7" />
          <Bust x={200} y={150} scale={2.2} />
        </g>
      )}
      {variant === 1 && (
        <g>
          <rect x="110" y="70" width="180" height="150" rx="18" fill={INK} />
          <circle cx="200" cy="145" r="42" fill="none" stroke={BRONZE} strokeWidth="6" />
          <circle cx="200" cy="145" r="22" fill={BRONZE} fillOpacity="0.35" />
          <rect x="250" y="82" width="22" height="12" rx="4" fill={BRONZE} />
          <rect x="165" y="56" width="70" height="20" rx="8" fill={INK} />
        </g>
      )}
      {variant === 2 && (
        <g>
          <rect x="95" y="80" width="86" height="120" rx="12" fill={PAPER} stroke={BEIGE} strokeWidth="2" transform="rotate(-8 138 140)" />
          <rect x="219" y="80" width="86" height="120" rx="12" fill={PAPER} stroke={BEIGE} strokeWidth="2" transform="rotate(8 262 140)" />
          <rect x="157" y="62" width="86" height="130" rx="12" fill={PAPER} stroke={BRONZE_INK} strokeWidth="2" />
          <Bust x={200} y={118} scale={1.3} />
        </g>
      )}
    </svg>
  );
}
