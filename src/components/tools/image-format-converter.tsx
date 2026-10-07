'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Upload, Download, RefreshCw, ShieldCheck, FileImage, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type OutputFormat = 'jpg' | 'png' | 'webp';

const FORMATS: { id: OutputFormat; label: string; mime: string; ext: string; lossy: boolean }[] = [
  { id: 'jpg', label: 'JPG', mime: 'image/jpeg', ext: 'jpg', lossy: true },
  { id: 'png', label: 'PNG', mime: 'image/png', ext: 'png', lossy: false },
  { id: 'webp', label: 'WebP', mime: 'image/webp', ext: 'webp', lossy: true },
];

const ACCEPT = 'image/*,.heic,.heif,.webp,.png,.bmp,.tif,.tiff,.avif,.svg,.jpg,.jpeg,.gif';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function isHeic(file: File): boolean {
  return /\.(heic|heif)$/i.test(file.name) || /image\/hei[cf]/i.test(file.type);
}

function typeLabel(file: File): string {
  if (file.type) return file.type;
  const ext = file.name.split('.').pop();
  return ext ? ext.toUpperCase() : 'Unknown';
}

function baseName(name: string): string {
  const i = name.lastIndexOf('.');
  return (i > 0 ? name.slice(0, i) : name) || 'image';
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('decode'));
    img.src = url;
  });
}

