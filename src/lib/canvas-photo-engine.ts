/**
 * Canvas-based photo processing engine for TailorPic marketing demos.
 * Pure Canvas API — no external dependencies.
 *
 * Provides professional-looking photo transformations:
 * - Brightness / Contrast / Saturation adjustments
 * - Professional color grading (warm, cool, cinematic presets)
 * - Portrait lighting simulation
 * - Sharpening via unsharp mask
 * - Vignette effect
 * - Simulated background blur (box blur approximation)
 * - Skin smoothing simulation
 */

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface PhotoAdjustments {
  brightness?: number;   // -100 to +100 (default 0)
  contrast?: number;     // -100 to +100 (default 0)
  saturation?: number;   // -100 to +100 (default 0)
  warmth?: number;       // -50 to +50 (default 0) — shifts R/B channels
  sharpen?: number;      // 0 to 100 (default 0)
  vignette?: number;     // 0 to 100 (default 0)
  portraitLight?: number; // 0 to 100 (default 0) — top-down fill light
  skinSmooth?: number;   // 0 to 100 (default 0)
}

export interface ColorGradingPreset {
  name: string;
  adjustments: PhotoAdjustments;
}

/* ------------------------------------------------------------------ */
/*  Presets                                                            */
/* ------------------------------------------------------------------ */

export const PRESETS: Record<string, ColorGradingPreset> = {
  professional: {
    name: 'Professional',
    adjustments: {
      brightness: 3,
      contrast: 5,
      saturation: 2,
      warmth: 3,
      sharpen: 4,
      vignette: 5,
      portraitLight: 10,
      skinSmooth: 3,
    },
  },
  corporate: {
    name: 'Corporate',
    adjustments: {
      brightness: 2,
      contrast: 6,
      saturation: -2,
      warmth: 1,
      sharpen: 4,
      vignette: 5,
      portraitLight: 12,
      skinSmooth: 2,
    },
  },
  creative: {
    name: 'Creative',
    adjustments: {
      brightness: 4,
      contrast: 8,
      saturation: 5,
      warmth: 4,
      sharpen: 3,
      vignette: 6,
      portraitLight: 8,
      skinSmooth: 2,
    },
  },
  linkedin: {
    name: 'LinkedIn',
    adjustments: {
      brightness: 3,
      contrast: 6,
      saturation: 3,
      warmth: 2,
      sharpen: 4,
      vignette: 4,
      portraitLight: 12,
      skinSmooth: 3,
    },
  },
  cinematic: {
    name: 'Cinematic',
    adjustments: {
      brightness: -2,
      contrast: 10,
      saturation: -4,
      warmth: 5,
      sharpen: 3,
      vignette: 8,
      portraitLight: 8,
      skinSmooth: 0,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Core engine                                                        */
/* ------------------------------------------------------------------ */

/**
 * Load an image from a URL into a canvas and return the context + data.
 */
export function loadImageToCanvas(
  img: HTMLImageElement,
  maxWidth = 800,
  maxHeight = 1000,
): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement('canvas');

  let { width, height } = img;
  // Scale down if needed
  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, width, height);

  return { canvas, ctx };
}

/**
 * Apply brightness adjustment to pixel data.
 * @param data — ImageData.data (Uint8ClampedArray)
 * @param amount — -100 to +100
 */
function applyBrightness(data: Uint8ClampedArray, amount: number): void {
  const factor = (amount / 100) * 75; // max ±75 levels
  for (let i = 0; i < data.length; i += 4) {
    data[i] += factor;
    data[i + 1] += factor;
    data[i + 2] += factor;
  }
}

/**
 * Apply contrast adjustment.
 */
function applyContrast(data: Uint8ClampedArray, amount: number): void {
  const factor = (259 * (amount + 255)) / (255 * (259 - amount));
  for (let i = 0; i < data.length; i += 4) {
    data[i] = factor * (data[i] - 128) + 128;
    data[i + 1] = factor * (data[i + 1] - 128) + 128;
    data[i + 2] = factor * (data[i + 2] - 128) + 128;
  }
}

/**
 * Apply saturation adjustment.
 */
function applySaturation(data: Uint8ClampedArray, amount: number): void {
  const factor = 1 + amount / 100;
  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    data[i] = gray + factor * (data[i] - gray);
    data[i + 1] = gray + factor * (data[i + 1] - gray);
    data[i + 2] = gray + factor * (data[i + 2] - gray);
  }
}

/**
 * Apply warmth (white balance shift).
 * Positive = warmer (more red, less blue), negative = cooler.
 */
function applyWarmth(data: Uint8ClampedArray, amount: number): void {
  const shift = amount * 1.2;
  for (let i = 0; i < data.length; i += 4) {
    data[i] += shift;     // R
    data[i + 2] -= shift; // B
  }
}

/**
 * Apply portrait lighting simulation.
 * Creates a soft top-down fill light (brighter face area, darker edges).
 */
function applyPortraitLight(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  amount: number,
): void {
  const intensity = amount / 100;

  // Radial gradient centered on upper-center (typical face position)
  const centerX = width / 2;
  const centerY = height * 0.35;
  const radius = Math.max(width, height) * 0.7;

  const gradient = ctx.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, radius,
  );
  gradient.addColorStop(0, `rgba(255, 248, 235, ${0.25 * intensity})`);
  gradient.addColorStop(0.5, `rgba(255, 245, 225, ${0.08 * intensity})`);
  gradient.addColorStop(1, `rgba(0, 0, 0, ${0.15 * intensity})`);

  ctx.globalCompositeOperation = 'overlay';
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = 'source-over';
}

/**
 * Apply vignette effect.
 */
