'use client';

import { useEffect, useRef, useState } from 'react';
import { Camera, Users, Layers, ShieldCheck } from 'lucide-react';

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { icon: Camera, value: 40, suffix: '+', label: 'Photos Per Session' },
  { icon: Users, value: 11, suffix: '', label: 'Photo Categories' },
  { icon: Layers, value: 2, suffix: ' hrs', label: 'Average Delivery' },
  { icon: ShieldCheck, value: 100, suffix: '%', label: 'Money-Back Guarantee' },
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
    <section className="relative py-14 sm:py-16 bg-tp-black overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,#C9A98A_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,#C9A98A_0%,transparent_50%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center group"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-tp-bronze/10 border border-tp-bronze/20 mb-3 group-hover:bg-tp-bronze/20 transition-colors">
                <stat.icon className="h-5 w-5 text-tp-bronze" />
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1.5 text-xs sm:text-sm text-tp-beige/60 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
