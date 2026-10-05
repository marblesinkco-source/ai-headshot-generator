import { Check, X, Sun, User, Smile, Camera } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

const DOS = [
  { icon: Sun, text: 'Natural, even lighting (near a window)' },
  { icon: User, text: 'Face clearly visible, no obstructions' },
  { icon: Smile, text: 'Neutral or natural expression' },
  { icon: Camera, text: 'High-resolution photos (phone camera is fine)' },
];

const DONTS = [
  'Heavy filters or beauty mode',
  'Sunglasses, hats, or face-covering accessories',
  'Group photos or photos with others cropped out',
  'Blurry, dark, or overexposed images',
];

export function PhotoPrepGuide() {
  return (
    <section className="bg-tp-paper py-20 sm:py-28" aria-labelledby="photo-prep-heading">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tp-bronze-ink">
            Before You Start
          </p>
          <h2
            id="photo-prep-heading"
            className="mt-3 font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-5xl"
          >
            Upload the Right Selfies
          </h2>
          <p className="mt-4 text-base text-tp-muted">
            Better input = better results. Follow these tips for the best
            AI headshots.
          </p>
        </div>

        {/* Do / Don't grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* DO */}
          <div className="rounded-tp-card border border-tp-bronze/30 bg-tp-bronze/5 p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tp-bronze/15">
                <Check className="h-4 w-4 text-tp-bronze-ink" />
              </div>
              <h3 className="text-lg font-semibold text-tp-ink">Do</h3>
            </div>
            <ul className="mt-5 space-y-4">
              {DOS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tp-bronze/15">
                    <Icon className="h-3.5 w-3.5 text-tp-bronze-ink" aria-hidden="true" />
                  </div>
                  <span className="text-sm text-tp-ink">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* DON'T */}
          <div className="rounded-tp-card border border-tp-line bg-tp-beige/30 p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tp-ink/10">
                <X className="h-4 w-4 text-tp-ink" />
              </div>
              <h3 className="text-lg font-semibold text-tp-ink">Don&apos;t</h3>
            </div>
            <ul className="mt-5 space-y-4">
              {DONTS.map((text) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tp-ink/10">
                    <X className="h-3.5 w-3.5 text-tp-ink" aria-hidden="true" />
                  </div>
                  <span className="text-sm text-tp-ink">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Upload count guidance */}
        <div className="mt-8 rounded-tp-card border border-tp-line bg-white p-6 text-center sm:p-8">
          <p className="text-sm font-semibold text-tp-ink">
            How many photos should I upload?
          </p>
          <p className="mx-auto mt-2 max-w-lg text-sm text-tp-muted">
            Upload <strong className="text-tp-ink">4–10 photos</strong> with
            varied angles, expressions, and lighting. More variety gives our AI
            more to work with — and better results.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/auth/register?redirect=/dashboard/upload"
            className={buttonVariants({
              variant: 'primary',
              size: 'lg',
            })}
          >
            I&apos;m Ready — Get My Headshots
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PhotoPrepGuide;
