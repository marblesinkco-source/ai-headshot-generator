import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import {
  ShoppingBag, Camera, Clock, Shield, Star, ArrowRight,
  Users, Palette, Zap, TrendingUp, Package, CheckCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Product Photography for E-Commerce | TailorPic',
  description:
    'Professional product photos for your online store. AI-powered, studio-quality images starting at $9.90. Perfect for Shopify, Amazon, Etsy, and more.',
  openGraph: {
    title: 'AI Product Photography for E-Commerce | TailorPic',
    description:
      'Studio-quality product photos in 2 hours. No photographer needed.',
  },
};

export default function EcommerceLandingPage() {
  return (
    <main className="min-h-screen">
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'Industries', url: `${siteConfig.url}/industries` },
        { name: 'E-Commerce', url: `${siteConfig.url}/industries/ecommerce` },
      ]} />
      <Header />

      {/* Hero */}
      <section className="relative bg-tp-black py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#C9A98A_0%,transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-xs font-semibold text-tp-bronze mb-6">
            <ShoppingBag className="h-3.5 w-3.5" />
            E-Commerce
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            Product Photos That{' '}
            <em className="text-tp-bronze not-italic font-display italic">Sell</em>
          </h1>
          <p className="mt-5 text-lg text-tp-beige/70 max-w-2xl mx-auto leading-relaxed">
            Studio-quality product photography powered by AI. List faster, convert higher,
            and scale your catalog — without the traditional studio cost.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/ecommerce-product"
              className="inline-flex items-center gap-2 rounded-xl bg-tp-bronze px-6 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
            >
              Get Product Photos <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-xl border border-tp-beige/20 px-6 py-3.5 text-sm font-semibold text-tp-beige transition-all hover:bg-white/5"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-tp-line bg-tp-paper py-5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-center">
            {[
              { icon: Camera, text: 'White Background Ready' },
              { icon: Clock, text: 'Under 2 Hours' },
              { icon: Shield, text: 'Commercial License' },
              { icon: Star, text: 'Money-Back Guarantee' },
            ].map((item) => (
              <div key={item.text} className="flex items-center justify-center gap-2 text-xs font-medium text-tp-muted">
                <item.icon className="h-4 w-4 text-tp-bronze" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl text-tp-ink">
              Product Photography Is Broken
            </h2>
            <p className="mt-3 text-tp-muted max-w-xl mx-auto">
              Traditional product photography is too slow, too expensive, and doesn&apos;t scale.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: 'Too Expensive',
                desc: 'Studio sessions cost $50-200+ per product. For a catalog of 100+ items, that adds up to thousands.',
              },
              {
                title: 'Too Slow',
                desc: 'Booking a studio, shipping products, waiting for edits — the process takes weeks per batch.',
              },
              {
                title: 'Doesn\'t Scale',
                desc: 'Every new product launch means another round of scheduling, shooting, and editing.',
              },
            ].map((pain) => (
              <div key={pain.title} className="rounded-2xl border border-red-200/60 bg-red-50/30 p-6">
                <h3 className="text-lg font-semibold text-tp-ink">{pain.title}</h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">{pain.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-tp-black py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
            {[
              { value: '93%', label: 'of shoppers say images affect purchase decisions' },
              { value: '40+', label: 'photos per session' },
              { value: '$9.90', label: 'starting price vs $200+ studios' },
              { value: '<2hrs', label: 'average delivery time' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-tp-beige/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">Benefits</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-tp-ink">
              Why Sellers Choose TailorPic
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Package, title: 'Marketplace-Ready', desc: 'White background photos optimized for Amazon, Shopify, Etsy, and eBay requirements.' },
              { icon: Palette, title: 'Multiple Angles & Styles', desc: 'Lifestyle shots, flat lays, and clean product-on-white — all from one upload.' },
              { icon: TrendingUp, title: 'Higher Conversion Rates', desc: 'Professional product images can increase conversion rates by up to 30%.' },
              { icon: Zap, title: '2-Hour Turnaround', desc: 'Launch new products the same day. No waiting weeks for a photographer.' },
              { icon: Users, title: 'Scale Your Catalog', desc: 'Whether you have 10 or 1,000 products, AI handles them all consistently.' },
              { icon: CheckCircle, title: 'Consistent Branding', desc: 'Every product photo matches your brand style. No more visual inconsistency.' },
            ].map((benefit) => (
              <div key={benefit.title} className="rounded-2xl border border-tp-line p-6 hover:border-tp-bronze/30 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tp-black mb-4">
                  <benefit.icon className="h-5 w-5 text-tp-bronze" />
                </div>
                <h3 className="text-base font-semibold text-tp-ink">{benefit.title}</h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform compatibility */}
      <section className="bg-tp-paper py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-tp-muted mb-5">
            Perfect for
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {['Amazon', 'Shopify', 'Etsy', 'eBay', 'WooCommerce', 'Squarespace', 'Instagram Shop', 'Facebook Marketplace', 'Walmart'].map((platform) => (
              <span
                key={platform}
                className="rounded-full border border-tp-line bg-white px-4 py-2 text-sm font-medium text-tp-ink"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-tp-ink">
            Your Products Deserve Better Photos
          </h2>
          <p className="mt-4 text-lg text-tp-muted">
            Join thousands of sellers who upgraded their product photography with AI.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/ecommerce-product"
              className="inline-flex items-center gap-2 rounded-xl bg-tp-black px-7 py-3.5 text-sm font-semibold text-tp-bronze transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
