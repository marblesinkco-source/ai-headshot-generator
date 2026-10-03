'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { getActiveCategories, CATEGORY_GROUPS } from '@/config/categories';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

const categories = getActiveCategories();

// Ordered along the decision funnel: understand (How It Works) -> see proof (Examples) -> decide (Pricing) -> learn more (Blog)
const navLinks = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Examples', href: '/samples' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Enterprise', href: '/enterprise' },
  { label: 'Blog', href: '/blog' },
];

// Secondary pages: reachable from the mobile menu (desktop keeps the nav compact; all are in the footer)
// Support links first (FAQ, Contact), then evaluation, then company. Team Headshots lives in Photo Types.
const secondaryLinks = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Compare', href: '/vs' },
  { label: 'Industries', href: '/industries' },
  { label: 'Tools', href: '/tools' },
  { label: 'Security', href: '/security' },
  { label: 'About', href: '/about' },
];

const groupedCategories = CATEGORY_GROUPS.map((group) => ({
  ...group,
  items: group.categories
    .map((id) => categories.find((c) => c.id === id))
    .filter((c): c is (typeof categories)[number] => Boolean(c)),
})).filter((group) => group.items.length > 0);

function isLinkActive(pathname: string | null, href: string) {
  if (!pathname || href.includes('#')) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const mobileDialog = useRef<HTMLDialogElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuTimer = useRef<ReturnType<typeof setTimeout>>();
  const [user, setUser] = useState<User | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  // Scroll-compact: shrink header on scroll (V3 §6: 72-80px → 60-64px)
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile dialog with a short exit animation (the CSS keyframes live in globals.css)
  function closeMobile() {
    const dialog = mobileDialog.current;
    if (!dialog || !dialog.open) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      dialog.close();
      return;
    }
    dialog.setAttribute('data-closing', '');
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      dialog.removeAttribute('data-closing');
      dialog.close();
    }, 180);
  }

  // Close mobile dialog on route change
  useEffect(() => {
    clearTimeout(closeTimer.current);
    mobileDialog.current?.removeAttribute('data-closing');
    mobileDialog.current?.close();
  }, [pathname]);

  // Handle backdrop click and ESC to close dialog
  useEffect(() => {
    const dialog = mobileDialog.current;
    if (!dialog) return;

    function handleClick(e: MouseEvent) {
      if (e.target === dialog) {
        closeMobile();
      }
    }
    function handleCancel(e: Event) {
      e.preventDefault();
      closeMobile();
    }

    dialog.addEventListener('click', handleClick);
    dialog.addEventListener('cancel', handleCancel);
    return () => {
      dialog.removeEventListener('click', handleClick);
      dialog.removeEventListener('cancel', handleCancel);
      clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setUserMenuOpen(false);
    router.push('/');
    router.refresh();
  }

  const userInitial = user?.user_metadata?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?';
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || '';
  const userAvatar = user?.user_metadata?.avatar_url;

  // Close dropdowns with Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMegaOpen(false);
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setMegaOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  const megaRef = useRef<HTMLDivElement>(null);

  // Close mega menu on click outside
  useEffect(() => {
    if (!megaOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [megaOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-tp-line/60 bg-tp-paper/85 backdrop-blur-md supports-[backdrop-filter]:bg-tp-paper/75 transition-[height] duration-200">
      <div className={`tp-container flex items-center justify-between transition-[height] duration-200 ${scrolled ? 'h-16' : 'h-20'}`}>
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="TailorPic home">
          <Image
            src="/brand/tailorpic/logo/tailorpic-horizontal-bronze.svg"
            alt="TailorPic"
            width={212}
            height={49}
            className={`w-auto transition-[height] duration-200 ${scrolled ? 'h-7 sm:h-8' : 'h-8 sm:h-9'}`}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-5 md:flex lg:gap-8" aria-label="Main navigation">
          {/* Photo Types mega menu trigger */}
          <div
            className="relative"
            ref={megaRef}
          >
            <button
              className="flex items-center gap-1 text-[13px] font-semibold text-tp-ink transition-colors hover:text-tp-bronze-ink whitespace-nowrap"
              onClick={() => setMegaOpen((v) => !v)}
              aria-expanded={megaOpen}
              aria-haspopup="true"
              aria-controls="photo-types-menu"
            >
              Photo Types
              <svg className={`h-3.5 w-3.5 transition-transform ${megaOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {/* Mega dropdown */}
            <div
              className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
            >
              <div
                id="photo-types-menu"
                className={`w-[780px] rounded-tp-card border border-tp-line/60 bg-white p-5 shadow-xl shadow-tp-black/8 transition-all duration-200 ease-out ${
                  megaOpen
                    ? 'visible translate-y-0 opacity-100'
                    : 'pointer-events-none invisible -translate-y-1.5 opacity-0'
                }`}
              >
                {/* 3-column layout: Professional / Personal / Creative (V3 §6) */}
                <div className="grid grid-cols-3 gap-5">
                  {groupedCategories.map((group) => (
                    <div key={group.title}>
                      <div className="mb-2 px-2">
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-tp-bronze-ink">{group.title}</p>
                        <p className="mt-0.5 text-[11px] text-tp-muted">{group.description}</p>
                      </div>
                      <div className="space-y-0.5">
                        {group.items.map((cat) => {
                          const catActive = isLinkActive(pathname, `/${cat.slug}`);
                          return (
                            <Link
                              key={cat.id}
                              href={`/${cat.slug}`}
                              aria-current={catActive ? 'page' : undefined}
                              className={`flex items-center gap-2.5 rounded-xl p-2 transition-colors hover:bg-tp-paper ${catActive ? 'bg-tp-paper' : ''}`}
                              onClick={() => setMegaOpen(false)}
                            >
                              <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-tp-beige to-tp-line">
                                <Image
                                  src={`/images/categories/${cat.id}.jpg`}
                                  alt={cat.name}
                                  width={72}
                                  height={72}
                                  className="h-full w-full object-cover"
                                  sizes="36px"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className={`text-[13px] font-semibold leading-tight ${catActive ? 'text-tp-bronze-ink' : 'text-tp-ink'}`}>{cat.name}</p>
                                <p className="truncate text-[11px] text-tp-muted">{cat.tagline}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
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
          </div>

          {navLinks.map((link) => {
            const active = isLinkActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`relative text-[13px] font-semibold transition-colors hover:text-tp-bronze-ink whitespace-nowrap ${
                  active ? 'text-tp-bronze-ink' : 'text-tp-ink'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-tp-bronze-ink transition-opacity ${
                    active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop Account */}
        <div className="hidden flex-shrink-0 items-center gap-4 md:flex lg:gap-6">
          {user ? (
            <div
              className="relative"
              onMouseEnter={() => { clearTimeout(userMenuTimer.current); setUserMenuOpen(true); }}
              onMouseLeave={() => { userMenuTimer.current = setTimeout(() => setUserMenuOpen(false), 200); }}
            >
              <button
                className="flex items-center gap-2.5 rounded-full border border-tp-line/60 bg-white py-1.5 pl-1.5 pr-4 transition-all hover:border-tp-bronze/40 hover:shadow-sm"
                onClick={() => setUserMenuOpen((v) => !v)}
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                {userAvatar ? (
                  <Image
                    src={userAvatar}
                    alt={userName}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-tp-bronze text-sm font-bold text-white">
                    {userInitial}
                  </span>
                )}
                <span className="text-[13px] font-medium text-tp-ink max-w-[120px] truncate">{userName}</span>
                <svg className={`h-3.5 w-3.5 text-tp-muted transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {userMenuOpen && (
                <div
                  className="absolute right-0 top-full pt-2"
                  onMouseEnter={() => { clearTimeout(userMenuTimer.current); setUserMenuOpen(true); }}
                  onMouseLeave={() => { userMenuTimer.current = setTimeout(() => setUserMenuOpen(false), 200); }}
                >
                  <div className="w-56 rounded-xl border border-tp-line/60 bg-white py-2 shadow-xl shadow-tp-black/8">
                    <div className="px-4 py-2 border-b border-tp-line/40">
                      <p className="text-[13px] font-semibold text-tp-ink truncate">{userName}</p>
                      <p className="text-[11px] text-tp-muted truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-tp-ink hover:bg-tp-paper transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <svg className="h-4 w-4 text-tp-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z" />
                      </svg>
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-tp-ink hover:bg-tp-paper transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <svg className="h-4 w-4 text-tp-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </Link>
                    <div className="border-t border-tp-line/40 mt-1 pt-1">
                      <button
                        onClick={handleSignOut}
                        disabled={loggingOut}
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-[13px] text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                        {loggingOut ? 'Signing out...' : 'Sign out'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="flex min-h-[44px] items-center text-[13px] font-semibold text-tp-ink transition-colors hover:text-tp-bronze-ink"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="group inline-flex min-h-[44px] flex-shrink-0 items-center gap-3 whitespace-nowrap rounded-tp-button border border-tp-bronze bg-tp-bronze py-2.5 pl-5 pr-5 lg:pl-6 lg:pr-3 text-sm font-semibold text-tp-black shadow-md shadow-tp-black/15 transition-all hover:-translate-y-0.5 hover:bg-tp-beige hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze-ink"
              >
                Get Started
                <span className="hidden rounded-lg bg-tp-black px-2.5 py-1 text-[12px] font-bold leading-none text-tp-paper lg:inline">
                  from {BASE_PRICE_DISPLAY}
                </span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile: Sign In/Avatar + Menu */}
        <div className="flex items-center gap-3 md:hidden">
          {user ? (
            <Link href="/dashboard" className="flex items-center min-h-[44px]">
              {userAvatar ? (
                <Image
                  src={userAvatar}
                  alt={userName}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-tp-bronze text-sm font-bold text-white">
                  {userInitial}
                </span>
              )}
            </Link>
          ) : (
            <Link
              href="/auth/register"
              className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-tp-button bg-tp-bronze px-4 text-[13px] font-semibold text-tp-black transition-colors hover:bg-tp-beige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze-ink"
            >
              Get Started
            </Link>
          )}
          <button
            className="flex h-[46px] w-[46px] items-center justify-center rounded-tp-button border border-tp-line bg-transparent transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze-ink"
            onClick={() => mobileDialog.current?.showModal()}
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-dialog"
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
        id="mobile-nav-dialog"
        aria-label="Site navigation"
        onToggle={(e) => setMobileOpen((e.currentTarget as HTMLDialogElement).open)}
        onClose={() => setMobileOpen(false)}
        className="tp-nav-dialog rounded-tp-dialog border border-tp-line bg-tp-paper p-0 text-tp-ink w-[min(760px,calc(100vw-28px))] max-h-[85vh] overflow-visible backdrop:bg-tp-black/56"
      >
        <div className="overflow-auto max-h-[85vh] rounded-tp-dialog">
        {/* Sticky header — always visible when scrolling */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-5 bg-tp-paper px-5 pt-5 pb-3 rounded-t-[20px]">
          <h2 className="font-display text-[29px] font-normal leading-tight">{siteConfig.name}</h2>
          <button
            type="button"
            className="h-11 w-11 rounded-full border border-tp-line bg-transparent text-[23px] flex-shrink-0 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tp-bronze-ink"
            aria-label="Close menu"
            onClick={() => closeMobile()}
          >
            &#215;
          </button>
        </div>
        <div className="px-5 pb-5">

        {/* Primary funnel links */}
        <nav className="grid gap-1" aria-label="Mobile navigation">
          {navLinks.map((link) => {
            const active = isLinkActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-2 rounded-tp-button border-l-2 p-3 text-[16px] min-h-[48px] text-left font-medium transition-colors hover:bg-white ${
                  active
                    ? 'border-tp-bronze-ink bg-white text-tp-bronze-ink'
                    : 'border-transparent'
                }`}
                onClick={() => closeMobile()}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Photo types, grouped like the desktop mega menu */}
        <div className="mt-3 border-t border-tp-line/50 pt-3">
          {groupedCategories.map((group) => (
            <div key={group.title} className="mb-3">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-tp-muted">
                {group.title}
                <span className="ml-2 font-normal normal-case tracking-normal">{group.description}</span>
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {group.items.map((cat) => {
                  const catActive = isLinkActive(pathname, `/${cat.slug}`);
                  return (
                    <Link
                      key={cat.id}
                      href={`/${cat.slug}`}
                      aria-current={catActive ? 'page' : undefined}
                      className={`flex items-center gap-2.5 rounded-lg border bg-white p-2.5 min-h-[52px] transition-colors hover:border-tp-bronze-ink ${
                        catActive ? 'border-tp-bronze-ink text-tp-bronze-ink' : 'border-tp-line/60'
                      }`}
                      onClick={() => closeMobile()}
                    >
                      <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-md bg-gradient-to-br from-tp-beige to-tp-line">
                        <Image
                          src={`/images/categories/${cat.id}.jpg`}
                          alt=""
                          width={72}
                          height={72}
                          className="h-full w-full object-cover"
                          sizes="36px"
                        />
                      </div>
                      <span className="text-[12px] font-semibold leading-tight">{cat.shortName}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Secondary links */}
        <nav className="border-t border-tp-line/50 pt-3" aria-label="More pages">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-widest text-tp-muted">More</p>
          <div className="mt-1 grid grid-cols-2 gap-1">
            {secondaryLinks.map((link) => {
              const active = isLinkActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`flex min-h-[44px] items-center rounded-tp-button border-l-2 px-3 text-[14px] font-medium transition-colors hover:bg-white ${
                    active ? 'border-tp-bronze-ink bg-white text-tp-bronze-ink' : 'border-transparent text-tp-ink'
                  }`}
                  onClick={() => closeMobile()}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
        </div>

        {/* Sticky action bar: the primary CTA is always visible without scrolling */}
        <div className="sticky bottom-0 z-10 border-t border-tp-line/60 bg-tp-paper px-5 pb-5 pt-3 rounded-b-[20px]">
          {user ? (
            <div className="grid gap-1">
              <Link
                href="/dashboard"
                className="flex min-h-[48px] items-center justify-center gap-3 rounded-tp-button bg-tp-bronze px-6 py-3 text-sm font-semibold text-tp-black transition-colors hover:bg-tp-beige"
                onClick={() => closeMobile()}
              >
                Dashboard <span aria-hidden="true" className="text-lg leading-none">&#8599;</span>
              </Link>
              <button
                onClick={() => { closeMobile(); handleSignOut(); }}
                disabled={loggingOut}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-tp-button border border-red-200 px-6 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                {loggingOut ? 'Signing out...' : 'Sign out'}
              </button>
            </div>
          ) : (
            <div className="grid gap-1">
              <Link
                href="/auth/register"
                className="flex min-h-[48px] items-center justify-center gap-3 rounded-tp-button bg-tp-bronze px-6 py-3 text-sm font-semibold text-tp-black shadow-md shadow-tp-black/15 transition-colors hover:bg-tp-beige"
                onClick={() => closeMobile()}
              >
                Get Started
                <span className="rounded-lg bg-tp-black px-2.5 py-1 text-[12px] font-bold leading-none text-tp-paper">from {BASE_PRICE_DISPLAY}</span>
              </Link>
              <Link
                href="/auth/login"
                className="flex min-h-[44px] items-center justify-center rounded-tp-button text-sm font-semibold text-tp-ink transition-colors hover:text-tp-bronze-ink"
                onClick={() => closeMobile()}
              >
                Already have an account? Sign In
              </Link>
            </div>
          )}
        </div>
        </div>
      </dialog>
    </header>
  );
}
