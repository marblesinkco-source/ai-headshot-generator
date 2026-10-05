'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  getActiveCategories,
  getCategoryById,
  getCategoryPackages,
  getPackageById,
  CATEGORY_GROUPS,
  type CategoryId,
} from '@/config/categories';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PhotoUploader } from '@/components/dashboard/photo-uploader';
import { PhotoGuidelines, PhotoQuickTips } from '@/components/upload/photo-guidelines';

type Step = 1 | 2 | 3 | 4;

const STEPS = [
  { num: 1, label: 'Category' },
  { num: 2, label: 'Package' },
  { num: 3, label: 'Upload' },
  { num: 4, label: 'Generate' },
] as const;

export default function UploadClient() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tp-black" /></div>}>
      <UploadContent />
    </Suspense>
  );
}

function UploadContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get('orderId');
  const categoryParam = searchParams.get('category') as CategoryId | null;

  const [currentStep, setCurrentStep] = useState<Step>(orderIdParam ? 3 : categoryParam ? 2 : 1);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(categoryParam);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(orderIdParam);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  const supabase = createClient();
  const activeCategories = getActiveCategories();
  const category = selectedCategory ? getCategoryById(selectedCategory) : null;
  const categoryPackages = selectedCategory ? getCategoryPackages(selectedCategory) : [];

  // If orderId is in URL, load order details
  useEffect(() => {
    if (!orderIdParam) return;

    async function loadOrder() {
      const { data: order } = await supabase
        .from('orders')
        .select('id, package_id, category_id, status')
        .eq('id', orderIdParam!)
        .single();

      if (order) {
        setSelectedCategory((order.category_id || 'headshots') as CategoryId);
        setSelectedPackage(order.package_id);
        setOrderId(order.id);

        // Fetch existing upload count so the UI shows the correct state on reload
        const { count } = await supabase
          .from('uploaded_photos')
          .select('id', { count: 'exact', head: true })
          .eq('order_id', order.id);

        if (count && count > 0) {
          setUploadedCount(count);
        }

        if (order.status === 'processing' || order.status === 'completed') {
          setCurrentStep(4);
        } else {
          setCurrentStep(3);
        }
      }
    }

    loadOrder();
  }, [orderIdParam, supabase]);

  function handleCategorySelect(catId: CategoryId) {
    setSelectedCategory(catId);
    setSelectedPackage(null);
    setCurrentStep(2);
  }

  async function handleCheckout(packageId: string, couponCode?: string) {
    if (!selectedCategory) return;

    setCheckoutLoading(packageId);
    setError(null);

    try {
      const response = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId: selectedCategory,
          packageId,
          ...(couponCode && { couponCode }),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setCheckoutLoading(null);
    }
  }

  // Training/generation progress tracking
  const [progressPhase, setProgressPhase] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [generationStats, setGenerationStats] = useState({ total: 0, completed: 0 });

  // Poll for AI processing status
  useEffect(() => {
    if (!generating || !orderId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/ai/status?orderId=${orderId}`);
        if (!res.ok) return;

        const data = await res.json();

        setProgressPhase(data.phase);
        setProgressPercent(data.progress);
        setGenerationStats({
          total: data.generation.total,
          completed: data.generation.completed,
        });

        if (data.phase === 'training') {
          setGenerationStatus(
            `Training AI model on your photos... ${data.estimatedMinutesRemaining ? `~${data.estimatedMinutesRemaining} min remaining` : ''}`
          );
        } else if (data.phase === 'generating') {
          setGenerationStatus(
            `Generating your ${category?.outputLabel || 'photos'}... ${data.generation.completed}/${data.generation.total} complete`
          );
        } else if (data.phase === 'completed') {
          setGenerationStatus('All done! Redirecting to your gallery...');
          clearInterval(interval);
          setTimeout(() => {
            router.push(`/dashboard/orders/${orderId}`);
          }, 2000);
        } else if (data.phase === 'failed') {
          setGenerationStatus(null);
          setError('Generation failed. Please contact support.');
          setGenerating(false);
          clearInterval(interval);
        }
      } catch {
        // Silently ignore polling errors
      }
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(interval);
  }, [generating, orderId, category, router]);

  async function handleGenerate() {
    if (!orderId) return;

    setGenerating(true);
    setGenerationStatus('Starting AI training on your photos...');
    setError(null);
    setProgressPhase('training');
    setProgressPercent(5);

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to start generation');
      }

      setGenerationStatus(data.message || 'Training AI model on your photos...');
      setCurrentStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
      setGenerating(false);
      setGenerationStatus(null);
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-normal text-tp-black">Create New Photos</h1>
        <p className="mt-1 text-sm text-tp-muted">Choose a category, pick your package, upload photos, and let AI do the magic.</p>
      </div>

      {/* Step Indicator */}
      <nav aria-label="Progress" className="flex items-center justify-between">
        {STEPS.map((step, idx) => (
          <div key={step.num} className="flex flex-1 items-center">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  currentStep >= step.num
                    ? 'bg-tp-black text-tp-bronze'
                    : 'bg-tp-beige/50 text-tp-muted'
                }`}
              >
                {currentStep > step.num ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  step.num
                )}
              </div>
              <span
                className={`hidden text-sm font-medium sm:block ${
                  currentStep >= step.num ? 'text-tp-bronze-ink' : 'text-tp-muted'
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`mx-4 h-0.5 flex-1 transition-colors ${
                  currentStep > step.num ? 'bg-tp-black' : 'bg-tp-line'
                }`}
              />
            )}
          </div>
        ))}
      </nav>

      {/* Step 1: Category Selection */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <h2 className="font-display text-lg font-normal text-tp-black">What would you like to create?</h2>

          {CATEGORY_GROUPS.map((group) => {
            const groupCategories = activeCategories.filter((c) =>
              group.categories.includes(c.id)
            );
            if (groupCategories.length === 0) return null;

            return (
              <div key={group.title} className="space-y-3">
                <h3 className="text-sm font-medium text-tp-muted uppercase tracking-wider">
                  {group.title}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {groupCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`group relative rounded-tp-card border-2 bg-white p-5 text-left shadow-sm transition-all hover:shadow-md hover:border-tp-line ${
                        selectedCategory === cat.id
                          ? 'border-tp-black ring-2 ring-tp-beige/30'
                          : 'border-tp-line'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{cat.icon}</span>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-tp-ink group-hover:text-tp-bronze-ink transition-colors">
                            {cat.name}
                          </h4>
                          <p className="mt-1 text-xs text-tp-muted line-clamp-2">
                            {cat.tagline}
                          </p>
                          <p className="mt-2 text-xs font-medium text-tp-bronze-ink">
                            From {formatPrice(cat.packages[0]?.price || 0, cat.packages[0]?.currency || 'usd')}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Step 2: Package Selection */}
      {currentStep === 2 && category && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentStep(1)}
              className="text-sm text-tp-muted hover:text-tp-bronze-ink transition-colors flex items-center gap-1"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back
            </button>
            <span className="text-2xl">{category.icon}</span>
            <h2 className="font-display text-lg font-normal text-tp-black">
              {category.name} — Choose Your Package
            </h2>
          </div>

          <div className={`grid gap-4 ${
            categoryPackages.length >= 4
              ? 'sm:grid-cols-2 lg:grid-cols-4'
              : categoryPackages.length === 3
                ? 'sm:grid-cols-3'
                : 'sm:grid-cols-2'
          }`}>
            {categoryPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-tp-card border-2 bg-white p-6 shadow-sm transition-all cursor-pointer hover:shadow-md ${
                  selectedPackage === pkg.id
                    ? 'border-tp-black ring-2 ring-tp-beige/30'
                    : pkg.recommended
                    ? 'border-tp-line'
                    : 'border-tp-line'
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {pkg.recommended && (
                  <span className="absolute -top-3 left-4 rounded-full bg-tp-black px-3 py-0.5 text-xs font-medium text-tp-bronze">
                    Recommended
                  </span>
                )}
                <h3 className="text-lg font-semibold text-tp-ink">{pkg.name}</h3>
                <p className="mt-2 font-display text-3xl font-normal text-tp-black">
                  {formatPrice(pkg.price, pkg.currency)}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-tp-muted">
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-tp-bronze flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {pkg.outputCount} {category.outputLabel}
                  </li>
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-tp-bronze flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={selectedPackage === pkg.id ? 'primary' : 'outline'}
                  size="md"
                  className="mt-6 w-full"
                  loading={checkoutLoading === pkg.id}
                  disabled={checkoutLoading !== null && checkoutLoading !== pkg.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCheckout(pkg.id);
                  }}
                >
                  Select & Pay
                </Button>
              </div>
            ))}
          </div>
          {/* Avatar Bundle Upsell */}
          {selectedCategory === 'avatars' && selectedPackage === 'avatar-starter' && (() => {
            const starterPkg = getPackageById('avatars', 'avatar-starter');
            const megaPkg = getPackageById('avatars', 'avatar-mega');
            if (!starterPkg || !megaPkg) return null;
            return (
              <div className="relative overflow-hidden rounded-tp-card border-2 border-tp-bronze bg-tp-paper p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-tp-beige/40 text-lg" aria-hidden="true">🎁</span>
                    <div>
                      <h4 className="font-semibold text-tp-ink">
                        Upgrade to {megaPkg.outputCount} Avatars — Best Value
                      </h4>
                      <p className="mt-0.5 text-sm text-tp-muted">
                        Add <strong className="text-tp-bronze-ink">{megaPkg.outputCount - starterPkg.outputCount} more avatars</strong> with 5 extra style categories + 4K resolution for just <strong className="text-tp-bronze-ink">{formatPrice(megaPkg.price - starterPkg.price)} more</strong>
                      </p>
                      <p className="mt-1 text-xs text-tp-muted">
                        {megaPkg.outputCount} avatars for just {formatPrice(megaPkg.price)} total
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    className="whitespace-nowrap bg-tp-black text-tp-bronze hover:bg-tp-ink border-0"
                    loading={checkoutLoading === 'avatar-mega'}
                    disabled={checkoutLoading !== null && checkoutLoading !== 'avatar-mega'}
                    onClick={() => {
                      setSelectedPackage('avatar-mega');
                      handleCheckout('avatar-mega');
                    }}
                  >
                    Get {megaPkg.outputCount} Avatars — {formatPrice(megaPkg.price)}
                  </Button>
                </div>
              </div>
            );
          })()}

          {/* Cross-sell: Add Avatar Pack to any non-avatar order */}
          {selectedCategory && selectedCategory !== 'avatars' && selectedPackage && (() => {
            const avatarPkg = getPackageById('avatars', 'avatar-starter');
            if (!avatarPkg) return null;
            const originalPrice = formatPrice(avatarPkg.price);
            const discountedPrice = formatPrice(Math.round(avatarPkg.price * 0.8));
            return (
              <div className="relative overflow-hidden rounded-tp-card border-2 border-tp-line bg-tp-paper p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-tp-beige/40 text-lg" aria-hidden="true">🎭</span>
                    <div>
                      <h4 className="font-semibold text-tp-ink">
                        Add AI Avatars — Special Bundle Price
                      </h4>
                      <p className="mt-0.5 text-sm text-tp-muted">
                        Get <strong className="text-tp-bronze-ink">{avatarPkg.outputCount} unique AI avatars</strong> of yourself for just <strong className="text-tp-bronze-ink">{discountedPrice}</strong> <span className="line-through text-tp-muted/70">{originalPrice}</span> — 20% off when bundled!
                      </p>
                      <p className="mt-1 text-xs text-tp-muted">
                        Fantasy, Anime, Cyberpunk & 12 more styles — your face, every universe
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    className="whitespace-nowrap bg-tp-black text-tp-bronze hover:bg-tp-ink border-0"
                    loading={checkoutLoading === 'avatar-starter'}
                    disabled={checkoutLoading !== null && checkoutLoading !== 'avatar-starter'}
                    onClick={() => {
                      setSelectedCategory('avatars' as CategoryId);
                      setSelectedPackage('avatar-starter');
                      handleCheckout('avatar-starter', 'AVATAR20');
                    }}
                  >
                    Add Avatars — {discountedPrice}
                  </Button>
                </div>
              </div>
            );
          })()}

          {error && (
            <div role="alert" className="rounded-tp-button border border-tp-line bg-tp-paper p-3 text-sm text-red-700">{error}</div>
          )}
        </div>
      )}

      {/* Step 3: Upload Photos */}
      {currentStep === 3 && orderId && (
        <div className="space-y-6">
          <div>
            <h2 className="font-display text-lg font-normal text-tp-black">Upload Your Photos</h2>
            <p className="mt-1 text-sm text-tp-muted">
              {category?.uploadInstructions ||
                'Upload 4-10 clear photos. Include different angles and expressions for best results.'}
            </p>
          </div>

          <PhotoGuidelines />

          <PhotoQuickTips />

          <PhotoUploader
            orderId={orderId}
            onUploadComplete={(count) => setUploadedCount(count)}
          />

          <div className="flex justify-end">
            <Button
              variant="primary"
              size="md"
              disabled={uploadedCount < (category?.minPhotos || 4)}
              onClick={() => setCurrentStep(4)}
            >
              Continue to Generate
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Generate */}
      {currentStep === 4 && (
        <div className="rounded-tp-card border border-tp-line bg-white p-8 text-center shadow-sm">
          {generationStatus ? (
            <div className="space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-tp-paper">
                {progressPhase === 'completed' ? (
                  <svg className="h-8 w-8 text-tp-bronze" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="h-8 w-8 animate-spin text-tp-bronze" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
              </div>

              <h3 className="text-lg font-semibold text-tp-black">
                {progressPhase === 'training'
                  ? 'Training AI on Your Photos'
                  : progressPhase === 'generating'
                    ? `Generating Your ${category?.name || 'Photos'}`
                    : progressPhase === 'completed'
                      ? 'All Done!'
                      : `Creating Your ${category?.name || 'Photos'}`}
              </h3>

              {/* Progress bar */}
              <div className="mx-auto max-w-md">
                <div className="flex items-center justify-between text-xs text-tp-muted mb-1">
                  <span>{progressPhase === 'training' ? 'Training model...' : progressPhase === 'generating' ? `${generationStats.completed}/${generationStats.total} photos` : ''}</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-tp-paper">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-tp-bronze to-tp-bronze-ink transition-all duration-1000 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Phase indicators */}
              <div className="mx-auto flex max-w-sm items-center justify-center gap-6 text-xs">
                <div className={`flex items-center gap-1.5 ${progressPhase === 'training' ? 'text-tp-bronze font-medium' : progressPercent > 50 ? 'text-tp-bronze-ink' : 'text-tp-muted'}`}>
                  {progressPercent > 50 ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : progressPhase === 'training' ? (
                    <div className="h-2 w-2 rounded-full bg-tp-bronze animate-pulse" />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-tp-line" />
                  )}
                  AI Training
                </div>
                <div className="h-px w-8 bg-tp-line" />
                <div className={`flex items-center gap-1.5 ${progressPhase === 'generating' ? 'text-tp-bronze font-medium' : progressPhase === 'completed' ? 'text-tp-bronze-ink' : 'text-tp-muted'}`}>
                  {progressPhase === 'completed' ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : progressPhase === 'generating' ? (
                    <div className="h-2 w-2 rounded-full bg-tp-bronze animate-pulse" />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-tp-line" />
                  )}
                  Photo Generation
                </div>
              </div>

              <p className="text-sm text-tp-muted">{generationStatus}</p>
              <p className="text-xs text-tp-muted">You can close this page. We&apos;ll email you when your photos are ready.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-tp-beige/30">
                <svg className="h-8 w-8 text-tp-bronze" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-tp-black">Ready to Generate</h3>
              <p className="text-sm text-tp-muted">
                {uploadedCount} photos uploaded. Our AI will train a personalized model on your photos, then generate your {category?.outputLabel || 'AI photos'}. This takes about 15-20 minutes.
              </p>
              {error && (
                <div role="alert" className="rounded-tp-button border border-tp-line bg-tp-paper p-3 text-sm text-red-700">{error}</div>
              )}
              <Button
                variant="primary"
                size="lg"
                loading={generating}
                onClick={handleGenerate}
              >
                Generate My {category?.name || 'Photos'}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
