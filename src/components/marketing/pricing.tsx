'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Zap, Lock, Star } from 'lucide-react';
import { getActiveCategories, type Category } from '@/config/categories';
import { categoryVisuals } from '@/config/category-visuals';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const categories = getActiveCategories();

// Show a curated set of categories as tabs — synced with config/categories.ts FEATURED_CATEGORIES
import { FEATURED_CATEGORIES as FEATURED_IDS } from '@/config/categories';

export function Pricing() {
  const featured = categories.filter((c) => FEATURED_IDS.includes(c.id));
  const [activeCategory, setActiveCategory] = useState<Category>(
    featured[0] || categories[0]
  );

  const packages = activeCategory.packages;
  // Entry tier = cheapest package in the category (TailorPic 1 for headshots, Express elsewhere).
  const entryPackage =
    packages.length > 0
      ? packages.reduce((min, p) => (p.price < min.price ? p : min), packages[0])
      : undefined;
  const hasExpress = packages.length >= 4 && entryPackage !== undefined;

  return (
    <section id="pricing" className="relative bg-tp-paper/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Value proposition (no fake urgency) */}
        <div className="mx-auto mb-10 max-w-xl rounded-tp-card border border-tp-line bg-tp-paper p-4 text-center">
          <p className="text-sm font-semibold text-tp-bronze-ink">
            One-time price. No subscription. Yours to keep.
          </p>
          <p className="mt-1 text-xs text-tp-muted">
            Studio-quality photos without the studio booking, travel or wardrobe changes.
          </p>
        </div>

        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
            Pricing
          </p>
          <h2 className="mt-3 font-display font-normal text-3xl tracking-tight text-tp-black sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-lg text-tp-muted">
            One-time payment. No subscription. Your photos are yours forever.
          </p>
        </div>

        {/* Category tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {featured.map((cat) => (
            <button
              key={cat.id}
              type="button"
              aria-pressed={activeCategory.id === cat.id}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze-ink',
                activeCategory.id === cat.id
                  ? 'bg-tp-black text-tp-bronze shadow-md'
                  : 'bg-white text-tp-muted hover:bg-tp-paper border border-tp-line'
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
            className="rounded-full border border-tp-line bg-white px-4 py-2 text-sm font-medium text-tp-muted transition-all hover:bg-tp-paper"
          >
            All Categories &rarr;
          </Link>
        </div>

        {/* Cards */}
        <div className={cn(
          'mt-12 grid gap-6',
          packages.length >= 5
            ? 'sm:grid-cols-2 lg:grid-cols-3'
            : packages.length === 4
              ? 'sm:grid-cols-2 lg:grid-cols-4'
              : packages.length === 3
              ? 'lg:grid-cols-3'
              : packages.length === 2
                ? 'lg:grid-cols-2 max-w-3xl mx-auto'
                : 'max-w-md mx-auto'
        )}>
          {packages.map((pkg) => {
            const isRecommended = pkg.recommended === true;
            const isExpress = !isRecommended && entryPackage !== undefined && pkg.id === entryPackage.id;

            return (
              <Card
                key={pkg.id}
                className={cn(
                  'relative flex flex-col',
                  isRecommended &&
                    'z-10 border-tp-bronze bg-white shadow-xl shadow-tp-bronze/20 ring-2 ring-tp-bronze/60 scale-[1.02] lg:scale-105',
                  isExpress &&
                    'border-dashed border-tp-bronze/30'
                )}
              >
                {isRecommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-tp-black px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-tp-paper shadow-md whitespace-nowrap">
                      <Star className="h-3 w-3 fill-tp-bronze text-tp-bronze" aria-hidden="true" />
                      Most Popular
                    </span>
                  </div>
                )}
                {isExpress && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="outline" className="border-tp-bronze/50 bg-white text-tp-bronze-ink">
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
                    <p className="mt-1 text-[12px] text-tp-muted">
                      That&apos;s just {formatPrice(Math.round(pkg.price / pkg.outputCount))} per photo
                    </p>
                  )}
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  {/* Key stats */}
                  <div className="rounded-xl bg-tp-paper p-4 text-sm">
                    <div className="flex justify-between py-1">
                      <span className="text-tp-muted">{activeCategory.outputLabel}</span>
                      <span className="font-semibold text-tp-black">{pkg.outputCount}+</span>
                    </div>
                    <div className="flex justify-between border-t border-tp-line/50 py-1 pt-2">
                      <span className="text-tp-muted">AI Training</span>
                      <span className="font-semibold text-tp-black">Personalized</span>
                    </div>
                    <div className="flex justify-between border-t border-tp-line/50 py-1 pt-2">
                      <span className="text-tp-muted">Resolution</span>
                      <span className="font-semibold uppercase text-tp-black">
                        {isExpress ? 'Standard' : pkg.price >= 5000 ? '4K' : 'HD'}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  {pkg.features.length > 0 && (
                    <ul className="space-y-2.5 pt-2">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-tp-ink">
                          <Check className="h-4 w-4 shrink-0 text-tp-bronze" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>

                <CardFooter className="flex-col items-stretch">
                  <Link href={`/auth/register?redirect=/${activeCategory.slug}`} className="w-full">
                    <Button
                      variant={isRecommended ? 'primary' : 'outline'}
                      className={cn(
                        'w-full',
                        isRecommended &&
                          'h-12 bg-tp-black text-tp-paper font-semibold hover:-translate-y-0.5 hover:bg-tp-ink hover:shadow-xl hover:animate-cta-pulse motion-reduce:hover:animate-none',
                        isExpress && 'border-tp-bronze/50 text-tp-bronze-ink hover:bg-tp-bronze/5'
                      )}
                    >
                      {isExpress ? 'Try It' : 'Get Started'}
                    </Button>
                  </Link>
                  <p className="mt-3 flex w-full items-center justify-center gap-1 text-xs text-tp-muted">
                    <Lock className="h-3 w-3" aria-hidden="true" />
                    Secure checkout via Stripe
                  </p>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Entry-tier upsell hint */}
        {hasExpress && entryPackage && (
          <p className="mt-6 text-center text-sm text-tp-muted">
            <Zap className="mr-1 inline h-3.5 w-3.5 text-tp-bronze" />
            Start with {entryPackage.name} to preview your results, then upgrade anytime.
          </p>
        )}

      </div>
    </section>
  );
}
