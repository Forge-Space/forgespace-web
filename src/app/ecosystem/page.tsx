"use client";

import { motion } from "motion/react";
import { Layers } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { EcosystemCard } from "@/components/shared/EcosystemCard";

import { EASE_SIZA } from "@/lib/constants";

const REPOS = [
  {
    name: "Siza",
    desc: "AI workspace — generate, integrate, ship",
    href: "https://siza.forgespace.co",
    external: true,
  },
  {
    name: "siza-mcp",
    desc: "21 MCP tools for UI and backend generation",
    href: "https://github.com/Forge-Space/ui-mcp",
    external: true,
  },
  {
    name: "siza-gen",
    desc: "AI generation engine",
    href: "https://github.com/Forge-Space/siza-gen",
    external: true,
  },
  {
    name: "mcp-gateway",
    desc: "AI-powered tool routing hub",
    href: "https://github.com/Forge-Space/mcp-gateway",
    external: true,
  },
  {
    name: "forge-patterns",
    desc: "Shared standards and MCP context server",
    href: "https://github.com/Forge-Space/core",
    external: true,
  },
  {
    name: "branding-mcp",
    desc: "Brand identity generation",
    href: "https://github.com/Forge-Space/branding-mcp",
    external: true,
  },
];

export default function EcosystemPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--forge-gradient-hero)" }}
        aria-hidden
      />
      <main className="relative">
        <PageSection
          label="THE FORGE SPACE ECOSYSTEM"
          title="Six open-source repos. One vision."
          subtitle="Designed to work together."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REPOS.map((repo, i) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: EASE_SIZA,
                  delay: 0.1 + i * 0.08,
                }}
              >
                <EcosystemCard
                  icon={Layers}
                  title={repo.name}
                  description={repo.desc}
                  href={repo.href}
                  external={repo.external}
                />
              </motion.div>
            ))}
          </div>
        </PageSection>
      </main>
    </div>
  );
}
