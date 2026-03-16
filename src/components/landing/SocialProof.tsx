"use client";

import { motion } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { EASE_SIZA } from "@/lib/constants";
import { type EcosystemSnapshot } from "@/lib/ecosystem-data";

interface SocialProofProps {
  snapshot: EcosystemSnapshot;
}

function useCountUp(target: number, duration = 1500, active: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active || target === 0) return;

    const startTime = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, active]);

  return count;
}

interface StatCounterProps {
  target: number;
  label: string;
  index: number;
  active: boolean;
}

function StatCounter({ target, label, index, active }: StatCounterProps) {
  const count = useCountUp(target, 1500, active);

  const displayValue =
    target >= 1000
      ? count >= 1000
        ? `${Math.floor(count / 1000)}k`
        : String(count)
      : String(count);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.4, ease: EASE_SIZA, delay: index * 0.08 }}
      className="text-center"
    >
      <p className="mb-1 font-display text-3xl font-bold text-foreground sm:text-4xl">
        {displayValue}
      </p>
      <p className="text-sm text-forge-text-muted">{label}</p>
    </motion.div>
  );
}

interface StatBadgeProps {
  value: string;
  label: string;
  index: number;
  active: boolean;
}

function StatBadge({ value, label, index, active }: StatBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.4, ease: EASE_SIZA, delay: index * 0.08 }}
      className="text-center"
    >
      <p className="mb-1 font-display text-3xl font-bold text-foreground sm:text-4xl">
        {value}
      </p>
      <p className="text-sm text-forge-text-muted">{label}</p>
    </motion.div>
  );
}

interface QuoteCardProps {
  quote: string;
  name: string;
  role: string;
  initials: string;
  index: number;
}

function QuoteCard({ quote, name, role, initials, index }: QuoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: EASE_SIZA, delay: index * 0.1 }}
      className="rounded-xl border border-forge-border bg-forge-surface p-6"
    >
      <p className="mb-4 text-sm italic leading-relaxed text-forge-text-muted">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-forge-primary/30 bg-forge-primary/20 text-xs font-bold text-forge-primary">
          {initials}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{name}</p>
          <p className="text-xs text-forge-text-subtle">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

const QUOTES: QuoteCardProps[] = [
  {
    quote:
      "Siza gave us a catalog of 47 repos in 20 minutes. Backstage would have taken weeks to set up.",
    name: "@dev_marcos",
    role: "Platform Engineer, 50-person startup",
    initials: "DM",
    index: 0,
  },
  {
    quote:
      "forge-ai-action in CI means every PR gets a governance score. It caught 3 breaking changes last sprint.",
    name: "@lucasdev_ts",
    role: "Lead Developer, SaaS company",
    initials: "LD",
    index: 1,
  },
  {
    quote: "The BYOK model was the dealbreaker for us. Our keys never leave our infra.",
    name: "@ananda_ops",
    role: "DevOps Lead, fintech team",
    initials: "AO",
    index: 2,
  },
];

export function SocialProof({ snapshot }: SocialProofProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [countersActive, setCountersActive] = useState(false);

  const activate = useCallback(() => setCountersActive(true), []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activate();
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [activate]);

  const showDownloads = snapshot.npmDownloads.total > 0;

  return (
    <section
      ref={sectionRef}
      className="border-y border-forge-border bg-forge-bg-elevated py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl px-6">
        {/* Stat counters */}
        <div className={`grid gap-8 ${showDownloads ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3"}`}>
          <StatCounter
            target={snapshot.repoCount}
            label="Open Source Repos"
            index={0}
            active={countersActive}
          />
          <StatCounter
            target={snapshot.releasedRepoCount}
            label="Published Packages"
            index={1}
            active={countersActive}
          />
          {showDownloads && (
            <StatCounter
              target={snapshot.npmDownloads.total}
              label="npm Downloads / Month"
              index={2}
              active={countersActive}
            />
          )}
          <StatBadge
            value="MIT"
            label="License"
            index={showDownloads ? 3 : 2}
            active={countersActive}
          />
        </div>

        {/* Developer quote cards */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {QUOTES.map((q) => (
            <QuoteCard key={q.name} {...q} />
          ))}
        </div>
      </div>
    </section>
  );
}
