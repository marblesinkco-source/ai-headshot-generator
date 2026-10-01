import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { CookieSettingsButton } from '@/components/cookie-consent';
import { EmailCapture } from '@/components/marketing/email-capture';
import { getActiveCategories, CATEGORY_GROUPS } from '@/config/categories';

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'KVKK Aydınlatma', href: '/kvkk' },
  { label: 'DPA', href: '/dpa' },
  { label: 'Security', href: '/security' },
];

const socialLinks = [
  {
    label: 'X / Twitter',
    href: siteConfig.links.twitter,
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: siteConfig.links.linkedin,
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: siteConfig.links.instagram,
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: siteConfig.links.tiktok,
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: siteConfig.links.youtube,
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: siteConfig.links.facebook,
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export function Footer() {
  const categories = getActiveCategories();
  // Pick first group's categories for the footer
  const popularCategories = categories.slice(0, 6);

  return (
    <footer className="border-t border-tp-line bg-tp-ink">
      {/* Main footer */}
      <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14 py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 mb-4 lg:mb-0">
            <Image
              src="/brand/tailorpic/logo/tailorpic-horizontal-bronze.svg"
              alt="TailorPic"
              width={1000}
              height={230}
              className="h-7 w-auto mb-4"
              loading="lazy"
              sizes="122px"
            />
            <p className="text-[13px] text-tp-beige/60 leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-tp-muted/30 text-tp-beige/50 transition-all hover:border-tp-bronze/50 hover:text-tp-bronze"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Photo Types */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-tp-bronze mb-4">
              Photo Types
            </h3>
            <ul className="space-y-2.5">
              {popularCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/${cat.slug}`}
                    className="text-[13px] text-tp-beige/60 transition-colors hover:text-tp-bronze"
                  >
                    {cat.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-tp-bronze mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-[13px] text-tp-beige/60 transition-colors hover:text-tp-bronze"
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href="/#how-it-works"
                  className="text-[13px] text-tp-beige/60 transition-colors hover:text-tp-bronze"
                >
                  How It Works
                </a>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-[13px] text-tp-beige/60 transition-colors hover:text-tp-bronze"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-[13px] text-tp-beige/60 transition-colors hover:text-tp-bronze"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-[13px] text-tp-beige/60 transition-colors hover:text-tp-bronze"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-[13px] text-tp-beige/60 transition-colors hover:text-tp-bronze"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[13px] text-tp-beige/60 transition-colors hover:text-tp-bronze"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/changelog"
                  className="text-[13px] text-tp-beige/60 transition-colors hover:text-tp-bronze"
                >
                  Changelog
                </Link>
              </li>
              <li>
                <Link
                  href="/affiliate"
                  className="text-[13px] text-tp-beige/60 transition-colors hover:text-tp-bronze"
                >
                  Affiliate
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/headshot-cost-calculator"
                  className="text-[13px] text-tp-beige/60 transition-colors hover:text-tp-bronze"
                >
                  Cost Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/linkedin-photo-analyzer"
                  className="text-[13px] text-tp-beige/60 transition-colors hover:text-tp-bronze"
                >
                  Photo Analyzer
                </Link>
              </li>
              <li>
                <Link
                  href="/glossary"
                  className="text-[13px] text-tp-beige/60 transition-colors hover:text-tp-bronze"
                >
                  Glossary
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/email-signature-generator"
                  className="text-[13px] text-tp-beige/60 transition-colors hover:text-tp-bronze"
                >
                  Signature Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/free-headshot-generator"
                  className="text-[13px] text-tp-beige/60 transition-colors hover:text-tp-bronze"
                >
                  Free Headshots
                </Link>
              </li>
              <li>
                <Link
                  href="/linkedin-headshots"
                  className="text-[13px] text-tp-beige/60 transition-colors hover:text-tp-bronze"
                >
                  LinkedIn Headshots
                </Link>
              </li>
              <li>
                <Link
                  href="/styles"
                  className="text-[13px] text-tp-beige/60 transition-colors hover:text-tp-bronze"
                >
                  Photo Styles
                </Link>
              </li>
              <li>
                <Link
                  href="/editor"
                  className="text-[13px] text-tp-beige/60 transition-colors hover:text-tp-bronze"
                >
                  AI Photo Editor
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-tp-bronze mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-tp-beige/60 transition-colors hover:text-tp-bronze"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton className="text-[13px] text-tp-beige/60 transition-colors hover:text-tp-bronze" />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14 pb-12 lg:pb-16">
        <EmailCapture />
      </div>

      {/* Bottom bar */}
      <div className="border-t border-tp-muted/20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-tp-beige/40">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </span>
          <span className="text-[11px] text-tp-beige/40 flex items-center gap-4">
            <span className="flex items-center gap-1">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
              Secure payments via Stripe
            </span>
            <span className="hidden sm:inline italic">{siteConfig.tagline}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
