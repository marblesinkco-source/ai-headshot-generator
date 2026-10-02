import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BASE_PRICE } from '@/config/pricing';

interface CostLine {
  label: string;
  min: number;
  max: number;
}

const TRADITIONAL: CostLine[] = [
  { label: 'Photographer fee', min: 150, max: 300 },
  { label: 'Studio rental', min: 50, max: 100 },
  { label: 'Hair & makeup', min: 50, max: 80 },
  { label: 'Travel', min: 20, max: 50 },
];

// Real entry-tier price (TailorPic 1).
const EXPRESS_PRICE = BASE_PRICE;
const EXPRESS_OUTPUTS = 1;

const fmt = (n: number) => `$${Number.isInteger(n) ? n : n.toFixed(2)}`;

export function CostCalculator({ className }: { className?: string }) {
  const totalMin = TRADITIONAL.reduce((s, l) => s + l.min, 0);
  const totalMax = TRADITIONAL.reduce((s, l) => s + l.max, 0);
  const savings = Math.floor(totalMax - EXPRESS_PRICE);

  return (
    <section className={cn('py-16', className)}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl text-tp-black sm:text-4xl">
            What does a professional headshot really cost?
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Traditional */}
          <div className="rounded-tp-card border border-tp-line bg-white p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-tp-ink">Traditional Photoshoot</h3>
            <ul className="mt-5 divide-y divide-tp-line text-sm">
              {TRADITIONAL.map((l) => (
                <li key={l.label} className="flex items-center justify-between py-3">
                  <span className="text-tp-muted">{l.label}</span>
                  <span className="font-medium text-tp-ink">
                    {fmt(l.min)}–{fmt(l.max)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex items-center justify-between border-t border-tp-ink pt-4">
              <span className="font-semibold text-tp-ink">Total</span>
              <span className="text-xl font-bold text-tp-ink">
                {fmt(totalMin)}–{fmt(totalMax)}
              </span>
            </div>
            <p className="mt-4 text-xs text-tp-muted">
              Average market rate estimates. Actual prices vary by location and photographer.
            </p>
          </div>

          {/* TailorPic */}
          <div className="rounded-tp-card border border-tp-bronze bg-tp-ink p-6 text-tp-paper sm:p-8">
            <h3 className="text-lg font-semibold text-tp-bronze">TailorPic AI</h3>
            <p className="mt-5 font-display text-5xl font-normal tracking-tight">{fmt(EXPRESS_PRICE)}</p>
            <p className="mt-1 text-sm text-tp-beige">TailorPic 1, one-time payment</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-tp-bronze" aria-hidden="true" />
                {EXPRESS_OUTPUTS} professional headshot{EXPRESS_OUTPUTS === 1 ? '' : 's'}
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-tp-bronze" aria-hidden="true" />
                Delivered in 24 hours
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-tp-bronze" aria-hidden="true" />
                No studio, no travel, no scheduling
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-tp-card border border-tp-line bg-tp-paper p-6 text-center">
          <p className="font-display text-3xl text-tp-bronze-ink sm:text-4xl">
            Save up to {fmt(savings)}
          </p>
          <p className="mt-1 text-sm text-tp-muted">
            Based on the high end of average market rates ({fmt(totalMax)}) vs. {fmt(EXPRESS_PRICE)}.
          </p>
        </div>
      </div>
    </section>
  );
}
