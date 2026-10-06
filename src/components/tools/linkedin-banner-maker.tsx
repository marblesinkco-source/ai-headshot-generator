'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Upload, Download, ShieldCheck, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const W = 1584;
const H = 396;
const MAX_PHOTO_BYTES = 15 * 1024 * 1024;
const FONT_STACK = 'Manrope, system-ui, -apple-system, "Segoe UI", sans-serif';

type TemplateId = 'minimal' | 'gradient' | 'professional' | 'bold' | 'split' | 'clean' | 'spotlight';
type Align = 'left' | 'center' | 'right';
type PhotoSide = 'none' | 'left' | 'right';

const TEMPLATES: { id: TemplateId; label: string; hint: string }[] = [
  { id: 'minimal', label: 'Minimal', hint: 'Solid color' },
  { id: 'gradient', label: 'Gradient', hint: 'Two-tone blend' },
  { id: 'professional', label: 'Professional', hint: 'Subtle pattern' },
  { id: 'bold', label: 'Bold', hint: 'Color block' },
  { id: 'split', label: 'Split', hint: 'Two panels' },
  { id: 'clean', label: 'Clean', hint: 'Accent lines' },
  { id: 'spotlight', label: 'Spotlight', hint: 'Soft glow' },
];

const SWATCHES = [
  { name: 'Navy', hex: '#1B2A4A' },
  { name: 'Charcoal', hex: '#2D2D2D' },
  { name: 'Forest', hex: '#1B4332' },
  { name: 'Burgundy', hex: '#4A1B2C' },
  { name: 'Ocean', hex: '#164E63' },
  { name: 'Slate', hex: '#334155' },
];

const LIGHT_TEXT = '#FFFFFF';
const DARK_TEXT = '#1A1A1A';
const PAPER = '#F7F4EE';

/* ---------- color helpers ---------- */

