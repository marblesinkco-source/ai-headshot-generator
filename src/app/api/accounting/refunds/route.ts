import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { RefundService, isTableMissingError } from '@/lib/accounting';

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

    const result = await RefundService.list(user.id, page, pageSize);
    return NextResponse.json(result);
  } catch (error) {
    if (isTableMissingError(error)) {
      return NextResponse.json({ data: [], total: 0, page: 1, pageSize: 20, totalPages: 0 });
    }
    console.error('[accounting/refunds] GET failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/accounting/refunds — create a refund request (status: "requested").
 * Body: { transactionId, orderId?, amount, currency, reason? }
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { transactionId, orderId, amount, currency, reason } = body;

    if (typeof transactionId !== 'string' || !transactionId) {
      return NextResponse.json({ error: 'transactionId is required' }, { status: 400 });
    }
    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ error: 'amount must be a positive number' }, { status: 400 });
    }
    if (typeof currency !== 'string' || !currency) {
      return NextResponse.json({ error: 'currency is required' }, { status: 400 });
    }

    const refund = await RefundService.create({
      userId: user.id,
      transactionId,
      orderId: typeof orderId === 'string' ? orderId : undefined,
      amount,
      currency,
      reason: typeof reason === 'string' ? reason : undefined,
    });

    return NextResponse.json(refund, { status: 201 });
  } catch (error) {
    if (isTableMissingError(error)) {
      return NextResponse.json(
        { error: 'Accounting tables not yet initialized.' },
        { status: 503 }
      );
    }
    console.error('[accounting/refunds] POST failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
