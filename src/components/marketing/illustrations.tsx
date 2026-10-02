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

/** Team consistency — 3x2 grid of matching portrait cards, one highlighted as primary. */
export function TeamGridIllustration({ className = '' }: { className?: string }) {
  const xs = [12, 114, 216];
  const ys = [11, 105];
  return (
    <svg viewBox="0 0 320 200" className={className} role="img" aria-label="A team of matching professional portraits" fill="none">
      {ys.map((y, r) =>
        xs.map((x, c) => {
          const primary = r === 0 && c === 1;
          return (
            <g key={`${r}-${c}`}>
              <rect
                x={x}
                y={y}
                width="92"
                height="84"
                rx="12"
                fill={primary ? BEIGE : PAPER}
                fillOpacity={primary ? 0.6 : 1}
                stroke={primary ? BRONZE_INK : BEIGE}
                strokeWidth={primary ? 2 : 1}
              />
              <Bust x={x + 46} y={y + 38} scale={0.85} fill={primary ? BRONZE_INK : BRONZE} />
              <rect x={x + 26} y={y + 73} width="40" height="4" rx="2" fill={primary ? BRONZE_INK : BEIGE} />
            </g>
          );
        })
      )}
    </svg>
  );
}

/** Enterprise dashboard — dark sidebar, header bar and a grid of team portraits. */
export function EnterpriseIllustration({ className = '' }: { className?: string }) {
  const cols = [131, 234, 337];
  const rows = [100, 190];
  return (
    <svg viewBox="0 0 400 260" className={className} role="img" aria-label="Team dashboard showing a grid of team headshots" fill="none">
      <defs>
        {rows.map((cy, r) =>
          cols.map((cx, c) => (
            <clipPath key={`${r}-${c}`} id={`tp-ent-clip-${r}-${c}`}>
              <circle cx={cx} cy={cy} r="30" />
            </clipPath>
          ))
        )}
      </defs>
      <rect x="0" y="0" width="400" height="260" rx="16" fill={PAPER} stroke={BEIGE} />
      <path d="M16 0h48v260H16a16 16 0 01-16-16V16A16 16 0 0116 0z" fill={INK} />
      <circle cx="32" cy="26" r="8" fill={BRONZE} />
      {[60, 92, 124, 156].map((y, i) => (
        <g key={y}>
          <circle cx="22" cy={y} r="3" fill={i === 0 ? BRONZE : BRONZE_INK} />
          <rect x="30" y={y - 2} width="22" height="4" rx="2" fill={i === 0 ? BRONZE : BRONZE_INK} fillOpacity={i === 0 ? 1 : 0.7} />
        </g>
      ))}
      <rect x="80" y="16" width="308" height="28" rx="8" fill={BEIGE} fillOpacity="0.55" />
      <rect x="92" y="26" width="70" height="8" rx="4" fill={INK} fillOpacity="0.75" />
      <rect x="338" y="24" width="38" height="12" rx="6" fill={BRONZE} />
      {rows.map((cy, r) =>
        cols.map((cx, c) => {
          const highlighted = r === 0 && c === 1;
          return (
            <g key={`${r}-${c}`}>
              <circle cx={cx} cy={cy} r="30" fill={highlighted ? BEIGE : '#fff'} stroke={BEIGE} />
              <g clipPath={`url(#tp-ent-clip-${r}-${c})`}>
                <Bust x={cx} y={cy + 4} scale={0.8} fill={highlighted ? BRONZE_INK : BRONZE} />
              </g>
              {highlighted && <circle cx={cx} cy={cy} r="35" stroke={BRONZE} strokeWidth="3" />}
              <rect x={cx - 20} y={cy + 40} width="40" height="5" rx="2.5" fill={INK} fillOpacity="0.7" />
              <rect x={cx - 14} y={cy + 49} width="28" height="4" rx="2" fill={BEIGE} />
            </g>
          );
        })
      )}
    </svg>
  );
}

