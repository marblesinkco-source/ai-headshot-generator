import { Shield, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GuaranteeBadgeProps {
  variant?: 'compact' | 'card';
  className?: string;
}

export function GuaranteeBadge({ variant = 'card', className }: GuaranteeBadgeProps) {
  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-2 rounded-full border border-tp-line bg-tp-paper px-3 py-1.5 text-xs font-semibold text-tp-bronze-ink',
          className
        )}
      >
        <Shield className="h-4 w-4 text-tp-bronze" aria-hidden="true" />
        14-Day Money-Back Guarantee
      </div>
    );
  }

  return (
    <div
      className={cn(
        'group flex items-start gap-4 rounded-tp-card border border-tp-line bg-gradient-to-br from-tp-paper to-tp-beige/20 p-6 shadow-sm transition-all duration-200 hover:border-tp-bronze/40 hover:shadow-md',
        className
      )}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tp-black text-tp-bronze ring-2 ring-tp-bronze/30 ring-offset-2 ring-offset-white">
        <ShieldCheck className="h-6 w-6" aria-hidden="true" />
      </span>
      <div>
        <h3 className="font-display text-xl text-tp-ink">14-Day Money-Back Guarantee</h3>
        <p className="mt-1 text-sm text-tp-muted">Not satisfied? Get a full refund, no questions asked.</p>
      </div>
    </div>
  );
}
