'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Upload, Download, X, ShieldCheck, RotateCcw } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MAX_DISPLAY_WIDTH = 800;
const MAX_EXPORT_DIM = 4096;
const MAX_FILE_BYTES = 15 * 1024 * 1024;
const MIN_SIZE = 0.08; // minimum focus width/height as a fraction of the canvas
const DEFAULT_BLUR = 12;

interface Focus {
  x: number; // left edge, 0-1
  y: number; // top edge, 0-1
  w: number; // width, 0-1
  h: number; // height, 0-1
}

const DEFAULT_FOCUS: Focus = { x: 0.25, y: 0.12, w: 0.5, h: 0.76 };

type Handle = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';

const HANDLES: { id: Handle; left: number; top: number; cursor: string }[] = [
  { id: 'nw', left: 0, top: 0, cursor: 'nwse-resize' },
  { id: 'n', left: 0.5, top: 0, cursor: 'ns-resize' },
  { id: 'ne', left: 1, top: 0, cursor: 'nesw-resize' },
  { id: 'e', left: 1, top: 0.5, cursor: 'ew-resize' },
  { id: 'se', left: 1, top: 1, cursor: 'nwse-resize' },
  { id: 's', left: 0.5, top: 1, cursor: 'ns-resize' },
  { id: 'sw', left: 0, top: 1, cursor: 'nesw-resize' },
  { id: 'w', left: 0, top: 0.5, cursor: 'ew-resize' },
];

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * 1. Draw the full image blurred.
 * 2. Clip an ellipse and draw the sharp original on top.
 * `blurScale` converts the slider value (display pixels) into target-canvas pixels.
 */
function renderBlur(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  width: number,
  height: number,
  blurPx: number,
  focus: Focus,
  blurScale: number
) {
  if (canvas.width !== width) canvas.width = width;
  if (canvas.height !== height) canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, width, height);

  ctx.save();
  ctx.filter = `blur(${(blurPx * blurScale).toFixed(2)}px)`;
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.ellipse(
    (focus.x + focus.w / 2) * width,
    (focus.y + focus.h / 2) * height,
    (focus.w / 2) * width,
    (focus.h / 2) * height,
    0,
    0,
    Math.PI * 2
  );
  ctx.clip();
  ctx.drawImage(img, 0, 0, width, height);
  ctx.restore();
}

type DragState =
  | { mode: 'move'; startX: number; startY: number; origin: Focus }
  | { mode: 'resize'; handle: Handle; origin: Focus };

