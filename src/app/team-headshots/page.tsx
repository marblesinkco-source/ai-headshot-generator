import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import {
  Users, Sparkles, ArrowRight, CheckCircle, Palette,
  Download, LayoutDashboard, Image, Camera, Send,
  Laptop, Scale, Building2, Stethoscope, GraduationCap, Landmark,
  Lock, ShieldCheck, CreditCard, UserPlus, RefreshCw, Minus,
  Clock, Wallet, Layers,
} from 'lucide-react';

const faqItems = [
  {
    question: 'How much do team headshots cost?',
    answer:
      'An individual order is $1.99. Small teams of 5-15 people are $39 per person and companies of 16-50 people are $29 per person. For 50+ people we offer custom enterprise pricing. Final pricing is confirmed at checkout.',
  },
  {
    question: 'How does the team ordering process work?',
    answer:
      'An admin creates the team account and invites members by email. Each member uploads a few selfies, and the AI generates their headshots in the shared team style.',
  },
  {
    question: 'Will every headshot match our brand?',
    answer:
      'The team plan lets the admin set a shared style and background so headshots look consistent across the team. Brand guidelines can be applied for larger plans.',
  },
  {
    question: 'Is there a satisfaction guarantee?',
    answer:
      'Yes. Orders are covered by our satisfaction guarantee. Contact our support team for details.',
  },
  {
    question: 'How is our data handled?',
    answer:
      'Uploaded photos, trained models, and generated photos are automatically deleted from our servers within 30 days of delivery, and you can request earlier deletion by contacting support. Payments are processed by Stripe and card details are never stored on our servers.',
  },
  {
    question: 'How many people do I need for a team plan?',
    answer:
      'Team pricing starts at 5 people ($39 per person for 5-15 people, $29 per person for 16-50). Orders of 1-4 people use the individual price of $1.99 per person. For 50+ people, request a demo for custom pricing.',
  },
  {
    question: 'How long does it take to get team headshots?',
    answer:
      'There is no studio day to schedule. Each member uploads selfies whenever it suits them, and the AI generates their headshots in the shared team style. Timing depends on how quickly your team uploads.',
  },
  {
    question: 'Can new hires be added later?',
    answer:
      'Yes. The admin can invite additional members, who upload selfies and get headshots in the same shared team style. Pricing for additional members is confirmed at checkout.',
  },
  {
    question: 'Can I see a demo or talk to someone before buying?',
    answer:
      'Yes. Use the Request a Demo button to contact our team and we will walk you through the team dashboard and answer questions about your rollout.',
  },
];

const pageTitle = 'Team Headshots: Consistent AI Photos for Your Team';
const pageDescription =
  'Consistent, professional AI team headshots from $29-$39 per person. Each member uploads selfies and gets polished, on-brand headshots with no studio day.';

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/team-headshots' },
  openGraph: generateOGMetadata({
    title: pageTitle,
    description: pageDescription,
    type: 'usecase',
    subtitle: 'Consistent AI headshots for every team member',
    path: '/team-headshots',
  }),
  twitter: generateTwitterMetadata({
    title: pageTitle,
    description: pageDescription,
    type: 'usecase',
  }),
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Team Headshots',
  serviceType: 'AI headshot generation for teams',
  description: pageDescription,
  url: `${siteConfig.url}/team-headshots`,
  provider: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
  areaServed: 'Worldwide',
  offers: [
    {
      '@type': 'Offer',
      name: 'Small Team (5-15 people)',
      price: '39',
      priceCurrency: 'USD',
      url: `${siteConfig.url}/team-headshots`,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '39',
        priceCurrency: 'USD',
        referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitText: 'person' },
      },
    },
    {
      '@type': 'Offer',
      name: 'Business (16-50 people)',
      price: '29',
      priceCurrency: 'USD',
      url: `${siteConfig.url}/team-headshots`,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '29',
        priceCurrency: 'USD',
        referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitText: 'person' },
      },
    },
  ],
};

