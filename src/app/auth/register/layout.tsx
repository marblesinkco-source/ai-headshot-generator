import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account',
  robots: { index: false, follow: false },
  alternates: { canonical: '/auth/register' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
