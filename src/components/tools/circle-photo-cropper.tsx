'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Upload, Download, X, ShieldCheck, RotateCcw } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

const MAX_BYTES = 15 * 1024 * 1024;
const PREVIEW_SIZE = 400;
const PREVIEW_PAD = 20;
const SIZES = [200, 400, 500, 800, 1000];
const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

type BgMode = 'transparent' | 'white' | 'black' | 'custom';

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

/** Max pan (as a fraction of circle diameter) that keeps the circle fully covered. */
function maxPan(img: HTMLImageElement, zoom: number) {
  const s = Math.max(1 / img.naturalWidth, 1 / img.naturalHeight) * zoom;
  return {
    x: Math.max(0, (img.naturalWidth * s - 1) / 2),
    y: Math.max(0, (img.naturalHeight * s - 1) / 2),
  };
}

/** Draws the image into a circle of diameter `d` centred at (cx, cy). Offsets are fractions of d. */
function drawImageInCircle(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cx: number,
  cy: number,
  d: number,
  zoom: number,
  ox: number,
  oy: number,
) {
  const s = Math.max(1 / img.naturalWidth, 1 / img.naturalHeight) * zoom;
  const w = img.naturalWidth * s * d;
  const h = img.naturalHeight * s * d;
  ctx.drawImage(img, cx + ox * d - w / 2, cy + oy * d - h / 2, w, h);
}

