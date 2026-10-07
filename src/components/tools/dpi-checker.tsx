'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FileImage, Info, Printer, RotateCcw, ShieldCheck, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

const MAX_BYTES = 15 * 1024 * 1024;
const DEFAULT_DPI = 300;
const CM_PER_INCH = 2.54;

interface EmbeddedDpi {
  x: number;
  y: number;
  source: 'JFIF' | 'EXIF' | 'PNG pHYs';
}

interface ImageInfo {
  name: string;
  bytes: number;
  width: number;
  height: number;
  embedded: EmbeddedDpi | null;
  previewUrl: string;
}

type Quality = 'excellent' | 'good' | 'low';

const PRINT_SIZES = [
  { label: 'Wallet', w: 2.5, h: 3.5 },
  { label: '4 x 6 in', w: 4, h: 6 },
  { label: '5 x 7 in', w: 5, h: 7 },
  { label: '8 x 10 in', w: 8, h: 10 },
  { label: '11 x 14 in', w: 11, h: 14 },
  { label: '16 x 20 in', w: 16, h: 20 },
];

const QUALITY_META: Record<Quality, { label: string; badge: string; dot: string }> = {
  excellent: {
    label: 'Excellent for print',
    badge: 'border-tp-success/30 bg-tp-success/10 text-tp-success',
    dot: 'bg-tp-success',
  },
  good: {
    label: 'Good for web, acceptable for print',
    badge: 'border-tp-warning/30 bg-tp-warning/10 text-tp-bronze-ink',
    dot: 'bg-tp-warning',
  },
  low: {
    label: 'Low resolution — best for screen only',
    badge: 'border-tp-error/30 bg-tp-error/10 text-tp-error',
    dot: 'bg-tp-error',
  },
};

const SHORT_QUALITY: Record<Quality, string> = {
  excellent: 'Excellent',
  good: 'Acceptable',
  low: 'Low',
};

