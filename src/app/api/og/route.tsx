import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const C = {
  black: '#0B0B0B',
  ink: '#171613',
  bronze: '#C9A98A',
  bronzeInk: '#76563D',
  paper: '#F8F5EF',
  beige: '#DCCDBB',
  muted: '#5F5A54',
  line: '#DFD6CC',
};

type OGType = 'blog' | 'vs' | 'industry' | 'style' | 'usecase' | 'glossary' | 'default';
const TYPES: OGType[] = ['blog', 'vs', 'industry', 'style', 'usecase', 'glossary', 'default'];

const LABELS: Record<OGType, string> = {
  blog: 'Blog',
  vs: 'Comparison',
  industry: 'Industry',
  style: 'Style',
  usecase: 'Use Case',
  glossary: 'Glossary',
  default: 'AI Headshots',
};

// Load a Manrope weight from Google Fonts (ttf, subset to the glyphs we need).
async function loadManrope(weight: number, text: string): Promise<ArrayBuffer | null> {
  try {
    const cssRes = await fetch(
      `https://fonts.googleapis.com/css2?family=Manrope:wght@${weight}&text=${encodeURIComponent(text)}`,
    );
    const css = await cssRes.text();
    const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!match) return null;
    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

function clamp(s: string | null, max: number): string {
  const v = (s || '').replace(/\s+/g, ' ').trim();
  return v.length > max ? v.slice(0, max - 1).trimEnd() + '…' : v;
}

function titleSize(title: string, vs: boolean): number {
  const n = title.length;
  if (vs) return n > 40 ? 60 : 72;
  if (n > 90) return 50;
  if (n > 60) return 60;
  if (n > 35) return 72;
  return 84;
}

function Icon({ type }: { type: OGType }) {
  const common = {
    width: 72,
    height: 72,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: C.bronze,
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  if (type === 'vs') {
    return (
      <svg {...common}>
        <path d="M4 7h13M14 4l3 3-3 3" />
        <path d="M20 17H7M10 14l-3 3 3 3" />
      </svg>
    );
  }
  if (type === 'industry') {
    return (
      <svg {...common}>
        <rect x="3" y="8" width="18" height="12" rx="1.5" />
        <path d="M9 8V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V8" />
        <path d="M3 13h18" />
      </svg>
    );
  }
  if (type === 'style') {
    return (
      <svg {...common}>
        <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
        <path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
      </svg>
    );
  }
  if (type === 'usecase') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  if (type === 'glossary') {
    return (
      <svg {...common}>
        <path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v16H6.5A1.5 1.5 0 0 0 5 20.5z" />
        <path d="M5 20.5A1.5 1.5 0 0 0 6.5 22H19" />
      </svg>
    );
  }
  if (type === 'blog') {
    return (
      <svg {...common} stroke={C.bronzeInk}>
        <path d="M4 20l1-4L16.5 4.5a2 2 0 0 1 3 3L8 19z" />
      </svg>
    );
  }
  return null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawType = searchParams.get('type') as OGType | null;
  const type: OGType = rawType && TYPES.includes(rawType) ? rawType : 'default';
  const title = clamp(searchParams.get('title'), 110) || 'Professional AI Headshots';
  const subtitle = clamp(searchParams.get('subtitle'), 140);

  const fontText = `TailorPic AI Professional Headshots vs ${title} ${subtitle} ${Object.values(LABELS).join(' ')} ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,:;!?'"-–—&()/%+$…`;
  const [bold, semi] = await Promise.all([loadManrope(800, fontText), loadManrope(600, fontText)]);
  const fonts: { name: string; data: ArrayBuffer; weight: 600 | 800; style: 'normal' }[] = [];
  if (bold) fonts.push({ name: 'Manrope', data: bold, weight: 800, style: 'normal' });
  if (semi) fonts.push({ name: 'Manrope', data: semi, weight: 600, style: 'normal' });

  const isPaper = type === 'blog';
  const fg = isPaper ? C.ink : C.paper;
  const accent = isPaper ? C.bronzeInk : C.bronze;
  const sub = isPaper ? C.muted : C.beige;

  let background: string = C.ink;
  if (isPaper) background = C.paper;
  else if (type === 'style') background = `linear-gradient(135deg, ${C.black} 0%, ${C.ink} 45%, ${C.bronzeInk} 100%)`;
  else if (type === 'industry' || type === 'usecase') background = `linear-gradient(160deg, ${C.ink} 0%, ${C.black} 100%)`;

  // "X vs Y" split
  let vsParts: [string, string] | null = null;
  if (type === 'vs') {
    const m = title.split(/\s+vs\.?\s+/i);
    if (m.length >= 2) vsParts = [m[0], m.slice(1).join(' vs ')];
  }
  const size = titleSize(title, !!vsParts);

  const titleBlock = vsParts ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: 28, width: '100%' }}>
      <div style={{ display: 'flex', flex: 1, fontSize: size, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, color: fg }}>
        {vsParts[0]}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 84,
          height: 84,
          borderRadius: 42,
          border: `2px solid ${C.bronze}`,
          color: C.bronze,
          fontSize: 30,
          fontWeight: 800,
        }}
      >
        VS
      </div>
      <div style={{ display: 'flex', flex: 1, fontSize: size, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, color: fg }}>
        {vsParts[1]}
      </div>
    </div>
  ) : (
    <div style={{ display: 'flex', fontSize: size, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2.5, color: fg, maxWidth: isPaper ? 900 : 1000 }}>
      {title}
    </div>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 72px',
          background,
          fontFamily: fonts.length ? 'Manrope' : 'sans-serif',
          position: 'relative',
        }}
      >
        {/* top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', fontSize: 34, fontWeight: 800, letterSpacing: -1, color: fg }}>
            TailorPic
            <span style={{ color: accent }}>.</span>
          </div>
          {type !== 'default' && (
            <div
              style={{
                display: 'flex',
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: accent,
                border: `1.5px solid ${accent}`,
                borderRadius: 999,
                padding: '8px 20px',
              }}
            >
              {LABELS[type]}
            </div>
          )}
        </div>

        {/* middle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
          {type !== 'default' && type !== 'blog' && type !== 'style' && <Icon type={type} />}
          {type === 'style' && <Icon type="style" />}
          {type === 'blog' && <div style={{ display: 'flex', width: 72, height: 6, background: C.bronze, borderRadius: 3 }} />}
          {titleBlock}
          {subtitle && (
            <div style={{ display: 'flex', fontSize: 30, fontWeight: 600, lineHeight: 1.35, color: sub, maxWidth: 960 }}>
              {subtitle}
            </div>
          )}
        </div>

        {/* bottom */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', width: 40, height: 3, background: C.bronze }} />
            <div style={{ display: 'flex', fontSize: 24, fontWeight: 600, letterSpacing: 1, color: sub }}>
              AI Professional Headshots
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 22, fontWeight: 600, color: accent }}>tailorpic.com</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fonts.length ? fonts : undefined,
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
      },
    },
  );
}
