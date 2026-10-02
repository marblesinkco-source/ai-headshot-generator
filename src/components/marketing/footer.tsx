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
  { label: 'Photo Styles', href: '/styles' },
  { label: 'Guarantee', href: '/guarantee' },
  { label: 'LinkedIn Headshots', href: '/linkedin-headshots' },
  { label: 'Team Headshots', href: '/team-headshots' },
  { label: 'AI Avatars', href: '/avatars' },
  { label: 'Free Headshots', href: '/free-headshot-generator' },
  { label: 'AI Photo Editor', href: '/editor' },
];

const solutionLinks: FooterLink[] = [
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Industries', href: '/industries' },
  { label: 'Enterprise', href: '/enterprise' },
  { label: 'Students', href: '/students' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'API', href: '/developer-api' },
];

const resourceLinks: FooterLink[] = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Help Center', href: '/help' },
  { label: 'Blog', href: '/blog' },
  { label: 'Photo Tips', href: '/photo-tips' },
  { label: 'Success Stories', href: '/success-stories' },
  { label: 'Free Tools', href: '/tools' },
  { label: 'Photo Analyzer', href: '/tools/linkedin-photo-analyzer' },
  { label: 'Cost Calculator', href: '/tools/headshot-cost-calculator' },
  { label: 'Signature Generator', href: '/tools/email-signature-generator' },
  { label: 'Glossary', href: '/glossary' },
  { label: 'Changelog', href: '/changelog' },
];

// Most-needed links, repeated above the columns so they never get lost in a long list
const quickLinks: FooterLink[] = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Help Center', href: '/help' },
  { label: 'Guarantee', href: '/guarantee' },
];

const companyLinks: FooterLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Why TailorPic', href: '/why-tailorpic' },
  { label: 'Technology', href: '/technology' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
  { label: 'Partners', href: '/partners' },
  { label: 'Affiliate', href: '/affiliate' },
  { label: 'Referral', href: '/referral' },
];

const legalLinks: FooterLink[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'KVKK Aydınlatma', href: '/kvkk' },
  { label: 'DPA', href: '/dpa' },
  { label: 'Security', href: '/security' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Subprocessors', href: '/subprocessors' },
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
];

function FooterColumn({ title, links, children }: { title: string; links: FooterLink[]; children?: ReactNode }) {
  return (
    <nav aria-label={title}>
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-tp-bronze">{title}</h3>
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

export function Footer() {
  return (
    <footer className="border-t border-tp-line bg-tp-ink" aria-label="Site footer">
      {/* Brand + newsletter */}
      <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14 pt-12 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div>
            <Image
              src="/brand/tailorpic/logo/tailorpic-horizontal-bronze.svg"
              alt="TailorPic"
              width={1000}
              height={230}
              className="mb-4 h-7 w-auto"
              loading="lazy"
              sizes="122px"
            />
            <p className="max-w-md text-[13px] leading-relaxed text-tp-beige/70">{siteConfig.description}</p>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-tp-button border border-tp-muted/40 text-tp-beige/70 transition-colors hover:border-tp-bronze/60 hover:text-tp-bronze focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
                  aria-label={`TailorPic on ${social.label}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <EmailCapture />
        </div>
        <nav aria-label="Quick links" className="mt-8 flex flex-wrap gap-2 border-t border-tp-muted/30 pt-6">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-[44px] items-center rounded-tp-button border border-tp-muted/40 px-4 text-[13px] font-semibold text-tp-beige transition-colors hover:border-tp-bronze/60 hover:text-tp-bronze focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14 py-12 lg:py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-5">
          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Solutions" links={solutionLinks} />
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
      <div className="border-t border-tp-muted/30">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-2 px-4 py-5 text-center sm:flex-row sm:px-7 sm:text-left lg:px-14">
          <span className="text-[12px] text-tp-beige/60">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </span>
          <span className="text-[12px] text-tp-beige/60">Built by TailorPic</span>
        </div>
      </div>
    </footer>
  );
}
