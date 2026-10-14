import { NextRequest, NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { csrfGuard } from '@/lib/security';
import { rateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

export const maxDuration = 120;

/**
 * Background change using Flux Kontext on Replicate.
 * Changes the background of an existing headshot while preserving
 * the person's face, expression, and outfit.
 */
const FLUX_KONTEXT_MODEL = 'black-forest-labs/flux-kontext-pro';

/** Preset backgrounds users can choose from */
const BACKGROUND_PRESETS: Record<string, string> = {
  'studio_white': 'Clean white studio background with soft even lighting',
  'studio_gray': 'Neutral gray studio background with professional portrait lighting',
  'office': 'Modern corporate office background with blurred bookshelves and warm ambient lighting',
  'outdoor': 'Beautiful outdoor background with soft-focus green trees and warm golden hour sunlight',
  'gradient_blue': 'Smooth professional blue gradient background',
  'cityscape': 'Blurred city skyline in the background at sunset',
  'brick_wall': 'Exposed red brick wall background with warm lighting',
  'minimalist': 'Clean minimalist beige background with subtle texture',
  'window_light': 'Bright window with natural soft light in the background',
  'library': 'Warm library with wooden bookshelves in the background, soft depth of field',
};

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

    // Rate limit: 10 background changes per hour
    const rl = await rateLimit({
      key: `bg-change:${user.id}`,
      limit: 10,
      windowMs: 60 * 60 * 1000,
    });
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Rate limit reached. Try again later.' },
        { status: 429, headers: { 'Retry-After': '3600' } },
      );
    }

    const body = await request.json();
    const { headshotId, backgroundPreset, customBackground } = body as {
      headshotId?: string;
      backgroundPreset?: string;
      customBackground?: string;
    };

    if (!headshotId) {
      return NextResponse.json(
        { error: 'headshotId is required' },
        { status: 400 }
      );
    }

    // Determine background description
    let backgroundDescription: string;
    if (backgroundPreset && BACKGROUND_PRESETS[backgroundPreset]) {
      backgroundDescription = BACKGROUND_PRESETS[backgroundPreset];
    } else if (customBackground && customBackground.length <= 300) {
      backgroundDescription = customBackground;
    } else {
      return NextResponse.json(
        {
          error: 'Provide backgroundPreset or customBackground (max 300 chars)',
          availablePresets: Object.keys(BACKGROUND_PRESETS),
        },
        { status: 400 }
      );
    }

    // Verify headshot belongs to user
    const { data: headshot, error: hsError } = await supabase
      .from('generated_headshots')
      .select('id, order_id, storage_path, status, user_id')
      .eq('id', headshotId)
      .eq('user_id', user.id)
      .eq('status', 'completed')
      .single();

    if (hsError || !headshot) {
      return NextResponse.json(
        { error: 'Headshot not found or not ready' },
        { status: 404 }
      );
    }

    // Get signed URL
    const adminClient = createAdminClient();
    const { data: signedData, error: signError } = await adminClient.storage
      .from('headshots')
      .createSignedUrl(headshot.storage_path, 600);

    if (signError || !signedData?.signedUrl) {
      logger.error('[bg-change] Failed to create signed URL:', signError);
      return NextResponse.json(
        { error: 'Failed to access headshot' },
        { status: 500 }
      );
    }

    const replicateToken = process.env.REPLICATE_API_TOKEN;
    if (!replicateToken) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      );
    }

    const editPrompt = `Change only the background to: ${backgroundDescription}. Keep the person's face, expression, outfit, and pose exactly the same. Professional portrait photography.`;

    logger.info(`[bg-change] Launching Flux Kontext for headshot ${headshotId}`);

    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${replicateToken}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait=90',
      },
      body: JSON.stringify({
        model: FLUX_KONTEXT_MODEL,
        input: {
          prompt: editPrompt,
          input_image: signedData.signedUrl,
          aspect_ratio: 'custom',
          width: 768,
          height: 1024,
          safety_tolerance: 2,
          output_format: 'png',
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      logger.error(`[bg-change] Replicate error: ${response.status} ${errText}`);
      return NextResponse.json(
        { error: 'AI generation failed' },
        { status: 502 }
      );
    }

    const prediction = await response.json() as {
      status: string;
      output?: unknown;
      error?: string;
    };

    if (prediction.status !== 'succeeded' || !prediction.output) {
      return NextResponse.json(
        { error: prediction.error || 'Background change failed' },
        { status: 502 }
      );
    }

    const outputUrl = typeof prediction.output === 'string'
      ? prediction.output
      : Array.isArray(prediction.output)
        ? (prediction.output[0] as string)
        : null;

    if (!outputUrl) {
      return NextResponse.json(
        { error: 'No output generated' },
        { status: 502 }
      );
    }

    // Download and store
    const imageResponse = await fetch(outputUrl);
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
    const editedPath = `${user.id}/${headshot.order_id}/edited/${headshot.id}_bg.png`;

    const { error: uploadError } = await adminClient.storage
      .from('headshots')
      .upload(editedPath, imageBuffer, {
        contentType: 'image/png',
        upsert: true,
      });

    if (uploadError) {
      logger.error('[bg-change] Upload failed:', uploadError);
      return NextResponse.json(
        { error: 'Failed to save edited headshot' },
        { status: 500 }
      );
    }

    const { data: resultUrl } = await adminClient.storage
      .from('headshots')
      .createSignedUrl(editedPath, 3600);

    logger.info(`[bg-change] Complete for headshot ${headshotId}`);

    return NextResponse.json({
      success: true,
      editedPath,
      url: resultUrl?.signedUrl || outputUrl,
      originalHeadshotId: headshotId,
      background: backgroundPreset || 'custom',
    });
  } catch (error) {
    logger.error('[bg-change] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
