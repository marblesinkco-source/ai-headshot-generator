import Link from 'next/link'
import { ArrowRight, Camera, DollarSign, Zap } from 'lucide-react'
import { BASE_PRICE_DISPLAY } from '@/config/pricing'
import { Reveal } from '@/components/ui/reveal'

const DIFFERENTIATORS = [
  {
    icon: Camera,
    label: 'Fewer selfies',
    stat: '4-10',
    statLabel: 'selfies to start',
    title: 'Fewer Selfies Needed',
    body: 'Upload just 4 to 10 selfies and you are done. No long photo shoot, no hunting through your camera roll for dozens of shots.',
    compare: 'Many alternatives ask for 15-25+ photos.',
  },
  {
    icon: Zap,
    label: 'Fastest delivery',
    stat: '~2 hours',
    statLabel: 'to your results',
    title: 'Fastest Delivery',
    body: 'Your headshots are typically ready in about two hours, so you can update your profile today instead of waiting around.',
    compare: 'Others can take 24-48 hours or several days.',
  },
  {
    icon: DollarSign,
    label: 'Lowest entry price',
    stat: `from ${BASE_PRICE_DISPLAY}`,
    statLabel: 'for a single photo',
    title: 'Lowest Entry Price',
    body: `Start with one photo from ${BASE_PRICE_DISPLAY}, or scale up to as many as 160 photos when you want more options to choose from.`,
    compare: 'Others typically start at $29 or more.',
  },
] as const

export function WhyTailorPic() {
  return (
    <section
      aria-labelledby="why-tailorpic-heading"
      className="bg-tp-paper py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-tp-bronze-ink">
            Why TailorPic
          </p>
          <h2
            id="why-tailorpic-heading"
            className="mt-4 font-display text-4xl font-normal leading-tight text-tp-black sm:text-5xl"
          >
            Why Choose TailorPic
          </h2>
          <p className="mt-4 text-base leading-relaxed text-tp-muted sm:text-lg">
            Professional AI headshots without the usual friction: less to
            upload, less to wait for, and less to spend to get started.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {DIFFERENTIATORS.map(
            ({ icon: Icon, label, stat, statLabel, title, body, compare }, i) => (
              <Reveal
                as="li"
                key={title}
                index={i}
                className="flex flex-col rounded-tp-card border border-tp-line bg-tp-paper p-6 sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-beige text-tp-bronze-ink">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-tp-bronze-ink">
                    {label}
                  </span>
                </div>

                <p className="mt-8 font-display text-5xl font-normal leading-none text-tp-black">
                  {stat}
                </p>
                <p className="mt-2 text-sm text-tp-muted">{statLabel}</p>

                <h3 className="mt-8 font-display text-2xl font-normal text-tp-ink">
                  {title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-tp-muted">
                  {body}
                </p>

                <p className="mt-6 border-t border-tp-line pt-4 text-sm text-tp-muted">
                  {compare}
                </p>
              </Reveal>
            ),
          )}
        </ul>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <Link
            href="/auth/register?redirect=/dashboard/upload"
            className="inline-flex items-center justify-center gap-2 rounded-tp-button bg-tp-black px-7 py-3.5 text-sm font-semibold text-tp-paper transition-colors hover:bg-tp-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze"
          >
            Create your headshots
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <p className="text-sm text-tp-muted">
            Packages from {BASE_PRICE_DISPLAY} for 1 photo, up to 160 photos,
            across 12 categories.
          </p>
        </div>
      </div>
    </section>
  )
}
