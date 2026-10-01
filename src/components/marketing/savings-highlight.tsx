import Link from 'next/link';
import { ArrowRight, Calendar, Camera, Clock } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const valueProps = [
  { icon: Calendar, title: 'No scheduling needed', body: 'Upload selfies whenever it suits you. No booking, no travel.' },
  { icon: Camera, title: '40+ photos included', body: 'Plenty of looks and backgrounds to choose from.' },
  { icon: Clock, title: 'Ready in ~2 hours', body: 'Skip the weeks of waiting on a studio session.' },
];

export function SavingsHighlight() {
  return (
    <section className="bg-tp-paper py-16 sm:py-24" aria-labelledby="savings-heading">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tp-bronze-ink">
            Your savings
          </p>
          <h2
            id="savings-heading"
            className="mt-3 font-display font-normal text-4xl leading-tight text-tp-ink sm:text-5xl"
          >
            Professional headshots, without the studio bill
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="rounded-tp-card border border-tp-line bg-white p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-tp-muted">
              Traditional studio
            </p>
            <p
              className="mt-4 font-display font-normal text-5xl text-tp-muted line-through decoration-tp-bronze-ink/60 decoration-2 sm:text-6xl"
              aria-label="Traditional photography costs $200 to $500 or more"
            >
              $200–$500+
            </p>
            <p className="mt-4 text-sm leading-relaxed text-tp-muted">
              Typical cost of a single professional photography session, before retouching or extra
              looks.
            </p>
          </div>

          <div className="rounded-tp-card bg-tp-ink p-8 text-tp-paper">
            <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze">
              TailorPic
            </p>
            <p className="mt-4 font-display font-normal text-5xl text-tp-paper sm:text-6xl">
              $9.90
            </p>
            <p className="mt-1 text-sm text-tp-beige">one-time for individuals</p>
            <p className="mt-4 inline-block rounded-tp-button bg-tp-bronze px-3 py-1.5 text-sm font-semibold text-tp-black">
              Save up to 98%
            </p>
          </div>
        </div>

        <ul className="mt-5 grid gap-5 sm:grid-cols-3">
          {valueProps.map(({ icon: Icon, title, body }) => (
            <li key={title} className="rounded-tp-card border border-tp-line bg-white p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-beige/50 text-tp-bronze-ink">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-tp-ink">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-tp-muted">{body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link
            href="/auth/register"
            className={cn(buttonVariants({ size: 'lg' }), 'rounded-tp-button')}
          >
            Get your headshots
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
