/**
 * GET /api/cron/keep-alive
 *
 * Lightweight Supabase ping to prevent the Hobby-plan project from being
 * paused due to inactivity. Called daily by Vercel Cron (vercel.json) and
 * twice a day by .github/workflows/supabase-keepalive.yml.
 *
 * Supabase pauses free/Hobby projects after ~1 week of zero database
 * activity. This endpoint issues a trivial SELECT to keep the connection
 * alive without adding meaningful load.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { safeEqual } from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || !safeEqual(authHeader, `Bearer ${cronSecret}`)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();

    // Simple count query — cheapest way to register DB activity
    const { count, error } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true });

    if (error) {
      logger.error('[keep-alive] Supabase ping failed', { error: error.message });
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    logger.info('[keep-alive] Supabase ping OK', { orderCount: count });
    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      orderCount: count,
    });
  } catch (err) {
    logger.error('[keep-alive] Unexpected error', { error: String(err) });
    return NextResponse.json(
      { ok: false, error: 'Internal error' },
      { status: 500 }
    );
  }
}
