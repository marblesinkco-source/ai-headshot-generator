'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Upload, Camera, Clock, Sparkles, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { generateStyleVariations } from '@/lib/canvas-photo-engine';

type StyleResult = {
  presetName: string;
  dataUrl: string;
};

type DemoState = 'idle' | 'uploading' | 'generating' | 'done' | 'error';

const STYLE_LABELS: Record<string, string> = {
  professional: 'Professional',
  corporate: 'Corporate',
  creative: 'Creative',
};

const EXAMPLE_RESULTS = [
  { src: '/brand/tailorpic/web/after-ozlem.jpg', alt: 'Example AI headshot — professional style' },
  { src: '/brand/tailorpic/web/after-murat.jpg', alt: 'Example AI headshot — corporate style' },
  { src: '/brand/tailorpic/web/after-ahmet.jpg', alt: 'Example AI headshot — creative style' },
];

export function InstantPreviewDemo() {
  const [state, setState] = useState<DemoState>('idle');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [results, setResults] = useState<StyleResult[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [exampleIdx, setExampleIdx] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    // Validate
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setErrorMsg('Please upload a JPG, PNG, or WebP image.');
      setState('error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Image must be under 10MB.');
      setState('error');
      return;
    }

    // Show preview of original
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setState('uploading');

    // Brief pause for visual feedback
    await new Promise((r) => setTimeout(r, 500));
    setState('generating');

    try {
      // Process with canvas engine — 3 style presets
      const srcUrl = URL.createObjectURL(file);
      const variations = await generateStyleVariations(
        srcUrl,
        ['professional', 'corporate', 'creative'],
        600,
      );
      URL.revokeObjectURL(srcUrl);

      if (!variations.length) {
        throw new Error('Processing produced no results');
      }

      setResults(variations);
      setSelectedIdx(0);
      setState('done');
    } catch {
      setErrorMsg('Could not process your photo. Please try a different image.');
      setState('error');
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const reset = useCallback(() => {
    setState('idle');
    setPreviewUrl(null);
    setResults([]);
    setSelectedIdx(0);
    setErrorMsg('');
  }, []);

  return (
    <section className="bg-tp-black py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm text-tp-bronze mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Instant AI Enhancement</span>
          </div>
          <h2 className="font-display font-normal text-3xl md:text-5xl text-tp-paper mb-4">
            See Your <span className="text-tp-bronze">AI Transformation</span>
          </h2>
          <p className="text-tp-beige/70 text-lg md:text-xl max-w-2xl mx-auto mb-3">
            Upload one selfie. Our AI engine enhances lighting, color, and clarity
            — producing studio-quality results right in your browser.
          </p>
          <p className="text-tp-bronze/80 text-sm font-medium tracking-wide uppercase">
            Real-Time Photo Enhancement
          </p>
        </div>

        {/* Demo Area */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left: Upload / Source */}
          <div className="relative">
            {state === 'idle' ? (
              <div
                className="border-2 border-dashed border-tp-line rounded-tp-card p-8 md:p-12 text-center cursor-pointer transition-colors hover:border-tp-bronze/60 hover:bg-tp-bronze/5"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-tp-bronze/15 flex items-center justify-center">
                  <Camera className="h-8 w-8 text-tp-bronze" />
                </div>
                <p className="text-tp-paper text-lg font-medium mb-2">
                  Drop your selfie here
                </p>
                <p className="text-tp-beige/70 text-sm mb-6">
                  or click to browse — JPG, PNG, WebP up to 10MB
                </p>
                <button className="inline-flex items-center gap-2 bg-tp-bronze text-tp-black px-6 py-3 rounded-tp-button font-medium text-sm hover:bg-tp-bronze/90 transition-colors">
                  <Upload className="h-4 w-4" />
                  Select Photo
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />
              </div>
            ) : (
              <div className="rounded-tp-card overflow-hidden bg-tp-ink">
                {previewUrl && (
                  <div className="relative aspect-[3/4] w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrl}
                      alt="Your selfie"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-tp-black/70 backdrop-blur-sm text-tp-paper text-xs px-3 py-1 rounded-full">
                      Your Selfie
                    </div>
                  </div>
                )}
                {state !== 'idle' && (
                  <button
                    onClick={reset}
                    className="w-full py-3 text-sm text-tp-beige/70 hover:text-tp-paper transition-colors"
                  >
                    Try another photo
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right: Results */}
          <div className="relative">
            {state === 'idle' && (
              <div>
                {/* Example result display */}
                <div className="rounded-tp-card overflow-hidden bg-tp-ink mb-4 relative">
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={EXAMPLE_RESULTS[exampleIdx].src}
                      alt={EXAMPLE_RESULTS[exampleIdx].alt}
                      fill
                      className="object-cover object-[50%_25%]"
                      sizes="(min-width: 768px) 40vw, 90vw"
                    />
                    {/* Gradient overlay for "example" feel */}
                    <div className="absolute inset-0 bg-gradient-to-t from-tp-black/40 via-transparent to-transparent" />
                    {/* Example label */}
                    <div className="absolute top-3 left-3 bg-tp-bronze/20 backdrop-blur-sm text-tp-bronze-ink text-xs font-semibold px-3 py-1 rounded-tp-button border border-tp-bronze/30">
                      Example Result
                    </div>
                    {/* Upload prompt overlay */}
                    <div className="absolute bottom-12 left-0 right-0 text-center">
                      <span className="inline-flex items-center gap-2 bg-tp-black/70 backdrop-blur-sm text-tp-paper text-sm font-medium px-4 py-2 rounded-tp-button">
                        <Upload className="h-4 w-4 text-tp-bronze" />
                        Upload your selfie to see yours
                      </span>
                    </div>
                    {/* Disclosure */}
                    <span className="absolute bottom-3 right-3 bg-tp-black/60 backdrop-blur-sm text-tp-paper/80 text-[10px] px-2 py-0.5 rounded-tp-button">
                      AI-generated concept image
                    </span>
                  </div>
                </div>

                {/* Example thumbnail strip */}
                <div className="flex gap-2 mb-4">
                  {EXAMPLE_RESULTS.map((ex, i) => (
                    <button
                      key={ex.src}
                      type="button"
                      onClick={() => setExampleIdx(i)}
                      className={`relative flex-1 aspect-[3/4] rounded-lg overflow-hidden border-2 transition-colors ${
                        i === exampleIdx
                          ? 'border-tp-bronze'
                          : 'border-tp-line hover:border-tp-muted'
                      }`}
                    >
                      <Image
                        src={ex.src}
                        alt={`Example ${i + 1}`}
                        fill
                        className="object-cover object-[50%_25%]"
                        sizes="100px"
                      />
                    </button>
                  ))}
                </div>

                <p className="text-center text-tp-beige/50 text-xs">
                  Upload a selfie on the left to get your own AI-enhanced previews
                </p>
              </div>
            )}

            {(state === 'uploading' || state === 'generating') && (
              <div className="border border-tp-line rounded-tp-card p-8 md:p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto relative">
                    <div className="absolute inset-0 rounded-full border-2 border-tp-line" />
                    <div className="absolute inset-0 rounded-full border-2 border-tp-bronze border-t-transparent animate-spin" />
                  </div>
                </div>
                <p className="text-tp-paper text-lg font-medium mb-1">
                  {state === 'uploading' ? 'Analyzing your photo…' : 'Enhancing your photo…'}
                </p>
                {state === 'generating' && (
                  <div className="mt-3 flex flex-col gap-2">
                    <p className="text-tp-beige/70 text-sm">
                      Generating style variations
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      {['Professional', 'Corporate', 'Creative'].map((label) => (
                        <span
                          key={label}
                          className="inline-block rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-3 py-0.5 text-[11px] font-medium text-tp-bronze"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {state === 'done' && results.length > 0 && (
              <div>
                {/* Main result display */}
                <div className="rounded-tp-card overflow-hidden bg-tp-ink mb-4">
                  <div className="relative aspect-[3/4] w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={results[selectedIdx].dataUrl}
                      alt={`AI Enhanced — ${STYLE_LABELS[results[selectedIdx].presetName] ?? results[selectedIdx].presetName}`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-tp-black/70 backdrop-blur-sm text-tp-paper text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-tp-bronze" />
                      {STYLE_LABELS[results[selectedIdx].presetName] ?? results[selectedIdx].presetName} Style
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 bg-tp-bronze/90 text-tp-black text-[11px] font-semibold px-2.5 py-1 rounded-tp-button">
                        <Sparkles className="h-3 w-3" />
                        AI Enhanced
                      </span>
                    </div>
                  </div>
                </div>

                {/* Style thumbnail strip */}
                <div className="flex gap-2 mb-6">
                  {results.map((r, i) => (
                    <button
                      key={r.presetName}
                      onClick={() => setSelectedIdx(i)}
                      className={`relative flex-1 overflow-hidden rounded-lg border-2 transition-colors ${
                        i === selectedIdx
                          ? 'border-tp-bronze'
                          : 'border-tp-line hover:border-tp-muted'
                      }`}
                    >
                      <div className="relative aspect-[3/4] w-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={r.dataUrl}
                          alt={`${STYLE_LABELS[r.presetName] ?? r.presetName} preview`}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                      <div className="bg-tp-ink px-2 py-1.5 text-center">
                        <span className={`text-[11px] font-medium ${
                          i === selectedIdx ? 'text-tp-bronze' : 'text-tp-beige/70'
                        }`}>
                          {STYLE_LABELS[r.presetName] ?? r.presetName}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href="/auth/register"
                  className="flex items-center justify-center gap-2 w-full bg-tp-bronze text-tp-black py-4 rounded-tp-button font-medium hover:bg-tp-bronze/90 transition-colors"
                >
                  Get Full Headshot Package
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="text-center text-tp-beige/70 text-xs mt-3">
                  Full packages include up to 160 photos with multiple styles &amp; backgrounds
                </p>
              </div>
            )}

            {state === 'error' && (
              <div className="border border-tp-bronze/30 rounded-tp-card p-8 md:p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                <AlertCircle className="h-12 w-12 text-tp-bronze/70 mb-4" />
                <p className="text-tp-paper text-lg font-medium mb-2">
                  Something went wrong
                </p>
                <p className="text-tp-beige/70 text-sm mb-6">{errorMsg}</p>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 bg-tp-bronze text-tp-black px-6 py-3 rounded-tp-button font-medium text-sm hover:bg-tp-bronze/90 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 md:mt-16">
          {[
            {
              icon: Clock,
              title: 'Real-Time Processing',
              desc: 'Photos are enhanced instantly in your browser using our AI canvas engine.',
            },
            {
              icon: Camera,
              title: 'One Selfie, Three Styles',
              desc: 'Get Professional, Corporate, and Creative variations from a single photo.',
            },
            {
              icon: Sparkles,
              title: 'Studio-Quality Enhancement',
              desc: 'Lighting, color grading, sharpening and portrait retouching — all automated.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center p-6">
              <div className="mx-auto mb-4 w-10 h-10 rounded-full bg-tp-bronze/15 flex items-center justify-center">
                <Icon className="h-5 w-5 text-tp-bronze" />
              </div>
              <h3 className="text-tp-paper font-medium mb-2">{title}</h3>
              <p className="text-tp-beige/70 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
