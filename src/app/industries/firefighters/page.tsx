import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, Briefcase, Check, Globe, Heart, Shield, Sparkles, Star, Upload, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';


const pageTitle = "AI Headshots for Firefighters | TailorPic";
const pageDescription =
  "Professional AI headshots for firefighters, fire officers, and fire service leaders. Get a confident, trustworthy portrait for department websites, promotions, and LinkedIn in about 2 hours.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/firefighters' },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}/industries/firefighters`,
  },
};

const benefits = [
  {
    icon: Shield,
    title: "Trusted and Confident",
    description: "Project the steadiness and reliability your community expects from those who protect it.",
  },
  {
    icon: Award,
    title: "Promotion & Command Packets",
    description: "Include a polished portrait in promotion packets, award nominations, and officer candidate applications.",
  },
  {
    icon: Globe,
    title: "Department Website & Roster",
    description: "Clean, consistent portraits for station pages, rosters, and community outreach materials.",
  },
  {
    icon: Users,
    title: "Recruitment Materials",
    description: "Help your department attract new recruits with authentic, professional faces of your team.",
  },
  {
    icon: Briefcase,
    title: "Career Transition Ready",
    description: "Moving into training, inspection, or consulting? Keep a professional headshot ready for LinkedIn and applications.",
  },
  {
    icon: Heart,
    title: "Community & Media Features",
    description: "Be ready when local press, school visits, or fundraisers ask for a headshot and bio.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload 6-10 Selfies",
    description: "Take clear, well-lit photos of yourself. Vary your angles and expressions so the AI captures your natural look.",
  },
  {
    icon: Sparkles,
    title: "Choose Your Style",
    description: "Pick a background and look that fit your goals, from approachable community portraits to formal command style.",
  },
  {
    icon: Check,
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots in about 2 hours, ready for rosters, packets, and profiles.",
  },
];

const audiences = [
  {
    icon: Shield,
    title: "Career Firefighters",
    description: "Professional portraits for promotion boards, rosters, and LinkedIn.",
  },
  {
    icon: Heart,
    title: "Volunteer Firefighters",
    description: "Polished images for volunteer recruitment pages and community events.",
  },
  {
    icon: Award,
    title: "Fire Officers & Chiefs",
    description: "Authoritative headshots for leadership pages, budget presentations, and press.",
  },
  {
    icon: Briefcase,
    title: "Fire Prevention & Training Staff",
    description: "Credible portraits for instructor bios, inspection programs, and conferences.",
  },
];

const faqs = [
  {
    question: "Can I get a headshot without wearing my uniform?",
    answer: "Yes. You can choose business or professional attire styles, and the AI adapts clothing to the look you select.",
  },
  {
    question: "Will it work for promotion packets and awards?",
    answer: "Yes. You can pick a formal, confident style that suits promotion applications, award nominations, and officer profiles.",
  },
  {
    question: "What should I wear in my selfies?",
    answer: "Wear something neat and solid-colored. The AI adjusts attire to the style you choose.",
  },
  {
    question: "Can my department use the headshots on its website?",
    answer: "Yes. You receive full commercial rights for websites, recruitment materials, and social media.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most headshots are ready in about 2 hours, so you can update your packet the same day.",
  },
  {
    question: "How many headshots do I get?",
    answer: "Each package delivers multiple variations across backgrounds and styles, giving you options for different uses.",
  },
];

export default function FirefightersIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name={"Professional Headshots for Firefighters"}
        description={"AI-generated professional headshots for firefighters and fire service leaders for department websites, promotion packets, and LinkedIn."}
        price={990}
        category="Public Service"
        slug="industries/firefighters"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Industries', url: `${siteConfig.url}/industries` },
          { name: "Firefighters", url: `${siteConfig.url}/industries/firefighters` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Shield className="h-4 w-4" />
              For Firefighters
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Firefighters</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              You show up when the community needs you most. Get a confident, professional headshot for department rosters, promotion packets, and career profiles without a photo session.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Firefighter Headshot
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
            Department-Ready Portraits
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
              Service Portraits That Command Respect
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you portraits for your department, your career, and your community presence.</p>
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
            <p className="mt-4 text-lg text-tp-muted">Headshots for every role in the fire service.</p>
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
            Show the Face Your Community Trusts
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get a headshot that reflects your service and professionalism.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Firefighter Headshot
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
