import { JsonLd } from './json-ld';

interface BreadcrumbSchemaProps {
  items: { name: string; url: string }[];
}

/** Schema.org BreadcrumbList JSON-LD. Pass absolute URLs, in order. */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  if (!items.length) return null;

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
