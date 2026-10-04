import { TrustGlyph } from '@/components/marketing/illustrations';

const badges = [
  { kind: 'no-subscription' as const, label: 'No Subscription' },
  { kind: 'auto-delete' as const, label: 'Photos Auto-Deleted in 30 Days' },
  { kind: 'commercial' as const, label: 'Full Commercial Rights' },
  { kind: 'one-time' as const, label: 'One-Time Payment' },
];

export function TrustBadges() {
  return (
    <section aria-label="Why choose TailorPic" className="py-8 sm:py-10">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {badges.map((badge) => (
            <li
              key={badge.label}
              className="group flex min-h-[88px] flex-col items-center justify-center gap-2.5 rounded-tp-card border border-tp-line bg-gradient-to-b from-tp-paper to-tp-beige/30 px-3 py-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-tp-bronze/60 hover:shadow-md"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-tp-beige bg-gradient-to-br from-tp-beige/60 to-tp-bronze/20 shadow-inner transition-colors duration-200 group-hover:border-tp-bronze group-hover:from-tp-beige group-hover:to-tp-bronze/30">
                <TrustGlyph kind={badge.kind} className="h-6 w-6 text-tp-bronze-ink" />
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