export default function TeamHeadshotsPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'Team Headshots', url: `${siteConfig.url}/team-headshots` },
      ]} />
      <FAQSchema items={faqItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Header />

      {/* Hero */}
      <section className="relative bg-tp-black py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#C9A98A_0%,transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-xs font-semibold text-tp-bronze mb-6">
            <Users className="h-3.5 w-3.5" />
            Team Plan
          </div>
          <h1 className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            Professional Headshots{' '}
            <em className="text-tp-bronze not-italic font-display italic">for Your Team</em>
          </h1>
          <p className="mt-5 text-lg text-tp-beige/70 max-w-2xl mx-auto leading-relaxed">
            One order, consistent results. Your team uploads selfies, and our AI
            generates polished, on-brand headshots&mdash;no photographer needed.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-tp-button border border-tp-beige/20 px-6 py-3.5 text-sm font-semibold text-tp-beige transition-all hover:bg-white/5"
            >
              Request a Demo
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-tp-beige/70">
            {[
              { icon: CreditCard, text: 'Secure checkout by Stripe' },
              { icon: Lock, text: 'Photos deleted within 30 days' },
              { icon: ShieldCheck, text: 'satisfaction guarantee' },
            ].map((t) => (
              <li key={t.text} className="inline-flex items-center gap-1.5">
                <t.icon className="h-3.5 w-3.5 text-tp-bronze" />
                {t.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
              Simple Process
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              How It Works for Teams
            </h2>
            <p className="mt-3 text-tp-muted max-w-xl mx-auto">
              Three steps from signup to finished headshots&mdash;no scheduling, no studios.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: '1',
                icon: Send,
                title: 'Admin Orders & Invites',
                desc: 'Create your team account and invite members via email. Set your preferred style and background so every headshot matches.',
              },
              {
                step: '2',
                icon: Camera,
                title: 'Team Uploads Selfies',
                desc: 'Each team member uploads a few selfies from their phone or computer. No studio visit required.',
              },
              {
                step: '3',
                icon: Sparkles,
                title: 'AI Generates, Team Downloads',
                desc: 'Our AI produces consistent, professional headshots for every member. Everyone downloads their set, or the admin bulk-downloads the whole team.',
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-tp-black text-tp-bronze font-bold text-lg mb-4">
                  {s.step}
                </div>
                <s.icon className="h-5 w-5 text-tp-bronze mx-auto mb-2" />
                <h3 className="text-base font-semibold text-tp-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volume Pricing */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              Volume Pricing
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              Built for Teams of Any Size
            </h2>
            <p className="mt-3 text-tp-muted max-w-xl mx-auto">
              The more people on your plan, the lower the per-person price.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: 'Individual',
                size: '1-4 people',
                price: '$1.99',
                unit: '/person',
                features: ['Per-person ordering', 'Choose your style', 'High-resolution downloads'],
                cta: 'Get Started',
                href: '/auth/register',
                featured: false,
              },
              {
                name: 'Small Team',
                size: '5-15 people',
                price: '$39',
                unit: '/person',
                features: ['Everything in Individual', 'Consistent team background', 'Admin dashboard'],
                cta: 'Get Started',
                href: '/auth/register',
                featured: false,
              },
              {
                name: 'Business',
                size: '16-50 people',
                price: '$29',
                unit: '/person',
                features: ['Everything in Small Team', 'Brand guidelines applied', 'Bulk download'],
                cta: 'Get Started',
                href: '/auth/register',
                featured: true,
              },
              {
                name: 'Enterprise',
                size: '50+ people',
                price: 'Custom',
                unit: '',
                features: ['Everything in Business', 'Custom volume pricing', 'Dedicated onboarding help'],
                cta: 'Request a Demo',
                href: '/contact',
                featured: false,
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col rounded-tp-card border bg-white p-6 ${
                  tier.featured ? 'border-tp-bronze' : 'border-tp-line'
                }`}
              >
                <h3 className="font-display text-xl text-tp-ink">{tier.name}</h3>
                <p className="mt-1 text-sm text-tp-muted">{tier.size}</p>
                <p className="mt-5 font-display text-3xl text-tp-ink">
                  {tier.price}
                  {tier.unit && (
                    <span className="ml-1 text-sm font-sans text-tp-muted">{tier.unit}</span>
                  )}
                </p>
                <ul className="mt-5 mb-6 space-y-3 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-tp-muted">
                      <CheckCircle className="h-4 w-4 mt-0.5 text-tp-bronze-ink flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.href}
                  className={`inline-flex items-center justify-center gap-2 rounded-tp-button px-5 py-3 text-sm font-semibold transition-all ${
                    tier.featured
                      ? 'bg-tp-bronze text-tp-black hover:-translate-y-0.5 hover:shadow-lg hover:bg-tp-bronze/90'
                      : 'border border-tp-line text-tp-ink hover:bg-tp-paper'
                  }`}
                >
                  {tier.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-tp-ink">
            All plans include 40+ headshots per person, commercial license, and satisfaction guarantee.
          </p>
          <p className="mt-2 text-center text-xs text-tp-muted">
            Final pricing is confirmed at checkout.
          </p>
        </div>
      </section>

      {/* Savings comparison */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              Cost &amp; Time Savings
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              Skip the Studio Day
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-tp-card border border-tp-line bg-white p-6 sm:p-8">
              <Camera className="h-6 w-6 text-tp-muted mb-3" />
              <h3 className="font-display text-xl text-tp-ink">Studio photography</h3>
              <p className="mt-1 text-sm text-tp-muted">For 10 people</p>
              <p className="mt-4 font-display text-3xl text-tp-muted">$2,000-$5,000+</p>
              <p className="mt-3 text-sm text-tp-muted leading-relaxed">
                Typical market estimate. Requires scheduling a shoot day, travel, and coordinating everyone&apos;s availability.
              </p>
            </div>
            <div className="rounded-tp-card border border-tp-bronze bg-tp-black p-6 sm:p-8">
              <Sparkles className="h-6 w-6 text-tp-bronze mb-3" />
              <h3 className="font-display text-xl text-white">TailorPic Team Plan</h3>
              <p className="mt-1 text-sm text-tp-beige/70">For 10 people at $39 each</p>
              <p className="mt-4 font-display text-3xl text-tp-bronze">$390</p>
              <p className="mt-3 text-sm text-tp-beige/70 leading-relaxed">
                Everyone uploads selfies from wherever they are. No scheduling, no travel.
              </p>
            </div>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Layers, title: 'One consistent look', desc: 'A shared style and background keeps every profile on-brand.' },
              { icon: Clock, title: 'No studio day', desc: 'Remote and hybrid teams skip the shoot coordination entirely.' },
              { icon: Wallet, title: 'Predictable pricing', desc: 'A flat per-person price, confirmed at checkout.' },
            ].map((t) => (
              <li key={t.title} className="rounded-tp-card border border-tp-line bg-tp-paper p-5 text-center">
                <t.icon className="h-5 w-5 text-tp-bronze-ink mx-auto mb-2" />
                <p className="text-sm font-semibold text-tp-ink">{t.title}</p>
                <p className="mt-1 text-sm text-tp-muted leading-relaxed">{t.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Individual vs Team comparison */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              Compare Plans
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              Individual Plan vs Team Plan
            </h2>
            <p className="mt-3 text-tp-muted max-w-xl mx-auto">
              Ordering for yourself, or outfitting a whole company? Here is what changes.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                name: 'Individual Plan',
                price: '$1.99',
                note: 'one-time, per person',
                featured: false,
                cta: 'Get Started',
                href: '/auth/register',
                rows: [
                  { text: '40+ headshots per person', on: true },
                  { text: 'Choose your own style', on: true },
                  { text: 'High-resolution downloads', on: true },
                  { text: 'Commercial license', on: true },
                  { text: 'Shared team style & background', on: false },
                  { text: 'Admin dashboard & invites', on: false },
                  { text: 'Bulk download', on: false },
                ],
              },
              {
                name: 'Team Plan',
                price: '$39 / $29',
                note: 'per person: $39 for 5-15 people, $29 for 16-50',
                featured: true,
                cta: 'Start a Team Order',
                href: '/auth/register',
                rows: [
                  { text: '40+ headshots per person', on: true },
                  { text: 'One shared style for the whole team', on: true },
                  { text: 'High-resolution downloads', on: true },
                  { text: 'Commercial license', on: true },
                  { text: 'Consistent team background', on: true },
                  { text: 'Admin dashboard & invites', on: true },
                  { text: 'Bulk download', on: true },
                ],
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col rounded-tp-card border bg-white p-6 sm:p-8 ${
                  plan.featured ? 'border-tp-bronze' : 'border-tp-line'
                }`}
              >
                <h3 className="font-display text-2xl text-tp-ink">{plan.name}</h3>
                <p className="mt-4 font-display text-4xl text-tp-ink">{plan.price}</p>
                <p className="mt-1 text-sm text-tp-muted">{plan.note}</p>
                <ul className="mt-6 mb-8 space-y-3 flex-1">
                  {plan.rows.map((r) => (
                    <li
                      key={r.text}
                      className={`flex items-start gap-2 text-sm ${r.on ? 'text-tp-ink' : 'text-tp-muted'}`}
                    >
                      {r.on ? (
                        <CheckCircle className="h-4 w-4 mt-0.5 text-tp-bronze-ink flex-shrink-0" />
                      ) : (
                        <Minus className="h-4 w-4 mt-0.5 text-tp-muted flex-shrink-0" />
                      )}
                      <span>
                        {r.text}
                        {!r.on && <span className="sr-only"> (not included)</span>}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`inline-flex items-center justify-center gap-2 rounded-tp-button px-5 py-3 text-sm font-semibold transition-all ${
                    plan.featured
                      ? 'bg-tp-bronze text-tp-black hover:-translate-y-0.5 hover:shadow-lg hover:bg-tp-bronze/90'
                      : 'border border-tp-line text-tp-ink hover:bg-tp-paper'
                  }`}
                >
                  {plan.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-tp-muted">
            Teams of 50+?{' '}
            <Link href="/contact" className="font-semibold text-tp-bronze-ink underline underline-offset-4">
              Request a demo
            </Link>{' '}
            for custom pricing.
          </p>
        </div>
      </section>

      {/* Scenarios */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              Scenarios
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              How Teams Can Use It
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: RefreshCw,
                title: 'HR: Company Rebrand',
                desc: 'A refreshed brand needs refreshed faces. HR sets one style and background, invites everyone, and the whole directory updates together instead of photo by photo.',
              },
              {
                icon: UserPlus,
                title: 'New Hire Onboarding',
                desc: 'Add a headshot step to the first-week checklist. New hires upload selfies from home and get a photo that matches the rest of the team page.',
              },
              {
                icon: Building2,
                title: 'Real Estate Team',
                desc: 'A brokerage wants matching agent photos across listings, signage, and email signatures, including for agents who join mid-year.',
              },
              {
                icon: Scale,
                title: 'Law Firm Team',
                desc: 'Partners and associates are spread across offices and schedules. Selfies replace a coordinated studio day while attorney profiles still look uniform.',
              },
            ].map((s) => (
              <div key={s.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-black">
                    <s.icon className="h-5 w-5 text-tp-bronze" />
                  </div>
                  <span className="rounded-full border border-tp-line bg-tp-paper px-3 py-1 text-xs font-medium text-tp-muted">
                    Representative scenario
                  </span>
                </div>
                <h3 className="font-display text-lg text-tp-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              Industries
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              Built for Teams That Put People First
            </h2>
            <p className="mt-3 text-tp-muted max-w-xl mx-auto">
              Consistent headshots work for any team that puts people front and center.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Laptop,
                title: 'Tech Companies',
                desc: 'Keep fast-growing and remote teams looking cohesive on your about page and product sites.',
              },
              {
                icon: Scale,
                title: 'Law Firms',
                desc: 'Polished, credible attorney profiles that match across every partner and associate.',
              },
              {
                icon: Building2,
                title: 'Real Estate Teams',
                desc: 'Uniform agent photos for listings, signage, and marketing materials.',
              },
              {
                icon: Stethoscope,
                title: 'Healthcare',
                desc: 'Approachable, professional portraits for practitioners and clinic staff directories.',
              },
              {
                icon: GraduationCap,
                title: 'Education',
                desc: 'Faculty and staff headshots for department pages and campus directories.',
              },
              {
                icon: Landmark,
                title: 'Finance',
                desc: 'Trustworthy, consistent advisor and analyst photos for client-facing materials.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-tp-card border border-tp-line bg-white p-6 transition-colors hover:border-tp-bronze/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-black mb-4">
                  <item.icon className="h-5 w-5 text-tp-bronze" />
                </div>
                <h3 className="font-display text-lg text-tp-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
              Team Features
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              Everything Your Team Needs
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: Image,
                title: 'Consistent Backgrounds',
                desc: 'Every headshot shares the same background and lighting style, so your team page looks cohesive and polished.',
              },
              {
                icon: Palette,
                title: 'Brand Guidelines',
                desc: 'Set your brand colors and style preferences once. They apply automatically to every headshot in the team.',
              },
              {
                icon: LayoutDashboard,
                title: 'Admin Dashboard',
                desc: 'Invite members, track who has uploaded, review results, and manage everything from a single dashboard.',
              },
              {
                icon: Download,
                title: 'Bulk Download',
                desc: 'Download all team headshots at once in the resolution you need&mdash;ready for your website, LinkedIn, or email signatures.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-tp-card border border-tp-line bg-white p-6 hover:border-tp-bronze/30 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-black mb-4">
                  <feature.icon className="h-5 w-5 text-tp-bronze" />
                </div>
                <h3 className="text-base font-semibold text-tp-ink">{feature.title}</h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                icon: CreditCard,
                title: 'Secure checkout',
                desc: 'Payments are processed by Stripe. Card details are never stored on our servers.',
              },
              {
                icon: Lock,
                title: 'Data privacy',
                desc: 'Uploaded photos, models, and results are deleted within 30 days of delivery.',
              },
              {
                icon: ShieldCheck,
                title: 'Satisfaction guarantee',
                desc: 'Covered by a satisfaction guarantee on every order.',
              },
            ].map((t) => (
              <div key={t.title} className="rounded-tp-card border border-tp-line bg-white p-6 text-center">
                <t.icon className="h-6 w-6 text-tp-bronze-ink mx-auto mb-3" />
                <h3 className="font-display text-lg text-tp-ink">{t.title}</h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-tp-muted">
            Learn more on our{' '}
            <Link href="/security" className="font-semibold text-tp-bronze-ink underline underline-offset-4">
              security page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display font-normal text-3xl sm:text-4xl text-tp-ink mb-10">
            Team Headshots FAQ
          </h2>
          <div className="space-y-3">
            {faqItems.map((f) => (
              <details key={f.question} className="group rounded-tp-card border border-tp-line bg-white p-5">
                <summary className="cursor-pointer list-none text-base font-semibold text-tp-ink">
                  {f.question}
                </summary>
                <p className="mt-3 text-sm text-tp-muted leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Users className="h-10 w-10 text-tp-bronze mx-auto mb-4" />
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-tp-ink">
            Ready to Outfit Your Team?
          </h2>
          <p className="mt-4 text-lg text-tp-muted max-w-xl mx-auto">
            Skip the photo studio. Get consistent, professional headshots for
            everyone on your team in minutes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:-translate-y-0.5 hover:bg-tp-bronze/90 hover:shadow-lg"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-tp-button border border-tp-line px-6 py-3.5 text-sm font-semibold text-tp-ink transition-all hover:bg-tp-paper"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
