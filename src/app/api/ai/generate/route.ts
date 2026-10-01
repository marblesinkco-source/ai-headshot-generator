import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import Replicate from 'replicate';
import { createClient } from '@/lib/supabase/server';
import { getCategoryById, getPackageById, type CategoryId } from '@/config/categories';
import { siteConfig } from '@/config/site';
import { rateLimit } from '@/lib/rate-limit';
import { csrfGuard } from '@/lib/security';
import { logger } from '@/lib/logger';
import { MissingEnvError, requireEnvs } from '@/lib/env';

function getReplicate() {
  requireEnvs(['REPLICATE_API_TOKEN']);
  return new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
}

/** Flux LoRA trainer model on Replicate */
const FLUX_TRAIN_MODEL_OWNER = 'ostris';
const FLUX_TRAIN_MODEL_NAME = 'flux-dev-lora-trainer';
const FLUX_TRAIN_MODEL_VERSION =
  'd995297071a44dcb72244e6c19462f9670254b7e4a3679476e6ffb8a503aaec1';

const generateSchema = z.object({
  orderId: z.string().min(1).max(100),
});

export async function POST(request: NextRequest) {
  const csrf = csrfGuard(request);
  if (csrf) return csrf;
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    const parsed = generateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }

    const { orderId } = parsed.data;

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

    // Rate limit: 10 requests per hour per user
    const rl = rateLimit({
      key: `ai-generate:${user.id}`,
      limit: 10,
      windowMs: 60 * 60 * 1000,
    });
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '3600' } },
      );
    }

    // Verify order belongs to user and has correct status
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, status, package_id, category_id, user_id, output_count')
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    if (order.status !== 'uploading') {
      return NextResponse.json(
        { error: `Cannot generate for order with status "${order.status}"` },
        { status: 400 }
      );
    }

    // Resolve category and package from the new category-based config
    const categoryId = (order.category_id || 'headshots') as CategoryId;
    const category = getCategoryById(categoryId);

    if (!category) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    const pkg = getPackageById(categoryId, order.package_id);
    if (!pkg) {
      return NextResponse.json(
        { error: 'Invalid package configuration' },
        { status: 400 }
      );
    }

    // Verify enough photos are uploaded
    const { count: photoCount } = await supabase
      .from('uploaded_photos')
      .select('id', { count: 'exact', head: true })
      .eq('order_id', orderId);

    if (!photoCount || photoCount < category.minPhotos) {
      return NextResponse.json(
        {
          error: `At least ${category.minPhotos} photos required. Currently uploaded: ${photoCount || 0}`,
        },
        { status: 400 }
      );
    }

    // Get signed URLs for uploaded photos and create a ZIP for LoRA training
    const { data: photos } = await supabase
      .from('uploaded_photos')
      .select('storage_path')
      .eq('order_id', orderId);

    if (!photos || photos.length < category.minPhotos) {
      return NextResponse.json(
        { error: 'Failed to retrieve uploaded photos' },
        { status: 500 }
      );
    }

    // Create signed URLs with 24h expiry for training queue delays
    const trainingImageUrls = (
      await Promise.all(
        photos.map(async (photo) => {
          const { data } = await supabase.storage
            .from('uploads')
            .createSignedUrl(photo.storage_path, 86400); // 24 hours
          return data?.signedUrl;
        })
      )
    ).filter(Boolean) as string[];

    if (trainingImageUrls.length < category.minPhotos) {
      return NextResponse.json(
        { error: 'Failed to retrieve uploaded photos' },
        { status: 500 }
      );
    }

    // Build a ZIP archive of training images and upload to storage for Replicate
    const { createAdminClient } = await import('@/lib/supabase/server');
    const adminClient = createAdminClient();

    // Download all images and create a zip file in memory
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();

    for (let i = 0; i < trainingImageUrls.length; i++) {
      try {
        const imgRes = await fetch(trainingImageUrls[i]);
        if (!imgRes.ok) {
          logger.warn(`Training image ${i} fetch returned HTTP ${imgRes.status}`);
          continue;
        }
        const imgBuffer = await imgRes.arrayBuffer();
        const ext = photos[i].storage_path.split('.').pop() || 'jpg';
        zip.file(`photo_${i}.${ext}`, imgBuffer);
      } catch (imgErr) {
        logger.error(`Failed to fetch training image ${i}`, imgErr);
      }
    }

    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
    const zipPath = `${user.id}/${orderId}/training_images.zip`;

    const { error: zipUploadError } = await adminClient.storage
      .from('uploads')
      .upload(zipPath, zipBuffer, {
        contentType: 'application/zip',
        upsert: true,
      });

    if (zipUploadError) {
      logger.error('Failed to upload training ZIP:', zipUploadError);
      return NextResponse.json(
        { error: 'Failed to prepare training images' },
        { status: 500 }
      );
    }

    // Create a signed URL for the ZIP file (24h expiry)
    const { data: zipSignedUrl } = await adminClient.storage
      .from('uploads')
      .createSignedUrl(zipPath, 86400);

    if (!zipSignedUrl?.signedUrl) {
      return NextResponse.json(
        { error: 'Failed to create training data URL' },
        { status: 500 }
      );
    }

    // Update order status to training
    const { error: statusError } = await supabase
      .from('orders')
      .update({
        status: 'processing',
        started_at: new Date().toISOString(),
      })
      .eq('id', orderId);
    if (statusError) {
      logger.error('Failed to mark order as processing', statusError, { orderId });
      return NextResponse.json({ error: 'Failed to start AI training. Please try again.' }, { status: 500 });
    }

    // Start LoRA fine-tuning via Replicate
    const triggerWord = `sks${orderId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8)}`;
    const webhookUrl = `${siteConfig.url}/api/ai/webhook?type=training&orderId=${orderId}&categoryId=${categoryId}&packageId=${order.package_id}&triggerWord=${triggerWord}`;

    try {
      const replicate = getReplicate();
      const training = await replicate.trainings.create(
        FLUX_TRAIN_MODEL_OWNER,
        FLUX_TRAIN_MODEL_NAME,
        FLUX_TRAIN_MODEL_VERSION,
        {
          input: {
            input_images: zipSignedUrl.signedUrl,
            trigger_word: triggerWord,
            steps: 1200,
            learning_rate: 1e-4,
            resolution: '512,512',
          },
          webhook: webhookUrl,
          webhook_events_filter: ['completed', 'failed'],
        }
      );

      // Store training ID in order metadata
      const { error: metaError } = await supabase
        .from('orders')
        .update({
          training_id: training.id,
          trigger_word: triggerWord,
        })
        .eq('id', orderId);
      if (metaError) {
        logger.error('Failed to store training metadata', metaError, { orderId });
      }

      return NextResponse.json({
        status: 'training',
        message: `Training AI model on your ${category.outputLabel}. This takes 10-20 minutes.`,
        trainingId: training.id,
        estimatedMinutes: 15,
      });
    } catch (trainError) {
      logger.error('Failed to start training:', trainError);

      // Revert order status
      const { error: revertError } = await supabase
        .from('orders')
        .update({ status: 'uploading' })
        .eq('id', orderId);
      if (revertError) {
        logger.error('Failed to revert order status after training failure', revertError, { orderId });
      }

      return NextResponse.json(
        { error: 'Failed to start AI training. Please try again.' },
        { status: 500 }
      );
    }
  } catch (error) {
    if (error instanceof MissingEnvError) {
      logger.error('Generation misconfigured', error);
    } else {
      logger.error('Generation error:', error);
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
