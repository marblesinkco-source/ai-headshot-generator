import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { BreadcrumbSchema } from '@/components/structured-data';
import { siteConfig } from '@/config/site';

const title = 'Compare TailorPic';
const description =
  'Compare TailorPic with popular AI headshot and photo tools. See pricing, features, photo quality, and delivery side by side to find the right fit.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/vs' },
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}/vs`,
    type: 'website',
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [siteConfig.ogImage],
  },
};

const comparisons = [
  { slug: 'adobe-firefly', name: 'Adobe Firefly' },
  { slug: 'lightroom', name: 'Adobe Lightroom' },
  { slug: 'photoshop', name: 'Adobe Photoshop' },
  { slug: 'ai-headshot-generator', name: 'AI Headshot Generator' },
  { slug: 'aiphotoshoot', name: 'AIPhotoShoot' },
  { slug: 'aishots', name: 'AiShots' },
  { slug: 'aragon', name: 'Aragon AI' },
  { slug: 'artbreeder', name: 'Artbreeder' },
  { slug: 'befunky', name: 'BeFunky' },
  { slug: 'betterpic', name: 'BetterPic' },
  { slug: 'canva-ai', name: 'Canva AI' },
  { slug: 'chatgpt-image', name: 'ChatGPT Image Generation' },
  { slug: 'clipdrop', name: 'ClipDrop' },
  { slug: 'craiyon', name: 'Craiyon' },
  { slug: 'dall-e', name: 'DALL-E' },
  { slug: 'deepart', name: 'DeepArt' },
  { slug: 'dreamwave', name: 'Dreamwave' },
  { slug: 'epik-ai', name: 'Epik' },
  { slug: 'faceapp', name: 'FaceApp' },
  { slug: 'facetune', name: 'Facetune' },
  { slug: 'facetune2', name: 'Facetune 2' },
  { slug: 'fotor', name: 'Fotor AI' },
  { slug: 'fotor-ai-headshot', name: 'Fotor AI Headshot' },
  { slug: 'headmagic', name: 'HeadMagic' },
  { slug: 'headphotopro', name: 'HeadPhotoPro' },
  { slug: 'headpix', name: 'HeadPix' },
  { slug: 'headshot-ai', name: 'Headshot AI' },
  { slug: 'headshotpro', name: 'HeadshotPro' },
  { slug: 'headshotsbyai', name: 'HeadshotsByAI' },
  { slug: 'hotpot-ai', name: 'Hotpot.ai' },
  { slug: 'icon8-ai', name: 'Icons8 AI' },
  { slug: 'imagine-ai', name: 'Imagine AI' },
  { slug: 'imglarger', name: 'ImgLarger' },
  { slug: 'instaheadshots', name: 'InstaHeadshots' },
  { slug: 'kapwing', name: 'Kapwing' },
  { slug: 'lensa', name: 'Lensa' },
  { slug: 'leonardo-ai', name: 'Leonardo AI' },
  { slug: 'luminar-ai', name: 'Luminar AI' },
  { slug: 'magicshot', name: 'MagicShot' },
  { slug: 'meitu', name: 'Meitu' },
  { slug: 'copilot-designer', name: 'Microsoft Copilot Designer' },
  { slug: 'midjourney', name: 'Midjourney' },
  { slug: 'myheadshots-ai', name: 'My Headshots AI' },
  { slug: 'neural-love', name: 'Neural.love' },
  { slug: 'nightcafe', name: 'NightCafe' },
  { slug: 'passport-photo-ai', name: 'Passport Photo AI' },
  { slug: 'pfpmaker', name: 'PFPMaker' },
  { slug: 'photolab', name: 'Photo Lab' },
  { slug: 'photoai', name: 'PhotoAI' },
  { slug: 'photodirector', name: 'PhotoDirector' },
  { slug: 'photomatic', name: 'Photomatic' },
  { slug: 'photoroom', name: 'PhotoRoom' },
  { slug: 'picofme', name: 'PicofMe' },
  { slug: 'picsart', name: 'Picsart' },
  { slug: 'pictura', name: 'Pictura AI' },
  { slug: 'pixar-style', name: 'Pixar-Style AI Portrait Tools' },
  { slug: 'pixelcut', name: 'Pixelcut' },
  { slug: 'pixlr', name: 'Pixlr' },
  { slug: 'portret', name: 'Portret' },
  { slug: 'prequel-app', name: 'Prequel' },
  { slug: 'prisma-app', name: 'Prisma' },
  { slug: 'profilephoto', name: 'ProfilePhoto.ai' },
  { slug: 'profilepicture-ai', name: 'ProfilePicture.AI' },
  { slug: 'prophotos-ai', name: 'ProPhotos AI' },
  { slug: 'reface-ai', name: 'Reface AI' },
  { slug: 'remini', name: 'Remini' },
  { slug: 'remove-bg', name: 'Remove.bg' },
  { slug: 'runway-ml', name: 'RunwayML' },
  { slug: 'secta', name: 'Secta Labs' },
  { slug: 'snapheadshots', name: 'SnapHeadshots' },
  { slug: 'snapseed', name: 'Snapseed' },
  { slug: 'stable-diffusion', name: 'Stable Diffusion' },
  { slug: 'studio-shot', name: 'StudioShot' },
  { slug: 'supawork-ai', name: 'Supawork AI' },
  { slug: 'the-multiverse-ai', name: 'The Multiverse AI' },
  { slug: 'topaz-ai', name: 'Topaz Labs' },
  { slug: 'tryitonai', name: 'Try It On AI' },
  { slug: 'vivid-headshots', name: 'Vivid Headshots' },
  { slug: 'wondershare-ai', name: 'Wondershare AI' },
  { slug: 'youcan-ai', name: 'YouCam Perfect' },
];

export default function VsIndexPage() {
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
            <h1 className="text-4xl font-bold tracking-tight text-tp-ink sm:text-5xl lg:text-6xl">
              How TailorPic Compares
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-tp-ink/70">
              Side-by-side comparisons of TailorPic and the most popular alternatives, so you can
              choose the right tool for your photos.
            </p>
          </div>
        </section>

        <section className="bg-tp-paper pb-20 pt-4 md:pb-28">
          <div className="mx-auto max-w-6xl px-4">
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {comparisons.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/vs/${c.slug}`}
                    className="group flex h-full flex-col rounded-tp-card border border-tp-line bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <h2 className="text-lg font-semibold text-tp-ink">TailorPic vs {c.name}</h2>
                    <p className="mt-2 flex-1 text-sm text-tp-ink/70">
                      See how TailorPic compares to {c.name}.
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-tp-ink">
                      View comparison
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
