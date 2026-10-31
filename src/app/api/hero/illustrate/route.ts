import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient, createClient } from '@/lib/supabase/server';
import { STORY_CONFIG } from '@/config/hero-storybook';
import { rateLimit } from '@/lib/rate-limit';
import { csrfGuard } from '@/lib/security';
import { logger } from '@/lib/logger';

export const maxDuration = 300; // 5 min for illustration batch

const illustrateSchema = z.object({
  storyId: z.string().uuid('Invalid story ID'),
});

/**
 * POST /api/hero/illustrate
 * Generates illustrations for all story pages using flux-pulid.
 * Called after payment is confirmed (story status = 'paid').
 * Uses the hero's uploaded face photo for face-preserving generation.
 */
export async function POST(req: NextRequest) {
  const csrf = csrfGuard(req);
  if (csrf) return csrf;

  try {
    // Auth check
    const userClient = await createClient();
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Rate limit
    const rl = await rateLimit({
      key: `hero-illustrate:${user.id}`,
      limit: 3,
      windowMs: 60 * 1000,
    });
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '60' } },
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const parsed = illustrateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { storyId } = parsed.data;
    const supabase = createAdminClient();

    // Fetch story
    const { data: story, error: storyError } = await supabase
      .from('hero_stories')
      .select('*')
      .eq('id', storyId)
      .single();

    if (storyError || !story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    if (story.user_id !== user.id) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    if (story.status !== 'paid') {
      return NextResponse.json(
        { error: 'Story must be paid before illustration generation' },
        { status: 400 },
      );
    }

    const replicateToken = process.env.REPLICATE_API_TOKEN;
    if (!replicateToken) {
      logger.error('[hero-illustrate] REPLICATE_API_TOKEN not configured');
      return NextResponse.json(
        { error: 'Illustration service unavailable' },
        { status: 503 },
      );
    }

    // Get the hero's face photo
    const { data: photos } = await supabase
      .from('hero_story_photos')
      .select('file_path')
      .eq('story_id', storyId)
      .order('created_at', { ascending: true })
      .limit(1);

    if (!photos || photos.length === 0) {
      return NextResponse.json(
        { error: 'No hero photo found. Please upload a photo first.' },
        { status: 400 },
      );
    }

    // Download face photo from Supabase storage
    const photoPath = photos[0].file_path;
    const { data: photoData, error: downloadError } = await supabase.storage
      .from('photos')
      .download(photoPath);

    if (downloadError || !photoData) {
      logger.error('[hero-illustrate] Failed to download hero photo:', downloadError);
      return NextResponse.json(
        { error: 'Failed to load hero photo' },
        { status: 500 },
      );
    }

    // Convert photo to base64 data URI
    const photoBuffer = Buffer.from(await photoData.arrayBuffer());
    const photoBase64 = `data:image/jpeg;base64,${photoBuffer.toString('base64')}`;

    // Fetch story pages
    const { data: pages, error: pagesError } = await supabase
      .from('hero_story_pages')
      .select('id, page_number, scene_prompt, status')
      .eq('story_id', storyId)
      .order('page_number', { ascending: true });

    if (pagesError || !pages || pages.length === 0) {
      return NextResponse.json(
        { error: 'No story pages found' },
        { status: 400 },
      );
    }

    // Update story status to generating illustrations
    await supabase
      .from('hero_stories')
      .update({ status: 'generating', generation_progress: 0 })
      .eq('id', storyId);

    // Generate illustrations in batches of 3 to avoid rate limits
    const BATCH_SIZE = 3;
    let completedCount = 0;
    const totalPages = pages.length;

    for (let i = 0; i < totalPages; i += BATCH_SIZE) {
      const batch = pages.slice(i, i + BATCH_SIZE);

      const results = await Promise.allSettled(
        batch.map(async (page) => {
          try {
            const imageUrl = await generateIllustration(
              replicateToken,
              photoBase64,
              page.scene_prompt,
            );

            // Save illustration URL to page
            await supabase
              .from('hero_story_pages')
              .update({
                illustration_url: imageUrl,
                status: 'completed',
              })
              .eq('id', page.id);

            return { pageId: page.id, success: true, imageUrl };
          } catch (err) {
            logger.error(`[hero-illustrate] Failed to generate illustration for page ${page.page_number}:`, err);

            await supabase
              .from('hero_story_pages')
              .update({ status: 'failed' })
              .eq('id', page.id);

            return { pageId: page.id, success: false };
          }
        }),
      );

      completedCount += batch.length;
      const progress = Math.round((completedCount / totalPages) * 100);

      await supabase
        .from('hero_stories')
        .update({ generation_progress: progress })
        .eq('id', storyId);

      // Brief pause between batches to respect rate limits
      if (i + BATCH_SIZE < totalPages) {
        await new Promise((r) => setTimeout(r, 2000));
      }
    }

    // Check how many succeeded
    const { count: successCount } = await supabase
      .from('hero_story_pages')
      .select('id', { count: 'exact', head: true })
      .eq('story_id', storyId)
      .eq('status', 'completed');

    const finalStatus = (successCount || 0) >= totalPages * 0.5 ? 'completed' : 'failed';

    await supabase
      .from('hero_stories')
      .update({
        status: finalStatus,
        generation_progress: 100,
        ...(finalStatus === 'failed' ? { error_message: 'Some illustrations failed to generate' } : {}),
      })
      .eq('id', storyId);

    return NextResponse.json({
      success: finalStatus === 'completed',
      storyId,
      illustratedPages: successCount || 0,
      totalPages,
    });
  } catch (err) {
    logger.error('[hero-illustrate] Error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

/**
 * Generate a single illustration using flux-pulid on Replicate.
 * Same pattern as /api/ai/instant-preview.
 */
async function generateIllustration(
  apiToken: string,
  faceImageBase64: string,
  scenePrompt: string,
): Promise<string> {
  const res = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
      'Prefer': 'wait=120',
    },
    body: JSON.stringify({
      model: 'bytedance/flux-pulid',
      input: {
        main_face_image: faceImageBase64,
        prompt: scenePrompt,
        num_steps: STORY_CONFIG.imageSteps,
        guidance_scale: STORY_CONFIG.guidanceScale,
        id_weight: STORY_CONFIG.idWeight,
        width: STORY_CONFIG.imageWidth,
        height: STORY_CONFIG.imageHeight,
        num_outputs: 1,
        seed: Math.floor(Math.random() * 2147483647),
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Replicate API error ${res.status}: ${errText}`);
  }

  const prediction = await res.json() as {
    id: string;
    status: string;
    output?: unknown;
    error?: string;
    urls?: { get?: string };
  };

  // If completed synchronously
  if (prediction.status === 'succeeded' && prediction.output) {
    return extractImageUrl(prediction.output);
  }

  if (prediction.status === 'failed') {
    throw new Error(`Prediction failed: ${prediction.error || 'unknown'}`);
  }

  // Poll for completion
  const pollUrl = prediction.urls?.get || `https://api.replicate.com/v1/predictions/${prediction.id}`;
  const maxPollTime = 180_000; // 3 minutes per image
  const pollInterval = 3_000;
  const startTime = Date.now();

  while (Date.now() - startTime < maxPollTime) {
    await new Promise((r) => setTimeout(r, pollInterval));

    const pollRes = await fetch(pollUrl, {
      headers: { 'Authorization': `Bearer ${apiToken}` },
    });

    if (!pollRes.ok) throw new Error(`Poll error: ${pollRes.status}`);

    const pollData = await pollRes.json() as {
      status: string;
      output?: unknown;
      error?: string;
    };

    if (pollData.status === 'succeeded' && pollData.output) {
      return extractImageUrl(pollData.output);
    }

    if (pollData.status === 'failed' || pollData.status === 'canceled') {
      throw new Error(`Prediction ${pollData.status}: ${pollData.error || 'unknown'}`);
    }
  }

  throw new Error('Illustration generation timed out');
}

function extractImageUrl(output: unknown): string {
  if (typeof output === 'string') return output;
  if (Array.isArray(output) && output.length > 0) {
    return typeof output[0] === 'string' ? output[0] : String(output[0]);
  }
  throw new Error('Unexpected output format');
}
