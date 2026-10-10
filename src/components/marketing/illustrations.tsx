// Marketing illustrations — a mix of inline SVG patterns/icons (HeroPattern, TrustGlyph)
// and Unsplash-photo components that replaced the old SVG bust silhouettes.
// Unsplash is whitelisted in next.config.mjs remotePatterns.

import Image from 'next/image';
import { portrait, square } from '@/config/stock-portraits';

const BRONZE = '#C9A98A';
const BRONZE_INK = '#76563D';
const BEIGE = '#DCCDBB';
const PAPER = '#F8F5EF';
const INK = '#171613';

/* ------------------------------------------------------------------ */
/*  SVG-only components (no busts — kept as inline SVG)                */
/* ------------------------------------------------------------------ */

/** Premium hero background with subtle dot/grid pattern and warm gradient orbs. */
export function HeroPattern({ className = '' }: { className?: string }) {
  return (
    <>
      {/* Warm gradient orbs — depth & luxury feel */}
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
        {/* Top-left warm glow */}
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,169,138,0.12) 0%, transparent 70%)' }} />
        {/* Bottom-right subtle glow */}
        <div className="absolute -bottom-[15%] -right-[10%] w-[50%] h-[50%] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(220,205,187,0.15) 0%, transparent 65%)' }} />
        {/* Center accent for depth */}
        <div className="absolute top-[30%] left-[40%] w-[35%] h-[35%] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,169,138,0.06) 0%, transparent 60%)' }} />
      </div>
      <svg
        className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <pattern id="tp-hero-dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill={BRONZE} fillOpacity="0.18" />
          </pattern>
          <pattern id="tp-hero-grid" width="96" height="96" patternUnits="userSpaceOnUse">
            <path d="M96 0H0V96" fill="none" stroke={BRONZE} strokeOpacity="0.08" strokeWidth="0.5" />
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
    </>
  );
}

/** Custom trust-badge glyphs (stroke icons, 24x24, currentColor). */
export function TrustGlyph({ kind, className = '' }: { kind: 'no-subscription' | 'auto-delete' | 'commercial' | 'one-time' | 'guarantee'; className?: string }) {
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
      {kind === 'guarantee' && (
        <>
          <circle cx="12" cy="10" r="6" />
          <path d="M8.5 14.5L7 21l5-2.5L17 21l-1.5-6.5" />
          <path d="M9.5 10l1.5 1.5 3-3" />
        </>
      )}
    </svg>
  );
}

/** FAQ — three overlapping chat bubbles with question marks. */
export function FAQIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 160" className={className} aria-hidden="true" focusable="false" fill="none">
      <path d="M46 72C46 52 60 46 82 48" stroke={BRONZE} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 5" />
      <path d="M216 86C216 66 202 58 178 58" stroke={BRONZE} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 5" />
      <path d="M74 128C92 140 120 142 140 134" stroke={BRONZE} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 5" />
      <path d="M26 72h40a12 12 0 0112 12v22a12 12 0 01-12 12H44l-12 12v-12h-6a12 12 0 01-12-12V84a12 12 0 0112-12z" fill={PAPER} stroke={BRONZE_INK} strokeWidth="1.5" strokeLinejoin="round" />
      <QMark x={46} y={92} scale={0.7} color={BRONZE_INK} />
      <path d="M200 86h30a12 12 0 0112 12v20a12 12 0 01-12 12h-4v12l-12-12h-14a12 12 0 01-12-12V98a12 12 0 0112-12z" fill={BEIGE} fillOpacity="0.55" stroke={BRONZE} strokeWidth="1.5" strokeLinejoin="round" />
      <QMark x={209} y={104} scale={0.62} color={BRONZE_INK} />
      <path d="M96 20h68a16 16 0 0116 16v44a16 16 0 01-16 16h-44l-18 18V96h-6a16 16 0 01-16-16V36a16 16 0 0116-16z" fill={INK} stroke={BRONZE} strokeWidth="1.5" strokeLinejoin="round" />
      <QMark x={130} y={50} scale={1.25} color={BRONZE} />
      <circle cx="236" cy="38" r="3" fill={BRONZE} fillOpacity="0.6" />
      <circle cx="22" cy="40" r="2.5" fill={BEIGE} />
    </svg>
  );
}

