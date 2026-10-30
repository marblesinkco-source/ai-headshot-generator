import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/** Signed-in user or a 401 response. */
export async function requireUser(): Promise<{ id: string; email?: string } | NextResponse> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  return { id: user.id, email: user.email ?? undefined };
}
