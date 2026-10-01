'use client';

import Link from 'next/link';
import { Check, Sparkles, Zap } from 'lucide-react';
import { CREDIT_PACKAGES } from '@/config/credits';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function CreditPackages() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-tp-bronze/10 px-3 py-1 text-sm font-medium text-tp-bronze-ink">
            <Sparkles className="h-3.5 w-3.5" />
            New
          </div>
          <h2 className="font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
            Annual Credit Packs
          </h2>
          <p className="mt-4 text-lg text-tp-muted">
            One pool of credits, every category. Use them for headshots today,
            pet portraits tomorrow — your credits, your choice.
          </p>
        </div>

        {/* How credits work */}
        <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-6 text-center text-sm text-tp-muted">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tp-paper text-tp-bronze-ink">
              <Zap className="h-4 w-4" />
            </div>
            <span>1 credit = 1 AI photo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tp-paper text-tp-bronze-ink">
              <Sparkles className="h-4 w-4" />
            </div>
            <span>Works across all categories</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tp-paper text-tp-bronze-ink">
              <Check className="h-4 w-4" />
            </div>
            <span>Valid for 12 months</span>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {CREDIT_PACKAGES.map((pkg) => {
            const isRecommended = pkg.recommended === true;

            return (
              <Card
                key={pkg.id}
                className={cn(
                  'relative flex flex-col',
                  isRecommended &&
                    'border-tp-bronze/50 shadow-lg shadow-tp-bronze/10 ring-1 ring-tp-bronze/30 scale-[1.02] lg:scale-105'
                )}
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>{pkg.badge}</Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-tp-black">
                    {pkg.name}
                  </CardTitle>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-display font-normal tracking-tight text-tp-black">
                      {formatPrice(pkg.price)}
                    </span>
                    <span className="text-sm text-tp-muted">/year</span>
                  </div>

                  <p className="mt-2 text-sm font-medium text-tp-bronze-ink">
                    {formatPrice(pkg.perCreditPrice)}/credit &middot; {pkg.savings}
                  </p>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  {/* Key stats */}
                  <div className="rounded-tp-button bg-tp-paper p-4 text-sm">
                    <div className="flex justify-between py-1">
                      <span className="text-tp-muted">Credits</span>
                      <span className="font-semibold text-tp-black">{pkg.credits}</span>
                    </div>
                    <div className="flex justify-between border-t border-tp-line/50 py-1 pt-2">
                      <span className="text-tp-muted">Categories</span>
                      <span className="font-semibold text-tp-black">All 11</span>
                    </div>
                    <div className="flex justify-between border-t border-tp-line/50 py-1 pt-2">
                      <span className="text-tp-muted">Validity</span>
                      <span className="font-semibold text-tp-black">12 months</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 pt-2">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-tp-ink">
                        <Check className="h-4 w-4 shrink-0 text-tp-bronze" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Link href="/auth/login?redirect=/dashboard/credits" className="w-full">
                    <Button
                      variant={isRecommended ? 'primary' : 'outline'}
                      className="w-full"
                    >
                      Get {pkg.credits} Credits
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-tp-muted">
          Credits are one-time purchase, not a subscription. No auto-renewal.
        </p>
      </div>
    </section>
  );
}
