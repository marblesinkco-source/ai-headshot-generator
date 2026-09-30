'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

const navLinks = [
  { label: 'Photo Types', href: '#categories', isButton: true },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Examples', href: '#examples' },
  { label: 'Pricing', href: '#pricing' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileDialog = useRef<HTMLDialogElement>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-tp-line/40 bg-tp-paper/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1320px] items-center justify-between px-4 sm:px-7 lg:px-14">
        {/* Real SVG Logo */}
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
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-semibold text-tp-ink transition-colors hover:text-tp-bronze-ink whitespace-nowrap"
            >
              {link.label}
            </a>
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
        <div className="flex items-center justify-between gap-5 mb-5">
          <h2 className="font-display text-[29px] font-normal leading-tight">{siteConfig.name}</h2>
          <button
            className="h-11 w-11 rounded-full border border-tp-line bg-transparent text-[23px] flex-shrink-0 flex items-center justify-center"
            aria-label="Close menu"
            onClick={() => mobileDialog.current?.close()}
          >
            &#215;
          </button>
        </div>
        <nav className="grid gap-2.5" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="p-3 text-[17px] min-h-[46px] text-left"
              onClick={() => mobileDialog.current?.close()}
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/auth/login"
            className="p-3 text-[17px] min-h-[46px] text-left"
            onClick={() => mobileDialog.current?.close()}
          >
            Sign In
          </Link>
        </nav>
      </dialog>
    </header>
  );
}
