'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Download, RefreshCw, ShieldCheck, SlidersHorizontal, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

const MAX_BYTES = 15 * 1024 * 1024;
const MAIN_MAX = 1600;
const THUMB = 80;

type FilterId =
  | 'original'
  | 'grayscale'
  | 'sepia'
  | 'vintage'
  | 'warm'
  | 'cool'
  | 'contrast'
  | 'soft'
  | 'dramatic'
  | 'vivid'
  | 'matte'
  | 'bwfilm';

const clamp = (v: number) => (v < 0 ? 0 : v > 255 ? 255 : v);

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

function saturate(d: Uint8ClampedArray, amount: number) {
  for (let i = 0; i < d.length; i += 4) {
    const gray = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    d[i] = clamp(gray + (d[i] - gray) * amount);
    d[i + 1] = clamp(gray + (d[i + 1] - gray) * amount);
    d[i + 2] = clamp(gray + (d[i + 2] - gray) * amount);
  }
}

function contrast(d: Uint8ClampedArray, amount: number) {
  for (let i = 0; i < d.length; i += 4) {
    d[i] = clamp((d[i] - 128) * amount + 128);
    d[i + 1] = clamp((d[i + 1] - 128) * amount + 128);
    d[i + 2] = clamp((d[i + 2] - 128) * amount + 128);
  }
}

function brightness(d: Uint8ClampedArray, add: number) {
  for (let i = 0; i < d.length; i += 4) {
    d[i] = clamp(d[i] + add);
    d[i + 1] = clamp(d[i + 1] + add);
    d[i + 2] = clamp(d[i + 2] + add);
  }
}

function boxBlur(d: Uint8ClampedArray, w: number, h: number, radius: number) {
  if (radius < 1) return;
  const tmp = new Float32Array(d.length);
  const size = radius * 2 + 1;
  // horizontal
  for (let y = 0; y < h; y++) {
    for (let c = 0; c < 3; c++) {
      let sum = 0;
      for (let k = -radius; k <= radius; k++) {
        const x = Math.min(w - 1, Math.max(0, k));
        sum += d[(y * w + x) * 4 + c];
      }
      for (let x = 0; x < w; x++) {
        tmp[(y * w + x) * 4 + c] = sum / size;
        const add = Math.min(w - 1, x + radius + 1);
        const rem = Math.max(0, x - radius);
        sum += d[(y * w + add) * 4 + c] - d[(y * w + rem) * 4 + c];
      }
    }
  }
  // vertical
  for (let x = 0; x < w; x++) {
    for (let c = 0; c < 3; c++) {
      let sum = 0;
      for (let k = -radius; k <= radius; k++) {
        const y = Math.min(h - 1, Math.max(0, k));
        sum += tmp[(y * w + x) * 4 + c];
      }
      for (let y = 0; y < h; y++) {
        d[(y * w + x) * 4 + c] = sum / size;
        const add = Math.min(h - 1, y + radius + 1);
        const rem = Math.max(0, y - radius);
        sum += tmp[(add * w + x) * 4 + c] - tmp[(rem * w + x) * 4 + c];
      }
    }
  }
}

interface FilterDef {
  id: FilterId;
  label: string;
  apply: (d: Uint8ClampedArray, w: number, h: number) => void;
}

