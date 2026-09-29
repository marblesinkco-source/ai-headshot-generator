/**
 * AI Provider abstraction.
 *
 * Every AI/ML service (Replicate, fal.ai, RunPod, etc.) implements this
 * interface so the orchestration pipeline is provider-agnostic.
 */

// ---------------------------------------------------------------------------
// Training types
// ---------------------------------------------------------------------------

export interface TrainOptions {
  /** Trigger word for the LoRA, e.g. "ohwx" */
  triggerWord: string;
  /** Number of training steps (higher = more accurate, slower) */
  steps?: number;
  /** Learning rate for fine-tuning */
  learningRate?: number;
  /** Resolution to train at */
  resolution?: number;
  /** Webhook URL for status callbacks */
  webhookUrl?: string;
  /** Arbitrary metadata passed through to the provider */
  metadata?: Record<string, string>;
}

export interface TrainResult {
  /** Provider-assigned ID to reference this training run */
  modelId: string;
  /** Provider-specific prediction/training ID for status polling */
  predictionId: string;
  /** Current status at time of creation */
  status: PredictionStatus;
}

// ---------------------------------------------------------------------------
// Generation types
// ---------------------------------------------------------------------------

export interface GenerateOptions {
  /** Prompt describing the desired headshot */
  prompt: string;
  /** Negative prompt to avoid unwanted features */
  negativePrompt?: string;
  /** Number of images to generate */
  numImages?: number;
  /** Output resolution, e.g. "1024x1024" */
  resolution?: string;
  /** Guidance scale (higher = more prompt-adherent) */
  guidanceScale?: number;
  /** Number of inference steps */
  inferenceSteps?: number;
  /** Webhook URL for status callbacks */
  webhookUrl?: string;
}

export interface GenerateResult {
  /** Provider-specific prediction ID for status polling */
  predictionId: string;
  /** Current status at time of creation */
  status: PredictionStatus;
  /** Generated image URLs (populated when status is "succeeded") */
  outputUrls?: string[];
}

// ---------------------------------------------------------------------------
// Status types
// ---------------------------------------------------------------------------

export type PredictionState =
  | "starting"
  | "processing"
  | "succeeded"
  | "failed"
  | "canceled";

export interface PredictionStatus {
  id: string;
  state: PredictionState;
  /** Progress percentage 0-100, if the provider reports it */
  progress?: number;
  /** Output URLs when completed */
  outputUrls?: string[];
  /** Error message when failed */
  error?: string;
  /** Raw provider-specific response for debugging */
  raw?: unknown;
}

// ---------------------------------------------------------------------------
// Headshot style/background configuration
// ---------------------------------------------------------------------------

export interface HeadshotStyle {
  id: string;
  label: string;
  prompt: string;
  negativePrompt?: string;
}

export interface HeadshotBackground {
  id: string;
  label: string;
  promptFragment: string;
}

// ---------------------------------------------------------------------------
// Provider interface
// ---------------------------------------------------------------------------

export interface AIProvider {
  /** Human-readable provider name (e.g. "Replicate", "fal.ai") */
  name: string;

  /**
   * Start a fine-tuning training run with the user's uploaded photos.
   * Returns immediately with a prediction ID for polling.
   */
  trainModel(
    images: string[],
    options: TrainOptions,
  ): Promise<TrainResult>;

  /**
   * Generate headshot images using a previously trained model.
   * Returns immediately with a prediction ID for polling.
   */
  generateHeadshots(
    modelId: string,
    options: GenerateOptions,
  ): Promise<GenerateResult>;

  /**
   * Poll the status of a training or generation prediction.
   */
  getStatus(predictionId: string): Promise<PredictionStatus>;
}
