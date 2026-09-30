import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import Replicate from 'replicate';
import { createClient } from '@/lib/supabase/server';
import { getCategoryById, type CategoryId } from '@/config/categories';
import { BACKGROUNDS, STYLES, NEGATIVE_PROMPT, QUALITY_SETTINGS } from '@/config/ai';
import { Resend } from 'resend';
import { siteConfig } from '@/config/site';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const url = new URL(request.url);
    const type = url.searchParams.get('type'); // 'training' or null (generation)
    const orderId = url.searchParams.get('orderId');

    const body = await request.json();
    const parsed = replicateWebhookSchema.safeParse(body);

    if (!parsed.success) {
      console.error('Invalid webhook payload:', parsed.error.flatten());
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
    console.error('AI webhook error:', error);
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
  const supabase = await createClient();

  if (!orderId) {
    console.error('Training webhook missing orderId');
    return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });
  }

  if (status === 'failed' || status === 'canceled') {
    console.error(`Training ${trainingId} ${status}:`, error);
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

  // Training succeeded! Extract LoRA weights and start generation
  const url = new URL(request.url);
  const categoryId = (url.searchParams.get('categoryId') || 'headshots') as CategoryId;
  const packageId = url.searchParams.get('packageId') || '';
  const triggerWord = url.searchParams.get('triggerWord') || 'sks';

  // Get LoRA weights URL from training output
  let loraUrl: string | null = null;

  if (typeof output === 'string') {
    loraUrl = output;
  } else if (output && typeof output === 'object') {
    const outputObj = output as Record<string, unknown>;
    loraUrl =
      (outputObj.weights as string) ??
      (outputObj.version as string) ??
      null;
  }

  if (!loraUrl) {
    // Fetch training details to get the weights URL
    try {
      const training = await replicate.trainings.get(trainingId);
      if (training.output) {
        if (typeof training.output === 'string') {
          loraUrl = training.output;
        } else {
          const out = training.output as Record<string, unknown>;
          loraUrl = (out.weights as string) ?? (out.version as string) ?? null;
        }
      }
    } catch (fetchErr) {
      console.error('Failed to fetch training output:', fetchErr);
    }
  }

  if (!loraUrl) {
    console.error('No LoRA weights URL found for training:', trainingId);
    await supabase
      .from('orders')
      .update({ status: 'failed' })
      .eq('id', orderId);
    await sendFailureEmail(supabase, orderId, 'Failed to retrieve trained model weights');
    return NextResponse.json({ received: true });
  }

  // Store LoRA URL in order
  await supabase
    .from('orders')
    .update({ lora_url: loraUrl })
    .eq('id', orderId);

  // Now start generating images using the trained model
  const category = getCategoryById(categoryId);
  if (!category) {
    console.error('Invalid categoryId:', categoryId);
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
    console.error('Order not found:', orderId);
    return NextResponse.json({ received: true });
  }

  // Determine how many images to generate based on package
  const catPkg = category.packages.find((p) => p.id === packageId);
  const maxOutputs = catPkg?.outputCount ?? order.output_count ?? 40;

  // Select backgrounds and styles based on tier
  const tierIndex = category.packages.findIndex((p) => p.id === packageId);
  const bgCount = tierIndex === 0 ? 5 : tierIndex === 1 ? 10 : BACKGROUNDS.length;
  const styleCount = tierIndex === 0 ? 3 : tierIndex === 1 ? 6 : STYLES.length;

  const selectedBackgrounds = BACKGROUNDS.slice(0, bgCount);
  const selectedStyles = STYLES.slice(0, styleCount);

  // Build prompt using category template
  const quality =
    tierIndex === 2
      ? QUALITY_SETTINGS['4k']
      : tierIndex === 1
        ? QUALITY_SETTINGS.hd
        : QUALITY_SETTINGS.standard;

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
        category.negativePrompt
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
        const prediction = await replicate.predictions.create({
          model: FLUX_GENERATE_MODEL,
          input: {
            prompt,
            negative_prompt: category.negativePrompt || NEGATIVE_PROMPT,
            width: quality.width,
            height: quality.height,
            num_inference_steps: quality.steps,
            guidance_scale: quality.guidanceScale,
            num_outputs: 1,
            lora_url: loraUrl,
          },
          webhook: webhookBaseUrl,
          webhook_events_filter: ['completed'],
        });

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
        console.error(`Failed to create prediction for ${styleId}/${backgroundId}:`, err);
        return null;
      }
    })
  );

  const successCount = launchResults.filter(
    (r) => r.status === 'fulfilled' && r.value !== null
  ).length;

  console.log(
    `Training complete for order ${orderId}. Launched ${successCount}/${generations.length} generation predictions.`
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
  const supabase = await createClient();

  // Look up the generation record
  const { data: headshot, error: lookupError } = await supabase
    .from('generated_headshots')
    .select('id, order_id, user_id')
    .eq('prediction_id', predictionId)
    .single();

  if (lookupError || !headshot) {
    console.error('Headshot not found for prediction:', predictionId);
    return NextResponse.json({ received: true }, { status: 200 });
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
      console.error('No output URL for prediction:', predictionId);
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
          console.error('Failed to upload generated headshot:', uploadError);
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
        console.error('Failed to download generated image:', downloadErr);
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
 */
function buildCategoryPrompt(
  template: string,
  triggerWord: string,
  stylePrompt: string,
  backgroundPrompt: string,
  _negativePrompt: string
): string {
  // Replace template placeholders with actual content
  let prompt = template
    .replace('{style_prompt}', stylePrompt)
    .replace('{background_prompt}', backgroundPrompt)
    .replace('{scene_prompt}', backgroundPrompt)
    .replace('{theme_prompt}', backgroundPrompt)
    .replace('{furniture_prompt}', stylePrompt)
    .replace('{room_type}', 'room')
    .replace('{holiday_type}', 'holiday');

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
  supabase: Awaited<ReturnType<typeof createClient>>,
  orderId: string,
  userId: string,
  count: number
) {
  try {
    const { data: orderUser } = await supabase.auth.admin.getUserById(userId);

    if (orderUser?.user?.email) {
      await resend.emails.send({
        from: `${siteConfig.name} <${process.env.EMAIL_FROM || `noreply@${new URL(siteConfig.url).hostname}`}>`,
        to: orderUser.user.email,
        subject: `Your ${count} AI photos are ready!`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a1a1a;">Your photos are ready! 🎉</h2>
            <p style="color: #4a4a4a; line-height: 1.6;">
              We've finished generating <strong>${count}</strong> photos for you using our AI model trained specifically on your images.
            </p>
            <p style="margin: 24px 0;">
              <a href="${siteConfig.url}/dashboard/orders/${orderId}"
                 style="background: #4F46E5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block;">
                View Your Photos
              </a>
            </p>
            <p style="color: #6a6a6a; font-size: 14px;">
              You can download them individually or as a ZIP file from your dashboard.
            </p>
          </div>
        `,
      });
    }
  } catch (emailError) {
    console.error('Failed to send completion email:', emailError);
  }
}

async function sendFailureEmail(
  supabase: Awaited<ReturnType<typeof createClient>>,
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
      await resend.emails.send({
        from: `${siteConfig.name} <${process.env.EMAIL_FROM || `noreply@${new URL(siteConfig.url).hostname}`}>`,
        to: orderUser.user.email,
        subject: 'Issue with your AI photo generation',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a1a1a;">We ran into an issue</h2>
            <p style="color: #4a4a4a; line-height: 1.6;">
              Unfortunately, there was a problem generating your AI photos. Our team has been notified and we'll look into it.
            </p>
            <p style="color: #6a6a6a; font-size: 14px;">
              Error: ${errorMessage}
            </p>
            <p style="color: #4a4a4a;">
              If you need help, please contact us at support@tailorpic.com
            </p>
          </div>
        `,
      });
    }
  } catch (emailError) {
    console.error('Failed to send failure email:', emailError);
  }
}
