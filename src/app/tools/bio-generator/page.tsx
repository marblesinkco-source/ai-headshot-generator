import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { User, Briefcase, FileText, Sparkles } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'Free Professional Bio Generator | TailorPic';
const description =
  'Generate a professional bio in seconds. Enter your role, skills and experience, pick a tone and length, and copy a polished first or third person bio. Everything runs in your browser.';
const path = '/tools/bio-generator';
const ctaHref = '/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path }),
  twitter: generateTwitterMetadata({ title, description }),
};

const BioGenerator = dynamic(() => import('@/components/tools/bio-generator'), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto h-80 w-full max-w-3xl animate-pulse rounded-tp-card border border-tp-line bg-white"
      aria-label="Loading bio generator"
    />
  ),
});

const tips = [
  {
    icon: User,
    title: 'Match the point of view',
    body: 'First person feels natural on LinkedIn and personal sites. Third person suits speaker pages, press kits, company team pages and conference programs.',
  },
  {
    icon: Briefcase,
    title: 'Lead with what you do',
    body: 'Open with your role and the kind of work you do. Readers decide in a sentence or two whether to keep reading, so put the most useful facts first.',
  },
  {
    icon: FileText,
    title: 'Pick the right length',
    body: 'Keep it short for social profiles and event listings, medium for team pages, and use the long version where readers expect the full story.',
  },
  {
    icon: Sparkles,
    title: 'Add one real detail',
    body: 'The draft is a starting point. Swap in a specific project, result or story from your own work so the bio sounds like you and not a template.',
  },
];

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen bg-tp-paper">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: 'Bio Generator', url: `${siteConfig.url}${path}` },
        ]}
      />
      <Header />

      <section className="px-4 pb-10 pt-16 sm:px-6 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">Free tool</p>
          <h1 className="font-display font-normal text-4xl leading-tight text-tp-ink sm:text-5xl md:text-6xl">
            Free Professional Bio Generator
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">
            Turn your job title, skills and experience into a clean professional bio. Choose a tone, a length and first or third person, then copy it. Everything runs in your browser, so nothing you type is uploaded.
          </p>
        </div>
        <div className="mt-10">
          <BioGenerator />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">Bio writing tips</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tips.map((tip) => (
              <div key={tip.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-tp-button bg-tp-beige/40 text-tp-bronze-ink">
                  <tip.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-xl font-normal text-tp-ink">{tip.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{tip.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-6 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-tp-dialog bg-tp-ink px-6 py-12 text-center sm:px-10">
          <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">Want a headshot worth showing off?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-tp-beige sm:text-base">
            TailorPic turns your selfies into studio-style AI headshots. Plans start from {BASE_PRICE_DISPLAY}.
          </p>
          <Link href={ctaHref} className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'mt-7 bg-tp-bronze text-tp-black hover:bg-tp-beige')}>
            Try TailorPic →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
