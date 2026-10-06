import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.tailorpic.com/for-teams' },
};

export default function ForTeamsRedirect() {
  permanentRedirect('/team-headshots');
}
