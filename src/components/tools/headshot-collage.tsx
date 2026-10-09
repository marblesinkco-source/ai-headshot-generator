'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeftRight, Download, LayoutGrid, Trash2, Upload, X } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

const MAX_PHOTOS = 6;
const MIN_PHOTOS = 2;
const MAX_BYTES = 15 * 1024 * 1024;
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];

// Output cell size in pixels (4:5 portrait, suited to headshots).
const CELL_W = 600;
const CELL_H = 750;
const LABEL_H = 72;
const LABEL_FONT = 34;

interface Layout {
  id: string;
  label: string;
  rows: number[]; // photos per row
}

const LAYOUTS: Record<number, Layout[]> = {
  2: [
    { id: 'row2', label: 'Side by side (1x2)', rows: [2] },
    { id: 'stack2', label: 'Stacked (2x1)', rows: [1, 1] },
  ],
  3: [
    { id: 'row3', label: 'Row (1x3)', rows: [3] },
    { id: 'two-one', label: '2 + 1', rows: [2, 1] },
  ],
  4: [{ id: 'grid4', label: 'Grid (2x2)', rows: [2, 2] }],
  5: [{ id: 'three-two', label: '3 + 2', rows: [3, 2] }],
  6: [
    { id: 'grid2x3', label: '2 columns x 3 rows', rows: [2, 2, 2] },
    { id: 'grid3x2', label: '3 columns x 2 rows', rows: [3, 3] },
  ],
};

const GAPS = [0, 4, 8, 16] as const;
type Background = 'white' | 'black' | 'transparent';
const BACKGROUNDS: { id: Background; label: string }[] = [
  { id: 'white', label: 'White' },
  { id: 'black', label: 'Black' },
  { id: 'transparent', label: 'Transparent' },
];

interface Photo {
  id: string;
  name: string;
  url: string;
  img: HTMLImageElement;
}

interface UseCase {
  id: string;
  title: string;
  hint: string;
  layoutId: string;
  labels?: string[];
}

const USE_CASES: UseCase[] = [
  { id: 'compare', title: 'Compare headshots', hint: 'Two options side by side', layoutId: 'row2' },
  { id: 'team', title: 'Team page', hint: 'A tidy 2x2 grid with names', layoutId: 'grid4' },
  { id: 'ba', title: 'Before & After', hint: 'Original next to the result', layoutId: 'row2', labels: ['Before', 'After'] },
];

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('decode'));
    img.src = url;
  });
}

