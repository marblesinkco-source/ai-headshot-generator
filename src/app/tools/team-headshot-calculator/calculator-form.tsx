'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Users, Calculator, Clock, DollarSign, ArrowRight, TrendingDown } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TEAM_PRICES } from '@/config/pricing';
import { siteConfig } from '@/config/site';

const MIN_TEAM = 5;
const MAX_TEAM = 100;
const DEFAULT_TEAM = 10;
const DEFAULT_COST = 200;

// Time assumptions (estimates, shown to the user as such).
const TRADITIONAL_HOURS_PER_PERSON = 2; // scheduling + shooting + editing
const TAILORPIC_HOURS_PER_PERSON = 0.25; // upload + select (15 min)

const usd = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(n);

const hours = (n: number) => {
  const rounded = Math.round(n * 10) / 10;
  return `${rounded.toLocaleString('en-US')} ${rounded === 1 ? 'hr' : 'hrs'}`;
};

/** Per-person TailorPic team price in dollars. 51+ uses the 16-50 rate. */
function perPersonPrice(team: number): number {
  return (team >= TEAM_PRICES.large.min ? TEAM_PRICES.large.perPersonCents : TEAM_PRICES.small.perPersonCents) / 100;
}

export function CalculatorForm() {
  const [team, setTeam] = useState(DEFAULT_TEAM);
  const [costInput, setCostInput] = useState(String(DEFAULT_COST));

  const r = useMemo(() => {
    const parsed = parseFloat(costInput);
    const cost = Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
    const traditional = team * cost;
    const perPerson = perPersonPrice(team);
    const tailorpic = team * perPerson;
    const savings = traditional - tailorpic;
    const pct = traditional > 0 ? Math.round((savings / traditional) * 100) : 0;
    const tradHours = team * TRADITIONAL_HOURS_PER_PERSON;
    const tpHours = team * TAILORPIC_HOURS_PER_PERSON;
    return { cost, traditional, perPerson, tailorpic, savings, pct, tradHours, tpHours, savedHours: tradHours - tpHours };
  }, [team, costInput]);

  const cheaper = r.savings >= 0;

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="space-y-8 rounded-tp-card border border-tp-line bg-white p-6 shadow-sm lg:col-span-2 sm:p-8">
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="team-size" className="flex items-center gap-2 text-sm font-semibold text-tp-ink">
              <Users className="h-4 w-4 text-tp-bronze-ink" aria-hidden="true" />
              Team size
            </label>
            <output htmlFor="team-size" className="text-lg font-semibold text-tp-ink">
              {team} people
            </output>
          </div>
          <input
            id="team-size"
            type="range"
            min={MIN_TEAM}
            max={MAX_TEAM}
            step={1}
            value={team}
            onChange={(e) => setTeam(Number(e.target.value))}
            aria-valuetext={`${team} people`}
            className="mt-4 h-2 w-full cursor-pointer accent-tp-bronze focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2"
          />
          <div className="mt-1 flex justify-between text-xs text-tp-muted" aria-hidden="true">
            <span>{MIN_TEAM}</span>
            <span>{MAX_TEAM}</span>
          </div>
        </div>

        <div>
          <label htmlFor="photographer-cost" className="flex items-center gap-2 text-sm font-semibold text-tp-ink">
            <DollarSign className="h-4 w-4 text-tp-bronze-ink" aria-hidden="true" />
            Photographer cost per person
            <span className="rounded-full bg-tp-beige px-2 py-0.5 text-xs font-medium text-tp-bronze-ink">
              Your estimate
            </span>
          </label>
          <div className="relative mt-3">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-tp-muted" aria-hidden="true">
              $
            </span>
            <input
              id="photographer-cost"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={costInput}
              onChange={(e) => setCostInput(e.target.value)}
              aria-describedby="photographer-cost-help"
              className="w-full rounded-tp-button border-2 border-tp-line bg-white py-3 pl-7 pr-3 text-tp-ink focus:border-tp-bronze-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink focus:ring-offset-2"
            />
          </div>
          <p id="photographer-cost-help" className="mt-2 text-xs leading-relaxed text-tp-muted">
            ${DEFAULT_COST} is an editable placeholder, not a market price. Replace it with the quote you
            got from your photographer, including studio, retouching and any travel.
          </p>
        </div>

        <p className="text-xs leading-relaxed text-tp-muted">
          {siteConfig.name} team pricing: {usd(TEAM_PRICES.small.perPersonCents / 100)} per person for{' '}
          {TEAM_PRICES.small.min}-{TEAM_PRICES.small.max} people, {usd(TEAM_PRICES.large.perPersonCents / 100)} per
          person for {TEAM_PRICES.large.min}-{TEAM_PRICES.large.max}. Teams of {TEAM_PRICES.large.max + 1}+ are
          calculated at the {usd(TEAM_PRICES.large.perPersonCents / 100)} rate.
        </p>
      </div>

      <div className="space-y-6 lg:col-span-3" aria-live="polite">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-tp-card border border-tp-line bg-white p-6">
            <p className="flex items-center gap-2 text-sm font-medium text-tp-muted">
              <Calculator className="h-4 w-4" aria-hidden="true" />
              Traditional photography
            </p>
            <p className="mt-2 text-3xl font-semibold text-tp-ink">{usd(r.traditional)}</p>
            <p className="mt-1 text-xs text-tp-muted">
              {team} × {usd(r.cost)} (your estimate)
            </p>
          </div>
          <div className="rounded-tp-card border-2 border-tp-bronze bg-tp-paper p-6">
            <p className="flex items-center gap-2 text-sm font-medium text-tp-bronze-ink">
              <Users className="h-4 w-4" aria-hidden="true" />
              TailorPic team
            </p>
            <p className="mt-2 text-3xl font-semibold text-tp-ink">{usd(r.tailorpic)}</p>
            <p className="mt-1 text-xs text-tp-muted">
              {team} × {usd(r.perPerson)} per person
            </p>
          </div>
        </div>

        <div className="rounded-tp-card bg-tp-black p-6 text-white sm:p-8">
          <p className="flex items-center gap-2 text-sm font-medium text-white/70">
            <TrendingDown className="h-4 w-4" aria-hidden="true" />
            {cheaper ? 'Estimated savings' : 'Estimated difference'}
          </p>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <p className="text-4xl font-semibold sm:text-5xl">
              {cheaper ? usd(r.savings) : `-${usd(Math.abs(r.savings))}`}
            </p>
            {r.traditional > 0 && (
              <p className="text-lg text-white/80">
                {cheaper ? `${r.pct}% less` : `${Math.abs(r.pct)}% more`} than your photographer estimate
              </p>
            )}
          </div>
          {!cheaper && (
            <p className="mt-3 text-sm text-white/70">
              At your estimate, the photographer is cheaper on price alone. Time saved is shown below.
            </p>
          )}
        </div>

        <div className="rounded-tp-card border border-tp-line bg-white p-6">
          <h2 className="flex items-center gap-2 text-xl font-display font-normal text-tp-ink">
            <Clock className="h-5 w-5 text-tp-bronze-ink" aria-hidden="true" />
            Time saved (estimate)
          </h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-sm text-tp-muted">Traditional</dt>
              <dd className="mt-1 text-xl font-semibold text-tp-ink">{hours(r.tradHours)}</dd>
            </div>
            <div>
              <dt className="text-sm text-tp-muted">TailorPic</dt>
              <dd className="mt-1 text-xl font-semibold text-tp-ink">{hours(r.tpHours)}</dd>
            </div>
            <div>
              <dt className="text-sm text-tp-muted">Time saved</dt>
              <dd className="mt-1 text-xl font-semibold text-tp-bronze-ink">{hours(r.savedHours)}</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs leading-relaxed text-tp-muted">
            Estimates only. Traditional assumes about {TRADITIONAL_HOURS_PER_PERSON} hours per person for
            scheduling, shooting and editing. {siteConfig.name} assumes about 15 minutes per person to upload
            and select photos. Your actual times will vary.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/for-teams" className={cn(buttonVariants({ size: 'lg' }), 'w-full sm:w-auto')}>
            See team plans
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/auth/register"
            className={cn(buttonVariants({ size: 'lg', variant: 'outline' }), 'w-full sm:w-auto')}
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

