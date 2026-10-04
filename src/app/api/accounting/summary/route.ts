import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { AccountingService } from '@/lib/accounting/services';

export const dynamic = 'force-dynamic';

export async function GET(_request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const summary = await AccountingService.getSummary(user.id);
    return NextResponse.json(summary);
  } catch (error) {
    const msg = error instanceof Error ? error.message : '';
    if (msg.includes('relation') && msg.includes('does not exist')) {
      return NextResponse.json({
        totalSpent: 0, grossPurchases: 0, netSpend: 0, totalRefunds: 0, totalDisputes: 0,
        pendingTransactions: 0, availableCredits: 0, currency: 'usd',
      });
    }
    console.error('[accounting/summary] GET failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
