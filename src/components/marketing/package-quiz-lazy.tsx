'use client';

import dynamic from 'next/dynamic';

const PackageQuiz = dynamic(
  () => import('./package-quiz').then((m) => m.PackageQuiz),
  {
    ssr: false,
    loading: () => <div className="animate-pulse bg-tp-line/30 rounded-tp-card h-64" />,
  }
);

export function PackageQuizLazy() {
  return <PackageQuiz />;
}
