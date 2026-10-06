'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Upload, Download, Sparkles, RotateCcw, Sun, Contrast, Palette, ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MAX_DIM = 1600;
const MAX_FILE_BYTES = 15 * 1024 * 1024;
const SHARPEN_AMOUNT = 0.6;
const ctaHref = '/auth/register?redirect=/dashboard/upload';

interface Settings {
  brightness: number;
  contrast: number;
  saturation: number;
  sharpen: boolean;
}

const DEFAULTS: Settings = { brightness: 0, contrast: 0, saturation: 0, sharpen: false };

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Average luminance (0-255), sampled on a coarse grid. */
function averageBrightness(data: Uint8ClampedArray, width: number, height: number): number {
  const step = Math.max(1, Math.floor(Math.sqrt((width * height) / 20000)));
  let sum = 0;
  let count = 0;
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const i = (y * width + x) * 4;
      sum += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      count++;
    }
  }
  return count ? sum / count : 128;
}

/** Auto-enhance: brighten dark photos proportionally, mild contrast (+20%) and saturation (+12%). */
function computeAutoSettings(avg: number): Settings {
  const brightness = avg < 120 ? Math.round(clamp(((120 - avg) / 120) * 60, 0, 50)) : 0;
  return { brightness, contrast: 20, saturation: 12, sharpen: true };
}

/** Separable 3x3 box blur on RGB channels. */
function boxBlur(src: Uint8ClampedArray, width: number, height: number): Uint8ClampedArray {
  const tmp = new Uint8ClampedArray(src.length);
  const out = new Uint8ClampedArray(src.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const l = (y * width + Math.max(0, x - 1)) * 4;
      const r = (y * width + Math.min(width - 1, x + 1)) * 4;
      for (let c = 0; c < 3; c++) tmp[i + c] = (src[l + c] + src[i + c] + src[r + c]) / 3;
      tmp[i + 3] = src[i + 3];
    }
  }
  for (let y = 0; y < height; y++) {
    const up = Math.max(0, y - 1);
    const down = Math.min(height - 1, y + 1);
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const u = (up * width + x) * 4;
      const d = (down * width + x) * 4;
      for (let c = 0; c < 3; c++) out[i + c] = (tmp[u + c] + tmp[i + c] + tmp[d + c]) / 3;
      out[i + 3] = tmp[i + 3];
    }
  }
  return out;
}

function applyEnhancements(original: ImageData, s: Settings): ImageData {
  const { width, height } = original;
  const src = original.data;
  const out = new Uint8ClampedArray(src.length);
  const offset = s.brightness * 1.5;
  const contrastFactor = 1 + s.contrast / 100;
  const satFactor = 1 + s.saturation / 100;

  for (let i = 0; i < src.length; i += 4) {
    let r = src[i] + offset;
    let g = src[i + 1] + offset;
    let b = src[i + 2] + offset;
    r = (r - 128) * contrastFactor + 128;
    g = (g - 128) * contrastFactor + 128;
    b = (b - 128) * contrastFactor + 128;
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    out[i] = lum + (r - lum) * satFactor;
    out[i + 1] = lum + (g - lum) * satFactor;
    out[i + 2] = lum + (b - lum) * satFactor;
    out[i + 3] = src[i + 3];
  }

  if (s.sharpen) {
    const blurred = boxBlur(out, width, height);
    for (let i = 0; i < out.length; i += 4) {
      for (let c = 0; c < 3; c++) {
        out[i + c] = out[i + c] + SHARPEN_AMOUNT * (out[i + c] - blurred[i + c]);
      }
    }
  }
  return new ImageData(out, width, height);
}

interface SliderRowProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  value: number;
  onChange: (v: number) => void;
}

function SliderRow({ id, label, icon, value, onChange }: SliderRowProps) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <label htmlFor={id} className="flex items-center gap-2 font-medium text-tp-ink">
          <span className="text-tp-bronze-ink" aria-hidden="true">{icon}</span>
          {label}
        </label>
        <span className="tabular-nums text-tp-muted">{value > 0 ? `+${value}` : value}</span>
      </div>
      <input
        id={id}
        type="range"
        min={-50}
        max={50}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-2 w-full cursor-pointer accent-tp-bronze"
      />
    </div>
  );
}

