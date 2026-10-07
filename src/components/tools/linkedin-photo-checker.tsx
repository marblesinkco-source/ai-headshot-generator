'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Upload,
  Download,
  X,
  ShieldCheck,
  RotateCcw,
  Check,
  AlertTriangle,
  XCircle,
} from 'lucide-react';

type Status = 'pass' | 'warn' | 'fail';

interface Criterion {
  id: string;
  label: string;
  value: string;
  status: Status;
  tip: string;
}

interface Result {
  criteria: Criterion[];
  score: number;
  width: number;
  height: number;
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/png'];
const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;
const LINKEDIN_MAX_BYTES = 8 * 1024 * 1024;
const WARN_BYTES = 6 * 1024 * 1024;
const MAX_EXPORT_SIDE = 4096;
const ANALYSIS_SIZE = 256;
const GRID = 16;
const POINTS: Record<Status, number> = { pass: 1, warn: 0.5, fail: 0 };

const STATUS_STYLES: Record<Status, { label: string; text: string; border: string; bg: string }> = {
  pass: { label: 'Pass', text: 'text-tp-success', border: 'border-tp-success/30', bg: 'bg-tp-success/10' },
  warn: { label: 'Warning', text: 'text-tp-bronze-ink', border: 'border-tp-warning/40', bg: 'bg-tp-warning/10' },
  fail: { label: 'Fail', text: 'text-tp-error', border: 'border-tp-error/30', bg: 'bg-tp-error/10' },
};

function StatusIcon({ status, className }: { status: Status; className?: string }) {
  if (status === 'pass') return <Check className={className} aria-hidden="true" />;
  if (status === 'warn') return <AlertTriangle className={className} aria-hidden="true" />;
  return <XCircle className={className} aria-hidden="true" />;
}

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not read this image.'));
    img.src = src;
  });
}

