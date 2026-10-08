'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Camera, Clock, Layers, Sparkles } from 'lucide-react';

/**
 * Animated stats counters — factual product metrics only.
 * Numbers count up when the section scrolls into view.
 * No fabricated user counts, ratings, or reviews (CLAUDE.md §4).
 */

const stats = [
  {
    icon: Camera,
    value: 160,
    suffix: '',
    prefix: '',
    label: 'Photos Per Package',
    description: 'Up to 160 studio-quality portraits',
  },
  {
    icon: Layers,
    value: 12,
    suffix: '',
    prefix: '',
    label: 'Photo Categories',
    description: 'Professional, creative & lifestyle',
  },
  {
    icon: Clock,
    value: 30,
    suffix: '',
    prefix: '',
    label: 'Day Auto-Delete',
    description: 'Your photos are deleted after 30 days',
  },
  {
    icon: Sparkles,
    value: 4,
    suffix: 'K',
    prefix: '',
    label: 'Resolution',
    description: 'Ultra-high-definition output',
  },
] as const;

function useCountUp(end: number, duration: number, start: boolean): number {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, start]);

  return count;
}

function StatItem({
  icon: Icon,
  value,
  suffix,
  prefix,
  label,
  description,
  index,
  animate,
}: (typeof stats)[number] & { index: number; animate: boolean }) {
  const count = useCountUp(value, 1800, animate);

  return (
    <div
      style={{ '--i': index } as React.CSSProperties}
      className="tp-stat-item"
    >
      <div className="group h-full rounded-tp-card border border-tp-line/40 bg-white/60 p-6 text-center flex flex-col items-center">
      <span className="tp-stat-icon flex h-14 w-14 items-center justify-center rounded-full border border-tp-line bg-gradient-to-br from-tp-paper to-tp-beige/50 shadow-sm transition-all duration-300 group-hover:border-tp-bronze/40">
        <Icon className="h-6 w-6 text-tp-bronze-ink" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div className="mx-auto my-3 h-px w-8 bg-tp-line" aria-hidden="true" />
      <p className="font-display text-[36px] sm:text-[44px] font-normal tracking-[-0.03em] text-tp-ink leading-none">
        {value === 0 ? 'Fast' : <>{prefix}{animate ? count : 0}{suffix}</>}
      </p>
      <p className="mt-1.5 text-sm font-semibold text-tp-ink tracking-wide">{label}</p>
      <p className="mt-1 text-xs text-tp-muted">{description}</p>
      </div>
    </div>
  );
}

const css = `
@keyframes tp-stat-rise {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}
.tp-stat-item { opacity: 0; }
.tp-stats-visible .tp-stat-item {
  animation: tp-stat-rise 0.65s ease-out forwards;
  animation-delay: calc(var(--i) * 120ms);
}
@media (prefers-reduced-motion: reduce) {
  .tp-stat-item { opacity: 1; }
  .tp-stats-visible .tp-stat-item { animation: none; }
}
`;

export function AnimatedStats() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="stats-heading"
      className={`relative overflow-hidden bg-tp-paper py-16 sm:py-20 ${visible ? 'tp-stats-visible' : ''}`}
    >
      <style>{css}</style>
      <div aria-hidden="true" className="tp-blob tp-blob-beige w-[450px] h-[450px] -top-32 -right-32" />
      <div aria-hidden="true" className="tp-blob tp-blob-bronze w-[400px] h-[400px] -bottom-28 -left-28" />
      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
        <div className="scroll-fade-in mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <p className="uppercase text-[11px] font-semibold tracking-[0.25em] text-tp-bronze-ink">Key Features</p>
          <h2 id="stats-heading" className="mt-3 font-display text-[30px] sm:text-[40px] font-normal tracking-[-0.03em] text-tp-ink leading-tight">The Numbers That Matter</h2>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} {...stat} index={i} animate={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
