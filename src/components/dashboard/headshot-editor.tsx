'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const BACKGROUND_PRESETS = [
  { id: 'studio_white', label: 'Studio White', desc: 'Clean white studio background' },
  { id: 'studio_gray', label: 'Studio Gray', desc: 'Neutral gray studio' },
  { id: 'office', label: 'Modern Office', desc: 'Corporate office with warm lighting' },
  { id: 'outdoor', label: 'Outdoor', desc: 'Green trees and golden hour sunlight' },
  { id: 'gradient_blue', label: 'Blue Gradient', desc: 'Professional blue gradient' },
  { id: 'cityscape', label: 'City Skyline', desc: 'Blurred city at sunset' },
  { id: 'brick_wall', label: 'Brick Wall', desc: 'Exposed red brick with warm lighting' },
  { id: 'minimalist', label: 'Minimalist', desc: 'Clean beige with subtle texture' },
  { id: 'window_light', label: 'Window Light', desc: 'Bright window with natural light' },
  { id: 'library', label: 'Library', desc: 'Warm wooden bookshelves' },
];

const OUTFIT_MAX = 500;
const BACKGROUND_MAX = 300;

type Tab = 'outfit' | 'background';
type Phase = 'idle' | 'loading' | 'error' | 'result';

interface HeadshotRow {
  id: string;
  order_id: string;
  storage_path: string;
  status: string;
  user_id: string;
}

interface EditResponse {
  success?: boolean;
  url?: string;
  error?: string;
}

