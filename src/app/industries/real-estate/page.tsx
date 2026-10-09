import Image from 'next/image';
import { getIndustryVisual, portrait } from '@/config/stock-portraits';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs } from '@/components/marketing/breadcrumbs';
import { ProductSchema, FAQSchema } from '@/components/structured-data';
import { Button } from '@/components/ui/button';
import { Users, CheckCircle, ArrowRight } from 'lucide-react';
import { BASE_PRICE_DISPLAY, TEAM_PRICE_LARGE_DISPLAY } from '@/config/pricing';

import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { ContentPhoto } from '@/components/marketing/content-photo';
export const metadata: Metadata = {
  title: { absolute: 'AI Headshots for Real Estate Agents | TailorPic' },
  description:
    'Get MLS-ready professional headshots for real estate agents and brokers. Build trust, win listings and stand out in a competitive market without a studio.',
  alternates: { canonical: '/industries/real-estate' },
  openGraph: generateOGMetadata({ title: 'Real Estate Agent Headshots | TailorPic', description: 'AI-powered professional headshots built for real estate. MLS-ready, brand-consistent team photos delivered in hours.', path: '/industries/real-estate', type: 'industry' }),
  
  twitter: generateTwitterMetadata({ title: 'Real Estate Agent Headshots | TailorPic', description: 'AI-powered professional headshots built for real estate. MLS-ready, brand-consistent team photos delivered in hours.', type: 'industry' }),
};

const painPoints = [
  {
    title: 'Expensive Studio Sessions',
    description:
      'Traditional real estate headshots add up fast across a brokerage. Multiply the per-agent cost by your whole team and the total becomes staggering.',
  },
  {
    title: 'Impossible Scheduling',
    description:
      'Coordinating photographers with agents who are always on the road showing properties is a logistical nightmare that drags on for weeks.',
  },
  {
    title: 'Inconsistent Team Photos',
    description:
      'When each agent books their own photographer, your brokerage ends up with a patchwork of styles, backgrounds, and quality levels.',
  },
];

const benefits = [
  {
    title: 'MLS-Ready Photos',
    description:
      'Every headshot meets MLS dimension and quality requirements out of the box. Upload directly to your MLS profile, Zillow, Realtor.com, and more.',
  },
  {
    title: 'Consistent Team Branding',
    description:
      'Give your entire brokerage a unified, polished look. Same lighting, same style, same professional standard across every agent.',
  },
  {
    title: 'Build Your Personal Brand',
    description:
      'Stand out on yard signs, business cards, email signatures, and social media with headshots that convey trust and expertise.',
  },
  {
    title: 'Ready in Hours, Not Weeks',
    description:
      'Skip the scheduling back-and-forth. Upload selfies from your phone and receive polished, professional headshots the same day.',
  },
  {
    title: 'Multiple Looks, One Session',
    description:
      'Get headshots for every use case — formal for MLS, approachable for social media, branded for your brokerage materials.',
  },
  {
    title: 'Proven ROI',
    description:
      'Professional photos are not a vanity expense. They directly impact inquiry rates, listing appointments, and client trust.',
  },
];

const stats = [
  { value: '40+', label: 'Professional photos per order' },
  { value: '12', label: 'Styles including business & headshot' },
  { value: `${BASE_PRICE_DISPLAY}`, label: 'Starting price per person' },
  { value: 'Within hours', label: 'From selfies to finished headshots' },
];

const useCases = [
  'MLS Listings',
  'Zillow & Realtor.com',
  'Yard Signs & Flyers',
  'Business Cards',
  'Email Signatures',
  'Social Media Profiles',
  'Brokerage Websites',
  'Marketing Materials',
];

const faqs = [
  {
    question: "Are the headshots suitable for MLS, Zillow, and Realtor.com profiles?",
    answer:
      "The headshots are delivered in high resolution, which suits most MLS and listing portal profiles. Each MLS sets its own photo rules, so check your local requirements before uploading.",
  },
  {
    question: "Can I use them on yard signs, business cards, and flyers?",
    answer:
      "Yes. The high-resolution files work for print and digital materials, and your order includes full commercial rights. That covers signage, business cards, email signatures, and social media.",
  },
  {
    question: "How fast can I get my headshots between showings?",
    answer:
      "You can upload selfies from your phone at any time and typically receive finished headshots within hours. There is no photographer to schedule around your showings.",
  },
  {
    question: "Can my whole brokerage get matching headshots?",
    answer:
      "Yes. Each agent uploads their own selfies on their own time and chooses the same style, so the team looks consistent. Team pricing is also available for brokerages.",
  },
  {
    question: "How much does it cost compared to a photographer?",
    answer:
      `Headshots start at ${BASE_PRICE_DISPLAY} per person with no subscription required. Traditional real estate headshot sessions often cost far more per agent.`,
  },
  {
    question: "What if I am not happy with my headshots?",
    answer:
      "Every order includes full commercial usage rights for your headshots.",
  },
];

