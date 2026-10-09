'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ul className="space-y-3">
      {items.map((faq, i) => {
        const open = openIndex === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-btn-${i}`;
        return (
          <li
            key={faq.question}
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
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-start justify-between gap-4 rounded-tp-card px-5 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-tp-bronze-ink sm:px-6"
              >
                <span className="text-base font-medium text-tp-ink">
                  {faq.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300',
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
                <p className="px-5 pb-5 text-sm leading-relaxed text-tp-muted sm:px-6">
                  {faq.answer}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
