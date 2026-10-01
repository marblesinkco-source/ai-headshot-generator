import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Briefcase,
  Check,
  Clock,
  FileText,
  Globe,
  GraduationCap,
  Shield,
  Sparkles,
  Star,
  Target,
  Upload,
  UserCheck,
} from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const pageTitle = "AI Headshots for Resumes & CVs | Professional Job Photos | TailorPic";
const pageDescription =
  "Create a professional resume and CV photo from a few selfies. AI headshots tailored for job applications, portfolios, and LinkedIn, delivered in about 2 hours. Starting at $9.90.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: 'https://www.tailorpic.com/use-cases/resume' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/use-cases/resume', type: 'usecase' }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'usecase' }),
};

const benefits = [
  {
    icon: UserCheck,
    title: "Make a Confident First Impression",
    description: "Recruiters spend seconds on each application. A polished photo helps you look capable and professional right away, where a photo is expected.",
  },
  {
    icon: Globe,
    title: "Built for International CVs",
    description: "In many regions, including much of Europe, Asia, and the Middle East, a CV photo is standard. Get photos that meet those professional expectations.",
  },
  {
    icon: Briefcase,
    title: "Industry-Appropriate Attire",
    description: "Choose suit and tie, blazer, smart casual, or creative looks so your photo fits finance, tech, healthcare, or design roles.",
  },
  {
    icon: Target,
    title: "Passport-Style Framing Options",
    description: "Get clean, front-facing compositions with neutral backgrounds that suit the tidy layout of a resume or application form.",
  },
  {
    icon: FileText,
    title: "Consistent Across Your Job Search",
    description: "Use one headshot on your resume, LinkedIn, portfolio site, and job boards so employers see a unified candidate.",
  },
  {
    icon: Shield,
    title: "Yours to Keep and Reuse",
    description: "You own every photo with no watermarks, so you can use them on every application without restrictions.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload 6-10 Selfies",
    description: "Use clear, front-facing phone photos in soft daylight. A few with a subtle smile and a few neutral give you variety.",
  },
  {
    icon: Sparkles,
    title: "Pick Your Professional Look",
    description: "Select attire, background color, and expression that match the roles and countries you are applying to.",
  },
  {
    icon: Check,
    title: "Download and Attach",
    description: "Receive your high-resolution headshots in about 2 hours and drop your favorite into your resume template.",
  },
];

const features = [
  {
    icon: GraduationCap,
    title: "Students & Recent Graduates",
    description: "Look ready for your first role without paying for a studio session on a student budget.",
  },
  {
    icon: Briefcase,
    title: "Career Changers",
    description: "Refresh your professional image to match the new direction you are moving in.",
  },
  {
    icon: Globe,
    title: "Applicants Abroad",
    description: "Meet CV photo norms when applying to companies in countries where photos are expected.",
  },
  {
    icon: Clock,
    title: "Urgent Job Seekers",
    description: "Need a photo before a deadline? Get professional results in about 2 hours instead of waiting days for an appointment.",
  },
];

const faqs = [
  {
    question: "Should I put a photo on my resume?",
    answer: "It depends on where you apply. In the United States and UK, photos are usually left off to reduce bias. In Germany, France, Spain, much of Asia, and the Middle East, a professional photo is common or expected. Check the norms for your target market.",
  },
  {
    question: "What makes a good resume photo?",
    answer: "A clear, front-facing shot with good lighting, a plain background, professional attire, and a natural, approachable expression. Your head and shoulders should fill most of the frame.",
  },
  {
    question: "Can I choose what I wear in the photo?",
    answer: "Yes. Choose from suits, blazers, shirts, and smart casual styles to match your industry, without owning the outfits.",
  },
  {
    question: "Will employers know it was made with AI?",
    answer: "TailorPic results look like a professional studio photo of you. They preserve your real features, so you still look like yourself when you meet recruiters in person or on video.",
  },
  {
    question: "Can I also use it for LinkedIn and job boards?",
    answer: "Absolutely. You own the photos, so use the same headshot on your resume, LinkedIn profile, portfolio, and job platforms for a consistent brand.",
  },
  {
    question: "How much does it cost and how fast is it?",
    answer: "Packs start at $9.90 and most orders are delivered in about 2 hours, well under the cost and wait of a traditional photographer.",
  },
];

export default function ResumeUseCasePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name="AI Headshots for Resumes & CVs"
        description="AI-generated professional headshots for resumes, CVs, job applications, and portfolios."
        price={990}
        category="Professional Services"
        slug="use-cases/resume"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Use Cases', url: `${siteConfig.url}/use-cases` },
          { name: 'Resume & CV', url: `${siteConfig.url}/use-cases/resume` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <FileText className="h-4 w-4" />
              Resume & CV Photos
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              AI Headshots for{' '}
              <span className="not-italic text-tp-bronze">Resumes &amp; CVs</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Land the interview with a photo that says hire me. Turn a few selfies into a professional CV headshot, no studio or appointment needed. Delivered in about 2 hours, starting at just $9.90.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Resume Headshot
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
            Recruiter-Ready Quality
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
              Why a Professional CV Photo Matters
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Give your application a human, credible face.</p>
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
            <p className="mt-4 text-lg text-tp-muted">From selfie to resume-ready headshot in three steps.</p>
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
              Who Uses TailorPic for Resumes
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Professional photos for every stage of your career.</p>
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
            Get Hired Looking Your Best
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Put a professional face on your next application. Starting at just $9.90.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Resume Headshot
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
