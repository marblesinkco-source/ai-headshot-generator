'use client';

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import {
  HERO_UNIVERSES,
  HERO_OCCASIONS,
  HERO_QUESTIONS,
  STORY_CONFIG,
  type HeroUniverse,
  type HeroOccasion,
} from '@/config/hero-storybook';
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  X,
  BookOpen,
  Sparkles,
  Shield,
  Check,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type WizardStep = 'universe' | 'occasion' | 'profile' | 'photos' | 'generating';

interface UploadedPhoto {
  id: string;
  file: File;
  preview: string;
}

/* ------------------------------------------------------------------ */
/*  Step indicator                                                     */
/* ------------------------------------------------------------------ */

const STEPS: { id: WizardStep; label: string }[] = [
  { id: 'universe', label: 'Universe' },
  { id: 'occasion', label: 'Occasion' },
  { id: 'profile', label: 'Hero Details' },
  { id: 'photos', label: 'Photos' },
];

function StepIndicator({
  current,
  steps,
}: {
  current: WizardStep;
  steps: typeof STEPS;
}) {
  const currentIdx = steps.findIndex((s) => s.id === current);
  return (
    <nav className="flex items-center justify-center gap-2 mb-10">
      {steps.map((step, idx) => {
        const done = idx < currentIdx;
        const active = idx === currentIdx;
        return (
          <div key={step.id} className="flex items-center gap-2">
            <div
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-all',
                done && 'bg-tp-black text-white',
                active && 'bg-tp-bronze text-white ring-2 ring-tp-bronze/30 ring-offset-2',
                !done && !active && 'bg-tp-line text-tp-muted',
              )}
            >
              {done ? <Check className="w-4 h-4" /> : idx + 1}
            </div>
            <span
              className={cn(
                'hidden sm:inline text-sm font-medium',
                active ? 'text-tp-black' : 'text-tp-muted',
              )}
            >
              {step.label}
            </span>
            {idx < steps.length - 1 && (
              <div className={cn('w-8 h-px', idx < currentIdx ? 'bg-tp-black' : 'bg-tp-line')} />
            )}
          </div>
        );
      })}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Main wizard                                                        */
/* ------------------------------------------------------------------ */

