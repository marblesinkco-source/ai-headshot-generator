'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';

export interface VsEntry {
  slug: string;
  name: string;
}

export interface VsGroup {
  id: string;
  title: string;
  blurb: string;
  entries: VsEntry[];
}

export function VsDirectory({ groups }: { groups: VsGroup[] }) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      groups
        .map((g) => ({
          ...g,
          entries: q ? g.entries.filter((e) => e.name.toLowerCase().includes(q)) : g.entries,
        }))
        .filter((g) => g.entries.length > 0),
    [groups, q]
  );

  const total = filtered.reduce((n, g) => n + g.entries.length, 0);

  return (
    <div>
      <div className="mx-auto max-w-xl">
        <label htmlFor="vs-search" className="sr-only">
          Search comparisons by tool name
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-tp-muted"
            aria-hidden="true"
          />
          <input
            id="vs-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools, e.g. HeadshotPro, Midjourney, Canva"
            className="w-full rounded-tp-button border border-tp-line bg-white py-3.5 pl-12 pr-4 text-base text-tp-ink placeholder:text-tp-muted/80 focus:border-tp-bronze focus:outline-none focus:ring-2 focus:ring-tp-bronze/40"
          />
        </div>
        <p className="mt-3 text-center text-sm text-tp-muted" aria-live="polite">
          {q ? `${total} ${total === 1 ? 'comparison' : 'comparisons'} found` : `${total} comparisons`}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="mx-auto mt-10 max-w-xl rounded-tp-card border border-tp-line bg-white p-8 text-center">
          <p className="font-display text-2xl text-tp-ink">No comparison found for &ldquo;{query}&rdquo;</p>
          <p className="mt-2 text-sm text-tp-muted">
            Try a shorter name, or clear the search to browse everything.
          </p>
          <button
            type="button"
            onClick={() => setQuery('')}
            className="mt-5 rounded-tp-button border border-tp-line px-5 py-2.5 text-sm font-semibold text-tp-ink transition-colors hover:bg-tp-paper"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="mt-12 space-y-14">
          {filtered.map((g) => (
            <section key={g.id} aria-labelledby={`vs-${g.id}`}>
              <div className="mb-6 max-w-2xl">
                <h2 id={`vs-${g.id}`} className="font-display text-3xl text-tp-ink sm:text-4xl">
                  {g.title}
                </h2>
                <p className="mt-2 text-tp-muted">{g.blurb}</p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.entries.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/vs/${c.slug}`}
                      className="group flex h-full items-center justify-between gap-3 rounded-tp-card border border-tp-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-tp-bronze hover:shadow-md"
                    >
                      <span className="text-base font-semibold text-tp-ink">TailorPic vs {c.name}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-tp-bronze-ink transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
