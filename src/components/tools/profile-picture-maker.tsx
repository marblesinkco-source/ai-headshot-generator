'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Upload, Download, X, ShieldCheck, RotateCcw, Check, ImagePlus } from 'lucide-react';
import { cn } from '@/lib/utils';

const MAX_BYTES = 15 * 1024 * 1024;
const MAX_EXPORT = 4096;
const MIN_CROP = 32; // source pixels
const ACCEPTED = ['image/jpeg', 'image/png'];

type Platform = {
  id: string;
  name: string;
  short: string;
  size: number;
  circle: boolean;
};

const PLATFORMS: Platform[] = [
  { id: 'linkedin', name: 'LinkedIn Profile', short: 'in', size: 400, circle: true },
  { id: 'instagram', name: 'Instagram Profile', short: 'Ig', size: 320, circle: true },
  { id: 'facebook', name: 'Facebook Profile', short: 'f', size: 170, circle: true },
  { id: 'twitter', name: 'Twitter/X Profile', short: 'X', size: 400, circle: true },
  { id: 'youtube', name: 'YouTube Channel', short: 'Yt', size: 800, circle: true },
  { id: 'zoom', name: 'Zoom Profile', short: 'Z', size: 400, circle: true },
  { id: 'slack', name: 'Slack Profile', short: 'Sl', size: 512, circle: false },
  { id: 'whatsapp', name: 'WhatsApp Profile', short: 'Wa', size: 500, circle: true },
  { id: 'discord', name: 'Discord Avatar', short: 'Dc', size: 128, circle: true },
];

type Crop = { x: number; y: number; size: number }; // natural image pixels
type Corner = 'nw' | 'ne' | 'sw' | 'se';
type Drag =
  | { kind: 'move'; startX: number; startY: number; crop: Crop }
  | { kind: 'resize'; corner: Corner; anchorX: number; anchorY: number };

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function exportSize(p: Platform) {
  return Math.min(p.size, MAX_EXPORT);
}

function renderCrop(img: HTMLImageElement, crop: Crop, out: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = out;
  canvas.height = out;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, crop.x, crop.y, crop.size, crop.size, 0, 0, out, out);
  }
  return canvas;
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Could not encode the image.'))), 'image/png');
  });
}

/* ---------- Minimal ZIP writer (stored, no compression) ---------- */

