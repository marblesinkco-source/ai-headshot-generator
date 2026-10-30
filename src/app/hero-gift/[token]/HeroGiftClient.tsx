'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HERO_MEMORY_MAX_LENGTH } from '@/config/hero';

interface GiftInfo {
  heroName: string;
  occasion: string;
  universe: string;
  note: string | null;
  signedBy: string[];
  full: boolean;
}

export default function HeroGiftClient({ token }: { token: string }) {
  const [info, setInfo] = useState<GiftInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    fetch(`/api/hero/gift/${token}`)
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || 'This gift link is not active');
        setInfo(d);
      })
      .catch((e) => setError(e.message));
  }, [token]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);
    const r = await fetch(`/api/hero/gift/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message }),
    });
    const d = await r.json();
    setSending(false);
    if (!r.ok) return setError(d.error || 'Could not send your message');
    setSent(true);
  }

  if (!info) {
    return <p className="mx-auto max-w-xl text-center text-tp-muted">{error ?? 'Loading…'}</p>;
  }

  return (
    <div className="mx-auto max-w-xl">
      <p className="text-center text-sm font-medium uppercase tracking-wider text-tp-bronze-ink">Group gift</p>
      <h1 className="mt-3 text-center font-display text-4xl font-normal text-tp-ink">{info.heroName} is becoming a hero</h1>
      <p className="mt-4 text-center text-tp-muted">
        A friend is making {info.heroName} an illustrated {info.universe} story book
        {info.occasion ? ` for their ${info.occasion.toLowerCase()}` : ''}. Add a memory or a message and it will appear at the end of the book.
      </p>
      {info.note && <blockquote className="mt-6 rounded-tp-card bg-white p-4 text-tp-ink">&ldquo;{info.note}&rdquo;</blockquote>}

      {sent ? (
        <div className="mt-8 rounded-tp-card border border-tp-line bg-white p-6 text-center">
          <p className="font-medium text-tp-ink">Thank you. Your message has been added.</p>
          <p className="mt-2 text-sm text-tp-muted">
            Want one for someone you know? <Link href="/create-a-hero" className="underline">Create a hero book</Link>.
          </p>
        </div>
      ) : info.full ? (
        <p className="mt-8 text-center text-tp-muted">This book has all the messages it can hold.</p>
      ) : (
        <form onSubmit={send} className="mt-8 space-y-4 rounded-tp-card border border-tp-line bg-white p-6">
          <label className="block">
            <span className="text-sm font-medium text-tp-ink">Your first name</span>
            <input
              required
              maxLength={60}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-tp-button border border-tp-line px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-tp-ink">A memory or message for {info.heroName}</span>
            <textarea
              required
              maxLength={HERO_MEMORY_MAX_LENGTH}
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="The time they saved the launch with a single spreadsheet…"
              className="mt-1 w-full rounded-tp-button border border-tp-line px-3 py-2 text-sm"
            />
          </label>
          <p className="text-xs text-tp-muted">Your name and message are shown to the organiser and printed in the book.</p>
          {error && (
            <p role="alert" className="text-sm text-tp-error">
              {error}
            </p>
          )}
          <Button type="submit" loading={sending} disabled={sending}>
            Add my message
          </Button>
        </form>
      )}
      {info.signedBy.length > 0 && (
        <p className="mt-6 text-center text-sm text-tp-muted">Already signed by {info.signedBy.join(', ')}</p>
      )}
    </div>
  );
}
