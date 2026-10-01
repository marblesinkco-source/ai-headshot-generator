import { Shield, Clock, Lock, CreditCard } from 'lucide-react';

const badges = [
  { icon: Shield, label: '14-Day Money-Back Guarantee' },
  { icon: Clock, label: 'Photos in Hours' },
  { icon: Lock, label: 'Privacy-First' },
  { icon: CreditCard, label: 'No Subscription' },
];

export function TrustBadges() {
  return (
    <section aria-label="Why choose TailorPic" className="py-6 sm:py-8">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {badges.map((badge) => (
            <li
              key={badge.label}
              className="flex flex-col items-center gap-3 rounded-tp-card border border-tp-line bg-tp-paper px-4 py-5 text-center sm:flex-row sm:justify-center sm:text-left"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-tp-line bg-tp-beige">
                <badge.icon className="h-5 w-5 text-tp-bronze-ink" aria-hidden="true" />
              </span>
              <span className="text-[13px] font-semibold text-tp-ink sm:text-sm">
                {badge.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
