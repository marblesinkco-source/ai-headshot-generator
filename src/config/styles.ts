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
  {
    slug: 'soft-focus',
    name: 'Soft Focus Portraits',
    title: 'AI Soft Focus Portraits',
    description:
      'Dreamy, gentle portraits with softly diffused light and a romantic, flattering glow.',
    metaDescription:
      'Create AI soft focus portraits with diffused light and a dreamy glow. Flattering, gentle photos for profiles and personal brands with TailorPic.',
    heroText:
      'Soft, luminous and kind to every face. Soft focus portraits use diffused light and gentle blur to create a dreamy, approachable look that feels warm and personal.',
    features: [
      'Diffused lighting that softens texture and shadows',
      'Gentle glow and highlights with a dreamy finish',
      'Pastel and muted color grading',
      'Shallow depth of field with smooth background blur',
      'Flattering, natural skin rendering',
      'Calm, relaxed expressions',
    ],
    idealFor: [
      'Coaches, therapists and wellness professionals',
      'Photographers, artists and creatives',
      'Wedding and lifestyle brands',
      'Personal brand profiles and blogs',
      'Anyone wanting a gentle, romantic portrait',
    ],
    tips: [
      'Upload selfies in soft, even daylight',
      'Choose light, neutral or pastel clothing',
      'Include a relaxed, natural smile',
      'Avoid heavy filters on your input photos',
      'Pick a simple background to keep the dreamy mood',
    ],
    relatedCategories: ['headshots', 'couple-engagement-photos'],
    relatedBlogPosts: ['professional-headshot-tips-2025', 'headshot-trends-2025'],
  },
  {
    slug: 'editorial',
    name: 'Editorial Headshots',
    title: 'AI Editorial Headshots',
    description:
      'Magazine-style portraits with bold composition, dramatic lighting and a confident, fashion-forward feel.',
    metaDescription:
      'Get AI editorial headshots with magazine-style composition and dramatic lighting. Bold, confident portraits for creatives and leaders with TailorPic.',
    heroText:
      'Look like the cover story. Editorial headshots borrow the composition, lighting and attitude of magazine photography to give your portrait real presence and personality.',
    features: [
      'Magazine-inspired framing and composition',
      'Directional, dramatic lighting with depth',
      'Confident, expressive poses',
      'Refined wardrobe with strong silhouettes',
      'Rich color grading with a polished finish',
      'Backgrounds that add mood without distraction',
    ],
    idealFor: [
      'Authors, speakers and thought leaders',
      'Creative directors and designers',
      'Founders and executives featured in press',
      'Models, actors and performers',
      'Personal brands wanting a standout image',
    ],
    tips: [
      'Upload selfies with varied angles and expressions',
      'Choose structured clothing with clean lines',
      'Pick a background tone that contrasts with your outfit',
      'Generate several variations and choose the boldest',
      'Keep a conservative backup for formal use',
    ],
    relatedCategories: ['headshots'],
    relatedBlogPosts: ['headshot-trends-2025', 'executive-headshot-guide'],
  },
  {
    slug: 'bold-color',
    name: 'Bold Color Pop Headshots',
    title: 'AI Bold Color Pop Headshots',
    description:
      'Vibrant portraits with saturated color backdrops that make you stand out in any feed.',
    metaDescription:
      'Create AI bold color pop headshots with vibrant backdrops and saturated tones. Eye-catching portraits that stand out online, made with TailorPic.',
    heroText:
      'Stand out at a glance. Bold color pop headshots pair clean lighting with vivid backdrops so your profile photo catches the eye and sticks in memory.',
    features: [
      'Saturated, solid-color backdrops',
      'Clean, bright lighting that keeps skin natural',
      'Wardrobe that complements or contrasts the backdrop',
      'Crisp detail with a modern, graphic feel',
      'Consistent color for team and brand use',
      'Confident, energetic expressions',
    ],
    idealFor: [
      'Creative professionals and marketers',
      'Social media creators and influencers',
      'Startups with a bold visual brand',
      'Event speakers and podcast hosts',
      'Team pages that want a lively look',
    ],
    tips: [
      'Choose a backdrop color that suits your brand palette',
      'Wear a neutral or complementary outfit',
      'Upload well-lit selfies without color filters',
      'Keep the same color across a whole team',
      'Test how the photo looks at small avatar sizes',
    ],
    relatedCategories: ['headshots', 'team-headshots'],
    relatedBlogPosts: ['headshot-trends-2025', 'headshot-background-guide'],
  },
  {
    slug: 'monochrome',
    name: 'Monochrome Black & White Headshots',
    title: 'AI Monochrome Black and White Headshots',
    description:
      'Timeless black and white portraits with rich tone, contrast and classic character.',
    metaDescription:
      'Create AI monochrome black and white headshots with rich contrast and classic tone. Timeless, elegant portraits for any profile with TailorPic.',
    heroText:
      'Timeless by design. Monochrome headshots remove color to focus on expression, tone and texture, for a classic portrait that never goes out of style.',
    features: [
      'Rich black and white tonal range',
      'Strong contrast with smooth gradations',
      'Classic studio lighting for depth and shape',
      'Focus on expression and character',
      'Works across light and dark backgrounds',
      'Elegant, cohesive look across platforms',
    ],
    idealFor: [
      'Actors, musicians and artists',
      'Authors and public speakers',
      'Lawyers, consultants and executives',
      'Portfolio and press kit photos',
      'Anyone wanting a classic, timeless look',
    ],
    tips: [
      'Upload selfies with clear, directional light',
      'Wear solid garments with good tonal contrast',
      'Choose a background that separates from your hair and clothes',
      'Keep a color version for places that need it',
      'Use consistent black and white across profiles',
    ],
    relatedCategories: ['headshots'],
    relatedBlogPosts: ['headshot-trends-2025', 'professional-headshot-tips-2025'],
  },
  {
    slug: 'cinematic',
    name: 'Cinematic Portrait Headshots',
    title: 'AI Cinematic Portrait Headshots',
    description:
      'Dramatic, movie-like portraits with moody lighting and rich color grading.',
    metaDescription:
      'Create AI cinematic portrait headshots with dramatic, movie-style lighting and color grading. Memorable, high-impact photos for any profile with TailorPic.',
    heroText:
      'Look like the lead in your own story. Cinematic portraits use directional light, deep shadows and film-style color grading to give your headshot drama and presence.',
    features: [
      'Dramatic directional lighting with soft falloff',
      'Film-inspired color grading in teal, amber or muted tones',
      'Shallow depth of field with a softly blurred background',
      'Deep shadows that add mood and dimension',
      'Wide-screen friendly composition',
      'Strong, confident expressions',
    ],
    idealFor: [
      'Actors, directors and filmmakers',
      'Musicians, authors and podcast hosts',
      'Creative professionals and portfolios',
      'Speaker bios and event billing',
      'Anyone wanting a bold, memorable profile photo',
    ],
    tips: [
      'Upload selfies with clear side lighting so the AI learns your face shape',
      'Include a few serious and a few relaxed expressions',
      'Choose darker, solid clothing for a more dramatic result',
      'Keep a softer alternative for formal or corporate platforms',
      'Use one consistent grade across all your profiles',
    ],
    relatedCategories: ['headshots'],
    relatedBlogPosts: ['headshot-trends-2025', 'professional-headshot-tips-2025'],
  },
  {
    slug: 'studio-classic',
    name: 'Classic Studio Headshots',
    title: 'AI Classic Studio Headshots',
    description:
      'Traditional studio portraits with a seamless backdrop and polished, even lighting.',
    metaDescription:
      'Create AI classic studio headshots with a seamless backdrop and polished lighting. Traditional, professional portraits from a few selfies with TailorPic.',
    heroText:
      'The look that never dates. Classic studio headshots pair a clean seamless backdrop with balanced, professional lighting for a portrait that works everywhere.',
    features: [
      'Seamless paper-style backdrops in grey, white, black or colour',
      'Balanced key and fill lighting with gentle shadows',
      'Sharp focus on the eyes with natural skin texture',
      'Consistent framing from the shoulders up',
      'Timeless, conservative styling',
      'High resolution files for print and web',
    ],
    idealFor: [
      'Corporate and team pages',
      'Professional directories and licensing profiles',
      'Business cards and press kits',
      'Teachers, doctors and other service professionals',
      'Anyone who wants a safe, traditional portrait',
    ],
    tips: [
      'Upload well lit selfies against a plain wall',
      'Pick a backdrop color that flatters your skin and clothing',
      'Wear solid colors and avoid busy patterns',
      'Use the same backdrop for every team member',
      'Include both smiling and closed-mouth expressions',
    ],
    relatedCategories: ['headshots', 'team-headshots'],
    relatedBlogPosts: [
      'headshot-background-guide',
      'ai-headshots-vs-traditional-photography',
      'corporate-team-photos-guide',
    ],
  },
  {
    slug: 'warm-golden',
    name: 'Warm Golden Hour Headshots',
    title: 'AI Warm Golden Hour Headshots',
    description:
      'Soft, sun-kissed portraits that recreate golden hour warmth, wherever you are.',
    metaDescription:
      'Create AI warm golden hour headshots with glowing, sun-kissed light recreated indoors. Friendly, flattering portraits from a few selfies with TailorPic.',
    heroText:
      'All the glow, none of the waiting for sunset. Warm golden hour headshots recreate low, honeyed sunlight to give your skin a healthy glow and your photo an inviting feel.',
    features: [
      'Warm, low-angle light with a gentle rim glow',
      'Flattering, sun-kissed skin tones',
      'Soft, creamy background blur',
      'Indoor and studio settings styled to feel like late afternoon',
      'Friendly, relaxed expressions',
      'Consistent warm palette across every image',
    ],
    idealFor: [
      'Coaches, therapists and wellness professionals',
      'Real estate agents and realtors',
      'Lifestyle brands and creators',
      'Dating and social profiles',
      'Small business owners who want an approachable look',
    ],
    tips: [
      'Upload selfies in soft, natural window light',
      'Choose earthy or neutral clothing that complements warm tones',
      'Avoid heavy filters on your input photos',
      'Pair with a cooler studio style for formal uses',
      'Keep expressions relaxed and genuine',
    ],
    relatedCategories: ['headshots'],
    relatedBlogPosts: ['professional-headshot-tips-2025', 'headshot-trends-2025'],
  },
  {
    slug: 'headshot-close-up',
    name: 'Close-Up Headshots',
    title: 'AI Close-Up Headshots',
    description:
      'Tightly cropped, face-focused portraits that put your expression front and center.',
    metaDescription:
      'Create AI close-up headshots with a tight crop and sharp facial detail. Face-focused portraits that look great in small profile pictures with TailorPic.',
    heroText:
      'Small avatar, big impact. Close-up headshots use a tight crop so your face stays clear and recognizable even in the tiniest profile circle.',
    features: [
      'Tight crop from the top of the head to the collarbone',
      'Sharp detail in the eyes and natural skin texture',
      'Soft, shallow background that keeps focus on the face',
      'Even, flattering lighting',
      'Optimized for circular and square profile crops',
      'Expressive, engaging looks',
    ],
    idealFor: [
      'LinkedIn and social media avatars',
      'Email signatures and chat apps',
      'Speaker and author bylines',
      'Online directories with small thumbnails',
      'Video call and community profiles',
    ],
    tips: [
      'Upload clear, front-facing selfies with your whole face visible',
      'Skip hats and sunglasses so your features show',
      'Keep a natural smile that reaches your eyes',
      'Test the crop at thumbnail size before publishing',
      'Choose simple collars so clothing does not distract',
    ],
    relatedCategories: ['headshots'],
    relatedBlogPosts: ['professional-headshot-tips-2025', 'headshot-background-guide'],
  },
  {
    slug: 'environmental',
    name: 'Environmental Portrait Headshots',
    title: 'AI Environmental Portrait Headshots',
    description:
      'Portraits that place you in your workspace or element to tell a story about what you do.',
    metaDescription:
      'Create AI environmental portraits that show you in your workspace or element. Story-driven headshots for professionals and creators with TailorPic.',
    heroText:
      'Show what you do, not just who you are. Environmental portraits place you in a studio, office, workshop or clinic so the setting adds context to your face.',
    features: [
      'Workspace settings such as offices, studios, kitchens and workshops',
      'Subtle props and details that hint at your profession',
      'Background kept soft enough to keep focus on you',
      'Natural, candid-feeling poses',
      'Wider framing that includes the shoulders and upper body',
      'Lighting matched to the setting',
    ],
    idealFor: [
      'Founders and small business owners',
      'Chefs, makers, artists and tradespeople',
      'Doctors, architects and consultants',
      'About pages and magazine features',
      'Personal brands that rely on a story',
    ],
    tips: [
      'Decide on one setting that represents your work',
      'Keep props minimal so they do not compete with your face',
      'Wear clothing you would genuinely wear on the job',
      'Upload selfies with varied angles and expressions',
      'Pair with a close-up style for small avatars',
    ],
    relatedCategories: ['headshots'],
    relatedBlogPosts: ['headshot-trends-2025', 'professional-headshot-tips-2025'],
  },
  {
    slug: 'urban-street',
    name: 'Urban Street Headshots',
    title: 'AI Urban Street Headshots',
    description:
      'Street-photography style portraits with city backdrops and an authentic, modern edge.',
    metaDescription:
      'Create AI urban street headshots with city backdrops, natural light and a candid edge. Modern portraits for creatives and professionals with TailorPic.',
    heroText:
      'Bring the energy of the city to your profile. Urban street headshots pair a sharp, candid look with blurred skylines, brick walls and city light for a modern, confident feel.',
    features: [
      'City backdrops such as brick walls, skylines and quiet side streets',
      'Natural, directional daylight with authentic shadows',
      'Shallow depth of field that keeps focus on you',
      'Candid, in-the-moment expressions and poses',
      'Modern, slightly editorial color palette',
      'Framing that works for both vertical and square crops',
    ],
    idealFor: [
      'Creatives, designers and photographers',
      'Musicians, influencers and content creators',
      'Tech and startup professionals',
      'Social media and dating profiles',
      'Personal brands with a modern voice',
    ],
    tips: [
      'Upload selfies with varied angles and natural expressions',
      'Wear layers such as jackets or denim for texture',
      'Choose solid colors that stand out against city tones',
      'Avoid busy patterns that compete with the backdrop',
      'Pair with a corporate style for more formal uses',
    ],
    relatedCategories: ['headshots', 'dating'],
    relatedBlogPosts: ['headshot-trends-2025', 'headshot-poses-guide'],
  },
  {
    slug: 'professional-linkedin',
    name: 'Professional LinkedIn Headshots',
    title: 'AI Professional LinkedIn Headshots',
    description:
      'Headshots tuned for LinkedIn: friendly, credible and clear at every profile size.',
    metaDescription:
      'Create AI professional LinkedIn headshots optimized for profile crops and small thumbnails. Credible, approachable photos from a few selfies with TailorPic.',
    heroText:
      'Your LinkedIn photo is your first impression. This style is built around how the platform displays your picture, with a clear face, trustworthy expression and clean background.',
    features: [
      'Framing optimized for LinkedIn circular profile crops',
      'Clean, neutral or softly blurred backgrounds',
      'Approachable expression that signals credibility',
      'Even, flattering lighting with natural skin tones',
      'Professional attire suited to your industry',
      'Sharp detail that holds up as a small thumbnail',
    ],
    idealFor: [
      'Job seekers and career changers',
      'Sales, recruiting and business development professionals',
      'Consultants, freelancers and founders',
      'Anyone refreshing an outdated profile photo',
      'Thought leaders and LinkedIn creators',
    ],
    tips: [
      'Choose a photo where your face fills about 60 percent of the frame',
      'Use a genuine smile that reaches your eyes',
      'Pick a background color that contrasts with your clothing',
      'Test the crop at thumbnail size before publishing',
      'Update your photo every one to two years',
    ],
    relatedCategories: ['headshots', 'team-headshots'],
    relatedBlogPosts: ['linkedin-headshot-optimization', 'best-headshot-for-linkedin-profile'],
  },
  {
    slug: 'warm-portrait',
    name: 'Warm Portrait Headshots',
    title: 'AI Warm Portrait Headshots',
    description:
      'Friendly, golden-toned portraits that feel welcoming, genuine and approachable.',
    metaDescription:
      'Create AI warm portrait headshots with golden tones and soft light. Friendly, approachable photos for coaches, creators and professionals with TailorPic.',
    heroText:
      'Look as warm as you are. Warm portrait headshots use soft, golden-toned light and relaxed expressions to make a great first impression that feels human.',
    features: [
      'Warm color palette with gentle golden highlights',
      'Soft, diffused light that flatters skin',
      'Relaxed, genuine smiles and open body language',
      'Creamy, softly blurred backgrounds',
      'Cozy, inviting environments and neutral tones',
      'Consistent warmth across every image',
    ],
    idealFor: [
      'Coaches, therapists and wellness professionals',
      'Teachers, nonprofit and community leaders',
      'Real estate agents and client-facing roles',
      'Small business owners and creators',
      'Dating and social profiles',
    ],
    tips: [
      'Upload selfies taken in soft window light',
      'Wear earthy or muted colors that complement warm tones',
      'Skip heavy filters on your input photos',
      'Keep expressions natural rather than posed',
      'Choose a cooler style for formal corporate needs',
    ],
    relatedCategories: ['headshots', 'dating'],
    relatedBlogPosts: ['professional-headshot-tips-2025', 'dating-profile-photo-tips'],
  },
  {
    slug: 'dark-moody',
    name: 'Dark and Moody Headshots',
    title: 'AI Dark and Moody Headshots',
    description:
      'Dramatic, low-key portraits with deep shadows and dark backgrounds.',
    metaDescription:
      'Create AI dark and moody headshots with dramatic low-key lighting and deep backgrounds. Bold, high-impact portraits from a few selfies with TailorPic.',
    heroText:
      'Step out of the light. Dark and moody headshots use low-key lighting, deep shadows and rich dark backdrops to create a striking, confident portrait.',
    features: [
      'Low-key lighting with deep, controlled shadows',
      'Dark charcoal, black or deep-toned backgrounds',
      'Dramatic contrast that sculpts the face',
      'Subtle rim light to separate you from the background',
      'Rich, desaturated color grading',
      'Serious, confident expressions',
    ],
    idealFor: [
      'Authors, speakers and podcasters',
      'Musicians, actors and artists',
      'Executives who want a bold look',
      'Photographers and creative directors',
      'Personal brands with a distinct identity',
    ],
    tips: [
      'Wear dark or solid clothing for a cohesive look',
      'Upload selfies with clear, even lighting so features are captured',
      'Keep your expression calm and direct',
      'Avoid this style for roles that call for a bright, open feel',
      'Pair with a lighter style for everyday profiles',
    ],
    relatedCategories: ['headshots'],
    relatedBlogPosts: ['headshot-lighting-guide', 'headshot-trends-2025'],
  },
  {
    slug: 'business-casual',
    name: 'Business Casual Headshots',
    title: 'AI Business Casual Headshots',
    description:
      'Smart-casual portraits that balance professional polish with a relaxed, modern feel.',
    metaDescription:
      'Create AI business casual headshots that sit between corporate and casual. Polished yet approachable photos with smart-casual attire using TailorPic.',
    heroText:
      'Professional without the stiffness. Business casual headshots pair smart-casual attire with soft, natural light for a look that works in modern workplaces.',
    features: [
      'Smart-casual attire such as open collars, knitwear and blazers without ties',
      'Soft, natural-feeling lighting',
      'Light office, studio or blurred neutral backgrounds',
      'Relaxed but confident posture and smile',
      'Balanced color palette that feels current',
      'Versatile framing for web, email and social profiles',
    ],
    idealFor: [
      'Tech, marketing and creative industry employees',
      'Startup teams and remote workers',
      'Consultants and freelancers',
      'Company About pages with a modern culture',
      'Professionals who want to look approachable',
    ],
    tips: [
      'Choose well-fitted, wrinkle-free smart-casual clothing',
      'Stick to solid colors or subtle textures',
      'Match the formality to your industry and audience',
      'Keep accessories simple and minimal',
      'Use a consistent look across your whole team',
    ],
    relatedCategories: ['headshots', 'team-headshots'],
    relatedBlogPosts: ['what-to-wear-for-headshots', 'corporate-headshot-dress-code'],
  },
  {
    slug: 'neon-glow',
    name: 'Neon Glow Headshots',
    title: 'AI Neon Glow Headshots',
    description:
      'Modern portraits lit with vivid neon color accents for a bold, attention-grabbing look. Created from a few selfies, no studio required.',
    metaDescription:
      'Create AI neon glow headshots with vivid colored lighting and a modern, high-contrast look. Stand out on social media, music and creative profiles with TailorPic.',
    heroText:
      'Turn heads with portraits lit in electric pink, blue and violet. Neon glow headshots use colored rim light and deep, moody backgrounds to give your profile a modern, cinematic edge that stops the scroll and makes you instantly memorable.',
    features: [
      'Vivid neon rim lighting in pink, cyan, purple and blue',
      'Deep dark backgrounds that make colors pop',
      'High-contrast, cinematic color grading',
      'Sharp facial detail with natural skin tones preserved',
      'Crops tuned for avatars, banners and cover art',
      'Multiple color palettes to match your personal brand',
    ],
    idealFor: [
      'Musicians, DJs and performers',
      'Gamers, streamers and content creators',
      'Nightlife, events and entertainment brands',
      'Designers and creative directors',
      'Social media profiles that need to stand out',
    ],
    tips: [
      'Pick one or two neon colors that match your brand',
      'Wear dark, simple clothing so the light stays the focus',
      'Upload selfies with clear, even lighting for accurate features',
      'Keep a more neutral style for formal profiles such as LinkedIn',
    ],
    relatedCategories: ['headshots'],
    relatedBlogPosts: ['headshot-trends-2025', 'headshot-lighting-guide'],
  },
  {
    slug: 'film-noir',
    name: 'Film Noir Headshots',
    title: 'AI Film Noir Headshots',
    description:
      'Dramatic black-and-white portraits with deep shadows and classic cinema atmosphere. A timeless look made from a few selfies.',
    metaDescription:
      'Create AI film noir headshots in dramatic black and white with moody shadows and classic cinema style. Timeless portraits for creatives and leaders with TailorPic.',
    heroText:
      'Shadow, contrast and mystery. Film noir headshots borrow the lighting of classic cinema, with crisp black-and-white tones and sculpted shadows that give your portrait gravitas and a timeless, editorial feel.',
    features: [
      'Rich black-and-white tonality with deep contrast',
      'Directional, sculpted lighting with dramatic shadows',
      'Classic cinema framing and atmosphere',
      'Fine grain and texture for a film-like finish',
      'Timeless look that never feels dated',
      'Sharp detail in eyes and facial structure',
    ],
    idealFor: [
      'Actors, directors and filmmakers',
      'Authors, speakers and podcasters',
      'Photographers and visual artists',
      'Executives who want a bold, serious tone',
      'Personal brands built on mystery and authority',
    ],
    tips: [
      'Wear structured clothing such as collared shirts or blazers',
      'Upload selfies with clear lighting so features are captured',
      'Keep your expression calm and direct',
      'Use a lighter style alongside it for everyday profiles',
    ],
    relatedCategories: ['headshots'],
    relatedBlogPosts: ['headshot-lighting-guide', 'headshot-trends-2025'],
  },
  {
    slug: 'pastel-soft',
    name: 'Pastel Soft Headshots',
    title: 'AI Pastel Soft Headshots',
    description:
      'Light, airy portraits in gentle pastel tones for a soft, elegant and approachable feel. Made from a few selfies.',
    metaDescription:
      'Create AI pastel soft headshots with gentle tones, airy light and an elegant, approachable look. Perfect for wellness, beauty and creative brands with TailorPic.',
    heroText:
      'Gentle, bright and welcoming. Pastel soft headshots use blush, mint, lavender and cream tones with diffused light to create a calm, graceful portrait that feels warm and approachable without losing polish.',
    features: [
      'Soft pastel backgrounds in blush, sage, lavender and cream',
      'Diffused, flattering light with minimal shadow',
      'Airy, gently lifted color grading',
      'Natural, smooth skin tones without over-retouching',
      'Relaxed, friendly expressions',
      'Crops suited to websites, social media and print',
    ],
    idealFor: [
      'Wellness practitioners, coaches and therapists',
      'Beauty, fashion and lifestyle brands',
      'Teachers and childcare professionals',
      'Bloggers, influencers and small business owners',
      'Anyone who wants a friendly, gentle presence',
    ],
    tips: [
      'Wear light or soft-toned clothing that harmonizes with pastels',
      'Avoid busy patterns that compete with the soft palette',
      'Upload bright, evenly lit selfies',
      'Pick a background color that echoes your brand palette',
    ],
    relatedCategories: ['headshots'],
    relatedBlogPosts: ['what-to-wear-for-headshots', 'headshot-trends-2025'],
  },
  {
    slug: 'rustic-outdoor',
    name: 'Rustic Outdoor Headshots',
    title: 'AI Rustic Outdoor Headshots',
    description:
      'Natural portraits set among trees, fields and warm golden light for an organic, genuine feel. Created from a few selfies.',
    metaDescription:
      'Create AI rustic outdoor headshots with natural backgrounds, golden light and an authentic, organic feel. Ideal for outdoor, farm and lifestyle brands with TailorPic.',
    heroText:
      'Authentic and grounded. Rustic outdoor headshots place you in natural settings such as woodland paths, open fields and weathered wood, lit by warm golden-hour sun for a genuine, down-to-earth portrait that feels real.',
    features: [
      'Natural backdrops including forests, meadows and barns',
      'Warm golden-hour lighting',
      'Earth-tone color palette',
      'Soft background blur that keeps focus on you',
      'Casual textures such as denim, flannel and knitwear',
      'Relaxed, genuine expressions',
    ],
    idealFor: [
      'Farmers, ranchers and food producers',
      'Outdoor guides, trainers and adventure brands',
      'Craft makers, artisans and small shops',
      'Authors and lifestyle creators',
      'Real estate agents in rural and country markets',
    ],
    tips: [
      'Wear natural fabrics and earth tones',
      'Choose comfortable clothing so you look relaxed',
      'Upload selfies taken in soft, natural light',
      'Keep accessories simple so the setting stays the focus',
    ],
    relatedCategories: ['headshots', 'family-portraits'],
    relatedBlogPosts: ['what-to-wear-for-headshots', 'headshot-lighting-guide'],
  },
  {
    slug: 'tech-startup',
    name: 'Tech Startup Headshots',
    title: 'AI Tech Startup Headshots',
    description:
      'Modern, energetic portraits set in bright offices and open workspaces that reflect startup culture. Made from a few selfies.',
    metaDescription:
      'Create AI tech startup headshots in modern offices and bright workspaces. Approachable, innovative portraits for founders and teams with TailorPic.',
    heroText:
      'Modern, open and ready to build. Tech startup headshots place you in bright, contemporary workspaces with glass, plants and soft daylight, pairing smart-casual attire with a confident smile that signals innovation and approachability.',
    features: [
      'Bright modern office and co-working backgrounds',
      'Smart-casual attire such as tees, hoodies and blazers',
      'Soft natural daylight with gentle background blur',
      'Confident, approachable expressions',
      'Consistent look across entire teams',
      'Crops tuned for LinkedIn, About pages and pitch decks',
    ],
    idealFor: [
      'Founders and co-founders',
      'Software engineers and product teams',
      'Startup About and Team pages',
      'Investor decks and press kits',
      'Remote teams that need consistent photos',
    ],
    tips: [
      'Choose smart-casual clothing that matches your company culture',
      'Keep the whole team on the same style for consistency',
      'Upload selfies with clear, even lighting',
      'Use a more formal style for investor or enterprise audiences',
    ],
    relatedCategories: ['headshots', 'team-headshots'],
    relatedBlogPosts: ['startup-team-branding-photos', 'startup-founder-personal-branding-ai-photos', 'work-from-home-headshots'],
  },
];

export function getPhotoStyle(slug: string): PhotoStyle | undefined {
  return photoStyles.find((s) => s.slug === slug);
}

export function getAllPhotoStyles(): PhotoStyle[] {
  return photoStyles;
}
