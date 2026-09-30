import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import {
  Camera,
  Sparkles,
  Clock,
  DollarSign,
  ArrowRight,
  Check,
  Star,
  Upload,
  Wand2,
  Download,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'LinkedIn Headshots — AI-Generated Professional Profile Photos | TailorPic',
  description:
    'Get AI-generated LinkedIn headshots with clean backgrounds, natural expressions and professional lighting. A better LinkedIn profile photo without a photoshoot.',
  alternates: { canonical: '/linkedin-headshots' },
  openGraph: {
    title: 'LinkedIn Headshots | TailorPic',
    description: 'Professional AI-generated LinkedIn profile photos from your selfies.',
    url: `${siteConfig.url}/linkedin-headshots`,
  },
};

const faqs = [
  {
    question: 'What makes a good LinkedIn headshot?',
    answer:
      'A good LinkedIn headshot shows your face clearly, uses even lighting, has an uncluttered background and reflects your industry. A natural, approachable expression usually works better than a stiff pose.',
  },
  {
    question: 'What size should a LinkedIn profile photo be?',
    answer:
      'LinkedIn displays profile photos as a square crop, and a higher-resolution square image keeps your face sharp. TailorPic delivers high-resolution photos that crop cleanly for LinkedIn.',
  },
  {
    question: 'Can I use AI-generated headshots on LinkedIn?',
    answer:
      'Yes. Your headshots are generated from your own selfies, so they look like you. As always, choose images that accurately represent your current appearance.',
  },
  {
    question: 'How many selfies do I need to upload?',
    answer:
      'A handful of clear, well-lit selfies from different angles is enough. See the how it works page for detailed photo tips.',
  },
  {
    question: 'How much do LinkedIn headshots cost?',
    answer:
      'Packages start from $9.90. Visit the pricing page for current plans and what each one includes.',
  },
];

const whyItMatters = [
  'Your photo is often the first thing recruiters, clients and colleagues see next to your name.',
  'Studies suggest profiles with a professional photo tend to receive significantly more views than profiles without one.',
  'A clear, friendly photo can make connection requests and messages feel more trustworthy.',
  'People form impressions of competence and approachability within moments of seeing a face.',
  'An outdated or casual photo can undercut an otherwise strong profile.',
];

const features = [
  { icon: Sparkles, title: 'Professional backgrounds', description: 'Clean studio, soft office and neutral backdrops that keep the focus on you.' },
  { icon: Star, title: 'Natural expressions', description: 'Confident, approachable looks that still feel like you, not a stock photo.' },
  { icon: Camera, title: 'Multiple outfit options', description: 'Choose from business, business casual and more to match your industry.' },
  { icon: Check, title: 'Optimized for LinkedIn dimensions', description: 'Framed and sized to crop cleanly in the square profile photo area.' },
  { icon: Clock, title: 'Fast turnaround', description: 'No booking, travel or waiting on a photographer. Upload from home.' },
];

const transformation = [
  { title: 'Clean backgrounds', description: 'Distracting rooms, walls and outdoor clutter are replaced with polished, professional backdrops.' },
  { title: 'Proper framing', description: 'Head-and-shoulders composition with your face centered and sized well for a small profile circle.' },
  { title: 'Professional lighting', description: 'Even, flattering light replaces harsh shadows, glare and low-light selfie grain.' },
];

const personas = [
  { title: 'Job Seekers', description: 'Make a strong first impression with recruiters and hiring managers while you apply.' },
  { title: 'Sales Professionals', description: 'Build trust before the first call with a friendly, credible profile photo.' },
  { title: 'Executives', description: 'Project leadership and consistency across your profile, company site and press.' },
  { title: 'Consultants', description: 'Stand out to prospective clients who research you before reaching out.' },
];

const tools = [
  { href: '/tools/linkedin-photo-analyzer', title: 'LinkedIn Photo Analyzer', description: 'Check how your current profile photo holds up.' },
  { href: '/tools/headshot-cost-calculator', title: 'Headshot Cost Calculator', description: 'Compare the cost of AI and traditional headshots.' },
];

