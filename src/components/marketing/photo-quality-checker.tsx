'use client';

import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { Camera, CheckCircle, AlertCircle, Upload, ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

type Status = 'good' | 'warn' | 'bad';
interface Metric { label: string; status: Status; detail: string; tip: string }
interface Analysis { metrics: Metric[]; score: number; preview: string }

const POINTS: Record<Status, number> = { good: 1, warn: 0.55, bad: 0.15 };
const STYLE: Record<Status, string> = {
  good: 'text-emerald-600',
  warn: 'text-amber-600',
  bad: 'text-red-600',
};
const MAX_SIDE = 512;

function analyze(img: HTMLImageElement, preview: string): Analysis {
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const scale = Math.min(1, MAX_SIDE / Math.max(w, h));
  const cw = Math.max(1, Math.round(w * scale));
  const ch = Math.max(1, Math.round(h * scale));
  const canvas = document.createElement('canvas');
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Canvas unavailable');
  ctx.drawImage(img, 0, 0, cw, ch);
  const { data } = ctx.getImageData(0, 0, cw, ch);

  const lum = new Float32Array(cw * ch);
  let sum = 0;
  for (let i = 0; i < lum.length; i++) {
    const l = 0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2];
    lum[i] = l;
    sum += l;
  }
  const mean = sum / lum.length;
  let varSum = 0;
  for (let i = 0; i < lum.length; i++) varSum += (lum[i] - mean) ** 2;
  const contrast = Math.sqrt(varSum / lum.length);

  // Laplacian-like edge response: variance of 4-neighbour second derivative
  let lapSum = 0;
  let lapSq = 0;
  let n = 0;
  for (let y = 1; y < ch - 1; y++) {
    for (let x = 1; x < cw - 1; x++) {
      const i = y * cw + x;
      const v = 4 * lum[i] - lum[i - 1] - lum[i + 1] - lum[i - cw] - lum[i + cw];
      lapSum += v;
      lapSq += v * v;
      n++;
    }
  }
  const sharp = n ? lapSq / n - (lapSum / n) ** 2 : 0;

  const minSide = Math.min(w, h);
  const res: Metric =
    minSide >= 1024
      ? { label: 'Resolution', status: 'good', detail: `${w}×${h}px, ideal size`, tip: '' }
      : minSide >= 512
        ? { label: 'Resolution', status: 'warn', detail: `${w}×${h}px, usable (1024px+ is ideal)`, tip: 'Use the original file from your camera rather than a screenshot or chat copy.' }
        : { label: 'Resolution', status: 'bad', detail: `${w}×${h}px, below the 512px minimum`, tip: 'Upload a larger photo, at least 512×512px.' };

  const ratio = w / h;
  const face: Metric =
    ratio >= 0.6 && ratio <= 1.4
      ? { label: 'Framing', status: 'good', detail: 'Portrait-friendly proportions for a head-and-shoulders shot', tip: '' }
      : { label: 'Framing', status: 'warn', detail: 'Very wide or tall frame; a face may be small or off-centre', tip: 'Crop closer so your face sits in the centre of a head-and-shoulders frame.' };

  // Centre-vs-edge luminance as a rough placement hint (not real face detection)
  let cSum = 0;
  let cN = 0;
  for (let y = Math.floor(ch * 0.25); y < ch * 0.75; y++)
    for (let x = Math.floor(cw * 0.25); x < cw * 0.75; x++) { cSum += lum[y * cw + x]; cN++; }
  const centreDiff = Math.abs(cSum / cN - mean);
  if (face.status === 'good' && centreDiff < 3) {
    face.status = 'warn';
    face.detail = 'Centre looks similar to the edges; make sure your face fills the middle';
    face.tip = 'Step closer so your face is centred and clearly the main subject.';
  }

  const light: Metric =
    mean >= 80 && mean <= 190 && contrast >= 40
      ? { label: 'Lighting', status: 'good', detail: 'Even brightness with healthy contrast', tip: '' }
      : mean < 55 || mean > 215
        ? { label: 'Lighting', status: 'bad', detail: mean < 55 ? 'Too dark' : 'Overexposed', tip: 'Face a window or soft light source and avoid harsh backlight.' }
        : { label: 'Lighting', status: 'warn', detail: contrast < 40 ? 'Flat, low contrast' : 'Slightly dark or bright', tip: 'Use soft, even daylight on your face.' };

  const blur: Metric =
    sharp >= 150
      ? { label: 'Sharpness', status: 'good', detail: 'Crisp edges detected', tip: '' }
      : sharp >= 50
        ? { label: 'Sharpness', status: 'warn', detail: 'Slightly soft', tip: 'Hold the camera steady or use a timer.' }
        : { label: 'Sharpness', status: 'bad', detail: 'Looks blurry', tip: 'Retake with steady hands and tap to focus on your face.' };

  const metrics = [res, face, light, blur];
  const score = Math.round((metrics.reduce((s, m) => s + POINTS[m.status], 0) / metrics.length) * 100);
  return { metrics, score, preview };
}

