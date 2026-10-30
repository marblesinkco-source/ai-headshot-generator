import { Suspense } from 'react';
import HeroBookClient from './HeroBookClient';

export const metadata = { title: 'Hero book' };

export default function HeroBookPage({ params }: { params: { id: string } }) {
  return (
    <Suspense>
      <HeroBookClient id={params.id} />
    </Suspense>
  );
}
