import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { rateLimit } from '@/lib/rate-limit';
import { tooManyRequests } from '@/lib/security';

/**
 * GET /api/ai/status?orderId=xxx
 *
 * Returns the current status of an order's AI processing pipeline.
 * Used by the frontend to poll for progress updates.
 */
export async function GET(request: NextRequest) {
  try {
    const orderId = request.nextUrl.searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { error: 'orderId is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (!(await rateLimit({ key: `ai-status:${user.id}`, limit: 60, windowMs: 60 * 1000 })).success) {
      return tooManyRequests();
    }

    // Get order with status
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, status, category_id, training_id, started_at, completed_at, headshot_count, output_count')
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Get generation progress
    const { count: totalGenerations } = await supabase
      .from('generated_headshots')
      .select('id', { count: 'exact', head: true })
      .eq('order_id', orderId);

    const { count: completedGenerations } = await supabase
      .from('generated_headshots')
      .select('id', { count: 'exact', head: true })
      .eq('order_id', orderId)
      .eq('status', 'completed');

    const { count: failedGenerations } = await supabase
      .from('generated_headshots')
      .select('id', { count: 'exact', head: true })
      .eq('order_id', orderId)
      .eq('status', 'failed');

    // Determine phase
    let phase: 'pending' | 'training' | 'generating' | 'completed' | 'failed' = 'pending';
    let progress = 0;
    let estimatedMinutesRemaining: number | undefined;

    if (order.status === 'completed') {
      phase = 'completed';
      progress = 100;
    } else if (order.status === 'failed') {
      phase = 'failed';
    } else if (order.status === 'processing') {
      if ((totalGenerations || 0) > 0) {
        // Generations have been created — we're in the generation phase
        phase = 'generating';
        const total = totalGenerations || 1;
        const done = (completedGenerations || 0) + (failedGenerations || 0);
        // Training accounts for 50% of progress, generation for 50%
        progress = 50 + Math.round((done / total) * 50);
        estimatedMinutesRemaining = Math.max(1, Math.round((total - done) * 0.5));
      } else {
        // No generations yet — still training
        phase = 'training';
        // Estimate training progress based on time elapsed (avg ~15 min)
        const startedAt = order.started_at ? new Date(order.started_at).getTime() : Date.now();
        const elapsed = (Date.now() - startedAt) / 1000 / 60; // minutes
        progress = Math.min(45, Math.round((elapsed / 15) * 50)); // cap at 45% during training
        estimatedMinutesRemaining = Math.max(1, Math.round(15 - elapsed));
      }
    }

    return NextResponse.json({
      orderId: order.id,
      status: order.status,
      phase,
      progress,
      estimatedMinutesRemaining,
      training: {
        id: order.training_id,
        hasStarted: !!order.training_id,
      },
      generation: {
        total: totalGenerations || 0,
        completed: completedGenerations || 0,
        failed: failedGenerations || 0,
      },
      startedAt: order.started_at,
      completedAt: order.completed_at,
    });
  } catch (error) {
    logger.error('Status check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
