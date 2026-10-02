import { Clock, RefreshCcw, Lock } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

const guarantees = [
  {
    icon: Clock,
    title: 'Ready in Under 2 Hours',
    description:
      'From the moment you upload your selfies, our AI works to deliver your photos fast. Most orders are ready in 90 minutes or less.',
  },
  {
    icon: RefreshCcw,
    title: 'Unlimited Re-Generations',
    description:
      'Within your package, regenerate any photos you are not satisfied with. Fine-tune until every shot is right.',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description:
      'Your uploaded photos are encrypted in transit and at rest. They are auto-deleted within 30 days. We never share your data.',
  },
];

export function DeliveryGuarantee() {
  return (
    <section
      className="bg-tp-black py-20 sm:py-28"
      aria-labelledby="guarantee-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tp-bronze">
            Our Promise
          </p>
          <h2
            id="guarantee-heading"
            className="mt-3 font-display text-3xl font-normal tracking-tight text-tp-paper sm:text-5xl"
          >
            Confidence, Guaranteed
          </h2>
          <p className="mt-4 text-base text-tp-beige/70">
            Every order is backed by our satisfaction guarantee and transparent
            process.
          </p>
        </div>

        {/* Guarantee grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {guarantees.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-tp-card border border-white/10 bg-white/5 p-6 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-tp-bronze/20">
                  <Icon className="h-5 w-5 text-tp-bronze" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-tp-paper">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-beige/70">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process timeline */}
        <div className="mt-16 rounded-tp-card border border-white/10 bg-white/5 p-6 sm:p-10">
          <h3 className="text-center font-display text-2xl font-normal text-tp-paper">
            From Upload to Download
          </h3>
          <div className="relative mt-10">
            {/* Connection line (desktop — horizontal) */}
            <div
              className="absolute left-0 right-0 top-6 hidden h-[2px] bg-gradient-to-r from-tp-bronze/0 via-tp-bronze to-tp-bronze/0 sm:block"
              aria-hidden="true"
            />
            {/* Connection line (mobile — vertical) */}
            <div
              className="absolute left-1/2 top-6 bottom-6 w-[2px] -translate-x-1/2 bg-gradient-to-b from-tp-bronze/0 via-tp-bronze to-tp-bronze/0 sm:hidden"
              aria-hidden="true"
            />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-4 sm:gap-4">
              {[
                { time: '0 min', label: 'Upload Selfies', sub: '10–20 photos' },
                { time: '~5 min', label: 'AI Training', sub: 'Learning your features' },
                { time: '~60 min', label: 'Generating', sub: 'Creating your styles' },
                { time: '~90 min', label: 'Ready!', sub: 'Download & use' },
              ].map((step, i) => (
                <div key={step.label} className="relative text-center">
                  <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-tp-bronze bg-tp-black text-sm font-bold text-tp-bronze shadow-[0_0_20px_rgba(196,162,123,0.2)]">
                    {i + 1}
                  </div>
                  <p className="mt-3 text-xs font-medium text-tp-bronze">
                    {step.time}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-tp-paper">
                    {step.label}
                  </p>
                  <p className="mt-0.5 text-xs text-tp-beige/60">
                    {step.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/auth/register"
            className={buttonVariants({
              variant: 'primary',
              size: 'lg',
            })}
          >
            Get Your Headshots
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DeliveryGuarantee;
