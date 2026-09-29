import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import Replicate from 'replicate';
import { createClient } from '@/lib/supabase/server';
import { PACKAGES, type PackageId } from '@/config/packages';
import { BACKGROUNDS, STYLES, buildGenerationPrompt, NEGATIVE_PROMPT, QUALITY_SETTINGS } from '@/config/ai';
import { siteConfig } from '@/config/site';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

const generateSchema = z.object({
  orderId: z.string().uuid(),
});

const MIN_PHOTOS_REQUIRED = 4;

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
      .select('id, status, package_id, user_id')
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
        { error: `Cannot generate headshots for order with status "${order.status}"` },
        { status: 400 }
      );
    }

    // Verify enough photos are uploaded
    const { count: photoCount } = await supabase
      .from('uploaded_photos')
      .select('id', { count: 'exact', head: true })
      .eq('order_id', orderId);

    if (!photoCount || photoCount < MIN_PHOTOS_REQUIRED) {
      return NextResponse.json(
        {
          error: `At least ${MIN_PHOTOS_REQUIRED} photos required. Currently uploaded: ${photoCount || 0}`,
        },
        { status: 400 }
      );
    }

    // Update order status to processing
    const { error: statusError } = await supabase
      .from('orders')
      .update({ status: 'processing', started_at: new Date().toISOString() })
      .eq('id', orderId);

    if (statusError) {
      console.error('Failed to update order status:', statusError);
      return NextResponse.json(
        { error: 'Failed to start generation' },
        { status: 500 }
      );
    }

    // Get package config for this order
    const pkg = PACKAGES[order.package_id as PackageId];
    if (!pkg) {
      return NextResponse.json(
        { error: 'Invalid package configuration' },
        { status: 500 }
      );
    }

    const quality = QUALITY_SETTINGS[pkg.resolution] || QUALITY_SETTINGS.standard;
    const selectedBackgrounds = BACKGROUNDS.slice(0, pkg.backgrounds);
    const selectedStyles = STYLES.slice(0, pkg.styles);

    // Get uploaded photo storage paths for training data
    const { data: photos } = await supabase
      .from('uploaded_photos')
      .select('storage_path')
      .eq('order_id', orderId);

    const trainingImageUrls = await Promise.all(
      (photos || []).map(async (photo) => {
        const { data } = await supabase.storage
          .from('uploads')
          .createSignedUrl(photo.storage_path, 3600);
        return data?.signedUrl;
      })
    );

    const validUrls = trainingImageUrls.filter(Boolean) as string[];

    // Kick off generation pipeline (async - don't await full completion)
    const webhookUrl = `${siteConfig.url}/api/ai/webhook`;

    // Generate combinations of style x background up to the headshot limit
    const generations: Array<{ styleId: string; backgroundId: string }> = [];
    let count = 0;
    for (const style of selectedStyles) {
      for (const bg of selectedBackgrounds) {
        if (count >= pkg.headshots) break;
        generations.push({ styleId: style.id, backgroundId: bg.id });
        count++;
      }
      if (count >= pkg.headshots) break;
    }

    // Fire off Replicate predictions without awaiting completion
    const launchPromises = generations.map(async ({ styleId, backgroundId }) => {
      const prompt = buildGenerationPrompt(
        styleId as (typeof STYLES)[number]['id'],
        backgroundId as (typeof BACKGROUNDS)[number]['id']
      );

      try {
        const prediction = await replicate.predictions.create({
          model: 'stability-ai/sdxl',
          input: {
            prompt,
            negative_prompt: NEGATIVE_PROMPT,
            width: quality.width,
            height: quality.height,
            num_inference_steps: quality.steps,
            guidance_scale: quality.guidanceScale,
            num_outputs: 1,
          },
          webhook: webhookUrl,
          webhook_events_filter: ['completed'],
        });

        // Record generation in DB
        await supabase.from('generated_headshots').insert({
          order_id: orderId,
          user_id: user.id,
          prediction_id: prediction.id,
          style_id: styleId,
          background_id: backgroundId,
          status: 'processing',
          prompt,
        });

        return prediction.id;
      } catch (err) {
        console.error(`Failed to create prediction for ${styleId}/${backgroundId}:`, err);
        return null;
      }
    });

    // Start all predictions but don't wait for them to complete
    Promise.allSettled(launchPromises).catch((err) => {
      console.error('Error launching generation pipeline:', err);
    });

    return NextResponse.json({
      status: 'processing',
      message: 'Your headshots are being generated',
      totalGenerations: generations.length,
    });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
