import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/structured-data';
import { Shield, Zap, Users, Lock, Heart, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about ${siteConfig.name} — the AI photo platform that creates stunning, personalized photos in minutes. Our mission, values, and commitment to privacy.`,
  alternates: { canonical: '/about' },
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description: `Learn about ${siteConfig.name} and our mission to make professional photography accessible to everyone.`,
    url: `${siteConfig.url}/about`,
  },
};

const values = [
  {
    icon: Zap,
    title: 'Speed Without Compromise',
    description:
      'Our AI delivers studio-quality results in hours, not days. No scheduling, no commute, no waiting.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description:
      'Your photos are encrypted end-to-end. We auto-delete all data 30 days after delivery. No third-party sharing, ever.',
  },
  {
    icon: Users,
    title: 'Accessible to Everyone',
    description:
      'Professional-quality photos should not be a luxury. We offer packages starting under $30 so everyone can look their best.',
  },
  {
    icon: Lock,
    title: 'You Own Your Photos',
    description:
      'Full commercial rights on every image we generate. Use them on LinkedIn, your website, business cards — anywhere.',
  },
  {
    icon: Heart,
    title: 'Customer-Obsessed',
    description:
      'Not happy? 100% money-back guarantee within 14 days. Our support team responds within hours, not days.',
  },
  {
    icon: Globe,
    title: 'Built for the World',
    description:
      'Our AI is trained on diverse datasets and serves customers in over 50 countries. Everyone deserves great photos.',
  },
];

const stats = [
  { label: 'Categories', value: '11' },
  { label: 'Photos Generated', value: '50K+' },
  { label: 'Happy Customers', value: '5,000+' },
  { label: 'Satisfaction Rate', value: '97%' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'About', url: `${siteConfig.url}/about` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Your Best Photo,{' '}
            <span className="bg-gradient-to-r from-tp-bronze-ink to-tp-bronze bg-clip-text text-transparent">
              Tailored by AI
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            {siteConfig.name} uses state-of-the-art generative AI to create stunning, personalized
            photos for every occasion — from professional headshots to pet portraits,
            dating profiles to holiday cards. Studio quality, delivered in hours.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-tp-black py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-normal italic text-tp-bronze sm:text-4xl">
            Our Mission
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/80">
            We believe everyone deserves photos they are proud of. Traditional photography is
            expensive, time-consuming, and often inaccessible. We are building AI technology
            that democratizes professional photography — making it fast, affordable, and
            available to anyone, anywhere.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-tp-line py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-tp-bronze-ink sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">What We Stand For</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            Every decision we make is guided by these principles.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tp-black">
                    <Icon className="h-6 w-6 text-tp-bronze" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works summary */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900">How Our AI Works</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600">
            When you upload your selfies, our AI trains a custom model on your unique features.
            This personalized model then generates photos in your chosen style — professional
            headshots, creative portraits, or anything in between. The result is images that
            look genuinely like you, in settings and styles that would normally require a
            professional photographer, studio, and hours of editing.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600">
            We use industry-leading generative AI technology, including fine-tuned diffusion
            models, to ensure every photo meets professional standards while maintaining your
            authentic likeness.
          </p>
        </div>
      </section>

      {/* Team Credibility */}
      <section className="border-t border-tp-line py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Built by a Team That Cares About Quality
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            Every detail of our platform is crafted with care, backed by deep expertise
            in AI and a genuine commitment to our customers.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-tp-black">
                <Zap className="h-6 w-6 text-tp-bronze" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">AI-First Approach</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                We use cutting-edge generative AI models trained specifically for portrait
                photography, delivering results that rival professional studios.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-tp-black">
                <Lock className="h-6 w-6 text-tp-bronze" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Privacy by Design</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Your photos are encrypted end-to-end and automatically deleted after 30 days.
                Privacy is not an afterthought — it is built into every layer of our platform.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-tp-black">
                <Heart className="h-6 w-6 text-tp-bronze" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Customer Obsessed</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                4.9/5 average rating with 98% satisfaction rate and a 14-day money-back
                guarantee. Your happiness is our measure of success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Join thousands of happy customers who have transformed their photo game.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/dashboard/upload">
              <Button size="lg">Create Your Photos</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
