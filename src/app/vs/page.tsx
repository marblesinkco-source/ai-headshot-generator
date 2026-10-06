import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Layers, ShieldCheck, Timer, Sparkles, Users } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';
import { generateOGMetadata, generateTwitterMetadata } from '@/lib/og-metadata';
import { VsDirectory, type VsGroup } from './vs-directory';

const title = 'TailorPic vs Alternatives: Compare AI Headshot Tools';
const description =
  'Compare TailorPic with 70+ AI headshot generators, image tools and photo editors. See features, pricing, photo quality and delivery side by side.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/vs' },
  openGraph: generateOGMetadata({ title, description, path: '/vs', type: 'vs' }),
  twitter: generateTwitterMetadata({ title, description, type: 'vs' }),
};

const groups: VsGroup[] = [
  {
    id: 'headshot',
    title: 'AI headshot tools',
    blurb:
      'Services built specifically for professional headshots and profile photos.',
    entries: [
      { slug: 'ai-headshot-generator', name: 'AI Headshot Generator' },
      { slug: 'aiphotoshoot', name: 'AIPhotoShoot' },
      { slug: 'aishots', name: 'AiShots' },
      { slug: 'aragon', name: 'Aragon AI' },
      { slug: 'betterpic', name: 'BetterPic' },
      { slug: 'fotor-ai-headshot', name: 'Fotor AI Headshot' },
      { slug: 'headmagic', name: 'HeadMagic' },
      { slug: 'headphotopro', name: 'HeadPhotoPro' },
      { slug: 'headpix', name: 'HeadPix' },
      { slug: 'headshot-ai', name: 'Headshot AI' },
      { slug: 'headshotpro', name: 'HeadshotPro' },
      { slug: 'headshotsbyai', name: 'HeadshotsByAI' },
      { slug: 'instaheadshots', name: 'InstaHeadshots' },
      { slug: 'magicshot', name: 'MagicShot' },
      { slug: 'myheadshots-ai', name: 'My Headshots AI' },
      { slug: 'passport-photo-ai', name: 'Passport Photo AI' },
      { slug: 'pfpmaker', name: 'PFPMaker' },
      { slug: 'photoai', name: 'PhotoAI' },
      { slug: 'photomatic', name: 'Photomatic' },
      { slug: 'picofme', name: 'PicofMe' },
      { slug: 'pictura', name: 'Pictura AI' },
      { slug: 'portret', name: 'Portret' },
      { slug: 'profilephoto', name: 'ProfilePhoto.ai' },
      { slug: 'profilepicture-ai', name: 'ProfilePicture.AI' },
      { slug: 'prophotos-ai', name: 'ProPhotos AI' },
      { slug: 'secta', name: 'Secta Labs' },
      { slug: 'snapheadshots', name: 'SnapHeadshots' },
      { slug: 'studio-shot', name: 'StudioShot' },
      { slug: 'supawork-ai', name: 'Supawork AI' },
      { slug: 'the-multiverse-ai', name: 'The Multiverse AI' },
      { slug: 'tryitonai', name: 'Try It On AI' },
      { slug: 'vivid-headshots', name: 'Vivid Headshots' },
    ],
  },
  {
    id: 'general',
    title: 'General AI image generators',
    blurb:
      'Broad text-to-image and creative AI platforms that can produce portraits among many other things.',
    entries: [
      { slug: 'adobe-firefly', name: 'Adobe Firefly' },
      { slug: 'artbreeder', name: 'Artbreeder' },
      { slug: 'chatgpt-image', name: 'ChatGPT Image Generation' },
      { slug: 'clipdrop', name: 'ClipDrop' },
      { slug: 'craiyon', name: 'Craiyon' },
      { slug: 'dall-e', name: 'DALL-E' },
      { slug: 'deepart', name: 'DeepArt' },
      { slug: 'dreamwave', name: 'Dreamwave' },
      { slug: 'hotpot-ai', name: 'Hotpot.ai' },
      { slug: 'icon8-ai', name: 'Icons8 AI' },
      { slug: 'imagine-ai', name: 'Imagine AI' },
      { slug: 'leonardo-ai', name: 'Leonardo AI' },
      { slug: 'copilot-designer', name: 'Microsoft Copilot Designer' },
      { slug: 'midjourney', name: 'Midjourney' },
      { slug: 'neural-love', name: 'Neural.love' },
      { slug: 'nightcafe', name: 'NightCafe' },
      { slug: 'pixar-style', name: 'Pixar-Style AI Portrait Tools' },
      { slug: 'runway-ml', name: 'RunwayML' },
      { slug: 'stable-diffusion', name: 'Stable Diffusion' },
      { slug: 'wondershare-ai', name: 'Wondershare AI' },
    ],
  },
  {
    id: 'editors',
    title: 'Photo editors and retouching apps',
    blurb:
      'Editing, enhancement and filter tools that work on photos you already have.',
    entries: [
      { slug: 'lightroom', name: 'Adobe Lightroom' },
      { slug: 'photoshop', name: 'Adobe Photoshop' },
      { slug: 'befunky', name: 'BeFunky' },
      { slug: 'canva-ai', name: 'Canva AI' },
      { slug: 'epik-ai', name: 'Epik' },
      { slug: 'faceapp', name: 'FaceApp' },
      { slug: 'facetune', name: 'Facetune' },
      { slug: 'facetune2', name: 'Facetune 2' },
      { slug: 'fotor', name: 'Fotor AI' },
      { slug: 'imglarger', name: 'ImgLarger' },
      { slug: 'kapwing', name: 'Kapwing' },
      { slug: 'lensa', name: 'Lensa' },
      { slug: 'luminar-ai', name: 'Luminar AI' },
      { slug: 'meitu', name: 'Meitu' },
      { slug: 'photolab', name: 'Photo Lab' },
      { slug: 'photodirector', name: 'PhotoDirector' },
      { slug: 'photoroom', name: 'PhotoRoom' },
      { slug: 'picsart', name: 'Picsart' },
      { slug: 'pixelcut', name: 'Pixelcut' },
      { slug: 'pixlr', name: 'Pixlr' },
      { slug: 'prequel-app', name: 'Prequel' },
      { slug: 'prisma-app', name: 'Prisma' },
      { slug: 'reface-ai', name: 'Reface AI' },
      { slug: 'remini', name: 'Remini' },
      { slug: 'remove-bg', name: 'Remove.bg' },
      { slug: 'snapseed', name: 'Snapseed' },
      { slug: 'topaz-ai', name: 'Topaz Labs' },
      { slug: 'youcan-ai', name: 'YouCam Perfect' },
    ],
  },
];

