#!/usr/bin/env bash
# =============================================================================
# AI Headshot Pro - Deploy Script
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
echo "  ║       AI Headshot Pro — Deploy            ║"
echo "  ╚══════════════════════════════════════════╝"
echo -e "${NC}"

# ---- Type check ----
step "1/3  Running type check..."

npx tsc --noEmit
info "Type check passed"

# ---- Build ----
step "2/3  Building production bundle..."

npm run build
info "Build completed"

# ---- Deploy ----
step "3/3  Deploying..."

if command -v vercel &>/dev/null; then
  read -rp "Deploy to Vercel? [Y/n] " DEPLOY
  DEPLOY=${DEPLOY:-Y}

  if [[ "$DEPLOY" =~ ^[Yy]$ ]]; then
    read -rp "Production deploy? [y/N] " PROD
    PROD=${PROD:-N}

    if [[ "$PROD" =~ ^[Yy]$ ]]; then
      vercel --prod
    else
      vercel
    fi
    info "Deployed to Vercel"
  else
    info "Skipped Vercel deploy"
  fi
else
  warn "Vercel CLI not found. Install with: npm i -g vercel"
  echo ""
  echo "  Alternative deployment options:"
  echo ""
  echo "    Docker:       docker compose up -d --build"
  echo "    Manual:       Copy .next/standalone to your server"
  echo ""
fi

echo ""
echo -e "${BOLD}${GREEN}Done!${NC}"
echo ""
