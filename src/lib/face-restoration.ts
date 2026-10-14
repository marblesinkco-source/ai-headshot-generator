/**
 * Face restoration utilities using CodeFormer via Replicate API.
 *
 * CodeFormer uses a transformer-based approach for face restoration
 * with an adjustable fidelity slider. The fidelity parameter (0-1)
 * controls the balance between quality and faithfulness to the input:
 *   - 0.5: Maximum quality enhancement
 *   - 0.7: Ideal for headshots (good quality + faithful identity)
 *   - 1.0: Most faithful to input (least enhancement)
 */

import { logger } from '@/lib/logger';

/** CodeFormer model on Replicate */
const CODEFORMER_MODEL = 'sczhou/codeformer';
const CODEFORMER_VERSION = '7bc9565a2ab20ed199ef17834de2c8ef5f860466d5e138b38e956be285062609';

/** Quality score threshold below which face restoration is triggered */
export const FACE_RESTORATION_THRESHOLD = 70;

/** Fidelity slider: 0.7 is ideal for headshots (quality + identity preservation) */
const CODEFORMER_FIDELITY = 0.7;

export interface FaceRestorationResult {
  restored: boolean;
  restoredBuffer?: Buffer;
  error?: string;
}

/**
 * Apply CodeFormer face restoration to a generated headshot image.
 *
 * Called from the webhook pipeline when quality_score < FACE_RESTORATION_THRESHOLD.
 * Uses Replicate's synchronous prediction API for simplicity since the image
 * is already downloaded.
 *
 * @param imageUrl - Public URL of the image to restore (Replicate output URL or Supabase signed URL)
 * @returns The restored image buffer, or an error
 */
export async function restoreFaceWithCodeFormer(
  imageUrl: string
): Promise<FaceRestorationResult> {
  try {
    const replicateToken = process.env.REPLICATE_API_TOKEN;
    if (!replicateToken) {
      return { restored: false, error: 'REPLICATE_API_TOKEN not configured' };
    }

    logger.info(`[face-restoration] Running CodeFormer on image (fidelity=${CODEFORMER_FIDELITY})`);

    // Use Replicate HTTP API directly (avoids importing the full SDK in this module)
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${replicateToken}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait', // Synchronous mode — wait for result
      },
      body: JSON.stringify({
        version: CODEFORMER_VERSION,
        input: {
          image: imageUrl,
          codeformer_fidelity: CODEFORMER_FIDELITY,
          background_enhance: false, // Only restore faces, not background
          face_upsample: true,
          upscale: 1, // No upscaling, just restoration
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error(`[face-restoration] Replicate API error: ${response.status} ${errorText}`);
      return { restored: false, error: `Replicate API error: ${response.status}` };
    }

    const prediction = await response.json() as {
      status: string;
      output?: string;
      error?: string;
    };

    if (prediction.status === 'failed') {
      logger.error(`[face-restoration] CodeFormer failed: ${prediction.error}`);
      return { restored: false, error: prediction.error || 'CodeFormer prediction failed' };
    }

    if (prediction.status !== 'succeeded' || !prediction.output) {
      logger.warn(`[face-restoration] Unexpected status: ${prediction.status}`);
      return { restored: false, error: `Unexpected prediction status: ${prediction.status}` };
    }

    // Download the restored image
    const outputUrl = typeof prediction.output === 'string'
      ? prediction.output
      : (prediction.output as string);

    const imageResponse = await fetch(outputUrl);
    if (!imageResponse.ok) {
      return { restored: false, error: 'Failed to download restored image' };
    }

    const restoredBuffer = Buffer.from(await imageResponse.arrayBuffer());
    logger.info(`[face-restoration] CodeFormer restoration complete (${(restoredBuffer.length / 1024).toFixed(0)} KB)`);

    return { restored: true, restoredBuffer };
  } catch (err) {
    logger.error('[face-restoration] Unexpected error:', err);
    return { restored: false, error: String(err) };
  }
}
