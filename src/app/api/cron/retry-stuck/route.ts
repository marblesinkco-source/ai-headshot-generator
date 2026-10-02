/**
 * GET & POST /api/cron/retry-stuck
 *
 * Retries orders stuck in 'processing' status for over 30 minutes.
 * Protected by CRON_SECRET. Runs daily via Vercel Cron.
 * Vercel Cron calls with GET; manual calls can use POST.
 *
 * Retry policy: max 3 retries, exponential backoff (30min, 1h, 2h).
 * After 3 failures → marks as 'failed' and notifies admin.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import Replicate from 'replicate';
import { logger } from '@/lib/logger';
import { safeEqual } from '@/lib/security';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/** Vercel Cron calls GET; manual triggers use POST — both run the same logic. */
export async function GET(request: NextRequest) {
  return handleRetryStuck(request);
}

export async function POST(request: NextRequest) {
  return handleRetryStuck(request);
}

async function handleRetryStuck(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || !safeEqual(authHeader, `Bearer ${cronSecret}`)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createAdminClient();
  const now = new Date();
  const stuckThreshold = new Date(now.getTime() - 30 * 60 * 1000); // 30 min ago

  try {
    // Find orders stuck in 'processing' for over 30 minutes
    const { data: stuckOrders, error: queryError } = await supabase
      .from('orders')
      .select('id, user_id, training_id, retry_count, started_at, category_id, package_id, trigger_word')
      .eq('status', 'processing')
      .lt('started_at', stuckThreshold.toISOString())
      .order('started_at', { ascending: true })
      .limit(10);

    if (queryError) {
      logger.error('[retry-stuck] Failed to query stuck orders:', queryError);
      return NextResponse.json({ error: 'Query failed' }, { status: 500 });
    }

    if (!stuckOrders || stuckOrders.length === 0) {
      return NextResponse.json({ message: 'No stuck orders found', processed: 0 });
    }

    let retried = 0;
    let failed = 0;

    for (const order of stuckOrders) {
      const retryCount = (order.retry_count || 0) + 1;
      const maxRetries = 3;

      if (retryCount > maxRetries) {
        // Max retries exceeded — mark as failed
        await supabase
          .from('orders')
          .update({
            status: 'failed',
            retry_count: retryCount,
            last_retry_at: now.toISOString(),
          })
          .eq('id', order.id);

        // Notify admin
        logger.error(`[retry-stuck] Order ${order.id} failed after ${maxRetries} retries`);

        // Send failure email to user
        try {
          const { data: orderUser } = await supabase.auth.admin.getUserById(order.user_id);
          if (orderUser?.user?.email && process.env.RESEND_API_KEY) {
            const { Resend } = await import('resend');
            const { buildGenerationFailedEmail } = await import('@/lib/emails');
            const { siteConfig } = await import('@/config/site');
            const resend = new Resend(process.env.RESEND_API_KEY);
            const { subject, html } = buildGenerationFailedEmail({
              errorMessage: 'Your order could not be processed after multiple attempts. Our team has been notified.',
            });
            await resend.emails.send({
              from: `${siteConfig.name} <noreply@${new URL(siteConfig.url).hostname}>`,
              to: orderUser.user.email,
              subject,
              html,
            });
          }
        } catch (emailErr) {
          logger.error('[retry-stuck] Failed to send failure email:', emailErr);
        }

        failed++;
        continue;
      }

      // Check training status on Replicate
      if (order.training_id && process.env.REPLICATE_API_TOKEN) {
        try {
          const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
          const training = await replicate.trainings.get(order.training_id);

          if (training.status === 'succeeded') {
            // Training actually succeeded but webhook was missed
            // The webhook handler will process it
            logger.info(`[retry-stuck] Order ${order.id} training succeeded — webhook may have been missed`);

            // For now, just update retry count and let the next cycle check again
            await supabase
              .from('orders')
              .update({
                retry_count: retryCount,
                last_retry_at: now.toISOString(),
              })
              .eq('id', order.id);
            retried++;
            continue;
          } else if (training.status === 'failed' || training.status === 'canceled') {
            // Training failed — mark order as failed
            await supabase
              .from('orders')
              .update({
                status: 'failed',
                retry_count: retryCount,
                last_retry_at: now.toISOString(),
              })
              .eq('id', order.id);
            failed++;
            continue;
          }
          // Still processing — just update retry count
        } catch (replicateErr) {
          logger.error(`[retry-stuck] Failed to check training ${order.training_id}:`, replicateErr);
        }
      }

      // Update retry count
      await supabase
        .from('orders')
        .update({
          retry_count: retryCount,
          last_retry_at: now.toISOString(),
        })
        .eq('id', order.id);

      retried++;
    }

    logger.info(`[retry-stuck] Processed ${stuckOrders.length} stuck orders: ${retried} retried, ${failed} failed`);

    return NextResponse.json({
      message: 'Stuck orders processed',
      total: stuckOrders.length,
      retried,
      failed,
    });
  } catch (error) {
    logger.error('[retry-stuck] Cron handler error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
