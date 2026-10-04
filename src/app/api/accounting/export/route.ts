import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ExportService, isTableMissingError } from '@/lib/accounting';
import type { ExportFilters, ExportFormat } from '@/types/accounting';

export const dynamic = 'force-dynamic';

const FORMATS: ExportFormat[] = ['csv', 'json', 'xlsx', 'pdf'];

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body: { format?: unknown; filters?: unknown };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const format = (body?.format ?? 'csv') as ExportFormat;
    if (!FORMATS.includes(format)) {
      return NextResponse.json(
        { error: `Invalid format. Use one of: ${FORMATS.join(', ')}` },
        { status: 400 }
      );
    }

    const filters: ExportFilters =
      body?.filters && typeof body.filters === 'object' ? (body.filters as ExportFilters) : {};

    const { data, filename, contentType } = await ExportService.exportTransactions(
      user.id,
      filters,
      format
    );

    return new NextResponse(data, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    if (isTableMissingError(error)) {
      return new NextResponse('No data available — accounting tables not yet initialized.', {
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
    console.error('[accounting/export] POST failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
