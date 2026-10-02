#!/bin/bash
# =============================================================================
# TailorPic — VPS Deploy Script (Plan 2/3)
# =============================================================================
# Usage:
#   ./infrastructure/deploy.sh plan1    # Only app (Vercel handles hosting)
#   ./infrastructure/deploy.sh plan2    # App + Nginx (Replicate for GPU)
#   ./infrastructure/deploy.sh plan3    # App + Nginx + DB + Redis (full self-hosted)
# =============================================================================

set -euo pipefail

PLAN="${1:-plan1}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  TailorPic Deploy — $PLAN"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check .env exists
if [ ! -f .env ]; then
    echo "ERROR: .env file not found. Copy .env.example and fill in your values."
    exit 1
fi

case "$PLAN" in
    plan1)
        echo "Plan 1: Managed services (Vercel + Supabase + Replicate)"
        echo "→ Push to main branch for Vercel auto-deploy"
        echo "→ No Docker needed — Vercel handles everything"
        git push origin main
        echo "Done. Vercel will build and deploy automatically."
        ;;

    plan2)
        echo "Plan 2: Hybrid (VPS + Replicate for GPU)"
        echo "→ Building app + nginx containers..."

        # Create SSL directory if it doesn't exist
        mkdir -p infrastructure/ssl

        # Check SSL certs
        if [ ! -f infrastructure/ssl/fullchain.pem ]; then
            echo "WARNING: SSL certificates not found in infrastructure/ssl/"
            echo "Run: certbot certonly --webroot -w /var/www/certbot -d tailorpic.com -d www.tailorpic.com"
            echo "Then copy fullchain.pem and privkey.pem to infrastructure/ssl/"
        fi

        docker compose --profile hybrid build
        docker compose --profile hybrid up -d

        echo ""
        echo "Services running:"
        docker compose --profile hybrid ps
        echo ""
        echo "Next steps:"
        echo "  1. Set up SSL certificates (see WARNING above if needed)"
        echo "  2. Point DNS A record to this server's IP"
        echo "  3. Configure Stripe webhook URL to https://tailorpic.com/api/webhooks/stripe"
        ;;

    plan3)
        echo "Plan 3: Full self-hosted (VPS + own DB + Redis)"
        echo "→ Building all containers..."

        mkdir -p infrastructure/ssl backups

        if [ ! -f infrastructure/ssl/fullchain.pem ]; then
            echo "WARNING: SSL certificates not found in infrastructure/ssl/"
        fi

        docker compose --profile full build
        docker compose --profile full up -d

        echo ""
        echo "Services running:"
        docker compose --profile full ps
        echo ""
        echo "Database connection:"
        echo "  postgresql://${POSTGRES_USER:-tailorpic}:***@localhost:${DB_PORT:-5432}/${POSTGRES_DB:-tailorpic}"
        echo ""
        echo "Next steps:"
        echo "  1. Set up SSL certificates"
        echo "  2. Point DNS to this server"
        echo "  3. Run migrations: docker compose exec postgres psql -U tailorpic -d tailorpic -f /docker-entrypoint-initdb.d/01-init.sql"
        echo "  4. Configure Stripe webhook URL"
        echo "  5. Set up automated backups (cron + pg_dump)"
        ;;

    *)
        echo "Usage: $0 {plan1|plan2|plan3}"
        exit 1
        ;;
esac

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Deploy complete: $PLAN"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
