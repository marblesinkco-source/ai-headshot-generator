'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Upload, Download, X, Check, ShieldCheck, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

const MAX_BYTES = 15 * 1024 * 1024;
const PREVIEW_MAX = 320;
const CUSTOM_MIN = 16;
const CUSTOM_MAX = 4000;

type Preset = { id: string; label: string; slug: string; w: number; h: number };

const PRESETS: Preset[] = [
  { id: 'linkedin-profile', label: 'LinkedIn Profile', slug: 'linkedin-profile', w: 400, h: 400 },
  { id: 'linkedin-banner', label: 'LinkedIn Banner', slug: 'linkedin-banner', w: 1584, h: 396 },
  { id: 'instagram-profile', label: 'Instagram Profile', slug: 'instagram-profile', w: 320, h: 320 },
  { id: 'instagram-post', label: 'Instagram Post', slug: 'instagram-post', w: 1080, h: 1080 },
  { id: 'instagram-story', label: 'Instagram Story', slug: 'instagram-story', w: 1080, h: 1920 },
  { id: 'facebook-profile', label: 'Facebook Profile', slug: 'facebook-profile', w: 170, h: 170 },
  { id: 'facebook-cover', label: 'Facebook Cover', slug: 'facebook-cover', w: 820, h: 312 },
  { id: 'x-profile', label: 'X (Twitter) Profile', slug: 'x-profile', w: 400, h: 400 },
  { id: 'x-header', label: 'X Header', slug: 'x-header', w: 1500, h: 500 },
  { id: 'youtube-profile', label: 'YouTube Profile', slug: 'youtube-profile', w: 800, h: 800 },
  { id: 'slack-teams-avatar', label: 'Slack/Teams Avatar', slug: 'slack-teams-avatar', w: 512, h: 512 },
  { id: 'zoom-profile', label: 'Zoom Profile', slug: 'zoom-profile', w: 400, h: 400 },
];

type Crop = { zoom: number; x: number; y: number };
const DEFAULT_CROP: Crop = { zoom: 1, x: 0, y: 0 };

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

/** Max pan (fraction of output size) that keeps the output fully covered by the image. */
function maxPan(img: HTMLImageElement, W: number, H: number, zoom: number) {
  const s = Math.max(W / img.naturalWidth, H / img.naturalHeight) * zoom;
  return {
    x: Math.max(0, (img.naturalWidth * s - W) / 2) / W,
    y: Math.max(0, (img.naturalHeight * s - H) / 2) / H,
  };
}

function drawCrop(canvas: HTMLCanvasElement, img: HTMLImageElement, W: number, H: number, crop: Crop) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.imageSmoothingQuality = 'high';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const k = canvas.width / W;
  const s = Math.max(W / img.naturalWidth, H / img.naturalHeight) * crop.zoom;
  const dw = img.naturalWidth * s;
  const dh = img.naturalHeight * s;
  const m = maxPan(img, W, H, crop.zoom);
  const ox = clamp(crop.x, -m.x, m.x);
  const oy = clamp(crop.y, -m.y, m.y);
  ctx.drawImage(img, (W / 2 + ox * W - dw / 2) * k, (H / 2 + oy * H - dh / 2) * k, dw * k, dh * k);
}

function downloadName(slug: string, w: number, h: number) {
  return `${slug}-${w}x${h}.png`;
}

function saveCanvas(img: HTMLImageElement, slug: string, w: number, h: number, crop: Crop): Promise<void> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    drawCrop(canvas, img, w, h, crop);
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = downloadName(slug, w, h);
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
      }
      resolve();
    }, 'image/png');
  });
}

type CropCardProps = {
  img: HTMLImageElement;
  label: string;
  w: number;
  h: number;
  crop: Crop;
  onChange: (c: Crop) => void;
  onDownload: () => void;
  onRemove: () => void;
};

