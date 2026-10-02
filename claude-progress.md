# TailorPic — Progress Tracker

## Last Session: 2026-10-03

### Commits (2026-10-03)
1. `a9ed538` — Hero CTA redirect fix + image download workflow
2. `90fc53a` — Real Unsplash category images (12 photos via GitHub Actions)
3. `a752578` — Fix broken holiday-cards image
4. `bb5ca05` — Remove one-off image download workflows
5. `7590fa9` — Add missing pages to sitemap + remove dead code (3 unused components)

### Completed (2026-10-03)
- [x] Replace all 12 abstract Pillow-generated category images with real Unsplash photos (800x600, 52-129KB each)
- [x] Fix hero CTA: add ?redirect=/headshots to register link
- [x] Add /refund-policy and /for-teams to sitemap.ts
- [x] Remove 3 dead components: guarantee-badge, social-proof-toast-lazy, delivery-tracker
- [x] Full site audit: imports, routes, navigation, images — all clean
- [x] CI passed + Vercel deployed + live site verified

### Commits (2026-10-02)
1. `178090a` — Exit-intent popup, email capture, upload guidelines
2. `5efabdf` — Performance optimization + trust signals
3. `b39f50f` — Critical conversion fixes (CTAs to register, nav, sitemap, robots)
4. `253441f` — Register redirect support + accessibility skip nav
5. `0ef6bf4` — Comprehensive audit (283 files: accessibility IDs, security, metadata, rate limiting, contact form)
6. `a98dca0` — GDPR compliance, SEO canonicals, security hardening, dashboard UX
7. `55078ee` — Billing page, newsletter Resend integration, contact auto-reply
8. `1c01e0e` — Error boundaries, OG images, social meta optimization
9. `2eddd65` — Cookie consent GDPR, schema markup, PWA manifest
10. `1039f51` — Security header (X-XSS-Protection), lazy exit-intent popup
11. `df51386` — Dashboard orders page, email templates, Stripe refund handler
12. `5d36821` — Unsubscribe endpoint, centralized email templates, account deletion email
13. `f3fe10e` — Remove fabricated data, fix accessibility issues
14. `57d678c` — Dashboard nav active state + gallery tp-* token migration
15. `371c490` — Team-headshots page, dashboard metadata, tp-* token migration
16. `ccd8bea` — Sitemap, footer links, remaining gray-* token migration
17. `3809389` — Complete gray-* to tp-* brand token migration site-wide
18. `2c059f0` — Rate limiting on critical API routes (ai/generate, upload, checkout, delete, download)
19. `d9dcfd9` — Competitor-driven improvements: nav, footer restructure, legal pages, conversion optimization
20. `d6d4a53` — How-it-works, comparison table, CTA banner improvements
21. `81ebf51` — Trust badges card grid + pricing Product schema
22. `13335ae` — Samples, enterprise, reviews page improvements
23. `4e27edb` — Fabricated claims removal (15 files) + about page improvements
24. `a0a1e90` — Brand consistency, FAQ wording, testimonials & stats enhancements
25. `f8d60fd` — Complete tp-* brand token migration across 26 files
26. `c2c3ba4` — Brand token cleanup: error boundary + order status badge
27. `9089bd3` — Auth page upgrades (split-screen, trust panel), referral & affiliate pages
28. `0106ef2` — Invoice download API + video testimonials component
29. `c64ae68` — Pricing comparison + money-back guarantee pages
30. `705b056` — Use-cases hub page + homepage SEO optimization
31. `7fc5fc0` — Photo tips page, social proof toast, before/after showcase
32. `b0b7e3b` — FAQ schema on photo-tips, video testimonials on samples, volume pricing on team-headshots
33. `a630abb` — Developer API, technology, and integrations marketing pages
34. `06366f0` — Pricing FAQ + comparison bar, how-it-works differentiators
35. `eedefeb` — Enterprise FAQ schema + ROI calculator component
36. `6a47af8` — Update progress tracker with commits 31-35
37. `e494bf4` — Success stories page + changelog rewrite
38. `0ca2365` — Partners, careers pages + /for-teams redirect + nav improvements
39. `a0cb3fd` — Interactive demos for free tool pages
40. `c2a2a2f` — Fix smart quote syntax errors across 5 files
41. `9029521` — Blog index: featured post, category filters, newsletter CTA
42. `5356093` — Free headshot generator + samples page improvements
43. `f9c16fa` — Update progress tracker with commits 36-42
44. `1e8fb99` — CTA improvements + /vs hub page overhaul
45. `1a11377` — LinkedIn headshots + styles page improvements
46. `cc7173a` — Reviews categorization, enterprise security/demo, remove duplicate SEO components
47. `556458d` — Enterprise pricing fixes, pricing toggle, contact/about improvements, homepage $9.90
48. `64fdc4b` — 14-day guarantee consistency, openGraph metadata, route conflict fix
49. `68453f0` — Security page overhaul, FAQ categories, hero conversion optimization
50. `af77aee` — Update progress tracker with commits 43-49
51. `3766996` — Team-headshots, how-it-works, glossary & pricing-comparison improvements
52. `cea3017` — Fix guarantee text, pricing, stats & links across 65+ industry pages
53. `016ef3c` — Improve free-headshot-generator, samples, changelog & blog pages
54. `63254b5` — Replace rounded-2xl with rounded-tp-card across all public pages
55. `04f2337` — Add twitter metadata to 5 pages, improve editor hub & tools pages
56. `8ee91cd` — Add twitter metadata to 217 pages (use-cases, industries, vs, editor)
57. `02f7533` — Fix broken CTA links, add font-display to 80 vs/ pages, update progress
58. `829825c` — Add font-display to h2 headings in 80 vs/ pages, fix headshotpro CTA
59. `70a4aa4` — Add structured data, FAQs, fix fabricated stats across 64 industry pages
60. `2be76ef` — Replace font-extrabold with font-display on h1/h2 across 107 pages, fix stats and links
61. `cc9218d` — Fix remaining content integrity issues (consultants stats, pricing claim, guarantee text)
62. `748c25c` — Update progress tracker with commits 57-61 and 17 completed features
63. `b85b068` — Add FAQSchema to 37 pages, BreadcrumbSchema to 5 pages, fix ecommerce metadata
64. `43c596a` — Add FAQ sections to 9 vs/ pages, fix legal layout, add BreadcrumbSchema to legal pages
65. `4ccf1ae` — Fix content integrity issues, add Twitter cards, fix CTA links
66. `bc68fe5` — Fix video testimonials: remove 'Real reactions' claim, standardize disclaimer
67. `2803c34` — Dalga 8: blog SEO (BlogPosting schema), enterprise conversion (trust bar, CTAs), team headshots (Service schema, savings comparison)
68. `e791e29` — Dalga 9: affiliate page (30% commission, FAQ, trust strip), use-cases (CollectionPage schema, 3 new cases, broken link fixes), industries (CollectionPage schema, 65 industry ItemList)
69. `7992a2d` — Dalga 10: pricing comparison (FAQ, hero benefits, bronze CTA), technology page (TechArticle schema, trust section, ordered steps)
70. `661afcf` — Sitemap: remove duplicate /tools entry
71. `3f51f0f` — OG metadata migration (5 pages to helpers) + error boundary improvements (auth/error, blog/error, global-error enhancements)
72. `43a1adc` — Contact auto-reply email template, billing page improvements, mobile nav animation with keyboard a11y, security trust badges, samples testimonials, pricing heading fix
73. `9607c61` — Dalga 9: Security, enterprise, reviews upgrades + cleanup
74. `fa087de` — Dalga 10: Blog, changelog, success stories upgrades
75. `e70f80e` — Dalga 11: Partners, careers, use-cases page upgrades
76. `49559cf` — Dalga 12: Technology, help center, why-tailorpic upgrades
77. `2e723ba` — Real before/after images, dual hero portraits, blog placeholder SVG
78. `5e6e3e8` — Visual polish: blog covers, trust badges, industry cards, toast & pricing
79. `ce3f404` — Visual polish: contact form success state, developer-api/referral/students pages
80. `7912888` — Visual polish: sample gallery, ROI slider, cost calculator, price typography
81. `b09d190` — Remove orphaned image assets (icon-192.png, og.png)
82. `52417d3` — Hero: reposition secondary portrait card for better composition
83. `fc5e03c` — Hero: remove secondary portrait overlay
84. `8f086c7` — Codebase health cleanup: dead code, unused assets, stale config (~9.3MB freed)
85. `d10ddd6` — Full-stack site audit: UX, SEO, perf, security, code quality (320 files, 5 parallel agents)
86. `6e7f249` — Update progress tracker with full-stack audit results
87. `97a7486` — Add comprehensive scaling plan for 10K, 100K, and 1M users
88. `88a3b1b` — Phase 1 infrastructure upgrades: Upstash Redis rate limiting, maxDuration, retry utility, Stripe event dedup, stuck order cron (22 files, 431 insertions)
89. `b9d925f` — Update progress tracker with Phase 1 infrastructure commits
90. `4fe3ee2` — AI Avatars category: landing page, bundle upsell, nav integration (5 files, 622 insertions)
91. `2e3ab69` — Fix pricing copy site-wide for new 6-tier package structure
92. `1c49b29` — Add GET handlers for Vercel crons + remove flat-price claims site-wide
93. `e6b8942` — Remove remaining misleading one-time/$1.99 pairings
94. `0cfeb62` — Interactive before/after slider + delivery guarantee section
95. `67471cd` — Use-case chips, plan picker, and photo prep guide
96. `a01d230` — Style showcase, speed comparison, and guarantee strip to homepage
97. `5b07596` — AI vs generic comparison and team showcase sections
98. `10ee31d` — Outfit/backdrop customizer and style rotation strip to homepage
99. `ee09c4a` — Filterable results gallery to homepage (12 portrait styles, 4 category tabs)
100. `06f88aa` — Package quiz recommender + eagerly import near-fold sections
101. `bd4b22b` — Price receipt card + style configurator to homepage
102. `bcf93c8` — Interactive Studio vs AI cost calculator with team slider
103. `a28ef5c` — Remove 14-day money-back guarantee references from marketing pages
104. `723f9e2` — Remove 14-day money-back guarantee from entire site (batch 2)
105. `7cb99b1` — Payment methods (Stripe Link), infrastructure abstraction & Plan 2/3 migration readiness

