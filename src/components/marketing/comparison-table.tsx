import Link from 'next/link';
import { Check, X, ArrowRight, Clock, DollarSign, Camera, Sparkles, RefreshCw, Shield, Home, Layers } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

type Cell = { text: string; ok?: boolean };

const rows: {
  feature: string;
  icon: typeof Clock;
  traditional: Cell;
  otherAi: Cell;
  tailorpic: Cell;
}[] = [
  {
    feature: 'Cost',
    icon: DollarSign,
    traditional: { text: '$200 – $500+', ok: false },
    otherAi: { text: 'Varies by provider' },
    tailorpic: { text: `Starting at ${BASE_PRICE_DISPLAY}`, ok: true },
  },
  {
    feature: 'Time to Photos',
    icon: Clock,
    traditional: { text: '1 – 2 weeks', ok: false },
    otherAi: { text: 'Varies by provider' },
    tailorpic: { text: 'Under 2 hours', ok: true },
  },
  {
    feature: 'Convenience',
    icon: Home,
    traditional: { text: 'Book, travel, and sit for a session', ok: false },
    otherAi: { text: 'Upload from home' , ok: true },
    tailorpic: { text: 'No scheduling: upload selfies from anywhere', ok: true },
  },
  {
    feature: 'Variety',
    icon: Sparkles,
    traditional: { text: '1 – 2 backgrounds', ok: false },
    otherAi: { text: 'Varies by provider' },
    tailorpic: { text: '11 categories, multiple styles', ok: true },
  },
  {
    feature: 'Number of Photos',
    icon: Camera,
    traditional: { text: '5 – 15 photos', ok: false },
    otherAi: { text: 'Varies by provider' },
    tailorpic: { text: '40 – 140 photos on larger plans', ok: true },
  },
  {
    feature: 'Quality Consistency',
    icon: Layers,
    traditional: { text: 'Depends on the day and photographer', ok: false },
    otherAi: { text: 'Can vary between results' },
    tailorpic: { text: 'A cohesive set in your chosen style', ok: true },
  },
  {
    feature: 'Reshoots',
    icon: RefreshCw,
    traditional: { text: 'Extra charge required', ok: false },
    otherAi: { text: 'Varies by provider' },
    tailorpic: { text: 'Regeneration help from support', ok: true },
  },
  {
    feature: 'Privacy',
    icon: Shield,
    traditional: { text: 'Depends on photographer' },
    otherAi: { text: "Check each provider's policy" },
    tailorpic: { text: 'Photos auto-deleted within 30 days', ok: true },
  },
];

function Mark({ ok, highlight }: { ok: boolean; highlight?: boolean }) {
  return (
    <span
      aria-label={ok ? 'Yes' : 'No'}
      role="img"
      className={cn(
        'inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full',
        ok
          ? highlight
            ? 'bg-tp-bronze-ink text-tp-paper'
            : 'bg-tp-ink text-tp-paper'
          : 'bg-tp-line text-tp-ink'
      )}
    >
      {ok ? (
        <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
      ) : (
        <X aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
      )}
    </span>
  );
}

function CellContent({
  cell,
  highlight,
  align = 'center',
}: {
  cell: Cell;
  highlight?: boolean;
  align?: 'center' | 'start';
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-2',
        align === 'center' ? 'flex-col sm:flex-row sm:justify-center' : 'flex-row justify-start'
      )}
    >
      {cell.ok !== undefined && <Mark ok={cell.ok} highlight={highlight} />}
      <span
        className={cn(
          'text-sm',
          align === 'center' && 'text-center',
          highlight ? 'font-semibold text-tp-bronze-ink' : 'text-tp-muted'
        )}
      >
        {cell.text}
      </span>
    </div>
  );
}

const GRID = 'grid grid-cols-[1.3fr_1fr_1fr_1.25fr]';

const highlights = [
  { label: 'Price', value: BASE_PRICE_DISPLAY, note: 'vs $200 – $500+' },
  { label: 'Speed', value: '2 hours', note: 'vs 1 – 2 weeks' },
  { label: 'Scheduling', value: 'None', note: 'vs booking a session' },
  { label: 'Variety', value: 'Up to 160 photos', note: 'vs 5 – 15' },
];

