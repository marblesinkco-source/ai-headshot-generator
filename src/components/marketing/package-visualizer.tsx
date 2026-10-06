'use client';

import { useState } from 'react';
import { Camera, Palette, Image, Clock, Zap, Crown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { savePackageIntent } from '@/components/marketing/return-visitor-banner';

interface PackageInfo {
  name: string;
  price: number;
  outputCount: number;
  features: string[];
  recommended?: boolean;
}

interface PackageVisualizerProps {
  packages: PackageInfo[];
}

const FEATURE_ICONS: Record<string, LucideIcon> = {
  background: Image,
  style: Palette,
  resolution: Camera,
  delivery: Clock,
  banner: Zap,
  priority: Crown,
};

function getIconForFeature(feature: string): LucideIcon {
  const lower = feature.toLowerCase();
  if (lower.includes('background')) return FEATURE_ICONS.background;
  if (lower.includes('style')) return FEATURE_ICONS.style;
  if (lower.includes('resolution')) return FEATURE_ICONS.resolution;
  if (lower.includes('delivery') || lower.includes('hour')) return FEATURE_ICONS.delivery;
  if (lower.includes('banner') || lower.includes('signature')) return FEATURE_ICONS.banner;
  if (lower.includes('priority') || lower.includes('support')) return FEATURE_ICONS.priority;
  return Camera;
}

function PhotoGrid({ count }: { count: number }) {
  // Show a representative grid (max 12 dots for visual clarity)
  const displayCount = Math.min(count, 12);
  const remaining = count - displayCount;

  return (
    <div className="flex flex-wrap gap-1.5">
      {Array.from({ length: displayCount }).map((_, i) => (
        <div
          key={i}
          className="h-6 w-6 rounded bg-tp-bronze/20 sm:h-7 sm:w-7"
        />
      ))}
      {remaining > 0 && (
        <div className="flex h-6 w-auto items-center rounded bg-tp-bronze/10 px-2 text-[10px] font-medium text-tp-bronze-ink sm:h-7">
          +{remaining} more
        </div>
      )}
    </div>
  );
}

export function PackageVisualizer({ packages }: PackageVisualizerProps) {
  const defaultIndex = packages.findIndex((p) => p.recommended) !== -1
    ? packages.findIndex((p) => p.recommended)
    : Math.min(3, packages.length - 1);
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  const handleSelect = (i: number) => {
    setSelectedIndex(i);
    const pkg = packages[i];
    if (pkg) {
      savePackageIntent(pkg.name, pkg.price, 'headshots');
    }
  };

  const selected = packages[selectedIndex];
  if (!selected) return null;

  const perPhoto =
    selected.outputCount > 0
      ? Math.round(selected.price / selected.outputCount)
      : selected.price;

  return (
    <section className="border-t border-tp-line/40 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-tp-site px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-normal text-tp-black sm:text-3xl">
          What You Get
        </h2>
        <p className="mt-3 max-w-2xl text-tp-muted">
          Select a package to see exactly what&apos;s included — photos, styles, and delivery.
        </p>

        {/* Package selector pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {packages.map((pkg, i) => (
            <button
              key={pkg.name}
              onClick={() => handleSelect(i)}
              className={`relative rounded-tp-button px-3 py-1.5 text-sm transition-all sm:px-4 sm:py-2 ${
                i === selectedIndex
                  ? 'bg-tp-bronze text-white shadow-sm'
                  : 'bg-tp-beige text-tp-muted hover:bg-tp-beige/80 hover:text-tp-ink'
              }`}
            >
              {pkg.name}
              {pkg.recommended && (
                <span className="ml-1.5 inline-block rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">
                  ★
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Visualizer card */}
        <div className="mt-6 rounded-tp-card border border-tp-line bg-tp-beige p-5 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            {/* Left: info */}
            <div className="flex-1">
              <div className="flex items-baseline gap-3">
                <h3 className="text-lg font-semibold text-tp-ink sm:text-xl">
                  {selected.name}
                </h3>
                <span className="text-2xl font-semibold text-tp-bronze-ink">
                  {formatPrice(selected.price)}
                </span>
              </div>

              <p className="mt-1 text-sm text-tp-muted">
                {selected.outputCount} {selected.outputCount === 1 ? 'photo' : 'photos'}
                {selected.outputCount > 1 && (
                  <> · {formatPrice(perPhoto)}/photo</>
                )}
              </p>

              {/* Features */}
              <ul className="mt-4 space-y-2">
                {selected.features.map((feature) => {
                  const Icon = getIconForFeature(feature);
                  return (
                    <li key={feature} className="flex items-center gap-2 text-sm text-tp-ink">
                      <Icon className="h-4 w-4 flex-shrink-0 text-tp-bronze" />
                      {feature}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right: photo grid visualization */}
            <div className="sm:max-w-[240px]">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-tp-muted">
                Your photos
              </p>
              <PhotoGrid count={selected.outputCount} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
