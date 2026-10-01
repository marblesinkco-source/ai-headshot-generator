import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import {
  ArrowRight,
  Check,
  GraduationCap,
  Briefcase,
  Users,
  BookOpen,
  Upload,
  Sparkles,
  Download,
  DollarSign,
  Clock,
  Camera,
  Shield,
  Palette,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Student Headshots — Affordable AI Professional Photos for Students | TailorPic',
  description:
    'Get professional AI-generated headshots starting at $9.90. Perfect for LinkedIn, graduate school applications, campus organizations and academic conferences.',
  alternates: { canonical: '/students' },
  openGraph: generateOGMetadata({
    title: 'Student Headshots | TailorPic',
    description: 'Affordable AI-generated professional headshots for students. Starting at $9.90.',
    path: '/students',
  }),
  twitter: generateTwitterMetadata({
    title: 'Student Headshots | TailorPic',
    description: 'Affordable AI-generated professional headshots for students. Starting at $9.90.',
  }),
};

const faqs = [
  {
    question: 'Do I need a .edu email address to use TailorPic?',
    answer:
      'No. TailorPic is available to everyone. You can sign up with any email address. The pricing is already student-friendly at $9.90.',
  },
  {
    question: 'What headshot styles work best for LinkedIn as a student?',
    answer:
      'A clean, well-lit photo with a simple background works well for most students. Business casual attire is a safe choice. TailorPic offers several style options so you can match the tone of your field.',
  },
  {
    question: 'How long does it take to get my headshots?',
    answer:
      'After you upload your selfies, your headshots are typically generated within a short time. No need to schedule a photographer or wait days for edited photos.',
  },
  {
    question: 'How many selfies do I need to upload?',
    answer:
      'Upload 10 to 20 clear selfies from different angles (minimum 8). Well-lit photos with your face clearly visible produce the best results.',
  },
  {
    question: 'Can I use the same headshot for LinkedIn and graduate school applications?',
    answer:
      'Yes. A professional, approachable headshot works across LinkedIn, grad school applications, campus directories and more. You receive multiple variations so you can choose the best fit for each context.',
  },
];

const useCases = [
  {
    icon: GraduationCap,
    title: 'Graduate school applications',
    description:
      'Many graduate programs ask for a professional photo. A polished headshot helps your application look complete and intentional.',
  },
  {
    icon: Briefcase,
    title: 'LinkedIn and job search',
    description:
      'Recruiters and hiring managers notice profiles with clear, professional photos. Stand out before you even submit your resume.',
  },
  {
    icon: Users,
    title: 'Campus organizations and leadership',
    description:
      'Student government, clubs and honor societies often feature member photos. A consistent, professional look reflects well on the group.',
  },
  {
    icon: BookOpen,
    title: 'Academic conferences and publications',
    description:
      'Presenting research or publishing a paper? A professional headshot adds credibility to your author profile and conference materials.',
  },
];

const steps = [
  {
    icon: Upload,
    title: 'Upload your selfies',
    description:
      'Take 10 to 20 clear selfies from different angles in good lighting. Use your phone camera — no professional equipment needed.',
  },
  {
    icon: Sparkles,
    title: 'AI generates your headshots',
    description:
      'Our AI creates professional headshots with clean backgrounds, proper framing and polished lighting from your uploaded photos.',
  },
  {
    icon: Download,
    title: 'Download and use everywhere',
    description:
      'Choose your favorites and download them. Use them on LinkedIn, applications, campus directories and anywhere else you need a professional photo.',
  },
];

const included = [
  { icon: Palette, text: 'Multiple styles and outfit options' },
  { icon: Camera, text: 'Clean, professional backgrounds' },
  { icon: Clock, text: 'Fast delivery — no scheduling needed' },
  { icon: Shield, text: '14-day satisfaction guarantee' },
];

const tips = [
  {
    title: 'What to wear',
    description:
      'Solid colors in business casual work well for most students. Avoid busy patterns, logos and bright neons. Dress for the field you are entering.',
  },
  {
    title: 'Get the lighting right',
    description:
      'Natural light from a window works great. Face the light source so your face is evenly lit without harsh shadows. Avoid overhead fluorescent lights.',
  },
  {
    title: 'Expression matters',
    description:
      'A natural, relaxed smile reads as approachable and confident. You do not need to look overly formal — just like someone others would want to work with.',
  },
  {
    title: 'Keep the background simple',
    description:
      'A plain wall or uncluttered space behind you helps the AI produce cleaner results. Our AI replaces backgrounds, but starting simple helps.',
  },
];

