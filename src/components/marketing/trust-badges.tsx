import { Ban, BadgeCheck, CreditCard, Trash2 } from 'lucide-react';

const badges = [
  { icon: Ban, label: 'No Subscription' },
  { icon: Trash2, label: 'Photos Auto-Deleted in 30 Days' },
  { icon: BadgeCheck, label: 'Full Commercial Rights' },
  { icon: CreditCard, label: 'One-Time Payment' },
];

export function TrustBadges() {
  return (
    <section aria-label="Why choose TailorPic" className="py-6 sm:py-8">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-5 lg:gap-4">
          {badges.map((badge) => (
            <li
              key={badge.label}
              className="group flex min-h-[88px] flex-col items-center justify-center gap-2.5 rounded-tp-card border border-tp-line bg-gradient-to-b from-tp-paper to-tp-beige/30 px-3 py-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-tp-bronze hover:shadow-md last:col-span-2 lg:last:col-span-1"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-tp-beige bg-gradient-to-br from-tp-beige/60 to-tp-bronze/20 shadow-inner transition-colors duration-200 group-hover:border-tp-bronze group-hover:from-tp-beige group-hover:to-tp-bronze/30">
                <badge.icon className="h-5 w-5 text-tp-bronze-ink" aria-hidden="true" />
              </span>
              <span className="text-[13px] font-semibold leading-snug text-tp-ink">
                {badge.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
