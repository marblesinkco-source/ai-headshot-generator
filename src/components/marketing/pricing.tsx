'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Zap, Lock, Star } from 'lucide-react';
import { getActiveCategories, type Category } from '@/config/categories';
import { categoryVisuals } from '@/config/category-visuals';
import { TEAM_PRICES, PAYMENT_PROVIDER } from '@/config/pricing';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const categories = getActiveCategories();

// Show a curated set of categories as tabs — synced with config/categories.ts FEATURED_CATEGORIES
import { FEATURED_CATEGORIES as FEATURED_IDS } from '@/config/categories';

// Indices of the 3 featured packages to show by default (when a category has >3 packages).
// For headshots: TailorPic 1 (0), Professional (4), Executive (5).
// For other categories: first, recommended, and last package.
function getFeaturedIndices(pkgs: readonly { recommended?: boolean }[]): number[] {
  if (pkgs.length <= 3) return pkgs.map((_, i) => i);
  const recIdx = pkgs.findIndex((p) => p.recommended === true);
  const lastIdx = pkgs.length - 1;
  const indices = new Set([0, recIdx >= 0 ? recIdx : lastIdx - 1, lastIdx]);
  return Array.from(indices).sort((a, b) => a - b);
}

// Badge labels for the 3 featured cards (by position in the featured set).
const FEATURED_BADGES: Record<number, string> = { 0: 'Quick Start', 1: 'Best Value', 2: 'Premium' };

