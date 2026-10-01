import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple header */}
      <header className="border-b border-tp-line/50">
        <div className="mx-auto flex h-16 max-w-3xl items-center px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-tp-black">
              <svg
                className="h-5 w-5 text-tp-bronze"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <span className="text-lg font-bold text-tp-ink">{siteConfig.name}</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main id="main-content" className="mx-auto max-w-3xl px-4 py-12">
        {children}
      </main>

      {/* Simple footer */}
      <footer className="border-t border-tp-line/50 py-8">
        <div className="mx-auto max-w-3xl px-4 text-center text-sm text-tp-muted">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
