'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  HERO_CONSENT_TEXT,
  HERO_MAX_PHOTOS,
  HERO_MIN_PHOTOS,
  HERO_OCCASIONS,
  HERO_QUESTIONS,
  HERO_UNIVERSES,
  findBlockedTerm,
  type HeroAnswerKey,
  type HeroAudience,
  type HeroOccasion,
  type HeroUniverseId,
} from '@/config/hero';
import { downscaleForUpload } from '@/lib/client-image';
import { cn } from '@/lib/utils';

const STEPS = ['Who', 'Details', 'Universe', 'Photos'] as const;

export default function HeroWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [audience, setAudience] = useState<HeroAudience | null>(null);
  const [occasion, setOccasion] = useState<HeroOccasion | null>(null);
  const [answers, setAnswers] = useState<Partial<Record<HeroAnswerKey, string>>>({});
  const [universe, setUniverse] = useState<HeroUniverseId | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const blocked = Object.entries(answers)
    .filter(([k]) => k !== 'name')
    .map(([, v]) => (v ? findBlockedTerm(v) : null))
    .find(Boolean);

  const canNext = [
    !!audience && !!occasion,
    !!answers.name?.trim() && !blocked,
    !!universe,
    photos.length >= HERO_MIN_PHOTOS && photos.length <= HERO_MAX_PHOTOS && consent,
  ][step];

  function addPhotos(list: FileList | null) {
    if (!list) return;
    const ok = Array.from(list).filter((f) => ['image/jpeg', 'image/png', 'image/webp'].includes(f.type));
    setPhotos((prev) => [...prev, ...ok].slice(0, HERO_MAX_PHOTOS));
  }

  async function submit() {
    setError(null);
    try {
      setBusy('Saving your answers…');
      const res = await fetch('/api/hero/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audience, occasion, universe, answers, consent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not create the book');
      const id: string = data.id;

      for (let i = 0; i < photos.length; i++) {
        setBusy(`Uploading photo ${i + 1} of ${photos.length}…`);
        const form = new FormData();
        form.append('photo', await downscaleForUpload(photos[i]));
        const up = await fetch(`/api/hero/books/${id}/photos`, { method: 'POST', body: form });
        if (!up.ok) throw new Error((await up.json()).error || 'Photo upload failed');
      }
      router.push(`/dashboard/hero/${id}?new=1`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setBusy(null);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-3xl font-normal text-tp-ink">Create a Hero</h1>
      <ol className="mt-6 flex gap-2" aria-label="Steps">
        {STEPS.map((s, i) => (
          <li
            key={s}
            aria-current={i === step ? 'step' : undefined}
            className={cn(
              'flex-1 rounded-tp-button border px-3 py-2 text-center text-xs font-medium',
              i === step ? 'border-tp-bronze bg-tp-black text-tp-bronze' : i < step ? 'border-tp-line bg-tp-beige/40 text-tp-ink' : 'border-tp-line text-tp-muted',
            )}
          >
            {i + 1}. {s}
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-tp-card border border-tp-line bg-white p-6">
        {step === 0 && (
          <div className="space-y-6">
            <fieldset>
              <legend className="font-semibold text-tp-ink">Who is the hero?</legend>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {(['child', 'adult'] as const).map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAudience(a)}
                    aria-pressed={audience === a}
                    className={cn('rounded-tp-button border p-4 text-left', audience === a ? 'border-tp-bronze bg-tp-beige/40' : 'border-tp-line')}
                  >
                    <span className="font-medium text-tp-ink">{a === 'child' ? 'A child' : 'An adult'}</span>
                    <span className="mt-1 block text-sm text-tp-muted">{a === 'child' ? 'Playful, ages 4–10' : 'Witty, full of in-jokes'}</span>
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="font-semibold text-tp-ink">What is the occasion?</legend>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {HERO_OCCASIONS.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setOccasion(o.id)}
                    aria-pressed={occasion === o.id}
                    className={cn('rounded-tp-button border px-4 py-3 text-sm', occasion === o.id ? 'border-tp-bronze bg-tp-beige/40 text-tp-ink' : 'border-tp-line text-tp-muted')}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-tp-muted">The more you share, the more personal the story. Only the name is required.</p>
            {HERO_QUESTIONS.map((q) => (
              <label key={q.key} className="block">
                <span className="text-sm font-medium text-tp-ink">
                  {q.label}
                  {q.required && ' *'}
                </span>
                <input
                  type="text"
                  maxLength={q.maxLength}
                  placeholder={q.placeholder}
                  value={answers[q.key] ?? ''}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, [q.key]: e.target.value }))}
                  className="mt-1 w-full rounded-tp-button border border-tp-line px-3 py-2 text-sm focus:border-tp-bronze focus:outline-none"
                />
              </label>
            ))}
            {blocked && (
              <p role="alert" className="text-sm text-tp-error">
                Please leave out &ldquo;{blocked}&rdquo;. Hero books only use original characters, so names from existing films, comics, games or
                brands can&apos;t be included.
              </p>
            )}
          </div>
        )}

        {step === 2 && (
          <fieldset>
            <legend className="font-semibold text-tp-ink">Choose a universe</legend>
            <p className="mt-1 text-sm text-tp-muted">Every universe is original: no characters or logos from existing films, comics or games.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {HERO_UNIVERSES.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setUniverse(u.id)}
                  aria-pressed={universe === u.id}
                  className={cn('rounded-tp-button border p-4 text-left', universe === u.id ? 'border-tp-bronze bg-tp-beige/40' : 'border-tp-line')}
                >
                  <span className="font-medium text-tp-ink">{u.name}</span>
                  <span className="mt-1 block text-sm text-tp-muted">{u.tagline}</span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className="font-semibold text-tp-ink">
              Add {HERO_MIN_PHOTOS}–{HERO_MAX_PHOTOS} photos of {answers.name || 'the hero'}
            </p>
            <p className="text-sm text-tp-muted">Clear, well-lit photos of one face, from slightly different angles. No sunglasses or group shots.</p>
            <label className="flex cursor-pointer flex-col items-center rounded-tp-card border-2 border-dashed border-tp-line p-6 text-sm text-tp-muted hover:border-tp-bronze">
              <span>Choose photos (JPG, PNG or WebP)</span>
              <input type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" onChange={(e) => addPhotos(e.target.files)} />
            </label>
            {photos.length > 0 && (
              <ul className="grid grid-cols-5 gap-2">
                {photos.map((p, i) => (
                  <li key={`${p.name}-${i}`} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={URL.createObjectURL(p)} alt={`Photo ${i + 1}`} className="aspect-square w-full rounded-tp-button object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotos((prev) => prev.filter((_, j) => j !== i))}
                      className="absolute right-1 top-1 rounded-full bg-tp-black px-2 text-xs text-tp-bronze"
                      aria-label={`Remove photo ${i + 1}`}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <label className="flex items-start gap-3 rounded-tp-button bg-tp-paper p-3 text-sm text-tp-ink">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
              <span>{HERO_CONSENT_TEXT}</span>
            </label>
          </div>
        )}

        {error && (
          <p role="alert" className="mt-4 text-sm text-tp-error">
            {error}
          </p>
        )}

        <div className="mt-8 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setStep((s) => s - 1)} disabled={step === 0 || !!busy}>
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext}>
              Continue
            </Button>
          ) : (
            <Button onClick={submit} disabled={!canNext || !!busy} loading={!!busy}>
              {busy ?? 'Write my hero book'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
