"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Clock, Image, ShieldCheck, Tag } from "lucide-react";
import { BASE_PRICE_DISPLAY, PAYMENT_PROVIDER } from '@/config/pricing';

const metrics = [
  {
    icon: Clock,
    value: "Fast Delivery",
    description: "Results within hours",
  },
  {
    icon: Image,
    value: "Up to 160 Photos",
    description: "From a single headshot to a full set",
  },
  {
    icon: Camera,
    value: "12 Photo Categories",
    description: "Professional, creative & lifestyle",
  },
  {
    icon: ShieldCheck,
    value: "Secure Checkout",
    description: PAYMENT_PROVIDER.checkoutBadge,
  },
  {
    icon: Tag,
    value: `From ${BASE_PRICE_DISPLAY}`,
    description: "Save vs. studio photoshoots",
  },
] as const;

const css = `
@keyframes tp-spb-rise {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes tp-spb-pulse {
  0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--tp-bronze) 0%, transparent); }
  50% { box-shadow: 0 0 0 6px color-mix(in srgb, var(--tp-bronze) 22%, transparent); }
}
.tp-spb-item { opacity: 0; }
.tp-spb-visible .tp-spb-item {
  animation: tp-spb-rise 0.6s ease-out forwards;
  animation-delay: calc(var(--i) * 90ms);
}
.tp-spb-visible .tp-spb-icon {
  animation: tp-spb-pulse 3.2s ease-in-out infinite;
  animation-delay: calc(var(--i) * 400ms + 700ms);
}
@media (prefers-reduced-motion: reduce) {
  .tp-spb-item { opacity: 1; }
  .tp-spb-visible .tp-spb-item,
  .tp-spb-visible .tp-spb-icon { animation: none; }
}
`;

export function SocialProofBar() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    setEnhanced(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
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
      ref={ref}
      aria-label="Why choose TailorPic"
      className={`w-full bg-tp-paper border-y border-tp-line ${
        visible ? "tp-spb-visible" : ""
      }`}
    >
      <style>{css}</style>
      <div className="mx-auto max-w-6xl px-4 py-5 sm:py-6">
        <ul className="grid grid-cols-2 gap-y-5 gap-x-4 sm:grid-cols-3 lg:grid-cols-5 sm:gap-x-6">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <li
                key={metric.value}
                style={{ "--i": i } as React.CSSProperties}
                className={`${enhanced ? "tp-spb-item" : ""} flex items-start gap-3`}
              >
                <span className="tp-spb-icon mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-tp-beige/40">
                  <Icon
                    className="h-4 w-4 text-tp-bronze-ink"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-tp-ink text-sm leading-tight">
                    {metric.value}
                  </p>
                  <p className="text-xs text-tp-muted mt-0.5 leading-snug">
                    {metric.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
