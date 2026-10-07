import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.tailorpic.com/guarantee' },
};

export default function RefundPolicyPage() {
  permanentRedirect('/guarantee');
}
