#!/usr/bin/env python3
"""
Google Ads RSA Creator + Keyword Updater
Uses a persistent Chrome profile to authenticate automatically.

Usage:
  python3 scripts/google-ads-create-ads.py [--ad-group smb_en|oss_en] [--step ads|keywords|both]

Steps:
  ads      - Create new RSA ads in each ad group (default)
  keywords - Pause old keywords and add new ones
  both     - Run both steps
"""

import sys
import json
import time
import argparse
import subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError

ROOT = Path(__file__).parent.parent
CAMPAIGN_DIR = ROOT / "marketing/google-ads/forgespace_br_pten_relevance_v2"
RSA_PATH = CAMPAIGN_DIR / "rsa.json"
KEYWORDS_PATH = CAMPAIGN_DIR / "keywords.csv"

CAMPAIGN_ID = "23643368321"
ADS_BASE = f"https://ads.google.com/aw"

CHROME_PROFILE = Path.home() / "Library/Application Support/Google/Chrome"


def load_rsa():
    return json.loads(RSA_PATH.read_text())


def parse_keywords():
    lines = KEYWORDS_PATH.read_text().strip().splitlines()
    headers = [h.strip() for h in lines[0].split(",")]
    rows = []
    for line in lines[1:]:
        parts = []
        cur = ""
        in_q = False
        for ch in line:
            if ch == '"':
                in_q = not in_q
            elif ch == "," and not in_q:
                parts.append(cur.strip())
                cur = ""
            else:
                cur += ch
        parts.append(cur.strip())
        rows.append(dict(zip(headers, parts)))
    return rows


def wait(page, ms=1000):
    page.wait_for_timeout(ms)


def navigate_to_ads(page, campaign_id):
    url = f"{ADS_BASE}/ads?campaignId={campaign_id}"
    print(f"  Navigating to: {url}")
    page.goto(url, wait_until="domcontentloaded", timeout=30000)
    wait(page, 4000)


def navigate_to_keywords(page, campaign_id):
    url = f"{ADS_BASE}/keywords?campaignId={campaign_id}"
    print(f"  Navigating to: {url}")
    page.goto(url, wait_until="domcontentloaded", timeout=30000)
    wait(page, 4000)


def click_create_ad(page):
    """Click the blue + button to create a new ad."""
    selectors = [
        'a[data-e2e-id="create-ad-button"]',
        'button:has-text("Criar anúncio")',
        'button:has-text("New ad")',
        '[aria-label*="Criar"]',
        ".create-button",
    ]
    for sel in selectors:
        try:
            btn = page.locator(sel).first
            if btn.count() > 0:
                btn.click(timeout=5000)
                wait(page, 2000)
                print(f"  Clicked create button: {sel}")
                return True
        except Exception:
            pass

    # Try the floating action button (blue +)
    try:
        page.locator('[data-guidedhelpid="create-entity-button"]').first.click(
            timeout=5000
        )
        wait(page, 2000)
        print("  Clicked FAB create button")
        return True
    except Exception:
        pass

    print("  WARNING: Could not find create button, taking screenshot")
    page.screenshot(
        path=str(CAMPAIGN_DIR / "artifacts/create-button-not-found.png"),
        full_page=False,
    )
    return False


def fill_rsa_form(page, ad, final_url, path1, path2):
    """Fill the RSA creation form with headlines, descriptions, and URL."""
    wait(page, 2000)

    # Fill Final URL
    url_field = page.locator(
        'input[aria-label*="URL final"], input[placeholder*="URL"], [data-e2e-id="final-url-input"]'
    ).first
    if url_field.count() > 0:
        url_field.click()
        url_field.fill(final_url)
        wait(page, 500)
        print(f"  Set final URL: {final_url[:60]}...")

    # Fill display URL paths
    for i, path_val in enumerate([path1, path2], 1):
        if path_val:
            path_field = page.locator(
                f'input[aria-label*="Caminho {i}"], input[aria-label*="Path {i}"]'
            ).first
            if path_field.count() > 0:
                path_field.fill(path_val)
                wait(page, 300)

    # Fill headlines one by one
    for i, headline in enumerate(ad["headlines"]):
        # Find the next empty headline field or click "Add headline"
        fields = page.locator(
            'input[aria-label*="Título"], input[aria-label*="Headline"]'
        )
        count = fields.count()

        if i < count:
            field = fields.nth(i)
            field.click()
            field.fill(headline)
            wait(page, 150)
        else:
            # Click "Add headline" button
            add_btn = page.locator(
                'button:has-text("Adicionar título"), button:has-text("Add headline")'
            ).first
            if add_btn.count() > 0:
                add_btn.click()
                wait(page, 500)
                fields = page.locator(
                    'input[aria-label*="Título"], input[aria-label*="Headline"]'
                )
                new_count = fields.count()
                if new_count > i:
                    fields.nth(i).fill(headline)
                    wait(page, 150)

    print(f"  Filled {len(ad['headlines'])} headlines")

    # Fill descriptions
    for i, desc in enumerate(ad["descriptions"]):
        desc_fields = page.locator(
            'textarea[aria-label*="Descrição"], textarea[aria-label*="Description"]'
        )
        count = desc_fields.count()

        if i < count:
            desc_fields.nth(i).click()
            desc_fields.nth(i).fill(desc)
            wait(page, 150)
        else:
            add_btn = page.locator(
                'button:has-text("Adicionar descrição"), button:has-text("Add description")'
            ).first
            if add_btn.count() > 0:
                add_btn.click()
                wait(page, 500)
                desc_fields = page.locator(
                    'textarea[aria-label*="Descrição"], textarea[aria-label*="Description"]'
                )
                if desc_fields.count() > i:
                    desc_fields.nth(i).fill(desc)
                    wait(page, 150)

    print(f"  Filled {len(ad['descriptions'])} descriptions")


