import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-forge-border px-6 py-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
        <p className="text-sm text-forge-text-muted">
          The developer tools ecosystem.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            href="https://github.com/Forge-Space"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-forge-text-muted transition-colors hover:text-forge-primary"
          >
            GitHub
          </Link>
          <Link
            href="https://siza.forgespace.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-forge-text-muted transition-colors hover:text-forge-primary"
          >
            Siza
          </Link>
          <Link
            href="#"
            className="text-sm text-forge-text-muted transition-colors hover:text-forge-primary"
          >
            Docs
          </Link>
        </div>
        <p className="text-xs text-forge-text-subtle">
          © {new Date().getFullYear()} Forge Space.
        </p>
      </div>
    </footer>
  );
}
