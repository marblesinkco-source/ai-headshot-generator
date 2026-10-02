import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, ProductSchema, FAQSchema } from '@/components/structured-data';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import {
  Clock,
  CheckCircle,
  DollarSign,
  CalendarX,
  ImageOff,
  Star,
  Shield,
  ArrowRight,
  Stethoscope,
  Building2,
  UserCheck,
  Palette,
  RefreshCw,
} from 'lucide-react';

import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
export const metadata: Metadata = {
  title: { absolute: 'AI Headshots for Doctors & Physicians | TailorPic' },
  description:
    'Get professional headshots for doctors, physicians and healthcare professionals. Hospital website ready, insurance panel photos and white coat styles.',
  alternates: { canonical: '/industries/doctors' },
  openGraph: generateOGMetadata({ title: 'AI Headshots for Doctors & Physicians | TailorPic', description: 'AI-powered professional headshots for healthcare professionals. Privacy-conscious, hospital-ready photos delivered in hours.', path: '/industries/doctors', type: 'industry' }),
  
  twitter: generateTwitterMetadata({ title: 'AI Headshots for Doctors & Physicians | TailorPic', description: 'AI-powered professional headshots for healthcare professionals. Privacy-conscious, hospital-ready photos delivered in hours.', type: 'industry' }),
};

const painPoints = [
  {
    icon: CalendarX,
    title: 'Impossible Schedules',
    description:
      'Between rounds, surgeries, and patient appointments, finding time for a professional photo session is nearly impossible. Coordinating an entire department is even harder.',
  },
  {
    icon: DollarSign,
    title: 'Expensive Studio Sessions',
    description:
      'Traditional medical portrait photography costs $400-1,000+ per physician. For a practice or hospital department, updating everyone means thousands of dollars and wasted clinical hours.',
  },
  {
    icon: ImageOff,
    title: 'Inconsistent Practice Photos',
    description:
      'When each doctor gets their headshot at a different time and place, your website and directory end up with a patchwork of mismatched backgrounds, lighting, and styles.',
  },
];

const benefits = [
  {
    icon: Building2,
    title: 'Hospital Website Ready',
    description:
      'High-resolution headshots formatted for hospital directories, department pages, and physician finder tools. Consistent backgrounds that match your institution\'s brand.',
  },
  {
    icon: Shield,
    title: 'Privacy-Conscious Service',
    description:
      'Our process only uses the selfies you upload — no patient data, no clinical settings. Your photos are processed securely and delivered directly to you.',
  },
  {
    icon: UserCheck,
    title: 'Insurance Panel Photos',
    description:
      'Meet insurance directory photo requirements with professional, properly formatted headshots that help patients find and trust their provider.',
  },
  {
    icon: Palette,
    title: 'White Coat & Professional Styles',
    description:
      'Choose from multiple attire options including white coat, scrubs, or business professional — whatever fits your specialty and practice setting.',
  },
  {
    icon: Clock,
    title: '2-Hour Delivery',
    description:
      'Upload selfies between patients, receive polished headshots the same day. No need to block out clinic time or travel to a photography studio.',
  },
  {
    icon: RefreshCw,
    title: 'Easy Updates for New Staff',
    description:
      'New residents, fellows, or attending physicians can get matching headshots on day one. Keep your team page current without scheduling group sessions.',
  },
];

const stats = [
  { value: '40+', label: 'Photos per order' },
  { value: '11+', label: 'Professional styles' },
  { value: '< 2hrs', label: 'From selfies to finished headshots' },
  { value: '$1.99', label: 'Starting price per person' },
];

