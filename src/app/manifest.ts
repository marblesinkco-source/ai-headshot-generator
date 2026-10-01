import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — AI Photo Generator`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#F8F5EF',
    theme_color: '#0B0B0B',
    icons: [
      { src: '/brand/tailorpic/icons/profile-dark-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/brand/tailorpic/icons/profile-dark-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
}
