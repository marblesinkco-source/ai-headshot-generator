'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Upload, Download, X, ShieldCheck, RotateCcw } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MAX_DISPLAY_WIDTH = 800;
const MAX_EXPORT_DIM = 4096;
const MAX_FILE_BYTES = 15 * 1024 * 1024;
const ROUND_RADIUS = 28; // slider-pixel radius used by "Rounded corners"

type BorderStyle = 'solid' | 'gradient' | 'double';
type Deco = 'none' | 'polaroid' | 'film' | 'vintage';
type Effect = 'none' | 'shadow' | 'glow';

interface FrameConfig {
  style: BorderStyle;
  color1: string; // solid color / gradient start
  color2: string; // gradient end
  outerColor: string; // double: outer ring
  innerColor: string; // double: inner ring
  matColor: string; // padding between photo and border
  width: number; // border width, 0-100
  padding: number; // padding, 0-60
  rounded: boolean;
  effect: Effect;
  deco: Deco;
}

const DEFAULT_CONFIG: FrameConfig = {
  style: 'solid',
  color1: '#ffffff',
  color2: '#d9d9d9',
  outerColor: '#1a1a1a',
  innerColor: '#c9a46a',
  matColor: '#ffffff',
  width: 30,
  padding: 0,
  rounded: false,
  effect: 'none',
  deco: 'none',
};

interface Preset {
  id: string;
  name: string;
  swatch: string;
  config: FrameConfig;
}

const PRESETS: Preset[] = [
  { id: 'clean-white', name: 'Clean White', swatch: '#ffffff', config: { ...DEFAULT_CONFIG } },
  {
    id: 'classic-black',
    name: 'Classic Black',
    swatch: '#111111',
    config: { ...DEFAULT_CONFIG, color1: '#111111', matColor: '#111111', width: 30 },
  },
  {
    id: 'gold',
    name: 'Gold Frame',
    swatch: 'linear-gradient(135deg, #9a6b1f, #f6e3a1 55%, #b8863b)',
    config: { ...DEFAULT_CONFIG, style: 'gradient', color1: '#9a6b1f', color2: '#f6e3a1', matColor: '#f6efe0', width: 36, padding: 8 },
  },
  {
    id: 'silver',
    name: 'Silver Frame',
    swatch: 'linear-gradient(135deg, #8c9299, #f4f6f8 55%, #a9aeb5)',
    config: { ...DEFAULT_CONFIG, style: 'gradient', color1: '#8c9299', color2: '#f4f6f8', matColor: '#ffffff', width: 36, padding: 8 },
  },
  {
    id: 'polaroid',
    name: 'Polaroid',
    swatch: '#fbfbf8',
    config: { ...DEFAULT_CONFIG, color1: '#fbfbf8', matColor: '#fbfbf8', width: 26, effect: 'shadow', deco: 'polaroid' },
  },
  {
    id: 'film-strip',
    name: 'Film Strip',
    swatch: 'repeating-linear-gradient(90deg, #111111 0 6px, #f4efe6 6px 9px)',
    config: { ...DEFAULT_CONFIG, color1: '#111111', matColor: '#111111', width: 56, deco: 'film' },
  },
  {
    id: 'vintage',
    name: 'Vintage',
    swatch: '#e9d8b4',
    config: { ...DEFAULT_CONFIG, color1: '#e9d8b4', matColor: '#f3e8cf', width: 34, padding: 6, deco: 'vintage' },
  },
  {
    id: 'modern',
    name: 'Modern',
    swatch: '#1f1f1f',
    config: { ...DEFAULT_CONFIG, color1: '#1f1f1f', matColor: '#1f1f1f', width: 6, effect: 'shadow' },
  },
];

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

// Deterministic PRNG so the rough vintage edge looks identical in preview and export.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

function roundedRectPath(ctx: CanvasRenderingContext2D, r: Rect, radius: number) {
  const rad = clamp(radius, 0, Math.min(r.w, r.h) / 2);
  ctx.beginPath();
  if (rad <= 0) {
    ctx.rect(r.x, r.y, r.w, r.h);
    return;
  }
  ctx.moveTo(r.x + rad, r.y);
  ctx.arcTo(r.x + r.w, r.y, r.x + r.w, r.y + r.h, rad);
  ctx.arcTo(r.x + r.w, r.y + r.h, r.x, r.y + r.h, rad);
  ctx.arcTo(r.x, r.y + r.h, r.x, r.y, rad);
  ctx.arcTo(r.x, r.y, r.x + r.w, r.y, rad);
  ctx.closePath();
}

