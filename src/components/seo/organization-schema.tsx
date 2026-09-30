import { siteConfig } from '@/config/site';
import { JsonLd } from './json-ld';

/**
 * Only add verified, real profile URLs here. Do not invent social links.
 */
const SAME_AS: string[] = [];

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/brand/tailorpic/logo/tailorpic-horizontal-bronze.svg`,
        description: siteConfig.description,
        ...(SAME_AS.length > 0 && { sameAs: SAME_AS }),
        contactPoint: {
          '@type': 'ContactPoint',
          email: siteConfig.supportEmail,
          contactType: 'customer support',
        },
      }}
    />
  );
}