function qualityFor(dpi: number): Quality {
  if (dpi >= 300) return 'excellent';
  if (dpi >= 150) return 'good';
  return 'low';
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function aspectRatio(w: number, h: number): string {
  if (!w || !h) return '-';
  const d = gcd(w, h);
  const rw = w / d;
  const rh = h / d;
  if (rw <= 20 && rh <= 20) return `${rw}:${rh}`;
  const ratio = w / h;
  return ratio >= 1 ? `${ratio.toFixed(2)}:1` : `1:${(1 / ratio).toFixed(2)}`;
}

function formatBytes(n: number): string {
  if (n >= 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(2)} MB`;
  return `${(n / 1024).toFixed(1)} KB`;
}

function round1(n: number): string {
  return (Math.round(n * 10) / 10).toString();
}

/* ---------- Hand-written header parsers (ArrayBuffer / DataView) ---------- */

function readAscii(view: DataView, offset: number, length: number): string {
  let s = '';
  for (let i = 0; i < length && offset + i < view.byteLength; i++) {
    s += String.fromCharCode(view.getUint8(offset + i));
  }
  return s;
}

function parseExifDpi(view: DataView, tiffStart: number, segEnd: number): { x: number; y: number } | null {
  if (tiffStart + 8 > segEnd) return null;
  const order = view.getUint16(tiffStart, false);
  let little: boolean;
  if (order === 0x4949) little = true;
  else if (order === 0x4d4d) little = false;
  else return null;
  if (view.getUint16(tiffStart + 2, little) !== 0x002a) return null;

  const ifdOffset = view.getUint32(tiffStart + 4, little);
  const ifd = tiffStart + ifdOffset;
  if (ifd + 2 > segEnd) return null;
  const count = view.getUint16(ifd, little);

  let xRes: number | null = null;
  let yRes: number | null = null;
  let unit = 2; // default: inches

  const readRational = (valueOffset: number): number | null => {
    const pos = tiffStart + valueOffset;
    if (pos + 8 > view.byteLength) return null;
    const num = view.getUint32(pos, little);
    const den = view.getUint32(pos + 4, little);
    return den === 0 ? null : num / den;
  };

  for (let i = 0; i < count; i++) {
    const entry = ifd + 2 + i * 12;
    if (entry + 12 > segEnd) break;
    const tag = view.getUint16(entry, little);
    const type = view.getUint16(entry + 2, little);
    if (tag === 0x011a && type === 5) {
      xRes = readRational(view.getUint32(entry + 8, little));
    } else if (tag === 0x011b && type === 5) {
      yRes = readRational(view.getUint32(entry + 8, little));
    } else if (tag === 0x0128 && type === 3) {
      unit = view.getUint16(entry + 8, little);
    }
  }

  if (!xRes || !yRes || xRes <= 0 || yRes <= 0) return null;
  if (unit === 3) {
    xRes *= CM_PER_INCH;
    yRes *= CM_PER_INCH;
  } else if (unit !== 2) {
    return null;
  }
  return { x: xRes, y: yRes };
}

function parseJpegDpi(view: DataView): EmbeddedDpi | null {
  if (view.byteLength < 4 || view.getUint16(0, false) !== 0xffd8) return null;
  let jfif: EmbeddedDpi | null = null;
  let exif: EmbeddedDpi | null = null;
  let offset = 2;

  while (offset + 4 <= view.byteLength) {
    if (view.getUint8(offset) !== 0xff) break;
    const marker = view.getUint8(offset + 1);
    if (marker === 0xff) {
      offset += 1; // fill byte
      continue;
    }
    if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd7) || marker === 0x01) {
      offset += 2;
      continue;
    }
    if (marker === 0xd9 || marker === 0xda) break; // EOI / start of scan
    const length = view.getUint16(offset + 2, false);
    if (length < 2) break;
    const dataStart = offset + 4;
    const segEnd = Math.min(offset + 2 + length, view.byteLength);

    if (marker === 0xe0 && !jfif && readAscii(view, dataStart, 5) === 'JFIF\0' && dataStart + 12 <= segEnd) {
      const units = view.getUint8(dataStart + 7);
      const xd = view.getUint16(dataStart + 8, false);
      const yd = view.getUint16(dataStart + 10, false);
      if (xd > 0 && yd > 0) {
        if (units === 1) jfif = { x: xd, y: yd, source: 'JFIF' };
        else if (units === 2) jfif = { x: xd * CM_PER_INCH, y: yd * CM_PER_INCH, source: 'JFIF' };
        // units === 0: only an aspect ratio, not a real density
      }
    } else if (marker === 0xe1 && !exif && readAscii(view, dataStart, 6) === 'Exif\0\0') {
      const res = parseExifDpi(view, dataStart + 6, segEnd);
      if (res) exif = { x: res.x, y: res.y, source: 'EXIF' };
    }

    offset += 2 + length;
  }

  return jfif ?? exif;
}

function parsePngDpi(view: DataView): EmbeddedDpi | null {
  const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (view.byteLength < 8) return null;
  for (let i = 0; i < 8; i++) if (view.getUint8(i) !== sig[i]) return null;
  let offset = 8;
  while (offset + 12 <= view.byteLength) {
    const length = view.getUint32(offset, false);
    const type = readAscii(view, offset + 4, 4);
    if (type === 'pHYs' && length >= 9 && offset + 17 <= view.byteLength) {
      const px = view.getUint32(offset + 8, false);
      const py = view.getUint32(offset + 12, false);
      const unit = view.getUint8(offset + 16);
      if (unit === 1 && px > 0 && py > 0) {
        return { x: px * 0.0254, y: py * 0.0254, source: 'PNG pHYs' };
      }
      return null;
    }
    if (type === 'IDAT' || type === 'IEND') break;
    offset += 12 + length;
  }
  return null;
}

function readEmbeddedDpi(buffer: ArrayBuffer): EmbeddedDpi | null {
  try {
    const view = new DataView(buffer);
    return parseJpegDpi(view) ?? parsePngDpi(view);
  } catch {
    return null;
  }
}

function loadDimensions(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error('decode'));
    img.src = url;
  });
}

function QualityBadge({ quality }: { quality: Quality }) {
  const meta = QUALITY_META[quality];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-tp-button border px-3 py-1.5 text-sm font-semibold',
        meta.badge
      )}
    >
      <span className={cn('h-2 w-2 rounded-full', meta.dot)} aria-hidden="true" />
      {meta.label}
    </span>
  );
}

export default function DpiChecker() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<string | null>(null);
  const [info, setInfo] = useState<ImageInfo | null>(null);
  const [dpiInput, setDpiInput] = useState(String(DEFAULT_DPI));
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  const loadFile = useCallback(async (file: File | undefined | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file (JPG or PNG work best).');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('That file is larger than 15MB. Please choose a smaller image.');
      return;
    }
    setError(null);
    const url = URL.createObjectURL(file);
    try {
      const [buffer, dims] = await Promise.all([file.arrayBuffer(), loadDimensions(url)]);
      const embedded = readEmbeddedDpi(buffer);
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = url;
      setInfo({
        name: file.name,
        bytes: file.size,
        width: dims.width,
        height: dims.height,
        embedded,
        previewUrl: url,
      });
      setDpiInput(String(embedded ? Math.round(embedded.x) : DEFAULT_DPI));
    } catch {
      URL.revokeObjectURL(url);
      setError('We could not read that image. Try a different file.');
    }
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    void loadFile(e.dataTransfer.files?.[0]);
  };

  const handleReset = () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setInfo(null);
    setError(null);
    setDpiInput(String(DEFAULT_DPI));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const dpi = Number(dpiInput);
  const dpiValid = Number.isFinite(dpi) && dpi >= 1 && dpi <= 2400;

  const printW = info && dpiValid ? info.width / dpi : 0;
  const printH = info && dpiValid ? info.height / dpi : 0;

  const landscape = info ? info.width >= info.height : true;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
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
              'flex flex-col items-center justify-center gap-2 rounded-tp-card border border-dashed px-4 py-8 text-center transition-colors',
              dragging ? 'border-tp-ink bg-tp-beige' : 'border-tp-bronze bg-tp-paper hover:bg-tp-beige/60'
            )}
          >
            <Upload className="h-5 w-5 text-tp-bronze-ink" aria-hidden="true" />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-tp-button text-sm font-semibold text-tp-ink underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
            >
              {info ? 'Choose a different photo' : 'Click to upload a photo'}
            </button>
            <p className="text-xs text-tp-muted">or drag and drop an image here (max 15MB)</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              aria-label="Upload a photo to check its DPI"
              onChange={(e) => void loadFile(e.target.files?.[0])}
            />
          </div>
          {error && (
            <p role="alert" className="mt-2 text-sm font-semibold text-tp-ink">
              {error}
            </p>
          )}
          <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-tp-muted">
            <ShieldCheck className="h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
            Everything runs in your browser. Nothing is uploaded.
          </p>
        </div>

        {info && (
          <>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-tp-card border border-tp-line bg-white p-6">
                <h2 className="flex items-center gap-2 font-display text-xl font-normal text-tp-ink">
                  <FileImage className="h-5 w-5 text-tp-bronze-ink" aria-hidden="true" />
                  Photo details
                </h2>
                <div className="mt-4 flex items-start gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={info.previewUrl}
                    alt="Preview of the uploaded photo"
                    className="h-24 w-24 shrink-0 rounded-tp-button border border-tp-line bg-tp-paper object-contain"
                  />
                  <dl className="min-w-0 flex-1 space-y-2 text-sm">
                    <div className="flex justify-between gap-3">
                      <dt className="text-tp-muted">File name</dt>
                      <dd className="min-w-0 truncate font-semibold text-tp-ink" title={info.name}>
                        {info.name}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-tp-muted">File size</dt>
                      <dd className="font-semibold text-tp-ink">{formatBytes(info.bytes)}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-tp-muted">Pixels</dt>
                      <dd className="font-semibold text-tp-ink">
                        {info.width} x {info.height}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-tp-muted">Aspect ratio</dt>
                      <dd className="font-semibold text-tp-ink">{aspectRatio(info.width, info.height)}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-tp-muted">Embedded DPI</dt>
                      <dd className="font-semibold text-tp-ink">
                        {info.embedded
                          ? Math.round(info.embedded.x) === Math.round(info.embedded.y)
                            ? `${Math.round(info.embedded.x)} (${info.embedded.source})`
                            : `${Math.round(info.embedded.x)} x ${Math.round(info.embedded.y)} (${info.embedded.source})`
                          : 'Not embedded'}
                      </dd>
                    </div>
                  </dl>
                </div>
                {!info.embedded && (
                  <p className="mt-4 flex items-start gap-2 text-sm text-tp-muted">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
                    DPI not embedded in file. Screens treat such files as 72 DPI, but that number does not limit
                    print quality. Only the pixel count matters, so set a target DPI on the right.
                  </p>
                )}
              </div>

              <div className="rounded-tp-card border border-tp-line bg-white p-6">
                <h2 className="flex items-center gap-2 font-display text-xl font-normal text-tp-ink">
                  <Printer className="h-5 w-5 text-tp-bronze-ink" aria-hidden="true" />
                  Print size calculator
                </h2>
                <label htmlFor="dpi-input" className="mt-4 block text-sm font-semibold text-tp-ink">
                  Target DPI
                </label>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <input
                    id="dpi-input"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={2400}
                    value={dpiInput}
                    onChange={(e) => setDpiInput(e.target.value)}
                    className="w-28 rounded-tp-button border border-tp-line bg-white px-3 py-2 text-sm text-tp-ink focus:border-tp-bronze-ink focus:outline-none focus:ring-2 focus:ring-tp-bronze-ink/40"
                  />
                  {[72, 150, 300].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setDpiInput(String(p))}
                      className={cn(
                        'rounded-tp-button border px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
                        dpi === p ? 'border-tp-ink bg-tp-ink text-white' : 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze'
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                {dpiValid ? (
                  <div className="mt-5 space-y-3">
                    <p className="text-sm text-tp-muted">Printed at {Math.round(dpi)} DPI, this photo measures</p>
                    <p className="font-display text-3xl font-normal text-tp-ink">
                      {round1(printW)} x {round1(printH)} in
                    </p>
                    <p className="text-sm font-semibold text-tp-ink">
                      {round1(printW * CM_PER_INCH)} x {round1(printH * CM_PER_INCH)} cm
                    </p>
                    <QualityBadge quality={qualityFor(dpi)} />
                  </div>
                ) : (
                  <p role="alert" className="mt-5 text-sm font-semibold text-tp-ink">
                    Enter a DPI between 1 and 2400.
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-tp-card border border-tp-line bg-white p-6">
              <h2 className="font-display text-xl font-normal text-tp-ink">Common print sizes</h2>
              <p className="mt-1 text-sm text-tp-muted">
                The DPI you would get printing this photo at each size, without upscaling.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[420px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-tp-line text-tp-muted">
                      <th scope="col" className="py-2 pr-4 font-semibold">Print size</th>
                      <th scope="col" className="py-2 pr-4 font-semibold">Resulting DPI</th>
                      <th scope="col" className="py-2 font-semibold">Quality</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PRINT_SIZES.map((s) => {
                      const pw = landscape ? Math.max(s.w, s.h) : Math.min(s.w, s.h);
                      const ph = landscape ? Math.min(s.w, s.h) : Math.max(s.w, s.h);
                      const effective = Math.min(info.width / pw, info.height / ph);
                      const q = qualityFor(effective);
                      return (
                        <tr key={s.label} className="border-b border-tp-line last:border-0">
                          <th scope="row" className="py-3 pr-4 font-semibold text-tp-ink">
                            {s.label}
                            {s.label === 'Wallet' && <span className="font-normal text-tp-muted"> (2.5 x 3.5 in)</span>}
                          </th>
                          <td className="py-3 pr-4 text-tp-ink">{Math.round(effective)}</td>
                          <td className="py-3">
                            <span className="inline-flex items-center gap-2 text-tp-ink">
                              <span className={cn('h-2.5 w-2.5 rounded-full', QUALITY_META[q].dot)} aria-hidden="true" />
                              {SHORT_QUALITY[q]}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-tp-muted">
                If the aspect ratio differs from the print size, part of the photo is cropped. The DPI above fits the
                photo to cover the full print area.
              </p>
            </div>
          </>
        )}

        <div>
          <button
            type="button"
            onClick={handleReset}
            disabled={!info}
            className="inline-flex items-center gap-2 rounded-tp-button border border-tp-line bg-white px-5 py-3 text-sm font-semibold text-tp-ink transition-colors hover:border-tp-bronze focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