function roughRectPath(ctx: CanvasRenderingContext2D, r: Rect, amp: number, step: number) {
  const rand = mulberry32(20241);
  const jitter = () => (rand() - 0.5) * 2 * amp;
  const s = Math.max(2, step);
  ctx.beginPath();
  ctx.moveTo(r.x, r.y + jitter());
  for (let x = r.x; x <= r.x + r.w; x += s) ctx.lineTo(x, r.y + Math.abs(jitter()));
  for (let y = r.y; y <= r.y + r.h; y += s) ctx.lineTo(r.x + r.w - Math.abs(jitter()), y);
  for (let x = r.x + r.w; x >= r.x; x -= s) ctx.lineTo(x, r.y + r.h - Math.abs(jitter()));
  for (let y = r.y + r.h; y >= r.y; y -= s) ctx.lineTo(r.x + Math.abs(jitter()), y);
  ctx.closePath();
}

function inset(r: Rect, d: number, bottomExtra = 0): Rect {
  return { x: r.x + d, y: r.y + d, w: r.w - 2 * d, h: r.h - 2 * d - bottomExtra };
}

interface Layout {
  width: number;
  height: number;
  margin: number; // transparent margin reserved for shadow/glow
  inner: number; // border + padding in target px
  bottomExtra: number;
  k: number;
}

/** `k` converts slider pixels into target-canvas pixels. */
function computeLayout(photoW: number, photoH: number, cfg: FrameConfig, k: number): Layout {
  const inner = (cfg.width + cfg.padding) * k;
  const bottomExtra = cfg.deco === 'polaroid' ? cfg.width * 2.6 * k : 0;
  const margin = cfg.effect === 'none' ? 0 : Math.round(44 * k);
  return {
    width: Math.round(photoW + 2 * inner + 2 * margin),
    height: Math.round(photoH + 2 * inner + bottomExtra + 2 * margin),
    margin,
    inner,
    bottomExtra,
    k,
  };
}

function renderFrame(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  photoW: number,
  photoH: number,
  cfg: FrameConfig,
  k: number
) {
  const L = computeLayout(photoW, photoH, cfg, k);
  canvas.width = L.width;
  canvas.height = L.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, L.width, L.height);

  const bw = cfg.width * k;
  const pad = cfg.padding * k;
  const outer: Rect = { x: L.margin, y: L.margin, w: L.width - 2 * L.margin, h: L.height - 2 * L.margin };
  const radius = cfg.rounded ? ROUND_RADIUS * k : 0;
  const rough = cfg.deco === 'vintage';

  const outerPath = () => (rough ? roughRectPath(ctx, outer, Math.max(1, 1.6 * k), 5 * k) : roundedRectPath(ctx, outer, radius));

  const borderFill = (): string | CanvasGradient => {
    if (cfg.style === 'gradient') {
      const g = ctx.createLinearGradient(outer.x, outer.y, outer.x + outer.w, outer.y + outer.h);
      g.addColorStop(0, cfg.color1);
      g.addColorStop(0.5, cfg.color2);
      g.addColorStop(1, cfg.color1);
      return g;
    }
    return cfg.style === 'double' ? cfg.outerColor : cfg.color1;
  };

  // 1. Outer shape, with optional shadow or glow.
  ctx.save();
  if (cfg.effect === 'shadow') {
    ctx.shadowColor = 'rgba(0,0,0,0.38)';
    ctx.shadowBlur = 22 * k;
    ctx.shadowOffsetY = 8 * k;
  } else if (cfg.effect === 'glow') {
    ctx.shadowColor = cfg.style === 'double' ? cfg.outerColor : cfg.color1;
    ctx.shadowBlur = 30 * k;
  }
  outerPath();
  ctx.fillStyle = bw > 0 ? borderFill() : cfg.matColor;
  ctx.fill();
  ctx.restore();

  // 2. Double border rings.
  if (cfg.style === 'double' && bw > 0) {
    const ringOuter = Math.max(1, bw * 0.45);
    const gap = bw * 0.2;
    const r1 = inset(outer, ringOuter);
    roundedRectPath(ctx, r1, Math.max(0, radius - ringOuter));
    ctx.fillStyle = cfg.matColor;
    ctx.fill();
    const r2 = inset(outer, ringOuter + gap);
    roundedRectPath(ctx, r2, Math.max(0, radius - ringOuter - gap));
    ctx.fillStyle = cfg.innerColor;
    ctx.fill();
  }

  // 3. Padding (mat) between border and photo.
  const matRect = inset(outer, bw, L.bottomExtra);
  if (pad > 0) {
    roundedRectPath(ctx, matRect, Math.max(0, radius - bw));
    ctx.fillStyle = cfg.matColor;
    ctx.fill();
  }

  // 4. Film strip sprocket holes.
  if (cfg.deco === 'film' && bw >= 12 * k) {
    const holeW = bw * 0.38;
    const holeH = bw * 0.28;
    const pitch = holeH * 2.1;
    ctx.fillStyle = '#f4efe6';
    const startY = outer.y + bw * 0.5;
    const endY = outer.y + outer.h - bw * 0.5 - holeH;
    const xs = [outer.x + (bw - holeW) / 2, outer.x + outer.w - bw + (bw - holeW) / 2];
    for (const hx of xs) {
      for (let hy = startY; hy <= endY; hy += pitch) {
        roundedRectPath(ctx, { x: hx, y: hy, w: holeW, h: holeH }, holeH * 0.25);
        ctx.fill();
      }
    }
  }

  // 5. The photo itself.
  const photo: Rect = { x: outer.x + L.inner, y: outer.y + L.inner, w: photoW, h: photoH };
  ctx.save();
  roundedRectPath(ctx, photo, Math.max(0, radius - L.inner));
  ctx.clip();
  ctx.drawImage(img, photo.x, photo.y, photo.w, photo.h);
  ctx.restore();

  // 6. Hairline where the photo meets a Polaroid/vintage mat, for depth.
  if (cfg.deco === 'polaroid' || cfg.deco === 'vintage') {
    ctx.save();
    ctx.strokeStyle = 'rgba(0,0,0,0.12)';
    ctx.lineWidth = Math.max(1, k);
    ctx.strokeRect(photo.x, photo.y, photo.w, photo.h);
    ctx.restore();
  }
}

