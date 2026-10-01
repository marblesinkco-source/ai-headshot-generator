'use client';

import { useEffect, useRef, useState } from 'react';
import { Camera, Layers, Clock, ShieldCheck } from 'lucide-react';

interface Stat {
  icon: React.ElementType;
  value: number;
  text?: string;
  suffix: string;
  label: string;
  detail: string;
}

const stats: Stat[] = [
  { icon: Camera, value: 40, suffix: '+', label: 'Photos Per Session', detail: 'Up to 140 on larger plans' },
  { icon: Layers, value: 11, suffix: '', label: 'Photo Categories', detail: 'Professional, dating, pets & more' },
  { icon: Clock, value: 2, suffix: '', text: '<2 hrs', label: 'Delivery Time', detail: 'Most orders ready in under 2 hours' },
  { icon: ShieldCheck, value: 14, suffix: '-day', label: 'Money-Back Guarantee', detail: 'Full refund, no questions asked' },
];

function formatNumber(n: number): string {
  if (n >= 10000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  return n.toString();
}

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCurrent(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {formatNumber(current)}
      {suffix}
    </span>
  );
}

export function StatsCounter() {
  return (
    <section className="relative py-16 sm:py-20 bg-tp-black overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,#C9A98A_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,#C9A98A_0%,transparent_60%)]" />
      </div>
      {/* Top highlight line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-tp-bronze/30 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="group relative flex flex-col items-center text-center"
            >
              {/* Divider between items on large screens */}
              {i > 0 && (
                <div className="hidden lg:block absolute -left-3 top-1/2 -translate-y-1/2 h-16 w-px bg-tp-bronze/10" />
              )}

              <div className="flex h-14 w-14 items-center justify-center rounded-tp-card bg-tp-bronze/10 border border-tp-bronze/20 mb-4 group-hover:bg-tp-bronze/15 group-hover:border-tp-bronze/30 transition-all">
                <stat.icon className="h-6 w-6 text-tp-bronze" />
              </div>
              <p className="text-4xl sm:text-5xl font-normal text-white tracking-tight font-display">
                {stat.text ?? <AnimatedNumber target={stat.value} suffix={stat.suffix} />}
              </p>
              <p className="mt-2 text-sm font-semibold text-tp-beige/80">
                {stat.label}
              </p>
              <p className="mt-1 text-xs text-tp-beige/40 max-w-[180px]">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom highlight line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-tp-bronze/30 to-transparent" />
    </section>
  );
}
