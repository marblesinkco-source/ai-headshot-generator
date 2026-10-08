import Image from 'next/image';
import { getIndustryVisual, portrait } from '@/config/stock-portraits';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs } from '@/components/marketing/breadcrumbs';
import { ProductSchema, FAQSchema } from '@/components/structured-data';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { CheckCircle, Scale, ArrowRight } from 'lucide-react';

import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { ContentPhoto } from '@/components/marketing/content-photo';
export const metadata: Metadata = {
  title: { absolute: 'AI Headshots for Lawyers & Law Firms | TailorPic' },
  description:
    'Get professional headshots for lawyers, attorneys and law firms. Build client trust and project authority without expensive studio sessions.',
  alternates: { canonical: '/industries/lawyers' },
  openGraph: generateOGMetadata({ title: 'Attorney & Law Firm Headshots | TailorPic', description: 'AI-powered professional headshots for legal professionals. Bar-compliant, firm-consistent team photos delivered in hours.', path: '/industries/lawyers', type: 'industry' }),
  
  twitter: generateTwitterMetadata({ title: 'Attorney & Law Firm Headshots | TailorPic', description: 'AI-powered professional headshots for legal professionals. Bar-compliant, firm-consistent team photos delivered in hours.', type: 'industry' }),
};

const painPoints = [
  {
    title: 'Expensive Photographer Sessions',
    description:
      'Professional legal headshots cost $300-800+ per attorney. For a mid-size firm with dozens of partners and associates, that adds up to thousands every time photos need updating.',
  },
  {
    title: 'Coordinating Busy Schedules',
    description:
      'Between court appearances, depositions, and client meetings, scheduling a photo session across an entire firm is nearly impossible — especially when new associates join quarterly.',
  },
  {
    title: 'Outdated Website Photos',
    description:
      'Most firm websites feature headshots that are 5-10 years old. Mismatched photos from different eras undermine the polished, unified image your firm works hard to project.',
  },
];

const benefits = [
  {
    title: 'Consistent Firm Branding',
    description:
      'Give every attorney — from senior partner to summer associate — a unified, professional look. Same lighting, same style, same quality across your entire roster.',
  },
  {
    title: 'Professional Authority',
    description:
      'Project the competence and gravitas clients expect. Our AI delivers headshots with the polished, confident look that builds immediate credibility.',
  },
  {
    title: 'Bar Association Compliance',
    description:
      'Headshots that meet state bar directory requirements and professional standards. High-resolution, properly formatted, and appropriate for legal contexts.',
  },
  {
    title: 'Same-Day Turnaround',
    description:
      'New partner joining next week? No problem. Upload selfies from a phone and receive polished headshots within hours — no studio appointment needed.',
  },
  {
    title: 'Multiple Professional Styles',
    description:
      'Get headshots tailored to every context — formal for the firm website, approachable for LinkedIn, authoritative for conference materials and publications.',
  },
  {
    title: 'Easy Team Onboarding',
    description:
      'Streamline the new-hire process. Each attorney uploads their own selfies on their own time, and the firm gets consistent results without coordination overhead.',
  },
];

const stats = [
  { value: '40+', label: 'Professional photos per order' },
  { value: '12', label: 'Styles including business & legal' },
  { value: '$1.99', label: 'Starting price per person' },
  { value: '< 2hrs', label: 'From selfies to finished headshots' },
];

const useCases = [
  'Bar Directory',
  'Firm Website',
  'LinkedIn Profile',
  'Conference Bios',
  'Legal Publications',
  'Court Submissions',
  'Business Cards',
  'Email Signatures',
];

const faqs = [
  {
    question: "Will the headshots work for my state bar directory?",
    answer:
      "The headshots are high-resolution and professionally formatted, which suits most bar directory listings. Because each state bar sets its own photo rules, check your bar's specific requirements before uploading.",
  },
  {
    question: "Can I get consistent headshots across my entire firm?",
    answer:
      "Yes. Each attorney uploads their own selfies and picks the same style, so lighting and backgrounds match across partners and associates. Your team page looks unified without a group photo day.",
  },
  {
    question: "How quickly can a new associate or partner get a headshot?",
    answer:
      "Most headshots are ready within hours after the selfies are uploaded. A lateral hire or new associate can have a matching photo on the firm website the same day.",
  },
  {
    question: "Can I use one set of photos for the firm site, LinkedIn, and conference bios?",
    answer:
      "Yes. You receive multiple professional styles, from formal for the firm website to more approachable for LinkedIn. Your order also includes full commercial rights.",
  },
  {
    question: "How much does it cost compared to a studio session?",
    answer:
      "Headshots start at $1.99 per person, with no subscription required. Team pricing is available for firms that want to onboard several attorneys.",
  },
  {
    question: "What if I am not satisfied with the results?",
    answer:
      "Every order includes commercial usage rights for your headshots.",
  },
];