def create_ads_for_group(page, group, campaign_id):
    """Create all ad variants for a single ad group."""
    ad_group_name = group["ad_group_name"]
    print(f"\n{'=' * 50}")
    print(f"Creating ads for: {ad_group_name}")
    print(f"{'=' * 50}")

    navigate_to_ads(page, campaign_id)

    for ad in group.get("ads", []):
        print(f"\n  Variant: {ad['variant']}")

        # Take screenshot before
        page.screenshot(
            path=str(
                CAMPAIGN_DIR / f"artifacts/before-{ad_group_name}-{ad['variant']}.png"
            ),
            full_page=False,
        )

        if not click_create_ad(page):
            print(
                f"  SKIP: Could not initiate ad creation for {ad_group_name}/{ad['variant']}"
            )
            continue

        wait(page, 2000)

        # Select RSA if prompted
        rsa_option = page.locator('text="Anúncio responsivo de pesquisa"').first
        if rsa_option.count() > 0:
            rsa_option.click()
            wait(page, 1500)
            print("  Selected: Responsive search ad")

        fill_rsa_form(
            page,
            ad,
            group["final_url"],
            group.get("display_url_path_1", ""),
            group.get("display_url_path_2", ""),
        )

        # Screenshot before saving
        page.screenshot(
            path=str(
                CAMPAIGN_DIR / f"artifacts/filled-{ad_group_name}-{ad['variant']}.png"
            ),
            full_page=True,
        )
        print(f"  Screenshot saved: filled-{ad_group_name}-{ad['variant']}.png")

        # Save the ad
        save_btn = page.locator(
            'button:has-text("Salvar"), button:has-text("Save ad")'
        ).first
        if save_btn.count() > 0:
            save_btn.click()
            wait(page, 3000)
            print(f"  SAVED: {ad_group_name}/{ad['variant']}")
        else:
            print(f"  WARNING: Save button not found — manual save required")
            page.screenshot(
                path=str(
                    CAMPAIGN_DIR
                    / f"artifacts/save-missing-{ad_group_name}-{ad['variant']}.png"
                ),
                full_page=True,
            )

        wait(page, 2000)

    print(f"\n  [MANUAL] Now pin headlines for {ad_group_name}:")
    for ad in group.get("ads", []):
        pins = ad.get("headline_pins", {})
        for pos, headlines in pins.items():
            for h in headlines:
                print(f"    Pin '{h}' → position {pos}")


