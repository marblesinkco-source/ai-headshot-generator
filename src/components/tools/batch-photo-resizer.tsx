'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Upload, Download, X, ShieldCheck, Trash2, ImagePlus, Package } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MAX_FILE_BYTES = 15 * 1024 * 1024;
const MAX_FILES = 20;
const MAX_OUTPUT_DIM = 8192;

type Mode = 'percent' | 'width' | 'height' | 'exact';
type Fit = 'contain' | 'cover' | 'stretch';

interface Preset {
  id: string;
  label: string;
  w?: number;
  h?: number;
}

const PRESETS: Preset[] = [
  { id: 'linkedin-profile', label: 'LinkedIn Profile (400x400)', w: 400, h: 400 },
  { id: 'linkedin-banner', label: 'LinkedIn Banner (1584x396)', w: 1584, h: 396 },
  { id: 'instagram-square', label: 'Instagram Square (1080x1080)', w: 1080, h: 1080 },
  { id: 'instagram-portrait', label: 'Instagram Portrait (1080x1350)', w: 1080, h: 1350 },
  { id: 'facebook-profile', label: 'Facebook Profile (170x170)', w: 170, h: 170 },
  { id: 'twitter-profile', label: 'Twitter/X Profile (400x400)', w: 400, h: 400 },
  { id: 'youtube-thumbnail', label: 'YouTube Thumbnail (1280x720)', w: 1280, h: 720 },
  { id: 'passport-us', label: 'Passport US (600x600)', w: 600, h: 600 },
  { id: 'custom', label: 'Custom' },
];

const FIT_OPTIONS: { id: Fit; label: string; hint: string }[] = [
  { id: 'contain', label: 'Contain', hint: 'Fit within the box' },
  { id: 'cover', label: 'Cover', hint: 'Fill and crop' },
  { id: 'stretch', label: 'Stretch', hint: 'Match exactly' },
];

const MODES: { id: Mode; label: string }[] = [
  { id: 'percent', label: 'Percentage' },
  { id: 'width', label: 'Max width' },
  { id: 'height', label: 'Max height' },
  { id: 'exact', label: 'Exact size' },
];

interface Settings {
  mode: Mode;
  percent: number;
  maxWidth: number;
  maxHeight: number;
  exactW: number;
  exactH: number;
  fit: Fit;
}

interface Item {
  id: string;
  name: string;
  url: string;
  img: HTMLImageElement;
  origW: number;
  origH: number;
}

const clampInt = (v: number, min: number, max: number) => {
  if (!Number.isFinite(v)) return min;
  return Math.min(max, Math.max(min, Math.round(v)));
};

/** Output canvas size for one image under the current settings. */
function computeOutput(item: { origW: number; origH: number }, s: Settings): { w: number; h: number } {
  const { origW, origH } = item;
  let w = origW;
  let h = origH;
  switch (s.mode) {
    case 'percent': {
      const f = s.percent / 100;
      w = origW * f;
      h = origH * f;
      break;
    }
    case 'width': {
      const f = Math.min(1, s.maxWidth / origW); // "max": never enlarge
      w = origW * f;
      h = origH * f;
      break;
    }
    case 'height': {
      const f = Math.min(1, s.maxHeight / origH);
      w = origW * f;
      h = origH * f;
      break;
    }
    case 'exact': {
      if (s.fit === 'contain') {
        const f = Math.min(s.exactW / origW, s.exactH / origH);
        w = origW * f;
        h = origH * f;
      } else {
        w = s.exactW;
        h = s.exactH;
      }
      break;
    }
  }
  return { w: clampInt(w, 1, MAX_OUTPUT_DIM), h: clampInt(h, 1, MAX_OUTPUT_DIM) };
}

