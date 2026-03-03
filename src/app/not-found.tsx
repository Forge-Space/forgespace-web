import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
      <p className="text-forge-text-muted mb-6">Page not found</p>
      <Link
        href="/"
        className="text-forge-primary hover:text-forge-primary-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)] rounded"
      >
        Back to home
      </Link>
    </div>
  );
}
