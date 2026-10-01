import { cn } from '@/lib/utils';
import type { OrderStatus } from '@/types';

const STATUS_CONFIG: Record<OrderStatus, { label: string; className: string; pulse?: boolean }> = {
  pending: {
    label: 'Pending',
    className: 'bg-gray-100 text-gray-700',
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
    className: 'bg-yellow-100 text-yellow-700',
    pulse: true,
  },
  completed: {
    label: 'Completed',
    className: 'bg-green-100 text-green-700',
  },
  failed: {
    label: 'Failed',
    className: 'bg-red-100 text-red-700',
  },
  refunded: {
    label: 'Refunded',
    className: 'bg-gray-100 text-gray-700',
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
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-500" />
        </span>
      )}
      {config.label}
    </span>
  );
}