### Completed Features
- [x] Homepage results gallery — filterable portrait gallery with 12 styles across 4 categories
- [x] Outfit/backdrop customizer — interactive preview with 8 backdrops + 8 outfits
- [x] Available Styles activity feed — rotating strip showing headshot style options
- [x] AI vs Generic comparison section — side-by-side TailorPic vs ChatGPT/stock
- [x] Team showcase section — enterprise team headshots with benefits grid
- [x] Style showcase section — 6 professional style cards with gradient previews
- [x] Speed comparison section — visual timeline TailorPic vs traditional studio
- [x] Guarantee strip — delivery guarantees bar
- [x] Before/After slider — interactive image comparison component
- [x] Delivery guarantee section — timeline with trust signals
- [x] Use-case chips — "Who It's For" row on homepage
- [x] Plan picker — "Which plan fits me?" decision helper
- [x] Photo prep guide — "Good vs Bad Selfie" upload checklist
- [x] Savings highlight — ROI calculator section
- [x] AI Avatars category (12th category) with 2 packages ($15.90/30 + $24.80/50)
- [x] AI Avatars landing page (/avatars) — 9 sections, structured data, OG meta
- [x] Avatar bundle upsell in checkout flow ($8.90 upgrade from 30→50 avatars)
- [x] Footer + sitemap + header integration for avatars
- [x] Exit-intent popup with WELCOME10 promo
- [x] Email capture (card + banner variants)
- [x] Newsletter API endpoint (rate limited + Resend welcome email + Supabase storage)
- [x] Newsletter unsubscribe endpoint (HMAC token verification)
- [x] Newsletter unsubscribed confirmation page
- [x] Newsletter resubscribe support (clears unsubscribed_at)
- [x] Photo upload guidelines (dos/donts)
- [x] Dynamic imports for below-fold sections
- [x] Lazy loading for images
- [x] Font loading optimization (CSS @import → link tag)
- [x] DNS prefetch hints (Supabase, Stripe, GTM)
- [x] Reviews page rewrite (removed fabricated stats, star ratings, added disclaimer)
- [x] Trust badges rewrite (removed unverifiable claims)
- [x] Testimonials rewrite (removed fake company names, added "Representative example" labels)
- [x] Press logos component removed (fabricated press mentions)
- [x] Enterprise page: removed fabricated stats, SOC 2 claim, fake testimonial
- [x] Stats counter: "2 hrs" → "Fast Turnaround"
- [x] CTAs fixed: all new-user flows → /auth/register
- [x] Header nav: added Samples + Blog links
- [x] Sitemap cleanup (removed auth pages, all public pages covered)
- [x] Robots.txt: block /auth/ directory
- [x] Register page: redirect param support + open redirect protection
- [x] Auth callback: open redirect vulnerability fixed
- [x] Rate limiting infrastructure (in-memory Map-based)
- [x] Contact form API with Resend email + rate limiting
- [x] Contact form UI on /contact page
- [x] Contact form auto-reply email (branded HTML)
- [x] Auth route metadata (noindex, titles)
- [x] Auth layout: id="main-content" for skip-link
- [x] Gate page: id="main-content" for skip-link
- [x] Dashboard metadata (noindex, title)
- [x] Skip-to-content accessibility link
- [x] id="main-content" on 268+ pages (no duplicates)
- [x] Banned icons (Wand2) replaced with Sparkles
- [x] animate-fade-in class removed
- [x] Duplicate robots.txt removed (git rm)
- [x] GDPR: Account deletion API (full data cleanup + confirmation email)
- [x] GDPR: Data export API (JSON download)
- [x] GDPR: Cookie consent banner with manage preferences + withdraw consent
- [x] GDPR: Google Consent Mode v2 integration (default denied)
- [x] GDPR: Cookie Settings button in footer (Art. 7(3))
- [x] Settings page: real deletion + data export + confirm dialog
- [x] Setup/storage route secured (POST + Bearer token)
- [x] Supabase migration for contact_messages table
- [x] Supabase migration for newsletter_subscribers table
- [x] Supabase migration for refunded order status enum
- [x] Canonical URLs added to 6 missing pages
- [x] Homepage canonical URL
- [x] Blog index breadcrumb structured data
- [x] Organization JSON-LD schema (site-wide in layout)
- [x] 4 dashboard loading states (overview, credits, orders, gallery)
- [x] Dashboard billing/invoices page (order history, summary cards, expandable rows)
- [x] Dashboard nav: Billing + Orders links added
- [x] Dashboard /dashboard redirect to /dashboard/overview
- [x] Dashboard orders page with status filtering (All/Pending/Processing/Completed)
- [x] Branded error boundaries (global-error, not-found, dashboard/error, dashboard/not-found)
- [x] OG image routes with Manrope font loading (og-font.ts helper)
- [x] Social meta (twitter + openGraph) on blog, samples, reviews, contact, enterprise
- [x] Category pages: twitter card meta
- [x] PWA manifest.ts with real icon assets
- [x] Apple web app meta (standalone mode)
- [x] Viewport themeColor export (Next 14 pattern)
- [x] Security headers: X-XSS-Protection added to next.config.mjs
- [x] Exit-intent popup lazy-loaded (next/dynamic, ssr: false)
- [x] console.log → console.warn/info in webhooks
- [x] Centralized email templates (10 templates in emails.ts)
- [x] Newsletter welcome email centralized (removed inline HTML)
- [x] AI webhook emails centralized (photos ready + generation failed)
- [x] Account deletion confirmation email
- [x] Payment failed email template
- [x] Abandoned checkout email template
- [x] Refund confirmation email template
- [x] Stripe charge.refunded webhook handler (order status + credit deactivation)
- [x] Stripe payment_intent.payment_failed idempotency fix
- [x] OrderStatus type: added 'refunded'
- [x] Order status badge: added 'refunded' entry
- [x] Dashboard nav: startsWith active state for detail pages
- [x] Gallery page renamed to "My Gallery" with tp-* tokens
- [x] /team-headshots landing page (fixes broken links from 15+ pages)
- [x] Dashboard metadata: server wrapper pattern for settings, billing, overview, upload
- [x] Site-wide gray-* to tp-* brand token migration (103 → 8 remaining, all intentional)
- [x] Sitemap: added /team-headshots route
- [x] Footer: added enterprise, team-headshots, samples, industries links
- [x] Rate limiting: /api/ai/generate (10/hr), /api/upload (30/hr), /api/payments/checkout (15/hr), /api/account/delete (3/hr), /api/gallery/download (20/hr)
- [x] Footer restructured: 4 → 6 columns (Photo Types, Product, Free Tools, Resources, Legal, Brand)
- [x] Header nav updated: added Free Tools (/tools), Compare (/vs), removed low-value links
- [x] /accessibility page — WCAG 2.1 Level AA statement
- [x] /subprocessors page — GDPR-compliant list of 7 services
- [x] /vs hub page — comparison index for ~80 competitors
- [x] /tools page improved — featured free headshot generator card + AI photo editor
- [x] DPA synced: added 4 missing subprocessors + link to /subprocessors
- [x] Sitemap: added /accessibility, /subprocessors, /vs, /tools
- [x] Hero: CTA pulse animation, Stripe trust indicators, before/after placeholder
- [x] Pricing: removed fake urgency banner, added per-card Stripe trust, refund policy links
- [x] FAQ: 3 objection-handling entries (subscription, checkout security, likeness)
- [x] How-it-works: large step numbers, time badge, accent border, CTA button
- [x] Comparison table: 3-column rewrite (Studio vs AI vs TailorPic), bronze tint, mobile scroll
- [x] CTA banner: new headline, trust line, bronze gradient + glow + dot pattern
- [x] Trust badges: grid card layout (rounded-tp-card, border-tp-line, icon circles)
- [x] Pricing: Product JSON-LD schema with AggregateOffer
- [x] Samples: honest CTA, removed "Join thousands", added price info
- [x] Enterprise: "Everything Your Team Needs" checklist, fixed fabricated encryption/SSO claims
- [x] Reviews: brand tokens (rounded-tp-card, rounded-tp-button), improved CTA
- [x] About: CTAs to /auth/register, brand radii
- [x] Fabricated claims removed: 12× "Join thousands/hundreds" across industry/use-case/vs pages
- [x] HIPAA claims removed: 3× replaced with "Privacy-conscious" (industries, doctors pages)
- [x] FAQ refund wording: "14 days of delivery" → "14 days of your purchase" (matches refund policy)
- [x] Pricing guarantee banner: green-* hardcoded classes → tp-* brand tokens
- [x] Testimonials: enhanced card design (Quote icon, hover effects, emoji avatars, brand radii)
- [x] Stats counter: enhanced visuals (dividers, detail text, highlight lines, larger icons)
- [x] Error boundary: brand token cleanup (bg-red-100 → tp-muted/10, hover:bg-gray-900 → hover:bg-tp-ink)
- [x] Order status badge: pending/refunded gray-* → tp-paper/tp-muted tokens
- [x] Auth login page: split-screen layout with trust panel, removed disabled OAuth buttons
- [x] Auth register page: split-screen layout with trust panel, removed disabled OAuth buttons
- [x] Auth forgot-password: rounded-2xl → rounded-tp-card
- [x] Auth reset-password: rounded-2xl → rounded-tp-card
- [x] /referral page: coming-soon waitlist, how-it-works, benefits cards, FAQ (marketing route group)
- [x] /affiliate page: partner program, commission structure, how to apply (marketing route group)
- [x] Invoice download API (/api/invoices/[orderId]) with branded HTML, XSS protection
- [x] Dashboard billing: download invoice button per order
- [x] Video testimonials component (placeholder, not yet integrated)
- [x] /pricing-comparison page: 3-column comparison (Studio vs AI vs TailorPic), ROI section
- [x] /guarantee page: 14-day money-back guarantee detail, coverage, exclusions, FAQ
- [x] /use-cases hub page: 8 use-case cards linking to category pages
- [x] Homepage SEO: full openGraph, twitter card, absolute canonical URL, optimized title/description
- [x] /photo-tips page: do's/don'ts, lighting, clothing, background, camera tips
- [x] Social proof toast component (generic messages, auto-dismissing, session-only)
- [x] Before/after showcase component (gradient placeholders, 3 comparison cards)
- [x] Social proof toast integrated into root layout
- [x] Before/after showcase integrated into homepage
- [x] Footer: added Photo Tips, Pricing Comparison, Use Cases, Guarantee links
- [x] Sitemap: added /photo-tips route
- [x] Photo-tips: FAQSchema structured data with 8 Q&A entries
- [x] Samples: VideoTestimonials component integrated between quality badges and CTA
- [x] Team-headshots: volume pricing calculator (4 tiers), trusted-by-teams section (6 industries)
- [x] Team-headshots: removed duplicate pricing teaser, migrated rounded-xl → rounded-tp-card/button
- [x] /developer-api page: API for Developers marketing/waitlist, coming-soon notice
- [x] /technology page: AI technology explainer, process steps, privacy, FAQ
- [x] /integrations page: 6 integration categories, 3 partner types, all "Coming Soon"
- [x] Footer: added API, Integrations, Technology links
- [x] Sitemap: added /developer-api, /technology, /integrations routes
- [x] Pricing: 5-item FAQ section with FAQSchema structured data
- [x] Pricing: sticky comparison bar (studio $200+ vs AI $9.90)
- [x] How-it-works: "Why Choose Us" section with 4 differentiators
- [x] How-it-works: fixed refund wording, removed fabricated "thousands" claim
- [x] Enterprise: 6-item FAQSchema structured data
- [x] Enterprise: ROI calculator (team size slider, savings display)
- [x] /success-stories page: 4 representative scenario cards (startup, law firm, real estate, university)
- [x] /changelog rewrite: 5 versioned releases (v1.0-v1.5), category badges
- [x] /partners page: partner types, benefits, how-to-apply CTA
- [x] /careers page: values, no-openings state, perks
- [x] /for-teams redirect → /team-headshots (fixes 404 from blog links)
- [x] Header nav: added Industries link
- [x] Footer: added Partners, Careers links
- [x] Interactive tool demos: background-remover, headshot-resizer, resume-photo-checker
- [x] Smart quote syntax fixes across 5 files (dpa, kvkk, cookie-policy, comparison-table, success-stories)
- [x] Blog index: featured post card, category/tag filters, newsletter CTA, Blog JSON-LD
- [x] Free headshot generator: style cards, trial vs paid comparison, FAQSchema, removed fabricated claim
- [x] Samples: popular styles section, quality features, honest comparison table
- [x] CTA banner: new headline, trust points, dual CTAs
- [x] /vs hub: 80 competitors in 3 categories, search/filter, 5 differentiators
- [x] LinkedIn headshots: photo requirements, checklist, before/after, 3 scenarios, expanded FAQ
- [x] Styles page: 59 styles in 5 categories, anchor nav, most popular section
- [x] Reviews: 4 category groups, anchor pill nav, FAQ section, "Leave a Review" CTA
- [x] Enterprise: security & privacy section, implementation timeline, demo request CTA, visible FAQ
- [x] Enterprise: ROI calculator tiered pricing fix ($39/$29/$19 matching pricing tiers)
- [x] Enterprise: removed unsupported claims (unlimited members, real-time analytics, user-controlled retention)
- [x] ROI calculator: optional ctaHref/ctaLabel props
- [x] Deleted duplicate src/components/seo/ directory (unused)
- [x] Pricing: individual/team toggle, "What's included" section, trust signals strip
- [x] Contact: department selection, FAQ with schema, trust signals, response time
- [x] About: mission statement, values, commitments section, improved OG metadata
- [x] Homepage: $9.99 → $9.90 price fix, "100%" → "14-day" guarantee fix
- [x] Guarantee text: "14-day" qualifier added site-wide (guarantee-badge, trust-bar, trust-badges, hero, pricing)
- [x] OpenGraph + twitter metadata: industries, terms, privacy pages
- [x] Deleted duplicate src/app/use-cases/page.tsx (route conflict with (marketing)/use-cases)
- [x] Sitemap: added /for-teams route
- [x] Security page: structured sections, FAQSchema, removed unverifiable claims
- [x] FAQ page: category grouping with jump links, 5 new entries (17 total), FAQSchema
- [x] Hero: clearer value prop, "Get My Headshots" CTA, 3-step mini how-it-works, trust signals
- [x] Team-headshots: improved layout, Individual vs Team comparison, 4 scenarios, FAQSchema
- [x] How-it-works: "What You'll Need" section, "What You'll Get" section, time estimate strip, tips
- [x] Glossary: sticky letter index, 2-column grid, font-display headings, OG+twitter metadata
- [x] Pricing-comparison: twitter metadata, team pricing note, competitor price disclaimer
- [x] 65 industry pages: "Money-Back" → "14-Day Money-Back", rounded-2xl → rounded-tp-card, twitter metadata
- [x] Industry pages: fabricated stats → verifiable facts, $29 → $9.90 starting price, CTA → /auth/register
- [x] Free-headshot-generator: trust bar, comparison table "Free Tools vs TailorPic", CTAs → /auth/register
- [x] Samples: hero CTA, gallery CTA, rounded-tp-card/button migration
- [x] Changelog: real feature highlights (removed fabricated versions), OG+twitter metadata
- [x] Blog: branded "coming soon" empty state with navigation links
- [x] Editor hub: twitter metadata, font-display headings, rounded-tp-button icon tiles
- [x] Tools page: font-display headings, CTA → /auth/register
- [x] 142 public pages: rounded-2xl → rounded-tp-card migration complete
- [x] 217 pages: twitter metadata added (use-cases, industries, vs, editor sub-pages)
- [x] 5 marketing pages: twitter metadata (affiliate, referral, guarantee, photo-tips, editor)
- [x] 80 vs/ pages: font-display migration (h1 + h2), CTA fixes
- [x] Blog links: 69 broken /headshots and /dashboard/upload links fixed in blog.ts
- [x] 6 older industry pages: ProductSchema + FAQSchema + FAQ section added
- [x] Fabricated stats removed: lawyers (73%, 4x, 200+), real-estate (2x, 75%, 50+), ecommerce (93%, 30%)
- [x] Testimonial disclaimers added to lawyers + real-estate pages
- [x] 64 industry pages: font-extrabold → font-display font-normal on h2 headings
- [x] 91 use-cases + editor pages: font-extrabold → font-display font-normal on h1/h2
- [x] 11 legal/tools/pricing/blog pages: font-extrabold → font-display on h1
- [x] Marketing link fixes: /dashboard/upload → /auth/register in 3 components
- [x] LinkedIn use-case: removed "21x more views" fabricated stat
- [x] Instagram use-case: removed "38% more engagement" fabricated stat
- [x] vs/headshotpro: removed "3x" multiplier claim
- [x] vs/aragon: removed "60% less" unverified claim
- [x] Consultants: corrected "3+" to "11+" styles
- [x] Pricing meta: removed "52%" unverified savings claim
- [x] How-it-works: "100% satisfaction" → "14-day money-back" guarantee alignment
- [x] 37 pages: FAQSchema structured data (editor, use-cases, marketing pages)
- [x] 8 pages: BreadcrumbSchema (legal, dpa, kvkk, refund-policy, headshot-cost-calculator)
- [x] Ecommerce industry: canonical URL, OG url/images metadata
- [x] 9 vs/ competitor pages: 5-question FAQ sections with FAQSchema
- [x] (legal) layout: shared Header/Footer, proper padding
- [x] 3 legal pages: BreadcrumbSchema (cookie-policy, privacy, terms)
- [x] Blog config: fabricated stats removed (21x views, 40% conversion, 80-95% cost reduction)
- [x] Blog config: selfie count corrected (3-5 → 10-20, minimum 8)
- [x] Editor unblur-image: selfie count corrected (8-15 → 10-20)
- [x] [category] page: 3 /dashboard/upload links → /auth/register
- [x] 15 pages: Twitter card metadata added (use-cases hub, linkedin-headshots, tools, legal pages)
- [x] Video testimonials: "Real reactions" → honest description, standardized disclaimer
- [x] Blog posts: BlogPosting JSON-LD schema with author/publisher/datePublished
- [x] Blog posts: BreadcrumbSchema for individual post pages
- [x] BlogPostingSchema component exported from structured-data.tsx
- [x] Enterprise page: Service JSON-LD schema with 3-tier pricing offers
- [x] Enterprise page: trust bar (SSL/TLS, GDPR & CCPA, 30-Day Deletion, Priority Support)
- [x] Enterprise page: bronze CTAs with hover lift + focus ring
- [x] Enterprise page: encryption/GDPR FAQ entry
- [x] Team-headshots: Service JSON-LD schema with per-person pricing
- [x] Team-headshots: "Skip the Studio Day" savings comparison ($2K-$5K vs $390)
- [x] Team-headshots: trust cards (consistent look, no studio day, predictable pricing)
- [x] Affiliate page: prominent "Up to 30%" commission display
- [x] Affiliate page: trust signal strip (cookie tracking, monthly payouts, dashboard)
- [x] Affiliate page: 6-question FAQ with FAQSchema structured data
- [x] Affiliate page: buttonVariants + bronze styling CTAs
- [x] Use-cases page: CollectionPage + ItemList JSON-LD schema
- [x] Use-cases page: lucide icons per card with hover effects
- [x] Use-cases page: 3 new use cases (Graduation, Couple/Engagement, Holiday Cards)
- [x] Use-cases page: broken links fixed (/dating → /dating-photos, /real-estate → /industries/real-estate)
- [x] Industries page: CollectionPage + ItemList JSON-LD with all 65 industries
- [x] Industries page: "Don't see your profession?" CTA section
- [x] Pricing comparison: 6-question FAQ with FAQSchema
- [x] Pricing comparison: hero benefit points (price, speed, styles, guarantee)
- [x] Pricing comparison: highlighted TailorPic column with bronze tint
- [x] Pricing comparison: bronze-styled bottom CTA with glow background
- [x] Technology page: TechArticle JSON-LD structured data
- [x] Technology page: "How We Protect Your Photos" trust section
- [x] Technology page: ordered list with connecting dashed line
- [x] OG metadata migration: guarantee, linkedin-headshots, free-headshot-generator, reviews, samples/layout → helper functions
- [x] Error boundary: auth/error.tsx created with brand styling
- [x] Error boundary: blog/error.tsx created with brand styling
- [x] Error boundary: global-error.tsx enhanced with Google Fonts, error digest display
- [x] Error boundary: error.tsx enhanced with error digest reference display
- [x] Contact auto-reply: refactored to buildContactAutoReplyEmail in emails.ts
- [x] Contact auto-reply: separate try/catch, graceful Resend key handling
- [x] Billing page: "Your Plan" card showing one-time $9.90 payment info
- [x] Mobile navigation: fade + slide animation with reduced-motion support
- [x] Mobile navigation: "More" section (Reviews, Teams, FAQ, Security, About, Contact)
- [x] Mobile navigation: Escape key handler + keyboard focus handling
- [x] Mobile navigation: aria-controls/id for accessibility
- [x] Security page: trust badge pills (AES-256, GDPR/CCPA, 30-day deletion)
- [x] Samples page: Testimonials component integrated
- [x] Pricing page: FAQ heading italic removed
- [x] Contact form: gradient success card, centered checkmark, response time copy
- [x] Developer API, Referral, Students pages: enhanced layout and brand tokens
- [x] Sample gallery: emoji placeholders → SVG pattern backgrounds + Lucide icons
- [x] ROI calculator: custom branded slider (black/bronze thumb, filled track)
- [x] Cost calculator: emoji checkmarks → Lucide Check, font-extrabold → font-display
- [x] Pricing + credit packages: font-extrabold → font-display on price displays
- [x] Removed orphaned images: icon-192.png, og.png
- [x] Hero: removed secondary portrait overlay (single clean hero image)
- [x] Codebase health audit (3 parallel agents: dead code, unused assets, code quality)
- [x] Deleted 4 orphan source files (sample-gallery, language-switcher, selfie-guide, lib/i18n)
- [x] Cleaned 49 unused Lucide icon imports across 37 files
- [x] Cleaned unused imports: getClientIp (4 API routes), NEGATIVE_PROMPT, CategoryPackage, CategoryId, useCallback
- [x] Removed 'use client' from credit-packages.tsx and dashboard/not-found.tsx (no hooks)
- [x] Deleted 156 unused public/brand/tailorpic/ assets (~9.3MB freed: ads, categories, feed, stories, social, ui, duplicate logos/icons/web images)
- [x] Tailwind config cleanup: removed tailor-*, brand palette (50-950), 9 unused accent tones, 6 unused animations + keyframes, font-heading
- [x] Full-stack site audit (5 parallel agents: UX/UI, SEO, Performance, Code Quality, Security)
- [x] UX: h1/h2 typography fixed across 49 files (font-display font-normal)
- [x] UX: low-contrast text fixed (text-tp-muted/50 → text-tp-muted, 12 locations)
- [x] UX: tiny text sizes fixed (9-10px → 11px minimum)
- [x] UX: accessibility improvements (aria labels, focus rings, button types, aria-pressed)
- [x] UX: brand inconsistencies fixed (rounded-tp-dialog, border tokens)
- [x] UX: mobile social-proof-toast repositioned (no longer overlaps sticky CTA)
- [x] UX: removed "Trusted by professionals" fabricated claim from hero
- [x] SEO: fixed double brand suffix in ~57 page titles ("X | TailorPic | TailorPic")
- [x] SEO: removed root canonical '/' that made all pages canonical to homepage
- [x] SEO: normalized title lengths (≤60 char) and descriptions (120-160 char) across 283 pages
- [x] SEO: fixed expired priceValidUntil and removed irrelevant shippingDetails from JSON-LD
- [x] SEO: fixed heading hierarchy (h1→h3 jumps in 3 pages)
- [x] SEO: fixed internal links (/for-teams → /team-headshots, broken blog links)
- [x] SEO: added lang="tr" to Turkish content pages (kvkk, gate)
- [x] SEO: removed /for-teams redirect from sitemap, fixed lastModified
- [x] SEO: allowed /api/og in robots.txt for OG image crawling
- [x] SEO: added clampTitle/clampDescription helpers for blog metadata
- [x] SEO: fixed Organization logo in JSON-LD (OG image → profile-dark-512.png)
- [x] SEO: fixed JSX escaped quotes in /kvkk page (6 locations)
- [x] Perf: SocialProofToast lazy-loaded (dynamic import, ssr:false)
- [x] Perf: HeadshotModal lazy-loaded in gallery page
- [x] Perf: enterprise page SSR issue fixed (removed ssr:false from dynamic)
- [x] Perf: added decoding="async" to img elements
- [x] Perf: removed unused zustand dependency from package.json
- [x] Code Quality: centralized pricing config (src/config/pricing.ts) — marketing components use BASE_PRICE_DISPLAY
- [x] Code Quality: extracted shared CellValue component from 9 vs/ pages
- [x] Code Quality: deduplicated escapeHtml, EMAIL_RE, formatDate to src/lib/utils.ts
- [x] Security: structured logger with secret redaction (src/lib/logger.ts)
- [x] Security: CSRF guard for all cookie-authenticated POST routes (src/lib/security.ts)
- [x] Security: rate limiting added to 6 previously unlimited API routes
- [x] Security: constant-time secret comparison (safeEqual) for cron/bearer tokens
- [x] Security: environment variable validation (src/lib/env.ts)
- [x] Security: fixed information leaks (Zod error details, Supabase error messages removed from responses)
- [x] Security: fixed error swallowing in auth-callback, export, account-delete, ai-generate
- [x] Security: fixed (supabase as any) casts with proper database types
- [x] Security: replaced all console.error in API routes with structured logger
- [x] 14-day money-back guarantee removed site-wide (186 files, 2 commits)
- [x] Stripe checkout: Link (one-click) payment method enabled
- [x] Stripe checkout: phone number collection enabled
- [x] Infrastructure abstraction layer (src/lib/infra.ts) — Plan 1/2/3 auto-detection
- [x] Docker Compose: profile-based deployment (hybrid for Plan 2, full for Plan 3)
- [x] Nginx reverse proxy config (SSL, rate limiting, caching)
- [x] PostgreSQL init schema for Plan 3 self-hosted DB
- [x] Deploy script (infrastructure/deploy.sh) for Plan 1→2→3
- [x] Migration guide (infrastructure/MIGRATION-GUIDE.md) with rollback procedures
- [x] Combined Supabase migration (20241002_combined_pending.sql)
- [x] .env.example: organized by plan with all provider variables

