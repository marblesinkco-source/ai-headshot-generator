'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Download, LayoutGrid, Move, Palette, RotateCcw, ShieldCheck, Type, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const MAX_BYTES = 15 * 1024 * 1024;
const MAX_CANVAS_SIDE = 2400;
const REF_WIDTH = 1000; // font size and spacing are relative to a 1000px wide image
const MAX_TEXT = 60;

type Mode = 'single' | 'tiled';

interface Point {
  x: number;
  y: number;
}

const FONTS = ['Arial', 'Georgia', 'Courier New', 'Impact', 'Comic Sans MS'] as const;

const POSITIONS: { id: string; label: string; x: number; y: number }[] = [
  { id: 'top-left', label: 'Top left', x: 0.15, y: 0.08 },
  { id: 'top-center', label: 'Top center', x: 0.5, y: 0.08 },
  { id: 'top-right', label: 'Top right', x: 0.85, y: 0.08 },
  { id: 'middle-left', label: 'Middle left', x: 0.15, y: 0.5 },
  { id: 'center', label: 'Center', x: 0.5, y: 0.5 },
  { id: 'middle-right', label: 'Middle right', x: 0.85, y: 0.5 },
  { id: 'bottom-left', label: 'Bottom left', x: 0.15, y: 0.92 },
  { id: 'bottom-center', label: 'Bottom center', x: 0.5, y: 0.92 },
  { id: 'bottom-right', label: 'Bottom right', x: 0.85, y: 0.92 },
];

const HEX_RE = /^#[0-9a-f]{6}$/i;

const chipBase =
  'rounded-tp-button border px-3.5 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze';
const chipOn = 'border-tp-ink bg-tp-ink text-white';
const chipOff = 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze';
const inputBase =
  'rounded-tp-button border border-tp-line bg-white px-3 py-2 text-sm text-tp-ink focus:border-tp-bronze focus:outline-none focus:ring-2 focus:ring-tp-bronze/40';

