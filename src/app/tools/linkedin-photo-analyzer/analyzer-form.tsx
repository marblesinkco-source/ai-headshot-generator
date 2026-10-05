'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, X, ArrowRight, RotateCcw, Sparkles, Lightbulb } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Answer = boolean | null;

const CRITERIA: { id: string; question: string; tip: string }[] = [
  {
    id: 'recent',
    question: 'Is your photo recent (taken within the last 2 years)?',
    tip: 'Replace it with a current photo. Recruiters want to recognize you when you show up to the call.',
  },
  {
    id: 'solo',
    question: 'Are you the only person in the photo?',
    tip: 'Crop out or replace group shots. Your profile photo should make you the clear focus.',
  },
  {
    id: 'background',
    question: 'Is the background clean and uncluttered?',
    tip: 'Use a plain or softly blurred background so nothing competes with your face.',
  },
  {
    id: 'lighting',
    question: 'Is your face clearly visible and well-lit?',
    tip: 'Face a window or soft light source. Avoid harsh shadows, backlighting, sunglasses and hats.',
  },
  {
    id: 'attire',
    question: 'Are you dressed professionally for your industry?',
    tip: 'Dress one notch above your everyday work style, and match what is normal in your field.',
  },
  {
    id: 'resolution',
    question: 'Is the photo high resolution (not blurry or pixelated)?',
    tip: 'Upload at least 400x400 px, ideally 800x800 or larger, from the original file, not a screenshot.',
  },
  {
    id: 'eye-contact',
    question: 'Are you making eye contact with the camera?',
    tip: 'Look straight into the lens with a relaxed, natural smile to come across as approachable.',
  },
  {
    id: 'framing',
    question: 'Does the photo show you from the chest up (proper framing)?',
    tip: 'Frame from the chest up with your face filling about 60% of the image, so it stays clear at thumbnail size.',
  },
];

const POINTS_PER_CRITERION = 100 / CRITERIA.length;

type Level = {
  label: string;
  badge: string;
  ring: string;
  panel: string;
  text: string;
  description: string;
};

function getLevel(score: number): Level {
  if (score <= 37) {
    return {
      label: 'Needs Work',
      badge: 'bg-red-600 text-white',
      ring: 'text-red-600',
      panel: 'border-red-200 bg-red-50',
      text: 'text-red-900',
      description:
        'Your photo is likely costing you profile views and connection requests. The good news: a few simple fixes can change the first impression completely.',
    };
  }
  if (score <= 62) {
    return {
      label: 'Good Start',
      badge: 'bg-amber-500 text-white',
      ring: 'text-amber-600',
      panel: 'border-amber-200 bg-amber-50',
      text: 'text-amber-900',
      description:
        'You have some of the basics right, but several gaps are holding your photo back from looking polished and trustworthy.',
    };
  }
  if (score <= 87) {
    return {
      label: 'Strong',
      badge: 'bg-blue-600 text-white',
      ring: 'text-blue-600',
      panel: 'border-blue-200 bg-blue-50',
      text: 'text-blue-900',
      description:
        'Your photo already makes a solid impression. Fixing the remaining items will take it from good to standout.',
    };
  }
  return {
    label: 'Excellent',
    badge: 'bg-emerald-600 text-white',
    ring: 'text-emerald-600',
    panel: 'border-emerald-200 bg-emerald-50',
    text: 'text-emerald-900',
    description:
      'Your photo ticks nearly every box. Keep it fresh, and consider an updated shot whenever your look or role changes.',
  };
}

function ScoreRing({ score, className }: { score: number; className: string }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 120 120" className="h-36 w-36 -rotate-90" aria-hidden="true">
      <circle cx="60" cy="60" r={r} fill="none" strokeWidth="10" className="stroke-tp-line" />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - score / 100)}
        className={cn('stroke-current transition-all duration-700 ease-out', className)}
      />
    </svg>
  );
}

function YesNo({
  id,
  value,
  onChange,
}: {
  id: string;
  value: Answer;
  onChange: (v: boolean) => void;
}) {
  const base =
    'flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-tp-button border-2 px-4 py-2 text-sm font-medium transition-all duration-200 focus-within:ring-2 focus-within:ring-tp-bronze focus-within:ring-offset-2 sm:flex-none sm:min-w-[84px]';
  const off = 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze/60 hover:bg-tp-paper';
  return (
    <div className="flex gap-2">
      <label
        className={cn(
          base,
          value === true ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-sm' : off,
        )}
      >
        <input
          type="radio"
          name={id}
          checked={value === true}
          onChange={() => onChange(true)}
          className="sr-only"
        />
        {value === true && <Check className="h-4 w-4" aria-hidden="true" />}
        Yes
      </label>
      <label
        className={cn(
          base,
          value === false ? 'border-red-500 bg-red-50 text-red-800 shadow-sm' : off,
        )}
      >
        <input
          type="radio"
          name={id}
          checked={value === false}
          onChange={() => onChange(false)}
          className="sr-only"
        />
        {value === false && <X className="h-4 w-4" aria-hidden="true" />}
        No
      </label>
    </div>
  );
}

