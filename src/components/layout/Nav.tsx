import Link from "next/link";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
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

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-forge-border bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          prefetch={false}
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
                className="rounded-md px-3 py-2 text-sm text-forge-text-muted transition-colors hover:text-foreground hover:bg-forge-surface"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                prefetch={false}
                className="rounded-md px-3 py-2 text-sm text-forge-text-muted transition-colors hover:text-foreground hover:bg-forge-surface"
              >
                {link.label}
              </Link>
            ),
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://siza.forgespace.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-forge-text-muted transition-colors hover:text-foreground"
          >
            Sign in
          </a>
          <Button href="https://siza.forgespace.co" external size="sm">
            Get Started
          </Button>
        </div>

        <details className="relative md:hidden">
          <summary
            className="list-none rounded-md p-2 text-forge-text-muted transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden"
            aria-label="Open menu"
          >
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              fill="none"
              className="h-5 w-5"
            >
              <path
                d="M3 5h14M3 10h14M3 15h14"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </summary>
          <div className="absolute right-0 top-full mt-3 w-72 rounded-lg border border-forge-border bg-background p-4 shadow-lg">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md px-3 py-2.5 text-sm text-forge-text-muted transition-colors hover:text-foreground hover:bg-forge-surface"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    prefetch={false}
                    className="rounded-md px-3 py-2.5 text-sm text-forge-text-muted transition-colors hover:text-foreground hover:bg-forge-surface"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>
            <div className="mt-3 flex flex-col gap-2 border-t border-forge-border pt-3">
              <a
                href="https://siza.forgespace.co"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md px-3 py-2.5 text-center text-sm text-forge-text-muted transition-colors hover:text-foreground hover:bg-forge-surface"
              >
                Sign in
              </a>
              <Button href="https://siza.forgespace.co" external>
                Get Started
              </Button>
            </div>
          </div>
        </details>
      </div>
    </nav>
  );
}
