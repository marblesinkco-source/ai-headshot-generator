import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import {
  Target,
  Globe,
  TrendingUp,
  Users,
  Briefcase,
  Laptop,
  Clock,
  BookOpen,
  HeartHandshake,
  Sprout,
  Mail,
} from 'lucide-react';

const title = 'Careers at TailorPic';
const description =
  'Join the TailorPic team and help build the future of AI photography. See current openings or send us your resume.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/careers' },
  openGraph: generateOGMetadata({ title: `Careers | ${siteConfig.name}`, description: description, path: '/careers' }),
  twitter: generateTwitterMetadata({ title: `Careers | ${siteConfig.name}`, description: description }),
};

const values = [
  {
    icon: Target,
    title: 'Mission-driven',
    desc: 'We help people show up with confidence through professional photos, and that goal guides the work we do.',
  },
  {
    icon: Globe,
    title: 'Remote-first',
    desc: 'We work across locations and time zones, with a focus on clear communication and trust.',
  },
  {
    icon: TrendingUp,
    title: 'Fast-growing',
    desc: 'AI photography is evolving quickly, and so are we. There is always something new to build and learn.',
  },
  {
    icon: Users,
    title: 'Impact at scale',
    desc: 'What we ship reaches professionals, teams, and businesses everywhere who need better photos.',
  },
];

const perks = [
  { icon: Laptop, title: 'Remote work', desc: 'Work from where you do your best work.' },
  { icon: Clock, title: 'Flexible hours', desc: 'Organize your day around results, not a clock.' },
  { icon: BookOpen, title: 'Learning budget', desc: 'Support for courses, books, and growth.' },
  { icon: HeartHandshake, title: 'Supportive team', desc: 'Collaborative colleagues who help each other succeed.' },
  { icon: Sprout, title: 'Room to grow', desc: 'Take on new challenges as the company grows.' },
  { icon: Briefcase, title: 'Meaningful work', desc: 'Build a product people actually use and care about.' },
];

export default function CareersPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Careers', url: `${siteConfig.url}/careers` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="bg-tp-black py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-7">
          <h1 className="font-display text-4xl font-normal leading-tight text-tp-paper sm:text-5xl">
            Join the TailorPic Team
          </h1>
          <p className="mt-6 text-base leading-relaxed text-tp-beige/70 sm:text-lg">
            Help us build the future of AI photography and make professional-quality photos
            accessible to everyone.
          </p>
        </div>
      </section>

      {/* Why TailorPic */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink sm:text-4xl">
            Why TailorPic
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Current Openings */}
      <section className="bg-tp-beige py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-7">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink sm:text-4xl">
            Current Openings
          </h2>
          <div className="mt-10 rounded-tp-card border border-tp-line bg-white p-8 text-center sm:p-10">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-black">
              <Briefcase className="h-5 w-5 text-tp-bronze" aria-hidden="true" />
            </div>
            <h3 className="font-display text-2xl font-normal text-tp-ink">
              No open positions right now
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-tp-muted sm:text-base">
              We&apos;re not hiring at the moment, but we&apos;d love to hear from you. Send your
              resume and a note about what excites you to careers@tailorpic.com
            </p>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-14">
          <h2 className="font-display text-center text-3xl font-normal text-tp-ink sm:text-4xl">
            Perks
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((p) => (
              <div
                key={p.title}
                className="flex items-start gap-4 rounded-tp-card border border-tp-line bg-white p-6"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-tp-button bg-tp-black">
                  <p.icon className="h-4 w-4 text-tp-bronze" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-tp-ink">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-tp-muted">{p.desc}</p>
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
            Send us your resume
          </h2>
          <p className="mt-4 text-base leading-relaxed text-tp-beige/70">
            Tell us a bit about yourself and what excites you about TailorPic.
          </p>
          <p className="mt-8 inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black">
            <Mail className="h-4 w-4" aria-hidden="true" />
            careers@tailorpic.com
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