export function HeroWizard() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState<WizardStep>('universe');
  const [universe, setUniverse] = useState<string | null>(null);
  const [occasion, setOccasion] = useState<string | null>(null);
  const [profile, setProfile] = useState<Record<string, string>>({});
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedUniverse = HERO_UNIVERSES.find((u) => u.id === universe);

  /* Navigation helpers */
  function goNext() {
    const order: WizardStep[] = ['universe', 'occasion', 'profile', 'photos'];
    const idx = order.indexOf(step);
    if (idx < order.length - 1) setStep(order[idx + 1]);
  }

  function goBack() {
    const order: WizardStep[] = ['universe', 'occasion', 'profile', 'photos'];
    const idx = order.indexOf(step);
    if (idx > 0) setStep(order[idx - 1]);
  }

  function canProceed(): boolean {
    switch (step) {
      case 'universe':
        return universe !== null;
      case 'occasion':
        return occasion !== null;
      case 'profile':
        return (profile.name || '').trim().length > 0;
      case 'photos':
        return photos.length >= STORY_CONFIG.minPhotos && consent;
      default:
        return false;
    }
  }

  /* Photo handling */
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const remaining = STORY_CONFIG.maxPhotos - photos.length;
      const newPhotos = acceptedFiles.slice(0, remaining).map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        file,
        preview: URL.createObjectURL(file),
      }));
      setPhotos((prev) => [...prev, ...newPhotos]);
    },
    [photos.length],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxSize: 10 * 1024 * 1024,
    maxFiles: STORY_CONFIG.maxPhotos - photos.length,
    disabled: photos.length >= STORY_CONFIG.maxPhotos,
  });

  function removePhoto(id: string) {
    setPhotos((prev) => {
      const removed = prev.find((p) => p.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return prev.filter((p) => p.id !== id);
    });
  }

  /* Submit: create story + upload photos + redirect to preview */
  async function handleSubmit() {
    if (!universe || !occasion || !profile.name || photos.length < STORY_CONFIG.minPhotos || !consent) return;

    setLoading(true);
    setError(null);

    try {
      // Check auth
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/login?redirect=/create-a-hero');
        return;
      }

      // Create story record
      const { data: story, error: storyError } = await supabase
        .from('hero_stories')
        .insert({
          user_id: user.id,
          hero_name: profile.name,
          universe_id: universe,
          occasion_id: occasion,
          profile: profile,
          consent_given: true,
          consent_timestamp: new Date().toISOString(),
          status: 'draft',
        })
        .select('id')
        .single();

      if (storyError || !story) {
        throw new Error(storyError?.message || 'Failed to create story');
      }

      // Upload photos
      for (const photo of photos) {
        const ext = photo.file.name.split('.').pop() || 'jpg';
        const path = `hero-stories/${story.id}/${photo.id}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from('photos')
          .upload(path, photo.file);

        if (uploadError) {
          console.error('Photo upload failed:', uploadError);
          continue;
        }

        // Record in hero_story_photos
        await supabase.from('hero_story_photos').insert({
          story_id: story.id,
          user_id: user.id,
          file_path: path,
          file_name: photo.file.name,
          file_size: photo.file.size,
          mime_type: photo.file.type,
        });
      }

      // Navigate to generation/preview step
      setStep('generating');

      // Trigger story generation API
      const res = await fetch('/api/hero/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storyId: story.id }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Generation failed');
      }

      // Redirect to preview
      router.push(`/create-a-hero/preview/${story.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  }

  /* -------------------------------------------------------------- */
  /*  Render                                                         */
  /* -------------------------------------------------------------- */

  if (step === 'generating') {
    return (
      <div className="max-w-xl mx-auto px-4 text-center py-20">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <h2 className="font-display font-normal text-3xl text-tp-black mb-3">
          Crafting Your Story
        </h2>
        <p className="text-tp-ink mb-8">
          Our AI is writing and illustrating {profile.name}&apos;s epic adventure.
          This usually takes a couple of minutes.
        </p>
        <div className="w-full bg-tp-line rounded-full h-2 mb-4">
          <div
            className="bg-gradient-to-r from-amber-500 to-red-600 h-2 rounded-full transition-all duration-1000"
            style={{ width: '15%' }}
          />
        </div>
        <p className="text-sm text-tp-muted">Writing the opening chapter...</p>
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-tp-card text-red-700 text-sm">
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-800 rounded-full text-sm font-medium mb-4">
          <BookOpen className="w-4 h-4" />
          Create a Hero
        </div>
        <h1 className="font-display font-normal text-4xl sm:text-5xl text-tp-black mb-3">
          Turn Anyone Into a Hero
        </h1>
        <p className="text-tp-ink text-lg max-w-xl mx-auto">
          Build a personalized AI storybook starring someone special.
          The perfect gift for any occasion.
        </p>
      </div>

      <StepIndicator current={step} steps={STEPS} />

      {/* Step content */}
      <div className="bg-white rounded-tp-card border border-tp-line p-6 sm:p-8 shadow-sm">
        {/* ── Universe selection ── */}
        {step === 'universe' && (
          <div>
            <h2 className="font-display font-normal text-2xl text-tp-black mb-2">
              Choose an Adventure Universe
            </h2>
            <p className="text-tp-ink mb-6">
              Pick the world your hero will explore. Each universe has its own art style and story arc.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HERO_UNIVERSES.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setUniverse(u.id)}
                  className={cn(
                    'flex items-start gap-4 p-4 rounded-tp-card border-2 text-left transition-all hover:shadow-md',
                    universe === u.id
                      ? 'border-tp-bronze bg-amber-50/50 shadow-sm'
                      : 'border-tp-line hover:border-tp-bronze/40',
                  )}
                >
                  <span className="text-3xl flex-shrink-0 mt-0.5">{u.icon}</span>
                  <div>
                    <h3 className="font-semibold text-tp-black">{u.name}</h3>
                    <p className="text-sm text-tp-ink mt-0.5">{u.description}</p>
                    {universe === u.id && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {u.sampleChapters.map((ch) => (
                          <span
                            key={ch}
                            className="inline-block text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full"
                          >
                            {ch}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Occasion ── */}
        {step === 'occasion' && (
          <div>
            <h2 className="font-display font-normal text-2xl text-tp-black mb-2">
              What&apos;s the Occasion?
            </h2>
            <p className="text-tp-ink mb-6">
              This shapes the tone and arc of the story.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {HERO_OCCASIONS.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setOccasion(o.id)}
                  className={cn(
                    'flex flex-col items-center gap-2 p-4 rounded-tp-card border-2 transition-all hover:shadow-md',
                    occasion === o.id
                      ? 'border-tp-bronze bg-amber-50/50 shadow-sm'
                      : 'border-tp-line hover:border-tp-bronze/40',
                  )}
                >
                  <span className="text-2xl">{o.icon}</span>
                  <span className="text-sm font-medium text-tp-black text-center">{o.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Hero profile ── */}
        {step === 'profile' && (
          <div>
            <h2 className="font-display font-normal text-2xl text-tp-black mb-2">
              Tell Us About the Hero
            </h2>
            <p className="text-tp-ink mb-6">
              The more details you share, the more personal the story becomes.
              Only the name is required.
            </p>
            <div className="space-y-5">
              {HERO_QUESTIONS.map((q) => (
                <div key={q.id}>
                  <label
                    htmlFor={`hero-${q.id}`}
                    className="block text-sm font-medium text-tp-black mb-1.5"
                  >
                    {q.label}
                    {q.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {q.type === 'textarea' ? (
                    <textarea
                      id={`hero-${q.id}`}
                      value={profile[q.id] || ''}
                      onChange={(e) => setProfile({ ...profile, [q.id]: e.target.value })}
                      placeholder={q.placeholder}
                      maxLength={q.maxLength}
                      rows={3}
                      className="w-full px-3 py-2 border border-tp-line rounded-tp-button text-sm text-tp-black placeholder:text-tp-muted focus:outline-none focus:ring-2 focus:ring-tp-bronze/30 focus:border-tp-bronze resize-none"
                    />
                  ) : (
                    <input
                      id={`hero-${q.id}`}
                      type="text"
                      value={profile[q.id] || ''}
                      onChange={(e) => setProfile({ ...profile, [q.id]: e.target.value })}
                      placeholder={q.placeholder}
                      maxLength={q.maxLength}
                      className="w-full px-3 py-2 border border-tp-line rounded-tp-button text-sm text-tp-black placeholder:text-tp-muted focus:outline-none focus:ring-2 focus:ring-tp-bronze/30 focus:border-tp-bronze"
                    />
                  )}
                  {q.maxLength && (profile[q.id] || '').length > q.maxLength * 0.8 && (
                    <p className="text-xs text-tp-muted mt-1 text-right">
                      {(profile[q.id] || '').length}/{q.maxLength}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Photos + consent ── */}
        {step === 'photos' && (
          <div>
            <h2 className="font-display font-normal text-2xl text-tp-black mb-2">
              Upload Photos of the Hero
            </h2>
            <p className="text-tp-ink mb-6">
              Upload {STORY_CONFIG.minPhotos}–{STORY_CONFIG.maxPhotos} clear photos of{' '}
              {profile.name || 'the hero'}. These are used to generate illustrations
              with their face in the story.
            </p>

            {/* Dropzone */}
            <div
              {...getRootProps()}
              className={cn(
                'border-2 border-dashed rounded-tp-card p-8 text-center cursor-pointer transition-all mb-4',
                isDragActive
                  ? 'border-tp-bronze bg-amber-50/50'
                  : photos.length >= STORY_CONFIG.maxPhotos
                    ? 'border-tp-line bg-tp-beige/30 cursor-not-allowed'
                    : 'border-tp-line hover:border-tp-bronze/50 hover:bg-amber-50/30',
              )}
            >
              <input {...getInputProps()} />
              <Upload className="w-8 h-8 mx-auto mb-3 text-tp-muted" />
              {photos.length >= STORY_CONFIG.maxPhotos ? (
                <p className="text-sm text-tp-muted">
                  Maximum {STORY_CONFIG.maxPhotos} photos reached
                </p>
              ) : isDragActive ? (
                <p className="text-sm text-tp-bronze font-medium">Drop photos here</p>
              ) : (
                <p className="text-sm text-tp-ink">
                  Drag &amp; drop photos here, or{' '}
                  <span className="text-tp-bronze font-medium">browse</span>
                </p>
              )}
              <p className="text-xs text-tp-muted mt-1">JPEG, PNG, or WebP. Up to 10 MB each.</p>
            </div>

            {/* Photo grid */}
            {photos.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
                {photos.map((photo) => (
                  <div key={photo.id} className="relative group aspect-square rounded-tp-button overflow-hidden border border-tp-line">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.preview}
                      alt="Uploaded photo"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removePhoto(photo.id)}
                      className="absolute top-1 right-1 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-sm text-tp-muted mb-6">
              {photos.length} / {STORY_CONFIG.maxPhotos} photos uploaded
              {photos.length < STORY_CONFIG.minPhotos && (
                <span className="text-red-500 ml-1">
                  (minimum {STORY_CONFIG.minPhotos} required)
                </span>
              )}
            </p>

            {/* Photo tips */}
            <div className="bg-tp-beige/50 rounded-tp-card p-4 mb-6">
              <h3 className="text-sm font-semibold text-tp-black mb-2">Photo Tips</h3>
              <ul className="text-sm text-tp-ink space-y-1">
                <li>• Use clear, well-lit photos with the face clearly visible</li>
                <li>• Include at least one front-facing photo</li>
                <li>• Variety helps: different angles and expressions</li>
                <li>• Avoid heavy filters, sunglasses, or face coverings</li>
              </ul>
            </div>

            {/* KVKK/GDPR consent */}
            <div className="border border-tp-line rounded-tp-card p-4 bg-white">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-tp-bronze flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-tp-black mb-1">
                    Photo Consent &amp; Privacy
                  </h3>
                  <p className="text-xs text-tp-ink mb-3">
                    By uploading photos, you confirm that you have permission to use
                    these photos and that the person depicted (or their legal guardian)
                    has given consent. Photos are used solely to generate illustrations
                    for this storybook and are automatically deleted after{' '}
                    {STORY_CONFIG.photoRetentionDays} days. They are never used for
                    model training.
                  </p>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-tp-line text-tp-bronze focus:ring-tp-bronze/30"
                    />
                    <span className="text-sm text-tp-black">
                      I confirm I have the right to upload these photos and consent
                      to their use for generating this storybook.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-tp-button text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-tp-line">
          <Button
            variant="outline"
            onClick={goBack}
            disabled={step === 'universe'}
            className="gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          {step === 'photos' ? (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed() || loading}
              className="gap-2 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white border-0"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Create Story — $19
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={goNext}
              disabled={!canProceed()}
              className="gap-1 bg-tp-black hover:bg-tp-ink text-white"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Trust strip */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-tp-muted">
        <span className="flex items-center gap-1.5">
          <Shield className="w-4 h-4" />
          Photos deleted after {STORY_CONFIG.photoRetentionDays} days
        </span>
        <span className="flex items-center gap-1.5">
          <BookOpen className="w-4 h-4" />
          16–24 page personalized story
        </span>
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" />
          AI-illustrated with their face
        </span>
      </div>
    </div>
  );
}
