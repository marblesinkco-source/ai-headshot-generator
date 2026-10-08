import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Camera, Clock, Shield, Upload, Sparkles, Download } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { getCityBySlug, getAllCitySlugs, CITIES } from '@/config/city-content';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return getAllCitySlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const data = getCityBySlug(city);
  if (!data) return {};

  const title = `AI Professional Headshots in ${data.name}, ${data.stateAbbr} | ${siteConfig.name}`;
  const description = `Get studio-quality AI headshots in ${data.name}. No photographer needed — upload selfies, receive professional photos for LinkedIn, resumes, and corporate profiles. From ${BASE_PRICE_DISPLAY}.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/locations/${data.slug}` },
    openGraph: generateOGMetadata({
      title,
      description,
      type: 'default',
      subtitle: data.name,
      path: `/locations/${data.slug}`,
    }),
    twitter: generateTwitterMetadata({
      title,
      description,
      type: 'default',
    }),
  };
}

const STEPS = [
  {
    icon: Upload,
    title: 'Upload Your Selfies',
    description: 'Take a few casual photos with your phone. No studio, no photographer, no appointment needed.',
  },
  {
    icon: Sparkles,
    title: 'AI Creates Your Headshots',
    description: 'Our AI analyzes your features and generates studio-quality professional headshots in multiple styles.',
  },
  {
    icon: Download,
    title: 'Download & Use',
    description: 'Get your polished headshots delivered in hours. Ready for LinkedIn, company sites, and more.',
  },
];

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const data = getCityBySlug(city);
  if (!data) notFound();

  const nearbyCity = (slug: string) => CITIES.find((c) => c.slug === slug);

  // Build nearby links from other cities in our list
  const nearbyLinks = data.nearbyAreas
    .map((area) => {
      const slugified = area.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const match = nearbyCity(slugified);
      if (match) return { name: area, href: `/locations/${match.slug}` };
      return { name: area, href: null };
    });

  return (
    <>
      <Header />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Locations', url: `${siteConfig.url}/locations` },
          { name: data.name, url: `${siteConfig.url}/locations/${data.slug}` },
        ]}
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-tp-line bg-tp-paper">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-tp-bronze-ink">
              {data.name}, {data.stateAbbr}
            </p>
            <h1 className="font-display font-normal text-3xl text-tp-black sm:text-4xl lg:text-5xl">
              {data.heroTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-muted">
              {data.heroDescription}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
                className={buttonVariants({ size: 'lg' })}
              >
                Get Your Headshots
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className={buttonVariants({ variant: 'outline', size: 'lg' })}
              >
                View Pricing
              </Link>
            </div>
            <p className="mt-4 text-sm text-tp-muted">
              Starting from {BASE_PRICE_DISPLAY} &middot; No appointment needed
            </p>
          </div>
        </section>

        {/* Local Context */}
        <section className="border-b border-tp-line">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display font-normal text-2xl text-tp-black sm:text-3xl">
                Professional Headshots for {data.name} Professionals
              </h2>
              <p className="mt-6 text-tp-muted leading-relaxed">
                {data.localContext}
              </p>
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="border-b border-tp-line bg-tp-paper">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <h2 className="text-center font-display font-normal text-2xl text-tp-black sm:text-3xl">
              Built for {data.name}&apos;s Top Industries
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-tp-muted">
              Whether you work in {data.industries.slice(0, 3).join(', ')} or beyond, TailorPic delivers headshots that match your industry&apos;s standards.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {data.industries.map((industry) => (
                <div
                  key={industry}
                  className="flex items-center gap-3 rounded-tp-button border border-tp-line bg-white px-4 py-3 shadow-sm"
                >
                  <Camera className="h-5 w-5 shrink-0 text-tp-bronze-ink" />
                  <span className="text-sm font-medium text-tp-ink">{industry}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-b border-tp-line">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <h2 className="text-center font-display font-normal text-2xl text-tp-black sm:text-3xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-tp-muted">
              Skip the {data.name} studio session. Get professional headshots from your phone in three simple steps.
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {STEPS.map((step, idx) => (
                <div key={step.title} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tp-paper">
                    <step.icon className="h-6 w-6 text-tp-bronze-ink" />
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-tp-muted">
                    Step {idx + 1}
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-tp-ink">{step.title}</h3>
                  <p className="mt-2 text-sm text-tp-muted">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-b border-tp-line bg-tp-paper">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <h2 className="text-center font-display font-normal text-2xl text-tp-black sm:text-3xl">
              Why {data.name} Professionals Choose TailorPic
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {[
                {
                  icon: Clock,
                  title: 'Ready in Hours, Not Days',
                  desc: `No need to schedule a session at a ${data.name} photo studio. Upload selfies and get results the same day.`,
                },
                {
                  icon: Shield,
                  title: 'Privacy First',
                  desc: 'Your photos are encrypted, shared only with our AI processing partner for generation, and never sold. Delete your data anytime from your dashboard.',
                },
                {
                  icon: Camera,
                  title: 'Multiple Styles',
                  desc: 'Choose from corporate, creative, casual, and more — all generated from the same set of selfies.',
                },
                {
                  icon: Sparkles,
                  title: `Fraction of ${data.name} Studio Cost`,
                  desc: `Skip the studio — TailorPic starts from just ${BASE_PRICE_DISPLAY}, a fraction of a typical session.`,
                },
              ].map((b) => (
                <div key={b.title} className="flex gap-4 rounded-tp-card border border-tp-line bg-white p-6 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tp-paper">
                    <b.icon className="h-5 w-5 text-tp-bronze-ink" />
                  </div>
                  <div>
                    <h3 className="font-medium text-tp-ink">{b.title}</h3>
                    <p className="mt-1 text-sm text-tp-muted">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-b border-tp-line">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 text-center">
            <h2 className="font-display font-normal text-2xl text-tp-black sm:text-3xl">
              Get Your Professional Headshots Today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-tp-muted">
              Join thousands of {data.name} professionals who upgraded their online presence with AI-powered headshots.
            </p>
            <div className="mt-8">
              <Link
                href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
                className={buttonVariants({ size: 'lg' })}
              >
                Start Now — From {BASE_PRICE_DISPLAY}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Nearby Areas */}
        {nearbyLinks.length > 0 && (
          <section className="border-t border-tp-line bg-tp-paper py-12">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <h2 className="mb-6 font-display font-normal text-xl text-tp-black sm:text-2xl">
                Also Serving Nearby Areas
              </h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {nearbyLinks.map((area) =>
                  area.href ? (
                    <li key={area.name}>
                      <Link
                        href={area.href}
                        className="flex items-center gap-2 rounded-tp-button border border-tp-line bg-white px-4 py-3 text-sm font-medium text-tp-bronze-ink shadow-sm transition-colors hover:bg-tp-beige"
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                        AI Headshots in {area.name}
                      </Link>
                    </li>
                  ) : (
                    <li
                      key={area.name}
                      className="flex items-center gap-2 rounded-tp-button border border-tp-line bg-white px-4 py-3 text-sm text-tp-muted shadow-sm"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                      {area.name}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
