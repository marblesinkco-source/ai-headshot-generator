#!/usr/bin/env bash
# Shows which external hosts this Claude Code sandbox can reach.
# Egress goes through a policy proxy; a BLOCKED host is an org/environment
# network-policy decision — never route around it (see /root/.ccr/README.md).
# Always exits 0. Used by init.sh and at the start of every session.
set -u

HOSTS=(
  "api.github.com|GitHub API: CI results, deploy status, workflow dispatch"
  "github.com|GitHub: git push/pull, release downloads (gh CLI)"
  "registry.npmjs.org|npm registry: local npm install / tsc / next build"
  "api.vercel.com|Vercel API / CLI (direct)"
  "api.supabase.com|Supabase Management API / CLI (direct)"
  "tailorpic.com|Live site (curl checks; browser tool works regardless)"
)

printf "%-22s %-9s %s\n" "HOST" "STATUS" "WHAT IT UNLOCKS"
for entry in "${HOSTS[@]}"; do
  host="${entry%%|*}"
  purpose="${entry#*|}"
  # curl prints "000" and exits non-zero when the proxy rejects the CONNECT;
  # keep only the last 3 characters so a failed call can never be misread as OK.
  code=$(curl -sS -o /dev/null -w "%{http_code}" --max-time 10 "https://${host}/" 2>/dev/null; true)
  code="${code: -3}"
  case "$code" in
    000|403|407) status="BLOCKED" ;;
    *)           status="OK" ;;
  esac
  printf "%-22s %-9s %s\n" "$host" "$status" "$purpose"
done

echo
present=$(env | grep -oE '^(GH_TOKEN|GITHUB_TOKEN|VERCEL_TOKEN|SUPABASE_ACCESS_TOKEN|SUPABASE_DB_URL)=' | tr -d '=' | tr '\n' ' ')
echo "Credentials present in this sandbox (names only): ${present:-none}"
echo "Blocked hosts can only be opened in the Claude Code environment's network settings."
echo "Until then: builds/typechecks run on GitHub Actions, Vercel status is read from GitHub,"
echo "and Supabase/Vercel operations run through the workflows in .github/workflows/."
