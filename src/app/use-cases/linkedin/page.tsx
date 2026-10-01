import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Check, Eye, Globe, Handshake, Linkedin, Shield, Sparkles, Star, Target, Upload, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const pageTitle = "AI Headshots for LinkedIn | Professional Profile Photos | TailorPic";
const pageDescription =
  "Get a polished LinkedIn headshot from a few selfies. AI-generated professional profile photos that help you stand out to recruiters and clients, delivered in about 2 hours. Starting at $9.90.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/use-cases/linkedin' },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}/use-cases/linkedin`,
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: [siteConfig.ogImage],
  },
};

const benefits = [
  {
    icon: Eye,
    title: "Make a Strong First Impression",
    description: "A professional photo is one of the first things people notice on your LinkedIn profile. A polished headshot signals credibility before you say a word.",
  },
  {
    icon: Target,
    title: "Optimized for the LinkedIn Crop",
    description: "Every headshot is framed for LinkedIn's circular thumbnail, so your face stays centered and visible on desktop and mobile.",
  },
  {
    icon: Briefcase,
    title: "Multiple Professional Styles",
    description: "Choose from business formal, smart casual, or creative looks. Get several options in one order so you can A/B test your profile photo.",
  },
  {
    icon: Globe,
    title: "Neutral, Distraction-Free Backgrounds",
    description: "Clean studio-style backgrounds keep the focus on you, matching the expectations recruiters and hiring managers have for professional profiles.",
  },
  {
    icon: Shield,
    title: "Your Photos, Your Rights",
    description: "You own full commercial rights to every headshot. Use them on LinkedIn, your resume, company bios, and anywhere else you need a professional image.",
  },
  {
    icon: Handshake,
    title: "Approachable and Confident",
    description: "Our AI captures natural expressions that look warm and competent, the exact combination that builds trust with connections and clients.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload 6-10 Selfies",
    description: "Take clear photos in good lighting with your phone. Vary your angle slightly between shots. Casual clothes are fine.",
  },
  {
    icon: Sparkles,
    title: "Pick Your Look",
    description: "Select a professional style, background, and attire. Business suit, blazer, or smart casual, whatever fits your industry.",
  },
  {
    icon: Check,
    title: "Download and Update Your Profile",
    description: "Receive polished, high-resolution headshots in about 2 hours. Upload your favorite to LinkedIn and watch profile views climb.",
  },
];

const features = [
  {
    icon: Linkedin,
    title: "Job Seekers",
    description: "Stand out in recruiter searches with a photo that looks confident, current, and polished.",
  },
  {
    icon: Users,
    title: "Freelancers & Consultants",
    description: "Build trust with prospective clients before the first meeting with a credible, professional image.",
  },
  {
    icon: Briefcase,
    title: "Executives & Managers",
    description: "Project leadership and approachability in a headshot that fits boardroom bios and conference programs.",
  },
  {
    icon: Globe,
    title: "Remote Workers",
    description: "Look polished for video calls, Slack, and LinkedIn without booking a studio in your home office.",
  },
];

const faqs = [
  {
    question: "Why does my LinkedIn photo matter?",
    answer: "LinkedIn data shows profiles with professional photos receive significantly more views, connection requests, and messages. Your headshot is the first thing recruiters and clients notice, so a polished image immediately builds credibility.",
  },
  {
    question: "What should I wear for my LinkedIn headshot?",
    answer: "You do not need to dress up for your selfies. TailorPic lets you choose your final attire digitally, from a tailored suit to a smart casual blazer, regardless of what you wore when you took the photos.",
  },
  {
    question: "How much does a LinkedIn headshot cost?",
    answer: "TailorPic starts at $9.90 per pack, a fraction of what a traditional studio session costs. You receive multiple high-resolution headshots you can use across LinkedIn, your resume, and other professional profiles.",
  },
  {
    question: "Can I get multiple styles in one order?",
    answer: "Yes. Each order includes several headshot variations with different backgrounds and attire options, so you can test which photo performs best on your profile.",
  },
  {
    question: "How long until I receive my headshots?",
    answer: "Most LinkedIn headshots are delivered in about 2 hours. Upload your selfies during a coffee break and update your profile the same afternoon.",
  },
];

export default function LinkedInUseCasePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name="AI Headshots for LinkedIn"
        description="AI-generated professional headshots optimized for LinkedIn profiles, job applications, and professional networking."
        price={990}
        category="Professional Services"
        slug="use-cases/linkedin"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Use Cases', url: `${siteConfig.url}/use-cases` },
          { name: 'LinkedIn', url: `${siteConfig.url}/use-cases/linkedin` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Linkedin className="h-4 w-4" />
              LinkedIn Profile Photos
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              AI Headshots for{' '}
              <span className="not-italic text-tp-bronze">LinkedIn</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Your LinkedIn photo is your digital handshake. Get a polished, professional headshot from a few phone selfies, no studio appointment needed. Delivered in about 2 hours, starting at just $9.90.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your LinkedIn Headshot
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
            Optimized for LinkedIn
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Delivered in About 2 Hours
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Starting at $9.90
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
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              Why Your LinkedIn Photo Matters
            </h2>
            <p className="mt-4 text-lg text-tp-muted">A professional headshot is the single easiest upgrade you can make to your LinkedIn presence.</p>
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
            <p className="mt-4 text-lg text-tp-muted">From selfie to polished LinkedIn headshot in three steps.</p>
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
              Who Uses TailorPic for LinkedIn
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Professional headshots for every career stage.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item) => {
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
            Upgrade Your LinkedIn Profile Today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Boost your LinkedIn presence with a studio-quality AI headshot. Starting at just $9.90.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your LinkedIn Headshot
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
