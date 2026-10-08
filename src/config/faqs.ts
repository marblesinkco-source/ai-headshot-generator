import { PAYMENT_PROVIDER } from '@/config/pricing';

export const faqs = [
  {
    category: 'Product',
    question: 'How does AI headshot generation work?',
    answer:
      'You upload 4 to 10 selfies and choose a package. Our AI trains a custom model on your features, then generates professional headshots in your chosen backgrounds and styles. You review the results and download your favorites.',
  },
  {
    category: 'Delivery',
    question: 'How long does it take to get my photos?',
    answer:
      'Most orders are completed within 2 hours. After you upload your selfies, our AI trains a custom model on your features (about 30 minutes), then generates all your photos. You will receive an email notification as soon as they are ready to download.',
  },
  {
    category: 'Product',
    question: 'How good is the quality compared to a real photographer?',
    answer:
      'Our AI aims for studio-style results, and quality depends heavily on the selfies you upload. Every package includes HD resolution, and the Executive plan delivers 4K, suitable for print and large displays. Results are AI-generated portraits, so review them before using them professionally.',
  },
  {
    category: 'Product',
    question: 'What kind of selfies should I upload?',
    answer:
      'Upload 4 to 10 clear photos of your face from different angles. Use good, natural lighting (near a window works great). Avoid heavy filters, sunglasses, or group photos. The more variety in angles and expressions, the better your results will be.',
  },
  {
    category: 'Privacy',
    question: 'Is my data private and secure?',
    answer:
      'Yes. Your photos are encrypted in transit and at rest. We never sell your images, and they are processed only by the service providers listed on our Subprocessors page, solely to generate your results. Your AI model and all generated photos are automatically deleted from our servers 30 days after delivery. You can also request immediate deletion at any time.',
  },
  {
    category: 'Privacy',
    question: 'Do you store my photos?',
    answer:
      'Only for as long as needed to deliver your results. Your uploaded photos, your AI model, and all generated photos are automatically deleted from our servers 30 days after delivery. You can also request immediate deletion at any time by contacting support.',
  },
  {
    category: 'Refund',
    question: 'Can I get a refund if I am not satisfied?',
    answer:
      'If you are not happy with your photos, contact our support team and we will work with you to resolve the issue.',
  },
  {
    category: 'Pricing',
    question: 'Is this a subscription? Are there hidden fees?',
    answer:
      'No. Every package is a one-time payment at the price shown. There is no subscription, nothing renews automatically, and no hidden fees. See all plans at tailorpic.com/pricing.',
  },
  {
    category: 'Pricing',
    question: 'Is checkout secure?',
    answer:
      `Yes. Payments are processed by ${PAYMENT_PROVIDER.name}, so your card details are handled by ${PAYMENT_PROVIDER.name} and never stored on our servers.`,
  },
  {
    category: 'Refund',
    question: 'What if the photos do not look like me?',
    answer:
      'Clear, varied selfies make the biggest difference, so follow the upload tips above. If you are still not happy with the results, contact support: we will work with you on regenerating photos, and our satisfaction guarantee applies.',
  },
  {
    category: 'Product',
    question: 'Can I use these photos professionally, such as on LinkedIn or my resume?',
    answer:
      'Yes. You own full rights to all generated photos. Use them on LinkedIn, your resume, your company website, business cards, email signatures, press kits, or anywhere else. There are no licensing restrictions or royalties.',
  },
  {
    category: 'Pricing',
    question: 'What is the difference between the packages?',
    answer:
      'TailorPic 1 ($1.99) gives you a single headshot to try the service. Lite ($9.90) gives you 5 headshots with 2 backgrounds and 2 styles. Basic ($19.90) gives you 10 headshots with 3 backgrounds and 3 styles. Starter ($29.90) gives you 40 headshots with 5 backgrounds and 3 styles. Professional ($49.90) gives you 80 headshots with 10 backgrounds, 6 styles, HD resolution, and a LinkedIn banner. Executive ($89.90) gives you 160 headshots with 15 backgrounds, 10 styles, 4K resolution, a LinkedIn banner, an email signature, and priority support.',
  },
  {
    category: 'Privacy',
    question: 'Do you sell or share my photos?',
    answer:
      'No. We never sell your photos. They are used only to generate your headshots and are processed only by the providers on our Subprocessors page. See our Security page and Privacy Policy for details.',
  },
  {
    category: 'Privacy',
    question: 'How are my photos encrypted?',
    answer:
      'Your data is encrypted in transit (TLS) and at rest. See our Security page for details.',
  },
  {
    category: 'Privacy',
    question: 'Are you GDPR and CCPA compliant?',
    answer:
      'Yes. We honor GDPR (EU) and CCPA (California) data subject requests, including access, correction, and deletion of your personal data. Contact support to make a request.',
  },
  {
    category: 'Delivery',
    question: 'Can I get my photos faster?',
    answer:
      'Most orders are completed within about 2 hours, and you will receive an email as soon as your photos are ready to download. Lite ($9.90) and Basic ($19.90) list 24-hour delivery as their delivery window, so allow up to a day for those. Priority support is included with the Executive package.',
  },
  {
    category: 'Refund',
    question: 'How do I request help if I am not satisfied?',
    answer:
      'Contact our support team with your order details. Under our satisfaction guarantee, we will work with you to regenerate your photos within your package at no extra cost. See our terms of service for the full policy.',
  },
  {
    category: 'Teams',
    question: 'Can I order headshots for my team?',
    answer:
      'Yes. Our team packages start at $39 per person for groups of 5–15, and $29 per person for groups of 16–50. Every team member uploads their own selfies and receives individually styled headshots with a consistent look. Visit our Teams page for details.',
  },
  {
    category: 'Teams',
    question: 'How do team headshots maintain a consistent look?',
    answer:
      'When you order team headshots, all members receive photos with the same background style and color treatment. Each person still gets individually generated portraits based on their own selfies, so the results look natural while matching your brand.',
  },
  {
    category: 'Teams',
    question: 'Can team members upload photos at different times?',
    answer:
      'Yes. Each team member receives their own upload link and can submit their selfies whenever convenient. Photos are generated individually, so there is no need to coordinate timing.',
  },
  {
    category: 'Technical',
    question: 'What resolution are the photos?',
    answer:
      'Standard packages deliver HD resolution (1024×1440 pixels), suitable for web, LinkedIn, and email signatures. The Executive package delivers 4K resolution (2176×2880 pixels), suitable for print, large displays, and marketing materials.',
  },
  {
    category: 'Technical',
    question: 'What file format do I receive?',
    answer: 'All photos are delivered as high-quality JPEG files. If you need a different format, contact support.',
  },
  {
    category: 'Technical',
    question: 'Can I choose specific backgrounds?',
    answer:
      'Yes. Each package includes a set number of background options. Higher-tier packages offer more backgrounds, from solid studio colors to gradient and environmental settings. See the package comparison on our pricing page.',
  },
  {
    category: 'Technical',
    question: 'Do I need a professional camera?',
    answer:
      'No. A modern smartphone camera is all you need. Our AI is designed to work with casual selfies taken in everyday settings. Just follow our upload tips for best results.',
  },
  {
    category: 'Product',
    question: 'How many selfies should I upload?',
    answer:
      'Upload between 4 and 10 selfies for best results. Include a mix of angles (front, slight left, slight right) and expressions. More variety helps the AI capture your features accurately.',
  },
  {
    category: 'Product',
    question: 'Can I use the photos on social media?',
    answer:
      'Yes. You own full rights to all generated photos with no licensing restrictions. Use them on LinkedIn, Instagram, Twitter, Facebook, your website, or any other platform.',
  },
  {
    category: 'Product',
    question: 'What if I wear glasses?',
    answer:
      'Include photos both with and without glasses if possible. If you always wear glasses, upload selfies with them on — the AI will incorporate them naturally into your headshots.',
  },
  {
    category: 'Delivery',
    question: 'Will I be notified when my photos are ready?',
    answer:
      'Yes. You will receive an email notification as soon as your photos are ready to download. You can also check your dashboard at any time for real-time status updates.',
  },
  {
    category: 'Pricing',
    question: 'Do you offer discounts for large teams?',
    answer:
      'Yes. Teams of 16–50 members receive a reduced rate of $29 per person. For groups larger than 50, contact us for a custom enterprise quote.',
  },
  {
    category: 'Pricing',
    question: 'Can I upgrade my package after purchase?',
    answer:
      'Contact our support team to discuss upgrading. We will work with you to find the best solution based on your needs.',
  },
  {
    category: 'Refund',
    question: 'What does the satisfaction guarantee cover?',
    answer:
      'Our satisfaction guarantee covers the quality of your AI-generated photos. If the results do not meet your expectations, we will regenerate them within your package at no extra cost. Contact support and we will work with you to resolve the issue. See our terms of service for the full policy.',
  },
];

export const faqCategories = ['Product', 'Pricing', 'Teams', 'Privacy', 'Technical', 'Delivery', 'Refund'] as const;
