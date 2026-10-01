'use client';

import Link from 'next/link';

export default function DashboardNotFound() {
  return (
    <main id="main-content" className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-tp-card border border-tp-line bg-white p-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-tp-bronze-ink">Error 404</p>
        <h1 className="mt-3 font-display text-3xl font-normal text-tp-black">Page not found</h1>
        <p className="mt-3 text-sm leading-relaxed text-tp-muted">
          We couldn&apos;t find that page in your dashboard. It may have been moved or removed.
        </p>
        <div className="mt-6">
          <Link
            href="/dashboard/overview"
            className="inline-block rounded-tp-button bg-tp-black px-5 py-2.5 text-sm font-semibold text-tp-bronze transition-colors hover:bg-tp-ink"
          >
            Back to Overview
          </Link>
        </div>
      </div>
    </main>
  );
}
