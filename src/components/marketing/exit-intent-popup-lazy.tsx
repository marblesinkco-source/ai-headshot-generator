'use client';

import dynamic from 'next/dynamic';

// The popup never shows before MIN_DELAY_MS (15s) and renders nothing until triggered,
// so its code can load after hydration instead of sitting in the root layout bundle.
const ExitIntentPopup = dynamic(
  () => import('./exit-intent-popup').then((m) => m.ExitIntentPopup),
  { ssr: false }
);

export function ExitIntentPopupLazy() {
  return <ExitIntentPopup />;
}