/** Before / after — casual selfie vs. polished studio portrait. */
export function BeforeAfterIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 140" className={className} role="img" aria-label="A casual selfie transformed into a polished studio portrait" fill="none">
      <defs>
        <linearGradient id="tp-ba-studio" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={PAPER} />
          <stop offset="100%" stopColor={BRONZE} />
        </linearGradient>
        <clipPath id="tp-ba-clip-before">
          <path d="M26 66c2-24 22-40 44-38 24 2 38 22 36 44-2 24-22 40-46 38-22-2-36-20-34-44z" />
        </clipPath>
        <clipPath id="tp-ba-clip-after">
          <circle cx="214" cy="70" r="46" />
        </clipPath>
      </defs>
      {/* Before: messy, off-center */}
      <path d="M26 66c2-24 22-40 44-38 24 2 38 22 36 44-2 24-22 40-46 38-22-2-36-20-34-44z" fill={BEIGE} fillOpacity="0.5" />
      <g clipPath="url(#tp-ba-clip-before)">
        <g transform="rotate(-8 60 80)">
          <Bust x={56} y={78} scale={1.1} fill={BRONZE} opacity={0.85} />
        </g>
      </g>
      <path d="M24 64c3-26 24-42 47-40M104 50c6 8 7 20 4 30M30 92c8 16 24 26 42 26" stroke={BRONZE_INK} strokeWidth="1.3" strokeLinecap="round" strokeDasharray="3 4" />
      <path d="M40 22l8 6M92 26l-6 8M20 108l9-3" stroke={BRONZE_INK} strokeOpacity="0.5" strokeWidth="1.2" strokeLinecap="round" />
      {/* Arrow */}
      <circle cx="140" cy="70" r="14" fill={INK} />
      <path d="M133 70h13m0 0l-5-5m5 5l-5 5" stroke={BRONZE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* After: clean, centered, studio gradient */}
      <circle cx="214" cy="70" r="46" fill="url(#tp-ba-studio)" />
      <g clipPath="url(#tp-ba-clip-after)">
        <Bust x={214} y={72} scale={1.25} fill={BRONZE_INK} />
      </g>
      <circle cx="214" cy="70" r="46" stroke={BRONZE_INK} strokeWidth="2" />
      <circle cx="252" cy="34" r="9" fill={INK} />
      <path d="M247.5 34l3 3 5-6" stroke={BRONZE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** LinkedIn profile card — a profile header with a polished headshot and connection info. */
export function LinkedInProfileIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 180" className={className} role="img" aria-label="LinkedIn profile with a professional headshot" fill="none">
      {/* Card background */}
      <rect x="10" y="10" width="280" height="160" rx="12" fill={PAPER} stroke={BEIGE} strokeWidth="1.5" />
      {/* Banner stripe */}
      <rect x="10" y="10" width="280" height="50" rx="12" fill={INK} />
      <rect x="10" y="40" width="280" height="20" fill={INK} />
      {/* Profile photo circle */}
      <circle cx="70" cy="62" r="32" fill={PAPER} stroke={PAPER} strokeWidth="4" />
      <circle cx="70" cy="62" r="28" fill={BEIGE} fillOpacity="0.5" />
      <Bust x={70} y={66} scale={0.85} />
      {/* Name + title */}
      <rect x="116" y="66" width="90" height="6" rx="3" fill={INK} fillOpacity="0.85" />
      <rect x="116" y="78" width="60" height="5" rx="2.5" fill={BRONZE} />
      {/* Connection count */}
      <rect x="116" y="92" width="40" height="4" rx="2" fill={BEIGE} />
      {/* CTA buttons */}
      <rect x="40" y="118" width="70" height="24" rx="12" fill={INK} />
      <rect x="53" y="127" width="44" height="6" rx="3" fill={BRONZE} />
      <rect x="120" y="118" width="70" height="24" rx="12" fill="none" stroke={INK} strokeWidth="1.5" />
      <rect x="133" y="127" width="44" height="6" rx="3" fill={INK} fillOpacity="0.6" />
      {/* Checkmark badge */}
      <circle cx="252" cy="34" r="10" fill={BRONZE_INK} />
      <path d="M247 34l3.5 3.5 5.5-7" stroke={PAPER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Stats row */}
      <rect x="40" y="152" width="220" height="4" rx="2" fill={BEIGE} fillOpacity="0.7" />
    </svg>
  );
}

