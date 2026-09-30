import { siteConfig } from '@/config/site';
import { JsonLd } from './json-ld';

/**
 * Product + Offer JSON-LD for the TailorPic headshot package.
 * NOTE: no AggregateRating/Review on purpose. Add only with real, verified review data.
 */
export function ProductSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'TailorPic AI Professional Headshots',
        description:
          'Professional AI-generated headshots from your own selfies. Upload a few clear photos and receive a set of studio-style portraits.',
        brand: { '@type': 'Brand', name: siteConfig.name },
        category: 'Photography Service',
        url: `${siteConfig.url}/pricing`,
        image: `${siteConfig.url}${siteConfig.ogImage}`,
        offers: {
          '@type': 'Offer',
          price: '9.90',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: `${siteConfig.url}/pricing`,
          seller: { '@type': 'Organization', name: siteConfig.name },
        },
      }}
    />
  );
}
