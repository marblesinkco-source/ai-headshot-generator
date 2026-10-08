'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Zap, Clock, Calendar, Camera, ArrowRight } from 'lucide-react';

const COMPARISONS = [
  {
    label: 'Traditional Studio',
    icon: Camera,
    time: '1–2 weeks',
    cost: 'Varies',
    steps: ['Book appointment', 'Travel to studio', 'Makeup + styling', '1-hour shoot', 'Wait 5–14 days for edits'],
    barWidth: 100,
    barColor: 'bg-tp-line',
  },
  {
    label: 'Other AI Services',
    icon: Clock,
    time: '24–48 hours',
    cost: '$29–$99',
    steps: ['Upload photos', 'Wait 1–2 days', 'Limited retouching', 'Download results'],
    barWidth: 30,
    barColor: 'bg-tp-beige',
  },
  {
    label: 'TailorPic',
    icon: Zap,
    time: 'Within hours',
    cost: 'From $1.99',
    steps: ['Upload selfies', 'AI processes in ~90 min', 'Download HD results', 'Regenerate if needed'],
    barWidth: 8,
    barColor: 'bg-tp-bronze',
    highlight: true,
  },
] as const;

export function SpeedComparison() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-tp-paper py-20 lg:py-24"
      aria-labelledby="speed-heading"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-tp-bronze-ink">
            Time Is Money
          </p>
          <h2
            id="speed-heading"
            className="mt-3 font-display text-[30px] sm:text-[40px] font-normal tracking-[-0.03em] text-tp-ink leading-tight"
          >
            Get Results Faster
          </h2>
          <p className="mt-4 text-base text-tp-muted">
            While traditional studios take weeks and other AI services take days,
            TailorPic typically delivers within hours.
          </p>
        </div>

        {/* Speed bars */}
        <div className="mt-12 space-y-6">
          {COMPARISONS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`rounded-tp-card border p-5 sm:p-6 ${
                  item.highlight
                    ? 'border-tp-bronze bg-tp-bronze/5 shadow-sm'
                    : 'border-tp-line bg-tp-paper'
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                  {/* Label */}
                  <div className="flex min-w-[160px] items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        item.highlight ? 'bg-tp-bronze/20' : 'bg-tp-beige/60'
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          item.highlight ? 'text-tp-bronze' : 'text-tp-muted'
                        }`}
                      />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          item.highlight ? 'text-tp-bronze-ink' : 'text-tp-ink'
                        }`}
                      >
                        {item.label}
                      </p>
                      <p className="text-xs text-tp-muted">{item.cost}</p>
                    </div>
                  </div>

                  {/* Bar */}
                  <div className="flex flex-1 items-center gap-3">
                    <div className="flex-1">
                      <div className="h-8 overflow-hidden rounded-full bg-tp-beige/30">
                        <div
                          className={`h-full rounded-full ${item.barColor} origin-left transition-transform duration-1000 ease-out motion-reduce:transition-none`}
                          style={{
                            transform: `scaleX(${visible ? item.barWidth / 100 : 0})`,
                          }}
                        />
                      </div>
                    </div>
                    <p
                      className={`min-w-[100px] text-right text-sm font-bold ${
                        item.highlight ? 'text-tp-bronze-ink' : 'text-tp-ink'
                      }`}
                    >
                      {item.time}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/auth/register?redirect=/dashboard/upload"
            className={buttonVariants({ variant: 'primary', size: 'lg' })}
          >
            Get Your Headshots Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <p className="mt-3 text-xs text-tp-muted">
            Most orders ready in 90 minutes or less
          </p>
        </div>
      </div>
    </section>
  );
}

export default SpeedComparison;
