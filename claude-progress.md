# TailorPic — Progress Tracker

## Last Session: 2026-10-01

### Commits (this session)
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

### Completed Features
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

### Backlog (Requires External Action)
- [ ] Stripe: Create WELCOME10 promo code (10% off) — needs Stripe dashboard/API key
- [ ] Vercel env: Set NEXT_PUBLIC_GA_MEASUREMENT_ID for GA4
- [ ] Supabase: Run contact_messages migration SQL
- [ ] Supabase: Run newsletter_subscribers migration SQL
- [ ] Supabase: Run 005_add_refunded_status.sql migration
- [ ] Apple Developer Program setup + Supabase Apple provider (user said "sonra yapalım")
- [ ] Facebook Developer App + Supabase Facebook provider (user said "sonra yapalım")
- [ ] Error monitoring (Sentry) — needs API key/DSN
- [ ] Resend API key setup for email functionality
- [ ] Sample images: gradient placeholders need real AI-generated examples

### Performance Backlog (Optional Improvements)
- [ ] Consider converting 'use client' marketing components to server components where possible (trust-strip, cta-banner, faq)
- [ ] StickyCTA and TrustStrip could potentially be lazy-loaded if below fold
