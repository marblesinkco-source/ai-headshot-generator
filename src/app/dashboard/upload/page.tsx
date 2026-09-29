'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { PACKAGES, type PackageId } from '@/config/packages';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PhotoUploader } from '@/components/dashboard/photo-uploader';

type Step = 1 | 2 | 3;

const STEPS = [
  { num: 1, label: 'Choose Package' },
  { num: 2, label: 'Upload Photos' },
  { num: 3, label: 'Generate' },
] as const;

export default function UploadPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600" /></div>}>
      <UploadContent />
    </Suspense>
  );
}

function UploadContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get('orderId');

  const [currentStep, setCurrentStep] = useState<Step>(orderIdParam ? 2 : 1);
  const [selectedPackage, setSelectedPackage] = useState<PackageId | null>(null);
  const [orderId, setOrderId] = useState<string | null>(orderIdParam);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState<PackageId | null>(null);

  const supabase = createClient();

  // If orderId is in URL, load order details
  useEffect(() => {
    if (!orderIdParam) return;

    async function loadOrder() {
      const { data: order } = await supabase
        .from('orders')
        .select('id, package_id, status')
        .eq('id', orderIdParam!)
        .single();

      if (order) {
        setSelectedPackage(order.package_id as PackageId);
        setOrderId(order.id);

        if (order.status === 'processing' || order.status === 'completed') {
          setCurrentStep(3);
        } else {
          setCurrentStep(2);
        }
      }
    }

    loadOrder();
  }, [orderIdParam, supabase]);

  async function handleCheckout(packageId: PackageId) {
    setCheckoutLoading(packageId);
    setError(null);

    try {
      const response = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId }),
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

  async function handleGenerate() {
    if (!orderId) return;

    setGenerating(true);
    setGenerationStatus('Starting generation...');
    setError(null);

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

      setGenerationStatus('Your headshots are being generated. This may take 10-20 minutes.');
      setCurrentStep(3);

      // Poll for completion or redirect to gallery
      setTimeout(() => {
        router.push(`/dashboard/gallery/${orderId}`);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
      setGenerating(false);
      setGenerationStatus(null);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create New Headshots</h1>
        <p className="mt-1 text-sm text-gray-500">Follow the steps below to generate your AI headshots.</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between">
        {STEPS.map((step, idx) => (
          <div key={step.num} className="flex flex-1 items-center">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  currentStep >= step.num
                    ? 'bg-brand-600 text-white'
                    : 'bg-gray-200 text-gray-500'
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
                  currentStep >= step.num ? 'text-brand-700' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`mx-4 h-0.5 flex-1 transition-colors ${
                  currentStep > step.num ? 'bg-brand-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Choose Your Package</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {(Object.entries(PACKAGES) as [PackageId, typeof PACKAGES[PackageId]][]).map(
              ([id, pkg]) => {
                const isRecommended = 'recommended' in pkg && pkg.recommended;
                return (
                  <div
                    key={id}
                    className={`relative rounded-xl border-2 bg-white p-6 shadow-sm transition-all cursor-pointer hover:shadow-md ${
                      selectedPackage === id
                        ? 'border-brand-600 ring-2 ring-brand-100'
                        : isRecommended
                        ? 'border-brand-200'
                        : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedPackage(id)}
                  >
                    {isRecommended && (
                      <span className="absolute -top-3 left-4 rounded-full bg-brand-600 px-3 py-0.5 text-xs font-medium text-white">
                        Recommended
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                      {formatPrice(pkg.price, pkg.currency)}
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {pkg.headshots} headshots
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {pkg.backgrounds} backgrounds
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {pkg.styles} styles
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {pkg.resolution.toUpperCase()} resolution
                      </li>
                    </ul>
                    <Button
                      variant={selectedPackage === id ? 'primary' : 'outline'}
                      size="md"
                      className="mt-6 w-full"
                      loading={checkoutLoading === id}
                      disabled={checkoutLoading !== null && checkoutLoading !== id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCheckout(id);
                      }}
                    >
                      Select & Pay
                    </Button>
                  </div>
                );
              }
            )}
          </div>
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>
          )}
        </div>
      )}

      {currentStep === 2 && orderId && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Upload Your Photos</h2>
            <p className="mt-1 text-sm text-gray-500">
              Upload 4-10 clear photos of yourself. Include different angles and expressions for best results.
            </p>
          </div>

          <PhotoUploader
            orderId={orderId}
            onUploadComplete={(count) => setUploadedCount(count)}
          />

          <div className="flex justify-end">
            <Button
              variant="primary"
              size="md"
              disabled={uploadedCount < 4}
              onClick={() => setCurrentStep(3)}
            >
              Continue to Generate
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          {generationStatus ? (
            <div className="space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
                <svg className="h-8 w-8 animate-spin text-brand-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Generating Your Headshots</h3>
              <p className="text-sm text-gray-500">{generationStatus}</p>
              <p className="text-xs text-gray-400">You can close this page. We&apos;ll notify you when they&apos;re ready.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Ready to Generate</h3>
              <p className="text-sm text-gray-500">
                {uploadedCount} photos uploaded. Click below to start generating your AI headshots.
              </p>
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>
              )}
              <Button
                variant="primary"
                size="lg"
                loading={generating}
                onClick={handleGenerate}
              >
                Generate My Headshots
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
