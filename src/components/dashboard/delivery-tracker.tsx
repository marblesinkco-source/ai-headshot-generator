'use client';

import { useEffect, useState } from 'react';
import { Check, Circle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type DeliveryStatus = 'processing' | 'generating' | 'reviewing' | 'ready';

interface DeliveryTrackerProps {
  orderDate: Date | string;
  estimatedHours?: number;
  status?: DeliveryStatus;
  className?: string;
}

const STEPS = ['Uploaded', 'Processing', 'AI Generating', 'Ready'] as const;

/** Index of the currently active step (steps before it are complete). */
const ACTIVE_STEP: Record<DeliveryStatus, number> = {
  processing: 1,
  generating: 2,
  reviewing: 2,
  ready: 3,
};

function formatRemaining(ms: number): string {
  const hours = Math.ceil(ms / 3_600_000);
  if (hours <= 1) return 'Less than 1 hour remaining';
  return `~${hours} hours remaining`;
}

export function DeliveryTracker({
  orderDate,
  estimatedHours = 24,
  status = 'processing',
  className,
}: DeliveryTrackerProps) {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  const start = new Date(orderDate).getTime();
  const validStart = Number.isFinite(start);
  const isReady = status === 'ready';
  const active = ACTIVE_STEP[status];
  const remainingMs = validStart ? Math.max(0, start + estimatedHours * 3_600_000 - now) : 0;

  const label = isReady
    ? 'Ready for download!'
    : !validStart
      ? 'Estimating delivery time...'
      : remainingMs <= 0
        ? 'Finishing up, almost there...'
        : formatRemaining(remainingMs);

  // Bar fills up to the active step (complete when ready).
  const progressPct = (active / (STEPS.length - 1)) * 100;

  return (
    <section
      aria-label="Delivery progress"
      className={cn('rounded-tp-card border border-tp-line bg-tp-paper p-5 sm:p-6', className)}
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-display text-xl text-tp-ink">Delivery progress</h3>
        <p
          className={cn(
            'text-sm font-semibold',
            isReady ? 'text-tp-bronze-ink' : 'text-tp-muted',
          )}
          aria-live="polite"
        >
          {label}
        </p>
      </div>

      <div
        className="mt-5 h-2 w-full overflow-hidden rounded-full bg-tp-line"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progressPct)}
      >
        <div
          className="h-full rounded-full bg-tp-bronze transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <ol className="mt-5 grid grid-cols-4 gap-2">
        {STEPS.map((step, i) => {
          const done = i < active || (isReady && i === active);
          const current = i === active && !isReady;
          return (
            <li
              key={step}
              className="flex flex-col items-center gap-2 text-center"
              aria-current={current ? 'step' : undefined}
            >
              <span
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full border',
                  done && 'border-tp-bronze bg-tp-bronze text-tp-ink',
                  current && 'border-tp-bronze bg-white text-tp-bronze-ink',
                  !done && !current && 'border-tp-line bg-white text-tp-muted',
                )}
              >
                {done ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : current ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Circle className="h-4 w-4" aria-hidden="true" />
                )}
              </span>
              <span
                className={cn(
                  'text-[11px] leading-tight sm:text-sm',
                  done || current ? 'font-semibold text-tp-ink' : 'text-tp-muted',
                )}
              >
                {step}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default DeliveryTracker;