export default function LawyersIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name="Professional Headshots for Lawyers & Law Firms"
        description="AI-generated professional headshots for attorneys and law firms, with firm-consistent styling suited to bar directories, firm websites, and legal publications."
        price={990}
        category="Professional Services"
        slug="industries/lawyers"
      />
      <FAQSchema items={faqs} />
      <Header />
      <div className="bg-tp-paper pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Industries', href: '/industries' }, { label: 'Lawyers' }]} currentPath="/industries/lawyers" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Image src={portrait(getIndustryVisual("lawyers").heroPortraitId)} alt={getIndustryVisual("lawyers").alt} width={20} height={20} className="h-5 w-5 rounded-full object-cover" />
              For Legal Professionals
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Attorneys & Law Firms</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              In legal practice, trust is everything. Make the right first impression with
              AI-powered headshots that project credibility, authority, and professionalism —
              the qualities clients look for before they ever walk through your door.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots">
                <Button size="lg" className="gap-2">
                  Get Your Headshots
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="border-tp-beige/30 text-tp-beige hover:bg-tp-beige/10">
                  View Pricing
                </Button>
              </Link>
            </div>
          
            {/* Hero portrait */}
            <div className="mx-auto mt-12 h-32 w-32 overflow-hidden rounded-full ring-4 ring-tp-bronze/20 sm:h-40 sm:w-40">
              <Image
                src={portrait(getIndustryVisual("lawyers").heroPortraitId)}
                alt={getIndustryVisual("lawyers").alt}
                width={320}
                height={427}
                sizes="160px"
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-tp-line bg-tp-paper py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm text-tp-muted sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-tp-bronze" />
            Bar-Compliant Quality
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
              The Old Way of Getting Legal Headshots Is Broken
            </h2>
            <p className="mt-4 text-lg text-tp-muted">
              Your firm&apos;s image matters too much for outdated workflows.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {painPoints.map((point) => {
              return (
                <div
                  key={point.title}
                  className="rounded-tp-card border border-tp-line bg-tp-paper/50 p-6"
                >
                  <ContentPhoto slug="lawyers" seed={point.title} className="h-12 w-12 rounded-xl" />
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
              Built for Legal Professionals
            </h2>
            <p className="mt-4 text-lg text-tp-muted">
              Everything your firm needs to project confidence and credibility at every touchpoint.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              return (
                <div
                  key={benefit.title}
                  className="rounded-tp-card border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <ContentPhoto slug="lawyers" seed={benefit.title} className="h-12 w-12 rounded-xl" />
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="border-y border-tp-line bg-tp-paper py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-display font-normal text-tp-ink">
            One Headshot, Everywhere You Need It
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {useCases.map((useCase) => (
              <span
                key={useCase}
                className="rounded-full border border-tp-line bg-white px-5 py-2.5 text-sm font-medium text-tp-ink shadow-sm"
              >
                {useCase}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
            3 Simple Steps to Your New Headshot
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-tp-muted">
            No studio. No photographer. No billable hours wasted.
          </p>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Upload Your Selfies',
                description:
                  'Take 4-10 casual selfies with your phone. Different angles, natural light — our AI handles the rest. Do it between meetings or from home.',
              },
              {
                step: '02',
                title: 'AI Creates Your Headshots',
                description:
                  'Our AI trains a custom model on your features and generates polished, authoritative headshots suited for the legal profession.',
              },
              {
                step: '03',
                title: 'Download & Use Everywhere',
                description:
                  'Receive high-resolution headshots within hours. Use them on your firm website, bar directory, LinkedIn, publications, and more.',
              },
            ].map((item) => {
              return (
                <div key={item.step} className="text-center">
                  <ContentPhoto slug="lawyers" seed={item.title} className="mx-auto h-16 w-16 rounded-tp-card" />
                  <p className="mt-4 text-xs font-bold uppercase tracking-widest text-tp-bronze">
                    Step {item.step}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-tp-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-tp-black py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-normal tracking-tight text-tp-paper sm:text-4xl">
              Ready to Upgrade Your Professional Image?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-tp-beige/70">
              Get studio-quality headshots delivered within hours — no appointment, no studio, no hassle. Starting from just $1.99.
            </p>
            <div className="mt-10">
              <a
                href="/auth/register?redirect=/dashboard/upload"
                className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-8 py-4 text-base font-semibold text-tp-black transition-colors hover:bg-tp-bronze/90"
              >
                Get Your Headshots
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Firm section */}
      <section className="border-b border-tp-line py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
                Managing a Law Firm?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-tp-muted">
                Keep your firm&apos;s team page looking sharp and current. Our team plans make it
                effortless to onboard new attorneys with matching headshot styles — no scheduling
                nightmares, no inconsistent results.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Bulk pricing starting at ~$12/attorney',
                  'Uniform backgrounds and styling across all attorneys',
                  'Easy onboarding — attorneys upload selfies on their own time',
                  'Instant updates when attorneys join or leave the firm',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-tp-muted">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-tp-bronze" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/team-headshots">
                  <Button variant="outline" className="gap-2">
                    Explore Team Plans
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-tp-card border border-tp-line bg-tp-paper p-8 text-center">
              <Scale className="mx-auto h-16 w-16 text-tp-bronze/40" />
              <p className="mt-4 font-display text-4xl font-normal italic text-tp-bronze-ink">
                Team-Ready
              </p>
              <p className="mt-2 text-sm text-tp-muted">
                from solo practitioners to full firms
              </p>
              <p className="mt-6 text-xs text-tp-muted">
                Built for solo practitioners, boutique firms, and large practices across
                every practice area.
              </p>
            </div>
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
            Your Clients Are Looking You Up. Look Your Best.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Upgrade your professional image with TailorPic.
            Studio-quality headshots starting at just $1.99.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots">
              <Button size="lg" className="gap-2">
                Create Your Headshots Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Sales for Firms
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
