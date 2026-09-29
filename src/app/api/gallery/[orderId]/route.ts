import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const querySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export async function GET(
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

    // Verify order belongs to user
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, status, package_id, created_at, completed_at')
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Parse pagination params
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const parsed = querySchema.safeParse(searchParams);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { page, limit } = parsed.data;
    const offset = (page - 1) * limit;

    // Get total count
    const { count: totalCount } = await supabase
      .from('generated_headshots')
      .select('id', { count: 'exact', head: true })
      .eq('order_id', orderId)
      .eq('status', 'completed');

    // Get headshots with pagination
    const { data: headshots, error: headshotsError } = await supabase
      .from('generated_headshots')
      .select('id, style_id, background_id, status, storage_path, is_favorite, created_at, completed_at')
      .eq('order_id', orderId)
      .eq('status', 'completed')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (headshotsError) {
      console.error('Failed to fetch headshots:', headshotsError);
      return NextResponse.json(
        { error: 'Failed to fetch headshots' },
        { status: 500 }
      );
    }

    // Generate signed URLs for each headshot
    const headshotsWithUrls = await Promise.all(
      (headshots || []).map(async (headshot) => {
        let signedUrl: string | null = null;
        if (headshot.storage_path) {
          const { data } = await supabase.storage
            .from('headshots')
            .createSignedUrl(headshot.storage_path, 3600); // 1 hour
          signedUrl = data?.signedUrl || null;
        }
        return {
          id: headshot.id,
          styleId: headshot.style_id,
          backgroundId: headshot.background_id,
          isFavorite: headshot.is_favorite || false,
          url: signedUrl,
          createdAt: headshot.created_at,
          completedAt: headshot.completed_at,
        };
      })
    );

    const totalPages = Math.ceil((totalCount || 0) / limit);

    return NextResponse.json({
      order: {
        id: order.id,
        status: order.status,
        packageId: order.package_id,
        createdAt: order.created_at,
        completedAt: order.completed_at,
      },
      headshots: headshotsWithUrls,
      pagination: {
        page,
        limit,
        total: totalCount || 0,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    console.error('Gallery error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
