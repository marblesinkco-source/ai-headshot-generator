'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Blog error:', error);
  }, [error]);

  return (
    <main id="main-content" className="flex min-h-[60vh] items-center justify-center bg-tp-paper px-4 py-12">
      <div className="w-full max-w-md rounded-tp-card border border-tp-line bg-white p-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-tp-bronze-ink">Blog</p>
        <h1 className="mt-3 font-display text-3xl font-normal text-tp-black">We couldn&apos;t load this page</h1>
        <p className="mt-3 text-sm leading-relaxed text-tp-muted">
          Something went wrong on our end. Please try again in a moment.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-tp-button bg-tp-black px-5 py-2.5 text-sm font-semibold text-tp-bronze transition-colors hover:bg-tp-ink"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-tp-button border border-tp-bronze bg-white px-5 py-2.5 text-sm font-semibold text-tp-bronze-ink transition-colors hover:bg-tp-beige/40"
          >
            Go home
          </Link>
        </div>
        {error.digest && <p className="mt-5 text-xs text-tp-muted">Reference: {error.digest}</p>}
      </div>
    </main>
  );
}
