import Link from 'next/link';
import { ShieldCheck, Lock, Trash2, Upload, Cpu, Download } from 'lucide-react';

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

const lifecycleSteps = [
  {
    icon: Upload,
    title: 'Upload',
    description: 'You upload 10-20 selfies.',
  },
  {
    icon: Cpu,
    title: 'AI Processing',
    description: 'Your personalized model is trained.',
  },
  {
    icon: Download,
    title: 'Delivery',
    description: 'Download your headshots.',
  },
  {
    icon: Trash2,
    title: 'Auto-delete',
    description: 'Photos removed within 30 days.',
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

        <div className="mt-14 rounded-tp-card border border-white/10 bg-white/5 px-6 py-10 sm:mt-16 sm:px-8 lg:px-12">
          <h3 className="font-display text-center text-2xl font-normal tracking-tight text-tp-paper sm:text-3xl">
            What Happens to Your Data
          </h3>

          <ol className="mt-10 grid gap-8 lg:grid-cols-4 lg:gap-6">
            {lifecycleSteps.map((step, index) => (
              <li
                key={step.title}
                className="relative flex gap-4 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
              >
                {/* Connector: vertical on mobile, horizontal on desktop */}
                {index < lifecycleSteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-6 top-12 -bottom-8 w-px -translate-x-1/2 bg-tp-bronze/30 lg:left-1/2 lg:top-6 lg:bottom-auto lg:h-px lg:w-full lg:translate-x-0 lg:-translate-y-1/2"
                  />
                )}

                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-tp-bronze/40 bg-tp-black">
                  <step.icon className="h-5 w-5 text-tp-bronze" aria-hidden="true" />
                </span>

                <div className="lg:mt-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-tp-bronze">
                    Step {index + 1}
                  </p>
                  <h4 className="mt-1 text-base font-semibold text-tp-paper">{step.title}</h4>
                  <p className="mt-1 text-[15px] leading-relaxed text-tp-beige/80">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-10 text-center text-sm text-tp-muted">
            You can also request deletion at any time from your dashboard
          </p>
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