function QMark({ x = 0, y = 0, scale = 1, color = BRONZE_INK, dot = color }: { x?: number; y?: number; scale?: number; color?: string; dot?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-6 -6c0-11 12-11 12 0c0 6-6 7-6 13" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="0" cy="13" r="1.9" fill={dot} />
    </g>
  );
}

/** Blog — open journal with camera lens and sparkle. */
export function BlogIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 160" className={className} aria-hidden="true" focusable="false" fill="none">
      <path d="M28 124c32-8 78-6 92 2c14-8 60-10 92-2" stroke={BEIGE} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M120 38c-14-8-60-10-92-2v82c32-8 78-6 92 2z" fill={PAPER} stroke={BRONZE_INK} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M120 38c14-8 60-10 92-2v82c-32-8-78-6-92 2z" fill={PAPER} stroke={BRONZE_INK} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M120 38v82" stroke={BRONZE_INK} strokeWidth="1.5" />
      <g stroke={BEIGE} strokeWidth="3" strokeLinecap="round">
        <path d="M40 56h62" />
        <path d="M40 68h62" />
        <path d="M40 80h50" />
        <path d="M40 92h58" />
        <path d="M40 104h38" />
      </g>
      <path d="M134 54h40" stroke={INK} strokeOpacity="0.8" strokeWidth="4" strokeLinecap="round" />
      <path d="M134 66h58" stroke={BEIGE} strokeWidth="3" strokeLinecap="round" />
      <rect x="134" y="78" width="30" height="22" rx="3" fill={BEIGE} fillOpacity="0.6" stroke={BRONZE} />
      <circle cx="149" cy="86" r="3.5" fill={BRONZE_INK} />
      <path d="M137 98c2-6 6-8 12-8s9 3 12 8z" fill={BRONZE_INK} />
      <path d="M172 84h20M172 94h16" stroke={BEIGE} strokeWidth="3" strokeLinecap="round" />
      <path d="M134 108h40" stroke={BEIGE} strokeWidth="3" strokeLinecap="round" />
      <circle cx="192" cy="116" r="28" fill={PAPER} />
      <circle cx="192" cy="116" r="26" fill={INK} />
      <circle cx="192" cy="116" r="19" stroke={BRONZE} strokeWidth="3" />
      <circle cx="192" cy="116" r="11" fill={BRONZE} fillOpacity="0.3" stroke={BRONZE} strokeWidth="1.5" />
      <circle cx="186" cy="110" r="3" fill={PAPER} fillOpacity="0.85" />
      <path d="M210 14l2.8 8.2L221 25l-8.2 2.8L210 36l-2.8-8.2L199 25l8.2-2.8z" fill={BRONZE} />
      <circle cx="228" cy="44" r="2" fill={BRONZE} fillOpacity="0.7" />
      <circle cx="192" cy="18" r="1.5" fill={BRONZE_INK} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Photo-based components (replaced SVG bust illustrations)           */
/*  Each uses Unsplash portraits via stock-portraits helpers.          */
/* ------------------------------------------------------------------ */

/** Reusable portrait card with rounded corners and brand border. */
function PortraitCard({
  photoId,
  alt,
  size = 'portrait',
  className = '',
  highlight = false,
}: {
  photoId: string;
  alt: string;
  size?: 'portrait' | 'square';
  className?: string;
  highlight?: boolean;
}) {
  const src = size === 'square' ? square(photoId) : portrait(photoId);
  return (
    <div
      className={`relative overflow-hidden rounded-tp-card ${
        highlight ? 'ring-2 ring-tp-bronze' : 'ring-1 ring-tp-line'
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={size === 'square' ? 400 : 600}
        height={size === 'square' ? 400 : 800}
        className="h-full w-full object-cover"
        sizes="(max-width: 640px) 50vw, 200px"
        loading="lazy"
      />
    </div>
  );
}

/** Step 1 — pick a style: three portrait thumbnails, center one selected. */
export function StepStyleIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-end justify-center gap-2 ${className}`} role="img" aria-label="Choose a photo style">
      <PortraitCard photoId="photo-1573496359142-b8d87734a5a2" alt="Professional woman" size="square" className="h-16 w-12 opacity-60" />
      <div className="relative">
        <PortraitCard photoId="photo-1560250097-0b93528c311a" alt="Businessman in suit" size="square" className="h-20 w-16" highlight />
        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-tp-ink">
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="#C9A98A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8l3.5 3.5L13 5" />
          </svg>
        </div>
      </div>
      <PortraitCard photoId="photo-1494790108377-be9c29b29330" alt="Young professional woman" size="square" className="h-16 w-12 opacity-60" />
    </div>
  );
}

