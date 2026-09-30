/**
 * POST /api/credits/use — Deduct credits for AI photo generation
 *
 * Called internally when a user generates photos using credits instead of a package purchase.
 * Uses FIFO: deducts from the earliest-expiring credit package first.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/server';

const useSchema = z.object({
  credits: z.number().int().positive(),
  categoryId: z.string(),
  orderId: z.string().optional(),
  description: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = useSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { credits: creditsToUse, categoryId, orderId, description } = parsed.data;

    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Use admin client for writes (RLS service_role)
    const admin = createAdminClient();

    // Get active credit packages, ordered by expiry (FIFO — use soonest-expiring first)
    const { data: creditPackages, error: fetchError } = await admin
      .from('user_credits')
      .select('id, total_credits, used_credits, remaining_credits')
      .eq('user_id', user.id)
      .gt('expires_at', new Date().toISOString())
      .order('expires_at', { ascending: true });

    if (fetchError) {
      console.error('Failed to fetch credits:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch credits' }, { status: 500 });
    }

    // Calculate total available
    const totalAvailable = (creditPackages || []).reduce(
      (sum: number, c: { remaining_credits: number | null }) => sum + (c.remaining_credits || 0),
      0
    );

    if (totalAvailable < creditsToUse) {
      return NextResponse.json(
        {
          error: 'Insufficient credits',
          available: totalAvailable,
          required: creditsToUse,
        },
        { status: 402 }
      );
    }

    // Deduct credits FIFO
    let remaining = creditsToUse;
    const deductions: { creditId: string; amount: number; balanceAfter: number }[] = [];

    for (const pkg of creditPackages || []) {
      if (remaining <= 0) break;

      const available = pkg.remaining_credits || 0;
      if (available <= 0) continue;

      const deduct = Math.min(remaining, available);
      const newUsed = pkg.used_credits + deduct;

      const { error: updateError } = await admin
        .from('user_credits')
        .update({ used_credits: newUsed })
        .eq('id', pkg.id);

      if (updateError) {
        console.error(`Failed to deduct from credit ${pkg.id}:`, updateError);
        return NextResponse.json({ error: 'Failed to deduct credits' }, { status: 500 });
      }

      deductions.push({
        creditId: pkg.id,
        amount: deduct,
        balanceAfter: pkg.total_credits - newUsed,
      });

      remaining -= deduct;
    }

    // Record transactions
    for (const d of deductions) {
      await admin.from('credit_transactions').insert({
        id: nanoid(),
        user_id: user.id,
        credit_id: d.creditId,
        order_id: orderId || null,
        type: 'use',
        amount: -d.amount,
        balance_after: d.balanceAfter,
        category_id: categoryId,
        description: description || `Used ${d.amount} credits for ${categoryId}`,
      });
    }

    const newTotal = totalAvailable - creditsToUse;

    return NextResponse.json({
      success: true,
      creditsUsed: creditsToUse,
      remainingBalance: newTotal,
      deductions,
    });
  } catch (error) {
    console.error('Credit use error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
