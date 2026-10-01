import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { nanoid } from 'nanoid';
import { getCategoryById, type CategoryId } from '@/config/categories';
import { rateLimit } from '@/lib/rate-limit';
import { csrfGuard } from '@/lib/security';
import { logger } from '@/lib/logger';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 10;
const DEFAULT_MIN_PHOTOS = 4;

const uploadMetaSchema = z.object({
  orderId: z.string().uuid(),
});

export async function POST(request: NextRequest) {
  const csrf = csrfGuard(request);
  if (csrf) return csrf;
  try {
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

    // Rate limit: 30 requests per hour per user
    const rl = rateLimit({
      key: `upload:${user.id}`,
      limit: 30,
      windowMs: 60 * 60 * 1000,
    });
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '3600' } },
      );
    }

    const formData = await request.formData();
    const orderId = formData.get('orderId') as string | null;

    const metaParsed = uploadMetaSchema.safeParse({ orderId });
    if (!metaParsed.success) {
      return NextResponse.json(
        { error: 'Invalid orderId' },
        { status: 400 }
      );
    }

    // Verify order exists, belongs to user, and has valid status
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, status, package_id, category_id')
      .eq('id', metaParsed.data.orderId)
      .eq('user_id', user.id)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    if (order.status !== 'paid' && order.status !== 'uploading') {
      return NextResponse.json(
        { error: `Cannot upload photos for order with status "${order.status}"` },
        { status: 400 }
      );
    }

    // Get existing photo count
    const { count: existingCount } = await supabase
      .from('uploaded_photos')
      .select('id', { count: 'exact', head: true })
      .eq('order_id', order.id);

    const files = formData.getAll('files') as File[];

    if (!files.length) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    const totalPhotos = (existingCount || 0) + files.length;
    if (totalPhotos > MAX_FILES) {
      return NextResponse.json(
        {
          error: `Maximum ${MAX_FILES} photos allowed. You already have ${existingCount || 0} uploaded.`,
        },
        { status: 400 }
      );
    }

    // Validate all files before uploading
    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          {
            error: `Invalid file type "${file.type}" for "${file.name}". Allowed: JPG, PNG, WebP`,
          },
          { status: 400 }
        );
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            error: `File "${file.name}" exceeds the 10MB size limit`,
          },
          { status: 400 }
        );
      }
    }

    // Upload files to storage using admin client (bypasses storage RLS)
    // Auth is already verified above via the user client
    const adminClient = createAdminClient();
    const uploadedPhotos: Array<{ id: string; fileName: string; storagePath: string }> = [];

    for (const file of files) {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const fileId = nanoid();
      const storagePath = `${user.id}/${order.id}/${fileId}.${fileExt}`;

      const buffer = Buffer.from(await file.arrayBuffer());

      const { error: uploadError } = await adminClient.storage
        .from('uploads')
        .upload(storagePath, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        logger.error(`Failed to upload ${file.name}:`, uploadError);
        return NextResponse.json(
          { error: `Failed to upload "${file.name}"` },
          { status: 500 }
        );
      }

      const { data: photoRecord, error: insertError } = await supabase
        .from('uploaded_photos')
        .insert({
          order_id: order.id,
          original_filename: file.name,
          file_size: file.size,
          mime_type: file.type,
          storage_path: storagePath,
        })
        .select('id')
        .single();

      if (insertError || !photoRecord) {
        logger.error(`Failed to create photo record for ${file.name}:`, insertError);
        continue;
      }

      uploadedPhotos.push({
        id: photoRecord.id,
        fileName: file.name,
        storagePath,
      });
    }

    // Update order status to 'uploading'
    if (order.status === 'paid') {
      await supabase
        .from('orders')
        .update({ status: 'uploading' })
        .eq('id', order.id);
    }

    const { count: newTotalCount } = await supabase
      .from('uploaded_photos')
      .select('id', { count: 'exact', head: true })
      .eq('order_id', order.id);

    // Use category-specific minimum or fallback to default
    const category = getCategoryById(order.category_id as CategoryId);
    const minRequired = category?.minPhotos || DEFAULT_MIN_PHOTOS;
    const ready = (newTotalCount || 0) >= minRequired;

    return NextResponse.json({
      uploaded: uploadedPhotos.length,
      totalPhotos: newTotalCount || 0,
      minRequired,
      ready,
    });
  } catch (error) {
    logger.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
