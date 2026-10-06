'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Info, RotateCcw } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChecklistItem {
  id: string;
  label: string;
  tip: string;
}

interface ChecklistCategory {
  id: string;
  title: string;
  items: ChecklistItem[];
}

const CATEGORIES: ChecklistCategory[] = [
  {
    id: 'lighting',
    title: 'Lighting',
    items: [
      {
        id: 'light-even',
        label: 'Face is evenly lit (no harsh shadows)',
        tip: 'Face a window or soft lamp so both sides of your face get similar light. Hard shadows under the nose or eyes can confuse the AI.',
      },
      {
        id: 'light-soft',
        label: 'Natural or soft artificial light',
        tip: 'Daylight near a window works well. Avoid direct flash or bare overhead bulbs that create hot spots.',
      },
      {
        id: 'light-backlit',
        label: 'No backlit/silhouette photos',
        tip: 'If a bright window or sky is behind you, your face goes dark. Turn around so the light is in front of you.',
      },
      {
        id: 'light-temp',
        label: 'No mixed color temperatures',
        tip: 'Warm lamps plus cool daylight can tint skin unevenly. Pick one main light source for each photo.',
      },
    ],
  },
  {
    id: 'composition',
    title: 'Composition',
    items: [
      {
        id: 'comp-face',
        label: 'Face clearly visible and centered',
        tip: 'Your whole face should be in view, with nothing covering it, and sit near the middle of the frame.',
      },
      {
        id: 'comp-shoulders',
        label: 'Head and shoulders in frame',
        tip: 'Include the top of your head and your shoulders so the AI can learn your build and posture.',
      },
      {
        id: 'comp-angle',
        label: 'Straight-on or slight angle (not profile)',
        tip: 'Face the camera or turn a little. Full side profiles hide features the AI needs to learn your likeness.',
      },
      {
        id: 'comp-distance',
        label: 'No extreme close-ups or far away shots',
        tip: 'Aim for an arm-to-two-arms distance. Very close shots distort features; distant shots lose detail.',
      },
    ],
  },
  {
    id: 'technical',
    title: 'Technical Quality',
    items: [
      {
        id: 'tech-sharp',
        label: 'Photo is sharp and in focus',
        tip: 'Zoom in on your eyes. If they look soft or blurry, pick another photo or retake it with a steady hand.',
      },
      {
        id: 'tech-res',
        label: 'Resolution at least 512×512px',
        tip: 'Use the original file from your phone or camera rather than a screenshot or a compressed copy sent through chat apps.',
      },
      {
        id: 'tech-filters',
        label: 'No heavy filters or effects',
        tip: 'Beauty filters, strong color grading, and face-smoothing change how you look. Use unedited photos.',
      },
      {
        id: 'tech-marks',
        label: 'No watermarks or text overlays',
        tip: 'Logos, captions, stickers, and timestamps can leak into results. Crop or choose a clean photo.',
      },
    ],
  },
  {
    id: 'subject',
    title: 'Subject',
    items: [
      {
        id: 'subj-alone',
        label: 'Only one person in the photo',
        tip: 'Crop out friends or family. Other faces make it unclear whose likeness the AI should learn.',
      },
      {
        id: 'subj-eyes',
        label: 'Eyes open and looking at camera',
        tip: 'Look into the lens, not at the screen. Avoid mid-blink shots and strong squints.',
      },
      {
        id: 'subj-expression',
        label: 'Neutral or natural expression',
        tip: 'A relaxed smile is great. Extreme expressions such as wide laughs or grimaces are harder to reproduce well.',
      },
      {
        id: 'subj-accessories',
        label: 'No sunglasses or face-covering accessories',
        tip: 'Take off sunglasses, masks, and anything that hides your eyes or mouth. Hats that shade the face also hurt results.',
      },
    ],
  },
];

const TOTAL = CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);

interface Status {
  label: string;
  message: string;
  barClass: string;
  badgeClass: string;
}

function getStatus(score: number): Status {
  if (score >= 13) {
    return {
      label: 'Ready to Upload!',
      message: 'Your photos meet the key quality checks. You are set to create your headshots.',
      barClass: 'bg-[#3F7A5A]',
      badgeClass: 'border-[#3F7A5A]/30 bg-[#3F7A5A]/10 text-[#2F5E45]',
    };
  }
  if (score >= 9) {
    return {
      label: 'Almost There',
      message: 'A few more checks to go. Review the open items for the best results.',
      barClass: 'bg-tp-bronze',
      badgeClass: 'border-tp-bronze/40 bg-tp-bronze/10 text-tp-bronze-ink',
    };
  }
  return {
    label: 'Not Ready',
    message: 'Work through the checklist below and fix what you can before uploading.',
    barClass: 'bg-[#B5523B]',
    badgeClass: 'border-[#B5523B]/30 bg-[#B5523B]/10 text-[#8E3B28]',
  };
}

