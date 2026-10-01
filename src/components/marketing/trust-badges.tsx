import { Ban, BadgeCheck, CreditCard, ShieldCheck, Trash2 } from 'lucide-react';

const badges = [
  { icon: Ban, label: 'No Subscription' },
  { icon: ShieldCheck, label: '14-Day Money-Back Guarantee' },
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
              className="flex min-h-[88px] flex-col items-center justify-center gap-2.5 rounded-tp-card border border-tp-line bg-tp-paper px-3 py-4 text-center last:col-span-2 lg:last:col-span-1"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-tp-line bg-tp-beige">
                <badge.icon className="h-[18px] w-[18px] text-tp-bronze-ink" aria-hidden="true" />
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
