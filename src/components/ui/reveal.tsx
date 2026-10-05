'use client';

import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Stagger index for cascading reveals (0-based) */
  index?: number;
  /** Additional CSS classes */
  className?: string;
  /** HTML element to render */
  as?: 'div' | 'li' | 'article' | 'section';
}

/**
 * Scroll-reveal wrapper. GPU-accelerated (opacity + translateY only).
 * Respects prefers-reduced-motion. SSR-safe: content is visible before JS.
 */
export function Reveal({ children, index = 0, className = '', as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties = { '--reveal-i': index } as CSSProperties;

  return (
    <Tag
      ref={ref as any}
      className={`reveal ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
