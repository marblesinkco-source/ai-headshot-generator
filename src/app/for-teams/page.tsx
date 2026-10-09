import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

export const metadata: Metadata = {
  alternates: { canonical: '/for-teams' },
};

export default function ForTeamsRedirect() {
  permanentRedirect('/team-headshots');
}
