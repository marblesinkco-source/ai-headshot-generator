import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Building2, Camera, Check, Download, GraduationCap, Layers, Maximize2, Printer, Sparkles, Upload, UserCheck, ZoomIn } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const title = 'AI Image Upscaler — High-Resolution Professional Photos | TailorPic';
const description =
  'See how TailorPic\'s AI creates sharp, high-resolution headshots suitable for web, print, résumés and company materials.';
const path = '/editor/image-upscaler';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path: path, type: 'default' }),
  twitter: generateTwitterMetadata({ title, description, type: 'default' }),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AI Image Upscaler',
  description,
  url: `${siteConfig.url}${path}`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
};

const steps = [
  { icon: Upload, title: 'Upload your photos', body: 'Start with ordinary selfies. Low-resolution originals are fine.' },
  { icon: Sparkles, title: 'AI generates in high resolution', body: 'Your headshots are created as detailed, high-resolution images, not stretched-up copies.' },
  { icon: Check, title: 'Download and use anywhere', body: 'Use your headshots for LinkedIn, websites, email signatures, slides and print.' },
];

const features = [
  { icon: Maximize2, title: 'High-resolution output', body: 'Headshots sized for large web displays and print use.' },
  { icon: ZoomIn, title: 'Detail that holds up', body: 'Eyes, hair and fabric stay sharp when zoomed in or cropped.' },
  { icon: Layers, title: 'No stretched pixels', body: 'Detail is generated natively rather than enlarged from a small file.' },
  { icon: Printer, title: 'Print-ready quality', body: 'Suitable for business cards, brochures, badges and conference programs.' },
  { icon: Download, title: 'Easy downloads', body: 'Get your finished headshots ready to use right away.' },
  { icon: Camera, title: 'Flexible cropping', body: 'Enough resolution to crop for square, circular and wide layouts.' },
];

const useCases = [
  { icon: GraduationCap, title: 'Speakers and authors', body: 'Supply event organizers with a sharp photo for programs and websites.' },
  { icon: Building2, title: 'Companies', body: 'Use consistent high-quality portraits on team pages and print collateral.' },
  { icon: Briefcase, title: 'Professionals', body: 'Keep your photo crisp on LinkedIn, email signatures and proposals.' },
  { icon: UserCheck, title: 'Job seekers', body: 'Avoid blurry thumbnails on résumés and application portals.' },
];

const faqs = [
  { q: 'Is this the same as enlarging an image?', a: 'No. Enlarging stretches pixels. TailorPic\'s AI generates your headshots at high resolution from the start.' },
  { q: 'Can I use the headshots in print?', a: 'Yes. The resolution is suitable for typical print uses such as business cards and brochures.' },
  { q: 'Do I need high-resolution uploads?', a: 'No. Clear, well-lit selfies are enough.' },
  { q: 'Is this a standalone upscaler?', a: 'No. This page describes how our AI headshot service delivers high-resolution results. It does not upscale arbitrary images.' },
];

export default function ImageUpscalerPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'AI Photo Editor', url: `${siteConfig.url}/editor` },
          { name: 'AI Image Upscaler', url: `${siteConfig.url}${path}` },
        ]}
      />
      <FAQSchema items={faqs} />
      <Header />

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">Free tool</p>
          <h1 className="mt-3 text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-5xl">
            AI Image Upscaler for High-Resolution Headshots
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Small, pixelated profile photos look unprofessional. TailorPic&apos;s AI generates headshots at high resolution, so they stay sharp on screens, in print and across your brand materials.
          </p>
          <Link href="/auth/register" className={buttonVariants({ size: 'lg', className: 'mt-8' })}>
            Try TailorPic AI Headshots
          </Link>
        </div>
      </section>

      <section className="border-t border-tp-line bg-tp-paper">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-tp-ink sm:text-3xl">How it works</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-beige text-tp-bronze-ink">
                    <s.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-tp-bronze-ink">Step {i + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-tp-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-tp-ink sm:text-3xl">What the AI handles for you</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-tp-card border border-tp-line bg-white p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-beige text-tp-bronze-ink">
                <f.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-tp-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-tp-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-tp-line bg-tp-paper">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-tp-ink sm:text-3xl">Who it&apos;s for</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((u) => (
              <div key={u.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <u.icon className="h-6 w-6 text-tp-bronze-ink" aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold text-tp-ink">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-tp-ink sm:text-3xl">Frequently asked questions</h2>
        <div className="mt-8 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-tp-card border border-tp-line bg-white p-5">
              <summary className="cursor-pointer font-semibold text-tp-ink">{f.q}</summary>
              <p className="mt-3 text-sm leading-relaxed text-tp-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-t border-tp-line bg-tp-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-tp-ink sm:text-3xl">
            Skip the editing — get AI headshots
          </h2>
          <p className="mt-3 text-tp-muted">
            Upload a few selfies and get studio-quality professional headshots in hours, from $9.90.
          </p>
          <Link href="/auth/register" className={buttonVariants({ size: 'lg', className: 'mt-6' })}>
            Get AI Headshots
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
