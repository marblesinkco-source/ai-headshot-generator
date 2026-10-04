import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { InvoiceService, ReceiptService } from '@/lib/accounting/services';

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
    const type: 'invoices' | 'receipts' = sp.get('type') === 'receipts' ? 'receipts' : 'invoices';
    const page = toPositiveInt(sp.get('page'), 1);
    const pageSize = toPositiveInt(sp.get('pageSize'), 20, MAX_PAGE_SIZE);

    const result =
      type === 'receipts'
        ? await ReceiptService.list(user.id, page, pageSize)
        : await InvoiceService.list(user.id, page, pageSize);

    return NextResponse.json(result);
  } catch (error) {
    const msg = error instanceof Error ? error.message : '';
    if (msg.includes('relation') && msg.includes('does not exist')) {
      return NextResponse.json({ data: [], total: 0, page: 1, pageSize: 20, totalPages: 0 });
    }
    console.error('[accounting/documents] GET failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
