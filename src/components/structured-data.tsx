import { siteConfig } from '@/config/site';
import { BASE_PRICE } from '@/config/pricing';

// JSON-LD Structured Data for SEO
export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/tailorpic/icons/profile-dark-512.png`,
    description: siteConfig.description,
    foundingDate: '2024',
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
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    areaServed: 'Worldwide',
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

export function SoftwareApplicationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    applicationCategory: 'PhotographyApplication',
    operatingSystem: 'Web',
    url: siteConfig.url,
    description: siteConfig.description,
    screenshot: `${siteConfig.url}/brand/tailorpic/web/og-tailorpic-1200x630.jpg`,
    featureList: 'AI Headshots, Professional Photos, LinkedIn Photos, Team Photos, 40+ Styles',
    offers: {
      '@type': 'Offer',
      price: BASE_PRICE.toFixed(2),
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
