'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Upload,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Camera,
  ArrowRight,
  Image as ImageIcon,
} from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Status = 'pass' | 'warning' | 'fail';

interface Criterion {
  id: string;
  label: string;
  value: string;
  status: Status;
  tip: string;
}

interface Analysis {
  criteria: Criterion[];
  score: number;
}

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MIN_SIDE = 400;
const ANALYSIS_SIZE = 256;
const GRID = 16;
const POINTS: Record<Status, number> = { pass: 20, warning: 10, fail: 0 };
const CTA_HREF = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function analyzePixels(img: HTMLImageElement, file: File): Analysis {
  const width = img.naturalWidth;
  const height = img.naturalHeight;

  // Resolution
  const minSide = Math.min(width, height);
  const resolution: Criterion = {
    id: 'resolution',
    label: 'Resolution',
    value: `${width} x ${height} px`,
    status: minSide >= MIN_SIDE ? 'pass' : minSide >= 300 ? 'warning' : 'fail',
    tip:
      minSide >= MIN_SIDE
        ? 'Meets the 400 x 400 px minimum recommended for LinkedIn.'
        : 'LinkedIn recommends at least 400 x 400 px. Use a larger original so it stays sharp.',
  };

  // Aspect ratio
  const ratio = width / height;
  const off = Math.abs(ratio - 1);
  const aspect: Criterion = {
    id: 'aspect',
    label: 'Aspect ratio',
    value: `${ratio.toFixed(2)} : 1`,
    status: off <= 0.1 ? 'pass' : off <= 0.3 ? 'warning' : 'fail',
    tip:
      off <= 0.1
        ? 'Close to square, which suits the circular profile crop.'
        : 'Profile photos display as a square or circle. Crop to roughly 1:1 so you control the framing.',
  };

  // Draw downscaled copy for pixel analysis
  const scale = Math.min(1, ANALYSIS_SIZE / Math.max(width, height));
  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Canvas not supported');
  ctx.drawImage(img, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);

  // Brightness + per-cell brightness grid
  const cellSum = new Float64Array(GRID * GRID);
  const cellCount = new Uint32Array(GRID * GRID);
  let total = 0;
  for (let y = 0; y < h; y++) {
    const gy = Math.min(GRID - 1, Math.floor((y / h) * GRID));
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      total += lum;
      const gx = Math.min(GRID - 1, Math.floor((x / w) * GRID));
      cellSum[gy * GRID + gx] += lum;
      cellCount[gy * GRID + gx] += 1;
    }
  }
  const avg = total / (w * h);
  const brightnessStatus: Status =
    avg >= 90 && avg <= 180 ? 'pass' : avg >= 60 && avg <= 210 ? 'warning' : 'fail';
  const brightness: Criterion = {
    id: 'brightness',
    label: 'Brightness',
    value: `${Math.round((avg / 255) * 100)}% average`,
    status: brightnessStatus,
    tip:
      brightnessStatus === 'pass'
        ? 'Balanced exposure. Your face should be easy to see.'
        : avg < 90
          ? 'The photo looks dark. Face a window or soft light source and retake it.'
          : 'The photo looks very bright. Avoid direct sun or harsh flash that washes out detail.',
  };

  // Centering: centroid of the brightest ~10% of grid cells
  const cells = Array.from({ length: GRID * GRID }, (_, i) => ({
    i,
    v: cellCount[i] ? cellSum[i] / cellCount[i] : 0,
  })).sort((a, b) => b.v - a.v);
  const top = cells.slice(0, Math.max(1, Math.round(GRID * GRID * 0.1)));
  const cx = top.reduce((s, c) => s + ((c.i % GRID) + 0.5), 0) / top.length / GRID;
  const cy = top.reduce((s, c) => s + (Math.floor(c.i / GRID) + 0.5), 0) / top.length / GRID;
  const dist = Math.hypot(cx - 0.5, cy - 0.5);
  const centering: Criterion = {
    id: 'centering',
    label: 'Subject centering',
    value: dist <= 0.2 ? 'Roughly centered' : dist <= 0.32 ? 'Slightly off-center' : 'Off-center',
    status: dist <= 0.2 ? 'pass' : dist <= 0.32 ? 'warning' : 'fail',
    tip:
      dist <= 0.2
        ? 'The brightest area sits near the middle of the frame.'
        : 'The brightest area is away from the center. This is only a rough hint, so check that your face sits in the middle of the frame.',
  };

  // File size
  const size: Criterion = {
    id: 'size',
    label: 'File size',
    value: formatBytes(file.size),
    status: file.size <= MAX_FILE_BYTES ? 'pass' : 'fail',
    tip:
      file.size <= MAX_FILE_BYTES
        ? 'Under the 8 MB LinkedIn upload limit.'
        : 'LinkedIn accepts profile photos up to 8 MB. Export at a lower quality or size.',
  };

  const criteria = [resolution, aspect, brightness, centering, size];
  const score = criteria.reduce((s, c) => s + POINTS[c.status], 0);
  return { criteria, score };
}

