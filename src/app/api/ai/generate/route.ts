import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import Replicate from 'replicate';
import { createClient } from '@/lib/supabase/server';
import { getCategoryById, getPackageById, type CategoryId } from '@/config/categories';
import { siteConfig } from '@/config/site';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

/** Flux LoRA trainer model on Replicate */
const FLUX_TRAIN_MODEL_OWNER = 'ostris';
const FLUX_TRAIN_MODEL_NAME = 'flux-dev-lora-trainer';
const FLUX_TRAIN_MODEL_VERSION =
  'd995297071a44dcb72244e6c19462f9670254b7e4a3679476e6ffb8a503aaec1';

const generateSchema = z.object({
  orderId: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = generateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
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

    // Get signed URLs for uploaded photos (these will be used for LoRA training)
    const { data: photos } = await supabase
      .from('uploaded_photos')
      .select('storage_path')
      .eq('order_id', orderId);

    const trainingImageUrls = (
      await Promise.all(
        (photos || []).map(async (photo) => {
          const { data } = await supabase.storage
            .from('uploads')
            .createSignedUrl(photo.storage_path, 3600);
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

    // Update order status to training
    await supabase
      .from('orders')
      .update({
        status: 'processing',
        started_at: new Date().toISOString(),
      })
      .eq('id', orderId);

    // Start LoRA fine-tuning via Replicate
    const triggerWord = `sks${orderId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8)}`;
    const webhookUrl = `${siteConfig.url}/api/ai/webhook?type=training&orderId=${orderId}&categoryId=${categoryId}&packageId=${order.package_id}&triggerWord=${triggerWord}`;

    try {
      const training = await replicate.trainings.create(
        FLUX_TRAIN_MODEL_OWNER,
        FLUX_TRAIN_MODEL_NAME,
        FLUX_TRAIN_MODEL_VERSION,
        {
          input: {
            input_images: trainingImageUrls.join('\n'),
            trigger_word: triggerWord,
            steps: 1200,
            learning_rate: 1e-4,
            resolution: '512,512',
          },
          webhook: webhookUrl,
          webhook_events_filter: ['completed'],
        }
      );

      // Store training ID in order metadata
      await supabase
        .from('orders')
        .update({
          training_id: training.id,
          trigger_word: triggerWord,
        })
        .eq('id', orderId);

      return NextResponse.json({
        status: 'training',
        message: `Training AI model on your ${category.outputLabel}. This takes 10-20 minutes.`,
        trainingId: training.id,
        estimatedMinutes: 15,
      });
    } catch (trainError) {
      console.error('Failed to start training:', trainError);

      // Revert order status
      await supabase
        .from('orders')
        .update({ status: 'uploading' })
        .eq('id', orderId);

      return NextResponse.json(
        { error: 'Failed to start AI training. Please try again.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