/** About mission — globe with multiple diverse busts around it, representing accessibility. */
export function AboutMissionIllustration({ className = '' }: { className?: string }) {
  const people = [
    { x: 60, y: 70, s: 0.65, f: BRONZE_INK },
    { x: 140, y: 40, s: 0.8, f: BRONZE },
    { x: 220, y: 70, s: 0.65, f: BRONZE_INK },
    { x: 90, y: 120, s: 0.55, f: BRONZE },
    { x: 190, y: 120, s: 0.55, f: BRONZE },
  ];
  return (
    <svg viewBox="0 0 280 160" className={className} role="img" aria-label="People around the world accessing professional photos" fill="none">
      {/* Central dotted circle — globe metaphor */}
      <circle cx="140" cy="80" r="50" stroke={BEIGE} strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="140" cy="80" r="35" stroke={BEIGE} strokeWidth="1" strokeDasharray="3 4" />
      {/* Connecting lines from people to center */}
      {people.map((p, i) => (
        <line key={i} x1={p.x} y1={p.y - 10} x2={140} y2={80} stroke={BEIGE} strokeWidth="1" strokeDasharray="2 3" />
      ))}
      {/* People */}
      {people.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y - 14 * p.s} r={16 * p.s} fill={PAPER} stroke={BEIGE} strokeWidth="1" />
          <Bust x={p.x} y={p.y} scale={p.s} fill={p.f} />
        </g>
      ))}
      {/* Center sparkle / AI symbol */}
      <circle cx="140" cy="80" r="14" fill={INK} />
      <path d="M135 80h10M140 75v10" stroke={BRONZE} strokeWidth="2" strokeLinecap="round" />
      <circle cx="133" cy="73" r="2" fill={BRONZE} fillOpacity="0.5" />
      <circle cx="147" cy="73" r="2" fill={BRONZE} fillOpacity="0.5" />
      <circle cx="133" cy="87" r="2" fill={BRONZE} fillOpacity="0.5" />
      <circle cx="147" cy="87" r="2" fill={BRONZE} fillOpacity="0.5" />
    </svg>
  );
}

/** Free trial — phone with upload arrow + star badge, conveying easy & affordable. */
export function FreeTrialIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 160" className={className} role="img" aria-label="Upload selfies and get headshots affordably" fill="none">
      {/* Phone outline */}
      <rect x="80" y="8" width="80" height="144" rx="14" fill={PAPER} stroke={BEIGE} strokeWidth="1.5" />
      {/* Screen */}
      <rect x="88" y="24" width="64" height="100" rx="4" fill={BEIGE} fillOpacity="0.35" />
      {/* Bust in screen */}
      <Bust x={120} y={76} scale={1} />
      {/* Upload arrow on left */}
      <g opacity="0.7">
        <circle cx="40" cy="80" r="20" fill={BEIGE} fillOpacity="0.5" />
        <path d="M40 90V72m0 0l-6 6m6-6l6 6" stroke={BRONZE_INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* Arrow from upload to phone */}
      <path d="M62 80h16" stroke={BRONZE_INK} strokeWidth="1.5" strokeDasharray="3 3" />
      {/* Star/sparkle on right */}
      <g opacity="0.7">
        <circle cx="200" cy="80" r="20" fill={BEIGE} fillOpacity="0.5" />
        <path d="M200 66l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill={BRONZE_INK} />
      </g>
      {/* Arrow from phone to star */}
      <path d="M162 80h18" stroke={BRONZE_INK} strokeWidth="1.5" strokeDasharray="3 3" />
      {/* Price badge */}
      <rect x="90" y="128" width="60" height="16" rx="8" fill={INK} />
      <rect x="100" y="133" width="40" height="6" rx="3" fill={BRONZE} />
      {/* Top notch */}
      <rect x="104" y="12" width="32" height="6" rx="3" fill={BEIGE} fillOpacity="0.6" />
    </svg>
  );
}

