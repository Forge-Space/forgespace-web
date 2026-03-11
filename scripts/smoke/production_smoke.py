#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import sys
import time
from dataclasses import dataclass
from pathlib import Path

from playwright.sync_api import Error, TimeoutError, sync_playwright


@dataclass(frozen=True)
class Target:
    name: str
    url: str
    anchors: tuple[str, ...]


TARGETS: tuple[Target, ...] = (
    Target(
        name="forgespace-home",
        url="https://forgespace.co",
        anchors=(
            "Generate code with AI",
            "Ship it with confidence",
            "Try Siza Free",
        ),
    ),
    Target(
        name="siza-home",
        url="https://siza.forgespace.co",
        anchors=(
            "Generate",
            "UI code with AI",
            "Start Generating Free",
        ),
    ),
)


def check_target(page, target: Target, output_dir: Path) -> dict[str, object]:
    started = time.time()
    failures: list[str] = []
    screenshot_path = ""
    status_code: int | None = None

    try:
        response = page.goto(target.url, wait_until="domcontentloaded", timeout=45000)
        status_code = response.status if response else None
        if status_code != 200:
            failures.append(f"Expected HTTP 200, got {status_code}")

        page.wait_for_load_state("networkidle", timeout=15000)

        for anchor in target.anchors:
            try:
                page.get_by_text(anchor, exact=False).first.wait_for(state="visible", timeout=10000)
            except TimeoutError:
                failures.append(f"Missing visible anchor: {anchor}")
    except (TimeoutError, Error) as exc:
        failures.append(f"Navigation/runtime error: {exc}")
    except Exception as exc:  # noqa: BLE001
        failures.append(f"Unexpected error: {exc}")

    if failures:
        screenshot_file = output_dir / f"{target.name}-failure.png"
        try:
            page.screenshot(path=str(screenshot_file), full_page=True)
            screenshot_path = str(screenshot_file)
        except Exception:  # noqa: BLE001
            screenshot_path = ""

    return {
        "name": target.name,
        "url": target.url,
        "ok": len(failures) == 0,
        "status_code": status_code,
        "duration_ms": int((time.time() - started) * 1000),
        "failures": failures,
        "screenshot": screenshot_path,
    }


def render_markdown(results: list[dict[str, object]]) -> str:
    lines = ["# Production Smoke Report", ""]
    for result in results:
        status = "PASS" if result["ok"] else "FAIL"
        lines.append(f"## {result['name']} — {status}")
        lines.append(f"- URL: {result['url']}")
        lines.append(f"- HTTP: {result['status_code']}")
        lines.append(f"- Duration: {result['duration_ms']} ms")
        failures = result["failures"]
        if failures:
            lines.append("- Failures:")
            for failure in failures:
                lines.append(f"  - {failure}")
            if result["screenshot"]:
                lines.append(f"- Screenshot: {result['screenshot']}")
        lines.append("")
    return "\n".join(lines)


def run(output_dir: Path) -> int:
    output_dir.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})

        results: list[dict[str, object]] = []
        for target in TARGETS:
            page = context.new_page()
            result = check_target(page, target, output_dir)
            results.append(result)
            page.close()

        context.close()
        browser.close()

    json_report = output_dir / "report.json"
    md_report = output_dir / "report.md"

    json_report.write_text(json.dumps({"results": results}, indent=2) + "\n", encoding="utf-8")
    md_report.write_text(render_markdown(results) + "\n", encoding="utf-8")

    failed = [result for result in results if not result["ok"]]
    if failed:
        for result in failed:
            print(f"[FAIL] {result['name']}: {', '.join(result['failures'])}")
        return 1

    for result in results:
        print(f"[PASS] {result['name']} ({result['duration_ms']} ms)")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--output-dir",
        default="artifacts/smoke",
        help="Directory for JSON/markdown reports and failure screenshots",
    )
    args = parser.parse_args()
    return run(Path(args.output_dir))


if __name__ == "__main__":
    sys.exit(main())
