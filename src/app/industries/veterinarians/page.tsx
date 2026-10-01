import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Calendar, Check, Globe, Heart, PawPrint, ShieldCheck, Sparkles, Star, Stethoscope, Upload, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema, ProductSchema } from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const pageTitle = "AI Headshots for Veterinarians | TailorPic";
const pageDescription =
  "Professional AI headshots for veterinarians, vet techs, and animal care teams. Build pet owner trust on your clinic website, Google profile, and directories with portraits delivered in about 2 hours.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/industries/veterinarians' },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}/industries/veterinarians`,
  },
};

const benefits = [
  {
    icon: Heart,
    title: "Earn Pet Owner Trust",
    description: "Pet owners want a caring, capable vet. A friendly, professional headshot helps new clients feel confident before their first visit.",
  },
  {
    icon: Globe,
    title: "Clinic Website & Google Profile",
    description: "High-resolution portraits for your team page, Google Business Profile, and local directories help your clinic stand out in search.",
  },
  {
    icon: Users,
    title: "Consistent Team Photos",
    description: "Give every veterinarian and technician matching headshots without pulling the team away from the clinic for a photo day.",
  },
  {
    icon: ShieldCheck,
    title: "Credibility for Specialists",
    description: "Referral vets and pet owners look for expertise. A polished image next to your credentials supports your authority.",
  },
  {
    icon: Stethoscope,
    title: "Looks Great in a Coat or Scrubs",
    description: "Choose looks that suit your setting, from white coat and scrubs to business casual for speaking and publishing.",
  },
  {
    icon: Calendar,
    title: "Fits a Busy Schedule",
    description: "Skip the studio booking. Upload a few selfies between appointments and get finished portraits without disrupting surgery days.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload 6-10 Selfies",
    description: "Take clear, well-lit selfies with a friendly expression. Varied angles and natural smiles work best.",
  },
  {
    icon: Sparkles,
    title: "Choose Your Style",
    description: "Choose a clinical, business casual, or approachable look with backgrounds that suit your practice.",
  },
  {
    icon: Check,
    title: "Download Your Headshots",
    description: "Receive high-resolution headshots in about 2 hours, ready for your clinic website, Google profile, and directories.",
  },
];

const audiences = [
  {
    icon: Stethoscope,
    title: "Small Animal & Equine Vets",
    description: "Put a caring face on your clinic website so pet owners book with confidence.",
  },
  {
    icon: PawPrint,
    title: "Specialists & Emergency Vets",
    description: "Show referring clinics and owners you are a trusted expert in your field.",
  },
  {
    icon: Heart,
    title: "Vet Techs & Clinic Staff",
    description: "Give your whole care team a professional presence on your team page.",
  },
  {
    icon: Briefcase,
    title: "Practice Owners & Associates",
    description: "Build a consistent brand across your clinic locations, recruiting pages, and social media.",
  },
];

const faqs = [
  {
    question: "Will the headshot work for my clinic website and Google profile?",
    answer: "Yes. You receive high-resolution portraits that suit team pages, Google Business Profiles, directories, and print materials.",
  },
  {
    question: "Can I get headshots in a white coat or scrubs?",
    answer: "You can choose looks that match your setting, including clinical attire or business casual, and the AI adapts your attire to the selected style.",
  },
  {
    question: "Can my whole clinic team get matching headshots?",
    answer: "Yes. Each team member uploads their own selfies and selects the same style and background for a consistent look.",
  },
  {
    question: "Can I use the headshots commercially?",
    answer: "Yes. Every headshot includes full commercial rights for your website, marketing materials, social media, and professional directories.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most headshots are ready in about 2 hours, so you can update your clinic profiles the same day.",
  },
  {
    question: "How many headshots do I get?",
    answer: "Each package delivers multiple variations so you can pick options for your website, social media, and professional listings.",
  },
];

export default function VeterinariansIndustryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProductSchema
        name={"Professional Headshots for Veterinarians"}
        description={"AI-generated professional headshots for veterinarians, vet techs, and animal care teams for clinic websites, Google profiles, and directories."}
        price={990}
        category="Professional Services"
        slug="industries/veterinarians"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Industries', url: `${siteConfig.url}/industries` },
          { name: "Veterinarians", url: `${siteConfig.url}/industries/veterinarians` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-tp-black pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tp-bronze/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-sm font-medium text-tp-bronze">
              <PawPrint className="h-4 w-4" />
              For Veterinarians &amp; Animal Care Teams
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal italic leading-tight text-tp-paper sm:text-5xl lg:text-6xl">
              Professional Headshots for{' '}
              <span className="not-italic text-tp-bronze">Veterinarians</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
              Pet owners trust the people who care for their family. Get a friendly, professional headshot for your clinic website and profiles, without taking time away from your patients.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
                Get Your Veterinarian Headshot
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
            <div className="mt-8 flex items-center justify-center gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-tp-bronze text-tp-bronze" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-tp-line bg-tp-paper py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-sm text-tp-muted sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Clinical & Casual Looks
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Delivered in About 2 Hours
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            Full Commercial Rights
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-tp-bronze" />
            14-Day Money-Back Guarantee
          </span>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
              Show the Care Behind Your Clinic
            </h2>
            <p className="mt-4 text-lg text-tp-muted">One upload gives you portraits for your team page, Google profile, and professional directories.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="tp-card rounded-2xl border border-tp-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
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
            <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Three simple steps from selfie to finished headshot.</p>
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
            <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
              Who Uses TailorPic
            </h2>
            <p className="mt-4 text-lg text-tp-muted">Headshots for veterinarians and animal care professionals.</p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-tp-line bg-white p-6">
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
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-tp-line bg-white p-6">
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
          <h2 className="text-3xl font-extrabold tracking-tight text-tp-ink sm:text-4xl">
            Help Pet Owners Choose You With Confidence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-tp-muted">
            Get a headshot that shows the skill and compassion you bring to every patient.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
              Get Your Veterinarian Headshot
            </Link>
            <Link href="/pricing" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              View Pricing
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
