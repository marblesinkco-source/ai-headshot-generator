import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Camera, Check, Code2, Globe, GraduationCap, Shield, Sparkles, Upload, UserCheck, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs } from '@/components/marketing/breadcrumbs';
import { FAQSchema, ProductSchema, BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { FAQAccordion } from '@/components/marketing/faq-accordion';

const pageTitle = "AI Profile Photos for GitHub | Developer Avatars | TailorPic";
const pageDescription =
  `Professional avatars for GitHub profiles, developer portfolios and open-source contributors. Stand out to recruiters and maintainers. From ${BASE_PRICE_DISPLAY}.`;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/use-cases/github' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/use-cases/github', type: 'usecase' }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'usecase' }),
};


const benefits = [
  {
    icon: UserCheck,
    title: "A Face Behind the Commits",
    description: "Maintainers and teammates remember people, not usernames. A real photo makes your pull requests and comments feel more personal.",
  },
  {
    icon: Briefcase,
    title: "Impress Recruiters",
    description: "Recruiters and hiring managers often review GitHub before an interview. A polished avatar signals that you care about how you present yourself.",
  },
  {
    icon: Camera,
    title: "Crisp at Tiny Sizes",
    description: "Your avatar shows up at 20 pixels next to a commit. Photos are framed tight so your face stays readable at every size.",
  },
  {
    icon: Globe,
    title: "Match Your Whole Dev Identity",
    description: "Use the same photo on your portfolio, LinkedIn, Stack Overflow, X, and conference speaker pages for a consistent brand.",
  },
  {
    icon: Shield,
    title: "Your Photos, Your Rights",
    description: "You own every image with no watermarks, so they are safe for open-source project pages and personal sites.",
  },
  {
    icon: Sparkles,
    title: "No Photoshoot Needed",
    description: "Skip the awkward photo session. Generate a natural, friendly headshot from selfies you take at your desk.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload a Few Selfies",
    description: "Share 6-10 clear phone photos with different expressions and angles. Natural light is best.",
  },
  {
    icon: Code2,
    title: "Pick a Developer-Friendly Style",
    description: "Choose casual, smart-casual, or conference-speaker looks with a clean, simple background.",
  },
  {
    icon: Check,
    title: "Download and Update Your Avatar",
    description: "Get your high-resolution photos within hours, then upload your favorite in GitHub settings.",
  },
];

const features = [
  {
    icon: Code2,
    title: "Job-Seeking Developers",
    description: "Make your profile look as strong as your code when recruiters and hiring managers come looking.",
  },
  {
    icon: Users,
    title: "Open-Source Maintainers",
    description: "Look approachable and credible to the contributors who file issues and open pull requests.",
  },
  {
    icon: Briefcase,
    title: "Freelance Developers",
    description: "Build trust with clients who check your GitHub before they hire you.",
  },
  {
    icon: GraduationCap,
    title: "Students & Bootcamp Grads",
    description: "Stand out in a crowded field with a professional first impression.",
  },
];

const faqs = [
  {
    question: "Do I need a real photo on GitHub?",
    answer: "No, but a clear photo helps people recognize you across issues, pull requests, and discussions. Many recruiters and maintainers also view profiles with real photos as more trustworthy.",
  },
  {
    question: "Will it look good at small sizes?",
    answer: "Yes. Photos are framed with your face large and centered, so your avatar stays recognizable even at the tiny sizes GitHub uses next to comments and commits.",
  },
  {
    question: "Will the photo look like me?",
    answer: "Yes. TailorPic is trained on your own selfies, so results keep your real features and natural expression.",
  },
  {
    question: "Can I use it on my portfolio and LinkedIn as well?",
    answer: "Absolutely. You own full rights to your photos and can use them on GitHub, your portfolio site, LinkedIn, conference pages, and anywhere else.",
  },
  {
    question: "How much does it cost?",
    answer: `TailorPic starts at ${BASE_PRICE_DISPLAY} per pack, far less than a photographer session.`,
  },
  {
    question: "How long does delivery take?",
    answer: "Most orders arrive within hours after you upload your selfies, so you can update your avatar the same day.",
  },
];

export default function GithubUseCasePage() {
  return (
    <>
      <ProductSchema
        name="TailorPic"
        description="Professional avatars for GitHub profiles, dev portfolios and open-source contributors"
        price={199}
        category="Professional Services"
        slug="use-cases/github"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
          items={[
            { name: 'Home', url: siteConfig.url },
            { name: 'Use Cases', url: `${siteConfig.url}/use-cases` },
            { name: 'GitHub', url: `${siteConfig.url}/use-cases/github` },
          ]}
        />
      <Header />
      <main id="main-content">
      <div className="bg-tp-paper pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Use Cases', href: '/use-cases' }, { label: 'GitHub' }]} currentPath="/use-cases/github" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Code2 className="h-4 w-4" />
              GitHub Profile Photos
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              AI Profile Photos for{' '}
              <span className="not-italic text-tp-bronze">GitHub</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Your avatar appears on every commit, pull request, and issue comment. Replace the default identicon with a clear, professional photo made from a few selfies. Delivered within hours, starting at just {BASE_PRICE_DISPLAY}.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your GitHub Avatar
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
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-tp-line bg-tp-paper py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm text-tp-muted sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Sharp at Avatar Sizes
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Delivered Within Hours
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Starting at {BASE_PRICE_DISPLAY}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Quality Commitment
          </span>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              Why Your GitHub Avatar Matters
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Put a face to your code and make your contributions memorable.</p>
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
            <p className="mt-4 text-lg text-tp-muted">From selfie to new GitHub avatar in three steps.</p>
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
              Who Uses TailorPic for GitHub
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Great avatars for everyone who builds in the open.</p>
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
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
            Give Your Code a Face
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Make every commit and pull request feel more personal. Starting at just {BASE_PRICE_DISPLAY}.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your GitHub Avatar
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

      </main>
      <Footer />
    </>
  );
}
