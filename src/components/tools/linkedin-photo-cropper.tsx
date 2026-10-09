'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Upload, Download, ZoomIn, ZoomOut, Move, ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CANVAS_SIZE = 400;
const OUTPUT_SIZE = 400;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const MAX_FILE_BYTES = 20 * 1024 * 1024;
const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

export default function LinkedInPhotoCropper() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  const [hasImage, setHasImage] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState('photo');

  // Scale so the image covers the square at zoom 1.
  const baseScale = useCallback(() => {
    const img = imgRef.current;
    if (!img) return 1;
    return Math.max(CANVAS_SIZE / img.naturalWidth, CANVAS_SIZE / img.naturalHeight);
  }, []);

  const clampOffset = useCallback(
    (o: { x: number; y: number }, z: number) => {
      const img = imgRef.current;
      if (!img) return o;
      const s = baseScale() * z;
      const maxX = Math.max(0, (img.naturalWidth * s - CANVAS_SIZE) / 2);
      const maxY = Math.max(0, (img.naturalHeight * s - CANVAS_SIZE) / 2);
      return {
        x: Math.min(maxX, Math.max(-maxX, o.x)),
        y: Math.min(maxY, Math.max(-maxY, o.y)),
      };
    },
    [baseScale]
  );

  const drawImage = useCallback(
    (ctx: CanvasRenderingContext2D, size: number, z: number, o: { x: number; y: number }) => {
      const img = imgRef.current;
      if (!img) return;
      const ratio = size / CANVAS_SIZE;
      const s = baseScale() * z * ratio;
      const w = img.naturalWidth * s;
      const h = img.naturalHeight * s;
      ctx.drawImage(img, size / 2 - w / 2 + o.x * ratio, size / 2 - h / 2 + o.y * ratio, w, h);
    },
    [baseScale]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.fillStyle = '#EDE6DA';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    if (!hasImage) return;
    drawImage(ctx, CANVAS_SIZE, zoom, offset);

    // Dark overlay outside the circle
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.beginPath();
    ctx.rect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 8, 0, Math.PI * 2, true);
    ctx.fill('evenodd');
    ctx.restore();

    // Circle outline
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }, [hasImage, zoom, offset, drawImage]);

  const loadFile = useCallback((file: File | undefined | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file (JPG, PNG or WebP).');
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setError('That file is too large. Please choose an image under 20 MB.');
      return;
    }
    setError(null);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      imgRef.current = img;
      setFileName(file.name.replace(/\.[^.]+$/, '') || 'photo');
      setZoom(1);
      setOffset({ x: 0, y: 0 });
      setHasImage(true);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setError('We could not read that image. Try a different file.');
    };
    img.src = url;
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    loadFile(e.dataTransfer.files?.[0]);
  };

  const changeZoom = (z: number) => {
    const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));
    setZoom(next);
    setOffset((o) => clampOffset(o, next));
  };

  const pointerPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const k = CANVAS_SIZE / rect.width;
    return { x: (e.clientX - rect.left) * k, y: (e.clientY - rect.top) * k };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!hasImage) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = pointerPos(e);
    dragRef.current = { x: p.x, y: p.y, ox: offset.x, oy: offset.y };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const d = dragRef.current;
    if (!d) return;
    const p = pointerPos(e);
    setOffset(clampOffset({ x: d.ox + (p.x - d.x), y: d.oy + (p.y - d.y) }, zoom));
  };

  const endDrag = () => {
    dragRef.current = null;
  };

  const download = () => {
    const img = imgRef.current;
    if (!img) return;
    const out = document.createElement('canvas');
    out.width = OUTPUT_SIZE;
    out.height = OUTPUT_SIZE;
    const ctx = out.getContext('2d');
    if (!ctx) return;
    drawImage(ctx, OUTPUT_SIZE, zoom, offset);
    out.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}-linkedin-400x400.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
      <div className="rounded-tp-card border border-tp-line bg-white p-5 sm:p-8">
        {!hasImage && (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={cn(
              'flex flex-col items-center justify-center rounded-tp-card border-2 border-dashed px-6 py-14 text-center transition-colors',
              dragOver ? 'border-tp-bronze bg-tp-beige' : 'border-tp-line bg-tp-paper'
            )}
          >
            <Upload className="h-8 w-8 text-tp-bronze-ink" aria-hidden="true" />
            <p className="mt-4 font-display font-normal text-2xl text-tp-ink">Drop your photo here</p>
            <p className="mt-1 text-sm text-tp-muted">JPG, PNG or WebP. Processed in your browser only.</p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'mt-6 rounded-tp-button')}
            >
              Choose a photo
            </button>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          aria-label="Upload a photo to crop"
          onChange={(e) => {
            loadFile(e.target.files?.[0]);
            e.target.value = '';
          }}
        />

        {error && (
          <p role="alert" className="mt-4 text-sm text-tp-bronze-ink">
            {error}
          </p>
        )}

        <div className={cn('flex flex-col items-center', !hasImage && 'hidden')}>
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            aria-label="Crop area. Drag to reposition your photo."
            className="aspect-square w-full max-w-[400px] cursor-grab touch-none rounded-tp-card border border-tp-line active:cursor-grabbing"
          />
          <p className="mt-3 flex items-center gap-2 text-xs text-tp-muted">
            <Move className="h-4 w-4" aria-hidden="true" />
            Drag to reposition. The circle shows how LinkedIn will display it.
          </p>

          <div className="mt-6 flex w-full max-w-[400px] items-center gap-3">
            <button
              type="button"
              onClick={() => changeZoom(zoom - 0.1)}
              aria-label="Zoom out"
              className="text-tp-ink hover:text-tp-bronze-ink"
            >
              <ZoomOut className="h-5 w-5" />
            </button>
            <input
              type="range"
              min={MIN_ZOOM}
              max={MAX_ZOOM}
              step={0.01}
              value={zoom}
              onChange={(e) => changeZoom(parseFloat(e.target.value))}
              aria-label="Zoom"
              className="h-2 w-full cursor-pointer accent-tp-bronze"
            />
            <button
              type="button"
              onClick={() => changeZoom(zoom + 0.1)}
              aria-label="Zoom in"
              className="text-tp-ink hover:text-tp-bronze-ink"
            >
              <ZoomIn className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-4 text-xs text-tp-muted">
            Output: {OUTPUT_SIZE} x {OUTPUT_SIZE} px PNG (square, 1:1). LinkedIn applies the circular crop.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={download}
              className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'rounded-tp-button')}
            >
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              Download 400 x 400 PNG
            </button>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center rounded-tp-button border border-tp-line bg-white px-4 py-2 text-sm font-medium text-tp-ink hover:bg-tp-beige"
            >
              Choose another photo
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-tp-card bg-tp-ink px-6 py-8 text-center">
        <h2 className="font-display font-normal text-2xl text-tp-paper">Cropping is only half the job</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-tp-beige">
          Start with a better photo. TailorPic creates AI-generated professional headshots, from $1.99.
        </p>
        <Link
          href={ctaHref}
          className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'mt-5 rounded-tp-button bg-tp-bronze text-tp-black hover:bg-tp-beige')}
        >
          Create your headshot
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
