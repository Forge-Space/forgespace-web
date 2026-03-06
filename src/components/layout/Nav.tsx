import Link from 'next/link';

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-forge-border bg-background/95 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link
        href="/"
        className="font-display text-lg font-bold text-foreground transition-colors hover:text-forge-primary"
      >
        FORGE SPACE
      </Link>
      <div className="flex items-center gap-6">
        <Link
          href="/features"
          className="text-sm text-forge-text-muted transition-colors hover:text-forge-primary"
        >
          Features
        </Link>
        <Link
          href="/ecosystem"
          className="text-sm text-forge-text-muted transition-colors hover:text-forge-primary"
        >
          Ecosystem
        </Link>
        <Link
          href="/how-it-works"
          className="text-sm text-forge-text-muted transition-colors hover:text-forge-primary"
        >
          How It Works
        </Link>
        <Link
          href="/protocol"
          className="text-sm text-forge-text-muted transition-colors hover:text-forge-primary"
        >
          Docs
        </Link>
        <Link
          href="/enterprise"
          className="text-sm text-forge-text-muted transition-colors hover:text-forge-primary"
        >
          Enterprise
        </Link>
        <Link
          href="https://siza.forgespace.co"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-forge-text-muted transition-colors hover:text-forge-primary"
        >
          Sign in
        </Link>
        <Link
          href="https://siza.forgespace.co"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-forge-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-forge-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)]"
        >
          Get started
        </Link>
      </div>
    </nav>
  );
}