export default function LinkedInHeadshotsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'AI LinkedIn Headshots',
    description:
      'AI-generated professional LinkedIn profile photos created from your selfies.',
    brand: { '@type': 'Brand', name: siteConfig.name },
    category: 'Professional Headshots',
    url: `${siteConfig.url}/linkedin-headshots`,
    offers: {
      '@type': 'Offer',
      price: '9.90',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.url}/pricing`,
    },
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'LinkedIn Headshots', url: `${siteConfig.url}/linkedin-headshots` },
        ]}
      />
      <FAQSchema items={faqs} />
      <Header />

      {/* Hero */}
      <section className="bg-tp-paper px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wide text-tp-bronze-ink">
            LinkedIn Profile Photos
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-tp-ink sm:text-5xl">
            LinkedIn Headshots That Get You Noticed
          </h1>
          <p className="mt-6 text-lg text-tp-muted">
            Your LinkedIn photo is your first impression. Turn a few selfies into polished,
            professional headshots that help you look credible, confident and approachable.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/auth/register" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
              Get your LinkedIn headshot
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/samples" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              See sample photos
            </Link>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold text-tp-ink">
            Why Your LinkedIn Photo Matters
          </h2>
          <ul className="mt-8 space-y-4">
            {whyItMatters.map((item) => (
              <li key={item} className="flex gap-3 text-tp-muted">
                <Check className="mt-1 h-5 w-5 shrink-0 text-tp-bronze-ink" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-tp-paper px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold text-tp-ink">What You Get</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <f.icon className="h-6 w-6 text-tp-bronze-ink" />
                <h3 className="mt-4 text-lg font-semibold text-tp-ink">{f.title}</h3>
                <p className="mt-2 text-sm text-tp-muted">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold text-tp-ink">
            From Everyday Selfie to Professional Headshot
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-tp-muted">
            Here is the kind of transformation to expect.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {transformation.map((t, i) => (
              <div key={t.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-tp-button bg-tp-beige/40 text-sm font-semibold text-tp-bronze-ink">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-tp-ink">{t.title}</h3>
                <p className="mt-2 text-sm text-tp-muted">{t.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-tp-muted">
            <span className="flex items-center gap-2"><Upload className="h-4 w-4 text-tp-bronze-ink" /> Upload selfies</span>
            <span className="flex items-center gap-2"><Wand2 className="h-4 w-4 text-tp-bronze-ink" /> AI creates headshots</span>
            <span className="flex items-center gap-2"><Download className="h-4 w-4 text-tp-bronze-ink" /> Download and post</span>
          </div>
        </div>
      </section>

      {/* Who benefits */}
      <section className="bg-tp-paper px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold text-tp-ink">Who Benefits</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {personas.map((p) => (
              <div key={p.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <h3 className="text-lg font-semibold text-tp-ink">{p.title}</h3>
                <p className="mt-2 text-sm text-tp-muted">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-tp-card border border-tp-line bg-white p-8 text-center">
          <DollarSign className="mx-auto h-7 w-7 text-tp-bronze-ink" />
          <h2 className="mt-3 text-3xl font-bold text-tp-ink">Starting from $9.90</h2>
          <p className="mt-3 text-tp-muted">
            A fraction of the cost of a studio session, with no scheduling or travel.
          </p>
          <Link href="/pricing" className={`${buttonVariants({ variant: 'outline', size: 'md' })} mt-6`}>
            View pricing
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Related tools */}
      <section className="bg-tp-paper px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-tp-ink">Free Tools</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group rounded-tp-card border border-tp-line bg-white p-5 transition-colors hover:border-tp-bronze"
              >
                <h3 className="flex items-center justify-between font-semibold text-tp-ink">
                  {t.title}
                  <ArrowRight className="h-4 w-4 text-tp-bronze-ink transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="mt-1 text-sm text-tp-muted">{t.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold text-tp-ink">LinkedIn Headshot FAQ</h2>
          <div className="mt-10 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-tp-card border border-tp-line bg-white p-5">
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
          <h2 className="text-3xl font-bold text-white">Get Your LinkedIn Headshot Today</h2>
          <p className="mt-3 text-tp-beige">
            Upload a few selfies and show up with a profile photo you are proud of.
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
