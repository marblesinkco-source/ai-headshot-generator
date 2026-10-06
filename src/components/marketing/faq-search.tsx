'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

interface FaqItem {
  category: string;
  question: string;
  answer: string;
}

interface FaqGroup {
  category: string;
  items: FaqItem[];
}

interface FaqSearchProps {
  faqs: FaqItem[];
  groups: FaqGroup[];
}

const slug = (c: string) => c.toLowerCase();

function FaqDetails({ faq }: { faq: FaqItem }) {
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-tp-paper/50 [&::-webkit-details-marker]:hidden">
        <span className="text-base font-medium text-tp-black">{faq.question}</span>
        <span
          aria-hidden="true"
          className="text-xl leading-none text-tp-bronze-ink transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <p className="px-6 pb-5 text-base leading-relaxed text-tp-muted">{faq.answer}</p>
    </details>
  );
}

export default function FaqSearch({ faqs, groups }: FaqSearchProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 200);
    return () => clearTimeout(t);
  }, [query]);

  const searching = debouncedQuery.length > 0;
  const needle = debouncedQuery.toLowerCase();
  const results = searching
    ? faqs.filter((f) => f.question.toLowerCase().includes(needle) || f.answer.toLowerCase().includes(needle))
    : [];

  return (
    <div className="mx-auto max-w-3xl space-y-14 px-4 sm:px-6 lg:px-8">
      <div>
        <label htmlFor="faq-search" className="sr-only">
          Search frequently asked questions
        </label>
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-tp-muted"
          />
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions and answers"
            autoComplete="off"
            className="w-full rounded-tp-button border border-tp-line bg-white py-3 pl-12 pr-4 text-base text-tp-ink placeholder:text-tp-muted focus:border-tp-bronze focus:outline-none focus:ring-2 focus:ring-tp-bronze/30"
          />
        </div>
        <p role="status" aria-live="polite" className="mt-3 min-h-[1.25rem] text-sm text-tp-muted">
          {searching && results.length > 0 &&
            `${results.length} ${results.length === 1 ? 'result' : 'results'} for '${debouncedQuery}'`}
        </p>
      </div>

      {searching ? (
        results.length > 0 ? (
          <div className="divide-y divide-tp-line/50 rounded-tp-card border border-tp-line bg-white">
            {results.map((faq) => (
              <FaqDetails key={faq.question} faq={faq} />
            ))}
          </div>
        ) : (
          <div className="rounded-tp-card border border-tp-line bg-white px-6 py-10 text-center">
            <p className="text-base font-medium text-tp-black">No results found</p>
            <p className="mt-2 text-sm text-tp-muted">
              We could not find an answer for &lsquo;{debouncedQuery}&rsquo;.{' '}
              <Link href="/contact" className="font-medium text-tp-bronze-ink underline underline-offset-2">
                Contact us
              </Link>{' '}
              and we will help.
            </p>
          </div>
        )
      ) : (
        groups.map((g) => (
          <div key={g.category} id={slug(g.category)} className="scroll-mt-24">
            <h2 className="font-display font-normal text-2xl text-tp-black sm:text-3xl">{g.category}</h2>
            <div className="mt-6 divide-y divide-tp-line/50 rounded-tp-card border border-tp-line bg-white">
              {g.items.map((faq) => (
                <FaqDetails key={faq.question} faq={faq} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
