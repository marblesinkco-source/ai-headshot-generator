import Link from 'next/link';
import { Upload, Cpu, Sparkles, Download, Clock } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    number: 1,
    title: 'Upload Selfies',
    icon: Upload,
    description: 'Upload 4–10 casual selfies from your phone',
    time: '~2 minutes',
  },
  {
    number: 2,
    title: 'AI Processing',
    icon: Cpu,
    description: 'Our AI learns your features and generates professional headshots',
    time: '~90 minutes',
  },
  {
    number: 3,
    title: 'Review & Choose',
    icon: Sparkles,
    description: 'Browse your AI headshots across up to 10 professional styles',
    time: '~5 minutes',
  },
  {
    number: 4,
    title: 'Download',
    icon: Download,
    description: 'Download high-resolution headshots ready for any platform',
    time: 'Instant',
  },
] as const;

export default function ProcessingTimeline() {
  return (
    <section
      className="bg-tp-paper py-20 lg:py-24"
      aria-labelledby="processing-timeline-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-tp-bronze-ink">
            What happens next
          </p>
          <h2
            id="processing-timeline-heading"
            className="mt-3 font-display text-[30px] font-normal leading-tight tracking-[-0.03em] text-tp-ink sm:text-[40px]"
          >
            Your Headshots, Step by Step
          </h2>
        </div>

        <ol className="m-0 mt-12 grid list-none grid-cols-1 gap-8 p-0 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === STEPS.length - 1;
            return (
              <li
                key={step.number}
                className="relative flex gap-4 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
              >
                {/* Mobile: vertical connector running down to the next step */}
                {!isLast && (
                  <span
                    className="absolute left-7 top-14 -bottom-8 w-px -translate-x-1/2 bg-tp-bronze/50 lg:hidden"
                    aria-hidden="true"
                  />
                )}

                {/* Desktop: horizontal connector from this circle to the next */}
                {!isLast && (
                  <span
                    className="absolute left-[calc(50%+2.25rem)] right-[calc(-50%+2.25rem)] top-7 hidden h-px bg-tp-bronze/50 lg:block"
                    aria-hidden="true"
                  >
                    <span className="absolute -right-px top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-r border-t border-tp-bronze/70" />
                  </span>
                )}

                {/* Numbered circle with icon */}
                <div className="relative z-10 shrink-0">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-tp-ink text-tp-bronze">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span
                    className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-tp-bronze bg-tp-paper text-xs font-semibold text-tp-bronze-ink"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                </div>

                <div className="flex-1 lg:mt-5 lg:flex-none">
                  <h3 className="m-0 font-display text-[22px] font-normal leading-tight text-tp-ink lg:text-[24px]">
                    <span className="sr-only">Step {step.number}: </span>
                    {step.title}
                  </h3>
                  <p className="mb-3 mt-2 text-sm leading-relaxed text-tp-muted">
                    {step.description}
                  </p>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
                      step.number === 2
                        ? 'border-tp-bronze bg-tp-bronze/10 text-tp-bronze-ink'
                        : 'border-tp-line bg-tp-beige/40 text-tp-ink'
                    )}
                  >
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {step.time}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Total time callout */}
        <div className="mx-auto mt-12 flex max-w-xl items-center justify-center gap-3 rounded-tp-card border border-tp-line bg-tp-beige/40 px-5 py-4 text-center lg:mt-16">
          <Clock className="h-5 w-5 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
          <p className="m-0 text-sm font-medium text-tp-ink sm:text-base">
            Total time: Under 2 hours from upload to download
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/auth/register?redirect=/dashboard/upload"
            className={cn(
              buttonVariants({ variant: 'primary', size: 'lg' }),
              'rounded-tp-button bg-tp-ink text-tp-paper transition-all duration-200 hover:-translate-y-0.5 hover:bg-tp-black hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze'
            )}
          >
            Get Started — From {BASE_PRICE_DISPLAY} →
          </Link>
        </div>
      </div>
    </section>
  );
}
