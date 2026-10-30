'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { BookOpen, Copy, Gift, Lock, Printer } from 'lucide-react';

interface Page {
  index: number;
  locked: boolean;
  text: string | null;
  imageUrl: string | null;
  illustrated: boolean;
}

interface Book {
  id: string;
  status: string;
  error: string | null;
  heroName: string;
  title: string | null;
  dedication: string | null;
  pageCount: number;
  previewPages: number;
  paid: boolean;
  pages: Page[];
  photosAvailable: boolean;
  gift: { token: string; note: string | null } | null;
  memories: { id: string; name: string; message: string }[];
  checkoutAvailable: boolean;
  priceCents: number;
}

type PaddleWindow = { Paddle?: { Checkout: { open: (opts: Record<string, unknown>) => void } } };

export default function HeroBookClient({ id }: { id: string }) {
  const params = useSearchParams();
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [working, setWorking] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const running = useRef(false);

  const load = useCallback(async () => {
    const res = await fetch(`/api/hero/books/${id}`, { cache: 'no-store' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Could not load the book');
    setBook(data);
    return data as Book;
  }, [id]);

  // Drives the book forward: write the story, then illustrate every unlocked
  // page one request at a time. Safe to re-run; the server skips done work.
  const advance = useCallback(async () => {
    if (running.current) return;
    running.current = true;
    try {
      let b = await load();
      if (!b.title && b.status !== 'writing') {
        setWorking('Writing your story. This usually takes a minute or two…');
        const res = await fetch(`/api/hero/books/${id}/story`, { method: 'POST' });
        if (!res.ok && res.status !== 202) throw new Error((await res.json()).error || 'Story failed');
        b = await load();
      }
      while (b.status === 'writing') {
        setWorking('Writing your story. This usually takes a minute or two…');
        await new Promise((r) => setTimeout(r, 5000));
        b = await load();
      }
      if (b.paid && !b.photosAvailable && b.pages.some((p) => !p.illustrated)) {
        throw new Error('The photos for this book have been deleted, so the remaining pages cannot be illustrated. Please contact support.');
      }
      for (const p of b.pages) {
        if (p.locked || p.illustrated) continue;
        setWorking(`Illustrating page ${p.index + 1} of ${b.paid ? b.pageCount : b.previewPages}…`);
        const res = await fetch(`/api/hero/books/${id}/illustrate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ page: p.index }),
        });
        if (!res.ok) throw new Error((await res.json()).error || 'Illustration failed');
        b = await load();
      }
      setWorking(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setWorking(null);
    } finally {
      running.current = false;
    }
  }, [id, load]);

  useEffect(() => {
    advance();
  }, [advance]);

  // After Paddle redirects back, wait for the webhook to unlock the book.
  useEffect(() => {
    if (params.get('paid') !== '1' || book?.paid) return;
    const t = setInterval(async () => {
      const b = await load().catch(() => null);
      if (b?.paid) {
        clearInterval(t);
        advance();
      }
    }, 4000);
    return () => clearInterval(t);
  }, [params, book?.paid, load, advance]);

  async function buy() {
    setError(null);
    const res = await fetch(`/api/hero/books/${id}/checkout`, { method: 'POST' });
    const data = await res.json();
    if (!res.ok) return setError(data.error || 'Checkout is not available');
    const w = window as unknown as PaddleWindow;
    if (!w.Paddle) return setError('Payment system is loading. Please try again in a moment.');
    w.Paddle.Checkout.open({
      items: data.checkout.items,
      customData: data.checkout.customData,
      customer: data.checkout.customer,
      settings: data.checkout.settings,
    });
  }

  async function gift(body: Record<string, unknown>) {
    const res = await fetch(`/api/hero/books/${id}/gift`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) return setError((await res.json()).error || 'Could not update the gift link');
    await load();
  }

  if (!book) {
    return <p className="text-tp-muted">{error ?? 'Loading your book…'}</p>;
  }

  const giftUrl = book.gift ? `${window.location.origin}/hero-gift/${book.gift.token}` : null;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="print:hidden">
        <p className="text-sm text-tp-muted">Create a Hero</p>
        <h1 className="font-display text-3xl font-normal text-tp-ink">{book.title ?? `${book.heroName}'s hero book`}</h1>
        {working && (
          <p role="status" className="mt-4 rounded-tp-button bg-tp-beige/40 p-3 text-sm text-tp-ink">
            {working} Please keep this page open.
          </p>
        )}
        {error && (
          <div role="alert" className="mt-4 rounded-tp-button border border-tp-error/30 p-3 text-sm text-tp-error">
            {error}{' '}
            <button type="button" className="underline" onClick={() => { setError(null); advance(); }}>
              Try again
            </button>
          </div>
        )}
      </div>

      {book.title && (
        <article className="mt-8 space-y-8">
          {book.dedication && (
            <p className="rounded-tp-card bg-tp-paper p-6 text-center font-display text-xl italic text-tp-ink">{book.dedication}</p>
          )}
          {book.pages.map((p) =>
            p.locked ? (
              <div key={p.index} className="flex items-center gap-3 rounded-tp-card border border-dashed border-tp-line p-6 text-sm text-tp-muted print:hidden">
                <Lock className="h-4 w-4" aria-hidden /> Page {p.index + 1} unlocks with the full book
              </div>
            ) : (
              <section key={p.index} className="break-inside-avoid overflow-hidden rounded-tp-card border border-tp-line bg-white">
                {p.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.imageUrl} alt={`Illustration for page ${p.index + 1}`} className="aspect-square w-full object-cover" />
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center bg-tp-beige/30 text-sm text-tp-muted">Illustrating…</div>
                )}
                <p className="p-6 text-lg leading-relaxed text-tp-ink">{p.text}</p>
                <p className="px-6 pb-4 text-right text-xs text-tp-muted">{p.index + 1}</p>
              </section>
            ),
          )}
          {book.paid && book.memories.length > 0 && (
            <section className="break-before-page rounded-tp-card bg-tp-paper p-6">
              <h2 className="font-display text-2xl font-normal text-tp-ink">From your team</h2>
              <ul className="mt-4 space-y-4">
                {book.memories.map((m) => (
                  <li key={m.id}>
                    <p className="text-tp-ink">&ldquo;{m.message}&rdquo;</p>
                    <p className="text-sm text-tp-muted">— {m.name}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      )}

      {book.title && (
        <div className="mt-10 space-y-6 print:hidden">
          {book.paid ? (
            <div className="flex flex-wrap items-center gap-3 rounded-tp-card border border-tp-line bg-white p-6">
              <BookOpen className="h-5 w-5 text-tp-bronze-ink" aria-hidden />
              <p className="flex-1 text-sm text-tp-ink">Your full book is unlocked.</p>
              <Button variant="outline" onClick={() => window.print()} disabled={!!working}>
                <Printer className="h-4 w-4" aria-hidden /> Save as PDF
              </Button>
            </div>
          ) : (
            <div className="rounded-tp-card border border-tp-line bg-white p-6">
              <h2 className="font-display text-2xl font-normal text-tp-ink">Unlock all {book.pageCount} pages</h2>
              <p className="mt-2 text-sm text-tp-muted">
                The full digital book, every page illustrated with {book.heroName}&apos;s face, plus the team&apos;s messages.
              </p>
              {book.checkoutAvailable ? (
                <Button className="mt-4" onClick={buy}>
                  Get the digital book for {formatPrice(book.priceCents)}
                </Button>
              ) : (
                <p className="mt-4 text-sm font-medium text-tp-ink">Checkout for hero books opens soon.</p>
              )}
            </div>
          )}

          <div className="rounded-tp-card border border-tp-line bg-white p-6">
            <h2 className="flex items-center gap-2 font-display text-2xl font-normal text-tp-ink">
              <Gift className="h-5 w-5 text-tp-bronze-ink" aria-hidden /> Make it a group gift
            </h2>
            <p className="mt-2 text-sm text-tp-muted">
              Share a link so friends or teammates can add a memory. No account needed. Messages appear in a &ldquo;From your team&rdquo;
              section at the end of the book.
            </p>
            {giftUrl ? (
              <>
                <div className="mt-4 flex gap-2">
                  <input readOnly value={giftUrl} className="flex-1 rounded-tp-button border border-tp-line px-3 py-2 text-sm" aria-label="Gift link" />
                  <Button
                    variant="outline"
                    onClick={async () => {
                      await navigator.clipboard.writeText(giftUrl);
                      setCopied(true);
                    }}
                  >
                    <Copy className="h-4 w-4" aria-hidden /> {copied ? 'Copied' : 'Copy'}
                  </Button>
                </div>
                <button type="button" className="mt-2 text-xs text-tp-muted underline" onClick={() => gift({ enabled: false })}>
                  Turn the link off
                </button>
                {book.memories.length > 0 && (
                  <ul className="mt-4 divide-y divide-tp-line text-sm">
                    {book.memories.map((m) => (
                      <li key={m.id} className="flex items-start justify-between gap-3 py-2">
                        <span>
                          <strong className="text-tp-ink">{m.name}:</strong> <span className="text-tp-muted">{m.message}</span>
                        </span>
                        <button type="button" className="text-xs text-tp-muted underline" onClick={() => gift({ hideMemoryId: m.id })}>
                          Hide
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Button className="mt-4" variant="outline" onClick={() => gift({ enabled: true })}>
                Create the group gift link
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
