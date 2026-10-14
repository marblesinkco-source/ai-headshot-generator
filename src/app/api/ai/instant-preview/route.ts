import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { csrfGuard } from '@/lib/security';
import { rateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

export const maxDuration = 60; // PuLID-Flux typically takes 10-20s

/**
 * PuLID-Flux model on Replicate for tuning-free identity-preserving headshots.
 * No LoRA training needed — takes a single reference face image and generates
 * headshots preserving the person's identity in ~15 seconds.
 *
 * Cost: ~$0.019/run on A100, ArcFace similarity ~0.72
 */
const PULID_FLUX_MODEL = 'bytedance/flux-pulid';

/** Professional headshot prompts for instant preview variations */
const PREVIEW_PROMPTS = [
  {
    id: 'business_formal',
    prompt: 'A professional corporate headshot photo of this person, wearing a dark business suit with a crisp white shirt, confident and approachable expression, clean studio background with soft professional lighting, high resolution, sharp focus',
  },
  {
    id: 'smart_casual',
    prompt: 'A professional headshot photo of this person, wearing smart casual attire, friendly and relaxed expression, modern office background with soft bokeh, natural lighting, high quality portrait photography',
  },
  {
    id: 'creative_modern',
    prompt: 'A modern professional headshot of this person, wearing contemporary fashion, warm and engaging expression, gradient background, studio lighting with a slight rim light, editorial quality portrait',
  },
  {
    id: 'linkedin_ready',
    prompt: 'A LinkedIn-ready professional headshot of this person, wearing a professional blazer, warm genuine smile, neutral gray studio background, even soft lighting, corporate portrait photography',
  },
  {
    id: 'executive',
    prompt: 'An executive portrait photo of this person, wearing premium tailored suit, authoritative yet approachable expression, dark elegant background, dramatic professional lighting, high-end corporate photography',
  },
];

export async function POST(request: NextRequest) {
  const csrf = csrfGuard(request);
  if (csrf) return csrf;

  try {
    // Auth check
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

    // Rate limit: 5 instant previews per hour per user
    const rl = await rateLimit({
      key: `instant-preview:${user.id}`,
      limit: 5,
      windowMs: 60 * 60 * 1000,
    });
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Preview limit reached. Try again later.' },
        { status: 429, headers: { 'Retry-After': '3600' } },
      );
    }

    const formData = await request.formData();
    const file = formData.get('selfie') as File | null;
    const count = Math.min(5, Math.max(1, parseInt(formData.get('count') as string || '3', 10)));

    if (!file) {
      return NextResponse.json(
        { error: 'A selfie image is required' },
        { status: 400 }
      );
    }

    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only JPG, PNG, and WebP images are accepted' },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Image must be under 10MB' },
        { status: 400 }
      );
    }

    const replicateToken = process.env.REPLICATE_API_TOKEN;
    if (!replicateToken) {
      logger.error('[instant-preview] REPLICATE_API_TOKEN not configured');
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      );
    }

    // Convert the uploaded file to a data URI for Replicate
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString('base64');
    const dataUri = `data:${file.type};base64,${base64}`;

    // Select prompts for the requested count
    const selectedPrompts = PREVIEW_PROMPTS.slice(0, count);

    // Launch PuLID-Flux predictions in parallel
    const predictions = await Promise.allSettled(
      selectedPrompts.map(async ({ id, prompt }) => {
        const response = await fetch('https://api.replicate.com/v1/predictions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${replicateToken}`,
            'Content-Type': 'application/json',
            'Prefer': 'wait=60', // Wait up to 60s for result
          },
          body: JSON.stringify({
            model: PULID_FLUX_MODEL,
            input: {
              main_face_image: dataUri,
              prompt,
              num_steps: 20,
              guidance_scale: 4.0,
              id_weight: 0.6,
              width: 768,
              height: 1024,
              num_outputs: 1,
              seed: Math.floor(Math.random() * 2147483647),
            },
          }),
        });

        if (!response.ok) {
          const err = await response.text();
          logger.error(`[instant-preview] Replicate error for ${id}: ${response.status} ${err}`);
          return { id, url: null, error: `Generation failed: ${response.status}` };
        }

        const result = await response.json() as {
          status: string;
          output?: unknown;
          error?: string;
        };

        if (result.status === 'succeeded' && result.output) {
          const outputUrl = Array.isArray(result.output)
            ? (result.output[0] as string)
            : typeof result.output === 'string'
              ? result.output
              : null;
          return { id, url: outputUrl, error: null };
        }

        return {
          id,
          url: null,
          error: result.error || `Prediction ${result.status}`,
        };
      })
    );

    // Collect results
    const previews = predictions
      .map((r) => (r.status === 'fulfilled' ? r.value : null))
      .filter(Boolean);

    const successCount = previews.filter((p) => p && p.url).length;

    logger.info(
      `[instant-preview] Generated ${successCount}/${count} previews for user ${user.id}`
    );

    return NextResponse.json({
      previews,
      generated: successCount,
      total: count,
    });
  } catch (error) {
    logger.error('[instant-preview] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
