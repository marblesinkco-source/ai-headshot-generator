'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

/**
 * Floating back-to-top button.
 *
 * Appears in the bottom-right corner once the user scrolls past 400 px.
 * Positioned above the Tawk.to live-chat widget (bottom-24) so the two
 * never overlap.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);

    // Check immediately in case the page loaded mid-scroll (e.g. back-nav)
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`
        fixed bottom-24 right-4 z-40
        flex items-center justify-center
        h-12 w-12 md:h-10 md:w-10
        rounded-full bg-tp-black text-tp-bronze shadow-lg
        transition-all duration-300 ease-in-out
        hover:bg-tp-ink hover:shadow-xl
        focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}
      `}
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
