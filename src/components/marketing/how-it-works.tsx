import Link from 'next/link';
import { ArrowRight, Camera, ChevronRight, Clock, Download, Sparkles, Upload } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

const steps = [
  {
    number: '01',
    title: 'Choose a category',
    icon: Camera,
    description:
      'Browse 11 photo categories — from corporate headshots and LinkedIn portraits to dating profiles and creative editorial shots. Pick the style that fits your goal.',
  },
  {
    number: '02',
    title: 'Choose a package',
    icon: Sparkles,
    description:
      'Start with Express for $9.90 to preview your results, or go all-in with a premium package for 120+ photos in 4K resolution. One-time payment, no subscription.',
  },
  {
    number: '03',
    title: 'Upload your photos',
    icon: Upload,
    description:
      'Upload 8–12 clear selfies following our simple guidelines. Our AI trains a personalized model on your unique features — your photos are auto-deleted within 30 days.',
  },
  {
    number: '04',
    title: 'Download your photos',
    icon: Download,
    description:
      'Receive 40–120+ studio-quality portraits in under 2 hours. Download them all, pick your favorites, and use them anywhere — LinkedIn, resumes, social media, or print.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14 py-10 lg:py-[68px]">
      <div className="flex justify-between items-center gap-4 mb-5 lg:mb-[30px]">
        <div>
          <span className="inline-flex items-center gap-1.5 mb-3 rounded-full border border-tp-line bg-tp-paper px-3 py-1 text-[11px] lg:text-xs font-medium text-tp-bronze-ink">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            4 simple steps
          </span>
          <h2 className="font-display text-[25px] lg:text-[33px] leading-tight tracking-[-0.03em] font-normal">
            A clearer way to create.
          </h2>
        </div>
        <span className="hidden sm:inline-flex shrink-0 items-center gap-1.5 rounded-full border border-tp-line bg-tp-paper px-3 py-1 text-[11px] lg:text-xs font-medium text-tp-bronze-ink">
          <Clock className="h-3 w-3" aria-hidden="true" />
          Ready in under 2 hours
        </span>
      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-7">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <article
              key={step.number}
              className="relative rounded-tp-card border border-tp-line border-l-4 border-l-tp-bronze bg-tp-paper p-4 lg:p-6"
            >
              <div className="flex items-center justify-between">
                <span
                  className="flex h-9 w-9 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-tp-bronze font-display text-sm lg:text-xl leading-none text-tp-ink"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <Icon className="h-5 w-5 lg:h-7 lg:w-7 text-tp-bronze-ink" aria-hidden="true" />
              </div>
              <h3 className="font-display font-normal text-[15px] lg:text-xl mt-3 lg:mt-[17px] mb-2 lg:mb-[9px]">
                {step.title}
              </h3>
              <p className="text-[11px] lg:text-[13px] text-tp-muted leading-[1.7] m-0">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <span
                  className="pointer-events-none absolute -right-[22px] top-[40px] z-10 hidden h-6 w-6 items-center justify-center rounded-full border border-tp-line bg-tp-paper text-tp-bronze-ink lg:flex"
                  aria-hidden="true"
                >
                  <ChevronRight className="h-4 w-4" />
                </span>
              )}
            </article>
          );
        })}
      </div>

      <div className="mt-8 lg:mt-10 flex flex-col items-center gap-3 text-center">
        <p className="m-0 inline-flex items-center gap-1.5 text-xs lg:text-sm font-medium text-tp-bronze-ink">
          <Clock className="h-4 w-4" aria-hidden="true" />
          ~2 hours total, from upload to download
        </p>
        <Link
          href="/auth/register"
          className={`${buttonVariants({ variant: 'primary', size: 'lg' })} bg-tp-ink text-tp-paper rounded-tp-button gap-2`}
        >
          Create Your Photos
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <p className="m-0 text-[11px] lg:text-xs text-tp-muted">
          No credit card needed to browse categories
        </p>
      </div>
    </section>
  );
}
