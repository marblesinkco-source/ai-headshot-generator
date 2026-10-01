import type { Metadata } from 'next';
import Link from 'next/link';
import { Activity, Calendar, Check, Dumbbell, Megaphone, Sparkles, Star, Target, Trophy, Upload, Users, Video } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const pageTitle = "AI Headshots for Fitness Trainers & Personal Coaches | TailorPic";
const pageDescription =
  "Professional AI headshots for personal trainers, fitness coaches, yoga instructors, and gym owners. Stand out on Instagram, booking apps, and your website with a confident portrait delivered in about 2 hours.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/fitness-trainers' },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}/industries/fitness-trainers`,
  },
};

const benefits = [
  {
    icon: Dumbbell,
    title: "Look Strong and Approachable",
    description: "Show potential clients the energy and confidence they want from a trainer, without needing a gym photoshoot.",
  },
  {
    icon: Megaphone,
    title: "Instagram & Social Ready",
    description: "Get portraits sized for profile photos, reels covers, and promo posts so your social presence looks consistent.",
  },
  {
    icon: Calendar,
    title: "Booking Apps & Gym Profiles",
    description: "Use a clean headshot on Mindbody, your gym's trainer page, and scheduling links to turn visitors into booked sessions.",
  },
  {
    icon: Trophy,
    title: "Highlight Your Credibility",
    description: "A professional image next to your certifications tells clients you take your craft and their results seriously.",
  },
  {
    icon: Video,
    title: "Online Coaching Brand",
    description: "Build a polished face for virtual programs, YouTube channels, and membership sites that supports online clients.",
  },
  {
    icon: Target,
    title: "Flexible Styles for Your Niche",
    description: "Choose athletic, studio, or professional looks depending on whether you coach strength, yoga, running, or wellness.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload 6-10 Selfies",
    description: "Take clear, well-lit photos of yourself. Mix in a few smiling and confident expressions from different angles.",
  },
  {
    icon: Sparkles,
    title: "Choose Your Style",
    description: "Pick a look that matches your coaching style, from athletic and energetic to clean and professional.",
  },
  {
    icon: Check,
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots in about 2 hours, ready for Instagram, your booking page, and your gym profile.",
  },
];

const audiences = [
  {
    icon: Dumbbell,
    title: "Personal Trainers",
    description: "Win more inquiries with a headshot that looks as strong as the results you promise.",
  },
  {
    icon: Activity,
    title: "Yoga & Pilates Instructors",
    description: "Show a calm, welcoming presence on studio sites and class booking apps.",
  },
  {
    icon: Trophy,
    title: "Online & Nutrition Coaches",
    description: "Build credibility for remote programs with a polished, consistent personal brand.",
  },
  {
    icon: Users,
    title: "Gym & Studio Owners",
    description: "Give your whole coaching team matching headshots for the website without a group shoot.",
  },
];

const faqs = [
  {
    question: "Can I get an athletic look rather than a corporate one?",
    answer: "Yes. You can choose styles that range from energetic and athletic to clean and professional, depending on how you want to present your training brand.",
  },
  {
    question: "Will the headshot work for Instagram and my website?",
    answer: "Absolutely. You receive high-resolution portraits that crop well for social profile photos, website hero sections, and booking pages.",
  },
  {
    question: "What should I wear in my selfies?",
    answer: "Wear a clean athletic top or a simple shirt you would wear to meet clients. The AI adapts attire to the style you select.",
  },
  {
    question: "Can I use the headshots commercially?",
    answer: "Yes. Every headshot includes full commercial rights for your website, ads, flyers, business cards, and social media.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most headshots are ready in about 2 hours, so you can upload between sessions and update your profiles by the end of the day.",
  },
  {
    question: "How many headshots do I get?",
    answer: "Each package delivers multiple variations so you can pick different backgrounds and styles for every platform.",
  },
];

export default function FitnessTrainersIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name={"Professional Headshots for Fitness Trainers & Personal Coaches"}
        description={"AI-generated professional headshots for fitness trainers, personal coaches, and yoga instructors for social media, booking pages, and gym websites."}
        price={990}
        category="Professional Services"
        slug="industries/fitness-trainers"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Industries', url: `${siteConfig.url}/industries` },
          { name: "Fitness Trainers & Personal Coaches", url: `${siteConfig.url}/industries/fitness-trainers` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Dumbbell className="h-4 w-4" />
              For Trainers &amp; Personal Coaches
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Fitness Trainers</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Clients pick a trainer they believe in. Get a confident, energetic headshot for your profile, booking page, and social feed, without booking a photographer or hitting the studio.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Trainer Headshot
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
            Athletic & Pro Styles
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
              Look Like the Coach Clients Want to Train With
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you portraits for social media, booking apps, and your gym's website.</p>
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
            <p className="mt-4 text-lg text-tp-muted">Headshots for every kind of fitness professional and personal coach.</p>
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
            Turn Profile Views Into Booked Sessions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get a headshot that shows the energy and professionalism you bring to every workout.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Trainer Headshot
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