export default function RealEstateIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name="Professional Headshots for Real Estate Agents"
        description="AI-generated professional headshots for real estate agents and brokerages, sized for MLS profiles, listing portals, signage, and marketing materials."
        price={990}
        category="Professional Services"
        slug="industries/real-estate"
      />
      <FAQSchema items={faqs} />
      <Header />
      <div className="bg-tp-paper pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Industries', href: '/industries' }, { label: 'Real Estate Agents' }]} currentPath="/industries/real-estate" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Image src={portrait(getIndustryVisual("real-estate").heroPortraitId)} alt={getIndustryVisual("real-estate").alt} width={20} height={20} className="h-5 w-5 rounded-full object-cover" />
              For Real Estate Professionals
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Real Estate Agents</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              In real estate, your face is your brand. Make the first impression count with
              AI-powered headshots that build trust, win listings, and look stunning on every
              property marketing piece.
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
                src={portrait(getIndustryVisual("real-estate").heroPortraitId)}
                alt={getIndustryVisual("real-estate").alt}
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
            MLS-Ready Resolution
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
            Quality Commitment
          </span>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              Traditional Headshots Are Broken
            </h2>
            <p className="mt-4 text-lg text-tp-muted">
              Real estate moves fast. Your headshot workflow should too.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {painPoints.map((point) => {
              return (
                <div
                  key={point.title}
                  className="rounded-tp-card border border-tp-line bg-tp-paper/50 p-6"
                >
                  <ContentPhoto slug="real-estate" seed={point.title} className="h-12 w-12 rounded-xl" />
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
              Built for Real Estate Professionals
            </h2>
            <p className="mt-4 text-lg text-tp-muted">
              Everything you need to look your best across every platform and marketing channel.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              return (
                <div
                  key={benefit.title}
                  className="rounded-tp-card border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <ContentPhoto slug="real-estate" seed={benefit.title} className="h-12 w-12 rounded-xl" />
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
            No studio. No photographer. No hassle.
          </p>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Upload Your Selfies',
                description:
                  'Take 4-10 casual selfies with your phone. Different angles, natural light, everyday clothes — our AI handles the rest.',
              },
              {
                step: '02',
                title: 'AI Does the Magic',
                description:
                  'Our AI trains a custom model on your features and generates polished, professional headshots in your chosen style.',
              },
              {
                step: '03',
                title: 'Download & Use Everywhere',
                description:
                  'Get MLS-ready, high-resolution headshots delivered to your dashboard within hours. Download and start using immediately.',
              },
            ].map((item) => {
              return (
                <div key={item.step} className="text-center">
                  <ContentPhoto slug="real-estate" seed={item.title} className="mx-auto h-16 w-16 rounded-tp-card" />
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
              Get studio-quality headshots delivered within hours — no appointment, no studio, no hassle. Starting from just {BASE_PRICE_DISPLAY}.
            </p>
            <div className="mt-10">
              <a
                href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
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

      {/* Team section */}
      <section className="border-b border-tp-line py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
                Managing a Brokerage?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-tp-muted">
                Get your entire team looking sharp and consistent. Our team plans make it easy to
                onboard agents with matching headshot styles — no coordination headaches.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  `Bulk pricing from ${TEAM_PRICE_LARGE_DISPLAY}/person for teams of 16+`,
                  'Consistent backgrounds and styling across all agents',
                  'Easy onboarding — agents upload selfies on their own time',
                  'Brand color matching for your brokerage identity',
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
              <Users className="mx-auto h-16 w-16 text-tp-bronze/40" />
              <p className="mt-4 font-display text-4xl font-normal italic text-tp-bronze-ink">
                Team-Ready
              </p>
              <p className="mt-2 text-sm text-tp-muted">
                from solo agents to full brokerages
              </p>
              <p className="mt-6 text-xs text-tp-muted">
                Built for solo agents, boutique teams, and large brokerages across
                every market.
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
            Your Next Listing Deserves a Better Headshot
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Upgrade your professional image with TailorPic.
            Studio-quality headshots starting at just {BASE_PRICE_DISPLAY}.
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
                Contact Sales for Teams
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
