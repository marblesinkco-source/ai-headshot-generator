import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { HERO_UNIVERSES, HERO_OCCASIONS, STORY_CONFIG } from '@/config/hero-storybook';
import {
  BookOpen,
  Camera,
  Sparkles,
  Gift,
  Shield,
  Clock,
  ChevronRight,
  Users,
  Download,
  Zap,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Create a Hero — Personalized AI Storybook | TailorPic',
  description:
    'Turn anyone into the hero of their own epic story. AI-generated personalized storybooks — the perfect gift for birthdays, promotions, retirements, and more.',
  alternates: { canonical: '/create-a-hero' },
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/80 via-tp-paper to-tp-paper pt-28 sm:pt-36 pb-16 sm:pb-24">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <div className="absolute top-12 left-1/4 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-200/15 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-6">
          <BookOpen className="w-4 h-4" />
          AI-Powered Personalized Storybooks
        </div>

        <h1 className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-tp-black mb-5 leading-tight">
          Turn Anyone Into the
          <br />
          <span className="bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
            Hero of Their Own Story
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-tp-ink max-w-2xl mx-auto mb-8 leading-relaxed">
          Upload a few photos, pick an adventure universe, and our AI writes
          and illustrates a {STORY_CONFIG.minPages}–{STORY_CONFIG.maxPages} page
          storybook starring their face. The most personal gift you can give.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/create-a-hero/start"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white text-lg font-semibold rounded-tp-button shadow-lg shadow-amber-500/20 transition-all hover:shadow-xl hover:shadow-amber-500/30"
          >
            <Sparkles className="w-5 h-5" />
            Create a Storybook
            <ChevronRight className="w-5 h-5" />
          </Link>
          <span className="text-sm text-tp-muted">
            Digital storybook · $19 · Instant delivery
          </span>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: BookOpen,
      title: 'Choose a Universe',
      description:
        'Pick from 6 adventure worlds — space captain, knight, detective, superhero, Viking, or fairy tale.',
    },
    {
      icon: Users,
      title: 'Describe the Hero',
      description:
        'Tell us their name, hobbies, quirks, and catchphrase. The more details, the more personal the story.',
    },
    {
      icon: Camera,
      title: 'Upload 3–5 Photos',
      description:
        'Upload clear photos of the hero. Our AI uses them to generate illustrations with their actual face.',
    },
    {
      icon: Sparkles,
      title: 'Get Your Storybook',
      description:
        'Our AI writes and illustrates the story in minutes. Preview the first 3 pages free, then unlock the full book.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-tp-black mb-3">
            How It Works
          </h2>
          <p className="text-tp-ink text-lg max-w-xl mx-auto">
            From upload to storybook in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={s.title} className="relative text-center">
              {/* Step number */}
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200/60 flex items-center justify-center">
                <s.icon className="w-6 h-6 text-amber-700" />
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-tp-black text-white text-xs font-bold flex items-center justify-center">
                {i + 1}
              </div>
              <h3 className="font-semibold text-tp-black mb-2">{s.title}</h3>
              <p className="text-sm text-tp-ink leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UniverseShowcase() {
  return (
    <section className="py-16 sm:py-24 bg-tp-paper">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-tp-black mb-3">
            6 Adventure Universes
          </h2>
          <p className="text-tp-ink text-lg max-w-xl mx-auto">
            Each universe has its own art style, story arc, and chapter structure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HERO_UNIVERSES.map((u) => (
            <div
              key={u.id}
              className="group bg-white rounded-tp-card border border-tp-line p-6 hover:shadow-lg transition-all hover:border-amber-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{u.icon}</span>
                <h3 className="font-semibold text-tp-black text-lg">{u.name}</h3>
              </div>
              <p className="text-sm text-tp-ink mb-4 leading-relaxed">{u.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {u.sampleChapters.map((ch) => (
                  <span
                    key={ch}
                    className="text-xs px-2.5 py-1 bg-tp-beige text-tp-ink rounded-full"
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/create-a-hero/start"
            className="inline-flex items-center gap-2 px-6 py-3 bg-tp-black hover:bg-tp-ink text-white font-semibold rounded-tp-button transition-colors"
          >
            Choose Your Universe
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function OccasionGrid() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-tp-black mb-3">
            Perfect for Any Occasion
          </h2>
          <p className="text-tp-ink text-lg max-w-xl mx-auto">
            Whether it&apos;s a milestone or just because — a personalized storybook
            is a gift they&apos;ll never forget.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {HERO_OCCASIONS.map((o) => (
            <div
              key={o.id}
              className="flex flex-col items-center gap-2 p-5 bg-tp-paper rounded-tp-card border border-tp-line text-center"
            >
              <span className="text-3xl">{o.icon}</span>
              <span className="text-sm font-medium text-tp-black">{o.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="py-16 sm:py-24 bg-tp-paper">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-tp-black mb-3">
            Simple Pricing
          </h2>
          <p className="text-tp-ink text-lg">
            One product, one price, zero surprises.
          </p>
        </div>

        <div className="bg-white rounded-tp-card border border-tp-line shadow-sm overflow-hidden max-w-md mx-auto">
          <div className="bg-gradient-to-r from-amber-500 to-red-600 px-6 py-4 text-center">
            <h3 className="text-white font-semibold text-lg">Digital Storybook</h3>
          </div>
          <div className="p-8 text-center">
            <div className="mb-6">
              <span className="text-5xl font-bold text-tp-black">$19</span>
              <span className="text-tp-muted ml-1">one-time</span>
            </div>
            <ul className="text-left space-y-3 mb-8">
              {[
                `${STORY_CONFIG.minPages}–${STORY_CONFIG.maxPages} page personalized story`,
                'AI-generated illustrations with their face',
                'Custom story based on their personality',
                'Instant digital delivery',
                'Downloadable PDF',
                'Shareable link for family and friends',
                '3 free preview pages before purchase',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-tp-ink">
                  <Zap className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/create-a-hero/start"
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white font-semibold rounded-tp-button transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Start Creating
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const points = [
    {
      icon: Shield,
      title: 'Privacy First',
      description: `Photos are used solely for illustration and automatically deleted after ${STORY_CONFIG.photoRetentionDays} days. Never used for model training.`,
    },
    {
      icon: Clock,
      title: 'Ready in Minutes',
      description:
        'Our AI writes and illustrates the full storybook in minutes, not days. Preview 3 pages free before you buy.',
    },
    {
      icon: Gift,
      title: 'The Gift They\'ll Remember',
      description:
        'A one-of-a-kind story starring them — far more personal than a card, far more memorable than a gift card.',
    },
    {
      icon: Download,
      title: 'Instant Digital Delivery',
      description:
        'Download as PDF instantly. Share the storybook link with the hero, their family, or the whole team.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {points.map((p) => (
            <div key={p.title} className="flex gap-4">
              <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-amber-50 border border-amber-200/50 flex items-center justify-center">
                <p.icon className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h3 className="font-semibold text-tp-black mb-1">{p.title}</h3>
                <p className="text-sm text-tp-ink leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: 'What age group is this for?',
      a: 'Create a Hero works for all ages — from children\'s birthday stories to retirement tributes for colleagues. The AI adapts the tone and vocabulary to the occasion.',
    },
    {
      q: 'How many photos do I need to upload?',
      a: `You need ${STORY_CONFIG.minPhotos} to ${STORY_CONFIG.maxPhotos} clear photos of the hero. Use well-lit photos with the face clearly visible, including at least one front-facing shot.`,
    },
    {
      q: 'How long does it take to generate a storybook?',
      a: 'The AI generates the full story text and illustrations in a few minutes. You can preview the first 3 pages free before purchasing.',
    },
    {
      q: 'What happens to my photos after the storybook is made?',
      a: `Photos are used solely to generate the illustrations for your storybook. They are automatically deleted after ${STORY_CONFIG.photoRetentionDays} days and are never used for AI model training.`,
    },
    {
      q: 'Can I share the storybook with others?',
      a: 'Yes! After purchase, you get a shareable link that anyone can view, plus a downloadable PDF. It\'s perfect for sharing with the hero, their family, or the whole office.',
    },
    {
      q: 'Are the characters original?',
      a: 'Yes, all characters and storylines are completely original. We never use copyrighted characters, names, or logos from any franchise.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-tp-paper">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-tp-black mb-3">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group bg-white rounded-tp-card border border-tp-line"
            >
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-medium text-tp-black hover:text-tp-bronze transition-colors list-none [&::-webkit-details-marker]:hidden">
                {faq.q}
                <ChevronRight className="w-4 h-4 text-tp-muted transition-transform group-open:rotate-90 flex-shrink-0 ml-4" />
              </summary>
              <div className="px-6 pb-4 text-sm text-tp-ink leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="font-display font-normal text-3xl sm:text-4xl text-tp-black mb-4">
          Ready to Make Someone&apos;s Day?
        </h2>
        <p className="text-lg text-tp-ink mb-8 max-w-xl mx-auto">
          In just a few minutes, you can create a truly one-of-a-kind gift
          they&apos;ll treasure forever.
        </p>
        <Link
          href="/create-a-hero/start"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white text-lg font-semibold rounded-tp-button shadow-lg shadow-amber-500/20 transition-all hover:shadow-xl hover:shadow-amber-500/30"
        >
          <Sparkles className="w-5 h-5" />
          Create a Storybook — $19
        </Link>
        <p className="text-sm text-tp-muted mt-4">
          3 pages free preview · No account required to start
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CreateAHeroPage() {
  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <HowItWorks />
        <UniverseShowcase />
        <OccasionGrid />
        <PricingSection />
        <TrustSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
