'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Upload, Download, X, ShieldCheck, RotateCcw } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MAX_DISPLAY_WIDTH = 800;
const MAX_EXPORT_DIM = 4096;
const MAX_FILE_BYTES = 15 * 1024 * 1024;
const DEFAULT_INTENSITY = 100;
const DEFAULT_THICKNESS = 10;
const DEFAULT_STYLE = 'medium';

type StyleId = 'light' | 'medium' | 'dark' | 'charcoal';

interface SketchStyle {
  id: StyleId;
  label: string;
  radiusMul: number; // multiplies the blur radius
  contrast: number; // >1 deepens the lines
  brightness: number; // added after contrast, -255..255
  gamma: number; // >1 darkens midtones
}

const STYLES: SketchStyle[] = [
  { id: 'light', label: 'Light Sketch', radiusMul: 0.8, contrast: 1, brightness: 12, gamma: 1 },
  { id: 'medium', label: 'Medium Sketch', radiusMul: 1, contrast: 1.2, brightness: 0, gamma: 1.1 },
  { id: 'dark', label: 'Dark Sketch', radiusMul: 1.2, contrast: 1.5, brightness: -18, gamma: 1.4 },
  { id: 'charcoal', label: 'Charcoal', radiusMul: 1.6, contrast: 1.9, brightness: -34, gamma: 1.9 },
];

/** Separable box blur, repeated 3 times to approximate a Gaussian. Works in place on `data`. */
function gaussianBlur(data: Float32Array, w: number, h: number, radius: number) {
  const r = Math.round(radius);
  if (r < 1) return;
  const tmp = new Float32Array(Math.max(w, h));
  const size = 2 * r + 1;

  const pass = (horizontal: boolean) => {
    const lines = horizontal ? h : w;
    const len = horizontal ? w : h;
    const stride = horizontal ? 1 : w;
    for (let l = 0; l < lines; l++) {
      const base = horizontal ? l * w : l;
      // Running sum with edge clamping.
      let sum = 0;
      for (let k = -r; k <= r; k++) {
        const idx = Math.min(len - 1, Math.max(0, k));
        sum += data[base + idx * stride];
      }
      for (let i = 0; i < len; i++) {
        tmp[i] = sum / size;
        const add = Math.min(len - 1, i + r + 1);
        const sub = Math.max(0, i - r);
        sum += data[base + add * stride] - data[base + sub * stride];
      }
      for (let i = 0; i < len; i++) data[base + i * stride] = tmp[i];
    }
  };

  for (let n = 0; n < 3; n++) {
    pass(true);
    pass(false);
  }
}

/**
 * grayscale -> invert -> Gaussian blur -> color dodge (gray / (255 - blurred) * 255)
 * -> style post-processing -> blend with the original by `intensity`.
 * `radiusScale` converts the slider value (display pixels) into target-canvas pixels.
 */
