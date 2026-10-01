'use client';

import dynamic from 'next/dynamic';

// next/dynamic with ssr:false must live in a client module (Next 14 disallows it in server components).
export const BackgroundRemoverDemo = dynamic(
  () => import('./background-remover-demo').then((m) => m.BackgroundRemoverDemo),
  { ssr: false }
);
export const HeadshotResizerDemo = dynamic(
  () => import('./headshot-resizer-demo').then((m) => m.HeadshotResizerDemo),
  { ssr: false }
);
export const ResumePhotoCheckerDemo = dynamic(
  () => import('./resume-photo-checker-demo').then((m) => m.ResumePhotoCheckerDemo),
  { ssr: false }
);
