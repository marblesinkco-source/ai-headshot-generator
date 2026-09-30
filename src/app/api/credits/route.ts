/**
 * GET /api/credits — Get user's credit balance and history
 * POST /api/credits/use — Use credits for a generation (called internally)
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get active (non-expired) credit balances
    const { data: credits, error: creditsError } = await supabase
      .from('user_credits')
      .select('id, package_id, total_credits, used_credits, remaining_credits, purchased_at, expires_at')
      .eq('user_id', user.id)
      .gt('expires_at', new Date().toISOString())
      .order('expires_at', { ascending: true });

    if (creditsError) {
      console.error('Failed to fetch credits:', creditsError);
      return NextResponse.json({ error: 'Failed to fetch credits' }, { status: 500 });
    }

    // Total remaining across all active packages
    const totalRemaining = (credits || []).reduce((sum: number, c: { remaining_credits: number | null }) => sum + (c.remaining_credits || 0), 0);
    const totalUsed = (credits || []).reduce((sum: number, c: { used_credits: number }) => sum + c.used_credits, 0);

    // Recent transactions
    const { data: transactions } = await supabase
      .from('credit_transactions')
      .select('id, type, amount, balance_after, category_id, description, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20);

    return NextResponse.json({
      balance: totalRemaining,
      totalUsed,
      packages: credits || [],
      transactions: transactions || [],
    });
  } catch (error) {
    console.error('Credits API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
