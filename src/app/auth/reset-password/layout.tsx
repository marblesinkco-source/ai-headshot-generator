import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password',
  robots: { index: false, follow: false },
  alternates: { canonical: '/auth/reset-password' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