const FILTERS: FilterDef[] = [
  { id: 'original', label: 'Original', apply: () => {} },
  {
    id: 'grayscale',
    label: 'Grayscale',
    apply: (d) => {
      for (let i = 0; i < d.length; i += 4) {
        const g = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
        d[i] = d[i + 1] = d[i + 2] = g;
      }
    },
  },
  {
    id: 'sepia',
    label: 'Sepia',
    apply: (d) => {
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];
        d[i] = clamp(0.393 * r + 0.769 * g + 0.189 * b);
        d[i + 1] = clamp(0.349 * r + 0.686 * g + 0.168 * b);
        d[i + 2] = clamp(0.272 * r + 0.534 * g + 0.131 * b);
      }
    },
  },
  {
    id: 'vintage',
    label: 'Vintage',
    apply: (d) => {
      saturate(d, 0.75);
      contrast(d, 0.88);
      for (let i = 0; i < d.length; i += 4) {
        d[i] = clamp(d[i] * 1.06 + 12);
        d[i + 1] = clamp(d[i + 1] * 1.0 + 8);
        d[i + 2] = clamp(d[i + 2] * 0.88 + 10);
      }
    },
  },
  {
    id: 'warm',
    label: 'Warm',
    apply: (d) => {
      for (let i = 0; i < d.length; i += 4) {
        d[i] = clamp(d[i] * 1.12 + 6);
        d[i + 1] = clamp(d[i + 1] * 1.04 + 2);
        d[i + 2] = clamp(d[i + 2] * 0.9);
      }
    },
  },
  {
    id: 'cool',
    label: 'Cool',
    apply: (d) => {
      for (let i = 0; i < d.length; i += 4) {
        d[i] = clamp(d[i] * 0.9);
        d[i + 1] = clamp(d[i + 1] * 1.0 + 2);
        d[i + 2] = clamp(d[i + 2] * 1.14 + 6);
      }
    },
  },
  { id: 'contrast', label: 'High Contrast', apply: (d) => contrast(d, 1.5) },
  {
    id: 'soft',
    label: 'Soft',
    apply: (d, w, h) => {
      boxBlur(d, w, h, Math.max(1, Math.round(Math.max(w, h) / 400)));
      brightness(d, 14);
    },
  },
  {
    id: 'dramatic',
    label: 'Dramatic',
    apply: (d) => {
      contrast(d, 1.45);
      saturate(d, 0.7);
      brightness(d, -8);
    },
  },
  { id: 'vivid', label: 'Vivid', apply: (d) => saturate(d, 1.6) },
  {
    id: 'matte',
    label: 'Matte',
    apply: (d) => {
      contrast(d, 0.85);
      for (let i = 0; i < d.length; i += 4) {
        // lift the blacks and gently pull down the whites
        d[i] = clamp(d[i] * 0.9 + 28);
        d[i + 1] = clamp(d[i + 1] * 0.9 + 28);
        d[i + 2] = clamp(d[i + 2] * 0.9 + 28);
      }
    },
  },
  {
    id: 'bwfilm',
    label: 'B&W Film',
    apply: (d) => {
      const rand = mulberry32(1337);
      for (let i = 0; i < d.length; i += 4) {
        const g = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
        const noise = (rand() - 0.5) * 48;
        const v = clamp((g - 128) * 1.1 + 128 + noise);
        d[i] = d[i + 1] = d[i + 2] = v;
      }
    },
  },
];

function filteredCopy(source: ImageData, def: FilterDef): Uint8ClampedArray {
  const out = new Uint8ClampedArray(source.data);
  def.apply(out, source.width, source.height);
  return out;
}

function drawCover(img: HTMLImageElement, size: number): ImageData | null {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  const side = Math.min(img.naturalWidth, img.naturalHeight);
  const sx = (img.naturalWidth - side) / 2;
  const sy = (img.naturalHeight - side) / 2;
  ctx.drawImage(img, sx, sy, side, side, 0, 0, size, size);
  return ctx.getImageData(0, 0, size, size);
}

const secondaryBtn =
  'inline-flex items-center gap-2 rounded-tp-button border border-tp-line bg-white px-5 py-3 text-sm font-semibold text-tp-ink transition-colors hover:border-tp-bronze focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze disabled:cursor-not-allowed disabled:opacity-50';
const primaryBtn =
  'inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-5 py-3 text-sm font-semibold text-tp-black transition-colors hover:bg-tp-bronze/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-ink disabled:cursor-not-allowed disabled:opacity-50';

