import { Check, X, Clock, DollarSign, Camera, Sparkles, RefreshCw, Shield } from 'lucide-react';

const rows = [
  {
    feature: 'Cost',
    icon: DollarSign,
    traditional: '$200 – $500+',
    tailorpic: 'Starting at $9.90',
    winner: 'tailorpic' as const,
  },
  {
    feature: 'Delivery Time',
    icon: Clock,
    traditional: '1 – 2 weeks',
    tailorpic: 'Under 2 hours',
    winner: 'tailorpic' as const,
  },
  {
    feature: 'Number of Photos',
    icon: Camera,
    traditional: '5 – 15 photos',
    tailorpic: '40+ photos',
    winner: 'tailorpic' as const,
  },
  {
    feature: 'Style Variety',
    icon: Sparkles,
    traditional: '1 – 2 backgrounds',
    tailorpic: '11 categories',
    winner: 'tailorpic' as const,
  },
  {
    feature: 'Reshoots',
    icon: RefreshCw,
    traditional: 'Extra charge required',
    tailorpic: 'Unlimited regeneration',
    winner: 'tailorpic' as const,
  },
  {
    feature: 'Privacy',
    icon: Shield,
    traditional: 'Depends on photographer',
    tailorpic: 'Encrypted, 30-day deletion',
    winner: 'tailorpic' as const,
  },
];

export function ComparisonTable() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
            Comparison
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-tp-black sm:text-3xl">
            AI Photos vs Traditional Studio
          </h2>
          <p className="mt-3 text-base text-tp-muted max-w-xl mx-auto">
            Professional photos no longer require hours of your time and hundreds of dollars.
          </p>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-tp-line overflow-hidden bg-white">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[1.5fr_1fr_1fr] bg-tp-paper border-b border-tp-line">
            <div className="p-4 sm:p-5 text-xs font-semibold uppercase tracking-wider text-tp-muted">
              Feature
            </div>
            <div className="p-4 sm:p-5 text-xs font-semibold uppercase tracking-wider text-tp-muted text-center">
              Traditional Studio
            </div>
            <div className="p-4 sm:p-5 text-xs font-semibold uppercase tracking-wider text-tp-bronze-ink text-center">
              TailorPic AI
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[1.5fr_1fr_1fr] items-center ${
                i < rows.length - 1 ? 'border-b border-tp-line/60' : ''
              }`}
            >
              {/* Feature name */}
              <div className="p-4 sm:p-5 flex items-center gap-2.5">
                <row.icon className="h-4 w-4 text-tp-muted/60 flex-shrink-0 hidden sm:block" />
                <span className="text-sm font-medium text-tp-ink">{row.feature}</span>
              </div>

              {/* Traditional */}
              <div className="p-4 sm:p-5 text-center">
                <span className="text-sm text-tp-muted">{row.traditional}</span>
              </div>

              {/* TailorPic */}
              <div className="p-4 sm:p-5 text-center bg-tp-bronze/[0.04]">
                <span className="text-sm font-semibold text-tp-bronze-ink">
                  {row.tailorpic}
                </span>
              </div>
            </div>
          ))}

          {/* Bottom CTA row */}
          <div className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[1.5fr_1fr_1fr] bg-tp-paper border-t border-tp-line">
            <div className="p-4 sm:p-5">
              <span className="text-xs text-tp-muted">Result</span>
            </div>
            <div className="p-4 sm:p-5 flex justify-center">
              <X className="h-5 w-5 text-red-400/70" />
            </div>
            <div className="p-4 sm:p-5 flex justify-center bg-tp-bronze/[0.04]">
              <Check className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="mt-5 text-center text-xs text-tp-muted">
          * Traditional studio prices reflect average market rates.
        </p>
      </div>
    </section>
  );
}
