import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { LinkedInProfileIllustration } from '@/components/marketing/illustrations';
import {
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
  Camera,
  Sparkles,
  Clock,
  DollarSign,
  ArrowRight,
  Check,
  Star,
  Upload,
  Download,
  Eye,
  Users,
  Briefcase,
  X,
} from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'AI LinkedIn Headshots: Professional Profile Photos' },
  description:
    'Get AI-generated LinkedIn headshots with clean backgrounds, natural expressions and professional lighting. A better LinkedIn profile photo without a photoshoot.',
  alternates: { canonical: '/linkedin-headshots' },
  openGraph: generateOGMetadata({
    title: 'LinkedIn Headshots | TailorPic',
    description: 'Professional AI-generated LinkedIn profile photos from your selfies.',
    path: '/linkedin-headshots',
  }),
  twitter: generateTwitterMetadata({
    title: 'LinkedIn Headshots | TailorPic',
    description: 'Professional AI-generated LinkedIn profile photos from your selfies.',
  }),
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
      'A square image of at least 400x400 pixels is the commonly recommended size. LinkedIn shows your photo in a circle, so keep your face centered with a little room around it. Check LinkedIn\'s help pages for its current file requirements.',
  },
  {
    question: 'Should I smile in my LinkedIn photo?',
    answer:
      'A natural, relaxed expression usually comes across as approachable. Choose whichever look fits your industry and personality, as long as it still looks like you.',
  },
  {
    question: 'What should I wear in my LinkedIn headshot?',
    answer:
      'Dress as you would for a client meeting or interview in your field. Solid, simple clothing keeps attention on your face. TailorPic offers several outfit options so you can match your industry.',
  },
  {
    question: 'How often should I update my LinkedIn photo?',
    answer:
      'Update it whenever your appearance changes noticeably, or when you change roles or move into a new industry. Your photo should look like the person someone will meet.',
  },
  {
    question: 'Will recruiters be able to tell my photo is AI-generated?',
    answer:
      'Your headshots are generated from your own selfies, so the goal is a polished photo that looks like you. We recommend choosing images that accurately represent your current appearance.',
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
      `Packages start from ${BASE_PRICE_DISPLAY}. Visit the pricing page for current plans and what each one includes.`,
  },
];