export function AnalyzerForm() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [submitted, setSubmitted] = useState(false);
  const [shown, setShown] = useState(0);

  const answered = CRITERIA.filter((c) => answers[c.id] !== undefined && answers[c.id] !== null).length;
  const yesCount = CRITERIA.filter((c) => answers[c.id] === true).length;
  const score = Math.round(yesCount * POINTS_PER_CRITERION);
  const level = getLevel(score);
  const misses = CRITERIA.filter((c) => answers[c.id] === false);

  // Count the score up when results appear.
  useEffect(() => {
    if (!submitted) {
      setShown(0);
      return;
    }
    if (score === 0) return;
    let frame = 0;
    const steps = 24;
    const id = window.setInterval(() => {
      frame += 1;
      setShown(Math.round((score * frame) / steps));
      if (frame >= steps) window.clearInterval(id);
    }, 25);
    return () => window.clearInterval(id);
  }, [submitted, score]);

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div aria-live="polite" className="space-y-6">
        <div className={cn('rounded-tp-card border p-6 text-center shadow-sm sm:p-8', level.panel)}>
          <div className={cn('relative mx-auto flex h-36 w-36 items-center justify-center', level.ring)}>
            <ScoreRing score={shown} className={level.ring} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-display font-normal tabular-nums text-tp-ink">{shown}</span>
              <span className="text-xs font-medium text-tp-muted">out of 100</span>
            </div>
          </div>
          <span
            className={cn(
              'mt-5 inline-block rounded-full px-4 py-1.5 text-sm font-bold',
              level.badge,
            )}
          >
            {level.label}
          </span>
          <p className={cn('mx-auto mt-4 max-w-xl text-sm leading-relaxed sm:text-base', level.text)}>
            {level.description}
          </p>
        </div>

        {misses.length > 0 && (
          <div className="rounded-tp-card border border-tp-line bg-white p-5 shadow-sm sm:p-7">
            <h2 className="flex items-center gap-2 text-lg font-display font-normal text-tp-ink">
              <Lightbulb className="h-5 w-5 text-tp-bronze" aria-hidden="true" />
              How to improve your score
            </h2>
            <ul className="mt-4 space-y-4">
              {misses.map((m) => (
                <li key={m.id} className="flex gap-3">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-red-500" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-tp-ink">{m.question}</p>
                    <p className="mt-1 text-sm leading-relaxed text-tp-muted">{m.tip}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="rounded-tp-card border-2 border-tp-bronze bg-tp-paper p-6 text-center shadow-md sm:p-8">
          <div className="flex items-center justify-center gap-2 text-tp-bronze-ink">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-wide">TailorPic AI</span>
          </div>
          <p className="mt-3 text-lg font-bold text-tp-ink sm:text-xl">
            Hey, you can skip the checklist — let AI handle it
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-tp-muted">
            Upload a few selfies and get LinkedIn-ready headshots with clean backgrounds, perfect
            lighting and professional framing.
          </p>
          <Link
            href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
            className={buttonVariants({ size: 'lg', className: 'mt-5 w-full sm:w-auto' })}
          >
            Get AI Headshots — From $1.99 <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-tp-muted underline-offset-4 hover:text-tp-ink hover:underline"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Start over
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (answered === CRITERIA.length) setSubmitted(true);
      }}
      className="rounded-tp-card border border-tp-line bg-white p-5 shadow-sm sm:p-7"
      aria-label="LinkedIn photo checklist"
    >
      <div className="mb-5">
        <div className="flex items-center justify-between text-xs font-medium text-tp-muted">
          <span>
            {answered} of {CRITERIA.length} answered
          </span>
          <span>{Math.round((answered / CRITERIA.length) * 100)}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-tp-beige">
          <div
            className="h-full rounded-full bg-tp-bronze transition-all duration-300"
            style={{ width: `${(answered / CRITERIA.length) * 100}%` }}
          />
        </div>
      </div>

      <ol className="divide-y divide-tp-line">
        {CRITERIA.map((c, i) => (
          <li
            key={c.id}
            className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          >
            <fieldset className="contents">
              <legend className="float-left w-full text-sm font-semibold text-tp-ink sm:w-auto sm:max-w-md">
                <span className="mr-2 text-tp-bronze">{i + 1}.</span>
                {c.question}
              </legend>
              <div className="clear-both sm:clear-none">
                <YesNo
                  id={c.id}
                  value={answers[c.id] ?? null}
                  onChange={(v) => setAnswers((prev) => ({ ...prev, [c.id]: v }))}
                />
              </div>
            </fieldset>
          </li>
        ))}
      </ol>

      <button
        type="submit"
        disabled={answered < CRITERIA.length}
        className={buttonVariants({ size: 'lg', className: 'mt-6 w-full' })}
      >
        {answered < CRITERIA.length ? 'Answer all questions to see your score' : 'See my score'}
      </button>
    </form>
  );
}
