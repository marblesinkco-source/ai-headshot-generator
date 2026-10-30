import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { RefundService, isTableMissingError } from '@/lib/accounting';
import { rateLimit } from '@/lib/rate-limit';
import { csrfGuard } from '@/lib/security';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';

const MAX_PAGE_SIZE = 100;

const refundSchema = z.object({
  transactionId: z.string().min(1).max(200),
  orderId: z.string().max(200).optional(),
  amount: z.number().positive().max(100_000_00), // max $100k in cents
  currency: z.string().min(3).max(3),
  reason: z.string().max(1000).optional(),
});

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
    logger.error('[accounting/refunds] GET failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/accounting/refunds — create a refund request (status: "requested").
 * Body: { transactionId, orderId?, amount, currency, reason? }
 */
export async function POST(request: NextRequest) {
  const csrf = csrfGuard(request);
  if (csrf) return csrf;

  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limit: 5 refund requests per hour
    const rl = await rateLimit({ key: `refund:${user.id}`, limit: 5, windowMs: 60 * 60 * 1000 });
    if (!rl.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: { 'Retry-After': '3600' } });
    }

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const parsed = refundSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    const { transactionId, orderId, amount, currency, reason } = parsed.data;

    // Verify the order belongs to this user if orderId is provided
    if (orderId) {
      const { data: order } = await supabase
        .from('orders')
        .select('id')
        .eq('id', orderId)
        .eq('user_id', user.id)
        .single();
      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
    }

    const refund = await RefundService.create({
      userId: user.id,
      transactionId,
      orderId,
      amount,
      currency,
      reason,
    });

    return NextResponse.json(refund, { status: 201 });
  } catch (error) {
    if (isTableMissingError(error)) {
      return NextResponse.json(
        { error: 'Accounting tables not yet initialized.' },
        { status: 503 }
      );
    }
    logger.error('[accounting/refunds] POST failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
