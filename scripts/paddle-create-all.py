#!/usr/bin/env python3
"""Create all Paddle products and prices for TailorPic."""

import json
import os
import subprocess
import sys
import urllib.request
import urllib.error

API_KEY = os.environ.get("PADDLE_API_KEY", "")
GITHUB_REPOSITORY = os.environ.get("GITHUB_REPOSITORY", "")
GITHUB_STEP_SUMMARY = os.environ.get("GITHUB_STEP_SUMMARY", "")

BASE_URL = "https://api.paddle.com"

# Existing product for TailorPic 1
EXISTING_PRODUCT_ID = "pro_01m68s5dc6aqczq04cw6nfgxk1"

PACKAGES = [
    {
        "name": "TailorPic 1",
        "description": "1 AI professional headshot",
        "package_id": "headshots-tailorpic1",
        "amount": "699",
        "product_id": EXISTING_PRODUCT_ID,  # already exists
    },
    {
        "name": "Lite",
        "description": "5 AI professional headshots",
        "package_id": "headshots-lite",
        "amount": "990",
    },
    {
        "name": "Basic",
        "description": "10 AI professional headshots",
        "package_id": "headshots-express",
        "amount": "1990",
    },
    {
        "name": "Starter",
        "description": "40 AI professional headshots",
        "package_id": "headshots-starter",
        "amount": "2990",
    },
    {
        "name": "Professional",
        "description": "80 AI professional headshots",
        "package_id": "headshots-professional",
        "amount": "4990",
    },
    {
        "name": "Executive",
        "description": "160 AI professional headshots",
        "package_id": "headshots-executive",
        "amount": "8990",
    },
    {
        "name": "Express Headshot",
        "description": "5 instant AI headshots from 1 selfie",
        "package_id": "express-instant",
        "amount": "1990",
    },
]


def api_request(method, path, data=None):
    """Make a Paddle API request."""
    url = f"{BASE_URL}{path}"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }
    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        try:
            return e.code, json.loads(body)
        except json.JSONDecodeError:
            return e.code, {"raw": body}
    except Exception as e:
        return 0, {"error": str(e)}


def create_product(name, description, package_id):
    """Create a product and return its ID."""
    data = {
        "name": name,
        "description": description,
        "tax_category": "digital-goods",
        "custom_data": {"package_id": package_id},
    }
    print(f"  Creating product: {name}")
    code, resp = api_request("POST", "/products", data)
    print(f"  HTTP {code}")

    if code == 201 or code == 200:
        pid = resp.get("data", {}).get("id", "")
        if pid:
            print(f"  Product ID: {pid}")
            return pid

    print(f"  ERROR: {json.dumps(resp, indent=2)}")
    return None


def create_price(product_id, amount, description, package_id):
    """Create a price and return its ID."""
    data = {
        "product_id": product_id,
        "description": description,
        "unit_price": {
            "amount": amount,
            "currency_code": "USD",
        },
        "custom_data": {"package_id": package_id},
    }
    cents = int(amount)
    dollars = cents / 100
    print(f"  Creating price: ${dollars:.2f} ({amount} cents)")
    code, resp = api_request("POST", "/prices", data)
    print(f"  HTTP {code}")

    if code == 201 or code == 200:
        pid = resp.get("data", {}).get("id", "")
        if pid:
            print(f"  Price ID: {pid}")
            return pid

    print(f"  ERROR: {json.dumps(resp, indent=2)}")
    return None


def post_commit_comment(body):
    """Post a commit comment via gh CLI."""
    try:
        sha = subprocess.check_output(
            ["git", "rev-parse", "HEAD"], text=True
        ).strip()
        subprocess.run(
            [
                "gh", "api",
                f"repos/{GITHUB_REPOSITORY}/commits/{sha}/comments",
                "-f", f"body={body}",
            ],
            check=False,
            capture_output=True,
        )
    except Exception:
        pass


def main():
    print("=" * 40)
    print("  TailorPic Paddle Product Setup")
    print("=" * 40)
    print()

    if not API_KEY:
        print("ERROR: PADDLE_API_KEY not set")
        sys.exit(1)

    print(f"API key: present (length={len(API_KEY)})")
    print()

    # Test connectivity
    print("--- Testing API connectivity ---")
    code, resp = api_request("GET", "/products")
    print(f"GET /products: HTTP {code}")
    if code != 200:
        msg = f"API Error: HTTP {code} - {json.dumps(resp)[:500]}"
        print(msg)
        post_commit_comment(msg)
        sys.exit(1)
    print("API OK")
    print()

    results = {}
    fail_count = 0

    for i, pkg in enumerate(PACKAGES, 1):
        print(f"--- {i}/{len(PACKAGES)}: {pkg['name']} ---")

        # Get or create product
        product_id = pkg.get("product_id")
        if product_id:
            print(f"  Using existing product: {product_id}")
        else:
            product_id = create_product(
                pkg["name"], pkg["description"], pkg["package_id"]
            )
            if not product_id:
                fail_count += 1
                results[pkg["package_id"]] = "FAIL"
                print()
                continue

        # Create price
        price_id = create_price(
            product_id,
            pkg["amount"],
            f"{pkg['name']} - {pkg['description']}",
            pkg["package_id"],
        )
        if price_id:
            results[pkg["package_id"]] = price_id
        else:
            fail_count += 1
            results[pkg["package_id"]] = "FAIL"

        print()

    # Summary
    print("=" * 40)
    print("  SUMMARY")
    print("=" * 40)

    env_map = {
        "headshots-tailorpic1": "PADDLE_PRICE_HEADSHOTS_TAILORPIC1",
        "headshots-lite": "PADDLE_PRICE_HEADSHOTS_LITE",
        "headshots-express": "PADDLE_PRICE_HEADSHOTS_EXPRESS",
        "headshots-starter": "PADDLE_PRICE_HEADSHOTS_STARTER",
        "headshots-professional": "PADDLE_PRICE_HEADSHOTS_PROFESSIONAL",
        "headshots-executive": "PADDLE_PRICE_HEADSHOTS_EXECUTIVE",
        "express-instant": "PADDLE_PRICE_EXPRESS_INSTANT",
    }

    lines = []
    for pkg_id, env_name in env_map.items():
        val = results.get(pkg_id, "FAIL")
        line = f"{env_name}={val}"
        print(line)
        lines.append(line)

    lines.append(f"Failed: {fail_count} / {len(PACKAGES)}")
    print(f"\nFailed: {fail_count} / {len(PACKAGES)}")

    # Post as commit comment
    post_commit_comment("\n".join(lines))

    # Write step summary
    if GITHUB_STEP_SUMMARY:
        with open(GITHUB_STEP_SUMMARY, "a") as f:
            f.write("## Paddle Setup Results\n\n```\n")
            f.write("\n".join(lines))
            f.write("\n```\n")

    if fail_count > 0:
        sys.exit(1)


if __name__ == "__main__":
    main()
