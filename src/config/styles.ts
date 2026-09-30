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
  {
    slug: "black-and-white-classic",
    name: "Black and White Classic Headshots",
    title: "AI Black and White Classic Headshots",
    description:
      "Timeless monochrome portraits with rich tonal contrast and classic studio lighting. Created from a few selfies.",
    metaDescription:
      "Create AI black and white classic headshots with rich contrast and timeless studio lighting. Elegant monochrome portraits for any profession with TailorPic.",
    heroText:
      "Timeless and understated. Black and white classic headshots strip away color distractions and focus attention on your expression, with deep tones, soft highlights and a refined studio feel that never goes out of style.",
    features: [
      "Rich monochrome tones with smooth contrast",
      "Classic studio lighting with soft shadows",
      "Clean neutral backdrops",
      "Focus on expression and character",
      "Works in print and on screens",
      "Pairs well with any outfit color"
    ],
    idealFor: [
      "Authors, artists and creatives",
      "Actors, musicians and speakers",
      "Executives who want a distinguished look",
      "Press kits and publications",
      "Professionals who want a timeless profile photo"
    ],
    tips: [
      "Wear solid textures and avoid busy patterns",
      "Upload selfies with clear, even lighting",
      "Choose a confident, natural expression",
      "Pair with a color version for variety"
    ],
    relatedCategories: ['headshots','creative-portraits'],
    relatedBlogPosts: ['what-to-wear-for-headshots','headshot-lighting-guide'],
  },
  {
    slug: "gradient-backdrop",
    name: "Gradient Backdrop Headshots",
    title: "AI Gradient Backdrop Headshots",
    description:
      "Modern portraits against smooth color gradients that add depth without distraction. Made from a few selfies.",
    metaDescription:
      "Create AI gradient backdrop headshots with smooth, modern color transitions. Stylish, clean portraits for profiles and brands with TailorPic.",
    heroText:
      "Modern and polished. Gradient backdrop headshots place you against a smooth blend of color that adds depth and personality while keeping the focus squarely on you, a clean alternative to plain studio backgrounds.",
    features: [
      "Smooth color gradients in cool, warm and neutral tones",
      "Clean, distraction-free composition",
      "Colors that can complement your brand",
      "Soft, even lighting on the face",
      "Contemporary look for web and social",
      "Consistent backdrops across a whole team"
    ],
    idealFor: [
      "Tech and creative professionals",
      "Brands and teams that want a cohesive look",
      "Speakers and content creators",
      "Website About and Team pages",
      "LinkedIn and social profiles"
    ],
    tips: [
      "Pick a gradient that complements your skin tone and outfit",
      "Keep clothing in solid colors",
      "Choose a consistent gradient across teammates",
      "Upload selfies with clear, even lighting"
    ],
    relatedCategories: ['headshots','team-headshots'],
    relatedBlogPosts: ['what-to-wear-for-headshots','headshot-trends-2025'],
  },
  {
    slug: "natural-bokeh",
    name: "Natural Bokeh Headshots",
    title: "AI Natural Bokeh Headshots",
    description:
      "Portraits with softly blurred, natural backgrounds and gentle depth of field. Generated from a few selfies.",
    metaDescription:
      "Create AI natural bokeh headshots with softly blurred backgrounds and gentle depth of field. Warm, authentic portraits with TailorPic.",
    heroText:
      "Soft and natural. Natural bokeh headshots keep your face sharp while the background melts into a gentle, out-of-focus blur of light and color, giving the look of a portrait shot with a fast lens.",
    features: [
      "Soft, creamy background blur",
      "Sharp focus on the eyes and face",
      "Natural light and gentle color glow",
      "Backdrops such as greenery, cafes and city lights",
      "Warm, approachable feel",
      "Depth that draws attention to you"
    ],
    idealFor: [
      "Consultants, coaches and creators",
      "Real estate and service professionals",
      "Authors and speakers",
      "LinkedIn and personal website photos",
      "Anyone who wants a relaxed, authentic look"
    ],
    tips: [
      "Choose clothing that contrasts with the background",
      "Upload selfies in soft, natural light",
      "Keep accessories simple",
      "Pick a setting that matches your work"
    ],
    relatedCategories: ['headshots'],
    relatedBlogPosts: ['headshot-lighting-guide','what-to-wear-for-headshots'],
  },
  {
    slug: "magazine-cover",
    name: "Magazine Cover Headshots",
    title: "AI Magazine Cover Headshots",
    description:
      "Bold, polished portraits with editorial lighting and a glossy, high-impact look. Created from a few selfies.",
    metaDescription:
      "Create AI magazine cover headshots with editorial lighting and a bold, glossy look. High-impact portraits for personal brands with TailorPic.",
    heroText:
      "Bold and striking. Magazine cover headshots borrow from editorial photography, with dramatic but flattering lighting, crisp detail and a confident pose that makes your portrait feel like a feature story.",
    features: [
      "Editorial-style lighting with crisp detail",
      "Confident, high-impact poses",
      "Polished, glossy finish",
      "Clean backdrops that let you stand out",
      "Flattering contrast and color",
      "Suited to hero images and press features"
    ],
    idealFor: [
      "Personal brands and influencers",
      "Authors, speakers and thought leaders",
      "Founders and entrepreneurs",
      "Press kits and media features",
      "Website hero banners"
    ],
    tips: [
      "Wear statement pieces in solid colors",
      "Upload selfies with strong, even lighting",
      "Practice a confident, direct expression",
      "Use alongside a more neutral style for everyday profiles"
    ],
    relatedCategories: ['headshots','creative-portraits'],
    relatedBlogPosts: ['headshot-trends-2025','headshot-lighting-guide'],
  },
  {
    slug: "corporate-formal",
    name: "Corporate Formal Headshots",
    title: "AI Corporate Formal Headshots",
    description:
      "Fully formal portraits in tailored suits with traditional boardroom styling. Made from a few selfies.",
    metaDescription:
      "Create AI corporate formal headshots in tailored suits with traditional boardroom styling. Polished portraits for executives with TailorPic.",
    heroText:
      "Traditional and authoritative. Corporate formal headshots dress you in a tailored suit and crisp shirt or blouse against a refined neutral backdrop, projecting the seriousness expected in law, finance and leadership.",
    features: [
      "Tailored suits, ties and formal business attire",
      "Refined neutral studio backdrops",
      "Even, flattering lighting",
      "Composed, confident expressions",
      "Consistent framing across leadership teams",
      "High resolution for print and web"
    ],
    idealFor: [
      "Executives and board members",
      "Lawyers, bankers and financial advisors",
      "Annual reports and leadership pages",
      "Conservative industries and formal settings",
      "Anyone who needs the most traditional look"
    ],
    tips: [
      "Wear a suit jacket or formal top in your selfies",
      "Choose dark, solid colors",
      "Keep accessories minimal",
      "Use a less formal style for creative audiences"
    ],
    relatedCategories: ['headshots','team-headshots'],
    relatedBlogPosts: ['what-to-wear-for-headshots','headshot-trends-2025'],
  },
  {
    slug: 'sunset-golden',
    name: 'Sunset Golden Portraits',
    title: 'AI Sunset Golden Portraits',
    description:
      'Warm portraits lit by low, golden-hour sunlight with a glowing rim of light and soft amber tones. Made from a few selfies.',
    metaDescription:
      'Create AI sunset golden portraits with warm golden-hour light, glowing rim highlights and soft amber tones. Friendly, radiant photos from a few selfies with TailorPic.',
    heroText:
      'Golden hour makes everyone look good. Sunset golden portraits wrap you in low, warm light with a soft glow around your hair and shoulders, giving your photos an approachable, radiant feel without waiting for the perfect evening.',
    features: [
      'Low-angle golden-hour sunlight with a glowing rim light',
      'Warm amber, peach and honey color grading',
      'Softly blurred outdoor backgrounds with gentle lens flare',
      'Flattering skin tones with natural warmth',
      'Relaxed, smiling expressions that feel genuine',
      'High resolution files for social, web and print',
    ],
    idealFor: [
      'Personal brands, coaches and creators',
      'Social media and dating profile photos',
      'Wellness, lifestyle and hospitality professionals',
      'Authors and speakers who want an approachable look',
      'Website About pages with a warm tone',
    ],
    tips: [
      'Upload selfies taken in soft, even light so the AI captures true skin tone',
      'Choose solid, earthy clothing such as cream, olive, rust or denim',
      'Include a few smiling and a few relaxed expressions',
      'Pair with a neutral style for formal profiles such as LinkedIn',
      'Avoid heavy patterns that can clash with the warm color grade',
    ],
    relatedCategories: ['headshots', 'dating-photos'],
    relatedBlogPosts: ['headshot-lighting-guide', 'headshot-trends-2026', 'personal-brand-headshot-strategy'],
  },
  {
    slug: 'pop-art',
    name: 'Pop Art Portraits',
    title: 'AI Pop Art Portraits',
    description:
      'Bold Andy Warhol-inspired portraits with flat saturated colors, strong outlines and a graphic, screen-printed look.',
    metaDescription:
      'Turn your selfies into AI pop art portraits inspired by Andy Warhol. Bold colors, graphic outlines and a screen-print look for avatars, posters and fun profiles with TailorPic.',
    heroText:
      'Be the art. Pop art portraits turn your face into a bold, screen-printed graphic with flat saturated color, punchy contrast and a playful attitude that stops the scroll on any feed.',
    features: [
      'Flat, high-saturation color blocks in hot pink, cyan, yellow and red',
      'Strong outlines and halftone dot textures',
      'Warhol-style grids and repeated panels',
      'Graphic, poster-ready compositions',
      'Recognisable likeness preserved under the stylisation',
      'High resolution files suitable for prints and merchandise',
    ],
    idealFor: [
      'Social media avatars and creators',
      'Musicians, DJs and performers',
      'Gifts, posters and wall art',
      'Podcast and newsletter artwork',
      'Creative agencies and studios with a bold brand',
    ],
    tips: [
      'Upload a clear, front-facing selfie with simple lighting',
      'Strong expressions translate best into graphic styles',
      'Keep glasses and accessories visible if they define your look',
      'Use pop art for personality, and a classic style for formal profiles',
      'Try different color palettes to match your brand colors',
    ],
    relatedCategories: ['headshots', 'pet-portraits'],
    relatedBlogPosts: ['social-media-profile-photo-guide', 'personal-brand-headshot-strategy', 'headshot-trends-2026'],
  },
  {
    slug: 'watercolor',
    name: 'Watercolor Portraits',
    title: 'AI Watercolor Portraits',
    description:
      'Soft, artistic portraits with flowing washes of color, delicate edges and the texture of hand-painted paper.',
    metaDescription:
      'Create AI watercolor portraits with flowing color washes, soft edges and paper texture. Artistic portraits for authors, creatives and gifts, made from a few selfies with TailorPic.',
    heroText:
      'Painted, not photographed. Watercolor portraits blend your likeness with flowing washes of color, soft bleeding edges and the gentle texture of paper for a dreamy, artistic result.',
    features: [
      'Translucent color washes with soft bleeding edges',
      'Visible paper grain and delicate brush texture',
      'Muted, harmonious palettes with optional accent colors',
      'Loose, painterly backgrounds that fade to white',
      'Faithful facial likeness in a hand-painted style',
      'High resolution files suitable for framing and print',
    ],
    idealFor: [
      'Authors, poets and illustrators',
      'Artists, teachers and creative professionals',
      'Gifts, invitations and keepsakes',
      'Blog, newsletter and book author pages',
      'Therapists and wellness brands with a gentle tone',
    ],
    tips: [
      'Upload selfies with soft, even lighting for smooth washes',
      'Pick a pale or plain background in your source photos',
      'Wear solid colors so the painting stays harmonious',
      'Generate several palettes and choose the one that fits your brand',
      'Use it alongside a realistic headshot for formal platforms',
    ],
    relatedCategories: ['headshots', 'family-portraits'],
    relatedBlogPosts: ['ai-photography-ethics-guide', 'headshot-trends-2026', 'personal-brand-headshot-strategy'],
  },
  {
    slug: 'corporate-team',
    name: 'Corporate Team Photos',
    title: 'AI Corporate Team Photos',
    description:
      'Consistent, matching team portraits with uniform lighting, framing and backdrop so every person looks part of the same company.',
    metaDescription:
      'Create consistent AI corporate team photos with matching lighting, backdrops and framing for every employee. Fast, affordable team headshots for websites and directories with TailorPic.',
    heroText:
      'One team, one look. Corporate team photos give every person on your About page the same lighting, framing and backdrop, even when your people work in different cities and time zones.',
    features: [
      'Identical backdrop, lighting and crop across the whole team',
      'Brand-matched background colors',
      'Business and smart-casual attire options',
      'Natural, approachable expressions',
      'Easy onboarding for new hires without a new photo shoot',
      'High resolution files for websites, decks and directories',
    ],
    idealFor: [
      'Company About and Team pages',
      'Remote and distributed teams',
      'HR and people operations teams',
      'Growing startups adding new hires regularly',
      'Professional services firms and agencies',
    ],
    tips: [
      'Ask every team member to upload selfies using the same guidelines',
      'Choose one background color and use it for everyone',
      'Agree on a dress code such as blazers or smart casual before generating',
      'Keep the same style settings when new hires join',
      'Review the full team grid together before publishing',
    ],
    relatedCategories: ['headshots', 'team-headshots'],
    relatedBlogPosts: ['corporate-team-photos-guide', 'team-headshot-consistency-guide', 'virtual-headshots-remote-teams'],
  },
  {
    slug: 'fashion-editorial',
    name: 'Fashion Editorial Portraits',
    title: 'AI Fashion Editorial Portraits',
    description:
      'High-fashion magazine portraits with dramatic lighting, confident poses and sophisticated styling.',
    metaDescription:
      'Create AI fashion editorial portraits with dramatic lighting, bold styling and magazine-quality composition. Stand-out portraits for models, creatives and brands with TailorPic.',
    heroText:
      'Step onto the page. Fashion editorial portraits bring magazine-style lighting, bold styling and confident posing to your photos, for people who want to be remembered at first glance.',
    features: [
      'Dramatic studio lighting with sculpted highlights',
      'Runway-inspired styling and statement garments',
      'Confident, expressive poses and angles',
      'Clean, high-contrast backdrops in neutral or bold colors',
      'Magazine-style composition and crop',
      'High resolution files for portfolios and print',
    ],
    idealFor: [
      'Models, stylists and fashion creatives',
      'Influencers and content creators',
      'Designers, photographers and art directors',
      'Press kits and brand campaigns',
      'Creative agencies and boutiques',
    ],
    tips: [
      'Upload selfies with varied angles so the model can capture your features',
      'Wear fitted, structured clothing in strong solid colors',
      'Practice a confident, slightly serious expression',
      'Pair with a corporate style for conservative platforms',
      'Keep makeup and hair consistent with your everyday look for accurate results',
    ],
    relatedCategories: ['headshots'],
    relatedBlogPosts: ['headshot-trends-2026', 'headshot-poses-guide', 'personal-brand-headshot-strategy'],
  },
  {
    slug: 'art-deco',
    name: 'Art Deco Portraits',
    title: 'AI Art Deco Portraits',
    description:
      'Elegant 1920s-inspired portraits with geometric gold details, glamorous lighting and a Great Gatsby sense of style.',
    metaDescription:
      'Create AI Art Deco portraits inspired by the 1920s, with geometric gold accents, glamorous styling and rich jewel tones. Elegant, distinctive photos with TailorPic.',
    heroText:
      'Step into the Jazz Age. Art Deco portraits pair bold geometry, gold accents and glamorous lighting for a look that feels timeless, theatrical and effortlessly elegant.',
    features: [
      'Geometric gold and black backdrops inspired by 1920s architecture',
      'Glamorous, directional lighting with soft glowing highlights',
      'Period-inspired styling such as tuxedos, beaded gowns and sleek hair',
      'Rich jewel tones in emerald, navy, burgundy and champagne',
      'Symmetrical, poised composition with a cinematic feel',
      'High resolution files suited to invitations, posters and profiles',
    ],
    idealFor: [
      'Themed parties, galas and Great Gatsby events',
      'Wedding and anniversary invitations',
      'Authors, performers and event hosts',
      'Hotels, bars, venues and boutique brands',
      'Anyone wanting a bold, elegant profile photo',
    ],
    tips: [
      'Upload clear, front-facing selfies with even lighting',
      'Choose one accent color such as emerald or gold and keep the rest restrained',
      'Pick a formal neckline or collar to match the period styling',
      'Use a simpler style for conservative platforms like LinkedIn',
      'Generate a few variations and pick the one that still looks like you',
    ],
    relatedCategories: ['headshots', 'couple-engagement-photos'],
    relatedBlogPosts: ['headshot-trends-2026', 'choosing-right-headshot-style', 'personal-brand-headshot-strategy'],
  },
  {
    slug: 'cyberpunk',
    name: 'Cyberpunk Portraits',
    title: 'AI Cyberpunk Portraits',
    description:
      'Futuristic neon-lit portraits with city-night atmosphere, bold color contrast and a sci-fi edge.',
    metaDescription:
      'Create AI cyberpunk portraits with neon lighting, futuristic backdrops and bold color contrast. Striking sci-fi photos for gamers, creators and tech brands with TailorPic.',
    heroText:
      'Welcome to the neon future. Cyberpunk portraits wrap you in glowing magenta and cyan light against a rain-soaked city night, for a look that is unmistakably bold.',
    features: [
      'Neon magenta, cyan and violet lighting on face and background',
      'Futuristic city nights, holographic signs and rainy streets',
      'High-contrast shadows with glowing rim light',
      'Tech-inspired styling such as sleek jackets and subtle accessories',
      'Cinematic composition with a shallow depth of field',
      'High resolution files for avatars, banners and posters',
    ],
    idealFor: [
      'Gamers, streamers and esports teams',
      'Developers, hackers and tech creators',
      'Discord, Twitch and YouTube avatars',
      'Sci-fi authors, artists and musicians',
      'Event posters and album artwork',
    ],
    tips: [
      'Upload selfies with neutral lighting so the neon colors can be applied cleanly',
      'Wear dark, simple clothing that lets the glow stand out',
      'Choose one dominant neon color for a more cohesive result',
      'Keep a professional style in reserve for job applications',
      'Crop to a square for avatars and keep your face centered',
    ],
    relatedCategories: ['headshots'],
    relatedBlogPosts: ['headshot-trends-2026', 'choosing-right-headshot-style', 'social-media-profile-photo-guide'],
  },
  {
    slug: 'renaissance',
    name: 'Renaissance Portraits',
    title: 'AI Renaissance Portraits',
    description:
      'Classical oil-painting portraits with rich color, dramatic chiaroscuro and the grandeur of Old Master art.',
    metaDescription:
      'Create AI Renaissance portraits in the style of classical oil paintings, with dramatic chiaroscuro lighting, rich fabrics and museum-style composition. Try TailorPic.',
    heroText:
      'Become a masterpiece. Renaissance portraits transform your selfies into classical oil paintings with deep color, soft candlelit shadows and the dignity of the Old Masters.',
    features: [
      'Oil-painting texture with visible, refined brushwork',
      'Chiaroscuro lighting with warm highlights and deep shadows',
      'Period-inspired clothing such as velvet, brocade and lace collars',
      'Dark, atmospheric backgrounds in umber, green and deep red',
      'Formal three-quarter composition in the classical tradition',
      'High resolution files suited to framing and print',
    ],
    idealFor: [
      'Gifts, family keepsakes and wall art',
      'Authors, historians and educators',
      'Museum, gallery and cultural projects',
      'Costume parties and themed invitations',
      'Memorable social media profile images',
    ],
    tips: [
      'Upload sharp selfies with a neutral expression for the most faithful likeness',
      'Remove glasses and hats where possible so the painted face stays clear',
      'Pair with a print order for a striking framed portrait',
      'Try a three-quarter angle selfie for a classical pose',
      'Make a matching set for partners or family members',
    ],
    relatedCategories: ['headshots', 'family-portraits'],
    relatedBlogPosts: ['choosing-right-headshot-style', 'headshot-trends-2026', 'family-photo-vs-headshot'],
  },
  {
    slug: 'tropical',
    name: 'Tropical Portraits',
    title: 'AI Tropical Portraits',
    description:
      'Bright, sun-soaked portraits with palm leaves, turquoise water and a relaxed summer mood.',
    metaDescription:
      'Create AI tropical portraits with palm leaves, turquoise water and warm summer light. Cheerful vacation-style photos for profiles, travel and lifestyle brands with TailorPic.',
    heroText:
      'Bring the vacation with you. Tropical portraits place you amid palm leaves, warm sunshine and turquoise water for a fresh, happy look that feels like summer all year round.',
    features: [
      'Lush palms, hibiscus and jungle greenery backdrops',
      'Warm sunshine with soft, flattering skin tones',
      'Turquoise ocean, white sand and resort-style settings',
      'Breezy linen, floral and summer clothing styling',
      'Bright, saturated color with an easy, relaxed mood',
      'High resolution files for social media and print',
    ],
    idealFor: [
      'Travel bloggers and lifestyle creators',
      'Hospitality, resort and tourism brands',
      'Beach weddings and destination events',
      'Holiday cards and summer invitations',
      'Dating profiles with a relaxed, sunny vibe',
    ],
    tips: [
      'Upload selfies taken in daylight with a natural smile',
      'Wear light colors that contrast with the green backdrops',
      'Choose a close crop for profile photos and a wider crop for banners',
      'Use a corporate style alongside it for professional platforms',
      'Generate a few scenes such as beach and jungle to compare',
    ],
    relatedCategories: ['headshots', 'dating-photos', 'holiday-cards'],
    relatedBlogPosts: ['dating-profile-photo-tips', 'social-media-profile-photo-guide', 'choosing-right-headshot-style'],
  },
  {
    slug: 'noir-detective',
    name: 'Noir Detective Portraits',
    title: 'AI Noir Detective Portraits',
    description:
      'Moody black-and-white portraits with trench coats, fedoras and venetian-blind shadows in classic detective style.',
    metaDescription:
      'Create AI noir detective portraits with trench coats, fedoras, venetian-blind shadows and smoky black-and-white drama. Atmospheric 1940s-style photos with TailorPic.',
    heroText:
      'The case starts with a great portrait. Noir detective photos bring trench coats, slatted window light and smoky black-and-white drama to your image, for a look full of mystery.',
    features: [
      'Black-and-white or muted tones with deep contrast',
      'Venetian-blind shadows and hard, directional light',
      'Trench coats, fedoras, suits and loosened ties',
      'Smoky offices, rainy streets and lamplit alleys',
      'Brooding, narrative-driven expressions and poses',
      'High resolution files for posters, covers and profiles',
    ],
    idealFor: [
      'Mystery, crime and thriller authors',
      'True crime podcasters and storytellers',
      'Private investigators and security professionals',
      'Themed parties, murder mystery evenings and film fans',
      'Book covers, posters and promotional art',
    ],
    tips: [
      'Upload well-lit selfies so the dramatic shadows can be added convincingly',
      'Wear a collared shirt or jacket to match the period look',
      'Keep your expression serious and slightly guarded',
      'Pair with a clean corporate style for formal uses',
      'Try both a black-and-white and a warm sepia variation',
    ],
    relatedCategories: ['headshots'],
    relatedBlogPosts: ['ai-headshot-for-authors', 'podcast-host-headshot-branding-guide', 'choosing-right-headshot-style'],
  },
  {
    slug: 'glass-morphism',
    name: 'Glass Morphism Portraits',
    title: 'AI Glass Morphism Portraits',
    description:
      'Modern portraits with frosted-glass panels, soft translucent layers and luminous gradients for a sleek digital look.',
    metaDescription:
      'Create AI glass morphism portraits with frosted-glass panels, translucent layers and luminous gradients. Sleek, modern photos for tech and design with TailorPic.',
    heroText:
      'Clear, layered and unmistakably modern. Glass morphism portraits place you in front of frosted panels and soft gradients, for a polished look that feels at home in today\'s best interfaces.',
    features: [
      'Frosted-glass panels and translucent layered backdrops',
      'Soft pastel and aurora-style gradients with subtle glow',
      'Crisp, clean lighting that keeps the face sharp and bright',
      'Modern smart-casual and minimal wardrobe options',
      'Gentle background blur with light, airy depth',
      'High resolution files sized for app UIs, decks and web hero sections',
    ],
    idealFor: [
      'Product designers and UI/UX professionals',
      'SaaS founders and tech marketers',
      'App landing pages and pitch decks',
      'Creative agencies and digital studios',
      'Conference speaker profiles for design and technology events',
    ],
    tips: [
      'Upload bright, evenly lit selfies so the glass effects blend naturally',
      'Wear solid, simple tops so the layered background stays the focus',
      'Pick a gradient that complements your brand colours',
      'Use a neutral style such as studio classic for formal documents',
      'Generate a square crop for app avatars and a wide crop for hero banners',
    ],
    relatedCategories: ['headshots'],
    relatedBlogPosts: [
      'headshot-trends-2026',
      'choosing-right-headshot-style',
      'ai-headshot-for-startup-founders',
    ],
  },
  {
    slug: 'vaporwave',
    name: 'Vaporwave Portraits',
    title: 'AI Vaporwave Portraits',
    description:
      'Retro-futuristic portraits with pink and cyan gradients, neon grids and nostalgic 80s and 90s digital aesthetics.',
    metaDescription:
      'Get AI vaporwave portraits with pink and cyan gradients, neon grids, palm silhouettes and nostalgic retro-futuristic vibes. Bold, playful photos with TailorPic.',
    heroText:
      'Turn up the nostalgia. Vaporwave portraits wrap you in pink and cyan sunsets, glowing grids and retro-futuristic scenery, for a dreamy look that stands out anywhere.',
    features: [
      'Pink, purple and cyan gradient skies and sunsets',
      'Neon grid floors, palm silhouettes and retro computer motifs',
      'Dreamy, slightly faded colour grading with soft glow',
      'Casual, streetwear and retro-inspired outfits',
      'Playful but flattering expressions',
      'High resolution files for avatars, covers and posters',
    ],
    idealFor: [
      'Musicians, DJs and electronic producers',
      'Streamers, gamers and content creators',
      'Album art, playlists and event posters',
      'Social media avatars and Discord profiles',
      'Themed parties and creative portfolios',
    ],
    tips: [
      'Upload clear selfies with a relaxed or playful expression',
      'Wear simple solid colours so the gradients pop',
      'Avoid heavy filters on your source photos',
      'Pair with a corporate or LinkedIn style for professional platforms',
      'Try both a pink sunset and a cyan night variation',
    ],
    relatedCategories: ['headshots'],
    relatedBlogPosts: [
      'ai-headshot-for-musicians',
      'social-media-profile-photo-guide',
      'choosing-right-headshot-style',
    ],
  },
  {
    slug: 'black-tie',
    name: 'Black Tie Portraits',
    title: 'AI Black Tie Portraits',
    description:
      'Elegant gala portraits in tuxedos and evening gowns with refined lighting and formal, timeless styling.',
    metaDescription:
      'Create AI black tie portraits with tuxedos, evening gowns, refined lighting and timeless formal styling. Elegant gala and event photos with TailorPic.',
    heroText:
      'Dressed for the occasion. Black tie portraits put you in a tuxedo or evening gown with polished lighting and rich, formal backdrops, for photos that look ready for a gala.',
    features: [
      'Tuxedos, bow ties, evening gowns and formal accessories',
      'Rich dark backdrops, ballroom and candlelit settings',
      'Refined, directional lighting with elegant highlights',
      'Timeless, sophisticated poses and expressions',
      'Subtle warm grading that flatters every skin tone',
      'High resolution files for programmes, invitations and press',
    ],
    idealFor: [
      'Gala hosts, honourees and charity event speakers',
      'Award nominees and awards-night profiles',
      'Wedding and formal event invitations',
      'Executives and board members at formal occasions',
      'Program booklets, auction catalogues and press kits',
    ],
    tips: [
      'Upload selfies with clear shoulders and neckline visible',
      'Choose a solid dark or light top in your selfies to guide the attire',
      'Keep your expression composed with a confident, subtle smile',
      'Pair with an executive or corporate style for daily professional use',
      'Generate both a tuxedo and an evening-wear variation to compare',
    ],
    relatedCategories: ['headshots', 'holiday-cards'],
    relatedBlogPosts: [
      'executive-headshot-guide',
      'ai-headshot-for-nonprofit-leaders',
      'choosing-right-headshot-style',
    ],
  },
  {
    slug: 'bohemian',
    name: 'Bohemian Portraits',
    title: 'AI Bohemian Portraits',
    description:
      'Relaxed boho portraits with flowing fabrics, earthy textures, warm light and free-spirited natural settings.',
    metaDescription:
      'Get AI bohemian portraits with flowing fabrics, earthy textures, warm light and free-spirited natural settings. Relaxed, creative photos with TailorPic.',
    heroText:
      'Free-spirited and effortlessly warm. Bohemian portraits bring flowing fabrics, earthy colours and golden light to your photos, for an easygoing look full of personality.',
    features: [
      'Flowing fabrics, layered jewellery and natural textures',
      'Earthy palettes of terracotta, sage, cream and mustard',
      'Warm, soft light with gentle golden tones',
      'Plants, macramé, woven decor and garden backdrops',
      'Relaxed, genuine expressions and unposed poses',
      'High resolution files for websites, shops and social feeds',
    ],
    idealFor: [
      'Artists, makers and Etsy sellers',
      'Yoga teachers, wellness coaches and healers',
      'Travel bloggers and lifestyle creators',
      'Boutique owners and independent designers',
      'Festival profiles and personal brand pages',
    ],
    tips: [
      'Upload daylight selfies with a natural smile',
      'Wear simple neutral or earthy tops for the AI to build on',
      'Choose a close crop for profiles and a wider crop for banners',
      'Pair with a business casual style for more formal platforms',
      'Try a garden and an indoor plant-filled variation',
    ],
    relatedCategories: ['headshots', 'dating-photos'],
    relatedBlogPosts: [
      'freelancer-headshot-branding',
      'personal-brand-headshot-strategy',
      'choosing-right-headshot-style',
    ],
  },
  {
    slug: 'industrial',
    name: 'Industrial Portraits',
    title: 'AI Industrial Portraits',
    description:
      'Gritty, confident portraits set in warehouses, workshops and loft spaces with brick, steel and concrete textures.',
    metaDescription:
      'Create AI industrial portraits in warehouses, workshops and lofts with brick, steel and concrete textures. Confident, rugged photos with TailorPic.',
    heroText:
      'Built with character. Industrial portraits place you in raw loft spaces, workshops and factory floors, for a strong, grounded image with texture and attitude.',
    features: [
      'Exposed brick, steel beams, concrete and metal textures',
      'Warehouse, workshop and converted loft settings',
      'Moody, directional light with strong but flattering contrast',
      'Work jackets, denim, rolled sleeves and utility wear',
      'Confident, grounded poses and expressions',
      'High resolution files for websites, signage and print',
    ],
    idealFor: [
      'Engineers, builders and skilled tradespeople',
      'Manufacturing and logistics leaders',
      'Craft brewers, makers and workshop owners',
      'Architects and design-build firms',
      'Coworking spaces, gyms and loft-based businesses',
    ],
    tips: [
      'Upload sharp selfies with even lighting on the face',
      'Wear a work shirt, jacket or plain tee to match the setting',
      'Keep a steady, confident expression',
      'Use a corporate style for investor and formal documents',
      'Try both a brick loft and a workshop scene',
    ],
    relatedCategories: ['headshots', 'team-headshots'],
    relatedBlogPosts: [
      'best-headshot-backgrounds-by-industry',
      'team-headshot-consistency-guide',
      'choosing-right-headshot-style',
    ],
  },
  {
    slug: 'anime-portrait',
    name: 'Anime Portraits',
    title: 'AI Anime Portraits',
    description:
      'Stylised anime-inspired portraits with expressive eyes, clean line work and vivid colour, created from your selfies.',
    metaDescription:
      'Turn your selfies into AI anime portraits with expressive eyes, clean line art and vivid colour. Perfect for avatars and gaming profiles with TailorPic.',
    heroText:
      'Step into the frame of your own story. Anime portraits reimagine you with expressive eyes, crisp line work and colour-rich backgrounds, while keeping the features that make you recognisable.',
    features: [
      'Clean line art and cel-style shading inspired by anime and manga',
      'Expressive eyes and softly stylised facial proportions that still resemble you',
      'Vivid, saturated colour palettes with dramatic sky and city backgrounds',
      'Hair highlights, wind effects and sparkle details for a cinematic feel',
      'Choice of portrait framing from close-up avatar to waist-up scene',
      'High resolution files suited to avatars, banners and prints',
    ],
    idealFor: [
      'Gamers, streamers and VTuber-style avatars',
      'Discord, Twitch and forum profile pictures',
      'Content creators building a playful personal brand',
      'Fans who want a unique gift or keepsake',
      'Illustrators and artists who want a creative reference portrait',
    ],
    tips: [
      'Upload clear, front-facing selfies with even lighting so your features translate well',
      'Include a few smiling and neutral expressions for more variety',
      'Avoid sunglasses and heavy filters in your source photos',
      'Keep a separate professional headshot for LinkedIn and formal use',
      'Try both a bright daytime scene and a moody night city variation',
    ],
    relatedCategories: ['headshots', 'dating-photos'],
    relatedBlogPosts: [
      'choosing-right-headshot-style',
      'personal-brand-headshot-strategy',
      'social-media-profile-photo-guide',
    ],
  },
  {
    slug: 'marble-bust',
    name: 'Marble Bust Portraits',
    title: 'AI Marble Bust Portraits',
    description:
      'Classical sculpture-style portraits that render you as a polished marble bust with dramatic museum lighting.',
    metaDescription:
      'Create an AI marble bust portrait in classical sculpture style with polished stone texture and museum lighting. A timeless, striking image from TailorPic.',
    heroText:
      'Carved for the ages. Marble bust portraits turn you into a classical sculpture, with smooth stone, sculpted drapery and gallery lighting that feels closer to a museum piece than a selfie.',
    features: [
      'Polished white and veined marble textures with subtle surface detail',
      'Classical Greek and Roman sculpture framing with carved drapery',
      'Dramatic museum lighting that highlights form and depth',
      'Optional pedestal, gallery wall or dark backdrop settings',
      'Timeless monochrome tones with gentle warm or cool grading',
      'High resolution files suited to posters, prints and social media',
    ],
    idealFor: [
      'Authors, historians and educators with a classical theme',
      'Art collectors, galleries and museum-inspired brands',
      'Anniversary, milestone and memorial gifts',
      'Creators who want a bold, memorable avatar',
      'Wall art and poster prints with a timeless look',
    ],
    tips: [
      'Upload selfies with clear facial structure and soft, even light',
      'Pull hair back or keep it simple so the sculpted shape reads well',
      'Choose a neutral expression for the most statue-like result',
      'Try a pedestal version and a tight close-up crop',
      'Pair with a corporate style if you need a conventional photo as well',
    ],
    relatedCategories: ['headshots', 'family-portraits'],
    relatedBlogPosts: [
      'choosing-right-headshot-style',
      'headshot-trends-2026',
      'personal-brand-headshot-strategy',
    ],
  },
  {
    slug: 'holographic',
    name: 'Holographic Portraits',
    title: 'AI Holographic Portraits',
    description:
      'Futuristic iridescent portraits with shifting pastel gradients, foil textures and shimmering light effects.',
    metaDescription:
      'Create AI holographic portraits with iridescent gradients, foil textures and shimmering light. A futuristic, eye-catching look made with TailorPic.',
    heroText:
      'Light that changes as you look. Holographic portraits wrap you in iridescent gradients, foil reflections and prismatic glow for a futuristic image that stands out in every feed.',
    features: [
      'Iridescent pink, teal, violet and gold gradients that shift across the image',
      'Foil and chrome textures on clothing and backgrounds',
      'Prismatic light leaks and soft lens flare',
      'Glossy, reflective surfaces with a clean futuristic finish',
      'Options from subtle shimmer to full neon-holo styling',
      'High resolution files suited to covers, posters and social media',
    ],
    idealFor: [
      'Musicians, DJs and performers',
      'Fashion, beauty and cosmetics creators',
      'Tech and Web3 brands that want a futuristic look',
      'Event posters, album art and playlist covers',
      'Social media profile pictures that need to stand out',
    ],
    tips: [
      'Upload well-lit selfies so the AI can keep your face natural under colourful light',
      'Wear neutral or metallic clothing so gradients do not clash',
      'Avoid heavy makeup filters in the source photos',
      'Try a soft pastel version and a high-intensity version',
      'Keep a classic studio style for professional profiles',
    ],
    relatedCategories: ['headshots', 'dating-photos'],
    relatedBlogPosts: [
      'headshot-trends-2026',
      'social-media-profile-photo-guide',
      'choosing-right-headshot-style',
    ],
  },
  {
    slug: 'cottagecore',
    name: 'Cottagecore Portraits',
    title: 'AI Cottagecore Portraits',
    description:
      'Soft pastoral portraits with wildflowers, linen, golden meadows and countryside cottage charm.',
    metaDescription:
      'Create dreamy AI cottagecore portraits with wildflowers, linen and meadow light. Soft, pastoral photos for profiles, prints and gifts from TailorPic.',
    heroText:
      'Slow living, beautifully captured. Cottagecore portraits place you in sunlit meadows, flower gardens and cosy cottage kitchens, with soft colour and an unhurried, romantic mood.',
    features: [
      'Wildflower meadows, herb gardens and stone cottage settings',
      'Linen dresses, knit cardigans, straw hats and woven baskets',
      'Warm, diffused sunlight with a soft film-like glow',
      'Muted greens, creams, butter yellows and dusty pinks',
      'Natural, relaxed poses and gentle smiles',
      'High resolution files suited to prints, blogs and social media',
    ],
    idealFor: [
      'Bakers, florists, gardeners and farm-to-table businesses',
      'Handmade and craft shop owners on Etsy or Instagram',
      'Lifestyle and slow-living bloggers',
      'Wellness, yoga and herbal practitioners',
      'Family keepsakes, gifts and seasonal cards',
    ],
    tips: [
      'Upload natural-light selfies taken near a window or outdoors',
      'Wear simple neutral tops so the AI can add period-style clothing',
      'Keep makeup light for a fresh, natural result',
      'Try a garden scene and a cosy interior variation',
      'Use a business casual style for more formal platforms',
    ],
    relatedCategories: ['headshots', 'family-portraits'],
    relatedBlogPosts: [
      'choosing-right-headshot-style',
      'freelancer-headshot-branding',
      'personal-brand-headshot-strategy',
    ],
  },
  {
    slug: 'grunge',
    name: 'Grunge Portraits',
    title: 'AI Grunge Portraits',
    description:
      'Raw, alternative-rock portraits with gritty texture, faded tones, worn denim and moody club lighting.',
    metaDescription:
      'Create AI grunge portraits with gritty film texture, faded tones and moody club lighting. An edgy alternative rock look for profiles and posters from TailorPic.',
    heroText:
      'Turn it up. Grunge portraits capture the raw energy of a basement gig, with grainy texture, faded colour, worn denim and low, moody light that feels unpolished on purpose.',
    features: [
      'Gritty film grain, scratches and faded, desaturated colour',
      'Flannel shirts, band tees, leather jackets and worn denim',
      'Moody club, garage and graffiti-wall backdrops',
      'Hard flash and low-key practical lighting for a raw look',
      'Confident, unposed expressions with attitude',
      'High resolution files suited to posters, covers and social media',
    ],
    idealFor: [
      'Musicians, bands and promoters',
      'Tattoo artists, barbers and alternative lifestyle brands',
      'Photographers and designers with an edgy portfolio',
      'Zine makers, record shops and venue owners',
      'Anyone who wants a bold, non-corporate profile picture',
    ],
    tips: [
      'Upload sharp selfies with clear, even light on the face',
      'Wear simple dark or plain tops as a base for layered styling',
      'Keep a natural, unsmiling or half-smiling expression',
      'Try a hard-flash version and a dim club version',
      'Use a professional style for LinkedIn and formal settings',
    ],
    relatedCategories: ['headshots', 'dating-photos'],
    relatedBlogPosts: [
      'choosing-right-headshot-style',
      'headshot-trends-2026',
      'personal-brand-headshot-strategy',
    ],
  },
];

export function getPhotoStyle(slug: string): PhotoStyle | undefined {
  return photoStyles.find((s) => s.slug === slug);
}

export function getAllPhotoStyles(): PhotoStyle[] {
  return photoStyles;
}
