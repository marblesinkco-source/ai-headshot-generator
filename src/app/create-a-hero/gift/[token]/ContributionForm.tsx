'use client';

import { useState, useEffect, useCallback } from 'react';
import { HERO_UNIVERSES, HERO_OCCASIONS, HERO_QUESTIONS } from '@/config/hero-storybook';
import { Button } from '@/components/ui/button';
import { Loader2, Heart, Send, CheckCircle } from 'lucide-react';

interface StoryInfo {
  heroName: string;
  universeId: string;
  occasionId: string;
  organizerName: string | null;
  coverTitle: string;
  contributionCount: number;
}

const MESSAGE_MAX_LENGTH = 1000;

/** Questions contributors can optionally answer (skip 'name' — organizer fills that). */
const CONTRIBUTOR_QUESTIONS = HERO_QUESTIONS.filter(
  (q) => q.id !== 'name' && !q.required,
);

export function ContributionForm({ token }: { token: string }) {
  const [storyInfo, setStoryInfo] = useState<StoryInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Form state
  const [contributorName, setContributorName] = useState('');
  const [contributorEmail, setContributorEmail] = useState('');
  const [message, setMessage] = useState('');
  const [questionAnswers, setQuestionAnswers] = useState<Record<string, string>>({});
  const [showQuestions, setShowQuestions] = useState(false);

  // Submit state
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fetchStoryInfo = useCallback(async () => {
    try {
      const res = await fetch(`/api/hero/group-gift/${encodeURIComponent(token)}`);
      if (!res.ok) {
        setNotFound(true);
        return;
      }
      const data = await res.json();
      setStoryInfo(data);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchStoryInfo();
  }, [fetchStoryInfo]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!contributorName.trim() || !message.trim()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/hero/group-gift/contribute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          contributor_name: contributorName.trim(),
          contributor_email: contributorEmail.trim() || undefined,
          message: message.trim(),
          question_answers:
            Object.keys(questionAnswers).length > 0 ? questionAnswers : undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to submit. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="max-w-xl mx-auto px-4 text-center py-20">
        <div className="w-8 h-8 border-2 border-tp-bronze/30 border-t-tp-bronze rounded-full animate-spin mx-auto" />
        <p className="text-sm text-tp-muted mt-4">Loading...</p>
      </div>
    );
  }

  /* ── Not found ── */
  if (notFound || !storyInfo) {
    return (
      <div className="max-w-xl mx-auto px-4 text-center py-20">
        <p className="text-tp-ink text-lg mb-2">This gift link is not valid.</p>
        <p className="text-tp-muted text-sm">
          It may have expired or the link may be incorrect.
        </p>
      </div>
    );
  }

  const universe = HERO_UNIVERSES.find((u) => u.id === storyInfo.universeId);
  const occasion = HERO_OCCASIONS.find((o) => o.id === storyInfo.occasionId);

  /* ── Success ── */
  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="font-display font-normal text-3xl text-tp-black mb-3">
          Thank You!
        </h1>
        <p className="text-tp-ink text-lg leading-relaxed">
          Your memory has been added to {storyInfo.heroName}&apos;s story.
        </p>
        <p className="text-tp-muted text-sm mt-4">
          {storyInfo.organizerName
            ? `${storyInfo.organizerName} will include your contribution in the final storybook.`
            : 'The organizer will include your contribution in the final storybook.'}
        </p>
      </div>
    );
  }

  /* ── Contribution form ── */
  return (
    <div className="max-w-xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-800 rounded-full text-sm font-medium mb-4">
          <Heart className="w-4 h-4" />
          Group Gift
        </div>

        <h1 className="font-display font-normal text-3xl sm:text-4xl text-tp-black mb-3">
          Contribute to {storyInfo.heroName}&apos;s Story
        </h1>

        <p className="text-tp-ink leading-relaxed max-w-md mx-auto">
          {storyInfo.organizerName
            ? `${storyInfo.organizerName} is creating`
            : 'Someone special is creating'}{' '}
          a personalized storybook for {storyInfo.heroName}. Share a memory,
          funny story, or heartfelt message to make it extra special.
        </p>
      </div>

      {/* Story info badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {universe && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-tp-beige text-tp-ink rounded-full text-sm">
            <span>{universe.icon}</span>
            {universe.name}
          </span>
        )}
        {occasion && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-tp-beige text-tp-ink rounded-full text-sm">
            <span>{occasion.icon}</span>
            {occasion.name}
          </span>
        )}
        {storyInfo.contributionCount > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-tp-beige text-tp-ink rounded-full text-sm">
            {storyInfo.contributionCount}{' '}
            {storyInfo.contributionCount === 1 ? 'contribution' : 'contributions'} so
            far
          </span>
        )}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-tp-line rounded-tp-card p-6 sm:p-8 space-y-5"
      >
        {/* Name */}
        <div>
          <label
            htmlFor="contributor-name"
            className="block text-sm font-medium text-tp-black mb-1.5"
          >
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            id="contributor-name"
            type="text"
            required
            maxLength={100}
            value={contributorName}
            onChange={(e) => setContributorName(e.target.value)}
            placeholder="e.g. Alex, The Marketing Team"
            className="w-full px-3 py-2 border border-tp-line rounded-tp-button text-tp-black placeholder:text-tp-muted focus:outline-none focus:ring-2 focus:ring-tp-bronze/30 focus:border-tp-bronze"
          />
        </div>

        {/* Email (optional) */}
        <div>
          <label
            htmlFor="contributor-email"
            className="block text-sm font-medium text-tp-black mb-1.5"
          >
            Your Email{' '}
            <span className="text-tp-muted font-normal">(optional)</span>
          </label>
          <input
            id="contributor-email"
            type="email"
            maxLength={254}
            value={contributorEmail}
            onChange={(e) => setContributorEmail(e.target.value)}
            placeholder="alex@example.com"
            className="w-full px-3 py-2 border border-tp-line rounded-tp-button text-tp-black placeholder:text-tp-muted focus:outline-none focus:ring-2 focus:ring-tp-bronze/30 focus:border-tp-bronze"
          />
          <p className="text-xs text-tp-muted mt-1">
            Only used to notify you when the storybook is complete.
          </p>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="contributor-message"
            className="block text-sm font-medium text-tp-black mb-1.5"
          >
            Your Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="contributor-message"
            required
            maxLength={MESSAGE_MAX_LENGTH}
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Share a memory, funny story, or heartfelt message about ${storyInfo.heroName}...`}
            className="w-full px-3 py-2 border border-tp-line rounded-tp-button text-tp-black placeholder:text-tp-muted focus:outline-none focus:ring-2 focus:ring-tp-bronze/30 focus:border-tp-bronze resize-none"
          />
          <p
            className={`text-xs mt-1 text-right ${
              message.length > MESSAGE_MAX_LENGTH * 0.9
                ? 'text-red-500'
                : 'text-tp-muted'
            }`}
          >
            {message.length}/{MESSAGE_MAX_LENGTH}
          </p>
        </div>

        {/* Optional hero questions */}
        <div>
          <button
            type="button"
            onClick={() => setShowQuestions(!showQuestions)}
            className="text-sm text-tp-bronze-ink hover:text-tp-bronze transition-colors"
          >
            {showQuestions ? 'Hide' : 'Show'} optional questions about{' '}
            {storyInfo.heroName}
          </button>

          {showQuestions && (
            <div className="mt-4 space-y-4 border-t border-tp-line pt-4">
              <p className="text-xs text-tp-muted">
                Help make the story richer by answering any of these about{' '}
                {storyInfo.heroName}:
              </p>
              {CONTRIBUTOR_QUESTIONS.map((q) => (
                <div key={q.id}>
                  <label
                    htmlFor={`q-${q.id}`}
                    className="block text-sm font-medium text-tp-black mb-1"
                  >
                    {q.label}
                  </label>
                  {q.type === 'textarea' ? (
                    <textarea
                      id={`q-${q.id}`}
                      maxLength={q.maxLength || 500}
                      rows={2}
                      value={questionAnswers[q.id] || ''}
                      onChange={(e) =>
                        setQuestionAnswers((prev) => ({
                          ...prev,
                          [q.id]: e.target.value,
                        }))
                      }
                      placeholder={q.placeholder}
                      className="w-full px-3 py-2 border border-tp-line rounded-tp-button text-tp-black placeholder:text-tp-muted text-sm focus:outline-none focus:ring-2 focus:ring-tp-bronze/30 focus:border-tp-bronze resize-none"
                    />
                  ) : (
                    <input
                      id={`q-${q.id}`}
                      type="text"
                      maxLength={q.maxLength || 300}
                      value={questionAnswers[q.id] || ''}
                      onChange={(e) =>
                        setQuestionAnswers((prev) => ({
                          ...prev,
                          [q.id]: e.target.value,
                        }))
                      }
                      placeholder={q.placeholder}
                      className="w-full px-3 py-2 border border-tp-line rounded-tp-button text-tp-black placeholder:text-tp-muted text-sm focus:outline-none focus:ring-2 focus:ring-tp-bronze/30 focus:border-tp-bronze"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Error */}
        {submitError && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-tp-button">
            {submitError}
          </p>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={submitting || !contributorName.trim() || !message.trim()}
          className="w-full gap-2 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white border-0"
          size="lg"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit Your Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
