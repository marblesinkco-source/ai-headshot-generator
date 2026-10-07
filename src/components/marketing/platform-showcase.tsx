import Link from 'next/link';
import type { ReactNode } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Platform {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  mockup: ReactNode;
}

const svgProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

/* Shared headshot placeholder: soft circle with generic head + shoulders */
function Avatar({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} className="fill-tp-beige/60 stroke-tp-bronze" strokeWidth={1} strokeDasharray="3 2" />
      <circle cx={cx} cy={cy - r * 0.18} r={r * 0.32} className="fill-tp-bronze/40" />
      <path
        d={`M${cx - r * 0.62} ${cy + r * 0.8} Q${cx} ${cy + r * 0.15} ${cx + r * 0.62} ${cy + r * 0.8}`}
        className="fill-tp-bronze/40"
      />
    </g>
  );
}

const Line = ({ x, y, w, strong = false }: { x: number; y: number; w: number; strong?: boolean }) => (
  <rect x={x} y={y} width={w} height={strong ? 5 : 4} rx={2} className={strong ? 'fill-tp-ink/30' : 'fill-tp-line'} />
);

const PLATFORMS: Platform[] = [
  {
    id: 'profile',
    name: 'LinkedIn Profile',
    description: 'Stand out in recruiter searches',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...svgProps}>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="9" cy="10" r="2.5" />
        <path d="M5 18c.6-2.2 2.2-3.5 4-3.5s3.4 1.3 4 3.5" />
        <path d="M15 9h3M15 13h3" />
      </svg>
    ),
    mockup: (
      <svg viewBox="0 0 200 120" className="h-full w-full" role="img" aria-label="Profile page mockup with headshot placeholder">
        <rect x="0" y="0" width="200" height="40" className="fill-tp-beige/50" />
        <Avatar cx={40} cy={42} r={24} />
        <Line x={76} y={56} w={70} strong />
        <Line x={76} y={68} w={100} />
        <Line x={76} y={78} w={60} />
        <Line x={16} y={94} w={168} />
        <Line x={16} y={104} w={120} />
      </svg>
    ),
  },
  {
    id: 'video',
    name: 'Zoom / Video Calls',
    description: 'Look polished on every call',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...svgProps}>
        <rect x="3" y="6" width="12" height="12" rx="2.5" />
        <path d="M15 11l6-3.5v9L15 13" />
      </svg>
    ),
    mockup: (
      <svg viewBox="0 0 200 120" className="h-full w-full" role="img" aria-label="Video call mockup with headshot placeholder">
        <rect x="8" y="8" width="184" height="104" rx="8" className="fill-tp-ink/10" />
        <Avatar cx={100} cy={52} r={30} />
        <rect x="76" y="92" width="48" height="12" rx="6" className="fill-tp-paper stroke-tp-line" />
        <circle cx="88" cy="98" r="3" className="fill-tp-bronze/60" />
        <circle cx="100" cy="98" r="3" className="fill-tp-ink/30" />
        <circle cx="112" cy="98" r="3" className="fill-tp-ink/30" />
      </svg>
    ),
  },
  {
    id: 'email',
    name: 'Email Signature',
    description: 'Professional first impression',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...svgProps}>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M3.5 7l8.5 6 8.5-6" />
      </svg>
    ),
    mockup: (
      <svg viewBox="0 0 200 120" className="h-full w-full" role="img" aria-label="Email signature mockup with headshot placeholder">
        <Line x={16} y={14} w={120} />
        <Line x={16} y={24} w={150} />
        <Line x={16} y={34} w={90} />
        <line x1="16" y1="54" x2="184" y2="54" className="stroke-tp-line" strokeWidth="1" />
        <Avatar cx={38} cy={82} r={18} />
        <Line x={66} y={72} w={64} strong />
        <Line x={66} y={84} w={90} />
        <Line x={66} y={94} w={72} />
      </svg>
    ),
  },
  {
    id: 'website',
    name: 'Company Website',
    description: 'Consistent team pages',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...svgProps}>
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <path d="M3 9h18" />
        <circle cx="6" cy="6.5" r=".5" />
        <circle cx="8.5" cy="6.5" r=".5" />
      </svg>
    ),
    mockup: (
      <svg viewBox="0 0 200 120" className="h-full w-full" role="img" aria-label="Team page mockup with headshot placeholders">
        <rect x="0" y="0" width="200" height="14" className="fill-tp-beige/50" />
        {[40, 100, 160].map((cx) => (
          <g key={cx}>
            <Avatar cx={cx} cy={52} r={20} />
            <Line x={cx - 22} y={82} w={44} strong />
            <Line x={cx - 16} y={93} w={32} />
          </g>
        ))}
      </svg>
    ),
  },
  {
    id: 'chat',
    name: 'Slack / Teams',
    description: 'Recognized in every channel',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...svgProps}>
        <path d="M4 5.5A2.5 2.5 0 016.5 3h11A2.5 2.5 0 0120 5.5v8a2.5 2.5 0 01-2.5 2.5H11l-4.5 4v-4A2.5 2.5 0 014 13.5z" />
        <path d="M8 8.5h8M8 11.5h5" />
      </svg>
    ),
    mockup: (
      <svg viewBox="0 0 200 120" className="h-full w-full" role="img" aria-label="Chat channel mockup with headshot placeholders">
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="14" y={12 + i * 34} width="26" height="26" rx="7" className="fill-tp-beige/60 stroke-tp-bronze" strokeWidth={1} strokeDasharray="3 2" />
            <circle cx="27" cy={22 + i * 34} r="4.5" className="fill-tp-bronze/40" />
            <path d={`M19 ${35 + i * 34} Q27 ${26 + i * 34} 35 ${35 + i * 34}`} className="fill-tp-bronze/40" />
            <Line x={50} y={14 + i * 34} w={48} strong />
            <Line x={50} y={25 + i * 34} w={i === 1 ? 110 : 136} />
          </g>
        ))}
      </svg>
    ),
  },
  {
    id: 'resume',
    name: 'Resume / CV',
    description: 'Elevate your application',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" {...svgProps}>
        <path d="M7 3h7l4 4v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" />
        <path d="M14 3v4h4M9 12h6M9 15.5h6" />
      </svg>
    ),
    mockup: (
      <svg viewBox="0 0 200 120" className="h-full w-full" role="img" aria-label="Resume mockup with headshot placeholder">
        <rect x="46" y="4" width="108" height="124" rx="4" className="fill-tp-paper stroke-tp-line" />
        <rect x="58" y="14" width="30" height="30" rx="4" className="fill-tp-beige/60 stroke-tp-bronze" strokeWidth={1} strokeDasharray="3 2" />
        <circle cx="73" cy="25" r="5" className="fill-tp-bronze/40" />
        <path d="M63 40 Q73 30 83 40Z" className="fill-tp-bronze/40" />
        <Line x={96} y={16} w={46} strong />
        <Line x={96} y={27} w={36} />
        <Line x={58} y={56} w={84} strong />
        <Line x={58} y={67} w={84} />
        <Line x={58} y={77} w={70} />
        <Line x={58} y={91} w={84} strong />
        <Line x={58} y={102} w={76} />
      </svg>
    ),
  },
];

