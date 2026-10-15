#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────
# TailorPic — Full System Backup
#
# Creates a snapshot of ALL three layers:
#   1. Code → Git tag (snapshot/*)
#   2. Database → GitHub Actions pg_dump (artifact)
#   3. Vercel deployment → records current production URL
#
# Usage:
#   ./scripts/full-backup.sh                     # full backup
#   ./scripts/full-backup.sh "before pricing change"  # with label
#   ./scripts/full-backup.sh --status            # check last backup
# ──────────────────────────────────────────────────────────
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# ── Status check ──────────────────────────────────────
if [[ "${1:-}" == "--status" ]]; then
  echo -e "${CYAN}═══ TailorPic Backup Status ═══${NC}"
  echo ""

  echo -e "${CYAN}Code snapshots:${NC}"
  latest_tag=$(git tag -l "snapshot/*" --sort=-creatordate | head -1 || echo "none")
  if [[ "$latest_tag" != "none" && -n "$latest_tag" ]]; then
    date=$(git log -1 --format="%ci" "$latest_tag" 2>/dev/null | cut -d' ' -f1,2 | cut -c1-16)
    echo -e "  Latest: ${GREEN}$latest_tag${NC} ($date)"
    total=$(git tag -l "snapshot/*" | wc -l | tr -d ' ')
    echo -e "  Total:  $total snapshots"
  else
    echo -e "  ${YELLOW}No snapshots yet${NC}"
  fi
  echo ""

  echo -e "${CYAN}DB backups (GitHub Actions):${NC}"
  if command -v gh &>/dev/null; then
    latest_run=$(gh run list -w "DB backup (Supabase)" -L 1 --json status,conclusion,createdAt,databaseId 2>/dev/null || echo "")
    if [[ -n "$latest_run" && "$latest_run" != "[]" ]]; then
      echo -e "  $(echo "$latest_run" | head -5)"
    else
      echo -e "  ${YELLOW}No DB backup runs found${NC}"
    fi
  else
    echo -e "  ${YELLOW}gh CLI not available${NC}"
  fi
  echo ""

  echo -e "${CYAN}Current deployment:${NC}"
  echo -e "  Commit: $(git rev-parse --short HEAD)"
  echo -e "  Branch: $(git rev-parse --abbrev-ref HEAD)"
  echo -e "  Site:   https://www.tailorpic.com"
  exit 0
fi

# ── Full backup ───────────────────────────────────────
LABEL="${1:-}"
echo -e "${CYAN}═══ TailorPic Full System Backup ═══${NC}"
echo ""

# Step 1: Code snapshot
echo -e "${CYAN}[1/3] Creating code snapshot...${NC}"
if ./scripts/backup.sh "${LABEL:-}"; then
  echo -e "${GREEN}  ✓ Code snapshot created${NC}"
else
  echo -e "${RED}  ✗ Code snapshot failed (uncommitted changes?)${NC}"
  echo -e "  Run: git add -A && git commit -m 'checkpoint' first"
fi
echo ""

# Step 2: Database backup
echo -e "${CYAN}[2/3] Triggering database backup...${NC}"
if command -v gh &>/dev/null; then
  if gh workflow run db-backup.yml 2>/dev/null; then
    echo -e "${GREEN}  ✓ DB backup workflow triggered${NC}"
    echo -e "  Monitor: gh run list -w 'DB backup (Supabase)' -L 1"
    echo -e "  Download: gh run download <run-id> -n db-backup"
  else
    echo -e "${YELLOW}  ⚠ DB backup failed — SUPABASE_DB_URL secret may not be set${NC}"
    echo -e "  Setup: GitHub → Settings → Secrets → SUPABASE_DB_URL"
  fi
else
  echo -e "${YELLOW}  ⚠ gh CLI not available${NC}"
fi
echo ""

# Step 3: Record deployment state
echo -e "${CYAN}[3/3] Recording deployment state...${NC}"
DEPLOY_SHA=$(git rev-parse --short HEAD)
DEPLOY_DATE=$(date -u +"%Y-%m-%d %H:%M UTC")
echo -e "${GREEN}  ✓ Current production: ${DEPLOY_SHA} (${DEPLOY_DATE})${NC}"
echo -e "  Vercel rollback: vercel.com → Deployments → find ${DEPLOY_SHA} → Promote"
echo ""

echo -e "${GREEN}═══ Backup Complete ═══${NC}"
echo ""
echo -e "Recovery options:"
echo -e "  Code:   ./scripts/backup.sh --restore snapshot/..."
echo -e "  DB:     gh run download <run-id> -n db-backup"
echo -e "  Deploy: Vercel dashboard → Promote older deployment"
