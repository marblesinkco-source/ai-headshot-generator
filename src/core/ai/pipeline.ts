/**
 * AI headshot generation pipeline.
 *
 * Orchestrates the end-to-end flow:
 *   1. Fetch uploaded photos from storage
 *   2. Train a model on the user's face
 *   3. Generate headshots for each style/background combination
 *   4. Save results to storage and database
 *   5. Update order status
 *   6. Send email notification
 */

import { createAdminClient } from "@/lib/supabase/server";
import { getAIProvider } from "./index";
import { getStorageProvider } from "../storage";
import { getEmailProvider } from "../email";
import type { HeadshotStyle, HeadshotBackground, PredictionState } from "./types";

// ---------------------------------------------------------------------------
// Default styles & backgrounds
// ---------------------------------------------------------------------------

const DEFAULT_STYLES: HeadshotStyle[] = [
  {
    id: "professional",
    label: "Professional",
    prompt:
      "a professional corporate headshot of {trigger}, wearing business attire, studio lighting, sharp focus, 8k",
    negativePrompt: "blurry, casual, cartoon, illustration",
  },
  {
    id: "creative",
    label: "Creative",
    prompt:
      "a creative artistic headshot of {trigger}, dramatic lighting, modern style, high fashion, 8k",
    negativePrompt: "blurry, low quality, distorted",
  },
  {
    id: "casual",
    label: "Casual",
    prompt:
      "a friendly casual headshot of {trigger}, natural lighting, warm smile, approachable, 8k",
    negativePrompt: "blurry, dark, unflattering",
  },
];

const DEFAULT_BACKGROUNDS: HeadshotBackground[] = [
  { id: "studio-gray", label: "Studio Gray", promptFragment: "plain gray studio background" },
  { id: "studio-white", label: "Studio White", promptFragment: "clean white background" },
  { id: "office", label: "Office", promptFragment: "modern office background with soft bokeh" },
  { id: "outdoor", label: "Outdoor", promptFragment: "outdoor background with natural greenery, bokeh" },
];

// ---------------------------------------------------------------------------
// Pipeline
// ---------------------------------------------------------------------------

/** How long to wait between status polls (ms) */
const POLL_INTERVAL = 10_000;

/** Maximum time to wait for a single prediction (ms) */
const MAX_POLL_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Process a paid order end-to-end.
 *
 * This is typically called from a webhook handler or background job
 * after payment is confirmed.
 */
