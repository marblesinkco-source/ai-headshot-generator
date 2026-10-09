import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Check, Clock, Crop, GraduationCap, Shield, Sparkles, Trophy, Upload, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Breadcrumbs } from '@/components/marketing/breadcrumbs';
import { FAQSchema, ProductSchema, BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

const pageTitle = "AI Headshots for Sports Team Rosters | TailorPic";
const pageDescription =
  `Professional headshots for team rosters, player cards, and coaching staff pages. Get polished portraits from a few selfies within hours. Starting at ${BASE_PRICE_DISPLAY}.`;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/use-cases/sports-team-roster' },
  openGraph: generateOGMetadata({ title: pageTitle, description: pageDescription, path: '/use-cases/sports-team-roster', type: 'usecase' }),
  twitter: generateTwitterMetadata({ title: pageTitle, description: pageDescription, type: 'usecase' }),
};


const benefits = [
  {
    icon: Trophy,
    title: "Look Like a Team",
    description: "Matching framing and backgrounds make your roster page and player cards look unified.",
  },
  {
    icon: Clock,
    title: "No Team Photo Day",
    description: "Players submit portraits from home, handy when schedules and travel get in the way.",
  },
  {
    icon: Crop,
    title: "Composed for Player Cards",
    description: "Faces are centered so they crop cleanly into cards, graphics, and thumbnails.",
  },
  {
    icon: Sparkles,
    title: "Confident Expressions",
    description: "Choose a serious game-face or a friendly smile to fit your team brand.",
  },
  {
    icon: Shield,
    title: "Your Photos, Your Rights",
    description: "You own every image with no watermarks, free to reuse on rosters, programs, and social posts.",
  },
  {
    icon: Users,
    title: "Great for Recruiting",
    description: "Give athletes a clear, professional photo for recruiting profiles.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload a Few Selfies",
    description: "Share 6-10 clear phone photos with different expressions. Natural daylight works best.",
  },
  {
    icon: Users,
    title: "Choose a Team-Ready Style",
    description: "Pick a serious or friendly look and a background that fits your team colors.",
  },
  {
    icon: Check,
    title: "Download and Send to Your Coach",
    description: "Get high-resolution photos within hours, then share them with your team manager.",
  },
];

const features = [
  {
    icon: Trophy,
    title: "Players",
    description: "Get a sharp photo for roster pages and player cards.",
  },
  {
    icon: Users,
    title: "Coaches & Staff",
    description: "Keep coaching staff portraits matching and professional.",
  },
  {
    icon: Briefcase,
    title: "Club Managers",
    description: "Collect consistent photos across age groups and squads.",
  },
  {
    icon: GraduationCap,
    title: "Student Athletes",
    description: "Build a clean profile for recruiting and school sports pages.",
  },
];

const faqs = [
  {
    question: "Can I use the photo on a player card?",
    answer: "Yes. You own the images and can use them on rosters, player cards, programs, and social graphics.",
  },
  {
    question: "Will the photo look like me?",
    answer: "Yes. TailorPic is trained on your own selfies, so results keep your real features and natural expression.",
  },
  {
    question: "Will it show my jersey?",
    answer: "Portraits are generated from your selfies, so they focus on your face and natural look rather than a specific uniform.",
  },
  {
    question: "Can a whole team use it?",
    answer: "Yes. Each player uploads their own selfies, and you can suggest a common style and background for consistency.",
  },
  {
    question: "How much does it cost?",
    answer: `TailorPic starts at ${BASE_PRICE_DISPLAY} per pack, far less than a photographer session.`,
  },
  {
    question: "How long does delivery take?",
    answer: "Most orders arrive within hours after you upload your selfies.",
  },
];

export default function SportsTeamRosterUseCasePage() {
  return (
    <>
      <ProductSchema
        name="TailorPic"
        description="Professional portraits for sports team rosters and player profiles"
        price={199}
        category="Professional Services"
        slug="use-cases/sports-team-roster"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
          items={[
            { name: 'Home', url: siteConfig.url },
            { name: 'Use Cases', url: `${siteConfig.url}/use-cases` },
            { name: 'Sports Team Roster', url: `${siteConfig.url}/use-cases/sports-team-roster` },
          ]}
        />
      <Header />
      <main id="main-content">
      <div className="bg-tp-paper pt-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Use Cases', href: '/use-cases' }, { label: 'Sports Team Roster' }]} currentPath="/use-cases/sports-team-roster" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <Trophy className="h-4 w-4" />
              {"Sports Team Roster"}
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              {"AI Headshots for "}
              <span className="not-italic text-tp-bronze">{"Sports Team Rosters"}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              {`Give every player and coach a sharp roster portrait without a team photo day. Get polished headshots from a handful of selfies, delivered within hours, starting at just ${BASE_PRICE_DISPLAY}.`}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                {"Get Your Roster Photo"}
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
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-tp-line bg-tp-paper py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm text-tp-muted sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {"Consistent Roster Look"}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {"Delivered Within Hours"}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {`Starting at ${BASE_PRICE_DISPLAY}`}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            {"Quality Commitment"}
          </span>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-normal tracking-tight text-tp-ink sm:text-4xl">
              {"Why Roster Photos Matter"}
            </h2>
            <p className="mt-4 text-lg text-tp-muted">{"Fans, recruiters, and sponsors look at your roster first."}</p>
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
            <p className="mt-4 text-lg text-tp-muted">{"From selfie to finished portrait in three steps."}</p>
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
              {"Who Uses TailorPic for Rosters"}
            </h2>
            <p className="mt-4 text-lg text-tp-muted">{"Great portraits for everyone on and around the team."}</p>
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
            {"Give Your Roster a Winning Look"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            {`Make every player card sharp and consistent. Starting at just ${BASE_PRICE_DISPLAY}.`}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              {"Get Your Roster Photo"}
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

      </main>

      <Footer />
    </>
  );
}