const differentiators = [
  {
    icon: Sparkles,
    title: 'Built for professional headshots',
    body: 'TailorPic is focused on headshots and profile photos rather than being a general image generator, so the workflow is designed around that one job.',
  },
  {
    icon: Timer,
    title: 'Upload selfies, get results in minutes',
    body: 'No studio visit or scheduling. Upload photos from your phone and review your generated headshots online.',
  },
  {
    icon: Layers,
    title: 'Multiple styles and backgrounds',
    body: 'Choose from a range of looks, from corporate to creative, so one set of selfies can cover LinkedIn, a company site and more.',
  },
  {
    icon: ShieldCheck,
    title: 'Clear terms and privacy',
    body: 'Read how we handle your photos and data in our privacy policy before you upload anything.',
  },
  {
    icon: Users,
    title: 'Options for individuals and teams',
    body: 'Whether you need one profile photo or consistent headshots across a team, check the pricing page for what fits.',
  },
];

export default function VsIndexPage() {
  const total = groups.reduce((n, g) => n + g.entries.length, 0);

  return (
    <>
      <Header />

      <main id="main-content" className="min-h-screen">
        <BreadcrumbSchema
          items={[
            { name: 'Home', url: siteConfig.url },
            { name: 'Compare', url: `${siteConfig.url}/vs` },
          ]}
        />

        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-tp-bronze-ink">
              {total} comparisons
            </p>
            <h1 className="mt-4 font-display font-normal text-5xl tracking-tight text-tp-ink sm:text-6xl lg:text-7xl">
              TailorPic vs the alternatives
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-muted">
              Choosing a headshot tool? Compare features, pricing, photo quality and delivery
              between TailorPic and AI headshot services, general AI generators and photo editors,
              then pick what fits your needs.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#compare"
                className="inline-flex items-center gap-2 rounded-tp-button border border-tp-line bg-white px-7 py-3.5 text-sm font-semibold text-tp-ink transition-colors hover:bg-tp-paper"
              >
                Browse comparisons
              </a>
              <Link
                href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
                className="inline-flex items-center gap-2 rounded-tp-button bg-tp-black px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-tp-ink"
              >
                Try TailorPic <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section id="compare" className="scroll-mt-20 bg-tp-paper py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <VsDirectory groups={groups} />
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display font-normal text-3xl text-tp-ink sm:text-4xl md:text-5xl">
                Why consider TailorPic
              </h2>
              <p className="mt-4 text-tp-muted">
                What TailorPic is designed to do. Every comparison page goes deeper on how it
                stacks up against a specific tool.
              </p>
            </div>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {differentiators.map((d) => (
                <li
                  key={d.title}
                  className="rounded-tp-card border border-tp-line bg-tp-paper p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-tp-button bg-tp-black text-tp-bronze">
                    <d.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display font-normal text-2xl text-tp-ink">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tp-muted">{d.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-tp-black py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display font-normal text-3xl text-white sm:text-4xl md:text-5xl">
              See the difference with your own photos
            </h2>
            <p className="mt-4 text-tp-beige/70">
              Upload a few selfies and judge the results yourself.
            </p>
            <div className="mt-8">
              <Link
                href="/auth/register?redirect=%2Fdashboard%2Fupload%3Fcategory%3Dheadshots"
                className="inline-flex items-center gap-2 rounded-tp-button bg-tp-bronze px-7 py-3.5 text-sm font-semibold text-tp-black transition-all hover:bg-tp-bronze/90"
              >
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