export default function StudentsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'AI Student Headshots',
    description:
      'Affordable AI-generated professional headshots for students. Perfect for LinkedIn, graduate school applications and campus use.',
    brand: { '@type': 'Brand', name: siteConfig.name },
    category: 'Professional Headshots',
    url: `${siteConfig.url}/students`,
    offers: {
      '@type': 'Offer',
      price: '9.90',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.url}/pricing`,
    },
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Students', url: `${siteConfig.url}/students` },
        ]}
      />
      <FAQSchema items={faqs} />
      <Header />

      {/* Hero */}
      <section className="bg-tp-paper px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wide text-tp-bronze-ink">
            Student and Education
          </p>
          <h1 className="font-display text-4xl font-normal tracking-tight text-tp-ink sm:text-5xl">
            Professional Headshots for Students — Starting at $9.90
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-muted">
            A polished headshot for LinkedIn, graduate school applications, campus directories
            and conferences — without the cost of a studio session.
          </p>
          <ul className="mx-auto mt-6 flex max-w-xl flex-col items-start gap-2 text-left text-tp-muted sm:mx-auto">
            {[
              'No studio booking or photographer needed',
              'Upload selfies from your phone',
              'Multiple styles to match any use case',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-1 h-5 w-5 shrink-0 text-tp-bronze-ink" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/auth/register"
              className={buttonVariants({ variant: 'primary', size: 'lg' })}
            >
              Get your student headshot
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/samples"
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
            >
              See sample photos
            </Link>
          </div>
        </div>
      </section>

      {/* Why Students Need Professional Headshots */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">
            Why Students Need Professional Headshots
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-tp-muted">
            A professional photo is no longer optional once you start building your career.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              'LinkedIn profiles with a clear, professional photo get more views from recruiters and connections.',
              'Graduate school applications increasingly expect a headshot as part of your materials.',
              'Campus organizations and leadership positions benefit from a consistent, polished look.',
              'Conference presentations and academic publications carry more weight with a credible author photo.',
              'Job applications and internship listings often ask for a profile photo alongside your resume.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-tp-muted">
                <Check className="mt-1 h-5 w-5 shrink-0 text-tp-bronze-ink" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Student Use Cases */}
      <section className="bg-tp-paper px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">
            Where Students Use Professional Headshots
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="rounded-tp-card border border-tp-line bg-white p-6"
              >
                <uc.icon className="h-6 w-6 text-tp-bronze-ink" />
                <h3 className="font-display mt-4 text-lg font-semibold text-tp-ink">
                  {uc.title}
                </h3>
                <p className="mt-2 text-sm text-tp-muted">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">
            How It Works
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-tp-muted">
            Three simple steps from your phone to a professional headshot.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="rounded-tp-card border border-tp-line bg-white p-6"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-tp-button bg-tp-beige/40 text-sm font-semibold text-tp-bronze-ink">
                  {i + 1}
                </div>
                <step.icon className="mt-4 h-6 w-6 text-tp-bronze-ink" />
                <h3 className="font-display mt-3 text-lg font-semibold text-tp-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-tp-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-tp-paper px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">
            What You Get
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {included.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-4 rounded-tp-card border border-tp-line bg-white p-5"
              >
                <item.icon className="h-6 w-6 shrink-0 text-tp-bronze-ink" />
                <span className="text-sm font-medium text-tp-ink">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl rounded-tp-card border border-tp-line bg-white p-8 text-center">
          <DollarSign className="mx-auto h-7 w-7 text-tp-bronze-ink" />
          <h2 className="font-display mt-3 text-3xl font-normal text-tp-ink">
            $9.90 — One-Time Payment
          </h2>
          <p className="mt-3 text-tp-muted">
            No subscription. No hidden fees. Already the most affordable option — perfect
            for student budgets.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/auth/register"
              className={buttonVariants({ variant: 'primary', size: 'lg' })}
            >
              Get started for $9.90
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className={buttonVariants({ variant: 'outline', size: 'md' })}
            >
              View all plans
            </Link>
          </div>
        </div>
      </section>

      {/* Tips for Great Student Headshots */}
      <section className="bg-tp-paper px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">
            Tips for Great Student Headshots
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-tp-muted">
            A few small choices make a big difference in your results.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {tips.map((tip) => (
              <div
                key={tip.title}
                className="rounded-tp-card border border-tp-line bg-white p-6"
              >
                <h3 className="font-display text-lg font-semibold text-tp-ink">
                  {tip.title}
                </h3>
                <p className="mt-2 text-sm text-tp-muted">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">
            Student Headshot FAQ
          </h2>
          <div className="mt-10 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-tp-card border border-tp-line bg-white p-5"
              >
                <summary className="cursor-pointer list-none font-semibold text-tp-ink">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm text-tp-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-2xl rounded-tp-card bg-tp-ink px-6 py-12 text-center">
          <h2 className="font-display text-3xl font-normal text-white">
            Get Your Professional Headshot Today
          </h2>
          <p className="mt-3 text-tp-beige">
            Upload a few selfies and get a headshot you can use on LinkedIn, applications
            and everywhere else.
          </p>
          <Link
            href="/auth/register"
            className={`${buttonVariants({ variant: 'secondary', size: 'lg' })} mt-8 bg-tp-bronze text-tp-ink hover:bg-tp-beige`}
          >
            Get started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
