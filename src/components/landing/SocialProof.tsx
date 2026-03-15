"use client";

import { motion } from "motion/react";
import { EASE_SIZA } from "@/lib/constants";
import { type EcosystemSnapshot } from "@/lib/ecosystem-data";

interface SocialProofProps {
  snapshot: EcosystemSnapshot;
}

function formatDownloads(count: number): string {
  if (count < 1000) return String(count);
  if (count < 10000) return `${(count / 1000).toFixed(1)}k`;
  return `${Math.floor(count / 1000)}k`;
}

export function SocialProof({ snapshot }: SocialProofProps) {
  const stats = [
    {
      value:
        snapshot.npmDownloads.total > 0
          ? formatDownloads(snapshot.npmDownloads.total)
          : String(snapshot.repoCount),
      label:
        snapshot.npmDownloads.total > 0 ? "npm Downloads / Month" : "Product Repos",
    },
    { value: String(snapshot.repoCount), label: "Open Source Repos" },
    { value: String(snapshot.releasedRepoCount), label: "Published Releases" },
    { value: "MIT", label: "Open Source License" },
  ];

  return (
    <section className="border-y border-forge-border bg-forge-bg-elevated py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                ease: EASE_SIZA,
                delay: index * 0.08,
              }}
              className="text-center"
            >
              <p className="mb-1 font-display text-3xl font-bold text-foreground sm:text-4xl">
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