function renderSketch(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  width: number,
  height: number,
  styleId: StyleId,
  thickness: number,
  intensity: number,
  radiusScale: number
) {
  if (canvas.width !== width) canvas.width = width;
  if (canvas.height !== height) canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return;

  ctx.drawImage(img, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  const px = imageData.data;
  const count = width * height;
  const style = STYLES.find((s) => s.id === styleId) ?? STYLES[1];

  // 1. Grayscale (Rec. 601 luma).
  const gray = new Float32Array(count);
  for (let i = 0, p = 0; i < count; i++, p += 4) {
    gray[i] = 0.299 * px[p] + 0.587 * px[p + 1] + 0.114 * px[p + 2];
  }

  // 2. Invert, 3. blur.
  const blurred = new Float32Array(count);
  for (let i = 0; i < count; i++) blurred[i] = 255 - gray[i];
  gaussianBlur(blurred, width, height, thickness * style.radiusMul * radiusScale);

  const mix = intensity / 100;
  for (let i = 0, p = 0; i < count; i++, p += 4) {
    // 4. Color dodge, 5. clamp.
    const denom = 255 - blurred[i];
    let v = denom <= 0 ? 255 : (gray[i] / denom) * 255;
    v = Math.min(255, Math.max(0, v));

    // Style post-processing: gamma, contrast around mid-gray, brightness.
    v = 255 * Math.pow(v / 255, style.gamma);
    v = (v - 128) * style.contrast + 128 + style.brightness;
    v = Math.min(255, Math.max(0, v));

    px[p] = px[p] * (1 - mix) + v * mix;
    px[p + 1] = px[p + 1] * (1 - mix) + v * mix;
    px[p + 2] = px[p + 2] * (1 - mix) + v * mix;
  }

  ctx.putImageData(imageData, 0, 0);
}

export default function PencilSketch() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [hasImage, setHasImage] = useState(false);
  const [fileName, setFileName] = useState('photo');
  const [style, setStyle] = useState<StyleId>(DEFAULT_STYLE);
  const [thickness, setThickness] = useState(DEFAULT_THICKNESS);
  const [intensity, setIntensity] = useState(DEFAULT_INTENSITY);
  const [displaySize, setDisplaySize] = useState({ w: 0, h: 0 });
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFile = useCallback((file: File) => {
    setError(null);
    if (!/^image\/(jpeg|png)$/.test(file.type)) {
      setError('Please choose a JPEG or PNG image.');
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setError('That file is larger than 15 MB. Please choose a smaller photo.');
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, MAX_DISPLAY_WIDTH / img.naturalWidth);
      imgRef.current = img;
      setDisplaySize({
        w: Math.max(1, Math.round(img.naturalWidth * scale)),
        h: Math.max(1, Math.round(img.naturalHeight * scale)),
      });
      setFileName(file.name.replace(/\.[^.]+$/, '') || 'photo');
      setStyle(DEFAULT_STYLE);
      setThickness(DEFAULT_THICKNESS);
      setIntensity(DEFAULT_INTENSITY);
      setHasImage(true);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setError('We could not read that image. Try a different file.');
    };
    img.src = url;
  }, []);

  // Real-time preview.
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!hasImage || !canvas || !img || !displaySize.w) return;
    renderSketch(canvas, img, displaySize.w, displaySize.h, style, thickness, intensity, 1);
  }, [hasImage, style, thickness, intensity, displaySize]);

  const handleReset = () => {
    setStyle(DEFAULT_STYLE);
    setThickness(DEFAULT_THICKNESS);
    setIntensity(DEFAULT_INTENSITY);
  };

  const handleClear = () => {
    imgRef.current = null;
    setHasImage(false);
    setError(null);
  };

  const handleDownload = () => {
    const img = imgRef.current;
    if (!img) return;
    // Export at the original resolution (capped), scaling the blur radius to match the preview.
    const exportScale = Math.min(1, MAX_EXPORT_DIM / Math.max(img.naturalWidth, img.naturalHeight));
    const w = Math.max(1, Math.round(img.naturalWidth * exportScale));
    const h = Math.max(1, Math.round(img.naturalHeight * exportScale));
    const out = document.createElement('canvas');
    renderSketch(out, img, w, h, style, thickness, intensity, w / displaySize.w);
    out.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}-pencil-sketch.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  };

  const isDefault = style === DEFAULT_STYLE && thickness === DEFAULT_THICKNESS && intensity === DEFAULT_INTENSITY;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="sr-only"
        aria-label="Upload a photo"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) loadFile(file);
          e.target.value = '';
        }}
      />

      {!hasImage && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            'flex w-full flex-col items-center justify-center rounded-tp-card border-2 border-dashed bg-white px-6 py-16 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2',
            dragging ? 'border-tp-bronze bg-tp-beige/30' : 'border-tp-line hover:border-tp-bronze'
          )}
        >
          <Upload className="h-8 w-8 text-tp-bronze-ink" aria-hidden="true" />
          <span className="mt-4 font-display font-normal text-2xl text-tp-ink">Drop your photo here or click to browse</span>
          <span className="mt-2 text-sm text-tp-muted">JPEG, PNG • Runs in your browser</span>
        </button>
      )}

      {error && (
        <p role="alert" className="mt-4 rounded-tp-button border border-tp-line bg-white px-4 py-3 text-sm text-tp-ink">
          {error}
        </p>
      )}

      {hasImage && (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="overflow-hidden rounded-tp-card border border-tp-line bg-tp-black p-2 sm:p-3">
            <div className="mx-auto w-fit max-w-full">
              <canvas
                ref={canvasRef}
                className="block h-auto max-h-[70vh] w-auto max-w-full"
                aria-label="Pencil sketch preview"
              />
            </div>
          </div>

          <div className="h-fit rounded-tp-card border border-tp-line bg-white p-6">
            <h2 className="font-display font-normal text-2xl text-tp-ink">Sketch settings</h2>

            <fieldset className="mt-5">
              <legend className="text-sm font-medium text-tp-ink">Style</legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {STYLES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStyle(s.id)}
                    aria-pressed={style === s.id}
                    className={cn(
                      'rounded-tp-button border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2',
                      style === s.id
                        ? 'border-tp-bronze bg-tp-beige/40 font-medium text-tp-ink'
                        : 'border-tp-line bg-white text-tp-muted hover:border-tp-bronze'
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-5">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="ps-thickness" className="font-medium text-tp-ink">
                  Line thickness
                </label>
                <span className="tabular-nums text-tp-muted">{thickness}</span>
              </div>
              <input
                id="ps-thickness"
                type="range"
                min={1}
                max={40}
                step={1}
                value={thickness}
                onChange={(e) => setThickness(Number(e.target.value))}
                className="mt-2 h-2 w-full cursor-pointer accent-tp-bronze"
              />
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="ps-intensity" className="font-medium text-tp-ink">
                  Intensity
                </label>
                <span className="tabular-nums text-tp-muted">{intensity}%</span>
              </div>
              <input
                id="ps-intensity"
                type="range"
                min={0}
                max={100}
                step={1}
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="mt-2 h-2 w-full cursor-pointer accent-tp-bronze"
              />
            </div>

            <div className="mt-6 grid gap-3">
              <button type="button" onClick={handleDownload} className={cn(buttonVariants({ variant: 'primary' }), 'w-full')}>
                <Download className="h-4 w-4" aria-hidden="true" />
                Download PNG
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={isDefault}
                className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Reset
              </button>
              <button
                type="button"
                onClick={handleClear}
                className={cn(buttonVariants({ variant: 'secondary' }), 'w-full')}
              >
                <X className="h-4 w-4" aria-hidden="true" />
                Remove photo
              </button>
            </div>

            <p className="mt-5 flex items-start gap-2 text-xs text-tp-muted">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
              Your photo is processed on your device and is never uploaded.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
