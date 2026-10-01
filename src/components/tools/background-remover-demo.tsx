'use client';

import { useState } from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const backgrounds = [
  { id: 'white', label: 'White', color: '#FFFFFF' },
  { id: 'blue', label: 'Blue', color: '#BFD7F2' },
  { id: 'gray', label: 'Gray', color: '#D9D9D9' },
] as const;

export function BackgroundRemoverDemo() {
  const [selected, setSelected] = useState<(typeof backgrounds)[number]['id']>('white');
  const active = backgrounds.find((b) => b.id === selected) ?? backgrounds[0];

  return (
    <section className="px-4 py-10 sm:px-6" aria-labelledby="bg-demo-heading">
      <div className="mx-auto max-w-3xl rounded-tp-card border border-tp-line bg-white p-6 sm:p-8">
        <h2 id="bg-demo-heading" className="text-center font-display text-3xl text-tp-ink sm:text-4xl">
          Preview a new background
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-tp-muted">
          Pick a solid color to see how a clean backdrop changes the look of a portrait.
        </p>

        <div className="mt-8 flex flex-col items-center gap-6">
          <div
            role="img"
            aria-label={`Placeholder portrait on a ${active.label.toLowerCase()} background`}
            className="relative h-64 w-64 overflow-hidden rounded-tp-card border border-tp-line transition-colors duration-300"
            style={{ backgroundColor: active.color }}
          >
            <div className="absolute bottom-0 left-1/2 h-24 w-48 -translate-x-1/2 rounded-t-full bg-gradient-to-b from-tp-bronze to-tp-bronze-ink" />
            <div className="absolute left-1/2 top-12 h-24 w-20 -translate-x-1/2 rounded-full bg-gradient-to-b from-tp-bronze to-tp-bronze-ink" />
          </div>

          <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="Background color">
            {backgrounds.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelected(b.id)}
                aria-pressed={selected === b.id}
                className={cn(
                  'flex items-center gap-2 rounded-tp-button border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
                  selected === b.id
                    ? 'border-tp-bronze-ink bg-tp-ink text-tp-paper'
                    : 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze'
                )}
              >
                <span aria-hidden="true" className="h-4 w-4 rounded-full border border-tp-line" style={{ backgroundColor: b.color }} />
                {b.label}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-tp-muted">
            This is a preview. Full background removal is available after sign-up.
          </p>
          <Link href="/auth/register" className={cn(buttonVariants({ variant: 'primary', size: 'md' }))}>
            Try Full Background Remover
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BackgroundRemoverDemo;
