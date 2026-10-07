'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Upload, X, ShieldCheck, RotateCcw, Check, AlertTriangle } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MAX_FILE_BYTES = 15 * 1024 * 1024;
const ANALYSIS_WIDTH = 512;
const GRID = 16;
const UPGRADE_THRESHOLD = 70;

type CriterionId = 'framing' | 'lighting' | 'background' | 'sharpness' | 'contrast';

interface Criterion {
  id: CriterionId;
  label: string;
  score: number;
  tip: string;
}

interface Analysis {
  overall: number;
  criteria: Criterion[];
  /** Estimated bounding box of the high-contrast subject cluster, in 0-1 units. */
  subject: { x: number; y: number; w: number; h: number } | null;
}

const clamp = (v: number, min = 0, max = 100) => Math.min(max, Math.max(min, v));

function scoreTone(score: number) {
  if (score >= 80) return { text: 'text-tp-success', bar: 'bg-tp-success', stroke: 'stroke-tp-success' };
  if (score >= 50) return { text: 'text-tp-bronze-ink', bar: 'bg-tp-warning', stroke: 'stroke-tp-warning' };
  return { text: 'text-tp-error', bar: 'bg-tp-error', stroke: 'stroke-tp-error' };
}

function verdict(score: number) {
  if (score >= 80) return 'Strong headshot basics';
  if (score >= 70) return 'Good, with room to improve';
  if (score >= 50) return 'Usable, but needs work';
  return 'Needs significant improvement';
}

/* ---------------------------- analysis ---------------------------- */