def update_keywords_for_group(page, group_name, keywords, campaign_id):
    """Update keywords for a single ad group."""
    enabled = [
        k
        for k in keywords
        if k["ad_group_name"] == group_name and k["status"] == "enabled"
    ]
    print(f"\n{'=' * 50}")
    print(f"Updating keywords for: {group_name} ({len(enabled)} enabled)")
    print(f"{'=' * 50}")

    navigate_to_keywords(page, campaign_id)

    # Filter to this ad group via the filter bar
    filter_btn = page.locator(
        'button:has-text("Filtrar"), [data-guidedhelpid="filter-button"]'
    ).first
    if filter_btn.count() > 0:
        filter_btn.click()
        wait(page, 1500)

    # Select all existing keywords and pause them
    select_all = page.locator(
        'input[type="checkbox"][aria-label*="Selecionar tudo"]'
    ).first
    if select_all.count() > 0:
        select_all.check()
        wait(page, 1000)
        edit_btn = page.locator('button:has-text("Editar")').first
        if edit_btn.count() > 0:
            edit_btn.click()
            wait(page, 1000)
            pause_opt = page.locator('text="Pausar"').first
            if pause_opt.count() > 0:
                pause_opt.click()
                wait(page, 2000)
                print(f"  Paused existing keywords for {group_name}")

    # Add new keywords
    add_kw_btn = page.locator(
        'button:has-text("+"), [aria-label*="Adicionar palavra"]'
    ).first
    if add_kw_btn.count() > 0:
        add_kw_btn.click()
        wait(page, 2000)

    # Format keywords for the text input
    kw_lines = []
    for kw in enabled:
        if kw["match_type"] == "exact":
            kw_lines.append(f"[{kw['keyword']}]")
        elif kw["match_type"] == "phrase":
            kw_lines.append(f'"{kw["keyword"]}"')
        else:
            kw_lines.append(kw["keyword"])

    print(f"  Keywords to add:\n" + "\n".join(f"    {k}" for k in kw_lines))

    # Paste into keyword text area
    kw_area = page.locator(
        'textarea[aria-label*="palavra"], textarea[placeholder*="palavra"]'
    ).first
    if kw_area.count() > 0:
        kw_area.fill("\n".join(kw_lines))
        wait(page, 1000)

        save_btn = page.locator(
            'button:has-text("Salvar"), button:has-text("Save")'
        ).first
        if save_btn.count() > 0:
            save_btn.click()
            wait(page, 3000)
            print(f"  SAVED keywords for {group_name}")


def main():
    parser = argparse.ArgumentParser(
        description="Create Google Ads RSA ads and update keywords"
    )
    parser.add_argument(
        "--ad-group", choices=["smb_en", "oss_en", "both"], default="both"
    )
    parser.add_argument("--step", choices=["ads", "keywords", "both"], default="both")
    parser.add_argument("--headless", action="store_true", default=False)
    args = parser.parse_args()

    rsa = load_rsa()
    keywords = parse_keywords()

    # Ensure artifacts directory exists
    (CAMPAIGN_DIR / "artifacts").mkdir(exist_ok=True)

    print("Starting Google Ads automation...")
    print(f"  Step: {args.step}")
    print(f"  Ad groups: {args.ad_group}")
    print(f"  Headless: {args.headless}")

    with sync_playwright() as p:
        # Use persistent Chrome profile for authenticated session
        context = p.chromium.launch_persistent_context(
            user_data_dir=str(CHROME_PROFILE),
            channel="chrome",
            headless=args.headless,
            slow_mo=200,
            viewport={"width": 1400, "height": 900},
            args=["--disable-blink-features=AutomationControlled"],
        )

        page = context.pages[0] if context.pages else context.new_page()

        print(f"\nBrowser launched. Current URL: {page.url}")

        # Check if we're logged in
        if "google.com" not in page.url:
            print("Navigating to Google Ads...")
            page.goto(
                f"{ADS_BASE}/overview?campaignId={CAMPAIGN_ID}",
                wait_until="domcontentloaded",
                timeout=30000,
            )
            wait(page, 5000)

        if "accounts.google.com" in page.url or "signin" in page.url.lower():
            print("\nNOT LOGGED IN: Google Ads requires authentication.")
            print(
                "Please log in manually in the browser window, then re-run this script."
            )
            wait(page, 30000)  # Give 30 seconds to log in
            if "accounts.google.com" in page.url:
                print("Still not logged in. Exiting.")
                context.close()
                sys.exit(1)

        print(f"Logged in. URL: {page.url}")

        # Process each ad group
        groups = [g for g in rsa["ad_groups"] if g.get("status") == "enabled"]

        if args.ad_group != "both":
            groups = [g for g in groups if g["ad_group_name"] == args.ad_group]

        if args.step in ("ads", "both"):
            for group in groups:
                create_ads_for_group(page, group, CAMPAIGN_ID)

        if args.step in ("keywords", "both"):
            kw_groups = list(
                {k["ad_group_name"] for k in keywords if k["status"] == "enabled"}
            )
            if args.ad_group != "both":
                kw_groups = [args.ad_group]
            for group_name in kw_groups:
                update_keywords_for_group(page, group_name, keywords, CAMPAIGN_ID)

        print("\n" + "=" * 50)
        print("AUTOMATION COMPLETE")
        print("=" * 50)
        print("\nRequired manual steps after automation:")
        print("1. Set headline pins for each RSA ad (see pin list above)")
        print("2. Verify ad quality ratings show 'Bom' (Good)")
        print("3. Run: npm run ads:google:checkpoint")

        wait(page, 3000)
        context.close()


if __name__ == "__main__":
    main()
