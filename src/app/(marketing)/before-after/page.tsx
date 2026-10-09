import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { BeforeAfterGallery } from '@/components/marketing/before-after-gallery';
import { buttonVariants } from '@/components/ui/button';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import {
  ArrowRight,
  ChevronRight,
  Camera,
  Sparkles,
  UserCheck,
  Image,
  Sun,
  Crop,
  Shirt,
  Monitor,
  Paintbrush,
  Briefcase,
  Palette,
  Coffee,
  Award,
  Leaf,
  Aperture,
  Clock,
  Images,
  DollarSign,
} from 'lucide-react';

const PAGE_TITLE = 'Before & After: AI Headshot Transformation';
const PAGE_DESCRIPTION =
  'See how TailorPic transforms casual selfies into studio-quality professional headshots. Drag the slider to compare before and after results.';

export const metadata: Metadata = {
  title: { absolute: `${PAGE_TITLE} | ${siteConfig.name}` },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/before-after' },
  openGraph: generateOGMetadata({
    title: `${PAGE_TITLE} | ${siteConfig.name}`,
    description: PAGE_DESCRIPTION,
    path: '/before-after',
  }),
  twitter: generateTwitterMetadata({
    title: `${PAGE_TITLE} | ${siteConfig.name}`,
    description: PAGE_DESCRIPTION,
  }),
};

type IconType = React.ComponentType<{ className?: string }>;

const processStages: { icon: IconType; label: string; description: string }[] = [
  {
    icon: Camera,
    label: 'Your Selfie',
    description:
      'Upload a few casual photos taken with your phone. No studio, no professional equipment needed.',
  },
  {
    icon: Sparkles,
    label: 'AI Processing',
    description:
      'Our AI analyzes your features and generates professional headshots with studio-quality enhancements.',
  },
  {
    icon: UserCheck,
    label: 'Professional Headshot',
    description:
      'Receive polished, high-resolution headshots ready for LinkedIn, resumes, and company pages.',
  },
];

const transformations: {
  icon: IconType;
  title: string;
  before: string;
  after: string;
}[] = [
  {
    icon: Image,
    title: 'Background',
    before: 'Casual room background',
    after: 'Clean, professional studio backdrop',
  },
  {
    icon: Sun,
    title: 'Lighting',
    before: 'Uneven phone lighting',
    after: 'Balanced studio-quality illumination',
  },
  {
    icon: Crop,
    title: 'Composition',
    before: 'Off-center selfie angle',
    after: 'Properly framed professional composition',
  },
  {
    icon: Shirt,
    title: 'Attire',
    before: 'Everyday clothes',
    after: 'Professional business attire options',
  },
  {
    icon: Monitor,
    title: 'Resolution',
    before: 'Phone-quality image',
    after: 'High-resolution professional photo',
  },
  {
    icon: Paintbrush,
    title: 'Retouching',
    before: 'Raw unedited photo',
    after: 'Natural skin smoothing and enhancement',
  },
];

const styles: { icon: IconType; title: string; description: string }[] = [
  {
    icon: Briefcase,
    title: 'Corporate / Business',
    description:
      'Clean backgrounds, formal attire, and confident expressions for corporate profiles.',
  },
  {
    icon: Palette,
    title: 'Creative Professional',
    description:
      'A polished but approachable look suited for designers, writers, and creative roles.',
  },
  {
    icon: Coffee,
    title: 'Casual Professional',
    description:
      'Relaxed and natural styling for startups, freelancers, and personal branding.',
  },
  {
    icon: Award,
    title: 'Executive',
    description:
      'Premium, authoritative headshots for leadership pages and board profiles.',
  },
  {
    icon: Leaf,
    title: 'Outdoor / Natural',
    description:
      'Soft, natural-light backgrounds for a warm and personable impression.',
  },
  {
    icon: Aperture,
    title: 'Studio Classic',
    description:
      'Traditional studio headshot styling with neutral backdrops and balanced lighting.',
  },
];

const stats: { icon: IconType; value: string; label: string }[] = [
  {
    icon: Clock,
    value: 'Within hours',
    label: 'Average delivery time',
  },
  {
    icon: Images,
    value: 'Up to 160',
    label: 'Photos per package',
  },
  {
    icon: DollarSign,
    value: `From ${BASE_PRICE_DISPLAY}`,
    label: 'Starting price',
  },
];

