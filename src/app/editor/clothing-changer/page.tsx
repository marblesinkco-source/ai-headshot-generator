import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Briefcase,
  Building2,
  Check,
  GraduationCap,
  Shirt,
  Stethoscope,
  Upload,
  Users,
  Scale,
  Layers,
  Palette,
} from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'AI Clothing Changer for Professional Headshots | TailorPic';
const description =
  'See how TailorPic\'s AI dresses you in suits, blazers and business-casual outfits that fit your industry, so your headshot looks professional.';
const path = '/editor/clothing-changer';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path: path, type: 'default' }),
  twitter: generateTwitterMetadata({ title, description, type: 'default' }),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AI Clothing Changer',
  description,
  url: `${siteConfig.url}${path}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

const steps = [
  { icon: Upload, title: 'Upload a few selfies', body: 'Share 8–15 photos of your face and shoulders. What you are wearing in them does not matter.' },
  { icon: Shirt, title: 'Choose your outfit style', body: 'Pick the wardrobe that fits your field, from a classic suit to a relaxed business-casual look.' },
  { icon: Check, title: 'Download your headshots', body: 'Get finished headshots dressed for your profile, résumé or company page.' },
];

const features = [
  { icon: Briefcase, title: 'Suits and blazers', body: 'Tailored jackets, collars and ties that read as polished and confident.' },
  { icon: Shirt, title: 'Business casual', body: 'Smart knits, open collars and clean shirts for modern workplaces.' },
  { icon: Stethoscope, title: 'Industry-specific looks', body: 'Options suited to fields such as healthcare, finance, tech, law and creative work.' },
  { icon: Palette, title: 'Colors that flatter', body: 'Neutral and muted tones that complement your skin and the backdrop.' },
  { icon: Layers, title: 'Natural fit and folds', body: 'Fabric drapes on your shoulders and neckline realistically, with no pasted-on look.' },
  { icon: Users, title: 'Consistent team wardrobes', body: 'Dress a whole team in a matching style for a uniform company page.' },
];

const useCases = [
  { icon: Briefcase, title: 'Job seekers', body: 'Show up in interview-ready attire even if your selfies were taken in a T-shirt.' },
  { icon: Scale, title: 'Professionals in formal fields', body: 'Law, finance and consulting profiles that need a traditional, credible look.' },
  { icon: Building2, title: 'Teams and companies', body: 'Keep staff photos consistent without scheduling everyone for a shoot.' },
  { icon: GraduationCap, title: 'Students and graduates', body: 'Get a professional outfit for LinkedIn before you own a suit.' },
];

const faqs = [
  { q: 'Can I choose what I wear?', a: 'Yes. You can select from a range of professional outfit styles when you set up your headshots.' },
  { q: 'Does my original clothing matter?', a: 'No. Pick selfies with good lighting and a clear face. The clothing in your uploads does not carry over.' },
  { q: 'Will the outfit look fake?', a: 'No. Clothing is generated together with your face and the background in one image, so lighting and fit stay natural.' },
  { q: 'Is this a standalone clothing editor?', a: 'No. This page describes how TailorPic\'s AI headshot service handles outfits. You get finished headshots rather than a one-off editing tool.' },
];

export default function ClothingChangerPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'AI Photo Editor', url: `${siteConfig.url}/editor` },
          { name: 'AI Clothing Changer', url: `${siteConfig.url}${path}` },
        ]}
      />
      <FAQSchema items={faqs} />
      <Header />

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Free tool</p>
          <h1 className="mt-3 text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-5xl">
            AI Clothing Changer for Professional Headshots
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Casual tees and mismatched outfits undercut a great photo. TailorPic&apos;s AI dresses you in attire that matches industry standards, so your headshot looks ready for work.
          </p>
          <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={buttonVariants({ size: 'lg', className: 'mt-8' })}>
            Try TailorPic AI Headshots
          </Link>
        </div>
      </section>

      <section className="border-t border-tp-line bg-tp-paper">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-display font-normal text-tp-ink sm:text-3xl">How it works</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-beige text-tp-bronze-ink">
                    <s.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-tp-bronze-ink">Step {i + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-tp-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-display font-normal text-tp-ink sm:text-3xl">What the AI handles for you</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-tp-card border border-tp-line bg-white p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-beige text-tp-bronze-ink">
                <f.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-tp-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-tp-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-tp-line bg-tp-paper">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-display font-normal text-tp-ink sm:text-3xl">Who it&apos;s for</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((u) => (
              <div key={u.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <u.icon className="h-6 w-6 text-tp-bronze-ink" aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold text-tp-ink">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-display font-normal text-tp-ink sm:text-3xl">Frequently asked questions</h2>
        <div className="mt-8 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-tp-card border border-tp-line bg-white p-5">
              <summary className="cursor-pointer font-semibold text-tp-ink">{f.q}</summary>
              <p className="mt-3 text-sm leading-relaxed text-tp-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-t border-tp-line bg-tp-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-display font-normal text-tp-ink sm:text-3xl">
            Skip the wardrobe change — get AI headshots
          </h2>
          <p className="mt-3 text-tp-muted">
            Upload a few selfies and get studio-quality professional headshots in hours, from $1.99.
          </p>
          <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={buttonVariants({ size: 'lg', className: 'mt-6' })}>
            Get AI Headshots
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
