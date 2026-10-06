import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import {
  ArrowRight,
  Mail,
  Palette,
  Type,
  Download,
  DollarSign,
  Clock,
  Image,
  FolderOpen,
  Package,
  Users,
} from 'lucide-react';

const PAGE_TITLE = 'Press & Media | TailorPic';
const PAGE_DESC =
  'Press resources, brand assets, and media contact information for TailorPic — the AI-powered professional photography platform.';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESC,
  alternates: { canonical: '/press' },
  openGraph: generateOGMetadata({
    title: 'Press & Media',
    description: PAGE_DESC,
    subtitle: 'Press resources and brand assets',
    path: '/press',
  }),
  twitter: generateTwitterMetadata({
    title: 'Press & Media | TailorPic',
    description: PAGE_DESC,
  }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const brandColors = [
  { name: 'Black', token: 'tp-black', hex: '#0D0D0D', light: false },
  { name: 'Ink', token: 'tp-ink', hex: '#1A1A1A', light: false },
  { name: 'Bronze', token: 'tp-bronze', hex: '#C4956A', light: false },
  { name: 'Paper', token: 'tp-paper', hex: '#F5F0EB', light: true },
];

const keyFacts = [
  {
    icon: DollarSign,
    value: 'From $1.99',
    label: 'Starting price per photo',
  },
  {
    icon: Clock,
    value: 'Under 2 hours',
    label: 'Average delivery time',
  },
  {
    icon: Image,
    value: 'Up to 160',
    label: 'Photos per package',
  },
  {
    icon: FolderOpen,
    value: '12',
    label: 'Photo categories available',
  },
  {
    icon: Users,
    value: '$29/person',
    label: 'Team pricing (16–50 people)',
  },
  {
    icon: Package,
    value: '6',
    label: 'Headshot packages',
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PressPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Press & Media', url: `${siteConfig.url}/press` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="bg-tp-black py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-7">
          <span className="inline-block rounded-tp-button border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-xs font-medium tracking-wide text-tp-bronze">
            Press &amp; Media
          </span>
          <h1 className="mt-6 font-display text-4xl font-normal leading-tight text-tp-paper sm:text-5xl">
            TailorPic in the News
          </h1>
          <p className="mt-6 text-base leading-relaxed text-tp-beige/70 sm:text-lg">
            Everything you need for press coverage and media inquiries — company
            background, brand assets, product facts, and contact information.
          </p>
        </div>
      </section>

      {/* About TailorPic */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-7">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink sm:text-4xl">
            About TailorPic
          </h2>
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-tp-muted sm:text-base">
            <p>
              TailorPic is an AI-powered professional photography platform that
              transforms everyday selfies into studio-quality professional
              headshots. The platform makes professional-grade photography
              accessible and affordable, removing the need for costly studio
              sessions, professional lighting, and scheduling logistics.
            </p>
            <p>
              Users upload a handful of casual photos, and TailorPic generates
              polished, business-ready headshots across a range of styles and
              categories — from corporate portraits and LinkedIn photos to
              creative and industry-specific looks. Results are delivered in
              under two hours, with packages ranging from a single photo to sets
              of up to 160 images.
            </p>
            <p>
              TailorPic serves individuals updating their professional profiles,
              job seekers preparing applications, and teams that need consistent,
              high-quality headshots across their organization. The platform
              offers dedicated team pricing and workflows for businesses of all
              sizes.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="bg-tp-beige py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink sm:text-4xl">
            Brand Assets
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-tp-muted sm:text-base">
            Guidelines and resources for using the TailorPic brand in your
            coverage.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Logo */}
            <div className="rounded-tp-card border border-tp-line bg-white p-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-black">
                <Download className="h-5 w-5 text-tp-bronze" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-normal text-tp-ink">
                Logo Files
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                For logo files in various formats (SVG, PNG, dark/light
                variants), please contact us directly. We will provide a
                complete media kit.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-tp-bronze hover:underline"
              >
                Request logo files
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            {/* Colors */}
            <div className="rounded-tp-card border border-tp-line bg-white p-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-black">
                <Palette className="h-5 w-5 text-tp-bronze" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-normal text-tp-ink">
                Brand Colors
              </h3>
              <div className="mt-4 space-y-2.5">
                {brandColors.map((c) => (
                  <div key={c.token} className="flex items-center gap-3">
                    <span
                      className="inline-block h-8 w-8 flex-shrink-0 rounded-lg border border-tp-line"
                      style={{ backgroundColor: c.hex }}
                      aria-hidden="true"
                    />
                    <div className="text-sm">
                      <span className="font-medium text-tp-ink">{c.name}</span>
                      <span className="ml-2 text-tp-muted">{c.hex}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="rounded-tp-card border border-tp-line bg-white p-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-black">
                <Type className="h-5 w-5 text-tp-bronze" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-normal text-tp-ink">
                Typography
              </h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="font-display text-lg font-normal text-tp-ink">
                    Instrument Serif
                  </p>
                  <p className="text-sm text-tp-muted">
                    Used for headings and display text
                  </p>
                </div>
                <div>
                  <p className="text-lg font-medium text-tp-ink">Manrope</p>
                  <p className="text-sm text-tp-muted">
                    Used for body text, UI elements, and navigation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink sm:text-4xl">
            Key Facts
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-tp-muted sm:text-base">
            Quick-reference product facts for your coverage.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {keyFacts.map((f) => (
              <div
                key={f.label}
                className="rounded-tp-card border border-tp-line bg-white p-7 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-black">
                  <f.icon className="h-5 w-5 text-tp-bronze" aria-hidden="true" />
                </div>
                <p className="font-display text-2xl font-normal text-tp-ink">
                  {f.value}
                </p>
                <p className="mt-1 text-sm text-tp-muted">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="bg-tp-beige py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-7">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-tp-button bg-tp-black">
            <Mail className="h-6 w-6 text-tp-bronze" aria-hidden="true" />
          </div>
          <h2 className="font-display text-3xl font-normal text-tp-ink sm:text-4xl">
            Media Contact
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-tp-muted sm:text-base">
            For press inquiries, interview requests, or additional information,
            reach out to our team. We aim to respond to all media inquiries
            within one business day.
          </p>
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="mt-6 inline-flex items-center gap-2 text-lg font-medium text-tp-bronze hover:underline"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            {siteConfig.supportEmail}
          </a>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-tp-ink hover:text-tp-bronze"
            >
              Or use our contact form
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-tp-black py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-7">
          <h2 className="font-display text-3xl font-normal text-tp-paper sm:text-4xl">
            Want to Learn More?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-tp-beige/70">
            Explore our story, our technology, and what makes TailorPic
            different.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/why-tailorpic"
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Why TailorPic
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/technology"
              className="inline-flex items-center gap-2 rounded-tp-button border border-tp-beige/20 px-7 py-3.5 text-sm font-semibold text-tp-paper transition-all hover:border-tp-beige/40 hover:bg-tp-beige/5"
            >
              Our Technology
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
