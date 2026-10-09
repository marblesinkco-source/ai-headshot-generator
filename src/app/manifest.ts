import type { MetadataRoute } from 'next';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TailorPic — AI Headshot Generator',
    short_name: 'TailorPic',
    description: `Upload a few selfies, get studio-quality AI headshots for LinkedIn, business and life. From ${BASE_PRICE_DISPLAY}.`,
    start_url: '/',
    id: '/',
    display: 'standalone',
    theme_color: '#1A1A1A',
    background_color: '#FAF7F2',
    lang: 'en',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { src: '/brand/tailorpic/icons/profile-dark-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/brand/tailorpic/icons/profile-dark-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/brand/tailorpic/icons/profile-dark-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
    ],
    categories: ['photography', 'business'],
    shortcuts: [
      { name: 'Get Headshots', url: '/headshots', description: 'Browse headshot packages' },
      { name: 'Pricing', url: '/pricing', description: 'View pricing plans' },
      { name: 'Dashboard', url: '/dashboard', description: 'Access your dashboard' },
    ],
  };
}
