import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { formatPrice } from '@/config/pricing';
import { CATEGORIES } from '@/config/categories';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import {
  Gift,
  ArrowRight,
  Mail,
  Camera,
  GraduationCap,
  Cake,
  Briefcase,
  CalendarHeart,
  Users,
  Heart,
  ChevronDown,
  Star,
  Check,
} from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'Gift Cards: Give Professional AI Headshots | TailorPic' },
  description:
    'Give the gift of professional AI headshots. TailorPic gift cards are perfect for graduation, birthdays, job seekers, and anyone who needs a polished professional photo.',
  alternates: { canonical: '/gift-cards' },
  openGraph: generateOGMetadata({
    title: `Gift Cards | ${siteConfig.name}`,
    description:
      'Give the gift of professional AI headshots. Perfect for graduation, birthdays, job seekers, and more.',
    path: '/gift-cards',
  }),
  twitter: generateTwitterMetadata({
    title: `Gift Cards | ${siteConfig.name}`,
    description:
      'Give the gift of professional AI headshots. Perfect for graduation, birthdays, job seekers, and more.',
  }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const steps = [
  {
    step: '01',
    icon: Gift,
    title: 'Choose an Amount',
    desc: 'Pick from one of our gift card tiers, each matched to a headshot package so the recipient gets the most value.',
  },
  {
    step: '02',
    icon: Mail,
    title: 'Recipient Gets an Email',
    desc: 'We send a beautifully designed gift card email to the recipient with a personal message from you.',
  },
  {
    step: '03',
    icon: Camera,
    title: 'They Create Their Photos',
    desc: 'The recipient uploads a few selfies and receives studio-quality AI headshots -- ready for LinkedIn, resumes, and more.',
  },
];

const pkgs = CATEGORIES.headshots.packages;

const giftCards = [
  {
    name: 'Starter',
    price: formatPrice(pkgs[2]?.price ?? 1990),
    photos: pkgs[2]?.outputCount ?? 10,
    package: 'Basic',
    recommended: false,
    label: null,
  },
  {
    name: 'Popular',
    price: formatPrice(pkgs[3]?.price ?? 2990),
    photos: pkgs[3]?.outputCount ?? 40,
    package: 'Starter',
    recommended: false,
    label: null,
  },
  {
    name: 'Best Value',
    price: formatPrice(pkgs[4]?.price ?? 4990),
    photos: pkgs[4]?.outputCount ?? 80,
    package: 'Professional',
    recommended: true,
    label: 'Recommended',
  },
  {
    name: 'Premium',
    price: formatPrice(pkgs[5]?.price ?? 8990),
    photos: pkgs[5]?.outputCount ?? 160,
    package: 'Executive',
    recommended: false,
    label: null,
  },
];

const occasions = [
  {
    icon: GraduationCap,
    title: 'Graduation',
    desc: 'Help new grads put their best face forward as they enter the job market.',
  },
  {
    icon: Cake,
    title: 'Birthday',
    desc: 'A unique, practical gift that keeps on giving every time they update a profile.',
  },
  {
    icon: Briefcase,
    title: 'Job Seekers',
    desc: 'Give someone you care about a professional edge in their search.',
  },
  {
    icon: CalendarHeart,
    title: 'New Year, New Look',
    desc: 'Start the year fresh with a polished photo for every platform.',
  },
  {
    icon: Users,
    title: 'Team Gifts',
    desc: 'Outfit your team with matching professional headshots for a unified brand.',
  },
  {
    icon: Heart,
    title: 'Thank You',
    desc: 'Show appreciation with a thoughtful, memorable gift they will actually use.',
  },
];

const faqItems = [
  {
    q: 'How do TailorPic gift cards work?',
    a: 'Contact us to purchase a gift card. We will send a beautifully designed email to the recipient with instructions on how to redeem their gift. They upload a few selfies and receive professional AI headshots.',
  },
  {
    q: 'Do gift cards expire?',
    a: 'No, TailorPic gift cards do not expire. The recipient can redeem their gift whenever they are ready.',
  },
  {
    q: 'Can I choose a custom amount?',
    a: 'We offer four preset tiers matched to our headshot packages, but if you need a different amount or want to combine tiers, reach out to us through the contact page and we will work something out.',
  },
  {
    q: 'Can I send gift cards to multiple people?',
    a: 'Absolutely. Contact us with the details and we will set up individual gift cards for each recipient. This is popular for team gifts and holiday giving.',
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function GiftCardsPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Gift Cards', url: `${siteConfig.url}/gift-cards` },
        ]}
      />
      <FAQSchema
        items={faqItems.map((item) => ({ question: item.q, answer: item.a }))}
      />
      <Header />

      {/* ── Hero ── */}
      <section className="relative bg-tp-black py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#C9A98A_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,#C9A98A_0%,transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-xs font-semibold text-tp-bronze mb-8">
            <Gift className="h-3.5 w-3.5" />
            Gift Cards
          </div>
          <h1 className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            Give the Gift of a
            <br className="hidden sm:block" />
            <span className="text-tp-bronze"> Great Photo</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-tp-beige/70 max-w-2xl mx-auto leading-relaxed">
            Professional AI headshots make a thoughtful, practical gift for
            graduates, job seekers, birthdays, holidays, and anyone who wants to
            look their best online.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?subject=gift-card"
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-8 py-4 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-tp-bronze/20"
            >
              Get in Touch to Order <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#gift-options"
              className="inline-flex items-center gap-2 rounded-tp-button border border-white/20 px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-white/5"
            >
              See Gift Options
            </a>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              Simple Process
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              How It Works
            </h2>
            <p className="mt-4 text-tp-muted max-w-xl mx-auto">
              Three easy steps from gift to gorgeous headshots.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.step} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-7 left-[60%] w-[80%] border-t border-dashed border-tp-line" />
                )}
                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tp-black mb-5">
                  <s.icon className="h-6 w-6 text-tp-bronze" />
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-tp-bronze text-[11px] font-semibold text-tp-black">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-tp-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed max-w-xs mx-auto">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gift Card Options ── */}
      <section id="gift-options" className="bg-tp-paper py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              Choose a Gift
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              Gift Card Options
            </h2>
            <p className="mt-4 text-tp-muted max-w-xl mx-auto">
              Each tier is matched to a headshot package so the recipient gets
              full value. Contact us to purchase.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {giftCards.map((card) => (
              <div
                key={card.name}
                className={`relative rounded-tp-card border bg-white p-6 flex flex-col ${
                  card.recommended
                    ? 'border-tp-bronze ring-2 ring-tp-bronze/20'
                    : 'border-tp-line'
                }`}
              >
                {card.label && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-tp-bronze px-3 py-1 text-[11px] font-semibold text-tp-black">
                      <Star className="h-3 w-3" />
                      {card.label}
                    </span>
                  </div>
                )}
                <div className="text-center mb-4 pt-2">
                  <p className="text-sm font-semibold text-tp-bronze-ink uppercase tracking-wide">
                    {card.name}
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-tp-ink">
                    {card.price}
                  </p>
                </div>
                <div className="border-t border-tp-line pt-4 mb-6 flex-1">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm text-tp-muted">
                      <Check className="h-4 w-4 mt-0.5 text-tp-bronze flex-shrink-0" />
                      {card.photos} professional headshots
                    </li>
                    <li className="flex items-start gap-2 text-sm text-tp-muted">
                      <Check className="h-4 w-4 mt-0.5 text-tp-bronze flex-shrink-0" />
                      {card.package} package included
                    </li>
                    <li className="flex items-start gap-2 text-sm text-tp-muted">
                      <Check className="h-4 w-4 mt-0.5 text-tp-bronze flex-shrink-0" />
                      Never expires
                    </li>
                  </ul>
                </div>
                <Link
                  href="/contact?subject=gift-card"
                  className={`block w-full rounded-tp-button px-4 py-3 text-center text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                    card.recommended
                      ? 'bg-tp-bronze text-tp-black hover:bg-tp-bronze/90 hover:shadow-lg hover:shadow-tp-bronze/20'
                      : 'bg-tp-black text-white hover:bg-tp-ink'
                  }`}
                >
                  Contact Us to Order
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Perfect For ── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              Perfect For Every Occasion
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              A Gift They Will Actually Use
            </h2>
            <p className="mt-4 text-tp-muted max-w-xl mx-auto">
              Professional headshots are always in demand. Here are some of the
              most popular occasions for giving TailorPic gift cards.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {occasions.map((occasion) => (
              <div
                key={occasion.title}
                className="rounded-tp-card border border-tp-line bg-white p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tp-paper mb-4">
                  <occasion.icon className="h-5 w-5 text-tp-bronze" />
                </div>
                <h3 className="text-base font-semibold text-tp-ink">
                  {occasion.title}
                </h3>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">
                  {occasion.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-tp-paper py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              Questions
            </p>
            <h2 className="mt-3 font-display font-normal text-3xl sm:text-4xl text-tp-ink">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.q}
                className="group rounded-tp-card border border-tp-line bg-white"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-sm font-semibold text-tp-ink list-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown className="h-4 w-4 text-tp-muted transition-transform group-open:rotate-180 flex-shrink-0" />
                </summary>
                <div className="px-6 pb-5 text-sm text-tp-muted leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-tp-black py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-normal text-3xl sm:text-4xl text-white">
            Not Sure Which to Choose?
          </h2>
          <p className="mt-4 text-tp-beige/70 max-w-lg mx-auto">
            Reach out and we will help you pick the right gift card for the
            occasion. We can also accommodate custom amounts and bulk orders.
          </p>
          <div className="mt-8">
            <Link
              href="/contact?subject=gift-card"
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-8 py-4 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-tp-bronze/20"
            >
              Get in Touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