const STATUS_STYLES: Record<Status, { label: string; icon: typeof CheckCircle2; badge: string }> = {
  pass: { label: 'Pass', icon: CheckCircle2, badge: 'text-tp-success' },
  warning: { label: 'Warning', icon: AlertTriangle, badge: 'text-tp-bronze-ink' },
  fail: { label: 'Fail', icon: XCircle, badge: 'text-tp-error' },
};

function scoreSummary(score: number): string {
  if (score >= 90) return 'Strong technical quality';
  if (score >= 60) return 'Decent, with room to improve';
  return 'Needs work';
}

export default function LinkedInPhotoAnalyzer() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFile = useCallback((file: File | undefined | null) => {
    if (!file) return;
    setError(null);
    if (!file.type.startsWith('image/')) {
      setAnalysis(null);
      setPreviewUrl(null);
      setError('Please choose an image file (JPG, PNG or WEBP).');
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      try {
        setAnalysis(analyzePixels(img, file));
        setPreviewUrl(url);
        setFileName(file.name);
      } catch {
        URL.revokeObjectURL(url);
        setAnalysis(null);
        setPreviewUrl(null);
        setError('Sorry, we could not analyze that image in your browser.');
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setAnalysis(null);
      setPreviewUrl(null);
      setError('That image could not be read. Try a JPG, PNG or WEBP file.');
    };
    img.src = url;
  }, []);

  const reset = () => {
    setAnalysis(null);
    setPreviewUrl(null);
    setFileName('');
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      {!analysis && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload your LinkedIn profile photo"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-tp-card border-2 border-dashed bg-white px-6 py-14 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
            dragging ? 'border-tp-bronze bg-tp-paper' : 'border-tp-beige hover:border-tp-bronze hover:bg-tp-paper'
          )}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-tp-beige/40 text-tp-bronze-ink">
            <Upload className="h-7 w-7" aria-hidden="true" />
          </span>
          <span className="text-base font-semibold text-tp-ink">Drag &amp; drop your profile photo here</span>
          <span className="text-sm text-tp-muted">or click to browse. JPG, PNG or WEBP.</span>
          <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-tp-muted">
            <Camera className="h-3.5 w-3.5" aria-hidden="true" />
            Analyzed in your browser. Your photo is never uploaded.
          </span>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {error && (
        <p role="alert" className="mt-4 rounded-tp-button border border-tp-error/30 bg-tp-error/10 px-4 py-3 text-sm text-tp-error">
          {error}
        </p>
      )}

      {analysis && (
        <div className="space-y-6" aria-live="polite">
          <div className="grid gap-6 rounded-tp-card border border-tp-line bg-white p-5 sm:grid-cols-[180px_1fr] sm:p-6">
            <div className="mx-auto w-full max-w-[180px]">
              <div className="aspect-square overflow-hidden rounded-tp-card border border-tp-line bg-tp-paper">
                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previewUrl} alt="Your uploaded profile photo" width={180} height={180} loading="lazy" className="h-full w-full object-cover" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-tp-muted">
                    <ImageIcon className="h-8 w-8" aria-hidden="true" />
                  </span>
                )}
              </div>
              <p className="mt-2 truncate text-center text-xs text-tp-muted" title={fileName}>
                {fileName}
              </p>
            </div>

            <div className="flex flex-col justify-center text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">Overall score</p>
              <p className="mt-1 font-display text-6xl font-normal text-tp-ink">
                {analysis.score}
                <span className="text-2xl text-tp-muted"> / 100</span>
              </p>
              <p className="mt-1 text-sm text-tp-muted">{scoreSummary(analysis.score)}</p>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={reset}
                  className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                >
                  Analyze another photo
                </button>
              </div>
            </div>
          </div>

          <ul className="divide-y divide-tp-line rounded-tp-card border border-tp-line bg-white">
            {analysis.criteria.map((c) => {
              const s = STATUS_STYLES[c.status];
              const Icon = s.icon;
              return (
                <li key={c.id} className="flex items-start gap-4 p-5">
                  <Icon className={cn('mt-0.5 h-6 w-6 shrink-0', s.badge)} aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="font-semibold text-tp-ink">{c.label}</h3>
                      <span className={cn('text-sm font-semibold', s.badge)}>{s.label}</span>
                    </div>
                    <p className="text-sm text-tp-ink">{c.value}</p>
                    <p className="mt-1 text-sm leading-relaxed text-tp-muted">{c.tip}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="text-xs leading-relaxed text-tp-muted">
            This tool checks technical basics only (size, shape, exposure and a rough centering hint). It cannot
            judge expression, attire or background.
          </p>

          <div className="rounded-tp-card bg-tp-ink px-6 py-8 text-center sm:px-8">
            <h3 className="font-display text-2xl font-normal text-tp-paper sm:text-3xl">
              Want a professional headshot that scores 100%?
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-tp-beige">Get yours with TailorPic.</p>
            <Link
              href={CTA_HREF}
              className={cn(
                buttonVariants({ variant: 'primary', size: 'lg' }),
                'mt-5 bg-tp-bronze text-tp-black hover:bg-tp-beige'
              )}
            >
              Get yours with TailorPic
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