function analyzeImage(img: HTMLImageElement): Analysis {
  const scale = Math.min(1, ANALYSIS_WIDTH / img.naturalWidth);
  const w = Math.max(32, Math.round(img.naturalWidth * scale));
  const h = Math.max(32, Math.round(img.naturalHeight * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Canvas is not supported in this browser.');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);

  // Luminance map
  const lum = new Float32Array(w * h);
  for (let i = 0, p = 0; i < lum.length; i++, p += 4) {
    lum[i] = 0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2];
  }

  let sum = 0;
  for (let i = 0; i < lum.length; i++) sum += lum[i];
  const mean = sum / lum.length;
  let sq = 0;
  for (let i = 0; i < lum.length; i++) sq += (lum[i] - mean) ** 2;
  const std = Math.sqrt(sq / lum.length);

  /* 1. Framing: 16x16 contrast grid */
  const cellW = w / GRID;
  const cellH = h / GRID;
  const grid: number[][] = [];
  for (let gy = 0; gy < GRID; gy++) {
    const row: number[] = [];
    for (let gx = 0; gx < GRID; gx++) {
      const x0 = Math.floor(gx * cellW);
      const x1 = Math.max(x0 + 1, Math.floor((gx + 1) * cellW));
      const y0 = Math.floor(gy * cellH);
      const y1 = Math.max(y0 + 1, Math.floor((gy + 1) * cellH));
      let s = 0;
      let n = 0;
      for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { s += lum[y * w + x]; n++; }
      const m = s / n;
      let v = 0;
      for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) v += (lum[y * w + x] - m) ** 2;
      row.push(Math.sqrt(v / n));
    }
    grid.push(row);
  }

  const flat = grid.flat();
  const maxC = Math.max(...flat, 1);
  const meanC = flat.reduce((a, b) => a + b, 0) / flat.length;
  const hiThreshold = Math.max(meanC * 1.25, maxC * 0.45);

  // Weighted centroid + share of "high contrast" energy inside the center 8x8 area
  let wSum = 0;
  let cx = 0;
  let cy = 0;
  let centerEnergy = 0;
  let totalEnergy = 0;
  let minX = GRID, maxX = -1, minY = GRID, maxY = -1;
  for (let gy = 0; gy < GRID; gy++) {
    for (let gx = 0; gx < GRID; gx++) {
      const c = grid[gy][gx];
      const weight = c >= hiThreshold ? c : 0;
      wSum += weight;
      cx += weight * (gx + 0.5);
      cy += weight * (gy + 0.5);
      totalEnergy += weight;
      if (gx >= 4 && gx < 12 && gy >= 4 && gy < 12) centerEnergy += weight;
      if (weight > 0) {
        // Subject extent: ignore outermost columns (usually background clutter)
        if (gx >= 2 && gx < GRID - 2) {
          minX = Math.min(minX, gx); maxX = Math.max(maxX, gx);
          minY = Math.min(minY, gy); maxY = Math.max(maxY, gy);
        }
      }
    }
  }

  let framingScore = 30;
  let framingTip = 'Not enough contrast detail to locate your subject. Use a plain, evenly lit photo with your face clearly visible.';
  let subject: Analysis['subject'] = null;
  if (wSum > 0) {
    const offX = Math.abs(cx / wSum / GRID - 0.5); // 0 = centered
    const offY = Math.abs(cy / wSum / GRID - 0.5);
    const centerShare = centerEnergy / totalEnergy;
    const centerScore = clamp(100 - (offX * 2 * 160 + offY * 2 * 80) ) * 0.5 + clamp(centerShare * 130) * 0.5;

    let sizeScore = 50;
    let heightFrac = 0;
    if (maxY >= 0) {
      heightFrac = (maxY - minY + 1) / GRID;
      subject = { x: minX / GRID, y: minY / GRID, w: (maxX - minX + 1) / GRID, h: heightFrac };
      if (heightFrac >= 0.4 && heightFrac <= 0.6) sizeScore = 100;
      else if (heightFrac < 0.4) sizeScore = clamp(100 - (0.4 - heightFrac) * 250);
      else sizeScore = clamp(100 - (heightFrac - 0.6) * 200);
    }
    framingScore = Math.round(clamp(centerScore * 0.6 + sizeScore * 0.4));

    const horiz = cx / wSum / GRID - 0.5;
    if (framingScore >= 80) {
      framingTip = 'Well framed: your subject sits near the center at a natural size.';
    } else if (offX > 0.1) {
      framingTip = `Your subject sits toward the ${horiz < 0 ? 'left' : 'right'}. Shift the camera so your face is centered, with a little more space on the ${horiz < 0 ? 'right' : 'left'}.`;
    } else if (heightFrac > 0.6) {
      framingTip = 'The subject fills most of the frame. Step back or crop wider so there is breathing room above the head and around the shoulders.';
    } else if (heightFrac > 0 && heightFrac < 0.4) {
      framingTip = 'The subject looks small in the frame. Move closer or crop in so your head and shoulders take up about half the height.';
    } else if (offY > 0.1) {
      framingTip = 'Your subject sits too high or low. Aim to place your eyes roughly a third of the way down from the top.';
    } else {
      framingTip = 'Framing is acceptable. Try centering your face and cropping to head and shoulders.';
    }
  }

  /* 2. Lighting balance */
  const half = Math.floor(w / 2);
  let lSum = 0, rSum = 0, lN = 0, rN = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (x < half) { lSum += lum[y * w + x]; lN++; } else { rSum += lum[y * w + x]; rN++; }
    }
  }
  const lMean = lSum / lN;
  const rMean = rSum / rN;
  const diffRatio = Math.abs(lMean - rMean) / Math.max(lMean, rMean, 1);
  let lightingScore = 100 - diffRatio * 250;
  if (mean < 80) lightingScore -= (80 - mean) * 1.5;
  else if (mean > 200) lightingScore -= (mean - 200) * 2;
  lightingScore = Math.round(clamp(lightingScore));
  let lightingTip: string;
  if (mean < 80) lightingTip = 'The photo is too dark. Face a window or soft light source, or raise exposure so your face is clearly lit.';
  else if (mean > 200) lightingTip = 'The photo is overexposed. Move away from direct light or lower the exposure so skin detail is not washed out.';
  else if (diffRatio > 0.2) lightingTip = `The ${lMean > rMean ? 'left' : 'right'} side is noticeably brighter. Add a soft light or reflector on the ${lMean > rMean ? 'right' : 'left'} to even out shadows on your face.`;
  else if (lightingScore >= 80) lightingTip = 'Good lighting balance: both sides are evenly lit at a comfortable brightness.';
  else lightingTip = 'Lighting is slightly uneven. Face your main light source directly to reduce side shadows.';

  /* 3. Background simplicity: variance in the outer 20% border */
  const bx = Math.floor(w * 0.2);
  const by = Math.floor(h * 0.2);
  const ch = [0, 0, 0];
  const chSq = [0, 0, 0];
  let bN = 0;
  for (let y = 0; y < h; y++) {
    const inY = y >= by && y < h - by;
    for (let x = 0; x < w; x++) {
      if (inY && x >= bx && x < w - bx) { x = w - bx - 1; continue; }
      const p = (y * w + x) * 4;
      for (let c = 0; c < 3; c++) { const v = data[p + c]; ch[c] += v; chSq[c] += v * v; }
      bN++;
    }
  }
  let bgStd = 0;
  for (let c = 0; c < 3; c++) {
    const m = ch[c] / bN;
    bgStd += Math.sqrt(Math.max(0, chSq[c] / bN - m * m));
  }
  bgStd /= 3;
  const backgroundScore = Math.round(clamp(100 - (bgStd - 15) * 1.6));
  let backgroundTip: string;
  if (backgroundScore >= 80) backgroundTip = 'Clean, simple background that keeps attention on your face.';
  else if (backgroundScore >= 50) backgroundTip = 'The background has some variation. Stand a few steps in front of a plain wall to keep it softer and less busy.';
  else backgroundTip = 'The background is busy or high-contrast. Use a plain wall or an out-of-focus backdrop, or replace it with a clean one.';

  /* 4. Sharpness: 3x3 Laplacian on the center region */
  const sx0 = Math.floor(w * 0.2), sx1 = Math.floor(w * 0.8);
  const sy0 = Math.floor(h * 0.15), sy1 = Math.floor(h * 0.85);
  let lapSum = 0, lapSq = 0, lapN = 0;
  for (let y = Math.max(1, sy0); y < Math.min(h - 1, sy1); y++) {
    for (let x = Math.max(1, sx0); x < Math.min(w - 1, sx1); x++) {
      const i = y * w + x;
      const r = 4 * lum[i] - lum[i - 1] - lum[i + 1] - lum[i - w] - lum[i + w];
      lapSum += r; lapSq += r * r; lapN++;
    }
  }
  const lapMean = lapN ? lapSum / lapN : 0;
  const lapVar = lapN ? lapSq / lapN - lapMean * lapMean : 0;
  const sharpnessScore = Math.round(
    clamp(((Math.log(lapVar + 1) - Math.log(8)) / (Math.log(350) - Math.log(8))) * 100)
  );
  let sharpnessTip: string;
  if (sharpnessScore >= 80) sharpnessTip = 'Crisp detail in the center of the frame.';
  else if (sharpnessScore >= 50) sharpnessTip = 'Slightly soft. Clean the lens, hold the camera steady or use a timer, and make sure the focus point is on your eyes.';
  else sharpnessTip = 'The image looks blurry or low-detail. Retake with better light, a steady camera and focus locked on your eyes, or use a higher-resolution original.';
  if (img.naturalWidth < 600 && sharpnessScore < 80) sharpnessTip += ' The file is also small, so a larger original would help.';

  /* 5. Contrast: std dev of luminance */
  let contrastScore: number;
  if (std < 30) contrastScore = (std / 30) * 70;
  else if (std <= 80) contrastScore = 100;
  else contrastScore = 100 - (std - 80) * 3;
  contrastScore = Math.round(clamp(contrastScore));
  let contrastTip: string;
  if (std < 30) contrastTip = 'The photo looks flat. Add some directional light or adjust contrast so your features have more definition.';
  else if (std > 80) contrastTip = 'Contrast is harsh. Soften the light (a window with a sheer curtain works well) to avoid hard shadows and bright highlights.';
  else contrastTip = 'Healthy contrast: features have good definition without harsh shadows.';

  const criteria: Criterion[] = [
    { id: 'framing', label: 'Framing & Composition', score: framingScore, tip: framingTip },
    { id: 'lighting', label: 'Lighting Balance', score: lightingScore, tip: lightingTip },
    { id: 'background', label: 'Background Simplicity', score: backgroundScore, tip: backgroundTip },
    { id: 'sharpness', label: 'Sharpness', score: sharpnessScore, tip: sharpnessTip },
    { id: 'contrast', label: 'Contrast', score: contrastScore, tip: contrastTip },
  ];
  const overall = Math.round(criteria.reduce((a, c) => a + c.score, 0) / criteria.length);
  return { overall, criteria, subject };
}

