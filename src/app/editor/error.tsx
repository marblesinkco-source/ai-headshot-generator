'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function EditorError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-tp-bronze-ink">Something went wrong</p>
      <h1 className="mt-4 font-display text-3xl font-normal text-tp-black">Editor unavailable</h1>
      <p className="mt-3 text-base text-tp-muted">An unexpected error occurred. Please try again.</p>
      <div className="mt-8 flex gap-3">
        <button onClick={reset} className="rounded-tp-button bg-tp-black px-6 py-3 text-sm font-semibold text-tp-bronze hover:bg-tp-ink transition-colors">
          Try again
        </button>
        <Link href="/dashboard" className="rounded-tp-button border border-tp-bronze px-6 py-3 text-sm font-semibold text-tp-bronze-ink hover:bg-tp-beige/40 transition-colors">
          Dashboard
        </Link>
      </div>
    </main>
  );
}
