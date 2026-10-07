'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Camera, Sparkles } from 'lucide-react';
import { TEAM_PRICES } from '@/config/pricing';

const TRADITIONAL_PER_PERSON = 150;
const MIN_TEAM = 5;
const MAX_TEAM = 100;

/** Matches the enterprise pricing tiers on /enterprise */
function tailorpicPerPerson(teamSize: number): number {
  if (teamSize >= 50) return TEAM_PRICES.large.perPersonCents / 100; // Enterprise is custom; use the large-team rate
  if (teamSize >= 16) return 29;
  return 39; // 5-15
}

function tailorpicTotal(teamSize: number): number {
  return teamSize * tailorpicPerPerson(teamSize);
}

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

  const perPerson = tailorpicPerPerson(teamSize);
  const traditional = teamSize * TRADITIONAL_PER_PERSON;
  const tailorpicCost = tailorpicTotal(teamSize);
  const savings = traditional - tailorpicCost;
  const savingsPct = Math.round((savings / traditional) * 100);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-tp-card border border-tp-line bg-tp-paper p-6 sm:p-10">
          <h2 className="font-display font-normal text-2xl sm:text-3xl text-tp-ink text-center">
            Calculate Your Savings
          </h2>

          {/* Slider */}
          <div className="mt-8">
            <div className="flex items-baseline justify-between">
              <label htmlFor="roi-team-size" className="text-sm font-medium text-tp-ink">
                Team size
              </label>
              <span className="font-display font-normal text-2xl text-tp-ink" aria-live="polite">
                {teamSize} {teamSize === 1 ? 'person' : 'people'}
              </span>
            </div>
            <div className="relative mt-3">
              <input
                id="roi-team-size"
                type="range"
                min={MIN_TEAM}
                max={MAX_TEAM}
                step={1}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="roi-slider h-2 w-full cursor-pointer appearance-none rounded-full bg-tp-line"
              />
              <style jsx>{`
                .roi-slider::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: #0B0B0B;
                  border: 3px solid #C9A98A;
                  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
                  cursor: pointer;
                  transition: transform 0.15s ease, box-shadow 0.15s ease;
                }
                .roi-slider::-webkit-slider-thumb:hover {
                  transform: scale(1.15);
                  box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                }
                .roi-slider::-moz-range-thumb {
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: #0B0B0B;
                  border: 3px solid #C9A98A;
                  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
                  cursor: pointer;
                }
                .roi-slider::-webkit-slider-runnable-track {
                  height: 8px;
                  border-radius: 9999px;
                  background: linear-gradient(to right, #C9A98A ${((teamSize - MIN_TEAM) / (MAX_TEAM - MIN_TEAM)) * 100}%, #DFD6CC ${((teamSize - MIN_TEAM) / (MAX_TEAM - MIN_TEAM)) * 100}%);
                }
                .roi-slider::-moz-range-track {
                  height: 8px;
                  border-radius: 9999px;
                  background: linear-gradient(to right, #C9A98A ${((teamSize - MIN_TEAM) / (MAX_TEAM - MIN_TEAM)) * 100}%, #DFD6CC ${((teamSize - MIN_TEAM) / (MAX_TEAM - MIN_TEAM)) * 100}%);
                }
              `}</style>
            </div>
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
              <p className="mt-3 font-display font-normal text-3xl text-tp-ink">{formatUSD(traditional)}</p>
              <p className="mt-1 text-xs text-tp-muted">{formatUSD(TRADITIONAL_PER_PERSON)} per person</p>
            </div>
            <div className="rounded-tp-card border border-tp-bronze/40 bg-tp-bronze/10 p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-tp-bronze-ink">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                TailorPic
              </div>
              <p className="mt-3 font-display font-normal text-3xl text-tp-ink">{formatUSD(tailorpicCost)}</p>
              <p className="mt-1 text-xs text-tp-muted">{formatUSD(perPerson)} per person</p>
            </div>
          </div>

          {/* Savings */}
          <div className="mt-8 rounded-tp-card bg-tp-black p-6 text-center">
            <p className="text-sm text-tp-beige/70">Your estimated savings</p>
            <p className="mt-2 font-display font-normal text-5xl sm:text-6xl text-tp-bronze">
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