export default function CirclePhotoCropper() {
  const previewRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(500);
  const [bgMode, setBgMode] = useState<BgMode>('transparent');
  const [customColor, setCustomColor] = useState('#c8a27a');

  const bgColor =
    bgMode === 'white' ? '#ffffff' : bgMode === 'black' ? '#000000' : bgMode === 'custom' ? customColor : null;

  const loadFile = useCallback((file: File | undefined | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file (JPG, PNG, WebP).');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('That file is larger than 15MB. Please choose a smaller photo.');
      return;
    }
    setError(null);
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      setImg(image);
      setZoom(1);
      setOffset({ x: 0, y: 0 });
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      setError('We could not read that image. Try a different file.');
    };
    image.src = url;
  }, []);

  // Render preview
  useEffect(() => {
    const canvas = previewRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = PREVIEW_SIZE;
    const d = W - PREVIEW_PAD * 2;
    const c = W / 2;
    ctx.clearRect(0, 0, W, W);

    // Checkerboard base
    const tile = 16;
    for (let y = 0; y < W; y += tile) {
      for (let x = 0; x < W; x += tile) {
        ctx.fillStyle = ((x + y) / tile) % 2 === 0 ? '#f4efe8' : '#e6dfd4';
        ctx.fillRect(x, y, tile, tile);
      }
    }
    if (!img) return;

    const pan = maxPan(img, zoom);
    const ox = clamp(offset.x, -pan.x, pan.x);
    const oy = clamp(offset.y, -pan.y, pan.y);

    // Full photo (dimmed) so the user sees what is outside the circle
    ctx.save();
    drawImageInCircle(ctx, img, c, c, d, zoom, ox, oy);
    ctx.fillStyle = 'rgba(10,10,10,0.55)';
    ctx.fillRect(0, 0, W, W);
    ctx.restore();

    // Circle content
    ctx.save();
    ctx.beginPath();
    ctx.arc(c, c, d / 2, 0, Math.PI * 2);
    ctx.clip();
    if (bgColor) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, W, W);
    } else {
      for (let y = 0; y < W; y += tile) {
        for (let x = 0; x < W; x += tile) {
          ctx.fillStyle = ((x + y) / tile) % 2 === 0 ? '#ffffff' : '#e6dfd4';
          ctx.fillRect(x, y, tile, tile);
        }
      }
    }
    drawImageInCircle(ctx, img, c, c, d, zoom, ox, oy);
    ctx.restore();

    // Ring
    ctx.beginPath();
    ctx.arc(c, c, d / 2, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [img, zoom, offset, bgColor]);

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!img) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const start = dragRef.current;
    if (!start || !img) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cssPerPreviewPx = rect.width / PREVIEW_SIZE;
    const d = PREVIEW_SIZE - PREVIEW_PAD * 2;
    const dx = (e.clientX - start.x) / cssPerPreviewPx / d;
    const dy = (e.clientY - start.y) / cssPerPreviewPx / d;
    const pan = maxPan(img, zoom);
    setOffset({
      x: clamp(start.ox + dx, -pan.x, pan.x),
      y: clamp(start.oy + dy, -pan.y, pan.y),
    });
  };

  const endDrag = () => {
    dragRef.current = null;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (!img) return;
    const step = 0.02;
    const pan = maxPan(img, zoom);
    let { x, y } = offset;
    if (e.key === 'ArrowLeft') x -= step;
    else if (e.key === 'ArrowRight') x += step;
    else if (e.key === 'ArrowUp') y -= step;
    else if (e.key === 'ArrowDown') y += step;
    else return;
    e.preventDefault();
    setOffset({ x: clamp(x, -pan.x, pan.x), y: clamp(y, -pan.y, pan.y) });
  };

  const handleZoom = (value: number) => {
    setZoom(value);
    if (img) {
      const pan = maxPan(img, value);
      setOffset((o) => ({ x: clamp(o.x, -pan.x, pan.x), y: clamp(o.y, -pan.y, pan.y) }));
    }
  };

  const reset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const clearPhoto = () => {
    setImg(null);
    setError(null);
    reset();
    if (inputRef.current) inputRef.current.value = '';
  };

  const download = () => {
    if (!img) return;
    const out = document.createElement('canvas');
    out.width = size;
    out.height = size;
    const ctx = out.getContext('2d');
    if (!ctx) {
      setError('Your browser could not create the image. Try a different browser.');
      return;
    }
    ctx.imageSmoothingQuality = 'high';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.clip();
    if (bgColor) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, size, size);
    }
    const pan = maxPan(img, zoom);
    drawImageInCircle(
      ctx,
      img,
      size / 2,
      size / 2,
      size,
      zoom,
      clamp(offset.x, -pan.x, pan.x),
      clamp(offset.y, -pan.y, pan.y),
    );
    out.toBlob((blob) => {
      if (!blob) {
        setError('Could not create the PNG. Please try again.');
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'circle-photo.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  };

  const bgOptions: { id: BgMode; label: string }[] = [
    { id: 'transparent', label: 'Transparent' },
    { id: 'white', label: 'White' },
    { id: 'black', label: 'Black' },
    { id: 'custom', label: 'Custom' },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
      <div className="rounded-tp-card border border-tp-line bg-white p-5 sm:p-8">
        {!img ? (
          <div>
            <label
              htmlFor="circle-photo-input"
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                loadFile(e.dataTransfer.files?.[0]);
              }}
              className={cn(
                'flex cursor-pointer flex-col items-center justify-center rounded-tp-card border-2 border-dashed px-6 py-14 text-center transition-colors',
                dragOver ? 'border-tp-bronze bg-tp-beige/40' : 'border-tp-line bg-tp-paper hover:border-tp-bronze',
              )}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-beige/40 text-tp-bronze-ink">
                <Upload className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="mt-4 text-base font-medium text-tp-ink">Drop your photo here or click to upload</span>
              <span className="mt-1 text-sm text-tp-muted">JPG, PNG or WebP, up to 15MB</span>
            </label>
            <input
              ref={inputRef}
              id="circle-photo-input"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => loadFile(e.target.files?.[0])}
            />
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-[minmax(0,400px)_1fr]">
            <div>
              <canvas
                ref={previewRef}
                width={PREVIEW_SIZE}
                height={PREVIEW_SIZE}
                tabIndex={0}
                role="img"
                aria-label="Circle crop preview. Drag or use arrow keys to reposition the photo."
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onKeyDown={onKeyDown}
                className="aspect-square w-full max-w-[400px] cursor-grab touch-none rounded-tp-card border border-tp-line active:cursor-grabbing"
              />
              <p className="mt-2 text-xs text-tp-muted">Drag the photo to reposition it inside the circle.</p>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="circle-zoom" className="text-sm font-medium text-tp-ink">
                    Zoom
                  </label>
                  <span className="text-sm text-tp-muted">{zoom.toFixed(2)}x</span>
                </div>
                <input
                  id="circle-zoom"
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={zoom}
                  onChange={(e) => handleZoom(parseFloat(e.target.value))}
                  className="mt-2 w-full accent-tp-bronze"
                />
              </div>

              <div>
                <label htmlFor="circle-size" className="text-sm font-medium text-tp-ink">
                  Output size
                </label>
                <select
                  id="circle-size"
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value, 10))}
                  className="mt-2 w-full rounded-tp-button border border-tp-line bg-white px-3 py-2.5 text-sm text-tp-ink focus:border-tp-bronze-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink/40"
                >
                  {SIZES.map((s) => (
                    <option key={s} value={s}>
                      {s} x {s} px
                    </option>
                  ))}
                </select>
              </div>

              <fieldset>
                <legend className="text-sm font-medium text-tp-ink">Background</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {bgOptions.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setBgMode(o.id)}
                      aria-pressed={bgMode === o.id}
                      className={cn(
                        'rounded-tp-button border px-3 py-2 text-sm transition-colors',
                        bgMode === o.id
                          ? 'border-tp-ink bg-tp-ink text-tp-paper'
                          : 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze',
                      )}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
                {bgMode === 'custom' && (
                  <div className="mt-3 flex items-center gap-3">
                    <input
                      id="circle-custom-color"
                      type="color"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      aria-label="Custom background color"
                      className="h-10 w-14 cursor-pointer rounded-tp-button border border-tp-line bg-white p-1"
                    />
                    <span className="text-sm text-tp-muted">{customColor.toUpperCase()}</span>
                  </div>
                )}
              </fieldset>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={download}
                  className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'bg-tp-bronze text-tp-black hover:bg-tp-beige')}
                >
                  <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                  Download PNG
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center rounded-tp-button border border-tp-line bg-white px-4 py-2.5 text-sm text-tp-ink hover:border-tp-bronze"
                >
                  <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
                  Reset
                </button>
                <button
                  type="button"
                  onClick={clearPhoto}
                  className="inline-flex items-center rounded-tp-button border border-tp-line bg-white px-4 py-2.5 text-sm text-tp-ink hover:border-tp-bronze"
                >
                  <X className="mr-2 h-4 w-4" aria-hidden="true" />
                  New photo
                </button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <p role="alert" className="mt-4 rounded-tp-button border border-tp-line bg-tp-paper px-4 py-3 text-sm text-tp-ink">
            {error}
          </p>
        )}

        <p className="mt-6 flex items-center gap-2 text-sm text-tp-muted">
          <ShieldCheck className="h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
          Everything runs in your browser. Nothing is uploaded.
        </p>
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-tp-card border border-tp-line bg-tp-beige/30 p-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-xl font-normal text-tp-ink">Need a better photo to crop?</p>
          <p className="mt-1 text-sm text-tp-muted">
            Create studio-style AI headshots from your selfies. Plans start from {BASE_PRICE_DISPLAY}.
          </p>
        </div>
        <Link
          href={ctaHref}
          className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'shrink-0 bg-tp-ink text-tp-paper hover:bg-tp-black')}
        >
          Try TailorPic
        </Link>
      </div>
    </div>
  );
}
