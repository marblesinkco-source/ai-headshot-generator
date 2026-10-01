import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, Briefcase, Check, Clock, Globe, GraduationCap, Plane, Shield, Sparkles, Star, Target, Upload } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const pageTitle = "AI Headshots for Pilots & Aviation Professionals | TailorPic";
const pageDescription =
  "Professional AI headshots for airline pilots, flight instructors, charter pilots, and aviation professionals. Stand out on LinkedIn, in crew profiles, and on job applications with a polished portrait delivered in about 2 hours.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/pilots' },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}/industries/pilots`,
  },
};

const benefits = [
  {
    icon: Plane,
    title: "Stand Out on Airline Applications",
    description: "Hiring managers review hundreds of candidates. A confident, professional headshot helps you make a strong first impression in applications and recruiter portals.",
  },
  {
    icon: Briefcase,
    title: "Polished LinkedIn Profile",
    description: "Aviation recruiting runs on LinkedIn. A crisp portrait helps you get noticed by airlines, charter operators, and corporate flight departments.",
  },
  {
    icon: Globe,
    title: "Charter & Flight School Bios",
    description: "Give your captain profile, instructor bio, and operator website a professional image that builds client and student confidence.",
  },
  {
    icon: Shield,
    title: "Project Safety and Professionalism",
    description: "Passengers and students want a pilot they can trust. A composed, credible portrait supports the image of reliability your role demands.",
  },
  {
    icon: Award,
    title: "Showcase Your Career Milestones",
    description: "Pair a strong portrait with your ratings and flight hours on conference bios, aviation association pages, and media features.",
  },
  {
    icon: Clock,
    title: "Fit It Around Your Schedule",
    description: "Irregular rosters and layovers make studio visits hard. Get professional results from any location on your own timeline.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload 6-10 Selfies",
    description: "Take clear, well-lit photos of yourself. Vary your angles and expressions so the AI captures your natural, confident look.",
  },
  {
    icon: Sparkles,
    title: "Choose Your Style",
    description: "Pick looks that fit your role, from uniform-style professional portraits to business attire with clean, neutral backgrounds.",
  },
  {
    icon: Check,
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots in about 2 hours, ready for applications, crew profiles, and social platforms.",
  },
];

const audiences = [
  {
    icon: Plane,
    title: "Airline & Commercial Pilots",
    description: "Keep a professional portrait ready for crew profiles, LinkedIn, and promotions.",
  },
  {
    icon: GraduationCap,
    title: "Flight Instructors",
    description: "Build student trust with a credible image on your school or freelance website.",
  },
  {
    icon: Briefcase,
    title: "Charter & Corporate Pilots",
    description: "Present a polished image to clients on operator websites and proposals.",
  },
  {
    icon: Target,
    title: "Aspiring Pilots & Cadets",
    description: "Make a strong first impression on airline applications and cadet programs.",
  },
];

const faqs = [
  {
    question: "Can I create a pilot-uniform style headshot?",
    answer: "You can choose professional styles that work well for aviation careers. Many pilots pick a clean business look with a neutral background for applications and LinkedIn.",
  },
  {
    question: "Will it work for airline application portals?",
    answer: "Yes. You receive high-resolution headshots with clean backgrounds that work well for online application systems, recruiter profiles, and company directories.",
  },
  {
    question: "What should I wear in my selfies?",
    answer: "Wear what you would wear to meet an employer. A collared shirt or crisp professional attire in a solid color usually works best.",
  },
  {
    question: "Can I use the headshots commercially?",
    answer: "Yes. You receive full commercial rights, so you can use your headshots on charter websites, flight school pages, LinkedIn, and promotional materials.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most headshots are ready in about 2 hours, so you can update your profile during a layover or before a deadline.",
  },
  {
    question: "How many headshots do I get?",
    answer: "Each package delivers multiple variations across backgrounds and styles, giving you options for applications, social profiles, and company pages.",
  },
];

export default function PilotsIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name={"Professional Headshots for Pilots & Aviation Professionals"}
        description={"AI-generated professional headshots for pilots and aviation professionals for airline applications, crew profiles, LinkedIn, and flight school websites."}
        price={990}
        category="Professional Services"
        slug="industries/pilots"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Industries', url: `${siteConfig.url}/industries` },
          { name: "Pilots & Aviation", url: `${siteConfig.url}/industries/pilots` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Plane className="h-4 w-4" />
              For Pilots &amp; Aviation Professionals
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Pilots &amp; Aviation</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              First impressions matter at 35,000 feet and on the ground. Get a sharp, confident headshot for airline applications, charter company pages, flight school bios, and LinkedIn, without coordinating a photographer around your flight schedule.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Pilot Headshot
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
            Uniform &amp; Business Looks
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
            Money-Back Guarantee
          </span>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
              Look the Part Before You Reach the Cockpit
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you portraits for applications, crew profiles, and every professional platform.</p>
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
            <p className="mt-4 text-lg text-tp-muted">Headshots for pilots and aviation professionals at every stage of their careers.</p>
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
            Take Your Career to New Heights
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get a headshot that helps you stand out to airlines, clients, and students.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Pilot Headshot
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
