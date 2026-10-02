import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Camera, Check, Film, Mic, Sparkles, Star, Upload, UserCheck, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
const pageTitle = "AI Headshots for Actors & Performers | TailorPic";
const pageDescription =
  'Professional AI headshots for actors, models, and performers. Get casting-ready portraits for auditions, talent profiles, and agencies.';

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/actors' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/industries/actors', type: 'industry' }),
  
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'industry' }),
};

const benefits = [
  {
    icon: Film,
    title: "Range of Expressions & Moods",
    description: "Generate headshots that show different sides of your range, from warm and approachable commercial looks to intense and dramatic character portraits.",
  },
  {
    icon: Camera,
    title: "Casting Director Ready",
    description: "Clean, well-lit portraits on neutral backgrounds that meet the formatting expectations of casting platforms like Actors Access and Backstage.",
  },
  {
    icon: Film,
    title: "Multiple Looks Without Wardrobe Changes",
    description: "Get theatrical, commercial, and lifestyle headshots from a single upload, so you have the right photo for every audition type.",
  },
  {
    icon: UserCheck,
    title: "Authentic to Your Current Look",
    description: "Our AI works from your real selfies, so your headshots match how you actually look today. No more outdated photos that surprise casting directors.",
  },
  {
    icon: Briefcase,
    title: "Theater & Stage Profiles",
    description: "Bold, expressive portraits that work for playbills, theater company websites, and stage production marketing materials.",
  },
  {
    icon: Mic,
    title: "Budget-Friendly for Emerging Talent",
    description: "Professional headshots typically cost hundreds of dollars per session. Get studio-quality results at a fraction of the price while you build your career.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload 6-10 Selfies",
    description: "Take clear photos in natural light. Show your current look with varied angles and subtle expression changes.",
  },
  {
    icon: Sparkles,
    title: "Choose Your Style",
    description: "Select commercial, theatrical, or lifestyle looks with backgrounds suited to your casting goals.",
  },
  {
    icon: Check,
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots in about 2 hours, ready for casting profiles, your agent, and social media.",
  },
];

const audiences = [
  {
    icon: Film,
    title: "Film & TV Actors",
    description: "Get clean, natural headshots that match what casting directors expect on Actors Access and self-tape submissions.",
  },
  {
    icon: Briefcase,
    title: "Theater Performers",
    description: "Bold, expressive portraits for playbills, company bios, and audition submissions.",
  },
  {
    icon: Mic,
    title: "Voice Actors & Hosts",
    description: "A professional headshot for your website, talent profiles, and podcast pages.",
  },
  {
    icon: Users,
    title: "Models & Influencers",
    description: "Polished portraits for agency comp cards, brand pitches, and social media profiles.",
  },
];

const faqs = [
  {
    question: "Will these headshots work for casting submissions?",
    answer: "Yes. Our headshots are high-resolution with clean backgrounds and natural lighting that meet the standards of platforms like Actors Access, Backstage, and Casting Networks. They should accurately reflect your current look.",
  },
  {
    question: "Can I get both commercial and theatrical looks?",
    answer: "Absolutely. You can generate multiple styles from one upload, including warm commercial portraits and more dramatic, intense theatrical headshots.",
  },
  {
    question: "Do the headshots look like me?",
    answer: "Yes. We work from your actual selfies to create headshots that match your current appearance. Casting directors will see the real you when you walk into the room.",
  },
  {
    question: "How do these compare to a professional headshot session?",
    answer: "A traditional headshot session with a photographer can cost $300 to $1,000 or more. Our AI headshots deliver studio-quality results at a fraction of that price, and you can update them whenever your look changes.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most headshots are ready in about 2 hours. Upload before a rehearsal and have your new headshots by the time you finish.",
  },
  {
    question: "Can I use these on my agency profile?",
    answer: "Yes. You receive full commercial rights. Use your headshots on agency profiles, personal websites, social media, and any casting platform.",
  },
];

export default function ActorsIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name={"Professional Headshots for Actors"}
        description={"AI-generated professional headshots for actors, models, and performers for casting profiles, auditions, and talent agencies."}
        price={990}
        category="Professional Services"
        slug="industries/actors"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Industries', url: `${siteConfig.url}/industries` },
          { name: "Actors", url: `${siteConfig.url}/industries/actors` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Film className="h-4 w-4" />
              For Actors &amp; Performers
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Actors</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Your headshot is your first audition. Get casting-ready portraits that show your range and match your current look, from a few selfies, without the cost of a traditional session.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=/headshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Actor Headshot
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
            Commercial &amp; Theatrical Styles
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
              Headshots That Get You in the Room
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you portraits for casting platforms, your agent, and social media.</p>
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
            <p className="mt-4 text-lg text-tp-muted">Headshots for every performer and creative professional.</p>
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
            Your Next Role Starts With Your Headshot
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get casting-ready headshots from a few selfies, at a fraction of the cost of a traditional session.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=/headshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Actor Headshot
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
