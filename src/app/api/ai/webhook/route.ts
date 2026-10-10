import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import Replicate from 'replicate';
import crypto from 'crypto';
import { createAdminClient } from '@/lib/supabase/server';
import { getCategoryById, type CategoryId } from '@/config/categories';
import { BACKGROUNDS, STYLES, QUALITY_SETTINGS } from '@/config/ai';
import { Resend } from 'resend';
import { siteConfig } from '@/config/site';
import { buildPhotosReadyEmail, buildGenerationFailedEmail } from '@/lib/emails';
import { logger } from '@/lib/logger';

export const maxDuration = 300;

// Lazy initialization — avoids build-time crash when env vars are missing
function getReplicate() {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) throw new Error('REPLICATE_API_TOKEN not configured');
  return new Replicate({ auth: token });
}

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

/**
 * Verify Replicate webhook signature using HMAC-SHA256.
 * Replicate signs webhooks with the secret key — the signature is in the
 * `webhook-id`, `webhook-timestamp`, and `webhook-signature` headers.
 */
function verifyReplicateWebhook(body: string, headers: Headers, secret: string): boolean {
  try {
    const webhookId = headers.get('webhook-id');
    const webhookTimestamp = headers.get('webhook-timestamp');
    const webhookSignature = headers.get('webhook-signature');

    if (!webhookId || !webhookTimestamp || !webhookSignature) {
      return false;
    }

    // Check timestamp to prevent replay attacks (5-minute tolerance)
    const timestamp = parseInt(webhookTimestamp, 10);
    const now = Math.floor(Date.now() / 1000);
    if (Math.abs(now - timestamp) > 300) {
      return false;
    }

    // Replicate webhook secrets are base64-encoded, prefixed with "whsec_"
    const secretBytes = Buffer.from(
      secret.startsWith('whsec_') ? secret.slice(6) : secret,
      'base64'
    );

    const signedContent = `${webhookId}.${webhookTimestamp}.${body}`;
    const expectedSignature = crypto
      .createHmac('sha256', secretBytes)
      .update(signedContent)
      .digest('base64');

    // webhook-signature can contain multiple signatures separated by space
    const signatures = webhookSignature.split(' ');
    return signatures.some((sig) => {
      const sigValue = sig.startsWith('v1,') ? sig.slice(3) : sig;
      try {
        return crypto.timingSafeEqual(
          Buffer.from(expectedSignature),
          Buffer.from(sigValue)
        );
      } catch {
        return false;
      }
    });
  } catch {
    return false;
  }
}

/** Flux generation model (runs with trained LoRA weights) */
const FLUX_GENERATE_MODEL = 'black-forest-labs/flux-dev';

