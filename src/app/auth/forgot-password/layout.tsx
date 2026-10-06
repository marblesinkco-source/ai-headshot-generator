import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.tailorpic.com/auth/forgot-password' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