let crcTable: Uint32Array | null = null;
function crc32(data: Uint8Array): number {
  if (!crcTable) {
    crcTable = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      crcTable[n] = c >>> 0;
    }
  }
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++) crc = crcTable[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function buildZip(files: { name: string; data: Uint8Array }[]): Blob {
  const encoder = new TextEncoder();
  const now = new Date();
  const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | Math.floor(now.getSeconds() / 2);
  const dosDate = (Math.max(0, now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();

  const parts: BlobPart[] = [];
  const central: BlobPart[] = [];
  let offset = 0;
  let centralSize = 0;

  for (const file of files) {
    const nameBytes = encoder.encode(file.name);
    const crc = crc32(file.data);
    const size = file.data.length;

    const local = new DataView(new ArrayBuffer(30));
    local.setUint32(0, 0x04034b50, true);
    local.setUint16(4, 20, true);
    local.setUint16(6, 0x0800, true);
    local.setUint16(8, 0, true);
    local.setUint16(10, dosTime, true);
    local.setUint16(12, dosDate, true);
    local.setUint32(14, crc, true);
    local.setUint32(18, size, true);
    local.setUint32(22, size, true);
    local.setUint16(26, nameBytes.length, true);
    local.setUint16(28, 0, true);
    parts.push(local.buffer, nameBytes, file.data);

    const cd = new DataView(new ArrayBuffer(46));
    cd.setUint32(0, 0x02014b50, true);
    cd.setUint16(4, 20, true);
    cd.setUint16(6, 20, true);
    cd.setUint16(8, 0x0800, true);
    cd.setUint16(10, 0, true);
    cd.setUint16(12, dosTime, true);
    cd.setUint16(14, dosDate, true);
    cd.setUint32(16, crc, true);
    cd.setUint32(20, size, true);
    cd.setUint32(24, size, true);
    cd.setUint16(28, nameBytes.length, true);
    cd.setUint16(30, 0, true);
    cd.setUint16(32, 0, true);
    cd.setUint16(34, 0, true);
    cd.setUint16(36, 0, true);
    cd.setUint32(38, 0, true);
    cd.setUint32(42, offset, true);
    central.push(cd.buffer, nameBytes);

    centralSize += 46 + nameBytes.length;
    offset += 30 + nameBytes.length + size;
  }

  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true);
  end.setUint16(8, files.length, true);
  end.setUint16(10, files.length, true);
  end.setUint32(12, centralSize, true);
  end.setUint32(16, offset, true);

  return new Blob([...parts, ...central, end.buffer], { type: 'application/zip' });
}

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function ProfilePictureMaker() {
  const inputRef = useRef<HTMLInputElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const dragRef = useRef<Drag | null>(null);
  const urlRef = useRef<string | null>(null);

  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState('');
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0, size: 100 });
  const [scale, setScale] = useState(1); // display px per natural px
  const [platformId, setPlatformId] = useState(PLATFORMS[0].id);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const platform = PLATFORMS.find((p) => p.id === platformId) ?? PLATFORMS[0];

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  // Track displayed image scale.
  useEffect(() => {
    if (!img) return;
    const el = stageRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / img.naturalWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [img]);

  // Live preview.
  useEffect(() => {
    const canvas = previewRef.current;
    if (!img || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, crop.x, crop.y, crop.size, crop.size, 0, 0, canvas.width, canvas.height);
  }, [img, crop, platformId]);

  const loadFile = useCallback((file?: File | null) => {
    if (!file) return;
    setError('');
    if (!ACCEPTED.includes(file.type)) {
      setError('Please choose a JPEG or PNG image.');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('That file is larger than 15MB. Please choose a smaller image.');
      return;
    }
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = url;
      const side = Math.min(image.naturalWidth, image.naturalHeight);
      setCrop({
        x: Math.round((image.naturalWidth - side) / 2),
        y: Math.round((image.naturalHeight - side) / 2),
        size: side,
      });
      setFileName(file.name);
      setImg(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      setError('We could not read that image. Try another file.');
    };
    image.src = url;
  }, []);

  const reset = () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setImg(null);
    setFileName('');
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  /* ---------- crop interaction ---------- */

  const toNatural = (clientX: number, clientY: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect || !scale) return { x: 0, y: 0 };
    return { x: (clientX - rect.left) / scale, y: (clientY - rect.top) / scale };
  };

  const onMovePointerDown = (e: React.PointerEvent) => {
    if (!img) return;
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const p = toNatural(e.clientX, e.clientY);
    dragRef.current = { kind: 'move', startX: p.x, startY: p.y, crop };
  };

  const onHandlePointerDown = (corner: Corner) => (e: React.PointerEvent) => {
    if (!img) return;
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = {
      kind: 'resize',
      corner,
      anchorX: corner === 'nw' || corner === 'sw' ? crop.x + crop.size : crop.x,
      anchorY: corner === 'nw' || corner === 'ne' ? crop.y + crop.size : crop.y,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d || !img) return;
    const p = toNatural(e.clientX, e.clientY);
    const W = img.naturalWidth;
    const H = img.naturalHeight;

    if (d.kind === 'move') {
      const nx = clamp(d.crop.x + (p.x - d.startX), 0, W - d.crop.size);
      const ny = clamp(d.crop.y + (p.y - d.startY), 0, H - d.crop.size);
      setCrop({ x: Math.round(nx), y: Math.round(ny), size: d.crop.size });
      return;
    }

    const left = d.corner === 'nw' || d.corner === 'sw';
    const top = d.corner === 'nw' || d.corner === 'ne';
    const dx = left ? d.anchorX - p.x : p.x - d.anchorX;
    const dy = top ? d.anchorY - p.y : p.y - d.anchorY;
    const maxW = left ? d.anchorX : W - d.anchorX;
    const maxH = top ? d.anchorY : H - d.anchorY;
    const max = Math.max(MIN_CROP, Math.min(maxW, maxH));
    const size = clamp(Math.max(dx, dy), Math.min(MIN_CROP, max), max);
    setCrop({
      x: Math.round(left ? d.anchorX - size : d.anchorX),
      y: Math.round(top ? d.anchorY - size : d.anchorY),
      size: Math.round(size),
    });
  };

  const endDrag = () => {
    dragRef.current = null;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!img) return;
    const step = e.shiftKey ? 20 : 4;
    let { x, y } = crop;
    if (e.key === 'ArrowLeft') x -= step;
    else if (e.key === 'ArrowRight') x += step;
    else if (e.key === 'ArrowUp') y -= step;
    else if (e.key === 'ArrowDown') y += step;
    else return;
    e.preventDefault();
    setCrop({
      x: clamp(x, 0, img.naturalWidth - crop.size),
      y: clamp(y, 0, img.naturalHeight - crop.size),
      size: crop.size,
    });
  };

  /* ---------- export ---------- */

  const base = fileName.replace(/\.[^.]+$/, '') || 'profile';

  const downloadOne = async () => {
    if (!img) return;
    setBusy(true);
    setError('');
    try {
      const out = exportSize(platform);
      const blob = await canvasToBlob(renderCrop(img, crop, out));
      saveBlob(blob, `${platform.id}-${out}x${out}.png`);
    } catch {
      setError('Could not create the image. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const downloadAll = async () => {
    if (!img) return;
    setBusy(true);
    setError('');
    try {
      const files: { name: string; data: Uint8Array }[] = [];
      for (const p of PLATFORMS) {
        const out = exportSize(p);
        const blob = await canvasToBlob(renderCrop(img, crop, out));
        files.push({ name: `${p.id}-${out}x${out}.png`, data: new Uint8Array(await blob.arrayBuffer()) });
      }
      saveBlob(buildZip(files), `${base}-profile-pictures.zip`);
    } catch {
      setError('Could not create the ZIP. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const display = {
    left: crop.x * scale,
    top: crop.y * scale,
    size: crop.size * scale,
  };

  const handles: { corner: Corner; cls: string; cursor: string; label: string }[] = [
    { corner: 'nw', cls: '-left-2 -top-2', cursor: 'cursor-nwse-resize', label: 'Resize crop from top left corner' },
    { corner: 'ne', cls: '-right-2 -top-2', cursor: 'cursor-nesw-resize', label: 'Resize crop from top right corner' },
    { corner: 'sw', cls: '-bottom-2 -left-2', cursor: 'cursor-nesw-resize', label: 'Resize crop from bottom left corner' },
    { corner: 'se', cls: '-bottom-2 -right-2', cursor: 'cursor-nwse-resize', label: 'Resize crop from bottom right corner' },
  ];

  const buttonBase =
    'inline-flex items-center justify-center gap-2 rounded-tp-button px-5 py-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2';

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      <div className="rounded-tp-card border border-tp-line bg-white p-5 sm:p-8">
        {!img ? (
          <div>
            <label
              htmlFor="profile-picture-input"
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
              <span className="mt-1 text-sm text-tp-muted">JPEG or PNG, up to 15MB</span>
            </label>
            <input
              ref={inputRef}
              id="profile-picture-input"
              type="file"
              accept="image/jpeg,image/png"
              aria-label="Upload a JPEG or PNG photo"
              className="sr-only"
              onChange={(e) => loadFile(e.target.files?.[0])}
            />
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-tp-muted">
              <ShieldCheck className="h-4 w-4 text-tp-bronze-ink" aria-hidden="true" />
              Your photo is processed in your browser and is never uploaded.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* Crop area */}
            <div className="min-w-0">
              <div
                ref={stageRef}
                className="relative mx-auto w-full select-none overflow-hidden rounded-tp-card border border-tp-line bg-tp-paper"
                style={{ maxWidth: `min(100%, ${Math.round((img.naturalWidth / img.naturalHeight) * 520)}px)` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt="Your uploaded photo"
                  draggable={false}
                  className="block h-auto w-full"
                />
                <div
                  role="group"
                  tabIndex={0}
                  aria-label="Crop area. Drag to reposition, drag a corner to resize, or use arrow keys to move."
                  onPointerDown={onMovePointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={endDrag}
                  onPointerCancel={endDrag}
                  onKeyDown={onKeyDown}
                  className="absolute cursor-move touch-none border-2 border-white focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
                  style={{
                    left: display.left,
                    top: display.top,
                    width: display.size,
                    height: display.size,
                    boxShadow: '0 0 0 9999px rgba(20, 16, 12, 0.55)',
                  }}
                >
                  {platform.circle && (
                    <span className="pointer-events-none absolute inset-0 rounded-full border border-dashed border-white/80" />
                  )}
                  {handles.map((h) => (
                    <span
                      key={h.corner}
                      role="button"
                      aria-label={h.label}
                      onPointerDown={onHandlePointerDown(h.corner)}
                      onPointerMove={onPointerMove}
                      onPointerUp={endDrag}
                      onPointerCancel={endDrag}
                      className={cn(
                        'absolute h-4 w-4 touch-none rounded-sm border-2 border-tp-bronze bg-white',
                        h.cls,
                        h.cursor,
                      )}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-center text-sm text-tp-muted">
                Crop: {Math.round(crop.size)} × {Math.round(crop.size)} px
                <span className="mx-2" aria-hidden="true">·</span>
                Original: {img.naturalWidth} × {img.naturalHeight} px
              </p>
              <p className="mt-1 text-center text-xs text-tp-muted">
                Drag the square to move it. Drag a corner to resize.
              </p>
            </div>

            {/* Preview + actions */}
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xl font-normal text-tp-ink">Preview</h2>
                <div className="mt-3 flex flex-col items-center rounded-tp-card bg-tp-paper p-5">
                  <canvas
                    ref={previewRef}
                    width={200}
                    height={200}
                    role="img"
                    aria-label={`${platform.name} preview, ${platform.circle ? 'circle' : 'square'} shape`}
                    className={cn(
                      'h-[160px] w-[160px] border border-tp-line bg-white',
                      platform.circle ? 'rounded-full' : 'rounded-tp-button',
                    )}
                  />
                  <p className="mt-3 text-sm font-medium text-tp-ink">{platform.name}</p>
                  <p className="text-xs text-tp-muted">
                    {exportSize(platform)} × {exportSize(platform)} px, {platform.circle ? 'circle' : 'square'} preview
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-xl font-normal text-tp-ink">Platform</h2>
                <div className="mt-3 grid grid-cols-2 gap-2" role="radiogroup" aria-label="Choose a platform">
                  {PLATFORMS.map((p) => {
                    const active = p.id === platformId;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        aria-label={`${p.name}, ${p.size} by ${p.size} pixels`}
                        onClick={() => setPlatformId(p.id)}
                        className={cn(
                          'flex items-center gap-2 rounded-tp-button border px-3 py-2 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
                          active
                            ? 'border-tp-bronze bg-tp-beige/40 text-tp-ink'
                            : 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze',
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-tp-ink text-[11px] font-medium text-tp-paper"
                        >
                          {active ? <Check className="h-4 w-4" /> : p.short}
                        </span>
                        <span className="min-w-0 leading-tight">
                          <span className="block truncate">{p.name.replace(' Profile', '')}</span>
                          <span className="block text-xs text-tp-muted">{p.size}px</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={downloadOne}
                  disabled={busy}
                  aria-label={`Download ${platform.name} as PNG`}
                  className={cn(buttonBase, 'bg-tp-ink text-tp-paper hover:bg-tp-black')}
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download
                </button>
                <button
                  type="button"
                  onClick={downloadAll}
                  disabled={busy}
                  aria-label="Download all 9 platform versions as a ZIP file"
                  className={cn(buttonBase, 'border border-tp-line bg-white text-tp-ink hover:border-tp-bronze')}
                >
                  <ImagePlus className="h-4 w-4" aria-hidden="true" />
                  Download All (ZIP)
                </button>
                <button
                  type="button"
                  onClick={reset}
                  aria-label="Reset and start over with a new photo"
                  className={cn(buttonBase, 'text-tp-muted hover:text-tp-ink')}
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Reset
                </button>
              </div>

              <p className="flex items-start gap-2 text-xs text-tp-muted">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
                Processed in your browser. Your photo is never uploaded.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mt-4 flex items-start justify-between gap-3 rounded-tp-button border border-tp-line bg-tp-paper px-4 py-3 text-sm text-tp-ink"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError('')}
              aria-label="Dismiss error message"
              className="shrink-0 text-tp-muted hover:text-tp-ink"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
