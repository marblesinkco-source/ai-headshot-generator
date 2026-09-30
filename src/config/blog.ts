/**
 * TailorPic — Static blog configuration
 * Blog posts are defined here as static data. For a CMS-backed blog,
 * replace this with API calls to your preferred CMS.
 */

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string; // HTML content
  author: string;
  publishedAt: string; // ISO date string
  updatedAt?: string;
  coverImage?: string;
  tags: string[];
  readingTime: string; // e.g. "5 min read"
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-ai-headshots-work',
    title: 'How AI Headshots Work: The Technology Behind TailorPic',
    description:
      'Discover how AI-powered photo generation creates stunning, professional headshots from just a few selfies. Learn about the technology that makes it possible.',
    content: `
      <p>Professional headshots have traditionally required booking a photographer, traveling to a studio, and waiting days for edited results. AI is changing that entirely.</p>

      <h2>The Process</h2>
      <p>When you upload your selfies to TailorPic, our AI trains a custom model specifically on your unique facial features. This personalized model learns what makes you <em>you</em> — your bone structure, skin tone, expressions, and distinctive features.</p>

      <p>Once trained, this model can place you in virtually any professional setting, with perfect lighting, flattering angles, and studio-quality results. The entire process takes about 1-2 hours from upload to delivery.</p>

      <h2>The Technology</h2>
      <p>We use state-of-the-art diffusion models, fine-tuned with LoRA (Low-Rank Adaptation) techniques. This approach allows us to create highly personalized models without requiring thousands of training images — just 4-10 clear photos of your face.</p>

      <h2>Quality and Privacy</h2>
      <p>Every generated image goes through quality checks to ensure professional standards. Your uploaded photos are encrypted end-to-end and automatically deleted 30 days after delivery. We never share your data with third parties.</p>
    `,
    author: 'TailorPic Team',
    publishedAt: '2024-12-15',
    tags: ['AI', 'Technology', 'Headshots'],
    readingTime: '4 min read',
  },
  {
    slug: 'best-photos-for-linkedin',
    title: '7 Tips for the Perfect LinkedIn Profile Photo in 2025',
    description:
      'Your LinkedIn photo is your first impression. Here are 7 expert tips for choosing a profile photo that gets you noticed by recruiters and clients.',
    content: `
      <p>Your LinkedIn profile photo is often the first thing recruiters, clients, and colleagues see. Studies show that profiles with professional photos receive up to 21 times more views and 36 times more messages.</p>

      <h2>1. Use a High-Resolution Image</h2>
      <p>Blurry or pixelated photos send the wrong message. Make sure your headshot is at least 400x400 pixels, though higher resolution is always better.</p>

      <h2>2. Keep the Background Clean</h2>
      <p>A simple, uncluttered background keeps the focus on you. Solid colors, subtle gradients, or professional office settings work best.</p>

      <h2>3. Dress for Your Industry</h2>
      <p>Your attire should match the expectations of your field. A tech startup founder can go business casual, while a corporate lawyer should lean more formal.</p>

      <h2>4. Look Directly at the Camera</h2>
      <p>Eye contact creates connection and trust. Face the camera straight on or at a slight angle.</p>

      <h2>5. Smile Naturally</h2>
      <p>A genuine smile makes you approachable. Practice in front of a mirror or have someone tell you a joke right before the shot.</p>

      <h2>6. Use Proper Lighting</h2>
      <p>Natural light or professional studio lighting brings out your best features. Avoid harsh overhead lights or direct flash.</p>

      <h2>7. Keep It Current</h2>
      <p>Your photo should look like you do now. Update it at least every two years or whenever you make a significant change to your appearance.</p>

      <h2>The AI Alternative</h2>
      <p>With TailorPic, you can get all of these qualities in your headshot without the hassle of scheduling a photographer. Upload a few selfies and our AI generates professional-quality headshots that check every box.</p>
    `,
    author: 'TailorPic Team',
    publishedAt: '2025-01-10',
    tags: ['LinkedIn', 'Career', 'Tips'],
    readingTime: '5 min read',
  },
  {
    slug: 'ai-pet-portraits-guide',
    title: 'The Complete Guide to AI Pet Portraits: Turn Your Pet into Art',
    description:
      'Learn how to create stunning AI-generated portraits of your beloved pets. From royal paintings to pop art — explore all the creative possibilities.',
    content: `
      <p>Pet portraits have been a beloved tradition for centuries. Now, AI makes it possible to turn your furry (or feathery, or scaly) friend into a work of art — in minutes, not weeks.</p>

      <h2>What Are AI Pet Portraits?</h2>
      <p>AI pet portraits use generative AI to transform photos of your pet into artistic renderings. Upload clear photos of your pet, and our AI creates portraits in styles ranging from Renaissance oil paintings to modern pop art.</p>

      <h2>Getting the Best Results</h2>
      <p>For the best AI pet portraits, follow these tips:</p>
      <ul>
        <li><strong>Use clear, well-lit photos</strong> — natural light works best</li>
        <li><strong>Show different angles</strong> — front-facing, profile, and three-quarter views</li>
        <li><strong>Keep backgrounds simple</strong> — this helps the AI focus on your pet</li>
        <li><strong>Upload 6-10 photos</strong> — variety helps the AI understand your pet's unique features</li>
      </ul>

      <h2>Popular Styles</h2>
      <p>Our most popular pet portrait styles include Royal/Regal (your pet in royal attire), Renaissance (classic oil painting style), Watercolor, Pop Art, and Fantasy (your pet in magical settings).</p>

      <h2>Perfect Gifts</h2>
      <p>AI pet portraits make wonderful gifts for pet lovers. They are unique, personal, and can be printed on canvas, framed, or used for custom merchandise.</p>
    `,
    author: 'TailorPic Team',
    publishedAt: '2025-02-05',
    tags: ['Pets', 'Art', 'Guide'],
    readingTime: '4 min read',
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