const faqs = [
  {
    question: "Will the headshots work for hospital and physician directories?",
    answer:
      "Yes. You receive high-resolution headshots with clean, consistent backgrounds that suit hospital websites, department pages, and physician finder tools. Check your institution's size and format requirements before uploading.",
  },
  {
    question: "Can I get a white coat or scrubs look?",
    answer:
      "Yes. You can choose from attire options including white coat, scrubs, or business professional to match your specialty and practice setting.",
  },
  {
    question: "Is my data kept private?",
    answer:
      "The process only uses the selfies you upload. No patient data or clinical settings are involved, and your photos are processed securely and delivered directly to you.",
  },
  {
    question: "Can I fit this around my clinic schedule?",
    answer:
      "Yes. You can upload selfies during a break and receive finished headshots in about 2 hours. There is no studio visit and no clinic time to block out.",
  },
  {
    question: "Can my practice get matching headshots for new staff?",
    answer:
      "Yes. New residents, fellows, or attending physicians can each upload their own selfies and choose the same style. Your team page stays consistent without a group photo session.",
  },
  {
    question: "How much does it cost, and is there a guarantee?",
    answer:
      "Headshots start at $1.99 per person with no subscription required. Every order includes full commercial usage rights.",
  },
];

export default function DoctorsIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name="Professional Headshots for Doctors & Healthcare Professionals"
        description="AI-generated professional headshots for doctors, physicians, and healthcare professionals, suited to hospital directories, insurance panels, and practice websites."
        price={990}
        category="Professional Services"
        slug="industries/doctors"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'Industries', url: `${siteConfig.url}/industries` },
        { name: 'Doctors', url: `${siteConfig.url}/industries/doctors` },
      ]} />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Stethoscope className="h-4 w-4" />
              For Healthcare Professionals
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Healthcare</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Patients choose their doctors online before ever stepping into a clinic. Make a
              confident first impression with AI-powered headshots that project trust,
              competence, and approachability — without leaving your practice.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=/headshots">
                <Button size="lg" className="gap-2">
                  Get Your Medical Headshot
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="border-tp-beige/30 text-tp-beige hover:bg-tp-beige/10">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-tp-line bg-tp-paper py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm text-tp-muted sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-tp-bronze" />
            Privacy-Conscious Process
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-tp-bronze" />
            Same-Day Delivery
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-tp-bronze" />
            Full Commercial Rights
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-tp-bronze" />
            Satisfaction Guaranteed
          </span>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              Getting Headshots Shouldn&apos;t Take Time Away from Patients
            </h2>
            <p className="mt-4 text-lg text-tp-muted">
              Traditional photo sessions don&apos;t work for healthcare schedules.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {painPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="rounded-tp-card border border-tp-line bg-tp-paper/50 p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tp-muted/10">
                    <Icon className="h-6 w-6 text-tp-muted" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{point.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-tp-black py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-tp-bronze sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm text-tp-beige/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              Built for Doctors &amp; Medical Professionals
            </h2>
            <p className="mt-4 text-lg text-tp-muted">
              Headshots designed for every healthcare context — from hospital directories to patient-facing profiles.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="rounded-tp-card border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tp-black">
                    <Icon className="h-6 w-6 text-tp-bronze" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-tp-black py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-tp-bronze text-tp-bronze" />
              ))}
            </div>
            <blockquote className="mt-6 font-display text-2xl font-normal italic leading-relaxed text-tp-paper sm:text-3xl">
              &ldquo;Between hospital rounds and clinic hours, I had zero time for a photo
              session. I uploaded selfies during a lunch break and had polished headshots by
              the end of my shift. The white coat option looked exactly like a professional
              studio shot.&rdquo;
            </blockquote>
            <div className="mt-8">
              <p className="font-semibold text-tp-bronze">Dr. Sarah M.</p>
              <p className="mt-1 text-sm text-tp-beige/60">Internal Medicine Physician</p>
            </div>
            <p className="mt-4 text-xs text-tp-beige/40">
              * Illustrative testimonial for demonstration purposes.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-tp-paper py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-tp-card border border-tp-line bg-white p-6">
                <h3 className="text-lg font-semibold text-tp-ink">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
            Your Patients Are Looking You Up. Look Your Best.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Upgrade your professional image with TailorPic.
            Studio-quality headshots starting at just $1.99.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=/headshots">
              <Button size="lg" className="gap-2">
                Get Your Medical Headshot
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Sales for Practices
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-tp-muted">
            No subscription required. One-time payment.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
