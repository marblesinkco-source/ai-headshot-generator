/**
 * Per-category content: benefits, use-cases, FAQ items, and how-it-works steps.
 * Separated from categories.ts to keep config lean and content editable.
 */

import type { CategoryId } from './categories';

export interface CategoryBenefit {
  title: string;
  description: string;
  icon: string; // emoji
}

export interface CategoryUseCase {
  title: string;
  description: string;
}

export interface CategoryFAQItem {
  question: string;
  answer: string;
}

export interface CategoryHowItWorksStep {
  step: string;
  title: string;
  description: string;
}

export interface CategoryContent {
  benefits: CategoryBenefit[];
  useCases: CategoryUseCase[];
  faqItems: CategoryFAQItem[];
  howItWorks: CategoryHowItWorksStep[];
  /** Short marketing headline for the benefits section */
  benefitsHeadline: string;
}

export const CATEGORY_CONTENT: Record<CategoryId, CategoryContent> = {
  headshots: {
    benefitsHeadline: 'Why Choose AI Headshots?',
    benefits: [
      {
        title: 'Studio Quality, No Studio',
        description: 'Professional lighting, backgrounds, and poses — all generated from your selfies.',
        icon: '📸',
      },
      {
        title: 'Ready in Hours, Not Days',
        description: 'Skip the booking, commute, and retouching queue. Most orders are ready within hours.',
        icon: '⚡',
      },
      {
        title: 'Multiple Styles & Backgrounds',
        description: 'From corporate to creative — get variety you would never get in a single studio session.',
        icon: '🎨',
      },
      {
        title: 'Fraction of the Cost',
        description: 'Skip the studio booking. Try one photo from $1.99, or go up to 160 photos on the largest package.',
        icon: '💰',
      },
    ],
    useCases: [
      { title: 'LinkedIn Profile', description: 'Make a strong first impression on recruiters and connections.' },
      { title: 'Resume & CV', description: 'Stand out with a polished, professional photo on your application.' },
      { title: 'Company Website', description: 'Consistent, high-quality team photos for your about page.' },
      { title: 'Email Signature', description: 'Add a professional touch to every email you send.' },
      { title: 'Business Cards', description: 'A face to the name — make your card memorable.' },
      { title: 'Speaker Profiles', description: 'Event organizers need a great headshot for conference pages.' },
    ],
    faqItems: [
      {
        question: 'How many selfies do I need to upload?',
        answer: 'Upload 4–10 clear selfies with different angles and expressions. The more variety you provide, the better the AI can capture your likeness.',
      },
      {
        question: 'How long until my headshots are ready?',
        answer: 'Most orders are ready within hours. You will receive an email as soon as your headshots are available for download.',
      },
      {
        question: 'Can I use these for LinkedIn?',
        answer: 'Absolutely. All headshots are high-resolution and optimized for professional platforms like LinkedIn, company websites, and business cards.',
      },
      {
        question: 'What if I am not satisfied?',
        answer: 'Every package includes regenerations, and our support team will work with you until the photos are right. See our Quality Promise for details.',
      },
      {
        question: 'Do you keep my photos?',
        answer: 'Your uploaded photos and temporary training data are automatically deleted 30 days after delivery, and you can delete them sooner from your dashboard. See our Privacy Policy for the full details.',
      },
    ],
    howItWorks: [
      { step: '1', title: 'Upload Your Selfies', description: 'Upload 4–10 clear selfies from different angles. No special equipment needed — your phone camera works great.' },
      { step: '2', title: 'AI Creates Your Headshots', description: 'Our AI analyzes your photos and generates professional headshots with studio-quality lighting and backgrounds.' },
      { step: '3', title: 'Download & Use', description: 'Get high-resolution headshots ready for LinkedIn, resumes, websites, and more. Download in multiple formats.' },
    ],
  },

  dating: {
    benefitsHeadline: 'Stand Out on Every Dating App',
    benefits: [
      {
        title: 'Photos That Look Like You',
        description: 'Show up as the best, most recent version of yourself, not a heavily filtered one.',
        icon: '💘',
      },
      {
        title: 'Natural & Authentic',
        description: 'No filters, no heavy editing — just you in flattering lighting and settings.',
        icon: '✨',
      },
      {
        title: 'Variety of Scenes',
        description: 'Travel, outdoor, café, sunset — show your personality through diverse backgrounds.',
        icon: '🌅',
      },
      {
        title: 'No Photographer Needed',
        description: 'Stop asking friends to take your dating photos. Get professional results from selfies.',
        icon: '🙌',
      },
    ],
    useCases: [
      { title: 'Tinder', description: 'Clear, friendly photos for your first slot.' },
      { title: 'Bumble', description: 'Show confidence and authenticity in your profile.' },
      { title: 'Hinge', description: 'Fill every prompt slot with a great photo.' },
      { title: 'Coffee Meets Bagel', description: 'Quality photos that match a quality conversation.' },
      { title: 'Match.com', description: 'Stand out in a sea of blurry selfies and group photos.' },
      { title: 'Social Media', description: 'Upgrade your Instagram and social profiles too.' },
    ],
    faqItems: [
      {
        question: 'Will these photos look natural?',
        answer: 'Yes. Our AI generates natural, candid-looking photos — not overly polished studio shots. They look like a friend with a great camera took them.',
      },
      {
        question: 'How many photos should I use on my profile?',
        answer: 'Most profiles work well with a handful of varied photos: a clear face shot, a full-body shot, and a few that show your interests. Our packages give you plenty to choose from.',
      },
      {
        question: 'Can people tell these are AI-generated?',
        answer: 'The photos are AI-generated and designed to look natural. Some apps ask you to use recent, accurate photos of yourself, so choose images that still look like you.',
      },
      {
        question: 'What kind of selfies should I upload?',
        answer: 'Upload 5–10 casual, clear selfies. Include close-ups and full body shots with natural expressions. Good lighting helps.',
      },
      {
        question: 'Do you keep my photos private?',
        answer: 'Your uploaded photos and temporary training data are automatically deleted 30 days after delivery, and you can delete them sooner from your dashboard. See our Privacy Policy for details.',
      },
    ],
    howItWorks: [
      { step: '1', title: 'Upload Your Photos', description: 'Upload 5–10 casual selfies. Mix close-ups and full body shots for best variety.' },
      { step: '2', title: 'AI Creates Your Profile Photos', description: 'Our AI generates natural-looking photos with flattering lighting, diverse settings, and authentic expressions.' },
      { step: '3', title: 'Update Your Profile', description: 'Download your favorites and update your profile. Use them on Tinder, Bumble, Hinge, and any other app.' },
    ],
  },

  'pet-portraits': {
    benefitsHeadline: 'Turn Your Pet Into a Masterpiece',
    benefits: [
      {
        title: 'Unique Art Styles',
        description: 'Royal portraits, pop art, Renaissance, watercolor — your pet in every artistic style.',
        icon: '🎨',
      },
      {
        title: 'Perfect Gift',
        description: 'Surprise pet lovers with a one-of-a-kind portrait of their furry friend.',
        icon: '🎁',
      },
      {
        title: 'Print-Ready Quality',
        description: 'High-resolution output suitable for canvas prints, posters, and wall art.',
        icon: '🖼️',
      },
      {
        title: 'Any Pet Welcome',
        description: 'Dogs, cats, rabbits, birds and more. If your pet\'s face is clearly visible in your photos, you can start.',
        icon: '🐾',
      },
    ],
    useCases: [
      { title: 'Wall Art', description: 'A stunning portrait of your pet for your living room.' },
      { title: 'Gifts', description: 'The perfect present for any animal lover.' },
      { title: 'Social Media', description: 'Shareable, adorable portraits your followers will love.' },
      { title: 'Memorial', description: 'A beautiful tribute to a beloved pet.' },
      { title: 'Merchandise', description: 'Use on mugs, phone cases, t-shirts, and more.' },
    ],
    faqItems: [
      {
        question: 'What kind of pet photos should I upload?',
        answer: 'Upload 5–10 clear photos of your pet from different angles. Make sure the face is visible, lighting is good, and the photos are not blurry.',
      },
      {
        question: 'Can I get portraits of multiple pets together?',
        answer: 'Yes! Our Premium package includes multi-pet compositions. Upload photos of each pet and we can create group portraits.',
      },
      {
        question: 'What art styles are available?',
        answer: 'We offer Royal/Renaissance, pop art, watercolor, cartoon, minimalist, and many more. The number of styles depends on your chosen package.',
      },
      {
        question: 'Can I print these portraits?',
        answer: 'Absolutely. All outputs are high-resolution and suitable for printing. Premium packages include 4K resolution for large format prints.',
      },
    ],
    howItWorks: [
      { step: '1', title: 'Upload Pet Photos', description: 'Upload 5–10 clear photos of your pet from different angles. Show the full face with good lighting.' },
      { step: '2', title: 'Choose Your Style', description: 'Select from Royal, Renaissance, pop art, watercolor, and dozens more artistic styles.' },
      { step: '3', title: 'Get Your Portraits', description: 'Download print-ready pet portraits perfect for wall art, gifts, or sharing on social media.' },
    ],
  },

  'linkedin-team': {
    benefitsHeadline: 'Unified Team Branding',
    benefits: [
      {
        title: 'Consistent Style',
        description: 'Every team member gets matching backgrounds, lighting, and professional quality.',
        icon: '🎯',
      },
      {
        title: 'No Scheduling Hassle',
        description: 'Skip coordinating a photographer for the whole team. Each person uploads on their own time.',
        icon: '📅',
      },
      {
        title: 'Brand Color Matching',
        description: 'Match your company colors in backgrounds and tones for brand consistency.',
        icon: '🏢',
      },
      {
        title: 'Lower Cost Per Person',
        description: 'Per-person cost drops as your team grows, with no photographer to schedule.',
        icon: '💵',
      },
    ],
    useCases: [
      { title: 'Company Website', description: 'Consistent team photos for your about page and team section.' },
      { title: 'LinkedIn Company Page', description: 'Professional, unified team presence on LinkedIn.' },
      { title: 'Pitch Decks', description: 'Make your team look polished in investor presentations.' },
      { title: 'Annual Reports', description: 'Professional headshots for corporate publications.' },
      { title: 'Conference Materials', description: 'Speaker and attendee photos for events.' },
    ],
    faqItems: [
      {
        question: 'How does team ordering work?',
        answer: 'Purchase a team package, then share access links with each team member. Each person uploads their own photos and receives their individual headshots.',
      },
      {
        question: 'Can we match our brand colors?',
        answer: 'Yes. Medium and Large team packages include brand color matching for backgrounds and tones.',
      },
      {
        question: 'What if team members are in different locations?',
        answer: 'That is the beauty of AI headshots — each person uploads from wherever they are, and the results are perfectly consistent.',
      },
      {
        question: 'How many headshots does each person get?',
        answer: 'Each team member receives approximately 40 headshots across multiple styles and backgrounds.',
      },
    ],
    howItWorks: [
      { step: '1', title: 'Choose Your Team Size', description: 'Select the package that fits your team — from 5 to 50 members.' },
      { step: '2', title: 'Share Access Links', description: 'Each team member uploads 4–8 photos on their own time, from anywhere.' },
      { step: '3', title: 'Get Consistent Results', description: 'Everyone receives matching, professional headshots with consistent style and branding.' },
    ],
  },

  'baby-shower': {
    benefitsHeadline: 'Celebrate in Style',
    benefits: [
      {
        title: 'Personalized Designs',
        description: 'AI creates unique invitation designs featuring the parents-to-be.',
        icon: '🎨',
      },
      {
        title: 'Multiple Themes',
        description: 'From woodland to boho, minimalist to classic — find your perfect style.',
        icon: '🌸',
      },
      {
        title: 'Download When Ready',
        description: 'No back-and-forth with a designer. Download your invitations when they are ready and send them.',
        icon: '⚡',
      },
      {
        title: 'Complete Stationery',
        description: 'Premium packages include thank you cards and matching social media templates.',
        icon: '💌',
      },
    ],
    useCases: [
      { title: 'Digital Invitations', description: 'Send beautiful invites via email or messaging apps.' },
      { title: 'Printed Invitations', description: 'High-resolution files ready for professional printing.' },
      { title: 'Social Media', description: 'Share the news on Instagram and Facebook with matching graphics.' },
      { title: 'Thank You Cards', description: 'Send personalized thank you notes after the event.' },
    ],
    faqItems: [
      {
        question: 'Do I need to upload photos of myself?',
        answer: 'Upload 1–3 photos of the parents-to-be. The AI uses these to create personalized invitation designs.',
      },
      {
        question: 'Can I customize the text?',
        answer: 'The Popular package includes editable text, so you can add your event details, date, and custom message.',
      },
      {
        question: 'What themes are available?',
        answer: 'We offer woodland, boho, floral, minimalist, classic, tropical, and more. The number of themes depends on your package.',
      },
      {
        question: 'Can I use these for gender reveal too?',
        answer: 'Absolutely! The designs work for baby showers, gender reveals, and any baby celebration event.',
      },
    ],
    howItWorks: [
      { step: '1', title: 'Upload & Choose Theme', description: 'Upload 1–3 photos and select your preferred design theme and color scheme.' },
      { step: '2', title: 'AI Creates Your Designs', description: 'Our AI generates personalized invitation designs with your chosen aesthetic.' },
      { step: '3', title: 'Download & Send', description: 'Get print-ready and digital-ready invitation files. Send via email, print, or share on social media.' },
    ],
  },

  graduation: {
    benefitsHeadline: 'Celebrate Your Achievement',
    benefits: [
      {
        title: 'Cap & Gown Added for You',
        description: 'AI adds a cap and gown for you. Popular adds multiple gown colors, and Premium adds custom school colors.',
        icon: '🎓',
      },
      {
        title: 'Multiple Settings',
        description: 'Campus, library, outdoor — get variety without visiting multiple locations.',
        icon: '🏛️',
      },
      {
        title: 'Announcement Ready',
        description: 'Premium packages include graduation announcement and thank you card templates.',
        icon: '📨',
      },
      {
        title: 'No Studio Appointment',
        description: 'Start from $19.90 for 10 photos, with no studio appointment.',
        icon: '💰',
      },
    ],
    useCases: [
      { title: 'Graduation Announcements', description: 'Beautiful announcements to share with family and friends.' },
      { title: 'Social Media', description: 'Share your achievement on Instagram, Facebook, and LinkedIn.' },
      { title: 'Family Display', description: 'Framed portraits for proud parents and grandparents.' },
      { title: 'Yearbook', description: 'A polished portrait for your graduating class.' },
      { title: 'LinkedIn Profile', description: 'Update your professional profile with your new credentials.' },
    ],
    faqItems: [
      {
        question: 'Will the cap and gown match my school?',
        answer: 'Premium includes custom school colors. Popular includes multiple gown colors. See the package list above for what each tier offers.',
      },
      {
        question: 'Can I choose different backgrounds?',
        answer: 'Yes! Choose from campus, library, garden, studio, and more. Higher-tier packages offer more setting options.',
      },
      {
        question: 'Do I need to wear a cap and gown in my uploaded photos?',
        answer: 'No! Just upload clear photos of yourself. The AI handles adding the cap, gown, and academic setting.',
      },
      {
        question: 'Are announcement templates included?',
        answer: 'Popular and Premium packages include graduation announcement templates and social media graphics.',
      },
    ],
    howItWorks: [
      { step: '1', title: 'Upload Your Photos', description: 'Upload 4–8 clear photos of yourself. No cap and gown needed — the AI adds them.' },
      { step: '2', title: 'AI Creates Your Portraits', description: 'Our AI generates professional graduation portraits with academic regalia and beautiful settings.' },
      { step: '3', title: 'Download & Celebrate', description: 'Get your graduation photos, announcements, and social media graphics. Share the milestone!' },
    ],
  },

  'holiday-cards': {
    benefitsHeadline: 'Spread Joy with Custom Cards',
    benefits: [
      {
        title: 'Many Celebrations',
        description: 'Christmas, Eid, Bayram, New Year, Thanksgiving and more.',
        icon: '🎄',
      },
      {
        title: 'Personalized with Your Photos',
        description: 'Feature your family, pets, or just yourself in beautiful holiday settings.',
        icon: '📷',
      },
      {
        title: 'Digital & Print Ready',
        description: 'Send digitally or print at home. High-resolution files work both ways.',
        icon: '🖨️',
      },
      {
        title: 'Custom Greetings',
        description: 'Add your own message, family name, and year to each design.',
        icon: '✍️',
      },
    ],
    useCases: [
      { title: 'Christmas Cards', description: 'Festive family cards for the holiday season.' },
      { title: 'Eid & Bayram', description: 'Elegant cards for religious celebrations.' },
      { title: 'New Year', description: 'Celebrate the new year with a personalized greeting.' },
      { title: 'Thanksgiving', description: 'Share gratitude with a custom family card.' },
      { title: 'Social Media', description: 'Holiday-themed posts for Instagram and Facebook.' },
    ],
    faqItems: [
      {
        question: 'What holidays do you support?',
        answer: 'We offer designs for Christmas, Eid/Bayram, New Year, Thanksgiving and more. Express and Basic include a limited number of themes; Popular and Premium include all of them.',
      },
      {
        question: 'Can I include my pets in the card?',
        answer: 'Yes! Upload photos of family members and pets together or separately, and the AI will create a unified holiday scene.',
      },
      {
        question: 'Are animated versions available?',
        answer: 'Premium packages include animated card versions suitable for email and social media sharing.',
      },
      {
        question: 'Can I add my own greeting text?',
        answer: 'Popular and Premium packages include custom greetings. You can add your family name, personal message, and year.',
      },
    ],
    howItWorks: [
      { step: '1', title: 'Upload Photos & Pick Holiday', description: 'Upload 1–5 family or individual photos and select your holiday theme.' },
      { step: '2', title: 'AI Creates Your Cards', description: 'Our AI generates personalized holiday card designs with festive elements and your photos.' },
      { step: '3', title: 'Send & Share', description: 'Download your cards for printing, emailing, or sharing on social media.' },
    ],
  },

  'family-portraits': {
    benefitsHeadline: 'Beautiful Family Memories',
    benefits: [
      {
        title: 'No Studio Visit Needed',
        description: 'Skip the scheduling, outfits coordination, and cranky kids at the studio.',
        icon: '🏡',
      },
      {
        title: 'Artistic Styles',
        description: 'Classic, modern, watercolor, seasonal — explore styles a photographer cannot offer.',
        icon: '🎨',
      },
      {
        title: 'Everyone Looks Great',
        description: 'No more retakes because someone blinked. AI ensures everyone is at their best.',
        icon: '😊',
      },
      {
        title: 'Wall Art Quality',
        description: 'High-resolution output perfect for canvas prints, framed photos, and photo books.',
        icon: '🖼️',
      },
    ],
    useCases: [
      { title: 'Living Room Wall Art', description: 'A beautiful family portrait as the centerpiece of your home.' },
      { title: 'Holiday Cards', description: 'Use your family portrait for seasonal greeting cards.' },
      { title: 'Grandparent Gifts', description: 'A framed family portrait makes the perfect gift.' },
      { title: 'Photo Books', description: 'Create stunning photo books with varied artistic styles.' },
      { title: 'Social Media', description: 'Share a polished family photo for profile pictures and posts.' },
    ],
    faqItems: [
      {
        question: 'Can all family members be in one portrait?',
        answer: 'Yes! Upload individual and group photos. The AI can compose unified family portraits with everyone together.',
      },
      {
        question: 'What if family members are in different locations?',
        answer: 'No problem. Upload photos of each family member separately, and the AI will bring everyone together in a single portrait.',
      },
      {
        question: 'Can I include pets in the family portrait?',
        answer: 'Absolutely! Include photos of your pets and they will be part of the family portrait.',
      },
      {
        question: 'What sizes are available for printing?',
        answer: 'All outputs are high-resolution. Premium packages include 4K resolution and wall art sizes optimized for large prints.',
      },
    ],
    howItWorks: [
      { step: '1', title: 'Upload Family Photos', description: 'Upload 5–10 photos of family members — individual and group shots with clear faces.' },
      { step: '2', title: 'Choose Your Style', description: 'Select from classic, modern, artistic, seasonal, and more portrait styles.' },
      { step: '3', title: 'Get Your Portraits', description: 'Download beautiful family portraits ready for printing, framing, or sharing.' },
    ],
  },

  'couple-engagement': {
    benefitsHeadline: 'Capture Your Love Story',
    benefits: [
      {
        title: 'Romantic Settings',
        description: 'Sunset beaches, Parisian streets, garden scenes — without the travel.',
        icon: '🌹',
      },
      {
        title: 'Save-the-Date Ready',
        description: 'Popular packages include save-the-date templates to announce your big day.',
        icon: '💌',
      },
      {
        title: 'Natural & Intimate',
        description: 'Candid-looking photos that capture genuine emotion and connection.',
        icon: '💑',
      },
      {
        title: 'No Session to Schedule',
        description: 'Start from $19.90 for 10 photos, with no session to schedule.',
        icon: '💍',
      },
    ],
    useCases: [
      { title: 'Save-the-Date Cards', description: 'Beautiful couple photos for your wedding announcement.' },
      { title: 'Engagement Announcement', description: 'Share the news with a stunning couple photo.' },
      { title: 'Wedding Website', description: 'Professional photos for your wedding website and registry.' },
      { title: 'Social Media', description: 'Update your profiles with a beautiful couple photo.' },
      { title: 'Photo Albums', description: 'Create a romantic photo album with varied settings.' },
    ],
    faqItems: [
      {
        question: 'Do both partners need to be in the uploaded photos?',
        answer: 'Upload photos of the couple together and individually. Include 5–10 photos total for best results.',
      },
      {
        question: 'Can I choose romantic settings?',
        answer: 'Yes! Choose from beach, garden, city, sunset, indoor, and more. Higher-tier packages offer more setting variety.',
      },
      {
        question: 'Are save-the-date templates included?',
        answer: 'Popular and Premium packages include save-the-date templates. Premium also includes engagement announcements and social media graphics.',
      },
      {
        question: 'Will the photos look natural as a couple?',
        answer: 'Our AI specializes in creating natural, intimate-looking couple photos with genuine warmth and connection.',
      },
    ],
    howItWorks: [
      { step: '1', title: 'Upload Couple Photos', description: 'Upload 5–10 photos of the couple — together and individually. Natural, relaxed poses work best.' },
      { step: '2', title: 'AI Creates Your Photos', description: 'Our AI generates romantic couple photos in beautiful settings with warm, natural lighting.' },
      { step: '3', title: 'Download & Share', description: 'Get your couple photos, save-the-date templates, and engagement announcements. Share the love!' },
    ],
  },

  'real-estate': {
    benefitsHeadline: 'Sell Properties Faster',
    benefits: [
      {
        title: 'Instant Staging',
        description: 'Transform empty rooms into furnished spaces in minutes, not days.',
        icon: '⚡',
      },
      {
        title: 'Multiple Furniture Styles',
        description: 'Modern, traditional, Scandinavian, industrial — match any buyer persona.',
        icon: '🛋️',
      },
      {
        title: 'High-Resolution Output',
        description: 'High-resolution output for listing sites. Check your local MLS rules, and disclose virtual staging.',
        icon: '📋',
      },
      {
        title: 'Virtual Staging From $19.90',
        description: 'Stage listing photos without renting furniture or scheduling movers. Packages start at $19.90 for 10 photos.',
        icon: '💰',
      },
    ],
    useCases: [
      { title: 'MLS Listings', description: 'Make empty properties look move-in ready for listings.' },
      { title: 'Open Houses', description: 'Show buyers the potential of each room.' },
      { title: 'Marketing Materials', description: 'Brochures, flyers, and social media with staged photos.' },
      { title: 'New Construction', description: 'Visualize finished interiors before construction is complete.' },
      { title: 'Renovation Previews', description: 'Show clients what a renovated space could look like.' },
    ],
    faqItems: [
      {
        question: 'Will the staging look realistic?',
        answer: 'Yes. Our AI generates photorealistic furniture and decor that blends naturally with the existing room structure and lighting.',
      },
      {
        question: 'What room types can be staged?',
        answer: 'All room types: living rooms, bedrooms, kitchens, dining rooms, bathrooms, home offices, and more.',
      },
      {
        question: 'Can I choose the furniture style?',
        answer: 'Yes! Select from modern, traditional, Scandinavian, industrial, coastal, and more. Higher-tier packages offer more style options.',
      },
      {
        question: 'Do I need professional photos of the empty rooms?',
        answer: 'Clear, well-lit photos work best. Use a wide-angle lens if possible and show the full room from corner to corner.',
      },
      {
        question: 'Is virtual staging allowed on MLS?',
        answer: 'Yes, most MLS platforms allow virtual staging. Premium packages include MLS-ready formatting. Always disclose that images are virtually staged in your listing.',
      },
    ],
    howItWorks: [
      { step: '1', title: 'Upload Empty Room Photos', description: 'Upload 3–10 photos of empty rooms. Wide-angle shots with good lighting work best.' },
      { step: '2', title: 'Choose Furniture Styles', description: 'Select your preferred interior design style for each room — modern, traditional, Scandinavian, and more.' },
      { step: '3', title: 'Download Staged Photos', description: 'Get photorealistic staged photos ready for MLS listings, marketing materials, and open houses.' },
    ],
  },

  'ecommerce-product': {
    benefitsHeadline: 'Product Photos That Sell',
    benefits: [
      {
        title: 'Clean White Backgrounds',
        description: 'Amazon, Shopify, and marketplace-compliant product photos with pure white backgrounds.',
        icon: '🏪',
      },
      {
        title: 'Lifestyle Scenes',
        description: 'Show your product in context — on a table, in a kitchen, being used by a person.',
        icon: '🌿',
      },
      {
        title: 'Marketplace Optimized',
        description: 'Formatted for Amazon, Shopify, Etsy, and all major e-commerce platforms.',
        icon: '📱',
      },
      {
        title: 'No Studio Needed',
        description: 'Skip the studio and the shipping. Packages start at $19.90 for 10 photos.',
        icon: '💡',
      },
    ],
    useCases: [
      { title: 'Amazon Listings', description: 'White background and lifestyle photos that meet Amazon requirements.' },
      { title: 'Shopify Store', description: 'Beautiful product galleries for your online store.' },
      { title: 'Social Media Ads', description: 'Eye-catching product photos for Instagram and Facebook ads.' },
      { title: 'Catalog', description: 'Consistent product photography across your entire inventory.' },
      { title: 'A+ Content', description: 'Premium infographic layouts for enhanced product listings.' },
    ],
    faqItems: [
      {
        question: 'What products can I photograph?',
        answer: 'Any physical product: clothing, electronics, food, beauty products, furniture, accessories, and more. Upload clear photos from multiple angles.',
      },
      {
        question: 'Will the white backgrounds be pure white?',
        answer: 'Yes. Our AI generates clean, pure white backgrounds that meet Amazon and other marketplace requirements.',
      },
      {
        question: 'Can I get lifestyle photos too?',
        answer: 'Absolutely. All packages include lifestyle scene options alongside clean background shots.',
      },
      {
        question: 'What formats are included?',
        answer: 'All photos are high-resolution. Premium packages include Amazon-optimized, Shopify-ready, and social media ad sizes.',
      },
    ],
    howItWorks: [
      { step: '1', title: 'Upload Product Photos', description: 'Upload 3–8 photos of your product from different angles. Use clear, well-lit shots.' },
      { step: '2', title: 'AI Creates Product Shots', description: 'Our AI generates clean white background photos, lifestyle scenes, and marketing-ready shots.' },
      { step: '3', title: 'Download & List', description: 'Get marketplace-optimized product photos ready for Amazon, Shopify, social media ads, and more.' },
    ],
  },

  avatars: {
    benefitsHeadline: 'Your Face, Every Universe',
    benefits: [
      {
        title: 'Up to 15 Style Categories',
        description: 'Fantasy, anime, cyberpunk, Renaissance, superhero and more, depending on your package.',
        icon: '🌌',
      },
      {
        title: 'Built From Your Face',
        description: 'Not a generic avatar. Your selfies guide every style, so the result is recognizably you.',
        icon: '🪞',
      },
      {
        title: 'Social Media Ready',
        description: 'Optimized sizes for profile pictures, Discord, gaming profiles, and more.',
        icon: '📱',
      },
      {
        title: 'Fun & Shareable',
        description: 'Create avatars that friends and followers will love and share.',
        icon: '🎉',
      },
    ],
    useCases: [
      { title: 'Profile Pictures', description: 'Unique avatars for social media, Discord, and gaming platforms.' },
      { title: 'Messaging Apps', description: 'Custom stickers and profile photos for WhatsApp, Telegram, and more.' },
      { title: 'Gaming Profiles', description: 'A custom avatar for your gamer tag and streaming channels.' },
      { title: 'Gift', description: 'Surprise someone with avatars of themselves in fun styles.' },
      { title: 'Content Creation', description: 'Unique character designs for YouTube, Twitch, and social media.' },
    ],
    faqItems: [
      {
        question: 'How many selfies do I need?',
        answer: 'Upload 10–20 clear selfies from different angles. Include front-facing and slight turns. No sunglasses or heavy filters.',
      },
      {
        question: 'Will the avatars look like me?',
        answer: 'The AI is trained on your selfies to keep your likeness across styles. Results vary by style and by the quality of your uploads.',
      },
      {
        question: 'What styles are available?',
        answer: 'Fantasy warrior, anime hero, cyberpunk, Renaissance, superhero, cartoon, pixel art, watercolor, and many more.',
      },
      {
        question: 'Can I use these as profile pictures?',
        answer: 'Absolutely. All avatars are optimized for profile pictures on social media, gaming platforms, Discord, and more.',
      },
    ],
    howItWorks: [
      { step: '1', title: 'Upload Your Selfies', description: 'Upload 10–20 clear selfies from different angles. Front-facing plus slight turns work best.' },
      { step: '2', title: 'AI Creates Your Avatars', description: 'Our AI transforms your selfies into stunning avatars across fantasy, anime, cyberpunk, Renaissance, and more styles.' },
      { step: '3', title: 'Download & Use', description: 'Get your unique avatars optimized for profile pictures, social media, Discord, and gaming platforms.' },
    ],
  },
};

/**
 * Get category content by category ID.
 */
export function getCategoryContent(categoryId: CategoryId): CategoryContent {
  return CATEGORY_CONTENT[categoryId];
}
