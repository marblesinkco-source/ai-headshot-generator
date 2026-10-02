'use client';

import { useState } from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { HelpCircle, ArrowRight, ArrowLeft, Sparkles, User, Users, Camera, Briefcase, Heart, GraduationCap, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '@/config/categories';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

type UseCase = 'linkedin' | 'business' | 'dating' | 'creative' | 'team';
type PhotoCount = 'few' | 'moderate' | 'many';

interface QuizState {
  step: number;
  useCase: UseCase | null;
  photoCount: PhotoCount | null;
  isTeam: boolean;
}

const USE_CASES: { id: UseCase; icon: React.ElementType; label: string; description: string }[] = [
  { id: 'linkedin', icon: Briefcase, label: 'LinkedIn / Resume', description: 'Professional profile photos' },
  { id: 'business', icon: User, label: 'Business / Corporate', description: 'Company website, email signature' },
  { id: 'dating', icon: Heart, label: 'Dating Profiles', description: 'Stand out on dating apps' },
  { id: 'creative', icon: GraduationCap, label: 'Creative / Personal', description: 'Social media, portfolio, fun' },
  { id: 'team', icon: Users, label: 'Team Photos', description: '5+ people, consistent style' },
];

const PHOTO_COUNTS: { id: PhotoCount; label: string; description: string; range: string }[] = [
  { id: 'few', label: 'Just a few', description: 'I need 1–10 photos', range: '1–10' },
  { id: 'moderate', label: 'A good set', description: 'I want 20–40 options', range: '20–40' },
  { id: 'many', label: 'Full variety', description: 'I want 80+ styles & backgrounds', range: '80+' },
];

function getRecommendation(state: QuizState) {
  const headshots = CATEGORIES.headshots;
  const packages = headshots.packages;

  if (state.useCase === 'team') {
    return {
      package: null,
      isTeam: true,
      title: 'Team Plan',
      price: '$39/person (5–15 people) or $29/person (16–50)',
      reason: 'Consistent headshots for your whole team with volume pricing and a single invoice.',
      href: '/team-headshots',
      ctaText: 'Get Team Pricing',
    };
  }

  if (state.useCase === 'dating') {
    const dating = CATEGORIES.dating;
    const rec = dating.packages.find((p) => p.recommended) || dating.packages[Math.floor(dating.packages.length / 2)];
    return {
      package: rec,
      isTeam: false,
      title: rec.name,
      price: formatPrice(rec.price),
      reason: `${rec.outputCount}+ photos across multiple styles — enough variety to find your best look for every app.`,
      href: `/auth/register?redirect=/dating`,
      ctaText: 'Get Started',
    };
  }

  // Headshots recommendations based on photo count need
  let rec;
  if (state.photoCount === 'few') {
    // Recommend Basic (10 photos) for small needs — enough to pick favorites
    rec = packages.find((p) => p.id === 'headshots-express')!;
    return {
      package: rec,
      isTeam: false,
      title: rec.name,
      price: formatPrice(rec.price),
      reason: `${rec.outputCount}+ headshots with ${rec.features[0]} and ${rec.features[1]}. Enough to find your favorites.`,
      href: '/auth/register?redirect=/headshots',
      ctaText: 'Get Started',
    };
  } else if (state.photoCount === 'many') {
    // Executive for maximum variety
    rec = packages.find((p) => p.id === 'headshots-executive')!;
    return {
      package: rec,
      isTeam: false,
      title: rec.name,
      price: formatPrice(rec.price),
      reason: `${rec.outputCount}+ headshots in 4K with ${rec.features[0]}, ${rec.features[1]}, plus LinkedIn banner and priority support.`,
      href: '/auth/register?redirect=/headshots',
      ctaText: 'Get Started',
    };
  } else {
    // Professional (recommended) for moderate needs
    rec = packages.find((p) => p.recommended)!;
    return {
      package: rec,
      isTeam: false,
      title: rec.name,
      price: formatPrice(rec.price),
      reason: `Our most popular pick: ${rec.outputCount}+ headshots with ${rec.features[0]} and ${rec.features[1]}. Great balance of variety and value.`,
      href: '/auth/register?redirect=/headshots',
      ctaText: 'Get Started',
    };
  }
}

export function PackageQuiz() {
  const [state, setState] = useState<QuizState>({
    step: 0,
    useCase: null,
    photoCount: null,
    isTeam: false,
  });
  const [showResult, setShowResult] = useState(false);

  const selectUseCase = (useCase: UseCase) => {
    if (useCase === 'team') {
      setState((s) => ({ ...s, useCase, isTeam: true, step: 2 }));
      setShowResult(true);
    } else {
      setState((s) => ({ ...s, useCase, isTeam: false, step: 1 }));
    }
  };

  const selectPhotoCount = (count: PhotoCount) => {
    setState((s) => ({ ...s, photoCount: count, step: 2 }));
    setShowResult(true);
  };

  const reset = () => {
    setState({ step: 0, useCase: null, photoCount: null, isTeam: false });
    setShowResult(false);
  };

  const goBack = () => {
    if (state.step === 1) {
      setState((s) => ({ ...s, step: 0, useCase: null }));
    } else if (showResult) {
      if (state.isTeam) {
        setState((s) => ({ ...s, step: 0, useCase: null, isTeam: false }));
        setShowResult(false);
      } else {
        setState((s) => ({ ...s, step: 1, photoCount: null }));
        setShowResult(false);
      }
    }
  };

  const recommendation = showResult ? getRecommendation(state) : null;

  return (
    <section className="bg-tp-paper py-20 sm:py-28" aria-labelledby="quiz-heading">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-tp-bronze/15">
            <HelpCircle className="h-6 w-6 text-tp-bronze-ink" />
          </div>
          <h2
            id="quiz-heading"
            className="font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl"
          >
            Not Sure Which Plan?
          </h2>
          <p className="mt-3 text-base text-tp-muted">
            Answer two quick questions and we&apos;ll recommend the best option for you.
          </p>
        </div>

        {/* Progress dots */}
        <div className="mt-8 flex items-center justify-center gap-2" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i <= state.step
                  ? 'w-8 bg-tp-bronze'
                  : 'w-2 bg-tp-line'
              )}
            />
          ))}
        </div>

        {/* Quiz content */}
        <div className="mt-10">
          {/* Step 0: Use case */}
          {state.step === 0 && !showResult && (
            <div>
              <p className="mb-5 text-center text-sm font-semibold text-tp-ink">
                What do you need photos for?
              </p>
              <div className="grid gap-3">
                {USE_CASES.map(({ id, icon: Icon, label, description }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => selectUseCase(id)}
                    className="flex items-center gap-4 rounded-tp-button border border-tp-line bg-white p-4 text-left transition-all hover:border-tp-bronze/50 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze-ink"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tp-bronze/10">
                      <Icon className="h-5 w-5 text-tp-bronze-ink" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-tp-ink">{label}</p>
                      <p className="text-xs text-tp-muted">{description}</p>
                    </div>
                    <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-tp-muted" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Photo count */}
          {state.step === 1 && !showResult && (
            <div>
              <button
                type="button"
                onClick={goBack}
                className="mb-5 flex items-center gap-1.5 text-sm text-tp-muted transition-colors hover:text-tp-ink"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>
              <p className="mb-5 text-center text-sm font-semibold text-tp-ink">
                How many photos do you need?
              </p>
              <div className="grid gap-3">
                {PHOTO_COUNTS.map(({ id, label, description, range }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => selectPhotoCount(id)}
                    className="flex items-center gap-4 rounded-tp-button border border-tp-line bg-white p-4 text-left transition-all hover:border-tp-bronze/50 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze-ink"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tp-bronze/10">
                      <Camera className="h-5 w-5 text-tp-bronze-ink" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-tp-ink">{label}</p>
                      <p className="text-xs text-tp-muted">{description}</p>
                    </div>
                    <span className="ml-auto shrink-0 rounded-full bg-tp-beige/60 px-2.5 py-0.5 text-xs font-medium text-tp-bronze-ink">
                      {range}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          {showResult && recommendation && (
            <div>
              <button
                type="button"
                onClick={goBack}
                className="mb-5 flex items-center gap-1.5 text-sm text-tp-muted transition-colors hover:text-tp-ink"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>

              <div className="rounded-tp-card border-2 border-tp-bronze/40 bg-white p-6 shadow-lg sm:p-8">
                <div className="flex items-center gap-2 text-tp-bronze-ink">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    Our Recommendation
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-normal text-tp-ink sm:text-3xl">
                  {recommendation.title}
                </h3>
                <p className="mt-1 text-lg font-semibold text-tp-bronze-ink">
                  {recommendation.price}
                  {!recommendation.isTeam && (
                    <span className="ml-1.5 text-sm font-normal text-tp-muted">one-time</span>
                  )}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-tp-muted">
                  {recommendation.reason}
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={recommendation.href}
                    className={buttonVariants({ variant: 'primary', size: 'lg' })}
                  >
                    {recommendation.ctaText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center justify-center gap-1.5 rounded-tp-button border border-tp-line px-4 py-2.5 text-sm font-medium text-tp-muted transition-colors hover:bg-tp-beige/30"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Start Over
                  </button>
                </div>
              </div>

              <p className="mt-4 text-center text-xs text-tp-muted">
                All plans include a 14-day money-back guarantee.{' '}
                <Link href="/#pricing" className="font-medium text-tp-bronze-ink underline underline-offset-2 hover:text-tp-ink">
                  See all plans
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PackageQuiz;
