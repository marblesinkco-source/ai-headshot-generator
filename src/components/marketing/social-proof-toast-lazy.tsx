'use client';

import dynamic from 'next/dynamic';

// The toast never appears before 15s, so keep it out of the root layout's initial bundle.
const SocialProofToast = dynamic(
  () => import('./social-proof-toast').then((m) => m.SocialProofToast),
  { ssr: false }
);

export function SocialProofToastLazy() {
  return <SocialProofToast />;
}
