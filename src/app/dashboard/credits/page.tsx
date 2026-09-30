import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import DashboardShell from '../components/DashboardShell';
import CreditsDashboard from './CreditsDashboard';

export const metadata = {
  title: 'Credits — TailorPic',
  description: 'View your credit balance, active packages, and transaction history.',
};

export default async function CreditsPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/auth/login?redirect=/dashboard/credits');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user.id)
    .single();

  return (
    <DashboardShell
      user={{
        email: user.email,
        fullName: profile?.full_name || null,
        avatarUrl: profile?.avatar_url || null,
      }}
    >
      <CreditsDashboard />
    </DashboardShell>
  );
}