function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  const v = m ? m[1] : '1B2A4A';
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  const c = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`;
}

/** Mix a color toward white (amount > 0) or black (amount < 0). */
function shade(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const target = amount >= 0 ? 255 : 0;
  const t = Math.abs(amount);
  return rgbToHex(r + (target - r) * t, g + (target - g) * t, b + (target - b) * t);
}

function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function textOn(bg: string): string {
  return luminance(bg) > 0.4 ? DARK_TEXT : LIGHT_TEXT;
}

/* ---------- drawing ---------- */

interface Settings {
  template: TemplateId;
  color: string;
  name: string;
  tagline: string;
  nameSize: number;
  taglineSize: number;
  align: Align;
  photoSide: PhotoSide;
  keepProfileClear: boolean;
}

/** Draws the template background and returns the color the text sits on. */
function drawBackground(ctx: CanvasRenderingContext2D, s: Settings, textRegion: { x0: number; x1: number }): string {
  const c = s.color;
  switch (s.template) {
    case 'gradient': {
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, shade(c, -0.25));
      g.addColorStop(1, shade(c, 0.28));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      return shade(c, 0.02);
    }
    case 'professional': {
      ctx.fillStyle = c;
      ctx.fillRect(0, 0, W, H);
      ctx.save();
      ctx.strokeStyle = luminance(c) > 0.4 ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)';
      ctx.lineWidth = 2;
      for (let x = -H; x < W + H; x += 36) {
        ctx.beginPath();
        ctx.moveTo(x, H);
        ctx.lineTo(x + H, 0);
        ctx.stroke();
      }
      ctx.restore();
      return c;
    }
    case 'bold': {
      ctx.fillStyle = shade(c, -0.12);
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = c;
      ctx.fillRect(0, 36, W, H - 72);
      return c;
    }
    case 'split': {
      const splitX = Math.round(W * 0.34);
      ctx.fillStyle = c;
      ctx.fillRect(0, 0, splitX, H);
      const right = shade(c, 0.88);
      ctx.fillStyle = right;
      ctx.fillRect(splitX, 0, W - splitX, H);
      // Text sits on the light panel when it lives in the right area.
      return textRegion.x0 >= splitX - 1 ? right : textRegion.x1 <= splitX ? c : right;
    }
    case 'clean': {
      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = c;
      ctx.fillRect(0, 0, W, 14);
      ctx.fillRect(0, H - 14, W, 14);
      return PAPER;
    }
    case 'spotlight': {
      ctx.fillStyle = shade(c, -0.3);
      ctx.fillRect(0, 0, W, H);
      const g = ctx.createRadialGradient(W / 2, H / 2, 20, W / 2, H / 2, W * 0.55);
      g.addColorStop(0, shade(c, 0.1));
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      return shade(c, -0.05);
    }
    case 'minimal':
    default:
      ctx.fillStyle = c;
      ctx.fillRect(0, 0, W, H);
      return c;
  }
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width <= maxWidth || !line) {
      line = test;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    let last = kept[maxLines - 1];
    while (last.length > 1 && ctx.measureText(`${last}…`).width > maxWidth) last = last.slice(0, -1);
    kept[maxLines - 1] = `${last.trimEnd()}…`;
    return kept;
  }
  return lines;
}

function drawBanner(canvas: HTMLCanvasElement, s: Settings, photo: HTMLImageElement | null) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const pad = 80;
  const photoD = 252;
  const hasPhoto = !!photo && s.photoSide !== 'none';

  // Text region
  let x0 = pad;
  let x1 = W - pad;
  if (hasPhoto && s.photoSide === 'left') x0 = pad + photoD + 64;
  else if (hasPhoto && s.photoSide === 'right') x1 = W - pad - photoD - 64;
  else if (s.keepProfileClear && s.align === 'left') x0 = 400;
  else if (s.keepProfileClear && s.align === 'center') {
    x0 = 400;
    x1 = W - 120;
  }
  if (s.template === 'split' && !hasPhoto) {
    x0 = Math.max(x0, Math.round(W * 0.34) + 60);
  }

  const bg = drawBackground(ctx, s, { x0, x1 });
  const fg = textOn(bg);

  // Template accents
  if (s.template === 'clean') {
    // already drawn in background
  }

  // Photo
  if (hasPhoto && photo) {
    const cx = s.photoSide === 'left' ? pad + photoD / 2 : W - pad - photoD / 2;
    const cy = H / 2;
    const r = photoD / 2;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    const side = Math.min(photo.naturalWidth, photo.naturalHeight);
    const sx = (photo.naturalWidth - side) / 2;
    const sy = (photo.naturalHeight - side) / 2;
    ctx.drawImage(photo, sx, sy, side, side, cx - r, cy - r, photoD, photoD);
    ctx.restore();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.lineWidth = 6;
    ctx.strokeStyle = fg === LIGHT_TEXT ? 'rgba(255,255,255,0.9)' : s.color;
    ctx.stroke();
  }

  // Text
  const name = s.name.trim();
  const tagline = s.tagline.trim();
  if (!name && !tagline) return;

  const maxW = x1 - x0;
  const anchorX = s.align === 'left' ? x0 : s.align === 'right' ? x1 : (x0 + x1) / 2;
  ctx.textAlign = s.align;
  ctx.textBaseline = 'alphabetic';

  // Name: shrink to fit one line (never below 60% of chosen size)
  let nameFont = s.nameSize;
  ctx.font = `700 ${nameFont}px ${FONT_STACK}`;
  if (name) {
    while (ctx.measureText(name).width > maxW && nameFont > s.nameSize * 0.6) {
      nameFont -= 2;
      ctx.font = `700 ${nameFont}px ${FONT_STACK}`;
    }
  }

  ctx.font = `500 ${s.taglineSize}px ${FONT_STACK}`;
  const tagLines = tagline ? wrapLines(ctx, tagline, maxW, 2) : [];
  const tagLeading = Math.round(s.taglineSize * 1.35);
  const gap = name && tagLines.length ? Math.round(s.taglineSize * 0.6) : 0;

  const nameBlock = name ? nameFont : 0;
  const tagBlock = tagLines.length ? tagLeading * tagLines.length - (tagLeading - s.taglineSize) : 0;
  const total = nameBlock + gap + tagBlock;
  let y = (H - total) / 2;

  if (name) {
    y += nameFont * 0.82; // baseline approx
    ctx.font = `700 ${nameFont}px ${FONT_STACK}`;
    ctx.fillStyle = fg;
    ctx.fillText(name, anchorX, y, maxW);
    y += nameFont * 0.18 + gap;
  }
  if (tagLines.length) {
    ctx.font = `500 ${s.taglineSize}px ${FONT_STACK}`;
    ctx.fillStyle = fg;
    ctx.globalAlpha = 0.86;
    tagLines.forEach((ln, i) => {
      ctx.fillText(ln, anchorX, y + s.taglineSize * 0.85 + i * tagLeading, maxW);
    });
    ctx.globalAlpha = 1;
  }
}

/* ---------- component ---------- */

export default function LinkedInBannerMaker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [template, setTemplate] = useState<TemplateId>('minimal');
  const [color, setColor] = useState('#1B2A4A');
  const [name, setName] = useState('Your Name');
  const [tagline, setTagline] = useState('Product Designer · Building clear, useful things');
  const [nameSize, setNameSize] = useState(56);
  const [taglineSize, setTaglineSize] = useState(26);
  const [align, setAlign] = useState<Align>('left');
  const [photoSide, setPhotoSide] = useState<PhotoSide>('right');
  const [keepProfileClear, setKeepProfileClear] = useState(true);
  const [photo, setPhoto] = useState<HTMLImageElement | null>(null);
  const [photoName, setPhotoName] = useState('');
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const [fontTick, setFontTick] = useState(0);

  const settings = useMemo<Settings>(
    () => ({ template, color, name, tagline, nameSize, taglineSize, align, photoSide, keepProfileClear }),
    [template, color, name, tagline, nameSize, taglineSize, align, photoSide, keepProfileClear],
  );

  // Re-render once web fonts are ready so text uses Manrope when available.
  useEffect(() => {
    let cancelled = false;
    try {
      document.fonts?.ready.then(() => {
        if (!cancelled) setFontTick((n) => n + 1);
      });
    } catch {
      /* fonts API unavailable */
    }
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) drawBanner(canvas, settings, photo);
  }, [settings, photo, fontTick]);

  const handleFile = useCallback((file: File | undefined | null) => {
    if (!file) return;
    setError('');
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file (JPG, PNG or WebP).');
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setError('That photo is over 15MB. Please choose a smaller one.');
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      setPhoto(img);
      setPhotoName(file.name);
      setPhotoSide((side) => (side === 'none' ? 'right' : side));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setError('We could not read that image. Try a JPG or PNG.');
    };
    img.src = url;
  }, []);

  const removePhoto = () => {
    setPhoto(null);
    setPhotoName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawBanner(canvas, settings, photo);
    canvas.toBlob((blob) => {
      if (!blob) {
        setError('Download failed. Please try again.');
        return;
      }
      const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      const a = document.createElement('a');
      const href = URL.createObjectURL(blob);
      a.href = href;
      a.download = `${slug || 'linkedin'}-banner-1584x396.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(href), 1000);
    }, 'image/png');
  };

  const isPreset = SWATCHES.some((sw) => sw.hex.toLowerCase() === color.toLowerCase());

  const segBtn = (active: boolean) =>
    cn(
      'flex-1 rounded-tp-button border px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
      active
        ? 'border-tp-ink bg-tp-ink text-tp-paper'
        : 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze',
    );

  const labelCls = 'mb-2 block text-sm font-semibold text-tp-ink';
  const inputCls =
    'w-full rounded-tp-button border border-tp-line bg-white px-3 py-2.5 text-sm text-tp-ink placeholder:text-tp-muted focus:border-tp-bronze focus:outline-none focus:ring-2 focus:ring-tp-bronze/40';

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      {/* Preview */}
      <div className="rounded-tp-card border border-tp-line bg-white p-3 sm:p-5">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          role="img"
          aria-label="LinkedIn banner preview"
          className="block h-auto w-full rounded-tp-button border border-tp-line"
        />
        <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-xs text-tp-muted">
            Output: {W} × {H} px PNG. LinkedIn covers the lower-left corner with your profile photo on desktop.
          </p>
          <button
            type="button"
            onClick={download}
            className="inline-flex items-center justify-center gap-2 rounded-tp-button bg-tp-ink px-5 py-3 text-sm font-semibold text-tp-paper transition-colors hover:bg-tp-black focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download PNG
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-tp-button border border-tp-line bg-white px-4 py-3 text-sm text-tp-bronze-ink">
          {error}
        </p>
      )}

      {/* Controls */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-6 rounded-tp-card border border-tp-line bg-white p-5 sm:p-6">
          <div>
            <label htmlFor="banner-name" className={labelCls}>
              Name
            </label>
            <input
              id="banner-name"
              type="text"
              value={name}
              maxLength={60}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="banner-tagline" className={labelCls}>
              Title or tagline <span className="font-normal text-tp-muted">(optional)</span>
            </label>
            <input
              id="banner-tagline"
              type="text"
              value={tagline}
              maxLength={120}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="What you do, in a line"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="banner-name-size" className={labelCls}>
              Name size: {nameSize}px
            </label>
            <input
              id="banner-name-size"
              type="range"
              min={36}
              max={72}
              value={nameSize}
              onChange={(e) => setNameSize(Number(e.target.value))}
              className="w-full accent-tp-bronze"
            />
          </div>
          <div>
            <label htmlFor="banner-tagline-size" className={labelCls}>
              Tagline size: {taglineSize}px
            </label>
            <input
              id="banner-tagline-size"
              type="range"
              min={18}
              max={36}
              value={taglineSize}
              onChange={(e) => setTaglineSize(Number(e.target.value))}
              className="w-full accent-tp-bronze"
            />
          </div>
          <div>
            <span className={labelCls} id="align-label">
              Text position
            </span>
            <div className="flex gap-2" role="group" aria-labelledby="align-label">
              {(['left', 'center', 'right'] as Align[]).map((a) => (
                <button
                  key={a}
                  type="button"
                  aria-pressed={align === a}
                  onClick={() => setAlign(a)}
                  className={segBtn(align === a)}
                >
                  {a === 'left' ? 'Left' : a === 'center' ? 'Center' : 'Right'}
                </button>
              ))}
            </div>
            <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-tp-muted">
              <input
                type="checkbox"
                checked={keepProfileClear}
                onChange={(e) => setKeepProfileClear(e.target.checked)}
                className="h-4 w-4 rounded accent-tp-bronze"
              />
              Keep text clear of the LinkedIn profile photo area
            </label>
          </div>
        </div>

        <div className="space-y-6 rounded-tp-card border border-tp-line bg-white p-5 sm:p-6">
          <div>
            <span className={labelCls} id="template-label">
              Template
            </span>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" role="group" aria-labelledby="template-label">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={template === t.id}
                  onClick={() => setTemplate(t.id)}
                  className={cn(
                    'rounded-tp-button border px-3 py-2.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
                    template === t.id
                      ? 'border-tp-ink bg-tp-ink text-tp-paper'
                      : 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze',
                  )}
                >
                  <span className="block text-sm font-semibold">{t.label}</span>
                  <span className={cn('block text-xs', template === t.id ? 'text-tp-beige' : 'text-tp-muted')}>{t.hint}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className={labelCls} id="color-label">
              Primary color
            </span>
            <div className="flex flex-wrap items-center gap-2" role="group" aria-labelledby="color-label">
              {SWATCHES.map((sw) => (
                <button
                  key={sw.hex}
                  type="button"
                  title={sw.name}
                  aria-label={`${sw.name} ${sw.hex}`}
                  aria-pressed={color.toLowerCase() === sw.hex.toLowerCase()}
                  onClick={() => setColor(sw.hex)}
                  style={{ backgroundColor: sw.hex }}
                  className={cn(
                    'h-9 w-9 rounded-full border-2 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2',
                    color.toLowerCase() === sw.hex.toLowerCase() ? 'scale-110 border-tp-bronze' : 'border-tp-line',
                  )}
                />
              ))}
              <label
                className={cn(
                  'relative flex h-9 cursor-pointer items-center gap-2 rounded-full border-2 bg-white pl-1 pr-3 text-xs font-medium text-tp-ink focus-within:ring-2 focus-within:ring-tp-bronze',
                  !isPreset ? 'border-tp-bronze' : 'border-tp-line',
                )}
              >
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value.toUpperCase())}
                  aria-label="Custom color"
                  className="h-7 w-7 cursor-pointer rounded-full border-0 bg-transparent p-0"
                />
                Custom
              </label>
            </div>
            <p className="mt-2 text-xs text-tp-muted">Text switches between white and dark automatically so it stays readable.</p>
          </div>

          <div>
            <span className={labelCls} id="photo-label">
              Headshot <span className="font-normal text-tp-muted">(optional)</span>
            </span>
            <div
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
                'rounded-tp-card border-2 border-dashed p-4 text-center transition-colors',
                dragging ? 'border-tp-bronze bg-tp-beige/40' : 'border-tp-line bg-tp-paper',
              )}
            >
              <input
                ref={fileInputRef}
                id="banner-photo"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              <label
                htmlFor="banner-photo"
                className="inline-flex cursor-pointer items-center gap-2 rounded-tp-button border border-tp-line bg-white px-4 py-2 text-sm font-semibold text-tp-ink hover:border-tp-bronze focus-within:ring-2"
              >
                <Upload className="h-4 w-4" aria-hidden="true" />
                {photo ? 'Replace photo' : 'Choose a photo'}
              </label>
              <p className="mt-2 text-xs text-tp-muted">or drag and drop an image here</p>
              {photo && (
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-tp-ink">
                  <span className="max-w-[14rem] truncate">{photoName}</span>
                  <button
                    type="button"
                    onClick={removePhoto}
                    aria-label="Remove photo"
                    className="rounded-full border border-tp-line bg-white p-1 text-tp-muted hover:text-tp-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
            {photo && (
              <div className="mt-3 flex gap-2" role="group" aria-label="Photo position">
                {(['left', 'right', 'none'] as PhotoSide[]).map((side) => (
                  <button
                    key={side}
                    type="button"
                    aria-pressed={photoSide === side}
                    onClick={() => setPhotoSide(side)}
                    className={segBtn(photoSide === side)}
                  >
                    {side === 'left' ? 'Photo left' : side === 'right' ? 'Photo right' : 'Hide'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="mt-6 flex items-start justify-center gap-2 text-center text-sm text-tp-muted">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
        <span>Everything happens in your browser. Your photo and text are never uploaded to a server.</span>
      </p>
    </div>
  );
}
