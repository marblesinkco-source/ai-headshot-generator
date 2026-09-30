import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import {
  Camera,
  Clock,
  Users,
  CheckCircle,
  DollarSign,
  CalendarX,
  ImageOff,
  Star,
  Shield,
  Sparkles,
  ArrowRight,
  Stethoscope,
  Heart,
  Building2,
  UserCheck,
  Palette,
  RefreshCw,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Headshots for Doctors & Healthcare Professionals | TailorPic',
  description:
    'Get professional headshots for doctors, physicians, and healthcare professionals. Hospital website ready, insurance panel photos, and white coat styles — delivered in 2 hours without disrupting patient care.',
  alternates: { canonical: '/industries/doctors' },
  openGraph: {
    title: `AI Headshots for Doctors & Healthcare Professionals | ${siteConfig.name}`,
    description:
      'AI-powered professional headshots for healthcare professionals. HIPAA-friendly, hospital-ready photos delivered in hours.',
    url: `${siteConfig.url}/industries/doctors`,
  },
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
    title: 'HIPAA-Friendly Service',
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
  { value: '85%', label: 'Faster than traditional photo sessions' },
  { value: '70%', label: 'Lower cost than studio photography' },
  { value: '< 2hrs', label: 'From selfies to finished headshots' },
  { value: '$29', label: 'Starting price vs. $500+ studios' },
];

export default function DoctorsIndustryPage() {
  return (
    <main className="min-h-screen">
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
              <Link href="/headshots">
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
            HIPAA-Friendly Process
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
            Money-Back Guarantee
          </span>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
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
                  className="rounded-2xl border border-red-100 bg-red-50/50 p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
                    <Icon className="h-6 w-6 text-red-600" />
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
            <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
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
                  className="rounded-2xl border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
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

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
            Your Patients Are Looking You Up. Look Your Best.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Join thousands of healthcare professionals who upgraded their image with TailorPic.
            Studio-quality headshots starting at just $9.90.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/headshots">
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
            No subscription required. 14-day money-back guarantee.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
