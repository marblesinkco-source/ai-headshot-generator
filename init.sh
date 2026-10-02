#!/usr/bin/env bash
# Session bootstrap for Claude Code — run at the start of EVERY session:  ./init.sh
# 1) installs the gh CLI if missing (GitHub releases are reachable; npm is not)
# 2) prints which hosts are reachable and which credentials exist
# 3) prints the CI + Vercel result of the current HEAD
set -u
cd "$(dirname "$0")"

echo "== TailorPic — session init =="
echo "repo   : $(pwd)"
echo "branch : $(git rev-parse --abbrev-ref HEAD)  head: $(git rev-parse --short HEAD)  $(git log -1 --format=%s | cut -c1-60)"
echo "dirty  : $(git status --porcelain | wc -l | tr -d ' ') uncommitted file(s)"
echo

# --- gh CLI --------------------------------------------------------------
export PATH="$HOME/.local/bin:$PATH"
if ! command -v gh >/dev/null 2>&1; then
  GH_VERSION=2.76.2
  mkdir -p "$HOME/.local/bin"
  if curl -sSL --max-time 120 -o /tmp/gh.tgz \
       "https://github.com/cli/cli/releases/download/v${GH_VERSION}/gh_${GH_VERSION}_linux_amd64.tar.gz" \
     && tar -xzf /tmp/gh.tgz -C /tmp \
     && install -m 0755 "/tmp/gh_${GH_VERSION}_linux_amd64/bin/gh" "$HOME/.local/bin/gh"; then
    echo "gh CLI : installed to ~/.local/bin (export PATH=\"\$HOME/.local/bin:\$PATH\" in new shells)"
  else
    echo "gh CLI : install failed — scripts/deploy-status.sh works with curl alone"
  fi
fi
if command -v gh >/dev/null 2>&1; then
  echo "gh CLI : $(gh --version | head -1)  (auth via GH_TOKEN env)"
fi
echo

# --- connectivity --------------------------------------------------------
bash scripts/connectivity.sh
echo

# --- local build tooling -------------------------------------------------
if [ -d node_modules ]; then
  echo "node_modules: present — you can run: npx tsc --noEmit && npm run build"
else
  echo "node_modules: ABSENT (npm registry blocked). Build & typecheck run on GitHub Actions:"
  echo "              push → scripts/deploy-status.sh --wait"
fi
echo

# --- current deploy state ------------------------------------------------
bash scripts/deploy-status.sh HEAD || true
echo
echo "Protocol: edit → commit → push → scripts/deploy-status.sh --wait → verify live in the browser tool."
echo "Never report a task as done without RESULT: PASS and a live check. See CLAUDE.md."
