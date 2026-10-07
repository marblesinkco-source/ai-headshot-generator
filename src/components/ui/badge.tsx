import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-tp-black text-tp-bronze',
        secondary: 'bg-tp-beige/40 text-tp-ink',
        success: 'bg-tp-success/10 text-tp-success',
        warning: 'bg-tp-warning/15 text-tp-bronze-ink',
        destructive: 'bg-tp-error/10 text-tp-error',
        outline: 'border border-tp-line text-tp-bronze-ink bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
