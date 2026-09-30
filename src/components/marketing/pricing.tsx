'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { getActiveCategories, type Category } from '@/config/categories';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const categories = getActiveCategories();

// Show a curated set of categories as tabs, defaulting to headshots
const FEATURED_CATEGORIES = ['headshots', 'linkedin', 'dating', 'pets', 'family'];

export function Pricing() {
  const featured = categories.filter((c) => FEATURED_CATEGORIES.includes(c.id));
  const [activeCategory, setActiveCategory] = useState<Category>(
    featured[0] || categories[0]
  );

  const packages = activeCategory.packages;

  return (
    <section id="pricing" className="relative bg-tailor-cream/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-500">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-tailor-black sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            One-time payment. No subscription. Your photos are yours forever.
          </p>
        </div>

        {/* Category tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {featured.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all',
                activeCategory.id === cat.id
                  ? 'bg-tailor-black text-tailor-gold shadow-md'
                  : 'bg-white text-gray-600 hover:bg-brand-50 border border-brand-200/60'
              )}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
          <Link
            href="/#categories"
            className="rounded-full border border-brand-200/60 bg-white px-4 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-brand-50"
          >
            All Categories &rarr;
          </Link>
        </div>

        {/* Cards */}
        <div className={cn(
          'mt-12 grid gap-8',
          packages.length === 3 ? 'lg:grid-cols-3' : packages.length === 2 ? 'lg:grid-cols-2 max-w-3xl mx-auto' : 'max-w-md mx-auto'
        )}>
          {packages.map((pkg, index) => {
            const isPopular = index === 1 && packages.length >= 3;

            return (
              <Card
                key={pkg.id}
                className={cn(
                  'relative flex flex-col',
                  isPopular &&
                    'border-brand-400/50 shadow-lg shadow-brand-400/10 ring-1 ring-brand-400/30 scale-[1.02] lg:scale-105'
                )}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-tailor-black">
                    {pkg.name}
                  </CardTitle>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold tracking-tight text-tailor-black">
                      {formatPrice(pkg.price)}
                    </span>
                    <span className="text-sm text-gray-500">one-time</span>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  {/* Key stats */}
                  <div className="rounded-xl bg-brand-50 p-4 text-sm">
                    <div className="flex justify-between py-1">
                      <span className="text-gray-500">{activeCategory.outputLabel}</span>
                      <span className="font-semibold text-tailor-black">{pkg.outputCount}+</span>
                    </div>
                    <div className="flex justify-between border-t border-brand-200/50 py-1 pt-2">
                      <span className="text-gray-500">AI Training</span>
                      <span className="font-semibold text-tailor-black">Personalized</span>
                    </div>
                    <div className="flex justify-between border-t border-brand-200/50 py-1 pt-2">
                      <span className="text-gray-500">Resolution</span>
                      <span className="font-semibold uppercase text-tailor-black">HD</span>
                    </div>
                  </div>

                  {/* Features */}
                  {pkg.features.length > 0 && (
                    <ul className="space-y-2.5 pt-2">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                          <Check className="h-4 w-4 shrink-0 text-brand-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>

                <CardFooter>
                  <Link href={`/auth/login?redirect=/${activeCategory.slug}`} className="w-full">
                    <Button
                      variant={isPopular ? 'primary' : 'outline'}
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Trust line */}
        <p className="mt-12 text-center text-sm text-gray-500">
          Secure payment via Stripe. 100% satisfaction guaranteed or your money back.
        </p>
      </div>
    </section>
  );
}
