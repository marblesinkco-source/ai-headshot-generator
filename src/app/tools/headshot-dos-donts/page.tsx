import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { CheckCircle2, XCircle, Camera, Sun, Shirt, Image as ImageIcon, Smile, ArrowRight } from 'lucide-react';

const title = 'Headshot Dos & Don\'ts — The Complete Guide | TailorPic';
const description =
  'Learn what makes a great professional headshot and what to avoid. Visual examples of lighting, framing, background, expression and attire for the perfect photo.';
const path = '/tools/headshot-dos-donts';
const ctaHref = '/auth/register?redirect=/dashboard/upload';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: generateOGMetadata({ title, description, path }),
  twitter: generateTwitterMetadata({ title, description }),
};

interface GuideItem {
  category: string;
  icon: typeof Camera;
  doTitle: string;
  doDescription: string;
  dontTitle: string;
  dontDescription: string;
}

const guideItems: GuideItem[] = [
  {
    category: 'Lighting',
    icon: Sun,
    doTitle: 'Use soft, natural light',
    doDescription:
      'Face a window or shoot in open shade so light falls evenly across your face. Overcast days are ideal — they eliminate harsh shadows under your eyes, nose and chin.',
    dontTitle: 'Avoid overhead or harsh flash',
    dontDescription:
      'Direct overhead light creates unflattering shadows. A bare flash pointed straight at your face washes out skin tones and adds a flat, amateur look.',
  },
  {
    category: 'Framing',
    icon: Camera,
    doTitle: 'Frame head and shoulders',
    doDescription:
      'Fill roughly two-thirds of the frame with your head and upper shoulders. Position your eyes in the upper third of the image for a balanced, professional composition.',
    dontTitle: 'Don\'t crop too tight or too wide',
    dontDescription:
      'Cutting off the top of your head looks accidental. Including your full torso or scenery makes your face too small — especially on mobile or in a circular profile crop.',
  },
  {
    category: 'Background',
    icon: ImageIcon,
    doTitle: 'Keep it simple and uncluttered',
    doDescription:
      'A plain wall, soft gradient or gently blurred background keeps all attention on you. Neutral tones (white, light grey, soft blue) are safe for any industry.',
    dontTitle: 'Avoid busy or distracting scenes',
    dontDescription:
      'A messy office, crowded café or patterned wallpaper pulls the eye away from your face. Even a beautiful landscape can compete with you for attention.',
  },
  {
    category: 'Expression',
    icon: Smile,
    doTitle: 'Smile naturally with your eyes',
    doDescription:
      'A genuine smile with slightly squinted eyes (a "Duchenne smile") conveys warmth and confidence. Practice in a mirror — think of something that actually makes you happy.',
    dontTitle: 'Skip forced smiles or blank stares',
    dontDescription:
      'A wide, forced grin looks uneasy. A completely neutral expression can seem stern or unapproachable. Aim for a look that says "I\'m glad to meet you."',
  },
  {
    category: 'Attire',
    icon: Shirt,
    doTitle: 'Wear solid, professional colors',
    doDescription:
      'Solid jewel tones (navy, emerald, burgundy) and neutrals photograph well. Pick something you would actually wear to an important meeting — it should feel like you.',
    dontTitle: 'Avoid loud patterns or logos',
    dontDescription:
      'Busy prints, stripes and large logos create visual noise that distracts from your face. Very bright neons can cast color onto your skin and throw off white balance.',
  },
];

const faqItems = [
  {
    question: 'What resolution should my headshot selfie be?',
    answer:
      'At least 400 x 400 pixels for LinkedIn, though starting with a larger original (1000 px or more on the shortest side) gives you room to crop without losing sharpness.',
  },
  {
    question: 'Can I use a phone camera for a professional headshot?',
    answer:
      'Yes. Modern phones shoot at high enough resolution. The key is good lighting, a clean background and a steady hand or tripod — the camera itself matters less than technique.',
  },
  {
    question: 'Should I look directly at the camera?',
    answer:
      'For most professional headshots, direct eye contact with the lens feels confident and personable. A slight angle works too, as long as your eyes still engage the viewer.',
  },
  {
    question: 'How often should I update my headshot?',
    answer:
      'Every one to two years, or whenever your appearance changes noticeably (new hairstyle, glasses, significant weight change). People should recognize you when they meet you in person.',
  },
  {
    question: 'What file format is best for uploading?',
    answer:
      'JPG or PNG under 8 MB covers almost every platform. WEBP also works for most modern services. Avoid RAW or HEIC unless you can convert them first.',
  },
];

