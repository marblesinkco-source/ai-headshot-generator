import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TailorPic — AI Headshot Generator',
    short_name: 'TailorPic',
    description: 'Professional AI headshots within hours',
    start_url: '/',
    display: 'standalone',
    theme_color: '#1A1A1A',
    background_color: '#FAF7F2',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { src: '/brand/tailorpic/icons/profile-dark-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/brand/tailorpic/icons/profile-dark-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
    categories: ['photography', 'business'],
  };
}
