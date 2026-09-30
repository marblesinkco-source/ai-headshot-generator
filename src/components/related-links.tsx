import Link from 'next/link';

export interface RelatedLinkItem {
  title: string;
  href: string;
}

interface RelatedLinksProps {
  links: RelatedLinkItem[];
  title: string;
  className?: string;
}

export function RelatedLinks({ links, title, className = '' }: RelatedLinksProps) {
  if (!links || links.length === 0) return null;

  return (
    <section
      aria-labelledby="related-links-heading"
      className={`border-t border-tp-line bg-tp-paper py-12 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          id="related-links-heading"
          className="mb-6 text-xl font-semibold text-tp-black sm:text-2xl"
        >
          {title}
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex h-full items-center justify-between gap-3 rounded-tp-card border border-tp-line bg-white p-4 text-tp-ink transition-colors hover:border-tp-bronze hover:bg-tp-beige/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
              >
                <span className="text-sm font-medium leading-snug sm:text-base">{link.title}</span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-tp-muted transition-transform group-hover:translate-x-1 group-hover:text-tp-bronze-ink"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default RelatedLinks;
