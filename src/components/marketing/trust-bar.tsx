import { Clock, Lock, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface TrustMetric {
  icon: LucideIcon;
  label: string;
}

export interface TrustBarProps {
  /** Heading shown above the metrics. Avoid unverified user counts. */
  heading?: string;
  /** Configurable metrics. Only pass values that are verified. */
  metrics?: TrustMetric[];
  className?: string;
}

// Defaults contain no invented user counts or ratings.
// Pass a verified metric (e.g. { icon: Star, label: '4.9/5 Rating' }) via props when available.
const DEFAULT_METRICS: TrustMetric[] = [
  { icon: Clock, label: 'Ready in 24h' },
  { icon: Lock, label: '256-bit Encrypted' },
  { icon: ShieldCheck, label: '14-day Money-back Guarantee' },
];

export function TrustBar({
  heading = 'Professionals trust TailorPic',
  metrics = DEFAULT_METRICS,
  className,
}: TrustBarProps) {
  return (
    <section className={cn('py-8', className)} aria-label="Trust indicators">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-tp-card border border-tp-line bg-tp-paper px-5 py-6 sm:px-8">
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-tp-bronze-ink">
            {heading}
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {metrics.map((m) => (
              <li
                key={m.label}
                className="flex items-center justify-center gap-2.5 rounded-tp-button border border-tp-line bg-white px-3 py-3 text-center text-sm font-medium text-tp-ink transition-colors duration-200 hover:border-tp-bronze/40 hover:bg-tp-paper"
              >
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-tp-beige/50"
                >
                  <m.icon className="h-3.5 w-3.5 text-tp-bronze-ink" />
                </span>
                <span>{m.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
