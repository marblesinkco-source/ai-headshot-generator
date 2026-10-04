import Image from 'next/image';
import { getIndustryVisual, portrait } from '@/config/stock-portraits';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Check,
  Globe,
  ImageIcon,
  Megaphone,
  Mic,
  Music,
  Palette,
  Sparkles,
  Star,
  Upload,
  Users,
} from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
const pageTitle = "AI Headshots for Musicians & Artists | TailorPic";
const pageDescription =
  'Professional AI headshots for musicians, singers, producers and visual artists. Press-ready portraits for Spotify, EPKs, booking inquiries and social media.';

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/musicians' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/industries/musicians', type: 'industry' }),
  
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'industry' }),
};

const benefits = [
  {
    icon: Mic,
    title: "Press Kit & EPK Ready",
    description: "Venues, bookers, and journalists expect a high-quality photo. Get press-ready portraits to include in every electronic press kit.",
  },
  {
    icon: Music,
    title: "Streaming Profile Photos",
    description: "Give your Spotify, Apple Music, and Bandcamp artist profiles a sharp image that makes listeners pay attention.",
  },
  {
    icon: Palette,
    title: "Styles That Fit Your Sound",
    description: "Choose moody, bold, minimal, or clean looks that match your genre and artistic identity instead of a generic portrait.",
  },
  {
    icon: Megaphone,
    title: "Social & Promo Content",
    description: "Use consistent portraits for gig posters, release announcements, and social media so your brand looks cohesive.",
  },
  {
    icon: Globe,
    title: "Artist Website & Bio",
    description: "Polished images for your About page, portfolio, and gallery listings help fans and collectors connect with you.",
  },
  {
    icon: Image,
    title: "Affordable Alternative to a Shoot",
    description: "Skip the cost of a photographer, studio, and stylist. Get professional portraits on an independent artist's budget.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload 6-10 Selfies",
    description: "Take clear photos in good light. Try a mix of serious and relaxed expressions and vary your angles.",
  },
  {
    icon: Sparkles,
    title: "Choose Your Style",
    description: "Pick a look that matches your genre or medium, from moody and editorial to bright and clean.",
  },
  {
    icon: Check,
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots in about 2 hours, ready for streaming profiles, press kits, and promo materials.",
  },
];

const audiences = [
  {
    icon: Mic,
    title: "Singers & Songwriters",
    description: "Put a memorable face on your streaming profiles and booking pitches.",
  },
  {
    icon: Music,
    title: "Bands, DJs & Producers",
    description: "Get polished individual portraits for press kits and lineup announcements.",
  },
  {
    icon: Palette,
    title: "Visual Artists & Illustrators",
    description: "Add a professional portrait to your portfolio, gallery submissions, and artist statement.",
  },
  {
    icon: Users,
    title: "Performers & Session Players",
    description: "Stand out on casting and booking platforms with a headshot that shows your presence.",
  },
];

const faqs = [
  {
    question: "Can I get a style that matches my genre?",
    answer: "Yes. You can explore moody, editorial, bold, or clean looks so your portrait reflects your sound and artistic identity.",
  },
  {
    question: "Are the headshots good enough for a press kit?",
    answer: "The high-resolution portraits are suitable for EPKs, press releases, venue listings, and festival applications.",
  },
  {
    question: "What should I wear in my selfies?",
    answer: "Wear something that feels like you. The AI adapts attire and backgrounds to the style you choose, so you can also try more polished looks.",
  },
  {
    question: "Can I use them on streaming platforms and posters?",
    answer: "Yes. You receive full commercial rights, including use on streaming profiles, posters, merchandise, websites, and social media.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most headshots are ready in about 2 hours, which is handy when a booker or blogger asks for a photo on short notice.",
  },
  {
    question: "How many headshots do I get?",
    answer: "Each package delivers multiple variations, giving you choices for profile photos, press images, and promo graphics.",
  },
];

export default function MusiciansIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name={"Professional Headshots for Musicians & Artists"}
        description={"AI-generated professional headshots for musicians, singers, producers, and artists for press kits, streaming profiles, and social media."}
        price={990}
        category="Professional Services"
        slug="industries/musicians"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Industries', url: `${siteConfig.url}/industries` },
          { name: "Musicians & Artists", url: `${siteConfig.url}/industries/musicians` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Image src={portrait(getIndustryVisual("musicians").heroPortraitId)} alt={getIndustryVisual("musicians").alt} width={20} height={20} className="h-5 w-5 rounded-full object-cover" />
              For Musicians &amp; Artists
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Musicians &amp; Artists</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Bookers, press, and fans all judge your image first. Get striking, press-ready portraits that fit your sound, without paying for a photographer, studio, or stylist.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=/headshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Artist Headshot
              </Link>
              <Link
                href="/pricing"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'border-tp-beige/30 text-tp-beige hover:bg-tp-beige/10'
                )}
              >
                View Pricing
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-tp-bronze text-tp-bronze" />
              ))}
            </div>
          
            {/* Hero portrait */}
            <div className="mx-auto mt-12 h-32 w-32 overflow-hidden rounded-full ring-4 ring-tp-bronze/20 sm:h-40 sm:w-40">
              <Image
                src={portrait(getIndustryVisual("musicians").heroPortraitId)}
                alt={getIndustryVisual("musicians").alt}
                width={320}
                height={427}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-tp-line bg-tp-paper py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm text-tp-muted sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Genre-Matched Styles
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Delivered in About 2 Hours
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Full Commercial Rights
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Satisfaction Guaranteed
          </span>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              An Image That Matches Your Art
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you portraits for press kits, streaming profiles, and every social platform.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="tp-card rounded-tp-card border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tp-black">
                    <Icon className="h-6 w-6 text-tp-bronze" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-tp-paper py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Three simple steps from selfie to finished headshot.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tp-black">
                    <Icon className="h-6 w-6 text-tp-bronze" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-tp-bronze-ink">Step {index + 1}</p>
                  <h3 className="mt-1 text-lg font-semibold text-tp-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              Who Uses TailorPic
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Headshots for musicians and artists across every genre and medium.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                  <Icon className="h-6 w-6 text-tp-bronze" />
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-tp-paper py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-tp-card border border-tp-line bg-white p-6">
                <h3 className="text-lg font-semibold text-tp-ink">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
            Make Your First Impression as Good as Your Work
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get press-ready portraits that help bookers, press, and fans remember you.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=/headshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Artist Headshot
            </Link>
            <Link href="/pricing" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              View Pricing
            </Link>
          </div>
          <p className="mt-6 text-sm text-tp-muted">
            No subscription required. One-time payment.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
