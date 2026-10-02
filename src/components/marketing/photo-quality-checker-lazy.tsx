'use client';

import dynamic from 'next/dynamic';

const PhotoQualityChecker = dynamic(
  () => import('./photo-quality-checker').then((m) => m.PhotoQualityChecker),
  { ssr: false, loading: () => <div className="animate-pulse bg-tp-line/30 rounded-tp-card h-64" /> }
);

export function PhotoQualityCheckerLazy() {
  return <PhotoQualityChecker />;
}
