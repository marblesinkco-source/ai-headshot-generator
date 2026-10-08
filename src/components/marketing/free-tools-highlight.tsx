'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/**
 * Free Tools Highlight — showcases key free tools on the homepage
 * to drive engagement and demonstrate value before purchase.
 * All tools are real, functional pages under /tools/*.
 */

const tools = [
  {
    name: 'LinkedIn Photo Analyzer',
    description: 'AI-powered analysis of your current LinkedIn photo with improvement tips.',
    href: '/tools/linkedin-photo-analyzer',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        <path d="M4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    name: 'Headshot Cost Calculator',
    description: 'Compare the cost of AI headshots vs. a traditional studio session.',
    href: '/tools/headshot-cost-calculator',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    name: 'Style Finder Quiz',
    description: 'Answer a few questions and discover your ideal headshot style.',
    href: '/tools/style-finder-quiz',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
        <path d="M18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
      </svg>
    ),
  },
  {
    name: 'Photo Quality Score',
    description: 'Check if your selfie is good enough for AI headshot generation.',
    href: '/tools/headshot-quality-score',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
      </svg>
    ),
  },
] as const;

export function FreeToolsHighlight() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="free-tools-heading"
      className="relative bg-tp-paper py-20 lg:py-24 overflow-hidden"
    >
      {/* Decorative blob */}
      <div aria-hidden="true" className="tp-blob tp-blob-beige w-[500px] h-[500px] -top-40 -right-40" />

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
        <div className="mx-auto max-w-2xl text-center">
          <p className="uppercase text-[11px] font-semibold tracking-[0.25em] text-tp-bronze-ink">
            Free Tools
          </p>
          <h2
            id="free-tools-heading"
            className="mt-3 font-display text-[30px] sm:text-[40px] font-normal tracking-[-0.03em] text-tp-ink leading-tight"
          >
            Try Before You Buy
          </h2>
          <p className="mt-4 text-[15px] text-tp-muted leading-relaxed max-w-lg mx-auto">
            Explore our free tools to analyze your current photo, find your ideal style, and see how much you could save.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, i) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={`group relative flex flex-col rounded-tp-card border border-tp-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-tp-bronze/40 hover:shadow-lg hover:shadow-tp-bronze/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
              style={{
                transitionDelay: visible ? `${i * 80}ms` : '0ms',
              }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-beige text-tp-bronze-ink transition-colors duration-200 group-hover:bg-tp-bronze/15">
                {tool.icon}
              </span>
              <h3 className="mt-4 text-[15px] font-semibold text-tp-ink group-hover:text-tp-bronze-ink transition-colors">
                {tool.name}
              </h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-tp-muted">
                {tool.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-tp-bronze-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Try free <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm font-semibold text-tp-bronze-ink underline-offset-4 hover:underline transition-colors"
          >
            View all 35+ free tools <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
