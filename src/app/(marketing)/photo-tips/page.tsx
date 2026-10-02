import type { Metadata } from 'next';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { PhotoTipsIllustration } from '@/components/marketing/illustrations';
import { BreadcrumbSchema, FAQSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import {
  Camera,
  Sun,
  Smile,
  Shirt,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'Photo Tips for AI Headshots: Selfies That Get Great Results' },
  description: 'Learn how to take the right selfies for AI headshots. Tips on lighting, clothing, backgrounds, and camera settings so TailorPic can create natural results.',
  alternates: { canonical: '/photo-tips' },
  openGraph: generateOGMetadata({ title: `How to Take the Perfect Photo for AI Headshots | ${siteConfig.name}`, description: `Simple, practical guidance on lighting, clothing, backgrounds, and camera settings for better AI headshot results.`, path: '/photo-tips' }),
  twitter: generateTwitterMetadata({ title: `How to Take the Perfect Photo for AI Headshots | ${siteConfig.name}`, description: `Simple, practical guidance on lighting, clothing, backgrounds, and camera settings for better AI headshot results.` }),
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const dos = [
  'Use soft, even light, such as a window in daylight',
  'Face the camera with your head and shoulders in frame',
  'Include a variety of expressions, including a natural smile',
  'Take photos from slightly different angles',
  'Wear a few different outfits across your photos',
  'Use sharp, in-focus, high-resolution images',
];

const donts = [
  'Use heavy filters, beauty modes, or retouching apps',
  'Wear sunglasses, hats, or anything covering your face',
  'Upload group photos or pictures with other people',
  'Rely on harsh shadows or strong backlighting',
  'Send blurry, pixelated, or heavily cropped images',
  'Use photos that are many years old and no longer look like you',
];

const lighting = [
  {
    title: 'Face a window',
    text: 'Stand or sit facing a window so daylight falls evenly across your face. Soft natural light is flattering and easy to find.',
  },
  {
    title: 'Avoid harsh overhead light',
    text: 'Direct overhead lighting can create shadows under the eyes and nose. Move to a spot where the light comes from the front or slightly to the side.',
  },
  {
    title: 'Skip direct midday sun',
    text: 'Bright sun can cause squinting and strong shadows. Open shade or an overcast day tends to give gentler results.',
  },
  {
    title: 'Keep the light consistent',
    text: 'Try not to mix very different light sources, such as a warm lamp and cool daylight, in the same photo.',
  },
];

const clothing = [
  {
    title: 'Choose solid colors',
    text: 'Plain tops in colors you feel confident in usually work better than busy patterns or large logos.',
  },
  {
    title: 'Change outfits',
    text: 'Photos in a few different tops give the AI more variety to learn from and give you more style options.',
  },
  {
    title: 'Wear what fits well',
    text: 'Clothes that fit comfortably and are free of wrinkles look more polished in the final result.',
  },
  {
    title: 'Keep grooming natural',
    text: 'Groom as you normally would. Photos should look like you on a good day, so avoid major changes in hair or facial hair between shots.',
  },
];

const backgrounds = [
  {
    title: 'Keep it simple',
    text: 'A plain wall or uncluttered space keeps attention on you and helps the AI focus on your features.',
  },
  {
    title: 'Add some distance',
    text: 'Stand a little away from the wall to reduce harsh shadows behind you.',
  },
  {
    title: 'Vary the setting',
    text: 'Taking photos in two or three different spots adds variety, which can help the AI avoid repeating the same background.',
  },
  {
    title: 'Avoid other people',
    text: 'Make sure no one else appears in the frame, even in the distance.',
  },
];

const camera = [
  {
    title: 'Use the rear camera if you can',
    text: 'The main camera on most phones captures more detail than the front-facing one. A friend or a tripod makes this easier.',
  },
  {
    title: 'Hold at eye level',
    text: 'Keep the camera around eye level. Very high or low angles can distort facial proportions.',
  },
  {
    title: 'Turn off filters and beauty modes',
    text: 'Use your standard photo mode so the AI learns what you actually look like.',
  },
  {
    title: 'Check focus and sharpness',
    text: 'Tap your face on the screen to focus, hold still, and review your photos before uploading. Delete any that look blurry.',
  },
];

const photoTipsFaqs = [
  {
    question: 'What kind of lighting works best for AI headshot photos?',
    answer:
      'Soft, even light works best, such as daylight from a window while you face it. Avoid harsh overhead light, direct midday sun, and mixing very different light sources in the same photo.',
  },
  {
    question: 'What should I wear for my AI headshot photos?',
    answer:
      'Choose plain tops in solid colors you feel confident in, and avoid busy patterns or large logos. Wear a few different outfits across your photos so the AI has more variety to learn from.',
  },
  {
    question: 'Can I use selfies taken with my phone?',
    answer:
      'Yes, a recent phone camera is enough. The rear camera captures more detail than the front-facing one, so use it if you can, with a friend or tripod to help.',
  },
  {
    question: 'How many photos should I upload?',
    answer:
      'Upload a variety of sharp, high-resolution photos with different expressions, angles, outfits, and settings. Review them first and delete any that look blurry or heavily cropped.',
  },
  {
    question: 'What backgrounds work best for AI headshots?',
    answer:
      'A plain wall or uncluttered space works best. Stand a little away from the wall to reduce shadows, take photos in two or three different spots, and make sure no one else appears in the frame.',
  },
  {
    question: 'Should I use filters or beauty mode on my photos?',
    answer:
      'No. Turn off filters, beauty modes, and retouching apps and use your standard photo mode so the AI learns what you actually look like.',
  },
  {
    question: 'What camera settings should I use for AI headshot photos?',
    answer:
      'No special settings are needed. Hold the camera at eye level, tap your face on the screen to focus, and hold still so the image is sharp.',
  },
  {
    question: 'Should I wear sunglasses or hats in my photos?',
    answer:
      'No. Avoid sunglasses, hats, or anything covering your face, and do not upload group photos. Use photos that still look like you today.',
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

type IconType = React.ComponentType<{ className?: string }>;

function TipCard({
  icon: Icon,
  title,
  text,
}: {
  icon: IconType;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-tp-card border border-tp-line bg-white p-6">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-tp-button bg-tp-paper">
        <Icon className="h-5 w-5 text-tp-bronze-ink" />
      </div>
      <h3 className="text-base font-semibold text-tp-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-tp-muted">{text}</p>
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  intro,
}: {
  icon: IconType;
  title: string;
  intro: string;
}) {
  return (
    <div className="mb-10 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-bronze/15">
        <Icon className="h-6 w-6 text-tp-bronze-ink" />
      </div>
      <h2 className="font-display text-3xl text-tp-ink sm:text-4xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-tp-muted">{intro}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PhotoTipsPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Photo Tips', url: `${siteConfig.url}/photo-tips` },
        ]}
      />
      <FAQSchema items={photoTipsFaqs} />
      <Header />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-tp-black py-20 sm:py-28">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#C9A98A_0%,transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-tp-bronze/30 bg-tp-bronze/10 px-4 py-1.5 text-xs font-semibold text-tp-bronze">
            <Camera className="h-3.5 w-3.5" />
            Photo Guide
          </div>
          <h1 className="font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            How to Take the Perfect Photo for AI Headshots
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-tp-beige/70">
            The photos you upload shape your results. A few simple habits with
            light, clothing, background, and camera settings can make a real
            difference, and you only need a phone.
          </p>
          <div className="mt-8">
            <Link
              href="/auth/register?redirect=/headshots"
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mx-auto mt-10 max-w-sm">
            <PhotoTipsIllustration className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* ── Do's and Don'ts ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl text-tp-ink sm:text-4xl">
              The Quick Do&apos;s and Don&apos;ts
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-tp-muted">
              Keep this checklist in mind before you upload.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-tp-card border border-tp-line bg-white p-6 sm:p-8">
              <h3 className="font-display text-2xl text-tp-ink">Do</h3>
              <ul className="mt-5 space-y-4">
                {dos.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed text-tp-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-tp-card border border-tp-line bg-white p-6 sm:p-8">
              <h3 className="font-display text-2xl text-tp-ink">
                Don&apos;t
              </h3>
              <ul className="mt-5 space-y-4">
                {donts.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed text-tp-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lighting ── */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            icon={Sun}
            title="Lighting Tips"
            intro="Good light is the easiest upgrade you can make. It costs nothing and shows on every photo."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {lighting.map((tip) => (
              <TipCard key={tip.title} icon={Lightbulb} {...tip} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Clothing & Grooming ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            icon={Shirt}
            title="Clothing & Grooming"
            intro="Dress the way you would for a photo you would be happy to share, and keep it looking like you."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {clothing.map((tip) => (
              <TipCard key={tip.title} icon={Smile} {...tip} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Background ── */}
      <section className="bg-tp-paper py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            icon={ImageIcon}
            title="Background Tips"
            intro="A calm, simple backdrop keeps the focus on your face."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {backgrounds.map((tip) => (
              <TipCard key={tip.title} icon={ImageIcon} {...tip} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Camera / Phone Settings ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            icon={Camera}
            title="Camera & Phone Settings"
            intro="No special equipment needed. A recent phone camera and a few quick checks are enough."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {camera.map((tip) => (
              <TipCard key={tip.title} icon={Camera} {...tip} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-tp-black py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-white sm:text-4xl">
            Ready to create your headshots?
          </h2>
          <p className="mt-4 text-tp-beige/60">
            Put these tips to work, upload your photos, and let {siteConfig.name}{' '}
            do the rest.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/auth/register?redirect=/headshots"
              className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
            >
              Create Your Headshots <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/samples"
              className="inline-flex items-center gap-2 text-sm font-medium text-tp-beige/80 underline underline-offset-2 hover:text-white"
            >
              See our samples
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
