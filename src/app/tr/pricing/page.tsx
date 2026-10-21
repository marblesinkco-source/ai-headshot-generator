import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Pricing } from '@/components/marketing/pricing';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BASE_PRICE_DISPLAY, TEAM_PRICES } from '@/config/pricing';
import { formatPrice } from '@/lib/utils';
import { GuaranteeSection } from '@/components/marketing/guarantee-section';
import { TrustBadgesInline } from '@/components/marketing/trust-badges-inline';
import { ArrowRight } from 'lucide-react';

export const revalidate = 3600;

const TEAM_SMALL = formatPrice(TEAM_PRICES.small.perPersonCents, 'usd', true);
const TEAM_LARGE = formatPrice(TEAM_PRICES.large.perPersonCents, 'usd', true);

export const metadata: Metadata = {
  title: { absolute: `TailorPic Fiyatlandırma: ${BASE_PRICE_DISPLAY}'dan Başlayan AI Vesikalık` },
  description: `${siteConfig.name} fiyatlandırma: ${BASE_PRICE_DISPLAY}'dan başlayan AI fotoğraflar, abonelik yok. 12 kategoride tek seferlik paketler veya kredi paketleriyle tasarruf edin.`,
  alternates: {
    canonical: '/tr/pricing',
    languages: { en: '/pricing', tr: '/tr/pricing' },
  },
  openGraph: {
    ...generateOGMetadata({
      title: `Fiyatlandırma | ${siteConfig.name}`,
      description: 'Her ihtiyaca uygun fiyatlı AI fotoğraf paketleri.',
      path: '/tr/pricing',
    }),
    locale: 'tr_TR',
  },
  twitter: generateTwitterMetadata({
    title: `Fiyatlandırma | ${siteConfig.name}`,
    description: 'Her ihtiyaca uygun fiyatlı AI fotoğraf paketleri.',
  }),
};

export default function TurkishPricingPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden pt-16">
          <div className="pointer-events-none absolute inset-0 bg-grid" />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
          <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
            <h1 className="text-4xl font-display font-normal tracking-tight text-tp-black sm:text-5xl">
              Basit,{' '}
              <span className="bg-gradient-to-r from-tp-bronze-ink to-tp-bronze bg-clip-text text-transparent">
                Şeffaf
              </span>{' '}
              Fiyatlandırma
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-tp-muted">
              Tek seferlik ödeme, abonelik yok. Kategorinizi seçin, paketinizi belirleyin
              ve stüdyo kalitesinde AI fotoğraflarınızı saatler içinde alın. Bireysel paketler {BASE_PRICE_DISPLAY}&apos;dan başlar;
              takımlar kişi başı {TEAM_SMALL} veya {TEAM_LARGE} öder.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
                {BASE_PRICE_DISPLAY}&apos;dan başlayan vesikalık alın
              </Link>
              <Link href="/team-headshots" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
                Takım fiyatlarını görün
              </Link>
            </div>
            <TrustBadgesInline className="mt-5" />
          </div>
        </section>

        <Pricing />

        <GuaranteeSection />

        {/* CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-normal text-tp-ink sm:text-4xl">
              Başlamaya hazır mısınız?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-tp-muted">
              Selfie&apos;lerinizi yükleyin ve {BASE_PRICE_DISPLAY}&apos;dan başlayan fiyatlarla stüdyo kalitesinde AI vesikalık fotoğraflar alın.
              Abonelik yok, stüdyo randevusu gerekmez.
            </p>
            <div className="mt-8">
              <Link
                href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
                className={buttonVariants({ variant: 'primary', size: 'lg', className: 'gap-2' })}
              >
                Vesikalık Fotoğraflarınızı Alın
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