/** Pricing tiers — three ascending cards, the middle one highlighted. */
export function PricingVisualIllustration({ className = '' }: { className?: string }) {
  const cards = [
    { x: 6, y: 50, w: 62, h: 84, s: 0.7 },
    { x: 78, y: 30, w: 76, h: 104, s: 0.9 },
    { x: 164, y: 10, w: 90, h: 124, s: 1.1 },
  ];
  return (
    <svg viewBox="0 0 260 140" className={className} role="img" aria-label="Three pricing tiers of increasing size" fill="none">
      {cards.map((c, i) => {
        const highlighted = i === 1;
        const cx = c.x + c.w / 2;
        const lineY = c.y + c.h * 0.68;
        return (
          <g key={i}>
            <rect
              x={c.x}
              y={c.y}
              width={c.w}
              height={c.h}
              rx="10"
              fill={highlighted ? BEIGE : PAPER}
              fillOpacity={highlighted ? 0.6 : 1}
              stroke={highlighted ? BRONZE_INK : BEIGE}
              strokeWidth={highlighted ? 2 : 1}
            />
            <Bust x={cx} y={c.y + c.h * 0.34} scale={c.s} fill={highlighted ? BRONZE_INK : BRONZE} />
            <rect x={c.x + c.w * 0.18} y={lineY} width={c.w * 0.64} height="4" rx="2" fill={highlighted ? BRONZE_INK : INK} fillOpacity={highlighted ? 1 : 0.7} />
            <rect x={c.x + c.w * 0.26} y={lineY + 9} width={c.w * 0.48} height="4" rx="2" fill={BEIGE} />
            <rect x={c.x + c.w * 0.32} y={lineY + 18} width={c.w * 0.36} height="4" rx="2" fill={BEIGE} />
          </g>
        );
      })}
    </svg>
  );
}

/** Question mark glyph drawn as a stroke path, centered on (x, y). */
function QMark({ x = 0, y = 0, scale = 1, color = BRONZE_INK, dot = color }: { x?: number; y?: number; scale?: number; color?: string; dot?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-6 -6c0-11 12-11 12 0c0 6-6 7-6 13" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="0" cy="13" r="1.9" fill={dot} />
    </g>
  );
}

/** FAQ — three overlapping chat bubbles with question marks, joined by dotted lines. */
export function FAQIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 160" className={className} aria-hidden="true" focusable="false" fill="none">
      {/* Dotted connections */}
      <path d="M46 72C46 52 60 46 82 48" stroke={BRONZE} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 5" />
      <path d="M216 86C216 66 202 58 178 58" stroke={BRONZE} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 5" />
      <path d="M74 128C92 140 120 142 140 134" stroke={BRONZE} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 5" />
      {/* Left small bubble */}
      <path d="M26 72h40a12 12 0 0112 12v22a12 12 0 01-12 12H44l-12 12v-12h-6a12 12 0 01-12-12V84a12 12 0 0112-12z" fill={PAPER} stroke={BRONZE_INK} strokeWidth="1.5" strokeLinejoin="round" />
      <QMark x={46} y={92} scale={0.7} color={BRONZE_INK} />
      {/* Right small bubble */}
      <path d="M200 86h30a12 12 0 0112 12v20a12 12 0 01-12 12h-4v12l-12-12h-14a12 12 0 01-12-12V98a12 12 0 0112-12z" fill={BEIGE} fillOpacity="0.55" stroke={BRONZE} strokeWidth="1.5" strokeLinejoin="round" />
      <QMark x={209} y={104} scale={0.62} color={BRONZE_INK} />
      {/* Center large bubble */}
      <path d="M96 20h68a16 16 0 0116 16v44a16 16 0 01-16 16h-44l-18 18V96h-6a16 16 0 01-16-16V36a16 16 0 0116-16z" fill={INK} stroke={BRONZE} strokeWidth="1.5" strokeLinejoin="round" />
      <QMark x={130} y={50} scale={1.25} color={BRONZE} />
      {/* Accent dots */}
      <circle cx="236" cy="38" r="3" fill={BRONZE} fillOpacity="0.6" />
      <circle cx="22" cy="40" r="2.5" fill={BEIGE} />
    </svg>
  );
}

