'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, Copy, Download, Palette, RefreshCw, ShieldCheck, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

const MAX_BYTES = 15 * 1024 * 1024;
const SAMPLE_MAX = 200;
const MAX_COLORS = 8;
const MERGE_DISTANCE = 50;
const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

interface Swatch {
  r: number;
  g: number;
  b: number;
  hex: string;
  count: number;
}

function toHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function luminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function extractPalette(data: Uint8ClampedArray): Swatch[] {
  // 32 x 32 x 32 buckets (each channel divided by 8)
  const sums = new Map<number, { r: number; g: number; b: number; n: number }>();
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 128) continue;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const key = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);
    const s = sums.get(key);
    if (s) {
      s.r += r;
      s.g += g;
      s.b += b;
      s.n += 1;
    } else {
      sums.set(key, { r, g, b, n: 1 });
    }
  }

  const buckets = Array.from(sums.values())
    .map((s) => ({ r: s.r / s.n, g: s.g / s.n, b: s.b / s.n, n: s.n }))
    .sort((a, b) => b.n - a.n);

  // Greedy merge: close colors fold into the stronger one
  const chosen: { r: number; g: number; b: number; n: number }[] = [];
  for (const bucket of buckets) {
    let target: (typeof chosen)[number] | undefined;
    for (const c of chosen) {
      const d = Math.sqrt((c.r - bucket.r) ** 2 + (c.g - bucket.g) ** 2 + (c.b - bucket.b) ** 2);
      if (d < MERGE_DISTANCE) {
        target = c;
        break;
      }
    }
    if (target) {
      const total = target.n + bucket.n;
      target.r = (target.r * target.n + bucket.r * bucket.n) / total;
      target.g = (target.g * target.n + bucket.g * bucket.n) / total;
      target.b = (target.b * target.n + bucket.b * bucket.n) / total;
      target.n = total;
    } else if (chosen.length < MAX_COLORS) {
      chosen.push({ ...bucket });
    }
  }

  return chosen
    .map((c) => {
      const r = Math.round(c.r);
      const g = Math.round(c.g);
      const b = Math.round(c.b);
      return { r, g, b, hex: toHex(r, g, b), count: c.n };
    })
    .sort((a, b) => luminance(b.r, b.g, b.b) - luminance(a.r, a.g, a.b));
}

const primaryBtn =
  'inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-5 py-3 text-sm font-semibold text-tp-black transition-colors hover:bg-tp-bronze/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-ink disabled:cursor-not-allowed disabled:opacity-50';
const secondaryBtn =
  'inline-flex items-center gap-2 rounded-tp-button border border-tp-line bg-white px-5 py-3 text-sm font-semibold text-tp-ink transition-colors hover:border-tp-bronze focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze disabled:cursor-not-allowed disabled:opacity-50';

