import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  Check,
  Clock,
  Layout,
  Mic,
  Newspaper,
  Palette,
  PenLine,
  Shield,
  Sparkles,
  Upload,
} from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs } from '@/components/marketing/breadcrumbs';
import { FAQSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

const pageTitle = "AI Author Photos for Book Covers | TailorPic";
const pageDescription =
  `Professional author photos for book jackets, Amazon author pages and your website. Get polished portraits from a few selfies. Starting at ${BASE_PRICE_DISPLAY}.`;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/use-cases/book-cover' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/use-cases/book-cover', type: 'usecase' }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'usecase' }),
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: "AI Author Photos for Book Covers",
  description: "Professional author portraits for book jackets, author pages and press",
  url: 'https://www.tailorpic.com/use-cases/book-cover',
  brand: { '@type': 'Brand', name: 'TailorPic' },
  category: 'Professional Services',
  offers: {
    '@type': 'Offer',
    price: '1.99',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://www.tailorpic.com/use-cases/book-cover',
  },
};

const benefits = [
  {
    icon: BookOpen,
    title: "Build Reader Trust",
    description: "A confident, approachable photo helps readers connect with you as an author.",
  },
  {
    icon: Layout,
    title: "Composed for Book Jackets",
    description: "Photos are framed so they crop cleanly for back covers, flaps and author pages.",
  },
  {
    icon: Palette,
    title: "Looks That Fit Your Genre",
    description: "Choose a warm, literary, bold or professional style to match your books.",
  },
  {
    icon: Sparkles,
    title: "No Studio Shoot Needed",
    description: "Skip the photographer. Your portrait is generated from selfies.",
  },
  {
    icon: Shield,
    title: "Your Photos, Your Rights",
    description: "You own every image with no watermarks. Reuse them on jackets, websites and press.",
  },
  {
    icon: Clock,
    title: "Ready for Launch Day",
    description: "Upload selfies today and have your portrait within hours.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload a Few Selfies",
    description: "Share 6-10 clear phone photos with different expressions and angles. Natural daylight works best.",
  },
  {
    icon: PenLine,
    title: "Choose an Author Style",
    description: "Pick a warm, literary or professional look and a background that suits your genre.",
  },
  {
    icon: Check,
    title: "Download and Add to Your Materials",
    description: "Get high-resolution photos within hours for jackets, author pages and press kits.",
  },
];

const features = [
  {
    icon: PenLine,
    title: "Self-Published Authors",
    description: "Give your book a polished, professional author presence.",
  },
  {
    icon: BookOpen,
    title: "Traditionally Published Authors",
    description: "Refresh your photo for new releases and press.",
  },
  {
    icon: Mic,
    title: "Speakers and Nonfiction Authors",
    description: "Match your book photo to your speaker bio.",
  },
  {
    icon: Newspaper,
    title: "Bloggers and Columnists",
    description: "Put a consistent face on your writing everywhere.",
  },
];

const faqs = [
  {
    "question": "Is the photo suitable for a book jacket?",
    "answer": "You receive high-resolution files that crop well for back covers, flaps and author pages. Check your publisher's or platform's specific size requirements."
  },
  {
    "question": "Will the photo look like me?",
    "answer": "Yes. TailorPic is trained on your own selfies, so results keep your real features and natural expression."
  },
  {
    "question": "Can I use it on my Amazon author page?",
    "answer": "Yes. You own the images and can upload them to author pages and your own website."
  },
  {
    "question": "Can I choose a background?",
    "answer": "Yes. You can choose a clean or colored background during setup."
  },
  {
    "question": "How much does it cost?",
    "answer": `TailorPic starts at ${BASE_PRICE_DISPLAY} per pack, far less than a photographer session.`
  },
  {
    "question": "How long does delivery take?",
    "answer": "Most orders arrive within hours after you upload your selfies."
  }
];

export default function BookCoverUseCasePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <FAQSchema items={faqs} />
      <Header />
      <div className="bg-tp-paper pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Use Cases', href: '/use-cases' }, { label: 'Book Cover' }]} currentPath="/use-cases/book-cover" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <BookOpen className="h-4 w-4" />
              {"Author Photos"}
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              {"AI Author Photos for "}
              <span className="not-italic text-tp-bronze">{"Book Covers"}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              {`Readers like to know who is behind the words. Get a polished author portrait from a handful of selfies, delivered within hours, starting at just ${BASE_PRICE_DISPLAY}.`}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                {"Get Your Author Photo"}
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
            {"Fits Book Jackets and Author Pages"}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {"Delivered Within Hours"}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {`Starting at ${BASE_PRICE_DISPLAY}`}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {"Quality Commitment"}
          </span>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              {"Why Your Author Photo Matters"}
            </h2>
            <p className="mt-4 text-lg text-tp-muted">{"A strong author photo builds credibility with readers and reviewers."}</p>
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
            <p className="mt-4 text-lg text-tp-muted">{"From selfie to author portrait in three steps."}</p>
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
              {"Who Uses TailorPic for Author Photos"}
            </h2>
            <p className="mt-4 text-lg text-tp-muted">{"Portraits for writers at every stage of publishing."}</p>
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
            {"Give Your Book a Face Readers Trust"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            {`Make your author bio stand out. Starting at just ${BASE_PRICE_DISPLAY}.`}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              {"Get Your Author Photo"}
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
