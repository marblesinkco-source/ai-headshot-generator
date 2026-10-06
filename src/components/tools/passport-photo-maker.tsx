'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Upload, Download, Printer, ZoomIn, ZoomOut, RotateCcw, Info, ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MAX_FILE_BYTES = 20 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const SHEET_W = 1200;
const SHEET_H = 1800;
const PREVIEW_MAX_W = 360;
const PREVIEW_MAX_H = 460;
const CUSTOM_DPI = 300;
const ctaHref = '/auth/register?redirect=/dashboard/upload';

interface Preset {
  id: string;
  label: string;
  size: string;
  width: number;
  height: number;
}

const PRESETS: Preset[] = [
  { id: 'us', label: 'US Passport', size: '2x2 in / 600x600 px', width: 600, height: 600 },
  { id: 'uk', label: 'UK Passport', size: '35x45 mm / 413x531 px', width: 413, height: 531 },
  { id: 'eu', label: 'EU/Schengen', size: '35x45 mm / 413x531 px', width: 413, height: 531 },
  { id: 'in', label: 'India Passport', size: '2x2 in / 600x600 px', width: 600, height: 600 },
  { id: 'ca', label: 'Canada Passport', size: '50x70 mm / 590x826 px', width: 590, height: 826 },
  { id: 'au', label: 'Australia Passport', size: '35x45 mm / 413x531 px', width: 413, height: 531 },
  { id: 'cn', label: 'China Passport', size: '33x48 mm / 390x567 px', width: 390, height: 567 },
];
const CUSTOM_ID = 'custom';

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function mmToPx(mm: number) {
  return Math.round((mm / 25.4) * CUSTOM_DPI);
}

/** Draws the image "cover"-fitted into a w x h frame. ox/oy are offsets as fractions of the frame. */
function drawPhoto(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number,
  zoom: number,
  ox: number,
  oy: number
) {
  const s = Math.max(w / img.naturalWidth, h / img.naturalHeight) * zoom;
  const dw = img.naturalWidth * s;
  const dh = img.naturalHeight * s;
  const dx = (w - dw) / 2 + ox * w;
  const dy = (h - dh) / 2 + oy * h;
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, w, h);
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, dx, dy, dw, dh);
}

function maxOffset(img: HTMLImageElement, w: number, h: number, zoom: number) {
  const s = Math.max(w / img.naturalWidth, h / img.naturalHeight) * zoom;
  return {
    x: Math.max(0, (img.naturalWidth * s - w) / 2 / w),
    y: Math.max(0, (img.naturalHeight * s - h) / 2 / h),
  };
}

function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, 'image/png');
}