function Spinner({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={`${className} animate-spin`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
      <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function HeadshotEditor() {
  const params = useParams();
  const rawId = params?.headshotId;
  const headshotId = Array.isArray(rawId) ? rawId[0] : (rawId as string | undefined);

  const [headshot, setHeadshot] = useState<HeadshotRow | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [loadingHeadshot, setLoadingHeadshot] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [tab, setTab] = useState<Tab>('outfit');
  const [outfit, setOutfit] = useState('');
  const [preset, setPreset] = useState<string | null>(null);
  const [customBg, setCustomBg] = useState('');

  const [phase, setPhase] = useState<Phase>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultKind, setResultKind] = useState<Tab>('outfit');

  const galleryHref = headshot?.order_id
    ? `/dashboard/gallery/${headshot.order_id}`
    : '/dashboard/gallery';

  useEffect(() => {
    if (!headshotId) {
      setLoadError('Headshot not found.');
      setLoadingHeadshot(false);
      return;
    }
    let cancelled = false;

    async function load() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('generated_headshots')
          .select('id, order_id, storage_path, status, user_id')
          .eq('id', headshotId as string)
          .eq('status', 'completed')
          .single();

        const row = data as unknown as HeadshotRow | null;
        if (error || !row) {
          if (!cancelled) setLoadError('Headshot not found or not ready yet.');
          return;
        }

        const { data: signedData, error: signError } = await supabase.storage
          .from('headshots')
          .createSignedUrl(row.storage_path, 3600);

        if (signError || !signedData?.signedUrl) {
          if (!cancelled) setLoadError('Could not load the headshot image.');
          return;
        }

        if (!cancelled) {
          setHeadshot(row);
          setOriginalUrl(signedData.signedUrl);
        }
      } catch {
        if (!cancelled) setLoadError('Something went wrong while loading the headshot.');
      } finally {
        if (!cancelled) setLoadingHeadshot(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [headshotId]);

  const trimmedOutfit = outfit.trim();
  const trimmedBg = customBg.trim();
  const canApply =
    phase !== 'loading' &&
    (tab === 'outfit' ? trimmedOutfit.length > 0 : preset !== null || trimmedBg.length > 0);

  const apply = useCallback(async () => {
    if (!headshotId || !canApply) return;
    setPhase('loading');
    setErrorMsg('');
    setResultKind(tab);

    try {
      let endpoint: string;
      let body: Record<string, string>;

      if (tab === 'outfit') {
        endpoint = '/api/ai/outfit-change';
        body = { headshotId, outfitDescription: trimmedOutfit };
      } else {
        endpoint = '/api/ai/background-change';
        body = trimmedBg
          ? { headshotId, customBackground: trimmedBg }
          : { headshotId, backgroundPreset: preset as string };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = (await res.json().catch(() => ({}))) as EditResponse;

      if (!res.ok || !json.url) {
        setErrorMsg(json.error || 'Something went wrong. Please try again.');
        setPhase('error');
        return;
      }

      setResultUrl(json.url);
      setPhase('result');
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setPhase('error');
    }
  }, [headshotId, canApply, tab, trimmedOutfit, trimmedBg, preset]);

  const download = useCallback(async () => {
    if (!resultUrl) return;
    try {
      const res = await fetch(resultUrl);
      const blob = await res.blob();
      const href = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = href;
      a.download = `tailorpic-${resultKind}-edit.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(href);
    } catch {
      window.open(resultUrl, '_blank', 'noopener,noreferrer');
    }
  }, [resultUrl, resultKind]);

  const switchTab = (next: Tab) => {
    if (phase === 'loading') return;
    setTab(next);
    if (phase !== 'idle') {
      setPhase('idle');
      setResultUrl(null);
      setErrorMsg('');
    }
  };

  const tabClass = (active: boolean) =>
    `flex-1 rounded-tp-button px-4 py-2.5 text-sm font-semibold transition-colors ${
      active
        ? 'bg-tp-black text-tp-paper'
        : 'text-tp-muted hover:text-tp-ink'
    }`;

  const backLink = (
    <Link
      href={galleryHref}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-tp-muted transition-colors hover:text-tp-ink"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
      Back to Gallery
    </Link>
  );

  if (loadingHeadshot) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-tp-muted" role="status">
        <Spinner className="h-6 w-6" />
        <span className="ml-3 text-sm">Loading headshot...</span>
      </div>
    );
  }

  if (loadError || !headshot || !originalUrl) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 text-center">
        <h1 className="font-display text-3xl font-normal text-tp-ink">Headshot unavailable</h1>
        <p className="mt-3 text-sm text-tp-muted">{loadError || 'Headshot not found.'}</p>
        <div className="mt-6">{backLink}</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="mb-6">{backLink}</div>

      <h1 className="font-display text-3xl font-normal text-tp-ink sm:text-4xl">Edit Headshot</h1>
      <p className="mt-2 text-sm text-tp-muted">
        Change the outfit or background. Your face and pose stay the same.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Controls */}
        <section className="rounded-tp-card border border-tp-line bg-tp-paper p-4 sm:p-6">
          <div className="flex gap-1 rounded-tp-button bg-tp-beige p-1" role="tablist" aria-label="Edit type">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'outfit'}
              onClick={() => switchTab('outfit')}
              className={tabClass(tab === 'outfit')}
            >
              Change Outfit
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'background'}
              onClick={() => switchTab('background')}
              className={tabClass(tab === 'background')}
            >
              Change Background
            </button>
          </div>

          {tab === 'outfit' ? (
            <div className="mt-5" role="tabpanel">
              <label htmlFor="outfit-description" className="text-sm font-semibold text-tp-ink">
                Describe the outfit
              </label>
              <textarea
                id="outfit-description"
                value={outfit}
                maxLength={OUTFIT_MAX}
                onChange={(e) => setOutfit(e.target.value)}
                disabled={phase === 'loading'}
                rows={5}
                placeholder="e.g. Navy blazer over a white shirt, no tie"
                className="mt-2 w-full resize-none rounded-tp-button border border-tp-line bg-white p-3 text-sm text-tp-ink placeholder:text-tp-muted focus:border-tp-bronze focus:outline-none focus:ring-2 focus:ring-tp-bronze/30 disabled:opacity-60"
              />
              <p className="mt-1 text-right text-xs text-tp-muted">
                {outfit.length}/{OUTFIT_MAX}
              </p>
            </div>
          ) : (
            <div className="mt-5" role="tabpanel">
              <p className="text-sm font-semibold text-tp-ink">Choose a background</p>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:gap-3">
                {BACKGROUND_PRESETS.map((p) => {
                  const selected = preset === p.id && trimmedBg.length === 0;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      aria-pressed={selected}
                      disabled={phase === 'loading'}
                      onClick={() => {
                        setPreset(p.id);
                        setCustomBg('');
                      }}
                      className={`rounded-tp-button border p-3 text-left transition-colors disabled:opacity-60 ${
                        selected
                          ? 'border-tp-bronze bg-tp-beige'
                          : 'border-tp-line bg-white hover:border-tp-bronze'
                      }`}
                    >
                      <span className="block text-sm font-semibold text-tp-ink">{p.label}</span>
                      <span className="mt-0.5 block text-xs text-tp-muted">{p.desc}</span>
                    </button>
                  );
                })}
              </div>

              <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wide text-tp-muted">
                <span className="h-px flex-1 bg-tp-line" />
                or
                <span className="h-px flex-1 bg-tp-line" />
              </div>

              <label htmlFor="custom-background" className="text-sm font-semibold text-tp-ink">
                Custom Background
              </label>
              <textarea
                id="custom-background"
                value={customBg}
                maxLength={BACKGROUND_MAX}
                onChange={(e) => {
                  setCustomBg(e.target.value);
                  if (e.target.value.trim()) setPreset(null);
                }}
                disabled={phase === 'loading'}
                rows={3}
                placeholder="e.g. Sunlit loft with large industrial windows"
                className="mt-2 w-full resize-none rounded-tp-button border border-tp-line bg-white p-3 text-sm text-tp-ink placeholder:text-tp-muted focus:border-tp-bronze focus:outline-none focus:ring-2 focus:ring-tp-bronze/30 disabled:opacity-60"
              />
              <p className="mt-1 text-right text-xs text-tp-muted">
                {customBg.length}/{BACKGROUND_MAX}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={apply}
            disabled={!canApply}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-tp-button bg-tp-bronze px-5 py-3 text-sm font-semibold text-tp-black transition-colors hover:bg-tp-bronze-ink hover:text-tp-paper disabled:cursor-not-allowed disabled:opacity-50"
          >
            {phase === 'loading' ? (
              <>
                <Spinner className="h-4 w-4" />
                Generating...
              </>
            ) : (
              'Apply'
            )}
          </button>
        </section>

        {/* Preview / result */}
        <section className="rounded-tp-card border border-tp-line bg-tp-paper p-4 sm:p-6" aria-live="polite">
          {phase === 'loading' && (
            <div className="flex min-h-[320px] flex-col items-center justify-center text-center text-tp-muted" role="status">
              <Spinner className="h-8 w-8" />
              <p className="mt-4 text-sm font-semibold text-tp-ink">Generating...</p>
              <p className="mt-1 text-xs">This can take up to a minute.</p>
            </div>
          )}

          {phase === 'error' && (
            <div className="flex min-h-[320px] flex-col items-center justify-center text-center" role="alert">
              <p className="text-sm font-semibold text-tp-ink">We couldn&apos;t apply that edit</p>
              <p className="mt-2 max-w-xs text-sm text-tp-muted">{errorMsg}</p>
              <button
                type="button"
                onClick={apply}
                className="mt-5 rounded-tp-button bg-tp-black px-5 py-2.5 text-sm font-semibold text-tp-paper transition-colors hover:bg-tp-ink"
              >
                Try Again
              </button>
            </div>
          )}

          {phase === 'result' && resultUrl && (
            <div>
              <div className="grid grid-cols-2 gap-3">
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={originalUrl}
                    alt="Original headshot"
                    className="aspect-[3/4] w-full rounded-tp-button bg-tp-beige object-cover"
                    decoding="async"
                  />
                  <figcaption className="mt-2 text-center text-xs font-medium text-tp-muted">Original</figcaption>
                </figure>
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resultUrl}
                    alt="Edited headshot"
                    className="aspect-[3/4] w-full rounded-tp-button bg-tp-beige object-cover"
                    decoding="async"
                  />
                  <figcaption className="mt-2 text-center text-xs font-medium text-tp-ink">Edited</figcaption>
                </figure>
              </div>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={download}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-tp-button bg-tp-black px-5 py-3 text-sm font-semibold text-tp-paper transition-colors hover:bg-tp-ink"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPhase('idle');
                    setResultUrl(null);
                  }}
                  className="rounded-tp-button border border-tp-line px-5 py-3 text-sm font-semibold text-tp-ink transition-colors hover:border-tp-bronze"
                >
                  Edit again
                </button>
              </div>
            </div>
          )}

          {phase === 'idle' && (
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={originalUrl}
                alt="Original headshot"
                className="mx-auto aspect-[3/4] w-full max-w-sm rounded-tp-button bg-tp-beige object-cover"
                decoding="async"
              />
              <figcaption className="mt-2 text-center text-xs font-medium text-tp-muted">Original</figcaption>
            </figure>
          )}
        </section>
      </div>
    </div>
  );
}
