'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BASE_PRICE_DISPLAY, TEAM_PRICES } from '@/config/pricing';
import { formatPrice } from '@/lib/utils';
import { CATEGORIES } from '@/config/categories';

const MIN_PEOPLE = 1;
const MAX_PEOPLE = 50;
const MIN_STUDIO = 100;
const MAX_STUDIO = 1000;

// Looked up by id (not array index) so reordering the package list cannot break this.
// Fallback is the Professional price from the pricing ladder in CLAUDE.md ($49.90).
const PROFESSIONAL_CENTS =
  CATEGORIES.headshots.packages.find((p) => p.id === 'headshots-professional')?.price ?? 4990;

function clamp(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, Math.round(value)));
}

/** Display-only estimate. Actual charges are defined server-side. */
function tailorpicTotalCents(people: number) {
  if (people >= TEAM_PRICES.large.min) return people * TEAM_PRICES.large.perPersonCents;
  if (people >= TEAM_PRICES.small.min) return people * TEAM_PRICES.small.perPersonCents;
  return people * PROFESSIONAL_CENTS;
}

function tailorpicBasis(people: number) {
  if (people >= TEAM_PRICES.large.min) {
    return `${formatPrice(TEAM_PRICES.large.perPersonCents, 'usd', true)} per person (team pricing)`;
  }
  if (people >= TEAM_PRICES.small.min) {
    return `${formatPrice(TEAM_PRICES.small.perPersonCents, 'usd', true)} per person (team pricing)`;
  }
  return `${formatPrice(PROFESSIONAL_CENTS, 'usd')} per person (Professional package)`;
}

export function SavingsCalculator() {
  const [people, setPeople] = useState(1);
  const [studioPrice, setStudioPrice] = useState(350);

  const studioCents = people * studioPrice * 100;
  const tailorpicCents = tailorpicTotalCents(people);
  const savingsCents = Math.max(0, studioCents - tailorpicCents);

  const inputClass =
    'w-full rounded-tp-button border border-tp-line bg-tp-paper px-4 py-3 font-sans text-base text-tp-ink focus:border-tp-bronze-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink/40';

  return (
    <section className="bg-tp-beige py-16 sm:py-20" aria-labelledby="savings-calculator-heading">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-tp-bronze-ink">
            Calculate your savings
          </p>
          <h2
            id="savings-calculator-heading"
            className="mt-3 font-display text-3xl font-normal text-tp-black sm:text-4xl md:text-5xl"
          >
            How much could you save?
          </h2>
          <p className="mt-4 font-sans text-base text-tp-muted sm:text-lg">
            Compare traditional studio costs with TailorPic.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Inputs */}
          <form
            className="space-y-8 rounded-tp-card border border-tp-line bg-tp-paper p-6 sm:p-8"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Savings calculator inputs"
          >
            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor="savings-people" className="font-sans text-sm font-semibold text-tp-ink">
                  Number of people
                </label>
                <span className="font-sans text-sm text-tp-muted" aria-hidden="true">
                  {people}
                </span>
              </div>
              <input
                id="savings-people"
                type="range"
                min={MIN_PEOPLE}
                max={MAX_PEOPLE}
                step={1}
                value={people}
                onChange={(e) => setPeople(clamp(Number(e.target.value), MIN_PEOPLE, MAX_PEOPLE))}
                aria-label="Number of people"
                aria-valuetext={`${people} ${people === 1 ? 'person' : 'people'}`}
                className="mt-3 w-full accent-tp-bronze"
              />
              <input
                type="number"
                inputMode="numeric"
                min={MIN_PEOPLE}
                max={MAX_PEOPLE}
                value={people}
                onChange={(e) => setPeople(clamp(Number(e.target.value), MIN_PEOPLE, MAX_PEOPLE))}
                aria-label="Number of people (type a value)"
                className={`${inputClass} mt-3`}
              />
              <p className="mt-2 font-sans text-xs text-tp-muted">
                {MIN_PEOPLE} to {MAX_PEOPLE} people.
              </p>
            </div>

            <div>
              <label htmlFor="savings-studio" className="font-sans text-sm font-semibold text-tp-ink">
                Studio cost per person
              </label>
              <div className="relative mt-3">
                <span
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-sans text-tp-muted"
                  aria-hidden="true"
                >
                  $
                </span>
                <input
                  id="savings-studio"
                  type="number"
                  inputMode="numeric"
                  min={MIN_STUDIO}
                  max={MAX_STUDIO}
                  step={10}
                  value={studioPrice}
                  onChange={(e) => setStudioPrice(Number(e.target.value))}
                  onBlur={() => setStudioPrice((v) => clamp(v, MIN_STUDIO, MAX_STUDIO))}
                  aria-label="Studio cost per person in US dollars"
                  aria-describedby="savings-studio-hint"
                  className={`${inputClass} pl-8`}
                />
              </div>
              <p id="savings-studio-hint" className="mt-2 font-sans text-xs text-tp-muted">
                Enter what a studio would charge you, from ${MIN_STUDIO} to ${MAX_STUDIO}.
              </p>
            </div>
          </form>

          {/* Results */}
          <div
            className="flex flex-col rounded-tp-card border border-tp-line bg-tp-paper p-6 sm:p-8"
            aria-live="polite"
          >
            <dl className="space-y-5">
              <div className="flex items-start justify-between gap-4 border-b border-tp-line pb-5">
                <div>
                  <dt className="font-sans text-sm font-semibold text-tp-ink">Traditional studio</dt>
                  <dd className="mt-1 font-sans text-xs text-tp-muted">
                    {people} &times; {formatPrice(studioPrice * 100, 'usd', true)} (your input)
                  </dd>
                </div>
                <p className="font-sans text-2xl font-semibold text-tp-ink">
                  {formatPrice(studioCents, 'usd', true)}
                </p>
              </div>

              <div className="flex items-start justify-between gap-4 border-b border-tp-line pb-5">
                <div>
                  <dt className="font-sans text-sm font-semibold text-tp-ink">TailorPic</dt>
                  <dd className="mt-1 font-sans text-xs text-tp-muted">{tailorpicBasis(people)}</dd>
                </div>
                <p className="font-sans text-2xl font-semibold text-tp-ink">
                  {formatPrice(tailorpicCents, 'usd')}
                </p>
              </div>
            </dl>

            <div className="mt-6 rounded-tp-card bg-tp-bronze/10 p-4 text-center sm:p-6">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-tp-bronze-ink">
                You save
              </p>
              <p className="mt-2 font-display text-4xl font-normal text-tp-black sm:text-5xl md:text-6xl">
                {formatPrice(savingsCents, 'usd')}
              </p>
            </div>

            <Link
              href="/auth/register?redirect=%2Fdashboard%2Fupload"
              className="mt-6 inline-flex items-center justify-center rounded-tp-button bg-tp-black px-6 py-3.5 font-sans text-base font-semibold text-tp-paper transition-colors hover:bg-tp-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2"
            >
              Get Started
            </Link>
            <p className="mt-3 text-center font-sans text-xs text-tp-muted">
              TailorPic is available from {BASE_PRICE_DISPLAY} for a single photo.
            </p>
          </div>
        </div>

        <p className="mt-8 text-center font-sans text-sm text-tp-muted">
          Studio costs vary by location and photographer. Enter your local rates above.
        </p>
      </div>
    </section>
  );
}
