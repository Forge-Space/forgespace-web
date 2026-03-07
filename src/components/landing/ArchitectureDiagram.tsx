"use client";

import { motion } from "motion/react";
import { EASE_SIZA } from "@/lib/constants";

const LAYERS = [
  {
    name: "Siza",
    description: "AI workspace — generate, preview, ship",
    color: "border-[#A78BFA]/50 bg-[#A78BFA]/5",
    dot: "bg-[#A78BFA]",
  },
  {
    name: "siza-mcp + branding-mcp",
    description: "30+ composable MCP tools for UI & brand generation",
    color: "border-forge-primary/50 bg-forge-primary/5",
    dot: "bg-forge-primary",
  },
  {
    name: "mcp-gateway",
    description: "AI-powered routing, auth, rate limits, audit trails",
    color: "border-forge-primary/40 bg-forge-primary/5",
    dot: "bg-forge-primary",
  },
  {
    name: "forge-patterns",
    description: "Shared standards, scorecards, policy packs, CLI tools",
    color: "border-[#6D28D9]/50 bg-[#6D28D9]/5",
    dot: "bg-[#6D28D9]",
  },
];

export function ArchitectureDiagram() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_SIZA }}
          className="mb-14 max-w-2xl"
        >
          <p className="text-xs font-mono text-forge-primary tracking-[0.2em] uppercase mb-3">
            Architecture
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-foreground mb-4">
            Four layers. One ecosystem.
          </h2>
          <p className="text-lg text-forge-text-muted leading-relaxed">
            Each layer is an independent open-source repo. Use them together or
            pick what you need.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-3">
          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                ease: EASE_SIZA,
                delay: i * 0.1,
              }}
              className="relative"
            >
              <div
                className={`rounded-xl border p-5 ${layer.color} transition-all duration-200 hover:shadow-[var(--forge-glow-primary-sm)]`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-1.5 h-2.5 w-2.5 rounded-full ${layer.dot} shrink-0`}
                  />
                  <div>
                    <h3 className="font-mono text-sm font-semibold text-foreground mb-1">
                      {layer.name}
                    </h3>
                    <p className="text-sm text-forge-text-muted">
                      {layer.description}
                    </p>
                  </div>
                </div>
              </div>

              {i < LAYERS.length - 1 && (
                <div className="ml-[22px] h-3 w-px bg-gradient-to-b from-forge-primary/30 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
