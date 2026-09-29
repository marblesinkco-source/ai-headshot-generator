import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const favoriteSchema = z.object({
  headshotId: z.string().uuid(),
  isFavorite: z.boolean(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = params;

    if (!orderId || orderId.length < 1) {
      return NextResponse.json(
        { error: 'Invalid order ID' },
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

    const body = await request.json();
    const parsed = favoriteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { headshotId, isFavorite } = parsed.data;

    // Verify order belongs to user
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id')
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Update favorite status
    const { data: headshot, error: updateError } = await supabase
      .from('generated_headshots')
      .update({ is_favorite: isFavorite })
      .eq('id', headshotId)
      .eq('order_id', orderId)
      .select('id, is_favorite')
      .single();

    if (updateError || !headshot) {
      return NextResponse.json(
        { error: 'Headshot not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: headshot.id,
      isFavorite: headshot.is_favorite,
    });
  } catch (error) {
    console.error('Favorite error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