/** Step 2 — upload selfies: grid of portrait thumbnails with an upload placeholder. */
export function StepUploadIllustration({ className = '' }: { className?: string }) {
  const photos = [
    { id: 'photo-1507003211169-0a1dd7228f2d', alt: 'Man with warm smile' },
    { id: 'photo-1580489944761-15a19d654956', alt: 'Confident woman' },
    { id: 'photo-1534528741775-53994a69daeb', alt: 'Woman with natural hairstyle' },
    { id: 'photo-1472099645785-5658abf4ff4e', alt: 'Professional man' },
    { id: 'photo-1519085360753-af0119f7cbe7', alt: 'Young man' },
  ];
  return (
    <div className={`grid grid-cols-3 gap-1.5 ${className}`} role="img" aria-label="Upload your selfies">
      {photos.map((p) => (
        <PortraitCard key={p.id} photoId={p.id} alt={p.alt} size="square" className="aspect-square w-full" />
      ))}
      <div className="flex aspect-square w-full items-center justify-center rounded-tp-card border-2 border-dashed border-tp-bronze-ink bg-tp-paper">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-tp-bronze-ink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5m0 0l-5 5m5-5l5 5" />
        </svg>
      </div>
    </div>
  );
}

/** Step 3 — download portraits: before/after pair with arrow. */
export function StepDownloadIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} role="img" aria-label="Download your portraits">
      <div className="relative h-16 w-12 overflow-hidden rounded-lg border border-tp-line bg-tp-beige/30">
        <Image
          src={square('photo-1507003211169-0a1dd7228f2d')}
          alt="Casual selfie"
          width={96}
          height={96}
          className="h-full w-full object-cover opacity-60 grayscale-[30%]"
          sizes="48px"
        />
      </div>
      <svg viewBox="0 0 32 32" className="h-6 w-6 shrink-0" fill="none">
        <circle cx="16" cy="16" r="12" fill={INK} />
        <path d="M11 16h9m0 0l-4-4m4 4l-4 4" stroke={BRONZE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="relative">
        <PortraitCard photoId="photo-1560250097-0b93528c311a" alt="Polished professional headshot" size="square" className="h-20 w-16" highlight />
        <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-tp-bronze ring-2 ring-tp-paper">
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 4v7m0 0l-3-3m3 3l3-3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/** Fallback illustration for category cards with no photo. */
export function CategoryFallbackIllustration({ seed = 0, className = '' }: { seed?: number; className?: string }) {
  // Pick a portrait deterministically based on seed
  const photos = [
    'photo-1573496359142-b8d87734a5a2',
    'photo-1560250097-0b93528c311a',
    'photo-1580489944761-15a19d654956',
    'photo-1507003211169-0a1dd7228f2d',
    'photo-1494790108377-be9c29b29330',
    'photo-1539571696357-5a69c17a67c6',
    'photo-1519085360753-af0119f7cbe7',
    'photo-1534528741775-53994a69daeb',
    'photo-1556157382-97ede2916cd2',
    'photo-1544005313-94ddf0286df2',
  ];
  const photoId = photos[seed % photos.length];
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-tp-paper to-tp-beige ${className}`}>
      <Image
        src={portrait(photoId)}
        alt="Professional headshot example"
        width={400}
        height={300}
        className="h-full w-full object-cover"
        sizes="(max-width: 640px) 100vw, 400px"
      />
      {/* Subtle dot overlay for brand consistency */}
      <div className="pointer-events-none absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle, ${BRONZE} 1px, transparent 1px)`,
        backgroundSize: '18px 18px',
      }} />
    </div>
  );
}

