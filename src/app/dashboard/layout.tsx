import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import DashboardShell from './components/DashboardShell';

export const metadata: Metadata = {
  title: { default: 'Dashboard', template: '%s | Dashboard | TailorPic' },
  robots: { index: false, follow: false },
};

const SUPABASE_ORIGIN = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin
  : null;

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Belt-and-suspenders: middleware already redirects, but this
  // prevents any flash of dashboard content if middleware is bypassed.
  if (!user) {
    redirect('/auth/login');
  }

  return (
    <>
      {SUPABASE_ORIGIN && (
        <link rel="preconnect" href={SUPABASE_ORIGIN} crossOrigin="anonymous" />
      )}
      <DashboardShell
        user={{
          email: user.email,
          fullName: user.user_metadata?.full_name ?? null,
          avatarUrl: user.user_metadata?.avatar_url ?? null,
        }}
      >
        {children}
      </DashboardShell>
    </>
  );
}
