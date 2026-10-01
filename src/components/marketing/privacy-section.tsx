import Link from 'next/link';
import { ShieldCheck, Lock, Trash2 } from 'lucide-react';

const promises = [
  {
    icon: ShieldCheck,
    title: 'Your Photos Stay Private',
    description:
      'We never sell your data or use your photos to train AI models. Your images are processed solely to create your headshots.',
  },
  {
    icon: Lock,
    title: 'Secure by Design',
    description:
      'All data is encrypted in transit and at rest. We use Stripe for payments — your card details never touch our servers.',
  },
  {
    icon: Trash2,
    title: "You're in Control",
    description:
      "Download or delete your photos anytime. We retain processed images only for the duration of your order, then they're removed.",
  },
] as const;

export function PrivacySection() {
  return (
    <section aria-label="Privacy and security" className="bg-tp-black py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
        <h2 className="font-display text-center text-3xl font-normal tracking-tight text-tp-paper sm:text-4xl lg:text-5xl">
          Your Privacy, Our Priority
        </h2>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {promises.map((promise) => (
            <div
              key={promise.title}
              className="rounded-tp-card border border-white/10 bg-white/5 px-6 py-8 sm:px-7 sm:py-9"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-tp-bronze/15">
                <promise.icon className="h-6 w-6 text-tp-bronze" aria-hidden="true" />
              </span>

              <h3 className="mt-5 text-lg font-semibold text-tp-paper">{promise.title}</h3>

              <p className="mt-2 text-[15px] leading-relaxed text-tp-beige/80">
                {promise.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-tp-muted sm:mt-12">
          See our{' '}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-tp-beige">
            Privacy Policy
          </Link>{' '}
          for complete details
        </p>
      </div>
    </section>
  );
}
