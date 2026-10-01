import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import {
  Users, Sparkles, ArrowRight, CheckCircle, Palette,
  Download, LayoutDashboard, Image, Camera, Send,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Team Headshots — Professional AI Photos for Your Team | TailorPic',
  description:
    'Get consistent, professional AI headshots for your entire team. Each member uploads selfies, and our AI generates polished, on-brand headshots in minutes.',
  alternates: { canonical: '/team-headshots' },
  openGraph: {
    title: 'Team Headshots — Professional AI Photos for Your Team | TailorPic',
    description:
      'Get consistent, professional AI headshots for your entire team. Upload selfies, get polished results in minutes.',
    url: `${siteConfig.url}/team-headshots`,
    siteName: siteConfig.name,
    type: 'website',
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Team Headshots — Professional AI Photos for Your Team | TailorPic',
    description:
      'Get consistent, professional AI headshots for your entire team. Upload selfies, get polished results in minutes.',
    images: [siteConfig.ogImage],
  },
};

export default function TeamHeadshotsPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'Team Headshots', url: `${siteConfig.url}/team-headshots` },
      ]} />
      <Header />

      {/* Hero */}
      <section className="relative bg-tp-black py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#C9A98A_0%,transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-xs font-semibold text-tp-bronze mb-6">
            <Users className="h-3.5 w-3.5" />
            Team Plan
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            Professional Headshots{' '}
            <em className="text-tp-bronze not-italic font-display italic">for Your Team</em>
          </h1>
          <p className="mt-5 text-lg text-tp-beige/70 max-w-2xl mx-auto leading-relaxed">
            One order, consistent results. Your team uploads selfies, and our AI
            generates polished, on-brand headshots&mdash;no photographer needed.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-xl bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-tp-beige/20 px-6 py-3.5 text-sm font-semibold text-tp-beige transition-all hover:bg-white/5"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
              Simple Process
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-tp-ink">
              How It Works for Teams
            </h2>
            <p className="mt-3 text-tp-muted max-w-xl mx-auto">
              Three steps from signup to finished headshots&mdash;no scheduling, no studios.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: '1',
                icon: Send,
                title: 'Admin Orders & Invites',
                desc: 'Create your team account and invite members via email. Set your preferred style and background so every headshot matches.',
              },
              {
                step: '2',
                icon: Camera,
                title: 'Team Uploads Selfies',
                desc: 'Each team member uploads a few selfies from their phone or computer. No studio visit required.',
              },
              {
                step: '3',
                icon: Sparkles,
                title: 'AI Generates Headshots',
                desc: 'Our AI produces consistent, professional headshots for every member. Review, download, and use them anywhere.',
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-tp-black text-tp-bronze font-bold text-lg mb-4">
                  {s.step}
                </div>
                <s.icon className="h-5 w-5 text-tp-bronze mx-auto mb-2" />
                <h3 className="text-base font-semibold text-tp-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
              Team Features
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-tp-ink">
              Everything Your Team Needs
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: Image,
                title: 'Consistent Backgrounds',
                desc: 'Every headshot shares the same background and lighting style, so your team page looks cohesive and polished.',
              },
              {
                icon: Palette,
                title: 'Brand Guidelines',
                desc: 'Set your brand colors and style preferences once. They apply automatically to every headshot in the team.',
              },
              {
                icon: LayoutDashboard,
                title: 'Admin Dashboard',
                desc: 'Invite members, track who has uploaded, review results, and manage everything from a single dashboard.',
              },
              {
                icon: Download,
                title: 'Bulk Download',
                desc: 'Download all team headshots at once in the resolution you need&mdash;ready for your website, LinkedIn, or email signatures.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-tp-line bg-white p-6 hover:border-tp-bronze/30 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tp-black mb-4">
                  <feature.icon className="h-5 w-5 text-tp-bronze" />
                </div>
                <h3 className="text-base font-semibold text-tp-ink">{feature.title}</h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="bg-tp-black py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-white mb-4">
            Team Pricing
          </h2>
          <p className="text-tp-beige/60 max-w-xl mx-auto mb-6">
            Volume discounts are available for teams. The more people on your plan,
            the lower the per-person cost.
          </p>
          <ul className="mx-auto max-w-md text-left space-y-3 mb-8">
            {[
              'Multiple headshot variations per person',
              'Consistent style across the entire team',
              'High-resolution downloads included',
              'Admin tools for managing your team',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-tp-beige/70">
                <CheckCircle className="h-3.5 w-3.5 text-tp-bronze flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-xl bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
          >
            View Pricing Details <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Users className="h-10 w-10 text-tp-bronze mx-auto mb-4" />
          <h2 className="font-display text-3xl sm:text-4xl text-tp-ink">
            Ready to Outfit Your Team?
          </h2>
          <p className="mt-4 text-lg text-tp-muted max-w-xl mx-auto">
            Skip the photo studio. Get consistent, professional headshots for
            everyone on your team in minutes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-xl bg-tp-black px-7 py-3.5 text-sm font-semibold text-tp-bronze transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-tp-line px-6 py-3.5 text-sm font-semibold text-tp-ink transition-all hover:bg-tp-paper"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
