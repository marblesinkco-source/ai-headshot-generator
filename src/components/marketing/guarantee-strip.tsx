import { RotateCcw, Clock, Lock, CreditCard, Headphones } from 'lucide-react';

const ITEMS = [
  { icon: RotateCcw, label: 'Unlimited Re-Gens' },
  { icon: Clock, label: 'Under 2 Hours' },
  { icon: Lock, label: 'Privacy First' },
  { icon: CreditCard, label: 'One-Time Payment' },
  { icon: Headphones, label: 'Email Support' },
] as const;

export function GuaranteeStrip() {
  return (
    <section className="border-y border-tp-line bg-white py-5" aria-label="Our guarantees">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10">
          {ITEMS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-tp-bronze" aria-hidden="true" />
              <span className="text-xs font-medium text-tp-ink sm:text-sm">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GuaranteeStrip;