/* ------------------------------ UI ------------------------------ */

function ScoreGauge({ score }: { score: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const tone = scoreTone(score);
  return (
    <div className="relative h-40 w-40" role="img" aria-label={`Overall headshot quality score: ${score} out of 100`}>
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r={r} fill="none" strokeWidth="10" className="stroke-tp-line" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - score / 100)}
          className={cn('transition-all duration-700', tone.stroke)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn('font-display text-5xl font-normal leading-none', tone.text)}>{score}</span>
        <span className="mt-1 text-xs text-tp-muted">out of 100</span>
      </div>
    </div>
  );
}

export function HeadshotQualityScore() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const urlRef = useRef<string | null>(null);

  useEffect(() => () => { if (urlRef.current) URL.revokeObjectURL(urlRef.current); }, []);

  const reset = useCallback(() => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setPreviewUrl(null);
    setAnalysis(null);
    setError(null);
    setBusy(false);
    if (inputRef.current) inputRef.current.value = '';
  }, []);

  const handleFile = useCallback((file: File | undefined) => {
    if (!file) return;
    setError(null);
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      setError('Please upload a JPEG or PNG image.');
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setError('That file is larger than 15MB. Please choose a smaller image.');
      return;
    }
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    const url = URL.createObjectURL(file);
    urlRef.current = url;
    setBusy(true);
    setAnalysis(null);
    const img = new Image();
    img.onload = () => {
      try {
        setAnalysis(analyzeImage(img));
        setPreviewUrl(url);
      } catch {
        setError('Sorry, we could not analyze that image. Please try another photo.');
        URL.revokeObjectURL(url);
        urlRef.current = null;
      }
      setBusy(false);
    };
    img.onerror = () => {
      setError('That image could not be read. Please try another file.');
      URL.revokeObjectURL(url);
      urlRef.current = null;
      setBusy(false);
    };
    img.src = url;
  }, []);

  return (
    <section className="mx-auto w-full max-w-4xl" aria-label="Headshot Quality Score tool">
      <div className="rounded-tp-card border border-tp-line bg-tp-paper p-5 sm:p-8">
        {!previewUrl ? (
          <>
            <div
              role="button"
              tabIndex={0}
              aria-label="Upload a headshot photo. Click or drag and drop a JPEG or PNG up to 15MB."
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  inputRef.current?.click();
                }
              }}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                handleFile(e.dataTransfer.files?.[0]);
              }}
              className={cn(
                'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-tp-card border-2 border-dashed bg-white px-6 py-14 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
                dragging ? 'border-tp-bronze bg-tp-beige' : 'border-tp-line hover:border-tp-bronze'
              )}
            >
              <Upload className="h-8 w-8 text-tp-bronze-ink" aria-hidden="true" />
              <p className="font-semibold text-tp-ink">{busy ? 'Analyzing your photo...' : 'Drop your headshot here, or click to upload'}</p>
              <p className="text-sm text-tp-muted">JPEG or PNG, up to 15MB</p>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png"
              className="sr-only"
              aria-label="Choose a headshot photo to score"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            {error && (
              <p role="alert" className="mt-4 flex items-center gap-2 text-sm text-tp-error">
                <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
                {error}
              </p>
            )}
            <p className="mt-4 flex items-center justify-center gap-2 text-center text-sm text-tp-muted">
              <ShieldCheck className="h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
              Your photo is analyzed in your browser and is never uploaded.
            </p>
          </>
        ) : (
          analysis && (
            <div className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <div className="relative overflow-hidden rounded-tp-card border border-tp-line bg-tp-beige">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewUrl} alt="Your uploaded headshot with a composition grid overlay" width={400} height={400} loading="lazy" className="block h-auto w-full" />
                    <svg
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      className="pointer-events-none absolute inset-0 h-full w-full"
                      aria-hidden="true"
                    >
                      {/* 16x16 analysis grid */}
                      {Array.from({ length: GRID - 1 }, (_, i) => {
                        const p = ((i + 1) / GRID) * 100;
                        return (
                          <g key={i} stroke="white" strokeOpacity="0.18" strokeWidth="0.2">
                            <line x1={p} y1="0" x2={p} y2="100" />
                            <line x1="0" y1={p} x2="100" y2={p} />
                          </g>
                        );
                      })}
                      {/* center area (cells 4-11) */}
                      <rect x="25" y="25" width="50" height="50" fill="none" stroke="white" strokeOpacity="0.8" strokeWidth="0.5" strokeDasharray="2 1.5" />
                      {/* thirds */}
                      <g stroke="white" strokeOpacity="0.55" strokeWidth="0.35">
                        <line x1="33.33" y1="0" x2="33.33" y2="100" />
                        <line x1="66.66" y1="0" x2="66.66" y2="100" />
                        <line x1="0" y1="33.33" x2="100" y2="33.33" />
                        <line x1="0" y1="66.66" x2="100" y2="66.66" />
                      </g>
                      {/* estimated subject cluster */}
                      {analysis.subject && (
                        <rect
                          x={analysis.subject.x * 100}
                          y={analysis.subject.y * 100}
                          width={analysis.subject.w * 100}
                          height={analysis.subject.h * 100}
                          fillOpacity="0.2"
                          strokeWidth="0.7"
                          className="fill-tp-bronze stroke-tp-bronze"
                        />
                      )}
                    </svg>
                  </div>
                  <p className="mt-2 text-xs text-tp-muted">
                    Dashed box: center area. Bronze box: estimated high-contrast subject region (an approximation, not face detection).
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-3 text-center">
                  <ScoreGauge score={analysis.overall} />
                  <h3 className="font-display text-2xl font-normal text-tp-ink">{verdict(analysis.overall)}</h3>
                  <p className="max-w-xs text-sm text-tp-muted">
                    Average of five checks run on your device. Scores are a guide, not a judgment of you.
                  </p>
                </div>
              </div>

              <ul className="space-y-5" aria-label="Individual scores">
                {analysis.criteria.map((c) => {
                  const tone = scoreTone(c.score);
                  const good = c.score >= 80;
                  return (
                    <li key={c.id}>
                      <div className="mb-1.5 flex items-baseline justify-between gap-3">
                        <span className="text-sm font-semibold text-tp-ink">{c.label}</span>
                        <span className={cn('text-sm font-semibold tabular-nums', tone.text)}>{c.score}/100</span>
                      </div>
                      <div
                        className="h-2.5 w-full overflow-hidden rounded-full bg-tp-line"
                        role="progressbar"
                        aria-label={`${c.label} score`}
                        aria-valuenow={c.score}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div className={cn('h-full rounded-full transition-all duration-700', tone.bar)} style={{ width: `${c.score}%` }} />
                      </div>
                      <p className="mt-2 flex items-start gap-2 text-sm text-tp-muted">
                        {good ? (
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-tp-success" aria-hidden="true" />
                        ) : (
                          <AlertTriangle className={cn('mt-0.5 h-4 w-4 shrink-0', tone.text)} aria-hidden="true" />
                        )}
                        <span>{c.tip}</span>
                      </p>
                    </li>
                  );
                })}
              </ul>

              {analysis.overall < UPGRADE_THRESHOLD && (
                <div className="rounded-tp-card border border-tp-bronze bg-tp-beige p-5 text-center sm:p-6">
                  <h3 className="font-display text-2xl font-normal text-tp-ink">Skip the reshoot</h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-tp-muted">
                    Upload a few selfies and get professional AI headshots with studio-style lighting and a clean background.
                  </p>
                  <Link
                    href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
                    aria-label="Upgrade to AI Headshots"
                    className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'mt-4')}
                  >
                    Upgrade to AI Headshots
                  </Link>
                </div>
              )}

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={reset}
                  aria-label="Reset and score another photo"
                  className="inline-flex items-center gap-2 rounded-tp-button border border-tp-line bg-white px-4 py-2 text-sm font-semibold text-tp-ink transition-colors hover:border-tp-bronze focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Reset
                </button>
              </div>
            </div>
          )
        )}
        {previewUrl && error && (
          <p role="alert" className="mt-4 flex items-center gap-2 text-sm text-tp-error">
            <X className="h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}
      </div>
    </section>
  );
}

export default HeadshotQualityScore;
