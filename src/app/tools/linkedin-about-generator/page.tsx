import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { DataPrivacyStrip } from '@/components/marketing/data-privacy-strip';
import { buttonVariants } from '@/components/ui/button';
import { LinkedInAboutGenerator } from '@/components/tools/linkedin-about-generator';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { cn } from '@/lib/utils';

const PAGE_TITLE = 'Free LinkedIn About Section Generator';
const PAGE_DESCRIPTION =
  'Write a LinkedIn About section in minutes. Enter your job title, industry, skills and tone, then choose from four template-based drafts. Free, no sign-up.';
const PATH = '/tools/linkedin-about-generator';

export const metadata: Metadata = {
  title: { absolute: `${PAGE_TITLE} | ${siteConfig.name}` },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: generateOGMetadata({
    title: `${PAGE_TITLE} | ${siteConfig.name}`,
    description: PAGE_DESCRIPTION,
    type: 'default',
    path: PATH,
  }),
  twitter: generateTwitterMetadata({
    title: `${PAGE_TITLE} | ${siteConfig.name}`,
    description: PAGE_DESCRIPTION,
    type: 'default',
  }),
};

const TIPS = [
  {
    title: 'Lead with what matters to the reader',
    body: 'Only the first few lines show before the "see more" link. Put your role, your focus, and what you want people to know up front.',
  },
  {
    title: 'Be specific, not generic',
    body: 'Replace broad claims with a real project, result, or example from your own work. Use the generated draft as a frame and add your details.',
  },
  {
    title: 'Write in the first person',
    body: 'An About section reads best as you speaking directly to the reader. Keep sentences short and avoid buzzwords you would not say out loud.',
  },
  {
    title: 'End with a clear next step',
    body: 'Tell visitors how to reach you or what kind of conversations you welcome. Then make sure your profile photo looks as professional as your words.',
  },
];

export default function LinkedInAboutGeneratorPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Tools', url: `${siteConfig.url}/tools` },
          { name: 'LinkedIn About Generator', url: `${siteConfig.url}${PATH}` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-xs font-semibold text-tp-bronze">
            Free Tool
          </div>
          <h1 className="font-display font-normal text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {PAGE_TITLE}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
            Tell us about your role and skills, pick a tone, and get a draft About section you can edit and make your
            own. It runs entirely in your browser.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="bg-white py-16 sm:py-20">
        <LinkedInAboutGenerator />
      </section>

      {/* Tips */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">
            Tips for a stronger About section
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {TIPS.map((tip) => (
              <div key={tip.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <h3 className="text-base font-semibold text-tp-ink">{tip.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{tip.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-tp-black py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display font-normal text-3xl text-white sm:text-4xl">
            Complete your professional presence with AI headshots
          </h2>
          <p className="mt-4 text-tp-beige/60">
            Your About section tells your story. A clear, professional profile photo helps it land.
          </p>
          <div className="mt-8">
            <Link
              href="/headshots"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-tp-bronze text-tp-black shadow-none hover:bg-tp-bronze/90',
              )}
            >
              Create your AI headshots <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <DataPrivacyStrip />
        </div>
      </div>

      <Footer />
    </main>
  );
}