export function ComparisonTable() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
            Comparison
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
            Why people choose TailorPic
          </h2>
          <p className="mt-3 text-base text-tp-muted max-w-xl mx-auto">
            Professional photos no longer require hours of your time and hundreds of dollars.
          </p>
        </div>

        {/* Key advantages */}
        <dl className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="rounded-tp-card border border-tp-line bg-tp-paper p-4 text-center"
            >
              <dt className="text-xs font-semibold uppercase tracking-wider text-tp-muted">
                {h.label}
              </dt>
              <dd className="mt-1 font-display text-2xl font-normal text-tp-bronze-ink sm:text-3xl">
                {h.value}
              </dd>
              <dd className="mt-0.5 text-xs text-tp-muted">{h.note}</dd>
            </div>
          ))}
        </dl>

        {/* Mobile: stacked cards */}
        <div className="space-y-4 sm:hidden">
          {rows.map((row) => (
            <div
              key={row.feature}
              className="overflow-hidden rounded-tp-card border border-tp-line bg-white"
            >
              <div className="flex items-center gap-2 border-b border-tp-line bg-tp-paper px-4 py-3">
                <row.icon aria-hidden="true" className="h-4 w-4 text-tp-bronze-ink" />
                <h3 className="text-sm font-semibold text-tp-ink">{row.feature}</h3>
              </div>
              <div className="border-l-4 border-tp-bronze bg-tp-bronze/10 px-4 py-3">
                <p className="mb-1.5 inline-flex items-center rounded-full bg-tp-bronze-ink px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-tp-paper">
                  TailorPic
                </p>
                <CellContent cell={row.tailorpic} highlight align="start" />
              </div>
              <div className="space-y-3 px-4 py-3">
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-tp-muted">
                    Traditional Studio
                  </p>
                  <CellContent cell={row.traditional} align="start" />
                </div>
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-tp-muted">
                    Other AI Tools
                  </p>
                  <CellContent cell={row.otherAi} align="start" />
                </div>
              </div>
            </div>
          ))}
          <Link
            href="/auth/register"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'w-full rounded-tp-button bg-tp-ink text-tp-paper hover:bg-tp-ink/90'
            )}
          >
            Try it yourself
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Desktop: table */}
        <div className="hidden sm:block pt-4">
          <div role="table" aria-label="TailorPic compared with traditional studios and other AI tools">
            <div role="rowgroup">
              <div role="row" className={cn(GRID, 'items-end')}>
                <div role="columnheader" className="p-5 text-xs font-semibold uppercase tracking-wider text-tp-muted">
                  Feature
                </div>
                <div role="columnheader" className="p-5 text-center text-xs font-semibold uppercase tracking-wider text-tp-muted">
                  Traditional Studio
                </div>
                <div role="columnheader" className="p-5 text-center text-xs font-semibold uppercase tracking-wider text-tp-muted">
                  Other AI Tools
                </div>
                <div
                  role="columnheader"
                  className="relative rounded-t-tp-card border-x-2 border-t-2 border-tp-bronze bg-tp-bronze/20 px-5 pb-4 pt-6 text-center"
                >
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-tp-bronze-ink px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-tp-paper">
                    Best value
                  </span>
                  <span className="font-display text-xl font-normal text-tp-ink">TailorPic</span>
                </div>
              </div>
            </div>

            <div role="rowgroup" className="border-y border-tp-line">
              {rows.map((row, i) => (
                <div
                  key={row.feature}
                  role="row"
                  className={cn(GRID, 'items-stretch bg-white', i > 0 && 'border-t border-tp-line/70')}
                >
                  <div role="rowheader" className="flex items-center gap-2.5 p-5">
                    <row.icon aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-tp-bronze-ink" />
                    <span className="text-sm font-medium text-tp-ink">{row.feature}</span>
                  </div>
                  <div role="cell" className="flex items-center justify-center p-5">
                    <CellContent cell={row.traditional} />
                  </div>
                  <div role="cell" className="flex items-center justify-center p-5">
                    <CellContent cell={row.otherAi} />
                  </div>
                  <div
                    role="cell"
                    className="flex items-center justify-center border-x-2 border-tp-bronze bg-tp-bronze/10 p-5"
                  >
                    <CellContent cell={row.tailorpic} highlight />
                  </div>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div role="row" className={cn(GRID)}>
              <div role="cell" className="col-span-3" />
              <div
                role="cell"
                className="rounded-b-tp-card border-x-2 border-b-2 border-tp-bronze bg-tp-bronze/10 p-4 text-center"
              >
                <Link
                  href="/auth/register"
                  className={cn(
                    buttonVariants({ size: 'md' }),
                    'w-full rounded-tp-button bg-tp-ink text-tp-paper hover:bg-tp-ink/90'
                  )}
                >
                  Try it yourself
                  <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-tp-muted">
          * Traditional studio prices reflect average market rates. Other AI tools vary; check each
          provider for details.
        </p>
      </div>
    </section>
  );
}
