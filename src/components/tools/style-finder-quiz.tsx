'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';

interface QuizOption {
  label: string;
  value: string;
  description?: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

interface StyleResult {
  styleName: string;
  styleSlug: string;
  description: string;
  package: string;
  packageHref: string;
}

const questions: QuizQuestion[] = [
  {
    id: 'purpose',
    question: 'What will you use your headshot for?',
    options: [
      { label: 'LinkedIn & Professional Profiles', value: 'linkedin', description: 'Career networking and job search' },
      { label: 'Company Website or Team Page', value: 'corporate', description: 'Business and corporate presence' },
      { label: 'Dating Profile', value: 'dating', description: 'Personal and approachable look' },
      { label: 'Social Media & Personal Branding', value: 'social', description: 'Instagram, TikTok, YouTube' },
      { label: 'Creative Portfolio', value: 'creative', description: 'Artistic or unique look' },
    ],
  },
  {
    id: 'industry',
    question: 'What industry are you in?',
    options: [
      { label: 'Finance, Law & Consulting', value: 'corporate' },
      { label: 'Tech & Startups', value: 'tech' },
      { label: 'Healthcare & Medical', value: 'medical' },
      { label: 'Creative & Design', value: 'creative' },
      { label: 'Other / Not Industry-Specific', value: 'general' },
    ],
  },
  {
    id: 'vibe',
    question: 'What vibe do you want to project?',
    options: [
      { label: 'Professional & Polished', value: 'polished' },
      { label: 'Friendly & Approachable', value: 'friendly' },
      { label: 'Bold & Confident', value: 'bold' },
      { label: 'Creative & Artistic', value: 'artistic' },
      { label: 'Warm & Natural', value: 'warm' },
    ],
  },
  {
    id: 'background',
    question: 'What kind of background do you prefer?',
    options: [
      { label: 'Clean Studio (solid color)', value: 'studio' },
      { label: 'Soft Gradient or Bokeh', value: 'gradient' },
      { label: 'Natural / Outdoor', value: 'outdoor' },
      { label: 'Dark & Moody', value: 'dark' },
      { label: 'Let AI Decide', value: 'any' },
    ],
  },
  {
    id: 'quantity',
    question: 'How many headshots do you need?',
    options: [
      { label: 'Just 1 great shot', value: '1' },
      { label: 'A handful (5–10)', value: '10' },
      { label: 'Plenty of options (40+)', value: '40' },
      { label: 'Full set (80–160)', value: '160' },
    ],
  },
];

function getResult(answers: Record<string, string>): StyleResult {
  const { purpose, industry, vibe, background, quantity } = answers;

  // Determine style
  let styleName = 'Professional LinkedIn';
  let styleSlug = 'professional-linkedin';

  if (purpose === 'creative' || vibe === 'artistic') {
    if (background === 'dark') {
      styleName = 'Dark Moody';
      styleSlug = 'dark-moody';
    } else if (background === 'outdoor') {
      styleName = 'Editorial';
      styleSlug = 'editorial';
    } else {
      styleName = 'Creative';
      styleSlug = 'creative';
    }
  } else if (purpose === 'dating') {
    if (background === 'outdoor') {
      styleName = 'Natural Light';
      styleSlug = 'natural-light';
    } else {
      styleName = 'Warm Portrait';
      styleSlug = 'warm-portrait';
    }
  } else if (purpose === 'social') {
    if (vibe === 'bold') {
      styleName = 'Bold Color';
      styleSlug = 'bold-color';
    } else {
      styleName = 'Casual';
      styleSlug = 'casual';
    }
  } else if (purpose === 'corporate' || industry === 'corporate') {
    if (vibe === 'bold' || background === 'dark') {
      styleName = 'Executive';
      styleSlug = 'executive';
    } else {
      styleName = 'Corporate';
      styleSlug = 'corporate';
    }
  } else if (industry === 'tech') {
    if (vibe === 'friendly' || vibe === 'warm') {
      styleName = 'Startup Founder';
      styleSlug = 'startup-founder';
    } else {
      styleName = 'Tech Startup';
      styleSlug = 'tech-startup';
    }
  } else if (industry === 'medical') {
    styleName = 'Studio Classic';
    styleSlug = 'studio-classic';
  } else if (background === 'outdoor') {
    styleName = 'Outdoor';
    styleSlug = 'outdoor';
  } else if (background === 'dark') {
    styleName = 'Dark Moody';
    styleSlug = 'dark-moody';
  } else if (background === 'gradient') {
    styleName = 'Natural Bokeh';
    styleSlug = 'natural-bokeh';
  } else if (vibe === 'warm') {
    styleName = 'Warm Golden';
    styleSlug = 'warm-golden';
  } else if (vibe === 'friendly') {
    styleName = 'Natural Light';
    styleSlug = 'natural-light';
  }

  // Determine package recommendation
  let pkg = 'Professional';
  let pkgHref = '/pricing';
  const q = quantity || '10';

  if (q === '1') {
    pkg = 'TailorPic 1';
  } else if (q === '10') {
    pkg = 'Basic';
  } else if (q === '40') {
    pkg = 'Starter';
  } else if (q === '160') {
    pkg = 'Executive';
  }

  const descriptions: Record<string, string> = {
    corporate:
      'A clean, formal look with neutral backgrounds and even lighting. Ideal for company websites, annual reports and leadership pages.',
    'professional-linkedin':
      'Optimized for LinkedIn and professional networking. Clean backgrounds, natural expression, and polished lighting.',
    'natural-light':
      'Warm, inviting portraits using soft natural lighting. Great for approachable personal and dating profiles.',
    creative:
      'Stand out from the crowd with unique compositions, creative backgrounds and artistic flair.',
    'startup-founder':
      'Relaxed yet professional — the sweet spot for tech founders and startup culture.',
    executive:
      'Commanding and polished portraits for C-suite executives and senior leadership.',
    'studio-classic':
      'Traditional studio-quality headshots with controlled lighting and classic framing.',
    'dark-moody':
      'Dramatic, cinematic portraits with dark backgrounds and carefully directed light.',
    editorial:
      'Magazine-style portraits with storytelling compositions and artistic direction.',
    'warm-portrait':
      'Genuine, warm-toned portraits that showcase your personality and approachability.',
    casual:
      'Relaxed, everyday style perfect for social media and personal branding.',
    'bold-color':
      'Vibrant, attention-grabbing portraits with bold color palettes and strong presence.',
    outdoor:
      'Natural settings with beautiful bokeh and organic, fresh compositions.',
    'natural-bokeh':
      'Soft, dreamy backgrounds with beautiful blur that keeps focus on you.',
    'warm-golden':
      'Golden hour warmth with rich, inviting tones for a timeless look.',
    'tech-startup':
      'Modern, minimalist style that says innovation without being overly formal.',
  };

  return {
    styleName,
    styleSlug,
    description: descriptions[styleSlug] || descriptions['professional-linkedin'],
    package: pkg,
    packageHref: pkgHref,
  };
}

export function StyleFinderQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = useCallback(
    (questionId: string, value: string) => {
      const next = { ...answers, [questionId]: value };
      setAnswers(next);

      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowResult(true);
      }
    },
    [answers, currentStep],
  );

  const goBack = useCallback(() => {
    if (showResult) {
      setShowResult(false);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep, showResult]);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  }, []);

  const question = questions[currentStep];
  const progress = showResult ? 100 : ((currentStep) / questions.length) * 100;

  if (showResult) {
    const result = getResult(answers);

    return (
      <div className="mx-auto max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="h-1.5 w-full rounded-full bg-tp-line">
            <div
              className="h-1.5 rounded-full bg-tp-bronze transition-all duration-500"
              style={{ width: '100%' }}
            />
          </div>
          <p className="mt-2 text-right text-xs text-tp-muted">Complete</p>
        </div>

        {/* Result card */}
        <div className="rounded-tp-card border border-tp-line bg-white p-8 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-brand text-tp-bronze">
            Your Perfect Style
          </p>
          <h3 className="font-display font-normal mt-3 text-3xl text-tp-ink sm:text-4xl">
            {result.styleName}
          </h3>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-tp-muted">
            {result.description}
          </p>

          <div className="mx-auto mt-8 max-w-sm rounded-tp-button border border-tp-line bg-tp-paper p-5">
            <p className="text-sm font-medium text-tp-muted">Recommended Package</p>
            <p className="font-display font-normal mt-1 text-2xl text-tp-ink">{result.package}</p>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/styles/${result.styleSlug}`}
              className="inline-flex h-12 items-center gap-2 rounded-tp-button bg-tp-bronze px-6 text-sm font-medium text-white transition-colors hover:bg-tp-bronze-ink"
            >
              Explore {result.styleName} Style
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={result.packageHref}
              className="inline-flex h-12 items-center gap-2 rounded-tp-button border border-tp-line bg-white px-6 text-sm font-medium text-tp-ink transition-colors hover:border-tp-bronze/40"
            >
              View Pricing
            </Link>
          </div>

          <button
            onClick={reset}
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-tp-muted transition-colors hover:text-tp-bronze"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-8">
        <div className="h-1.5 w-full rounded-full bg-tp-line">
          <div
            className="h-1.5 rounded-full bg-tp-bronze transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-right text-xs text-tp-muted">
          Question {currentStep + 1} of {questions.length}
        </p>
      </div>

      {/* Question */}
      <div className="rounded-tp-card border border-tp-line bg-white p-8 shadow-sm">
        <h3 className="font-display font-normal text-2xl text-tp-ink sm:text-3xl">
          {question.question}
        </h3>

        <div className="mt-6 space-y-3">
          {question.options.map((option) => {
            const isSelected = answers[question.id] === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleAnswer(question.id, option.value)}
                className={`w-full rounded-tp-button border p-4 text-left transition-all ${
                  isSelected
                    ? 'border-tp-bronze bg-tp-bronze/5'
                    : 'border-tp-line bg-white hover:border-tp-bronze/40'
                }`}
              >
                <span className="block text-sm font-medium text-tp-ink">{option.label}</span>
                {option.description && (
                  <span className="mt-0.5 block text-xs text-tp-muted">{option.description}</span>
                )}
              </button>
            );
          })}
        </div>

        {currentStep > 0 && (
          <button
            onClick={goBack}
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-tp-muted transition-colors hover:text-tp-bronze"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </button>
        )}
      </div>
    </div>
  );
}
