import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.tailorpic.com/auth/login' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
