import Link from 'next/link';
import { ArrowRight, Lock, ShieldCheck, Trash2 } from 'lucide-react';

const commitments = [
  {
    icon: Trash2,
    title: 'Auto-deleted in 30 days',
    description: 'Your uploaded selfies and generated headshots are automatically removed within 30 days.',
  },
  {
    icon: ShieldCheck,
    title: 'Never sold',
    description: 'We do not sell your data or your photos to anyone, ever.',
  },
  {
    icon: ShieldCheck,
    title: 'Never used for training',
    description: 'Your photos are used only to create your headshots, not to train AI models.',
  },
  {
    icon: Lock,
    title: 'Encrypted storage',
    description: 'Your data is encrypted in transit and at rest. Card details are handled by Stripe.',
  },
] as const;

const learnMoreLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/security', label: 'Security' },
] as const;

export function PrivacySection() {
  return (
    <section aria-label="Privacy and security" className="bg-tp-black py-20 lg:py-24">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-tp-bronze/15">
            <ShieldCheck className="h-6 w-6 text-tp-bronze" aria-hidden="true" />
          </span>
          <h2 className="font-display mt-5 text-[30px] sm:text-[40px] font-normal tracking-[-0.03em] leading-tight text-tp-paper">
            Your photos stay yours
          </h2>
          <p className="mt-4 text-base leading-relaxed text-tp-beige/80">
            Four clear commitments on how we handle your photos.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {commitments.map((item) => (
            <li
              key={item.title}
              className="rounded-tp-card border border-tp-paper/10 bg-tp-paper/5 px-6 py-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-tp-bronze/15">
                <item.icon className="h-5 w-5 text-tp-bronze" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-[22px] font-normal text-tp-paper">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-tp-beige/80">
                {item.description}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row sm:gap-6">
          <span className="text-sm text-tp-beige/70">Learn more:</span>
          {learnMoreLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-2 rounded-tp-button border border-tp-bronze/40 px-5 py-2.5 text-sm font-semibold text-tp-bronze transition-colors hover:border-tp-bronze hover:bg-tp-bronze/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze"
            >
              {link.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
