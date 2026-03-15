"use client";

import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Docs", href: "https://docs.forgespace.co/docs", external: true },
];

function getExternalNavEvent(href: string) {
  return href.includes("docs.forgespace.co")
    ? FORGE_CTA_EVENTS.DOCS
    : FORGE_CTA_EVENTS.GITHUB;
}

function getExternalNavTarget(href: string) {
  return href.includes("docs.forgespace.co") ? "docs" : "github";
}

function ForgeMonogram({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M4 20 L18 14 H56 a3 3 0 0 1 3 3 v6 a3 3 0 0 1-3 3 H18 L4 24 V20Z"
        fill="#A78BFA"
      />
      <rect x="20" y="32" width="30" height="10" rx="3" fill="#8B5CF6" />
      <rect x="14" y="48" width="40" height="14" rx="4" fill="#6D28D9" />
    </svg>
  );
}

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen, closeMobile]);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-forge-border bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <ForgeMonogram />
            <span className="font-display text-base font-bold tracking-tight text-foreground">
              Forge Space
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-fs-cta-event={getExternalNavEvent(link.href)}
                  data-fs-cta-target={getExternalNavTarget(link.href)}
                  data-fs-cta-location={`nav_${link.label.toLowerCase()}`}
                  className="rounded-md px-3 py-2 text-sm text-forge-text-muted transition-colors hover:text-foreground hover:bg-forge-surface"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm text-forge-text-muted transition-colors hover:text-foreground hover:bg-forge-surface"
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="https://siza.forgespace.co/signin"
              target="_blank"
              rel="noopener noreferrer"
              data-fs-cta-event={FORGE_CTA_EVENTS.SIZA}
              data-fs-cta-target="siza"
              data-fs-cta-location="nav_signin_desktop"
              data-fs-pass-attribution="true"
              className="text-sm text-forge-text-muted transition-colors hover:text-foreground"
            >
              Sign in
            </a>
            <Button
              href="https://siza.forgespace.co/signup"
              external
              size="sm"
              ctaEvent={FORGE_CTA_EVENTS.SIZA}
              ctaTarget="siza"
              ctaLocation="nav_get_started_desktop"
              passAttribution
            >
              Get Started
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-md p-2 text-forge-text-muted transition-colors hover:text-foreground md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeMobile}
            aria-hidden
          />
          <div className="absolute right-0 top-0 h-full w-72 bg-background border-l border-forge-border p-6 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <span className="font-display text-base font-bold text-foreground">
                Forge Space
              </span>
              <button
                type="button"
                onClick={closeMobile}
                className="rounded-md p-2 text-forge-text-muted hover:text-foreground"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobile}
                    data-fs-cta-event={getExternalNavEvent(link.href)}
                    data-fs-cta-target={getExternalNavTarget(link.href)}
                    data-fs-cta-location={`nav_mobile_${link.label.toLowerCase()}`}
                    className="rounded-md px-3 py-2.5 text-sm text-forge-text-muted transition-colors hover:text-foreground hover:bg-forge-surface"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={closeMobile}
                    className="rounded-md px-3 py-2.5 text-sm text-forge-text-muted transition-colors hover:text-foreground hover:bg-forge-surface"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>

            <div className="mt-auto flex flex-col gap-3">
              <a
                href="https://siza.forgespace.co/signin"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobile}
                data-fs-cta-event={FORGE_CTA_EVENTS.SIZA}
                data-fs-cta-target="siza"
                data-fs-cta-location="nav_signin_mobile"
                data-fs-pass-attribution="true"
                className="rounded-md px-3 py-2.5 text-sm text-center text-forge-text-muted transition-colors hover:text-foreground hover:bg-forge-surface"
              >
                Sign in
              </a>
              <Button
                href="https://siza.forgespace.co/signup"
                external
                ctaEvent={FORGE_CTA_EVENTS.SIZA}
                ctaTarget="siza"
                ctaLocation="nav_get_started_mobile"
                passAttribution
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