export default function PassportPhotoMaker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const urlRef = useRef<string | null>(null);
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number; w: number; h: number } | null>(null);

  const [hasImage, setHasImage] = useState(false);
  const [presetId, setPresetId] = useState('us');
  const [customW, setCustomW] = useState('35');
  const [customH, setCustomH] = useState('45');
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [showGuide, setShowGuide] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState('photo');

  const target = useMemo(() => {
    if (presetId === CUSTOM_ID) {
      const wmm = clamp(parseFloat(customW) || 35, 10, 100);
      const hmm = clamp(parseFloat(customH) || 45, 10, 100);
      return { width: mmToPx(wmm), height: mmToPx(hmm), label: 'Custom', valid: true };
    }
    const p = PRESETS.find((x) => x.id === presetId) ?? PRESETS[0];
    return { width: p.width, height: p.height, label: p.label, valid: true };
  }, [presetId, customW, customH]);

  const previewW = Math.round(Math.min(PREVIEW_MAX_W, (PREVIEW_MAX_H * target.width) / target.height));
  const previewH = Math.round((previewW * target.height) / target.width);

  const clampOffset = useCallback(
    (o: { x: number; y: number }, z: number) => {
      const img = imgRef.current;
      if (!img) return o;
      const m = maxOffset(img, target.width, target.height, z);
      return { x: clamp(o.x, -m.x, m.x), y: clamp(o.y, -m.y, m.y) };
    },
    [target.width, target.height]
  );

  // Keep the offset valid when the frame shape changes.
  useEffect(() => {
    setOffset((o) => clampOffset(o, zoom));
  }, [clampOffset, zoom]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    canvas.width = Math.round(previewW * dpr);
    canvas.height = Math.round(previewH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.fillStyle = '#F8F5EF';
    ctx.fillRect(0, 0, previewW, previewH);

    if (img) {
      drawPhoto(ctx, img, previewW, previewH, zoom, offset.x, offset.y);
    }

    if (img && showGuide) {
      const cx = previewW / 2;
      const ry = previewH * 0.36;
      const rx = Math.min(ry * 0.78, previewW * 0.4);
      const cy = previewH * 0.46;
      ctx.save();
      // Dim outside of the oval
      ctx.fillStyle = 'rgba(11, 11, 11, 0.35)';
      ctx.beginPath();
      ctx.rect(0, 0, previewW, previewH);
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2, true);
      ctx.fill('evenodd');
      // Oval outline
      ctx.strokeStyle = '#C9A98A';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Eye line
      ctx.setLineDash([4, 6]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - rx, cy - ry * 0.18);
      ctx.lineTo(cx + rx, cy - ry * 0.18);
      ctx.stroke();
      ctx.restore();
    }

    // Frame border
    ctx.strokeStyle = '#DFD6CC';
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, previewW - 1, previewH - 1);
  }, [previewW, previewH, zoom, offset, showGuide, hasImage]);

  useEffect(() => {
    render();
  }, [render]);

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  const loadFile = useCallback((file: File | undefined | null) => {
    if (!file) return;
    setError(null);
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Please choose a JPG, PNG or WebP image.');
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setError('That file is larger than 20MB. Please choose a smaller image.');
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = url;
      imgRef.current = img;
      setFileName(file.name.replace(/\.[^.]+$/, '') || 'photo');
      setZoom(1);
      setOffset({ x: 0, y: 0 });
      setHasImage(true);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setError('We could not read that image. Please try a different file.');
    };
    img.src = url;
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    loadFile(e.dataTransfer.files?.[0]);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!imgRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y, w: rect.width, h: rect.height };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const d = dragRef.current;
    if (!d) return;
    const next = { x: d.ox + (e.clientX - d.x) / d.w, y: d.oy + (e.clientY - d.y) / d.h };
    setOffset(clampOffset(next, zoom));
  };

  const endDrag = () => {
    dragRef.current = null;
  };

  const onZoom = (z: number) => {
    const nz = clamp(z, MIN_ZOOM, MAX_ZOOM);
    setZoom(nz);
    setOffset((o) => clampOffset(o, nz));
  };

  const reset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const renderOutput = useCallback((): HTMLCanvasElement | null => {
    const img = imgRef.current;
    if (!img) return null;
    const out = document.createElement('canvas');
    out.width = target.width;
    out.height = target.height;
    const ctx = out.getContext('2d');
    if (!ctx) return null;
    drawPhoto(ctx, img, target.width, target.height, zoom, offset.x, offset.y);
    return out;
  }, [target.width, target.height, zoom, offset]);

  const slug = target.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const onDownload = () => {
    const out = renderOutput();
    if (out) downloadCanvas(out, `${fileName}-${slug}-${target.width}x${target.height}.png`);
  };

  const onDownloadSheet = () => {
    const photo = renderOutput();
    if (!photo) return;
    const sheet = document.createElement('canvas');
    sheet.width = SHEET_W;
    sheet.height = SHEET_H;
    const ctx = sheet.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, SHEET_W, SHEET_H);

    const margin = 30;
    const gap = 20;
    const availW = SHEET_W - margin * 2;
    const availH = SHEET_H - margin * 2;

    const fit = (tw: number, th: number) => {
      const cols = Math.max(0, Math.floor((availW + gap) / (tw + gap)));
      const rows = Math.max(0, Math.floor((availH + gap) / (th + gap)));
      return { cols, rows, count: cols * rows };
    };

    let tw = photo.width;
    let th = photo.height;
    let rotated = false;
    const portrait = fit(tw, th);
    const landscape = fit(th, tw);
    let layout = portrait;
    if (landscape.count > portrait.count) {
      rotated = true;
      tw = photo.height;
      th = photo.width;
      layout = landscape;
    }
    let scale = 1;
    if (layout.count === 0) {
      scale = Math.min(availW / tw, availH / th);
      tw = Math.floor(tw * scale);
      th = Math.floor(th * scale);
      layout = { cols: 1, rows: 1, count: 1 };
    }

    const gridW = layout.cols * tw + (layout.cols - 1) * gap;
    const gridH = layout.rows * th + (layout.rows - 1) * gap;
    const startX = Math.round((SHEET_W - gridW) / 2);
    const startY = Math.round((SHEET_H - gridH) / 2);

    ctx.imageSmoothingQuality = 'high';
    for (let r = 0; r < layout.rows; r++) {
      for (let c = 0; c < layout.cols; c++) {
        const x = startX + c * (tw + gap);
        const y = startY + r * (th + gap);
        if (rotated) {
          ctx.save();
          ctx.translate(x + tw / 2, y + th / 2);
          ctx.rotate(Math.PI / 2);
          ctx.drawImage(photo, -th / 2, -tw / 2, th, tw);
          ctx.restore();
        } else {
          ctx.drawImage(photo, x, y, tw, th);
        }
        ctx.strokeStyle = '#DFD6CC';
        ctx.lineWidth = 1;
        ctx.strokeRect(x - 0.5, y - 0.5, tw + 1, th + 1);
      }
    }
    downloadCanvas(sheet, `${fileName}-${slug}-4x6-sheet.png`);
  };

  const dimsLabel =
    presetId === CUSTOM_ID
      ? `${target.width}x${target.height} px at ${CUSTOM_DPI} DPI`
      : (PRESETS.find((p) => p.id === presetId)?.size ?? '');

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* Controls */}
        <div className="space-y-6">
          <div className="rounded-tp-card border border-tp-line bg-white p-5">
            <h2 className="font-display text-xl font-normal text-tp-ink">1. Choose a document</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Document type">
              {[...PRESETS.map((p) => ({ id: p.id, label: p.label, size: p.size })), { id: CUSTOM_ID, label: 'Custom', size: 'Enter your own size' }].map(
                (p) => {
                  const active = presetId === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setPresetId(p.id)}
                      className={cn(
                        'rounded-tp-button border-2 px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
                        active ? 'border-tp-bronze bg-tp-paper' : 'border-tp-line bg-white hover:border-tp-bronze'
                      )}
                    >
                      <span className="block text-sm font-semibold text-tp-ink">{p.label}</span>
                      <span className="block text-xs text-tp-muted">{p.size}</span>
                    </button>
                  );
                }
              )}
            </div>

            {presetId === CUSTOM_ID && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <label className="block text-xs font-semibold text-tp-ink">
                  Width (mm)
                  <input
                    type="number"
                    inputMode="decimal"
                    min={10}
                    max={100}
                    value={customW}
                    onChange={(e) => setCustomW(e.target.value)}
                    className="mt-1 h-11 w-full rounded-tp-button border border-tp-line bg-white px-3 text-sm text-tp-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
                  />
                </label>
                <label className="block text-xs font-semibold text-tp-ink">
                  Height (mm)
                  <input
                    type="number"
                    inputMode="decimal"
                    min={10}
                    max={100}
                    value={customH}
                    onChange={(e) => setCustomH(e.target.value)}
                    className="mt-1 h-11 w-full rounded-tp-button border border-tp-line bg-white px-3 text-sm text-tp-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
                  />
                </label>
                <p className="col-span-2 text-xs text-tp-muted">Between 10 and 100 mm. Output is rendered at {CUSTOM_DPI} DPI.</p>
              </div>
            )}
          </div>

          <div className="rounded-tp-card border border-tp-line bg-white p-5">
            <h2 className="font-display text-xl font-normal text-tp-ink">2. Upload your photo</h2>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  inputRef.current?.click();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Upload a photo"
              className={cn(
                'mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-tp-card border-2 border-dashed px-4 py-8 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
                dragOver ? 'border-tp-bronze bg-tp-paper' : 'border-tp-beige bg-white hover:border-tp-bronze hover:bg-tp-paper'
              )}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-tp-beige/40 text-tp-bronze-ink">
                <Upload className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-tp-ink">{hasImage ? 'Replace photo' : 'Drag & drop or click to upload'}</span>
              <span className="text-xs text-tp-muted">JPG, PNG or WebP, up to 20MB. Your photo never leaves your device.</span>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={(e) => {
                loadFile(e.target.files?.[0]);
                e.target.value = '';
              }}
            />
            {error && (
              <p role="alert" className="mt-3 text-sm text-tp-error">
                {error}
              </p>
            )}
          </div>

          <div className="rounded-tp-card border border-tp-line bg-white p-5">
            <h2 className="font-display text-xl font-normal text-tp-ink">3. Position &amp; download</h2>
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => onZoom(zoom - 0.1)}
                disabled={!hasImage}
                aria-label="Zoom out"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-tp-button border border-tp-line text-tp-bronze-ink hover:border-tp-bronze disabled:opacity-50"
              >
                <ZoomOut className="h-4 w-4" aria-hidden="true" />
              </button>
              <input
                type="range"
                min={MIN_ZOOM}
                max={MAX_ZOOM}
                step={0.01}
                value={zoom}
                disabled={!hasImage}
                onChange={(e) => onZoom(parseFloat(e.target.value))}
                aria-label="Zoom"
                className="h-2 w-full cursor-pointer accent-tp-bronze-ink disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => onZoom(zoom + 0.1)}
                disabled={!hasImage}
                aria-label="Zoom in"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-tp-button border border-tp-line text-tp-bronze-ink hover:border-tp-bronze disabled:opacity-50"
              >
                <ZoomIn className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="w-10 text-right text-xs tabular-nums text-tp-muted">{zoom.toFixed(1)}x</span>
            </div>

            <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-tp-ink">
              <input
                type="checkbox"
                checked={showGuide}
                onChange={(e) => setShowGuide(e.target.checked)}
                className="h-4 w-4 accent-tp-bronze-ink"
              />
              Show face guide
            </label>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onDownload}
                disabled={!hasImage}
                className={cn(buttonVariants({ variant: 'primary', size: 'md' }))}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download PNG
              </button>
              <button
                type="button"
                onClick={onDownloadSheet}
                disabled={!hasImage}
                className={cn(buttonVariants({ variant: 'outline', size: 'md' }))}
              >
                <Printer className="h-4 w-4" aria-hidden="true" />
                4x6 print sheet
              </button>
              <button
                type="button"
                onClick={reset}
                disabled={!hasImage}
                className={cn(buttonVariants({ variant: 'ghost', size: 'md' }))}
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Reset
              </button>
            </div>
            <p className="mt-3 text-xs text-tp-muted">
              The print sheet is a 1200x1800 px canvas (4x6 in at 300 DPI) with your photo tiled as many times as fits.
            </p>
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-tp-card border border-tp-line bg-white p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-display text-xl font-normal text-tp-ink">Preview</h2>
            <span className="text-xs text-tp-muted">
              {target.label}: {dimsLabel}
            </span>
          </div>
          <div className="mt-4 flex justify-center rounded-tp-card bg-tp-paper p-4">
            <canvas
              ref={canvasRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              aria-label="Photo crop preview. Drag to reposition."
              style={{
                width: previewW,
                maxWidth: '100%',
                aspectRatio: `${target.width} / ${target.height}`,
                touchAction: 'none',
              }}
              className={cn('rounded-tp-button bg-white shadow-sm', hasImage ? 'cursor-grab active:cursor-grabbing' : 'cursor-default')}
            />
          </div>
          <p className="mt-3 text-center text-xs text-tp-muted">
            {hasImage
              ? 'Drag to reposition, use the slider to zoom. Keep the face inside the oval. The guide is not exported.'
              : 'Upload a photo to start cropping.'}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-tp-card border border-tp-line bg-white p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
        <p className="text-sm text-tp-muted">This tool provides a crop guide only. Official acceptance depends on the issuing authority.</p>
      </div>

      <div className="mt-6 rounded-tp-card bg-tp-black p-6 text-center">
        <p className="text-sm text-tp-bronze">Want a polished, professional photo before you crop it?</p>
        <Link href={ctaHref} className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'mt-4 bg-tp-bronze text-tp-black hover:bg-tp-beige')}>
          Try TailorPic
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
