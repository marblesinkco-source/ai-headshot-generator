'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { helpCategories } from '@/config/help-data';
import type { HelpCategoryData } from '@/config/help-data';
import {
  Search,
  Rocket,
  ImageUp,
  Images,
  CreditCard,
  Users,
  ShieldCheck,
  ChevronDown,
  Mail,
  ArrowRight,
} from 'lucide-react';

/* Re-export allFaqItems from the shared data module for the server page */
export { allFaqItems } from '@/config/help-data';

/* ------------------------------------------------------------------ */
/*  Icon mapping                                                      */
/* ------------------------------------------------------------------ */

const iconMap: Record<string, React.ElementType> = {
  Rocket,
  ImageUp,
  Images,
  CreditCard,
  Users,
  ShieldCheck,
};

interface HelpCategoryWithIcon extends HelpCategoryData {
  icon: React.ElementType;
}

const categoriesWithIcons: HelpCategoryWithIcon[] = helpCategories.map((cat) => ({
  ...cat,
  icon: iconMap[cat.iconName] || Rocket,
}));

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function HelpContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categoriesWithIcons;
    const q = searchQuery.toLowerCase();
    return categoriesWithIcons
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [searchQuery]);

  const totalResults = filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0);

  const toggleQuestion = (key: string) => {
    setOpenQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const scrollToCategory = (id: string) => {
    setSearchQuery('');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
          <h1 className="font-display font-normal text-4xl tracking-tight text-tp-black sm:text-5xl">
            How Can We{' '}
            <span className="bg-gradient-to-r from-tp-bronze-ink to-tp-bronze bg-clip-text text-transparent">
              Help?
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-muted">
            Find answers to common questions about {siteConfig.name}, from getting started to managing your account.
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-tp-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help..."
                aria-label="Search help articles"
                className="w-full rounded-tp-button border border-tp-line bg-white py-3.5 pl-12 pr-4 text-base text-tp-ink placeholder:text-tp-muted/80 focus:border-tp-bronze-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-tp-muted hover:text-tp-ink"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category cards grid (shown when no search query) */}
      {!searchQuery.trim() && (
        <section className="bg-tp-paper/40 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoriesWithIcons.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => scrollToCategory(cat.id)}
                    className="group flex flex-col items-start rounded-tp-card border border-tp-line bg-white p-6 text-left transition-all hover:border-tp-bronze/40 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-paper">
                      <Icon className="h-5 w-5 text-tp-bronze-ink" />
                    </div>
                    <h2 className="mt-4 font-display font-normal text-lg text-tp-black">{cat.title}</h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-tp-muted">{cat.description}</p>
                    <ul className="mt-3 space-y-1">
                      {cat.items.slice(0, 4).map((item) => (
                        <li key={item.question} className="text-[13px] leading-snug text-tp-ink/70">
                          {item.question}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-tp-bronze-ink transition-all group-hover:gap-2">
                      View answers <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Search results count */}
      {searchQuery.trim() && (
        <div className="bg-tp-paper/40 pt-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-tp-muted">
              {totalResults} result{totalResults !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>
      )}

      {/* Q&A sections */}
      <section className={searchQuery.trim() ? 'bg-tp-paper/40 pb-16 pt-4 sm:pb-20' : 'py-16 sm:py-20'}>
        <div className="mx-auto max-w-3xl space-y-14 px-4 sm:px-6 lg:px-8">
          {filteredCategories.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-tp-muted">No results found for &quot;{searchQuery}&quot;</p>
              <p className="mt-2 text-sm text-tp-muted">
                Try a different search term or{' '}
                <Link href="/contact" className="font-medium text-tp-bronze-ink underline underline-offset-2">
                  contact support
                </Link>
                .
              </p>
            </div>
          )}

          {filteredCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} id={cat.id} className="scroll-mt-24">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-tp-button bg-tp-paper">
                    <Icon className="h-4 w-4 text-tp-bronze-ink" />
                  </div>
                  <h2 className="font-display font-normal text-2xl text-tp-black sm:text-3xl">{cat.title}</h2>
                </div>
                <div className="mt-6 divide-y divide-tp-line/50 rounded-tp-card border border-tp-line bg-white">
                  {cat.items.map((item) => {
                    const key = `${cat.id}-${item.question}`;
                    const isOpen = openQuestions.has(key);
                    return (
                      <div key={key} className="group">
                        <button
                          onClick={() => toggleQuestion(key)}
                          className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-tp-paper/50"
                          aria-expanded={isOpen}
                        >
                          <span className="text-base font-medium text-tp-black">{item.question}</span>
                          <ChevronDown
                            className={`h-5 w-5 shrink-0 text-tp-bronze-ink transition-transform duration-200 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <div
                          className={`grid transition-all duration-200 ${
                            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="px-6 pb-5 text-base leading-relaxed text-tp-muted">{item.answer}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact support CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-tp-card border border-tp-line bg-white p-10 sm:p-14">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-tp-paper">
              <Mail className="h-6 w-6 text-tp-bronze-ink" />
            </div>
            <h2 className="font-display font-normal mt-6 text-3xl text-tp-black">Still Need Help?</h2>
            <p className="mt-4 text-tp-muted">
              Can&apos;t find what you&apos;re looking for? Our support team is happy to help.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-tp-button bg-tp-black px-8 py-3 text-sm font-semibold text-tp-bronze shadow-sm transition-all hover:bg-tp-black/90"
              >
                Contact Support
              </Link>
              <Link
                href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
                className="inline-flex items-center justify-center rounded-tp-button border border-tp-line px-8 py-3 text-sm font-semibold text-tp-ink transition-all hover:bg-tp-paper"
              >
                Get Started
              </Link>
            </div>
            <p className="mt-6 text-sm text-tp-muted">
              Or email us directly at{' '}
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="font-medium text-tp-bronze-ink underline underline-offset-2"
              >
                {siteConfig.supportEmail}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
