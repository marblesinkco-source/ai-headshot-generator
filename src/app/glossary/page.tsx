import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/marketing/header';
import { Footer } from '@/components/marketing/footer';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { BreadcrumbSchema } from '@/components/structured-data';

export const metadata: Metadata = {
  title: 'AI Photography Glossary — Key Terms Explained | TailorPic',
  description:
    '30+ AI photography terms explained in plain language: diffusion models, LoRA, fine-tuning, lighting setups, resolution, retouching and more.',
  alternates: { canonical: '/glossary' },
  openGraph: {
    title: `AI Photography Glossary | ${siteConfig.name}`,
    description:
      '30+ AI photography and headshot terms explained in plain language.',
    url: `${siteConfig.url}/glossary`,
  },
};

interface Term {
  term: string;
  definition: string;
  link?: { href: string; label: string };
}

const terms: Term[] = [
  {
    term: 'Aspect Ratio',
    definition:
      'The proportional relationship between an image\'s width and height, written as two numbers such as 4:5 or 1:1. Different platforms favor different ratios, so choosing the right one avoids awkward cropping of your face.',
  },
  {
    term: 'AI Headshot',
    definition:
      'A professional portrait generated or enhanced by artificial intelligence, usually from a handful of ordinary selfies. The AI learns a person\'s features and renders them in a studio-style setting with flattering lighting.',
    link: { href: '/blog/how-ai-headshots-work', label: 'How AI headshots work' },
  },
  {
    term: 'AI Training Data',
    definition:
      'The images and information a model learns from. General models learn from very large collections of pictures, while a personalized model is additionally trained on a small set of photos of one person. Good, varied input photos lead to better results.',
    link: { href: '/blog/ai-headshot-privacy-security', label: 'Privacy and security' },
  },
  {
    term: 'Background Removal',
    definition:
      'The process of separating a subject from the area behind them so the background can be deleted or replaced. It is often used to put a consistent color or backdrop behind every person on a team.',
    link: { href: '/blog/headshot-background-guide', label: 'Headshot background guide' },
  },
  {
    term: 'Batch Processing',
    definition:
      'Handling many images or orders in a single automated run instead of one at a time. It is useful for companies that need matching headshots for a whole team.',
    link: { href: '/team-headshots', label: 'Team headshots' },
  },
  {
    term: 'Bokeh',
    definition:
      'The soft, blurred quality of out-of-focus areas in a photo, usually created by a wide aperture. In portraits, it separates the subject from the background and keeps attention on the face.',
  },
  {
    term: 'Butterfly Lighting',
    definition:
      'A lighting pattern in which the main light sits high and directly in front of the subject, creating a small butterfly-shaped shadow beneath the nose. It is often used in beauty and glamour portraits.',
  },
  {
    term: 'Catch Light',
    definition:
      'The small reflection of a light source visible in the eyes of a subject. Catch lights make eyes look bright and alive, and their shape and position hint at the lighting setup used.',
    link: { href: '/blog/headshot-lighting-guide', label: 'Headshot lighting guide' },
  },
  {
    term: 'Color Temperature',
    definition:
      'The warmth or coolness of light, measured in Kelvin (K). Lower values around 2700K look warm and orange, while higher values above 6000K look cool and blue. Matching color temperature keeps skin tones natural.',
    link: { href: '/blog/headshot-lighting-guide', label: 'Headshot lighting guide' },
  },
  {
    term: 'Rim Lighting',
    definition:
      'A technique where light placed behind the subject outlines the edges of the head and shoulders with a thin glow. It separates the subject from the background and adds depth and drama.',
    link: { href: '/blog/headshot-lighting-guide', label: 'Headshot lighting guide' },
  },
  {
    term: 'Color Grading',
    definition:
      'Adjusting the colors and tones of an image to achieve a consistent mood or look. In headshots, it helps skin tones look natural and keeps a set of photos visually matched.',
  },
  {
    term: 'Compositing',
    definition:
      'Combining elements from more than one image into a single final picture, such as placing a person onto a new background. AI tools can now do much of this automatically.',
  },
  {
    term: 'Crop / Framing',
    definition:
      'Choosing which part of the scene appears in the final image. A typical headshot crop includes the head and top of the shoulders, with a little space above the hair so the face is not cramped.',
  },
  {
    term: 'Diffusion Model',
    definition:
      'A type of AI model that creates images by starting from random noise and gradually removing it, guided by a learned understanding of what pictures look like. Most modern AI image generators, including those used for headshots, are based on this approach.',
    link: { href: '/blog/how-ai-headshots-work', label: 'How AI headshots work' },
  },
  {
    term: 'DPI / PPI',
    definition:
      'Dots per inch (print) and pixels per inch (screen) describe how densely detail is packed into an image. Around 300 DPI is the usual target for print, while screens depend mostly on the total pixel dimensions.',
  },
  {
    term: 'Face Detection',
    definition:
      'Technology that locates human faces within an image. It is commonly used to check photo quality, center a crop and make sure a selfie is usable before it is processed.',
  },
  {
    term: 'Facial Recognition',
    definition:
      'Technology that identifies or verifies a specific person by analyzing the unique geometry of their face. Unlike face detection, which only finds where a face is, facial recognition matches it to a known identity and is used in security, device unlock and photo organization.',
  },
  {
    term: 'Fill Light',
    definition:
      'A softer secondary light placed opposite or beside the key light to brighten shadows. It controls contrast, so a stronger fill gives a gentler, more even look.',
  },
  {
    term: 'Fine-tuning',
    definition:
      'Taking an existing, already trained AI model and training it a little more on a smaller, specific set of images. This is how a general image model can be adapted to reproduce one person\'s face.',
    link: { href: '/blog/how-ai-headshots-work', label: 'How AI headshots work' },
  },
  {
    term: 'Headshot',
    definition:
      'A portrait, usually framed from the shoulders up, used to represent a person professionally on profiles, company pages and business materials. Its purpose is to show your face clearly and look approachable.',
    link: { href: '/headshots', label: 'Professional headshots' },
  },
  {
    term: 'Image Generation',
    definition:
      'The creation of new pictures by an AI model from a text description, reference images or both. The results are newly produced images rather than edited copies of existing photos.',
  },
  {
    term: 'Image Resolution',
    definition:
      'The total number of pixels an image contains, typically expressed as width by height. Higher image resolution preserves finer detail in skin texture, hair and eyes, which matters when headshots are printed large or cropped tightly.',
  },
  {
    term: 'Key Light',
    definition:
      'The main and strongest light in a portrait setup. Its position and softness shape the face and set the overall mood of the photo.',
  },
  {
    term: 'Latent Space',
    definition:
      'A compressed, internal representation in which an AI model works with the essential features of images rather than raw pixels. Moving through this space is how models blend and vary concepts such as pose, style and lighting.',
  },
  {
    term: 'LoRA',
    definition:
      'Short for Low-Rank Adaptation, a lightweight fine-tuning technique that adds a small set of extra trainable weights to a model instead of changing the whole thing. It makes personalization fast and needs only a few photos.',
    link: { href: '/blog/how-ai-headshots-work', label: 'How AI headshots work' },
  },
  {
    term: 'LoRA Fine-Tuning',
    definition:
      'The process of applying Low-Rank Adaptation to customize a pre-trained AI model for a specific person or style. By training only a small number of extra parameters, LoRA fine-tuning can learn someone\'s face from a handful of selfies and generate new headshots that look like them.',
    link: { href: '/blog/how-ai-headshots-work', label: 'How AI headshots work' },
  },
  {
    term: 'Natural Lighting',
    definition:
      'Illumination from the sun or daylight through a window rather than artificial lamps. Soft, indirect daylight is one of the easiest ways to take a flattering selfie.',
    link: { href: '/blog/professional-headshot-tips-2025', label: 'Professional headshot tips' },
  },
  {
    term: 'Noise Reduction',
    definition:
      'Techniques that remove grain or speckling from an image, which is most visible in low light. Too much reduction can make skin look smooth and artificial, so it is best applied lightly.',
  },
  {
    term: 'Photo Editing',
    definition:
      'Any adjustment made to a photo after it is captured, including exposure, color, cropping and retouching. AI has made many of these steps automatic.',
  },
  {
    term: 'Portrait Photography',
    definition:
      'The genre of photography that focuses on capturing a person\'s appearance and personality. Headshots are one type of portrait, alongside environmental, lifestyle and group portraits.',
  },
  {
    term: 'Prompt',
    definition:
      'The text instruction given to an AI image model that describes what to create, such as the setting, clothing or style. Clear, specific prompts generally lead to more predictable results.',
  },
  {
    term: 'RAW vs JPEG',
    definition:
      'RAW files keep all of the sensor\'s data and give maximum room for editing, but they are large and need processing. JPEG files are compressed and ready to share, with less flexibility to fix exposure or color afterward.',
  },
  {
    term: 'Rembrandt Lighting',
    definition:
      'A classic portrait lighting style in which the key light sits to one side and slightly above the subject, leaving a small triangle of light on the shadowed cheek. It produces depth and a dramatic, painterly look.',
  },
  {
    term: 'Resolution',
    definition:
      'The number of pixels in an image, usually written as width by height. Higher resolution means more detail and allows larger prints or tighter crops without looking soft.',
  },
  {
    term: 'Retouching',
    definition:
      'Editing a portrait to fix small distractions such as blemishes, stray hairs or uneven skin tone. Good retouching keeps a person recognizable and looks natural rather than over-smoothed.',
  },
  {
    term: 'Split Lighting',
    definition:
      'A lighting setup where the light comes from directly beside the subject, illuminating one half of the face and leaving the other in shadow. It creates a strong, dramatic effect that is used sparingly in business portraits.',
  },
  {
    term: 'Studio Lighting',
    definition:
      'Artificial, controllable light sources such as strobes or continuous lamps, often with softboxes or umbrellas. They give a photographer precise and repeatable control over how a face is lit.',
    link: { href: '/blog/ai-headshots-vs-traditional-photography', label: 'AI vs traditional photography' },
  },
  {
    term: 'Upscaling',
    definition:
      'Increasing the pixel dimensions of an image while trying to preserve or rebuild detail. AI upscalers predict the missing detail, which usually gives cleaner results than simple enlargement.',
  },
  {
    term: 'Depth of Field',
    definition:
      'The range of distance in a photo that appears acceptably sharp, controlled mainly by aperture, focal length and subject distance. A shallow depth of field keeps the face crisp while softening the background, which is a hallmark of professional portraits.',
  },
  {
    term: 'Exposure',
    definition:
      'The amount of light that reaches the camera sensor when a photo is taken, set by aperture, shutter speed and ISO. Correct exposure keeps skin tones detailed, while overexposure blows out highlights and underexposure hides detail in shadows.',
  },
  {
    term: 'Focal Length',
    definition:
      'The distance, in millimeters, between the lens and the camera sensor when focused at infinity. It controls how zoomed in a photo looks and how facial features are rendered: moderate telephoto lengths around 85mm are favored for portraits because they flatter the face, while very wide lenses can distort proportions.',
  },
  {
    term: 'Image Metadata',
    definition:
      'Information embedded in a photo file, most commonly EXIF data such as camera model, lens, exposure settings, date and sometimes GPS location. It is useful for organizing photos, but you may want to strip it before sharing images publicly for privacy.',
    link: { href: '/blog/ai-headshot-privacy-security', label: 'Privacy and security' },
  },
  {
    term: 'White Balance',
    definition:
      'The setting that makes neutral colors, such as white or gray, appear truly neutral under different light sources. Incorrect white balance causes a yellow or blue color cast on skin.',
  },
];

