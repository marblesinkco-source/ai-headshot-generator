'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type View = 'individual' | 'team';

const TEAM_TIERS = [
  {
    name: 'Small team',
    size: '5-15 people',
    price: '$39',
    unit: 'per person, one-time',
    highlight: false,
  },
  {
    name: 'Growing team',
    size: '16-50 people',
    price: '$29',
    unit: 'per person, one-time',
    highlight: true,
  },
  {
    name: 'Enterprise',
    size: '50+ people',
    price: 'Custom',
    unit: 'tailored to your team',
    highlight: false,
  },
];

const TEAM_PERKS = [
  'Consistent look across the whole team',
  'One-time payment per person, no subscription',
  '14-day money-back guarantee',
  'Full commercial rights',
  'Secure Stripe checkout',
];

export function PricingViewToggle({ individual }: { individual: ReactNode }) {
  const [view, setView] = useState<View>('individual');

  return (
    <div>
      <div className="flex justify-center px-4 pt-10">
        <div
          role="tablist"
          aria-label="Pricing view"
          className="inline-flex rounded-tp-button border border-tp-line bg-white p-1"
        >
          {(['individual', 'team'] as const).map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              id={`pricing-tab-${v}`}
              aria-selected={view === v}
              aria-controls={`pricing-panel-${v}`}
              onClick={() => setView(v)}
              className={cn(
                'rounded-tp-button px-6 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
                view === v
                  ? 'bg-tp-black text-tp-bronze'
                  : 'text-tp-muted hover:text-tp-ink'
              )}
            >
              {v === 'individual' ? 'Individual' : 'Team'}
            </button>
          ))}
        </div>
      </div>

      <div
        role="tabpanel"
        id="pricing-panel-individual"
        aria-labelledby="pricing-tab-individual"
        hidden={view !== 'individual'}
      >
        {individual}
      </div>

      <div
        role="tabpanel"
        id="pricing-panel-team"
        aria-labelledby="pricing-tab-team"
        hidden={view !== 'team'}
      >
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl text-tp-black sm:text-4xl">
                Team headshots, priced per person
              </h2>
              <p className="mt-4 text-base text-tp-muted">
                The more people on your team, the lower the per-person price.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {TEAM_TIERS.map((t) => (
                <div
                  key={t.name}
                  className={cn(
                    'relative rounded-tp-card border bg-white p-6 text-center sm:p-8',
                    t.highlight ? 'border-tp-bronze' : 'border-tp-line'
                  )}
                >
                  {t.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-tp-black px-3 py-1 text-xs font-semibold text-tp-bronze">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-tp-ink">{t.name}</h3>
                  <p className="mt-1 text-sm text-tp-muted">{t.size}</p>
                  <p className="mt-6 font-display text-5xl text-tp-black">{t.price}</p>
                  <p className="mt-2 text-sm text-tp-muted">{t.unit}</p>
                  <Link
                    href={t.price === 'Custom' ? '/for-teams' : '/auth/register'}
                    className={cn(
                      buttonVariants({
                        variant: t.highlight ? 'primary' : 'outline',
                        size: 'md',
                      }),
                      'mt-6 w-full'
                    )}
                  >
                    {t.price === 'Custom' ? 'Talk to us' : 'Get started'}
                  </Link>
                </div>
              ))}
            </div>
            <ul className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
              {TEAM_PERKS.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-tp-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-center text-sm text-tp-muted">
              Need help with a larger rollout? See our{' '}
              <Link
                href="/for-teams"
                className="font-medium text-tp-bronze-ink underline underline-offset-2 hover:text-tp-ink"
              >
                team page
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
