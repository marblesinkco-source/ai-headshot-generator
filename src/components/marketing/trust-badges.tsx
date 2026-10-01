import { Shield, Clock, Lock, CreditCard } from 'lucide-react';

const badges = [
  { icon: Shield, label: 'Money-Back Guarantee' },
  { icon: Clock, label: 'Photos in Hours' },
  { icon: Lock, label: 'Privacy-First' },
  { icon: CreditCard, label: 'No Subscription' },
];

export function TrustBadges() {
  return (
    <section aria-label="Why choose TailorPic" className="py-6 sm:py-8">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-[18px] border border-tp-line bg-tp-paper px-5 py-4">
          {badges.map((badge) => (
            <li
              key={badge.label}
              className="flex items-center gap-2 text-[13px] font-semibold text-tp-ink"
            >
              <badge.icon className="h-4 w-4 text-tp-bronze-ink" aria-hidden="true" />
              {badge.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
