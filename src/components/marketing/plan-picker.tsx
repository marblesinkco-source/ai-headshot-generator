'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/config/categories';
import { formatPrice } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Check, ChevronRight } from 'lucide-react';

const headshots = CATEGORIES.headshots;

if (headshots.packages.length < 6) {
  throw new Error(
    `plan-picker expects at least 6 headshot packages but found ${headshots.packages.length}. ` +
    'Update this component after changing the package list in categories.ts.',
  );
}

const USE_CASES = [
  { id: 'single', label: 'Quick single photo', description: 'Just need one headshot' },
  { id: 'personal', label: 'Personal branding', description: 'LinkedIn, resume, portfolio' },
  { id: 'team', label: 'Team or company', description: 'Multiple team members' },
] as const;

const PHOTO_NEEDS = [
  { id: 'few', label: '1–5 photos', max: 5 },
  { id: 'medium', label: '10–40 photos', max: 40 },
  { id: 'many', label: '80+ photos', max: 999 },
] as const;

const BUDGETS = [
  { id: 'low', label: 'Under $10', max: 1000 },
  { id: 'mid', label: '$10–$30', max: 3000 },
  { id: 'high', label: '$30+', max: 99999 },
] as const;

type Step = 0 | 1 | 2 | 3;

function getRecommendation(
  useCase: string,
  photoNeed: string,
  budget: string
): (typeof headshots.packages)[number] {
  const packages = headshots.packages;

  // Find best match based on needs
  if (useCase === 'single' && budget === 'low') {
    return packages[0]; // TailorPic 1
  }

  if (photoNeed === 'few') {
    if (budget === 'low') return packages[0]; // TailorPic 1
    return packages[1]; // Lite
  }

  if (photoNeed === 'medium') {
    if (budget === 'low') return packages[1]; // Lite
    if (budget === 'mid') return packages[3]; // Starter
    return packages[4]; // Professional
  }

  // many photos
  if (budget === 'mid') return packages[3]; // Starter
  if (budget === 'high') return packages[5]; // Executive

  // Default to recommended
  const recommended = packages.find((p) => p.recommended);
  return recommended ?? packages[3];
}

export function PlanPicker() {
  const [step, setStep] = useState<Step>(0);
  const [useCase, setUseCase] = useState('');
  const [photoNeed, setPhotoNeed] = useState('');
  const [budget, setBudget] = useState('');

  const recommendation =
    step === 3 ? getRecommendation(useCase, photoNeed, budget) : null;

  function reset() {
    setStep(0);
    setUseCase('');
    setPhotoNeed('');
    setBudget('');
  }

  return (
    <section
      className="bg-tp-beige/40 py-20 sm:py-28"
      aria-labelledby="plan-picker-heading"
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tp-bronze-ink">
            Not Sure Which Plan?
          </p>
          <h2
            id="plan-picker-heading"
            className="mt-3 font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl"
          >
            Find Your Perfect Fit
          </h2>
          <p className="mt-3 text-sm text-tp-muted">
            Answer 3 quick questions and we&apos;ll recommend the right plan.
          </p>
        </div>

        {/* Stepper */}
        <div className="mt-10 rounded-tp-card border border-tp-line bg-white p-6 shadow-sm sm:p-8">
          {/* Progress dots */}
          <div className="mb-6 flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i < step
                    ? 'w-8 bg-tp-bronze'
                    : i === step && step < 3
                      ? 'w-8 bg-tp-bronze-ink'
                      : 'w-2 bg-tp-line'
                }`}
              />
            ))}
          </div>

          {/* Step 1: Use case */}
          {step === 0 && (
            <div>
              <p className="text-center text-sm font-medium text-tp-ink">
                What are the photos for?
              </p>
              <div className="mt-4 space-y-2.5">
                {USE_CASES.map(({ id, label, description }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setUseCase(id);
                      setStep(1);
                    }}
                    className="flex w-full items-center justify-between rounded-tp-button border border-tp-line px-4 py-3.5 text-left transition-colors hover:border-tp-bronze hover:bg-tp-bronze/5"
                  >
                    <div>
                      <span className="text-sm font-medium text-tp-ink">
                        {label}
                      </span>
                      <span className="mt-0.5 block text-xs text-tp-muted">
                        {description}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-tp-muted" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Photo count */}
          {step === 1 && (
            <div>
              <p className="text-center text-sm font-medium text-tp-ink">
                How many photos do you need?
              </p>
              <div className="mt-4 space-y-2.5">
                {PHOTO_NEEDS.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setPhotoNeed(id);
                      setStep(2);
                    }}
                    className="flex w-full items-center justify-between rounded-tp-button border border-tp-line px-4 py-3.5 text-left transition-colors hover:border-tp-bronze hover:bg-tp-bronze/5"
                  >
                    <span className="text-sm font-medium text-tp-ink">
                      {label}
                    </span>
                    <ChevronRight className="h-4 w-4 text-tp-muted" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {step === 2 && (
            <div>
              <p className="text-center text-sm font-medium text-tp-ink">
                What&apos;s your budget?
              </p>
              <div className="mt-4 space-y-2.5">
                {BUDGETS.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setBudget(id);
                      setStep(3);
                    }}
                    className="flex w-full items-center justify-between rounded-tp-button border border-tp-line px-4 py-3.5 text-left transition-colors hover:border-tp-bronze hover:bg-tp-bronze/5"
                  >
                    <span className="text-sm font-medium text-tp-ink">
                      {label}
                    </span>
                    <ChevronRight className="h-4 w-4 text-tp-muted" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          {step === 3 && recommendation && (
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tp-bronze/10">
                <Check className="h-7 w-7 text-tp-bronze" />
              </div>
              <p className="mt-4 text-sm text-tp-muted">
                We recommend the
              </p>
              <p className="mt-1 font-display text-2xl font-normal text-tp-ink">
                {recommendation.name} Plan
              </p>
              <p className="mt-2 text-2xl font-semibold text-tp-bronze-ink">
                {formatPrice(recommendation.price)}
              </p>
              <p className="mt-1 text-sm text-tp-muted">
                {recommendation.outputCount}{' '}
                {recommendation.outputCount === 1 ? 'photo' : 'photos'} ·
                One-time payment
              </p>
              <ul className="mx-auto mt-4 max-w-xs space-y-1.5 text-left">
                {recommendation.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-tp-ink"
                  >
                    <Check className="h-3.5 w-3.5 shrink-0 text-tp-bronze" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/auth/register?redirect=/dashboard/upload"
                  className={buttonVariants({
                    variant: 'primary',
                    size: 'lg',
                  })}
                >
                  Get Started
                </Link>
                <button
                  type="button"
                  onClick={reset}
                  className="text-sm font-medium text-tp-muted hover:text-tp-ink transition-colors"
                >
                  Start over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PlanPicker;
