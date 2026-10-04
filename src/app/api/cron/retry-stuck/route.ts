/**
 * GET & POST /api/cron/retry-stuck
 *
 * Retries orders stuck in 'processing' status for over 15 minutes.
 * Protected by CRON_SECRET. Runs daily via Vercel Cron (Hobby plan minimum).
 * Consider upgrading to Pro for more frequent checks (every 15 min ideal).
 * Vercel Cron calls with GET; manual calls can use POST.
 *
 * Retry policy: max 3 retries.
 * After 3 failures → marks as 'failed' and notifies admin.
 *
 * Key improvement: if training succeeded on Replicate but webhook was missed,
 * this cron now re-triggers the generation fan-out instead of just incrementing
 * the retry count.
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
  // 15 minutes threshold (matches typical training time)
  const stuckThreshold = new Date(now.getTime() - 15 * 60 * 1000);

  try {
    // Find orders stuck in 'processing' for over 15 minutes
    const { data: stuckOrders, error: queryError } = await supabase
      .from('orders')
      .select('id, user_id, training_id, retry_count, started_at, category_id, package_id, trigger_word, lora_url')
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
    let reTriggered = 0;

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
          const replicateClient = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
          const training = await replicateClient.trainings.get(order.training_id);

          if (training.status === 'succeeded') {
            // ─── Training succeeded but webhook was missed ──────────────
            // Check if generation was already started (idempotency)
            const { count: existingGens } = await supabase
              .from('generated_headshots')
              .select('id', { count: 'exact', head: true })
              .eq('order_id', order.id);

            if (existingGens && existingGens > 0) {
              // Generations already exist — check if any are still processing
              const { count: pendingGens } = await supabase
                .from('generated_headshots')
                .select('id', { count: 'exact', head: true })
                .eq('order_id', order.id)
                .eq('status', 'processing');

              if (pendingGens === 0) {
                // All generations finished but order stuck — update order status
                const { count: completedGens } = await supabase
                  .from('generated_headshots')
                  .select('id', { count: 'exact', head: true })
                  .eq('order_id', order.id)
                  .eq('status', 'completed');

                const finalStatus = (completedGens || 0) > 0 ? 'completed' : 'failed';
                await supabase
                  .from('orders')
                  .update({
                    status: finalStatus,
                    headshot_count: completedGens || 0,
                    completed_at: now.toISOString(),
                    retry_count: retryCount,
                    last_retry_at: now.toISOString(),
                  })
                  .eq('id', order.id);

                logger.info(`[retry-stuck] Order ${order.id} reconciled: ${completedGens} completed generations → ${finalStatus}`);
                reTriggered++;
              } else {
                // Some generations still pending — just update retry count
                await supabase
                  .from('orders')
                  .update({ retry_count: retryCount, last_retry_at: now.toISOString() })
                  .eq('id', order.id);
                logger.info(`[retry-stuck] Order ${order.id} has ${pendingGens} pending generations — waiting`);
              }
            } else {
              // No generations exist — webhook was completely missed!
              // Re-invoke the webhook handler by calling it internally
              logger.info(`[retry-stuck] Order ${order.id} training succeeded but no generations found — re-triggering via webhook`);

              try {
                const { siteConfig } = await import('@/config/site');
                const webhookUrl = `${siteConfig.url}/api/ai/webhook?type=training&orderId=${order.id}&categoryId=${order.category_id || 'headshots'}&packageId=${order.package_id}&triggerWord=${order.trigger_word || 'sks'}`;

                // Build the payload that the training webhook would have sent
                let trainingOutput: unknown = null;
                if (training.output) {
                  trainingOutput = training.output;
                }

                // Store LoRA URL if not already stored
                if (!order.lora_url && training.output) {
                  const loraUrl = typeof training.output === 'string'
                    ? training.output
                    : (training.output as Record<string, unknown>).weights || (training.output as Record<string, unknown>).version;
                  if (loraUrl) {
                    await supabase
                      .from('orders')
                      .update({ lora_url: loraUrl as string })
                      .eq('id', order.id);
                  }
                }

                // Call our own webhook endpoint to trigger generation
                const webhookBody = JSON.stringify({
                  id: order.training_id,
                  status: 'succeeded',
                  output: trainingOutput,
                  error: null,
                });

                // Use internal fetch if webhook secret available
                if (process.env.REPLICATE_WEBHOOK_SECRET) {
                  const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: webhookBody,
                  });

                  if (response.ok) {
                    logger.info(`[retry-stuck] Successfully re-triggered generation for order ${order.id}`);
                    reTriggered++;
                  } else {
                    logger.error(`[retry-stuck] Failed to re-trigger generation for order ${order.id}: ${response.status}`);
                  }
                }
              } catch (retriggerErr) {
                logger.error(`[retry-stuck] Failed to re-trigger generation for order ${order.id}:`, retriggerErr);
              }

              await supabase
                .from('orders')
                .update({ retry_count: retryCount, last_retry_at: now.toISOString() })
                .eq('id', order.id);
            }

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
          // Still processing on Replicate — just update retry count
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

    logger.info(`[retry-stuck] Processed ${stuckOrders.length} stuck orders: ${retried} retried, ${reTriggered} re-triggered, ${failed} failed`);

    return NextResponse.json({
      message: 'Stuck orders processed',
      total: stuckOrders.length,
      retried,
      reTriggered,
      failed,
    });
  } catch (error) {
    logger.error('[retry-stuck] Cron handler error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