export async function processOrder(orderId: string): Promise<void> {
  const supabase = createAdminClient();
  const ai = getAIProvider();
  const storage = getStorageProvider();
  const email = getEmailProvider();

  // -----------------------------------------------------------------------
  // 1. Load order and uploaded photos
  // -----------------------------------------------------------------------

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*, uploaded_photos(*)")
    .eq("id", orderId)
    .single();

  if (orderError || !order) {
    throw new Error(`Order ${orderId} not found: ${orderError?.message}`);
  }

  const photos = order.uploaded_photos ?? [];
  if (photos.length === 0) {
    throw new Error(`Order ${orderId} has no uploaded photos`);
  }

  // Get the user's email for notifications
  const { data: profile } = await supabase
    .from("profiles")
    .select("email, full_name")
    .eq("id", order.user_id)
    .single();

  try {
    // Update status to processing
    await supabase
      .from("orders")
      .update({ status: "processing" })
      .eq("id", orderId);

    // -------------------------------------------------------------------
    // 2. Get signed URLs for training images
    // -------------------------------------------------------------------

    const imageUrls = await Promise.all(
      photos.map(async (photo: { storage_path: string }) => {
        const url = await storage.getSignedUrl(
          "uploads",
          photo.storage_path,
          3600, // 1 hour expiry
        );
        return url;
      }),
    );

    // -------------------------------------------------------------------
    // 3. Train model on user's photos
    // -------------------------------------------------------------------

    const triggerWord = `sks_${orderId.slice(0, 8)}`;

    const webhookBase = process.env.NEXT_PUBLIC_APP_URL;

    const trainResult = await ai.trainModel(imageUrls, {
      triggerWord,
      steps: 1200,
      webhookUrl: webhookBase
        ? `${webhookBase}/api/webhooks/ai?orderId=${orderId}&type=train`
        : undefined,
      metadata: { orderId, userId: order.user_id },
    });

    // Poll until training completes
    const trainedStatus = await pollUntilDone(
      ai,
      trainResult.predictionId,
    );

    if (trainedStatus.state === "failed") {
      throw new Error(
        `Training failed for order ${orderId}: ${trainedStatus.error}`,
      );
    }

    // -------------------------------------------------------------------
    // 4. Generate headshots for every style x background combination
    // -------------------------------------------------------------------

    const styles = DEFAULT_STYLES;
    const backgrounds = DEFAULT_BACKGROUNDS;

    // Generate in parallel batches to stay within rate limits
    const BATCH_SIZE = 4;
    const combos = styles.flatMap((style) =>
      backgrounds.map((bg) => ({ style, background: bg })),
    );

    const generatedImages: Array<{
      url: string;
      style: HeadshotStyle;
      background: HeadshotBackground;
    }> = [];

    for (let i = 0; i < combos.length; i += BATCH_SIZE) {
      const batch = combos.slice(i, i + BATCH_SIZE);

      const results = await Promise.all(
        batch.map(async ({ style, background }) => {
          const prompt = style.prompt
            .replace("{trigger}", triggerWord)
            .concat(`, ${background.promptFragment}`);

          const genResult = await ai.generateHeadshots(
            trainResult.modelId,
            {
              prompt,
              negativePrompt: style.negativePrompt,
              numImages: 1,
              resolution: "1024x1024",
              webhookUrl: webhookBase
                ? `${webhookBase}/api/webhooks/ai?orderId=${orderId}&type=generate`
                : undefined,
            },
          );

          // Poll until generation completes
          const genStatus = await pollUntilDone(
            ai,
            genResult.predictionId,
          );

          if (genStatus.state !== "succeeded" || !genStatus.outputUrls?.length) {
            console.error(
              `Generation failed for style=${style.id}, bg=${background.id}: ${genStatus.error}`,
            );
            return null;
          }

          return {
            url: genStatus.outputUrls[0],
            style,
            background,
          };
        }),
      );

      generatedImages.push(
        ...results.filter(
          (r): r is NonNullable<typeof r> => r !== null,
        ),
      );
    }

    if (generatedImages.length === 0) {
      throw new Error(`All generations failed for order ${orderId}`);
    }

    // -------------------------------------------------------------------
    // 5. Download generated images and save to storage
    // -------------------------------------------------------------------

    const headshots = await Promise.all(
      generatedImages.map(async ({ url, style, background }) => {
        // Download the image from the provider's temporary URL
        const response = await fetch(url);
        const buffer = Buffer.from(await response.arrayBuffer());

        const storagePath = `headshots/${order.user_id}/${orderId}/${style.id}_${background.id}.png`;
        const thumbnailPath = `headshots/${order.user_id}/${orderId}/thumb_${style.id}_${background.id}.png`;

        // Upload full-size image
        await storage.upload("headshots", storagePath, buffer, {
          contentType: "image/png",
          upsert: true,
        });

        // For a production app you'd generate a real thumbnail here.
        // We store the same path as a placeholder.
        await storage.upload("headshots", thumbnailPath, buffer, {
          contentType: "image/png",
          upsert: true,
        });

        return {
          storagePath,
          thumbnailPath,
          style: style.id,
          background: background.id,
        };
      }),
    );

    // -------------------------------------------------------------------
    // 6. Insert headshot records into the database
    // -------------------------------------------------------------------

    const { error: insertError } = await supabase
      .from("generated_headshots")
      .insert(
        headshots.map((h) => ({
          order_id: orderId,
          storage_path: h.storagePath,
          thumbnail_path: h.thumbnailPath,
          style: h.style,
          background: h.background,
          resolution: "1024x1024",
        })),
      );

    if (insertError) {
      console.error("Failed to insert headshot records:", insertError);
    }

    // -------------------------------------------------------------------
    // 7. Mark order as completed
    // -------------------------------------------------------------------

    await supabase
      .from("orders")
      .update({
        status: "completed",
        headshot_count: headshots.length,
        completed_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    // -------------------------------------------------------------------
    // 8. Send notification email
    // -------------------------------------------------------------------

    if (profile?.email) {
      await email.sendTemplate({
        to: profile.email,
        template: "headshots-ready",
        data: {
          name: profile.full_name ?? "there",
          headshotCount: headshots.length,
          dashboardUrl: `${webhookBase}/dashboard/orders/${orderId}`,
        },
      });
    }
  } catch (error) {
    // Mark order as failed
    await supabase
      .from("orders")
      .update({ status: "failed" })
      .eq("id", orderId);

    // Notify the user about the failure
    if (profile?.email) {
      await email.sendTemplate({
        to: profile.email,
        template: "order-failed",
        data: {
          name: profile.full_name ?? "there",
          orderId,
          error: error instanceof Error ? error.message : "Unknown error",
        },
      }).catch(console.error);
    }

    throw error;
  }
}

// ---------------------------------------------------------------------------
// Polling helper
// ---------------------------------------------------------------------------

/**
 * Poll a prediction until it reaches a terminal state.
 */
async function pollUntilDone(
  ai: ReturnType<typeof getAIProvider>,
  predictionId: string,
): Promise<{ state: PredictionState; outputUrls?: string[]; error?: string }> {
  const deadline = Date.now() + MAX_POLL_DURATION;

  while (Date.now() < deadline) {
    const status = await ai.getStatus(predictionId);

    if (
      status.state === "succeeded" ||
      status.state === "failed" ||
      status.state === "canceled"
    ) {
      return status;
    }

    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
  }

  return {
    state: "failed",
    error: `Prediction ${predictionId} timed out after ${MAX_POLL_DURATION / 1000}s`,
  };
}