/** Tools — photo frame with crop handles, scissors on the left, magic wand on the right (for dark backgrounds). */
export function ToolsIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 160" className={className} aria-hidden="true" focusable="false" fill="none">
      {/* Frame */}
      <rect x="90" y="30" width="100" height="100" rx="6" fill={PAPER} fillOpacity="0.06" stroke={PAPER} strokeOpacity="0.55" strokeWidth="1.5" />
      <path d="M123.3 30v100M156.7 30v100M90 63.3h100M90 96.7h100" stroke={PAPER} strokeOpacity="0.18" strokeWidth="1" strokeDasharray="3 4" />
      <Bust x={140} y={88} scale={1.15} fill={BRONZE} opacity={0.7} />
      {/* Crop handles */}
      <g stroke={BRONZE} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M82 46V22h24" />
        <path d="M174 22h24v24" />
        <path d="M82 114v24h24" />
        <path d="M198 114v24h-24" />
      </g>
      {/* Scissors */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M33 101L50 56" stroke={PAPER} strokeWidth="2.5" />
        <path d="M47 101L30 56" stroke={PAPER} strokeWidth="2.5" />
        <circle cx="30" cy="109" r="8" stroke={BRONZE} strokeWidth="2.5" />
        <circle cx="50" cy="109" r="8" stroke={BRONZE} strokeWidth="2.5" />
        <circle cx="40" cy="82" r="2.2" fill={BRONZE} />
      </g>
      <path d="M60 84h18" stroke={BRONZE} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 5" />
      {/* Magic wand */}
      <path d="M212 122l26-38" stroke={PAPER} strokeWidth="5" strokeLinecap="round" />
      <path d="M232 92l6-8" stroke={BRONZE} strokeWidth="5" strokeLinecap="round" />
      <path d="M252 46l3.5 10.5L266 60l-10.5 3.5L252 74l-3.5-10.5L238 60l10.5-3.5z" fill={BRONZE} />
      <path d="M229 38v8M225 42h8" stroke={PAPER} strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M268 90v8M264 94h8" stroke={PAPER} strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="222" cy="64" r="2" fill={BRONZE} fillOpacity="0.7" />
    </svg>
  );
}

/** Technology — pipeline from a casual selfie, through a neural-network hexagon, to a polished headshot. */
export function TechnologyIllustration({ className = '' }: { className?: string }) {
  const layers = [
    [[134, 68], [134, 92]],
    [[150, 60], [150, 80], [150, 100]],
    [[166, 72], [166, 88]],
  ];
  const links: Array<[number[], number[]]> = [];
  for (let l = 0; l < layers.length - 1; l++) {
    for (const a of layers[l]) for (const b of layers[l + 1]) links.push([a, b]);
  }
  return (
    <svg viewBox="0 0 300 160" className={className} aria-hidden="true" focusable="false" fill="none">
      <defs>
        <clipPath id="tp-tech-clip-l">
          <circle cx="48" cy="80" r="35" />
        </clipPath>
        <clipPath id="tp-tech-clip-r">
          <circle cx="252" cy="80" r="35" />
        </clipPath>
      </defs>
      {/* Input: casual selfie */}
      <circle cx="48" cy="80" r="36" fill={BEIGE} fillOpacity="0.3" stroke={BEIGE} strokeWidth="1.5" strokeDasharray="4 4" />
      <g clipPath="url(#tp-tech-clip-l)">
        <g transform="rotate(-10 50 90)">
          <Bust x={46} y={88} scale={0.95} fill={BRONZE} opacity={0.85} />
        </g>
      </g>
      {/* Arrows */}
      <path d="M90 80h22m0 0l-5-5m5 5l-5 5" stroke={BRONZE_INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M188 80h22m0 0l-5-5m5 5l-5 5" stroke={BRONZE_INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Neural hexagon */}
      <path d="M150 44l31 18v36l-31 18-31-18V62z" fill={INK} stroke={BRONZE} strokeWidth="1.5" strokeLinejoin="round" />
      {links.map(([a, b], i) => (
        <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={BRONZE} strokeOpacity="0.55" strokeWidth="1" />
      ))}
      {layers.flat().map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill={BRONZE} />
      ))}
      {/* Output: polished headshot */}
      <circle cx="252" cy="80" r="36" fill={BEIGE} fillOpacity="0.6" stroke={BRONZE_INK} strokeWidth="2" />
      <g clipPath="url(#tp-tech-clip-r)">
        <Bust x={252} y={86} scale={1.05} fill={BRONZE_INK} />
      </g>
      <circle cx="278" cy="52" r="9" fill={INK} />
      <path d="M273.5 52l3 3 5-6" stroke={BRONZE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Photo tips — phone taking a selfie with a head-and-shoulders guide, window light rays behind. */
export function PhotoTipsIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 180" className={className} aria-hidden="true" focusable="false" fill="none">
      {/* Window */}
      <rect x="10" y="14" width="96" height="120" rx="6" fill={BRONZE} fillOpacity="0.12" stroke={BEIGE} strokeWidth="1.5" />
      <path d="M58 14v120M10 74h96" stroke={BEIGE} strokeWidth="1.5" />
      <rect x="4" y="134" width="108" height="6" rx="3" fill={BEIGE} />
      <circle cx="32" cy="40" r="8" fill={BRONZE} fillOpacity="0.55" />
      {/* Light rays */}
      <g stroke={BRONZE} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 5" strokeOpacity="0.8">
        <path d="M108 36l36 28" />
        <path d="M108 64l36 28" />
        <path d="M108 92l36 26" />
      </g>
      {/* Phone */}
      <rect x="148" y="18" width="92" height="152" rx="16" fill={INK} />
      <rect x="154" y="28" width="80" height="132" rx="10" fill={PAPER} />
      <rect x="154" y="28" width="80" height="132" rx="10" fill={BEIGE} fillOpacity="0.35" />
      <rect x="178" y="21" width="32" height="4" rx="2" fill={BRONZE_INK} />
      <Bust x={194} y={100} scale={1.2} fill={BRONZE} opacity={0.55} />
      {/* Head-and-shoulders guide */}
      <ellipse cx="194" cy="82" rx="20" ry="24" stroke={BRONZE_INK} strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M160 152c0-26 14-38 34-38s34 12 34 38" stroke={BRONZE_INK} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" />
      <path d="M160 40h10M160 40v10M228 40h-10M228 40v10" stroke={BRONZE_INK} strokeWidth="1.5" strokeLinecap="round" />
      {/* Sparkle */}
      <path d="M124 16l2.4 7.2L134 25.6l-7.6 2.4L124 35l-2.4-7-7.6-2.4 7.6-2.4z" fill={BRONZE} />
    </svg>
  );
}

