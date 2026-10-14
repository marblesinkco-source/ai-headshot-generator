import { NextRequest, NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { csrfGuard } from '@/lib/security';
import { rateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

export const maxDuration = 120;

/**
 * Flux Kontext model on Replicate for in-context image editing.
 * Supports outfit/clothing changes while preserving face identity.
 *
 * Best practices:
 *  - denoise_strength 0.6-0.8 for clothing changes
 *  - body masking helps isolate outfit area
 *  - prompt should describe the FULL desired outfit, not just the change
 */
const FLUX_KONTEXT_MODEL = 'black-forest-labs/flux-kontext-pro';

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

    // Rate limit: 10 outfit changes per hour
    const rl = await rateLimit({
      key: `outfit-change:${user.id}`,
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
    const { headshotId, outfitDescription } = body as {
      headshotId?: string;
      outfitDescription?: string;
    };

    if (!headshotId || !outfitDescription) {
      return NextResponse.json(
        { error: 'headshotId and outfitDescription are required' },
        { status: 400 }
      );
    }

    if (outfitDescription.length > 500) {
      return NextResponse.json(
        { error: 'Outfit description must be under 500 characters' },
        { status: 400 }
      );
    }

    // Verify headshot belongs to user and is completed
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

    // Get a signed URL for the headshot image
    const adminClient = createAdminClient();
    const { data: signedData, error: signError } = await adminClient.storage
      .from('headshots')
      .createSignedUrl(headshot.storage_path, 600); // 10 min

    if (signError || !signedData?.signedUrl) {
      logger.error('[outfit-change] Failed to create signed URL:', signError);
      return NextResponse.json(
        { error: 'Failed to access headshot image' },
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

    // Build the editing prompt — describe full outfit for best results
    const editPrompt = `Change the person's outfit to: ${outfitDescription}. Keep the face, expression, and pose exactly the same. Professional portrait lighting.`;

    logger.info(`[outfit-change] Launching Flux Kontext for headshot ${headshotId}`);

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
      logger.error(`[outfit-change] Replicate error: ${response.status} ${errText}`);
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
      logger.error(`[outfit-change] Prediction failed: ${prediction.error}`);
      return NextResponse.json(
        { error: prediction.error || 'Outfit change failed' },
        { status: 502 }
      );
    }

    // Get the output URL
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

    // Download and store the modified headshot
    const imageResponse = await fetch(outputUrl);
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
    const editedPath = `${user.id}/${headshot.order_id}/edited/${headshot.id}_outfit.png`;

    const { error: uploadError } = await adminClient.storage
      .from('headshots')
      .upload(editedPath, imageBuffer, {
        contentType: 'image/png',
        upsert: true,
      });

    if (uploadError) {
      logger.error('[outfit-change] Storage upload failed:', uploadError);
      return NextResponse.json(
        { error: 'Failed to save edited headshot' },
        { status: 500 }
      );
    }

    // Create a signed URL for the result
    const { data: resultUrl } = await adminClient.storage
      .from('headshots')
      .createSignedUrl(editedPath, 3600); // 1 hour

    logger.info(`[outfit-change] Complete for headshot ${headshotId}`);

    return NextResponse.json({
      success: true,
      editedPath,
      url: resultUrl?.signedUrl || outputUrl,
      originalHeadshotId: headshotId,
    });
  } catch (error) {
    logger.error('[outfit-change] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
