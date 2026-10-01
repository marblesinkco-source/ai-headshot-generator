import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Check, Clock, FileText, Globe, Mail, PenTool, Sparkles, Star, Upload } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
const pageTitle = "AI Headshots for Authors & Writers | TailorPic";
const pageDescription =
  "Professional AI headshots for novelists, nonfiction authors, freelance writers, and bloggers. Get a polished author photo for book jackets, Amazon author pages, press kits, and your website, delivered in about 2 hours.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/authors' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/industries/authors', type: 'industry' }),
  
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'industry' }),
};

const benefits = [
  {
    icon: BookOpen,
    title: "Book Jacket & Author Page Ready",
    description: "High-resolution portraits sized for back covers, Amazon author pages, Goodreads profiles, and publisher catalogs.",
  },
  {
    icon: FileText,
    title: "Press Kits & Media Requests",
    description: "Journalists, podcasters, and event hosts ask for an author photo. Keep a polished image ready whenever a request comes in.",
  },
  {
    icon: Globe,
    title: "Website & Newsletter Branding",
    description: "Build reader loyalty with a consistent portrait on your author site, Substack, and email signature.",
  },
  {
    icon: Mail,
    title: "Pitch Agents & Publishers",
    description: "A professional portrait on your query materials and author website signals that you are serious about your craft.",
  },
  {
    icon: PenTool,
    title: "Fit Your Genre and Voice",
    description: "Choose a look that suits your writing, from warm and approachable to thoughtful and literary to bold and commercial.",
  },
  {
    icon: Clock,
    title: "Skip the Studio Session",
    description: "Writers work on deadlines, not photo schedules. Get a professional result from home on your own timeline.",
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
    description: "Pick backgrounds and looks that match your genre, from cozy and inviting to sleek and authoritative.",
  },
  {
    icon: Check,
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots in about 2 hours, ready for book covers, author pages, and press kits.",
  },
];

const audiences = [
  {
    icon: BookOpen,
    title: "Novelists & Nonfiction Authors",
    description: "Get a cover-ready author photo for print, ebook, and audiobook listings.",
  },
  {
    icon: Sparkles,
    title: "Self-Published Authors",
    description: "Look as polished as traditionally published authors on Amazon and Kindle.",
  },
  {
    icon: PenTool,
    title: "Freelance Writers & Bloggers",
    description: "Add a professional byline photo to your portfolio and guest posts.",
  },
  {
    icon: Mail,
    title: "Newsletter Writers",
    description: "Build a recognizable face for your Substack, Medium, and social channels.",
  },
];

const faqs = [
  {
    question: "Will my headshot work for a book jacket?",
    answer: "Yes. You receive high-resolution headshots that work well for back covers, Amazon author pages, and publisher materials.",
  },
  {
    question: "Can I choose a style that fits my genre?",
    answer: "You can select backgrounds and looks that match your voice, whether you write warm memoirs, literary fiction, thrillers, or business books.",
  },
  {
    question: "What should I wear in my selfies?",
    answer: "Wear something that feels like you. Solid colors usually work best, and the AI adapts attire to the style you choose.",
  },
  {
    question: "Can I use the headshots on books and in marketing?",
    answer: "Yes. You receive full commercial rights, so you can use your headshots on book covers, websites, press kits, ads, and promotional materials.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most headshots are ready in about 2 hours, so you can update your author page the same day.",
  },
  {
    question: "How many headshots do I get?",
    answer: "Each package delivers multiple variations across backgrounds and styles, giving you options for different books, platforms, and media requests.",
  },
];

export default function AuthorsIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name={"Professional Headshots for Authors & Writers"}
        description={"AI-generated professional author headshots for book jackets, Amazon author pages, press kits, websites, and social media."}
        price={990}
        category="Professional Services"
        slug="industries/authors"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Industries', url: `${siteConfig.url}/industries` },
          { name: "Authors & Writers", url: `${siteConfig.url}/industries/authors` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <PenTool className="h-4 w-4" />
              For Authors &amp; Writers
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Authors &amp; Writers</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Readers connect with the person behind the words. Get a polished author photo for your book jacket, Amazon author page, press kit, and website, without booking a studio session.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Author Headshot
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
            Book-Jacket Ready
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
              Give Your Words a Face
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you author portraits for your books, website, and every social platform.</p>
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
            <p className="mt-4 text-lg text-tp-muted">Headshots for writers at every stage of their publishing journey.</p>
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
            Let Readers Meet the Author
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get a headshot that helps your books and your brand stand out.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Author Headshot
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
