import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import {
  Briefcase,
  Linkedin,
  Heart,
  Users,
  PawPrint,
  Home,
  Building2,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Photo Use Cases | TailorPic',
  description:
    'Discover how TailorPic AI photos work for every occasion — professional headshots, LinkedIn profiles, dating apps, team photos, pet portraits, and more.',
  alternates: { canonical: '/use-cases' },
  openGraph: {
    title: `AI Photo Use Cases | ${siteConfig.name}`,
    description:
      'Explore all the ways you can use TailorPic to create stunning AI-generated photos for work, social, and personal projects.',
    url: `${siteConfig.url}/use-cases`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `AI Photo Use Cases | ${siteConfig.name}`,
    description:
      'Explore all the ways you can use TailorPic to create stunning AI-generated photos for work, social, and personal projects.',
    images: [siteConfig.ogImage],
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface UseCase {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

const useCases: UseCase[] = [
  {
    icon: Briefcase,
    title: 'Professional Headshots',
    description:
      'Studio-quality headshots for resumes, websites, and business profiles.',
    href: '/headshots',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn Photos',
    description:
      'Stand out on LinkedIn with a polished, professional profile photo.',
    href: '/linkedin-headshots',
  },
  {
    icon: Heart,
    title: 'Dating Photos',
    description:
      'Make a great first impression with natural, flattering dating photos.',
    href: '/dating',
  },
  {
    icon: Users,
    title: 'Team Photos',
    description:
      'Consistent, on-brand headshots for your entire team in minutes.',
    href: '/team-headshots',
  },
  {
    icon: PawPrint,
    title: 'Pet Portraits',
    description:
      'Turn your pet photos into adorable, frame-worthy AI portraits.',
    href: '/pet-portraits',
  },
  {
    icon: Home,
    title: 'Family Portraits',
    description:
      'Beautiful family portraits without the hassle of coordinating a photo shoot.',
    href: '/family-portraits',
  },
  {
    icon: Building2,
    title: 'Real Estate',
    description:
      'Professional agent headshots that build trust with buyers and sellers.',
    href: '/real-estate',
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce Product',
    description:
      'High-quality product photos that help drive conversions online.',
    href: '/ecommerce-product',
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function UseCasesPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Use Cases', url: `${siteConfig.url}/use-cases` },
        ]}
      />
      <Header />

      {/* ── Hero ── */}
      <section className="relative bg-tp-black py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#C9A98A_0%,transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            AI Photos for Every Occasion
          </h1>
          <p className="mt-5 text-lg text-tp-beige/70 max-w-2xl mx-auto leading-relaxed">
            From professional headshots to pet portraits, TailorPic helps you
            create stunning photos for any purpose — fast, affordable, and
            without a photo shoot.
          </p>
        </div>
      </section>

      {/* ── Use-Case Grid ── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {useCases.map((uc) => (
              <Link
                key={uc.href}
                href={uc.href}
                className="group rounded-tp-card border border-tp-line bg-white p-6 transition-all hover:border-tp-bronze/40 hover:shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-tp-black/5 mb-4 transition-colors group-hover:bg-tp-bronze/10">
                  <uc.icon className="h-5 w-5 text-tp-ink transition-colors group-hover:text-tp-bronze" />
                </div>
                <h3 className="text-base font-semibold text-tp-ink">
                  {uc.title}
                </h3>
                <p className="mt-1.5 text-sm text-tp-muted leading-relaxed">
                  {uc.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-tp-bronze opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-tp-black py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-white">
            Ready to Create Your Photos?
          </h2>
          <p className="mt-4 text-tp-beige/60">
            Upload your selfies and get professional-quality AI photos in
            minutes. No studio visit required.
          </p>
          <div className="mt-8">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
            >
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
