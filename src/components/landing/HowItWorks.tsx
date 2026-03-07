"use client";

import { motion } from "motion/react";
import { Cpu, Shield, Rocket } from "lucide-react";
import { EASE_SIZA } from "@/lib/constants";
import { type LucideIcon } from "lucide-react";

interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    icon: Cpu,
    title: "Generate",
    description:
      "Describe what you need in natural language. Siza generates production-ready components with live preview — React, Next.js, or plain HTML.",
  },
  {
    number: "02",
    icon: Shield,
    title: "Score",
    description:
      "Every output gets an A-F scorecard automatically. Security, accessibility, code quality, and compliance — scored before you ship.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Ship",
    description:
      "Policy checks run in your CI pipeline. Audit trails track everything from prompt to merge. Full traceability, zero overhead.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-forge-bg-elevated">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_SIZA }}
          className="mb-14"
        >
          <p className="text-xs font-mono text-forge-primary tracking-[0.2em] uppercase mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-foreground">
            From prompt to production
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: EASE_SIZA,
                delay: i * 0.1,
              }}
              className="relative"
            >
              <div className="rounded-xl border border-forge-border bg-background p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-forge-primary/10 text-forge-primary font-mono text-sm font-semibold">
                    {step.number}
                  </span>
                  <step.icon className="w-5 h-5 text-forge-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-forge-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>

              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 md:-right-5 w-8 h-px bg-gradient-to-r from-forge-primary/40 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
