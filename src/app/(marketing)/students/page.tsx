import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import {
  ArrowRight,
  Check,
  GraduationCap,
  Briefcase,
  Users,
  Upload,
  Sparkles,
  Download,
  DollarSign,
  Clock,
  Camera,
  Shield,
  Palette,
  Target,
  TrendingUp,
  Linkedin,
  Star,
} from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'AI Headshots for Students: LinkedIn and Grad School Photos' },
  description:
    `Get professional AI-generated headshots from ${BASE_PRICE_DISPLAY}. Perfect for LinkedIn, graduate school applications, campus organizations and academic conferences.`,
  alternates: { canonical: '/students' },
  openGraph: generateOGMetadata({
    title: 'Student Headshots | TailorPic',
    description: `Affordable AI-generated professional headshots for students. Starting at ${BASE_PRICE_DISPLAY}.`,
    path: '/students',
  }),
  twitter: generateTwitterMetadata({
    title: 'Student Headshots | TailorPic',
    description: `Affordable AI-generated professional headshots for students. Starting at ${BASE_PRICE_DISPLAY}.`,
  }),
};

const faqs = [
  {
    question: 'Do I need a .edu email address to use TailorPic?',
    answer:
      `No. TailorPic is available to everyone. You can sign up with any email address. The pricing is already student-friendly at ${BASE_PRICE_DISPLAY} — no discount code needed.`,
  },
  {
    question: 'What headshot styles work best for LinkedIn as a student?',
    answer:
      'A clean, well-lit photo with a simple background works well for most students. Business casual attire is a safe choice. TailorPic offers several style options so you can match the tone of your field — whether that is finance, tech, healthcare or academia.',
  },
  {
    question: 'How long does it take to get my headshots?',
    answer:
      'After you upload your selfies, your headshots are typically ready within hours. No need to schedule a photographer, commute to a studio or wait days for edited photos.',
  },
  {
    question: 'How many selfies do I need to upload?',
    answer:
      'Upload 4 to 10 clear selfies from different angles. Well-lit photos with your face clearly visible produce the best results. Your phone camera is all you need.',
  },
  {
    question: 'Can I use the same headshot for LinkedIn and graduate school applications?',
    answer:
      'Yes. A professional, approachable headshot works across LinkedIn, grad school applications, campus directories, conference materials and more. You receive multiple variations so you can choose the best fit for each context.',
  },
];

const painPoints = [
  {
    icon: DollarSign,
    title: 'Studio sessions cost $150 or more',
    description:
      `Professional photographers charge $150 to $400 per session. TailorPic gives you the same polished result for ${BASE_PRICE_DISPLAY} — less than the cost of a campus coffee run.`,
  },
  {
    icon: Target,
    title: 'First impressions start online',
    description:
      'Recruiters spend an average of 7 seconds scanning a LinkedIn profile. A professional headshot makes you look prepared, credible and ready to contribute from day one.',
  },
  {
    icon: TrendingUp,
    title: 'LinkedIn profiles with photos get 21x more views',
    description:
      'A clear, professional photo is the single biggest factor in profile visibility. Profiles without one are routinely skipped by recruiters and hiring managers.',
  },
];

const useCases = [
  {
    icon: Briefcase,
    title: 'Internship and job applications',
    description:
      'Stand out before you even submit your resume. A polished headshot signals professionalism and attention to detail — exactly what hiring managers look for.',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn profile optimization',
    description:
      'Your LinkedIn photo is your digital handshake. Upgrade from a cropped selfie to a studio-quality headshot that gets you noticed by recruiters in your target industry.',
  },
  {
    icon: GraduationCap,
    title: 'Graduate school applications',
    description:
      'Many graduate programs ask for a professional photo. A polished headshot helps your application look complete, intentional and competitive.',
  },
  {
    icon: Users,
    title: 'Campus organizations and leadership',
    description:
      'Student government, clubs, honor societies and Greek life often feature member photos. A consistent, professional look reflects well on the entire group.',
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
      'Choose your favorites and download high-resolution files. Use them on LinkedIn, applications, campus directories and anywhere you need a professional photo.',
  },
];

