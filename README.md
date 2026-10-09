# AI Headshot Pro

Professional AI-powered headshot generator -- a complete SaaS platform that lets users upload selfies and receive studio-quality professional headshots in minutes.

---

## Features

- **AI headshot generation** -- upload selfies, receive polished professional headshots
- **Multiple styles & backgrounds** -- 10 pose/attire styles, 15 background options
- **Tiered pricing** -- Starter ($29), Professional ($49), Executive ($79) packages
- **User dashboard** -- order history, gallery, favorites, bulk download as ZIP
- **Paddle payments** -- Merchant of Record, checkout overlay, webhook-driven order fulfillment
- **Supabase auth** -- email/password and OAuth signup with RLS-protected data
- **Responsive design** -- landing page, dashboard, gallery all mobile-ready
- **Provider pattern** -- swap AI, payment, email, or storage providers without touching business logic

## Tech Stack

| Layer         | Technology                  |
| ------------- | --------------------------- |
| Framework     | Next.js 14 (App Router)     |
| Language      | TypeScript                  |
| Styling       | Tailwind CSS                |
| Auth & DB     | Supabase (PostgreSQL + RLS) |
| Payments      | Paddle (Merchant of Record) |
| AI Generation | Replicate                   |
| Email         | Resend                      |
| Storage       | Supabase Storage            |
| Hosting       | Vercel / Docker / VPS       |

## Quick Start

```bash
# 1. Clone the repository
git clone <your-repo-url> ai-headshot-pro
cd ai-headshot-pro

# 2. Run the setup script
./scripts/setup.sh

# 3. Fill in .env.local with your API keys (see Environment Variables below)

# 4. Run the database migration in Supabase SQL Editor
#    (paste contents of src/database/migrations/001_initial.sql)

# 5. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in each value:

| Variable                            | Required | Description                              |
| ----------------------------------- | -------- | ---------------------------------------- |
| `NEXT_PUBLIC_APP_URL`               | Yes      | Your app URL (e.g. `https://yourapp.com`)|
| `NEXT_PUBLIC_SUPABASE_URL`          | Yes      | Supabase project URL                     |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`     | Yes      | Supabase anonymous/public key            |
| `SUPABASE_SERVICE_ROLE_KEY`         | Yes      | Supabase service role key (server only)  |
| `PADDLE_API_KEY`                    | Yes      | Paddle API key                           |
| `PADDLE_WEBHOOK_SECRET`             | Yes      | Paddle webhook signing secret            |
| `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`   | Yes      | Paddle client-side token                 |
| `NEXT_PUBLIC_PADDLE_ENV`            | No       | `sandbox` or `production` (default: sandbox) |
| `REPLICATE_API_TOKEN`               | Yes      | Replicate API token                      |
| `RESEND_API_KEY`                    | Yes      | Resend API key for transactional email   |
| `EMAIL_FROM`                        | No       | Sender address (default: noreply@...)    |

## Database Setup

1. Create a [Supabase](https://supabase.com) project.
2. Go to **SQL Editor** in the Supabase dashboard.
3. Paste the contents of `src/database/migrations/001_initial.sql` and run it.
4. Go to **Storage** and create two private buckets: `uploads` and `headshots`.
5. Copy your project URL, anon key, and service role key into `.env.local`.

The migration creates:
- `profiles` -- user profile data, auto-created on signup
- `orders` -- purchase orders with status tracking
- `uploaded_photos` -- user-uploaded training photos
- `generated_headshots` -- AI-generated results

All tables have Row Level Security (RLS) policies so users can only access their own data.

## Deployment

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
./scripts/deploy.sh
```

Or connect the repo to Vercel via the dashboard. The included `vercel.json` configures the build and sets the region to `fra1` (Frankfurt).

Set all environment variables in Vercel Dashboard > Settings > Environment Variables.

### Option 2: Docker

```bash
# Build and run
docker compose up -d --build

# View logs
docker compose logs -f

# Stop
docker compose down
```

Set environment variables in a `.env` file in the project root.

### Option 3: Self-Hosted (VPS)

```bash
# Build standalone output
npm run build

# The standalone build is in .next/standalone
# Copy .next/standalone, .next/static, and public to your server

# Run
NODE_ENV=production node .next/standalone/server.js
```

Use a reverse proxy (nginx, Caddy) to terminate TLS and forward to port 3000.

## Architecture

```
src/
  app/                    # Next.js App Router pages and API routes
    api/
      ai/                 # AI generation + webhook endpoints
      payments/            # Paddle checkout session creation
      webhooks/paddle/     # Paddle webhook handler (active)
      webhooks/stripe/     # Legacy Stripe webhook handler (deprecated)
      gallery/             # Gallery data + download + favorites
      upload/              # Photo upload endpoint
    auth/                  # Login, register, OAuth callback
    dashboard/             # Protected user dashboard pages
  components/
    dashboard/             # Dashboard-specific components
    marketing/             # Landing page sections
    ui/                    # Reusable UI primitives (Button, Card, Badge)
  config/                  # Site metadata, packages, AI prompt config
  core/                    # Provider-pattern service layer
    ai/                    # AI provider interface + Replicate implementation
    email/                 # Email provider interface + Resend implementation
    payments/              # Payment provider interface + Paddle implementation
    storage/               # Storage provider interface + Supabase implementation
  database/
    migrations/            # SQL migration files for Supabase
  lib/
    supabase/              # Supabase client (browser, server, middleware)
    utils.ts               # Shared utilities (cn, formatters)
  types/                   # Shared TypeScript types
```

### Provider Pattern

Each external service (AI, payments, email, storage) follows the same pattern:

```
core/<service>/
  types.ts      # Interface definition
  index.ts      # Factory function that returns the active provider
  providers/
    <name>.ts   # Concrete implementation
```

This makes it straightforward to swap providers without modifying business logic.

## Adding a New AI Provider

1. Define your provider in `src/core/ai/providers/<name>.ts`:

```typescript
import type { AIProvider } from '../types';

export const myProvider: AIProvider = {
  async generateHeadshots(input) {
    // Call your AI API here
    // Return an array of image URLs
  },
  async checkStatus(jobId) {
    // Return the current job status
  },
};
```

2. Register it in `src/core/ai/index.ts`:

```typescript
import { myProvider } from './providers/my-provider';

export function getAIProvider(): AIProvider {
  if (process.env.AI_PROVIDER === 'my-provider') {
    return myProvider;
  }
  return replicateProvider; // default
}
```

## Adding a New Payment Provider

Follow the same pattern under `src/core/payments/`:

1. Implement the `PaymentProvider` interface in `providers/<name>.ts`.
2. Update the factory in `index.ts` to return it based on config.
3. Add any new environment variables to `.env.example`.

## Scripts

| Command                | Description                                  |
| ---------------------- | -------------------------------------------- |
| `npm run dev`          | Start development server                     |
| `npm run build`        | Production build                             |
| `npm run start`        | Start production server                      |
| `npm run lint`         | Run ESLint                                   |
| `npm run paddle:listen`| Info on local Paddle webhook testing          |
| `./scripts/setup.sh`  | Interactive first-time setup                 |
| `./scripts/deploy.sh` | Type-check, build, and deploy                |

## License

This software is proprietary. Unauthorized copying, distribution, or modification is strictly prohibited. See your license agreement for permitted use.
