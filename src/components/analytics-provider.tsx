'use client';

import { Suspense } from 'react';
import { useAnalytics } from '@/hooks/use-analytics';

function AnalyticsTracker() {
  useAnalytics(); // Auto-tracks page views (uses useSearchParams which needs Suspense)
  return null;
}

/**
 * Standalone analytics tracker — renders as a sibling, not a wrapper.
 * This avoids pushing the entire page tree into a client boundary,
 * allowing server components to be fully streamed.
 */
export function AnalyticsTrackingScript() {
  return (
    <Suspense fallback={null}>
      <AnalyticsTracker />
    </Suspense>
  );
}

/**
 * @deprecated Use AnalyticsTrackingScript instead (renders as sibling, not wrapper).
 * Kept for backward compatibility but no longer wraps children.
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
      {children}
    </>
  );
}
