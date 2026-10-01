'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { faqs } from '@/config/faqs';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="bg-tp-paper/40 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-tp-ink sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-tp-muted">
            Everything you need to know about our AI photo service.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-16 divide-y divide-tp-line/50 rounded-tp-card border border-tp-line bg-white">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-tp-paper/50"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span className="text-base font-medium text-tp-black">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 shrink-0 text-tp-bronze transition-transform duration-200',
                    openIndex === i && 'rotate-180 text-tp-bronze-ink'
                  )}
                />
              </button>
              <div
                className={cn(
                  'grid transition-all duration-200',
                  openIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-base leading-relaxed text-tp-muted">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
