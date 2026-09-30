import Link from 'next/link';
import { siteConfig } from '@/config/site';

const footerLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Contact', href: `mailto:${siteConfig.supportEmail}` },
];

export function Footer() {
  return (
    <footer className="border-t border-brand-200/40 bg-tailor-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Logo + copyright */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-tailor-gold/10 ring-1 ring-tailor-gold/20">
              <span className="text-sm font-bold text-tailor-gold">T</span>
            </div>
            <span className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </span>
          </div>

          {/* Links */}
          <nav className="flex gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-gray-400 transition-colors hover:text-tailor-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Tagline */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
