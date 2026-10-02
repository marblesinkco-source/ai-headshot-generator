# CLAUDE.md — TailorPic (tailorpic.com)

Next.js 14 App Router · TypeScript · Tailwind · Supabase · Stripe · Replicate · Vercel (Hobby, auto-deploy from `main`).
Repo: `marblesinkco-source/ai-headshot-generator`. Progress log: `claude-progress.md`.

## 0. Every session starts with

```bash
./init.sh
```
It installs the `gh` CLI, shows which hosts are reachable, and prints the CI/Vercel result for HEAD.

## 1. Connectivity — what this sandbox can and cannot reach

Outbound traffic goes through a policy proxy (`/root/.ccr/README.md`). Measured on 2026-10-02:

| Host | Status | Consequence |
|---|---|---|
| `api.github.com`, `github.com` | **OK** (`GH_TOKEN` in env, repo admin) | git push/pull, CI results, workflow dispatch, release downloads |
| `registry.npmjs.org` | BLOCKED (403) | no local `npm install` → no local `tsc` / `next build` |
| `vercel.com`, `api.vercel.com` | BLOCKED | no Vercel CLI/API from here |
| `supabase.com`, `api.supabase.com`, `*.supabase.co` | BLOCKED | no direct DB/Management API from here |
| `tailorpic.com` | BLOCKED for curl/WebFetch | live checks use the **built-in browser tool** (works) |

Rules:
- A 403 from the proxy is an organization/environment network policy. **Never retry or route around it** (no mirrors, no alternate clients). Report the host instead.
- Secrets never enter this sandbox or the repo. Privileged operations run on **GitHub Actions** with repo secrets (section 3).
- `./scripts/connectivity.sh` re-measures the table; if a host becomes OK, the direct path may be used again.

## 2. Definition of done — the deploy gate (mandatory)

Vercel builds every push to `main`. `next.config.mjs` sets `typescript.ignoreBuildErrors`, so what breaks Vercel is a **runtime error during page-data collection** (e.g. indexing into an array that is shorter than expected at module scope), not a type error. Local builds are impossible here, so:

1. Before pushing anything non-trivial, run the `denetci-ajan` review on the diff (static review: module-scope code in `src/app/**/page.tsx`, config shape vs. consumers, unused/broken imports).
2. `git push origin main`
3. `scripts/deploy-status.sh --wait` — polls GitHub for
   - the **CI** check-run (`.github/workflows/ci.yml` runs `npm install`, `tsc --noEmit` (informational), `next build`), and
   - the **Vercel** commit status (Vercel posts `success`/`failure` to GitHub; no Vercel token needed).
   On CI failure it prints the error excerpt (the workflow posts it as a commit comment).
4. `RESULT: FAIL` → fix, push again, repeat. Max 3 rounds, then report.
5. `RESULT: PASS` → verify the change on the live site with the browser tool (`https://www.tailorpic.com/...`). Standing user instruction: **always verify on the live site at the end of every task.**
6. Only then report done. "Code written" ≠ done.

## 3. Privileged operations go through GitHub Actions

| Need | Command from the sandbox | Secret the owner must add (GitHub → Settings → Secrets and variables → Actions) |
|---|---|---|
| Build/typecheck | automatic on push; `gh run list -w ci.yml` / `gh run view <id>` | none |
| Supabase migrations | `gh workflow run db-migrate.yml -f mode=list` → `-f mode=apply` (first time: `-f mode=baseline` to record the already-applied files) | `SUPABASE_DB_URL` (Supabase → Project Settings → Database → Connection string, Session pooler) |
| Vercel build log | `gh workflow run vercel-logs.yml -f deployment=<dpl id or URL> -f sha=<commit>` | `VERCEL_TOKEN` (vercel.com/account/tokens) |
| CI parity with Vercel env | optional repo **Variables**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | public values, safe as Variables |

Follow a dispatched run with `gh run watch <run-id>` and read its summary with `gh run view <run-id>`.
Migration SQL lives in `src/database/migrations/` (001–006) and `supabase/migrations/`; `package.json`'s `db:migrate` points to a runner that does not exist — use the workflow.

Optional, owner-side, makes everything direct: in the Claude Code environment's **network settings**, allow `tailorpic.com`, `www.tailorpic.com`, `registry.npmjs.org`, `vercel.com`, `api.vercel.com`, `supabase.com`, `api.supabase.com`, `*.supabase.co`, and add `VERCEL_TOKEN` / `SUPABASE_ACCESS_TOKEN` as environment variables there. `./init.sh` detects this automatically.

## 4. Non-negotiable project constraints (from the owner)

- Do NOT delete auth, Stripe, Supabase, middleware, env files or existing pages for design changes.
- Keep secrets in the hosting environment; never paste them into React, public JSON, or the brand package.
- Do not deploy null routes from `category-catalog.json`.
- Do not fabricate signed-in state, user counts, ratings, reviews, or privacy claims. Portraits are AI-generated concepts, not testimonial evidence.
- No fabricated numbers, dates or sources anywhere in copy.
- Dangerous git (force push, reset --hard) and anything with cost impact: ask first.

## 5. Brand & code conventions

- Tokens: `tp-black`, `tp-ink`, `tp-bronze`, `tp-bronze-ink`, `tp-paper`, `tp-beige`, `tp-muted`, `tp-line`. Radii: `rounded-tp-card` (18px), `rounded-tp-button` (12px), `rounded-tp-dialog` (20px). No `gray-*`.
- Fonts: Manrope (UI/body), Instrument Serif via `font-display` for h1/h2 — headings use `font-display font-normal`, never `font-bold`.
- Never use `animate-fade-in`, or the `Wand2` / `Pill` icons.
- Prices are integers in cents; render with `formatPrice()`.

## 6. Pricing facts (keep every surface consistent)

Headshots ladder in `src/config/categories.ts` (order matters — some pages index it):
`TailorPic 1` $1.99/1 photo (`headshots-tailorpic1`) → `Lite` $9.90/5 (`headshots-lite`) → `Basic` $19.90/10 (`headshots-express` — ID kept for DB compatibility) → `Starter` $29.90/40 → `Professional` $49.90/80 (recommended) → `Executive` $89.90/160.
- `BASE_PRICE_CENTS` in `src/config/pricing.ts` must equal the cheapest headshots package (199). `BASE_PRICE_DISPLAY` is the site-wide "from $1.99".
- `$1.99` buys ONE photo: never pair it with "40+ photos" or call it a flat/single price; say "from $1.99" and "up to 160 photos".
- Team pricing: `TEAM_PRICES` ($39/person 5–15, $29/person 16–50).
- Entry-tier detection in UI is "cheapest package in the category", not `name === 'Express'`.

## 7. Known gotchas

- `vercel.json` crons call `/api/emails/upgrade` and `/api/cron/retry-stuck` with **GET**; route handlers must export `GET` (not only `POST`) and `dynamic = 'force-dynamic'`.
- No `package-lock.json` is committed; CI falls back to `npm install`. Commit a lockfile when npm is reachable.
- `src/app/(marketing)/pricing-comparison/page.tsx` reads `CATEGORIES.headshots.packages[0..5]` at module scope — changing the package list without updating it breaks the Vercel build (this happened on 2026-10-02).
