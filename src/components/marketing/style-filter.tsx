'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Filter, Search, X } from 'lucide-react';
import type { PhotoStyle } from '@/config/styles';

interface FilterCategory {
  id: string;
  title: string;
  slugs: string[];
  /** Optional short intro shown above the group's cards. */
  blurb?: string;
}

interface StyleFilterProps {
  styles: PhotoStyle[];
  categories: FilterCategory[];
}

// Short labels for the category chips (full titles are used for section headings).
const CHIP_LABELS: Record<string, string> = {
  professional: 'Professional',
  natural: 'Natural',
  creative: 'Creative',
  'classic-mood': 'Classic & Moody',
  artistic: 'Artistic',
  more: 'More',
};

// Each use case matches any of its keywords inside a style's idealFor entries.
const USE_CASES: { id: string; label: string; keywords: string[] }[] = [
  { id: 'linkedin', label: 'LinkedIn', keywords: ['linkedin'] },
  {
    id: 'website',
    label: 'Company Website',
    keywords: ['company website', 'company page', 'about us', 'team page', 'website'],
  },
  { id: 'personal-brand', label: 'Personal Brand', keywords: ['personal brand'] },
  { id: 'dating', label: 'Dating', keywords: ['dating'] },
  { id: 'portfolio', label: 'Portfolio', keywords: ['portfolio'] },
  { id: 'social', label: 'Social Media', keywords: ['social'] },
];

const CTA_HREF = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

function chipClass(active: boolean) {
  return `rounded-tp-button border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze ${
    active
      ? 'border-tp-black bg-tp-black text-tp-paper'
      : 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze'
  }`;
}

