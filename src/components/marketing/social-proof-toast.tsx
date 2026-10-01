'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

// Generic placeholder copy only. No real names, cities, or user data.
const MESSAGES: ReadonlyArray<string> = [
  'A professional just ordered headshots · 2 min ago',
  'New headshots created · 5 min ago',
  'Another happy customer · just now',
];

const INITIALS = 'ABCDEFGHIJKLMNOPRSTW';

const MIN_DELAY_MS = 15_000;
const MAX_DELAY_MS = 30_000;
const VISIBLE_MS = 5_000;

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function SocialProofToast() {
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [initial, setInitial] = useState('A');

  useEffect(() => {
    if (dismissed) return;

    let showTimer: ReturnType<typeof setTimeout> | undefined;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    const schedule = () => {
      showTimer = setTimeout(() => {
        // Pick a different message than the previous one when possible.
        setMessageIndex((prev) => {
          const next = randomBetween(0, MESSAGES.length - 1);
          return next === prev ? (next + 1) % MESSAGES.length : next;
        });
        setInitial(INITIALS.charAt(randomBetween(0, INITIALS.length - 1)));
        setVisible(true);

        hideTimer = setTimeout(() => {
          setVisible(false);
          schedule();
        }, VISIBLE_MS);
      }, randomBetween(MIN_DELAY_MS, MAX_DELAY_MS));
    };

    schedule();

    return () => {
      if (showTimer) clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
      className={`fixed bottom-4 left-4 z-50 w-[calc(100vw-2rem)] max-w-xs rounded-tp-card border border-tp-line bg-white shadow-lg transition-all duration-500 ease-out motion-reduce:transition-none ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <div className="flex items-center gap-3 p-3 pr-9">
        <div
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tp-beige text-sm font-semibold text-tp-bronze-ink"
        >
          {initial}
        </div>
        <p className="text-sm leading-snug text-tp-ink">
          {MESSAGES[messageIndex]}
        </p>
      </div>

      <button
        type="button"
        onClick={() => {
          setVisible(false);
          setDismissed(true);
        }}
        tabIndex={visible ? 0 : -1}
        aria-label="Dismiss notification"
        className="absolute right-2 top-2 rounded-tp-button p-1 text-tp-muted transition-colors hover:bg-tp-paper hover:text-tp-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

export default SocialProofToast;