export default function PhotoFilters() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalRef = useRef<ImageData | null>(null);
  const filteredRef = useRef<{ id: FilterId; data: Uint8ClampedArray } | null>(null);

  const [loaded, setLoaded] = useState(false);
  const [thumbs, setThumbs] = useState<Record<string, string>>({});
  const [filterId, setFilterId] = useState<FilterId>('original');
  const [intensity, setIntensity] = useState(100);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState('photo');

  const loadFile = useCallback((file: File | undefined | null) => {
    if (!file) return;
    if (!/^image\/(jpeg|png)$/.test(file.type)) {
      setError('Please choose a JPEG or PNG image.');
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
        const scale = Math.min(1, MAIN_MAX / Math.max(img.naturalWidth, img.naturalHeight));
        const w = Math.max(1, Math.round(img.naturalWidth * scale));
        const h = Math.max(1, Math.round(img.naturalHeight * scale));
        const work = document.createElement('canvas');
        work.width = w;
        work.height = h;
        const wctx = work.getContext('2d', { willReadFrequently: true });
        if (!wctx) throw new Error('no canvas');
        wctx.drawImage(img, 0, 0, w, h);
        const original = wctx.getImageData(0, 0, w, h);

        const thumbBase = drawCover(img, THUMB);
        if (!thumbBase) throw new Error('no canvas');
        const tcanvas = document.createElement('canvas');
        tcanvas.width = THUMB;
        tcanvas.height = THUMB;
        const tctx = tcanvas.getContext('2d');
        if (!tctx) throw new Error('no canvas');
        const urls: Record<string, string> = {};
        for (const def of FILTERS) {
          const out = new ImageData(filteredCopy(thumbBase, def), THUMB, THUMB);
          tctx.putImageData(out, 0, 0);
          urls[def.id] = tcanvas.toDataURL('image/png');
        }

        originalRef.current = original;
        filteredRef.current = null;
        setThumbs(urls);
        setFileName(file.name.replace(/\.[^.]+$/, '') || 'photo');
        setFilterId('original');
        setIntensity(100);
        setLoaded(true);
      } catch {
        setError('We could not process that image. Try a different file.');
      } finally {
        URL.revokeObjectURL(url);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setError('We could not read that image. Try a different file.');
    };
    img.src = url;
  }, []);

  // Render the main canvas only for the selected filter
  useEffect(() => {
    const canvas = canvasRef.current;
    const original = originalRef.current;
    if (!loaded || !canvas || !original) return;
    const def = FILTERS.find((f) => f.id === filterId) ?? FILTERS[0];
    if (!filteredRef.current || filteredRef.current.id !== def.id) {
      filteredRef.current = { id: def.id, data: filteredCopy(original, def) };
    }
    const filtered = filteredRef.current.data;
    const t = intensity / 100;
    const out = new Uint8ClampedArray(original.data.length);
    for (let i = 0; i < out.length; i += 4) {
      out[i] = original.data[i] + (filtered[i] - original.data[i]) * t;
      out[i + 1] = original.data[i + 1] + (filtered[i + 1] - original.data[i + 1]) * t;
      out[i + 2] = original.data[i + 2] + (filtered[i + 2] - original.data[i + 2]) * t;
      out[i + 3] = original.data[i + 3];
    }
    canvas.width = original.width;
    canvas.height = original.height;
    canvas.getContext('2d')?.putImageData(new ImageData(out, original.width, original.height), 0, 0);
  }, [loaded, filterId, intensity]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    loadFile(e.dataTransfer.files?.[0]);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas || !loaded) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}-${filterId}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  };

  const handleReset = () => {
    setFilterId('original');
    setIntensity(100);
  };

  const handleClear = () => {
    originalRef.current = null;
    filteredRef.current = null;
    setLoaded(false);
    setThumbs({});
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      {!loaded ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-tp-card border-2 border-dashed px-4 py-16 text-center transition-colors',
            dragging ? 'border-tp-ink bg-tp-beige' : 'border-tp-bronze bg-tp-paper hover:bg-tp-beige/60'
          )}
        >
          <Upload className="h-8 w-8 text-tp-bronze-ink" aria-hidden="true" />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="rounded-tp-button text-base font-semibold text-tp-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
          >
            Drop your photo here or click to browse
          </button>
          <p className="text-xs text-tp-muted">JPEG, PNG • Runs in your browser</p>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-center rounded-tp-card border border-tp-line bg-tp-paper p-4">
            <canvas
              ref={canvasRef}
              role="img"
              aria-label="Your photo with the selected filter applied"
              className="block max-h-[480px] w-auto max-w-full rounded-tp-button"
            />
          </div>

          <h3 className="mt-6 font-display text-xl font-normal text-tp-ink">Choose a filter</h3>
          <ul className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {FILTERS.map((f) => (
              <li key={f.id}>
                <button
                  type="button"
                  onClick={() => setFilterId(f.id)}
                  aria-pressed={filterId === f.id}
                  className={cn(
                    'flex w-full flex-col items-center gap-2 rounded-tp-button border bg-white p-2 text-xs font-semibold text-tp-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
                    filterId === f.id ? 'border-tp-bronze ring-2 ring-tp-bronze' : 'border-tp-line hover:border-tp-bronze'
                  )}
                >
                  {thumbs[f.id] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumbs[f.id]}
                      alt=""
                      width={THUMB}
                      height={THUMB}
                      className="aspect-square w-full rounded-tp-button object-cover"
                    />
                  )}
                  {f.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-tp-card border border-tp-line bg-white p-4">
            <label htmlFor="filter-intensity" className="flex items-center justify-between text-sm font-semibold text-tp-ink">
              <span className="inline-flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-tp-bronze-ink" aria-hidden="true" />
                Intensity
              </span>
              <span>{intensity}%</span>
            </label>
            <input
              id="filter-intensity"
              type="range"
              min={0}
              max={100}
              step={1}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="mt-3 w-full accent-tp-bronze"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={handleDownload} className={primaryBtn}>
              <Download className="h-4 w-4" aria-hidden="true" />
              Download PNG
            </button>
            <button type="button" onClick={handleReset} className={secondaryBtn}>
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Reset
            </button>
            <button type="button" onClick={handleClear} className={secondaryBtn}>
              <Upload className="h-4 w-4" aria-hidden="true" />
              Choose a different photo
            </button>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="sr-only"
        aria-label="Upload a photo to apply filters to"
        onChange={(e) => loadFile(e.target.files?.[0])}
      />
      {error && (
        <p role="alert" className="mt-3 text-sm font-semibold text-tp-ink">
          {error}
        </p>
      )}

      <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-tp-muted">
        <ShieldCheck className="h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
        Everything runs in your browser. Nothing is uploaded.
      </p>
    </div>
  );
}
