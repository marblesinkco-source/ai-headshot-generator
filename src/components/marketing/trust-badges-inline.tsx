import Link from 'next/link';
import { Shield, Lock, Clock } from 'lucide-react';

const badges = [
  {
    Icon: Shield,
    label: 'Satisfaction Guarantee',
    href: '/guarantee',
  },
  {
    Icon: Lock,
    label: 'Secure Payment',
  },
  {
    Icon: Clock,
    label: '~2 Hour Delivery',
  },
] as const;

export function TrustBadgesInline({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-2 ${className}`}
      role="list"
      aria-label="Trust signals"
    >
      {badges.map(({ Icon, label, ...rest }) => {
        const content = (
          <>
            <Icon className="h-3.5 w-3.5 shrink-0 text-tp-bronze" aria-hidden="true" />
            <span>{label}</span>
          </>
        );

        return 'href' in rest && rest.href ? (
          <Link
            key={label}
            href={rest.href}
            role="listitem"
            className="flex items-center gap-1.5 text-xs text-tp-muted transition-colors hover:text-tp-bronze-ink"
          >
            {content}
          </Link>
        ) : (
          <span
            key={label}
            role="listitem"
            className="flex items-center gap-1.5 text-xs text-tp-muted"
          >
            {content}
          </span>
        );
      })}
    </div>
  );
}
