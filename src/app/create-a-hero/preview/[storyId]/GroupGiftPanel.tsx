'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Users,
  Link as LinkIcon,
  CheckCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  MessageCircle,
} from 'lucide-react';

interface Contribution {
  id: string;
  contributor_name: string;
  contributor_email: string | null;
  message: string;
  question_answers: Record<string, string> | null;
  created_at: string;
}

export function GroupGiftPanel({ storyId }: { storyId: string }) {
  const [isGroupGift, setIsGroupGift] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shareUrl = token
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/create-a-hero/gift/${token}`
    : null;

  const loadContributions = useCallback(async () => {
    try {
      const res = await fetch(`/api/hero/group-gift/contributions/${storyId}`);
      if (res.ok) {
        const data = await res.json();
        setContributions(data.contributions || []);
      }
    } catch {
      // silently fail — contributions are supplementary
    }
  }, [storyId]);

  // Check if story already has a group gift token (via story data)
  useEffect(() => {
    async function checkGroupGift() {{
      try {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        const { data } = await supabase
          .from('hero_stories')
          .select('is_group_gift, group_gift_token')
          .eq('id', storyId)
          .single();

        if (data?.is_group_gift && data?.group_gift_token) {
          setIsGroupGift(true);
          setToken(data.group_gift_token);
        }
      } catch {
        // not critical
      }
    }}
    checkGroupGift();
  }, [storyId]);

  // Load contributions when expanded or when group gift is active
  useEffect(() => {
    if (isGroupGift && expanded) {
      setLoading(true);
      loadContributions().finally(() => setLoading(false));
    }
  }, [isGroupGift, expanded, loadContributions]);

  async function handleCreateGroupGift() {
    setCreating(true);
    setError(null);

    try {
      const res = await fetch('/api/hero/group-gift/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storyId }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to create group gift link.');
      }

      const data = await res.json();
      setToken(data.token);
      setIsGroupGift(true);
      setExpanded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setCreating(false);
    }
  }

  function handleCopy() {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function formatDate(dateStr: string) {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return '';
    }
  }

  return (
    <div className="bg-white border border-tp-line rounded-tp-card overflow-hidden">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-tp-bronze-ink" />
            <h3 className="font-display font-normal text-lg text-tp-black">
              Group Gift
            </h3>
            {contributions.length > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 bg-tp-bronze text-white text-xs rounded-full">
                {contributions.length}
              </span>
            )}
          </div>

          {isGroupGift && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="text-tp-muted hover:text-tp-ink transition-colors"
              aria-label={expanded ? 'Collapse' : 'Expand'}
            >
              {expanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          )}
        </div>

        {!isGroupGift && (
          <div className="mt-3">
            <p className="text-sm text-tp-ink mb-3">
              Let friends, family, or colleagues contribute memories and messages
              to make this story extra special.
            </p>

            {error && (
              <p className="text-sm text-red-600 mb-2">{error}</p>
            )}

            <Button
              onClick={handleCreateGroupGift}
              disabled={creating}
              variant="outline"
              className="gap-2"
              size="sm"
            >
              {creating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Users className="w-4 h-4" />
                  Create Group Gift Link
                </>
              )}
            </Button>
          </div>
        )}

        {isGroupGift && !expanded && (
          <p className="text-sm text-tp-muted mt-1">
            {contributions.length > 0
              ? `${contributions.length} ${contributions.length === 1 ? 'contribution' : 'contributions'} received`
              : 'Share the link to collect contributions'}
          </p>
        )}
      </div>

      {/* Expanded content */}
      {isGroupGift && expanded && (
        <div className="border-t border-tp-line">
          {/* Share link */}
          <div className="p-5 bg-tp-beige/50">
            <label className="block text-sm font-medium text-tp-black mb-2">
              Share this link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl || ''}
                className="flex-1 px-3 py-2 bg-white border border-tp-line rounded-tp-button text-sm text-tp-ink truncate"
                onFocus={(e) => e.target.select()}
              />
              <Button
                onClick={handleCopy}
                variant="outline"
                size="sm"
                className="shrink-0 gap-1.5"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-4 h-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-tp-muted mt-2">
              Anyone with this link can contribute a message — no sign-up required.
            </p>
          </div>

          {/* Contributions list */}
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-tp-black">
                Contributions
              </h4>
              <button
                type="button"
                onClick={() => {
                  setLoading(true);
                  loadContributions().finally(() => setLoading(false));
                }}
                className="text-xs text-tp-bronze-ink hover:text-tp-bronze transition-colors"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="w-5 h-5 text-tp-muted animate-spin" />
              </div>
            ) : contributions.length === 0 ? (
              <div className="text-center py-6">
                <MessageCircle className="w-8 h-8 text-tp-line mx-auto mb-2" />
                <p className="text-sm text-tp-muted">
                  No contributions yet. Share the link to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-72 overflow-y-auto">
                {contributions.map((c) => (
                  <div
                    key={c.id}
                    className="border border-tp-line rounded-tp-button p-3"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-tp-black">
                        {c.contributor_name}
                      </span>
                      <span className="text-xs text-tp-muted">
                        {formatDate(c.created_at)}
                      </span>
                    </div>
                    <p className="text-sm text-tp-ink line-clamp-3">
                      {c.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
