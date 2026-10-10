'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';
import { TEAM_PRICES, BASE_PRICE_DISPLAY, formatPrice } from '@/config/pricing';

const STUDIO_PER_PERSON_CENTS = 25000; // $250 typical studio cost per person

function getTierInfo(size: number) {
  if (size <= 4) {
    // Individual — use the most popular package ($49.90 / 80 photos) as representative
    return {
      tier: 'Individual',
      perPersonCents: 4990,
      note: `Packages from ${BASE_PRICE_DISPLAY} per person`,
    };
  }
  if (size <= TEAM_PRICES.small.max) {
    return {
      tier: 'Small Team',
      perPersonCents: TEAM_PRICES.small.perPersonCents,
      note: `${TEAM_PRICES.small.min}-${TEAM_PRICES.small.max} people`,
    };
  }
  if (size <= TEAM_PRICES.large.max) {
    return {
      tier: 'Business',
      perPersonCents: TEAM_PRICES.large.perPersonCents,
      note: `${TEAM_PRICES.large.min}-${TEAM_PRICES.large.max} people`,
    };
  }
  // Enterprise — show the large tier price as baseline
  return {
    tier: 'Enterprise',
    perPersonCents: TEAM_PRICES.large.perPersonCents,
    note: 'Custom pricing available',
  };
}

export function TeamCalculator() {
  const [teamSize, setTeamSize] = useState(10);

  const handleSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamSize(Number(e.target.value));
  }, []);

  const { tier, perPersonCents, note } = getTierInfo(teamSize);
  const totalCents = perPersonCents * teamSize;
  const studioTotalCents = STUDIO_PER_PERSON_CENTS * teamSize;
  const savingsCents = studioTotalCents - totalCents;
  const savingsPercent = Math.round((savingsCents / studioTotalCents) * 100);

  // Slider gradient fill percentage
  const fillPercent = ((teamSize - 1) / (99)) * 100;

  return (
    <div className="rounded-tp-card border border-tp-line bg-white p-6 sm:p-8 lg:p-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-tp-beige px-3 py-1 text-xs font-semibold text-tp-bronze-ink mb-3">
          <Users className="h-3.5 w-3.5" />
          Cost Calculator
        </div>
        <h3 className="font-display font-normal text-2xl sm:text-3xl text-tp-ink">
          How Much Will Your Team Save?
        </h3>
        <p className="mt-2 text-sm text-tp-muted">
          Drag the slider to see pricing for your team size.
        </p>
      </div>

      {/* Slider */}
      <div className="mx-auto max-w-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-tp-ink">Team size</span>
          <span className="inline-flex items-center gap-1.5 rounded-tp-button bg-tp-black px-3 py-1 text-sm font-semibold text-white tabular-nums min-w-[64px] justify-center">
            {teamSize} {teamSize === 1 ? 'person' : 'people'}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={100}
          value={teamSize}
          onChange={handleSlider}
          className="team-calc-slider w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #C9A98A 0%, #C9A98A ${fillPercent}%, #e8e0d8 ${fillPercent}%, #e8e0d8 100%)`,
          }}
          aria-label="Team size"
        />
        <div className="flex justify-between text-xs text-tp-muted mt-1">
          <span>1</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>

      {/* Tier badge */}
      <div className="text-center mt-6 mb-6">
        <span className="inline-flex items-center rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-3 py-1 text-xs font-semibold text-tp-bronze-ink">
          {tier} Plan &mdash; {note}
        </span>
      </div>

      {/* Price cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* TailorPic price */}
        <div className="rounded-tp-card border border-tp-bronze bg-tp-black p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-tp-bronze mb-2">
            TailorPic
          </p>
          <p className="font-display font-normal text-3xl sm:text-4xl text-white tabular-nums">
            {formatPrice(totalCents, 'usd', true)}
          </p>
          <p className="mt-1 text-sm text-tp-beige/70">
            {formatPrice(perPersonCents, 'usd', true)} per person
          </p>
        </div>

        {/* Studio estimate */}
        <div className="rounded-tp-card border border-tp-line bg-tp-paper p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-tp-muted mb-2">
            Studio Estimate
          </p>
          <p className="font-display font-normal text-3xl sm:text-4xl text-tp-muted line-through tabular-nums">
            {formatPrice(studioTotalCents, 'usd', true)}
          </p>
          <p className="mt-1 text-sm text-tp-muted">
            ~$250 per person typical
          </p>
        </div>
      </div>

      {/* Savings bar */}
      <div className="mt-5 rounded-tp-button bg-green-50 border border-green-200 p-4 text-center">
        <p className="text-sm font-semibold text-green-800">
          You save {formatPrice(savingsCents, 'usd', true)} ({savingsPercent}% less than a studio)
        </p>
      </div>

      {/* CTA */}
      <div className="mt-6 text-center">
        <Link
          href={
            teamSize >= 50
              ? '#contact-sales'
              : '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dlinkedin-team'
          }
          className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:-translate-y-0.5 hover:bg-tp-bronze/90 hover:shadow-lg"
        >
          {teamSize >= 50 ? 'Request a Demo' : 'Get Started'} <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="mt-2 text-xs text-tp-muted">
          Final pricing is confirmed at checkout.
        </p>
      </div>

      {/* Slider thumb styling */}
      <style jsx>{`
        .team-calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #1a1a1a;
          border: 3px solid #C9A98A;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          transition: transform 0.15s ease;
        }
        .team-calc-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .team-calc-slider::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #1a1a1a;
          border: 3px solid #C9A98A;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
