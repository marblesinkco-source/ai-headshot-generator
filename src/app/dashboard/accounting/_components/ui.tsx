'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { StatusColor } from '@/types/accounting';

/** Fetch JSON from an accounting endpoint and throw a readable error on failure. */
export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { credentials: 'same-origin', ...init });
  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }
  if (!res.ok) {
    const message =
      body && typeof body === 'object' && 'error' in body && typeof (body as { error: unknown }).error === 'string'
        ? (body as { error: string }).error
        : `Request failed (${res.status})`;
    throw new Error(message);
  }
  return body as T;
}

/** Endpoints may return either `{ data: X }` or X directly. */
export function unwrap<T>(body: unknown): T {
  if (body && typeof body === 'object' && 'data' in body && !Array.isArray(body)) {
    return (body as { data: T }).data;
  }
  return body as T;
}

export interface PageInfo {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function readPageInfo(body: unknown, rowCount: number, fallbackPageSize: number): PageInfo {
  const b = (body && typeof body === 'object' ? body : {}) as Partial<PageInfo>;
  const pageSize = b.pageSize || fallbackPageSize;
  const total = typeof b.total === 'number' ? b.total : rowCount;
  return {
    total,
    page: b.page || 1,
    pageSize,
    totalPages: b.totalPages || Math.max(1, Math.ceil(total / pageSize)),
  };
}

export function readRows<T>(body: unknown): T[] {
  if (Array.isArray(body)) return body as T[];
  if (body && typeof body === 'object' && 'data' in body) {
    const d = (body as { data: unknown }).data;
    if (Array.isArray(d)) return d as T[];
  }
  return [];
}

const BADGE_CLASSES: Record<StatusColor, string> = {
  green: 'bg-tp-success/10 text-[#15803D]',
  yellow: 'bg-tp-warning/15 text-tp-bronze-ink',
  red: 'bg-tp-error/10 text-[#B91C1C]',
  blue: 'bg-tp-bronze/25 text-tp-bronze-ink',
  gray: 'bg-tp-warm text-tp-muted',
};

export function Badge({ color, children }: { color: StatusColor; children: ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium',
        BADGE_CLASSES[color],
      )}
    >
      {children}
    </span>
  );
}

export function PageHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-3xl font-normal text-tp-black">{title}</h2>
      {description ? <p className="mt-1 text-sm text-tp-muted">{description}</p> : null}
    </div>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-tp-card border border-tp-line/30 bg-white p-4 sm:p-6', className)}>{children}</div>
  );
}

export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-12 text-sm text-tp-muted" role="status" aria-live="polite">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-tp-line border-t-tp-bronze-ink" aria-hidden="true" />
      {label}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-tp-card border border-tp-error/30 bg-tp-error/5 p-6 text-sm text-tp-error" role="alert">
      <p>{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-tp-button border border-tp-error/40 px-4 py-2 min-h-[44px] font-medium hover:bg-tp-error/10"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-tp-card border border-dashed border-tp-line bg-tp-paper px-6 py-12 text-center text-sm text-tp-muted">
      {message}
    </div>
  );
}

export function Pagination({
  page,
  totalPages,
  total,
  onChange,
}: {
  page: number;
  totalPages: number;
  total?: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;
  const btn =
    'rounded-tp-button border border-tp-line px-4 py-2 min-h-[44px] text-sm font-medium text-tp-ink hover:bg-tp-paper disabled:cursor-not-allowed disabled:opacity-40';
  return (
    <nav className="mt-6 flex items-center justify-between gap-3" aria-label="Pagination">
      <p className="text-sm text-tp-muted">
        Page {page} of {totalPages}
        {typeof total === 'number' ? ` (${total} total)` : ''}
      </p>
      <div className="flex gap-2">
        <button type="button" className={btn} disabled={page <= 1} onClick={() => onChange(page - 1)}>
          Previous
        </button>
        <button type="button" className={btn} disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
          Next
        </button>
      </div>
    </nav>
  );
}

export const inputClass =
  'w-full rounded-tp-button border border-tp-line bg-white px-3 py-2 min-h-[44px] text-base sm:text-sm text-tp-ink placeholder:text-tp-muted focus:border-tp-bronze-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink';

export const tableHeadClass = 'px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-tp-muted';
export const tableCellClass = 'px-4 py-3 text-sm text-tp-ink';

export function humanize(value: string): string {
  return value.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}
