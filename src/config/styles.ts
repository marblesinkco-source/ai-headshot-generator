/**
 * TailorPic — Photo style landing page configuration
 * Powers the programmatic SEO pages at /styles and /styles/[slug].
 */

export interface PhotoStyle {
  slug: string;
  name: string;
  title: string;
  description: string;
  metaDescription: string;
  heroText: string;
  features: string[];
  idealFor: string[];
  tips: string[];
  relatedCategories: string[]; // slugs from categories config
  relatedBlogPosts: string[]; // blog post slugs
}

export const photoStyles: PhotoStyle[] = [
  {
    slug: 'corporate',
    name: 'Corporate Headshots',
    title: 'AI Corporate Headshots',
    description:
      'Formal business portraits for company websites, annual reports and leadership pages, created from a few selfies.',
    metaDescription:
      'Create formal AI corporate headshots for company websites, annual reports and leadership pages. Consistent, polished and ready in minutes with TailorPic.',
    heroText:
      'Clean, confident and consistent. Corporate headshots give your company website, annual report and press kit the formal presence your brand deserves, without scheduling a photographer.',
    features: [
      'Classic business attire such as tailored suits, blazers and crisp collars',
      'Neutral studio backdrops in grey, navy and soft white',
      'Even, flattering lighting with no harsh shadows',
      'Consistent framing and crop across every team member',
      'High resolution files suited to print and web',
      'Natural, approachable expressions that still read as formal',
    ],
    idealFor: [
      'Company websites and About Us pages',
      'Annual reports and investor materials',
      'Executives and board members',
      'HR teams onboarding new employees',
      'Law, finance and consulting firms',
    ],
    tips: [
      'Upload selfies in good daylight with a plain background',
      'Include a mix of straight-on and slight three-quarter angles',
      'Choose attire colors that match your brand palette',
      'Generate the whole team with the same settings for a uniform look',
      'Pick a neutral background so photos stay timeless as branding changes',
    ],
    relatedCategories: ['headshots', 'team-headshots'],
    relatedBlogPosts: [
      'corporate-team-photos-guide',
      'executive-headshot-guide',
      'headshot-background-guide',
    ],
  },
  {
    slug: 'natural-light',
    name: 'Natural Light Portraits',
    title: 'AI Natural Light Portraits',
    description:
      'Soft, warm portraits with a natural lighting aesthetic that feels authentic, relaxed and flattering.',
    metaDescription:
      'Get AI natural light portraits with soft, warm window-light looks. Authentic, flattering photos for profiles, personal brands and more with TailorPic.',
    heroText:
      'Nothing flatters like good daylight. Natural light portraits bring the soft glow of a window or golden hour to your photos, so you look warm, real and at ease.',
    features: [
      'Soft window-light and open-shade lighting looks',
      'Warm golden-hour tones that flatter every skin tone',
      'Gentle shadows that add depth without feeling harsh',
      'Shallow depth of field with softly blurred backgrounds',
      'Authentic, unposed expressions',
      'Airy, bright color grading that feels fresh and inviting',
    ],
    idealFor: [
      'Personal brands and solopreneurs',
      'Coaches, therapists and wellness professionals',
      'Creators and lifestyle influencers',
      'Dating and social profiles',
      'Anyone who dislikes stiff, over-lit studio photos',
    ],
    tips: [
      'Use selfies taken near a window for the most accurate likeness',
      'Avoid heavy filters in your source photos',
      'Add a smiling and a relaxed neutral expression to your uploads',
      'Choose lighter clothing in earthy or pastel tones to match the glow',
      'Pick two or three favorites and keep them consistent across profiles',
    ],
    relatedCategories: ['headshots', 'dating-photos', 'family-portraits'],
    relatedBlogPosts: [
      'dating-profile-photo-tips',
      'best-photos-for-linkedin',
      'headshot-trends-2025',
    ],
  },
  {
    slug: 'creative',
    name: 'Creative Headshots',
    title: 'AI Creative Headshots',
    description:
      'Artistic, modern headshots with bold backgrounds and expressive poses that help you stand out.',
    metaDescription:
      'Stand out with AI creative headshots featuring bold colors, modern backgrounds and expressive poses. Made for designers, artists and creators with TailorPic.',
    heroText:
      'Your work is original, so your photo should be too. Creative headshots use bold color, modern backdrops and confident poses to show personality at a glance.',
    features: [
      'Bold, saturated and gradient backgrounds',
      'Expressive poses and dynamic angles',
      'Modern editorial color grading',
      'Textured walls, studio sets and architectural settings',
      'Stylish wardrobe ranging from streetwear to statement pieces',
      'Portfolio-ready images that support a distinctive brand',
    ],
    idealFor: [
      'Designers, photographers and illustrators',
      'Musicians, actors and performers',
      'Marketing and creative agency teams',
      'Authors, speakers and podcast hosts',
      'Portfolio websites and speaker pages',
    ],
    tips: [
      'Upload varied expressions so the AI can capture your personality',
      'Pick one bold background color and repeat it across your brand',
      'Wear solid colors that contrast with your chosen backdrop',
      'Show a few different angles, including head tilts and profiles',
      'Pair a creative image with a classic one for different contexts',
    ],
    relatedCategories: ['headshots', 'couple-engagement-photos'],
    relatedBlogPosts: [
      'headshot-trends-2025',
      'headshot-background-guide',
      'professional-headshot-tips-2025',
    ],
  },
  {
    slug: 'startup-founder',
    name: 'Startup Founder Photos',
    title: 'AI Startup Founder Photos',
    description:
      'Approachable yet professional photos for tech and startup leaders who need credibility with investors, press and customers.',
    metaDescription:
      'AI startup founder photos that feel approachable and credible. Perfect for pitch decks, press, LinkedIn and team pages. Get yours with TailorPic.',
    heroText:
      'Investors want competence and customers want someone they can talk to. Startup founder photos strike that balance, smart but relaxed, ready for your deck, your press page and your next raise.',
    features: [
      'Smart-casual wardrobe such as open collars, knitwear and clean tees under blazers',
      'Modern office, loft and plain light backdrops',
      'Warm, confident expressions that build trust',
      'Crops tuned for pitch decks, press kits and social avatars',
      'Quick refreshes whenever your role or company changes',
      'Matching looks for co-founders and early team members',
    ],
    idealFor: [
      'Founders and co-founders preparing to fundraise',
      'CEOs and CTOs of early-stage companies',
      'Startup teams building a team page',
      'Product leaders speaking at events',
      'Indie hackers and solo builders',
    ],
    tips: [
      'Refresh your photo every six months or after key milestones',
      'Skip overly formal outfits that clash with startup culture',
      'Generate a square crop for social and a wider crop for press',
      'Use the same style for all co-founders for a unified look',
      'Include a genuine smile in your source photos for approachability',
    ],
    relatedCategories: ['headshots', 'team-headshots'],
    relatedBlogPosts: [
      'startup-founder-personal-branding-ai-photos',
      'startup-team-branding-photos',
      'best-headshot-for-linkedin-profile',
    ],
  },
  {
    slug: 'glamour',
    name: 'Glamour Portraits',
    title: 'AI Glamour Portraits',
    description:
      'Polished, editorial-style portraits with dramatic lighting and a refined, magazine-ready finish.',
    metaDescription:
      'Create AI glamour portraits with dramatic lighting and a polished editorial finish. Magazine-style photos for profiles, media and special occasions with TailorPic.',
    heroText:
      'Step into the spotlight. Glamour portraits combine dramatic lighting, refined styling and an editorial finish for images that look like they belong on a magazine page.',
    features: [
      'Dramatic key lighting with rich contrast',
      'Editorial composition inspired by fashion photography',
      'Smooth, polished skin retouching that keeps your natural look',
      'Elegant styling with statement wardrobe and accessories',
      'Deep, moody backdrops and cinematic color grading',
      'Confident poses with a high-end finish',
    ],
    idealFor: [
      'Models, actors and on-camera talent',
      'Speakers, authors and media personalities',
      'Beauty, fashion and luxury brand professionals',
      'Milestone birthdays and special occasions',
      'Anyone wanting a standout social profile image',
    ],
    tips: [
      'Upload clear, well-lit selfies with a variety of head angles',
      'Choose rich, solid outfit colors for the strongest contrast',
      'Keep makeup and hair in your uploads similar to how you want to look',
      'Use one bold hero image and keep supporting images simple',
      'Review outputs at full size to pick the most flattering lighting',
    ],
    relatedCategories: ['headshots', 'dating-photos', 'couple-engagement-photos'],
    relatedBlogPosts: [
      'headshot-trends-2025',
      'dating-profile-photo-tips',
      'professional-headshot-tips-2025',
    ],
  },
  {
    slug: 'outdoor',
    name: 'Outdoor Headshots',
    title: 'AI Outdoor Headshots',
    description:
      'Environmental portraits with nature and urban backgrounds that feel open, energetic and real.',
    metaDescription:
      'Get AI outdoor headshots with park, garden and city backgrounds. Fresh environmental portraits for profiles, brands and teams with TailorPic.',
    heroText:
      'Fresh air, real places. Outdoor headshots place you in parks, gardens and city streets, with natural depth and energy that studio backdrops cannot match.',
    features: [
      'Lush park, garden and woodland settings',
      'Urban backdrops including brick walls, rooftops and streets',
      'Natural sunlight with realistic depth of field',
      'Seasonal looks from spring blossom to autumn color',
      'Environmental portraits that say something about who you are',
      'Relaxed, confident posing suited to open spaces',
    ],
    idealFor: [
      'Real estate agents and local service providers',
      'Fitness trainers and outdoor professionals',
      'Travel, lifestyle and nature creators',
      'Authors and consultants with a personal brand',
      'Families and couples wanting relaxed portraits',
    ],
    tips: [
      'Match the setting to your profession or personality',
      'Wear colors that stand apart from green or grey backgrounds',
      'Upload selfies from both indoor and outdoor lighting',
      'Choose a softly blurred background so your face stays the focus',
      'Try one nature and one urban option to compare',
    ],
    relatedCategories: ['headshots', 'family-portraits', 'pet-portraits'],
    relatedBlogPosts: [
      'real-estate-agent-headshots',
      'headshot-background-guide',
      'remote-worker-headshot-guide',
    ],
  },
  {
    slug: 'old-money',
    name: 'Old Money',
    title: 'AI Old Money Headshots',
    description:
      'Timeless elegance inspired by classic wealth aesthetics — refined poses, rich tones and sophisticated backdrops that exude quiet luxury.',
    metaDescription:
      'Create old money style AI headshots with refined poses, rich tones and elegant backdrops. Timeless sophistication from a few selfies.',
    heroText:
      'Channel timeless sophistication with old money style portraits that combine refined poses, warm tones and classic backdrops for understated elegance.',
    features: [
      'Warm, muted color palettes in cream, camel, navy and forest green',
      'Classic styling such as tailored blazers, knitwear and crisp collars',
      'Refined, relaxed posing with an effortless, confident presence',
      'Elegant backgrounds including libraries, estates and wood-paneled rooms',
      'Soft, flattering lighting with a gentle, film-like glow',
      'Understated accessories that signal quiet luxury without logos',
    ],
    idealFor: [
      'Social media personal branding',
      'Dating profiles that stand out with quiet confidence',
      'Creative portfolios and editorial-style pages',
      'Lifestyle and fashion content creators',
    ],
    tips: [
      'Upload clear selfies in soft daylight for the most accurate likeness',
      'Choose neutral, well-fitted clothing in earthy or navy tones',
      'Keep accessories minimal and avoid visible logos for an authentic look',
      'Include a calm, slight smile rather than a wide grin in your uploads',
      'Pick a single backdrop style and repeat it across your profiles for consistency',
    ],
    relatedCategories: ['headshots', 'dating-photos', 'couple-engagement-photos'],
    relatedBlogPosts: ['what-to-wear-for-headshots', 'headshot-trends-2025'],
  },
  {
    slug: 'yearbook',
    name: 'Yearbook',
    title: 'AI Yearbook Photos',
    description:
      'Nostalgic yearbook-style portraits with that classic school photo look — clean backgrounds, centered framing and a warm, familiar feel.',
    metaDescription:
      'Create yearbook-style AI photos with classic school portrait aesthetics. Clean backgrounds and centered framing from a few selfies.',
    heroText:
      'Relive the charm of classic yearbook photos with AI-generated portraits featuring clean backgrounds, centered framing and warm, nostalgic styling.',
    features: [
      'Classic head-and-shoulders framing just like a school portrait',
      'Clean, solid backgrounds in soft blue, grey and mottled studio tones',
      'Vintage color grading with warm, slightly faded film tones',
      'Centered composition with even, symmetrical alignment',
      'Period-inspired hairstyles and wardrobe for an authentic retro feel',
      'Friendly, natural smiles that capture the nostalgic mood',
    ],
    idealFor: [
      'Social media nostalgia posts and throwback trends',
      'Fun personal portraits to share with friends',
      'Themed events, reunions and costume parties',
      'Gift ideas for friends and family',
    ],
    tips: [
      'Upload front-facing selfies with your full face clearly visible',
      'Include a genuine smile to match the classic yearbook expression',
      'Use even lighting and avoid strong shadows across your face',
      'Try a few different looks to compare eras and color gradings',
      'Generate a group of friends with the same settings for a matching set',
    ],
    relatedCategories: ['headshots', 'graduation-photos'],
    relatedBlogPosts: ['headshot-trends-2025', 'social-media-profile-photo-sizes'],
  },
  {
    slug: 'minimalist',
    name: 'Minimalist Headshots',
    title: 'AI Minimalist Headshots',
    description:
      'Clean, simple portraits with minimal distractions, so your face and personality take center stage.',
    metaDescription:
      'Create AI minimalist headshots with clean backgrounds, simple styling and soft lighting. Modern, distraction-free portraits from a few selfies with TailorPic.',
    heroText:
      'Less noise, more you. Minimalist headshots use plain backdrops, simple wardrobe and calm lighting to deliver a modern, focused portrait that fits any profile or team page.',
    features: [
      'Plain, uncluttered backgrounds in white, soft grey and muted neutrals',
      'Simple, solid-color wardrobe with clean lines and no busy patterns',
      'Soft, even lighting that keeps attention on your face',
      'Generous negative space and balanced, centered framing',
      'Subtle, natural retouching that preserves your real look',
      'Consistent results that scale across a whole team',
    ],
    idealFor: [
      'Tech professionals and engineers',
      'Designers and creative directors',
      'Startup teams building a unified team page',
      'Portfolio sites and personal landing pages',
      'Anyone who prefers a modern, understated look',
    ],
    tips: [
      'Upload selfies against a plain wall in soft, even daylight',
      'Choose solid, neutral clothing without logos or bold patterns',
      'Pick one background tone and use it for every team member',
      'Include a relaxed, natural expression rather than a posed grin',
      'Keep accessories minimal so the portrait stays clean',
    ],
    relatedCategories: ['headshots', 'team-headshots'],
    relatedBlogPosts: ['professional-headshot-tips-2025', 'headshot-background-guide'],
  },
  {
    slug: 'vintage',
    name: 'Vintage Headshots',
    title: 'AI Vintage Style Headshots',
    description:
      'Classic, timeless portraits with warm tones and a film-like quality inspired by photography of past decades.',
    metaDescription:
      'Get AI vintage style headshots with warm tones, soft film grain and classic studio looks. Timeless portraits for creatives and professionals with TailorPic.',
    heroText:
      'Some looks never go out of style. Vintage headshots pair warm tones, gentle film grain and classic studio lighting for portraits with character and a timeless feel.',
    features: [
      'Warm, sepia-leaning color grading with a nostalgic glow',
      'Soft film grain and gentle contrast that mimic analog photography',
      'Classic studio lighting inspired by mid-century portraiture',
      'Period-inspired wardrobe such as tweed, knitwear and structured collars',
      'Muted, textured backdrops in cream, brown and faded blue',
      'Black-and-white and color variations to choose from',
    ],
    idealFor: [
      'Actors and on-camera performers',
      'Musicians and bands needing press photos',
      'Authors and book jacket portraits',
      'Creative professionals with a distinctive brand',
      'Anyone drawn to a classic, nostalgic aesthetic',
    ],
    tips: [
      'Upload clear, front-facing selfies in soft natural light',
      'Try both color and black-and-white results to compare moods',
      'Choose textured clothing like knits or tweed to suit the era',
      'Keep your source photos free of heavy filters',
      'Pair a vintage image with a modern one for different contexts',
    ],
    relatedCategories: ['headshots', 'graduation-photos'],
    relatedBlogPosts: ['ai-headshots-vs-traditional-photography', 'headshot-trends-2025'],
  },
  {
    slug: 'executive',
    name: 'Executive Headshots',
    title: 'AI Executive Headshots',
    description:
      'Premium, authority-projecting portraits for C-suite and senior leadership, created from a few selfies.',
    metaDescription:
      'Create premium AI executive headshots for CEOs, board members and senior leaders. Polished, authoritative portraits ready in minutes with TailorPic.',
    heroText:
      'Leadership is visible before you say a word. Executive headshots project authority, calm and credibility, with premium lighting and refined styling for the people who steer the company.',
    features: [
      'Premium tailored suits, structured blazers and polished collars',
      'Refined studio backdrops in deep charcoal, navy and warm grey',
      'Sculpted, directional lighting that conveys presence and authority',
      'Composed, confident expressions with a steady gaze',
      'Crops tuned for annual reports, press kits and board pages',
      'Matching looks across the entire leadership team',
    ],
    idealFor: [
      'CEOs, CFOs and other C-suite leaders',
      'Board members and advisors',
      'Managing partners at law, finance and consulting firms',
      'VPs and senior directors',
      'Speakers and executives in media-facing roles',
    ],
    tips: [
      'Upload sharp selfies with a mix of straight-on and three-quarter angles',
      'Choose dark, well-fitted attire in navy, charcoal or black',
      'Keep expressions composed, with a slight smile for approachability',
      'Generate the whole leadership team with the same settings for consistency',
      'Select a neutral backdrop so the portrait stays current for years',
    ],
    relatedCategories: ['headshots', 'team-headshots'],
    relatedBlogPosts: ['executive-headshot-guide', 'corporate-team-photos-guide'],
  },
  {
    slug: 'casual',
    name: 'Casual Headshots',
    title: 'AI Casual Headshots',
    description:
      'Relaxed casual headshots perfect for creative industries, startups, and social media profiles.',
    metaDescription:
      'Create relaxed AI casual headshots for creative professionals, startups and social media. Approachable, authentic portraits ready in minutes with TailorPic.',
    heroText:
      'Not every photo needs a suit and tie. Casual headshots capture the real you with relaxed styling, natural expressions and laid-back settings that feel approachable and genuine, perfect for creative roles, startup culture and social profiles where personality matters more than formality.',
    features: [
      'Relaxed, everyday wardrobe including t-shirts, denim and casual layers',
      'Warm, inviting backgrounds such as cafes, coworking spaces and soft neutrals',
      'Natural, candid expressions that convey approachability and warmth',
      'Soft, flattering lighting with a lifestyle photography feel',
      'Versatile crops suited to social media avatars, bios and personal sites',
    ],
    idealFor: [
      'Creative professionals and freelancers',
      'Startup teams and tech workers',
      'Social media profiles and personal blogs',
      'Coaches, consultants and small business owners',
      'Anyone who wants an authentic, personality-forward portrait',
    ],
    tips: [
      'Upload selfies in natural light with a relaxed expression',
      'Wear comfortable clothing you would actually wear day to day',
      'Include a few smiling shots for a friendly, approachable vibe',
      'Try both neutral and lifestyle backgrounds to see what fits your brand',
      'Avoid overly formal attire so the casual feel stays consistent',
    ],
    relatedCategories: ['headshots', 'dating-photos'],
    relatedBlogPosts: [
      'headshot-trends-2025',
      'remote-worker-headshot-guide',
      'social-media-profile-photo-sizes',
    ],
  },
  {
    slug: 'high-contrast',
    name: 'High-Contrast Headshots',
    title: 'AI High-Contrast Headshots',
    description:
      'Dramatic high-contrast headshots with deep shadows, bold highlights and a striking, cinematic presence.',
    metaDescription:
      'Create AI high-contrast headshots with deep shadows, bold highlights and dramatic flair. Striking, cinematic portraits for professionals and creatives with TailorPic.',
    heroText:
      'Make a statement with light and shadow. High-contrast headshots use bold tonal separation, deep blacks and bright highlights to deliver portraits with unmistakable presence and an edge that demands attention.',
    features: [
      'Strong directional lighting with pronounced shadow play',
      'Deep blacks and crisp highlights for maximum tonal impact',
      'Cinematic, moody color grading in rich tones',
      'Minimalist dark backdrops that keep all focus on the subject',
      'Chiseled, sculpted look that enhances facial structure',
      'Black-and-white and color variants for different uses',
    ],
    idealFor: [
      'Actors, musicians and performing artists',
      'Photographers and visual creatives',
      'Authors and speakers wanting a bold book jacket or event photo',
      'Fitness professionals and athletes',
      'Anyone who wants a powerful, attention-grabbing portrait',
    ],
    tips: [
      'Upload sharp selfies with clear, even lighting so the AI has strong detail to work with',
      'Try both color and black-and-white outputs to see which suits your brand',
      'Choose dark, solid clothing to complement the dramatic shadows',
      'Avoid busy patterns or bright accessories that compete with the lighting',
      'Pair a high-contrast image with a softer one for versatility across platforms',
    ],
    relatedCategories: ['headshots', 'team-headshots'],
    relatedBlogPosts: [
      'headshot-trends-2025',
      'professional-headshot-tips-2025',
      'headshot-background-guide',
    ],
  },
];

export function getPhotoStyle(slug: string): PhotoStyle | undefined {
  return photoStyles.find((s) => s.slug === slug);
}

export function getAllPhotoStyles(): PhotoStyle[] {
  return photoStyles;
}
