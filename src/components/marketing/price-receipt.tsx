'use client';

import { useState } from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Check, Receipt, ChevronDown, Clock, RefreshCcw } from 'lucide-react';
import { CATEGORIES } from '@/config/categories';
import { formatPrice } from '@/lib/utils';
import { PAYMENT_PROVIDER } from '@/config/pricing';
import { cn } from '@/lib/utils';

const packages = CATEGORIES.headshots.packages;

export function PriceReceipt() {
  const [selectedIdx, setSelectedIdx] = useState(() => {
    const idx = packages.findIndex((p) => p.recommended);
    return idx >= 0 ? idx : Math.min(4, packages.length - 1);
  });
  const pkg = packages[selectedIdx] ?? packages[0];
  const perPhoto = pkg.price / pkg.outputCount;

  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="receipt-heading">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-tp-bronze/15">
            <Receipt className="h-6 w-6 text-tp-bronze-ink" />
          </div>
          <h2
            id="receipt-heading"
            className="font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl"
          >
            Transparent Pricing
          </h2>
          <p className="mt-3 text-base text-tp-muted">
            No subscriptions. No hidden fees. One payment, yours to keep.
          </p>
        </div>

        {/* Package selector */}
        <div className="mt-10">
          <label htmlFor="receipt-package" className="block text-sm font-semibold text-tp-ink">
            Select your plan
          </label>
          <div className="relative mt-2">
            <select
              id="receipt-package"
              value={selectedIdx}
              onChange={(e) => setSelectedIdx(Number(e.target.value))}
              className="w-full appearance-none rounded-tp-button border border-tp-line bg-tp-paper px-4 py-3 pr-10 text-sm font-medium text-tp-ink transition-colors focus:border-tp-bronze-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink/20"
            >
              {packages.map((p, i) => (
                <option key={p.id} value={i}>
                  {p.name} — {formatPrice(p.price)} ({p.outputCount} {p.outputCount === 1 ? 'photo' : 'photos'})
                  {p.recommended ? ' ★ Most Popular' : ''}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tp-muted" />
          </div>
        </div>

        {/* Receipt card */}
        <div className="mt-6 overflow-hidden rounded-tp-card border-2 border-tp-line bg-tp-paper">
          {/* Receipt header */}
          <div className="border-b border-dashed border-tp-line px-6 py-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tp-bronze-ink">
              Order Summary
            </p>
            <p className="mt-1 font-display text-2xl font-normal text-tp-ink">
              {pkg.name} Plan
            </p>
          </div>

          {/* Line items */}
          <div className="divide-y divide-dashed divide-tp-line px-6">
            <div className="flex items-center justify-between py-3.5">
              <span className="text-sm text-tp-muted">AI headshots</span>
              <span className="text-sm font-semibold text-tp-ink">{pkg.outputCount}+ photos</span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <span className="text-sm text-tp-muted">Cost per photo</span>
              <span className="text-sm font-semibold text-tp-ink">
                {formatPrice(Math.round(perPhoto))}
              </span>
            </div>
            {pkg.features.map((feature) => (
              <div key={feature} className="flex items-center justify-between py-3.5">
                <span className="flex items-center gap-2 text-sm text-tp-muted">
                  <Check className="h-3.5 w-3.5 text-tp-bronze-ink" />
                  {feature}
                </span>
                <span className="text-xs font-medium text-tp-bronze-ink">Included</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-3.5">
              <span className="flex items-center gap-2 text-sm text-tp-muted">
                <Check className="h-3.5 w-3.5 text-tp-bronze-ink" />
                Delivery
              </span>
              <span className="text-xs font-medium text-tp-bronze-ink">Within hours</span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <span className="flex items-center gap-2 text-sm text-tp-muted">
                <Check className="h-3.5 w-3.5 text-tp-bronze-ink" />
                Subscription
              </span>
              <span className="text-xs font-medium text-tp-bronze-ink">None — one-time</span>
            </div>
          </div>

          {/* Total */}
          <div className="border-t-2 border-tp-line bg-white px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-base font-semibold text-tp-ink">Total</span>
              <div className="text-right">
                <span className="font-display text-3xl font-normal text-tp-ink">
                  {formatPrice(pkg.price)}
                </span>
                <p className="mt-0.5 text-xs text-tp-muted">One-time payment · No recurring charges</p>
              </div>
            </div>
          </div>

          {/* Trust footer */}
          <div className="border-t border-tp-line bg-tp-beige/30 px-6 py-4">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-tp-muted">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-tp-bronze-ink" />
                Most orders ready within hours
              </span>
              <span className="flex items-center gap-1.5">
                <RefreshCcw className="h-3.5 w-3.5 text-tp-bronze-ink" />
                Free re-generations
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 text-center">
          <Link
            href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
            className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'w-full sm:w-auto')}
          >
            Get My {pkg.outputCount}+ Headshots
          </Link>
          <p className="mt-3 text-xs text-tp-muted">
            {PAYMENT_PROVIDER.checkoutBadge}.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PriceReceipt;
