/**
 * Replicate AI provider.
 *
 * Implements the AIProvider interface using the Replicate platform
 * with Flux fine-tuning for headshot model training and generation.
 */

import Replicate from "replicate";
import type {
  AIProvider,
  TrainOptions,
  TrainResult,
  GenerateOptions,
  GenerateResult,
  PredictionStatus,
  PredictionState,
} from "../types";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/** Flux fine-tuning model used for LoRA training */
const FLUX_TRAIN_MODEL =
  "ostris/flux-dev-lora-trainer:d995297071a44dcb72244e6c19462f9670254b7e4a3679476e6ffb8a503aaec1";

/** Flux generation model (runs the trained LoRA) */
const FLUX_GENERATE_MODEL = "black-forest-labs/flux-dev";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Map Replicate status strings to our normalized PredictionState. */
function mapStatus(status: string): PredictionState {
  switch (status) {
    case "starting":
      return "starting";
    case "processing":
      return "processing";
    case "succeeded":
      return "succeeded";
    case "failed":
      return "failed";
    case "canceled":
      return "canceled";
    default:
      return "processing";
  }
}

// ---------------------------------------------------------------------------
// Provider implementation
// ---------------------------------------------------------------------------

export class ReplicateProvider implements AIProvider {
  public readonly name = "Replicate";
  private client: Replicate;

  constructor(apiToken?: string) {
    this.client = new Replicate({
      auth: apiToken ?? process.env.REPLICATE_API_TOKEN!,
    });
  }

  /**
   * Start a Flux LoRA fine-tuning run.
   *
   * The `images` array should contain signed URLs pointing to the user's
   * uploaded training photos (or a single ZIP URL).
   */
  async trainModel(
    images: string[],
    options: TrainOptions,
  ): Promise<TrainResult> {
    // Replicate's LoRA trainer expects a ZIP file URL or a list of image URLs.
    // We create a training via the API.
    const [owner, modelName, version] = this.parseModelVersion(FLUX_TRAIN_MODEL);

    const training = await this.client.trainings.create(
      owner,
      modelName,
      version,
      {
        input: {
          input_images: images.join("\n"),
          trigger_word: options.triggerWord,
          steps: options.steps ?? 1000,
          learning_rate: options.learningRate ?? 1e-4,
          resolution: `${options.resolution ?? 512},${options.resolution ?? 512}`,
        },
        webhook: options.webhookUrl,
        webhook_events_filter: ["completed"],
      },
    );

    return {
      modelId: training.id, // used later to reference the trained weights
      predictionId: training.id,
      status: {
        id: training.id,
        state: mapStatus(training.status),
      },
    };
  }

  /**
   * Generate headshots using a trained Flux LoRA model.
   *
   * `modelId` is the training run ID whose output weights we reference.
   */
  async generateHeadshots(
    modelId: string,
    options: GenerateOptions,
  ): Promise<GenerateResult> {
    // Retrieve the completed training to get the LoRA weights URL
    const training = await this.client.trainings.get(modelId);

    if (training.status !== "succeeded" || !training.output) {
      throw new Error(
        `Training ${modelId} is not ready (status: ${training.status})`,
      );
    }

    // The training output contains the LoRA weights URL
    const loraUrl =
      typeof training.output === "string"
        ? training.output
        : (training.output as Record<string, unknown>).weights ??
          (training.output as Record<string, unknown>).version;

    const [width, height] = (options.resolution ?? "1024x1024")
      .split("x")
      .map(Number);

    const prediction = await this.client.predictions.create({
      model: FLUX_GENERATE_MODEL,
      input: {
        prompt: options.prompt,
        negative_prompt: options.negativePrompt,
        num_outputs: options.numImages ?? 1,
        width,
        height,
        guidance_scale: options.guidanceScale ?? 7.5,
        num_inference_steps: options.inferenceSteps ?? 28,
        lora_url: loraUrl,
      },
      webhook: options.webhookUrl,
      webhook_events_filter: ["completed"],
    });

    return {
      predictionId: prediction.id,
      status: {
        id: prediction.id,
        state: mapStatus(prediction.status),
      },
    };
  }

  /**
   * Poll the status of a training or generation prediction.
   */
  async getStatus(predictionId: string): Promise<PredictionStatus> {
    // Try as a prediction first, fall back to training
    let result: { id: string; status: string; output?: unknown; error?: string; logs?: string };

    try {
      result = await this.client.predictions.get(predictionId);
    } catch {
      result = await this.client.trainings.get(predictionId);
    }

    // Parse progress from logs if available
    let progress: number | undefined;
    if (typeof (result as Record<string, unknown>).logs === "string") {
      const match = ((result as Record<string, unknown>).logs as string).match(
        /(\d+)%/,
      );
      if (match) {
        progress = parseInt(match[1], 10);
      }
    }

    // Normalize output URLs
    let outputUrls: string[] | undefined;
    if (result.output) {
      if (Array.isArray(result.output)) {
        outputUrls = result.output.map(String);
      } else if (typeof result.output === "string") {
        outputUrls = [result.output];
      }
    }

    return {
      id: result.id,
      state: mapStatus(result.status),
      progress,
      outputUrls,
      error: result.error ?? undefined,
      raw: result,
    };
  }

  // -------------------------------------------------------------------------
  // Internal helpers
  // -------------------------------------------------------------------------

  /**
   * Parse a "owner/model:version" string into its components.
   */
  private parseModelVersion(modelVersion: string): [string, string, string] {
    const [ownerModel, version] = modelVersion.split(":");
    const [owner, model] = ownerModel.split("/");
    return [owner, model, version];
  }
}
