import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { UploadCloud, Check, Sun, Image as ImageIcon, Shirt, ScanLine, Crop } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { ResumePhotoCheckerDemo } from '@/components/tools/tool-demos';

const title = 'Free Resume Photo Checker: Is Your Photo Professional?';
const description = "Upload your photo to check if it's professional enough for your resume. Free checklist for lighting, background, attire, resolution and framing.";
const path = '/tools/resume-photo-checker';
const ctaHref = '/auth/register?redirect=/headshots';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title: title, description: description, path: '/tools/resume-photo-checker' }),
  twitter: generateTwitterMetadata({ title: title, description: description }),
};

const checks = [
  { icon: Sun, title: 'Proper lighting', desc: 'Even, soft light on your face with no harsh shadows.' },
  { icon: ImageIcon, title: 'Neutral background', desc: 'A clean, uncluttered backdrop that keeps focus on you.' },
  { icon: Shirt, title: 'Professional attire', desc: 'Clothing that fits your industry and role.' },
  { icon: ScanLine, title: 'Good resolution', desc: 'Sharp, high-resolution image with no blur or pixelation.' },
  { icon: Crop, title: 'Correct framing', desc: 'Head and shoulders centered, eyes near the upper third.' },
];

const faqs: { q: string; a: string }[] = [{"q": "Should I put a photo on my resume?", "a": "It depends on your country and industry. In the US and UK photos are usually omitted, while much of Europe, Asia and Latin America expects one."}, {"q": "What makes a resume photo professional?", "a": "Good lighting, a neutral background, appropriate attire, a sharp high-resolution image and head-and-shoulders framing."}, {"q": "Can I fix a photo that fails the checklist?", "a": "Yes. TailorPic can turn everyday selfies into a polished professional headshot."}];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: "Resume Photo Checker",
      description,
      url: `${siteConfig.url}${path}`,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

function UploadZone() {
  return (
    <Link
      href={ctaHref}
      aria-label="Upload your photo"
      className="group flex flex-col items-center justify-center gap-4 rounded-tp-card border-2 border-dashed border-tp-beige bg-white px-6 py-14 text-center transition-colors hover:border-tp-bronze hover:bg-tp-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-tp-beige/40 text-tp-bronze-ink">
        <UploadCloud className="h-7 w-7" aria-hidden="true" />
      </span>
      <span className="text-base font-semibold text-tp-ink">Drag &amp; drop your photo here</span>
      <span className="text-sm text-tp-muted">JPG, PNG or WEBP up to 10MB</span>
      <span className={cn(buttonVariants({ variant: 'primary', size: 'md' }))}>Upload your photo</span>
    </Link>
  );
}

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen bg-tp-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: "Resume Photo Checker", url: `${siteConfig.url}${path}` },
        ]}
      />
      <Header />

      <section className="px-4 pb-10 pt-16 sm:px-6 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">Free tool</p>
          <h1 className="font-display text-4xl leading-tight text-tp-ink sm:text-5xl md:text-6xl">Free Resume Photo Checker</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">Upload your photo to check if it's professional enough for your resume.</p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl">
          <UploadZone />
        </div>
      </section>

      <ResumePhotoCheckerDemo />

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display text-3xl text-tp-ink sm:text-4xl">What we check</h2>
          <ul className="mt-8 space-y-3">
            {checks.map((c) => (
              <li key={c.title} className="flex items-start gap-4 rounded-tp-card border border-tp-line bg-white p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-tp-button bg-tp-beige/40 text-tp-bronze-ink"><c.icon className="h-5 w-5" aria-hidden="true" /></span>
                <div className="flex-1">
                  <p className="font-semibold text-tp-ink">{c.title}</p>
                  <p className="mt-1 text-sm text-tp-muted">{c.desc}</p>
                </div>
                <Check className="mt-1 h-5 w-5 shrink-0 text-tp-bronze-ink" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display text-3xl text-tp-ink sm:text-4xl">Frequently asked questions</h2>
          <div className="mt-8 divide-y divide-tp-line rounded-tp-card border border-tp-line bg-white">
            {faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-tp-ink">
                  {f.q}
                  <span className="text-tp-bronze-ink transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-tp-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-6 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-tp-dialog bg-tp-ink px-6 py-12 text-center sm:px-10">
          <h2 className="font-display text-3xl text-tp-paper sm:text-4xl">Skip the guesswork</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-tp-beige sm:text-base">Get a headshot that passes every check, backed by our satisfaction guarantee.</p>
          <Link href={ctaHref} className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'mt-7 bg-tp-bronze text-tp-black hover:bg-tp-beige')}>
            Get a guaranteed professional headshot with TailorPic →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
