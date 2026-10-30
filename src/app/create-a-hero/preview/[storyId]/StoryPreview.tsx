'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { STORY_CONFIG } from '@/config/hero-storybook';
import {
  BookOpen,
  Lock,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Download,
  CheckCircle,
} from 'lucide-react';

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

  useEffect(() => {
    async function loadStory() {
      try {
        const { data: storyData, error: storyError } = await supabase
          .from('hero_stories')
          .select('id, hero_name, universe_id, occasion_id, cover_title, cover_subtitle, status, page_count')
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
      } catch (err) {
        setError('Failed to load story');
      } finally {
        setLoading(false);
      }
    }

    loadStory();
  }, [storyId, supabase]);

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
        (window as any).Paddle.Checkout.open(data.checkoutConfig);
      } else {
        throw new Error('Payment system not loaded. Please refresh and try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed');
    } finally {
      setCheckoutLoading(false);
    }
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
  const isPaid = story.status === 'paid' || story.status === 'completed';
  const page = pages[currentPage];

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Story header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-800 rounded-full text-sm font-medium mb-4">
          <BookOpen className="w-4 h-4" />
          Story Preview
        </div>
        <h1 className="font-display font-normal text-3xl sm:text-4xl text-tp-black mb-2">
          {story.cover_title || `The Adventures of ${story.hero_name}`}
        </h1>
        <p className="text-tp-ink">{story.cover_subtitle}</p>
      </div>

      {/* Page viewer */}
      <div className="bg-white rounded-tp-card border border-tp-line shadow-sm overflow-hidden mb-6">
        {page ? (
          <div className="relative">
            {/* Illustration placeholder */}
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
                    {!isPreviewPage(currentPage) && !isPaid
                      ? 'Illustration unlocked after purchase'
                      : 'Illustration generating...'}
                  </p>
                </div>
              )}

              {/* Lock overlay for non-preview pages */}
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
              <h2 className="font-display font-normal text-2xl text-tp-black mb-3">
                {page.title}
              </h2>
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

        <span className="text-sm text-tp-muted">
          Page {currentPage + 1} of {pages.length}
          {!isPaid && currentPage >= STORY_CONFIG.freePreviewPages && ' (locked)'}
        </span>

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

      {/* Purchase CTA */}
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
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Get Full Story — $19
              </>
            )}
          </Button>
          <p className="text-xs text-tp-muted mt-3">
            PDF download included. Shareable link for family and friends.
          </p>
        </div>
      )}

      {/* Completed story CTA */}
      {isPaid && story.status === 'completed' && (
        <div className="bg-green-50 border border-green-200 rounded-tp-card p-6 text-center">
          <h3 className="font-display font-normal text-xl text-tp-black mb-2">
            Your Story is Ready!
          </h3>
          <p className="text-tp-ink mb-4">
            All {story.page_count} pages are complete with personalized illustrations.
          </p>
          <PdfDownloadButton />
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
        <p className="flex items-center gap-1.5 text-sm text-tp-bronze-ink animate-in fade-in duration-200">
          <CheckCircle className="w-4 h-4" />
          PDF download will be available soon
        </p>
      )}
    </div>
  );
}