export default function WatermarkMaker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const urlRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const draggingPointer = useRef(false);

  const [hasImage, setHasImage] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState('image');

  const [text, setText] = useState('SAMPLE');
  const [fontSize, setFontSize] = useState(48);
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  const [color, setColor] = useState('#FFFFFF');
  const [hexInput, setHexInput] = useState('#FFFFFF');
  const [opacity, setOpacity] = useState(50);
  const [rotation, setRotation] = useState(0);
  const [mode, setMode] = useState<Mode>('single');
  const [pos, setPos] = useState<Point>({ x: 0.5, y: 0.5 });
  const [spacing, setSpacing] = useState(60);

  const label = text.trim();

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || img.naturalWidth === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scale = Math.min(1, MAX_CANVAS_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
    const w = Math.round(img.naturalWidth * scale);
    const h = Math.round(img.naturalHeight * scale);
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);

    if (!label) return;

    const unit = w / REF_WIDTH;
    const fontPx = fontSize * unit;
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, opacity / 100));
    ctx.fillStyle = color;
    ctx.font = `${fontPx}px "${fontFamily}", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const angle = (rotation * Math.PI) / 180;

    if (mode === 'single') {
      ctx.translate(pos.x * w, pos.y * h);
      ctx.rotate(angle);
      ctx.fillText(label, 0, 0);
    } else {
      const textW = ctx.measureText(label).width;
      const gap = spacing * unit;
      const stepX = Math.max(1, textW + gap);
      const stepY = Math.max(1, fontPx * 1.2 + gap);
      const reach = Math.hypot(w, h) / 2 + stepX;
      ctx.translate(w / 2, h / 2);
      ctx.rotate(angle);
      let row = 0;
      for (let y = -reach; y <= reach; y += stepY, row++) {
        const offset = row % 2 === 0 ? 0 : stepX / 2;
        for (let x = -reach - stepX + offset; x <= reach; x += stepX) {
          ctx.fillText(label, x, y);
        }
      }
    }
    ctx.restore();
  }, [label, fontSize, fontFamily, color, opacity, rotation, mode, pos, spacing]);

  useEffect(() => {
    draw();
  }, [draw, hasImage]);

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
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
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = url;
      imgRef.current = img;
      setFileName(file.name.replace(/\.[^.]+$/, '') || 'image');
      setHasImage(true);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setError('We could not read that image. Try a different file.');
    };
    img.src = url;
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    loadFile(e.dataTransfer.files?.[0]);
  };

  const updatePosFromEvent = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setPos({ x, y });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (mode !== 'single') return;
    draggingPointer.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosFromEvent(e);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!draggingPointer.current || mode !== 'single') return;
    updatePosFromEvent(e);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    draggingPointer.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleHex = (value: string) => {
    let v = value.trim();
    if (v && !v.startsWith('#')) v = `#${v}`;
    v = v.slice(0, 7);
    setHexInput(v);
    if (HEX_RE.test(v)) setColor(v.toUpperCase());
  };

  const handlePicker = (value: string) => {
    setColor(value.toUpperCase());
    setHexInput(value.toUpperCase());
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}-watermarked.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  };

  const resetControls = () => {
    setText('SAMPLE');
    setFontSize(48);
    setFontFamily('Arial');
    setColor('#FFFFFF');
    setHexInput('#FFFFFF');
    setOpacity(50);
    setRotation(0);
    setMode('single');
    setPos({ x: 0.5, y: 0.5 });
    setSpacing(60);
  };

  const handleRemove = () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    imgRef.current = null;
    setHasImage(false);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const fileInput = (
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      className="sr-only"
      aria-label="Upload a photo"
      onChange={(e) => loadFile(e.target.files?.[0])}
    />
  );

  if (!hasImage) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={cn(
            'flex flex-col items-center justify-center gap-3 rounded-tp-card border border-dashed px-6 py-20 text-center transition-colors',
            dragOver ? 'border-tp-ink bg-tp-beige' : 'border-tp-bronze bg-tp-paper hover:bg-tp-beige/60'
          )}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-beige/60 text-tp-bronze-ink">
            <Upload className="h-6 w-6" aria-hidden="true" />
          </span>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-tp-button text-base font-semibold text-tp-ink underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
          >
            Click to upload a photo
          </button>
          <p className="text-sm text-tp-muted">or drag and drop an image here (JPG, PNG, WebP, max 15MB)</p>
          {fileInput}
        </div>
        {error && (
          <p role="alert" className="mt-3 text-center text-sm font-semibold text-tp-ink">
            {error}
          </p>
        )}
        <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-tp-muted">
          <ShieldCheck className="h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
          Everything runs in your browser. Nothing is uploaded.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="min-w-0 lg:w-1/2 lg:flex-1">
          <div className="flex items-center justify-center rounded-tp-card border border-tp-line bg-tp-paper p-3">
            <canvas
              ref={canvasRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              className={cn(
                'block h-auto max-h-[70vh] w-auto max-w-full rounded-tp-button',
                mode === 'single' ? 'cursor-move touch-none' : 'cursor-default'
              )}
              role="img"
              aria-label="Live preview of your photo with the watermark"
            />
          </div>
          <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-tp-muted">
            <ShieldCheck className="h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
            Everything runs in your browser. Nothing is uploaded.
          </p>
        </div>

        <div className="min-w-0 space-y-6 lg:w-1/2 lg:flex-1">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={cn(
              'flex items-center justify-between gap-3 rounded-tp-card border border-dashed px-4 py-3',
              dragOver ? 'border-tp-ink bg-tp-beige' : 'border-tp-bronze bg-tp-paper'
            )}
          >
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex min-w-0 items-center gap-2 rounded-tp-button text-sm font-semibold text-tp-ink underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
            >
              <Upload className="h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
              <span className="truncate">Choose a different photo</span>
            </button>
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Remove photo"
              className="rounded-tp-button p-1.5 text-tp-muted transition-colors hover:text-tp-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
            {fileInput}
          </div>
          {error && (
            <p role="alert" className="text-sm font-semibold text-tp-ink">
              {error}
            </p>
          )}

          <div>
            <label htmlFor="wm-text" className="mb-2 flex items-center gap-2 text-sm font-semibold text-tp-ink">
              <Type className="h-4 w-4 text-tp-bronze-ink" aria-hidden="true" />
              Watermark text
            </label>
            <input
              id="wm-text"
              type="text"
              value={text}
              maxLength={MAX_TEXT}
              placeholder="SAMPLE"
              onChange={(e) => setText(e.target.value.slice(0, MAX_TEXT))}
              className={cn(inputBase, 'w-full')}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="wm-font" className="mb-2 block text-sm font-semibold text-tp-ink">
                Font
              </label>
              <select
                id="wm-font"
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className={cn(inputBase, 'w-full')}
              >
                {FONTS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-tp-ink">
                <Palette className="h-4 w-4 text-tp-bronze-ink" aria-hidden="true" />
                Color
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handlePicker(e.target.value)}
                  aria-label="Pick a text color"
                  className="h-10 w-12 shrink-0 cursor-pointer rounded-tp-button border border-tp-line bg-white p-1"
                />
                <input
                  type="text"
                  value={hexInput}
                  onChange={(e) => handleHex(e.target.value)}
                  onBlur={() => setHexInput(color)}
                  aria-label="Text color hex value"
                  spellCheck={false}
                  maxLength={7}
                  className={cn(inputBase, 'min-w-0 flex-1 font-mono uppercase')}
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="wm-size" className="mb-2 flex items-center justify-between text-sm font-semibold text-tp-ink">
              <span>Font size</span>
              <span className="font-medium text-tp-muted">{fontSize}px</span>
            </label>
            <input
              id="wm-size"
              type="range"
              min={12}
              max={72}
              step={1}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-tp-bronze"
            />
          </div>

          <div>
            <label htmlFor="wm-opacity" className="mb-2 flex items-center justify-between text-sm font-semibold text-tp-ink">
              <span>Opacity</span>
              <span className="font-medium text-tp-muted">{opacity}%</span>
            </label>
            <input
              id="wm-opacity"
              type="range"
              min={0}
              max={100}
              step={1}
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full accent-tp-bronze"
            />
          </div>

          <div>
            <label htmlFor="wm-rotation" className="mb-2 flex items-center justify-between text-sm font-semibold text-tp-ink">
              <span>Rotation</span>
              <span className="font-medium text-tp-muted">{rotation}&deg;</span>
            </label>
            <input
              id="wm-rotation"
              type="range"
              min={-180}
              max={180}
              step={1}
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="w-full accent-tp-bronze"
            />
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-tp-ink">Pattern</legend>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                aria-pressed={mode === 'single'}
                onClick={() => setMode('single')}
                className={cn(chipBase, 'inline-flex items-center gap-2', mode === 'single' ? chipOn : chipOff)}
              >
                <Move className="h-4 w-4" aria-hidden="true" />
                Single
              </button>
              <button
                type="button"
                aria-pressed={mode === 'tiled'}
                onClick={() => setMode('tiled')}
                className={cn(chipBase, 'inline-flex items-center gap-2', mode === 'tiled' ? chipOn : chipOff)}
              >
                <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                Tiled
              </button>
            </div>
          </fieldset>

          {mode === 'single' ? (
            <fieldset>
              <legend className="mb-2 text-sm font-semibold text-tp-ink">Position</legend>
              <div className="grid max-w-[180px] grid-cols-3 gap-2">
                {POSITIONS.map((p) => {
                  const active = Math.abs(pos.x - p.x) < 0.001 && Math.abs(pos.y - p.y) < 0.001;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      aria-label={p.label}
                      aria-pressed={active}
                      onClick={() => setPos({ x: p.x, y: p.y })}
                      className={cn(
                        'flex h-10 items-center justify-center rounded-tp-button border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
                        active ? 'border-tp-ink bg-tp-ink' : 'border-tp-line bg-white hover:border-tp-bronze'
                      )}
                    >
                      <span
                        className={cn('h-2 w-2 rounded-full', active ? 'bg-tp-bronze' : 'bg-tp-muted')}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-tp-muted">Or drag the watermark directly on the preview.</p>
            </fieldset>
          ) : (
            <div>
              <label htmlFor="wm-spacing" className="mb-2 flex items-center justify-between text-sm font-semibold text-tp-ink">
                <span>Spacing</span>
                <span className="font-medium text-tp-muted">{spacing}px</span>
              </label>
              <input
                id="wm-spacing"
                type="range"
                min={0}
                max={200}
                step={5}
                value={spacing}
                onChange={(e) => setSpacing(Number(e.target.value))}
                className="w-full accent-tp-bronze"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-5 py-3 text-sm font-semibold text-tp-black transition-colors hover:bg-tp-bronze/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-ink"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download PNG
            </button>
            <button
              type="button"
              onClick={resetControls}
              className="inline-flex items-center gap-2 rounded-tp-button border border-tp-line bg-white px-5 py-3 text-sm font-semibold text-tp-ink transition-colors hover:border-tp-bronze focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
