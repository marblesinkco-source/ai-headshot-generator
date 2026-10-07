'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Marketing page error:', error);
  }, [error]);

  return (
    <main id="main-content" className="flex min-h-screen flex-col items-center justify-center bg-tp-paper px-4">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-tp-beige/40">
          <svg
            className="h-8 w-8 text-tp-bronze-ink"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <h1 className="mt-6 font-display text-4xl font-normal leading-tight text-tp-black">
          Something went wrong
        </h1>
        <p className="mt-3 text-base text-tp-muted">
          We encountered an unexpected problem. Please try again or return to the home page.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-tp-button bg-tp-black px-5 py-2.5 text-sm font-semibold text-tp-bronze shadow-sm hover:bg-tp-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze-ink focus-visible:ring-offset-2"
          >
            Try again
          </button>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            className="rounded-tp-button border border-tp-line bg-white px-5 py-2.5 text-sm font-semibold text-tp-bronze-ink shadow-sm hover:bg-tp-beige/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze-ink focus-visible:ring-offset-2"
          >
            Go home
          </a>
        </div>
        {error.digest && (
          <p className="mt-6 text-xs text-tp-muted">Reference: {error.digest}</p>
        )}
      </div>
    </main>
  );
}