function FilterStyleCard({ style }: { style: PhotoStyle }) {
  const useCase = style.idealFor[0];
  return (
    <Link
      href={`/styles/${style.slug}`}
      className="group flex h-full flex-col rounded-tp-card border border-tp-line bg-white p-6 transition-all hover:-translate-y-1 hover:border-tp-bronze hover:shadow-md"
    >
      <h3 className="font-display font-normal text-2xl text-tp-ink">{style.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-tp-muted">{style.description}</p>
      {useCase && (
        <p className="mt-4 rounded-tp-button bg-tp-paper px-3 py-2 text-sm text-tp-ink">
          <span className="font-semibold text-tp-bronze-ink">Great for: </span>
          {useCase}
        </p>
      )}
      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-tp-bronze-ink transition-all group-hover:gap-2.5">
        Learn more <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </Link>
  );
}

export function StyleFilter({ styles, categories }: StyleFilterProps) {
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState<string>('all');
  const [useCaseId, setUseCaseId] = useState<string>('all');

  const isFiltered = query.trim() !== '' || categoryId !== 'all' || useCaseId !== 'all';

  const groups = useMemo(() => {
    const bySlug = new Map(styles.map((s) => [s.slug, s]));
    const q = query.trim().toLowerCase();
    const useCase = USE_CASES.find((u) => u.id === useCaseId);

    const matches = (s: PhotoStyle) => {
      if (q) {
        const haystack = [s.name, s.description, ...s.idealFor].join(' ').toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (useCase) {
        const ideal = s.idealFor.join(' ').toLowerCase();
        if (!useCase.keywords.some((k) => ideal.includes(k))) return false;
      }
      return true;
    };

    return categories
      .filter((c) => categoryId === 'all' || c.id === categoryId)
      .map((c) => ({
        ...c,
        items: c.slugs
          .map((slug) => bySlug.get(slug))
          .filter((s): s is PhotoStyle => Boolean(s))
          .filter(matches),
      }))
      .filter((g) => g.items.length > 0);
  }, [styles, categories, query, categoryId, useCaseId]);

  const total = useMemo(() => {
    const known = new Set(styles.map((s) => s.slug));
    const seen = new Set<string>();
    categories.forEach((c) => c.slugs.forEach((slug) => known.has(slug) && seen.add(slug)));
    return seen.size;
  }, [styles, categories]);

  const shown = groups.reduce((n, g) => n + g.items.length, 0);

  const clearAll = () => {
    setQuery('');
    setCategoryId('all');
    setUseCaseId('all');
  };

  return (
    <div>
      {/* Filter controls */}
      <section aria-label="Filter styles" className="pb-4">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-tp-card border border-tp-line bg-white p-4 sm:p-6">
            <div className="relative">
              <label htmlFor="style-search" className="sr-only">
                Search styles
              </label>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-tp-muted"
                aria-hidden="true"
              />
              <input
                id="style-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by style, look or use, e.g. LinkedIn, vintage, founder"
                className="w-full rounded-tp-button border border-tp-line bg-tp-paper py-3 pl-11 pr-10 text-sm text-tp-ink placeholder:text-tp-muted focus:border-tp-bronze-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink/40"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-tp-button p-1 text-tp-muted transition-colors hover:text-tp-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-4">
              <div>
                <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">
                  <Filter className="h-3.5 w-3.5" aria-hidden="true" /> Category
                </p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                  <button
                    type="button"
                    onClick={() => setCategoryId('all')}
                    aria-pressed={categoryId === 'all'}
                    className={chipClass(categoryId === 'all')}
                  >
                    All
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategoryId(c.id)}
                      aria-pressed={categoryId === c.id}
                      className={chipClass(categoryId === c.id)}
                    >
                      {CHIP_LABELS[c.id] ?? c.title}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">
                  Use case
                </p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by use case">
                  {USE_CASES.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => setUseCaseId(useCaseId === u.id ? 'all' : u.id)}
                      aria-pressed={useCaseId === u.id}
                      className={chipClass(useCaseId === u.id)}
                    >
                      {u.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 border-t border-tp-line pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-tp-muted" role="status" aria-live="polite">
                Showing <span className="font-semibold text-tp-ink">{shown}</span> of{' '}
                <span className="font-semibold text-tp-ink">{total}</span> styles
              </p>
              {isFiltered && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex items-center justify-center gap-1.5 self-start rounded-tp-button border border-tp-bronze px-4 py-2 text-sm font-medium text-tp-bronze-ink transition-colors hover:bg-tp-beige/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze sm:self-auto"
                >
                  <X className="h-4 w-4" aria-hidden="true" /> Clear filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      {groups.length === 0 ? (
        <section className="py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-tp-card border border-tp-line bg-white p-8 text-center sm:p-12">
              <h2 className="font-display font-normal text-3xl text-tp-ink">No styles match</h2>
              <p className="mx-auto mt-3 max-w-md text-tp-muted">
                Try a different search term or remove a filter to see more looks.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-tp-button bg-tp-black px-6 py-3 text-sm font-semibold text-tp-paper transition-colors hover:bg-tp-ink"
              >
                Clear filters
              </button>
            </div>
          </div>
        </section>
      ) : (
        groups.map((group) => (
          <section key={group.id} id={group.id} className="scroll-mt-24 py-12">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8 max-w-2xl">
                <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
                  {group.title}
                </h2>
                {group.blurb && <p className="mt-2 text-tp-muted">{group.blurb}</p>}
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((style) => (
                  <FilterStyleCard key={style.slug} style={style} />
                ))}
              </div>
              {!isFiltered && (
                <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-tp-card border border-tp-line bg-white p-6 sm:flex-row sm:items-center">
                  <p className="font-display font-normal text-xl text-tp-ink">
                    Like a {group.title.toLowerCase()} look? Create yours from a few selfies.
                  </p>
                  <Link
                    href={CTA_HREF}
                    className="inline-flex items-center justify-center gap-2 rounded-tp-button bg-tp-black px-6 py-3 text-sm font-semibold text-tp-paper transition-colors hover:bg-tp-ink"
                  >
                    Get my headshots <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
