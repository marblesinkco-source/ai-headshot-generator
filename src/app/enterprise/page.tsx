import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import {
  Building2, Users, Shield, CreditCard, Palette,
  ArrowRight, Check, CheckCircle, Lock, BarChart3, Headphones, Globe,
  Trash2, FileCheck, ShieldCheck, Eye, MessageSquare, Settings, UserPlus, Rocket,
} from 'lucide-react';

const ROICalculator = dynamic(
  () => import('@/components/marketing/roi-calculator').then((m) => m.ROICalculator),
  { ssr: false },
);

const ENTERPRISE_TITLE = 'Enterprise AI Headshots for Teams | TailorPic';
const ENTERPRISE_OG_DESCRIPTION = 'Scale professional headshots across your organization with AI.';

export const metadata: Metadata = {
  title: ENTERPRISE_TITLE,
  description:
    'Professional AI headshots for your entire organization. Consistent branding, team admin dashboard, volume pricing, and dedicated support.',
  alternates: { canonical: '/enterprise' },
  openGraph: generateOGMetadata({
    title: ENTERPRISE_TITLE,
    description: ENTERPRISE_OG_DESCRIPTION,
    type: 'default',
    subtitle: 'Team pricing from $29 per person',
    path: '/enterprise',
  }),
  twitter: generateTwitterMetadata({
    title: ENTERPRISE_TITLE,
    description: ENTERPRISE_OG_DESCRIPTION,
  }),
};

const enterpriseFaqs = [
  {
    question: 'How does team pricing work?',
    answer:
      'Small teams of 5-15 people are $39 per person and companies of 16-50 people are $29 per person. For teams of 50+, we offer custom enterprise pricing. Contact our sales team for a tailored quote.',
  },
  {
    question: 'Can we set brand guidelines for all team headshots?',
    answer:
      'Yes. Admins can set brand colors, backgrounds, and style preferences once and apply them to every team member, so the whole team has a consistent, on-brand look.',
  },
  {
    question: 'How do team members submit their photos?',
    answer:
      'The admin creates a team account and invites members by email. Each member uploads their own selfies, and the AI generates their headshots in the shared team style. The admin can review and download all headshots from one dashboard.',
  },
  {
    question: 'How is our team\'s data protected?',
    answer:
      'Uploaded photos are processed on secure infrastructure and automatically deleted within 30 days. We never sell your photos or share them with third parties.',
  },
  {
    question: 'Is data encrypted, and can we request GDPR or CCPA deletion?',
    answer:
      'Data is encrypted at rest with AES-256 and in transit with TLS. Team members can request access, correction, or deletion of their personal data at any time, and a Data Processing Agreement is available for procurement and legal review.',
  },
  {
    question: 'Is there a minimum team size for enterprise plans?',
    answer:
      'Volume pricing is available for teams of 10 or more, and our custom Enterprise plan is designed for organizations with 50+ people. Smaller teams can start with a Small Team plan.',
  },
  {
    question: 'Do you offer dedicated support for enterprise customers?',
    answer:
      'Yes. Enterprise clients get priority support and a dedicated account manager, along with custom onboarding for your organization.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'TailorPic Enterprise AI Headshots',
  serviceType: 'AI headshot generation for teams',
  description:
    'Professional AI headshots for teams and organizations, with a team admin dashboard, brand guidelines, volume pricing, and priority support with a dedicated account manager.',
  url: `${siteConfig.url}/enterprise`,
  provider: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
  areaServed: 'Worldwide',
  audience: { '@type': 'BusinessAudience', name: 'Teams and organizations' },
  offers: [
    {
      '@type': 'Offer',
      name: 'Small Team (5-15 people)',
      price: '39',
      priceCurrency: 'USD',
      eligibleQuantity: { '@type': 'QuantitativeValue', minValue: 5, maxValue: 15, unitText: 'people' },
      priceSpecification: { '@type': 'UnitPriceSpecification', price: '39', priceCurrency: 'USD', referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitText: 'person' } },
    },
    {
      '@type': 'Offer',
      name: 'Company (16-50 people)',
      price: '29',
      priceCurrency: 'USD',
      eligibleQuantity: { '@type': 'QuantitativeValue', minValue: 16, maxValue: 50, unitText: 'people' },
      priceSpecification: { '@type': 'UnitPriceSpecification', price: '29', priceCurrency: 'USD', referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitText: 'person' } },
    },
    {
      '@type': 'Offer',
      name: 'Enterprise (50+ people)',
      description: 'Custom pricing. Contact sales for a quote.',
      url: `${siteConfig.url}/contact`,
    },
  ],
};

