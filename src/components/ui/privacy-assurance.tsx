import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PrivacyAssuranceProps {
  /** Smaller text and tighter spacing for constrained layouts */
  compact?: boolean;
  className?: string;
}

export function PrivacyAssurance({ compact = false, className }: PrivacyAssuranceProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 text-tp-muted',
        compact ? 'text-[11px]' : 'text-xs',
        className,
      )}
    >
      <ShieldCheck
        className={cn(
          'flex-shrink-0 text-tp-bronze/70',
          compact ? 'h-3.5 w-3.5' : 'h-4 w-4',
        )}
        aria-hidden="true"
      />
      <p>
        Your photos are automatically deleted within 30 days. Never sold or used for training.{' '}
        <Link
          href="/security"
          className="underline underline-offset-2 transition-colors hover:text-tp-bronze-ink"
        >
          Learn more
        </Link>
      </p>
    </div>
  );
}
