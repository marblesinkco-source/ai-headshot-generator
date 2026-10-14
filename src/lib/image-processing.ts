/**
 * Sharp-based image processing utilities for TailorPic.
 *
 * sharp is already in package.json — this module puts it to work:
 *  • optimizeForUpload  – resize + WebP conversion on ingest
 *  • createThumbnail    – small preview for gallery views
 *  • optimizeForTraining – prepare selfies for LoRA training (512×512)
 *  • validateImage      – basic dimension & aspect-ratio sanity check
 *  • enhanceImage       – subtle sharpen + contrast for generated outputs
 */

import sharp from 'sharp';
import { logger } from '@/lib/logger';

/* ─── constants ────────────────────────────────────────────────────── */

/** Maximum edge length for stored originals */
const UPLOAD_MAX_EDGE = 2048;

/** Thumbnail size for gallery previews */
const THUMB_SIZE = 256;

/** LoRA training resolution (matches Replicate input) */
const TRAINING_SIZE = 512;

/** WebP quality (0-100) — 82 is visually lossless for portraits */
const WEBP_QUALITY = 82;

/** Minimum acceptable dimension for selfies */
const MIN_DIMENSION = 256;

/** Maximum acceptable aspect ratio (w/h or h/w) */
const MAX_ASPECT_RATIO = 3;

/* ─── types ────────────────────────────────────────────────────────── */

export interface ImageMeta {
  width: number;
  height: number;
  format: string;
  sizeBytes: number;
  hasAlpha: boolean;
}

export interface ValidationResult {
  valid: boolean;
  reason?: string;
  meta?: ImageMeta;
}

export interface ProcessedImage {
  buffer: Buffer;
  contentType: string;
  width: number;
  height: number;
  originalSizeBytes: number;
  optimizedSizeBytes: number;
}

/* ─── core functions ───────────────────────────────────────────────── */

/**
 * Get image metadata without fully decoding the image.
 */
export async function getImageMeta(input: Buffer): Promise<ImageMeta | null> {
  try {
    const meta = await sharp(input).metadata();
    if (!meta.width || !meta.height || !meta.format) return null;
    return {
      width: meta.width,
      height: meta.height,
      format: meta.format,
      sizeBytes: input.length,
      hasAlpha: meta.hasAlpha ?? false,
    };
  } catch (err) {
    logger.error('Failed to read image metadata', err);
    return null;
  }
}

/**
 * Validate that an image meets minimum requirements for AI training.
 *  – At least MIN_DIMENSION × MIN_DIMENSION
 *  – Reasonable aspect ratio (not an extreme panorama / strip)
 *  – Decodable by sharp
 */
export async function validateImage(input: Buffer): Promise<ValidationResult> {
  const meta = await getImageMeta(input);
  if (!meta) {
    return { valid: false, reason: 'Could not read image. The file may be corrupt.' };
  }

  if (meta.width < MIN_DIMENSION || meta.height < MIN_DIMENSION) {
    return {
      valid: false,
      reason: `Image is too small (${meta.width}×${meta.height}). Minimum ${MIN_DIMENSION}×${MIN_DIMENSION} required.`,
      meta,
    };
  }

  const ratio = Math.max(meta.width / meta.height, meta.height / meta.width);
  if (ratio > MAX_ASPECT_RATIO) {
    return {
      valid: false,
      reason: `Image aspect ratio is too extreme (${ratio.toFixed(1)}:1). Please use a standard photo.`,
      meta,
    };
  }

  return { valid: true, meta };
}

/**
 * Optimize an uploaded selfie for storage:
 *  1. Cap the longest edge at UPLOAD_MAX_EDGE (preserve aspect ratio)
 *  2. Strip EXIF (privacy) but keep orientation
 *  3. Convert to WebP for ~40 % storage savings
 */
