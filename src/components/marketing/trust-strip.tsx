import { BadgeCheck, Clock, CreditCard, ShieldCheck, Trash2 } from 'lucide-react';

const items = [
  { icon: CreditCard, label: 'One-Time Payment' },
  { icon: Clock, label: '2-Hour Delivery' },
  { icon: ShieldCheck, label: '14-Day Guarantee' },
  { icon: BadgeCheck, label: 'Full Commercial Rights' },
  { icon: Trash2, label: 'Photos Auto-Deleted' },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Why TailorPic"
      className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14 my-4 lg:my-8"
    >
      <ul className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-[22px] border border-tp-line bg-tp-paper px-5 py-5 sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-6 lg:py-4">
        {items.map(({ icon: Icon, label }, i) => (
          <li
            key={label}
            className={`flex items-center gap-3 text-tp-ink ${
              i === items.length - 1 ? 'col-span-2 justify-center lg:col-span-1 lg:justify-start' : ''
            }`}
          >
            <span
              aria-hidden="true"
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-tp-black text-tp-bronze"
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </span>
            <span className="text-[13px] font-semibold leading-tight tracking-[-0.01em] sm:text-sm">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
