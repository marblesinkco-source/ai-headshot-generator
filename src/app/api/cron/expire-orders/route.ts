/**
 * GET & POST /api/cron/expire-orders
 *
 * Expires pending orders that were never completed by Paddle.
 * A "pending" order means the user started checkout but never paid
 * (abandoned cart, closed the overlay, network issue, etc.).
 *
 * Policy:
 *   - Orders pending for > 24 hours → status = "expired"
 *   - Runs daily via Vercel Cron
 *   - Protected by CRON_SECRET bearer token
 *
 * This prevents stale pending rows from cluttering dashboards and
 * from being counted as "active" in analytics or credit holds.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { safeEqual } from '@/lib/security';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

/** Vercel Cron calls GET; manual triggers use POST — both run the same logic. */
export async function GET(request: NextRequest) {
  return handleExpireOrders(request);
}

export async function POST(request: NextRequest) {
  return handleExpireOrders(request);
}

/** Orders pending longer than this are expired (24 hours). */
const EXPIRE_AFTER_MS = 24 * 60 * 60 * 1000;

async function handleExpireOrders(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || !safeEqual(authHeader, `Bearer ${cronSecret}`)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createAdminClient();
  const now = new Date();
  const expireThreshold = new Date(now.getTime() - EXPIRE_AFTER_MS);

  try {
    // Find pending orders older than 24 hours
    const { data: staleOrders, error: queryError } = await supabase
      .from('orders')
      .select('id, user_id, created_at, package_id, category_id')
      .eq('status', 'pending')
      .lt('created_at', expireThreshold.toISOString())
      .order('created_at', { ascending: true })
      .limit(100);

    if (queryError) {
      logger.error('[expire-orders] Failed to query stale orders:', queryError);
      return NextResponse.json({ error: 'Query failed' }, { status: 500 });
    }

    if (!staleOrders || staleOrders.length === 0) {
      return NextResponse.json({ message: 'No stale pending orders found', expired: 0 });
    }

    // Batch update all stale orders to "expired"
    const staleIds = staleOrders.map((o) => o.id);

    const { error: updateError, count } = await supabase
      .from('orders')
      .update({
        status: 'expired',
        updated_at: now.toISOString(),
      })
      .in('id', staleIds)
      .eq('status', 'pending'); // safety: only expire still-pending rows

    if (updateError) {
      logger.error('[expire-orders] Failed to expire orders:', updateError);
      return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }

    const expiredCount = count ?? staleIds.length;

    logger.info(
      `[expire-orders] Expired ${expiredCount} stale pending orders (threshold: ${expireThreshold.toISOString()})`
    );

    return NextResponse.json({
      message: 'Stale pending orders expired',
      expired: expiredCount,
      threshold: expireThreshold.toISOString(),
    });
  } catch (error) {
    logger.error('[expire-orders] Cron handler error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
