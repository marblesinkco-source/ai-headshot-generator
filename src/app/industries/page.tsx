import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Building2, Scale, ShoppingBag, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Photos by Industry | TailorPic',
  description:
    'Professional AI-generated photos tailored for your industry. Real estate, legal, e-commerce, and more.',
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
];

export default function IndustriesPage() {
  return (
    <main className="min-h-screen">
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

          <div className="grid gap-6 sm:grid-cols-3">
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