/** Use cases — staggered LinkedIn card, resume and ID badge, each with a headshot. */
export function UseCasesIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 160" className={className} aria-hidden="true" focusable="false" fill="none">
      <defs>
        <clipPath id="tp-uc-clip-a">
          <circle cx="38" cy="48" r="14" />
        </clipPath>
        <clipPath id="tp-uc-clip-b">
          <circle cx="122" cy="72" r="15" />
        </clipPath>
        <clipPath id="tp-uc-clip-c">
          <circle cx="236" cy="62" r="24" />
        </clipPath>
      </defs>
      {/* LinkedIn card */}
      <rect x="10" y="16" width="116" height="84" rx="10" fill={PAPER} stroke={BEIGE} strokeWidth="1.5" />
      <rect x="10" y="16" width="116" height="26" rx="10" fill={INK} />
      <rect x="10" y="30" width="116" height="12" fill={INK} />
      <circle cx="38" cy="48" r="16" fill={PAPER} />
      <circle cx="38" cy="48" r="14" fill={BEIGE} />
      <g clipPath="url(#tp-uc-clip-a)">
        <Bust x={38} y={55} scale={0.5} />
      </g>
      <rect x="24" y="68" width="56" height="5" rx="2.5" fill={INK} fillOpacity="0.85" />
      <rect x="24" y="78" width="38" height="4" rx="2" fill={BRONZE} />
      <rect x="24" y="88" width="34" height="7" rx="3.5" fill={INK} />
      {/* Resume */}
      <rect x="96" y="44" width="100" height="104" rx="8" fill={PAPER} stroke={BEIGE} strokeWidth="1.5" />
      <circle cx="122" cy="72" r="15" fill={BEIGE} />
      <g clipPath="url(#tp-uc-clip-b)">
        <Bust x={122} y={79} scale={0.52} />
      </g>
      <circle cx="122" cy="72" r="15" stroke={BRONZE_INK} strokeWidth="1.2" />
      <rect x="144" y="62" width="40" height="5" rx="2.5" fill={INK} fillOpacity="0.85" />
      <rect x="144" y="72" width="28" height="4" rx="2" fill={BRONZE} />
      <rect x="108" y="94" width="76" height="1.5" rx="0.75" fill={BEIGE} />
      <rect x="108" y="104" width="76" height="4" rx="2" fill={BEIGE} />
      <rect x="108" y="114" width="64" height="4" rx="2" fill={BEIGE} />
      <rect x="108" y="124" width="70" height="4" rx="2" fill={BEIGE} />
      <rect x="108" y="134" width="50" height="4" rx="2" fill={BEIGE} />
      {/* ID badge */}
      <rect x="186" y="12" width="100" height="120" rx="10" fill={INK} stroke={PAPER} strokeWidth="2" />
      <rect x="225" y="20" width="22" height="5" rx="2.5" fill={BRONZE} fillOpacity="0.5" />
      <circle cx="236" cy="62" r="24" fill={BRONZE} fillOpacity="0.25" />
      <g clipPath="url(#tp-uc-clip-c)">
        <Bust x={236} y={70} scale={0.9} fill={BRONZE} />
      </g>
      <circle cx="236" cy="62" r="24" stroke={BRONZE} strokeWidth="1.5" />
      <rect x="210" y="94" width="52" height="6" rx="3" fill={BRONZE} />
      <rect x="218" y="105" width="36" height="4" rx="2" fill={BEIGE} fillOpacity="0.6" />
      <rect x="210" y="116" width="52" height="8" rx="2" fill={BRONZE} fillOpacity="0.4" />
    </svg>
  );
}