export default function EnterprisePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'Enterprise', url: `${siteConfig.url}/enterprise` },
      ]} />
      <FAQSchema items={enterpriseFaqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />

      {/* Hero */}
      <section className="relative bg-tp-black py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#C9A98A_0%,transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-xs font-semibold text-tp-bronze mb-6">
            <Building2 className="h-3.5 w-3.5" />
            Enterprise
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            Professional Headshots,{' '}
            <em className="text-tp-bronze not-italic font-display italic">At Scale</em>
          </h1>
          <p className="mt-5 text-lg text-tp-beige/70 max-w-2xl mx-auto leading-relaxed">
            Unified, professional AI headshots for your entire organization.
            No photographers to coordinate, no schedules to juggle.
          </p>
          <p className="mt-3 text-sm text-tp-beige/60">
            Team pricing from $29 per person. Priority support and a dedicated account manager for enterprise.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-8 py-4 text-base font-semibold text-tp-black shadow-lg shadow-tp-bronze/20 transition-all hover:-translate-y-0.5 hover:bg-tp-bronze/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-tp-black"
            >
              Request a Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-tp-button border border-tp-beige/20 px-6 py-3.5 text-sm font-semibold text-tp-beige transition-all hover:bg-white/5"
            >
              View Team Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-tp-line bg-tp-paper py-5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-center">
            {[
              { icon: Lock, text: 'SSL/TLS Encrypted' },
              { icon: Shield, text: 'GDPR & CCPA Requests' },
              { icon: Trash2, text: '30-Day Photo Deletion' },
              { icon: Headphones, text: 'Priority Support' },
            ].map((item) => (
              <div key={item.text} className="flex items-center justify-center gap-2 text-xs font-medium text-tp-muted">
                <item.icon className="h-4 w-4 text-tp-bronze" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl text-tp-ink">
              The Team Headshot Problem
            </h2>
            <p className="mt-3 text-tp-muted max-w-xl mx-auto">
              Getting professional headshots for 50+ people shouldn&apos;t take months.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: 'Coordination Nightmare',
                desc: 'Booking a photographer for 50+ employees across offices and time zones takes weeks of back-and-forth.',
              },
              {
                title: 'Inconsistent Results',
                desc: 'Different photographers, different lighting, different backgrounds. Your team page looks like a patchwork.',
              },
              {
                title: 'Ongoing Cost',
                desc: 'Every new hire, every promotion, every rebrand means another round of expensive photo shoots.',
              },
            ].map((pain) => (
              <div key={pain.title} className="rounded-tp-card border border-tp-line bg-tp-paper/50 p-6">
                <h3 className="text-lg font-semibold text-tp-ink">{pain.title}</h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">{pain.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-tp-black py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
            {[
              { value: 'Faster', label: 'than coordinating traditional shoots' },
              { value: 'Lower cost', label: 'than studio photography for teams' },
              { value: 'Consistent', label: 'look across your team' },
              { value: 'Fast', label: 'turnaround from upload to download' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-tp-beige/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise features */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
              Enterprise Features
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-tp-ink">
              Built for Organizations
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Users, title: 'Team Dashboard', desc: 'Invite team members, track orders, and manage all headshots from one admin panel.' },
              { icon: Palette, title: 'Brand Guidelines', desc: 'Set your brand colors, backgrounds, and style preferences once. Apply them to every new headshot.' },
              { icon: Lock, title: 'Enterprise Security', desc: 'Secure infrastructure with Supabase and Stripe. Photos auto-deleted within 30 days.' },
              { icon: CreditCard, title: 'Volume Pricing', desc: 'Custom pricing for teams of 10+. The more seats, the lower the per-person cost.' },
              { icon: Headphones, title: 'Dedicated Support', desc: 'Priority support with a dedicated account manager for enterprise clients.' },
              { icon: BarChart3, title: 'Usage Overview', desc: 'View team adoption and order history from the admin dashboard.' },
            ].map((feature) => (
              <div key={feature.title} className="rounded-tp-card border border-tp-line p-6 hover:border-tp-bronze/30 transition-colors">
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

      {/* Enterprise benefits checklist */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-tp-card border border-tp-line bg-tp-paper p-6 sm:p-10">
            <h2 className="font-display text-2xl sm:text-3xl text-tp-ink text-center">
              Everything Your Team Needs
            </h2>
            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {[
                'One admin panel to invite members and track orders',
                'Brand colors, backgrounds, and style set once',
                'Consistent look across every team member',
                'No photographer scheduling or office coordination',
                'Volume pricing for teams of 10+',
                'Photos auto-deleted within 30 days of delivery',
                'Dedicated account manager for enterprise clients',
                'Easy onboarding for new hires and rebrands',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-tp-ink">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-tp-bronze/15">
                    <Check className="h-3.5 w-3.5 text-tp-bronze-ink" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:-translate-y-0.5 hover:bg-tp-bronze/90 hover:shadow-lg"
              >
                Talk to Sales <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Security & privacy */}
      <section id="security" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
              Security &amp; Privacy
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-tp-ink">
              Your Team&apos;s Photos Stay Private
            </h2>
            <p className="mt-3 text-tp-muted max-w-xl mx-auto">
              Employee photos are personal data. Here is how we handle them.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Lock, title: 'Encryption', desc: 'Data is encrypted at rest with AES-256 and in transit with TLS 1.3.' },
              { icon: Trash2, title: 'Automatic Data Deletion', desc: 'Original uploads and training data are permanently deleted within 30 days of delivery.' },
              { icon: FileCheck, title: 'GDPR & CCPA Requests', desc: 'Team members can request access, correction, or deletion of their personal data at any time.' },
              { icon: Eye, title: 'No Selling or Sharing', desc: 'Photos are used only to generate your headshots. We never sell them or share them with third parties.' },
              { icon: ShieldCheck, title: 'Data Processing Agreement', desc: 'Need paperwork for procurement or legal review? Review our DPA and subprocessor list.' },
            ].map((item) => (
              <div key={item.title} className="rounded-tp-card border border-tp-line p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-black mb-4">
                  <item.icon className="h-5 w-5 text-tp-bronze" />
                </div>
                <h3 className="text-base font-semibold text-tp-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
            <div className="rounded-tp-card border border-tp-bronze/30 bg-tp-paper p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-tp-ink">Security review?</h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">
                  Read the details, or tell us what your security team needs.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-tp-bronze-ink">
                <Link href="/security" className="underline underline-offset-4">Security</Link>
                <Link href="/dpa" className="underline underline-offset-4">DPA</Link>
                <Link href="/subprocessors" className="underline underline-offset-4">Subprocessors</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works for teams */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl text-tp-ink">
              How It Works for Teams
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { step: '1', title: 'Admin Setup', desc: 'Create your team account, set brand guidelines, and invite team members via email.' },
              { step: '2', title: 'Team Uploads', desc: 'Each member uploads their selfies. Our AI generates consistent, on-brand headshots.' },
              { step: '3', title: 'Download & Deploy', desc: 'Admin reviews and downloads all headshots. Update your website, LinkedIn, and email signatures.' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-tp-black text-tp-bronze font-bold text-lg mb-4">
                  {s.step}
                </div>
                <h3 className="text-base font-semibold text-tp-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation timeline */}
      <section id="implementation" className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
              Implementation
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-tp-ink">
              From First Call to Team Launch
            </h2>
            <p className="mt-3 text-tp-muted max-w-xl mx-auto">
              A simple four-step rollout. We agree on timing with you during the first conversation.
            </p>
          </div>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: MessageSquare, title: 'Contact', desc: 'Tell us your team size and needs. We reply with a plan and a quote that fits.' },
              { icon: Settings, title: 'Setup', desc: 'We help configure your team account, brand guidelines, and billing.' },
              { icon: UserPlus, title: 'Onboard', desc: 'Invite members by email. Each person uploads selfies, with guidance and support from us.' },
              { icon: Rocket, title: 'Launch', desc: 'Review and download every headshot, then update your site, LinkedIn, and signatures.' },
            ].map((s, i) => (
              <li key={s.title} className="relative rounded-tp-card border border-tp-line bg-tp-paper/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-tp-black font-display text-lg text-tp-bronze">
                    {i + 1}
                  </span>
                  <s.icon className="h-5 w-5 text-tp-bronze" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold text-tp-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:-translate-y-0.5 hover:bg-tp-bronze/90 hover:shadow-lg"
            >
              Start the Conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="bg-tp-black py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-white mb-4">
            Team Pricing
          </h2>
          <p className="text-tp-beige/60 mb-10 max-w-xl mx-auto">
            Volume discounts for teams. Custom plans for enterprise.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { name: 'Small Team', range: '5–15 people', price: '$39', per: 'per person', features: ['40+ photos each', 'Consistent style', 'HD resolution', 'Email support'] },
              { name: 'Company', range: '16–50 people', price: '$29', per: 'per person', features: ['40+ photos each', 'Brand guidelines', '4K resolution', 'Priority support'], popular: true },
              { name: 'Enterprise', range: '50+ people', price: 'Custom', per: 'contact us', features: ['Custom photo packages', 'Admin dashboard', 'Custom onboarding', 'Dedicated manager'] },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-tp-card p-6 text-left ${
                  plan.popular
                    ? 'border-2 border-tp-bronze bg-tp-bronze/5 ring-1 ring-tp-bronze/20'
                    : 'border border-tp-beige/10 bg-white/5'
                }`}
              >
                {plan.popular && (
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-tp-bronze mb-3 block">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <p className="text-xs text-tp-beige/50 mt-0.5">{plan.range}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-xs text-tp-beige/50">{plan.per}</span>
                </div>
                <ul className="mt-5 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-tp-beige/70">
                      <CheckCircle className="h-3.5 w-3.5 text-tp-bronze flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.name === 'Enterprise' ? '/contact' : '/team-headshots'}
                  className={`mt-6 block rounded-tp-button py-3 text-center text-sm font-semibold transition-all ${
                    plan.popular
                      ? 'bg-tp-bronze text-tp-black hover:bg-tp-bronze/90'
                      : 'border border-tp-beige/20 text-tp-beige hover:bg-white/5'
                  }`}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI calculator */}
      <section id="roi" className="pt-16 sm:pt-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
            ROI
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl text-tp-ink">
            See What Your Team Could Save
          </h2>
          <p className="mt-3 text-tp-muted">
            Compare traditional studio shoots with TailorPic for your headshot volume.
          </p>
        </div>
      </section>
      <ROICalculator ctaHref="/contact" ctaLabel="Get a Team Quote" />

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl text-tp-ink sm:text-4xl">Frequently Asked Questions</h2>
          <div className="mt-8 divide-y divide-tp-line rounded-tp-card border border-tp-line bg-white">
            {enterpriseFaqs.map((f) => (
              <details key={f.question} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-tp-ink">
                  {f.question}
                  <span className="text-tp-bronze-ink transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-tp-muted">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Request a demo CTA */}
      <section className="bg-tp-black py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="h-10 w-10 text-tp-bronze mx-auto mb-4" aria-hidden="true" />
          <h2 className="font-display text-3xl sm:text-4xl text-white">
            Request a Demo for Your Team
          </h2>
          <p className="mt-4 text-lg text-tp-beige/70">
            Tell us about your organization and we&apos;ll walk you through the admin dashboard,
            brand guidelines, and a rollout plan that fits.
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-tp-beige/70">
            {['Walkthrough of the team dashboard', 'Custom quote for your team size', 'Answers for your security review'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-tp-bronze" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
            >
              Request a Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/team-headshots"
              className="inline-flex items-center gap-2 rounded-tp-button border border-tp-beige/20 px-6 py-3.5 text-sm font-semibold text-tp-beige transition-all hover:bg-white/5"
            >
              Start with Team Plan
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
