import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, Check, Globe, Headphones, Layers, Mic, Radio, Sparkles, Star, Upload } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
const pageTitle = "AI Headshots for Podcasters | TailorPic";
const pageDescription =
  "Professional AI headshots for podcast hosts, guests, and audio creators. Put a polished face on your show site, media kit, and social profiles with a portrait delivered in about 2 hours.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/podcasters' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/industries/podcasters', type: 'industry' }),
  
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'industry' }),
};

const benefits = [
  {
    icon: Mic,
    title: "Show Website & About Page",
    description: "Listeners and sponsors visit your site to learn who you are. A professional host photo makes your show feel established.",
  },
  {
    icon: Headphones,
    title: "Guest Appearances",
    description: "When you are invited on other shows, hosts ask for a headshot and bio. Keep a polished image ready to send.",
  },
  {
    icon: Radio,
    title: "Promo Graphics & Social Posts",
    description: "Use clean portraits for episode announcements, quote cards, and social promotion across platforms.",
  },
  {
    icon: Award,
    title: "Sponsor & Media Kit Ready",
    description: "Advertisers want to see who they are partnering with. A professional portrait strengthens your media kit.",
  },
  {
    icon: Layers,
    title: "Consistent Personal Brand",
    description: "Match your headshot to your show colors with backgrounds that work across artwork, YouTube, and newsletters.",
  },
  {
    icon: Globe,
    title: "Skip the Expensive Shoot",
    description: "Hosting is often a side project. Get a professional result at home without paying for a photographer.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload 6-10 Selfies",
    description: "Take clear, well-lit photos of yourself. Vary your angles and expressions so the AI captures your natural personality.",
  },
  {
    icon: Sparkles,
    title: "Choose Your Style",
    description: "Pick backgrounds and looks that fit your show, from bright and playful to moody and editorial.",
  },
  {
    icon: Check,
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots in about 2 hours, ready for show art, guest bios, and social profiles.",
  },
];

const audiences = [
  {
    icon: Mic,
    title: "Solo & Interview Hosts",
    description: "Put a recognizable face on your show website and podcast directory profiles.",
  },
  {
    icon: Headphones,
    title: "Frequent Podcast Guests",
    description: "Keep a professional image ready for every guest bio request.",
  },
  {
    icon: Radio,
    title: "Audio Network Producers",
    description: "Create consistent portraits for multiple hosts on your network pages.",
  },
  {
    icon: Star,
    title: "Video Podcasters & Streamers",
    description: "Use a polished portrait for thumbnails, channel art, and social previews.",
  },
];

const faqs = [
  {
    question: "Will my headshot work for podcast artwork?",
    answer: "Yes. You can choose backgrounds and looks that suit your show style, and the images work well for cover art layouts, thumbnails, and promo graphics.",
  },
  {
    question: "Can I use the headshots on my website and media kit?",
    answer: "Yes. You receive full commercial rights, so you can use your headshots on websites, media kits, sponsorship decks, and social media.",
  },
  {
    question: "Can I match the headshot to my show branding?",
    answer: "You can select backgrounds and looks that complement your palette, so your portrait fits naturally into your show branding.",
  },
  {
    question: "What should I wear in my selfies?",
    answer: "Wear something that reflects your on-air personality. Solid colors usually work best, and the AI adapts attire to the style you choose.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most headshots are ready in about 2 hours, so you can refresh your profiles before your next episode drops.",
  },
  {
    question: "How many headshots do I get?",
    answer: "Each package delivers multiple variations across backgrounds and styles, giving you options for different platforms.",
  },
];

export default function PodcastersIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name={"Professional Headshots for Podcasters"}
        description={"Professional AI headshots for podcast hosts, guests, and audio creators."}
        price={990}
        category="Media & Entertainment"
        slug="industries/podcasters"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Industries', url: `${siteConfig.url}/industries` },
          { name: "Podcasters", url: `${siteConfig.url}/industries/podcasters` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Mic className="h-4 w-4" />
              For Podcasters
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Podcasters</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Your voice gets people to listen, but your face helps them remember you. Get a polished host portrait for show artwork, guest profiles, and social promotion without a studio shoot.</p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Host Headshot
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
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-tp-line bg-tp-paper py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm text-tp-muted sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Show Art &amp; Social Ready
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
            14-Day Money-Back Guarantee
          </span>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              Give Your Voice a Face
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you portraits for your show site, podcast directories, and social channels.</p>
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
            <p className="mt-4 text-lg text-tp-muted">Headshots for every kind of host, producer, and audio creator.</p>
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
            Let Listeners Put a Face to the Voice
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get a host headshot that makes your show feel professional from the first glance.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Host Headshot
            </Link>
            <Link href="/pricing" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              View Pricing
            </Link>
          </div>
          <p className="mt-6 text-sm text-tp-muted">
            No subscription required. 14-day money-back guarantee.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
