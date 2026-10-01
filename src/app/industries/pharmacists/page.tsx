import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, Briefcase, Check, Clock, Globe, GraduationCap, Sparkles, Star, Upload, UserCheck, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const pageTitle = "AI Headshots for Pharmacists | TailorPic";
const pageDescription =
  "Professional AI headshots for retail, hospital, clinical, and independent pharmacists. Build patient trust on your pharmacy website, LinkedIn, and professional profiles with a polished portrait delivered in about 2 hours.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/pharmacists' },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}/industries/pharmacists`,
  },
};

const benefits = [
  {
    icon: UserCheck,
    title: "Build Patient Confidence",
    description: "Patients rely on pharmacists for advice on their health. A warm, credible headshot helps them feel comfortable asking questions and returning to your pharmacy.",
  },
  {
    icon: Globe,
    title: "Pharmacy Website & Directory Ready",
    description: "High-resolution portraits sized for your team page, store locator, and online directories so your staff looks consistent everywhere.",
  },
  {
    icon: Briefcase,
    title: "Polished LinkedIn Presence",
    description: "Stand out to recruiters, hospital systems, and industry peers with a professional profile photo that reflects your clinical expertise.",
  },
  {
    icon: Award,
    title: "Show Your Professional Credentials",
    description: "Pair a confident portrait with your PharmD and certifications on conference bios, publications, and speaker pages.",
  },
  {
    icon: Users,
    title: "Consistent Team Imagery",
    description: "Give your entire pharmacy team matching backgrounds and styling without coordinating schedules around a photographer.",
  },
  {
    icon: Clock,
    title: "Skip the Scheduling Hassle",
    description: "Pharmacy hours are long and unpredictable. Get professional results from home on your own timeline, with no studio visit needed.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload 6-10 Selfies",
    description: "Take clear, well-lit photos of yourself. Vary your angles and expressions so the AI captures your natural, approachable look.",
  },
  {
    icon: Sparkles,
    title: "Choose Your Style",
    description: "Pick backgrounds and looks that suit your practice, from a clean clinical setting to a polished corporate portrait.",
  },
  {
    icon: Check,
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots in about 2 hours, ready for your pharmacy website, directories, and social profiles.",
  },
];

const audiences = [
  {
    icon: UserCheck,
    title: "Retail & Community Pharmacists",
    description: "Put a friendly, trusted face on your store's website and local listings.",
  },
  {
    icon: Briefcase,
    title: "Hospital & Clinical Pharmacists",
    description: "Present a professional image on hospital directories and care-team pages.",
  },
  {
    icon: Award,
    title: "Pharmacy Owners",
    description: "Build a consistent brand across your website, marketing, and staff profiles.",
  },
  {
    icon: GraduationCap,
    title: "Residents & Students",
    description: "Make a strong first impression on residency applications and LinkedIn.",
  },
];

const faqs = [
  {
    question: "Will my headshot look approachable as well as professional?",
    answer: "Yes. You can choose styles that balance warmth and authority, which is ideal for pharmacists who need patients to feel comfortable asking questions.",
  },
  {
    question: "Can I use the headshot on my pharmacy website and directories?",
    answer: "Yes. You receive full commercial rights, so you can use your headshots on websites, online directories, LinkedIn, publications, and promotional materials.",
  },
  {
    question: "What should I wear in my selfies?",
    answer: "Wear what you would wear to work. A white coat or professional attire in a solid color works well, and the AI adapts attire to the style you choose.",
  },
  {
    question: "Can my whole pharmacy team use TailorPic?",
    answer: "Yes. Each team member can create their own headshots using consistent styles and backgrounds so your staff page looks cohesive.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most headshots are ready in about 2 hours, so you can update your website or profile the same day.",
  },
  {
    question: "How many headshots do I get?",
    answer: "Each package delivers multiple variations across backgrounds and styles, giving you options for different platforms and uses.",
  },
];

export default function PharmacistsIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name={"Professional Headshots for Pharmacists"}
        description={"AI-generated professional headshots for pharmacists for pharmacy websites, LinkedIn, clinical profiles, and professional directories."}
        price={990}
        category="Professional Services"
        slug="industries/pharmacists"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Industries', url: `${siteConfig.url}/industries` },
          { name: "Pharmacists", url: `${siteConfig.url}/industries/pharmacists` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <UserCheck className="h-4 w-4" />
              For Pharmacists
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Pharmacists</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Patients trust the pharmacist they recognize. Get a polished, approachable headshot for your pharmacy website, professional licensing profiles, and LinkedIn, without booking a photo shoot.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Pharmacist Headshot
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
            Clinical-Ready Backgrounds
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
              A Trusted Face Behind the Counter
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you portraits for your pharmacy site, professional profiles, and every social platform.</p>
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
            <p className="mt-4 text-lg text-tp-muted">Headshots for pharmacists across every practice setting.</p>
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
            Put a Trusted Face on Your Practice
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get a headshot that helps patients and colleagues feel confident in your care.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Pharmacist Headshot
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
