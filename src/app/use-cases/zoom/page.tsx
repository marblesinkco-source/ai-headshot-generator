import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Check, Clock, Globe, GraduationCap, Shield, Sparkles, Star, Upload, UserCheck, Users, Video } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const pageTitle = "AI Headshots for Zoom & Video Calls | TailorPic";
const pageDescription =
  "Professional profile photos for Zoom, Microsoft Teams and Google Meet. Look sharp when your camera is off, from a few selfies. Delivered in about 2 hours. Starting at $9.90.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: 'https://www.tailorpic.com/use-cases/zoom' },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: 'https://www.tailorpic.com/use-cases/zoom',
  },
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: "AI Headshots for Zoom & Video Calls",
  description: "Professional profile photos for Zoom, Teams and Google Meet",
  url: 'https://www.tailorpic.com/use-cases/zoom',
  brand: { '@type': 'Brand', name: 'TailorPic' },
  category: 'Professional Services',
  offers: {
    '@type': 'Offer',
    price: '9.90',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://www.tailorpic.com/use-cases/zoom',
  },
};

const benefits = [
  {
    icon: UserCheck,
    title: "Look Professional with Camera Off",
    description: "Cameras off is the norm in many meetings. A polished profile photo keeps you looking present, prepared, and credible to clients and colleagues.",
  },
  {
    icon: Video,
    title: "Sized for Small Video Tiles",
    description: "Photos are framed with your face large and centered so you stay recognizable in tiny gallery tiles and meeting participant lists.",
  },
  {
    icon: Globe,
    title: "One Photo, Every Platform",
    description: "Use the same headshot on Zoom, Microsoft Teams, Google Meet, Slack, and your email signature for a consistent identity.",
  },
  {
    icon: Sparkles,
    title: "No Lighting or Webcam Worries",
    description: "Skip the ring light and the better webcam. Your headshot is generated from selfies, so it looks great regardless of your home office setup.",
  },
  {
    icon: Shield,
    title: "Your Photos, Your Rights",
    description: "You own every image with no watermarks. Upload to any meeting tool and reuse the photos wherever you like.",
  },
  {
    icon: Clock,
    title: "Ready Before Your Next Meeting",
    description: "Upload selfies now and have your new profile photo in about 2 hours, in time for tomorrow morning stand-up.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload a Few Selfies",
    description: "Share 6-10 clear phone photos with different expressions and angles. Natural daylight works best.",
  },
  {
    icon: Users,
    title: "Choose a Meeting-Ready Style",
    description: "Pick a business, business-casual, or friendly look and a clean background that suits your industry.",
  },
  {
    icon: Check,
    title: "Download and Set Your Photo",
    description: "Get your high-resolution photos in about 2 hours, then add your favorite to Zoom, Teams, and Meet in seconds.",
  },
];

const features = [
  {
    icon: Briefcase,
    title: "Remote Workers",
    description: "Show up as polished as your in-office colleagues, even on days when your camera stays off.",
  },
  {
    icon: Users,
    title: "Consultants & Coaches",
    description: "Make a strong first impression on client calls before you even say hello.",
  },
  {
    icon: Video,
    title: "Webinar Hosts & Speakers",
    description: "Give attendees a professional face to connect with in registration pages and speaker lists.",
  },
  {
    icon: GraduationCap,
    title: "Students & Job Seekers",
    description: "Look ready for virtual interviews, online classes, and networking calls.",
  },
];

const faqs = [
  {
    question: "Why does my Zoom profile photo matter?",
    answer: "Whenever your camera is off, Zoom shows your profile photo instead of video. It is also displayed in chat, participant lists, and calendar invites, so it shapes how colleagues and clients see you.",
  },
  {
    question: "Will the photo look like me?",
    answer: "Yes. TailorPic is trained on your own selfies, so results keep your real features and natural expression.",
  },
  {
    question: "Can I use it on Microsoft Teams and Google Meet too?",
    answer: "Absolutely. You receive high-resolution files that work on Zoom, Teams, Google Meet, Webex, Slack, and any other platform that accepts a profile picture.",
  },
  {
    question: "Do I need a special background?",
    answer: "No. You can choose a clean studio-style background during setup, so you do not need to tidy your room or use a virtual background.",
  },
  {
    question: "How much does it cost?",
    answer: "TailorPic starts at $9.90 per pack, far less than a photographer session, and you never need to leave your desk.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most orders arrive in about 2 hours after you upload your selfies, so you can update your profile the same day.",
  },
];

export default function ZoomUseCasePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Use Cases', url: `${siteConfig.url}/use-cases` },
          { name: "Zoom", url: `${siteConfig.url}/use-cases/zoom` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Video className="h-4 w-4" />
              Zoom & Video Call Photos
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              AI Headshots for{' '}
              <span className="not-italic text-tp-bronze">Zoom &amp; Video Calls</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              When your camera is off, your profile photo is your whole presence. Get a crisp, professional headshot for Zoom, Teams, and Google Meet from a handful of selfies. Delivered in about 2 hours, starting at just $9.90.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Video Call Headshot
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
            Works on Zoom, Teams &amp; Meet
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
            <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
              Why Your Video Call Photo Matters
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Every meeting starts with a thumbnail. Make it a good one.</p>
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
            <p className="mt-4 text-lg text-tp-muted">From selfie to new Zoom profile photo in three steps.</p>
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
              Who Uses TailorPic for Video Calls
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Great photos for everyone who spends their day on meetings.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item) => {
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
            Look Your Best, Even with the Camera Off
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Make every meeting start with a confident first impression. Starting at just $9.90.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Video Call Headshot
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
