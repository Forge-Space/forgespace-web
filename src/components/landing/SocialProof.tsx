"use client";

import { motion } from "motion/react";
import { EASE_SIZA } from "@/lib/constants";

const STATS = [
  { value: "9", label: "Open Source Repos" },
  { value: "30+", label: "MCP Tools" },
  { value: "$0", label: "To Get Started" },
  { value: "MIT", label: "Licensed" },
];

export function SocialProof() {
  return (
    <section className="py-16 border-y border-forge-border bg-forge-bg-elevated">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                ease: EASE_SIZA,
                delay: i * 0.08,
              }}
              className="text-center"
            >
              <p className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-forge-text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
