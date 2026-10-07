'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Download, ImagePlus, Lock, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Preset {
  id: string;
  label: string;
  width: number;
  height: number;
}

const PRESETS: Preset[] = [
  { id: 'linkedin', label: 'LinkedIn', width: 400, height: 400 },
  { id: 'instagram', label: 'Instagram', width: 320, height: 320 },
  { id: 'twitter', label: 'Twitter/X', width: 400, height: 400 },
  { id: 'facebook', label: 'Facebook', width: 170, height: 170 },
  { id: 'slack', label: 'Slack', width: 512, height: 512 },
  { id: 'zoom', label: 'Zoom', width: 150, height: 150 },
  { id: 'teams', label: 'Teams', width: 300, height: 300 },
];

type BgMode = 'white' | 'black' | 'transparent' | 'custom';

const MIN_DIM = 16;
const MAX_DIM = 2048;

function clampDim(value: number): number {
  if (!Number.isFinite(value)) return MIN_DIM;
  return Math.min(MAX_DIM, Math.max(MIN_DIM, Math.round(value)));
}

const chipBase =
  'rounded-tp-button border px-3.5 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze';
const chipOn = 'border-tp-ink bg-tp-ink text-white';
const chipOff = 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze';

export function PfpMaker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const dragRef = useRef<{ x: number; y: number } | null>(null);

  const [hasImage, setHasImage] = useState(false);
  const [fileName, setFileName] = useState('profile-picture');
  const [presetId, setPresetId] = useState<string>('linkedin');
  const [customW, setCustomW] = useState('400');
  const [customH, setCustomH] = useState('400');
  const [circular, setCircular] = useState(true);
  const [bgMode, setBgMode] = useState<BgMode>('white');
  const [customColor, setCustomColor] = useState('#e8dfd2');
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [error, setError] = useState<string | null>(null);

  const preset = PRESETS.find((p) => p.id === presetId);
  const width = preset ? preset.width : clampDim(Number(customW));
  const height = preset ? preset.height : clampDim(Number(customH));

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    if (circular) {
      ctx.beginPath();
      ctx.ellipse(width / 2, height / 2, width / 2, height / 2, 0, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
    }
    if (bgMode !== 'transparent') {
      ctx.fillStyle = bgMode === 'white' ? '#ffffff' : bgMode === 'black' ? '#000000' : customColor;
      ctx.fillRect(0, 0, width, height);
    }
    const img = imgRef.current;
    if (img) {
      // Base scale fills the frame; zoom adjusts from there.
      const base = Math.max(width / img.naturalWidth, height / img.naturalHeight);
      const scale = base * zoom;
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (width - dw) / 2 + offset.x, (height - dh) / 2 + offset.y, dw, dh);
    }
    ctx.restore();
  }, [width, height, circular, bgMode, customColor, zoom, offset, hasImage]);

  useEffect(() => {
    draw();
  }, [draw]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file (JPG, PNG, WebP).');
      return;
    }
    setError(null);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setFileName(file.name.replace(/\.[^.]+$/, '') || 'profile-picture');
      setZoom(1);
      setOffset({ x: 0, y: 0 });
      setHasImage(true);
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      setError('That image could not be read. Try a different file.');
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!hasImage) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const last = dragRef.current;
    if (!last) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const dx = ((e.clientX - last.x) * width) / rect.width;
    const dy = ((e.clientY - last.y) * height) / rect.height;
    dragRef.current = { x: e.clientX, y: e.clientY };
    setOffset((o) => ({ x: o.x + dx, y: o.y + dy }));
  };

  const endDrag = () => {
    dragRef.current = null;
  };

  const reset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasImage) return;
    canvas.toBlob((blob) => {
      if (!blob) {
        setError('Could not export the image. Please try again.');
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}-${width}x${height}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  };

  const checker =
    bgMode === 'transparent'
      ? {
          backgroundImage:
            'linear-gradient(45deg, #e5e0d8 25%, transparent 25%), linear-gradient(-45deg, #e5e0d8 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e0d8 75%), linear-gradient(-45deg, transparent 75%, #e5e0d8 75%)',
          backgroundSize: '16px 16px',
          backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0',
          backgroundColor: '#ffffff',
        }
      : undefined;

  const aspect = width / height;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Preview */}
        <div>
          <div
            className="flex items-center justify-center rounded-tp-card border border-tp-line bg-tp-paper p-4"
            style={{ minHeight: 280 }}
          >
            <div
              className={cn(
                'relative w-full overflow-hidden',
                circular ? 'rounded-full' : 'rounded-tp-button',
              )}
              style={{
                maxWidth: aspect >= 1 ? 420 : Math.round(420 * aspect),
                aspectRatio: `${width} / ${height}`,
                ...checker,
              }}
            >
              <canvas
                ref={canvasRef}
                width={width}
                height={height}
                aria-label="Profile picture preview. Drag to reposition."
                className={cn('block h-full w-full', hasImage ? 'cursor-grab active:cursor-grabbing' : '')}
                style={{ touchAction: 'none' }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
              />
              {!hasImage && (
                <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-sm text-tp-muted">
                  Choose a photo to see your preview
                </div>
              )}
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-tp-muted">
            Output: {width} × {height} px PNG{hasImage ? ' · drag the image to reposition' : ''}
          </p>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label
              htmlFor="pfp-file"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-tp-button border border-dashed border-tp-bronze bg-tp-paper px-4 py-4 text-sm font-semibold text-tp-ink transition-colors hover:bg-tp-beige focus-within:ring-2 focus-within:ring-tp-bronze"
            >
              <ImagePlus className="h-4 w-4" aria-hidden="true" />
              {hasImage ? 'Choose a different photo' : 'Choose a photo from your device'}
              <input id="pfp-file" type="file" accept="image/*" onChange={handleFile} className="sr-only" />
            </label>
            {error && (
              <p role="alert" className="mt-2 text-sm text-[#B5523B]">
                {error}
              </p>
            )}
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-tp-ink">Platform size</legend>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={presetId === p.id}
                  onClick={() => setPresetId(p.id)}
                  className={cn(chipBase, presetId === p.id ? chipOn : chipOff)}
                >
                  {p.label}
                  <span className="ml-1.5 text-xs font-medium opacity-70">
                    {p.width}×{p.height}
                  </span>
                </button>
              ))}
              <button
                type="button"
                aria-pressed={presetId === 'custom'}
                onClick={() => setPresetId('custom')}
                className={cn(chipBase, presetId === 'custom' ? chipOn : chipOff)}
              >
                Custom
              </button>
            </div>
            {presetId === 'custom' && (
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="number"
                  inputMode="numeric"
                  min={MIN_DIM}
                  max={MAX_DIM}
                  value={customW}
                  onChange={(e) => setCustomW(e.target.value)}
                  aria-label="Custom width in pixels"
                  className="w-24 rounded-tp-button border border-tp-line bg-white px-3 py-2 text-sm text-tp-ink focus:border-tp-bronze-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink/40"
                />
                <span className="text-tp-muted" aria-hidden="true">
                  ×
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={MIN_DIM}
                  max={MAX_DIM}
                  value={customH}
                  onChange={(e) => setCustomH(e.target.value)}
                  aria-label="Custom height in pixels"
                  className="w-24 rounded-tp-button border border-tp-line bg-white px-3 py-2 text-sm text-tp-ink focus:border-tp-bronze-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink/40"
                />
                <span className="text-xs text-tp-muted">px ({MIN_DIM}–{MAX_DIM})</span>
              </div>
            )}
          </fieldset>

          <div>
            <label htmlFor="pfp-zoom" className="mb-2 flex items-center justify-between text-sm font-semibold text-tp-ink">
              <span>Zoom</span>
              <span className="font-medium text-tp-muted">{zoom.toFixed(2)}×</span>
            </label>
            <input
              id="pfp-zoom"
              type="range"
              min={0.5}
              max={3}
              step={0.05}
              value={zoom}
              disabled={!hasImage}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-tp-bronze disabled:opacity-50"
            />
          </div>

          <div className="flex items-center justify-between rounded-tp-button border border-tp-line px-4 py-3">
            <label htmlFor="pfp-circle" className="text-sm font-semibold text-tp-ink">
              Circular crop
            </label>
            <input
              id="pfp-circle"
              type="checkbox"
              role="switch"
              checked={circular}
              onChange={(e) => setCircular(e.target.checked)}
              className="h-5 w-5 accent-tp-bronze"
            />
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-tp-ink">Background</legend>
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  ['white', 'White'],
                  ['black', 'Black'],
                  ['transparent', 'Transparent'],
                  ['custom', 'Custom'],
                ] as [BgMode, string][]
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={bgMode === id}
                  onClick={() => setBgMode(id)}
                  className={cn(chipBase, bgMode === id ? chipOn : chipOff)}
                >
                  {label}
                </button>
              ))}
              {bgMode === 'custom' && (
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  aria-label="Custom background color"
                  className="h-10 w-12 cursor-pointer rounded-tp-button border border-tp-line bg-white p-1"
                />
              )}
            </div>
            <p className="mt-2 text-xs text-tp-muted">Shown wherever the photo does not fill the frame.</p>
          </fieldset>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={download}
              disabled={!hasImage}
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-5 py-3 text-sm font-semibold text-tp-black transition-colors hover:bg-tp-bronze/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download PNG
            </button>
            <button
              type="button"
              onClick={reset}
              disabled={!hasImage}
              className="inline-flex items-center gap-2 rounded-tp-button border border-tp-line bg-white px-5 py-3 text-sm font-semibold text-tp-ink transition-colors hover:border-tp-bronze focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset position
            </button>
          </div>

          <p className="flex items-start gap-2 text-sm text-tp-muted">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
            All processing happens in your browser — your photo never leaves your device.
          </p>
        </div>
      </div>
    </div>
  );
}
