"use client";

import { motion } from "motion/react";
import { EASE_SIZA } from "@/lib/constants";

type Locale = "en" | "pt";

interface HowItWorksProps {
  locale?: Locale;
}

const steps: Record<Locale, Array<{
  number: string;
  title: string;
  description: string;
  visual: { label: string; lines: Array<{ type: "input" | "output" | "success" | "info" | "dim"; text: string }> };
}>> = {
  en: [
    {
      number: "01",
      title: "Generate",
      description: "One CLI command. Siza scans your codebase and extracts a complete component manifest.",
      visual: {
        label: "terminal",
        lines: [
          { type: "input", text: "$ siza scan --repo ./my-project" },
          { type: "dim", text: "Scanning..." },
          { type: "success", text: "████████████████ 100%" },
          { type: "info", text: "Found 23 components, 8 services" },
          { type: "info", text: "Manifest written to .siza/manifest.json" },
        ],
      },
    },
    {
      number: "02",
      title: "Score",
      description: "Siza publishes a live catalog to siza.forgespace.co — searchable, always up to date.",
      visual: {
        label: "catalog",
        lines: [
          { type: "input", text: "UserCard          src/components/ui/" },
          { type: "success", text: "✓ Reviewed · Score 96/100" },
          { type: "input", text: "DashboardLayout   src/layouts/" },
          { type: "success", text: "✓ Reviewed · Score 91/100" },
          { type: "input", text: "APIClient         src/lib/" },
          { type: "output", text: "⚠ Pending · Score 73/100" },
        ],
      },
    },
    {
      number: "03",
      title: "Ship",
      description: "Add forge-ai-action to your GitHub workflow. Every PR gets scored — automatically.",
      visual: {
        label: ".github/workflows/forge-ai.yml",
        lines: [
          { type: "dim", text: "- name: Forge AI Governance" },
          { type: "dim", text: "  uses: forge-space/forge-ai-action@v1" },
          { type: "dim", text: "  with:" },
          { type: "dim", text: "    threshold: 80" },
          { type: "dim", text: "    annotate_pr: true" },
        ],
      },
    },
  ],
  pt: [
    {
      number: "01",
      title: "Gere",
      description: "Um comando CLI. O Siza escaneia seu codebase e extrai um manifesto completo de componentes.",
      visual: {
        label: "terminal",
        lines: [
          { type: "input", text: "$ siza scan --repo ./meu-projeto" },
          { type: "dim", text: "Escaneando..." },
          { type: "success", text: "████████████████ 100%" },
          { type: "info", text: "23 componentes, 8 serviços encontrados" },
          { type: "info", text: "Manifesto gravado em .siza/manifest.json" },
        ],
      },
    },
    {
      number: "02",
      title: "Pontue",
      description: "O Siza publica um catálogo vivo no siza.forgespace.co — pesquisável e sempre atualizado.",
      visual: {
        label: "catálogo",
        lines: [
          { type: "input", text: "UserCard          src/components/ui/" },
          { type: "success", text: "✓ Revisado · Nota 96/100" },
          { type: "input", text: "DashboardLayout   src/layouts/" },
          { type: "success", text: "✓ Revisado · Nota 91/100" },
          { type: "input", text: "APIClient         src/lib/" },
          { type: "output", text: "⚠ Pendente · Nota 73/100" },
        ],
      },
    },
    {
      number: "03",
      title: "Entregue",
      description: "Adicione o forge-ai-action no seu workflow do GitHub. Cada PR é pontuado automaticamente.",
      visual: {
        label: ".github/workflows/forge-ai.yml",
        lines: [
          { type: "dim", text: "- name: Forge AI Governance" },
          { type: "dim", text: "  uses: forge-space/forge-ai-action@v1" },
          { type: "dim", text: "  with:" },
          { type: "dim", text: "    threshold: 80" },
          { type: "dim", text: "    annotate_pr: true" },
        ],
      },
    },
  ],
};

const labels: Record<Locale, { eyebrow: string; title: string; subtitle: string }> = {
  en: {
    eyebrow: "How it works",
    title: "From prompt to production",
    subtitle: "No agents to configure. No YAML to memorize. Siza does the work.",
  },
  pt: {
    eyebrow: "Como funciona",
    title: "Do prompt para produção",
    subtitle: "Sem agentes para configurar. Sem YAML para decorar. O Siza faz o trabalho.",
  },
};

const lineColorMap: Record<string, string> = {
  input: "text-forge-text-muted",
  output: "text-amber-400",
  success: "text-emerald-400",
  info: "text-forge-text-muted",
  dim: "text-forge-text-subtle",
};

export function HowItWorks({ locale = "en" }: HowItWorksProps) {
  const localSteps = steps[locale];
  const l = labels[locale];

  return (
    <section className="py-14 md:py-20 bg-forge-bg-elevated border-t border-forge-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs font-mono text-forge-primary tracking-[0.2em] uppercase mb-3">
            {l.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-foreground mb-3">
            {l.title}
          </h2>
          <p className="text-lg text-forge-text-muted max-w-xl">
            {l.subtitle}
          </p>
        </div>

        {localSteps.map((step, index) => (
          <div key={step.number}>
            {index > 0 && <div className="border-t border-forge-border" />}
            <div className="py-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE_SIZA }}
                  className={index % 2 === 1 ? "order-2 lg:order-1" : ""}
                >
                  {index % 2 === 0 ? (
                    <div className="bg-[#0d0d0f] border border-forge-border rounded-xl overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 border-b border-forge-border">
                        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                        <span className="ml-2 text-xs text-forge-text-subtle font-mono truncate">{step.visual.label}</span>
                      </div>
                      <div className="p-5 font-mono text-xs space-y-1.5 leading-relaxed">
                        {step.visual.lines.map((line, li) => (
                          <p key={li} className={lineColorMap[line.type]}>
                            {line.text}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-forge-surface rounded-xl border border-forge-border overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 border-b border-forge-border bg-forge-surface-alt">
                        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                        <div className="ml-3 flex-1 bg-forge-bg-elevated rounded px-3 py-1 text-xs text-forge-text-subtle font-mono truncate">
                          {step.visual.label}
                        </div>
                      </div>
                      <div className="p-5 font-mono text-xs space-y-1.5 leading-relaxed">
                        {step.visual.lines.map((line, li) => (
                          <p key={li} className={lineColorMap[line.type]}>
                            {line.text}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE_SIZA, delay: 0.1 }}
                  className={index % 2 === 1 ? "order-1 lg:order-2" : ""}
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-forge-primary/40 bg-forge-primary/10 text-forge-primary font-mono text-sm font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-3xl font-display font-bold tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-lg text-forge-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
