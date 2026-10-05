'use client';

import { Suspense } from 'react';
import { useAnalytics } from '@/hooks/use-analytics';

function AnalyticsTracker() {
  useAnalytics(); // Auto-tracks page views (uses useSearchParams which needs Suspense)
  return null;
}

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
