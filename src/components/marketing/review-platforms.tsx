'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

/**
 * Review platform links — honest, no fabricated ratings.
 * Links to actual review platform profiles. Viewers can check real reviews
 * or leave their own.
 */

const PLATFORMS = [
  {
    name: 'Product Hunt',
    href: 'https://www.producthunt.com/products/tailorpic',
    // Product Hunt brand orange (#DA552F)
    color: '#DA552F',
    icon: (
      <svg viewBox="0 0 40 40" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M22.667 20H17.333v-6.667h5.334c1.84 0 3.333 1.493 3.333 3.334 0 1.84-1.493 3.333-3.333 3.333zM20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0zm2.667 24H17.333v6.667h-4V9.333h9.334c4.05 0 7.333 3.283 7.333 7.334 0 4.05-3.283 7.333-7.333 7.333z" />
      </svg>
    ),
  },
  {
    name: 'Trustpilot',
    href: 'https://www.trustpilot.com/review/tailorpic.com',
    // Trustpilot brand green (#00B67A)
    color: '#00B67A',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M12 0l3.09 9.52H24l-7.18 5.22 2.74 8.43L12 17.77l-7.56 5.4 2.74-8.43L0 9.52h8.91z" />
      </svg>
    ),
  },
  {
    name: 'G2',
    href: 'https://www.g2.com/products/tailorpic/reviews',
    // G2 brand red/coral (#FF492C)
    color: '#FF492C',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 17.5h-3.036l-1.43-2.485L10.55 17.5H7.5l3.467-5.998L7.559 6.5h3.049l1.367 2.379L13.374 6.5h3.067l-3.49 5.002L16.441 17.5z" />
      </svg>
    ),
  },
] as const;

const css = `
@keyframes tp-rp-fade {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
.tp-rp-item { opacity: 0; }
.tp-rp-visible .tp-rp-item {
  animation: tp-rp-fade 0.5s ease-out forwards;
  animation-delay: calc(var(--i) * 100ms);
}
@media (prefers-reduced-motion: reduce) {
  .tp-rp-item { opacity: 1; }
  .tp-rp-visible .tp-rp-item { animation: none; }
}
`;

export function ReviewPlatforms() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Find us on review platforms"
      className={`bg-tp-paper py-10 sm:py-12 ${visible ? 'tp-rp-visible' : ''}`}
    >
      <style>{css}</style>
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-tp-bronze-ink">
            See what people are saying
          </p>
          <p className="mt-2 font-sans text-sm text-tp-muted sm:text-base">
            Check our profiles and share your experience
          </p>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {PLATFORMS.map((platform, i) => (
            <a
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ '--i': i, '--platform-color': platform.color } as React.CSSProperties}
              className="tp-rp-item group inline-flex items-center gap-2.5 rounded-tp-button border border-tp-line bg-white px-5 py-3 text-sm font-medium text-tp-ink shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--platform-color)] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze"
            >
              <span className="text-tp-muted transition-colors group-hover:text-[var(--platform-color)]">
                {platform.icon}
              </span>
              {platform.name}
              <ExternalLink className="h-3.5 w-3.5 text-tp-muted/60 transition-colors group-hover:text-[var(--platform-color)]" strokeWidth={2} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