export default function PhotoEnhancePreview() {
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const enhancedCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const originalDataRef = useRef<ImageData | null>(null);

  const [hasImage, setHasImage] = useState(false);
  const [fileName, setFileName] = useState('photo');
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [autoNote, setAutoNote] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [split, setSplit] = useState(50);

  const loadFile = useCallback((file: File) => {
    setError(null);
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file (JPG, PNG or WebP).');
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setError('That file is larger than 15 MB. Please choose a smaller photo.');
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, MAX_DIM / Math.max(img.naturalWidth, img.naturalHeight));
      const w = Math.max(1, Math.round(img.naturalWidth * scale));
      const h = Math.max(1, Math.round(img.naturalHeight * scale));
      const oc = originalCanvasRef.current;
      const ec = enhancedCanvasRef.current;
      const ctx = oc?.getContext('2d', { willReadFrequently: true });
      if (!oc || !ec || !ctx) {
        URL.revokeObjectURL(url);
        return;
      }
      oc.width = w;
      oc.height = h;
      ec.width = w;
      ec.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      originalDataRef.current = ctx.getImageData(0, 0, w, h);
      URL.revokeObjectURL(url);
      setFileName(file.name.replace(/\.[^.]+$/, '') || 'photo');
      setSettings(DEFAULTS);
      setAutoNote(null);
      setSplit(50);
      setHasImage(true);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setError('We could not read that image. Try a different file.');
    };
    img.src = url;
  }, []);

  // Re-render the enhanced canvas whenever settings change.
  useEffect(() => {
    const original = originalDataRef.current;
    const ec = enhancedCanvasRef.current;
    if (!hasImage || !original || !ec) return;
    const raf = requestAnimationFrame(() => {
      const ctx = ec.getContext('2d');
      if (ctx) ctx.putImageData(applyEnhancements(original, settings), 0, 0);
    });
    return () => cancelAnimationFrame(raf);
  }, [settings, hasImage]);

  const handleAuto = () => {
    const original = originalDataRef.current;
    if (!original) return;
    const avg = averageBrightness(original.data, original.width, original.height);
    const next = computeAutoSettings(avg);
    setSettings(next);
    setAutoNote(
      `Average brightness ${Math.round(avg)}/255. Applied brightness ${next.brightness > 0 ? '+' : ''}${next.brightness}, contrast +${next.contrast}, saturation +${next.saturation} and sharpening.`
    );
  };

  const handleReset = () => {
    setSettings(DEFAULTS);
    setAutoNote(null);
  };

  const handleDownload = () => {
    const ec = enhancedCanvasRef.current;
    if (!ec) return;
    ec.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}-enhanced.jpg`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      },
      'image/jpeg',
      0.92
    );
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  };

  const update = (key: keyof Settings) => (v: number) => setSettings((s) => ({ ...s, [key]: v }));
  const isDefault =
    settings.brightness === 0 && settings.contrast === 0 && settings.saturation === 0 && !settings.sharpen;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
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
          <span className="mt-4 font-display font-normal text-2xl text-tp-ink">Drop a photo here or click to upload</span>
          <span className="mt-2 text-sm text-tp-muted">JPG, PNG or WebP. Processed in your browser and never uploaded.</span>
        </button>
      )}

      {error && (
        <p role="alert" className="mt-4 rounded-tp-button border border-tp-line bg-white px-4 py-3 text-sm text-tp-ink">
          {error}
        </p>
      )}

      <div className={cn('grid gap-6 lg:grid-cols-[1fr_320px]', !hasImage && 'hidden')}>
        <div>
          <div className="relative overflow-hidden rounded-tp-card border border-tp-line bg-tp-black">
            <div className="relative mx-auto w-fit max-w-full">
              <canvas ref={originalCanvasRef} className="block h-auto max-h-[70vh] w-auto max-w-full" aria-label="Original photo" />
              <canvas
                ref={enhancedCanvasRef}
                className="absolute inset-0 block h-full w-full"
                style={{ clipPath: `inset(0 0 0 ${split}%)` }}
                aria-label="Enhanced photo"
              />
              <div
                className="pointer-events-none absolute inset-y-0 w-0.5 bg-tp-paper shadow"
                style={{ left: `${split}%` }}
                aria-hidden="true"
              />
              <span className="pointer-events-none absolute left-3 top-3 rounded-tp-button bg-tp-black/70 px-2.5 py-1 text-xs font-medium text-tp-paper">
                Original
              </span>
              <span className="pointer-events-none absolute right-3 top-3 rounded-tp-button bg-tp-bronze px-2.5 py-1 text-xs font-medium text-tp-black">
                Enhanced
              </span>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="pep-split" className="text-sm font-medium text-tp-ink">
              Compare before and after
            </label>
            <input
              id="pep-split"
              type="range"
              min={0}
              max={100}
              value={split}
              onChange={(e) => setSplit(Number(e.target.value))}
              className="mt-2 h-2 w-full cursor-pointer accent-tp-bronze"
            />
          </div>
        </div>

        <div className="h-fit rounded-tp-card border border-tp-line bg-white p-6">
          <h2 className="font-display font-normal text-2xl text-tp-ink">Adjustments</h2>
          <div className="mt-5 space-y-5">
            <SliderRow id="pep-brightness" label="Brightness" icon={<Sun className="h-4 w-4" />} value={settings.brightness} onChange={update('brightness')} />
            <SliderRow id="pep-contrast" label="Contrast" icon={<Contrast className="h-4 w-4" />} value={settings.contrast} onChange={update('contrast')} />
            <SliderRow id="pep-saturation" label="Saturation" icon={<Palette className="h-4 w-4" />} value={settings.saturation} onChange={update('saturation')} />
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-tp-ink">
              <input
                type="checkbox"
                checked={settings.sharpen}
                onChange={(e) => setSettings((s) => ({ ...s, sharpen: e.target.checked }))}
                className="h-4 w-4 accent-tp-bronze"
              />
              Sharpen (unsharp mask)
            </label>
          </div>

          {autoNote && (
            <p className="mt-4 rounded-tp-button bg-tp-beige/30 px-3 py-2 text-xs text-tp-bronze-ink" aria-live="polite">
              {autoNote}
            </p>
          )}

          <div className="mt-6 grid gap-3">
            <button type="button" onClick={handleAuto} className={cn(buttonVariants({ variant: 'primary' }), 'w-full')}>
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Auto Enhance
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
            <button type="button" onClick={handleDownload} className={cn(buttonVariants({ variant: 'secondary' }), 'w-full')}>
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Enhanced
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-sm text-tp-muted underline underline-offset-4 hover:text-tp-ink"
            >
              Choose a different photo
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-tp-card border border-tp-line bg-white p-6 text-center sm:p-8">
        <h2 className="font-display font-normal text-2xl text-tp-ink sm:text-3xl">Want professional AI headshots?</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-tp-muted">
          Filters can only polish the photo you already have. TailorPic creates new, studio-style headshots from your selfies.
        </p>
        <Link href={ctaHref} className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'mt-5')}>
          Try TailorPic
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
