'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { BASE_PRICE_CENTS } from '@/config/pricing';
import { STYLES } from '@/config/ai';

interface StatItem {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
  icon: string; // SVG path d
}

const stats: StatItem[] = [
  {
    value: 160,
    label: 'Max Photos Per Order',
    description: 'Up to 160 unique AI headshots from your selfies',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    value: STYLES.length,
    label: 'Unique Styles',
    description: 'Professional, creative, corporate and more',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
  },
  {
    value: 2,
    prefix: '~',
    suffix: 'hr',
    label: 'Fast Delivery',
    description: 'Get your headshots within hours, not days',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    value: BASE_PRICE_CENTS, // rendered as $6.99
    label: 'Starting Price',
    description: 'Professional headshots accessible to everyone',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
];

// The real value is rendered on the server and stays put until the count-up
// actually runs, so crawlers, link previews, screen readers and no-JS visitors
// never see "0".
function useCountUp(end: number, duration: number, armed: boolean, shouldStart: boolean): number {
  const [count, setCount] = useState(end);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (armed && !shouldStart) setCount(0);
  }, [armed, shouldStart]);

  useEffect(() => {
    if (!armed || !shouldStart) return;

    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [end, duration, armed, shouldStart]);

  return count;
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // armed: the card is below the fold on a JS-enabled client, so it may hide
  // and count up when scrolled into view. Otherwise it simply shows the value.
  const [armed, setArmed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setArmed(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Special handling for price stat
  const isPrice = stat.label === 'Starting Price';
  const displayEnd = isPrice ? BASE_PRICE_CENTS : stat.value;
  const count = useCountUp(displayEnd, 1200 + index * 200, armed, isVisible);
  const hidden = armed && !isVisible;

  const formatValue = useCallback(() => {
    if (isPrice) {
      const dollars = Math.floor(count / 100);
      const cents = String(count % 100).padStart(2, '0');
      return `$${dollars}.${cents}`;
    }
    return `${stat.prefix ?? ''}${count}${stat.suffix ?? ''}`;
  }, [count, isPrice, stat.prefix, stat.suffix]);

  return (
    <div
      ref={ref}
      className="group relative text-center p-6 rounded-tp-card tp-glass transition-all duration-500"
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? 'translateY(24px)' : 'translateY(0)',
        transitionDelay: `${index * 120}ms`,
      }}
    >
      {/* Icon */}
      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-tp-beige/60 text-tp-bronze-ink transition-colors group-hover:bg-tp-bronze/20">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
          <path d={stat.icon} />
        </svg>
      </div>

      {/* Animated number */}
      <p className="font-display text-[clamp(32px,4vw,44px)] font-normal text-tp-ink leading-none mb-1.5 tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
        {formatValue()}
      </p>

      {/* Label */}
      <p className="text-[13px] font-semibold text-tp-bronze-ink mb-1 uppercase tracking-wider">
        {stat.label}
      </p>

      {/* Description */}
      <p className="text-[12px] text-tp-muted leading-relaxed">
        {stat.description}
      </p>
    </div>
  );
}

export function AnimatedStats() {
  return (
    <section className="tp-section-glow py-16 sm:py-20" aria-label="Key metrics">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
