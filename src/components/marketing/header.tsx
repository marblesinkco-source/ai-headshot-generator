'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { getActiveCategories, CATEGORY_GROUPS } from '@/config/categories';

const categories = getActiveCategories();

const navLinks = [
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Results', href: '/#results' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Industries', href: '/industries' },
  { label: 'Enterprise', href: '/enterprise' },
  { label: 'Affiliate', href: '/affiliate' },
];

export function Header() {
  const mobileDialog = useRef<HTMLDialogElement>(null);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  function openMega() {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }
  function scheduleMegaClose() {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 200);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-tp-line/40 bg-tp-paper/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1320px] items-center justify-between px-4 sm:px-7 lg:px-14">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="TailorPic home">
          <Image
            src="/brand/tailorpic/logo/tailorpic-horizontal-bronze.svg"
            alt="TailorPic registered logo"
            width={212}
            height={49}
            className="h-8 w-auto sm:h-9"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {/* Photo Types mega menu trigger */}
          <div
            className="relative"
            onMouseEnter={openMega}
            onMouseLeave={scheduleMegaClose}
          >
            <button
              className="flex items-center gap-1 text-[13px] font-semibold text-tp-ink transition-colors hover:text-tp-bronze-ink whitespace-nowrap"
              onClick={() => setMegaOpen((v) => !v)}
              aria-expanded={megaOpen}
              aria-haspopup="true"
            >
              Photo Types
              <svg className={`h-3.5 w-3.5 transition-transform ${megaOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {/* Mega dropdown */}
            {megaOpen && (
              <div
                className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                onMouseEnter={openMega}
                onMouseLeave={scheduleMegaClose}
              >
                <div className="w-[640px] rounded-2xl border border-tp-line/60 bg-white p-5 shadow-xl shadow-tp-black/8">
                  <div className="grid grid-cols-2 gap-x-5 gap-y-1.5">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/${cat.slug}`}
                        className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-tp-paper"
                        onClick={() => setMegaOpen(false)}
                      >
                        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-tp-beige to-tp-line">
                          <Image
                            src={`/images/categories/${cat.id}.jpg`}
                            alt={cat.name}
                            width={80}
                            height={80}
                            className="h-full w-full object-cover"
                            sizes="40px"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-tp-ink">{cat.name}</p>
                          <p className="truncate text-[11px] text-tp-muted">{cat.tagline}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 border-t border-tp-line/50 pt-3 text-center">
                    <Link
                      href="/pricing"
                      className="text-[12px] font-semibold text-tp-bronze-ink hover:text-tp-black transition-colors"
                      onClick={() => setMegaOpen(false)}
                    >
                      View All Pricing &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-semibold text-tp-ink transition-colors hover:text-tp-bronze-ink whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Account */}
        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/auth/login"
            className="text-[13px] font-medium text-tp-ink transition-colors hover:text-tp-bronze-ink"
          >
            Sign In
          </Link>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-5 rounded-xl border border-tp-black bg-tp-black px-6 py-3 text-sm font-semibold text-tp-paper transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Get Started <span aria-hidden="true" className="text-lg leading-none">&#8599;</span>
          </Link>
        </div>

        {/* Mobile: Sign In + Menu */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/auth/login"
            className="text-[11px] font-medium text-tp-ink min-h-[44px] flex items-center"
          >
            Sign In
          </Link>
          <button
            className="flex h-[46px] w-[46px] items-center justify-center rounded-[10px] border border-tp-line bg-transparent"
            onClick={() => mobileDialog.current?.showModal()}
            aria-label="Open navigation menu"
          >
            <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M4 6H20M4 12H20M4 18H20" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Dialog */}
      <dialog
        ref={mobileDialog}
        className="rounded-[20px] border border-tp-line bg-tp-paper p-5 text-tp-ink w-[min(760px,calc(100vw-28px))] max-h-[85vh] overflow-auto backdrop:bg-tp-black/56"
      >
        <div className="flex items-center justify-between gap-5 mb-4">
          <h2 className="font-display text-[29px] font-normal leading-tight">{siteConfig.name}</h2>
          <button
            className="h-11 w-11 rounded-full border border-tp-line bg-transparent text-[23px] flex-shrink-0 flex items-center justify-center"
            aria-label="Close menu"
            onClick={() => mobileDialog.current?.close()}
          >
            &#215;
          </button>
        </div>

        {/* Mobile category grid */}
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-tp-muted">Photo Types</p>
        <div className="grid grid-cols-2 gap-1.5 mb-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="flex items-center gap-2.5 rounded-lg border border-tp-line/60 bg-white p-2.5 min-h-[52px] transition-colors hover:border-tp-bronze-ink"
              onClick={() => mobileDialog.current?.close()}
            >
              <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-md bg-gradient-to-br from-tp-beige to-tp-line">
                <Image
                  src={`/images/categories/${cat.id}.jpg`}
                  alt={cat.name}
                  width={72}
                  height={72}
                  className="h-full w-full object-cover"
                  sizes="36px"
                />
              </div>
              <span className="text-[12px] font-semibold leading-tight">{cat.shortName}</span>
            </Link>
          ))}
        </div>

        {/* Other nav links */}
        <nav className="grid gap-1 border-t border-tp-line/50 pt-3" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="p-3 text-[16px] min-h-[46px] text-left font-medium"
              onClick={() => mobileDialog.current?.close()}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/auth/login"
            className="mt-2 flex items-center justify-center gap-3 rounded-xl bg-tp-black px-6 py-3.5 text-sm font-semibold text-tp-paper"
            onClick={() => mobileDialog.current?.close()}
          >
            Get Started <span aria-hidden="true" className="text-lg leading-none">&#8599;</span>
          </Link>
        </nav>
      </dialog>
    </header>
  );
}
