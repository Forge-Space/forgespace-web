"use client";

import { motion } from "motion/react";
import { Github, ArrowRight, Mail } from "lucide-react";
import { EASE_SIZA } from "@/lib/constants";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";
import { Button } from "@/components/ui/Button";

type CTAVariant = "default" | "minimal" | "enterprise" | "pt";

interface CTASectionProps {
  variant?: CTAVariant;
}

const content: Record<CTAVariant, {
  label: string;
  title: string;
  subtitle: string;
  trust: string[];
  primary: { label: string; href: string; icon: "github" | "mail" };
  secondary?: { label: string; href: string; icon?: "mail" };
  tertiary?: { label: string; href: string };
  footer: string;
}> = {
  default: {
    label: "Get started today",
    title: "Get visibility where it matters",
    subtitle: "One scan. A living catalog. Governance built in. Open source and free to start.",
    trust: ["✓ Open source · MIT License", "✓ No login required to start", "✓ Works with any Git host", "✓ BYOK · Client-side encryption"],
    primary: { label: "Explore on GitHub", href: "https://github.com/Forge-Space", icon: "github" },
    secondary: { label: "Contact Forge Space", href: "mailto:support@forgespace.co?subject=Forge%20Space%20for%20my%20team", icon: "mail" },
    tertiary: { label: "Try Siza Demo", href: "https://siza.forgespace.co" },
    footer: "MIT Licensed · Self-hostable · No vendor lock-in",
  },
  minimal: {
    label: "Open source",
    title: "Start building with Forge Space",
    subtitle: "Open source, MIT licensed, and free to start. No credit card required.",
    trust: ["✓ MIT License", "✓ Self-hostable", "✓ No vendor lock-in"],
    primary: { label: "Explore on GitHub", href: "https://github.com/Forge-Space", icon: "github" },
    secondary: { label: "Try Siza Demo", href: "https://siza.forgespace.co" },
    footer: "Free forever · Open source",
  },
  enterprise: {
    label: "Enterprise",
    title: "Ready to talk enterprise?",
    subtitle: "Custom deployment, dedicated support, and enterprise controls for teams that can't compromise on security.",
    trust: ["✓ Dedicated support SLA", "✓ Self-hosted deployment", "✓ SOC 2 roadmap"],
    primary: { label: "Contact Sales", href: "mailto:support@forgespace.co?subject=Forge%20Space%20Enterprise", icon: "mail" },
    secondary: { label: "Explore on GitHub", href: "https://github.com/Forge-Space" },
    footer: "Custom pricing · SAML SSO · Audit logs",
  },
  pt: {
    label: "Comece hoje",
    title: "Visibilidade onde importa",
    subtitle: "Um scan. Um catálogo vivo. Governança integrada. Open source e gratuito para começar.",
    trust: ["✓ Open source · MIT License", "✓ Sem login para começar", "✓ Funciona com qualquer Git host"],
    primary: { label: "Ver no GitHub", href: "https://github.com/Forge-Space", icon: "github" },
    secondary: { label: "Falar com Forge Space", href: "mailto:support@forgespace.co?subject=Forge%20Space%20para%20meu%20time", icon: "mail" },
    tertiary: { label: "Testar o Siza", href: "https://siza.forgespace.co" },
    footer: "MIT License · Self-hostable · Sem vendor lock-in",
  },
};

export function CTASection({ variant = "default" }: CTASectionProps) {
  const c = content[variant];

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124, 58, 237, 0.12) 0%, transparent 70%),
          var(--forge-bg)
        `,
      }}
    >
      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_SIZA }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-forge-primary mb-5">
            {c.label}
          </p>

          <h2 className="text-display-md font-display font-extrabold tracking-tight mb-4 leading-tight bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] bg-clip-text text-transparent pb-[0.1em]">
            {c.title}
          </h2>

          <p className="text-lg text-forge-text-muted max-w-md mx-auto mb-8 leading-relaxed">
            {c.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 mb-8 text-xs text-forge-text-subtle">
            {c.trust.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center">
            <Button
              href={c.primary.href}
              external
              size="lg"
              ctaEvent={c.primary.icon === "github" ? FORGE_CTA_EVENTS.GITHUB : FORGE_CTA_EVENTS.CONTACT_SALES}
              ctaTarget={c.primary.icon === "github" ? "github" : "contact_sales"}
              ctaLocation="cta_primary"
              passAttribution={c.primary.icon === "mail"}
            >
              {c.primary.icon === "github" ? (
                <Github className="w-4 h-4" />
              ) : (
                <Mail className="w-4 h-4" />
              )}
              {c.primary.label}
              {c.primary.icon === "github" && <ArrowRight className="w-4 h-4" />}
            </Button>

            {c.secondary && (
              <Button
                href={c.secondary.href}
                external
                variant="outline"
                size="lg"
                ctaEvent={
                  c.secondary.href.startsWith("mailto:")
                    ? FORGE_CTA_EVENTS.CONTACT_SALES
                    : c.secondary.href.includes("github.com")
                      ? FORGE_CTA_EVENTS.GITHUB
                      : FORGE_CTA_EVENTS.SIZA
                }
                ctaTarget={
                  c.secondary.href.startsWith("mailto:")
                    ? "contact_sales"
                    : c.secondary.href.includes("github.com")
                      ? "github"
                      : "siza"
                }
                ctaLocation="cta_secondary"
                passAttribution={c.secondary.href.startsWith("mailto:")}
              >
                {c.secondary.icon === "mail" && <Mail className="w-4 h-4" />}
                {c.secondary.label}
              </Button>
            )}

            {c.tertiary && (
              <Button
                href={c.tertiary.href}
                external
                variant="ghost"
                size="lg"
                ctaEvent={FORGE_CTA_EVENTS.SIZA}
                ctaTarget="siza"
                ctaLocation="cta_tertiary"
                passAttribution
              >
                {c.tertiary.label}
              </Button>
            )}
          </div>

          <p className="mt-6 text-xs text-forge-text-subtle">
            {c.footer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
