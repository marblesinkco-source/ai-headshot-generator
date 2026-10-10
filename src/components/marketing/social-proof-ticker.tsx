'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * Rotating social-proof messages — real product facts only.
 * No fabricated user counts, reviews, or activity timestamps.
 */
const messages = [
  { icon: 'camera', text: 'Up to 160 unique headshots per order' },
  { icon: 'clock', text: 'Results delivered within hours' },
  { icon: 'shield', text: 'Satisfaction guarantee included' },
  { icon: 'zap', text: 'No studio appointment needed' },
  { icon: 'globe', text: 'Available worldwide, 24/7' },
  { icon: 'lock', text: 'Secure checkout via Paddle' },
  { icon: 'check', text: 'Full commercial usage rights' },
  { icon: 'repeat', text: 'Free regeneration if not satisfied' },
];

const iconPaths: Record<string, string> = {
  camera: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z',
  clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 6v6l4 2',
  shield: 'M12 3 4.5 6v5.5c0 4.4 3.1 8.2 7.5 9.5 4.4-1.3 7.5-5.1 7.5-9.5V6L12 3Z M8.75 12l2.25 2.25L15.5 9.75',
  zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  globe: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
  lock: 'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4',
  check: 'M20 6L9 17l-5-5',
  repeat: 'M17 1l4 4-4 4 M3 11V9a4 4 0 0 1 4-4h12 M7 23l-4-4 4-4 M21 13v2a4 4 0 0 1-4 4H5',
};

export function SocialProofTicker() {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % messages.length);
        setIsVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(timerRef.current);
  }, []);

  const msg = messages[current];

  return (
    <div className="flex items-center justify-center py-2" aria-live="polite" aria-atomic="true">
      <div
        className="inline-flex items-center gap-2 rounded-full border border-tp-line/60 bg-white/80 backdrop-blur-sm px-4 py-2 text-sm text-tp-ink transition-all duration-400"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-6px)',
        }}
      >
        <svg
          className="h-4 w-4 text-tp-bronze-ink flex-shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d={iconPaths[msg.icon]} />
        </svg>
        <span className="font-medium">{msg.text}</span>
      </div>
    </div>
  );
}
