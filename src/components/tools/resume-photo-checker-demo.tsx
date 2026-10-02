'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Lightbulb } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const items = [
  { id: 'lighting', label: 'Proper lighting', tip: 'Face a window or soft light source so shadows stay gentle and even.' },
  { id: 'attire', label: 'Professional attire', tip: 'Choose clothing that fits your industry, in solid colors without busy patterns.' },
  { id: 'background', label: 'Neutral background', tip: 'Use a plain, uncluttered backdrop so attention stays on your face.' },
  { id: 'centered', label: 'Centered face', tip: 'Frame head and shoulders in the middle of the shot, with eyes near the upper third.' },
  { id: 'smile', label: 'Appropriate smile', tip: 'A relaxed, natural smile usually reads as approachable and confident.' },
] as const;

function rating(count: number) {
  if (count === items.length) return 'Looks like a strong resume photo';
  if (count >= 3) return 'Getting there';
  if (count >= 1) return 'Needs work';
  return 'Check the items that describe your photo';
}

export function ResumePhotoCheckerDemo() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const count = items.filter((i) => checked[i.id]).length;
  const missing = items.filter((i) => !checked[i.id]);

  return (
    <section className="px-4 py-10 sm:px-6" aria-labelledby="checker-demo-heading">
      <div className="mx-auto max-w-3xl rounded-tp-card border border-tp-line bg-white p-6 sm:p-8">
        <h2 id="checker-demo-heading" className="text-center font-display text-3xl text-tp-ink sm:text-4xl">
          Quick self-check
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-tp-muted">
          Tick what applies to your current photo. This is a simple self-assessment, not an automated analysis.
        </p>

        <ul className="mt-8 space-y-3">
          {items.map((i) => {
            const on = !!checked[i.id];
            return (
              <li key={i.id}>
                <label
                  className={cn(
                    'flex cursor-pointer items-center gap-4 rounded-tp-card border p-4 transition-colors focus-within:ring-2 focus-within:ring-tp-bronze',
                    on ? 'border-tp-bronze-ink bg-tp-beige/30' : 'border-tp-line bg-white hover:border-tp-bronze'
                  )}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={on}
                    onChange={() => setChecked((c) => ({ ...c, [i.id]: !c[i.id] }))}
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-tp-button border',
                      on ? 'border-tp-bronze-ink bg-tp-ink text-tp-paper' : 'border-tp-line bg-white'
                    )}
                  >
                    {on && <Check className="h-4 w-4" />}
                  </span>
                  <span className="font-semibold text-tp-ink">{i.label}</span>
                </label>
                {!on && (
                  <p className="mt-2 flex items-start gap-2 px-2 text-sm text-tp-muted">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
                    {i.tip}
                  </p>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-8 rounded-tp-card border border-tp-line bg-tp-paper p-5 text-center" aria-live="polite">
          <p className="font-display text-4xl text-tp-ink">
            {count} / {items.length}
          </p>
          <p className="mt-1 text-sm font-semibold text-tp-bronze-ink">{rating(count)}</p>
          {missing.length > 0 && count > 0 && (
            <p className="mt-2 text-sm text-tp-muted">Still to improve: {missing.map((m) => m.label.toLowerCase()).join(', ')}.</p>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link href="/auth/register?redirect=/headshots" className={cn(buttonVariants({ variant: 'primary', size: 'md' }))}>
            Get AI-Generated Resume Photo
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ResumePhotoCheckerDemo;
