import Link from 'next/link';
import { Check, X, Clock, DollarSign, Camera, Sparkles, RefreshCw, Shield, Home, Layers } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
    tailorpic: { text: 'Starting at $9.90', ok: true },
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
    tailorpic: { text: 'Upload selfies from anywhere', ok: true },
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

function CellContent({ cell, highlight }: { cell: Cell; highlight?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:justify-center sm:gap-2">
      {cell.ok === true && (
        <Check
          aria-label="Yes"
          className={cn('h-4 w-4 flex-shrink-0', highlight ? 'text-tp-bronze-ink' : 'text-tp-muted')}
        />
      )}
      {cell.ok === false && (
        <X aria-label="No" className="h-4 w-4 flex-shrink-0 text-tp-muted/50" />
      )}
      <span
        className={cn(
          'text-xs sm:text-sm text-center',
          highlight ? 'font-semibold text-tp-bronze-ink' : 'text-tp-muted'
        )}
      >
        {cell.text}
      </span>
    </div>
  );
}

const GRID = 'grid grid-cols-[1.1fr_1fr_1fr_1.15fr] sm:grid-cols-[1.3fr_1fr_1fr_1.2fr] min-w-[640px]';

export function ComparisonTable() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
            Comparison
          </p>
          <h2 className="mt-3 font-display text-2xl font-normal tracking-tight text-tp-ink sm:text-3xl">
            Why people choose TailorPic
          </h2>
          <p className="mt-3 text-base text-tp-muted max-w-xl mx-auto">
            Professional photos no longer require hours of your time and hundreds of dollars.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-tp-card border border-tp-line bg-white">
          <div className={cn(GRID, 'bg-tp-paper border-b border-tp-line')}>
            <div className="p-4 sm:p-5 text-xs font-semibold uppercase tracking-wider text-tp-muted">
              Feature
            </div>
            <div className="p-4 sm:p-5 text-xs font-semibold uppercase tracking-wider text-tp-muted text-center">
              Traditional Studio
            </div>
            <div className="p-4 sm:p-5 text-xs font-semibold uppercase tracking-wider text-tp-muted text-center">
              Other AI Tools
            </div>
            <div className="p-4 sm:p-5 text-xs font-semibold uppercase tracking-wider text-tp-bronze-ink text-center bg-tp-bronze/15 border-x-2 border-t-2 border-tp-bronze -mt-px">
              TailorPic
            </div>
          </div>

          {rows.map((row, i) => {
            const last = i === rows.length - 1;
            return (
              <div
                key={row.feature}
                className={cn(GRID, 'items-stretch', !last && 'border-b border-tp-line/60')}
              >
                <div className="p-4 sm:p-5 flex items-center gap-2.5">
                  <row.icon className="h-4 w-4 text-tp-muted/60 flex-shrink-0 hidden sm:block" />
                  <span className="text-sm font-medium text-tp-ink">{row.feature}</span>
                </div>
                <div className="p-4 sm:p-5 flex items-center justify-center">
                  <CellContent cell={row.traditional} />
                </div>
                <div className="p-4 sm:p-5 flex items-center justify-center">
                  <CellContent cell={row.otherAi} />
                </div>
                <div
                  className={cn(
                    'p-4 sm:p-5 flex items-center justify-center bg-tp-bronze/[0.08] border-x-2 border-tp-bronze',
                    last && 'border-b-2 rounded-b-tp-card'
                  )}
                >
                  <CellContent cell={row.tailorpic} highlight />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/auth/register"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'rounded-tp-button bg-tp-ink text-tp-paper hover:bg-tp-ink/90'
            )}
          >
            Get Started
          </Link>
          <p className="mt-3 text-xs text-tp-muted">
            Backed by a 14-day money-back guarantee.
          </p>
        </div>

        <p className="mt-5 text-center text-xs text-tp-muted">
          * Traditional studio prices reflect average market rates. Other AI tools vary; check each
          provider for details.
        </p>
      </div>
    </section>
  );
}
