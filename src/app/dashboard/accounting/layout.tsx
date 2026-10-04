'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const TABS = [
  { href: '/dashboard/accounting/overview', label: 'Overview' },
  { href: '/dashboard/accounting/transactions', label: 'Transactions' },
  { href: '/dashboard/accounting/documents', label: 'Documents' },
  { href: '/dashboard/accounting/credits', label: 'Credits' },
  { href: '/dashboard/accounting/refunds', label: 'Refunds & Disputes' },
  { href: '/dashboard/accounting/billing', label: 'Billing' },
  { href: '/dashboard/accounting/export', label: 'Export' },
  { href: '/dashboard/accounting/activity', label: 'Activity' },
];

export default function AccountingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '';
  const activeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="mx-auto w-full max-w-6xl">
      <header className="mb-6">
        <h1 className="font-display text-4xl font-normal text-tp-black">Accounting</h1>
        <p className="mt-1 text-sm text-tp-muted">Transactions, documents, credits and billing details.</p>
      </header>

      <nav
        aria-label="Accounting sections"
        className="relative mb-8 -mx-4 overflow-x-auto border-b border-tp-line/60 px-4 sm:mx-0 sm:px-0"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <ul className="flex min-w-max gap-1 sm:gap-4">
          {TABS.map((tab) => {
            const active = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
            return (
              <li key={tab.href}>
                <Link
                  ref={active ? activeRef : undefined}
                  href={tab.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    '-mb-px inline-flex min-h-[44px] items-center whitespace-nowrap border-b-2 px-2 text-sm font-medium transition-colors',
                    active
                      ? 'border-tp-bronze text-tp-bronze-ink'
                      : 'border-transparent text-tp-muted hover:text-tp-ink',
                  )}
                >
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {children}
    </div>
  );
}
