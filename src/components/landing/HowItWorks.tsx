"use client";

import { motion } from "motion/react";
import { EASE_SIZA } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-forge-bg-elevated border-t border-forge-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-20">
          <p className="text-xs font-mono text-forge-primary-hover tracking-[0.2em] uppercase mb-3">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-foreground mb-4">
            From scan to catalog in minutes.
          </h2>
          <p className="text-lg text-forge-text-muted max-w-xl">
            No agents to configure. No YAML to memorize. Siza does the work.
          </p>
        </div>

        {/* Step 1 */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_SIZA }}
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-forge-primary/40 bg-forge-primary/10 text-forge-primary font-mono text-sm font-bold mb-4">
                01
              </div>
              <h3 className="text-3xl font-display font-bold tracking-tight mb-3">
                Install and scan your repo
              </h3>
              <p className="text-lg text-forge-text-muted leading-relaxed">
                One CLI command. Siza scans your codebase and extracts a complete component manifest.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_SIZA, delay: 0.1 }}
            >
              <div className="bg-[#0d0d0f] border border-forge-border rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-forge-border">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-2 text-xs text-forge-text-subtle font-mono">terminal</span>
                </div>
                <div className="p-5 font-mono text-sm leading-7">
                  <p className="text-forge-text-muted">
                    <span className="text-emerald-400">$</span> npm install -g @forgespace/siza
                  </p>
                  <p className="text-forge-text-subtle mt-1">added 47 packages in 3.2s</p>
                  <p className="text-forge-text-muted mt-4">
                    <span className="text-emerald-400">$</span> siza scan --repo ./my-project
                  </p>
                  <p className="text-forge-text-subtle mt-1">Scanning...</p>
                  <p className="text-emerald-400 mt-1">████████████████ 100%</p>
                  <p className="text-forge-text-muted mt-1">Found 23 components, 8 services</p>
                  <p className="text-forge-text-muted">Manifest written to .siza/manifest.json</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-forge-border" />

        {/* Step 2 */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_SIZA }}
              className="order-2 lg:order-1"
            >
              <div className="bg-forge-surface rounded-xl border border-forge-border overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-forge-border bg-forge-surface-alt">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  <div className="ml-3 flex-1 bg-forge-bg-elevated rounded px-3 py-1 text-xs text-forge-text-subtle font-mono">
                    siza.forgespace.co/your-org
                  </div>
                </div>
                <div className="grid grid-cols-3 bg-forge-surface-alt text-xs text-forge-text-subtle px-4 py-2 border-b border-forge-border">
                  <span>Component</span>
                  <span>Path</span>
                  <span>Status</span>
                </div>
                <div className="grid grid-cols-3 text-sm text-forge-text-muted px-4 py-3 border-t border-forge-border">
                  <span className="font-mono">UserCard</span>
                  <span className="text-forge-text-subtle">src/components/ui/</span>
                  <span>
                    Reviewed{" "}
                    <span className="text-emerald-400">✓</span>
                  </span>
                </div>
                <div className="grid grid-cols-3 text-sm text-forge-text-muted px-4 py-3 border-t border-forge-border">
                  <span className="font-mono">DashboardLayout</span>
                  <span className="text-forge-text-subtle">src/layouts/</span>
                  <span>
                    Reviewed{" "}
                    <span className="text-emerald-400">✓</span>
                  </span>
                </div>
                <div className="grid grid-cols-3 text-sm text-forge-text-muted px-4 py-3 border-t border-forge-border">
                  <span className="font-mono">APIClient</span>
                  <span className="text-forge-text-subtle">src/lib/</span>
                  <span>
                    Review pending{" "}
                    <span className="text-amber-400">⚠</span>
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_SIZA, delay: 0.1 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-forge-primary/40 bg-forge-primary/10 text-forge-primary font-mono text-sm font-bold mb-4">
                02
              </div>
              <h3 className="text-3xl font-display font-bold tracking-tight mb-3">
                Your catalog, generated automatically
              </h3>
              <p className="text-lg text-forge-text-muted leading-relaxed">
                Siza publishes a live catalog to siza.forgespace.co — searchable, browseable, always up to date.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-forge-border" />

        {/* Step 3 */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_SIZA }}
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-forge-primary/40 bg-forge-primary/10 text-forge-primary font-mono text-sm font-bold mb-4">
                03
              </div>
              <h3 className="text-3xl font-display font-bold tracking-tight mb-3">
                Governance in every PR
              </h3>
              <p className="text-lg text-forge-text-muted leading-relaxed">
                Add forge-ai-action to your GitHub workflow. Every PR gets scored — automatically.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_SIZA, delay: 0.1 }}
            >
              <div className="bg-[#0d0d0f] border border-forge-border rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-forge-border">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-2 text-xs text-forge-text-subtle font-mono">.github/workflows/forge-ai.yml</span>
                </div>
                <div className="p-5 font-mono text-sm leading-7">
                  <p className="text-forge-text-subtle italic"># .github/workflows/forge-ai.yml</p>
                  <p className="mt-2">
                    <span className="text-sky-400">- name</span>
                    <span className="text-forge-text-muted">: </span>
                    <span className="text-emerald-400">Forge AI Governance</span>
                  </p>
                  <p>
                    {"  "}
                    <span className="text-sky-400">uses</span>
                    <span className="text-forge-text-muted">: </span>
                    <span className="text-emerald-400">forge-space/forge-ai-action@v1</span>
                  </p>
                  <p>
                    {"  "}
                    <span className="text-sky-400">with</span>
                    <span className="text-forge-text-muted">:</span>
                  </p>
                  <p>
                    {"    "}
                    <span className="text-forge-text-muted">threshold</span>
                    <span className="text-forge-text-muted">: </span>
                    <span className="text-emerald-400">80</span>
                  </p>
                  <p>
                    {"    "}
                    <span className="text-forge-text-muted">annotate_pr</span>
                    <span className="text-forge-text-muted">: </span>
                    <span className="text-emerald-400">true</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
