import { Check, X } from 'lucide-react';

export type CellValueType = string | boolean;

interface CellValueProps {
  value: CellValueType;
  /** Bold bronze text for string values (e.g. the winning column). */
  highlight?: boolean;
  /**
   * `icon` — bare check/cross icon with screen-reader text (default).
   * `pill` — check/cross inside a rounded badge.
   */
  variant?: 'icon' | 'pill';
}

/** Comparison-table cell: renders booleans as check/cross icons, strings as text. */
export function CellValue({ value, highlight, variant = 'icon' }: CellValueProps) {
  if (variant === 'pill') {
    if (typeof value === 'boolean') {
      return value ? (
        <span className="inline-flex items-center justify-center rounded-full bg-tp-bronze/10 p-1 text-tp-bronze-ink">
          <Check className="h-4 w-4" />
          <span className="sr-only">Yes</span>
        </span>
      ) : (
        <span className="inline-flex items-center justify-center rounded-full bg-tp-paper p-1 text-tp-muted">
          <X className="h-4 w-4" />
          <span className="sr-only">No</span>
        </span>
      );
    }
    return (
      <span className={highlight ? 'font-semibold text-tp-bronze-ink' : 'text-tp-muted'}>
        {value}
      </span>
    );
  }

  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1.5 text-tp-bronze-ink">
        <Check className="h-5 w-5" />
        <span className="sr-only">Yes</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center gap-1.5 text-tp-muted">
        <X className="h-5 w-5" />
        <span className="sr-only">No</span>
      </span>
    );
  }
  return <span className={highlight ? 'font-semibold text-tp-bronze-ink' : undefined}>{value}</span>;
}