function StatusIcon({ status }: { status: Status }) {
  const Icon = status === 'good' ? CheckCircle : AlertCircle;
  return <Icon aria-hidden className={`h-5 w-5 shrink-0 ${STYLE[status]}`} />;
}

export function PhotoQualityChecker() {
  const [result, setResult] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<string | null>(null);

  const handleFile = useCallback((file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file (JPG, PNG or WebP).');
      return;
    }
    setError(null);
    setBusy(true);
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    const url = URL.createObjectURL(file);
    urlRef.current = url;
    const img = new Image();
    img.onload = () => {
      try {
        setResult(analyze(img, url));
      } catch {
        setError('Could not analyze this image. Try another photo.');
      }
      setBusy(false);
    };
    img.onerror = () => {
      setError('Could not read this image. Try a JPG or PNG.');
      setBusy(false);
    };
    img.src = url;
  }, []);

  const good = result ? result.score >= 80 : false;

  return (
    <section className="mx-auto max-w-3xl rounded-tp-card border border-tp-line bg-tp-paper p-6 sm:p-8">
      <div className="text-center">
        <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">Photo Readiness Check</h2>
        <p className="mt-2 text-sm text-tp-muted">
          Check your selfie before you upload. Analysis runs in your browser; your photo is never sent anywhere.
        </p>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]); }}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click(); } }}
        role="button"
        tabIndex={0}
        aria-label="Upload a selfie to check"
        className={`mt-6 flex cursor-pointer flex-col items-center justify-center rounded-tp-card border-2 border-dashed px-4 py-10 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze ${
          dragging ? 'border-tp-bronze bg-tp-beige/30' : 'border-tp-beige bg-white hover:border-tp-bronze'
        }`}
      >
        {busy ? <Camera aria-hidden className="h-8 w-8 animate-pulse text-tp-bronze-ink" /> : <Upload aria-hidden className="h-8 w-8 text-tp-bronze-ink" />}
        <p className="mt-3 text-sm font-medium text-tp-ink">{busy ? 'Analyzing…' : 'Drag and drop a selfie, or click to browse'}</p>
        <p className="mt-1 text-xs text-tp-muted">JPG, PNG or WebP</p>
        <input ref={inputRef} type="file" accept="image/*" className="sr-only" onChange={(e) => { handleFile(e.target.files?.[0]); e.target.value = ''; }} />
      </div>

      {error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}

      {result && (
        <div className="mt-8" aria-live="polite">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={result.preview} alt="Your uploaded photo" className="h-40 w-40 rounded-tp-card border border-tp-line object-cover" />
            <div className="w-full flex-1">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-tp-muted">Photo Readiness Score</span>
                <span className="font-display text-4xl text-tp-ink">{result.score}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-tp-line">
                <div className="h-full rounded-full bg-tp-bronze transition-all duration-500" style={{ width: `${result.score}%` }} />
              </div>
              <ul className="mt-5 space-y-3">
                {result.metrics.map((m) => (
                  <li key={m.label} className="flex items-start gap-3 rounded-tp-button border border-tp-line bg-white p-3">
                    <StatusIcon status={m.status} />
                    <div>
                      <p className="text-sm font-medium text-tp-ink">{m.label}</p>
                      <p className="text-xs text-tp-muted">{m.detail}</p>
                      {m.tip && <p className="mt-1 text-xs text-tp-bronze-ink">{m.tip}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-tp-card bg-tp-black p-6 text-center">
            <p className="font-display font-normal text-2xl text-tp-paper">
              {good ? 'Your photo looks great!' : 'Tips to improve your photo'}
            </p>
            <p className="mt-1 text-sm text-tp-beige">
              {good
                ? 'Turn it into a polished, AI-generated concept headshot.'
                : 'Follow the tips above, or continue anyway. Results are AI-generated concepts and depend on your source photos.'}
            </p>
            <Link href="/auth/register?redirect=/headshots" className={`${buttonVariants({ variant: 'outline', size: 'lg' })} mt-5 border-tp-bronze bg-tp-bronze text-tp-black hover:bg-tp-beige`}>
              {good ? 'Get your headshot' : 'Start anyway'}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-3 text-center text-xs text-tp-muted">
            Heuristic checks only (size, framing, brightness, edges); this is not face recognition.
          </p>
        </div>
      )}
    </section>
  );
}