/** Blog — open journal with abstract text, a camera lens overlapping bottom-right and a sparkle. */
export function BlogIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 160" className={className} aria-hidden="true" focusable="false" fill="none">
      {/* Page stack */}
      <path d="M28 124c32-8 78-6 92 2c14-8 60-10 92-2" stroke={BEIGE} strokeWidth="1.5" strokeLinecap="round" />
      {/* Open pages */}
      <path d="M120 38c-14-8-60-10-92-2v82c32-8 78-6 92 2z" fill={PAPER} stroke={BRONZE_INK} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M120 38c14-8 60-10 92-2v82c-32-8-78-6-92 2z" fill={PAPER} stroke={BRONZE_INK} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M120 38v82" stroke={BRONZE_INK} strokeWidth="1.5" />
      {/* Left page text */}
      <g stroke={BEIGE} strokeWidth="3" strokeLinecap="round">
        <path d="M40 56h62" />
        <path d="M40 68h62" />
        <path d="M40 80h50" />
        <path d="M40 92h58" />
        <path d="M40 104h38" />
      </g>
      {/* Right page: heading, image, text */}
      <path d="M134 54h40" stroke={INK} strokeOpacity="0.8" strokeWidth="4" strokeLinecap="round" />
      <path d="M134 66h58" stroke={BEIGE} strokeWidth="3" strokeLinecap="round" />
      <rect x="134" y="78" width="30" height="22" rx="3" fill={BEIGE} fillOpacity="0.6" stroke={BRONZE} />
      <circle cx="149" cy="86" r="3.5" fill={BRONZE_INK} />
      <path d="M137 98c2-6 6-8 12-8s9 3 12 8z" fill={BRONZE_INK} />
      <path d="M172 84h20M172 94h16" stroke={BEIGE} strokeWidth="3" strokeLinecap="round" />
      <path d="M134 108h40" stroke={BEIGE} strokeWidth="3" strokeLinecap="round" />
      {/* Camera lens */}
      <circle cx="192" cy="116" r="28" fill={PAPER} />
      <circle cx="192" cy="116" r="26" fill={INK} />
      <circle cx="192" cy="116" r="19" stroke={BRONZE} strokeWidth="3" />
      <circle cx="192" cy="116" r="11" fill={BRONZE} fillOpacity="0.3" stroke={BRONZE} strokeWidth="1.5" />
      <circle cx="186" cy="110" r="3" fill={PAPER} fillOpacity="0.85" />
      {/* Sparkle */}
      <path d="M210 14l2.8 8.2L221 25l-8.2 2.8L210 36l-2.8-8.2L199 25l8.2-2.8z" fill={BRONZE} />
      <circle cx="228" cy="44" r="2" fill={BRONZE} fillOpacity="0.7" />
      <circle cx="192" cy="18" r="1.5" fill={BRONZE_INK} />
    </svg>
  );
}
