'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Upload, Camera, Clock, Sparkles, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

type PreviewResult = {
  id: string;
  url: string | null;
  error: string | null;
};

type DemoState = 'idle' | 'uploading' | 'generating' | 'done' | 'error';

export function InstantPreviewDemo() {
  const [state, setState] = useState<DemoState>('idle');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [results, setResults] = useState<PreviewResult[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    setElapsed(0);
    timerRef.current = setInterval(() => {
      setElapsed((prev) => prev + 0.1);
    }, 100);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

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

    // Show preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setState('uploading');

    // Brief pause for visual feedback
    await new Promise((r) => setTimeout(r, 500));
    setState('generating');
    startTimer();

    try {
      const formData = new FormData();
      formData.append('selfie', file);
      formData.append('count', '3');

      const res = await fetch('/api/ai/instant-preview', {
        method: 'POST',
        body: formData,
      });

      stopTimer();

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Generation failed' }));
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setState('error');
        return;
      }

      const data = await res.json();
      setResults(data.previews || []);
      setSelectedIdx(0);
      setState('done');
    } catch {
      stopTimer();
      setErrorMsg('Network error. Please check your connection.');
      setState('error');
    }
  }, [startTimer, stopTimer]);

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
    setElapsed(0);
    stopTimer();
  }, [stopTimer]);

  return (
    <section className="bg-tp-black py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm text-tp-bronze mb-6">
            <Clock className="h-4 w-4" />
            <span>Try It Free — No Sign-Up Required</span>
          </div>
          <h2 className="font-display font-normal text-3xl md:text-5xl text-tp-paper mb-4">
            Your AI Headshot in <span className="text-tp-bronze">15 Seconds</span>
          </h2>
          <p className="text-tp-muted text-lg md:text-xl max-w-2xl mx-auto mb-3">
            Upload one selfie. Get a professional headshot preview instantly.
            No training wait. No commitment.
          </p>
          <p className="text-tp-bronze/80 text-sm font-medium tracking-wide uppercase">
            The Power of AI Headshots
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
                <p className="text-tp-muted text-sm mb-6">
                  or click to browse — JPG, PNG, WebP up to 10MB
                </p>
                <button className="inline-flex items-center gap-2 bg-tp-bronze text-tp-black px-6 py-3 rounded-tp-button font-medium text-sm hover:bg-tp-bronze-ink transition-colors">
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
                    <Image
                      src={previewUrl}
                      alt="Your selfie"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute top-3 left-3 bg-tp-black/70 backdrop-blur-sm text-tp-paper text-xs px-3 py-1 rounded-full">
                      Your Selfie
                    </div>
                  </div>
                )}
                {state !== 'idle' && (
                  <button
                    onClick={reset}
                    className="w-full py-3 text-sm text-tp-muted hover:text-tp-paper transition-colors"
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
              <div className="border border-tp-line rounded-tp-card p-8 md:p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-tp-ink flex items-center justify-center">
                  <ArrowRight className="h-5 w-5 text-tp-muted" />
                </div>
                <p className="text-tp-muted">
                  Your AI headshot previews will appear here
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
                  {state === 'uploading' ? 'Processing your selfie…' : 'Generating headshots…'}
                </p>
                {state === 'generating' && (
                  <>
                    <p className="text-tp-muted text-sm mb-4">
                      AI is creating your professional previews
                    </p>
                    <div className="inline-flex items-center gap-2 text-tp-bronze text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{elapsed.toFixed(1)}s</span>
                    </div>
                  </>
                )}
              </div>
            )}

            {state === 'done' && results.length > 0 && (
              <div>
                {/* Main result display */}
                <div className="rounded-tp-card overflow-hidden bg-tp-ink mb-4">
                  {results[selectedIdx]?.url ? (
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src={results[selectedIdx].url!}
                        alt={`AI Headshot Preview ${selectedIdx + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute top-3 left-3 bg-tp-black/70 backdrop-blur-sm text-tp-paper text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        AI Generated — {elapsed.toFixed(1)}s
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-[3/4] flex items-center justify-center text-tp-muted text-sm">
                      Generation failed
                    </div>
                  )}
                </div>

                {/* Thumbnail strip */}
                {results.length > 1 && (
                  <div className="flex gap-2 mb-6">
                    {results.map((r, i) => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedIdx(i)}
                        className={`relative flex-1 aspect-[3/4] rounded-lg overflow-hidden border-2 transition-colors ${
                          i === selectedIdx
                            ? 'border-tp-bronze'
                            : 'border-tp-line hover:border-tp-muted'
                        }`}
                      >
                        {r.url ? (
                          <Image
                            src={r.url}
                            alt={`Preview ${i + 1}`}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="absolute inset-0 bg-tp-ink flex items-center justify-center">
                            <AlertCircle className="h-4 w-4 text-tp-muted" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <Link
                  href="/auth/register"
                  className="flex items-center justify-center gap-2 w-full bg-tp-bronze text-tp-black py-4 rounded-tp-button font-medium hover:bg-tp-bronze-ink transition-colors"
                >
                  Get Full Headshot Package
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="text-center text-tp-muted text-xs mt-3">
                  Full packages include up to 160 photos with multiple styles &amp; backgrounds
                </p>
              </div>
            )}

            {state === 'error' && (
              <div className="border border-red-500/30 rounded-tp-card p-8 md:p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
                <p className="text-tp-paper text-lg font-medium mb-2">
                  Something went wrong
                </p>
                <p className="text-tp-muted text-sm mb-6">{errorMsg}</p>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 bg-tp-bronze text-tp-black px-6 py-3 rounded-tp-button font-medium text-sm hover:bg-tp-bronze-ink transition-colors"
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
              title: 'Under 15 Seconds',
              desc: 'No lengthy training. Get instant AI headshot previews from a single selfie.',
            },
            {
              icon: Camera,
              title: 'One Selfie Only',
              desc: 'No need for multiple photos. Just one clear selfie is all it takes.',
            },
            {
              icon: Sparkles,
              title: 'Multiple Styles',
              desc: 'Preview different professional looks — formal, casual, creative and more.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center p-6">
              <div className="mx-auto mb-4 w-10 h-10 rounded-full bg-tp-bronze/15 flex items-center justify-center">
                <Icon className="h-5 w-5 text-tp-bronze" />
              </div>
              <h3 className="text-tp-paper font-medium mb-2">{title}</h3>
              <p className="text-tp-muted text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
