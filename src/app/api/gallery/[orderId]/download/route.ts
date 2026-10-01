import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import JSZip from 'jszip';
import { rateLimit } from '@/lib/rate-limit';

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

    // Rate limit: 20 requests per hour per user
    const rl = rateLimit({
      key: `gallery-download:${user.id}`,
      limit: 20,
      windowMs: 60 * 60 * 1000,
    });
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '3600' } },
      );
    }

    // Verify order belongs to user
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, package_id')
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const headshotId = request.nextUrl.searchParams.get('id');

    if (headshotId) {
      // Single headshot download
      if (!z.string().uuid().safeParse(headshotId).success) {
        return NextResponse.json(
          { error: 'Invalid headshot ID' },
          { status: 400 }
        );
      }

      const { data: headshot, error: headshotError } = await supabase
        .from('generated_headshots')
        .select('id, storage_path, style_id, background_id')
        .eq('id', headshotId)
        .eq('order_id', orderId)
        .eq('status', 'completed')
        .single();

      if (headshotError || !headshot || !headshot.storage_path) {
        return NextResponse.json(
          { error: 'Headshot not found' },
          { status: 404 }
        );
      }

      const { data: fileData, error: downloadError } = await supabase.storage
        .from('headshots')
        .download(headshot.storage_path);

      if (downloadError || !fileData) {
        console.error('Failed to download headshot:', downloadError);
        return NextResponse.json(
          { error: 'Failed to download headshot' },
          { status: 500 }
        );
      }

      const fileName = `headshot-${headshot.style_id}-${headshot.background_id}.png`;
      const buffer = Buffer.from(await fileData.arrayBuffer());

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          'Content-Disposition': `attachment; filename="${fileName}"`,
          'Content-Length': buffer.length.toString(),
        },
      });
    }

    // ZIP download of all headshots
    const { data: headshots, error: headshotsError } = await supabase
      .from('generated_headshots')
      .select('id, storage_path, style_id, background_id')
      .eq('order_id', orderId)
      .eq('status', 'completed');

    if (headshotsError) {
      console.error('Failed to fetch headshots:', headshotsError);
      return NextResponse.json(
        { error: 'Failed to fetch headshots' },
        { status: 500 }
      );
    }

    if (!headshots || headshots.length === 0) {
      return NextResponse.json(
        { error: 'No completed headshots found' },
        { status: 404 }
      );
    }

    const zip = new JSZip();

    // Download each headshot and add to ZIP
    await Promise.all(
      headshots.map(async (headshot, index) => {
        if (!headshot.storage_path) return;

        try {
          const { data: fileData } = await supabase.storage
            .from('headshots')
            .download(headshot.storage_path);

          if (fileData) {
            const buffer = await fileData.arrayBuffer();
            const fileName = `headshot-${String(index + 1).padStart(3, '0')}-${headshot.style_id}-${headshot.background_id}.png`;
            zip.file(fileName, buffer);
          }
        } catch (err) {
          console.error(`Failed to add headshot ${headshot.id} to ZIP:`, err);
        }
      })
    );

    const zipBuffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    });

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="headshots-${orderId.slice(0, 8)}.zip"`,
        'Content-Length': zipBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
