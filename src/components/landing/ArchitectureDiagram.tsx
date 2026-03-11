"use client";

import { motion } from "motion/react";
import { EASE_SIZA } from "@/lib/constants";

interface ArchitectureDiagramProps {
  repoCount: number;
  releasedRepoCount: number;
}

const LAYERS = [
  {
    name: "Siza",
    description: "AI workspace for generation, governance, and shipping",
    color: "border-[#A78BFA]/60 bg-[#A78BFA]/10",
    dot: "bg-[#A78BFA]",
  },
  {
    name: "ui-mcp + branding-mcp",
    description: "Composable MCP generation and branding services",
    color: "border-forge-primary/60 bg-forge-primary/10",
    dot: "bg-forge-primary",
  },
  {
    name: "mcp-gateway",
    description: "Routing, auth, observability, and reliability controls",
    color: "border-forge-primary/50 bg-forge-primary/8",
    dot: "bg-forge-primary",
  },
  {
    name: "core",
    description: "Shared governance standards, scorecards, and policy packs",
    color: "border-[#6D28D9]/60 bg-[#6D28D9]/10",
    dot: "bg-[#6D28D9]",
  },
];

export function ArchitectureDiagram({
  repoCount,
  releasedRepoCount,
}: ArchitectureDiagramProps) {
  return (
    <section className="border-t border-forge-border py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_SIZA }}
          className="mb-14 max-w-2xl"
        >
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-forge-primary">
            Architecture
          </p>
          <h2 className="mb-4 text-3xl font-display font-bold tracking-tight text-foreground sm:text-4xl">
            Four layers. {repoCount} product repos.
          </h2>
          <p className="text-lg leading-relaxed text-forge-text-muted">
            Each layer is independently versioned and open source. {releasedRepoCount} repositories
            currently publish tagged releases.
          </p>
        </motion.div>

        <div className="mx-auto max-w-2xl space-y-3">
          {LAYERS.map((layer, index) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                ease: EASE_SIZA,
                delay: index * 0.1,
              }}
              className="relative"
            >
              <div
                className={`rounded-xl border p-5 ${layer.color} transition-all duration-200 hover:shadow-[var(--forge-glow-primary-sm)]`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${layer.dot}`}
                  />
                  <div>
                    <h3 className="mb-1 font-mono text-sm font-semibold text-foreground">
                      {layer.name}
                    </h3>
                    <p className="text-sm text-forge-text-muted">{layer.description}</p>
                  </div>
                </div>
              </div>

              {index < LAYERS.length - 1 && (
                <div className="ml-[22px] h-3 w-px bg-gradient-to-b from-forge-primary/30 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
