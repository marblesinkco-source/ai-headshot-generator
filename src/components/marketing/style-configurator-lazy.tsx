'use client';

import dynamic from 'next/dynamic';

const StyleConfigurator = dynamic(
  () => import('./style-configurator').then((m) => m.StyleConfigurator),
  {
    ssr: false,
    loading: () => <div className="animate-pulse bg-tp-line/30 rounded-tp-card h-64" />,
  }
);

export function StyleConfiguratorLazy() {
  return <StyleConfigurator />;
}
