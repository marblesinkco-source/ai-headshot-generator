import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

const steps = [
  {
    number: '01',
    title: 'Choose a category',
    description:
      'Browse 11 photo categories — from corporate headshots and LinkedIn portraits to dating profiles and creative editorial shots. Pick the style that fits your goal.',
  },
  {
    number: '02',
    title: 'Choose a package',
    description:
      'Start with Express for $9.90 to preview your results, or go all-in with a premium package for 120+ photos in 4K resolution. One-time payment, no subscription.',
  },
  {
    number: '03',
    title: 'Upload your photos',
    description:
      'Upload 8–12 clear selfies following our simple guidelines. Our AI trains a personalized model on your unique features — your photos are auto-deleted within 30 days.',
  },
  {
    number: '04',
    title: 'Download your photos',
    description:
      'Receive 40–120+ studio-quality portraits in under 2 hours. Download them all, pick your favorites, and use them anywhere — LinkedIn, resumes, social media, or print.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14 py-10 lg:py-[68px]">
      <div className="flex justify-between items-center gap-4 mb-5 lg:mb-[30px]">
        <h2 className="font-display text-[25px] lg:text-[33px] leading-tight tracking-[-0.03em] font-normal">
          A clearer way to create.
        </h2>
        <span className="shrink-0 rounded-full border border-tp-line bg-tp-paper px-3 py-1 text-[11px] lg:text-xs font-medium text-tp-bronze-ink">
          Ready in under 2 hours
        </span>
      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-7">
        {steps.map((step) => (
          <article
            key={step.number}
            className="rounded-tp-card border border-tp-line border-l-4 border-l-tp-bronze bg-tp-paper p-4 lg:p-6"
          >
            <span className="block font-display text-4xl lg:text-[56px] leading-none text-tp-bronze-ink">
              {step.number}
            </span>
            <h3 className="text-[13px] lg:text-base mt-3 lg:mt-[17px] mb-2 lg:mb-[9px] font-semibold">
              {step.title}
            </h3>
            <p className="text-[11px] lg:text-[13px] text-tp-muted leading-[1.7] m-0">
              {step.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 lg:mt-10 flex justify-center">
        <Link
          href="/auth/register"
          className={buttonVariants({ variant: 'primary', size: 'lg' })}
        >
          Create Your Photos
        </Link>
      </div>
    </section>
  );
}
