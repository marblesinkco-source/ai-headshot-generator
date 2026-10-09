import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';

export const metadata: Metadata = {
  title: 'Page Not Found | TailorPic',
  robots: { index: false, follow: false },
};

const suggestions = [
  { href: '/how-it-works', title: 'How it works', desc: 'See how TailorPic creates your headshot.' },
  { href: '/pricing', title: 'Pricing', desc: 'Simple plans for every need.' },
  { href: '/samples', title: 'Samples', desc: 'Browse example headshots.' },
  { href: '/faq', title: 'FAQ', desc: 'Answers to common questions.' },
];

export default function NotFound() {
  return (
    <>
    <Header />
    <main
      id="main-content"
      className="flex min-h-[60vh] flex-col items-center justify-center bg-tp-paper px-4 py-16"
    >
      <div className="w-full max-w-xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-tp-bronze-ink">Error 404</p>
        <h1 className="mt-4 font-display text-5xl font-normal leading-tight text-tp-black">Page not found</h1>
        <p className="mt-4 text-base leading-relaxed text-tp-muted">
          The page you&apos;re looking for may have moved or no longer exists. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-tp-button bg-tp-black px-6 py-3 text-sm font-semibold text-tp-bronze transition-colors hover:bg-tp-ink"
          >
            Back to Home
          </Link>
          <Link
            href="/dashboard"
            className="rounded-tp-button border border-tp-bronze bg-white px-6 py-3 text-sm font-semibold text-tp-bronze-ink transition-colors hover:bg-tp-beige/40"
          >
            Dashboard
          </Link>
        </div>

        <div className="mt-12 text-left">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-tp-muted">You might be looking for</p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {suggestions.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="block h-full rounded-tp-card border border-tp-line bg-white p-4 transition-colors hover:border-tp-bronze"
                >
                  <span className="block text-sm font-semibold text-tp-black">{s.title}</span>
                  <span className="mt-1 block text-sm text-tp-muted">{s.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
