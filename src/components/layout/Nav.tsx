"use client";

import Link from "next/link";
import { useState, useCallback, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { GitHubIcon } from "@/components/shared/GitHubIcon";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";

const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Startups", href: "/startups" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Docs", href: "https://github.com/Forge-Space", external: true },
];

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

function NavLinks({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname() ?? "/";

  const linkClass = (href: string) => {
    const isActive = pathname === href;
    if (mobile) {
      return isActive
        ? "relative rounded-md px-3 py-2.5 text-sm text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-forge-primary after:rounded-full"
        : "rounded-md px-3 py-2.5 text-sm text-forge-text-muted transition-colors hover:text-foreground hover:bg-forge-surface";
    }
    return isActive
      ? "relative rounded-md px-3 py-2 text-sm text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-forge-primary after:rounded-full"
      : "rounded-md px-3 py-2 text-sm text-forge-text-muted hover:text-foreground transition-colors hover:bg-forge-surface";
  };

  return (
    <>
      {NAV_LINKS.map((link) =>
        link.external ? (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onNavigate}
            data-fs-cta-event={FORGE_CTA_EVENTS.GITHUB}
            data-fs-cta-target="github"
            data-fs-cta-location={`nav_${mobile ? "mobile_" : ""}${link.label.toLowerCase()}`}
            className={
              mobile
                ? "rounded-md px-3 py-2.5 text-sm text-forge-text-muted transition-colors hover:text-foreground hover:bg-forge-surface"
                : "rounded-md px-3 py-2 text-sm text-forge-text-muted transition-colors hover:text-foreground hover:bg-forge-surface"
            }
          >
            {link.label}
          </a>
        ) : (
          <Link
            key={link.label}
            href={link.href}
            onClick={onNavigate}
            className={linkClass(link.href)}
          >
            {link.label}
          </Link>
        ),
      )}
    </>
  );
}

function NavStarBadge() {
  const [stars, setStars] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined" || navigator.webdriver) {
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 2500);

    void fetch("https://api.github.com/repos/Forge-Space/siza", {
      signal: controller.signal,
      headers: {
        Accept: "application/vnd.github+json",
      },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { stargazers_count?: number } | null) => {
        if (typeof data?.stargazers_count === "number" && data.stargazers_count > 0) {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {})
      .finally(() => window.clearTimeout(timeout));

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return (
    <a
      href="https://github.com/Forge-Space"
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-forge-border bg-forge-surface text-xs text-forge-text-muted hover:border-forge-border-hover hover:text-foreground transition-all"
    >
      <GitHubIcon className="w-3.5 h-3.5" />
      {stars > 0 && (
        <span>{stars > 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}</span>
      )}
      <span>★</span>
    </a>
  );
}

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

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

          <div className="hidden items-center gap-1 lg:flex">
            <Suspense fallback={
              NAV_LINKS.map((link) => (
                <span
                  key={link.label}
                  className="rounded-md px-3 py-2 text-sm text-forge-text-muted"
                >
                  {link.label}
                </span>
              ))
            }>
              <NavLinks />
            </Suspense>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Suspense fallback={null}>
              <NavStarBadge />
            </Suspense>
            <a
              href="https://siza.forgespace.co"
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
              href="https://siza.forgespace.co"
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
            className="rounded-md p-2 text-forge-text-muted transition-colors hover:text-foreground lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <MobileMenu isOpen={mobileOpen} onClose={closeMobile} links={NAV_LINKS} />
    </>
  );
}
