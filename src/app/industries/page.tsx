import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { Building2, Scale, ShoppingBag, Stethoscope, Lightbulb, Calculator, ArrowRight, Heart, Monitor, GraduationCap, Camera, Clapperboard, SmilePlus, TrendingUp, Ruler } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Photos by Industry | TailorPic',
  description:
    'Professional AI-generated photos tailored for your industry. Real estate, legal, healthcare, nursing, engineering, education, consulting, accounting, photography, acting, dental, financial advisory, architecture and more.',
};

const industries = [
  {
    icon: Building2,
    name: 'Real Estate',
    description:
      'Professional headshots that build trust with buyers and sellers. MLS-ready, team-consistent photos.',
    href: '/industries/real-estate',
    cta: 'For Agents',
  },
  {
    icon: Scale,
    name: 'Law Firms',
    description:
      'Authoritative portraits for attorneys and partners. Bar-compliant, firm-wide consistency.',
    href: '/industries/lawyers',
    cta: 'For Attorneys',
  },
  {
    icon: ShoppingBag,
    name: 'E-Commerce',
    description:
      'Studio-quality product photos for your online store. Marketplace-ready for Amazon, Shopify, Etsy.',
    href: '/industries/ecommerce',
    cta: 'For Sellers',
  },
  {
    icon: Stethoscope,
    name: 'Healthcare',
    description:
      'Trustworthy headshots for doctors, dentists, and medical professionals. HIPAA-conscious, patient-friendly.',
    href: '/industries/doctors',
    cta: 'For Doctors',
  },
  {
    icon: Lightbulb,
    name: 'Consultants',
    description:
      'Executive portraits that convey expertise and credibility. Perfect for advisory firms and freelance consultants.',
    href: '/industries/consultants',
    cta: 'For Consultants',
  },
  {
    icon: Calculator,
    name: 'Accountants',
    description:
      'Professional headshots for CPAs and financial professionals. Build client trust with polished, consistent imagery.',
    href: '/industries/accountants',
    cta: 'For Accountants',
  },
  {
    icon: Heart,
    name: 'Nurses',
    description:
      'Professional headshots for nurses and healthcare staff. Hospital ID-ready, LinkedIn-polished, team-consistent.',
    href: '/industries/nurses',
    cta: 'For Nurses',
  },
  {
    icon: Monitor,
    name: 'Engineers',
    description:
      'Professional headshots for software, civil and mechanical engineers. Perfect for LinkedIn, GitHub and conference bios.',
    href: '/industries/engineers',
    cta: 'For Engineers',
  },
  {
    icon: GraduationCap,
    name: 'Teachers',
    description:
      'Professional headshots for teachers and educators. School websites, academic profiles and conference materials.',
    href: '/industries/teachers',
    cta: 'For Teachers',
  },
  {
    icon: Camera,
    name: 'Photographers',
    description:
      'Professional headshots for photographers and creatives. Portfolio-ready, brand-consistent imagery for your own marketing.',
    href: '/industries/photographers',
    cta: 'For Photographers',
  },
  {
    icon: Clapperboard,
    name: 'Actors',
    description:
      'Casting-ready headshots for actors and performers. Multiple looks, expressions and styling for auditions and reels.',
    href: '/industries/actors',
    cta: 'For Actors',
  },
  {
    icon: SmilePlus,
    name: 'Dentists',
    description:
      'Trustworthy headshots for dentists and dental professionals. Patient-friendly portraits for practice websites and directories.',
    href: '/industries/dentists',
    cta: 'For Dentists',
  },
  {
    icon: TrendingUp,
    name: 'Financial Advisors',
    description:
      'Credible, polished headshots for financial advisors and wealth managers. Build client trust with professional imagery.',
    href: '/industries/financial-advisors',
    cta: 'For Advisors',
  },
  {
    icon: Ruler,
    name: 'Architects',
    description:
      'Professional headshots for architects and designers. Portfolio-ready imagery for firm websites and industry publications.',
    href: '/industries/architects',
    cta: 'For Architects',
  },
];

export default function IndustriesPage() {
  return (
    <main className="min-h-screen">
      <BreadcrumbSchema items={[
        { name: 'Home', url: siteConfig.url },
        { name: 'Industries', url: `${siteConfig.url}/industries` },
      ]} />
      <Header />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze">
              Industries
            </p>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl text-tp-ink tracking-tight">
              AI Photos for Every Industry
            </h1>
            <p className="mt-4 text-lg text-tp-muted max-w-2xl mx-auto">
              Tailored solutions for professionals who need studio-quality photos without the studio.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <Link
                key={ind.name}
                href={ind.href}
                className="group rounded-2xl border border-tp-line bg-white p-7 transition-all hover:border-tp-bronze/40 hover:shadow-md hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tp-black mb-5">
                  <ind.icon className="h-6 w-6 text-tp-bronze" />
                </div>
                <h2 className="text-xl font-semibold text-tp-ink">{ind.name}</h2>
                <p className="mt-2 text-sm text-tp-muted leading-relaxed">
                  {ind.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-tp-bronze-ink group-hover:gap-2.5 transition-all">
                  {ind.cta} <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
