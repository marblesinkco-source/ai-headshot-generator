'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';

const SHOWN_KEY = 'tp_exit_shown';
const CONSENT_KEY = 'tp_cookie_consent';
const MIN_DELAY_MS = 15_000;
const PROMO_CODE = 'WELCOME10';
const EXCLUDED_PREFIXES = ['/dashboard', '/auth', '/gate'];

// Mobile: scroll up at least this many px within this window counts as "quick"
const FAST_SCROLL_PX = 250;
const FAST_SCROLL_WINDOW_MS = 400;

function alreadyShown(): boolean {
  try {
    return sessionStorage.getItem(SHOWN_KEY) === '1';
  } catch {
    return false;
  }
}

function markShown() {
  try {
    sessionStorage.setItem(SHOWN_KEY, '1');
  } catch {
    // silent fail
  }
}

function cookieBannerVisible(): boolean {
  if (typeof document === 'undefined') return false;
  // Banner is in the DOM while visible
  if (document.querySelector('[role="dialog"][aria-label="Cookie consent"]')) return true;
  // Banner appears shortly after load when no consent has been stored
  try {
    return !localStorage.getItem(CONSENT_KEY);
  } catch {
    return false;
  }
}

export function ExitIntentPopup() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const excluded = EXCLUDED_PREFIXES.some(
    (p) => pathname === p || pathname?.startsWith(`${p}/`)
  );

  useEffect(() => {
    if (excluded || alreadyShown()) return;

    const loadedAt = Date.now();
    let fired = false;

    function trigger() {
      if (fired) return;
      if (Date.now() - loadedAt < MIN_DELAY_MS) return;
      if (alreadyShown()) return;
      if (cookieBannerVisible()) return;
      fired = true;
      markShown();
      setOpen(true);
    }

    // Desktop: cursor leaves through the top of the viewport
    function onMouseOut(e: MouseEvent) {
      if (e.relatedTarget === null && e.clientY < 10) trigger();
    }

    // Mobile: quick upward scroll
    let lastY = window.scrollY;
    let lastT = Date.now();
    let upDistance = 0;
    function onScroll() {
      const y = window.scrollY;
      const now = Date.now();
      if (now - lastT > FAST_SCROLL_WINDOW_MS) upDistance = 0;
      if (y < lastY) {
        upDistance += lastY - y;
        if (upDistance >= FAST_SCROLL_PX) trigger();
      } else {
        upDistance = 0;
      }
      lastY = y;
      lastT = now;
    }

    document.addEventListener('mouseout', onMouseOut);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('scroll', onScroll);
    };
  }, [excluded]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function close() {
    setOpen(false);
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silent fail
    }
  }

  if (excluded || !open) return null;

  return (
    <>
      <style>{`
        @keyframes tp-exit-fade {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes tp-exit-backdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .tp-exit-dialog[open] { animation: tp-exit-fade 0.35s ease-out both; }
        .tp-exit-dialog::backdrop {
          background: rgba(11, 11, 11, 0.6);
          animation: tp-exit-backdrop 0.35s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .tp-exit-dialog[open], .tp-exit-dialog::backdrop { animation: none; }
        }
      `}</style>
      <dialog
        ref={dialogRef}
        aria-labelledby="tp-exit-title"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="tp-exit-dialog m-auto w-[calc(100%-2rem)] max-w-md rounded-tp-dialog border border-tp-bronze/30 bg-tp-black p-0 text-tp-paper shadow-2xl backdrop:bg-transparent"
      >
        <div className="relative px-6 py-10 text-center sm:px-10">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-tp-paper/70 transition-colors hover:bg-tp-paper/10 hover:text-tp-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <p className="text-xs font-medium uppercase tracking-[0.2em] text-tp-bronze">
            Before you go
          </p>
          <h2
            id="tp-exit-title"
            className="font-display font-normal mt-3 text-3xl leading-tight text-tp-paper sm:text-4xl"
          >
            Wait! Get <span className="text-tp-bronze">10% off</span> your first order
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-tp-paper/70">
            Use this code at checkout.
          </p>

          <button
            type="button"
            onClick={copyCode}
            aria-label={`Copy promo code ${PROMO_CODE}`}
            className="mx-auto mt-6 flex w-full max-w-xs items-center justify-between gap-3 rounded-[14px] border border-dashed border-tp-bronze/70 bg-tp-paper/5 px-5 py-3 transition-colors hover:bg-tp-paper/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
          >
            <span className="font-mono text-lg font-semibold tracking-[0.15em] text-tp-bronze">
              {PROMO_CODE}
            </span>
            <span className="text-xs text-tp-paper/60" aria-live="polite">
              {copied ? 'Copied' : 'Tap to copy'}
            </span>
          </button>

          <Link
            href="/#pricing"
            onClick={close}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-tp-bronze px-8 py-3.5 text-base font-semibold text-tp-black transition-colors hover:bg-tp-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-paper"
          >
            Claim my discount
          </Link>
          <button
            type="button"
            onClick={close}
            className="mt-3 text-sm text-tp-paper/60 underline transition-colors hover:text-tp-paper"
          >
            No thanks
          </button>
        </div>
      </dialog>
    </>
  );
}