/** Team consistency — 3x2 grid of matching portrait cards. */
export function TeamGridIllustration({ className = '' }: { className?: string }) {
  const team = [
    { id: 'photo-1573496359142-b8d87734a5a2', alt: 'Professional woman in navy blazer' },
    { id: 'photo-1560250097-0b93528c311a', alt: 'Businessman in dark suit' },
    { id: 'photo-1494790108377-be9c29b29330', alt: 'Young professional woman' },
    { id: 'photo-1507003211169-0a1dd7228f2d', alt: 'Man with warm smile' },
    { id: 'photo-1580489944761-15a19d654956', alt: 'Confident woman' },
    { id: 'photo-1519085360753-af0119f7cbe7', alt: 'Young man in white shirt' },
  ];
  return (
    <div className={`grid grid-cols-3 gap-2 ${className}`} role="img" aria-label="A team of matching professional portraits">
      {team.map((p, i) => (
        <PortraitCard key={p.id} photoId={p.id} alt={p.alt} size="square" className="aspect-square w-full" highlight={i === 1} />
      ))}
    </div>
  );
}

/** Enterprise dashboard — dark card with a grid of team portrait circles. */
export function EnterpriseIllustration({ className = '' }: { className?: string }) {
  const members = [
    { id: 'photo-1573496359142-b8d87734a5a2', alt: 'Team member' },
    { id: 'photo-1560250097-0b93528c311a', alt: 'Team member' },
    { id: 'photo-1534528741775-53994a69daeb', alt: 'Team member' },
    { id: 'photo-1507003211169-0a1dd7228f2d', alt: 'Team member' },
    { id: 'photo-1494790108377-be9c29b29330', alt: 'Team member' },
    { id: 'photo-1472099645785-5658abf4ff4e', alt: 'Team member' },
  ];
  return (
    <div className={`overflow-hidden rounded-tp-card bg-tp-paper ring-1 ring-tp-line ${className}`} role="img" aria-label="Team dashboard showing headshots">
      {/* Simulated sidebar + header */}
      <div className="flex">
        <div className="w-12 shrink-0 bg-tp-ink p-2">
          <div className="mx-auto h-4 w-4 rounded-full bg-tp-bronze" />
          <div className="mt-4 space-y-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-1.5 rounded-full bg-tp-bronze-ink" style={{ opacity: i === 0 ? 1 : 0.5 }} />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between border-b border-tp-line bg-tp-beige/30 px-3 py-2">
            <div className="h-2 w-16 rounded bg-tp-ink/60" />
            <div className="h-3 w-10 rounded-full bg-tp-bronze" />
          </div>
          <div className="grid grid-cols-3 gap-2 p-3">
            {members.map((m, i) => (
              <div key={m.id} className="flex flex-col items-center">
                <div className={`relative h-10 w-10 overflow-hidden rounded-full ${i === 1 ? 'ring-2 ring-tp-bronze' : 'ring-1 ring-tp-line'}`}>
                  <Image src={square(m.id)} alt={m.alt} width={80} height={80} className="h-full w-full object-cover" sizes="40px" />
                </div>
                <div className="mt-1 h-1 w-6 rounded bg-tp-ink/50" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Before / after — casual selfie vs. polished studio portrait. */
export function BeforeAfterIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} role="img" aria-label="A casual selfie transformed into a polished studio portrait">
      {/* Before */}
      <div className="relative h-24 w-20 rotate-[-4deg] overflow-hidden rounded-xl border-2 border-dashed border-tp-line bg-tp-beige/30">
        <Image
          src={square('photo-1507003211169-0a1dd7228f2d')}
          alt="Casual selfie"
          width={160}
          height={200}
          className="h-full w-full object-cover opacity-70 grayscale-[20%]"
          sizes="80px"
        />
      </div>
      {/* Arrow */}
      <svg viewBox="0 0 32 32" className="h-7 w-7 shrink-0" fill="none">
        <circle cx="16" cy="16" r="14" fill={INK} />
        <path d="M10 16h11m0 0l-5-5m5 5l-5 5" stroke={BRONZE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* After */}
      <div className="relative h-28 w-[88px] overflow-hidden rounded-xl ring-2 ring-tp-bronze">
        <Image
          src={portrait('photo-1560250097-0b93528c311a')}
          alt="Polished studio headshot"
          width={176}
          height={224}
          className="h-full w-full object-cover"
          sizes="88px"
        />
        <div className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-tp-ink">
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="#C9A98A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8l3.5 3.5L13 5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/** LinkedIn profile card — profile header with a real headshot. */
export function LinkedInProfileIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-tp-card bg-tp-paper ring-1 ring-tp-line ${className}`} role="img" aria-label="LinkedIn profile with a professional headshot">
      {/* Banner */}
      <div className="h-10 bg-tp-ink" />
      {/* Profile */}
      <div className="relative px-3 pb-3">
        <div className="-mt-6 mb-2 flex items-end gap-3">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-tp-paper ring-1 ring-tp-line">
            <Image
              src={square('photo-1573496359142-b8d87734a5a2')}
              alt="Professional headshot"
              width={112}
              height={112}
              className="h-full w-full object-cover"
              sizes="56px"
            />
          </div>
          <div className="mb-1 flex-1">
            <div className="h-2 w-20 rounded bg-tp-ink/80" />
            <div className="mt-1.5 h-1.5 w-14 rounded bg-tp-bronze" />
          </div>
          <div className="absolute right-3 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-tp-bronze-ink">
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke={PAPER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8l3.5 3.5L13 5" />
            </svg>
          </div>
        </div>
        <div className="mt-1 h-1 w-10 rounded bg-tp-beige" />
        <div className="mt-2 flex gap-2">
          <div className="h-5 w-16 rounded-full bg-tp-ink" />
          <div className="h-5 w-16 rounded-full border border-tp-ink" />
        </div>
      </div>
    </div>
  );
}

/** About mission — diverse portrait circles connected by dotted lines. */
export function AboutMissionIllustration({ className = '' }: { className?: string }) {
  const people = [
    { id: 'photo-1573496359142-b8d87734a5a2', alt: 'Professional woman', pos: 'left-4 top-2' },
    { id: 'photo-1560250097-0b93528c311a', alt: 'Businessman', pos: 'left-1/2 -translate-x-1/2 top-0' },
    { id: 'photo-1534528741775-53994a69daeb', alt: 'Woman with natural hairstyle', pos: 'right-4 top-2' },
    { id: 'photo-1507003211169-0a1dd7228f2d', alt: 'Man with warm smile', pos: 'left-8 bottom-0' },
    { id: 'photo-1494790108377-be9c29b29330', alt: 'Young professional woman', pos: 'right-8 bottom-0' },
  ];
  return (
    <div className={`relative ${className}`} role="img" aria-label="People around the world accessing professional photos" style={{ minHeight: 120 }}>
      {/* Center AI symbol */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tp-ink">
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="#C9A98A" strokeWidth="2" strokeLinecap="round">
            <path d="M4 8h8M8 4v8" />
          </svg>
        </div>
      </div>
      {/* People circles */}
      {people.map((p) => (
        <div key={p.id} className={`absolute ${p.pos} h-10 w-10 overflow-hidden rounded-full border border-tp-beige`}>
          <Image src={square(p.id)} alt={p.alt} width={80} height={80} className="h-full w-full object-cover" sizes="40px" />
        </div>
      ))}
    </div>
  );
}

/** Free trial — phone frame with a portrait inside, upload + sparkle icons. */
export function FreeTrialIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} role="img" aria-label="Upload selfies and get headshots affordably">
      {/* Upload icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tp-beige/50">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-tp-bronze-ink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5m0 0l-5 5m5-5l5 5" />
        </svg>
      </div>
      {/* Phone */}
      <div className="relative overflow-hidden rounded-2xl bg-tp-paper ring-1 ring-tp-line" style={{ width: 80, height: 140 }}>
        <div className="mx-auto mt-1 h-1.5 w-8 rounded-full bg-tp-beige/60" />
        <div className="mx-2 mt-1.5 overflow-hidden rounded-lg" style={{ height: 100 }}>
          <Image
            src={portrait('photo-1560250097-0b93528c311a')}
            alt="Professional headshot on phone"
            width={152}
            height={200}
            className="h-full w-full object-cover"
            sizes="76px"
          />
        </div>
        <div className="mx-auto mt-1.5 h-3 w-14 rounded-full bg-tp-ink">
          <div className="mx-auto h-full w-10 rounded-full bg-tp-bronze opacity-80" />
        </div>
      </div>
      {/* Sparkle */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tp-beige/50">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-tp-bronze-ink" fill="none">
          <path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

/** Pricing tiers — three ascending portrait cards. */
export function PricingVisualIllustration({ className = '' }: { className?: string }) {
  const tiers = [
    { id: 'photo-1494790108377-be9c29b29330', alt: 'Lite plan portrait', h: 'h-16' },
    { id: 'photo-1560250097-0b93528c311a', alt: 'Professional plan portrait', h: 'h-20' },
    { id: 'photo-1573496359142-b8d87734a5a2', alt: 'Executive plan portrait', h: 'h-24' },
  ];
  return (
    <div className={`flex items-end justify-center gap-2 ${className}`} role="img" aria-label="Three pricing tiers of increasing size">
      {tiers.map((t, i) => (
        <div key={t.id} className="flex flex-col items-center gap-1">
          <PortraitCard photoId={t.id} alt={t.alt} size="square" className={`w-16 ${t.h}`} highlight={i === 1} />
          <div className="h-1 w-8 rounded-full" style={{ backgroundColor: i === 1 ? BRONZE_INK : BEIGE }} />
        </div>
      ))}
    </div>
  );
}

/** Tools — photo in a frame with crop-handle corners. */
export function ToolsIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`} aria-hidden="true">
      <div className="relative">
        {/* Portrait in frame */}
        <div className="overflow-hidden rounded-lg bg-tp-paper/5 ring-1 ring-tp-paper/50" style={{ width: 100, height: 100 }}>
          <Image
            src={square('photo-1560250097-0b93528c311a')}
            alt=""
            width={200}
            height={200}
            className="h-full w-full object-cover opacity-70"
            sizes="100px"
          />
          {/* Grid overlay */}
          <div className="pointer-events-none absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, rgba(248,245,239,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(248,245,239,0.18) 1px, transparent 1px)`,
            backgroundSize: '33.33% 33.33%',
          }} />
        </div>
        {/* Crop handles */}
        <svg className="pointer-events-none absolute -inset-3" viewBox="0 0 130 130" fill="none">
          <g stroke={BRONZE} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 30V8h22" />
            <path d="M100 8h22v22" />
            <path d="M8 100v22h22" />
            <path d="M122 100v22h-22" />
          </g>
        </svg>
      </div>
    </div>
  );
}

