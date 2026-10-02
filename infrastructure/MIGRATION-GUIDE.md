# TailorPic — Migration Guide

## Plan 1 → Plan 2 (Hybrid VPS)

### What changes
- Hosting: Vercel → Docker on VPS (Hetzner/OVH)
- Database: Supabase (unchanged)
- GPU/AI: Replicate (unchanged)
- Cache: Upstash → Local Redis (Docker)
- CDN: Vercel Edge → Cloudflare + Nginx

### Steps

1. **Provision VPS** (Hetzner CPX41 recommended: 8 vCPU, 16GB RAM, ~$40/mo)
2. **Install Docker** on the VPS
3. **Clone repo** and copy `.env`
4. **Set up SSL**:
   ```bash
   apt install certbot
   certbot certonly --standalone -d tailorpic.com -d www.tailorpic.com
   cp /etc/letsencrypt/live/tailorpic.com/fullchain.pem infrastructure/ssl/
   cp /etc/letsencrypt/live/tailorpic.com/privkey.pem infrastructure/ssl/
   ```
5. **Deploy**:
   ```bash
   ./infrastructure/deploy.sh plan2
   ```
6. **Update DNS** to point to VPS IP
7. **Update Stripe webhook URL** to `https://tailorpic.com/api/webhooks/stripe`
8. **Update Replicate webhook URL** if applicable

### Estimated savings: ~$80-100/mo

---

## Plan 2 → Plan 3 (Full Self-Hosted)

### What changes
- Database: Supabase → Self-hosted PostgreSQL (Docker)
- GPU/AI: Replicate → Own GPU server (RunPod/Lambda)
- Auth: Supabase Auth → NextAuth.js or custom JWT

### Steps

1. **Export Supabase data**: `pg_dump` from Supabase connection string
2. **Deploy Plan 3**:
   ```bash
   ./infrastructure/deploy.sh plan3
   ```
3. **Import data**: `pg_restore` into local PostgreSQL
4. **Set up GPU server** (RunPod A100 reserved: ~$1.14/hr)
5. **Deploy AI model** (Flux fine-tuning + inference server)
6. **Update env vars**: `INFRA_DB=postgres`, `INFRA_AI=self-hosted`, `GPU_INFERENCE_URL=...`
7. **Migrate auth** from Supabase Auth to self-hosted solution
8. **Set up monitoring** (Grafana + Prometheus or similar)

### Critical: Auth migration requires careful planning
- Export user sessions and password hashes
- Set up email verification flow
- Test OAuth providers (Google, Microsoft, etc.)

### Estimated savings at 1000 orders/day: ~$1,500/mo (with purchased GPU hardware)

---

## Rollback

Each plan can roll back to the previous one:
- Plan 3 → Plan 2: Point `INFRA_DB=supabase`, disable PostgreSQL container
- Plan 2 → Plan 1: Push to `main` branch (Vercel auto-deploys), update DNS back to Vercel
