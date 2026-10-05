import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Reusable breadcrumb navigation — server component.
 *
 * The first item should always be { label: "Home", href: "/" }.
 * The last item has no `href` (current page) — pass `currentPath`
 * so the JSON-LD schema points to the correct page URL.
 *
 * On mobile, when there are more than 3 items, middle items are
 * collapsed to an ellipsis so only the first item, "...", the
 * penultimate item, and the last item are visible.
 */
export function Breadcrumbs({
  items,
  currentPath,
}: {
  items: BreadcrumbItem[];
  /** Canonical path for the current (last) page, e.g. "/industries/insurance-agents" */
  currentPath?: string;
}) {
  const schemaItems = items.map((item, idx) => ({
    name: item.label,
    url: item.href
      ? `${siteConfig.url}${item.href}`
      : currentPath
        ? `${siteConfig.url}${currentPath}`
        : idx === items.length - 1 && items.length > 1
          ? `${siteConfig.url}`
          : `${siteConfig.url}`,
  }));

  const lastIndex = items.length - 1;
  const needsTruncation = items.length > 3;

  return (
    <>
      <BreadcrumbSchema items={schemaItems} />
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1">
          {items.flatMap((item, index) => {
            const isLast = index === lastIndex;
            // On mobile with >3 items: hide items between first and penultimate
            const hideOnMobile =
              needsTruncation && index > 0 && index < lastIndex - 1;

            const elements = [];

            // After the first item, inject mobile-only ellipsis
            if (needsTruncation && index === 1) {
              elements.push(
                <li
                  key="ellipsis"
                  className="flex items-center gap-1 sm:hidden"
                  aria-hidden="true"
                >
                  <span className="text-tp-line select-none">&gt;</span>
                  <span className="text-tp-muted">&hellip;</span>
                </li>
              );
            }

            elements.push(
              <li
                key={index}
                className={`flex items-center gap-1${
                  hideOnMobile ? ' hidden sm:flex' : ''
                }`}
                {...(isLast ? { 'aria-current': 'page' as const } : {})}
              >
                {index > 0 && (
                  <span aria-hidden="true" className="text-tp-line select-none">
                    &gt;
                  </span>
                )}
                {isLast ? (
                  <span className="text-tp-ink font-medium">{item.label}</span>
                ) : item.href ? (
                  <Link
                    href={item.href}
                    className="text-tp-muted hover:text-tp-bronze-ink transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-tp-muted">{item.label}</span>
                )}
              </li>
            );

            return elements;
          })}
        </ol>
      </nav>
    </>
  );
}