/** Technology — selfie to AI to polished headshot pipeline. */
export function TechnologyIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden="true">
      {/* Input: casual */}
      <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-dashed border-tp-beige">
        <Image
          src={square('photo-1507003211169-0a1dd7228f2d')}
          alt=""
          width={128}
          height={128}
          className="h-full w-full rotate-[-6deg] scale-110 object-cover opacity-80"
          sizes="64px"
        />
      </div>
      {/* Arrow */}
      <svg viewBox="0 0 24 16" className="h-3 w-6 shrink-0" fill="none">
        <path d="M2 8h18m0 0l-5-5m5 5l-5 5" stroke={BRONZE_INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* AI hexagon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-tp-ink">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={BRONZE} strokeWidth="1.5" strokeLinejoin="round">
          <path d="M12 2l9 5v10l-9 5-9-5V7z" />
          <circle cx="12" cy="9" r="1.5" fill={BRONZE} />
          <circle cx="8" cy="14" r="1.5" fill={BRONZE} />
          <circle cx="16" cy="14" r="1.5" fill={BRONZE} />
          <path d="M12 9l-4 5m4-5l4 5m-8 0h8" />
        </svg>
      </div>
      {/* Arrow */}
      <svg viewBox="0 0 24 16" className="h-3 w-6 shrink-0" fill="none">
        <path d="M2 8h18m0 0l-5-5m5 5l-5 5" stroke={BRONZE_INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* Output: polished */}
      <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-tp-bronze-ink">
        <Image
          src={square('photo-1560250097-0b93528c311a')}
          alt=""
          width={128}
          height={128}
          className="h-full w-full object-cover"
          sizes="64px"
        />
        <div className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-tp-ink">
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="#C9A98A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 6l2.5 2.5L10 4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/** Photo tips — phone with a portrait and composition guides. */
export function PhotoTipsIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      {/* Window light hint */}
      <div className="hidden sm:block">
        <svg viewBox="0 0 50 70" className="h-16 w-auto" fill="none">
          <rect x="2" y="2" width="46" height="60" rx="4" fill={BRONZE} fillOpacity="0.12" stroke={BEIGE} strokeWidth="1.5" />
          <path d="M25 2v60M2 32h46" stroke={BEIGE} strokeWidth="1" />
          <circle cx="14" cy="16" r="4" fill={BRONZE} fillOpacity="0.5" />
        </svg>
      </div>
      {/* Phone with portrait */}
      <div className="relative overflow-hidden rounded-2xl bg-tp-ink" style={{ width: 90, height: 150 }}>
        <div className="mx-auto mt-1.5 h-1 w-8 rounded-full bg-tp-bronze-ink" />
        <div className="m-1.5 mt-1 overflow-hidden rounded-xl" style={{ height: 126 }}>
          <Image
            src={portrait('photo-1580489944761-15a19d654956')}
            alt=""
            width={172}
            height={252}
            className="h-full w-full object-cover opacity-60"
            sizes="86px"
          />
          {/* Head guide overlay */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 90 150" fill="none">
            <ellipse cx="45" cy="56" rx="16" ry="20" stroke={BRONZE_INK} strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M20 130c0-22 10-32 25-32s25 10 25 32" stroke={BRONZE_INK} strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/** Use cases — LinkedIn card, resume and ID badge with real portrait photos. */
export function UseCasesIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-start justify-center gap-2 ${className}`} aria-hidden="true">
      {/* LinkedIn card */}
      <div className="w-24 overflow-hidden rounded-lg bg-tp-paper ring-1 ring-tp-line">
        <div className="h-5 bg-tp-ink" />
        <div className="relative px-2 pb-2">
          <div className="-mt-3 mb-1 h-7 w-7 overflow-hidden rounded-full border border-tp-paper">
            <Image src={square('photo-1573496359142-b8d87734a5a2')} alt="" width={56} height={56} className="h-full w-full object-cover" sizes="28px" />
          </div>
          <div className="h-1 w-12 rounded bg-tp-ink/80" />
          <div className="mt-1 h-1 w-8 rounded bg-tp-bronze" />
        </div>
      </div>
      {/* Resume */}
      <div className="w-20 rounded-lg bg-tp-paper p-2 ring-1 ring-tp-line">
        <div className="flex gap-1.5">
          <div className="h-7 w-7 overflow-hidden rounded-full ring-1 ring-tp-bronze-ink">
            <Image src={square('photo-1560250097-0b93528c311a')} alt="" width={56} height={56} className="h-full w-full object-cover" sizes="28px" />
          </div>
          <div className="flex-1 space-y-1 pt-1">
            <div className="h-1 w-full rounded bg-tp-ink/70" />
            <div className="h-1 w-3/4 rounded bg-tp-bronze" />
          </div>
        </div>
        <div className="mt-2 space-y-1">
          <div className="h-0.5 w-full rounded bg-tp-beige" />
          <div className="h-1 w-full rounded bg-tp-beige" />
          <div className="h-1 w-4/5 rounded bg-tp-beige" />
          <div className="h-1 w-full rounded bg-tp-beige" />
        </div>
      </div>
      {/* ID badge */}
      <div className="w-20 rounded-lg bg-tp-ink p-2 ring-1 ring-tp-paper/30">
        <div className="mx-auto h-10 w-10 overflow-hidden rounded-full ring-1 ring-tp-bronze">
          <Image src={square('photo-1494790108377-be9c29b29330')} alt="" width={80} height={80} className="h-full w-full object-cover" sizes="40px" />
        </div>
        <div className="mx-auto mt-1.5 h-1 w-10 rounded bg-tp-bronze" />
        <div className="mx-auto mt-1 h-0.5 w-7 rounded bg-tp-beige/50" />
      </div>
    </div>
  );
}