function renderToBlob(item: Item, s: Settings): Promise<Blob> {
  const { w, h } = computeOutput(item, s);
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return Promise.reject(new Error('Canvas is not available in this browser.'));
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (s.mode === 'exact' && s.fit === 'cover') {
    // Scale to fill the box, then crop the overflow evenly from both sides.
    const f = Math.max(w / item.origW, h / item.origH);
    const sw = w / f;
    const sh = h / f;
    ctx.drawImage(item.img, (item.origW - sw) / 2, (item.origH - sh) / 2, sw, sh, 0, 0, w, h);
  } else {
    ctx.drawImage(item.img, 0, 0, w, h);
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Could not encode the image.'))), 'image/png');
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
    local.setUint16(6, 0x0800, true); // UTF-8 names
    local.setUint16(8, 0, true); // stored
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

export default function BatchPhotoResizer() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<Item[]>([]);
  const idCounter = useRef(0);

  const [items, setItems] = useState<Item[]>([]);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preset, setPreset] = useState('custom');
  const [settings, setSettings] = useState<Settings>({
    mode: 'percent',
    percent: 50,
    maxWidth: 1080,
    maxHeight: 1080,
    exactW: 1080,
    exactH: 1080,
    fit: 'contain',
  });
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  // Release object URLs on unmount.
  useEffect(() => {
    return () => {
      itemsRef.current.forEach((i) => URL.revokeObjectURL(i.url));
    };
  }, []);

  const update = (patch: Partial<Settings>) => setSettings((s) => ({ ...s, ...patch }));

  const addFiles = useCallback((fileList: FileList | File[]) => {
    setError(null);
    const files = Array.from(fileList);
    if (!files.length) return;

    const problems: string[] = [];
    const valid: File[] = [];
    for (const f of files) {
      if (!/^image\/(jpeg|png)$/.test(f.type)) {
        problems.push(`${f.name} is not a JPEG or PNG.`);
      } else if (f.size > MAX_FILE_BYTES) {
        problems.push(`${f.name} is larger than 15 MB.`);
      } else {
        valid.push(f);
      }
    }

    const room = MAX_FILES - itemsRef.current.length;
    if (valid.length > room) {
      problems.push(`You can resize up to ${MAX_FILES} photos at once. Extra files were skipped.`);
    }
    const accepted = valid.slice(0, Math.max(0, room));

    accepted.forEach((file) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const item: Item = {
          id: `f${++idCounter.current}`,
          name: file.name.replace(/\.[^.]+$/, '') || 'photo',
          url,
          img,
          origW: img.naturalWidth,
          origH: img.naturalHeight,
        };
        setItems((prev) => (prev.length >= MAX_FILES ? (URL.revokeObjectURL(url), prev) : [...prev, item]));
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        setError(`We could not read ${file.name}. Try a different file.`);
      };
      img.src = url;
    });

    if (problems.length) setError(problems.join(' '));
  }, []);

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((i) => i.id !== id);
    });
  };

  const clearAll = () => {
    items.forEach((i) => URL.revokeObjectURL(i.url));
    setItems([]);
    setError(null);
    setProgress(null);
  };

  const onPresetChange = (id: string) => {
    setPreset(id);
    const p = PRESETS.find((x) => x.id === id);
    if (p?.w && p?.h) {
      setSettings((s) => ({ ...s, mode: 'exact', exactW: p.w!, exactH: p.h!, fit: s.fit === 'stretch' ? 'cover' : s.fit }));
    }
  };

  const downloadOne = async (item: Item) => {
    setError(null);
    setBusyId(item.id);
    try {
      const blob = await renderToBlob(item, settings);
      const { w, h } = computeOutput(item, settings);
      saveBlob(blob, `${item.name}-${w}x${h}.png`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong while resizing.');
    } finally {
      setBusyId(null);
    }
  };

  const downloadAll = async () => {
    if (!items.length || progress) return;
    setError(null);
    setProgress({ done: 0, total: items.length });
    try {
      const used = new Map<string, number>();
      const entries: { name: string; data: Uint8Array }[] = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const blob = await renderToBlob(item, settings);
        const data = new Uint8Array(await blob.arrayBuffer());
        const { w, h } = computeOutput(item, settings);
        const base = `${item.name}-${w}x${h}`;
        const count = used.get(base) ?? 0;
        used.set(base, count + 1);
        entries.push({ name: count ? `${base}-${count + 1}.png` : `${base}.png`, data });
        setProgress({ done: i + 1, total: items.length });
        // Yield so the progress bar can paint between photos.
        await new Promise((r) => setTimeout(r, 0));
      }
      saveBlob(buildZip(entries), 'resized-photos.zip');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong while building the ZIP.');
    } finally {
      setProgress(null);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  const inputClass =
    'mt-1 w-full rounded-tp-button border border-tp-line bg-white px-3 py-2 text-sm text-tp-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze';

  const dropZone = (compact: boolean) => (
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
        'flex w-full flex-col items-center justify-center rounded-tp-card border-2 border-dashed bg-white px-6 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2',
        compact ? 'py-8' : 'py-16',
        dragging ? 'border-tp-bronze bg-tp-beige/30' : 'border-tp-line hover:border-tp-bronze'
      )}
    >
      {compact ? (
        <ImagePlus className="h-6 w-6 text-tp-bronze-ink" aria-hidden="true" />
      ) : (
        <Upload className="h-8 w-8 text-tp-bronze-ink" aria-hidden="true" />
      )}
      <span className={cn('mt-3 font-display font-normal text-tp-ink', compact ? 'text-xl' : 'text-2xl')}>
        {compact ? 'Add more photos' : 'Drop your photos here or click to browse'}
      </span>
      <span className="mt-2 text-sm text-tp-muted">
        JPEG, PNG • Up to {MAX_FILES} photos, 15 MB each • Runs in your browser
      </span>
    </button>
  );

  const busy = progress !== null;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        multiple
        className="sr-only"
        aria-label="Upload photos"
        onChange={(e) => {
          if (e.target.files?.length) addFiles(e.target.files);
          e.target.value = '';
        }}
      />

      {items.length === 0 && dropZone(false)}

      {error && (
        <p role="alert" className="mt-4 rounded-tp-button border border-tp-line bg-white px-4 py-3 text-sm text-tp-ink">
          {error}
        </p>
      )}

      {items.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="h-fit rounded-tp-card border border-tp-line bg-white p-6">
            <h2 className="font-display font-normal text-2xl text-tp-ink">Resize settings</h2>

            <div className="mt-5">
              <label htmlFor="bpr-preset" className="text-sm font-medium text-tp-ink">
                Platform preset
              </label>
              <select id="bpr-preset" value={preset} onChange={(e) => onPresetChange(e.target.value)} className={inputClass}>
                {PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <label htmlFor="bpr-mode" className="text-sm font-medium text-tp-ink">
                Resize by
              </label>
              <select
                id="bpr-mode"
                value={settings.mode}
                onChange={(e) => {
                  update({ mode: e.target.value as Mode });
                  if (e.target.value !== 'exact') setPreset('custom');
                }}
                className={inputClass}
              >
                {MODES.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            {settings.mode === 'percent' && (
              <div className="mt-5">
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor="bpr-percent" className="font-medium text-tp-ink">
                    Scale
                  </label>
                  <span className="tabular-nums text-tp-muted">{settings.percent}%</span>
                </div>
                <input
                  id="bpr-percent"
                  type="range"
                  min={10}
                  max={200}
                  step={1}
                  value={settings.percent}
                  onChange={(e) => update({ percent: Number(e.target.value) })}
                  className="mt-2 h-2 w-full cursor-pointer accent-tp-bronze"
                />
              </div>
            )}

            {settings.mode === 'width' && (
              <div className="mt-5">
                <label htmlFor="bpr-maxw" className="text-sm font-medium text-tp-ink">
                  Max width (px)
                </label>
                <input
                  id="bpr-maxw"
                  type="number"
                  min={1}
                  max={MAX_OUTPUT_DIM}
                  value={settings.maxWidth}
                  onChange={(e) => update({ maxWidth: clampInt(Number(e.target.value), 1, MAX_OUTPUT_DIM) })}
                  className={inputClass}
                />
                <p className="mt-1 text-xs text-tp-muted">Height follows the original shape. Smaller photos are not enlarged.</p>
              </div>
            )}

            {settings.mode === 'height' && (
              <div className="mt-5">
                <label htmlFor="bpr-maxh" className="text-sm font-medium text-tp-ink">
                  Max height (px)
                </label>
                <input
                  id="bpr-maxh"
                  type="number"
                  min={1}
                  max={MAX_OUTPUT_DIM}
                  value={settings.maxHeight}
                  onChange={(e) => update({ maxHeight: clampInt(Number(e.target.value), 1, MAX_OUTPUT_DIM) })}
                  className={inputClass}
                />
                <p className="mt-1 text-xs text-tp-muted">Width follows the original shape. Smaller photos are not enlarged.</p>
              </div>
            )}

            {settings.mode === 'exact' && (
              <div className="mt-5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="bpr-exw" className="text-sm font-medium text-tp-ink">
                      Width (px)
                    </label>
                    <input
                      id="bpr-exw"
                      type="number"
                      min={1}
                      max={MAX_OUTPUT_DIM}
                      value={settings.exactW}
                      onChange={(e) => {
                        update({ exactW: clampInt(Number(e.target.value), 1, MAX_OUTPUT_DIM) });
                        setPreset('custom');
                      }}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="bpr-exh" className="text-sm font-medium text-tp-ink">
                      Height (px)
                    </label>
                    <input
                      id="bpr-exh"
                      type="number"
                      min={1}
                      max={MAX_OUTPUT_DIM}
                      value={settings.exactH}
                      onChange={(e) => {
                        update({ exactH: clampInt(Number(e.target.value), 1, MAX_OUTPUT_DIM) });
                        setPreset('custom');
                      }}
                      className={inputClass}
                    />
                  </div>
                </div>

                <fieldset className="mt-4">
                  <legend className="text-sm font-medium text-tp-ink">Fit mode</legend>
                  <div className="mt-2 grid gap-2">
                    {FIT_OPTIONS.map((f) => (
                      <label
                        key={f.id}
                        className={cn(
                          'flex cursor-pointer items-center gap-3 rounded-tp-button border px-3 py-2 text-sm transition-colors',
                          settings.fit === f.id ? 'border-tp-bronze bg-tp-beige/30' : 'border-tp-line hover:border-tp-bronze'
                        )}
                      >
                        <input
                          type="radio"
                          name="bpr-fit"
                          value={f.id}
                          checked={settings.fit === f.id}
                          onChange={() => update({ fit: f.id })}
                          className="accent-tp-bronze"
                        />
                        <span className="font-medium text-tp-ink">{f.label}</span>
                        <span className="text-xs text-tp-muted">{f.hint}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            <div className="mt-6 grid gap-3">
              <button
                type="button"
                onClick={downloadAll}
                disabled={busy}
                className={cn(buttonVariants({ variant: 'primary' }), 'w-full')}
              >
                <Package className="h-4 w-4" aria-hidden="true" />
                {busy ? 'Building ZIP…' : `Download All (${items.length}) as ZIP`}
              </button>
              <button type="button" onClick={clearAll} disabled={busy} className={cn(buttonVariants({ variant: 'secondary' }), 'w-full')}>
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Clear all
              </button>
            </div>

            {progress && (
              <div className="mt-4" role="status" aria-live="polite">
                <div className="flex items-center justify-between text-xs text-tp-muted">
                  <span>Resizing photos</span>
                  <span className="tabular-nums">
                    {progress.done} / {progress.total}
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-tp-line">
                  <div
                    className="h-full rounded-full bg-tp-bronze transition-all"
                    style={{ width: `${(progress.done / progress.total) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <p className="mt-5 flex items-start gap-2 text-xs text-tp-muted">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
              Your photos are processed on your device and are never uploaded.
            </p>
          </div>

          <div className="min-w-0">
            <ul className="grid gap-3">
              {items.map((item) => {
                const out = computeOutput(item, settings);
                return (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-center gap-3 rounded-tp-card border border-tp-line bg-white p-3 sm:flex-nowrap"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.url} alt="" width={64} height={64} loading="lazy" className="h-16 w-16 shrink-0 rounded-tp-button bg-tp-black object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-tp-ink">{item.name}</p>
                      <p className="mt-0.5 text-xs tabular-nums text-tp-muted">
                        {item.origW} x {item.origH} px
                        <span aria-hidden="true"> → </span>
                        <span className="sr-only"> resized to </span>
                        <span className="font-medium text-tp-bronze-ink">
                          {out.w} x {out.h} px
                        </span>
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => downloadOne(item)}
                        disabled={busy || busyId === item.id}
                        className={cn(buttonVariants({ variant: 'outline' }), 'px-3')}
                        aria-label={`Download ${item.name} as PNG`}
                      >
                        <Download className="h-4 w-4" aria-hidden="true" />
                        PNG
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        disabled={busy}
                        className="flex h-10 w-10 items-center justify-center rounded-tp-button text-tp-muted transition-colors hover:bg-tp-beige/40 hover:text-tp-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
                        aria-label={`Remove ${item.name}`}
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            {items.length < MAX_FILES && <div className="mt-4">{dropZone(true)}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
