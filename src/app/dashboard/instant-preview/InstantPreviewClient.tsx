'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Camera, Upload, ArrowRight, Download, RefreshCw, Zap, Clock, AlertCircle, Check, X } from 'lucide-react';

type PreviewResult = {
  id: string;
  url: string | null;
  error: string | null;
};

type Phase = 'idle' | 'uploading' | 'generating' | 'done' | 'error';

const STYLE_LABELS: Record<string, string> = {
  business_formal: 'Business Formal',
  smart_casual: 'Smart Casual',
  creative_modern: 'Creative Modern',
  linkedin_ready: 'LinkedIn Ready',
  executive: 'Executive',
};

export default function InstantPreviewClient() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [previews, setPreviews] = useState<PreviewResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<number>(0);
  const [generatedCount, setGeneratedCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a JPG, PNG, or WebP image.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be under 10 MB.');
      return;
    }

    setError(null);
    setSelfieFile(file);
    setSelfiePreview(URL.createObjectURL(file));
    setPreviews([]);
    setPhase('idle');
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a JPG, PNG, or WebP image.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be under 10 MB.');
      return;
    }

    setError(null);
    setSelfieFile(file);
    setSelfiePreview(URL.createObjectURL(file));
    setPreviews([]);
    setPhase('idle');
  }, []);

  const generate = useCallback(async () => {
    if (!selfieFile) return;

    setPhase('uploading');
    setError(null);
    setPreviews([]);

    try {
      const formData = new FormData();
      formData.append('selfie', selfieFile);
      formData.append('count', '5');

      setPhase('generating');

      const response = await fetch('/api/ai/instant-preview', {
        method: 'POST',
        body: formData,
        // CSRF protection handled by browser's sec-fetch-site header
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: 'Generation failed' }));
        throw new Error(data.error || `Error ${response.status}`);
      }

      const data = await response.json() as {
        previews: PreviewResult[];
        generated: number;
        total: number;
      };

      setPreviews(data.previews);
      setGeneratedCount(data.generated);
      setSelectedPreview(0);
      setPhase('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setPhase('error');
    }
  }, [selfieFile]);

  const reset = useCallback(() => {
    setSelfieFile(null);
    setSelfiePreview(null);
    setPreviews([]);
    setError(null);
    setPhase('idle');
    setSelectedPreview(0);
    setGeneratedCount(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const downloadPreview = useCallback(async (url: string, styleId: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `tailorpic-preview-${styleId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    } catch {
      // Fallback: open in new tab
      window.open(url, '_blank');
    }
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-tp-button bg-tp-bronze/10">
            <Zap className="h-4 w-4 text-tp-bronze" />
          </div>
          <h1 className="font-display font-normal text-2xl md:text-3xl text-tp-black">
            Instant Preview
          </h1>
        </div>
        <p className="text-tp-ink/70 mt-1">
          Upload a selfie and see your AI headshots in seconds — no training required.
          Get a quick taste of what TailorPic can do before committing to a full order.
        </p>
      </div>

      {/* Main content */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Left: Upload area */}
        <div>
          <div
            className={`relative rounded-tp-card border-2 border-dashed transition-colors ${
              selfiePreview
                ? 'border-tp-bronze/30 bg-tp-beige/30'
                : 'border-tp-line hover:border-tp-bronze/50 bg-tp-paper'
            } p-6`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {selfiePreview ? (
              <div className="space-y-4">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-tp-button">
                  <Image
                    src={selfiePreview}
                    alt="Your uploaded selfie"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-tp-button"
                    onClick={reset}
                  >
                    <X className="mr-1.5 h-3.5 w-3.5" />
                    Change Photo
                  </Button>
                  {(phase === 'idle' || phase === 'error') && (
                    <Button
                      size="sm"
                      className="flex-1 rounded-tp-button bg-tp-black text-tp-paper hover:bg-tp-ink"
                      onClick={generate}
                    >
                      <Zap className="mr-1.5 h-3.5 w-3.5" />
                      Generate Previews
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center gap-4 py-8 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-tp-bronze/10">
                  <Camera className="h-7 w-7 text-tp-bronze" />
                </div>
                <div>
                  <p className="font-medium text-tp-black">Upload a Selfie</p>
                  <p className="mt-1 text-sm text-tp-ink/60">
                    JPG, PNG, or WebP &middot; Max 10 MB
                  </p>
                  <p className="mt-1 text-xs text-tp-ink/40">
                    Drag &amp; drop or click to browse
                  </p>
                </div>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileSelect}
              className="hidden"
              aria-label="Upload selfie"
            />
          </div>

          {/* Tips */}
          <div className="mt-4 rounded-tp-card bg-tp-beige/50 p-4">
            <p className="text-sm font-medium text-tp-black mb-2">Tips for best results</p>
            <ul className="space-y-1.5 text-sm text-tp-ink/70">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-tp-bronze" />
                Clear, well-lit photo of your face
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-tp-bronze" />
                Face the camera directly, not at an angle
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-tp-bronze" />
                Avoid sunglasses, hats, or heavy filters
              </li>
            </ul>
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-tp-button bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Right: Results area */}
        <div>
          {phase === 'generating' || phase === 'uploading' ? (
            <div className="flex flex-col items-center justify-center rounded-tp-card border border-tp-line bg-tp-paper p-12 text-center">
              <div className="relative mb-6">
                <div className="h-16 w-16 rounded-full border-4 border-tp-beige animate-spin border-t-tp-bronze" />
                <Zap className="absolute inset-0 m-auto h-6 w-6 text-tp-bronze" />
              </div>
              <p className="font-medium text-tp-black">Generating your previews...</p>
              <p className="mt-2 text-sm text-tp-ink/60">
                This typically takes 15&ndash;30 seconds
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-tp-ink/40">
                <Clock className="h-3.5 w-3.5" />
                AI is creating 5 different styles
              </div>
            </div>
          ) : phase === 'done' && previews.length > 0 ? (
            <div className="space-y-4">
              {/* Main preview */}
              {previews[selectedPreview]?.url && (
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-tp-card border border-tp-line">
                  <Image
                    src={previews[selectedPreview].url!}
                    alt={`AI headshot preview — ${STYLE_LABELS[previews[selectedPreview].id] || previews[selectedPreview].id}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-sm font-medium text-white">
                      {STYLE_LABELS[previews[selectedPreview].id] || previews[selectedPreview].id}
                    </p>
                    <p className="text-xs text-white/70">AI-generated concept image</p>
                  </div>
                </div>
              )}

              {/* Thumbnail strip */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {previews.map((preview, i) => (
                  <button
                    key={preview.id}
                    type="button"
                    onClick={() => preview.url && setSelectedPreview(i)}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-tp-button border-2 transition-colors ${
                      i === selectedPreview
                        ? 'border-tp-bronze ring-1 ring-tp-bronze/30'
                        : 'border-tp-line hover:border-tp-bronze/50'
                    }`}
                    title={STYLE_LABELS[preview.id] || preview.id}
                  >
                    {preview.url ? (
                      <Image
                        src={preview.url}
                        alt={STYLE_LABELS[preview.id] || preview.id}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-tp-beige/50">
                        <AlertCircle className="h-4 w-4 text-tp-ink/30" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                {previews[selectedPreview]?.url && (
                  <Button
                    variant="outline"
                    className="w-full rounded-tp-button"
                    onClick={() =>
                      downloadPreview(
                        previews[selectedPreview].url!,
                        previews[selectedPreview].id,
                      )
                    }
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download This Preview
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full rounded-tp-button"
                  onClick={reset}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Another Photo
                </Button>
              </div>

              {/* Upsell */}
              <div className="rounded-tp-card border border-tp-bronze/20 bg-tp-bronze/5 p-4">
                <p className="text-sm font-medium text-tp-black">
                  Like what you see?
                </p>
                <p className="mt-1 text-sm text-tp-ink/70">
                  Get up to 160 studio-quality headshots with our full AI training.
                  Higher resolution, more styles, and better likeness.
                </p>
                <Link
                  href="/dashboard/upload"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-tp-bronze hover:text-tp-bronze-ink transition-colors"
                >
                  Create Full Headshot Set
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Stats */}
              <p className="text-center text-xs text-tp-ink/40">
                {generatedCount} of 5 styles generated &middot; 5 previews per hour limit
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-tp-card border border-tp-line bg-tp-paper p-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-tp-beige">
                <Upload className="h-6 w-6 text-tp-ink/40" />
              </div>
              <p className="mt-4 font-medium text-tp-black">Your previews will appear here</p>
              <p className="mt-2 text-sm text-tp-ink/60 max-w-xs">
                Upload a selfie on the left, then tap &ldquo;Generate Previews&rdquo; to see
                5 different professional headshot styles in seconds.
              </p>
              <div className="mt-6 flex items-center gap-4 text-xs text-tp-ink/40">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  ~15 seconds
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5" />
                  No training needed
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
