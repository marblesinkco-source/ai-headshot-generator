import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/structured-data';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { Palette, Sun, Maximize2, ArrowRight, Shirt, Eye, History, Eraser, Sparkles, ScanFace, Scissors, Smile, Move, Pipette, Glasses, Heart, Clock } from 'lucide-react';
import { BASE_PRICE_DISPLAY } from '@/config/pricing';

const title = 'AI Photo Editor: Professional Headshot Editing Tools';
const description =
  'Explore TailorPic\'s 21 AI photo editing tools, from background changer and clothing changer to skin smoother, pose editor and crop & resize.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/editor' },
  openGraph: generateOGMetadata({ title, description, path: '/editor', type: 'default' }),
  twitter: generateTwitterMetadata({ title, description, type: 'default' }),
};

const tools = [
  {
    icon: Palette,
    name: 'AI Background Changer',
    description:
      'Replace cluttered or unprofessional backgrounds with clean, studio-quality options. Choose from solid colors, gradient washes, or realistic office settings.',
    href: '/editor/background-changer',
  },
  {
    icon: Sun,
    name: 'AI Photo Enhancer',
    description:
      'Automatically correct lighting, sharpen details, and balance color so every headshot looks professionally retouched without any manual editing.',
    href: '/editor/photo-enhancer',
  },
  {
    icon: Maximize2,
    name: 'AI Image Upscaler',
    description:
      'Increase the resolution of your headshots while preserving sharpness. Get print-ready images from small originals with intelligent detail reconstruction.',
    href: '/editor/image-upscaler',
  },
  {
    icon: Shirt,
    name: 'AI Clothing Changer',
    description:
      'Change your outfit in AI-generated headshots to match industry standards — suits, scrubs, business casual and more.',
    href: '/editor/clothing-changer',
  },
  {
    icon: Eye,
    name: 'AI Image Unblur',
    description:
      'Fix blurry, out-of-focus photos with AI-powered sharpening. Recover crisp detail from motion blur and soft focus.',
    href: '/editor/unblur-image',
  },
  {
    icon: History,
    name: 'AI Photo Restoration',
    description:
      'Restore old, scratched and faded photos to like-new quality. Repair damage and bring vintage portraits back to life.',
    href: '/editor/photo-restoration',
  },
  {
    icon: Eraser,
    name: 'AI Magic Eraser',
    description:
      'Remove unwanted objects, blemishes and distractions from your photos. Clean up backgrounds and fix imperfections.',
    href: '/editor/magic-eraser',
  },
  {
    icon: Sparkles,
    name: 'AI Lighting Editor',
    description:
      'Perfect your portrait lighting with AI. Fix harsh shadows, balance exposure and add studio-quality illumination.',
    href: '/editor/lighting-editor',
  },
  {
    icon: ScanFace,
    name: 'AI Realism Enhancer',
    description:
      'Make AI-generated photos look indistinguishable from real photography. Add natural skin texture and subtle imperfections.',
    href: '/editor/realism-enhancer',
  },
  {
    icon: Scissors,
    name: 'AI Hair Editor',
    description:
      'Adjust hair styling in your headshots. Fix flyaways, add volume and ensure your hair looks polished and professional.',
    href: '/editor/hair-editor',
  },
  {
    icon: Smile,
    name: 'AI Teeth Whitener',
    description:
      'Naturally whiten teeth and enhance your smile for a confident, camera-ready look in every headshot.',
    href: '/editor/teeth-whitener',
  },
  {
    icon: Move,
    name: 'AI Pose Editor',
    description:
      'Adjust head tilt, shoulder angle and body positioning in your headshots for the most flattering and confident look.',
    href: '/editor/pose-editor',
  },
  {
    icon: Palette,
    name: 'AI Makeup Editor',
    description:
      'Add natural-looking professional makeup to your headshots. Subtle enhancements that keep you looking polished and camera-ready.',
    href: '/editor/makeup-editor',
  },
  {
    icon: Pipette,
    name: 'AI Color Correction',
    description:
      'Fix white balance, color casts and saturation issues. Get natural, true-to-life skin tones and accurate colors in every headshot.',
    href: '/editor/color-correction',
  },
  {
    icon: Glasses,
    name: 'AI Glasses Editor',
    description:
      'Add, remove or swap glasses frames in your headshots. Eliminate glare and reflections for a clean, professional look.',
    href: '/editor/glasses-editor',
  },
  {
    icon: ScanFace,
    name: 'AI Face Reshaping',
    description:
      'Subtle face contouring and jawline refinement for the most flattering headshot. Natural-looking enhancements that preserve your likeness.',
    href: '/editor/face-reshaping',
  },
  {
    icon: Eye,
    name: 'AI Red Eye Remover',
    description:
      'Instantly fix red-eye from flash photography. Restore natural eye color while preserving detail and catchlights.',
    href: '/editor/red-eye-remover',
  },
  {
    icon: Heart,
    name: 'AI Skin Smoother',
    description:
      'Even out skin tone and reduce blemishes while keeping natural texture. Professional retouching that looks real, not filtered.',
    href: '/editor/skin-smoother',
  },
  {
    icon: Smile,
    name: 'AI Expression Editor',
    description:
      'Fine-tune facial expressions in your headshots. Adjust smile intensity, eyebrow position and overall mood for the perfect look.',
    href: '/editor/expression-editor',
  },
  {
    icon: Maximize2,
    name: 'AI Smart Crop & Resize',
    description:
      'Intelligently crop and resize headshots for any platform. LinkedIn, passport, ID badge and social media dimensions in one click.',
    href: '/editor/crop-resize',
  },
  {
    icon: Clock,
    name: 'AI Age Filter',
    description:
      'Preview how you\'ll look years from now or rewind to a younger appearance. Fun, realistic age transformations powered by AI.',
    href: '/editor/age-filter',
  },
];

export default function EditorIndexPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'AI Photo Editor', url: `${siteConfig.url}/editor` },
        ]}
      />
      <Header />
      <main id="main-content" className="bg-white">

      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-tp-bronze-ink">
            AI-Powered Editing
          </p>
          <h1 className="mt-3 font-display font-normal text-4xl italic tracking-tight text-tp-ink sm:text-6xl">
            AI Photo Editor
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tp-muted sm:text-lg">
            Professional headshot editing powered by artificial intelligence. No Photoshop skills
            required — let AI handle the technical details while you focus on looking your best.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-tp-card border border-tp-line bg-white p-6 transition-all hover:border-tp-bronze/40 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-tp-button bg-tp-paper text-tp-bronze-ink">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-4 font-display font-normal text-xl text-tp-ink transition-colors group-hover:text-tp-bronze-ink">
                  {tool.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-tp-muted">{tool.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-tp-bronze-ink group-hover:text-tp-bronze transition-colors">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t border-tp-line bg-tp-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl">
            Skip the editing — get AI headshots
          </h2>
          <p className="mt-3 text-tp-muted">
            Instead of editing photos yourself, upload a few selfies and let TailorPic generate
            studio-quality headshots for you. From {BASE_PRICE_DISPLAY}.
          </p>
          <Link
            href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
            className={buttonVariants({ size: 'lg', className: 'mt-6' })}
          >
            Create your AI headshots
          </Link>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
