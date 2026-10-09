import Link from 'next/link';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { CookieSettingsButton } from '@/components/cookie-consent';
import { EmailCapture } from '@/components/marketing/email-capture';

type FooterLink = { label: string; href: string };

const productLinks: FooterLink[] = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Pricing Comparison', href: '/pricing-comparison' },
  { label: 'Samples', href: '/samples' },
  { label: 'Before & After', href: '/before-after' },
  { label: 'Free Headshot Generator', href: '/free-headshot-generator' },
  { label: 'LinkedIn Headshots', href: '/linkedin-headshots' },
  { label: 'Technology', href: '/technology' },
  { label: 'Quality Promise', href: '/guarantee' },
  { label: 'Gift Cards', href: '/gift-cards' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'Developer API', href: '/developer-api' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '/blog' },
];

const photoTypeLinks: FooterLink[] = [
  { label: 'Professional Headshots', href: '/headshots' },
  { label: 'Team Photos', href: '/team-headshots' },
  { label: 'Dating Photos', href: '/dating-photos' },
  { label: 'Family Portraits', href: '/family-portraits' },
  { label: 'Graduation', href: '/graduation-photos' },
  { label: 'AI Avatars', href: '/avatars' },
  { label: 'Pet Portraits', href: '/pet-portraits' },
  { label: 'Couple & Engagement', href: '/couple-engagement-photos' },
  { label: 'Product Photography', href: '/product-photography' },
  { label: 'Virtual Staging', href: '/virtual-staging' },
  { label: 'Holiday Cards', href: '/holiday-cards' },
];

const resourceLinks: FooterLink[] = [
  { label: 'Help Center', href: '/help' },
  { label: 'Photo Tips', href: '/photo-tips' },
  { label: 'What to Wear', href: '/what-to-wear' },
  { label: 'Selfie Guide', href: '/selfie-guide' },
  { label: 'Headshot Sizes', href: '/headshot-sizes' },
  { label: 'Backgrounds', href: '/backgrounds' },
  { label: 'Free Tools', href: '/tools' },
  { label: 'Compare Tools', href: '/vs' },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Industries', href: '/industries' },
  { label: 'Styles', href: '/styles' },
  { label: 'Success Stories', href: '/success-stories' },
  { label: 'For Students', href: '/students' },
];

const companyLinks: FooterLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Why TailorPic', href: '/why-tailorpic' },
  { label: 'Contact', href: '/contact' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Enterprise', href: '/enterprise' },
  { label: 'Referral Program', href: '/referral' },
  { label: 'Affiliate Program', href: '/affiliate' },
  { label: 'Partners', href: '/partners' },
  { label: 'Press', href: '/press' },
  { label: 'Careers', href: '/careers' },
  { label: 'Status', href: '/status' },
];

const legalLinks: FooterLink[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Data Processing', href: '/dpa' },
  { label: 'Security', href: '/security' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'KVKK Notice', href: '/kvkk' },
];

const linkClass =
  'inline-flex min-h-[44px] items-center text-[13px] lg:min-h-0 lg:py-1 text-tp-beige/70 transition-colors hover:text-tp-bronze focus-visible:outline-none focus-visible:text-tp-bronze focus-visible:underline';

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
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 0zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
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
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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

function FooterColumn({ title, links, children }: { title: string; links: FooterLink[]; children?: ReactNode }) {
  return (
    <nav aria-label={title}>
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-tp-bronze">{title}</h2>
      <ul className="space-y-0 lg:space-y-0.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
        {children}
      </ul>
    </nav>
  );
}

const bottomLegalLinks: FooterLink[] = legalLinks.filter((l) =>
  ['/privacy', '/terms', '/cookie-policy', '/refund-policy'].includes(l.href),
);

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-tp-ink text-tp-paper">
      {/* Top gradient divider */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tp-bronze/40 to-transparent"
        aria-hidden="true"
      />

      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-tp-bronze/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-24 h-[460px] w-[460px] rounded-full bg-tp-bronze-ink/20 blur-3xl"
        aria-hidden="true"
      />

      {/* Brand + newsletter */}
      <div className="relative mx-auto max-w-[1320px] px-4 pt-14 sm:px-7 lg:px-14 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Image
              src="/brand/tailorpic/logo/tailorpic-horizontal-bronze.svg"
              alt="TailorPic"
              width={1000}
              height={230}
              className="mb-5 h-10 w-auto lg:h-12"
              loading="lazy"
              sizes="210px"
            />
            <p className="font-display text-2xl font-normal leading-snug text-tp-paper sm:text-3xl">
              Portraits, tailored to you.
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-tp-beige/70">{siteConfig.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-11 w-11 items-center justify-center rounded-tp-button border border-tp-bronze/30 bg-tp-paper/[0.03] text-tp-paper/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-tp-bronze hover:bg-tp-bronze/10 hover:text-tp-bronze focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
                  aria-label={`TailorPic on ${social.label}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-tp-card border border-tp-bronze/20 bg-tp-paper/[0.04] p-5 shadow-[0_0_0_1px_rgba(201,169,138,0.06)] backdrop-blur-sm sm:p-7">
            <EmailCapture />
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="relative mx-auto max-w-[1320px] px-4 py-12 sm:px-7 lg:px-14 lg:py-16">
        <div
          className="mb-12 h-px bg-gradient-to-r from-transparent via-tp-bronze/40 to-transparent"
          aria-hidden="true"
        />
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Photo Types" links={photoTypeLinks} />
          <FooterColumn title="Resources" links={resourceLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Legal" links={legalLinks}>
            <li>
              <CookieSettingsButton className={linkClass} />
            </li>
          </FooterColumn>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-tp-bronze/15">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:px-7 md:flex-row md:text-left lg:px-14">
          <span className="text-xs text-tp-beige/70">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </span>
          <nav aria-label="Legal links" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            {bottomLegalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-tp-beige/70 transition-colors hover:text-tp-bronze focus-visible:outline-none focus-visible:text-tp-bronze focus-visible:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
