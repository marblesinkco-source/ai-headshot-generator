import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import {
  Shirt,
  Palette,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Briefcase,
  Stethoscope,
  Laptop,
  Building2,
  Home,
  GraduationCap,
  TrendingUp,
  Scale,
  ArrowRight,
} from 'lucide-react';

const PAGE_TITLE = 'What to Wear for a Professional Headshot';
const PAGE_DESCRIPTION =
  'A practical guide to choosing what to wear for a professional headshot: universal rules, industry-specific outfit ideas, flattering colors, and common mistakes to avoid.';

export const metadata: Metadata = {
  title: { absolute: `${PAGE_TITLE} | ${siteConfig.name}` },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/what-to-wear' },
  openGraph: generateOGMetadata({
    title: `${PAGE_TITLE} | ${siteConfig.name}`,
    description: PAGE_DESCRIPTION,
    path: '/what-to-wear',
  }),
  twitter: generateTwitterMetadata({
    title: `${PAGE_TITLE} | ${siteConfig.name}`,
    description: PAGE_DESCRIPTION,
  }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type IconType = React.ComponentType<{ className?: string }>;

const generalRules = [
  {
    title: 'Choose solid colors',
    text: 'Plain fabrics keep attention on your face. Solids also look cleaner in a small profile photo or a LinkedIn thumbnail.',
  },
  {
    title: 'Avoid busy patterns',
    text: 'Tight stripes, checks, and small prints can look distracting on camera. Subtle textures such as a fine knit work better.',
  },
  {
    title: 'Prioritize fit',
    text: 'Clothes that fit your shoulders and chest without pulling or bunching look sharper than anything expensive that fits poorly.',
  },
  {
    title: 'Mind the neckline',
    text: 'Your headshot is cropped around the chest, so the collar or neckline frames your face. Pick one that sits cleanly and that you are comfortable in.',
  },
  {
    title: 'Dress for your audience',
    text: 'Think about who will see the photo. Match the formality of your industry, then lean slightly more polished than your everyday look.',
  },
  {
    title: 'Press and check the details',
    text: 'Steam out wrinkles and remove lint. Keep jewelry and accessories simple so they do not compete with your face.',
  },
];

const industries: {
  name: string;
  icon: IconType;
  wear: string[];
  skip: string;
  links: { label: string; href: string }[];
}[] = [
  {
    name: 'Finance and Legal',
    icon: Scale,
    wear: [
      'Tailored suit jacket in navy, charcoal, or black',
      'Crisp collared shirt or a simple blouse',
      'Tie optional, kept in a solid or very subtle pattern',
    ],
    skip: 'Casual knits, loud accessories, and anything that looks rumpled.',
    links: [
      { label: 'Lawyers', href: '/industries/lawyers' },
      { label: 'Financial advisors', href: '/industries/financial-advisors' },
      { label: 'Accountants', href: '/industries/accountants' },
    ],
  },
  {
    name: 'Tech and Startup',
    icon: Laptop,
    wear: [
      'Well-fitted crew neck, henley, or casual button-up',
      'Unstructured blazer or overshirt if you want a bit more polish',
      'Clean, neutral colors without large logos',
    ],
    skip: 'Graphic tees with big prints and hoodies with visible branding.',
    links: [
      { label: 'Engineers', href: '/industries/engineers' },
      { label: 'Data scientists', href: '/industries/data-scientists' },
    ],
  },
  {
    name: 'Healthcare',
    icon: Stethoscope,
    wear: [
      'Clean white coat or neat scrubs, if that is how patients see you',
      'Otherwise a collared shirt or simple blouse in a calm color',
      'Minimal jewelry and a tidy, practical look',
    ],
    skip: 'Wrinkled coats, visible stains, and cluttered pockets or lanyards.',
    links: [
      { label: 'Doctors', href: '/industries/doctors' },
      { label: 'Nurses', href: '/industries/nurses' },
    ],
  },
  {
    name: 'Creative and Design',
    icon: Palette,
    wear: [
      'A distinctive but simple piece, such as a textured jacket or one bold solid color',
      'Clean lines that reflect your personal style',
      'Let one element do the talking and keep the rest quiet',
    ],
    skip: 'Stacking several statement pieces, which makes the photo feel crowded.',
    links: [
      { label: 'Graphic designers', href: '/industries/graphic-designers' },
      { label: 'Photographers', href: '/industries/photographers' },
    ],
  },
  {
    name: 'Real Estate',
    icon: Home,
    wear: [
      'Blazer over a solid top in a warm, approachable color',
      'Business casual that suits your local market',
      'Simple accessories that feel friendly, not flashy',
    ],
    skip: 'Overly formal looks that feel distant, or very casual clothes that undersell trust.',
    links: [
      { label: 'Real estate agents', href: '/industries/real-estate' },
      { label: 'Brokers', href: '/industries/real-estate-brokers' },
    ],
  },
  {
    name: 'Education',
    icon: GraduationCap,
    wear: [
      'Cardigan, sweater, or blazer over a collared shirt or simple top',
      'Soft, approachable colors',
      'Smart casual that looks comfortable and credible',
    ],
    skip: 'Novelty prints and clothing with text or slogans.',
    links: [
      { label: 'Teachers', href: '/industries/teachers' },
      { label: 'Professors', href: '/industries/professors' },
    ],
  },
  {
    name: 'Corporate and Executive',
    icon: Building2,
    wear: [
      'Structured blazer or suit in a deep neutral',
      'Clean shirt or blouse with a collar or a refined neckline',
      'Minimal jewelry, and a watch or accessory only if it is understated',
    ],
    skip: 'Overdone formality that feels stiff, and any clothing with company logos.',
    links: [
      { label: 'Executives', href: '/industries/executives' },
      { label: 'HR professionals', href: '/industries/hr-professionals' },
    ],
  },
  {
    name: 'Sales and Consulting',
    icon: TrendingUp,
    wear: [
      'Blazer with an open collar, or a shirt and jacket combination',
      'Confident but friendly colors such as navy, blue, or deep green',
      'Polished business casual that feels approachable',
    ],
    skip: 'Ties that are too loud, and looks so casual that they weaken credibility.',
    links: [
      { label: 'Sales professionals', href: '/industries/sales-professionals' },
      { label: 'Consultants', href: '/industries/consultants' },
    ],
  },
];

const goodColors = [
  { name: 'Navy', hex: '#1F2A44', note: 'Reliable and professional, flatters most skin tones.' },
  { name: 'Charcoal', hex: '#3A3D42', note: 'A softer alternative to black with plenty of depth.' },
  { name: 'Deep blue', hex: '#2F5D8C', note: 'Approachable and trustworthy, and it reads well on camera.' },
  { name: 'Forest green', hex: '#2E5E4E', note: 'Rich and calm, works well against warm skin tones.' },
  { name: 'Burgundy', hex: '#6D2E3D', note: 'Adds warmth and confidence without being loud.' },
  { name: 'Soft cream', hex: '#EFE6D8', note: 'Clean and light, best with a darker jacket over it.' },
];

const avoidColors = [
  { name: 'Neon shades', hex: '#B6FF2E', note: 'Bright colors can reflect onto skin and pull attention from your face.' },
  { name: 'Pure white', hex: '#FFFFFF', note: 'Can look harsh or wash you out. Off-white is usually kinder.' },
  { name: 'Skin-tone beige', hex: '#D9B99B', note: 'Can blend into your skin and make the neckline disappear.' },
  { name: 'Very bright red', hex: '#E01E2B', note: 'Strong and distracting, especially in a small thumbnail.' },
];

const mistakes = [
  { title: 'Large logos and slogans', text: 'Text on clothing pulls the eye away from your face and can date the photo.' },
  { title: 'Tight stripes, checks, and small prints', text: 'Fine repeating patterns can look busy or shimmer on camera.' },
  { title: 'Wrinkled or ill-fitting clothes', text: 'Creases, pulling buttons, and baggy shoulders are easy to notice in a close crop.' },
  { title: 'Chunky or noisy accessories', text: 'Large earrings, layered necklaces, and oversized glasses frames can dominate a small photo.' },
  { title: 'Outfits you have never worn', text: 'If something feels uncomfortable, it shows in your posture and expression. Pick clothes you feel like yourself in.' },
  { title: 'Wearing the same outfit in every shot', text: 'For AI headshots, a few different tops across your upload photos give the model more variety to work with.' },
];

/* ------------------------------------------------------------------ */
/*  JSON-LD                                                            */
/* ------------------------------------------------------------------ */

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  url: `${siteConfig.url}/what-to-wear`,
  inLanguage: 'en-US',
  author: { '@type': 'Organization', name: siteConfig.name },
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/brand/tailorpic/logo/tailorpic-horizontal-bronze.svg`,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${siteConfig.url}/what-to-wear`,
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function SectionHeading({
  icon: Icon,
  title,
  intro,
}: {
  icon: IconType;
  title: string;
  intro: string;
}) {
  return (
    <div className="mb-10 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-bronze/15">
        <Icon className="h-6 w-6 text-tp-bronze-ink" aria-hidden="true" />
      </div>
      <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-tp-muted">{intro}</p>
    </div>
  );
}

function Swatch({ hex, name }: { hex: string; name: string }) {
  return (
    <span
      aria-hidden="true"
      title={name}
      className="inline-block h-10 w-10 shrink-0 rounded-full border border-tp-line"
      style={{ backgroundColor: hex }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function WhatToWearPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'What to Wear', url: `${siteConfig.url}/what-to-wear` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black py-20 sm:py-28">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#C9A98A_0%,transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-xs font-semibold text-tp-bronze">
            <Shirt className="h-3.5 w-3.5" aria-hidden="true" />
            Style Guide
          </div>
          <h1 className="font-display font-normal text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {PAGE_TITLE}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
            Your outfit frames your face and sets the tone for how people read
            your photo. Use these practical rules, industry ideas, and color
            tips to choose clothes you feel good in, whether you are booking a
            studio or uploading selfies for AI headshots.
          </p>
        </div>
      </section>

      {/* General rules */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            icon={CheckCircle}
            title="Six Rules That Work for Everyone"
            intro="Whatever your field, these basics keep your photo clean, current, and focused on you."
          />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {generalRules.map((rule, i) => (
              <li
                key={rule.title}
                className="rounded-tp-card border border-tp-line bg-white p-6"
              >
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-paper text-sm font-semibold text-tp-bronze-ink">
                  {i + 1}
                </span>
                <h3 className="text-base font-semibold text-tp-ink">{rule.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{rule.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Industry guide */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            icon={Briefcase}
            title="What to Wear by Industry"
            intro="Norms differ from field to field. Use these as starting points and adjust to your workplace and personal style."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <article
                  key={industry.name}
                  className="flex flex-col rounded-tp-card border border-tp-line bg-white p-6 sm:p-8"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-bronze/15">
                      <Icon className="h-5 w-5 text-tp-bronze-ink" aria-hidden="true" />
                    </div>
                    <h3 className="font-display font-normal text-2xl text-tp-ink">
                      {industry.name}
                    </h3>
                  </div>
                  <ul className="mt-5 space-y-3">
                    {industry.wear.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle
                          className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink"
                          aria-hidden="true"
                        />
                        <span className="text-sm leading-relaxed text-tp-ink">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-tp-muted">
                    <XCircle
                      className="mt-0.5 h-4 w-4 shrink-0 text-tp-muted"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="font-semibold text-tp-ink">Skip: </span>
                      {industry.skip}
                    </span>
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-tp-line pt-4 text-sm">
                    {industry.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="inline-flex items-center gap-1 font-semibold text-tp-bronze-ink hover:underline"
                      >
                        {link.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
          <p className="mt-8 text-center text-sm text-tp-muted">
            Not on the list?{' '}
            <Link href="/industries" className="font-semibold text-tp-bronze-ink hover:underline">
              Browse all industries
            </Link>{' '}
            or explore{' '}
            <Link href="/styles" className="font-semibold text-tp-bronze-ink hover:underline">
              headshot styles
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Color guide */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            icon={Palette}
            title="Colors That Photograph Well"
            intro="Medium to deep, slightly muted colors tend to look best on camera. The swatches below are approximate examples."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-tp-card border border-tp-line bg-white p-6 sm:p-8">
              <h3 className="flex items-center gap-2 font-display font-normal text-2xl text-tp-ink">
                <CheckCircle className="h-5 w-5 text-tp-bronze-ink" aria-hidden="true" />
                Reach for
              </h3>
              <ul className="mt-5 space-y-4">
                {goodColors.map((c) => (
                  <li key={c.name} className="flex items-center gap-4">
                    <Swatch hex={c.hex} name={c.name} />
                    <div>
                      <p className="text-sm font-semibold text-tp-ink">{c.name}</p>
                      <p className="text-sm leading-relaxed text-tp-muted">{c.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-tp-card border border-tp-line bg-white p-6 sm:p-8">
              <h3 className="flex items-center gap-2 font-display font-normal text-2xl text-tp-ink">
                <XCircle className="h-5 w-5 text-tp-muted" aria-hidden="true" />
                Be careful with
              </h3>
              <ul className="mt-5 space-y-4">
                {avoidColors.map((c) => (
                  <li key={c.name} className="flex items-center gap-4">
                    <Swatch hex={c.hex} name={c.name} />
                    <div>
                      <p className="text-sm font-semibold text-tp-ink">{c.name}</p>
                      <p className="text-sm leading-relaxed text-tp-muted">{c.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-tp-muted">
                Skin tones and backgrounds vary, so try a couple of colors in
                natural light and see which one you prefer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common mistakes */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            icon={AlertTriangle}
            title="Common Mistakes to Avoid"
            intro="Most outfit problems are easy to fix once you know what to look for."
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mistakes.map((m) => (
              <li
                key={m.title}
                className="rounded-tp-card border border-tp-line bg-white p-6"
              >
                <XCircle className="mb-4 h-6 w-6 text-tp-muted" aria-hidden="true" />
                <h3 className="text-base font-semibold text-tp-ink">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{m.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-sm text-tp-muted">
            Also see our{' '}
            <Link href="/photo-tips" className="font-semibold text-tp-bronze-ink hover:underline">
              photo tips for AI headshots
            </Link>{' '}
            for lighting, backgrounds, and camera advice.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-tp-black py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display font-normal text-3xl text-white sm:text-4xl">
            Ready for Your Professional Headshot?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-tp-beige/70">
            Pick a few outfits you feel good in, upload your photos, and let
            TailorPic create headshots tailored to you.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
            >
              Get Started <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/headshots"
              className="inline-flex items-center gap-2 rounded-tp-button border border-tp-bronze/40 px-7 py-3.5 text-sm font-semibold text-tp-bronze transition-all hover:bg-tp-bronze/10"
            >
              Explore AI Headshots
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
