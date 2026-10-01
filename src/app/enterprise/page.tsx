import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import {
  Building2, Users, Shield, Clock, CreditCard, Palette,
  ArrowRight, Check, CheckCircle, Lock, BarChart3, Headphones, Globe,
} from 'lucide-react';

const ROICalculator = dynamic(
  () => import('@/components/marketing/roi-calculator').then((m) => m.ROICalculator),
  { ssr: false },
);

export const metadata: Metadata = {
  title: 'Enterprise AI Headshots for Teams | TailorPic',
  description:
    'Professional AI headshots for your entire organization. Consistent branding, team admin dashboard, volume pricing, and dedicated support.',
  alternates: { canonical: '/enterprise' },
  openGraph: {
    title: 'Enterprise AI Headshots for Teams | TailorPic',
    description: 'Scale professional headshots across your organization with AI.',
    url: `${siteConfig.url}/enterprise`,
    siteName: siteConfig.name,
    type: 'website',
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise AI Headshots for Teams | TailorPic',
    description: 'Scale professional headshots across your organization with AI.',
    images: [siteConfig.ogImage],
  },
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

export default function EnterprisePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'Enterprise', url: `${siteConfig.url}/enterprise` },
      ]} />
      <FAQSchema items={enterpriseFaqs} />
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
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
            >
              Contact Sales <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-xl border border-tp-beige/20 px-6 py-3.5 text-sm font-semibold text-tp-beige transition-all hover:bg-white/5"
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
              { icon: Lock, text: 'Secure Infrastructure' },
              { icon: Users, text: 'Unlimited Team Members' },
              { icon: Clock, text: 'Fast Delivery' },
              { icon: Shield, text: 'Enterprise Security' },
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
              <div key={pain.title} className="rounded-2xl border border-tp-line bg-tp-paper/50 p-6">
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
              { icon: BarChart3, title: 'Usage Analytics', desc: 'Track adoption, photo quality scores, and team utilization in real-time.' },
            ].map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-tp-line p-6 hover:border-tp-bronze/30 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tp-black mb-4">
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
                'Data retention policies you control',
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
                className="inline-flex items-center gap-2 rounded-tp-button bg-tp-ink px-6 py-3 text-sm font-semibold text-tp-paper transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Talk to Sales <ArrowRight className="h-4 w-4" />
              </Link>
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
              { name: 'Enterprise', range: '50+ people', price: 'Custom', per: 'contact us', features: ['Unlimited photos', 'Admin dashboard', 'Custom onboarding', 'Dedicated manager'] },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 text-left ${
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
                  className={`mt-6 block rounded-xl py-3 text-center text-sm font-semibold transition-all ${
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
      <ROICalculator />

      {/* Final CTA */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="h-10 w-10 text-tp-bronze mx-auto mb-4" />
          <h2 className="font-display text-3xl sm:text-4xl text-tp-ink">
            Ready to Upgrade Your Team&apos;s Image?
          </h2>
          <p className="mt-4 text-lg text-tp-muted">
            Tell us about your team and we&apos;ll put together a plan that fits.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-tp-black px-7 py-3.5 text-sm font-semibold text-tp-bronze transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Talk to Sales <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/team-headshots"
              className="inline-flex items-center gap-2 rounded-xl border border-tp-line px-6 py-3.5 text-sm font-semibold text-tp-ink transition-all hover:bg-tp-paper"
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
