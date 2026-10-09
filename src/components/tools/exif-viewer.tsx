'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Upload, Download, RefreshCw, ShieldCheck, AlertTriangle, Camera } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

const MAX_BYTES = 15 * 1024 * 1024;
const ACCEPTED = ['image/jpeg', 'image/png'];

interface ExifData {
  make?: string;
  model?: string;
  software?: string;
  dateTaken?: string;
  orientation?: number;
  iso?: number;
  aperture?: string;
  shutter?: string;
  hasGps: boolean;
  hasExif: boolean;
}

const ORIENTATION_LABELS: Record<number, string> = {
  1: 'Normal',
  2: 'Mirrored',
  3: 'Rotated 180°',
  4: 'Mirrored vertically',
  5: 'Mirrored, rotated 90° (left)',
  6: 'Rotated 90° (right)',
  7: 'Mirrored, rotated 90° (right)',
  8: 'Rotated 90° (left)',
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Minimal EXIF reader. Walks JPEG segments to find APP1 "Exif", then reads
 * IFD0, the Exif sub-IFD and detects (but never decodes) the GPS sub-IFD.
 * Every read is bounds-checked; any failure returns what was found so far.
 */
function parseExif(buffer: ArrayBuffer): ExifData {
  const result: ExifData = { hasGps: false, hasExif: false };
  try {
    const view = new DataView(buffer);
    const len = view.byteLength;
    if (len < 4 || view.getUint16(0) !== 0xffd8) return result;

    let offset = 2;
    let tiffStart = -1;
    while (offset + 4 <= len) {
      if (view.getUint8(offset) !== 0xff) break;
      const marker = view.getUint8(offset + 1);
      if (marker === 0xda || marker === 0xd9) break; // start of scan / end of image
      if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
        offset += 2;
        continue;
      }
      const segLen = view.getUint16(offset + 2);
      if (segLen < 2) break;
      if (
        marker === 0xe1 &&
        offset + 10 <= len &&
        view.getUint32(offset + 4) === 0x45786966 && // "Exif"
        view.getUint16(offset + 8) === 0x0000
      ) {
        tiffStart = offset + 10;
        break;
      }
      offset += 2 + segLen;
    }
    if (tiffStart < 0 || tiffStart + 8 > len) return result;

    const byteOrder = view.getUint16(tiffStart);
    const little = byteOrder === 0x4949;
    if (!little && byteOrder !== 0x4d4d) return result;
    if (view.getUint16(tiffStart + 2, little) !== 0x002a) return result;

    result.hasExif = true;

    const u16 = (o: number) => view.getUint16(o, little);
    const u32 = (o: number) => view.getUint32(o, little);

    const readAscii = (entry: number, count: number): string | undefined => {
      const valueOffset = count <= 4 ? entry + 8 : tiffStart + u32(entry + 8);
      if (valueOffset < 0 || valueOffset + count > len) return undefined;
      let s = '';
      for (let i = 0; i < count; i++) {
        const c = view.getUint8(valueOffset + i);
        if (c === 0) break;
        s += String.fromCharCode(c);
      }
      s = s.trim();
      return s || undefined;
    };

    const readRational = (entry: number): [number, number] | undefined => {
      const valueOffset = tiffStart + u32(entry + 8);
      if (valueOffset < 0 || valueOffset + 8 > len) return undefined;
      return [u32(valueOffset), u32(valueOffset + 4)];
    };

    const readIfd = (ifdOffset: number, handler: (tag: number, type: number, count: number, entry: number) => void) => {
      const start = tiffStart + ifdOffset;
      if (start < 0 || start + 2 > len) return;
      const n = u16(start);
      for (let i = 0; i < n && i < 512; i++) {
        const entry = start + 2 + i * 12;
        if (entry + 12 > len) break;
        handler(u16(entry), u16(entry + 2), u32(entry + 4), entry);
      }
    };

    let exifIfd = 0;
    let gpsIfd = 0;

    readIfd(u32(tiffStart + 4), (tag, type, count, entry) => {
      switch (tag) {
        case 0x010f:
          if (type === 2) result.make = readAscii(entry, count);
          break;
        case 0x0110:
          if (type === 2) result.model = readAscii(entry, count);
          break;
        case 0x0131:
          if (type === 2) result.software = readAscii(entry, count);
          break;
        case 0x0132:
          if (type === 2 && !result.dateTaken) result.dateTaken = readAscii(entry, count);
          break;
        case 0x0112:
          if (type === 3) result.orientation = u16(entry + 8);
          break;
        case 0x8769:
          exifIfd = u32(entry + 8);
          break;
        case 0x8825:
          gpsIfd = u32(entry + 8);
          break;
      }
    });

    if (exifIfd) {
      readIfd(exifIfd, (tag, type, count, entry) => {
        switch (tag) {
          case 0x9003:
            if (type === 2) result.dateTaken = readAscii(entry, count) ?? result.dateTaken;
            break;
          case 0x8827:
            if (type === 3) result.iso = u16(entry + 8);
            break;
          case 0x829d: {
            if (type !== 5) break;
            const r = readRational(entry);
            if (r && r[1] > 0) result.aperture = `f/${(r[0] / r[1]).toFixed(1).replace(/\.0$/, '')}`;
            break;
          }
          case 0x829a: {
            if (type !== 5) break;
            const r = readRational(entry);
            if (r && r[1] > 0 && r[0] > 0) {
              const secs = r[0] / r[1];
              result.shutter = secs >= 1 ? `${secs.toFixed(1).replace(/\.0$/, '')} s` : `1/${Math.round(1 / secs)} s`;
            }
            break;
          }
        }
      });
    }

    // Only presence is checked. Coordinates are deliberately never decoded or shown.
    if (gpsIfd) {
      const start = tiffStart + gpsIfd;
      if (start >= 0 && start + 2 <= len && u16(start) > 0) result.hasGps = true;
    }
  } catch {
    // Truncated or malformed EXIF: keep whatever was parsed.
  }
  return result;
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

export default function ExifViewer() {
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [exif, setExif] = useState<ExifData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [quality, setQuality] = useState(92);
  const [busy, setBusy] = useState(false);
  const [cleanSize, setCleanSize] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const srcUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (srcUrlRef.current) URL.revokeObjectURL(srcUrlRef.current);
    };
  }, []);

  const handleFile = useCallback((f: File | undefined | null) => {
    setError(null);
    if (!f) return;
    if (!ACCEPTED.includes(f.type)) {
      setError('Please choose a JPEG or PNG image.');
      return;
    }
    if (f.size > MAX_BYTES) {
      setError('That file is larger than 15MB. Please choose a smaller image.');
      return;
    }
    const url = URL.createObjectURL(f);
    const image = new Image();
    image.onload = async () => {
      let parsed: ExifData = { hasGps: false, hasExif: false };
      if (f.type === 'image/jpeg') {
        try {
          parsed = parseExif(await f.arrayBuffer());
        } catch {
          // Leave defaults: no EXIF found.
        }
      }
      if (srcUrlRef.current) URL.revokeObjectURL(srcUrlRef.current);
      srcUrlRef.current = url;
      setFile(f);
      setImg(image);
      setExif(parsed);
      setCleanSize(null);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      setError('We could not read that image. Try a different file.');
    };
    image.src = url;
  }, []);

  const reset = () => {
    if (srcUrlRef.current) URL.revokeObjectURL(srcUrlRef.current);
    srcUrlRef.current = null;
    setFile(null);
    setImg(null);
    setExif(null);
    setCleanSize(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const isJpeg = file?.type === 'image/jpeg';

  const downloadClean = async () => {
    if (!file || !img) return;
    setBusy(true);
    setError(null);
    try {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas unavailable');
      if (isJpeg) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
      }
      // Redrawing on a canvas keeps only pixels. Browsers apply the EXIF
      // orientation when drawing, so the clean copy looks the same.
      ctx.drawImage(img, 0, 0, w, h);
      const blob = isJpeg
        ? await canvasToBlob(canvas, 'image/jpeg', quality / 100)
        : await canvasToBlob(canvas, 'image/png');
      if (!blob) throw new Error('Export failed');
      setCleanSize(blob.size);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.replace(/\.[^.]+$/, '')}-clean.${isJpeg ? 'jpg' : 'png'}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setError('Could not create a clean copy in this browser. Try a different image.');
    } finally {
      setBusy(false);
    }
  };

  const rows: { label: string; value: string }[] = [];
  if (file && img && exif) {
    rows.push({ label: 'Camera make', value: exif.make ?? 'Not found' });
    rows.push({ label: 'Camera model', value: exif.model ?? 'Not found' });
    rows.push({ label: 'Date taken', value: exif.dateTaken ?? 'Not found' });
    rows.push({ label: 'Dimensions', value: `${img.naturalWidth} × ${img.naturalHeight} px` });
    rows.push({ label: 'File size', value: formatBytes(file.size) });
    rows.push({
      label: 'Orientation',
      value: exif.orientation ? (ORIENTATION_LABELS[exif.orientation] ?? `Code ${exif.orientation}`) : 'Not found',
    });
    rows.push({ label: 'Software', value: exif.software ?? 'Not found' });
    rows.push({ label: 'ISO', value: exif.iso !== undefined ? String(exif.iso) : 'Not found' });
    rows.push({ label: 'Aperture', value: exif.aperture ?? 'Not found' });
    rows.push({ label: 'Shutter speed', value: exif.shutter ?? 'Not found' });
    rows.push({
      label: 'GPS location',
      value: exif.hasGps ? 'Location data found' : 'Not found',
    });
  }

  return (
    <div className="mx-auto w-full max-w-3xl rounded-tp-card border border-tp-line bg-tp-paper p-5 sm:p-8">
      {!file || !img || !exif ? (
        <>
          <div
            role="button"
            tabIndex={0}
            aria-label="Upload a photo to inspect"
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
            <span className="text-sm text-tp-muted">JPEG or PNG, up to 15MB</span>
            <span className={cn(buttonVariants({ variant: 'primary', size: 'md' }))}>Choose a photo</span>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png"
            className="sr-only"
            tabIndex={-1}
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-tp-muted">
            <ShieldCheck className="h-4 w-4 text-tp-bronze-ink" aria-hidden="true" />
            Everything runs in your browser. Nothing is uploaded.
          </p>
        </>
      ) : (
        <div className="space-y-6">
          {exif.hasGps && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-tp-card border-2 border-tp-bronze bg-tp-beige/40 p-5"
            >
              <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
              <div>
                <p className="font-semibold text-tp-ink">
                  This photo contains location data. Remove it before sharing.
                </p>
                <p className="mt-1 text-sm text-tp-muted">
                  We only detect that it exists. The coordinates are not displayed or stored.
                </p>
              </div>
            </div>
          )}

          <div className="overflow-hidden rounded-tp-card border border-tp-line bg-white">
            <div className="flex items-center gap-2 border-b border-tp-line px-5 py-3">
              <Camera className="h-4 w-4 text-tp-bronze-ink" aria-hidden="true" />
              <h3 className="text-sm font-semibold text-tp-ink">
                Photo metadata
                <span className="ml-2 font-normal text-tp-muted break-all">{file.name}</span>
              </h3>
            </div>
            {!exif.hasExif && (
              <p className="border-b border-tp-line px-5 py-3 text-sm text-tp-muted">
                {isJpeg
                  ? 'No EXIF metadata was found in this file. It may already be clean.'
                  : 'PNG files do not carry EXIF camera data, so only dimensions and file size are shown.'}
              </p>
            )}
            <dl className="divide-y divide-tp-line">
              {rows.map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-4 px-5 py-3 text-sm">
                  <dt className="text-tp-muted">{row.label}</dt>
                  <dd
                    className={cn(
                      'break-words text-right font-medium',
                      row.value === 'Not found' ? 'text-tp-muted' : 'text-tp-ink'
                    )}
                  >
                    {row.label === 'GPS location' && exif.hasGps ? (
                      <span className="inline-flex items-center gap-1 text-tp-bronze-ink">
                        <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                        {row.value}
                      </span>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-tp-card border border-tp-line bg-white p-5">
            <h3 className="text-sm font-semibold text-tp-ink">Download a clean copy</h3>
            <p className="mt-1 text-sm text-tp-muted">
              The photo is redrawn on a canvas and saved as a new file, which drops all metadata including location.
            </p>
            {isJpeg ? (
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="exif-quality" className="text-sm font-semibold text-tp-ink">
                    JPEG quality
                  </label>
                  <span className="text-sm text-tp-muted">{quality}</span>
                </div>
                <input
                  id="exif-quality"
                  type="range"
                  min={70}
                  max={100}
                  step={1}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="mt-3 w-full accent-tp-bronze"
                />
                <p className="mt-1 text-xs text-tp-muted">Higher quality keeps more detail and makes a larger file.</p>
              </div>
            ) : (
              <p className="mt-4 text-xs text-tp-muted">PNG copies are saved losslessly, so there is no quality setting.</p>
            )}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={downloadClean}
                disabled={busy}
                className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'flex-1 disabled:opacity-60')}
              >
                <Download className="h-5 w-5" aria-hidden="true" />
                {busy ? 'Preparing...' : 'Remove metadata & download'}
              </button>
              <button type="button" onClick={reset} className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
                <RefreshCw className="h-5 w-5" aria-hidden="true" />
                New photo
              </button>
            </div>
            {cleanSize !== null && (
              <p className="mt-3 text-center text-sm text-tp-ink" role="status">
                Clean copy saved: {formatBytes(cleanSize)} with no metadata.
              </p>
            )}
          </div>

          <div className="rounded-tp-card border border-tp-line bg-tp-ink p-5 text-center">
            <p className="text-sm font-semibold text-tp-paper">Need a better headshot, not just a cleaner file?</p>
            <p className="mt-1 text-xs text-tp-beige">AI headshots from {BASE_PRICE_DISPLAY}.</p>
            <Link
              href={ctaHref}
              className="mt-3 inline-block text-sm font-semibold text-tp-bronze underline underline-offset-4"
            >
              Try TailorPic
            </Link>
          </div>

          <p className="flex items-center justify-center gap-2 text-center text-xs text-tp-muted">
            <ShieldCheck className="h-4 w-4 text-tp-bronze-ink" aria-hidden="true" />
            Everything runs in your browser. Nothing is uploaded.
          </p>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-4 flex items-start gap-2 text-sm text-tp-ink">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
