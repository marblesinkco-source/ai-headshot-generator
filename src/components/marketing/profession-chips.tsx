'use client';

import Link from 'next/link';

/**
 * Slugs must exist in `src/config/professions.ts` so every chip resolves to a
 * real page at /headshots/for-[slug].
 */
const PROFESSIONS = [
  { slug: 'lawyers', label: 'Lawyer' },
  { slug: 'realtors', label: 'Realtor' },
  { slug: 'developers', label: 'Developer' },
  { slug: 'doctors', label: 'Doctor' },
  { slug: 'consultants', label: 'Consultant' },
  { slug: 'executives', label: 'Executive' },
  { slug: 'teachers', label: 'Teacher' },
  { slug: 'accountants', label: 'Accountant' },
  { slug: 'engineers', label: 'Engineer' },
  { slug: 'sales-professionals', label: 'Sales Pro' },
  { slug: 'marketing-professionals', label: 'Marketer' },
  { slug: 'actors', label: 'Actor' },
] as const;

export function ProfessionChips() {
  return (
    <nav
      aria-label="Headshots by profession"
      className="bg-tp-beige/30 py-6 sm:py-8"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-sm font-medium text-tp-muted">I&apos;m a:</span>
          {PROFESSIONS.map(({ slug, label }) => (
            <Link
              key={slug}
              href={`/headshots/for-${slug}`}
              className="rounded-tp-button border border-tp-line bg-tp-paper px-4 py-2 text-sm font-medium text-tp-ink transition-colors hover:border-tp-bronze hover:text-tp-bronze-ink"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default ProfessionChips;