function analyze(img: HTMLImageElement, file: File): Result {
  const width = img.naturalWidth;
  const height = img.naturalHeight;
  const minSide = Math.min(width, height);

  // 1. Dimensions
  const dimensions: Criterion = {
    id: 'dimensions',
    label: 'Dimensions',
    value: `${width} x ${height} px`,
    status: minSide >= 400 ? 'pass' : minSide >= 200 ? 'warn' : 'fail',
    tip:
      minSide >= 400
        ? 'Meets the 400 x 400 px minimum recommended for LinkedIn.'
        : 'LinkedIn recommends at least 400 x 400 px. Use a larger original.',
  };

  // 2. Aspect ratio
  const ratio = width / height;
  const off = Math.abs(ratio - 1);
  const aspect: Criterion = {
    id: 'aspect',
    label: 'Aspect ratio',
    value: `${ratio.toFixed(2)} : 1`,
    status: off > 0.3 ? 'fail' : off > 0.1 ? 'warn' : 'pass',
    tip:
      off <= 0.1
        ? 'Close to square, which suits the circular profile crop.'
        : 'Profile photos display as a square or circle. Crop to 1:1 so you control the framing. "Download Optimized" does this for you.',
  };

  // 3. File size
  const size: Criterion = {
    id: 'size',
    label: 'File size',
    value: formatBytes(file.size),
    status: file.size > LINKEDIN_MAX_BYTES ? 'fail' : file.size >= WARN_BYTES ? 'warn' : 'pass',
    tip:
      file.size > LINKEDIN_MAX_BYTES
        ? 'LinkedIn accepts profile photos up to 8 MB. Export at a smaller size.'
        : file.size >= WARN_BYTES
          ? 'Close to the 8 MB LinkedIn limit.'
          : 'Under the 8 MB LinkedIn limit.',
  };

  // 4. Resolution
  const resolution: Criterion = {
    id: 'resolution',
    label: 'Resolution',
    value: `${minSide} px shortest side`,
    status: minSide >= 800 ? 'pass' : minSide >= 400 ? 'warn' : 'fail',
    tip:
      minSide >= 800
        ? 'High enough to stay sharp on large and high-density screens.'
        : 'A shortest side of 800 px or more keeps the photo sharp on high-density screens.',
  };

  // Downscaled copy for pixel analysis
  const scale = Math.min(1, ANALYSIS_SIZE / Math.max(width, height));
  const w = Math.max(2, Math.round(width * scale));
  const h = Math.max(2, Math.round(height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Your browser does not support canvas analysis.');
  ctx.drawImage(img, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);

  const lum = new Float32Array(w * h);
  let total = 0;
  for (let i = 0; i < w * h; i++) {
    const v = 0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2];
    lum[i] = v;
    total += v;
  }
  const avg = total / (w * h);

  // 5. Brightness
  const brightness: Criterion = {
    id: 'brightness',
    label: 'Brightness',
    value: `${Math.round(avg)} / 255 average luminance`,
    status: avg < 60 || avg > 220 ? 'warn' : 'pass',
    tip:
      avg < 60
        ? 'The photo looks too dark. Face a window or soft light and retake it.'
        : avg > 220
          ? 'The photo looks too bright. Avoid direct sun or harsh flash.'
          : 'Exposure is within a comfortable range.',
  };

  // 6. Face centering (rough proxy): centroid of highest-contrast grid cells
  const cellContrast = new Float64Array(GRID * GRID);
  for (let y = 0; y < h - 1; y++) {
    const gy = Math.min(GRID - 1, Math.floor((y / h) * GRID));
    for (let x = 0; x < w - 1; x++) {
      const gx = Math.min(GRID - 1, Math.floor((x / w) * GRID));
      const i = y * w + x;
      cellContrast[gy * GRID + gx] += Math.abs(lum[i] - lum[i + 1]) + Math.abs(lum[i] - lum[i + w]);
    }
  }
  const ranked = Array.from(cellContrast, (v, i) => ({ v, i })).sort((a, b) => b.v - a.v);
  const top = ranked.slice(0, Math.round(GRID * GRID * 0.1));
  const weight = top.reduce((s, c) => s + c.v, 0) || 1;
  const cx = top.reduce((s, c) => s + c.v * ((c.i % GRID) + 0.5), 0) / weight / GRID;
  const cy = top.reduce((s, c) => s + c.v * (Math.floor(c.i / GRID) + 0.5), 0) / weight / GRID;
  const inThird = cx >= 1 / 3 && cx <= 2 / 3 && cy >= 1 / 3 && cy <= 2 / 3;
  const inMiddle = cx >= 0.2 && cx <= 0.8 && cy >= 0.2 && cy <= 0.8;
  const centering: Criterion = {
    id: 'centering',
    label: 'Face centering',
    value: inThird ? 'Detail is centered' : inMiddle ? 'Slightly off-center' : 'Off-center',
    status: inThird ? 'pass' : inMiddle ? 'warn' : 'fail',
    tip: inThird
      ? 'The most detailed region sits in the center third of the frame.'
      : 'The most detailed region is away from the center. This is only a rough heuristic, not face detection, so check your framing by eye.',
  };

  const criteria = [dimensions, aspect, size, resolution, brightness, centering];
  const score = Math.round(
    (criteria.reduce((s, c) => s + POINTS[c.status], 0) / criteria.length) * 100,
  );
  return { criteria, score, width, height };
}

export default function LinkedInPhotoChecker() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const urlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  const reset = useCallback(() => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    imgRef.current = null;
    setPreviewUrl(null);
    setResult(null);
    setFileName('');
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  }, []);

  const handleFile = useCallback(
    async (file: File | undefined | null) => {
      if (!file) return;
      setError(null);
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError('Please upload a JPEG or PNG image.');
        return;
      }
      if (file.size > MAX_UPLOAD_BYTES) {
        setError('This file is larger than 15 MB. Please choose a smaller image.');
        return;
      }
      setBusy(true);
      const url = URL.createObjectURL(file);
      try {
        const img = await loadImage(url);
        const res = analyze(img, file);
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        urlRef.current = url;
        imgRef.current = img;
        setPreviewUrl(url);
        setResult(res);
        setFileName(file.name);
      } catch (e) {
        URL.revokeObjectURL(url);
        setError(e instanceof Error ? e.message : 'Could not analyze this image.');
      } finally {
        setBusy(false);
      }
    },
    [],
  );

  const downloadOptimized = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    const side = Math.min(w, h, MAX_EXPORT_SIDE);
    const srcSide = Math.min(w, h);
    const sx = (w - srcSide) / 2;
    const sy = (h - srcSide) / 2;
    const canvas = document.createElement('canvas');
    canvas.width = side;
    canvas.height = side;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setError('Your browser does not support canvas export.');
      return;
    }
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, sx, sy, srcSide, srcSide, 0, 0, side, side);
    canvas.toBlob((blob) => {
      if (!blob) {
        setError('Could not export the image.');
        return;
      }
      const a = document.createElement('a');
      const href = URL.createObjectURL(blob);
      a.href = href;
      a.download = 'linkedin-photo-optimized.png';
      a.click();
      setTimeout(() => URL.revokeObjectURL(href), 1000);
    }, 'image/png');
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    void handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="mx-auto w-full max-w-4xl text-tp-ink">
      {!result && (
        <div>
          <div
            role="button"
            tabIndex={0}
            aria-label="Upload a JPEG or PNG photo to check, up to 15 MB. Click or drag and drop."
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
            onDrop={onDrop}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-tp-card border-2 border-dashed px-6 py-14 text-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze ${
              dragging ? 'border-tp-bronze bg-tp-beige' : 'border-tp-line bg-tp-paper hover:border-tp-bronze'
            }`}
          >
            <Upload className="mb-3 h-8 w-8 text-tp-bronze-ink" aria-hidden="true" />
            <p className="text-base font-medium">
              {busy ? 'Analyzing...' : 'Drop your photo here or click to upload'}
            </p>
            <p className="mt-1 text-sm text-tp-muted">JPEG or PNG, up to 15 MB</p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-tp-muted">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Analyzed in your browser. Your photo is never uploaded.
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png"
            className="sr-only"
            aria-label="Choose a photo file"
            onChange={(e) => void handleFile(e.target.files?.[0])}
          />
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mt-4 flex items-start justify-between gap-3 rounded-tp-button border border-tp-error/30 bg-tp-error/10 px-4 py-3 text-sm"
        >
          <span className="text-tp-error">{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            aria-label="Dismiss error"
            className="shrink-0 text-tp-error"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {result && previewUrl && (
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-6 rounded-tp-card border border-tp-line bg-tp-paper p-6 sm:flex-row">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt={`Circular LinkedIn-style preview of ${fileName || 'your photo'}`}
              className="h-40 w-40 shrink-0 rounded-full border border-tp-line object-cover"
            />
            <div className="text-center sm:text-left">
              <p className="text-sm text-tp-muted">Overall score</p>
              <p
                className="font-display text-5xl font-normal"
                aria-label={`Overall score ${result.score} out of 100`}
              >
                {result.score}
                <span className="text-2xl text-tp-muted"> / 100</span>
              </p>
              <p className="mt-1 break-all text-xs text-tp-muted">{fileName}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
                <button
                  type="button"
                  onClick={downloadOptimized}
                  aria-label="Download optimized square PNG"
                  className="inline-flex items-center gap-2 rounded-tp-button bg-tp-ink px-4 py-2.5 text-sm font-medium text-tp-paper transition-colors hover:bg-tp-bronze-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download Optimized
                </button>
                <button
                  type="button"
                  onClick={reset}
                  aria-label="Reset and check another photo"
                  className="inline-flex items-center gap-2 rounded-tp-button border border-tp-line bg-tp-paper px-4 py-2.5 text-sm font-medium transition-colors hover:border-tp-bronze focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Reset
                </button>
              </div>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Analysis results">
            {result.criteria.map((c) => {
              const s = STATUS_STYLES[c.status];
              return (
                <li
                  key={c.id}
                  aria-label={`${c.label}: ${s.label}. ${c.value}`}
                  className={`rounded-tp-card border p-4 ${s.border} ${s.bg}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold">{c.label}</h3>
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${s.text}`}>
                      <StatusIcon status={c.status} className="h-4 w-4" />
                      {s.label}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium">{c.value}</p>
                  <p className="mt-1 text-xs text-tp-muted">{c.tip}</p>
                </li>
              );
            })}
          </ul>

          <p className="text-xs text-tp-muted">
            Download Optimized crops to a centered 1:1 square and exports a PNG at your photo&apos;s
            original resolution, capped at {MAX_EXPORT_SIDE}px. Face centering is a rough heuristic, not
            face detection.
          </p>
        </div>
      )}
    </div>
  );
}