const whyItMatters = [
  'Your photo is often the first thing recruiters, clients and colleagues see next to your name.',
  'A profile with a clear, professional photo gives visitors a reason to stay and read the rest of it.',
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

const specs = [
  { label: 'Recommended minimum size', value: '400 x 400 px', note: 'A square image keeps your face sharp in every place LinkedIn shows it.' },
  { label: 'Aspect ratio', value: 'Square (1:1)', note: 'LinkedIn crops to a circle, so center your face with room around it.' },
  { label: 'File format', value: 'JPG or PNG', note: 'Both are widely supported. Check LinkedIn for its current limits.' },
  { label: 'Framing', value: 'Head and shoulders', note: 'Your face should fill most of the frame so it stays readable when small.' },
];

const practices = [
  { title: 'Keep it current', description: 'Use a photo that looks like you today so the person who meets you matches the profile.' },
  { title: 'Make your face the focus', description: 'Use close, head-and-shoulders framing. Tiny profile circles reward a face that fills the frame.' },
  { title: 'Choose a simple background', description: 'Neutral, uncluttered backdrops keep attention on you instead of the room behind you.' },
  { title: 'Dress for your industry', description: 'Match the attire your clients, colleagues or hiring managers would expect to see.' },
  { title: 'Look approachable', description: 'A natural, relaxed expression tends to feel more inviting than a stiff pose.' },
  { title: 'Be the only person in frame', description: 'Crops from group photos and cut-off shoulders can look unfinished.' },
];

const checklist = [
  'Your face is clearly visible, with eyes open and unobstructed',
  'Lighting is even, without harsh shadows or glare',
  'The background is simple and does not compete with you',
  'You are the only person in the photo',
  'Framing is head and shoulders, centered for a circular crop',
  'The image is sharp and at least 400x400 pixels',
  'Your attire suits your industry',
  'It looks like you right now',
];

const avoid = [
  'Cropped group photos or party snapshots',
  'Heavy filters, sunglasses or hats that hide your face',
  'Dark, grainy or low-resolution selfies',
  'Busy backgrounds or distracting objects',
  'Photos that are years out of date',
];

const scenarios = [
  { icon: Briefcase, label: 'Job seeker', situation: 'Updating a profile before applying for new roles, with only casual phone photos available.', outcome: 'A clean, professional headshot to use alongside the resume and cover letter.' },
  { icon: Users, label: 'Sales professional', situation: 'Reaching out to new prospects who will look at the profile before replying.', outcome: 'A friendly, credible photo that matches the tone of the outreach.' },
  { icon: Eye, label: 'Consultant', situation: 'Wanting a consistent look across LinkedIn, a personal site and proposals.', outcome: 'A set of matching headshots in a few styles to use across channels.' },
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
      price: '1.99',
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
          { name: 'LinkedIn Headshots', url: `${siteConfig.url}/linkedin-headshots` },
        ]}
      />
      <FAQSchema items={faqs} />
      <Header />

      {/* Hero */}
      <section className="bg-tp-paper px-4 py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <p className="mb-4 text-sm font-medium uppercase tracking-wide text-tp-bronze-ink">
              AI LinkedIn Headshots
            </p>
            <h1 className="font-display text-4xl font-normal tracking-tight text-tp-ink sm:text-5xl">
              Get More Profile Views With a LinkedIn Headshot That Stands Out
            </h1>
            <p className="mt-6 text-lg text-tp-muted">
              Stand out to recruiters, clients and connections. Turn a few selfies into
              polished, professional LinkedIn photos without booking a photographer.
            </p>
            <ul className="mt-6 space-y-2 text-left text-tp-muted">
              {['Look credible and approachable at a glance', 'Framed for the square LinkedIn photo crop', 'No studio, no scheduling, no travel'].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-tp-bronze-ink" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
                Get your LinkedIn headshot
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/samples" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
                See sample photos
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-sm" aria-hidden="true">
            <LinkedInProfileIllustration className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">
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

      {/* LinkedIn photo requirements & best practices */}
      <section className="bg-tp-paper px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">
            LinkedIn Profile Photo Requirements and Best Practices
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-tp-muted">
            Get the basics right so your photo looks sharp everywhere it appears.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {specs.map((sp) => (
              <div key={sp.label} className="rounded-tp-card border border-tp-line bg-white p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-tp-bronze-ink">{sp.label}</p>
                <p className="font-display font-normal mt-2 text-xl text-tp-ink">{sp.value}</p>
                <p className="mt-2 text-sm text-tp-muted">{sp.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {practices.map((pr) => (
              <div key={pr.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <h3 className="font-display font-normal text-lg text-tp-ink">{pr.title}</h3>
                <p className="mt-2 text-sm text-tp-muted">{pr.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">
            What Makes a Great LinkedIn Photo
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-5">
            <div className="rounded-tp-card border border-tp-line bg-white p-6 md:col-span-3">
              <h3 className="font-display font-normal text-lg text-tp-ink">Checklist</h3>
              <ul className="mt-4 space-y-3">
                {checklist.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-tp-muted">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-tp-bronze-ink" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-tp-card border border-tp-line bg-tp-paper p-6 md:col-span-2">
              <h3 className="font-display font-normal text-lg text-tp-ink">Best to avoid</h3>
              <ul className="mt-4 space-y-3">
                {avoid.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-tp-muted">
                    <X className="mt-0.5 h-5 w-5 shrink-0 text-tp-bronze-ink" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-tp-paper px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">What You Get</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <f.icon className="h-6 w-6 text-tp-bronze-ink" />
                <h3 className="font-display font-normal mt-4 text-lg text-tp-ink">{f.title}</h3>
                <p className="mt-2 text-sm text-tp-muted">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">
            From Everyday Selfie to Professional Headshot
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-tp-muted">
            Here is the kind of transformation to expect.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <figure>
              <div className="flex aspect-[4/3] items-center justify-center rounded-tp-card border border-tp-line bg-gradient-to-br from-tp-line via-tp-paper to-tp-beige">
                <Camera className="h-10 w-10 text-tp-muted" aria-hidden="true" />
              </div>
              <figcaption className="mt-3 text-center text-sm text-tp-muted">
                <span className="font-semibold text-tp-ink">Before:</span> everyday selfie
              </figcaption>
            </figure>
            <figure>
              <div className="flex aspect-[4/3] items-center justify-center rounded-tp-card border border-tp-line bg-gradient-to-br from-tp-bronze via-tp-beige to-tp-paper">
                <Sparkles className="h-10 w-10 text-tp-bronze-ink" aria-hidden="true" />
              </div>
              <figcaption className="mt-3 text-center text-sm text-tp-muted">
                <span className="font-semibold text-tp-ink">After:</span> professional headshot
              </figcaption>
            </figure>
          </div>
          <p className="mt-3 text-center text-xs text-tp-muted">
            Illustrations only — not actual results. <Link href="/samples" className="underline hover:text-tp-bronze-ink">See real style examples</Link>.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {transformation.map((t, i) => (
              <div key={t.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-tp-button bg-tp-beige/40 text-sm font-semibold text-tp-bronze-ink">
                  {i + 1}
                </div>
                <h3 className="font-display font-normal mt-4 text-lg text-tp-ink">{t.title}</h3>
                <p className="mt-2 text-sm text-tp-muted">{t.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-tp-muted">
            <span className="flex items-center gap-2"><Upload className="h-4 w-4 text-tp-bronze-ink" /> Upload selfies</span>
            <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-tp-bronze-ink" /> AI creates headshots</span>
            <span className="flex items-center gap-2"><Download className="h-4 w-4 text-tp-bronze-ink" /> Download and post</span>
          </div>
        </div>
      </section>

      {/* Who benefits */}
      <section className="bg-tp-paper px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">Who Benefits</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {personas.map((p) => (
              <div key={p.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <h3 className="font-display font-normal text-lg text-tp-ink">{p.title}</h3>
                <p className="mt-2 text-sm text-tp-muted">{p.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-tp-muted">
            Also available: <Link href="/students" className="font-medium text-tp-bronze-ink underline underline-offset-2 hover:text-tp-ink">student headshots</Link>,{' '}
            <Link href="/team-headshots" className="font-medium text-tp-bronze-ink underline underline-offset-2 hover:text-tp-ink">team headshots</Link>, and more on our{' '}
            <Link href="/use-cases" className="font-medium text-tp-bronze-ink underline underline-offset-2 hover:text-tp-ink">use cases</Link> page.
          </p>
        </div>
      </section>

      {/* Representative examples */}
      <section className="bg-tp-paper px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">
            How People Use LinkedIn Headshots
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-tp-muted">
            Representative examples of common situations, not customer testimonials.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {scenarios.map((sc) => (
              <div key={sc.label} className="rounded-tp-card border border-tp-line bg-white p-6">
                <span className="inline-block rounded-tp-button bg-tp-beige/40 px-3 py-1 text-xs font-medium uppercase tracking-wide text-tp-bronze-ink">
                  Representative example
                </span>
                <div className="mt-4 flex items-center gap-3">
                  <sc.icon className="h-6 w-6 text-tp-bronze-ink" />
                  <h3 className="font-display font-normal text-lg text-tp-ink">{sc.label}</h3>
                </div>
                <p className="mt-3 text-sm text-tp-muted"><span className="font-semibold text-tp-ink">Situation:</span> {sc.situation}</p>
                <p className="mt-2 text-sm text-tp-muted"><span className="font-semibold text-tp-ink">Goal:</span> {sc.outcome}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
              Create your LinkedIn headshot
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-tp-card border border-tp-line bg-white p-8 text-center">
          <DollarSign className="mx-auto h-7 w-7 text-tp-bronze-ink" />
          <h2 className="font-display mt-3 text-3xl font-normal text-tp-ink">Starting from {BASE_PRICE_DISPLAY}</h2>
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
          <h2 className="font-display text-center text-2xl font-normal text-tp-ink">Free Tools</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group rounded-tp-card border border-tp-line bg-white p-5 transition-colors hover:border-tp-bronze"
              >
                <h3 className="font-display font-normal flex items-center justify-between text-tp-ink">
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
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink">LinkedIn Headshot FAQ</h2>
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
          <h2 className="font-display text-3xl font-normal text-white">Get Your LinkedIn Headshot Today</h2>
          <p className="mt-3 text-tp-beige">
            Upload a few selfies and show up with a profile photo you are proud of.
          </p>
          <Link
            href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
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
