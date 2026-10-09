import type { Metadata } from 'next';
import Link from 'next/link';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import {
  Lightbulb,
  Shield,
  Heart,
  Globe,
  Sparkles,
  Laptop,
  TrendingUp,
  Zap,
  Users,
  Code,
  Palette,
  Megaphone,
  Headphones,
  ArrowRight,
} from 'lucide-react';

const title = 'Careers at TailorPic: Join Our AI Photography Team';
const description =
  'Join the TailorPic team and help build the future of AI photography. See how we work and get in touch if you share our passion for quality and craft.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/careers' },
  openGraph: generateOGMetadata({ title, description, path: '/careers' }),
  twitter: generateTwitterMetadata({ title, description }),
};

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    desc: 'We push the boundaries of what AI can do for photography, always exploring new ideas and better approaches.',
  },
  {
    icon: Sparkles,
    title: 'Quality',
    desc: 'Every pixel matters. We hold ourselves to a high standard in everything we ship, from models to UI.',
  },
  {
    icon: Shield,
    title: 'Privacy-first',
    desc: 'Trust is earned. We treat user data with care and build privacy into the product from the ground up.',
  },
  {
    icon: Heart,
    title: 'Customer focus',
    desc: 'Our users shape what we build. We listen closely, iterate quickly, and celebrate their success.',
  },
  {
    icon: Globe,
    title: 'Remote-friendly',
    desc: 'Great work happens everywhere. We support flexible, distributed work across locations and time zones.',
  },
];

const benefits = [
  {
    icon: Laptop,
    title: 'Flexible work',
    desc: 'Work from where you do your best work, on a schedule that fits your life.',
  },
  {
    icon: TrendingUp,
    title: 'Growth',
    desc: 'Learning budget, mentorship, and real ownership over projects that stretch your skills.',
  },
  {
    icon: Zap,
    title: 'Impact',
    desc: 'Ship features that reach thousands of professionals, teams, and businesses every day.',
  },
  {
    icon: Users,
    title: 'Team culture',
    desc: 'Collaborative, supportive colleagues who share knowledge and help each other succeed.',
  },
];

const departments = [
  {
    icon: Code,
    title: 'Engineering',
    desc: 'Build and scale AI models, APIs, and the infrastructure behind millions of photos.',
  },
  {
    icon: Palette,
    title: 'Design',
    desc: 'Craft intuitive experiences that make professional photography accessible to everyone.',
  },
  {
    icon: Megaphone,
    title: 'Marketing',
    desc: 'Tell our story, grow our audience, and connect with the people who need us most.',
  },
  {
    icon: Headphones,
    title: 'Customer Success',
    desc: 'Help users get the most out of TailorPic and turn their feedback into product improvements.',
  },
];

export default function CareersPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Careers', url: `${siteConfig.url}/careers` },
        ]}
      />
      <Header />
      <main id="main-content">

      {/* Hero */}
      <section className="bg-tp-black py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-7">
          <h1 className="font-display text-4xl font-normal leading-tight text-tp-paper sm:text-5xl">
            Join Our Team
          </h1>
          <p className="mt-6 text-base leading-relaxed text-tp-beige/70 sm:text-lg">
            We are building the future of AI photography and we are always looking for talented
            people who care about craft, creativity, and making professional photos accessible to
            everyone.
          </p>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink sm:text-4xl">
            What We Stand For
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-tp-muted sm:text-base">
            These values shape how we work, what we build, and who we look for.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-tp-card border border-tp-line bg-white p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-black">
                  <v.icon className="h-5 w-5 text-tp-bronze" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-normal text-tp-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-tp-beige py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink sm:text-4xl">
            What We Offer
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-tp-muted sm:text-base">
            We want you to do your best work and enjoy doing it.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-tp-card border border-tp-line bg-white p-7 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-black">
                  <b.icon className="h-5 w-5 text-tp-bronze" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-normal text-tp-ink">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas We Hire For */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink sm:text-4xl">
            Areas We Hire For
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-tp-muted sm:text-base">
            We do not always have specific openings listed, but we are always interested in hearing
            from people in these areas.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {departments.map((d) => (
              <div
                key={d.title}
                className="flex items-start gap-4 rounded-tp-card border border-tp-line bg-white p-6"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-tp-button bg-tp-black">
                  <d.icon className="h-4 w-4 text-tp-bronze" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-base font-normal text-tp-ink">{d.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-tp-muted">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-tp-black py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-7">
          <h2 className="font-display text-3xl font-normal text-tp-paper sm:text-4xl">
            Interested? Let&apos;s Talk
          </h2>
          <p className="mt-4 text-base leading-relaxed text-tp-beige/70">
            Tell us a bit about yourself, what you are great at, and what excites you about
            TailorPic. We would love to hear from you.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Get in Touch
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