function getLayout(count: number, layoutId: string): Layout | null {
  const options = LAYOUTS[count];
  if (!options) return null;
  return options.find((l) => l.id === layoutId) ?? options[0];
}

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number) {
  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const sw = w / scale;
  const sh = h / scale;
  const sx = (img.naturalWidth - sw) / 2;
  const sy = (img.naturalHeight - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

function renderCollage(
  canvas: HTMLCanvasElement,
  photos: Photo[],
  layout: Layout,
  gap: number,
  background: Background,
  labels: string[],
  showLabels: boolean,
) {
  const cols = Math.max(...layout.rows);
  const rowH = CELL_H + (showLabels ? LABEL_H : 0);
  const innerW = cols * CELL_W + (cols - 1) * gap;
  const innerH = layout.rows.length * rowH + (layout.rows.length - 1) * gap;
  const width = innerW + gap * 2;
  const height = innerH + gap * 2;

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);
  if (background !== 'transparent') {
    ctx.fillStyle = background === 'white' ? '#ffffff' : '#000000';
    ctx.fillRect(0, 0, width, height);
  }
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const textColor = background === 'black' ? '#ffffff' : '#1a1a1a';
  let index = 0;
  layout.rows.forEach((n, r) => {
    const cellW = (innerW - (n - 1) * gap) / n;
    const y = gap + r * (rowH + gap);
    for (let c = 0; c < n; c++) {
      const photo = photos[index];
      const x = gap + c * (cellW + gap);
      if (photo) drawCover(ctx, photo.img, x, y, cellW, CELL_H);
      if (showLabels) {
        const text = (labels[index] ?? '').trim();
        if (text) {
          ctx.fillStyle = textColor;
          ctx.font = `500 ${LABEL_FONT}px Manrope, system-ui, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(text, x + cellW / 2, y + CELL_H + LABEL_H / 2, cellW - 24);
        }
      }
      index++;
    }
  });
}

export default function HeadshotCollage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [layoutId, setLayoutId] = useState('row2');
  const [gap, setGap] = useState<number>(8);
  const [background, setBackground] = useState<Background>('white');
  const [showLabels, setShowLabels] = useState(false);
  const [activeUseCase, setActiveUseCase] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const urlsRef = useRef<string[]>([]);
  const photosRef = useRef<Photo[]>([]);
  photosRef.current = photos;

  useEffect(() => {
    return () => {
      urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
      urlsRef.current = [];
    };
  }, []);

  const layout = useMemo(() => getLayout(photos.length, layoutId), [photos.length, layoutId]);
  const layoutOptions = LAYOUTS[photos.length] ?? [];
  const ready = photos.length >= MIN_PHOTOS && layout !== null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !ready || !layout) return;
    renderCollage(canvas, photos, layout, gap, background, labels, showLabels);
  }, [photos, layout, gap, background, labels, showLabels, ready]);

  const addFiles = useCallback(async (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    if (files.length === 0) return;
    setError(null);
    const room = MAX_PHOTOS - photosRef.current.length;
    const problems: string[] = [];
    const accepted: File[] = [];
    for (const f of files) {
      if (!ACCEPTED.includes(f.type)) {
        problems.push(`${f.name}: use a JPG, PNG or WebP file.`);
      } else if (f.size > MAX_BYTES) {
        problems.push(`${f.name}: larger than 15MB.`);
      } else if (accepted.length >= room) {
        if (!problems.some((p) => p.startsWith('Maximum'))) problems.push(`Maximum of ${MAX_PHOTOS} photos. Extra files were skipped.`);
      } else {
        accepted.push(f);
      }
    }
    const added: Photo[] = [];
    for (const f of accepted) {
      const url = URL.createObjectURL(f);
      try {
        const img = await loadImage(url);
        urlsRef.current.push(url);
        added.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, name: f.name, url, img });
      } catch {
        URL.revokeObjectURL(url);
        problems.push(`${f.name}: could not be read as an image.`);
      }
    }
    if (added.length) {
      setPhotos((prev) => [...prev, ...added].slice(0, MAX_PHOTOS));
      setLabels((prev) => [...prev, ...added.map(() => '')].slice(0, MAX_PHOTOS));
    }
    if (problems.length) setError(problems.join(' '));
  }, []);

  const removePhoto = (i: number) => {
    const target = photos[i];
    if (target) {
      URL.revokeObjectURL(target.url);
      urlsRef.current = urlsRef.current.filter((u) => u !== target.url);
    }
    setPhotos((prev) => prev.filter((_, idx) => idx !== i));
    setLabels((prev) => prev.filter((_, idx) => idx !== i));
    setError(null);
  };

  const swapWithNext = (i: number) => {
    if (i >= photos.length - 1) return;
    const swap = <T,>(arr: T[]) => {
      const copy = [...arr];
      [copy[i], copy[i + 1]] = [copy[i + 1], copy[i]];
      return copy;
    };
    setPhotos(swap);
    setLabels(swap);
  };

  const setLabel = (i: number, value: string) => {
    setLabels((prev) => {
      const copy = [...prev];
      while (copy.length <= i) copy.push('');
      copy[i] = value.slice(0, 40);
      return copy;
    });
  };

  const applyUseCase = (uc: UseCase) => {
    setActiveUseCase(uc.id);
    setLayoutId(uc.layoutId);
    if (uc.labels) {
      setShowLabels(true);
      setLabels((prev) => photos.map((_, i) => uc.labels?.[i] ?? prev[i] ?? ''));
    } else if (uc.id === 'team') {
      setShowLabels(true);
    }
  };

  const clearAll = () => {
    urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    urlsRef.current = [];
    setPhotos([]);
    setLabels([]);
    setError(null);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas || !ready) return;
    canvas.toBlob((blob) => {
      if (!blob) {
        setError('Could not create the image. Try fewer or smaller photos.');
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'headshot-collage.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    void addFiles(e.dataTransfer.files);
  };

  const canAdd = photos.length < MAX_PHOTOS;

  return (
    <div className="mx-auto w-full max-w-5xl text-tp-ink">
      {/* Use cases */}
      <div className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">Start from a use case</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {USE_CASES.map((uc) => (
            <button
              key={uc.id}
              type="button"
              onClick={() => applyUseCase(uc)}
              aria-pressed={activeUseCase === uc.id}
              className={cn(
                'rounded-tp-card border bg-white p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
                activeUseCase === uc.id ? 'border-tp-bronze' : 'border-tp-line hover:border-tp-bronze',
              )}
            >
              <span className="block text-sm font-semibold text-tp-ink">{uc.title}</span>
              <span className="mt-1 block text-xs text-tp-muted">{uc.hint}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Upload */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (canAdd) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={canAdd ? onDrop : (e) => e.preventDefault()}
        className={cn(
          'rounded-tp-card border-2 border-dashed bg-white p-6 text-center transition-colors',
          dragging ? 'border-tp-bronze bg-tp-paper' : 'border-tp-beige',
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="sr-only"
          aria-label="Upload photos"
          onChange={(e) => {
            if (e.target.files) void addFiles(e.target.files);
            e.target.value = '';
          }}
        />
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-tp-beige/40 text-tp-bronze-ink">
          <Upload className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="mt-3 text-base font-semibold text-tp-ink">
          {canAdd ? 'Drag & drop 2 to 6 photos here' : 'Maximum of 6 photos reached'}
        </p>
        <p className="mt-1 text-sm text-tp-muted">JPG, PNG or WebP, up to 15MB each. Photos stay in your browser.</p>
        <button
          type="button"
          disabled={!canAdd}
          onClick={() => inputRef.current?.click()}
          className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'mt-4')}
        >
          <Upload className="h-4 w-4" aria-hidden="true" />
          Choose photos
        </button>
        <p className="mt-3 text-xs text-tp-muted" aria-live="polite">
          {photos.length} of {MAX_PHOTOS} photos added
        </p>
      </div>

      {error && (
        <p role="alert" className="mt-3 rounded-tp-button border border-tp-line bg-white px-4 py-3 text-sm text-tp-ink">
          {error}
        </p>
      )}

      {/* Photo list */}
      {photos.length > 0 && (
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display font-normal text-2xl text-tp-ink">Your photos</h2>
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1.5 text-sm text-tp-bronze-ink underline-offset-2 hover:underline"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Clear all
            </button>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {photos.map((p, i) => (
              <li key={p.id} className="rounded-tp-card border border-tp-line bg-white p-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-tp-button bg-tp-paper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt={`Photo ${i + 1}: ${p.name}`} width={400} height={500} loading="lazy" className="h-full w-full object-cover" />
                  <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-tp-black text-xs font-semibold text-tp-bronze">
                    {i + 1}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => swapWithNext(i)}
                    disabled={i === photos.length - 1}
                    aria-label={`Swap photo ${i + 1} with photo ${i + 2}`}
                    title="Swap with next"
                    className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'px-2.5')}
                  >
                    <ArrowLeftRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    aria-label={`Remove photo ${i + 1}`}
                    title="Remove"
                    className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'px-2.5')}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                  {showLabels && (
                    <input
                      type="text"
                      value={labels[i] ?? ''}
                      onChange={(e) => setLabel(i, e.target.value)}
                      placeholder="Label"
                      aria-label={`Label for photo ${i + 1}`}
                      className="h-9 min-w-0 flex-1 rounded-tp-button border border-tp-line bg-white px-2 text-sm text-tp-ink placeholder:text-tp-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Controls + preview */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
        <div className="space-y-5 rounded-tp-card border border-tp-line bg-white p-5">
          <h2 className="flex items-center gap-2 font-display font-normal text-2xl text-tp-ink">
            <LayoutGrid className="h-5 w-5 text-tp-bronze-ink" aria-hidden="true" />
            Layout
          </h2>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-tp-ink">Arrangement</legend>
            {layoutOptions.length === 0 ? (
              <p className="text-sm text-tp-muted">Add at least 2 photos to choose a layout.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {layoutOptions.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    aria-pressed={layout?.id === l.id}
                    onClick={() => {
                      setLayoutId(l.id);
                      setActiveUseCase(null);
                    }}
                    className={cn(
                      'rounded-tp-button border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
                      layout?.id === l.id ? 'border-tp-black bg-tp-black text-tp-bronze' : 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze',
                    )}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-tp-ink">Spacing</legend>
            <div className="flex flex-wrap gap-2">
              {GAPS.map((g) => (
                <button
                  key={g}
                  type="button"
                  aria-pressed={gap === g}
                  onClick={() => setGap(g)}
                  className={cn(
                    'rounded-tp-button border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
                    gap === g ? 'border-tp-black bg-tp-black text-tp-bronze' : 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze',
                  )}
                >
                  {g}px
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-tp-ink">Background</legend>
            <div className="flex flex-wrap gap-2">
              {BACKGROUNDS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  aria-pressed={background === b.id}
                  onClick={() => setBackground(b.id)}
                  className={cn(
                    'rounded-tp-button border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
                    background === b.id ? 'border-tp-black bg-tp-black text-tp-bronze' : 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze',
                  )}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="flex cursor-pointer items-center gap-3 text-sm text-tp-ink">
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
              className="h-4 w-4 rounded border-tp-line accent-tp-black"
            />
            Add labels under photos
          </label>
        </div>

        <div className="min-w-0">
          <div
            className="flex min-h-[260px] items-center justify-center overflow-hidden rounded-tp-card border border-tp-line p-3"
            style={
              background === 'transparent'
                ? {
                    backgroundColor: '#ffffff',
                    backgroundImage:
                      'linear-gradient(45deg, #e8e4dc 25%, transparent 25%, transparent 75%, #e8e4dc 75%), linear-gradient(45deg, #e8e4dc 25%, transparent 25%, transparent 75%, #e8e4dc 75%)',
                    backgroundSize: '16px 16px',
                    backgroundPosition: '0 0, 8px 8px',
                  }
                : { backgroundColor: 'var(--tp-paper, #f7f4ee)' }
            }
          >
            {ready ? (
              <canvas
                ref={canvasRef}
                role="img"
                aria-label="Collage preview"
                className="h-auto max-h-[70vh] w-auto max-w-full"
              />
            ) : (
              <p className="px-4 text-center text-sm text-tp-muted">
                {photos.length === 0 ? 'Your collage preview appears here.' : 'Add at least one more photo to build a collage.'}
              </p>
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button type="button" onClick={download} disabled={!ready} className={buttonVariants({ variant: 'primary', size: 'lg' })}>
              <Download className="h-5 w-5" aria-hidden="true" />
              Download PNG
            </button>
            <p className="text-xs text-tp-muted">Full-resolution PNG, created on your device. Nothing is uploaded.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 rounded-tp-card bg-tp-black p-6 text-center">
        <p className="font-display text-2xl font-normal text-tp-paper">Need better photos to combine?</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-tp-beige">Create AI headshots from your selfies, then compare them here.</p>
        <Link href={ctaHref} className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'mt-4 bg-tp-bronze text-tp-black hover:bg-tp-beige')}>
          Try TailorPic
        </Link>
      </div>
    </div>
  );
}
