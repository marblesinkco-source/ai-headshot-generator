#!/usr/bin/env python3
"""Create all Paddle products and prices for TailorPic.

Designed to run in GitHub Actions with PADDLE_API_KEY and GH_TOKEN env vars.
Posts results as a commit comment for visibility when log downloads are blocked.
"""
import json
import os
import subprocess
import sys

try:
    from urllib.request import Request, urlopen
    from urllib.error import HTTPError
except ImportError:
    print("ERROR: urllib not available")
    sys.exit(1)

API_KEY = os.environ.get("PADDLE_API_KEY", "")
BASE_URL = "https://api.paddle.com"
EXISTING_TAILORPIC1_PRODUCT = "pro_01m68s5dc6aqczq04cw6nfgxk1"


def paddle_api(method, path, data=None):
    """Call Paddle API. Returns (http_code, response_dict)."""
    url = BASE_URL + path
    headers = {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json",
    }
    body = json.dumps(data).encode("utf-8") if data else None
    req = Request(url, data=body, headers=headers, method=method)
    try:
        resp = urlopen(req)
        return resp.status, json.loads(resp.read().decode("utf-8"))
    except HTTPError as e:
        try:
            return e.code, json.loads(e.read().decode("utf-8"))
        except Exception:
            return e.code, {}
    except Exception as e:
        return 0, {"error": str(e)}


def post_comment(text):
    """Post a commit comment via gh CLI."""
    sha = os.environ.get("GITHUB_SHA", "")
    repo = os.environ.get("GITHUB_REPOSITORY", "")
    if not sha or not repo:
        try:
            sha = subprocess.check_output(
                ["git", "rev-parse", "HEAD"], text=True, stderr=subprocess.DEVNULL
            ).strip()
        except Exception:
            return
    if not sha or not repo:
        return
    try:
        subprocess.run(
            ["gh", "api", "repos/" + repo + "/commits/" + sha + "/comments",
             "-f", "body=" + text],
            capture_output=True, text=True, timeout=30
        )
    except Exception:
        pass


# Package definitions: (name, description, package_id, price_cents, existing_product_id)
PACKAGES = [
    ("TailorPic 1", "1 AI professional headshot", "headshots-tailorpic1", "699", EXISTING_TAILORPIC1_PRODUCT),
    ("Lite", "5 AI professional headshots", "headshots-lite", "990", ""),
    ("Basic", "10 AI professional headshots", "headshots-express", "1990", ""),
    ("Starter", "40 AI professional headshots", "headshots-starter", "2990", ""),
    ("Professional", "80 AI professional headshots", "headshots-professional", "4990", ""),
    ("Executive", "160 AI professional headshots", "headshots-executive", "8990", ""),
    ("Express Headshot", "5 instant AI headshots from 1 selfie", "express-instant", "1990", ""),
]

ENV_MAP = {
    "headshots-tailorpic1": "PADDLE_PRICE_HEADSHOTS_TAILORPIC1",
    "headshots-lite": "PADDLE_PRICE_HEADSHOTS_LITE",
    "headshots-express": "PADDLE_PRICE_HEADSHOTS_EXPRESS",
    "headshots-starter": "PADDLE_PRICE_HEADSHOTS_STARTER",
    "headshots-professional": "PADDLE_PRICE_HEADSHOTS_PROFESSIONAL",
    "headshots-executive": "PADDLE_PRICE_HEADSHOTS_EXECUTIVE",
    "express-instant": "PADDLE_PRICE_EXPRESS_INSTANT",
}


def main():
    print("=== TailorPic Paddle Product Setup ===")
    post_comment("Script started")

    if not API_KEY:
        msg = "FAIL: PADDLE_API_KEY not set"
        print(msg)
        post_comment(msg)
        sys.exit(1)

    print("API key: present (length=" + str(len(API_KEY)) + ")")

    # Test connectivity
    code, _ = paddle_api("GET", "/products")
    print("API test: HTTP " + str(code))
    if code != 200:
        msg = "FAIL: API returned " + str(code)
        print(msg)
        post_comment(msg)
        sys.exit(1)
    print("API OK")

    # Archive duplicate TailorPic 1 prices (keep first, archive rest)
    KEEP_PRICE = "pri_01m692tcycwye6z1nb4axf130p"
    ARCHIVE_PRICES = [
        "pri_01m692y4r0gdtf7za9m3m48qrx",
        "pri_01m692ztvq4t75pb35ff8b3f9y",
    ]
    for pid in ARCHIVE_PRICES:
        ac, ar = paddle_api("PATCH", "/prices/" + pid, {"status": "archived"})
        if ac == 200:
            print("Archived duplicate price: " + pid)
        else:
            print("Archive " + pid + ": HTTP " + str(ac) + " (may already be archived)")

    # Check existing product details
    pc, pr = paddle_api("GET", "/products/" + EXISTING_TAILORPIC1_PRODUCT)
    if pc == 200:
        prod_data = pr.get("data", {})
        print("Existing product tax_category: " + str(prod_data.get("tax_category", "NOT SET")))

    post_comment("API OK, creating products...")

    results = {}
    # TailorPic 1 already has a price
    results["headshots-tailorpic1"] = KEEP_PRICE
    fail_count = 0

    for i, (name, desc, pkg_id, amount, existing_prod) in enumerate(PACKAGES):
        num = i + 1
        print("")
        print("--- " + str(num) + "/7: " + name + " ---")

        # Skip TailorPic 1 — already has product + price
        if pkg_id == "headshots-tailorpic1":
            print("  SKIP: already set up (price=" + KEEP_PRICE + ")")
            continue

        product_id = existing_prod
        if not product_id:
            c, r = paddle_api("POST", "/products", {
                "name": name,
                "description": desc,
                "tax_category": "standard",
                "custom_data": {"package_id": pkg_id},
            })
            product_id = r.get("data", {}).get("id", "")
            if not product_id:
                print("  FAIL product creation: HTTP " + str(c))
                print("  Response: " + json.dumps(r, indent=2)[:500])
                results[pkg_id] = "FAIL"
                fail_count += 1
                continue
            print("  Product: " + product_id)
        else:
            print("  Product (existing): " + product_id)

        c2, r2 = paddle_api("POST", "/prices", {
            "product_id": product_id,
            "description": name + " - " + desc,
            "unit_price": {"amount": amount, "currency_code": "USD"},
            "custom_data": {"package_id": pkg_id},
        })
        price_id = r2.get("data", {}).get("id", "")
        if price_id:
            print("  Price: " + price_id)
            results[pkg_id] = price_id
        else:
            print("  FAIL price creation: HTTP " + str(c2))
            print("  Response: " + json.dumps(r2, indent=2)[:500])
            results[pkg_id] = "FAIL"
            fail_count += 1

    # Build summary
    lines = []
    for pkg_id in ENV_MAP:
        env_name = ENV_MAP[pkg_id]
        val = results.get(pkg_id, "FAIL")
        lines.append(env_name + "=" + val)
    lines.append("Failed: " + str(fail_count) + "/7")

    summary = "\n".join(lines)
    print("")
    print("========================================")
    print(summary)
    print("========================================")

    post_comment(summary)

    # Step summary
    step_summary_path = os.environ.get("GITHUB_STEP_SUMMARY", "")
    if step_summary_path:
        try:
            with open(step_summary_path, "a") as f:
                f.write("## Paddle Setup Results\n```\n" + summary + "\n```\n")
        except Exception:
            pass

    if fail_count > 0:
        sys.exit(1)


if __name__ == "__main__":
    main()
