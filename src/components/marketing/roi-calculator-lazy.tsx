'use client';

import dynamic from 'next/dynamic';

const ROICalculator = dynamic(
  () => import('./roi-calculator').then((m) => m.ROICalculator),
  {
    ssr: false,
    loading: () => <div className="animate-pulse bg-tp-line/30 rounded-tp-card h-64" />,
  }
);

export function ROICalculatorLazy(props: { ctaHref?: string; ctaLabel?: string }) {
  return <ROICalculator {...props} />;
}