export function PhotoChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [openTips, setOpenTips] = useState<Record<string, boolean>>({});

  const score = useMemo(() => Object.values(checked).filter(Boolean).length, [checked]);
  const status = getStatus(score);
  const percent = Math.round((score / TOTAL) * 100);

  const toggleCheck = (id: string) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleTip = (id: string) => setOpenTips((prev) => ({ ...prev, [id]: !prev[id] }));
  const reset = () => {
    setChecked({});
    setOpenTips({});
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      {/* Progress */}
      <div
        className="sticky top-2 z-10 rounded-tp-card border border-tp-line bg-tp-paper p-5 shadow-sm sm:p-6"
        aria-live="polite"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-base font-semibold text-tp-ink">
            {score} of {TOTAL} checks passed
          </p>
          <span
            className={cn(
              'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold',
              status.badgeClass,
            )}
          >
            {status.label}
          </span>
        </div>
        <div
          className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-tp-line"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={TOTAL}
          aria-valuenow={score}
          aria-label="Checklist progress"
        >
          <div
            className={cn('h-full rounded-full transition-all duration-300', status.barClass)}
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-tp-muted">{status.message}</p>
        {score >= 13 && (
          <Link
            href="/pricing"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'mt-4 bg-tp-black text-white shadow-none hover:bg-tp-ink',
            )}
          >
            See pricing and get started <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>

      {/* Categories */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {CATEGORIES.map((category) => {
          const done = category.items.filter((i) => checked[i.id]).length;
          return (
            <fieldset key={category.id} className="rounded-tp-card border border-tp-line bg-white p-5 sm:p-6">
              <legend className="sr-only">{category.title}</legend>
              <div className="mb-4 flex items-baseline justify-between">
                <h3 className="font-display font-normal text-2xl text-tp-ink">{category.title}</h3>
                <span className="text-xs font-medium text-tp-muted">
                  {done}/{category.items.length}
                </span>
              </div>
              <ul className="space-y-3">
                {category.items.map((item) => {
                  const isChecked = !!checked[item.id];
                  const tipOpen = !!openTips[item.id];
                  const inputId = `chk-${item.id}`;
                  const tipId = `tip-${item.id}`;
                  return (
                    <li
                      key={item.id}
                      className={cn(
                        'group rounded-tp-button border px-3 py-3 transition-colors',
                        isChecked ? 'border-tp-bronze/40 bg-tp-bronze/5' : 'border-tp-line bg-white',
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          id={inputId}
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCheck(item.id)}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={inputId}
                          className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 peer-focus-visible:[&>span:first-child]:ring-2 peer-focus-visible:[&>span:first-child]:ring-tp-bronze peer-focus-visible:[&>span:first-child]:ring-offset-2"
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors',
                              isChecked ? 'border-tp-bronze bg-tp-bronze text-tp-black' : 'border-tp-muted/50 bg-white',
                            )}
                          >
                            {isChecked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                          </span>
                          <span className="text-sm leading-snug text-tp-ink">{item.label}</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => toggleTip(item.id)}
                          aria-expanded={tipOpen}
                          aria-controls={tipId}
                          aria-label={`${tipOpen ? 'Hide' : 'Show'} tip: ${item.label}`}
                          className="shrink-0 rounded-full p-1 text-tp-muted transition-colors hover:text-tp-bronze-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
                        >
                          <Info className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <p
                        id={tipId}
                        className={cn(
                          'mt-2 pl-8 text-xs leading-relaxed text-tp-muted',
                          tipOpen ? 'block' : 'hidden md:group-hover:block',
                        )}
                      >
                        {item.tip}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={reset}
          disabled={score === 0}
          className="inline-flex items-center gap-2 rounded-tp-button border border-tp-line bg-white px-5 py-2.5 text-sm font-semibold text-tp-ink transition-colors hover:border-tp-bronze hover:text-tp-bronze-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reset checklist
        </button>
      </div>
    </div>
  );
}