const included = [
  { icon: Palette, text: 'Multiple styles and outfit options' },
  { icon: Camera, text: 'Clean, professional backgrounds' },
  { icon: Clock, text: 'Ready within hours — no scheduling' },
  { icon: Shield, text: 'quality commitment' },
  { icon: Star, text: 'HD quality for print and digital' },
  { icon: Download, text: 'Unlimited downloads of your photos' },
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
      price: '1.99',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.url}/pricing`,
    },
  };

  return (
    <>
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
      <main id="main-content" className="bg-white">

      {/* Dark Hero */}
      <section className="bg-tp-ink px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-tp-bronze">
            <GraduationCap className="h-3.5 w-3.5" />
            Student-Friendly
          </span>
          <h1 className="font-display text-4xl font-normal tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
            Professional Headshots for Students
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/80">
            A polished headshot for LinkedIn, graduate school applications and internship
            searches — without an expensive studio session. Starting at just{' '}
            <span className="font-semibold text-tp-bronze">{BASE_PRICE_DISPLAY}</span>.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
              className={`${buttonVariants({ variant: 'secondary', size: 'lg' })} bg-tp-bronze text-tp-ink hover:bg-tp-beige`}
            >
              Start Your Career Strong
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/samples"
              className={`${buttonVariants({ variant: 'outline', size: 'lg' })} border-tp-muted/40 text-tp-beige hover:bg-white/10 hover:text-white`}
            >
              See sample photos
            </Link>
          </div>
          <p className="mt-5 text-xs text-tp-muted">
            No subscription. No .edu required. Upload selfies, get headshots within hours.
          </p>
        </div>
      </section>

      {/* Pain Points */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">
            Why Every Student Needs a Professional Headshot
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-tp-muted">
            The job market is competitive. Your online presence starts working for you — or
            against you — before you ever send an application.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {painPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-tp-card border border-tp-line bg-white p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-beige/50">
                  <point.icon className="h-5 w-5 text-tp-bronze-ink" />
                </div>
                <h3 className="font-display font-normal mt-4 text-lg text-tp-ink">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Use Cases */}
      <section className="bg-tp-paper px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">
            Where Students Use Professional Headshots
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-tp-muted">
            One set of headshots, ready for every opportunity that comes your way.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="rounded-tp-card border border-tp-line bg-white p-6"
              >
                <uc.icon className="h-6 w-6 text-tp-bronze-ink" />
                <h3 className="font-display font-normal mt-4 text-lg text-tp-ink">
                  {uc.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                  {uc.description}
                </p>
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
                className="relative rounded-tp-card border border-tp-line bg-white p-6"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-tp-ink text-sm font-semibold text-white">
                  {i + 1}
                </div>
                <step.icon className="mt-4 h-6 w-6 text-tp-bronze-ink" />
                <h3 className="font-display font-normal mt-3 text-lg text-tp-ink">
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

      {/* Pricing Highlight */}
      <section className="bg-tp-paper px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-tp-card border border-tp-line bg-white">
            {/* Price header */}
            <div className="bg-tp-ink px-8 py-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">
                Student Budget Friendly
              </p>
              <div className="mt-3 flex items-baseline justify-center gap-1">
                <span className="font-display text-5xl font-normal text-white">{BASE_PRICE_DISPLAY}</span>
                <span className="text-sm text-tp-beige/70">one-time</span>
              </div>
              <p className="mt-2 text-sm text-tp-beige/70">
                No subscription. No hidden fees. Pay once, keep your photos forever.
              </p>
            </div>
            {/* What's included */}
            <div className="px-8 py-8">
              <p className="mb-4 text-sm font-semibold text-tp-ink">Everything included:</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {included.map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <item.icon className="h-4 w-4 shrink-0 text-tp-bronze-ink" />
                    <span className="text-sm text-tp-muted">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
                  className={buttonVariants({ variant: 'primary', size: 'lg' })}
                >
                  Get started for {BASE_PRICE_DISPLAY}
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
          </div>
          <p className="mt-4 text-center text-xs text-tp-muted">
            Less than a large coffee. More impact than an entire wardrobe upgrade.
          </p>
        </div>
      </section>

      {/* How It Works — quick steps */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
          {[
            { value: '3 Steps', label: 'Upload, generate, download' },
            { value: `From ${BASE_PRICE_DISPLAY}`, label: 'One-time payment, no subscription' },
            { value: 'Up to 160', label: 'Professional headshots per order' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-tp-card border border-tp-line bg-white p-6 text-center"
            >
              <p className="font-display text-3xl font-normal text-tp-ink">{stat.value}</p>
              <p className="mt-1 text-sm text-tp-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tips for Great Student Headshots */}
      <section className="bg-tp-paper px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">
            Quick Tips for Better Results
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-tp-muted">
            A few small choices make a big difference in your headshots.
          </p>
          <div className="mt-10 space-y-4">
            {[
              {
                title: 'Wear solid colors',
                detail:
                  'Business casual in solid colors works for most fields. Avoid busy patterns, logos and bright neons.',
              },
              {
                title: 'Use natural light',
                detail:
                  'Face a window so your face is evenly lit without harsh shadows. Avoid overhead fluorescent lights.',
              },
              {
                title: 'Relax your expression',
                detail:
                  'A natural, relaxed smile reads as approachable and confident. You do not need to look overly formal.',
              },
              {
                title: 'Keep the background simple',
                detail:
                  'A plain wall or uncluttered space helps the AI produce cleaner results. Our AI replaces backgrounds, but starting simple helps.',
              },
            ].map((tip) => (
              <div key={tip.title} className="flex gap-4">
                <Check className="mt-1 h-5 w-5 shrink-0 text-tp-bronze-ink" />
                <div>
                  <p className="text-sm font-semibold text-tp-ink">{tip.title}</p>
                  <p className="mt-0.5 text-sm text-tp-muted">{tip.detail}</p>
                </div>
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
          <p className="mx-auto mt-3 max-w-2xl text-center text-tp-muted">
            Common questions from students getting their first professional headshot.
          </p>
          <div className="mt-10 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-tp-card border border-tp-line bg-white p-5 transition-shadow hover:shadow-sm"
              >
                <summary className="cursor-pointer list-none font-semibold text-tp-ink [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <ArrowRight className="h-4 w-4 shrink-0 rotate-90 text-tp-muted transition-transform group-open:rotate-[270deg]" />
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-tp-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-tp-card bg-tp-ink px-6 py-14 text-center sm:px-12">
          <GraduationCap className="mx-auto h-8 w-8 text-tp-bronze" />
          <h2 className="font-display mt-4 text-3xl font-normal text-white sm:text-4xl">
            Start Your Career Strong
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-tp-beige/80">
            Your next internship, job offer or graduate school acceptance starts with a first
            impression. Make it a professional one — for just {BASE_PRICE_DISPLAY}.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
              className={`${buttonVariants({ variant: 'secondary', size: 'lg' })} bg-tp-bronze text-tp-ink hover:bg-tp-beige`}
            >
              Get your student headshot
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/samples"
              className={`${buttonVariants({ variant: 'outline', size: 'lg' })} border-tp-muted/40 text-tp-beige hover:bg-white/10 hover:text-white`}
            >
              View samples first
            </Link>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
