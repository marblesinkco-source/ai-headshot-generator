'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { STORY_CONFIG } from '@/config/hero-storybook';
import { CATEGORIES } from '@/config/categories';
import { formatPrice } from '@/lib/utils';
import {
  BookOpen,
  Lock,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Download,
  CheckCircle,
  Loader2,
  Share2,
} from 'lucide-react';

const heroPkg = CATEGORIES['hero-storybook'].packages[0];
const heroPrice = formatPrice(heroPkg.price, heroPkg.currency, true);

interface StoryPage {
  id: string;
  page_number: number;
  title: string;
  text: string;
  scene_prompt: string;
  illustration_url: string | null;
  is_cover: boolean;
  status: string;
}

interface Story {
  id: string;
  hero_name: string;
  universe_id: string;
  occasion_id: string;
  cover_title: string;
  cover_subtitle: string;
  status: string;
  page_count: number;
  generation_progress: number;
}

export function StoryPreview({ storyId }: { storyId: string }) {
  const router = useRouter();
  const supabase = createClient();

  const [story, setStory] = useState<Story | null>(null);
  const [pages, setPages] = useState<StoryPage[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadStory = useCallback(async () => {
    try {
      const { data: storyData, error: storyError } = await supabase
        .from('hero_stories')
        .select('id, hero_name, universe_id, occasion_id, cover_title, cover_subtitle, status, page_count, generation_progress')
        .eq('id', storyId)
        .single();

      if (storyError || !storyData) {
        setError('Story not found');
        return;
      }

      setStory(storyData);

      const { data: pagesData } = await supabase
        .from('hero_story_pages')
        .select('*')
        .eq('story_id', storyId)
        .order('page_number', { ascending: true });

      setPages(pagesData || []);
    } catch {
      setError('Failed to load story');
    } finally {
      setLoading(false);
    }
  }, [storyId, supabase]);

  // Initial load
  useEffect(() => {
    loadStory();
  }, [loadStory]);

  // Poll for illustration progress when story is generating or paid
  useEffect(() => {
    if (!story) return;

    const shouldPoll = story.status === 'generating' || story.status === 'paid';
    if (!shouldPoll) {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
      return;
    }

    pollRef.current = setInterval(() => {
      loadStory();
    }, 5000);

    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [story?.status, loadStory]);

  async function handleCheckout() {
    if (!story) return;
    setCheckoutLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'category',
          categoryId: 'hero-storybook',
          packageId: 'hero-digital',
          storyId: story.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      // Open Paddle checkout overlay
      if (typeof window !== 'undefined' && (window as any).Paddle) {
        (window as any).Paddle.Checkout.open(data.checkout);
      } else {
        throw new Error('Payment system not loaded. Please refresh and try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed');
    } finally {
      setCheckoutLoading(false);
    }
  }

  function handleShare() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 text-center py-20">
        <div className="w-8 h-8 border-2 border-tp-bronze/30 border-t-tp-bronze rounded-full animate-spin mx-auto" />
        <p className="text-sm text-tp-muted mt-4">Loading your story...</p>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="max-w-xl mx-auto px-4 text-center py-20">
        <p className="text-red-600 mb-4">{error || 'Story not found'}</p>
        <Button onClick={() => router.push('/create-a-hero')} variant="outline">
          Start a New Story
        </Button>
      </div>
    );
  }

  const isPreviewPage = (idx: number) => idx < STORY_CONFIG.freePreviewPages;
  const isPaid = story.status === 'paid' || story.status === 'completed' || story.status === 'generating';
  const isGenerating = story.status === 'generating' || story.status === 'paid';
  const isCompleted = story.status === 'completed';
  const page = pages[currentPage];

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Story header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-800 rounded-full text-sm font-medium mb-4">
          <BookOpen className="w-4 h-4" />
          {isGenerating ? 'Generating Illustrations...' : isCompleted ? 'Story Complete' : 'Story Preview'}
        </div>
        <h1 className="font-display font-normal text-3xl sm:text-4xl text-tp-black mb-2">
          {story.cover_title || `The Adventures of ${story.hero_name}`}
        </h1>
        <p className="text-tp-ink">{story.cover_subtitle}</p>
      </div>

      {/* Illustration generation progress bar */}
      {isGenerating && (
        <div className="bg-amber-50 border border-amber-200 rounded-tp-card p-4 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Loader2 className="w-5 h-5 text-amber-600 animate-spin" />
            <p className="text-sm font-medium text-amber-800">
              Creating illustrations with {story.hero_name}&apos;s face...
            </p>
          </div>
          <div className="w-full bg-amber-200 rounded-full h-2">
            <div
              className="bg-amber-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${story.generation_progress || 0}%` }}
            />
          </div>
          <p className="text-xs text-amber-600 mt-1.5">
            {story.generation_progress || 0}% complete — this usually takes a few minutes
          </p>
        </div>
      )}

      {/* Page viewer */}
      <div className="bg-white rounded-tp-card border border-tp-line shadow-sm overflow-hidden mb-6">
        {page ? (
          <div className="relative">
            {/* Illustration */}
            <div className="aspect-[4/3] bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
              {page.illustration_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={page.illustration_url}
                  alt={page.title || 'Story illustration'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-8">
                  <BookOpen className="w-12 h-12 text-amber-300 mx-auto mb-3" />
                  <p className="text-sm text-amber-600">
                    {isGenerating
                      ? 'Illustration in progress...'
                      : !isPreviewPage(currentPage) && !isPaid
                        ? 'Illustration unlocked after purchase'
                        : 'Illustration will appear here'}
                  </p>
                </div>
              )}

              {/* Lock overlay for non-preview pages when not paid */}
              {!isPreviewPage(currentPage) && !isPaid && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center">
                  <div className="text-center text-white">
                    <Lock className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-semibold">This page is locked</p>
                    <p className="text-sm text-white/80 mt-1">
                      Purchase to unlock all {story.page_count} pages
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Page text */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display font-normal text-2xl text-tp-black">
                  {page.title}
                </h2>
                <span className="text-xs text-tp-muted bg-tp-beige px-2 py-0.5 rounded">
                  {currentPage + 1}/{pages.length}
                </span>
              </div>
              {(isPreviewPage(currentPage) || isPaid) ? (
                <p className="text-tp-ink leading-relaxed">{page.text}</p>
              ) : (
                <div className="space-y-2">
                  <div className="h-4 bg-tp-line/50 rounded w-full" />
                  <div className="h-4 bg-tp-line/50 rounded w-5/6" />
                  <div className="h-4 bg-tp-line/50 rounded w-4/6" />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-tp-muted">No pages available</div>
        )}
      </div>

      {/* Page navigation */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          disabled={currentPage === 0}
          className="gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {/* Page dots */}
        <div className="flex items-center gap-1">
          {pages.slice(0, Math.min(pages.length, 20)).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentPage
                  ? 'bg-tp-bronze w-4'
                  : isPreviewPage(idx) || isPaid
                    ? 'bg-tp-line hover:bg-tp-muted'
                    : 'bg-tp-line/50'
              }`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
          {pages.length > 20 && (
            <span className="text-xs text-tp-muted ml-1">+{pages.length - 20}</span>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.min(pages.length - 1, p + 1))}
          disabled={currentPage >= pages.length - 1}
          className="gap-1"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Purchase CTA — only when not paid */}
      {!isPaid && (
        <div className="bg-gradient-to-r from-amber-50 to-red-50 border border-amber-200 rounded-tp-card p-6 text-center">
          <h3 className="font-display font-normal text-xl text-tp-black mb-2">
            Unlock the Full Story
          </h3>
          <p className="text-tp-ink mb-4">
            Get all {story.page_count} pages with AI-generated illustrations
            featuring {story.hero_name}&apos;s face. Instant digital delivery.
          </p>
          <Button
            onClick={handleCheckout}
            disabled={checkoutLoading}
            className="gap-2 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white border-0 px-8"
            size="lg"
          >
            {checkoutLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Get Full Story — {heroPrice}
              </>
            )}
          </Button>
          <p className="text-xs text-tp-muted mt-3">
            PDF download included. Shareable link for family and friends.
          </p>
        </div>
      )}

      {/* Completed story actions */}
      {isCompleted && (
        <div className="bg-green-50 border border-green-200 rounded-tp-card p-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-3">
            <CheckCircle className="w-4 h-4" />
            Story Complete
          </div>
          <h3 className="font-display font-normal text-xl text-tp-black mb-2">
            {story.hero_name}&apos;s Story is Ready!
          </h3>
          <p className="text-tp-ink mb-4">
            All {story.page_count} pages are complete with personalized illustrations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <PdfDownloadButton />
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" />
              {copied ? 'Link Copied!' : 'Share Story'}
            </Button>
          </div>
        </div>
      )}

      {/* Failed story notice */}
      {story.status === 'failed' && (
        <div className="bg-red-50 border border-red-200 rounded-tp-card p-6 text-center">
          <h3 className="font-display font-normal text-xl text-tp-black mb-2">
            Something Went Wrong
          </h3>
          <p className="text-tp-ink mb-4">
            Some illustrations could not be generated. Our team has been notified.
          </p>
          <Button variant="outline" onClick={() => router.push('/contact')}>
            Contact Support
          </Button>
        </div>
      )}
    </div>
  );
}

/* ── Inline PDF download button with "coming soon" notice ── */
function PdfDownloadButton() {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    if (!showNotice) return;
    const t = setTimeout(() => setShowNotice(false), 3000);
    return () => clearTimeout(t);
  }, [showNotice]);

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => setShowNotice(true)}
      >
        <Download className="w-4 h-4" />
        Download PDF
      </Button>
      {showNotice && (
        <p className="flex items-center gap-1.5 text-sm text-tp-bronze-ink">
          <CheckCircle className="w-4 h-4" />
          PDF download will be available soon
        </p>
      )}
    </div>
  );
}
