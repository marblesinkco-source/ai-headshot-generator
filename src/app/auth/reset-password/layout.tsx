import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.tailorpic.com/auth/reset-password' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