export function PlatformShowcase() {
  return (
    <section className="bg-tp-paper py-16 sm:py-20" aria-labelledby="platform-showcase-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">
            Use it everywhere
          </p>
          <h2
            id="platform-showcase-heading"
            className="mt-3 font-display text-3xl font-normal text-tp-black sm:text-4xl"
          >
            Where Your Headshots Shine
          </h2>
          <p className="mt-4 text-base text-tp-muted sm:text-lg">
            One photo session. Every platform covered.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {PLATFORMS.map((p) => (
            <li
              key={p.id}
              className="flex flex-col rounded-tp-card border border-tp-line bg-white p-4 sm:p-5"
            >
              <div
                className="aspect-[5/3] w-full overflow-hidden rounded-tp-button border border-tp-line bg-tp-paper"
                aria-hidden={false}
              >
                {p.mockup}
              </div>
              <div className="mt-4 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-tp-button bg-tp-beige/40 text-tp-bronze-ink">
                  {p.icon}
                </span>
                <h3 className="text-sm font-semibold text-tp-black sm:text-base">{p.name}</h3>
              </div>
              <p className="mt-2 text-sm text-tp-muted">{p.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link
            href="/headshots"
            className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}
          >
            Get Your Photos →
          </Link>
        </div>
      </div>
    </section>
  );
}
