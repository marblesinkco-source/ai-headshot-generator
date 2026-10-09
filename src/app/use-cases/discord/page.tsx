import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Camera, Check, Gamepad2, Palette, Shield, Sparkles, Upload, UserCheck, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs } from '@/components/marketing/breadcrumbs';
import { FAQSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';

const pageTitle = "AI Profile Photos for Discord | Creative Avatars | TailorPic";
const pageDescription =
  'Creative AI avatars for Discord servers and gaming communities. Get a standout profile picture from a few selfies, from realistic to stylized. From $1.99.';

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/use-cases/discord' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/use-cases/discord', type: 'usecase' }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'usecase' }),
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: "AI Profile Photos for Discord",
  description: "Creative avatars for Discord servers and gaming communities",
  url: 'https://www.tailorpic.com/use-cases/discord',
  brand: { '@type': 'Brand', name: 'TailorPic' },
  category: 'Professional Services',
  offers: {
    '@type': 'Offer',
    price: '1.99',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://www.tailorpic.com/use-cases/discord',
  },
};

const benefits = [
  {
    icon: UserCheck,
    title: "Be Recognizable Everywhere",
    description: "Members spot your avatar in chat, voice channels, and member lists. A distinctive photo makes you easy to remember across servers.",
  },
  {
    icon: Palette,
    title: "Creative Styles",
    description: "Go from realistic portraits to bold, artistic looks that match your personality, your game, or your community theme.",
  },
  {
    icon: Camera,
    title: "Built for the Circular Crop",
    description: "Your face stays centered and sharp inside Discord's round avatar frame at chat size and in the full profile view.",
  },
  {
    icon: Users,
    title: "Look Credible as a Mod or Admin",
    description: "A clear, confident avatar helps server owners, moderators, and community managers look approachable and trustworthy.",
  },
  {
    icon: Shield,
    title: "Your Photos, Your Rights",
    description: "You own every image with no watermarks. Use them on Discord, Twitch, YouTube, Steam, and anywhere else.",
  },
  {
    icon: Sparkles,
    title: "Refresh Anytime",
    description: "Change your look for a new season, a new community, or a new stream without a photoshoot.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload a Few Selfies",
    description: "Share 6-10 clear phone photos with different expressions and angles. No retouching needed.",
  },
  {
    icon: Palette,
    title: "Choose Your Style",
    description: "Pick a realistic, casual, or creative look and a background that fits your vibe.",
  },
  {
    icon: Check,
    title: "Download and Update Discord",
    description: "Get your high-resolution photos within hours, then set your favorite in User Settings.",
  },
];

const features = [
  {
    icon: Gamepad2,
    title: "Gamers & Streamers",
    description: "Match your Discord avatar to your Twitch and YouTube presence for a consistent brand.",
  },
  {
    icon: Users,
    title: "Community Managers & Mods",
    description: "Look approachable and credible to the members you welcome and moderate.",
  },
  {
    icon: Sparkles,
    title: "Creators & Artists",
    description: "Give fans and commissioners a memorable face to connect with.",
  },
  {
    icon: Briefcase,
    title: "Web3 & Startup Teams",
    description: "Show up professionally in community servers for your project or company.",
  },
];

const faqs = [
  {
    question: "Can I use an AI photo as my Discord avatar?",
    answer: "Yes. Discord lets you upload any image you own as your avatar, and you own full rights to your TailorPic photos.",
  },
  {
    question: "Will it still look like me?",
    answer: "Yes. TailorPic is trained on your own selfies, so results keep your real features. You can choose more realistic or more stylized looks.",
  },
  {
    question: "Does it work for animated avatars?",
    answer: "TailorPic delivers high-resolution still images. You can use them as static avatars, server profile pictures, or as the base for your own edits.",
  },
  {
    question: "Can I use the same photo on other platforms?",
    answer: "Absolutely. Use it on Twitch, YouTube, Steam, X, and anywhere else you want a consistent identity.",
  },
  {
    question: "How much does it cost?",
    answer: "TailorPic starts at $1.99 per pack, so you can refresh your look whenever you want.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most orders arrive within hours after you upload your selfies.",
  },
];

export default function DiscordUseCasePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <FAQSchema items={faqs} />
      <Header />
      <div className="bg-tp-paper pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Use Cases', href: '/use-cases' }, { label: 'Discord' }]} currentPath="/use-cases/discord" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Gamepad2 className="h-4 w-4" />
              Discord Profile Photos
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              AI Profile Photos for{' '}
              <span className="not-italic text-tp-bronze">Discord</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Stand out in every server with an avatar that is unmistakably you. Get a creative, high-quality Discord profile picture from a handful of selfies. Delivered within hours, starting at just $1.99.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Discord Avatar
              </Link>
              <Link
                href="/pricing"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'border-tp-beige/30 text-tp-beige hover:bg-tp-beige/10'
                )}
              >
                View Pricing
              </Link>
            </div>
              ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-tp-line bg-tp-paper py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm text-tp-muted sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Looks Great in the Circle
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Delivered Within Hours
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Starting at $1.99
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Quality Commitment
          </span>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              Why Your Discord Avatar Matters
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Your avatar is your identity in every server, voice channel, and DM.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="tp-card rounded-tp-card border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
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

      {/* How it works */}
      <section className="bg-tp-paper py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-tp-muted">From selfie to new Discord avatar in three steps.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tp-black">
                    <Icon className="h-6 w-6 text-tp-bronze" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-tp-bronze-ink">Step {index + 1}</p>
                  <h3 className="mt-1 text-lg font-semibold text-tp-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              Who Uses TailorPic for Discord
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Great avatars for everyone who hangs out online.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-tp-card border border-tp-line bg-white p-6">
                  <Icon className="h-6 w-6 text-tp-bronze" />
                  <h3 className="mt-4 text-lg font-semibold text-tp-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{item.description}</p>
                </div>
              );
            })}
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
            Level Up Your Discord Identity
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Stand out in every server and channel. Starting at just $1.99.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Discord Avatar
            </Link>
            <Link href="/pricing" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              View Pricing
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
