#!/usr/bin/env bash
# Deploy gate: reports the GitHub Actions CI build + Vercel deployment result
# for a commit, using ONLY the GitHub API (api.github.com is reachable from the
# sandbox; vercel.com is not). Vercel posts its result as a commit status with
# context "Vercel", so no Vercel token is needed to detect a failed deploy.
#
# Usage:
#   scripts/deploy-status.sh                 # HEAD, single check
#   scripts/deploy-status.sh --wait          # HEAD, poll until PASS/FAIL (max 15 min)
#   scripts/deploy-status.sh <sha> --wait 600
#
# Exit codes: 0 PASS, 1 FAIL, 2 PENDING/timeout, 3 error.
set -uo pipefail

REPO="${GITHUB_REPOSITORY:-marblesinkco-source/ai-headshot-generator}"
TOKEN="${GH_TOKEN:-${GITHUB_TOKEN:-}}"
API="https://api.github.com/repos/${REPO}"

SHA="HEAD"; WAIT=0; MAX=900
for arg in "$@"; do
  case "$arg" in
    --wait) WAIT=1 ;;
    [0-9]*) if [ "$WAIT" = 1 ]; then MAX="$arg"; else SHA="$arg"; fi ;;
    *) SHA="$arg" ;;
  esac
done
if [ "$SHA" = "HEAD" ]; then SHA=$(git rev-parse HEAD 2>/dev/null) || { echo "not a git repo"; exit 3; }; fi
[ -n "$TOKEN" ] || { echo "No GH_TOKEN/GITHUB_TOKEN in environment"; exit 3; }
command -v jq >/dev/null || { echo "jq is required"; exit 3; }

api() { curl -sS --max-time 20 -H "Authorization: Bearer ${TOKEN}" -H "Accept: application/vnd.github+json" "${API}/$1"; }

short="${SHA:0:7}"
# Does this commit carry the CI workflow at all? (older commits do not)
if git cat-file -e "${SHA}:.github/workflows/ci.yml" 2>/dev/null; then CI_CONFIGURED=1; else CI_CONFIGURED=0; fi
start=$(date +%s)
while :; do
  # --- GitHub Actions CI (job name "build" in .github/workflows/ci.yml) ---
  ci_json=$(api "commits/${SHA}/check-runs?per_page=50")
  ci=$(jq -r '[.check_runs[]? | select(.name=="build")] | if length==0 then "none|none|" else (.[0] | "\(.status)|\(.conclusion // "pending")|\(.html_url)") end' <<<"$ci_json")
  ci_status="${ci%%|*}"; rest="${ci#*|}"; ci_conclusion="${rest%%|*}"; ci_url="${rest#*|}"
  case "${ci_status}/${ci_conclusion}" in
    completed/success)                                   CI=PASS ;;
    completed/failure|completed/cancelled|completed/timed_out|completed/action_required) CI=FAIL ;;
    none/*)                                              CI=NONE ;;
    *)                                                   CI=PENDING ;;
  esac
  if [ "$CI" = NONE ] && [ "$CI_CONFIGURED" = 0 ]; then CI="N/A"; ci_url="(workflow not present in this commit)"; fi

  # --- Vercel (commit status, context "Vercel") ---
  st_json=$(api "commits/${SHA}/status")
  vc=$(jq -r '[.statuses[]? | select(.context=="Vercel")] | if length==0 then "none||" else (.[0] | "\(.state)|\(.description // "")|\(.target_url // "")") end' <<<"$st_json")
  vc_state="${vc%%|*}"; rest="${vc#*|}"; vc_desc="${rest%%|*}"; vc_url="${rest#*|}"
  case "$vc_state" in
    success)        VC=PASS ;;
    failure|error)  VC=FAIL ;;
    none)           VC=NONE ;;
    *)              VC=PENDING ;;
  esac

  if [ "$CI" = FAIL ] || [ "$VC" = FAIL ]; then OVERALL=FAIL
  elif [ "$CI" = PASS ] && [ "$VC" = PASS ]; then OVERALL=PASS
  elif [ "$CI" = "N/A" ] && [ "$VC" = PASS ]; then OVERALL=PASS                                            # pre-CI commit: Vercel alone decides
  elif [ "$CI" = PASS ] && [ "$VC" = NONE ] && [ $(( $(date +%s) - start )) -gt 240 ]; then OVERALL=PASS   # Vercel not wired for this ref
  else OVERALL=PENDING; fi

  elapsed=$(( $(date +%s) - start ))
  if [ "$WAIT" = 1 ] && [ "$OVERALL" = PENDING ] && [ "$elapsed" -lt "$MAX" ]; then
    printf "\r[%4ss] CI=%-8s Vercel=%-8s waiting..." "$elapsed" "$CI" "$VC"
    sleep 20
    continue
  fi
  break
done
[ "$WAIT" = 1 ] && echo

echo "commit : ${short}  $(git log -1 --format=%s "${SHA}" 2>/dev/null | cut -c1-70)"
echo "CI     : ${CI}  ${ci_url}"
echo "Vercel : ${VC}  ${vc_desc}"
[ -n "$vc_url" ] && echo "         ${vc_url}"
echo "RESULT : ${OVERALL}"

if [ "$CI" = FAIL ]; then
  echo
  echo "---- CI failure excerpt (posted by the workflow as a commit comment) ----"
  api "commits/${SHA}/comments" | jq -r '[.[] | select(.body | startswith("### CI build failed"))] | last | .body // "no excerpt comment found yet"' | tail -c 8000
  echo "-------------------------------------------------------------------------"
fi
if [ "$VC" = FAIL ]; then
  echo
  echo "Vercel build failed. The CI excerpt above usually shows the same error."
  echo "For the Vercel-side log: gh workflow run vercel-logs.yml -f deployment=<dpl id or URL> -f sha=${short}"
fi

case "$OVERALL" in PASS) exit 0 ;; FAIL) exit 1 ;; *) echo "(still pending after ${elapsed}s)"; exit 2 ;; esac
