import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { CreditLedgerService } from '@/lib/accounting/services';

export const dynamic = 'force-dynamic';

const MAX_PAGE_SIZE = 100;

function toPositiveInt(value: string | null, fallback: number, max?: number): number {
  const n = parseInt(value ?? '', 10);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return max ? Math.min(n, max) : n;
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sp = request.nextUrl.searchParams;
    const page = toPositiveInt(sp.get('page'), 1);
    const pageSize = toPositiveInt(sp.get('pageSize'), 20, MAX_PAGE_SIZE);

    const [entries, balance] = await Promise.all([
      CreditLedgerService.list(user.id, page, pageSize),
      CreditLedgerService.getBalance(user.id),
    ]);

    return NextResponse.json({ entries, balance });
  } catch (error) {
    console.error('[accounting/credits] GET failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
