import Link from 'next/link';
import { ArrowDown, ArrowRight, Clock } from 'lucide-react';
import { StepStyleIllustration, StepUploadIllustration, StepDownloadIllustration } from '@/components/marketing/illustrations';
import { buttonVariants } from '@/components/ui/button';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

const steps = [
  {
    number: '1',
    label: 'Step 1',
    title: 'Pick your style and package',
    Illustration: StepStyleIllustration,
    description:
      'Choose the photo category that fits your goal, such as corporate, LinkedIn, dating or creative, then select the package that suits you. One-time payment, no subscription.',
  },
  {
    number: '2',
    label: 'Step 2',
    title: 'Upload 4–10 selfies',
    Illustration: StepUploadIllustration,
    description:
      'Add 4–10 clear, well-lit selfies with different angles and expressions. Our AI learns your features from them, and your uploads are auto-deleted within 30 days.',
  },
  {
    number: '3',
    label: 'Step 3',
    title: 'Download your portraits',
    Illustration: StepDownloadIllustration,
    description:
      'Get your studio-quality portraits in under 2 hours. Browse the full set, save your favorites, and use them on LinkedIn, resumes, social profiles or print.',
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14 py-20 lg:py-24"
    >
      <div className="flex justify-between items-end gap-4 mb-8 lg:mb-12">
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-tp-bronze-ink">
            3 simple steps
          </p>
          <h2 className="font-display text-[30px] sm:text-[40px] font-normal tracking-[-0.03em] text-tp-ink leading-tight">
            How it works
          </h2>
        </div>
        <span className="hidden sm:inline-flex shrink-0 items-center gap-1.5 rounded-full border border-tp-line bg-tp-paper px-3 py-1 text-[11px] lg:text-xs font-medium text-tp-bronze-ink">
          <Clock className="h-3 w-3" aria-hidden="true" />
          Ready in under 2 hours
        </span>
      </div>

      <ol className="m-0 flex list-none flex-col p-0 lg:grid lg:grid-cols-3 lg:gap-14">
        {steps.map((step, index) => {
          const Illustration = step.Illustration;
          const isLast = index === steps.length - 1;
          return (
            <li key={step.number} className="scroll-fade-in relative flex flex-col items-stretch">
              <article className="relative h-full overflow-hidden rounded-tp-card border border-tp-line bg-tp-paper p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-tp-bronze hover:shadow-lg hover:shadow-tp-bronze/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:p-8">
                <span
                  className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-[110px] leading-none text-tp-beige/40 lg:text-[140px]"
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                <div className="relative flex items-center gap-4">
                  <span
                    className="flex h-14 w-14 lg:h-[72px] lg:w-[72px] shrink-0 items-center justify-center rounded-full bg-tp-ink font-display text-[30px] lg:text-[40px] leading-none text-tp-bronze"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <div>
                    <p className="m-0 text-[11px] lg:text-xs font-semibold uppercase tracking-[0.14em] text-tp-bronze-ink">
                      {step.label}
                    </p>
                    </div>
                </div>

                <div className="relative mt-5 flex h-[120px] lg:h-[140px] items-center justify-center rounded-tp-button border border-tp-line bg-gradient-to-br from-tp-paper to-tp-beige/40">
                  <Illustration className="h-full w-auto max-w-full p-2" />
                </div>

                <h3 className="relative font-display font-normal text-[22px] lg:text-[26px] leading-tight mt-5 lg:mt-6 mb-2 lg:mb-3 text-tp-ink">
                  {step.title}
                </h3>
                <p className="relative m-0 text-sm lg:text-[15px] leading-relaxed text-tp-muted">
                  {step.description}
                </p>
              </article>

              {/* Mobile connector: vertical arrow between stacked steps */}
              {!isLast && (
                <span
                  className="mx-auto my-3 flex h-10 w-10 items-center justify-center rounded-full border border-tp-line bg-tp-paper text-tp-bronze-ink lg:hidden"
                  aria-hidden="true"
                >
                  <ArrowDown className="h-5 w-5" />
                </span>
              )}

              {/* Desktop connector: horizontal arrow in the gap between steps */}
              {!isLast && (
                <span
                  className="pointer-events-none absolute -right-[48px] top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-tp-bronze bg-tp-paper text-tp-bronze-ink lg:flex"
                  aria-hidden="true"
                >
                  <ArrowRight className="h-5 w-5" />
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-10 lg:mt-14 flex flex-col items-center gap-3 text-center">
        <Link
          href="/auth/register?redirect=/dashboard/upload"
          className={`${buttonVariants({ variant: 'primary', size: 'lg' })} bg-tp-ink text-tp-paper rounded-tp-button gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:bg-tp-black hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze`}
        >
          Start My Headshots — {BASE_PRICE_DISPLAY}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <p className="m-0 text-[11px] lg:text-xs text-tp-muted">
          Create your account and start uploading. No subscription.
        </p>
      </div>
    </section>
  );
}
