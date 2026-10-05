import { Suspense } from 'react';
import { InsightsClient } from './insights-client';

export const metadata = {
  title: 'AI Insights — TailorPic Dashboard',
  description: 'Self-optimization engine insights and analytics',
};

export default function InsightsPage() {
  return (
    <Suspense fallback={<InsightsLoading />}>
      <InsightsClient />
    </Suspense>
  );
}

function InsightsLoading() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-normal text-2xl text-tp-ink">AI Insights</h1>
        <p className="text-tp-muted mt-1">Loading optimization data...</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-tp-card border border-tp-line p-6 animate-pulse">
            <div className="h-4 bg-tp-beige rounded w-24 mb-3" />
            <div className="h-8 bg-tp-beige rounded w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
