'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Camera, Download, Eye, EyeOff, Lock, Palette, RotateCcw, ShieldCheck, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

const SIZE = 500;
const MAX_BYTES = 15 * 1024 * 1024;
const MAX_TEXT = 20;
const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

type FrameId = 'opentowork' | 'hiring' | 'custom';

interface FrameOption {
  id: FrameId;
  label: string;
  color: string;
  text: string;
}

const FRAMES: FrameOption[] = [
  { id: 'opentowork', label: '#OpenToWork', color: '#6FC26E', text: 'OPEN TO WORK' },
  { id: 'hiring', label: '#Hiring', color: '#0A66C2', text: 'HIRING' },
  { id: 'custom', label: 'Custom', color: '#8A5A2B', text: 'YOUR TEXT' },
];

const THICKNESS_LABELS = ['Thin', 'Medium', 'Thick'];
const THICKNESS_PX = [28, 48, 72];

function isLightColor(hex: string): boolean {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return false;
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

const chipBase =
  'rounded-tp-button border px-3.5 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze';
const chipOn = 'border-tp-ink bg-tp-ink text-white';
const chipOff = 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze';

export default function OpenToWorkFrame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const urlRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [hasImage, setHasImage] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [frameId, setFrameId] = useState<FrameId>('opentowork');
  const [customColor, setCustomColor] = useState('#8A5A2B');
  const [customText, setCustomText] = useState('YOUR TEXT');
  const [thickness, setThickness] = useState(1);
  const [textSize, setTextSize] = useState(60);
  const [showText, setShowText] = useState(true);

  const frame = FRAMES.find((f) => f.id === frameId) ?? FRAMES[0];
  const ringColor = frameId === 'custom' ? customColor : frame.color;
  const ringText = (frameId === 'custom' ? customText : frame.text).trim();

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, SIZE, SIZE);

    const c = SIZE / 2;
    const ringPx = THICKNESS_PX[thickness] ?? THICKNESS_PX[1];
    const innerR = c - ringPx;

    // Photo, circular cover-crop
    const img = imgRef.current;
    ctx.save();
    ctx.beginPath();
    ctx.arc(c, c, innerR, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    if (img && img.naturalWidth > 0) {
      const side = Math.min(img.naturalWidth, img.naturalHeight);
      const sx = (img.naturalWidth - side) / 2;
      const sy = (img.naturalHeight - side) / 2;
      ctx.drawImage(img, sx, sy, side, side, c - innerR, c - innerR, innerR * 2, innerR * 2);
    } else {
      ctx.fillStyle = '#E8DFD2';
      ctx.fillRect(0, 0, SIZE, SIZE);
    }
    ctx.restore();

    // Ring
    ctx.beginPath();
    ctx.arc(c, c, c, 0, Math.PI * 2, false);
    ctx.arc(c, c, innerR, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = ringColor;
    ctx.fill('evenodd');

    // Text on the bottom arc of the ring
    if (showText && ringText) {
      const textR = c - ringPx / 2;
      const label = ringText.toUpperCase();
      const chars = Array.from(label);
      let fontPx = ringPx * (0.35 + (textSize / 100) * 0.45);
      const spacingFor = (px: number) => px * 0.12;
      const measure = (px: number) => {
        ctx.font = `700 ${px}px Manrope, system-ui, sans-serif`;
        return chars.map((ch) => ctx.measureText(ch).width + spacingFor(px));
      };
      let widths = measure(fontPx);
      let total = widths.reduce((a, b) => a + b, 0) - spacingFor(fontPx);
      const maxArc = textR * Math.PI * 1.4;
      if (total > maxArc) {
        fontPx = fontPx * (maxArc / total);
        widths = measure(fontPx);
        total = widths.reduce((a, b) => a + b, 0) - spacingFor(fontPx);
      }
      ctx.fillStyle = isLightColor(ringColor) ? '#0F0F0F' : '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      let theta = Math.PI / 2 + total / textR / 2;
      chars.forEach((ch, i) => {
        const w = widths[i];
        const mid = theta - w / textR / 2;
        ctx.save();
        ctx.translate(c + textR * Math.cos(mid), c + textR * Math.sin(mid));
        ctx.rotate(mid - Math.PI / 2);
        ctx.fillText(ch, 0, 0);
        ctx.restore();
        theta -= w / textR;
      });
    }
  }, [ringColor, ringText, showText, textSize, thickness]);

  useEffect(() => {
    draw();
  }, [draw, hasImage]);

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  const loadFile = useCallback((file: File | undefined | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file (JPG, PNG, WebP).');
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
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = url;
      imgRef.current = img;
      setHasImage(true);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setError('We could not read that image. Try a different file.');
    };
    img.src = url;
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    loadFile(e.dataTransfer.files?.[0]);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'profile-frame.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  };

  const handleReset = () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    imgRef.current = null;
    setHasImage(false);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-center rounded-tp-card border border-tp-line bg-tp-paper p-4">
            <canvas
              ref={canvasRef}
              width={SIZE}
              height={SIZE}
              className="block h-auto w-full max-w-[420px]"
              role="img"
              aria-label="Preview of your profile photo with a colored frame"
            />
          </div>
          <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-tp-muted">
            <ShieldCheck className="h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
            Everything runs in your browser. Nothing is uploaded.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={cn(
                'flex flex-col items-center justify-center gap-2 rounded-tp-card border border-dashed px-4 py-6 text-center transition-colors',
                dragging ? 'border-tp-ink bg-tp-beige' : 'border-tp-bronze bg-tp-paper hover:bg-tp-beige/60'
              )}
            >
              <Upload className="h-5 w-5 text-tp-bronze-ink" aria-hidden="true" />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-tp-button text-sm font-semibold text-tp-ink underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
              >
                {hasImage ? 'Choose a different photo' : 'Click to upload a photo'}
              </button>
              <p className="text-xs text-tp-muted">or drag and drop an image here (max 15MB)</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                aria-label="Upload a profile photo"
                onChange={(e) => loadFile(e.target.files?.[0])}
              />
            </div>
            {error && (
              <p role="alert" className="mt-2 text-sm font-semibold text-tp-ink">
                {error}
              </p>
            )}
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-tp-ink">Frame</legend>
            <div className="flex flex-wrap gap-2">
              {FRAMES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={frameId === f.id}
                  onClick={() => setFrameId(f.id)}
                  className={cn(chipBase, 'inline-flex items-center gap-2', frameId === f.id ? chipOn : chipOff)}
                >
                  {f.id === 'custom' ? (
                    <Palette className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <span
                      className="h-3 w-3 rounded-full border border-white/40"
                      style={{ backgroundColor: f.color }}
                      aria-hidden="true"
                    />
                  )}
                  {f.label}
                </button>
              ))}
            </div>

            {frameId === 'custom' && (
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-tp-ink">
                  <span className="font-semibold">Color</span>
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="h-10 w-12 cursor-pointer rounded-tp-button border border-tp-line bg-white p-1"
                  />
                </label>
                <label className="flex flex-1 items-center gap-2 text-sm text-tp-ink">
                  <span className="font-semibold">Text</span>
                  <input
                    type="text"
                    value={customText}
                    maxLength={MAX_TEXT}
                    onChange={(e) => setCustomText(e.target.value.slice(0, MAX_TEXT))}
                    className="min-w-0 flex-1 rounded-tp-button border border-tp-line bg-white px-3 py-2 text-sm text-tp-ink focus:border-tp-bronze-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink/40"
                  />
                  <span className="text-xs text-tp-muted">
                    {customText.length}/{MAX_TEXT}
                  </span>
                </label>
              </div>
            )}
          </fieldset>

          <div>
            <label
              htmlFor="otw-thickness"
              className="mb-2 flex items-center justify-between text-sm font-semibold text-tp-ink"
            >
              <span>Ring thickness</span>
              <span className="font-medium text-tp-muted">{THICKNESS_LABELS[thickness]}</span>
            </label>
            <input
              id="otw-thickness"
              type="range"
              min={0}
              max={2}
              step={1}
              value={thickness}
              onChange={(e) => setThickness(Number(e.target.value))}
              className="w-full accent-tp-bronze"
            />
            <div className="mt-1 flex justify-between text-xs text-tp-muted">
              <span>Thin</span>
              <span>Medium</span>
              <span>Thick</span>
            </div>
          </div>

          <div>
            <label
              htmlFor="otw-textsize"
              className="mb-2 flex items-center justify-between text-sm font-semibold text-tp-ink"
            >
              <span>Text size</span>
              <span className="font-medium text-tp-muted">{textSize}%</span>
            </label>
            <input
              id="otw-textsize"
              type="range"
              min={0}
              max={100}
              step={5}
              value={textSize}
              disabled={!showText}
              onChange={(e) => setTextSize(Number(e.target.value))}
              className="w-full accent-tp-bronze disabled:opacity-50"
            />
          </div>

          <button
            type="button"
            aria-pressed={showText}
            onClick={() => setShowText((v) => !v)}
            className="flex w-full items-center justify-between rounded-tp-button border border-tp-line bg-white px-4 py-3 text-sm font-semibold text-tp-ink transition-colors hover:border-tp-bronze focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
          >
            <span>Show text on the ring</span>
            <span className="inline-flex items-center gap-2 font-medium text-tp-muted">
              {showText ? <Eye className="h-4 w-4" aria-hidden="true" /> : <EyeOff className="h-4 w-4" aria-hidden="true" />}
              {showText ? 'Visible' : 'Hidden'}
            </span>
          </button>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleDownload}
              disabled={!hasImage}
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-5 py-3 text-sm font-semibold text-tp-black transition-colors hover:bg-tp-bronze/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download PNG
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={!hasImage}
              className="inline-flex items-center gap-2 rounded-tp-button border border-tp-line bg-white px-5 py-3 text-sm font-semibold text-tp-ink transition-colors hover:border-tp-bronze focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Start over
            </button>
          </div>

          <p className="flex items-start gap-2 text-sm text-tp-muted">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
            Everything runs in your browser. Nothing is uploaded.
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-start gap-4 rounded-tp-card border border-tp-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tp-button bg-tp-beige/40 text-tp-bronze-ink">
            <Camera className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-xl font-normal text-tp-ink">Start with a better photo</h3>
            <p className="mt-1 text-sm text-tp-muted">
              A frame works best on a strong headshot. TailorPic creates studio-style AI headshots from your selfies, from {BASE_PRICE_DISPLAY}.
            </p>
          </div>
        </div>
        <Link
          href={ctaHref}
          className="inline-flex shrink-0 items-center rounded-tp-button bg-tp-ink px-5 py-3 text-sm font-semibold text-tp-paper transition-colors hover:bg-tp-black focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
        >
          Try TailorPic
        </Link>
      </div>
    </div>
  );
}
