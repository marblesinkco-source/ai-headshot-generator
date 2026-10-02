'use client';

import { useState } from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const presets = [
  { id: 'linkedin', label: 'LinkedIn', w: 400, h: 400 },
  { id: 'passport', label: 'Passport', w: 600, h: 600 },
  { id: 'id', label: 'ID Badge', w: 300, h: 400 },
] as const;

// The placeholder source is a 4:5 portrait frame.
const SOURCE_RATIO = 4 / 5;

export function HeadshotResizerDemo() {
  const [selected, setSelected] = useState<(typeof presets)[number]['id']>('linkedin');
  const preset = presets.find((p) => p.id === selected) ?? presets[0];

  const targetRatio = preset.w / preset.h;
  // Largest crop of the target ratio that fits inside the source frame.
  const cropW = targetRatio < SOURCE_RATIO ? (targetRatio / SOURCE_RATIO) * 100 : 100;
  const cropH = targetRatio < SOURCE_RATIO ? 100 : (SOURCE_RATIO / targetRatio) * 100;

  return (
    <section className="px-4 py-10 sm:px-6" aria-labelledby="resizer-demo-heading">
      <div className="mx-auto max-w-3xl rounded-tp-card border border-tp-line bg-white p-6 sm:p-8">
        <h2 id="resizer-demo-heading" className="text-center font-display text-3xl text-tp-ink sm:text-4xl">
          See the crop for each size
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-tp-muted">
          Choose a size to see roughly how a portrait would be framed. The outlined area is what stays in the final image.
        </p>

        <div className="mt-8 flex flex-col items-center gap-6">
          <div
            role="img"
            aria-label={`Crop preview for ${preset.label}, ${preset.w} by ${preset.h} pixels`}
            className="relative h-72 overflow-hidden rounded-tp-card border border-tp-line bg-gradient-to-b from-tp-beige to-tp-bronze"
            style={{ aspectRatio: '4 / 5' }}
          >
            <div className="absolute bottom-0 left-1/2 h-1/4 w-3/4 -translate-x-1/2 rounded-t-full bg-tp-bronze-ink/70" />
            <div className="absolute left-1/2 top-[22%] h-[32%] w-[40%] -translate-x-1/2 rounded-full bg-tp-bronze-ink/70" />
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dashed border-tp-paper transition-all duration-300"
              style={{
                width: `${cropW}%`,
                height: `${cropH}%`,
                boxShadow: '0 0 0 999px rgba(23, 22, 19, 0.55)',
              }}
            >
              <span className="absolute left-1 top-1 rounded-tp-button bg-tp-ink px-2 py-0.5 text-xs font-semibold text-tp-paper">
                {preset.w}×{preset.h}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="Output size">
            {presets.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelected(p.id)}
                aria-pressed={selected === p.id}
                className={cn(
                  'rounded-tp-button border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
                  selected === p.id
                    ? 'border-tp-bronze-ink bg-tp-ink text-tp-paper'
                    : 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze'
                )}
              >
                {p.label} ({p.w}×{p.h})
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-tp-ink" aria-live="polite">
            Selected: <span className="font-semibold">{preset.label}</span>, {preset.w} × {preset.h} px
          </p>
          <p className="text-center text-sm text-tp-muted">Full resizing with your photos after sign-up.</p>
          <Link href="/auth/register?redirect=/headshots" className={cn(buttonVariants({ variant: 'primary', size: 'md' }))}>
            Resize Your Headshot
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeadshotResizerDemo;