function CropCard({ img, label, w, h, crop, onChange, onDownload, onRemove }: CropCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragRef = useRef<{ px: number; py: number; ox: number; oy: number } | null>(null);

  const scale = Math.min(1, PREVIEW_MAX / Math.max(w, h));
  const cw = Math.max(1, Math.round(w * scale));
  const ch = Math.max(1, Math.round(h * scale));

  useEffect(() => {
    if (canvasRef.current) drawCrop(canvasRef.current, img, w, h, crop);
  }, [img, w, h, crop, cw, ch]);

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const m = maxPan(img, w, h, crop.zoom);
    dragRef.current = {
      px: e.clientX,
      py: e.clientY,
      ox: clamp(crop.x, -m.x, m.x),
      oy: clamp(crop.y, -m.y, m.y),
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const d = dragRef.current;
    if (!d) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const m = maxPan(img, w, h, crop.zoom);
    onChange({
      zoom: crop.zoom,
      x: clamp(d.ox + (e.clientX - d.px) / rect.width, -m.x, m.x),
      y: clamp(d.oy + (e.clientY - d.py) / rect.height, -m.y, m.y),
    });
  };

  const endDrag = () => {
    dragRef.current = null;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
    const step = 0.02;
    const m = maxPan(img, w, h, crop.zoom);
    let { x, y } = crop;
    if (e.key === 'ArrowLeft') x -= step;
    else if (e.key === 'ArrowRight') x += step;
    else if (e.key === 'ArrowUp') y -= step;
    else if (e.key === 'ArrowDown') y += step;
    else return;
    e.preventDefault();
    onChange({ zoom: crop.zoom, x: clamp(x, -m.x, m.x), y: clamp(y, -m.y, m.y) });
  };

  const onZoom = (z: number) => {
    const m = maxPan(img, w, h, z);
    onChange({ zoom: z, x: clamp(crop.x, -m.x, m.x), y: clamp(crop.y, -m.y, m.y) });
  };

  return (
    <div className="rounded-tp-card border border-tp-line bg-white p-4">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-xl font-normal text-tp-ink">{label}</h3>
          <p className="text-xs text-tp-muted">
            {w} × {h} px
          </p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="rounded-tp-button p-1.5 text-tp-muted transition-colors hover:bg-tp-beige/40 hover:text-tp-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
          aria-label={`Remove ${label}`}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="flex justify-center rounded-tp-button bg-tp-beige/30 p-3">
        <canvas
          ref={canvasRef}
          width={cw}
          height={ch}
          tabIndex={0}
          role="img"
          aria-label={`${label} crop preview. Drag or use arrow keys to reposition.`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKeyDown}
          className="max-w-full cursor-grab touch-none rounded-sm border border-tp-line bg-white active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
          style={{ width: cw, height: ch }}
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <label htmlFor={`zoom-${label.replace(/[^a-z0-9]+/gi, "-")}`} className="text-xs font-medium text-tp-ink">
          Zoom
        </label>
        <input
          id={`zoom-${label.replace(/[^a-z0-9]+/gi, "-")}`}
          type="range"
          min={1}
          max={3}
          step={0.05}
          value={crop.zoom}
          onChange={(e) => onZoom(Number(e.target.value))}
          className="h-1.5 flex-1 cursor-pointer accent-tp-bronze"
        />
        <span className="w-9 text-right text-xs tabular-nums text-tp-muted">{crop.zoom.toFixed(1)}x</span>
        <button
          type="button"
          onClick={() => onChange(DEFAULT_CROP)}
          className="rounded-tp-button p-1.5 text-tp-muted transition-colors hover:bg-tp-beige/40 hover:text-tp-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
          aria-label={`Reset ${label} crop`}
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <button
        type="button"
        onClick={onDownload}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-tp-button border border-tp-line bg-white px-4 py-2.5 text-sm font-medium text-tp-ink transition-colors hover:bg-tp-beige/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        Download PNG
      </button>
    </div>
  );
}