function applyVignette(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  amount: number,
): void {
  const intensity = amount / 100;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.sqrt(centerX * centerX + centerY * centerY);

  const gradient = ctx.createRadialGradient(
    centerX, centerY, radius * 0.3,
    centerX, centerY, radius,
  );
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  gradient.addColorStop(1, `rgba(0, 0, 0, ${0.55 * intensity})`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

/**
 * Simple 3x3 convolution for sharpening.
 */
function applySharpen(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  amount: number,
): void {
  if (amount <= 0) return;

  const strength = amount / 100;
  const imageData = ctx.getImageData(0, 0, width, height);
  const src = new Uint8ClampedArray(imageData.data);
  const dst = imageData.data;

  // Unsharp mask kernel
  const k = strength * 0.6;
  const kernel = [
    0, -k, 0,
    -k, 1 + 4 * k, -k,
    0, -k, 0,
  ];

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      for (let c = 0; c < 3; c++) {
        let val = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = ((y + ky) * width + (x + kx)) * 4 + c;
            val += src[idx] * kernel[(ky + 1) * 3 + (kx + 1)];
          }
        }
        dst[(y * width + x) * 4 + c] = val;
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

/**
 * Skin smoothing simulation using a simplified bilateral-like approach.
 * Uses box blur on a copy, then blends back selectively.
 */
function applySkinSmooth(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  amount: number,
): void {
  if (amount <= 0) return;

  const intensity = amount / 100;

  // Create blurred version using CSS filter
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  tempCanvas.height = height;
  const tempCtx = tempCanvas.getContext('2d')!;

  // Draw the current state blurred
  tempCtx.filter = `blur(${Math.round(2 + intensity * 3)}px)`;
  tempCtx.drawImage(ctx.canvas, 0, 0);
  tempCtx.filter = 'none';

  // Blend back with low opacity for subtle smoothing
  ctx.globalAlpha = intensity * 0.35;
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.globalAlpha = 1;
}

/* ------------------------------------------------------------------ */
/*  Main processing function                                           */
/* ------------------------------------------------------------------ */

/**
 * Apply all photo adjustments to a canvas.
 * Call after drawing the source image onto the canvas.
 */
export function processPhoto(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  adjustments: PhotoAdjustments,
): void {
  const { width, height } = canvas;

  // Pixel-level adjustments (brightness, contrast, saturation, warmth)
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  if (adjustments.brightness) applyBrightness(data, adjustments.brightness);
  if (adjustments.contrast) applyContrast(data, adjustments.contrast);
  if (adjustments.saturation) applySaturation(data, adjustments.saturation);
  if (adjustments.warmth) applyWarmth(data, adjustments.warmth);

  ctx.putImageData(imageData, 0, 0);

  // Skin smoothing (before sharpen)
  if (adjustments.skinSmooth) applySkinSmooth(ctx, width, height, adjustments.skinSmooth);

  // Sharpening
  if (adjustments.sharpen) applySharpen(ctx, width, height, adjustments.sharpen);

  // Portrait lighting overlay
  if (adjustments.portraitLight) applyPortraitLight(ctx, width, height, adjustments.portraitLight);

  // Vignette last (on top of everything)
  if (adjustments.vignette) applyVignette(ctx, width, height, adjustments.vignette);
}

/* ------------------------------------------------------------------ */
/*  High-level helpers                                                 */
/* ------------------------------------------------------------------ */

/**
 * Process an image element with a named preset.
 * Returns a data URL of the processed image.
 */
export async function processImageWithPreset(
  imgSrc: string,
  presetName: keyof typeof PRESETS,
  maxWidth = 800,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const { canvas, ctx } = loadImageToCanvas(img, maxWidth);
      processPhoto(canvas, ctx, PRESETS[presetName].adjustments);
      resolve(canvas.toDataURL('image/jpeg', 0.92));
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${imgSrc}`));
    img.src = imgSrc;
  });
}

/**
 * Process an image with custom adjustments.
 */
export async function processImageWithAdjustments(
  imgSrc: string,
  adjustments: PhotoAdjustments,
  maxWidth = 800,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const { canvas, ctx } = loadImageToCanvas(img, maxWidth);
      processPhoto(canvas, ctx, adjustments);
      resolve(canvas.toDataURL('image/jpeg', 0.92));
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${imgSrc}`));
    img.src = imgSrc;
  });
}

/**
 * Process a File (from file input) with a preset.
 */
export async function processFileWithPreset(
  file: File,
  presetName: keyof typeof PRESETS,
  maxWidth = 800,
): Promise<string> {
  const objectUrl = URL.createObjectURL(file);
  try {
    const result = await processImageWithPreset(objectUrl, presetName, maxWidth);
    return result;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

/**
 * Process a File with custom adjustments.
 */
export async function processFileWithAdjustments(
  file: File,
  adjustments: PhotoAdjustments,
  maxWidth = 800,
): Promise<string> {
  const objectUrl = URL.createObjectURL(file);
  try {
    const result = await processImageWithAdjustments(objectUrl, adjustments, maxWidth);
    return result;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

/**
 * Generate multiple style variations from a single image.
 * Returns an array of { presetName, dataUrl } objects.
 */
export async function generateStyleVariations(
  imgSrc: string,
  presetNames: (keyof typeof PRESETS)[] = ['professional', 'corporate', 'creative'],
  maxWidth = 600,
): Promise<Array<{ presetName: string; dataUrl: string }>> {
  const results = await Promise.all(
    presetNames.map(async (name) => ({
      presetName: name,
      dataUrl: await processImageWithPreset(imgSrc, name, maxWidth),
    })),
  );
  return results;
}
