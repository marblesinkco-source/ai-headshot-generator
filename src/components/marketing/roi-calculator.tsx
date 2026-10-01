'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Camera, Sparkles } from 'lucide-react';

const TRADITIONAL_PER_PERSON = 150;
const TAILORPIC_PER_PERSON = 19.9;
const MIN_TEAM = 1;
const MAX_TEAM = 100;

function formatUSD(value: number): string {
  return `$${value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export function ROICalculator({
  ctaHref = '/auth/register',
  ctaLabel = 'Get Started',
}: {
  ctaHref?: string;
  ctaLabel?: string;
} = {}) {
  const [teamSize, setTeamSize] = useState(10);

  const traditional = teamSize * TRADITIONAL_PER_PERSON;
  const tailorpic = teamSize * TAILORPIC_PER_PERSON;
  const savings = traditional - tailorpic;
  const savingsPct = Math.round((savings / traditional) * 100);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-tp-card border border-tp-line bg-tp-paper p-6 sm:p-10">
          <h2 className="font-display text-2xl sm:text-3xl text-tp-ink text-center">
            Calculate Your Savings
          </h2>

          {/* Slider */}
          <div className="mt-8">
            <div className="flex items-baseline justify-between">
              <label htmlFor="roi-team-size" className="text-sm font-medium text-tp-ink">
                Team size
              </label>
              <span className="font-display text-2xl text-tp-ink" aria-live="polite">
                {teamSize} {teamSize === 1 ? 'person' : 'people'}
              </span>
            </div>
            <input
              id="roi-team-size"
              type="range"
              min={MIN_TEAM}
              max={MAX_TEAM}
              step={1}
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="mt-3 h-2 w-full cursor-pointer appearance-auto rounded-full bg-tp-line"
              style={{ accentColor: '#C9A98A' }}
            />
            <div className="mt-1 flex justify-between text-xs text-tp-muted">
              <span>{MIN_TEAM}</span>
              <span>{MAX_TEAM}</span>
            </div>
          </div>

          {/* Comparison */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-tp-card border border-tp-line bg-tp-beige/30 p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-tp-muted">
                <Camera className="h-4 w-4" aria-hidden="true" />
                Traditional Photoshoot
              </div>
              <p className="mt-3 font-display text-3xl text-tp-ink">{formatUSD(traditional)}</p>
              <p className="mt-1 text-xs text-tp-muted">{formatUSD(TRADITIONAL_PER_PERSON)} per person</p>
            </div>
            <div className="rounded-tp-card border border-tp-bronze/40 bg-tp-bronze/10 p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-tp-bronze-ink">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                TailorPic
              </div>
              <p className="mt-3 font-display text-3xl text-tp-ink">{formatUSD(tailorpic)}</p>
              <p className="mt-1 text-xs text-tp-muted">{formatUSD(TAILORPIC_PER_PERSON)} per person</p>
            </div>
          </div>

          {/* Savings */}
          <div className="mt-8 rounded-tp-card bg-tp-black p-6 text-center">
            <p className="text-sm text-tp-beige/70">Your estimated savings</p>
            <p className="mt-2 font-display text-5xl sm:text-6xl text-tp-bronze">
              {formatUSD(savings)}
            </p>
            <p className="mt-2 text-sm text-tp-beige/70">
              That&apos;s {savingsPct}% less than traditional photography
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-ink px-6 py-3 text-sm font-semibold text-tp-paper transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              {ctaLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <p className="mt-6 text-center text-xs text-tp-muted">
            Estimates based on average studio photography costs. Actual savings may vary.
          </p>
        </div>
      </div>
    </section>
  );
}