export default function SocialMediaResizer() {
  const inputRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<string | null>(null);

  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [selected, setSelected] = useState<string[]>(['linkedin-profile']);
  const [customOn, setCustomOn] = useState(false);
  const [customW, setCustomW] = useState('800');
  const [customH, setCustomH] = useState('600');
  const [crops, setCrops] = useState<Record<string, Crop>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  const loadFile = useCallback((file: File | undefined | null) => {
    if (!file) return;
    if (!/^image\/(png|jpe?g|webp|gif|bmp)$/i.test(file.type)) {
      setError('Please choose a PNG, JPG, WebP, GIF or BMP image.');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('That image is larger than 15 MB. Please choose a smaller one.');
      return;
    }
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = url;
      setImg(image);
      setCrops({});
      setError(null);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      setError('We could not read that image. Try a different file.');
    };
    image.src = url;
  }, []);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const cw = clamp(Math.round(Number(customW) || 0), CUSTOM_MIN, CUSTOM_MAX);
  const ch = clamp(Math.round(Number(customH) || 0), CUSTOM_MIN, CUSTOM_MAX);

  type Target = { key: string; label: string; slug: string; w: number; h: number };
  const targets: Target[] = [
    ...PRESETS.filter((p) => selected.includes(p.id)).map((p) => ({
      key: p.id,
      label: p.label,
      slug: p.slug,
      w: p.w,
      h: p.h,
    })),
    ...(customOn ? [{ key: 'custom', label: 'Custom', slug: 'custom', w: cw, h: ch }] : []),
  ];

  const cropFor = (key: string) => crops[key] ?? DEFAULT_CROP;
  const setCrop = (key: string, c: Crop) => setCrops((prev) => ({ ...prev, [key]: c }));

  const downloadOne = (t: Target) => {
    if (img) void saveCanvas(img, t.slug, t.w, t.h, cropFor(t.key));
  };

  const downloadAll = async () => {
    if (!img || busy) return;
    setBusy(true);
    try {
      for (const t of targets) {
        await saveCanvas(img, t.slug, t.w, t.h, cropFor(t.key));
        await new Promise((r) => setTimeout(r, 300));
      }
    } finally {
      setBusy(false);
    }
  };

  const chip = (active: boolean) =>
    cn(
      'flex items-center gap-2 rounded-tp-button border px-3 py-2.5 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
      active
        ? 'border-tp-bronze bg-tp-beige/40 text-tp-ink'
        : 'border-tp-line bg-white text-tp-ink hover:bg-tp-beige/20',
    );

  const box = (active: boolean) =>
    cn(
      'flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border',
      active ? 'border-tp-bronze bg-tp-bronze text-tp-black' : 'border-tp-line bg-white',
    );

  return (
    <div className="mx-auto w-full max-w-5xl px-0 sm:px-2">
      <div className="rounded-tp-card border border-tp-line bg-white p-5 sm:p-8">
        {!img ? (
          <div
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
              'flex flex-col items-center justify-center rounded-tp-card border-2 border-dashed px-6 py-14 text-center transition-colors',
              dragOver ? 'border-tp-bronze bg-tp-beige/40' : 'border-tp-line bg-tp-paper',
            )}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-beige/40 text-tp-bronze-ink">
              <Upload className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="mt-4 font-display text-2xl font-normal text-tp-ink">Drop your photo here</p>
            <p className="mt-1 text-sm text-tp-muted">PNG, JPG or WebP, up to 15 MB</p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-5 rounded-tp-button bg-tp-ink px-5 py-2.5 text-sm font-medium text-tp-paper transition-colors hover:bg-tp-black focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
            >
              Choose a photo
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt="Your uploaded photo"
              className="h-24 w-24 rounded-tp-button border border-tp-line object-cover"
            />
            <div className="flex-1 text-center sm:text-left">
              <p className="font-display text-xl font-normal text-tp-ink">Photo ready</p>
              <p className="text-sm text-tp-muted">
                {img.naturalWidth} × {img.naturalHeight} px. Pick your platforms below.
              </p>
            </div>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-tp-button border border-tp-line bg-white px-4 py-2.5 text-sm font-medium text-tp-ink transition-colors hover:bg-tp-beige/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
            >
              Change photo
            </button>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/bmp"
          className="sr-only"
          aria-label="Upload a photo"
          onChange={(e) => {
            loadFile(e.target.files?.[0]);
            e.target.value = '';
          }}
        />

        {error && (
          <p role="alert" className="mt-4 text-sm text-tp-ink">
            {error}
          </p>
        )}

        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-tp-muted">
          <ShieldCheck className="h-4 w-4 text-tp-bronze-ink" aria-hidden="true" />
          Your photos never leave your browser
        </p>
      </div>

      <div className="mt-6 rounded-tp-card border border-tp-line bg-white p-5 sm:p-8">
        <h2 className="font-display text-2xl font-normal text-tp-ink">Choose platforms</h2>
        <p className="mt-1 text-sm text-tp-muted">Select as many sizes as you need.</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRESETS.map((p) => {
            const active = selected.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                role="checkbox"
                aria-checked={active}
                onClick={() => toggle(p.id)}
                className={chip(active)}
              >
                <span className={box(active)}>
                  {active && <Check className="h-3 w-3" aria-hidden="true" />}
                </span>
                <span className="flex-1">{p.label}</span>
                <span className="text-xs text-tp-muted">
                  {p.w}×{p.h}
                </span>
              </button>
            );
          })}
          <button
            type="button"
            role="checkbox"
            aria-checked={customOn}
            onClick={() => setCustomOn((v) => !v)}
            className={chip(customOn)}
          >
            <span className={box(customOn)}>
              {customOn && <Check className="h-3 w-3" aria-hidden="true" />}
            </span>
            <span className="flex-1">Custom</span>
            <span className="text-xs text-tp-muted">
              {cw}×{ch}
            </span>
          </button>
        </div>

        {customOn && (
          <div className="mt-4 flex flex-wrap items-end gap-3">
            <div>
              <label htmlFor="custom-w" className="block text-xs font-medium text-tp-ink">
                Width (px)
              </label>
              <input
                id="custom-w"
                type="number"
                inputMode="numeric"
                min={CUSTOM_MIN}
                max={CUSTOM_MAX}
                value={customW}
                onChange={(e) => setCustomW(e.target.value)}
                className="mt-1 w-28 rounded-tp-button border border-tp-line bg-white px-3 py-2 text-sm text-tp-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
              />
            </div>
            <span className="pb-2 text-tp-muted" aria-hidden="true">
              ×
            </span>
            <div>
              <label htmlFor="custom-h" className="block text-xs font-medium text-tp-ink">
                Height (px)
              </label>
              <input
                id="custom-h"
                type="number"
                inputMode="numeric"
                min={CUSTOM_MIN}
                max={CUSTOM_MAX}
                value={customH}
                onChange={(e) => setCustomH(e.target.value)}
                className="mt-1 w-28 rounded-tp-button border border-tp-line bg-white px-3 py-2 text-sm text-tp-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
              />
            </div>
            <p className="pb-2 text-xs text-tp-muted">
              {CUSTOM_MIN} to {CUSTOM_MAX} px per side
            </p>
          </div>
        )}
      </div>

      {img && targets.length > 0 && (
        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-normal text-tp-ink">Adjust and download</h2>
              <p className="text-sm text-tp-muted">Drag a preview to reposition. Use the slider to zoom.</p>
            </div>
            <button
              type="button"
              onClick={downloadAll}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-ink px-5 py-2.5 text-sm font-medium text-tp-paper transition-colors hover:bg-tp-black focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze disabled:opacity-60"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {busy ? 'Downloading…' : `Download All (${targets.length})`}
            </button>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {targets.map((t) => (
              <CropCard
                key={`${t.key}-${t.w}x${t.h}`}
                img={img}
                label={t.label}
                w={t.w}
                h={t.h}
                crop={cropFor(t.key)}
                onChange={(c) => setCrop(t.key, c)}
                onDownload={() => downloadOne(t)}
                onRemove={() => (t.key === 'custom' ? setCustomOn(false) : toggle(t.key))}
              />
            ))}
          </div>
        </div>
      )}

      {img && targets.length === 0 && (
        <p className="mt-6 text-center text-sm text-tp-muted">Select at least one platform to start cropping.</p>
      )}
    </div>
  );
}