export function Pricing() {
  const featured = categories.filter((c) => FEATURED_IDS.includes(c.id));
  const [activeCategory, setActiveCategory] = useState<Category>(
    featured[0] || categories[0]
  );
  const [pricingMode, setPricingMode] = useState<'individual' | 'teams'>('individual');
  const [showAll, setShowAll] = useState(false);

  const packages = activeCategory.packages;
  // Entry tier = cheapest package in the category (TailorPic 1 for headshots, Express elsewhere).
  const entryPackage =
    packages.length > 0
      ? packages.reduce((min, p) => (p.price < min.price ? p : min), packages[0])
      : undefined;
  const hasExpress = packages.length >= 4 && entryPackage !== undefined;

  // Lowest per-photo cost among non-entry packages (computed from config, no hardcoded numbers).
  const perPhoto = (p: { price: number; outputCount: number }) => p.price / p.outputCount;
  const nonEntry = packages.filter(
    (p) => entryPackage !== undefined && p.id !== entryPackage.id && p.outputCount > 0
  );
  const bestValuePackage =
    nonEntry.length > 0
      ? nonEntry.reduce((min, p) => (perPhoto(p) < perPhoto(min) ? p : min), nonEntry[0])
      : undefined;
  const registerHref = `/auth/register?redirect=${encodeURIComponent(
    `/dashboard/upload?category=${activeCategory.id}`
  )}`;

  return (
    <section id="pricing" className="relative bg-tp-paper/40 py-20 lg:py-24 overflow-hidden">
      {/* Decorative background blobs */}
      <div aria-hidden="true" className="tp-blob tp-blob-beige w-[600px] h-[600px] -top-60 -right-60" />
      <div aria-hidden="true" className="tp-blob tp-blob-bronze w-[500px] h-[500px] -bottom-40 -left-48" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="uppercase text-[11px] font-semibold tracking-[0.25em] text-tp-bronze-ink">
            Simple Pricing
          </p>
          <h2 className="mt-3 font-display text-[30px] sm:text-[40px] font-normal tracking-[-0.03em] text-tp-ink leading-tight">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-[15px] text-tp-muted leading-relaxed max-w-lg mx-auto">
            One-time payment, no subscription. Start with a single photo to see the quality, or choose a pack for your full set.
          </p>

          {/* Individual / Teams toggle */}
          <div className="mt-6 inline-flex items-center rounded-full border border-tp-line bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setPricingMode('individual')}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-medium transition-all',
                pricingMode === 'individual'
                  ? 'bg-tp-black text-tp-paper shadow-md'
                  : 'text-tp-muted hover:text-tp-ink'
              )}
            >
              Individuals
            </button>
            <button
              type="button"
              onClick={() => setPricingMode('teams')}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-medium transition-all',
                pricingMode === 'teams'
                  ? 'bg-tp-black text-tp-paper shadow-md'
                  : 'text-tp-muted hover:text-tp-ink'
              )}
            >
              Teams
            </button>
          </div>
        </div>

        {/* Teams pricing */}
        {pricingMode === 'teams' && (
          <div className="mt-12">
            <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
              {/* Small team */}
              <Card className="flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle className="font-display text-xl font-normal text-tp-black">
                    Small Team
                  </CardTitle>
                  <p className="mt-1 text-sm text-tp-muted">{TEAM_PRICES.small.min}–{TEAM_PRICES.small.max} people</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-normal tracking-tight text-tp-black">
                      {formatPrice(TEAM_PRICES.small.perPersonCents)}
                    </span>
                    <span className="text-sm text-tp-muted">/ person</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-2.5">
                  <ul className="space-y-2.5">
                    {['80 headshots per person', '10 professional styles', 'Consistent team look', 'Admin dashboard access', 'Bulk download'].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-tp-ink">
                        <Check className="h-4 w-4 shrink-0 text-tp-bronze-ink" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex-col items-stretch">
                  <Link href="/team-headshots" className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}>
                    Get Team Pricing
                  </Link>
                </CardFooter>
              </Card>

              {/* Large team — recommended */}
              <Card className="relative z-10 flex flex-col border-tp-bronze bg-tp-paper shadow-xl shadow-tp-bronze/20 ring-2 ring-tp-bronze/60 scale-[1.02] lg:scale-105">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-tp-black px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-tp-paper shadow-md whitespace-nowrap">
                    <Star className="h-3 w-3 fill-tp-bronze-ink text-tp-bronze-ink" aria-hidden="true" />
                    Best Value
                  </span>
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="font-display text-xl font-normal text-tp-black">
                    Large Team
                  </CardTitle>
                  <p className="mt-1 text-sm text-tp-muted">{TEAM_PRICES.large.min}–{TEAM_PRICES.large.max} people</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-normal tracking-tight text-tp-black">
                      {formatPrice(TEAM_PRICES.large.perPersonCents)}
                    </span>
                    <span className="text-sm text-tp-muted">/ person</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-2.5">
                  <ul className="space-y-2.5">
                    {['80 headshots per person', '10 professional styles', 'Consistent team look', 'Admin dashboard access', 'Bulk download', 'Priority support'].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-tp-ink">
                        <Check className="h-4 w-4 shrink-0 text-tp-bronze-ink" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex-col items-stretch">
                  <Link
                    href="/team-headshots"
                    className={cn(
                      buttonVariants({ variant: 'primary' }),
                      'w-full h-12 bg-tp-black text-tp-paper font-semibold hover:-translate-y-0.5 hover:bg-tp-ink hover:shadow-xl cta-ring'
                    )}
                  >
                    Get Team Pricing
                  </Link>
                </CardFooter>
              </Card>

              {/* Premium/Enterprise */}
              <Card className="flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle className="font-display text-xl font-normal text-tp-black">
                    Enterprise
                  </CardTitle>
                  <p className="mt-1 text-sm text-tp-muted">50+ people</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-normal tracking-tight text-tp-black">
                      Custom
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-2.5">
                  <ul className="space-y-2.5">
                    {['Unlimited headshots', 'All professional styles', 'Dedicated account manager', 'API access', 'SSO integration', 'Custom branding'].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-tp-ink">
                        <Check className="h-4 w-4 shrink-0 text-tp-bronze-ink" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex-col items-stretch">
                  <Link href="/contact" className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}>
                    Contact Sales
                  </Link>
                </CardFooter>
              </Card>
            </div>

            <p className="mt-8 text-center text-sm text-tp-muted">
              All team plans include consistent styling across members. One-time payment, no subscriptions.
            </p>
          </div>
        )}

        {/* Category tabs — visible only in individual mode */}
        {pricingMode === 'individual' && (
        <>
        {/* Category tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {featured.map((cat) => (
            <button
              key={cat.id}
              type="button"
              aria-pressed={activeCategory.id === cat.id}
              onClick={() => { setActiveCategory(cat); setShowAll(false); }}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze-ink',
                activeCategory.id === cat.id
                  ? 'bg-tp-black text-tp-bronze shadow-md'
                  : 'bg-tp-paper text-tp-muted hover:-translate-y-0.5 hover:border-tp-bronze hover:bg-tp-paper border border-tp-line'
              )}
            >
              <span className="inline-block w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={categoryVisuals[cat.id]?.megaMenu?.src ?? `/images/categories/${cat.id}.jpg`}
                  alt=""
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  sizes="20px"
                  loading="lazy"
                />
              </span>
              {cat.name}
            </button>
          ))}
          <Link
            href="/#categories"
            className="rounded-full border border-tp-line bg-tp-paper px-4 py-2 text-sm font-medium text-tp-muted transition-all hover:bg-tp-paper"
          >
            All Categories &rarr;
          </Link>
        </div>

        {/* Cards */}
        {(() => {
          const featuredIdx = getFeaturedIndices(packages);
          const canCollapse = packages.length > 3;
          const visiblePackages = canCollapse && !showAll
            ? featuredIdx.map((i) => ({ pkg: packages[i], featuredPos: featuredIdx.indexOf(i) }))
            : packages.map((pkg) => ({ pkg, featuredPos: -1 }));
          const colClass = canCollapse && !showAll
            ? 'lg:grid-cols-3'
            : packages.length >= 5
              ? 'sm:grid-cols-2 lg:grid-cols-3'
              : packages.length === 4
                ? 'sm:grid-cols-2 lg:grid-cols-4'
                : packages.length === 3
                  ? 'lg:grid-cols-3'
                  : packages.length === 2
                    ? 'lg:grid-cols-2 max-w-3xl mx-auto'
                    : 'max-w-md mx-auto';

          return (
        <>
        <div className={cn('mt-12 grid gap-6', colClass)}>
          {visiblePackages.map(({ pkg, featuredPos }) => {
            const isRecommended = pkg.recommended === true;
            const isExpress = !isRecommended && entryPackage !== undefined && pkg.id === entryPackage.id;
            // In collapsed (featured) view, show the featured badge; in expanded view, show original badges.
            const featuredBadge = canCollapse && !showAll && featuredPos >= 0 ? FEATURED_BADGES[featuredPos] : undefined;

            return (
              <Card
                key={pkg.id}
                className={cn(
                  'scroll-fade-in relative flex flex-col transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0',
                  isRecommended &&
                    'z-10 border-tp-bronze bg-tp-paper shadow-xl shadow-tp-bronze/20 ring-2 ring-tp-bronze/60 scale-[1.02] lg:scale-105',
                  !isRecommended && !featuredBadge && isExpress &&
                    'border-dashed border-tp-bronze/30'
                )}
              >
                {/* Featured badge (collapsed view) */}
                {featuredBadge && !isRecommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="outline" className="border-tp-bronze/50 bg-tp-paper text-tp-bronze-ink">
                      {featuredPos === 0 && <Zap className="mr-1 h-3 w-3" />}
                      {featuredPos === 2 && <Star className="mr-1 h-3 w-3 fill-tp-bronze-ink text-tp-bronze-ink" />}
                      {featuredBadge}
                    </Badge>
                  </div>
                )}
                {/* Recommended badge — show as "Best Value" in collapsed view, "Most Popular" in expanded */}
                {isRecommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-tp-black px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-tp-paper shadow-md whitespace-nowrap">
                      <Star className="h-3 w-3 fill-tp-bronze-ink text-tp-bronze-ink" aria-hidden="true" />
                      {featuredBadge || 'Most Popular'}
                    </span>
                  </div>
                )}
                {/* Express badge (expanded view only) */}
                {!featuredBadge && isExpress && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="outline" className="border-tp-bronze/50 bg-tp-paper text-tp-bronze-ink">
                      <Zap className="mr-1 h-3 w-3" />
                      Quick Try
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <CardTitle className="font-display text-xl font-normal text-tp-black">
                    {pkg.name}
                  </CardTitle>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className={cn(
                      'font-display font-normal tracking-tight text-tp-black',
                      isExpress ? 'text-3xl' : 'text-4xl'
                    )}>
                      {formatPrice(pkg.price)}
                    </span>
                    <span className="text-sm text-tp-muted">one-time</span>
                  </div>
                  {pkg.outputCount > 0 && (
                    <p className="mt-1 text-xs text-tp-muted">
                      {formatPrice(Math.round(pkg.price / pkg.outputCount), 'usd')} per photo
                    </p>
                  )}
                  {isRecommended && bestValuePackage?.id === pkg.id && (
                    <p className="mt-2 inline-flex w-fit items-center gap-1 rounded-full border border-tp-bronze/40 bg-tp-bronze/10 px-2.5 py-0.5 text-[11px] font-semibold text-tp-bronze-ink">
                      <Check className="h-3 w-3" aria-hidden="true" />
                      Best value per photo
                    </p>
                  )}
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  {/* Key stats */}
                  <div className="rounded-tp-button bg-tp-paper p-4 text-sm">
                    <div className="flex justify-between py-1">
                      <span className="text-tp-muted">{activeCategory.outputLabel}</span>
                      <span className="font-semibold text-tp-black">{pkg.outputCount}</span>
                    </div>
                    <div className="flex justify-between border-t border-tp-line/50 py-1 pt-2">
                      <span className="text-tp-muted">AI Training</span>
                      <span className="font-semibold text-tp-black">Personalized</span>
                    </div>
                  </div>

                  {/* Features */}
                  {pkg.features.length > 0 && (
                    <ul className="space-y-2.5 pt-2">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-tp-ink">
                          <Check className="h-4 w-4 shrink-0 text-tp-bronze-ink" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>

                <CardFooter className="flex-col items-stretch">
                  <Link
                    href={registerHref}
                    className={cn(
                      buttonVariants({ variant: isRecommended ? 'primary' : 'outline' }),
                      'w-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze',
                      isRecommended &&
                        'h-12 bg-tp-black text-tp-paper font-semibold hover:-translate-y-0.5 hover:bg-tp-ink hover:shadow-xl cta-ring',
                      isExpress && 'border-tp-bronze/50 text-tp-bronze-ink hover:bg-tp-bronze/5'
                    )}
                  >
                    {isRecommended
                      ? `Get ${pkg.outputCount} ${pkg.outputCount === 1 ? 'Photo' : 'Photos'} — ${formatPrice(pkg.price)}`
                      : isExpress
                        ? `Try TailorPic — ${formatPrice(pkg.price)}`
                        : `Get ${pkg.outputCount} ${pkg.outputCount === 1 ? 'Photo' : 'Photos'}`}
                  </Link>
                  <p className="mt-3 flex w-full items-center justify-center gap-1 text-xs text-tp-muted">
                    <Lock className="h-3 w-3" aria-hidden="true" />
                    {PAYMENT_PROVIDER.checkoutBadge}
                  </p>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Show all / Show fewer toggle */}
        {canCollapse && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-tp-button border border-tp-line px-5 py-2.5 text-sm font-medium text-tp-bronze-ink transition-all hover:bg-tp-beige/60"
            >
              {showAll ? 'Show fewer' : 'See more options'}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={cn('transition-transform', showAll && 'rotate-180')}
              >
                <path d="M4 6l4 4 4-4" />
              </svg>
            </button>
          </div>
        )}
        </>
          );
        })()}

        {/* Entry-tier upsell hint */}
        {hasExpress && entryPackage && (
          <p className="mt-6 text-center text-sm text-tp-muted">
            <Zap className="mr-1 inline h-3.5 w-3.5 text-tp-bronze" />
            Try with {formatPrice(entryPackage.price)} to see your AI photos. Love the result? Unlock up to 160 professional photos.
          </p>
        )}
        </>)}

        {/* Guarantee & refund summary */}
        <div className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-tp-card border border-tp-line/50 bg-tp-beige/40 px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-tp-ink">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-tp-bronze-ink flex-shrink-0">
              <path d="M12 3 4.5 6v5.5c0 4.4 3.1 8.2 7.5 9.5 4.4-1.3 7.5-5.1 7.5-9.5V6L12 3Z" />
              <path d="m8.75 12 2.25 2.25L15.5 9.75" />
            </svg>
            <span><strong>Quality Commitment</strong> — free regeneration</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-tp-ink">
            <Lock className="h-4 w-4 flex-shrink-0 text-tp-bronze-ink" aria-hidden="true" />
            <span>{PAYMENT_PROVIDER.checkoutBadge}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-tp-ink">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-tp-bronze-ink flex-shrink-0">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
            <span>Results within hours</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-tp-ink">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-tp-bronze-ink flex-shrink-0">
              <path d="M17 7 7 17M7 7h10v10" />
            </svg>
            <span>No subscription</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-tp-ink">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-tp-bronze-ink flex-shrink-0">
              <path d="m8.75 12 2.25 2.25L15.5 9.75" />
              <rect x="3" y="3" width="18" height="18" rx="3" />
            </svg>
            <span>Full commercial rights</span>
          </div>
        </div>

      </div>
    </section>
  );
}