const sortedTerms = [...terms].sort((a, b) =>
  a.term.localeCompare(b.term, 'en', { sensitivity: 'base' })
);

const groups: { letter: string; items: Term[] }[] = [];
for (const t of sortedTerms) {
  const letter = t.term[0].toUpperCase();
  const last = groups[groups.length - 1];
  if (last && last.letter === letter) {
    last.items.push(t);
  } else {
    groups.push({ letter, items: [t] });
  }
}

export default function GlossaryPage() {
  return (
    <main className="min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Glossary', url: `${siteConfig.url}/glossary` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tp-bronze/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            AI Photography{' '}
            <span className="bg-gradient-to-r from-tp-bronze-ink to-tp-bronze bg-clip-text text-transparent">
              Glossary
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            {terms.length} key terms from AI image generation and portrait photography, explained in
            plain language. Whether you are curious about how {siteConfig.name} works or want to
            talk shop with a photographer, start here.
          </p>
        </div>
      </section>

      {/* Letter index */}
      <nav
        aria-label="Glossary index"
        className="border-y border-tp-line bg-white/80 py-4"
      >
        <ul className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2 px-4 sm:px-6 lg:px-8">
          {groups.map((g) => (
            <li key={g.letter}>
              <a
                href={`#letter-${g.letter}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-sm font-semibold text-tp-bronze-ink transition-colors hover:bg-tp-black hover:text-tp-bronze"
              >
                {g.letter}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Terms */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl space-y-12 px-4 sm:px-6 lg:px-8">
          {groups.map((g) => (
            <div key={g.letter} id={`letter-${g.letter}`} className="scroll-mt-24">
              <h2 className="font-display text-3xl font-normal italic text-tp-bronze-ink">
                {g.letter}
              </h2>
              <dl className="mt-4 grid gap-4">
                {g.items.map((t) => (
                  <div
                    key={t.term}
                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                  >
                    <dt className="text-lg font-bold text-gray-900">{t.term}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-gray-600">
                      {t.definition}
                      {t.link && (
                        <>
                          {' '}
                          <Link
                            href={t.link.href}
                            className="font-medium text-tp-bronze-ink underline underline-offset-2 hover:text-tp-bronze"
                          >
                            {t.link.label}
                          </Link>
                          .
                        </>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-tp-black py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-normal italic text-tp-bronze sm:text-4xl">
            See the Technology in Action
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-tp-beige/80">
            Upload a few selfies and get professional AI headshots in about two hours.
          </p>
          <div className="mt-8">
            <Link href="/dashboard/upload">
              <Button size="lg">Get Your Headshots</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
