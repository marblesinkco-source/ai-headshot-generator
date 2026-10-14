import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { siteConfig } from '@/config/site';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import {

// Revalidate every hour so pricing changes propagate without a manual redeploy
export const revalidate = 3600;
  ArrowRight,
  Camera,
  CheckCircle,
  Upload,
  BarChart3,
  Sparkles,
  Sun,
  Focus,
  Smile,
  User,
  Eye,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

const PAGE_TITLE = 'Free LinkedIn Photo Analyzer';
const PAGE_DESCRIPTION =
  'Analyze your LinkedIn profile photo for free. Get instant feedback on lighting, composition, background, expression, and professional appearance.';

export const metadata: Metadata = {
  title: { absolute: `${PAGE_TITLE} | ${siteConfig.name}` },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/linkedin-photo-analyzer' },
  openGraph: generateOGMetadata({
    title: `${PAGE_TITLE} | ${siteConfig.name}`,
    description: PAGE_DESCRIPTION,
    path: '/linkedin-photo-analyzer',
  }),
  twitter: generateTwitterMetadata({
    title: `${PAGE_TITLE} | ${siteConfig.name}`,
    description: PAGE_DESCRIPTION,
  }),
};

/* ------------------------------------------------------------------ */
/*  How it works steps                                                 */
/* ------------------------------------------------------------------ */

const steps = [
  {
    icon: Upload,
    number: '1',
    title: 'Upload Your Photo',
    description:
      'Upload your current LinkedIn profile photo or any headshot you want analyzed.',
  },
  {
    icon: BarChart3,
    number: '2',
    title: 'Get Your Analysis',
    description:
      'Our tool evaluates your photo across five key professional criteria.',
  },
  {
    icon: Sparkles,
    number: '3',
    title: 'Improve Your Profile',
    description:
      'Use actionable recommendations to upgrade your LinkedIn presence.',
  },
];

/* ------------------------------------------------------------------ */
/*  Analysis criteria                                                  */
/* ------------------------------------------------------------------ */

const criteria = [
  {
    icon: Sun,
    title: 'Lighting',
    description:
      'Good lighting makes your face clearly visible and avoids harsh shadows. Even, soft light from a window or professional setup creates the most polished look.',
  },
  {
    icon: Focus,
    title: 'Composition',
    description:
      'A well-composed headshot frames you from the chest up, with your face centered. Too close or too far reduces the impact of your profile photo.',
  },
  {
    icon: Eye,
    title: 'Background',
    description:
      'A clean, uncluttered background keeps attention on you. Solid colors or subtle textures work best; busy environments distract from your professional image.',
  },
  {
    icon: Smile,
    title: 'Expression',
    description:
      'A natural, approachable expression builds trust. A relaxed smile with eye contact conveys confidence and openness to potential connections.',
  },
  {
    icon: User,
    title: 'Professional Appearance',
    description:
      'Appropriate attire, grooming, and overall polish signal credibility. Your photo should match the expectations of your industry and target audience.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ items                                                          */
/* ------------------------------------------------------------------ */

const faqItems = [
  {
    question: 'What does the LinkedIn Photo Analyzer check?',
    answer:
      'The analyzer evaluates five key aspects of your LinkedIn profile photo: lighting quality, composition and framing, background suitability, facial expression, and overall professional appearance. Each criterion is assessed against best practices for professional headshots.',
  },
  {
    question: 'Is the LinkedIn Photo Analyzer really free?',
    answer:
      'Yes, the photo analysis guide is completely free. We provide actionable tips based on professional photography standards so you can evaluate and improve your LinkedIn photo on your own.',
  },
  {
    question: 'Why does my LinkedIn profile photo matter?',
    answer:
      'LinkedIn profiles with professional photos receive significantly more profile views and connection requests than those without. Your photo is often the first impression you make on recruiters, clients, and professional contacts.',
  },
  {
    question: 'What makes a good LinkedIn profile photo?',
    answer:
      'A strong LinkedIn photo has even lighting, a clean background, chest-up framing, a natural and approachable expression, and industry-appropriate attire. The photo should be recent, in focus, and high resolution.',
  },
  {
    question: 'How can I get a professional headshot without a studio?',
    answer:
      `${siteConfig.name} generates studio-quality AI headshots from your selfies. Upload a few casual photos and receive professional headshots in multiple styles and backgrounds, starting at ${BASE_PRICE_DISPLAY}.`,
  },
  {
    question: 'Can I use AI-generated headshots on LinkedIn?',
    answer:
      `Yes. AI-generated headshots from ${siteConfig.name} are designed to look natural and professional. They are suitable for LinkedIn, company websites, resumes, and any professional context where a polished headshot is expected.`,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function LinkedInPhotoAnalyzerPage() {
  return (
    <>
      <Header />

      <main id="main-content">
        <BreadcrumbSchema
          items={[
            { name: 'Home', url: siteConfig.url },
            {
              name: PAGE_TITLE,
              url: `${siteConfig.url}/linkedin-photo-analyzer`,
            },
          ]}
        />
        <FAQSchema items={faqItems} />

        {/* ---- Hero ---- */}
        <section className="relative overflow-hidden bg-tp-black py-20 sm:py-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-tp-bronze/10 blur-[120px]"
          />
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-xs font-semibold text-tp-bronze">
              <Camera className="h-3.5 w-3.5" aria-hidden="true" />
              Free Tool
            </div>
            <h1 className="font-display font-normal text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {PAGE_TITLE}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Get instant feedback on your LinkedIn profile photo. Learn what
              makes a headshot stand out and how to improve yours for more
              profile views and connection requests.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="#analysis-criteria"
                className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
              >
                See the Criteria
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 text-sm font-medium text-tp-beige/80 underline underline-offset-2 hover:text-white"
              >
                Get AI Headshots from {BASE_PRICE_DISPLAY}
              </Link>
            </div>
          </div>
        </section>

        {/* ---- How It Works ---- */}
        <section className="bg-tp-paper py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
                How It Works
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-tp-muted">
                Evaluate your LinkedIn photo in three simple steps.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tp-bronze/10">
                    <step.icon
                      className="h-6 w-6 text-tp-bronze-ink"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mx-auto mt-3 flex h-7 w-7 items-center justify-center rounded-full bg-tp-ink text-xs font-semibold text-white">
                    {step.number}
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-tp-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Analysis Criteria ---- */}
        <section
          id="analysis-criteria"
          className="border-y border-tp-line bg-white py-16 sm:py-20"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
                What We Analyze
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-tp-muted">
                A strong LinkedIn photo is assessed across five professional
                criteria. Use this checklist to evaluate your own headshot.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {criteria.map((item) => (
                <div
                  key={item.title}
                  className="rounded-tp-card border border-tp-line bg-white p-6 transition hover:shadow-md"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-bronze/10">
                      <item.icon
                        className="h-5 w-5 text-tp-bronze-ink"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-base font-semibold text-tp-ink">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-tp-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Coming Soon Notice ---- */}
        <section className="bg-tp-paper py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <div className="rounded-tp-card border border-tp-line bg-white p-8 sm:p-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tp-bronze/10">
                <BarChart3
                  className="h-6 w-6 text-tp-bronze-ink"
                  aria-hidden="true"
                />
              </div>
              <h2 className="mt-5 font-display font-normal text-2xl text-tp-ink sm:text-3xl">
                Automated Analysis Coming Soon
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-tp-muted">
                We are building an automated photo analysis tool that will score
                your LinkedIn headshot across all five criteria instantly. In the
                meantime, use the checklist above to evaluate your photo
                yourself.
              </p>
              <p className="mt-4 text-sm text-tp-muted">
                Want a headshot that passes every criterion?{' '}
                <Link
                  href="/pricing"
                  className="font-medium text-tp-bronze-ink underline underline-offset-2 hover:text-tp-ink"
                >
                  Get AI-generated professional headshots
                </Link>{' '}
                starting at {BASE_PRICE_DISPLAY}.
              </p>
            </div>
          </div>
        </section>

        {/* ---- CTA ---- */}
        <section className="relative overflow-hidden bg-tp-black py-16 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-tp-bronze/15 blur-[120px]"
          />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-display font-normal text-3xl text-white sm:text-4xl">
              Want a Headshot That Scores Perfectly?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-tp-beige/70">
              Skip the guesswork. {siteConfig.name} generates professional
              AI headshots from your selfies — optimized lighting, clean
              backgrounds, and a polished look, every time.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
              >
                See Pricing from {BASE_PRICE_DISPLAY}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/headshots"
                className="inline-flex items-center gap-2 text-sm font-medium text-tp-beige/80 underline underline-offset-2 hover:text-white"
              >
                Browse headshot styles
              </Link>
            </div>
            <p className="mt-4 text-xs text-tp-beige/50">
              From {BASE_PRICE_DISPLAY} &middot; Up to 160 photos &middot; No
              subscription
            </p>
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="divide-y divide-tp-line">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="group py-5"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-left text-base font-semibold text-tp-ink">
                    {item.question}
                    <span className="ml-4 flex-shrink-0 text-tp-muted transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-tp-muted">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
