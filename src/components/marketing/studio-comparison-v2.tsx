import Link from 'next/link';
import { Check, X, Clock, DollarSign, Camera, Repeat } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

interface ComparisonRow {
  label: string;
  icon: LucideIcon;
  studio: string;
  tailorpic: string;
  /** Marks the studio value that needs the estimate disclaimer. */
  studioEstimate?: boolean;
}

const ROWS: ComparisonRow[] = [
  {
    label: 'Cost',
    icon: DollarSign,
    studio: 'Varies by photographer',
    tailorpic: `From ${BASE_PRICE_DISPLAY}`,
  },
  { label: 'Time', icon: Clock, studio: '2–4 hours + travel', tailorpic: 'Under 2 hours delivery' },
  { label: 'Photos', icon: Camera, studio: '10–20 edited photos', tailorpic: 'Up to 160 AI headshots' },
  { label: 'Variety', icon: Camera, studio: '1 backdrop, 1 outfit', tailorpic: 'Up to 10 styles, multiple backgrounds' },
  { label: 'Retakes', icon: Repeat, studio: 'Reschedule + repay', tailorpic: 'Regenerate anytime' },
  { label: 'Convenience', icon: Clock, studio: 'Book weeks ahead', tailorpic: 'Upload from anywhere' },
];

export default function StudioComparisonV2() {
  return (
    <section className="bg-tp-beige py-16 sm:py-20" aria-labelledby="studio-comparison-heading">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2
          id="studio-comparison-heading"
          className="text-center font-display text-4xl font-normal text-tp-black sm:text-5xl"
        >
          AI Headshots vs Traditional Studio
        </h2>

        <div className="mt-10 grid overflow-hidden rounded-tp-card border border-tp-line bg-tp-paper md:grid-cols-2">
          {/* Studio column */}
          <div className="p-6 sm:p-8">
            <h3 className="font-display text-2xl font-normal text-tp-muted">Traditional Studio</h3>
            <ul className="mt-6 space-y-5">
              {ROWS.map(({ label, icon: Icon, studio, studioEstimate }) => (
                <li key={label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-tp-muted" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-tp-muted">
                      {label}
                    </p>
                    <p className="mt-1 flex items-start gap-2 font-sans text-base text-tp-muted">
                      <X className="mt-1 h-4 w-4 shrink-0 text-tp-muted" aria-hidden="true" />
                      <span>
                        {studio}
                        {studioEstimate && (
                          <span className="mt-1 block text-xs">
                            Based on typical portrait studio pricing (estimate)
                          </span>
                        )}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* TailorPic column */}
          <div className="border-t border-tp-line bg-tp-bronze/10 p-6 sm:p-8 md:border-l md:border-t-0">
            <h3 className="font-display text-2xl font-normal text-tp-bronze-ink">TailorPic AI</h3>
            <ul className="mt-6 space-y-5">
              {ROWS.map(({ label, icon: Icon, tailorpic, studioEstimate }) => (
                <li key={label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-tp-bronze-ink">
                      {label}
                    </p>
                    <p className="mt-1 flex items-start gap-2 font-sans text-base font-semibold text-tp-ink">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-tp-bronze" aria-hidden="true" />
                      <span>
                        {tailorpic}
                        {studioEstimate && (
                          <span className="mt-1 block text-xs font-normal text-tp-muted">
                            {BASE_PRICE_DISPLAY} buys a single photo; larger packages include more.
                          </span>
                        )}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/auth/register?redirect=/dashboard/upload"
            className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}
          >
            Try TailorPic &mdash; From {BASE_PRICE_DISPLAY} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