export default function HeadshotDosAndDontsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-tp-paper">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Free Tools', url: `${siteConfig.url}/tools` },
          { name: 'Headshot Dos & Don\'ts', url: `${siteConfig.url}${path}` },
        ]}
      />
      <FAQSchema
        items={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />
      <Header />

      {/* Hero */}
      <section className="px-4 pb-10 pt-16 sm:px-6 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-tp-bronze-ink">Free guide</p>
          <h1 className="font-display font-normal text-4xl leading-tight text-tp-ink sm:text-5xl md:text-6xl">
            Headshot Dos &amp; Don&apos;ts
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-tp-muted sm:text-lg">
            Five categories. Ten rules. Everything you need to take a selfie that turns into a flawless
            AI-generated professional headshot.
          </p>
        </div>
      </section>

      {/* Guide Cards */}
      <section className="px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-5xl space-y-8">
          {guideItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.category} className="rounded-tp-card border border-tp-line bg-white p-6 sm:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-tp-beige/40 text-tp-bronze-ink">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="font-display font-normal text-2xl text-tp-ink">{item.category}</h2>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Do */}
                  <div className="rounded-tp-button border border-emerald-200 bg-emerald-50/50 p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
                      <h3 className="font-semibold text-emerald-800">{item.doTitle}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-emerald-900/80">{item.doDescription}</p>
                  </div>
                  {/* Don't */}
                  <div className="rounded-tp-button border border-red-200 bg-red-50/50 p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <XCircle className="h-5 w-5 shrink-0 text-red-700" aria-hidden="true" />
                      <h3 className="font-semibold text-red-800">{item.dontTitle}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-red-900/80">{item.dontDescription}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Reference */}
      <section className="px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">
            Quick reference checklist
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-tp-card border border-tp-line bg-white p-6">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-emerald-700">
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                Always do
              </h3>
              <ul className="space-y-2 text-sm text-tp-ink">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                  Face soft, even light (window, open shade)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                  Frame head and upper shoulders
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                  Keep background simple and uncluttered
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                  Smile naturally with your eyes
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                  Wear solid, professional colors
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                  Start with a high-resolution original
                </li>
              </ul>
            </div>
            <div className="rounded-tp-card border border-tp-line bg-white p-6">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-red-700">
                <XCircle className="h-5 w-5" aria-hidden="true" />
                Never do
              </h3>
              <ul className="space-y-2 text-sm text-tp-ink">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                  Use overhead or harsh flash lighting
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                  Crop too tight (cut off head) or too wide
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                  Shoot in front of busy backgrounds
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                  Force a grin or stare blankly
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                  Wear loud patterns, logos or neons
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                  Upload blurry, pixelated or tiny images
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display font-normal text-3xl text-tp-ink sm:text-4xl">
            Frequently asked questions
          </h2>
          <div className="mt-8 space-y-4">
            {faqItems.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-tp-card border border-tp-line bg-white"
              >
                <summary className="cursor-pointer px-6 py-4 font-semibold text-tp-ink [&::-webkit-details-marker]:hidden">
                  {faq.question}
                </summary>
                <p className="px-6 pb-5 text-sm leading-relaxed text-tp-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 pt-6 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-tp-dialog bg-tp-ink px-6 py-12 text-center sm:px-10">
          <h2 className="font-display font-normal text-3xl text-tp-paper sm:text-4xl">
            Ready for a professional headshot?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-tp-beige sm:text-base">
            Follow these tips, upload your selfies, and let TailorPic do the rest — from $1.99.
          </p>
          <Link
            href={ctaHref}
            className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'mt-7 bg-tp-bronze text-tp-black hover:bg-tp-beige')}
          >
            Get yours with TailorPic
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