export default function BackgroundBlur() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const dragRef = useRef<DragState | null>(null);

  const [hasImage, setHasImage] = useState(false);
  const [fileName, setFileName] = useState('photo');
  const [blur, setBlur] = useState(DEFAULT_BLUR);
  const [focus, setFocus] = useState<Focus>(DEFAULT_FOCUS);
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
      setBlur(DEFAULT_BLUR);
      setFocus(DEFAULT_FOCUS);
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
    renderBlur(canvas, img, displaySize.w, displaySize.h, blur, focus, 1);
  }, [hasImage, blur, focus, displaySize]);

  const pointerFraction = (e: React.PointerEvent) => {
    const rect = overlayRef.current?.getBoundingClientRect();
    if (!rect || !rect.width || !rect.height) return null;
    return {
      x: clamp((e.clientX - rect.left) / rect.width, 0, 1),
      y: clamp((e.clientY - rect.top) / rect.height, 0, 1),
    };
  };

  const startMove = (e: React.PointerEvent) => {
    const p = pointerFraction(e);
    if (!p) return;
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { mode: 'move', startX: p.x, startY: p.y, origin: focus };
  };

  const startResize = (handle: Handle) => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { mode: 'resize', handle, origin: focus };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag) return;
    const p = pointerFraction(e);
    if (!p) return;

    if (drag.mode === 'move') {
      const { origin } = drag;
      setFocus({
        ...origin,
        x: clamp(origin.x + (p.x - drag.startX), 0, 1 - origin.w),
        y: clamp(origin.y + (p.y - drag.startY), 0, 1 - origin.h),
      });
      return;
    }

    const { origin, handle } = drag;
    let left = origin.x;
    let top = origin.y;
    let right = origin.x + origin.w;
    let bottom = origin.y + origin.h;
    if (handle.includes('w')) left = clamp(p.x, 0, right - MIN_SIZE);
    if (handle.includes('e')) right = clamp(p.x, left + MIN_SIZE, 1);
    if (handle.includes('n')) top = clamp(p.y, 0, bottom - MIN_SIZE);
    if (handle.includes('s')) bottom = clamp(p.y, top + MIN_SIZE, 1);
    setFocus({ x: left, y: top, w: right - left, h: bottom - top });
  };

  const endDrag = () => {
    dragRef.current = null;
  };

  const handleReset = () => {
    setBlur(DEFAULT_BLUR);
    setFocus(DEFAULT_FOCUS);
  };

  const handleClear = () => {
    imgRef.current = null;
    setHasImage(false);
    setError(null);
  };

  const handleDownload = () => {
    const img = imgRef.current;
    if (!img) return;
    // Export at the original resolution (capped), scaling the blur to match the preview.
    const exportScale = Math.min(1, MAX_EXPORT_DIM / Math.max(img.naturalWidth, img.naturalHeight));
    const w = Math.max(1, Math.round(img.naturalWidth * exportScale));
    const h = Math.max(1, Math.round(img.naturalHeight * exportScale));
    const out = document.createElement('canvas');
    renderBlur(out, img, w, h, blur, focus, w / displaySize.w);
    out.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}-background-blur.png`;
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

  const isDefault =
    blur === DEFAULT_BLUR &&
    focus.x === DEFAULT_FOCUS.x &&
    focus.y === DEFAULT_FOCUS.y &&
    focus.w === DEFAULT_FOCUS.w &&
    focus.h === DEFAULT_FOCUS.h;

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
          <div>
            <div className="overflow-hidden rounded-tp-card border border-tp-line bg-tp-black p-2 sm:p-3">
              <div className="relative mx-auto w-fit max-w-full select-none">
                <canvas
                  ref={canvasRef}
                  className="block h-auto max-h-[70vh] w-auto max-w-full"
                  aria-label="Photo preview with blurred background"
                />
                <div ref={overlayRef} className="absolute inset-0 touch-none" onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerCancel={endDrag}>
                  <div
                    className="absolute cursor-move rounded-[50%] border-2 border-dotted border-tp-paper shadow-[0_0_0_1px_rgba(0,0,0,0.45)]"
                    style={{
                      left: `${focus.x * 100}%`,
                      top: `${focus.y * 100}%`,
                      width: `${focus.w * 100}%`,
                      height: `${focus.h * 100}%`,
                      touchAction: 'none',
                    }}
                    onPointerDown={startMove}
                    onPointerMove={onPointerMove}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                    role="presentation"
                  />
                  {HANDLES.map((h) => (
                    <div
                      key={h.id}
                      className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-tp-bronze bg-tp-paper shadow"
                      style={{
                        left: `${(focus.x + focus.w * h.left) * 100}%`,
                        top: `${(focus.y + focus.h * h.top) * 100}%`,
                        cursor: h.cursor,
                        touchAction: 'none',
                      }}
                      onPointerDown={startResize(h.id)}
                      onPointerMove={onPointerMove}
                      onPointerUp={endDrag}
                      onPointerCancel={endDrag}
                      role="presentation"
                      data-handle={h.id}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-tp-muted">
              Drag the dotted oval to move the sharp area. Drag a handle on its edge or corner to resize it.
            </p>
          </div>

          <div className="h-fit rounded-tp-card border border-tp-line bg-white p-6">
            <h2 className="font-display font-normal text-2xl text-tp-ink">Blur settings</h2>
            <div className="mt-5">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="bb-blur" className="font-medium text-tp-ink">
                  Blur radius
                </label>
                <span className="tabular-nums text-tp-muted">{blur}px</span>
              </div>
              <input
                id="bb-blur"
                type="range"
                min={1}
                max={30}
                step={1}
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
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
