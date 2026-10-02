'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight, Calculator, Clock, DollarSign, Users } from 'lucide-react';
import { TEAM_PRICES, BASE_PRICE_DISPLAY } from '@/config/pricing';
import { CATEGORIES } from '@/config/categories';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

/**
 * Studio cost is a USER-ADJUSTABLE ASSUMPTION, not a sourced claim.
 * Default: $250/person — a labelled, editable baseline.
 */
const DEFAULT_STUDIO_PER_PERSON = 250;
const STUDIO_PRESETS = [150, 200, 250, 350, 500];

function tailorpicCost(people: number): number {
  if (people === 1) {
    // Cheapest individual headshots package
    const pkgs = CATEGORIES.headshots.packages;
    return Math.min(...pkgs.map((p) => p.price)) / 100;
  }
  if (people >= TEAM_PRICES.large.min) {
    return (TEAM_PRICES.large.perPersonCents / 100) * people;
  }
  if (people >= TEAM_PRICES.small.min) {
    return (TEAM_PRICES.small.perPersonCents / 100) * people;
  }
  // Under team minimum: individual pricing — recommended package per person
  const rec = CATEGORIES.headshots.packages.find((p) => p.recommended);
  return rec ? (rec.price / 100) * people : 49.9 * people;
}

function studioWeeks(people: number): string {
  if (people <= 2) return '1–2 weeks';
  if (people <= 10) return '2–4 weeks';
  if (people <= 25) return '4–8 weeks';
  return '2–3 months';
}

export function StudioVsAI() {
  const [people, setPeople] = useState(10);
  const [studioCost, setStudioCost] = useState(DEFAULT_STUDIO_PER_PERSON);

  const data = useMemo(() => {
    const studio = studioCost * people;
    const ai = tailorpicCost(people);
    const savings = studio - ai;
    const pct = Math.round((savings / studio) * 100);
    return { studio, ai, savings, pct };
  }, [people, studioCost]);

  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="studio-vs-ai-heading">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-tp-bronze/15">
            <Calculator className="h-6 w-6 text-tp-bronze-ink" />
          </div>
          <h2
            id="studio-vs-ai-heading"
            className="font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl"
          >
            Studio vs. AI — See Your Savings
          </h2>
          <p className="mt-3 text-base text-tp-muted">
            Drag the slider to see how much your team saves with AI headshots.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {/* Controls row */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Team size slider */}
            <div>
              <label htmlFor="team-slider" className="flex items-center gap-2 text-sm font-semibold text-tp-ink">
                <Users className="h-4 w-4 text-tp-bronze-ink" />
                Team size
              </label>
              <div className="mt-3 flex items-center gap-4">
                <input
                  id="team-slider"
                  type="range"
                  min={1}
                  max={50}
                  step={1}
                  value={people}
                  onChange={(e) => setPeople(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-tp-line accent-tp-bronze-ink [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-tp-bronze-ink [&::-webkit-slider-thumb]:shadow-md"
                />
                <span className="flex h-10 min-w-[3.5rem] items-center justify-center rounded-tp-button border border-tp-line bg-tp-paper px-2 text-lg font-semibold tabular-nums text-tp-ink">
                  {people}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-tp-muted">
                {people === 1
                  ? 'Individual — starting at ' + BASE_PRICE_DISPLAY
                  : people < TEAM_PRICES.small.min
                    ? `${people} people — individual pricing`
                    : people <= TEAM_PRICES.small.max
                      ? `${people} people — team rate ${formatPrice(TEAM_PRICES.small.perPersonCents)}/person`
                      : `${people} people — team rate ${formatPrice(TEAM_PRICES.large.perPersonCents)}/person`}
              </p>
            </div>

            {/* Studio cost assumption */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-tp-ink">
                <DollarSign className="h-4 w-4 text-tp-bronze-ink" />
                Studio cost per person
                <span className="ml-1 text-[10px] font-normal text-tp-muted">(your estimate)</span>
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                {STUDIO_PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setStudioCost(p)}
                    className={cn(
                      'rounded-tp-button border px-3 py-2 text-sm font-medium transition-all',
                      studioCost === p
                        ? 'border-tp-bronze bg-tp-bronze/10 text-tp-bronze-ink shadow-sm'
                        : 'border-tp-line text-tp-muted hover:border-tp-bronze/40 hover:text-tp-ink'
                    )}
                  >
                    ${p}
                  </button>
                ))}
              </div>
              <p className="mt-1.5 text-xs text-tp-muted">
                Average studio session cost. Adjust to match your local rates.
              </p>
            </div>
          </div>

          {/* Comparison cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Studio card */}
            <div className="rounded-tp-card border border-tp-line bg-tp-paper p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-tp-muted">
                Traditional Studio
              </p>
              <p className="mt-3 font-display text-4xl font-normal tabular-nums text-tp-ink sm:text-5xl">
                ${data.studio.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-tp-muted">
                {people} {people === 1 ? 'person' : 'people'} × ${studioCost}/person
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-tp-muted">
                <Clock className="h-4 w-4 shrink-0" />
                <span>Scheduling + delivery: {studioWeeks(people)}</span>
              </div>
            </div>

            {/* TailorPic card */}
            <div className="relative rounded-tp-card border-2 border-tp-bronze/40 bg-white p-6 shadow-lg">
              <div className="absolute -top-3 right-4 rounded-tp-button bg-tp-bronze px-3 py-0.5 text-xs font-semibold text-tp-black">
                Save {data.pct}%
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-tp-bronze-ink">
                TailorPic
              </p>
              <p className="mt-3 font-display text-4xl font-normal tabular-nums text-tp-ink sm:text-5xl">
                ${data.ai.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="mt-1 text-sm text-tp-muted">
                {people === 1 ? 'Starting price' : `${people} people — one-time`}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-tp-bronze-ink">
                <Clock className="h-4 w-4 shrink-0" />
                <span>Ready in under 2 hours</span>
              </div>
            </div>
          </div>

          {/* Savings bar */}
          <div className="rounded-tp-card border border-tp-line bg-tp-beige/30 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-sm font-semibold text-tp-ink">
                You save
              </span>
              <span className="font-display text-2xl font-normal tabular-nums text-tp-bronze-ink sm:text-3xl">
                ${data.savings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            {/* Visual bar */}
            <div className="mt-3 flex h-3 gap-0.5 overflow-hidden rounded-full">
              <div
                className="rounded-l-full bg-tp-bronze transition-all duration-500"
                style={{ width: `${Math.max(1, 100 - (data.ai / data.studio) * 100)}%` }}
                aria-label={`Savings: ${data.pct}%`}
              />
              <div
                className="rounded-r-full bg-tp-line transition-all duration-500"
                style={{ width: `${Math.max(1, (data.ai / data.studio) * 100)}%` }}
                aria-label={`TailorPic cost: ${100 - data.pct}%`}
              />
            </div>
            <p className="mt-2 text-xs text-tp-muted">
              Studio cost is your own estimate — not a quoted or verified rate. TailorPic prices are one-time, no subscription.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href={people >= TEAM_PRICES.small.min ? '/team-headshots' : '/auth/register?redirect=/headshots'}
              className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'w-full sm:w-auto')}
            >
              {people >= TEAM_PRICES.small.min ? 'Get Team Pricing' : 'Get Started'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <p className="mt-3 text-xs text-tp-muted">
              No subscription · One-time payment
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudioVsAI;
