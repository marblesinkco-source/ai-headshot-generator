import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { siteConfig } from '@/config/site';
import {
  ArrowRight,
  Upload,
  Brain,
  Inbox,
  Share2,
  Gamepad2,
  MessageCircle,
  Gem,
  Gift,
  Video,
  Cpu,
  ScanFace,
  ShieldCheck,
  Check,
  Sparkles,
  Zap,
  Crown,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: 'AI Avatars — Your Face in Every Universe | TailorPic',
  description:
    'Transform your selfies into 50 jaw-dropping AI avatars. Fantasy, anime, cyberpunk, renaissance — all with your exact likeness. From $1.99. satisfaction guarantee.',
  alternates: { canonical: '/avatars' },
  openGraph: generateOGMetadata({
    title: 'AI Avatars — Your Face in Every Universe',
    description:
      'Transform your selfies into 50 jaw-dropping AI avatars. Fantasy, anime, cyberpunk, renaissance — all with your exact likeness. From $1.99.',
    path: '/avatars',
  }),
  twitter: generateTwitterMetadata({
    title: 'AI Avatars — Your Face in Every Universe | TailorPic',
    description:
      '30-50 AI avatars that look exactly like you. Fantasy, anime, cyberpunk & more. From $1.99.',
  }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const comparisonRows = [
  { feature: 'Avatars per pack', lensa: '~50', others: '10-40', us: '30-50' },
  { feature: 'Starting price', lensa: '$3.99/week', others: '$29+', us: 'from $1.99' },
  { feature: 'Likeness accuracy', lensa: 'Medium', others: 'Low-Medium', us: 'Ultra-High (Flux AI)' },
  { feature: 'Style variety', lensa: '10+', others: '5-15', us: '15 categories' },
  { feature: 'Resolution', lensa: '512px', others: '512-1024px', us: 'Up to 4K' },
  { feature: 'Subscription?', lensa: 'Yes, recurring', others: 'Often yes', us: 'No — one-time' },
];

const styles = [
  { emoji: '⚔️', name: 'Fantasy Warrior', desc: 'Epic armor, magical realms' },
  { emoji: '🤖', name: 'Cyberpunk', desc: 'Neon cities, tech augmentations' },
  { emoji: '🎌', name: 'Anime Hero', desc: 'Studio-quality anime portraits' },
  { emoji: '🎨', name: 'Renaissance Master', desc: 'Oil painting, classical art' },
  { emoji: '🧙', name: 'Wizard/Sorcerer', desc: 'Mystical robes, magical auras' },
  { emoji: '🚀', name: 'Sci-Fi Commander', desc: 'Space suits, starships' },
  { emoji: '🧛', name: 'Gothic/Vampire', desc: 'Dark elegance, moonlit scenes' },
  { emoji: '👑', name: 'Royal Portrait', desc: 'Crown, throne, regal attire' },
  { emoji: '🎸', name: 'Rock Star', desc: 'Concert stage, leather & guitars' },
  { emoji: '🏴‍☠️', name: 'Pirate Captain', desc: 'Ships, treasure, sea adventures' },
  { emoji: '🥋', name: 'Martial Arts', desc: 'Gi, dojo, warrior poses' },
  { emoji: '🎬', name: 'Movie Poster', desc: 'Cinematic, blockbuster style' },
  { emoji: '🌸', name: 'Watercolor', desc: 'Soft, artistic, dreamy' },
  { emoji: '📸', name: 'Pop Art', desc: 'Warhol-style, bold colors' },
  { emoji: '🎮', name: 'Video Game', desc: 'RPG character, game UI style' },
];

const steps = [
  {
    icon: Upload,
    title: 'Upload 10-20 selfies',
    desc: 'Snap or pick a handful of clear photos of your face.',
    time: '2 minutes',
  },
  {
    icon: Brain,
    title: 'Our AI learns your face',
    desc: 'We train a private model on your features while you do literally anything else.',
    time: 'Works while you sleep',
  },
  {
    icon: Inbox,
    title: 'Get 30-50 unique avatars',
    desc: 'Your finished avatar collection lands in your inbox, ready to download.',
    time: '24 hours',
  },
];

const useCases = [
  { icon: Share2, title: 'Social media profiles', desc: 'Instagram, TikTok, Discord' },
  { icon: Gamepad2, title: 'Gaming profiles', desc: 'Steam, Xbox, PlayStation' },
  { icon: MessageCircle, title: 'Chat apps', desc: 'WhatsApp, Telegram' },
  { icon: Gem, title: 'NFT-ready digital art', desc: 'High-resolution collectible-style art' },
  { icon: Gift, title: 'Personalized gifts & merch', desc: 'Mugs, posters, phone cases' },
  { icon: Video, title: 'Content creation & streaming', desc: 'Channel art, overlays, thumbnails' },
];

const techPoints = [
  {
    icon: Cpu,
    title: 'Built on Flux',
    desc: 'Built on Flux, the most advanced open-source AI model.',
  },
  {
    icon: ScanFace,
    title: 'Face-locked generation',
    desc: 'Face-locked generation ensures YOUR features in every style.',
  },
  {
    icon: Sparkles,
    title: 'Just you, reimagined',
    desc: 'No generic faces. No uncanny valley. Just you, reimagined.',
  },
];

const faqs = [
  {
    question: 'How many selfies do I need?',
    answer:
      'We recommend 10-20 clear selfies with different angles, expressions and lighting. More variety helps the AI capture your face more accurately. It takes about 2 minutes to upload.',
  },
  {
    question: 'How accurate is the likeness?',
    answer:
      'Very accurate. TailorPic Avatars are built on Flux with face-locked generation, so your real features carry through into every style. Results depend on the quality and variety of the selfies you upload.',
  },
  {
    question: "What's included in each pack?",
    answer:
      'The Avatar Pack ($1.99) includes 30 unique avatars across our style categories. The Mega Bundle ($15.90) includes 50 avatars, so you get 20 more for just $6.00 extra. All avatars are delivered in high resolution, up to 4K.',
  },
  {
    question: 'Can I use these commercially?',
    answer:
      'Your avatars are yours to use for social profiles, gaming, streaming, content creation, gifts and merch. Please review our Terms of Service for the full details on commercial usage rights.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Your avatars are ready within 24 hours of uploading your selfies. We email you as soon as they are ready to download.',
  },
  {
    question: "What is your satisfaction guarantee?",
    answer:
      'We offer a satisfaction guarantee. If you are not happy with your avatars, contact support and we will make it right. Your uploaded photos are also automatically deleted after 30 days.',
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AvatarsPage() {
  return (
    <>
      <Header />

      <main id="main-content">
        <BreadcrumbSchema
          items={[
            { name: 'Home', url: siteConfig.url },
            { name: 'AI Avatars', url: `${siteConfig.url}/avatars` },
          ]}
        />
        <FAQSchema items={faqs} />

        {/* ---- 1. Hero ---- */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-purple-600 to-fuchsia-600 py-24 sm:py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-fuchsia-400/30 blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-purple-900/40 blur-[120px]"
          />
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              30 avatars from $1.99
            </span>
            <h1 className="font-display text-5xl font-normal italic leading-tight text-white sm:text-6xl lg:text-7xl">
              Your Face. Every Universe.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
              30 jaw-dropping AI avatars that look exactly like you — as a fantasy warrior,
              cyberpunk hero, anime legend, Renaissance master, and more. All for just $1.99.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/auth/register"
                className={cn(
                  buttonVariants({ variant: 'primary', size: 'lg' }),
                  'w-full bg-white text-tp-black hover:bg-tp-paper sm:w-auto'
                )}
              >
                Create My Avatars — $1.99
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="/auth/register"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'w-full border-white/60 text-white hover:border-white hover:bg-white/10 sm:w-auto'
                )}
              >
                See All 50 Styles — $15.90
              </Link>
            </div>
            <p className="mt-8 text-sm text-white/80">
              🔒 Your photos deleted in 30 days · satisfaction guarantee · Ready in 24 hours
            </p>
          </div>
        </section>

        {/* ---- 2. Comparison ---- */}
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="font-display text-3xl font-normal text-tp-black sm:text-4xl lg:text-5xl">
                Why TailorPic Avatars Blow the Competition Away
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-tp-muted">
                More styles, sharper likeness, higher resolution — and no subscription trap.
              </p>
            </div>

            <div className="mt-12 overflow-x-auto rounded-tp-card border border-tp-line">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-tp-paper">
                    <th scope="col" className="px-4 py-4 font-semibold text-tp-ink">
                      Feature
                    </th>
                    <th scope="col" className="px-4 py-4 font-semibold text-tp-muted">
                      Lensa AI
                    </th>
                    <th scope="col" className="px-4 py-4 font-semibold text-tp-muted">
                      Others
                    </th>
                    <th
                      scope="col"
                      className="bg-gradient-to-br from-purple-600 to-fuchsia-600 px-4 py-4 font-semibold text-white"
                    >
                      TailorPic
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="border-t border-tp-line">
                      <th scope="row" className="px-4 py-4 font-medium text-tp-ink">
                        {row.feature}
                      </th>
                      <td className="px-4 py-4 text-tp-muted">{row.lensa}</td>
                      <td className="px-4 py-4 text-tp-muted">{row.others}</td>
                      <td className="bg-purple-50 px-4 py-4 font-semibold text-purple-800">
                        <span className="inline-flex items-center gap-1.5">
                          <Check className="h-4 w-4 flex-shrink-0 text-green-600" aria-hidden="true" />
                          {row.us}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-tp-muted">
              Prices based on publicly available information as of 2026. Actual pricing may vary.
            </p>
          </div>
        </section>

        {/* ---- 3. Styles ---- */}
        <section className="bg-tp-paper py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="font-display text-3xl font-normal text-tp-black sm:text-4xl lg:text-5xl">
                15 Mind-Blowing Style Categories
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-tp-muted">
                One set of selfies. Fifteen entirely different worlds.
              </p>
            </div>
            <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {styles.map((s) => (
                <li
                  key={s.name}
                  className="flex items-start gap-4 rounded-tp-card border border-tp-line bg-white p-5 transition-shadow hover:shadow-lg"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-tp-button bg-gradient-to-br from-purple-100 to-fuchsia-100 text-2xl"
                  >
                    {s.emoji}
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-semibold text-tp-black">{s.name}</h3>
                    <p className="mt-1 text-sm text-tp-muted">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---- 4. How it works ---- */}
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="font-display text-3xl font-normal text-tp-black sm:text-4xl lg:text-5xl">
                3 Steps. 50 Avatars. Zero Effort.
              </h2>
            </div>
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <li
                    key={step.title}
                    className="relative rounded-tp-card border border-tp-line bg-tp-paper p-6"
                  >
                    <span className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-tp-black text-sm font-semibold text-tp-bronze">
                      {i + 1}
                    </span>
                    <div className="mb-4 mt-2 flex h-12 w-12 items-center justify-center rounded-tp-button bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="font-sans text-lg font-semibold text-tp-black">{step.title}</h3>
                    <p className="mt-2 text-sm text-tp-muted">{step.desc}</p>
                    <p className="mt-4 inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800">
                      {step.time}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ---- 5. Bundle upsell ---- */}
        <section className="bg-tp-black py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="font-display text-3xl font-normal text-white sm:text-4xl lg:text-5xl">
                Want ALL 50? Unlock the Mega Bundle
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-tp-beige/80">
                Add 20 more avatars for just $6.00 extra.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-tp-card border border-white/15 bg-white/5 p-8">
                <h3 className="font-sans text-lg font-semibold text-white">Avatar Pack</h3>
                <p className="mt-1 text-sm text-tp-beige/70">30 unique avatars</p>
                <p className="mt-6 font-display text-5xl font-normal text-white">$1.99</p>
                <p className="mt-1 text-sm text-tp-beige/70">one-time, no subscription</p>
                <Link
                  href="/auth/register"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }),
                    'mt-8 w-full border-white/40 text-white hover:border-white hover:bg-white/10'
                  )}
                >
                  Create My Avatars — $1.99
                </Link>
              </div>
              <div className="relative rounded-tp-card bg-gradient-to-br from-purple-600 to-fuchsia-600 p-8 shadow-xl">
                <span className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-purple-700">
                  <Crown className="h-3.5 w-3.5" aria-hidden="true" />
                  Best Value!
                </span>
                <h3 className="font-sans text-lg font-semibold text-white">Mega Bundle</h3>
                <p className="mt-1 text-sm text-white/80">50 unique avatars</p>
                <p className="mt-6 font-display text-5xl font-normal text-white">$15.90</p>
                <p className="mt-1 text-sm text-white/80">that&apos;s 20 extra avatars for just $6.00 more</p>
                <Link
                  href="/auth/register"
                  className={cn(
                    buttonVariants({ variant: 'primary', size: 'lg' }),
                    'mt-8 w-full bg-white text-tp-black hover:bg-tp-paper'
                  )}
                >
                  Get the Mega Bundle
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ---- 6. Use cases ---- */}
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="font-display text-3xl font-normal text-tp-black sm:text-4xl lg:text-5xl">
                Where Will Your Avatar Show Up?
              </h2>
            </div>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {useCases.map((u) => {
                const Icon = u.icon;
                return (
                  <li
                    key={u.title}
                    className="flex items-center gap-4 rounded-tp-card border border-tp-line bg-tp-paper p-5"
                  >
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-tp-button bg-tp-black text-tp-bronze">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-sans text-base font-semibold text-tp-black">{u.title}</h3>
                      <p className="text-sm text-tp-muted">{u.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ---- 7. Technology ---- */}
        <section className="bg-tp-paper py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="font-display text-3xl font-normal text-tp-black sm:text-4xl lg:text-5xl">
                Powered by Next-Gen AI
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {techPoints.map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-tp-button bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="font-sans text-lg font-semibold text-tp-black">{t.title}</h3>
                    <p className="mt-2 text-sm text-tp-muted">{t.desc}</p>
                  </div>
                );
              })}
            </div>
            <p className="mt-8 flex items-center justify-center gap-2 text-sm text-tp-muted">
              <ShieldCheck className="h-4 w-4 text-tp-bronze-ink" aria-hidden="true" />
              <Zap className="h-4 w-4 text-tp-bronze-ink" aria-hidden="true" />
              Private by design — your photos are deleted after 30 days.
            </p>
          </div>
        </section>

        {/* ---- 8. FAQ ---- */}
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-center font-display text-3xl font-normal text-tp-black sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-10 divide-y divide-tp-line rounded-tp-card border border-tp-line">
              {faqs.map((f) => (
                <details key={f.question} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-sans text-base font-semibold text-tp-black">
                    {f.question}
                    <span
                      aria-hidden="true"
                      className="text-xl text-tp-bronze-ink transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-tp-muted">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---- 9. Final CTA ---- */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-purple-600 to-fuchsia-600 py-20 sm:py-28">
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-display text-4xl font-normal italic text-white sm:text-5xl lg:text-6xl">
              Still Scrolling? Your Avatar Army is Waiting.
            </h2>
            <div className="mt-10">
              <Link
                href="/auth/register"
                className={cn(
                  buttonVariants({ variant: 'primary', size: 'lg' }),
                  'bg-white text-tp-black hover:bg-tp-paper'
                )}
              >
                Create My Avatars — $1.99
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/80">
              satisfaction guarantee · Ready in 24 hours
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