export default function ColorPaletteExtractor() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<string | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [palette, setPalette] = useState<Swatch[]>([]);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  const loadFile = useCallback((file: File | undefined | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file (JPG, PNG, WebP).');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('That file is larger than 15MB. Please choose a smaller image.');
      return;
    }
    setError(null);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      try {
        const scale = Math.min(1, SAMPLE_MAX / Math.max(img.naturalWidth, img.naturalHeight));
        const w = Math.max(1, Math.round(img.naturalWidth * scale));
        const h = Math.max(1, Math.round(img.naturalHeight * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) throw new Error('no canvas');
        ctx.drawImage(img, 0, 0, w, h);
        const colors = extractPalette(ctx.getImageData(0, 0, w, h).data);
        if (colors.length === 0) throw new Error('no colors');
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        urlRef.current = url;
        setPreviewUrl(url);
        setPalette(colors);
      } catch {
        URL.revokeObjectURL(url);
        setError('We could not analyze that image. Try a different file.');
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setError('We could not read that image. Try a different file.');
    };
    img.src = url;
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    loadFile(e.dataTransfer.files?.[0]);
  };

  const copyText = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(null), 1600);
    } catch {
      setError('Copying is not available in this browser. Select the code and copy it manually.');
    }
  };

  const cssVariables = () =>
    ':root {\n' + palette.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join('\n') + '\n}';

  const handleDownload = () => {
    if (palette.length === 0) return;
    const cell = 200;
    const canvas = document.createElement('canvas');
    canvas.width = cell * palette.length;
    canvas.height = cell;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    palette.forEach((c, i) => {
      ctx.fillStyle = c.hex;
      ctx.fillRect(i * cell, 0, cell, cell);
      ctx.fillStyle = luminance(c.r, c.g, c.b) > 150 ? '#0F0F0F' : '#FFFFFF';
      ctx.font = '600 20px Manrope, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(c.hex, i * cell + cell / 2, cell - 24);
    });
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'color-palette.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  };

  const handleReset = () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setPreviewUrl(null);
    setPalette([]);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          'flex flex-col items-center justify-center gap-2 rounded-tp-card border border-dashed px-4 py-6 text-center transition-colors',
          dragging ? 'border-tp-ink bg-tp-beige' : 'border-tp-bronze bg-tp-paper hover:bg-tp-beige/60'
        )}
      >
        <Upload className="h-5 w-5 text-tp-bronze-ink" aria-hidden="true" />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-tp-button text-sm font-semibold text-tp-ink underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
        >
          {previewUrl ? 'Choose a different photo' : 'Click to upload a photo'}
        </button>
        <p className="text-xs text-tp-muted">or drag and drop an image here (max 15MB)</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          aria-label="Upload a photo to extract colors from"
          onChange={(e) => loadFile(e.target.files?.[0])}
        />
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm font-semibold text-tp-ink">
          {error}
        </p>
      )}

      <div className="mt-6 flex items-center justify-center rounded-tp-card border border-tp-line bg-tp-paper p-4">
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt="Your uploaded photo"
            width={400}
            height={400}
            className="block max-h-[420px] w-auto max-w-full rounded-tp-button"
          />
        ) : (
          <div className="flex h-48 flex-col items-center justify-center gap-2 text-center text-sm text-tp-muted">
            <Palette className="h-6 w-6 text-tp-bronze-ink" aria-hidden="true" />
            Your photo preview will appear here.
          </div>
        )}
      </div>

      {palette.length > 0 && (
        <div className="mt-6">
          <div className="flex h-16 overflow-hidden rounded-tp-card border border-tp-line" aria-hidden="true">
            {palette.map((c) => (
              <div key={c.hex} className="flex-1" style={{ backgroundColor: c.hex }} />
            ))}
          </div>

          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {palette.map((c) => (
              <li
                key={c.hex}
                className="flex items-center gap-4 rounded-tp-card border border-tp-line bg-white p-3"
              >
                <span
                  className="h-14 w-14 shrink-0 rounded-tp-button border border-tp-line"
                  style={{ backgroundColor: c.hex }}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-tp-ink">{c.hex}</p>
                  <p className="text-xs text-tp-muted">
                    rgb({c.r}, {c.g}, {c.b})
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => copyText(c.hex, c.hex + '-hex')}
                    aria-label={`Copy ${c.hex}`}
                    className="inline-flex items-center gap-1.5 rounded-tp-button border border-tp-line bg-white px-2.5 py-2 text-xs font-semibold text-tp-ink transition-colors hover:border-tp-bronze focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
                  >
                    {copied === c.hex + '-hex' ? (
                      <Check className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    )}
                    HEX
                  </button>
                  <button
                    type="button"
                    onClick={() => copyText(`rgb(${c.r}, ${c.g}, ${c.b})`, c.hex + '-rgb')}
                    aria-label={`Copy rgb(${c.r}, ${c.g}, ${c.b})`}
                    className="inline-flex items-center gap-1.5 rounded-tp-button border border-tp-line bg-white px-2.5 py-2 text-xs font-semibold text-tp-ink transition-colors hover:border-tp-bronze focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
                  >
                    {copied === c.hex + '-rgb' ? (
                      <Check className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    )}
                    RGB
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => copyText(cssVariables(), 'css')} className={primaryBtn}>
              {copied === 'css' ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Copy className="h-4 w-4" aria-hidden="true" />
              )}
              Copy as CSS variables
            </button>
            <button
              type="button"
              onClick={() => copyText(palette.map((c) => c.hex).join(', '), 'list')}
              className={secondaryBtn}
            >
              {copied === 'list' ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Copy className="h-4 w-4" aria-hidden="true" />
              )}
              Copy HEX list
            </button>
            <button type="button" onClick={handleDownload} className={secondaryBtn}>
              <Download className="h-4 w-4" aria-hidden="true" />
              Download PNG
            </button>
            <button type="button" onClick={handleReset} className={secondaryBtn}>
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Start over
            </button>
          </div>
          <p className="sr-only" role="status" aria-live="polite">
            {copied ? 'Copied to clipboard' : ''}
          </p>
        </div>
      )}

      <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-tp-muted">
        <ShieldCheck className="h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
        Everything runs in your browser. Nothing is uploaded.
      </p>

      <div className="mt-10 flex flex-col items-start gap-4 rounded-tp-card border border-tp-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tp-button bg-tp-beige/40 text-tp-bronze-ink">
            <Palette className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-xl font-normal text-tp-ink">Match your photo to your brand</h3>
            <p className="mt-1 text-sm text-tp-muted">
              TailorPic creates studio-style AI headshots from your selfies, from {BASE_PRICE_DISPLAY}.
            </p>
          </div>
        </div>
        <Link
          href={ctaHref}
          className="inline-flex shrink-0 items-center rounded-tp-button bg-tp-ink px-5 py-3 text-sm font-semibold text-tp-paper transition-colors hover:bg-tp-black focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
        >
          Try TailorPic
        </Link>
      </div>
    </div>
  );
}
