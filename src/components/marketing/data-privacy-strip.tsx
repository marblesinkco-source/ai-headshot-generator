import { Lock, ShieldCheck, Trash2 } from 'lucide-react';

const ITEMS = [
  { icon: Trash2, label: 'Photos deleted after 30 days' },
  { icon: ShieldCheck, label: 'Never used for AI training' },
  { icon: Lock, label: 'Your data stays private' },
];

export function DataPrivacyStrip({ className }: { className?: string }) {
  return (
    <section
      aria-label="Data privacy"
      className={`rounded-tp-button border border-tp-line bg-tp-paper px-4 py-3 ${className ?? ''}`.trim()}
    >
      <ul className="flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 sm:gap-y-2">
        {ITEMS.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2 text-xs text-tp-muted sm:text-[13px]">
            <Icon className="h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
