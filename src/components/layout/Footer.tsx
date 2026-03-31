"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitHubIcon } from "@/components/shared/GitHubIcon";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";

interface FooterLink {
  label: string;
  labelPt?: string;
  href: string;
  external?: boolean;
}

interface FooterColumn {
  title: string;
  titlePt?: string;
  links: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    titlePt: "Produto",
    links: [
      { label: "Siza", href: "https://siza.forgespace.co", external: true },
      { label: "Features", labelPt: "Funcionalidades", href: "/features" },
      { label: "Pricing", labelPt: "Preços", href: "/pricing" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    title: "Developers",
    titlePt: "Desenvolvedores",
    links: [
      { label: "GitHub", href: "https://github.com/Forge-Space", external: true },
      {
        label: "Documentation",
        labelPt: "Documentação",
        href: "https://github.com/Forge-Space/siza#readme",
        external: true,
      },
      { label: "Ecosystem", labelPt: "Ecossistema", href: "/ecosystem" },
      {
        label: "npm Packages",
        labelPt: "Pacotes npm",
        href: "https://www.npmjs.com/org/forgespace",
        external: true,
      },
    ],
  },
  {
    title: "Company",
    titlePt: "Empresa",
    links: [
      {
        label: "Brand Guide",
        labelPt: "Guia de Marca",
        href: "https://brand.forgespace.co",
        external: true,
      },
      { label: "Enterprise", href: "/enterprise" },
      {
        label: "Contact",
        labelPt: "Contato",
        href: "mailto:support@forgespace.co",
        external: true,
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        label: "MIT License",
        href: "https://github.com/Forge-Space/forgespace-web/blob/main/LICENSE",
        external: true,
      },
      {
        label: "Terms of Use",
        labelPt: "Termos de Uso",
        href: "https://github.com/Forge-Space/.github/blob/main/TERMS.md",
        external: true,
      },
      {
        label: "Privacy",
        labelPt: "Privacidade",
        href: "https://github.com/Forge-Space/.github/blob/main/PRIVACY.md",
        external: true,
      },
    ],
  },
];

function FooterLinkList({
  column,
  isPt,
}: {
  column: FooterColumn;
  isPt: boolean;
}) {
  return (
    <div>
      <h3 className="text-xs font-mono text-forge-text-subtle tracking-[0.15em] uppercase mb-4">
        {isPt && column.titlePt ? column.titlePt : column.title}
      </h3>
      <ul className="space-y-2.5">
        {column.links.map((link) => {
          const label = isPt && link.labelPt ? link.labelPt : link.label;
          return (
            <li key={link.href}>
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-fs-cta-event={
                    link.href.includes("siza.forgespace.co")
                      ? FORGE_CTA_EVENTS.SIZA
                      : link.href.includes("github.com/Forge-Space")
                        ? FORGE_CTA_EVENTS.GITHUB
                        : link.href.startsWith("mailto:")
                          ? FORGE_CTA_EVENTS.CONTACT_SALES
                          : undefined
                  }
                  data-fs-cta-target={
                    link.href.includes("siza.forgespace.co")
                      ? "siza"
                      : link.href.includes("github.com/Forge-Space")
                        ? "github"
                        : link.href.startsWith("mailto:")
                          ? "contact_sales"
                          : undefined
                  }
                  data-fs-cta-location={`footer_${column.title.toLowerCase()}_${link.label.toLowerCase().replace(/\s+/g, "_")}`}
                  data-fs-pass-attribution={
                    link.href.includes("siza.forgespace.co") ||
                    link.href.startsWith("mailto:")
                      ? "true"
                      : undefined
                  }
                  className="text-sm text-forge-text-muted transition-colors hover:text-foreground"
                >
                  {label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  prefetch={false}
                  className="text-sm text-forge-text-muted transition-colors hover:text-foreground"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Footer() {
  const pathname = usePathname() ?? "/";
  const isPt = pathname.startsWith("/pt");

  return (
    <footer className="mt-auto border-t border-forge-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              prefetch={false}
              className="font-display text-base font-bold text-foreground"
            >
              Forge Space
            </Link>
            <p className="mt-3 text-sm text-forge-text-muted leading-relaxed max-w-xs">
              {isPt
                ? "Plataforma interna de desenvolvimento open-source. IA com governança integrada."
                : "Open-source Internal Developer Platform. AI generation with built-in governance."}
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
                <GitHubIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <FooterLinkList key={column.title} column={column} isPt={isPt} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-forge-border pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-forge-text-subtle">
            &copy; {new Date().getFullYear()} Forge Space. MIT License.
          </p>
          <p className="text-xs text-forge-text-subtle">
            {isPt ? "Feito com" : "Built with"}{" "}Next.js, Tailwind CSS &amp; Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
