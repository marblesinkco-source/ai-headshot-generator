import { Header } from '@/components/marketing/header';
import { Hero } from '@/components/marketing/hero';
import { TrustStrip } from '@/components/marketing/trust-strip';
import { TrustBadges } from '@/components/marketing/trust-badges';
import { Categories } from '@/components/marketing/categories';
import { HowItWorks } from '@/components/marketing/how-it-works';
import { Pricing } from '@/components/marketing/pricing';
import { Testimonials } from '@/components/marketing/testimonials';
import { FAQ } from '@/components/marketing/faq';
import { CTABanner } from '@/components/marketing/cta-banner';
import { Footer } from '@/components/marketing/footer';
import { OrganizationSchema, WebsiteSchema, FAQSchema } from '@/components/structured-data';

const faqItems = [
  { question: 'How long does it take to get my photos?', answer: 'Most orders are completed within 2 hours. After you upload your selfies, our AI trains a custom model on your features (about 30 minutes), then generates all your photos.' },
  { question: 'How good is the quality compared to a real photographer?', answer: 'Our AI produces studio-quality results that are virtually indistinguishable from professional photography. We use state-of-the-art generative AI trained on millions of professional portraits.' },
  { question: 'What kind of selfies should I upload?', answer: 'Upload 4 to 10 clear photos of your face from different angles. Use good, natural lighting. Avoid heavy filters, sunglasses, or group photos.' },
  { question: 'Is my data private and secure?', answer: 'Absolutely. Your photos are encrypted in transit and at rest. We never share your images with third parties. Your AI model and all generated photos are automatically deleted from our servers 30 days after delivery.' },
  { question: 'Can I get a refund if I am not satisfied?', answer: 'Yes. We offer a 100% money-back guarantee. If you are not happy with your photos, contact our support team within 14 days of delivery and we will issue a full refund.' },
  { question: 'Can I use these photos commercially?', answer: 'Yes. You own full rights to all generated photos. Use them on LinkedIn, your company website, business cards, email signatures, press kits, or anywhere else.' },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <OrganizationSchema />
      <WebsiteSchema />
      <FAQSchema items={faqItems} />
      <Header />
      <Hero />
      <Categories />
      <TrustStrip />
      <HowItWorks />
      <Pricing />
      <TrustBadges />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
    </main>
  );
}
