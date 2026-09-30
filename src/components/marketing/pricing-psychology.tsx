import { cn } from '@/lib/utils';

export interface PricingPsychologyProps {
  /** Total package price in USD. Defaults to the Express tier. */
  price?: number;
  /** Number of headshots in the package. */
  outputs?: number;
  planName?: string;
  /** Show the "Most Popular" badge. */
  mostPopular?: boolean;
  className?: string;
}

export function PricingPsychology({
  price = 9.9,
  outputs = 5,
  planName = 'Express',
  mostPopular = false,
  className,
}: PricingPsychologyProps) {
  const perHeadshot = (price / outputs).toFixed(2);

  return (
    <div
      className={cn(
        'relative rounded-tp-card border bg-white p-6 text-center',
        mostPopular ? 'border-tp-bronze' : 'border-tp-line',
        className,
      )}
    >
      {mostPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-tp-bronze px-3 py-1 text-xs font-semibold uppercase tracking-wide text-tp-black">
          Most Popular
        </span>
      )}
      <p className="text-sm font-semibold text-tp-bronze-ink">{planName}</p>
      <p className="mt-2 text-4xl font-extrabold tracking-tight text-tp-black">${price.toFixed(2)}</p>
      <p className="mt-3 text-sm text-tp-muted">
        ${price.toFixed(2)} ÷ {outputs} ={' '}
        <span className="font-semibold text-tp-ink">${perHeadshot} per headshot</span>
      </p>
      <p className="mt-2 text-sm font-medium text-tp-ink">That&apos;s less than a coffee ☕</p>
    </div>
  );
}