export async function optimizeForUpload(input: Buffer): Promise<ProcessedImage> {
  const meta = await sharp(input).metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;

  let pipeline = sharp(input).rotate(); // auto-orient from EXIF

  if (w > UPLOAD_MAX_EDGE || h > UPLOAD_MAX_EDGE) {
    pipeline = pipeline.resize({
      width: UPLOAD_MAX_EDGE,
      height: UPLOAD_MAX_EDGE,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  const result = await pipeline
    .webp({ quality: WEBP_QUALITY })
    .toBuffer({ resolveWithObject: true });

  return {
    buffer: result.data,
    contentType: 'image/webp',
    width: result.info.width,
    height: result.info.height,
    originalSizeBytes: input.length,
    optimizedSizeBytes: result.data.length,
  };
}

/**
 * Create a small square thumbnail for gallery previews.
 * Centre-crops then resizes to THUMB_SIZE × THUMB_SIZE.
 */
export async function createThumbnail(input: Buffer): Promise<ProcessedImage> {
  const result = await sharp(input)
    .rotate()
    .resize(THUMB_SIZE, THUMB_SIZE, {
      fit: 'cover',
      position: 'attention', // smart crop — focuses on faces / salient areas
    })
    .webp({ quality: 72 })
    .toBuffer({ resolveWithObject: true });

  return {
    buffer: result.data,
    contentType: 'image/webp',
    width: result.info.width,
    height: result.info.height,
    originalSizeBytes: input.length,
    optimizedSizeBytes: result.data.length,
  };
}

/**
 * Prepare a selfie for LoRA training:
 *  - Resize to TRAINING_SIZE × TRAINING_SIZE (cover + centre crop)
 *  - Convert to JPEG (Replicate/Flux expects standard formats)
 *  - Light sharpen to compensate for resize blur
 *
 * This reduces ZIP size sent to Replicate by 60-80 %, cutting
 * both upload time and storage costs.
 */
export async function optimizeForTraining(input: Buffer): Promise<ProcessedImage> {
  const result = await sharp(input)
    .rotate()
    .resize(TRAINING_SIZE, TRAINING_SIZE, {
      fit: 'cover',
      position: 'attention',
    })
    .sharpen({ sigma: 0.8 })
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer({ resolveWithObject: true });

  return {
    buffer: result.data,
    contentType: 'image/jpeg',
    width: result.info.width,
    height: result.info.height,
    originalSizeBytes: input.length,
    optimizedSizeBytes: result.data.length,
  };
}

/**
 * Apply subtle enhancement to an AI-generated portrait:
 *  - Light sharpen (unsharp mask)
 *  - Micro-contrast boost
 * Used as a post-processing step on generated headshots.
 */
export async function enhanceImage(
  input: Buffer,
  opts?: { sharpenAmount?: number; contrastBoost?: boolean }
): Promise<ProcessedImage> {
  const sigma = opts?.sharpenAmount ?? 1.0;
  let pipeline = sharp(input)
    .sharpen({ sigma, m1: 1.0, m2: 0.5 }); // subtle unsharp mask

  if (opts?.contrastBoost) {
    // Linear contrast stretch — brightens midtones slightly
    pipeline = pipeline.linear(1.05, -(128 * 0.05));
  }

  const result = await pipeline
    .toBuffer({ resolveWithObject: true });

  return {
    buffer: result.data,
    contentType: 'image/jpeg',
    width: result.info.width,
    height: result.info.height,
    originalSizeBytes: input.length,
    optimizedSizeBytes: result.data.length,
  };
}

/**
 * Convert any supported image to WebP for storage efficiency.
 * Pass-through if already WebP and under maxBytes.
 */
/* ─── output quality scoring ──────────────────────────────────────── */

/** Minimum dimension considered "good" for generated output */
const QUALITY_GOOD_DIMENSION = 768;

export interface OutputQualityScore {
  overall: number; // 0-100
  sharpness: number;
  contrast: number;
  colorBalance: number;
  resolution: number;
}

/**
 * Score a generated image on objective quality metrics.
 *
 * 1. **Sharpness** – grayscale → Laplacian convolution → stdev of result.
 *    Higher stdev = sharper edges.
 * 2. **Contrast** – luminance stats min/max range, wider = better contrast.
 * 3. **Color balance** – per-channel mean comparison; closer R/G/B means
 *    more neutral white-balance.
 * 4. **Resolution** – penalises images whose shortest edge is below
 *    QUALITY_GOOD_DIMENSION.
 *
 * Overall = weighted average (sharpness 35 %, contrast 25 %,
 * color balance 20 %, resolution 20 %).
 */
export async function scoreGeneratedImage(input: Buffer): Promise<OutputQualityScore> {
  try {
    const image = sharp(input);
    const meta = await image.metadata();
    const width = meta.width ?? 0;
    const height = meta.height ?? 0;

    // ── 1. Sharpness via Laplacian ──────────────────────────────────
    // Convolve with a 3×3 Laplacian kernel on a greyscale copy,
    // then measure the standard deviation of the result.
    const laplacianKernel = {
      width: 3,
      height: 3,
      kernel: [0, 1, 0, 1, -4, 1, 0, 1, 0],
    };

    const laplacianStats = await sharp(input)
      .greyscale()
      .convolve(laplacianKernel)
      .stats();

    // stdev of the first (only) channel after Laplacian
    const laplacianStd = laplacianStats.channels[0]?.stdev ?? 0;
    // Typical range ~5–50; map to 0-100 with a sigmoid-ish curve
    const sharpness = Math.min(100, Math.round((laplacianStd / 30) * 100));

    // ── 2. Contrast via luminance range ─────────────────────────────
    const greyStats = await sharp(input).greyscale().stats();
    const minLum = greyStats.channels[0]?.min ?? 0;
    const maxLum = greyStats.channels[0]?.max ?? 255;
    const lumRange = maxLum - minLum; // 0-255
    // Full range (255) → 100, very compressed (< 50) → low score
    const contrast = Math.min(100, Math.round((lumRange / 255) * 100));

    // ── 3. Color balance via channel mean deviation ─────────────────
    const colorStats = await sharp(input)
      .removeAlpha()
      .toColorspace('srgb')
      .stats();

    const channelMeans = colorStats.channels.slice(0, 3).map((c) => c.mean);
    if (channelMeans.length === 3) {
      const avgMean =
        (channelMeans[0] + channelMeans[1] + channelMeans[2]) / 3;
      // Mean absolute deviation of R/G/B from their average
      const mad =
        (Math.abs(channelMeans[0] - avgMean) +
          Math.abs(channelMeans[1] - avgMean) +
          Math.abs(channelMeans[2] - avgMean)) /
        3;
      // Small MAD → balanced; >40 quite off.  Invert: low deviation = high score
      var colorBalance = Math.max(0, Math.min(100, Math.round(100 - mad * 2.5)));
    } else {
      var colorBalance = 50; // fallback for greyscale input
    }

    // ── 4. Resolution score ─────────────────────────────────────────
    const shortEdge = Math.min(width, height);
    // 768+ → 100, linearly down to 0 at 256
    const resolution = Math.max(
      0,
      Math.min(
        100,
        Math.round(((shortEdge - 256) / (QUALITY_GOOD_DIMENSION - 256)) * 100)
      )
    );

    // ── Overall (weighted average) ──────────────────────────────────
    const overall = Math.round(
      sharpness * 0.35 +
        contrast * 0.25 +
        colorBalance * 0.2 +
        resolution * 0.2
    );

    return { overall, sharpness, contrast, colorBalance, resolution };
  } catch (err) {
    logger.error('Failed to score generated image', err);
    // Return neutral mid-range scores on failure so we never block the pipeline
    return {
      overall: 50,
      sharpness: 50,
      contrast: 50,
      colorBalance: 50,
      resolution: 50,
    };
  }
}

/**
 * Convert any supported image to WebP for storage efficiency.
 * Pass-through if already WebP and under maxBytes.
 */
export async function convertToWebP(
  input: Buffer,
  quality: number = WEBP_QUALITY
): Promise<ProcessedImage> {
  const meta = await sharp(input).metadata();

  const result = await sharp(input)
    .rotate()
    .webp({ quality })
    .toBuffer({ resolveWithObject: true });

  return {
    buffer: result.data,
    contentType: 'image/webp',
    width: result.info.width,
    height: result.info.height,
    originalSizeBytes: input.length,
    optimizedSizeBytes: result.data.length,
  };
}

/* ─── upload quality assessment ───────────────────────────────────── */

/** Recommended minimum for good training results */
const QUALITY_MIN_DIMENSION = 512;

/** Laplacian kernel for edge / sharpness detection */
const LAPLACIAN_KERNEL = {
  width: 3,
  height: 3,
  kernel: [0, 1, 0, 1, -4, 1, 0, 1, 0],
};

export interface UploadQualityResult {
  score: number; // 0-100 overall score
  passed: boolean; // score >= 50
  checks: {
    sharpness: { score: number; passed: boolean; message: string };
    brightness: { score: number; passed: boolean; message: string };
    resolution: { score: number; passed: boolean; message: string };
    faceRegion: { score: number; passed: boolean; message: string };
  };
  suggestions: string[]; // improvement tips (English)
}

/**
 * Assess the quality of an uploaded selfie for AI headshot training.
 *
 * Runs four lightweight checks using sharp (no ML model needed):
 *  1. Sharpness  — Laplacian variance on the greyscale image
 *  2. Brightness — mean luminance within a usable range
 *  3. Resolution — dimensions relative to the training target
 *  4. Face region — contrast & detail in the centre 60 % crop
 *
 * Returns a 0-100 score plus per-check results and suggestions.
 * Does NOT replace validateImage(); call both if you need a hard gate
 * *and* quality feedback.
 */
export async function assessUploadQuality(
  input: Buffer
): Promise<UploadQualityResult> {
  const meta = await sharp(input).metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;

  /* ── 1. Sharpness (Laplacian variance) ─────────────────────────── */
  const laplacianBuf = await sharp(input)
    .rotate()
    .greyscale()
    .resize({ width: 512, height: 512, fit: 'inside', withoutEnlargement: true })
    .convolve(LAPLACIAN_KERNEL)
    .toBuffer();

  const lapStats = await sharp(laplacianBuf).stats();
  const lapStdDev = lapStats.channels[0]?.stdev ?? 0;

  let sharpnessScore: number;
  let sharpnessMsg: string;
  if (lapStdDev < 5) {
    sharpnessScore = Math.round((lapStdDev / 5) * 30); // 0-30
    sharpnessMsg = 'Image appears very blurry. Use a sharper photo for best results.';
  } else if (lapStdDev < 15) {
    sharpnessScore = 30 + Math.round(((lapStdDev - 5) / 10) * 40); // 30-70
    sharpnessMsg = 'Image is slightly blurry. A sharper photo may improve results.';
  } else {
    sharpnessScore = 70 + Math.min(30, Math.round(((lapStdDev - 15) / 25) * 30)); // 70-100
    sharpnessMsg = 'Good sharpness.';
  }
  sharpnessScore = Math.min(100, Math.max(0, sharpnessScore));

  /* ── 2. Brightness ─────────────────────────────────────────────── */
  const fullStats = await sharp(input).rotate().greyscale().stats();
  const meanBrightness = fullStats.channels[0]?.mean ?? 128;

  let brightnessScore: number;
  let brightnessMsg: string;
  if (meanBrightness < 40) {
    brightnessScore = Math.round((meanBrightness / 40) * 40); // 0-40
    brightnessMsg = 'Image is too dark. Try better lighting or a brighter environment.';
  } else if (meanBrightness > 220) {
    brightnessScore = Math.round(((255 - meanBrightness) / 35) * 40); // 0-40
    brightnessMsg = 'Image is overexposed. Reduce direct light or flash.';
  } else {
    // Ideal range: 80-180 → 100; taper toward edges
    const distFromIdeal = Math.max(0, Math.abs(meanBrightness - 130) - 50);
    brightnessScore = 100 - Math.round((distFromIdeal / 90) * 40);
    brightnessMsg =
      brightnessScore >= 70
        ? 'Good brightness.'
        : 'Brightness is acceptable but could be improved.';
  }
  brightnessScore = Math.min(100, Math.max(0, brightnessScore));

  /* ── 3. Resolution ─────────────────────────────────────────────── */
  const minEdge = Math.min(width, height);
  let resolutionScore: number;
  let resolutionMsg: string;
  if (minEdge >= QUALITY_MIN_DIMENSION * 2) {
    resolutionScore = 100;
    resolutionMsg = `Great resolution (${width}x${height}).`;
  } else if (minEdge >= QUALITY_MIN_DIMENSION) {
    resolutionScore = 70 + Math.round(
      ((minEdge - QUALITY_MIN_DIMENSION) / QUALITY_MIN_DIMENSION) * 30
    );
    resolutionMsg = `Resolution is acceptable (${width}x${height}). Higher resolution photos produce better results.`;
  } else if (minEdge >= MIN_DIMENSION) {
    resolutionScore = 30 + Math.round(
      ((minEdge - MIN_DIMENSION) / (QUALITY_MIN_DIMENSION - MIN_DIMENSION)) * 40
    );
    resolutionMsg = `Resolution is low (${width}x${height}). We recommend at least ${QUALITY_MIN_DIMENSION}x${QUALITY_MIN_DIMENSION}.`;
  } else {
    resolutionScore = Math.round((minEdge / MIN_DIMENSION) * 30);
    resolutionMsg = `Image is very small (${width}x${height}). Minimum ${MIN_DIMENSION}x${MIN_DIMENSION} required.`;
  }
  resolutionScore = Math.min(100, Math.max(0, resolutionScore));

  /* ── 4. Face region (centre 60 % crop) ─────────────────────────── */
  const cropW = Math.round(width * 0.6);
  const cropH = Math.round(height * 0.6);
  const cropLeft = Math.round((width - cropW) / 2);
  const cropTop = Math.round((height - cropH) / 2);

  let faceScore: number;
  let faceMsg: string;
  try {
    const centreBuf = await sharp(input)
      .rotate()
      .extract({ left: cropLeft, top: cropTop, width: cropW, height: cropH })
      .greyscale()
      .toBuffer();

    const centreStats = await sharp(centreBuf).stats();
    const centreStdDev = centreStats.channels[0]?.stdev ?? 0;
    const centreMean = centreStats.channels[0]?.mean ?? 0;

    // Good face region: reasonable contrast (stdev 25-80) and
    // mean in skin-tone luminance range (~60-200)
    const hasContrast = centreStdDev >= 20;
    const hasSkinToneLuminance = centreMean >= 50 && centreMean <= 210;

    if (hasContrast && hasSkinToneLuminance) {
      faceScore = 70 + Math.min(30, Math.round((centreStdDev / 60) * 30));
      faceMsg = 'Centre region has good detail — likely a well-framed face.';
    } else if (hasContrast || hasSkinToneLuminance) {
      faceScore = 40 + Math.round((centreStdDev / 80) * 30);
      faceMsg = 'Centre region detail is moderate. Make sure your face is centred and well-lit.';
    } else {
      faceScore = Math.round((centreStdDev / 80) * 40);
      faceMsg = 'Centre region lacks detail. Ensure your face is centred in the frame.';
    }
    faceScore = Math.min(100, Math.max(0, faceScore));
  } catch {
    // If cropping fails (e.g. image too small), give a neutral score
    faceScore = 50;
    faceMsg = 'Could not analyse the centre region. Make sure your face is centred.';
  }

  /* ── Aggregate ─────────────────────────────────────────────────── */
  const overallScore = Math.round(
    sharpnessScore * 0.35 +
    brightnessScore * 0.2 +
    resolutionScore * 0.2 +
    faceScore * 0.25
  );

  const suggestions: string[] = [];
  if (sharpnessScore < 50) {
    suggestions.push('Use a sharper photo — avoid motion blur and ensure your camera is focused.');
  }
  if (brightnessScore < 50) {
    suggestions.push(
      meanBrightness < 40
        ? 'Your photo is too dark. Try taking it near a window or in a well-lit room.'
        : 'Your photo is overexposed. Move away from direct light sources.'
    );
  }
  if (resolutionScore < 50) {
    suggestions.push(
      `Use a higher resolution photo (at least ${QUALITY_MIN_DIMENSION}x${QUALITY_MIN_DIMENSION} pixels).`
    );
  }
  if (faceScore < 50) {
    suggestions.push('Centre your face in the frame with even lighting across your features.');
  }
  if (suggestions.length === 0) {
    suggestions.push('Your photo looks good! No improvements needed.');
  }

  return {
    score: Math.min(100, Math.max(0, overallScore)),
    passed: overallScore >= 50,
    checks: {
      sharpness: { score: sharpnessScore, passed: sharpnessScore >= 50, message: sharpnessMsg },
      brightness: { score: brightnessScore, passed: brightnessScore >= 50, message: brightnessMsg },
      resolution: { score: resolutionScore, passed: resolutionScore >= 50, message: resolutionMsg },
      faceRegion: { score: faceScore, passed: faceScore >= 50, message: faceMsg },
    },
    suggestions,
  };
}
