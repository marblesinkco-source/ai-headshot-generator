import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, Briefcase, Check, Globe, Layers, Sparkles, Star, Target, Upload, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const pageTitle = "AI Headshots for DJs | TailorPic";
const pageDescription =
  "Professional AI headshots for club DJs, wedding DJs, and producers. Get press-ready portraits for booking pages, festival lineups, and Resident Advisor profiles in about 2 hours.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/djs' },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}/industries/djs`,
  },
};

const benefits = [
  {
    icon: Star,
    title: "Press Kit & EPK Ready",
    description: "Promoters and labels ask for a headshot with every bio. Keep a polished image on hand for press kits, electronic press kits, and artist submissions.",
  },
  {
    icon: Users,
    title: "Festival & Club Lineups",
    description: "Clean, high-resolution portraits that hold up on lineup posters, flyers, and event pages.",
  },
  {
    icon: Globe,
    title: "Booking Site & Socials",
    description: "Match your look across Instagram, SoundCloud, Mixcloud, and your own booking page.",
  },
  {
    icon: Award,
    title: "Stand Out From the Crowd",
    description: "A professional image signals you are a serious act worth a higher fee.",
  },
  {
    icon: Layers,
    title: "Multiple Looks, One Session",
    description: "Get moody club looks and clean daytime portraits for wedding and corporate bookings.",
  },
  {
    icon: Briefcase,
    title: "Skip the Photo Shoot",
    description: "No studio rental or scheduling. Get a professional result at home in about 2 hours.",
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
    description: "Pick backgrounds and looks that fit your work, from dark and moody to bright and friendly.",
  },
  {
    icon: Check,
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots in about 2 hours, ready for your website, profiles, and social media.",
  },
];

const audiences = [
  {
    icon: Star,
    title: "Club & Festival DJs",
    description: "Headshots that look great on posters and promoter pages.",
  },
  {
    icon: Users,
    title: "Wedding & Event DJs",
    description: "Friendly, professional portraits for client-facing booking pages.",
  },
  {
    icon: Target,
    title: "Producers & Remixers",
    description: "Consistent artist imagery for streaming and label profiles.",
  },
  {
    icon: Globe,
    title: "Radio & Mix Hosts",
    description: "Polished photos for show pages and podcast platforms.",
  },
];

const faqs = [
  {
    question: "Can I get a moody, club-style look?",
    answer: "Yes. You can choose darker, more dramatic styles for nightlife branding or bright, friendly styles for weddings and corporate events.",
  },
  {
    question: "Will the headshots work on flyers and posters?",
    answer: "You receive high-resolution files that scale cleanly for lineup posters, flyers, and web banners.",
  },
  {
    question: "Can I use the photos in my press kit?",
    answer: "Yes. You receive full commercial rights for press kits, booking sites, streaming profiles, and promotional materials.",
  },
  {
    question: "What should I wear in my selfies?",
    answer: "Wear something that reflects your stage image. Solid colors work best, and the AI adapts attire to your chosen style.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most headshots are ready in about 2 hours, so you can update your profiles before your next gig.",
  },
  {
    question: "How many headshots do I get?",
    answer: "Each package delivers multiple variations across styles and backgrounds for different platforms.",
  },
];

export default function DJsIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name={"Professional Headshots for DJs"}
        description={"AI-generated professional headshots for DJs for booking pages, press kits, festival lineups, and social media."}
        price={990}
        category="Professional Services"
        slug="industries/djs"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Industries', url: `${siteConfig.url}/industries` },
          { name: "DJs", url: `${siteConfig.url}/industries/djs` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Star className="h-4 w-4" />
              For DJs
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">DJs</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Promoters and clients book the DJ who looks the part. Get a sharp, confident headshot for your press kit, lineup posters, and booking page, without waiting on a photographer.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your DJ Headshot
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
            Press-Kit Ready Files
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
            <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
              Look Booked Before the First Set
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you portraits for every flyer, profile, and press kit.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="tp-card rounded-2xl border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
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
            <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
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
            <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
              Who Uses TailorPic
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Headshots for every kind of dj professional.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-tp-line bg-white p-6">
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
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-tp-line bg-white p-6">
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
          <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
            Get Your Name on More Lineups
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get a headshot that makes promoters and clients say yes.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your DJ Headshot
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
