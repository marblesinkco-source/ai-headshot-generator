import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Check, Clock, Eye, Mail, MessageCircle, Monitor, Shield, Sparkles, Upload, UserCheck, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs } from '@/components/marketing/breadcrumbs';
import { FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const pageTitle = 'AI Headshots for Email Signatures | TailorPic';
const pageDescription =
  'Add a face to every email you send. AI-generated professional headshots sized for Gmail, Outlook, and Apple Mail signatures. Starting at $1.99.';

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/use-cases/email-signature' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/use-cases/email-signature', type: 'usecase' }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'usecase' }),
};

const benefits = [
  {
    icon: UserCheck,
    title: "Put a Face to the Name",
    description: "A headshot in your signature turns a faceless message into a personal one, helping recipients remember and trust you.",
  },
  {
    icon: Mail,
    title: "Works in Every Email Client",
    description: "Photos are delivered in sizes and formats that work in Gmail, Outlook, Apple Mail, and Thunderbird without looking pixelated.",
  },
  {
    icon: Eye,
    title: "Sharp at Small Sizes",
    description: "Signature photos are tiny. Ours use tight framing and clear lighting so your face stays recognizable even at 100 pixels wide.",
  },
  {
    icon: Briefcase,
    title: "Consistent Brand Presence",
    description: "Match one headshot across your signature, LinkedIn, website, and company directory for a cohesive professional identity.",
  },
  {
    icon: MessageCircle,
    title: "Warmer Cold Outreach",
    description: "Sales, recruiting, and partnership emails feel less like spam when there is a real, friendly person behind them.",
  },
  {
    icon: Shield,
    title: "You Own Every Photo",
    description: "No watermarks and no licensing fees. Use your headshots in signatures, newsletters, and proposals as you wish.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload a Few Selfies",
    description: "Take 6-10 clear photos with your phone in natural light. Face the camera and keep a relaxed, friendly expression.",
  },
  {
    icon: Sparkles,
    title: "Choose a Professional Style",
    description: "Pick a clean backdrop and attire that suits your industry, from corporate neutrals to creative colors.",
  },
  {
    icon: Mail,
    title: "Download and Add to Your Signature",
    description: "Get your headshots within hours, resize as needed, and upload to your email client's signature settings.",
  },
];

const features = [
  {
    icon: Briefcase,
    title: "Sales & Business Development",
    description: "Build rapport before the first call by showing prospects who they are talking to.",
  },
  {
    icon: Users,
    title: "Recruiters & HR Teams",
    description: "Make candidate outreach more human and increase reply rates with a friendly face.",
  },
  {
    icon: Monitor,
    title: "Remote & Distributed Teams",
    description: "Give every teammate a consistent, professional headshot without coordinating photographers across time zones.",
  },
  {
    icon: Clock,
    title: "Freelancers & Consultants",
    description: "Look established and credible to clients from the very first email you send.",
  },
];

const faqs = [
  {
    question: "What size should an email signature headshot be?",
    answer: "Most signatures display photos between 80 and 150 pixels wide. We deliver high-resolution images you can downsize to about 300 x 300 pixels so they stay crisp on high-density screens.",
  },
  {
    question: "Which background works best for a signature photo?",
    answer: "Simple, uncluttered backgrounds read best at small sizes. Soft gray, neutral, or a subtle brand color keep the focus on your face.",
  },
  {
    question: "Will it work with Gmail and Outlook?",
    answer: "Yes. The images are standard JPG or PNG files that you can upload or link in any email client's signature editor, including Gmail, Outlook, Apple Mail, and Thunderbird.",
  },
  {
    question: "Can my whole team get matching headshots?",
    answer: "Yes. Each team member uploads their own selfies and picks the same style and background, giving your company a consistent look with no photographer scheduling.",
  },
  {
    question: "Do headshots in signatures really help?",
    answer: "A recognizable photo helps recipients associate your name with a person, which supports trust and recall, especially in sales, recruiting, and client-facing roles.",
  },
  {
    question: "How much does it cost and how fast is delivery?",
    answer: "TailorPic starts at $1.99 and most orders are delivered within hours, so your signature can be updated today.",
  },
];

export default function EmailSignatureUseCasePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name="AI Headshots for Email Signatures"
        description="AI-generated professional headshots sized and styled for email signatures in Gmail, Outlook, and more."
        price={990}
        category="Professional Services"
        slug="use-cases/email-signature"
      />
      <FAQSchema items={faqs} />
      <Header />
      <div className="bg-tp-paper pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Use Cases', href: '/use-cases' }, { label: 'Email Signature' }]} currentPath="/use-cases/email-signature" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Mail className="h-4 w-4" />
              Email Signature Headshots
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              AI Headshots for{' '}
              <span className="not-italic text-tp-bronze">Email Signatures</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Every email you send is a first impression. Add a polished, approachable headshot to your signature, created from a few selfies and ready within hours. Starting at just $1.99.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Signature Headshot
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
              ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-tp-line bg-tp-paper py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm text-tp-muted sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Gmail & Outlook Ready
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Delivered Within Hours
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Starting at $1.99
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
              Why a Signature Headshot Works
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Small photo, big impact on every message you send.</p>
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
            <p className="mt-4 text-lg text-tp-muted">From selfie to signature-ready headshot in three steps.</p>
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
              Who Uses TailorPic for Email Signatures
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Anyone whose inbox is their front door.</p>
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
            Make Every Email More Personal
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Upgrade your signature with a headshot that builds trust in every inbox. Starting at just $1.99.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Signature Headshot
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
