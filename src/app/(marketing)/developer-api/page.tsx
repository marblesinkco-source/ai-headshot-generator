import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import {
  ArrowRight,
  Users,
  Layers,
  Camera,
  Briefcase,
  KeyRound,
  Upload,
  Download,
  Code2,
  Webhook,
  Boxes,
  Palette,
  Maximize,
  ShieldCheck,
  Check,
  Clock,
  Terminal,
  UsersRound,
} from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'TailorPic API: AI Headshot Generation for Developers' },
  description: `Integrate AI headshot generation into your own app with the ${siteConfig.name} API. Request early access to add professional headshots to your platform.`,
  alternates: { canonical: '/developer-api' },
  openGraph: generateOGMetadata({ title: 'TailorPic API: AI Headshot Generation for Developers', description: `Add professional AI headshots to your platform with the upcoming ${siteConfig.name} REST API. Request early access today.`, path: '/developer-api' }),
  twitter: generateTwitterMetadata({ title: 'TailorPic API: AI Headshot Generation for Developers', description: `Integrate AI headshot generation into your app. Request early access to the upcoming ${siteConfig.name} API.` }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const useCases = [
  {
    icon: Users,
    title: 'HR Platforms',
    description:
      'Generate consistent, professional employee photos during onboarding for directories, badges, and intranets.',
  },
  {
    icon: Layers,
    title: 'SaaS Apps',
    description:
      'Let users upgrade their profile pictures in-app with polished headshots, without leaving your product.',
  },
  {
    icon: Camera,
    title: 'Photography Platforms',
    description:
      'Offer AI headshots as an add-on service alongside traditional shoots and extend your catalog.',
  },
  {
    icon: Briefcase,
    title: 'Recruitment Tools',
    description:
      'Help candidates present their best professional image on profiles, portfolios, and applications.',
  },
];

const steps = [
  {
    icon: KeyRound,
    number: '1',
    title: 'Get your API key',
    description:
      'Request access and, once approved, receive credentials to authenticate your requests.',
  },
  {
    icon: Upload,
    number: '2',
    title: 'Send photos via REST',
    description:
      'Submit selfies from your app to the API and choose the headshot style you want.',
  },
  {
    icon: Download,
    number: '3',
    title: 'Receive headshots',
    description:
      'Get finished, studio-quality headshots back and deliver them straight to your users.',
  },
];

const features = [
  {
    icon: Code2,
    title: 'RESTful API',
    description:
      'A clean, predictable REST interface that fits into any stack and works with the tools you already use.',
  },
  {
    icon: Webhook,
    title: 'Webhook Callbacks',
    description:
      'Get notified when headshots are ready instead of polling, so your app stays fast and efficient.',
  },
  {
    icon: Boxes,
    title: 'Bulk Processing',
    description:
      'Process photos for whole teams or large user bases in a single workflow.',
  },
  {
    icon: UsersRound,
    title: 'Team Management',
    description:
      'Organize headshot generation by team or department, with role-based access and usage tracking.',
  },
  {
    icon: Palette,
    title: 'Multiple Styles',
    description:
      'Offer a range of professional looks, from corporate to creative, to match your audience.',
  },
  {
    icon: Maximize,
    title: 'High-Res Output',
    description:
      'Receive sharp, high-resolution images suitable for web, print, and professional profiles.',
  },
  {
    icon: ShieldCheck,
    title: 'Commercial License',
    description:
      'Use generated headshots in your product and for your customers under a clear commercial license.',
  },
];

const plans = [
  {
    name: 'Pay-as-you-go',
    price: 'Usage-based',
    description: 'For developers and early-stage products getting started.',
    features: [
      'No long-term commitment',
      'Pay only for what you generate',
      'Standard support',
    ],
    highlight: false,
  },
  {
    name: 'Growth',
    price: 'Volume pricing',
    description: 'For growing products with steady headshot volume.',
    features: [
      'Lower per-image rates at scale',
      'Higher usage limits',
      'Priority support',
    ],
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For platforms with large-scale or specialized needs.',
    features: [
      'Custom volume and terms',
      'Dedicated onboarding',
      'Direct contact with our team',
    ],
    highlight: false,
  },
];

const codeExample = `// Generate a professional headshot
const response = await fetch(
  "https://api.example.com/v1/headshots",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      image_url: "https://your-app.com/uploads/photo.jpg",
      style: "corporate",
      background: "studio-gray",
      output_size: "1024x1024"
    })
  }
);

const { headshot_url, status } = await response.json();`;

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ApiPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Developer API', url: `${siteConfig.url}/developer-api` },
        ]}
      />
      <Header />
      <main id="main-content">
        {/* -- Hero -------------------------------------------------- */}
        <section className="relative overflow-hidden bg-tp-black py-24 sm:py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-tp-bronze/10 blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-1/4 h-[300px] w-[400px] rounded-full bg-tp-bronze/5 blur-[100px]"
          />
          <div className="relative mx-auto max-w-4xl px-4 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium tracking-wide text-tp-bronze">
              <Terminal className="h-3.5 w-3.5" />
              Developer API
            </span>
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Build with AI <span className="text-tp-bronze">Headshots</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/80">
              Integrate professional AI headshot generation into your own app,
              platform, or workflow. A simple REST API to automate team photos,
              profile pictures, and more.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-8 py-3.5 text-base font-semibold text-tp-black transition hover:bg-tp-bronze/90"
              >
                Get API Access
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#code-example"
                className="inline-flex items-center gap-2 rounded-tp-button border border-tp-beige/30 px-8 py-3.5 text-base font-semibold text-tp-beige transition hover:border-tp-bronze hover:text-tp-bronze"
              >
                See Example
              </Link>
            </div>
          </div>
        </section>

        {/* -- Code Example ------------------------------------------ */}
        <section
          id="code-example"
          className="border-b border-tp-line bg-gradient-to-b from-tp-black via-tp-black to-[#1a1714] py-20 sm:py-28"
        >
          <div className="mx-auto max-w-5xl px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-tp-bronze">
                  Quick Start
                </span>
                <h2 className="font-display text-3xl text-white sm:text-4xl">
                  A few lines of code
                </h2>
                <p className="mt-4 leading-relaxed text-tp-beige/70">
                  Submit a photo, choose a style, and receive a polished
                  headshot. The API handles the rest, from background removal
                  to lighting adjustments.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    'Simple JSON request and response',
                    'Webhook or polling for async results',
                    'Works with any language or framework',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-tp-beige/80"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tp-bronze/20">
                        <Check className="h-3 w-3 text-tp-bronze" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="overflow-hidden rounded-tp-card border border-white/10 bg-[#0d0b09] shadow-2xl shadow-black/40">
                  <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                    <span className="h-3 w-3 rounded-full bg-white/10" />
                    <span className="h-3 w-3 rounded-full bg-white/10" />
                    <span className="h-3 w-3 rounded-full bg-white/10" />
                    <span className="ml-3 text-xs text-white/30">
                      generate-headshot.js
                    </span>
                  </div>
                  <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed text-tp-beige/70">
                    <code>{codeExample}</code>
                  </pre>
                </div>
                <p className="mt-3 text-center text-xs text-white/30">
                  Illustrative example. Actual endpoint and parameters may differ.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -- What You Can Build ------------------------------------- */}
        <section className="border-b border-tp-line bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h2 className="font-display text-3xl text-tp-ink sm:text-4xl">
                What You Can Build
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-tp-muted">
                Add headshot generation to the products your users already love.
              </p>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {useCases.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-tp-card border border-tp-line bg-tp-paper p-6 transition-shadow hover:shadow-md hover:shadow-tp-black/5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-tp-button bg-tp-bronze/10 transition-colors group-hover:bg-tp-bronze/20">
                    <item.icon className="h-5 w-5 text-tp-bronze-ink" />
                  </div>
                  <h3 className="mt-5 font-display text-lg text-tp-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -- How It Works ------------------------------------------- */}
        <section className="border-b border-tp-line bg-tp-paper py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h2 className="font-display text-3xl text-tp-ink sm:text-4xl">
                How It Works
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-tp-muted">
                A simple three-step flow, designed to be quick to integrate.
              </p>
            </div>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className="relative rounded-tp-card border border-tp-line bg-white p-8 text-center"
                >
                  {i < steps.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="absolute right-0 top-1/2 hidden h-px w-8 -translate-y-1/2 translate-x-full bg-tp-line md:block"
                    />
                  )}
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tp-black text-tp-bronze">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-tp-bronze-ink">
                    Step {step.number}
                  </p>
                  <h3 className="mt-2 font-display text-xl text-tp-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-tp-muted">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -- API Features ------------------------------------------- */}
        <section className="border-b border-tp-line bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h2 className="font-display text-3xl text-tp-ink sm:text-4xl">
                Planned API Features
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-tp-muted">
                Built for developers who want reliable, production-ready
                headshot generation.
              </p>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group flex gap-4 rounded-tp-card border border-tp-line bg-tp-paper p-6 transition-shadow hover:shadow-md hover:shadow-tp-black/5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tp-button bg-tp-bronze/10 transition-colors group-hover:bg-tp-bronze/20">
                    <feature.icon className="h-5 w-5 text-tp-bronze-ink" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-tp-ink">
                      {feature.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-tp-muted">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -- Pricing Plans ------------------------------------------ */}
        <section className="border-b border-tp-line bg-tp-paper py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h2 className="font-display text-3xl text-tp-ink sm:text-4xl">
                Pricing Plans
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-tp-muted">
                Flexible options that scale with your product.
              </p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-tp-card border p-8 transition-shadow ${
                    plan.highlight
                      ? 'border-tp-bronze bg-white shadow-lg shadow-tp-bronze/10'
                      : 'border-tp-line bg-white hover:shadow-md hover:shadow-tp-black/5'
                  }`}
                >
                  {plan.highlight && (
                    <span className="absolute -top-3 left-6 rounded-full bg-tp-bronze px-3 py-1 text-xs font-semibold text-tp-black">
                      Recommended
                    </span>
                  )}
                  <h3 className="font-display text-xl text-tp-ink">
                    {plan.name}
                  </h3>
                  <p className="mt-3 font-display text-2xl text-tp-bronze-ink">
                    {plan.price}
                  </p>
                  <p className="mt-2 text-sm text-tp-muted">
                    {plan.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-tp-ink"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-tp-bronze-ink" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-tp-muted">
              Pricing shown is illustrative. API pricing will be confirmed at
              launch.
            </p>
          </div>
        </section>

        {/* -- CTA ---------------------------------------------------- */}
        <section className="relative overflow-hidden bg-tp-black py-20 sm:py-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-tp-bronze/30 to-transparent"
          />
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Get API Access
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-tp-beige/80">
              Tell us about what you are building and we will reach out as
              access opens up.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-8 py-3.5 text-base font-semibold text-tp-black transition hover:bg-tp-bronze/90"
              >
                Get API Access
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* -- Early Access Notice -------------------------------------- */}
        <section className="bg-tp-paper py-10">
          <div className="mx-auto flex max-w-3xl items-start justify-center gap-3 px-4 text-center">
            <Clock
              aria-hidden="true"
              className="mt-0.5 hidden h-5 w-5 shrink-0 text-tp-bronze-ink sm:block"
            />
            <p className="text-sm text-tp-muted">
              Request early access to the {siteConfig.name} API and be among
              the first to integrate AI headshot generation into your platform.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