export default function PhotoBorderMaker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [hasImage, setHasImage] = useState(false);
  const [fileName, setFileName] = useState('photo');
  const [config, setConfig] = useState<FrameConfig>(DEFAULT_CONFIG);
  const [presetId, setPresetId] = useState<string | null>('clean-white');
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
      setConfig(DEFAULT_CONFIG);
      setPresetId('clean-white');
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
    renderFrame(canvas, img, displaySize.w, displaySize.h, config, 1);
  }, [hasImage, config, displaySize]);

  const edit = (patch: Partial<FrameConfig>) => {
    setConfig((c) => ({ ...c, ...patch }));
    setPresetId(null);
  };

  const chooseStyle = (style: BorderStyle) => {
    setConfig((c) => ({ ...c, style, deco: 'none' }));
    setPresetId(null);
  };

  const applyPreset = (p: Preset) => {
    setConfig({ ...p.config });
    setPresetId(p.id);
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    setPresetId('clean-white');
  };

  const handleClear = () => {
    imgRef.current = null;
    setHasImage(false);
    setError(null);
  };

  const handleDownload = () => {
    const img = imgRef.current;
    if (!img || !displaySize.w) return;
    // Photo at original resolution; shrink only if the framed result would exceed the cap.
    const fullK = img.naturalWidth / displaySize.w;
    const full = computeLayout(img.naturalWidth, img.naturalHeight, config, fullK);
    const cap = Math.min(1, MAX_EXPORT_DIM / Math.max(full.width, full.height));
    const photoW = Math.max(1, Math.round(img.naturalWidth * cap));
    const photoH = Math.max(1, Math.round(img.naturalHeight * cap));
    const out = document.createElement('canvas');
    renderFrame(out, img, photoW, photoH, config, fullK * cap);
    out.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}-framed.png`;
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

  const isDefault = JSON.stringify(config) === JSON.stringify(DEFAULT_CONFIG);

  const colorInput = (id: string, label: string, value: string, onChange: (v: string) => void) => (
    <div className="flex items-center justify-between gap-3 text-sm">
      <label htmlFor={id} className="font-medium text-tp-ink">
        {label}
      </label>
      <input
        id={id}
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-14 cursor-pointer rounded-tp-button border border-tp-line bg-white p-1"
      />
    </div>
  );

  const segment = <T extends string>(
    groupLabel: string,
    options: { id: T; label: string }[],
    value: T | null,
    onSelect: (v: T) => void
  ) => (
    <div role="group" aria-label={groupLabel} className="grid grid-flow-col auto-cols-fr gap-1.5">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          aria-pressed={value === o.id}
          onClick={() => onSelect(o.id)}
          className={cn(
            'rounded-tp-button border px-2 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
            value === o.id
              ? 'border-tp-bronze bg-tp-beige/40 text-tp-ink'
              : 'border-tp-line bg-white text-tp-muted hover:border-tp-bronze'
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );

  const activeStyle: BorderStyle | null = config.deco === 'none' ? config.style : null;

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
          <span className="mt-2 text-sm text-tp-muted">JPEG, PNG • Max 15 MB • Runs in your browser</span>
        </button>
      )}

      {error && (
        <p role="alert" className="mt-4 rounded-tp-button border border-tp-line bg-white px-4 py-3 text-sm text-tp-ink">
          {error}
        </p>
      )}

      {hasImage && (
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div>
            <div className="overflow-hidden rounded-tp-card border border-tp-line bg-tp-black p-2 sm:p-3">
              <div className="mx-auto w-fit max-w-full select-none">
                <canvas
                  ref={canvasRef}
                  className="block h-auto max-h-[70vh] w-auto max-w-full"
                  aria-label="Photo preview with border and frame"
                />
              </div>
            </div>
            <p className="mt-3 text-sm text-tp-muted">
              Pick a preset or fine-tune the border. Downloads keep your original resolution, up to {MAX_EXPORT_DIM}px.
            </p>
          </div>

          <div className="h-fit rounded-tp-card border border-tp-line bg-white p-6">
            <h2 className="font-display font-normal text-2xl text-tp-ink">Frame presets</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={presetId === p.id}
                  onClick={() => applyPreset(p)}
                  className={cn(
                    'flex items-center gap-2 rounded-tp-button border px-2.5 py-2 text-left text-xs font-medium text-tp-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
                    presetId === p.id ? 'border-tp-bronze bg-tp-beige/40' : 'border-tp-line bg-white hover:border-tp-bronze'
                  )}
                >
                  <span
                    className="h-5 w-5 shrink-0 rounded border border-tp-line"
                    style={{ background: p.swatch }}
                    aria-hidden="true"
                  />
                  {p.name}
                </button>
              ))}
            </div>

            <h2 className="mt-7 font-display font-normal text-2xl text-tp-ink">Customize</h2>

            <div className="mt-4">
              <p className="mb-2 text-sm font-medium text-tp-ink">Border style</p>
              {segment<BorderStyle>(
                'Border style',
                [
                  { id: 'solid', label: 'Solid' },
                  { id: 'gradient', label: 'Gradient' },
                  { id: 'double', label: 'Double' },
                ],
                activeStyle,
                chooseStyle
              )}
            </div>

            <div className="mt-4 grid gap-3">
              {config.style === 'solid' && colorInput('pbm-c1', 'Border color', config.color1, (v) => edit({ color1: v }))}
              {config.style === 'gradient' && (
                <>
                  {colorInput('pbm-g1', 'Gradient start', config.color1, (v) => edit({ color1: v }))}
                  {colorInput('pbm-g2', 'Gradient end', config.color2, (v) => edit({ color2: v }))}
                </>
              )}
              {config.style === 'double' && (
                <>
                  {colorInput('pbm-outer', 'Outer border', config.outerColor, (v) => edit({ outerColor: v }))}
                  {colorInput('pbm-inner', 'Inner border', config.innerColor, (v) => edit({ innerColor: v }))}
                </>
              )}
              {colorInput('pbm-mat', 'Padding color', config.matColor, (v) => edit({ matColor: v }))}
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="pbm-width" className="font-medium text-tp-ink">
                  Border width
                </label>
                <span className="tabular-nums text-tp-muted">{config.width}px</span>
              </div>
              <input
                id="pbm-width"
                type="range"
                min={0}
                max={100}
                step={1}
                value={config.width}
                onChange={(e) => edit({ width: Number(e.target.value) })}
                className="mt-2 h-2 w-full cursor-pointer accent-tp-bronze"
              />
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="pbm-padding" className="font-medium text-tp-ink">
                  Padding
                </label>
                <span className="tabular-nums text-tp-muted">{config.padding}px</span>
              </div>
              <input
                id="pbm-padding"
                type="range"
                min={0}
                max={60}
                step={1}
                value={config.padding}
                onChange={(e) => edit({ padding: Number(e.target.value) })}
                className="mt-2 h-2 w-full cursor-pointer accent-tp-bronze"
              />
            </div>

            <label className="mt-5 flex cursor-pointer items-center justify-between gap-3 text-sm font-medium text-tp-ink">
              Rounded corners
              <input
                type="checkbox"
                checked={config.rounded}
                onChange={(e) => edit({ rounded: e.target.checked })}
                className="h-4 w-4 cursor-pointer accent-tp-bronze"
              />
            </label>

            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-tp-ink">Effect</p>
              {segment<Effect>(
                'Shadow or glow effect',
                [
                  { id: 'none', label: 'None' },
                  { id: 'shadow', label: 'Shadow' },
                  { id: 'glow', label: 'Glow' },
                ],
                config.effect,
                (v) => edit({ effect: v })
              )}
            </div>

            <div className="mt-6 grid gap-3">
              <button type="button" onClick={handleDownload} className={cn(buttonVariants({ variant: 'primary' }), 'w-full')}>
                <Download className="h-4 w-4" aria-hidden="true" />
                Download PNG
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={isDefault && presetId === 'clean-white'}
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
