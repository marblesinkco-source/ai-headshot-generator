import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

const footerLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Contact', href: `mailto:${siteConfig.supportEmail}` },
];

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-8 border-t border-tp-line">
        {/* Logo */}
        <Image
          src="/brand/tailorpic/logo/tailorpic-horizontal-bronze.svg"
          alt="TailorPic"
          width={1000}
          height={230}
          className="h-6 w-auto"
        />

        {/* Links + tagline */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
          <nav className="flex gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[11px] text-tp-muted transition-colors hover:text-tp-bronze-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <span className="text-[11px] text-tp-muted">
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </span>
        </div>
      </div>

      <div className="pb-8 text-center sm:text-right">
        <p className="text-[11px] text-tp-muted">{siteConfig.tagline}</p>
      </div>
    </footer>
  );
}
