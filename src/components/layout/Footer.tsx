import Link from "next/link";
import { Github } from "lucide-react";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";

const FOOTER_LINKS = {
  Product: [
    {
      label: "Siza",
      href: "https://siza.forgespace.co/signup",
      external: true,
    },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Roadmap", href: "/roadmap" },
  ],
  Developers: [
    {
      label: "GitHub",
      href: "https://github.com/Forge-Space",
      external: true,
    },
    {
      label: "Documentation",
      href: "https://docs.forgespace.co/docs",
      external: true,
    },
    {
      label: "Discussions",
      href: "https://github.com/Forge-Space/siza/discussions",
      external: true,
    },
    { label: "Ecosystem", href: "/ecosystem" },
    {
      label: "npm Packages",
      href: "https://www.npmjs.com/org/forgespace",
      external: true,
    },
  ],
  Company: [
    {
      label: "Brand Guide",
      href: "https://brand.forgespace.co",
      external: true,
    },
    { label: "Enterprise", href: "/enterprise" },
    {
      label: "Contact",
      href: "mailto:hello@forgespace.co",
      external: true,
    },
  ],
};

function getFooterEvent(href: string) {
  if (href.includes("siza.forgespace.co")) {
    return FORGE_CTA_EVENTS.SIZA;
  }
  if (href.includes("docs.forgespace.co")) {
    return FORGE_CTA_EVENTS.DOCS;
  }
  if (href.includes("/discussions")) {
    return FORGE_CTA_EVENTS.COMMUNITY;
  }
  if (href.includes("github.com/Forge-Space")) {
    return FORGE_CTA_EVENTS.GITHUB;
  }
  if (href.startsWith("mailto:")) {
    return FORGE_CTA_EVENTS.CONTACT_SALES;
  }
  return undefined;
}

function getFooterTarget(href: string) {
  if (href.includes("siza.forgespace.co")) {
    return "siza";
  }
  if (href.includes("docs.forgespace.co")) {
    return "docs";
  }
  if (href.includes("/discussions")) {
    return "community";
  }
  if (href.includes("github.com/Forge-Space")) {
    return "github";
  }
  if (href.startsWith("mailto:")) {
    return "contact_sales";
  }
  return undefined;
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-mono text-forge-text-subtle tracking-[0.15em] uppercase mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                data-fs-cta-event={getFooterEvent(link.href)}
                data-fs-cta-target={getFooterTarget(link.href)}
                data-fs-cta-location={`footer_${title.toLowerCase()}_${link.label
                  .toLowerCase()
                  .replace(/\s+/g, "_")}`}
                data-fs-pass-attribution={
                  link.href.includes("siza.forgespace.co") ||
                  link.href.startsWith("mailto:")
                    ? "true"
                    : undefined
                }
                className="text-sm text-forge-text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                prefetch={false}
                className="text-sm text-forge-text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-forge-border">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              prefetch={false}
              className="font-display text-base font-bold text-foreground"
            >
              Forge Space
            </Link>
            <p className="mt-3 text-sm text-forge-text-muted leading-relaxed max-w-xs">
              Open-source Internal Developer Platform. AI generation with
              built-in governance.
            </p>
            <div className="mt-5 flex items-center gap-4">
              <a
                href="https://github.com/Forge-Space"
                target="_blank"
                rel="noopener noreferrer"
                data-fs-cta-event={FORGE_CTA_EVENTS.GITHUB}
                data-fs-cta-target="github"
                data-fs-cta-location="footer_social_github"
                className="text-forge-text-subtle transition-colors hover:text-foreground"
                aria-label="Forge Space on GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <FooterColumn key={title} title={title} links={links} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-forge-border pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-forge-text-subtle">
            &copy; {new Date().getFullYear()} Forge Space. MIT License.
          </p>
          <p className="text-xs text-forge-text-subtle">
            Built with Next.js, Tailwind CSS &amp; Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
