'use client';

import { useEffect, useRef, useState } from 'react';
import { Camera, Layers, Clock, Tag } from 'lucide-react';

interface Stat {
  icon: React.ElementType;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  detail: string;
}

const stats: Stat[] = [
  { icon: Camera, value: 40, suffix: '+', label: 'Photos Per Session', detail: 'A full set to choose from' },
  { icon: Layers, value: 11, suffix: '+', label: 'Photo Categories', detail: 'Professional, dating, pets & more' },
  { icon: Clock, value: 2, prefix: '< ', suffix: ' hrs', label: 'Delivery Time', detail: 'Most orders ready in under 2 hours' },
  { icon: Tag, value: 9.9, prefix: '$', decimals: 2, label: 'Starting Price', detail: 'Pay once, no subscription' },
];

const DURATION = 1800;

function AnimatedNumber({
  stat,
  active,
  reduceMotion,
}: {
  stat: Stat;
  active: boolean;
  reduceMotion: boolean;
}) {
  const { value, prefix = '', suffix = '', decimals = 0 } = stat;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setCurrent(value);
      return;
    }
    if (!active) return;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCurrent(eased * value);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduceMotion, value]);

  const display = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString();

  return (
    <span className="tabular-nums" aria-label={`${prefix}${value.toFixed(decimals)}${suffix}`}>
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
    </span>
  );
}

export function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="TailorPic at a glance"
      className="relative py-16 sm:py-20 bg-tp-black overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 opacity-[0.05]" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,#C9A98A_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,#C9A98A_0%,transparent_60%)]" />
      </div>
      {/* Top highlight line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-tp-bronze/30 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="group relative flex flex-col items-center text-center"
            >
              {/* Divider between items on large screens */}
              {i > 0 && (
                <div className="hidden lg:block absolute -left-3 top-1/2 -translate-y-1/2 h-20 w-px bg-gradient-to-b from-transparent via-tp-bronze/20 to-transparent" />
              )}

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-tp-bronze/20 bg-tp-bronze/10 transition-colors duration-300 group-hover:border-tp-bronze/40 group-hover:bg-tp-bronze/15 motion-reduce:transition-none">
                <stat.icon className="h-5 w-5 text-tp-bronze" strokeWidth={1.5} aria-hidden="true" />
              </div>

              <dd className="order-2 font-display font-normal text-5xl sm:text-6xl leading-none tracking-tight text-tp-paper">
                <AnimatedNumber stat={stat} active={active} reduceMotion={reduceMotion} />
              </dd>
              <dt className="order-3 mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-tp-beige">
                {stat.label}
              </dt>
              <p className="order-4 mt-1.5 max-w-[190px] text-xs leading-relaxed text-tp-beige/60">
                {stat.detail}
              </p>
            </div>
          ))}
        </dl>
      </div>

      {/* Bottom highlight line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-tp-bronze/30 to-transparent" />
    </section>
  );
}
