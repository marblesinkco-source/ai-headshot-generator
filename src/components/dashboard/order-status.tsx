import { cn } from '@/lib/utils';
import type { OrderStatus } from '@/types';

const STATUS_CONFIG: Record<OrderStatus, { label: string; className: string; pulse?: boolean }> = {
  pending: {
    label: 'Pending',
    className: 'bg-tp-paper text-tp-muted',
  },
  paid: {
    label: 'Paid',
    className: 'bg-tp-beige/30 text-tp-bronze-ink',
  },
  uploading: {
    label: 'Uploading',
    className: 'bg-tp-beige/30 text-tp-bronze-ink',
  },
  processing: {
    label: 'Processing',
    className: 'bg-tp-warning/15 text-tp-bronze-ink',
    pulse: true,
  },
  completed: {
    label: 'Completed',
    className: 'bg-tp-success/10 text-tp-success',
  },
  failed: {
    label: 'Failed',
    className: 'bg-tp-error/10 text-tp-error',
  },
  expired: {
    label: 'Expired',
    className: 'bg-tp-paper text-tp-muted',
  },
  refunded: {
    label: 'Refunded',
    className: 'bg-tp-paper text-tp-muted',
  },
  partial_refund: {
    label: 'Partial Refund',
    className: 'bg-tp-paper text-tp-muted',
  },
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.pulse && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tp-warning opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-tp-warning" />
        </span>
      )}
      {config.label}
    </span>
  );
}
