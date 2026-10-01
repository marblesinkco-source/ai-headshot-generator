import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, Briefcase, Check, FileCheck, Globe, Shield, Sparkles, Star, Target, Upload, UserCheck, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const pageTitle = "AI Headshots for Security Guards & Officers | TailorPic";
const pageDescription =
  "Professional AI headshots for security guards, officers, and security company owners. Get a credible portrait for ID profiles, resumes, and LinkedIn delivered in about 2 hours.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/security-guards' },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}/industries/security-guards`,
  },
};

const benefits = [
  {
    icon: Shield,
    title: "Project Reliability and Authority",
    description: "Trust is the core of your job. A composed, professional portrait shows employers and clients you are dependable.",
  },
  {
    icon: FileCheck,
    title: "Resume & Job Applications",
    description: "Security firms and in-house teams review many applicants. A clean headshot helps your application stand out.",
  },
  {
    icon: Briefcase,
    title: "LinkedIn & Professional Networks",
    description: "Build a credible online presence for career moves into supervision, management, or consulting.",
  },
  {
    icon: Award,
    title: "Advance Into Leadership",
    description: "Supervisors and security directors need a polished image for team pages, proposals, and client introductions.",
  },
  {
    icon: Users,
    title: "Consistent Company Team Pages",
    description: "Security firm owners can give every officer a matching headshot style for websites and client materials.",
  },
  {
    icon: Globe,
    title: "Skip the Photo Shoot",
    description: "Shift work makes scheduling hard. Get a professional result from home on your own time.",
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
    description: "Pick backgrounds and looks that fit your role, from classic corporate to clean neutral studio.",
  },
  {
    icon: Check,
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots in about 2 hours, ready for your resume, LinkedIn, and company profiles.",
  },
];

const audiences = [
  {
    icon: Shield,
    title: "Security Guards & Officers",
    description: "Bring a dependable, professional look to applications and company profiles.",
  },
  {
    icon: Users,
    title: "Security Supervisors",
    description: "Present yourself as a leader on team pages and internal directories.",
  },
  {
    icon: Briefcase,
    title: "Security Company Owners",
    description: "Give your firm and team a credible face for websites and proposals.",
  },
  {
    icon: UserCheck,
    title: "Close Protection & Consultants",
    description: "Keep a polished portrait ready for client introductions and bios.",
  },
];

const faqs = [
  {
    question: "Will the headshot look professional and trustworthy?",
    answer: "Yes. You can choose styles that convey composure and reliability, which suits security roles where trust matters most.",
  },
  {
    question: "Can I use it on my resume and LinkedIn?",
    answer: "Yes. You receive full commercial rights for resumes, LinkedIn, company websites, and print materials.",
  },
  {
    question: "Can I use it for an official ID or license badge?",
    answer: "Headshots are great for profiles and resumes, but official IDs and licenses have strict photo rules set by the issuer, so always check their requirements first.",
  },
  {
    question: "What should I wear in my selfies?",
    answer: "Wear your uniform or business attire. Solid colors usually work best, and the AI adapts attire to your chosen style.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most headshots are ready in about 2 hours, so you can update your profiles the same day.",
  },
  {
    question: "How many headshots do I get?",
    answer: "Each package delivers multiple variations across backgrounds and styles, giving you options for every platform.",
  },
];

export default function SecurityGuardsIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name={"Professional Headshots for Security Guards"}
        description={"AI-generated professional headshots for security guards and officers for resumes, LinkedIn, and company profiles."}
        price={990}
        category="Professional Services"
        slug="industries/security-guards"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Industries', url: `${siteConfig.url}/industries` },
          { name: "Security Professionals", url: `${siteConfig.url}/industries/security-guards` },
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
              For Security Professionals
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Security Professionals</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Employers and clients trust security professionals who look reliable and alert. Get a polished, credible headshot for your resume, LinkedIn, and company profiles without arranging a photographer.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Security Headshot
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
            Resume & Profile Ready
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
              Look as Reliable as You Are
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you portraits for applications, company profiles, and professional networks.</p>
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
            <p className="mt-4 text-lg text-tp-muted">Headshots for every kind of security professional.</p>
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
            Show Employers the Professional You Are
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get a headshot that earns trust and helps you move your career forward.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Security Headshot
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