### Backlog (Requires External Action)

#### ÖNCELİK 1 — Siteyi Tam Çalışır Hale Getirmek
- [ ] **Supabase: Combined migration çalıştır** → `gh workflow run db-migrate.yml -f mode=apply` (contact_messages, newsletter_subscribers, retry/dedup infrastructure — hepsi tek SQL'de)
- [ ] **Upstash: Redis database oluştur** → UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN al
- [ ] **Vercel: UPSTASH env vars ekle** (UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN)
- [ ] **Resend: API key oluştur** → RESEND_API_KEY olarak Vercel'e ekle + tailorpic.com domain'i doğrula
- [ ] **Stripe Dashboard: "Link" ödeme yöntemini aktif et** (Settings → Payment methods → Link)
- [ ] **Stripe Dashboard: Apple Pay & Google Pay aktif et** (Settings → Payment methods)
- [ ] **Stripe: WELCOME10 promo kodu oluştur** (10% indirim, Coupons → Create)

#### ÖNCELİK 2 — Analytics & İzleme
- [ ] Vercel env: NEXT_PUBLIC_GA_MEASUREMENT_ID (Google Analytics 4)
- [ ] Error monitoring: Sentry hesabı oluştur → DSN al

#### ÖNCELİK 3 — OAuth Sağlayıcıları
- [ ] Google OAuth: Google Cloud Console → OAuth 2.0 client → Supabase'e ekle
- [ ] Microsoft OAuth: Azure AD → App registration → Supabase'e ekle
- [ ] Apple Developer Program (user said "sonra yapalım")
- [ ] Facebook Developer App (user said "sonra yapalım")

#### ÖNCELİK 4 — Plan 2/3 Hazırlık (gelecek)
- [ ] Supabase Pro plan upgrade (ölçeklenme için)
- [ ] Sample images: gradient placeholder'lar → gerçek AI headshot örnekleri

### Performance Backlog (Optional Improvements)
- [x] credit-packages.tsx: converted to server component (removed unnecessary 'use client')
- [x] SocialProofToast: lazy-loaded with dynamic import (social-proof-toast-lazy.tsx)
- [x] HeadshotModal: lazy-loaded with dynamic import in gallery page
- [ ] Consider converting more 'use client' marketing components to server components (trust-strip, cta-banner, faq)
- [ ] StickyCTA and TrustStrip could potentially be lazy-loaded if below fold
- [x] Rate limiting upgraded to Upstash Redis (sliding window) with in-memory fallback
- [x] maxDuration configured for all 10 API routes
- [x] Vercel function memory 1024MB for AI routes
- [x] Stripe event deduplication (processed_stripe_events table)
- [x] Stuck order retry cron (every 15min, max 3 retries)
- [x] withRetry utility with exponential backoff
- [x] Migration 006: retry_count, last_retry_at, performance indexes

### Decisions for User
- Delivery time inconsistency: some pages say "about 2 hours", others "within 24 hours" — needs alignment
- Organization JSON-LD: foundingDate '2024', address 'US', sameAs social URLs — verify accuracy
- Site URL: code uses www.tailorpic.com, NEXT_PUBLIC_APP_URL may differ — verify canonical consistency
- /reviews page: self-described as "illustrative testimonials" — may need title/content review
- social-proof-toast.tsx: random "N min ago" notifications may create false activity impression
- next.config.mjs: typescript.ignoreBuildErrors and eslint.ignoreDuringBuilds are ON — build skips type/lint errors
