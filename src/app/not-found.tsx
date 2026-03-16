import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center gap-2">
      <p className="label-mono mb-2">404</p>
      <h1 className="font-display text-4xl font-bold text-foreground mb-2">
        Page not found
      </h1>
      <p className="text-forge-text-muted max-w-sm mb-8">
        This page doesn&apos;t exist or has been moved. Here are some helpful
        links:
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="text-forge-primary hover:text-forge-primary-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)] rounded"
        >
          Home
        </Link>
        <Link
          href="/features"
          className="text-forge-primary hover:text-forge-primary-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)] rounded"
        >
          Features
        </Link>
        <Link
          href="/ecosystem"
          className="text-forge-primary hover:text-forge-primary-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)] rounded"
        >
          Ecosystem
        </Link>
        <Link
          href="/pricing"
          className="text-forge-primary hover:text-forge-primary-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)] rounded"
        >
          Pricing
        </Link>
      </div>
    </div>
  );
}
