#!/usr/bin/env bash
# =============================================================================
# AI Headshot Pro - Setup Script
# =============================================================================

set -euo pipefail

BOLD="\033[1m"
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
NC="\033[0m"

info()  { echo -e "${GREEN}[OK]${NC} $1"; }
warn()  { echo -e "${YELLOW}[!!]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }
step()  { echo -e "\n${BOLD}$1${NC}"; }

echo -e "${BOLD}"
echo "  ╔══════════════════════════════════════════╗"
echo "  ║        AI Headshot Pro — Setup            ║"
echo "  ╚══════════════════════════════════════════╝"
echo -e "${NC}"

# ---- Check Node.js ----
step "1/5  Checking Node.js version..."

if ! command -v node &>/dev/null; then
  error "Node.js is not installed. Please install Node.js 20+ from https://nodejs.org"
  exit 1
fi

NODE_MAJOR=$(node -v | sed 's/v//' | cut -d. -f1)
if [ "$NODE_MAJOR" -lt 20 ]; then
  error "Node.js 20+ is required (found $(node -v)). Please upgrade."
  exit 1
fi

info "Node.js $(node -v) detected"

# ---- Install dependencies ----
step "2/5  Installing dependencies..."

npm install
info "Dependencies installed"

# ---- Environment file ----
step "3/5  Setting up environment variables..."

if [ -f .env.local ]; then
  warn ".env.local already exists — skipping copy"
else
  cp .env.example .env.local
  info "Created .env.local from .env.example"
fi

echo ""
echo "  You need to fill in the following keys in .env.local:"
echo ""
echo "    - NEXT_PUBLIC_SUPABASE_URL"
echo "    - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "    - SUPABASE_SERVICE_ROLE_KEY"
echo "    - PADDLE_API_KEY"
echo "    - PADDLE_WEBHOOK_SECRET"
echo "    - NEXT_PUBLIC_PADDLE_CLIENT_TOKEN"
echo "    - NEXT_PUBLIC_PADDLE_ENV"
echo "    - REPLICATE_API_TOKEN"
echo "    - RESEND_API_KEY"
echo ""

read -rp "Open .env.local in your editor now? [Y/n] " OPEN_ENV
OPEN_ENV=${OPEN_ENV:-Y}

if [[ "$OPEN_ENV" =~ ^[Yy]$ ]]; then
  EDITOR=${EDITOR:-${VISUAL:-nano}}
  "$EDITOR" .env.local
fi

# ---- Database migration ----
step "4/5  Database setup..."

echo ""
echo "  Run the following SQL in your Supabase project's SQL Editor"
echo "  (Dashboard > SQL Editor > New Query):"
echo ""
echo "  ┌──────────────────────────────────────────────┐"
echo "  │  File: src/database/migrations/001_initial.sql │"
echo "  └──────────────────────────────────────────────┘"
echo ""
echo "  The migration creates the profiles, orders, uploaded_photos,"
echo "  and generated_headshots tables with RLS policies."
echo ""
read -rp "Press Enter once you have run the migration..."
info "Database setup acknowledged"

# ---- Storage bucket ----
step "5/5  Supabase Storage..."

echo ""
echo "  Create two storage buckets in Supabase (Dashboard > Storage):"
echo ""
echo "    1. 'uploads'   — Private bucket for user-uploaded photos"
echo "    2. 'headshots' — Private bucket for generated headshots"
echo ""
read -rp "Press Enter once you have created the buckets..."
info "Storage setup acknowledged"

# ---- Done ----
echo ""
echo -e "${BOLD}${GREEN}Setup complete!${NC}"
echo ""
echo "  Next steps:"
echo ""
echo "    1. Verify .env.local has all required keys filled in"
echo "    2. Run:  npm run dev"
echo "    3. Open: http://localhost:3000"
echo ""
echo "  For Paddle webhook testing locally:"
echo "    npm run paddle:listen"
echo "    (See Paddle docs for notification simulator)"
echo ""
echo "  For production deployment:"
echo "    See README.md or run: ./scripts/deploy.sh"
echo ""