const faqs = [
  {
    question: 'How realistic are the AI headshots compared to studio photos?',
    answer:
      'Our AI produces headshots that are comparable to professional studio photography. The AI handles lighting, background, composition, and subtle retouching — the same adjustments a professional photographer would make in post-processing.',
  },
  {
    question: 'What kind of selfies work best for the AI transformation?',
    answer:
      'Clear, well-lit photos taken at eye level work best. Natural daylight, a neutral expression, and a simple background help the AI produce the best results. You can upload 4–10 selfies for the AI to work with.',
  },
  {
    question: 'Can I choose different backgrounds and styles?',
    answer:
      'Yes. TailorPic offers multiple style options including corporate, creative, casual, executive, outdoor, and classic studio looks. Each style adjusts the background, lighting tone, and overall feel of your headshot.',
  },
  {
    question: 'How long does it take to get my AI headshots?',
    answer:
      'Most orders are delivered within hours. You receive a set of professionally enhanced headshots ready for LinkedIn, resumes, company directories, and other professional platforms.',
  },
  {
    question: 'Are the before/after examples on this page real?',
    answer:
      'The images shown are AI-generated concept illustrations using stock photography. They demonstrate the type of transformation our AI performs. Individual results vary based on the quality of your uploaded photos.',
  },
];

export default function BeforeAfterPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Before & After', url: `${siteConfig.url}/before-after` },
        ]}
      />
      <FAQSchema
        items={faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black py-20 sm:py-28">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-xs font-semibold text-tp-bronze">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Before &amp; After
          </div>
          <h1 className="font-display font-normal text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            See the Transformation
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
            From casual selfies to studio-quality professional headshots
            &mdash; drag the slider to compare.
          </p>
          <div className="mt-8">
            <Link
              href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
              className={buttonVariants({ variant: 'primary', size: 'lg', className: 'gap-2' })}
            >
              Try It Yourself
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Before & After Gallery */}
      <BeforeAfterGallery />

      {/* The Process */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
              The Process
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-tp-muted">
              Three simple stages from selfie to professional headshot.
            </p>
          </div>
          <div className="grid items-start gap-6 md:grid-cols-5">
            {processStages.map(({ icon: Icon, label, description }, i) => (
              <div key={label} className="contents">
                <div className="flex flex-col items-center text-center md:col-span-1">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-tp-paper">
                    <Icon
                      className="h-7 w-7 text-tp-bronze-ink"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-tp-ink">
                    {label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    {description}
                  </p>
                </div>
                {i < processStages.length - 1 && (
                  <div className="hidden items-center justify-center md:flex md:col-span-1 md:pt-5">
                    <ChevronRight
                      className="h-6 w-6 text-tp-bronze/50"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Changes */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
              What Changes
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-tp-muted">
              Here&apos;s what our AI transforms in each headshot.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {transformations.map(({ icon: Icon, title, before, after }) => (
              <div
                key={title}
                className="rounded-tp-card border border-tp-line bg-white p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-paper">
                    <Icon
                      className="h-5 w-5 text-tp-bronze-ink"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-base font-semibold text-tp-ink">
                    {title}
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="rounded-tp-button bg-tp-paper px-4 py-3">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-tp-muted">
                      Before
                    </span>
                    <span className="mt-1 block text-sm text-tp-muted">
                      {before}
                    </span>
                  </div>
                  <div className="rounded-tp-button border border-tp-bronze/20 bg-tp-bronze/5 px-4 py-3">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-tp-bronze-ink">
                      After
                    </span>
                    <span className="mt-1 block text-sm text-tp-ink">
                      {after}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style Options */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
              Style Options
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-tp-muted">
              Choose a look that matches your industry and personal brand.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {styles.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-tp-card border border-tp-line bg-white p-6 transition-colors hover:border-tp-bronze/30"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-paper">
                  <Icon
                    className="h-5 w-5 text-tp-bronze-ink"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-base font-semibold text-tp-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results in Numbers */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
              Results in Numbers
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="rounded-tp-card border border-tp-line bg-white p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-tp-bronze/10">
                  <Icon
                    className="h-5 w-5 text-tp-bronze-ink"
                    aria-hidden="true"
                  />
                </div>
                <div className="text-2xl font-semibold text-tp-ink">
                  {value}
                </div>
                <div className="mt-1 text-sm text-tp-muted">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="divide-y divide-tp-line">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-tp-ink">
                  {faq.question}
                  <ChevronRight className="h-5 w-5 shrink-0 text-tp-muted transition-transform group-open:rotate-90" aria-hidden="true" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-tp-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-tp-black py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display font-normal text-3xl text-white sm:text-4xl">
            Ready to See Your Transformation?
          </h2>
          <p className="mt-4 text-tp-beige/60">
            Upload your selfies and let {siteConfig.name} create
            studio-quality headshots for you.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
            >
              Get Started <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/headshots"
              className="inline-flex items-center gap-2 text-sm font-medium text-tp-beige/80 underline underline-offset-2 hover:text-white"
            >
              See headshot packages
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
