#!/bin/bash
# Create all Paddle products and prices for TailorPic
# Called by .github/workflows/paddle-setup.yml

echo "========================================"
echo "  TailorPic Paddle Product Setup"
echo "========================================"
echo ""

if [ -z "$PADDLE_API_KEY" ]; then
  echo "ERROR: PADDLE_API_KEY is not set"
  exit 1
fi
echo "API key: present (length=${#PADDLE_API_KEY})"

FAIL_COUNT=0
COMMIT_SHA=""
if command -v git &>/dev/null && [ -d .git ]; then
  COMMIT_SHA=$(git rev-parse HEAD 2>/dev/null || echo "")
fi

post_comment() {
  if [ -n "$COMMIT_SHA" ] && [ -n "$GITHUB_REPOSITORY" ] && command -v gh &>/dev/null; then
    gh api "repos/$GITHUB_REPOSITORY/commits/$COMMIT_SHA/comments" -f body="$1" 2>/dev/null || true
  fi
}

# Test connectivity
echo "--- Testing API connectivity ---"
TEST=$(curl -s -o /dev/null -w "%{http_code}" https://api.paddle.com/products \
  -H "Authorization: Bearer $PADDLE_API_KEY")
echo "GET /products: HTTP $TEST"
if [ "$TEST" != "200" ]; then
  echo "ERROR: API returned $TEST"
  FULL=$(curl -s https://api.paddle.com/products -H "Authorization: Bearer $PADDLE_API_KEY")
  echo "$FULL"
  post_comment "Paddle API Error: HTTP $TEST"
  exit 1
fi
echo "API OK"
echo ""

create_product() {
  local name=$1
  local desc=$2
  local pkg=$3
  local body
  body=$(python3 -c "import json; print(json.dumps({'name':'$name','description':'$desc','tax_category':'digital-goods','custom_data':{'package_id':'$pkg'}}))")

  local resp
  resp=$(curl -s -X POST https://api.paddle.com/products \
    -H "Authorization: Bearer $PADDLE_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$body")

  local pid
  pid=$(echo "$resp" | python3 -c "import sys,json; print(json.load(sys.stdin).get('data',{}).get('id',''))" 2>/dev/null)

  if [ -n "$pid" ]; then
    echo "$pid"
  else
    echo "FAIL"
    echo "  create_product error: $resp" >&2
  fi
}

create_price() {
  local product_id=$1
  local amount=$2
  local desc=$3
  local pkg=$4
  local body
  body=$(python3 -c "import json; print(json.dumps({'product_id':'$product_id','description':'$desc','unit_price':{'amount':'$amount','currency_code':'USD'},'custom_data':{'package_id':'$pkg'}}))")

  local resp
  resp=$(curl -s -X POST https://api.paddle.com/prices \
    -H "Authorization: Bearer $PADDLE_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$body")

  local pid
  pid=$(echo "$resp" | python3 -c "import sys,json; print(json.load(sys.stdin).get('data',{}).get('id',''))" 2>/dev/null)

  if [ -n "$pid" ]; then
    echo "$pid"
  else
    echo "FAIL"
    echo "  create_price error: $resp" >&2
  fi
}

# 1. TailorPic 1 - product already exists
echo "--- 1/7: TailorPic 1 ---"
P1_PRICE=$(create_price "pro_01m68s5dc6aqczq04cw6nfgxk1" "699" "TailorPic 1 - 1 AI headshot" "headshots-tailorpic1")
if [ "$P1_PRICE" = "FAIL" ]; then FAIL_COUNT=$((FAIL_COUNT+1)); fi
echo "  Price: $P1_PRICE"
echo ""

# 2. Lite
echo "--- 2/7: Lite ---"
P2_PROD=$(create_product "Lite" "5 AI professional headshots" "headshots-lite")
echo "  Product: $P2_PROD"
if [ "$P2_PROD" != "FAIL" ]; then
  P2_PRICE=$(create_price "$P2_PROD" "990" "Lite - 5 AI headshots" "headshots-lite")
  echo "  Price: $P2_PRICE"
else
  P2_PRICE="FAIL"
fi
if [ "$P2_PRICE" = "FAIL" ]; then FAIL_COUNT=$((FAIL_COUNT+1)); fi
echo ""

# 3. Basic
echo "--- 3/7: Basic ---"
P3_PROD=$(create_product "Basic" "10 AI professional headshots" "headshots-express")
echo "  Product: $P3_PROD"
if [ "$P3_PROD" != "FAIL" ]; then
  P3_PRICE=$(create_price "$P3_PROD" "1990" "Basic - 10 AI headshots" "headshots-express")
  echo "  Price: $P3_PRICE"
else
  P3_PRICE="FAIL"
fi
if [ "$P3_PRICE" = "FAIL" ]; then FAIL_COUNT=$((FAIL_COUNT+1)); fi
echo ""

# 4. Starter
echo "--- 4/7: Starter ---"
P4_PROD=$(create_product "Starter" "40 AI professional headshots" "headshots-starter")
echo "  Product: $P4_PROD"
if [ "$P4_PROD" != "FAIL" ]; then
  P4_PRICE=$(create_price "$P4_PROD" "2990" "Starter - 40 AI headshots" "headshots-starter")
  echo "  Price: $P4_PRICE"
else
  P4_PRICE="FAIL"
fi
if [ "$P4_PRICE" = "FAIL" ]; then FAIL_COUNT=$((FAIL_COUNT+1)); fi
echo ""

# 5. Professional
echo "--- 5/7: Professional ---"
P5_PROD=$(create_product "Professional" "80 AI professional headshots" "headshots-professional")
echo "  Product: $P5_PROD"
if [ "$P5_PROD" != "FAIL" ]; then
  P5_PRICE=$(create_price "$P5_PROD" "4990" "Professional - 80 AI headshots" "headshots-professional")
  echo "  Price: $P5_PRICE"
else
  P5_PRICE="FAIL"
fi
if [ "$P5_PRICE" = "FAIL" ]; then FAIL_COUNT=$((FAIL_COUNT+1)); fi
echo ""

# 6. Executive
echo "--- 6/7: Executive ---"
P6_PROD=$(create_product "Executive" "160 AI professional headshots" "headshots-executive")
echo "  Product: $P6_PROD"
if [ "$P6_PROD" != "FAIL" ]; then
  P6_PRICE=$(create_price "$P6_PROD" "8990" "Executive - 160 AI headshots" "headshots-executive")
  echo "  Price: $P6_PRICE"
else
  P6_PRICE="FAIL"
fi
if [ "$P6_PRICE" = "FAIL" ]; then FAIL_COUNT=$((FAIL_COUNT+1)); fi
echo ""

# 7. Express Headshot
echo "--- 7/7: Express Headshot ---"
P7_PROD=$(create_product "Express Headshot" "5 instant AI headshots from 1 selfie" "express-instant")
echo "  Product: $P7_PROD"
if [ "$P7_PROD" != "FAIL" ]; then
  P7_PRICE=$(create_price "$P7_PROD" "1990" "Express Headshot - 5 instant headshots" "express-instant")
  echo "  Price: $P7_PRICE"
else
  P7_PRICE="FAIL"
fi
if [ "$P7_PRICE" = "FAIL" ]; then FAIL_COUNT=$((FAIL_COUNT+1)); fi
echo ""

# Summary
SUMMARY="PADDLE_PRICE_HEADSHOTS_TAILORPIC1=${P1_PRICE:-FAIL}
PADDLE_PRICE_HEADSHOTS_LITE=${P2_PRICE:-FAIL}
PADDLE_PRICE_HEADSHOTS_EXPRESS=${P3_PRICE:-FAIL}
PADDLE_PRICE_HEADSHOTS_STARTER=${P4_PRICE:-FAIL}
PADDLE_PRICE_HEADSHOTS_PROFESSIONAL=${P5_PRICE:-FAIL}
PADDLE_PRICE_HEADSHOTS_EXECUTIVE=${P6_PRICE:-FAIL}
PADDLE_PRICE_EXPRESS_INSTANT=${P7_PRICE:-FAIL}
Failed: $FAIL_COUNT / 7"

echo "========================================"
echo "  SUMMARY"
echo "========================================"
echo "$SUMMARY"

# Post as commit comment
post_comment "$SUMMARY"

# Write to step summary if available
if [ -n "$GITHUB_STEP_SUMMARY" ]; then
  {
    echo "## Paddle Setup Results"
    echo '```'
    echo "$SUMMARY"
    echo '```'
  } >> "$GITHUB_STEP_SUMMARY"
fi

if [ "$FAIL_COUNT" -gt 0 ]; then
  exit 1
fi
