import { siteConfig } from '@/config/site';
import { BASE_PRICE } from '@/config/pricing';
import { CATEGORIES } from '@/config/categories';

// JSON-LD Structured Data for SEO
export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/tailorpic/icons/profile-dark-512.png`,
    description: siteConfig.description,
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.linkedin,
      siteConfig.links.instagram,
      siteConfig.links.tiktok,
      siteConfig.links.youtube,
      siteConfig.links.facebook,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.supportEmail,
      contactType: 'customer support',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ProductSchema({
  name,
  description,
  price,
  category,
  slug,
  image,
  sku,
}: {
  name: string;
  description: string;
  price: number;
  category: string;
  slug: string;
  image?: string;
  sku?: string;
}) {
  const productUrl = `${siteConfig.url}/${slug}`;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    ...(image && { image }),
    ...(sku && { sku }),
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
    category,
    url: productUrl,
    offers: {
      '@type': 'Offer',
      price: price / 100,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: productUrl,
      seller: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Product with AggregateOffer built from the live headshots package ladder.
// Named PricingProductSchema because `ProductSchema` (single Offer) is already
// used by ~100 use-case / industry pages. No ratings or review counts by design.
export function PricingProductSchema({ path = '/pricing' }: { path?: string } = {}) {
  const packages = CATEGORIES.headshots.packages;
  if (packages.length === 0) return null;

  const pageUrl = `${siteConfig.url}${path}`;
  const dollars = (cents: number) => (cents / 100).toFixed(2);
  const prices = packages.map((p) => p.price);

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'TailorPic AI Headshots',
    description: CATEGORIES.headshots.description,
    brand: { '@type': 'Brand', name: siteConfig.name },
    category: 'Photography Service',
    url: pageUrl,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: dollars(Math.min(...prices)),
      highPrice: dollars(Math.max(...prices)),
      offerCount: packages.length,
      url: pageUrl,
      offers: packages.map((pkg) => ({
        '@type': 'Offer',
        name: `${pkg.name} (${pkg.outputCount} ${pkg.outputCount === 1 ? 'photo' : 'photos'})`,
        sku: pkg.id,
        price: dollars(pkg.price),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: pageUrl,
        seller: { '@type': 'Organization', name: siteConfig.name },
      })),
    },
    // No aggregateRating / review: no verified review data exists.
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

export function FAQSchema({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SoftwareApplicationSchema({
  name,
  description,
  url,
  free = false,
}: {
  name?: string;
  description?: string;
  url?: string;
  /** Free web tool: Offer price 0 USD instead of the site-wide "from" price. */
  free?: boolean;
} = {}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: name ?? siteConfig.name,
    applicationCategory: 'PhotographyApplication',
    operatingSystem: 'Web',
    url: url ?? siteConfig.url,
    description: description ?? siteConfig.description,
    ...(!free && {
      screenshot: `${siteConfig.url}/brand/tailorpic/web/og-tailorpic-1200x630.jpg`,
      featureList: 'AI Headshots, Professional Photos, LinkedIn Photos, Team Photos, 40+ Styles',
    }),
    offers: {
      '@type': 'Offer',
      price: free ? '0' : BASE_PRICE.toFixed(2),
      priceCurrency: 'USD',
    },
    // aggregateRating removed — do not add without real verified review data
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  author,
  image,
  keywords,
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  image?: string;
  keywords?: string[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url: `${siteConfig.url}/blog/${slug}`,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    inLanguage: 'en-US',
    ...(image && { image: [image] }),
    ...(keywords && keywords.length > 0 && { keywords: keywords.join(', ') }),
    isPartOf: { '@type': 'Blog', name: `${siteConfig.name} Blog`, url: `${siteConfig.url}/blog` },
    author: {
      '@type': 'Organization',
      name: author || siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/brand/tailorpic/logo/tailorpic-horizontal-bronze.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}


export function HowToSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Get AI Headshots with TailorPic',
    description: 'Get studio-quality AI headshots in 3 simple steps.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Upload Your Selfies',
        text: 'Upload 4-10 casual selfies. Our AI learns your unique features from different angles and lighting.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'AI Creates Your Photos',
        text: 'Our AI model trains on your photos and generates professional headshots in various styles — from a single photo to a full set of 160, depending on your package.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Download & Use',
        text: 'Browse your results, pick your favorites, and download in high resolution. Ready for LinkedIn, websites, and more.',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
