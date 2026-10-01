import Link from 'next/link';
import { ArrowRight, Calendar, Camera, Clock } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const STUDIO_LOW = 200;
const STUDIO_HIGH = 500;
const TAILORPIC = 9.9;

// Savings vs. the low end of studio pricing ($200) is the conservative figure: ~95%.
const savingsPercent = Math.floor((1 - TAILORPIC / STUDIO_LOW) * 100);
const savingsLow = (STUDIO_LOW - TAILORPIC).toFixed(2);
const savingsHigh = (STUDIO_HIGH - TAILORPIC).toFixed(2);

// Bar widths are proportional to price, scaled to the $500 studio price.
// TailorPic gets a small minimum width so the bar stays visible.
const bars = [
  {
    label: 'Studio, high end',
    price: '$500',
    width: '100%',
    barClass: 'bg-tp-beige',
    priceClass: 'text-tp-muted',
  },
  {
    label: 'Studio, low end',
    price: '$200',
    width: `${(STUDIO_LOW / STUDIO_HIGH) * 100}%`,
    barClass: 'bg-tp-beige',
    priceClass: 'text-tp-muted',
  },
  {
    label: 'TailorPic',
    price: '$9.90',
    width: '3%',
    barClass: 'bg-tp-bronze',
    priceClass: 'text-tp-ink font-semibold',
  },
];

const valueProps = [
  { icon: Calendar, title: 'No scheduling needed', body: 'Upload selfies whenever it suits you. No booking, no travel.' },
  { icon: Camera, title: '40+ photos included', body: 'Plenty of looks and backgrounds to choose from.' },
  { icon: Clock, title: 'Ready in ~2 hours', body: 'Skip the weeks of waiting on a studio session.' },
];

export function SavingsHighlight() {
  return (
    <section className="bg-tp-paper py-16 sm:py-24" aria-labelledby="savings-heading">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tp-bronze-ink">
            Your savings
          </p>
          <h2
            id="savings-heading"
            className="mt-3 font-display font-normal text-4xl leading-tight text-tp-ink sm:text-5xl"
          >
            Professional headshots, without the studio bill
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-5">
          {/* Price comparison bars */}
          <div className="rounded-tp-card border border-tp-line bg-white p-6 sm:p-8 md:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-tp-muted">
              Cost of one professional headshot set
            </p>

            <ul className="mt-6 space-y-5">
              {bars.map((bar) => (
                <li key={bar.label}>
                  <div className="flex items-baseline justify-between gap-4 text-sm">
                    <span className="text-tp-muted">{bar.label}</span>
                    <span className={cn('font-display font-normal text-2xl', bar.priceClass)}>
                      {bar.price}
                    </span>
                  </div>
                  <div
                    className="mt-2 h-4 w-full overflow-hidden rounded-tp-button bg-tp-paper"
                    role="presentation"
                  >
                    <div
                      className={cn('h-full rounded-tp-button', bar.barClass)}
                      style={{ width: bar.width }}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-xs leading-relaxed text-tp-muted">
              Bars are drawn to scale. Studio prices are typical single-session costs, before
              retouching or extra looks. TailorPic is a one-time price for individuals.
            </p>
          </div>

          {/* Savings callout */}
          <div className="flex flex-col justify-between rounded-tp-card bg-tp-ink p-6 text-tp-paper sm:p-8 md:col-span-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze">
                TailorPic
              </p>
              <p className="mt-4 font-display font-normal text-6xl text-tp-paper sm:text-7xl">
                $9.90
              </p>
              <p className="mt-1 text-sm text-tp-beige">one-time for individuals</p>
            </div>

            <div className="mt-8">
              <p className="inline-block rounded-tp-button bg-tp-bronze px-3 py-1.5 text-sm font-semibold text-tp-black">
                Save up to {savingsPercent}%
              </p>
              <p className="mt-3 text-sm leading-relaxed text-tp-beige">
                That is ${savingsLow} to ${savingsHigh} back in your pocket compared with a
                traditional studio.
              </p>
            </div>
          </div>
        </div>

        <ul className="mt-5 grid gap-5 sm:grid-cols-3">
          {valueProps.map(({ icon: Icon, title, body }) => (
            <li key={title} className="rounded-tp-card border border-tp-line bg-white p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-beige/50 text-tp-bronze-ink">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-tp-ink">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-tp-muted">{body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link
            href="/auth/register"
            className={cn(buttonVariants({ size: 'lg' }), 'rounded-tp-button')}
          >
            Start Saving Today
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