export default function ImageFormatConverter() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [format, setFormat] = useState<OutputFormat>('jpg');
  const [quality, setQuality] = useState(90);
  const [output, setOutput] = useState<Blob | null>(null);
  const [converting, setConverting] = useState(false);

  const fmt = FORMATS.find((f) => f.id === format) ?? FORMATS[0];

  const reset = useCallback(() => {
    setFile(null);
    setImg(null);
    setDims(null);
    setOutput(null);
    setError(null);
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = '';
  }, []);

  // Revoke object URLs when they change or on unmount.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFile = useCallback(async (f: File | undefined | null) => {
    if (!f) return;
    setError(null);
    setOutput(null);
    setImg(null);
    setDims(null);

    const looksLikeImage = f.type.startsWith('image/') || /\.(heic|heif|webp|png|bmp|tiff?|avif|svg|jpe?g|gif)$/i.test(f.name);
    if (!looksLikeImage) {
      setFile(null);
      setPreviewUrl(null);
      setError('That file does not look like an image. Please choose a photo or graphic file.');
      return;
    }

    const url = URL.createObjectURL(f);
    try {
      const el = await loadImage(url);
      const w = el.naturalWidth || 1024;
      const h = el.naturalHeight || 1024;
      setFile(f);
      setPreviewUrl(url);
      setImg(el);
      setDims({ w, h });
    } catch {
      URL.revokeObjectURL(url);
      setFile(null);
      setPreviewUrl(null);
      setError(
        isHeic(f)
          ? 'Your browser cannot read HEIC/HEIF files. Try Safari on a Mac or iPhone, or switch your phone camera to "Most Compatible" (JPG) and upload the JPG directly.'
          : `Your browser could not read this ${typeLabel(f)} file. Try a different browser, or export it as a JPG or PNG first.`
      );
    }
  }, []);

  // Convert whenever the source, format or quality changes (debounced for the slider).
  useEffect(() => {
    if (!img || !dims) return;
    let cancelled = false;
    setConverting(true);
    const timer = window.setTimeout(() => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = dims.w;
        canvas.height = dims.h;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('no ctx');
        if (fmt.id === 'jpg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, dims.w, dims.h);
        }
        ctx.drawImage(img, 0, 0, dims.w, dims.h);
        canvas.toBlob(
          (blob) => {
            if (cancelled) return;
            setConverting(false);
            if (!blob || blob.type !== fmt.mime) {
              setOutput(null);
              setError(
                `Your browser cannot export ${fmt.label} files. Try a different browser, or choose JPG or PNG instead.`
              );
              return;
            }
            setError(null);
            setOutput(blob);
          },
          fmt.mime,
          fmt.lossy ? quality / 100 : undefined
        );
      } catch {
        if (cancelled) return;
        setConverting(false);
        setOutput(null);
        setError('Conversion failed. The image may be too large for your browser. Try a smaller file.');
      }
    }, 150);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [img, dims, fmt.id, fmt.mime, fmt.label, fmt.lossy, quality]);

  const download = () => {
    if (!output || !file) return;
    const url = URL.createObjectURL(output);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${baseName(file.name)}.${fmt.ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    void handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-0 sm:px-2">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="sr-only"
        aria-label="Choose an image file"
        onChange={(e) => void handleFile(e.target.files?.[0])}
      />

      {error && (
        <div role="alert" className="mb-4 flex items-start gap-3 rounded-tp-card border border-tp-line bg-tp-beige/40 p-4 text-sm text-tp-ink">
          <FileImage className="mt-0.5 h-5 w-5 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
          <p className="flex-1">{error}</p>
          <button
            type="button"
            onClick={() => setError(null)}
            className="rounded-tp-button p-1 text-tp-muted hover:text-tp-ink"
            aria-label="Dismiss message"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {!file || !previewUrl || !dims ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            'rounded-tp-card border-2 border-dashed bg-white px-6 py-14 text-center transition-colors',
            dragging ? 'border-tp-bronze bg-tp-beige/30' : 'border-tp-line'
          )}
        >
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-tp-button bg-tp-beige/40 text-tp-bronze-ink">
            <Upload className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="mt-5 font-display font-normal text-2xl text-tp-ink">Drop an image here</h2>
          <p className="mt-2 text-sm text-tp-muted">HEIC, HEIF, WebP, PNG, BMP, TIFF, AVIF, SVG, JPG and more</p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-tp-button bg-tp-ink px-6 py-3 text-sm font-semibold text-tp-paper transition-colors hover:bg-tp-black focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2"
          >
            <Upload className="h-4 w-4" aria-hidden="true" />
            Choose a file
          </button>
        </div>
      ) : (
        <div className="rounded-tp-card border border-tp-line bg-white p-5 sm:p-6">
          <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-tp-button border border-tp-line bg-tp-paper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Preview of your uploaded image" width={400} height={400} loading="lazy" className="max-h-full max-w-full object-contain" />
              </div>
              <dl className="mt-4 space-y-1.5 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-tp-muted">Name</dt>
                  <dd className="min-w-0 truncate text-tp-ink" title={file.name}>{file.name}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-tp-muted">Size</dt>
                  <dd className="text-tp-ink">{formatBytes(file.size)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-tp-muted">Type</dt>
                  <dd className="text-tp-ink">{typeLabel(file)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-tp-muted">Dimensions</dt>
                  <dd className="text-tp-ink">{dims.w} × {dims.h} px</dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-col">
              <h2 className="font-display font-normal text-2xl text-tp-ink">Convert to</h2>
              <div className="mt-3 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Output format">
                {FORMATS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    role="radio"
                    aria-checked={format === f.id}
                    onClick={() => setFormat(f.id)}
                    className={cn(
                      'rounded-tp-button border px-3 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze',
                      format === f.id
                        ? 'border-tp-ink bg-tp-ink text-tp-paper'
                        : 'border-tp-line bg-white text-tp-ink hover:border-tp-bronze'
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {fmt.lossy ? (
                <div className="mt-5">
                  <div className="flex items-center justify-between text-sm">
                    <label htmlFor="ifc-quality" className="font-semibold text-tp-ink">Quality</label>
                    <span className="text-tp-muted">{quality}</span>
                  </div>
                  <input
                    id="ifc-quality"
                    type="range"
                    min={10}
                    max={100}
                    step={1}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="mt-2 w-full accent-tp-bronze"
                  />
                </div>
              ) : (
                <p className="mt-5 text-sm text-tp-muted">PNG is lossless, so there is no quality setting.</p>
              )}

              <div className="mt-5 rounded-tp-button border border-tp-line bg-tp-paper p-4 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-tp-muted">Estimated output size</span>
                  <span className="font-semibold text-tp-ink">
                    {converting || !output ? 'Calculating…' : formatBytes(output.size)}
                  </span>
                </div>
                <div className="mt-1.5 flex justify-between gap-3">
                  <span className="text-tp-muted">Resolution</span>
                  <span className="text-tp-ink">{dims.w} × {dims.h} px (unchanged)</span>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:mt-auto sm:pt-5">
                <button
                  type="button"
                  onClick={download}
                  disabled={!output || converting}
                  className="inline-flex items-center justify-center gap-2 rounded-tp-button bg-tp-bronze px-6 py-3 text-sm font-semibold text-tp-black transition-colors hover:bg-tp-beige focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download {fmt.label}
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 rounded-tp-button border border-tp-line bg-white px-6 py-3 text-sm font-semibold text-tp-ink transition-colors hover:border-tp-bronze focus:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
                >
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  Convert another image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="mt-5 flex items-center justify-center gap-2 text-center text-sm text-tp-muted">
        <ShieldCheck className="h-4 w-4 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
        Your photos never leave your browser
      </p>
    </div>
  );
}
