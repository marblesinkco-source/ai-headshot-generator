import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.tailorpic.com/auth/register' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
