'use client';

import { useEffect, useState } from 'react';
import { Camera, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const RESULTS = [
  { icon: Camera, text: 'Corporate headshots with neutral studio backdrop', category: 'Corporate' },
  { icon: Sparkles, text: 'Creative portraits with colorful artistic lighting', category: 'Creative' },
  { icon: CheckCircle2, text: 'LinkedIn-optimized photos with professional framing', category: 'LinkedIn' },
  { icon: Camera, text: 'Team headshots with consistent style across members', category: 'Teams' },
  { icon: Sparkles, text: 'Editorial portraits with cinematic depth', category: 'Editorial' },
  { icon: CheckCircle2, text: 'Natural light photos with warm, approachable feel', category: 'Natural' },
  { icon: Camera, text: 'Minimalist headshots on clean white background', category: 'Minimalist' },
  { icon: Sparkles, text: 'Outdoor portraits with fresh urban backdrops', category: 'Outdoor' },
] as const;

const ROTATE_MS = 3500;

export function ActivityFeed() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % RESULTS.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  const entry = RESULTS[index];
  const Icon = entry.icon;

  return (
    <div
      className="border-y border-tp-line bg-tp-beige/30 py-3"
      role="region"
      aria-label="Available headshot styles"
    >
      <style>{`
        @keyframes tp-result-slide {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tp-result-slide { animation: tp-result-slide 350ms ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .tp-result-slide { animation: none; }
        }
      `}</style>
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 sm:px-6">
        <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
          <ArrowRight className="h-3.5 w-3.5 text-tp-bronze" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-wide text-tp-bronze-ink">
            Available Styles
          </span>
        </div>

        <div className="hidden h-5 w-px shrink-0 bg-tp-line sm:block" aria-hidden="true" />

        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            key={index}
            className="tp-result-slide flex items-center gap-3"
            aria-live="polite"
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-tp-bronze/20"
              aria-hidden="true"
            >
              <Icon className="h-3.5 w-3.5 text-tp-bronze" />
            </span>
            <p className="min-w-0 truncate text-sm text-tp-ink">{entry.text}</p>
            <span className="shrink-0 rounded-full bg-tp-beige/80 px-2.5 py-0.5 text-xs font-medium text-tp-bronze-ink">
              {entry.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityFeed;
