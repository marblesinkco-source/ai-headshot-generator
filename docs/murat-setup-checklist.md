# TailorPic — Murat Setup Checklist

> Generated 2026-10-30. Everything below must be configured before any product (headshots or Create a Hero) can accept real payments and generate images.

## Status Summary

| System | Code Status | Operational? | Blocker |
|--------|------------|-------------|---------|
| Marketing site (369 pages) | ✅ Done | ✅ Yes | — |
| Auth (Supabase) | ✅ Done | ✅ Yes | — |
| Dashboard UI | ✅ Done | ✅ Yes | — |
| Paddle payment code | ✅ Done | ❌ No | Missing keys + price IDs |
| AI generation (Replicate) | ✅ Done | ❌ No | Missing API token |
| Transactional emails | ✅ Done | ❌ No | Missing Resend key |
| Rate limiting | ✅ Done (fallback) | ⚠️ In-memory only | Missing Upstash keys |
| DB migrations (007-008) | ✅ Written | ❌ Not applied | Need `SUPABASE_DB_URL` verified |

---

## 1. Paddle Billing (paddle.com) — Payment Provider

### 1a. Account & API Keys

| What | Where to get it | Where to put it (Vercel env) |
|------|----------------|------------------------------|
| API Key | Paddle → Developer Tools → Authentication | `PADDLE_API_KEY` |
| Webhook Secret | Paddle → Developer Tools → Notifications → Edit → Copy signing secret | `PADDLE_WEBHOOK_SECRET` |
| Client Token | Paddle → Developer Tools → Authentication → Client-side tokens | `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` |
| Environment | `sandbox` for testing, `production` for live | `NEXT_PUBLIC_PADDLE_ENV` |

### 1b. Webhook URL

In Paddle → Developer Tools → Notifications → New destination:
- URL: `https://www.tailorpic.com/api/webhooks/paddle`
- Events to subscribe: `transaction.completed`, `transaction.payment_failed`, `transaction.updated`, `adjustment.created`, `adjustment.updated`

### 1c. Price IDs — Create Products in Paddle

Each package needs a one-time product+price created in Paddle. The `pri_...` ID goes into a Vercel env var.

**Headshots (existing):**
| Package | Price | Env var name |
|---------|-------|-------------|
| TailorPic 1 | $6.99 | `PADDLE_PRICE_HEADSHOTS_TAILORPIC1` |
| Lite | $9.90 | `PADDLE_PRICE_HEADSHOTS_LITE` |
| Basic | $19.90 | `PADDLE_PRICE_HEADSHOTS_EXPRESS` |
| Starter | $29.90 | `PADDLE_PRICE_HEADSHOTS_STARTER` |
| Professional | $49.90 | `PADDLE_PRICE_HEADSHOTS_PROFESSIONAL` |
| Executive | $89.90 | `PADDLE_PRICE_HEADSHOTS_EXECUTIVE` |

**Create a Hero (new — after code is deployed):**
| Package | Price | Env var name |
|---------|-------|-------------|
| Digital Storybook | ~$19.00 | `PADDLE_PRICE_HERO_DIGITAL` |

> Full list of all category price IDs is in `.env.example` (lines 31-107).

### 1d. Optional Discount Codes

| Discount | Env var |
|----------|---------|
| UPGRADE25 (25% off upgrade) | `PADDLE_DISCOUNT_UPGRADE25` |
| Avatar bundle | `PADDLE_DISCOUNT_AVATARBUNDLE` |
| Avatar 20% | `PADDLE_DISCOUNT_AVATAR20` |

---

## 2. Replicate (replicate.com) — AI Image Generation

| What | Where to get it | Where to put it (Vercel env) |
|------|----------------|------------------------------|
| API Token | replicate.com → Account → API Tokens | `REPLICATE_API_TOKEN` |
| Webhook Secret (optional) | replicate.com → Account → Webhooks | `REPLICATE_WEBHOOK_SECRET` |

**Cost estimate:**
- Instant preview (flux-pulid): ~$0.019/run, ~15s
- LoRA training (flux-dev-lora-trainer): ~$2-4/training, ~15min
- Image generation (flux-dev): ~$0.02-0.04/image
- Create a Hero storybook (16-24 pages): ~$0.30-0.50/book in AI costs

---

## 3. Resend (resend.com) — Transactional Emails

| What | Where to get it | Where to put it (Vercel env) |
|------|----------------|------------------------------|
| API Key | resend.com → API Keys | `RESEND_API_KEY` |
| From address | Must match verified domain | `EMAIL_FROM` (default: noreply@tailorpic.com) |

**Domain setup:** Add Resend's DNS records (SPF, DKIM, DMARC) to tailorpic.com DNS.

---

## 4. Upstash Redis (upstash.com) — Rate Limiting

| What | Where to get it | Where to put it (Vercel env) |
|------|----------------|------------------------------|
| REST URL | upstash.com → Create database → REST API | `UPSTASH_REDIS_REST_URL` |
| REST Token | Same page | `UPSTASH_REDIS_REST_TOKEN` |

> The code has an in-memory fallback, but it resets on each serverless cold start. Not production-ready without Upstash.

---

## 5. Supabase Database Migrations

`SUPABASE_DB_URL` was added to GitHub Actions secrets on 2026-10-15. Verify it works:

```bash
# From the Claude sandbox:
gh workflow run db-migrate.yml -f mode=list
# If it shows unapplied migrations, apply them:
gh workflow run db-migrate.yml -f mode=apply
```

**Pending migrations to verify:**
- `007_accounting_center.sql` — 17 financial tables
- `008_self_optimization.sql` — 6 analytics tables
- `20261009_paddle_migration.sql` — Paddle-specific fields
- `20261014_add_quality_score.sql` — Image quality scoring
- `20261014_add_face_restored.sql` — Face restoration tracking

---

## 6. Vercel Environment Variables — Quick Copy

All of these go in Vercel → Project Settings → Environment Variables (Production):

```
# Paddle
PADDLE_API_KEY=
PADDLE_WEBHOOK_SECRET=
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=
NEXT_PUBLIC_PADDLE_ENV=production

# Paddle Price IDs (headshots — create products first)
PADDLE_PRICE_HEADSHOTS_TAILORPIC1=pri_...
PADDLE_PRICE_HEADSHOTS_LITE=pri_...
PADDLE_PRICE_HEADSHOTS_EXPRESS=pri_...
PADDLE_PRICE_HEADSHOTS_STARTER=pri_...
PADDLE_PRICE_HEADSHOTS_PROFESSIONAL=pri_...
PADDLE_PRICE_HEADSHOTS_EXECUTIVE=pri_...

# Replicate
REPLICATE_API_TOKEN=

# Resend
RESEND_API_KEY=
EMAIL_FROM=noreply@tailorpic.com

# Upstash
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

## 7. Optional but Recommended

| Service | Purpose | Env vars |
|---------|---------|----------|
| Google Analytics | Traffic tracking | `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| PostHog | Product analytics | `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` |
| S3-compatible storage | Photo/result storage (alternative to Supabase Storage) | `S3_ENDPOINT`, `S3_REGION`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` |

---

## Priority Order

1. **Paddle** (keys + 6 headshot price IDs) — unlocks all payments
2. **Replicate** (API token) — unlocks all AI generation
3. **Resend** (API key + domain DNS) — unlocks order confirmations
4. **DB migrations** (verify + apply) — unlocks accounting center
5. **Upstash** — production-grade rate limiting
6. **Create a Hero price ID** — after storybook code is deployed

Once items 1-4 are done, the existing headshot product is fully operational. Item 6 comes after the Create a Hero code ships.
