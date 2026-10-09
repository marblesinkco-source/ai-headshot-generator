import { BASE_PRICE_DISPLAY } from '@/config/pricing';

/* ------------------------------------------------------------------ */
/*  Help Center Data — shared between server page and client component */
/* ------------------------------------------------------------------ */

export interface HelpItem {
  question: string;
  answer: string;
}

export interface HelpCategoryData {
  id: string;
  title: string;
  description: string;
  iconName: string;
  items: HelpItem[];
}

export const helpCategories: HelpCategoryData[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Create your account and generate your first headshot.',
    iconName: 'Rocket',
    items: [
      {
        question: 'How do I get started with TailorPic?',
        answer:
          'Create an account, upload 4–10 selfies of yourself, choose a headshot style, and our AI will generate professional photos tailored to you. The whole process takes just a few minutes to set up.',
      },
      {
        question: 'Do I need to create an account?',
        answer:
          'Yes. A free account lets you upload photos and preview styles. You only pay when you are ready to generate your AI headshots.',
      },
      {
        question: 'How much does TailorPic cost?',
        answer: `TailorPic starts at a one-time payment of ${BASE_PRICE_DISPLAY}. There are no subscriptions or recurring fees — you pay once and keep your photos forever.`,
      },
      {
        question: 'What packages are available?',
        answer:
          'We offer several packages with different numbers of generated headshots and style options. Visit our pricing page for the latest details on what each package includes.',
      },
      {
        question: 'Can I try before committing to a larger package?',
        answer: `Yes. TailorPic 1 (${BASE_PRICE_DISPLAY}) lets you generate a single AI headshot so you can see how the technology works with your face before choosing a bigger package. If you like what you see, you can upgrade at any time.`,
      },
    ],
  },
  {
    id: 'photo-upload',
    title: 'Photo Upload',
    description: 'Requirements, tips, and what to avoid for best results.',
    iconName: 'ImageUp',
    items: [
      {
        question: 'How do I upload my photos?',
        answer:
          'After signing in, navigate to the upload area and drag-and-drop or select your selfies. You need a minimum of 4 photos and can upload up to 10; we recommend using all 10 for the best results. The uploader accepts JPEG, PNG, and HEIC formats.',
      },
      {
        question: 'What kind of photos should I upload?',
        answer:
          'Upload clear selfies and photos of your face from different angles. Include a mix of front-facing and slight side angles. Good lighting, a neutral background, and no sunglasses or heavy filters work best.',
      },
      {
        question: 'How many photos do I need to upload?',
        answer:
          'We require a minimum of 4 photos and accept up to 10; more variety gives the best results. More variety helps the AI learn your features accurately.',
      },
      {
        question: 'What should I avoid in my photos?',
        answer:
          'Avoid sunglasses, hats that cover your forehead, heavy makeup or face paint, group photos where your face is small, and heavily filtered or edited images.',
      },
      {
        question: 'Can I use photos taken with my phone?',
        answer:
          'Absolutely. Modern phone cameras are more than sufficient. Just make sure the photos are in focus and well-lit. Front-facing camera selfies work great.',
      },
    ],
  },
  {
    id: 'your-headshots',
    title: 'Your Headshots',
    description: 'Turnaround time, formats, and re-generating photos.',
    iconName: 'Images',
    items: [
      {
        question: 'How long does it take to get my headshots?',
        answer:
          'AI headshot generation typically takes 30–90 minutes depending on current demand. You will receive an email notification when your photos are ready.',
      },
      {
        question: 'What format are the downloaded photos?',
        answer:
          'All headshots are delivered as high-resolution JPEG files suitable for LinkedIn, resumes, websites, and print. The resolution is optimized for both digital and print use.',
      },
      {
        question: 'Can I re-generate my headshots?',
        answer:
          'Yes. If you are not satisfied with the results, regeneration is included within your package at no extra cost. You can also purchase additional credits if you need more.',
      },
      {
        question: 'How do I download my photos?',
        answer:
          'Once your headshots are ready, visit your dashboard and click the download button on any photo. You can download individual images or all of them at once as a ZIP file.',
      },
    ],
  },
  {
    id: 'account-billing',
    title: 'Account & Billing',
    description: 'Managing your account, payments, and data export.',
    iconName: 'CreditCard',
    items: [
      {
        question: 'How do I manage my account settings?',
        answer:
          'Sign in and navigate to your account settings from the dashboard. There you can update your email, password, notification preferences, and profile information.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit and debit cards (Visa, Mastercard, American Express) through our secure payment processor. All transactions are encrypted.',
      },
      {
        question: 'Can I export my data?',
        answer:
          'Yes. You can request a full data export from your account settings. This includes your uploaded photos, generated headshots, and account information in a downloadable archive.',
      },
      {
        question: 'What is your quality commitment?',
        answer:
          'We are committed to delivering studio-quality results. If you are not happy with your photos, you can regenerate them within your package at no extra cost. If you are still not satisfied, contact support and we will work with you to resolve the issue. See our Refund Policy for the full details.',
      },
      {
        question: 'How do I delete my account?',
        answer:
          'You can delete your account from the account settings page. Account deletion is permanent and will remove all your data, uploaded photos, and generated headshots from our servers.',
      },
    ],
  },
  {
    id: 'team-enterprise',
    title: 'Team & Enterprise',
    description: 'Bulk ordering, consistent team photos, and admin tools.',
    iconName: 'Users',
    items: [
      {
        question: 'How does team ordering work?',
        answer:
          'An admin creates a team workspace, invites members via email, and each member uploads their own photos. The admin can choose a consistent style so all team headshots look cohesive.',
      },
      {
        question: 'Can we get consistent team photos?',
        answer:
          'Yes. Our team feature lets you select a unified background, lighting style, and dress code so every team member gets headshots that look like they were taken in the same session.',
      },
      {
        question: 'Is there team or bulk pricing?',
        answer:
          'Yes. We offer discounted rates for teams and organizations that need headshots for multiple people. Contact us or visit our Enterprise page for custom team pricing.',
      },
      {
        question: 'What admin features are available?',
        answer:
          'Team admins can manage members, track progress, set style guidelines, download all team photos in bulk, and manage billing from a central dashboard.',
      },
    ],
  },
  {
    id: 'privacy-security',
    title: 'Privacy & Security',
    description: 'Data handling, GDPR compliance, and photo deletion.',
    iconName: 'ShieldCheck',
    items: [
      {
        question: 'How is my data handled?',
        answer:
          'Your photos and personal data are encrypted in transit and at rest. We use industry-standard security practices and share your photos only with our AI processing partner to generate your headshots. We never sell them.',
      },
      {
        question: 'Are you GDPR compliant?',
        answer:
          'Yes. TailorPic is fully GDPR compliant. You have the right to access, export, and delete your data at any time. We also support data portability requests.',
      },
      {
        question: 'When are my photos deleted?',
        answer:
          'Uploaded photos, your temporary AI model and generated photos are automatically deleted from our servers 30 days after delivery. You can also delete them sooner from your dashboard at any time.',
      },
      {
        question: 'Who can see my photos?',
        answer:
          'Only you can access your uploaded and generated photos. Our team does not view customer photos unless you explicitly share them with support for troubleshooting purposes.',
      },
    ],
  },
];

/* Flatten all Q&A — safe to use from both server and client */
export const allFaqItems = helpCategories.flatMap((cat) =>
  cat.items.map((item) => ({
    question: item.question,
    answer: item.answer,
  }))
);
