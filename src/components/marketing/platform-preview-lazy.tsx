'use client';
import dynamic from 'next/dynamic';
const PlatformPreview = dynamic(
  () => import('./platform-preview').then((m) => m.PlatformPreview),
  { ssr: false, loading: () => <div className="animate-pulse bg-tp-line/30 rounded-tp-card h-64" /> }
);
export function PlatformPreviewLazy() {
  return <PlatformPreview />;
}
