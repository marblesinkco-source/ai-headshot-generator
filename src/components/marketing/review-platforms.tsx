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
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.tp-rp-item { opacity: 0; }
.tp-rp-visible .tp-rp-item {
  animation: tp-rp-fade 0.5s ease-out forwards;
  animation-delay: calc(var(--i) * 120ms);
}
@media (prefers-reduced-motion: reduce) {
  .tp-rp-item { opacity: 1; }
  .tp-rp-visible .tp-rp-item { animation: none; }
}
.tp-rp-card {
  position: relative;
  overflow: hidden;
}
.tp-rp-card::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: radial-gradient(
    circle at 50% 0%,
    var(--platform-color-10) 0%,
    transparent 70%
  );
  pointer-events: none;
}
.tp-rp-card:hover::before {
  opacity: 1;
}
@media (prefers-reduced-motion: reduce) {
  .tp-rp-card::before { transition: none; }
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
      aria-labelledby="review-platforms-heading"
      className={`bg-tp-paper py-12 sm:py-16 ${visible ? 'tp-rp-visible' : ''}`}
    >
      <style>{css}</style>
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            id="review-platforms-heading"
            className="font-display font-normal text-2xl text-tp-ink sm:text-3xl"
          >
            What Our Users Say
          </h2>
          <p className="mt-3 font-sans text-sm text-tp-muted sm:text-base">
            Check our profiles on trusted review platforms and share your experience
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6">
          {PLATFORMS.map((platform, i) => (
            <a
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Leave a review on ${platform.name}`}
              style={{
                '--i': i,
                '--platform-color': platform.color,
                '--platform-color-10': `${platform.color}18`,
              } as React.CSSProperties}
              className="tp-rp-item tp-rp-card group flex flex-col items-center gap-3 rounded-tp-card border border-tp-line bg-white px-6 py-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-[var(--platform-color)] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze sm:py-10"
            >
              {/* Platform icon */}
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-tp-beige text-tp-muted transition-colors group-hover:bg-[var(--platform-color-10)] group-hover:text-[var(--platform-color)]">
                <span className="[&>svg]:h-6 [&>svg]:w-6">{platform.icon}</span>
              </span>

              {/* Platform name */}
              <span className="text-lg font-semibold text-tp-ink">
                {platform.name}
              </span>

              {/* CTA text */}
              <span className="text-sm text-tp-muted">
                Leave a review
              </span>

              {/* Action row */}
              <span className="mt-1 inline-flex items-center gap-1.5 rounded-tp-button border border-tp-line bg-tp-beige px-4 py-2 text-xs font-medium uppercase tracking-wider text-tp-bronze-ink transition-all group-hover:border-[var(--platform-color)] group-hover:text-[var(--platform-color)]">
                Share your experience
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
