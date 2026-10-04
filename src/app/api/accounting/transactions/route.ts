import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { TransactionService } from '@/lib/accounting/services';
import type { FinancialTransactionStatus, FinancialTransactionType } from '@/types/accounting';

export const dynamic = 'force-dynamic';

const MAX_PAGE_SIZE = 100;

function splitList(value: string | null): string[] | undefined {
  if (!value) return undefined;
  const items = value.split(',').map((s) => s.trim()).filter(Boolean);
  return items.length ? items : undefined;
}

function toPositiveInt(value: string | null, fallback: number, max?: number): number {
  const n = parseInt(value ?? '', 10);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return max ? Math.min(n, max) : n;
}

function toNumber(value: string | null): number | undefined {
  if (value === null || value.trim() === '') return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sp = request.nextUrl.searchParams;

    // The search term is interpolated into a PostgREST .or() filter by the service,
    // so strip characters that carry filter syntax (commas, parentheses, wildcards).
    const search = sp.get('search')?.replace(/[,()%*\\]/g, ' ').trim().slice(0, 100) || undefined;

    const result = await TransactionService.list({
      userId: user.id,
      search,
      transactionType: splitList(sp.get('transactionType')) as FinancialTransactionType[] | undefined,
      status: splitList(sp.get('status')) as FinancialTransactionStatus[] | undefined,
      provider: sp.get('provider') || undefined,
      dateFrom: sp.get('dateFrom') || undefined,
      dateTo: sp.get('dateTo') || undefined,
      minAmount: toNumber(sp.get('minAmount')),
      maxAmount: toNumber(sp.get('maxAmount')),
      currency: sp.get('currency') || undefined,
      orderId: sp.get('orderId') || undefined,
      page: toPositiveInt(sp.get('page'), 1),
      pageSize: toPositiveInt(sp.get('pageSize'), 20, MAX_PAGE_SIZE),
    });

    return NextResponse.json(result);
  } catch (error) {
    const msg = error instanceof Error ? error.message : '';
    if (msg.includes('relation') && msg.includes('does not exist')) {
      return NextResponse.json({ data: [], total: 0, page: 1, pageSize: 20, totalPages: 0 });
    }
    console.error('[accounting/transactions] GET failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