const replicateWebhookSchema = z.object({
  id: z.string(),
  status: z.enum(['starting', 'processing', 'succeeded', 'failed', 'canceled']),
  output: z.unknown().optional(),
  error: z.string().nullable().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Validate Replicate webhook signature if signing key is configured
    const webhookSecret = process.env.REPLICATE_WEBHOOK_SECRET;
    const body = await request.text();

    if (!webhookSecret) {
      logger.error('REPLICATE_WEBHOOK_SECRET not configured — rejecting webhook');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    const isValid = verifyReplicateWebhook(body, request.headers, webhookSecret);

    if (!isValid) {
      logger.error('Invalid Replicate webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const url = new URL(request.url);
    const type = url.searchParams.get('type'); // 'training' or null (generation)
    const orderId = url.searchParams.get('orderId');

    const parsed = replicateWebhookSchema.safeParse(JSON.parse(body));

    if (!parsed.success) {
      logger.error('Invalid webhook payload:', parsed.error.flatten());
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const { id: predictionId, status, output, error: predictionError } = parsed.data;

    // Route to the appropriate handler
    if (type === 'training') {
      return handleTrainingComplete(request, predictionId, status, output, predictionError, orderId);
    } else {
      return handleGenerationComplete(predictionId, status, output, predictionError);
    }
  } catch (error) {
    logger.error('AI webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// =============================================================================
// TRAINING COMPLETION HANDLER
// =============================================================================

async function handleTrainingComplete(
  request: NextRequest,
  trainingId: string,
  status: string,
  output: unknown,
  error: string | null | undefined,
  orderId: string | null
) {
  const supabase = createAdminClient();

  if (!orderId) {
    logger.error('Training webhook missing orderId');
    return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });
  }

  if (status === 'failed' || status === 'canceled') {
    logger.error(`Training ${trainingId} ${status}:`, error);
    await supabase
      .from('orders')
      .update({ status: 'failed' })
      .eq('id', orderId);

    // Send failure email
    await sendFailureEmail(supabase, orderId, error || `Training ${status}`);

    return NextResponse.json({ received: true });
  }

  if (status !== 'succeeded') {
    return NextResponse.json({ received: true });
  }

  // ─── Idempotency guard: check if generation was already launched ──────────
  const { count: existingGenerations } = await supabase
    .from('generated_headshots')
    .select('id', { count: 'exact', head: true })
    .eq('order_id', orderId);

  if (existingGenerations && existingGenerations > 0) {
    logger.info(`[ai-webhook] Idempotency: order ${orderId} already has ${existingGenerations} generation rows — skipping duplicate training webhook`);
    return NextResponse.json({ received: true, skipped: 'idempotent' });
  }

  // Training succeeded! Extract LoRA weights and start generation
  const url = new URL(request.url);
  const categoryId = (url.searchParams.get('categoryId') || 'headshots') as CategoryId;
  const packageId = url.searchParams.get('packageId') || '';
  const triggerWord = url.searchParams.get('triggerWord') || 'sks';

  // Get the trained model version or LoRA weights URL from training output
  // Replicate training output can be a version string, a weights URL, or an object with either
  let trainedModelVersion: string | null = null;
  let loraWeightsUrl: string | null = null;

  if (typeof output === 'string') {
    // Could be a model version (owner/model:version) or a URL
    if (output.startsWith('http')) {
      loraWeightsUrl = output;
    } else {
      trainedModelVersion = output;
    }
  } else if (output && typeof output === 'object') {
    const outputObj = output as Record<string, unknown>;
    trainedModelVersion = (outputObj.version as string) ?? null;
    loraWeightsUrl = (outputObj.weights as string) ?? null;
  }

  // If we didn't get it from the webhook payload, fetch the training details
  if (!trainedModelVersion && !loraWeightsUrl) {
    try {
      const training = await getReplicate().trainings.get(trainingId);
      if (training.output) {
        if (typeof training.output === 'string') {
          if (training.output.startsWith('http')) {
            loraWeightsUrl = training.output;
          } else {
            trainedModelVersion = training.output;
          }
        } else {
          const out = training.output as Record<string, unknown>;
          trainedModelVersion = (out.version as string) ?? null;
          loraWeightsUrl = (out.weights as string) ?? null;
        }
      }
    } catch (fetchErr) {
      logger.error('Failed to fetch training output:', fetchErr);
    }
  }

  if (!trainedModelVersion && !loraWeightsUrl) {
    logger.error('No trained model version or LoRA weights found for training:', trainingId);
    await supabase
      .from('orders')
      .update({ status: 'failed' })
      .eq('id', orderId);
    await sendFailureEmail(supabase, orderId, 'Failed to retrieve trained model weights');
    return NextResponse.json({ received: true });
  }

  // Store LoRA URL/version in order
  await supabase
    .from('orders')
    .update({ lora_url: loraWeightsUrl || trainedModelVersion })
    .eq('id', orderId);

  // Now start generating images using the trained model
  const category = getCategoryById(categoryId);
  if (!category) {
    logger.error('Invalid categoryId:', categoryId);
    await supabase
      .from('orders')
      .update({ status: 'failed' })
      .eq('id', orderId);
    return NextResponse.json({ received: true });
  }

  // Get order details for user_id
  const { data: order } = await supabase
    .from('orders')
    .select('user_id, output_count')
    .eq('id', orderId)
    .single();

  if (!order) {
    logger.error('Order not found:', orderId);
    return NextResponse.json({ received: true });
  }

  // Determine how many images to generate based on package
  const catPkg = category.packages.find((p) => p.id === packageId);
  const maxOutputs = catPkg?.outputCount ?? order.output_count ?? 40;

  // ─── Tier-aware quality mapping ───────────────────────────────────────────
  // Headshots tier ladder (indexes 0-5):
  //   0: TailorPic 1  → standard
  //   1: Lite          → standard
  //   2: Basic         → standard
  //   3: Starter       → hd
  //   4: Professional  → hd
  //   5: Executive     → 4k
  const tierIndex = category.packages.findIndex((p) => p.id === packageId);

  const quality = tierIndex >= 5
    ? QUALITY_SETTINGS['4k']
    : tierIndex >= 3
      ? QUALITY_SETTINGS.hd
      : QUALITY_SETTINGS.standard;

  // ─── Tier-aware style & background selection ──────────────────────────────
  // Lower tiers get fewer combinations; top tiers get all
  let bgCount: number;
  let styleCount: number;

  if (tierIndex <= 0) {
    // TailorPic 1 (1 photo): 1 style × 1 background
    bgCount = 1;
    styleCount = 1;
  } else if (tierIndex === 1) {
    // Lite (5 photos): 5 backgrounds × 1 style = 5
    bgCount = 5;
    styleCount = 1;
  } else if (tierIndex === 2) {
    // Basic (10 photos): 5 backgrounds × 2 styles = 10
    bgCount = 5;
    styleCount = 2;
  } else if (tierIndex === 3) {
    // Starter (40 photos): 10 backgrounds × 4 styles = 40
    bgCount = 10;
    styleCount = 4;
  } else if (tierIndex === 4) {
    // Professional (80 photos): 10 backgrounds × 8 styles = 80
    bgCount = 10;
    styleCount = 8;
  } else {
    // Executive (160 photos): 15 backgrounds × 11 styles = 165 (cap at maxOutputs)
    bgCount = BACKGROUNDS.length;
    styleCount = STYLES.length;
  }

  const selectedBackgrounds = BACKGROUNDS.slice(0, Math.min(bgCount, BACKGROUNDS.length));
  const selectedStyles = STYLES.slice(0, Math.min(styleCount, STYLES.length));

  // Generate style x background combinations up to maxOutputs
  const generations: Array<{ styleId: string; backgroundId: string; prompt: string }> = [];
  let count = 0;

  for (const style of selectedStyles) {
    for (const bg of selectedBackgrounds) {
      if (count >= maxOutputs) break;

      // Build prompt using category's promptTemplate with LoRA trigger word
      const prompt = buildCategoryPrompt(
        category.promptTemplate,
        triggerWord,
        style.prompt,
        bg.prompt,
        categoryId
      );

      generations.push({
        styleId: style.id,
        backgroundId: bg.id,
        prompt,
      });
      count++;
    }
    if (count >= maxOutputs) break;
  }

  // Fire off generation predictions
  const webhookBaseUrl = `${siteConfig.url}/api/ai/webhook`;

  const launchResults = await Promise.allSettled(
    generations.map(async ({ styleId, backgroundId, prompt }) => {
      try {
        // Flux-dev prediction input — no negative_prompt (Flux-dev ignores it)
        const predictionInput: Record<string, unknown> = {
          prompt,
          width: quality.width,
          height: quality.height,
          num_inference_steps: quality.steps,
          guidance_scale: quality.guidanceScale,
          num_outputs: 1,
        };

        // If we have a LoRA weights URL, pass it to flux-dev via extra_lora
        if (loraWeightsUrl) {
          predictionInput.extra_lora = loraWeightsUrl;
          predictionInput.extra_lora_scale = 0.8;
        }

        const replicateClient = getReplicate();
        const predictionOptions: Parameters<typeof replicateClient.predictions.create>[0] = {
          input: predictionInput,
          webhook: webhookBaseUrl,
          webhook_events_filter: ['completed', 'failed'],
        };

        // Use trained model version if available, otherwise use base flux-dev
        if (trainedModelVersion) {
          // Trained model version is a full version string
          predictionOptions.version = trainedModelVersion;
        } else {
          predictionOptions.model = FLUX_GENERATE_MODEL;
        }

        const prediction = await replicateClient.predictions.create(predictionOptions);

        // Record in DB
        await supabase.from('generated_headshots').insert({
          order_id: orderId,
          user_id: order.user_id,
          prediction_id: prediction.id,
          style_id: styleId,
          background_id: backgroundId,
          status: 'processing',
          prompt,
        });

        return prediction.id;
      } catch (err) {
        logger.error(`Failed to create prediction for ${styleId}/${backgroundId}:`, err);
        return null;
      }
    })
  );

  const successCount = launchResults.filter(
    (r) => r.status === 'fulfilled' && r.value !== null
  ).length;

  logger.info(
    `[ai-webhook] Training complete for order ${orderId}. Launched ${successCount}/${generations.length} generation predictions (tier ${tierIndex}, quality ${tierIndex >= 5 ? '4k' : tierIndex >= 3 ? 'hd' : 'standard'}).`
  );

  if (successCount === 0) {
    await supabase
      .from('orders')
      .update({ status: 'failed' })
      .eq('id', orderId);
    await sendFailureEmail(supabase, orderId, 'Failed to start image generation');
  }

  return NextResponse.json({ received: true, generationsLaunched: successCount });
}

// =============================================================================
// GENERATION COMPLETION HANDLER
// =============================================================================

async function handleGenerationComplete(
  predictionId: string,
  status: string,
  output: unknown,
  predictionError: string | null | undefined
) {
  const supabase = createAdminClient();

  // Look up the generation record
  const { data: headshot, error: lookupError } = await supabase
    .from('generated_headshots')
    .select('id, order_id, user_id, status')
    .eq('prediction_id', predictionId)
    .single();

  if (lookupError || !headshot) {
    logger.error('Headshot not found for prediction:', predictionId);
    return NextResponse.json({ received: true }, { status: 200 });
  }

  // ─── Idempotency: skip if already processed ──────────────────────────────
  if (headshot.status === 'completed' || headshot.status === 'failed') {
    logger.info(`[ai-webhook] Generation ${predictionId} already ${headshot.status} — skipping duplicate webhook`);
    return NextResponse.json({ received: true, skipped: 'idempotent' });
  }

  if (status === 'succeeded') {
    // Get the output URL(s)
    let outputUrl: string | null = null;

    if (Array.isArray(output)) {
      outputUrl = output[0] as string;
    } else if (typeof output === 'string') {
      outputUrl = output;
    }

    if (!outputUrl) {
      logger.error('No output URL for prediction:', predictionId);
      await supabase
        .from('generated_headshots')
        .update({ status: 'failed', error: 'No output generated' })
        .eq('id', headshot.id);
    } else {
      // Download the generated image and upload to our storage
      try {
        const response = await fetch(outputUrl);
        const imageBuffer = Buffer.from(await response.arrayBuffer());
        const storagePath = `${headshot.user_id}/${headshot.order_id}/generated/${headshot.id}.png`;

        const { error: uploadError } = await supabase.storage
          .from('headshots')
          .upload(storagePath, imageBuffer, {
            contentType: 'image/png',
            upsert: true,
          });

        if (uploadError) {
          logger.error('Failed to upload generated headshot:', uploadError);
          await supabase
            .from('generated_headshots')
            .update({ status: 'failed', error: 'Storage upload failed' })
            .eq('id', headshot.id);
        } else {
          await supabase
            .from('generated_headshots')
            .update({
              status: 'completed',
              storage_path: storagePath,
              completed_at: new Date().toISOString(),
            })
            .eq('id', headshot.id);
        }
      } catch (downloadErr) {
        logger.error('Failed to download generated image:', downloadErr);
        await supabase
          .from('generated_headshots')
          .update({ status: 'failed', error: 'Failed to download generated image' })
          .eq('id', headshot.id);
      }
    }
  } else if (status === 'failed' || status === 'canceled') {
    await supabase
      .from('generated_headshots')
      .update({
        status: 'failed',
        error: predictionError || `Prediction ${status}`,
      })
      .eq('id', headshot.id);
  } else {
    // Still processing, just acknowledge
    return NextResponse.json({ received: true });
  }

  // Check if all headshots for this order are done
  const { count: pendingCount } = await supabase
    .from('generated_headshots')
    .select('id', { count: 'exact', head: true })
    .eq('order_id', headshot.order_id)
    .eq('status', 'processing');

  if (pendingCount === 0) {
    // All generations complete
    const { count: completedCount } = await supabase
      .from('generated_headshots')
      .select('id', { count: 'exact', head: true })
      .eq('order_id', headshot.order_id)
      .eq('status', 'completed');

    const finalStatus = (completedCount || 0) > 0 ? 'completed' : 'failed';

    await supabase
      .from('orders')
      .update({
        status: finalStatus,
        headshot_count: completedCount || 0,
        completed_at: new Date().toISOString(),
      })
      .eq('id', headshot.order_id);

    // Send completion email
    if (finalStatus === 'completed') {
      await sendCompletionEmail(supabase, headshot.order_id, headshot.user_id, completedCount || 0);
    } else {
      await sendFailureEmail(supabase, headshot.order_id, 'Image generation failed');
    }
  }

  return NextResponse.json({ received: true });
}

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Build a category-aware prompt using the category's template and LoRA trigger word.
 *
 * NOTE: Flux-dev does NOT support negative prompts, so we do not inject one.
 * The _categoryId parameter is used for category-specific placeholder handling.
 */
function buildCategoryPrompt(
  template: string,
  triggerWord: string,
  stylePrompt: string,
  backgroundPrompt: string,
  categoryId: string
): string {
  // Replace template placeholders with actual content
  let prompt = template
    .replace('{style_prompt}', stylePrompt)
    .replace('{background_prompt}', backgroundPrompt);

  // Category-specific placeholder handling
  switch (categoryId) {
    case 'dating':
    case 'couple-engagement':
      // {scene_prompt} → background context
      prompt = prompt.replace('{scene_prompt}', backgroundPrompt);
      break;

    case 'baby-shower':
    case 'holiday-cards':
      // {theme_prompt} → background/mood context
      prompt = prompt.replace('{theme_prompt}', backgroundPrompt);
      break;

    case 'real-estate':
      // {room_type} → derive from background context or default
      prompt = prompt
        .replace('{room_type}', 'modern living space')
        .replace('{furniture_prompt}', stylePrompt);
      break;

    case 'avatars':
      // {character_prompt} → style-based character description
      prompt = prompt.replace('{character_prompt}', stylePrompt);
      break;

    default:
      break;
  }

  // Holiday-specific: replace {holiday_type} if still present
  if (prompt.includes('{holiday_type}')) {
    prompt = prompt.replace('{holiday_type}', 'festive holiday');
  }

  // Clean up any remaining unreplaced placeholders
  prompt = prompt.replace(/\{[a-z_]+\}/g, '');

  // Inject the LoRA trigger word
  // Replace "a person" / "of a person" with the trigger word for face-based categories
  prompt = prompt
    .replace(/\ba person\b/gi, triggerWord)
    .replace(/\bof a pet\b/gi, `of ${triggerWord}`)
    .replace(/\ba pet\b/gi, triggerWord);

  // If trigger word wasn't naturally injected, prepend it
  if (!prompt.includes(triggerWord)) {
    prompt = `A photo of ${triggerWord}. ${prompt}`;
  }

  return prompt;
}

async function sendCompletionEmail(
  supabase: ReturnType<typeof createAdminClient>,
  orderId: string,
  userId: string,
  count: number
) {
  try {
    const { data: orderUser } = await supabase.auth.admin.getUserById(userId);

    if (orderUser?.user?.email) {
      const resendClient = getResend();
      if (!resendClient) {
        logger.warn('Resend not configured — skipping completion email');
        return;
      }
      const { subject, html } = buildPhotosReadyEmail({ orderId, count });
      await resendClient.emails.send({
        from: `${siteConfig.name} <${process.env.EMAIL_FROM || `noreply@${new URL(siteConfig.url).hostname}`}>`,
        to: orderUser.user.email,
        subject,
        html,
      });
    }
  } catch (emailError) {
    logger.error('Failed to send completion email:', emailError);
  }
}

async function sendFailureEmail(
  supabase: ReturnType<typeof createAdminClient>,
  orderId: string,
  errorMessage: string
) {
  try {
    const { data: order } = await supabase
      .from('orders')
      .select('user_id')
      .eq('id', orderId)
      .single();

    if (!order) return;

    const { data: orderUser } = await supabase.auth.admin.getUserById(order.user_id);

    if (orderUser?.user?.email) {
      const resendClient = getResend();
      if (!resendClient) {
        logger.warn('Resend not configured — skipping failure email');
        return;
      }
      const { subject, html } = buildGenerationFailedEmail({ errorMessage });
      await resendClient.emails.send({
        from: `${siteConfig.name} <${process.env.EMAIL_FROM || `noreply@${new URL(siteConfig.url).hostname}`}>`,
        to: orderUser.user.email,
        subject,
        html,
      });
    }
  } catch (emailError) {
    logger.error('Failed to send failure email:', emailError);
  }
}
