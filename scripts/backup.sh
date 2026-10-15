#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────
# TailorPic — Snapshot & Backup Script
#
# Usage:
#   ./scripts/backup.sh                    # auto-named snapshot
#   ./scripts/backup.sh "pricing fix done" # named snapshot
#   ./scripts/backup.sh --list             # list all snapshots
#   ./scripts/backup.sh --restore <tag>    # show restore instructions
#   ./scripts/backup.sh --diff <tag>       # diff current state vs snapshot
# ──────────────────────────────────────────────────────────
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# ── List snapshots ──────────────────────────────────────
if [[ "${1:-}" == "--list" ]]; then
  echo -e "${CYAN}═══ TailorPic Snapshots ═══${NC}"
  echo ""

  tags=$(git tag -l "snapshot/*" --sort=-creatordate 2>/dev/null || true)
  if [[ -z "$tags" ]]; then
    echo -e "${YELLOW}No snapshots found. Run ./scripts/backup.sh to create one.${NC}"
    exit 0
  fi

  while IFS= read -r tag; do
    date=$(git log -1 --format="%ci" "$tag" 2>/dev/null | cut -d' ' -f1,2 | cut -c1-16)
    msg=$(git tag -n1 "$tag" 2>/dev/null | sed "s|^$tag\s*||")
    sha=$(git rev-list -1 "$tag" 2>/dev/null | cut -c1-8)

    # Check if this tag's commit is an ancestor of HEAD
    if git merge-base --is-ancestor "$tag" HEAD 2>/dev/null; then
      status="${GREEN}✓ in main${NC}"
    else
      status="${YELLOW}⚠ diverged${NC}"
    fi

    echo -e "  ${GREEN}$tag${NC}"
    echo -e "    ${date}  ${CYAN}${sha}${NC}  ${status}"
    [[ -n "$msg" ]] && echo -e "    $msg"
    echo ""
  done <<< "$tags"

  echo -e "${CYAN}Total: $(echo "$tags" | wc -l | tr -d ' ') snapshots${NC}"
  exit 0
fi

# ── Diff vs snapshot ────────────────────────────────────
if [[ "${1:-}" == "--diff" ]]; then
  tag="${2:-}"
  if [[ -z "$tag" ]]; then
    echo -e "${RED}Usage: ./scripts/backup.sh --diff <tag>${NC}"
    exit 1
  fi
  if ! git rev-parse "$tag" &>/dev/null; then
    echo -e "${RED}Tag '$tag' not found. Run --list to see available snapshots.${NC}"
    exit 1
  fi
  echo -e "${CYAN}═══ Changes since $tag ═══${NC}"
  git diff --stat "$tag"..HEAD
  echo ""
  echo -e "${CYAN}Commits since $tag:${NC}"
  git log --oneline "$tag"..HEAD
  exit 0
fi

# ── Restore instructions ───────────────────────────────
if [[ "${1:-}" == "--restore" ]]; then
  tag="${2:-}"
  if [[ -z "$tag" ]]; then
    echo -e "${RED}Usage: ./scripts/backup.sh --restore <tag>${NC}"
    exit 1
  fi
  if ! git rev-parse "$tag" &>/dev/null; then
    echo -e "${RED}Tag '$tag' not found. Run --list to see available snapshots.${NC}"
    exit 1
  fi

  sha=$(git rev-list -1 "$tag" | cut -c1-8)
  echo -e "${CYAN}═══ Restore Plan for $tag ($sha) ═══${NC}"
  echo ""
  echo -e "${YELLOW}⚠  Review the changes that would be rolled back:${NC}"
  echo ""
  git log --oneline "$tag"..HEAD 2>/dev/null || echo "  (no commits to roll back)"
  echo ""
  echo -e "${CYAN}Option A — Safe revert (new commit that undoes changes):${NC}"
  echo -e "  git revert --no-commit ${sha}..HEAD"
  echo -e "  git commit -m \"Revert to snapshot $tag\""
  echo -e "  git push origin main"
  echo ""
  echo -e "${CYAN}Option B — Branch from snapshot (keeps history):${NC}"
  echo -e "  git checkout -b restore-from-$tag $tag"
  echo -e "  # verify everything works"
  echo -e "  git checkout main"
  echo -e "  git merge restore-from-$tag"
  echo -e "  git push origin main"
  echo ""
  echo -e "${CYAN}Option C — Vercel instant rollback (no code change):${NC}"
  echo -e "  Go to vercel.com → Deployments → find the deployment for $sha"
  echo -e "  Click '...' → 'Promote to Production'"
  echo ""
  echo -e "${RED}⚠  Do NOT use 'git reset --hard' — it rewrites history and"
  echo -e "   can break Vercel's deployment chain.${NC}"
  exit 0
fi

# ── Create snapshot ─────────────────────────────────────

# Check for uncommitted changes
if ! git diff --quiet HEAD 2>/dev/null || ! git diff --cached --quiet 2>/dev/null; then
  echo -e "${RED}✗ Uncommitted changes detected. Commit or stash first.${NC}"
  echo ""
  git status --short
  exit 1
fi

# Generate tag name
DATE=$(date -u +"%Y%m%d-%H%M")
SHA=$(git rev-parse --short HEAD)
TAG="snapshot/${DATE}-${SHA}"

# Message
if [[ -n "${1:-}" ]]; then
  MSG="$1"
else
  # Auto-generate from last commit
  MSG=$(git log -1 --format="%s")
fi

# Collect metadata
BRANCH=$(git rev-parse --abbrev-ref HEAD)
COMMIT_COUNT=$(git rev-list --count HEAD)

# Create annotated tag with metadata
git tag -a "$TAG" -m "$(cat <<EOF
$MSG

Branch: $BRANCH
Commit: $(git rev-parse HEAD)
Commit #: $COMMIT_COUNT
Date: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
Files changed (last 5 commits): $(git diff --stat HEAD~5..HEAD 2>/dev/null | tail -1 || echo "N/A")
EOF
)"

# Push tag to remote
if git push origin "$TAG" 2>/dev/null; then
  PUSHED="${GREEN}✓ pushed to GitHub${NC}"
else
  PUSHED="${YELLOW}⚠ local only (push failed)${NC}"
fi

echo -e "${GREEN}═══ Snapshot Created ═══${NC}"
echo ""
echo -e "  Tag:     ${CYAN}$TAG${NC}"
echo -e "  Commit:  ${SHA} on ${BRANCH}"
echo -e "  Message: ${MSG}"
echo -e "  Remote:  ${PUSHED}"
echo ""
echo -e "${GREEN}To restore later: ./scripts/backup.sh --restore $TAG${NC}"
echo -e "To see all:       ./scripts/backup.sh --list"
