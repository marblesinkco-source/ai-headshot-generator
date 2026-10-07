'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Upload, Download, FileDown, RefreshCw, AlertCircle, ShieldCheck } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ctaHref = '/auth/register?redirect=/dashboard/upload';

const MAX_BYTES = 20 * 1024 * 1024;
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];

type TargetId = 'none' | '100' | '200' | '500' | '1024' | '2048' | 'custom';

const TARGETS: { id: TargetId; label: string; kb?: number }[] = [
  { id: 'none', label: 'Manual' },
  { id: '100', label: '100 KB', kb: 100 },
  { id: '200', label: '200 KB', kb: 200 },
  { id: '500', label: '500 KB', kb: 500 },
  { id: '1024', label: '1 MB', kb: 1024 },
  { id: '2048', label: '2 MB', kb: 2048 },
  { id: 'custom', label: 'Custom' },
];

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
}

export default function HeadshotCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const [quality, setQuality] = useState(80);
  const [target, setTarget] = useState<TargetId>('none');
  const [customKb, setCustomKb] = useState('300');
  const [maxDim, setMaxDim] = useState('');

  const [result, setResult] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultDims, setResultDims] = useState<{ w: number; h: number } | null>(null);
  const [usedQuality, setUsedQuality] = useState<number | null>(null);
  const [targetMissed, setTargetMissed] = useState(false);
  const [processing, setProcessing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const runId = useRef(0);
  const srcUrlRef = useRef<string | null>(null);

  const targetBytes = (() => {
    if (target === 'none') return null;
    if (target === 'custom') {
      const kb = Number(customKb);
      return Number.isFinite(kb) && kb >= 5 ? Math.round(kb * 1024) : null;
    }
    const preset = TARGETS.find((t) => t.id === target);
    return preset?.kb ? preset.kb * 1024 : null;
  })();

  const maxDimNum = (() => {
    const n = parseInt(maxDim, 10);
    return Number.isFinite(n) && n >= 50 ? n : null;
  })();

  // Revoke object URLs on unmount.
  useEffect(() => {
    return () => {
      if (srcUrlRef.current) URL.revokeObjectURL(srcUrlRef.current);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [resultUrl]);

  const handleFile = useCallback((f: File | undefined | null) => {
    setError(null);
    if (!f) return;
    if (!ACCEPTED.includes(f.type)) {
      setError('Please choose a JPG, PNG or WebP image.');
      return;
    }
    if (f.size > MAX_BYTES) {
      setError('That file is larger than 20MB. Please choose a smaller image.');
      return;
    }
    const url = URL.createObjectURL(f);
    const image = new Image();
    image.onload = () => {
      if (srcUrlRef.current) URL.revokeObjectURL(srcUrlRef.current);
      srcUrlRef.current = url;
      setFile(f);
      setImg(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      setError('We could not read that image. Try a different file.');
    };
    image.src = url;
  }, []);

  // Compress whenever the image or settings change.
  useEffect(() => {
    if (!img) return;
    const id = ++runId.current;
    setProcessing(true);

    const timer = window.setTimeout(async () => {
      try {
        let w = img.naturalWidth;
        let h = img.naturalHeight;
        if (maxDimNum && Math.max(w, h) > maxDimNum) {
          const scale = maxDimNum / Math.max(w, h);
          w = Math.max(1, Math.round(w * scale));
          h = Math.max(1, Math.round(h * scale));
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas unavailable');
        // JPG has no transparency, so fill with white first.
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);

        let blob: Blob | null = null;
        let q = quality / 100;
        let missed = false;

        if (targetBytes) {
          let lo = 0.05;
          let hi = 1;
          let best: Blob | null = null;
          let bestQ = lo;
          const top = await canvasToBlob(canvas, hi);
          if (top && top.size <= targetBytes) {
            best = top;
            bestQ = hi;
          } else {
            for (let i = 0; i < 8; i++) {
              const mid = (lo + hi) / 2;
              const b = await canvasToBlob(canvas, mid);
              if (!b) break;
              if (b.size <= targetBytes) {
                best = b;
                bestQ = mid;
                lo = mid;
              } else {
                hi = mid;
              }
            }
            if (!best) {
              best = await canvasToBlob(canvas, 0.05);
              bestQ = 0.05;
              missed = !!best && best.size > targetBytes;
            }
          }
          blob = best;
          q = bestQ;
        } else {
          blob = await canvasToBlob(canvas, q);
        }

        if (id !== runId.current) return;
        if (!blob) throw new Error('Compression failed');
        setResult(blob);
        setResultUrl(URL.createObjectURL(blob));
        setResultDims({ w, h });
        setUsedQuality(Math.round(q * 100));
        setTargetMissed(missed);
        setProcessing(false);
      } catch {
        if (id !== runId.current) return;
        setError('Compression failed in this browser. Try a different image.');
        setProcessing(false);
      }
    }, 150);

    return () => window.clearTimeout(timer);
  }, [img, quality, targetBytes, maxDimNum]);

  const reset = () => {
    runId.current++;
    if (srcUrlRef.current) URL.revokeObjectURL(srcUrlRef.current);
    srcUrlRef.current = null;
    setFile(null);
    setImg(null);
    setResult(null);
    setResultUrl(null);
    setResultDims(null);
    setUsedQuality(null);
    setTargetMissed(false);
    setProcessing(false);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const downloadName = file ? `${file.name.replace(/\.[^.]+$/, '')}-compressed.jpg` : 'compressed.jpg';

  const reduction = file && result ? Math.round((1 - result.size / file.size) * 100) : null;
  const gotLarger = reduction !== null && reduction < 0;
  const barPct = file && result ? Math.min(100, Math.max(2, (result.size / file.size) * 100)) : 100;

  return (
    <div className="mx-auto w-full max-w-3xl rounded-tp-card border border-tp-line bg-tp-paper p-5 sm:p-8">
      {!file || !img ? (
        <>
          <div
            role="button"
            tabIndex={0}
            aria-label="Upload a photo to compress"
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
              'flex cursor-pointer flex-col items-center justify-center gap-4 rounded-tp-card border-2 border-dashed bg-white px-6 py-14 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
              dragging ? 'border-tp-bronze bg-tp-paper' : 'border-tp-line hover:border-tp-bronze hover:bg-tp-paper'
            )}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-tp-beige/40 text-tp-bronze-ink">
              <Upload className="h-7 w-7" aria-hidden="true" />
            </span>
            <span className="text-base font-semibold text-tp-ink">Drag &amp; drop your photo here</span>
            <span className="text-sm text-tp-muted">JPG, PNG or WebP, up to 20MB</span>
            <span className={cn(buttonVariants({ variant: 'primary', size: 'md' }))}>Choose a photo</span>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            tabIndex={-1}
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-tp-muted">
            <ShieldCheck className="h-4 w-4 text-tp-bronze-ink" aria-hidden="true" />
            Your photo is compressed in your browser and never uploaded.
          </p>
        </>
      ) : (
        <div className="space-y-8">
          {/* Size comparison */}
          <div className="rounded-tp-card border border-tp-line bg-white p-5">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-tp-muted">Original</p>
                <p className="mt-1 font-display text-3xl font-normal text-tp-ink">{formatBytes(file.size)}</p>
                <p className="text-xs text-tp-muted">
                  {img.naturalWidth} × {img.naturalHeight} px
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">Compressed</p>
                <p className="mt-1 font-display text-3xl font-normal text-tp-ink" aria-live="polite">
                  {result ? formatBytes(result.size) : '...'}
                </p>
                <p className="text-xs text-tp-muted">
                  {resultDims ? `${resultDims.w} × ${resultDims.h} px` : ' '}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-2" aria-hidden="true">
              <div className="h-3 w-full rounded-full bg-tp-beige/60" />
              <div
                className="h-3 rounded-full bg-tp-bronze transition-all duration-300"
                style={{ width: `${barPct}%` }}
              />
            </div>
            <p className="mt-3 text-center text-sm text-tp-ink">
              {processing && !result
                ? 'Compressing...'
                : reduction === null
                  ? ''
                  : gotLarger
                    ? `${Math.abs(reduction)}% larger than the original. Lower the quality or add a max dimension.`
                    : `${reduction}% smaller`}
            </p>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-tp-ink">Target file size</p>
              <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Target file size">
                {TARGETS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTarget(t.id)}
                    aria-pressed={target === t.id}
                    className={cn(
                      'rounded-tp-button border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
                      target === t.id
                        ? 'border-tp-black bg-tp-black text-tp-bronze'
                        : 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze'
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              {target === 'custom' && (
                <div className="mt-3 flex items-center gap-2">
                  <label htmlFor="custom-kb" className="text-sm text-tp-muted">
                    Target size (KB)
                  </label>
                  <input
                    id="custom-kb"
                    type="number"
                    min={5}
                    inputMode="numeric"
                    value={customKb}
                    onChange={(e) => setCustomKb(e.target.value)}
                    className="h-10 w-28 rounded-tp-button border border-tp-line bg-white px-3 text-sm text-tp-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink"
                  />
                </div>
              )}
              {targetMissed && (
                <p className="mt-3 flex items-start gap-2 text-sm text-tp-muted" role="status">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
                  This photo can not reach that size at its current dimensions. Set a smaller max dimension below.
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="quality" className="text-sm font-semibold text-tp-ink">
                  Quality
                </label>
                <span className="text-sm text-tp-muted">
                  {targetBytes && usedQuality !== null ? `${usedQuality} (auto)` : quality}
                </span>
              </div>
              <input
                id="quality"
                type="range"
                min={10}
                max={100}
                step={1}
                value={targetBytes && usedQuality !== null ? Math.max(10, usedQuality) : quality}
                disabled={!!targetBytes}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="mt-3 w-full accent-tp-bronze disabled:opacity-60"
              />
              <p className="mt-1 text-xs text-tp-muted">
                {targetBytes
                  ? 'Quality is set automatically to fit your target. Choose Manual to adjust it yourself.'
                  : 'Lower quality means a smaller file. Around 70 to 85 is a common balance.'}
              </p>
            </div>

            <div>
              <label htmlFor="max-dim" className="text-sm font-semibold text-tp-ink">
                Max dimension (optional)
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  id="max-dim"
                  type="number"
                  min={50}
                  inputMode="numeric"
                  placeholder="e.g. 1000"
                  value={maxDim}
                  onChange={(e) => setMaxDim(e.target.value)}
                  className="h-10 w-32 rounded-tp-button border border-tp-line bg-white px-3 text-sm text-tp-ink placeholder:text-tp-muted focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink"
                />
                <span className="text-sm text-tp-muted">px on the longest side</span>
              </div>
              <p className="mt-1 text-xs text-tp-muted">Leave empty to keep the original dimensions.</p>
            </div>
          </div>

          {/* Preview */}
          {resultUrl && (
            <div className="overflow-hidden rounded-tp-card border border-tp-line bg-white p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={resultUrl} alt="Compressed preview" width={400} height={400} loading="lazy" className="mx-auto max-h-80 w-auto rounded-tp-button object-contain" />
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            {resultUrl && (
              <a
                href={resultUrl}
                download={downloadName}
                className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'flex-1')}
              >
                <Download className="h-5 w-5" aria-hidden="true" />
                Download compressed JPG
              </a>
            )}
            <button
              type="button"
              onClick={reset}
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              <RefreshCw className="h-5 w-5" aria-hidden="true" />
              New photo
            </button>
          </div>

          <div className="rounded-tp-card border border-tp-line bg-white p-5 text-center">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold text-tp-ink">
              <FileDown className="h-4 w-4 text-tp-bronze-ink" aria-hidden="true" />
              Need a better headshot, not just a smaller file?
            </p>
            <Link href={ctaHref} className="mt-2 inline-block text-sm font-semibold text-tp-bronze-ink underline underline-offset-4">
              Try TailorPic
            </Link>
          </div>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-4 flex items-start gap-2 text-sm text-tp-ink">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
