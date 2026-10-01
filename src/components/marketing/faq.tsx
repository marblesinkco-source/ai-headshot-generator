'use client';

import { useId, useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { faqs, faqCategories } from '@/config/faqs';

type Category = (typeof faqCategories)[number] | 'All';

export function FAQ() {
  const baseId = useId();
  const [category, setCategory] = useState<Category>('All');
  const [openKey, setOpenKey] = useState<string | null>(null);

  const tabs: Category[] = ['All', ...faqCategories];

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: faqs.length };
    for (const f of faqs) map[f.category] = (map[f.category] ?? 0) + 1;
    return map;
  }, []);

  const visible = useMemo(
    () => faqs.filter((f) => category === 'All' || f.category === category),
    [category]
  );

  const selectCategory = (c: Category) => {
    setCategory(c);
    setOpenKey(null);
  };

  return (
    <section id="faq" className="bg-tp-paper py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-tp-muted">
            Everything you need to know about our AI photo service.
          </p>
        </div>

        {/* Category filter */}
        <div
          role="group"
          aria-label="Filter questions by category"
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {tabs.map((c) => {
            const active = category === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => selectCategory(c)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-tp-button border px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze-ink',
                  active
                    ? 'border-tp-ink bg-tp-ink text-tp-paper'
                    : 'border-tp-line bg-white text-tp-muted hover:border-tp-bronze hover:text-tp-ink'
                )}
              >
                {c}
                <span
                  className={cn(
                    'text-xs tabular-nums',
                    active ? 'text-tp-beige' : 'text-tp-bronze-ink'
                  )}
                >
                  {counts[c] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Accordion */}
        <ul
          className="mt-8 space-y-3"
          aria-live="polite"
        >
          {visible.map((faq, i) => {
            const key = faq.question;
            const open = openKey === key;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;
            return (
              <li
                key={key}
                className={cn(
                  'rounded-tp-card border bg-white transition-colors duration-300',
                  open ? 'border-tp-bronze' : 'border-tp-line hover:border-tp-beige'
                )}
              >
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenKey(open ? null : key)}
                    className="flex w-full items-start justify-between gap-4 rounded-tp-card px-5 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-tp-bronze-ink sm:px-6"
                  >
                    <span className="flex flex-col gap-1">
                      {category === 'All' && (
                        <span className="text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">
                          {faq.category}
                        </span>
                      )}
                      <span className="text-base font-medium text-tp-black">
                        {faq.question}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300',
                        open
                          ? 'border-tp-bronze-ink bg-tp-bronze-ink text-tp-paper'
                          : 'border-tp-line bg-tp-paper text-tp-bronze-ink'
                      )}
                    >
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform duration-300 ease-out motion-reduce:transition-none',
                          open && 'rotate-180'
                        )}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn(
                    'grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none',
                    open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  )}
                >
                  <div className="overflow-hidden" {...(!open ? { inert: '' as unknown as boolean } : {})}>
                    <p className="px-5 pb-6 text-base leading-relaxed text-tp-muted sm:px-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Still have questions */}
        <div className="mt-12 rounded-tp-card border border-tp-line bg-tp-ink px-6 py-10 text-center sm:px-10">
          <h3 className="font-display text-2xl font-normal text-tp-paper sm:text-3xl">
            Still have questions?
          </h3>
          <p className="mx-auto mt-3 max-w-md text-base text-tp-beige">
            Browse our help center for guides, or reach out and our team will get back to you.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-tp-button bg-tp-bronze px-6 py-3 text-sm font-semibold text-tp-black transition-colors hover:bg-tp-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze sm:w-auto"
            >
              Contact support
            </Link>
            <Link
              href="/help"
              className="inline-flex w-full items-center justify-center rounded-tp-button border border-tp-beige/40 px-6 py-3 text-sm font-semibold text-tp-paper transition-colors hover:border-tp-bronze hover:text-tp-bronze focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze sm:w-auto"
            >
              Visit help center
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
