"use client";

import { motion } from "motion/react";
import { useState, useEffect, useRef, useCallback, startTransition } from "react";
import { EASE_SIZA } from "@/lib/constants";
import { type EcosystemSnapshot } from "@/lib/ecosystem-data";

interface SocialProofProps {
  snapshot: EcosystemSnapshot;
}

function useCountUp(target: number, duration = 1200, active: boolean, immediate = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active || target === 0) return;

    if (immediate) {
      startTransition(() => setCount(target));
      return;
    }

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
  }, [target, duration, active, immediate]);

  return count;
}

interface StatItemProps {
  value: number;
  label: string;
  index: number;
  active: boolean;
  immediate: boolean;
}

function StatItem({ value, label, index, active, immediate }: StatItemProps) {
  const count = useCountUp(value, 1200, active, immediate);

  const displayValue =
    value >= 1000 && count >= 1000
      ? `${(count / 1000).toFixed(1)}k`
      : String(count);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5, ease: EASE_SIZA, delay: index * 0.07 }}
      className="flex flex-col items-center gap-1 px-6 py-5 rounded-xl border border-forge-border bg-forge-surface/30"
    >
      <p className="font-display text-3xl font-bold text-foreground sm:text-4xl tabular-nums">
        {displayValue}
      </p>
      <p className="text-xs text-forge-text-muted text-center leading-snug">{label}</p>
    </motion.div>
  );
}

export function SocialProof({ snapshot }: SocialProofProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [countersActive, setCountersActive] = useState(false);
  const [immediate, setImmediate] = useState(false);

  const activate = useCallback(() => setCountersActive(true), []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // If already in viewport on first paint, show values immediately (no flash from zero)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startTransition(() => {
        setImmediate(true);
        setCountersActive(true);
      });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activate();
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [activate]);

  const showDownloads = snapshot.npmDownloads.total > 0;

  const stats = [
    { value: snapshot.repoCount, label: "Product Repos" },
    { value: snapshot.releasedRepoCount, label: "Tagged Releases" },
    ...(showDownloads
      ? [{ value: snapshot.npmDownloads.total, label: "npm Downloads / mo" }]
      : []),
  ];

  return (
    <section
      ref={sectionRef}
      className="border-y border-forge-border bg-forge-bg-elevated py-12 md:py-16"
    >
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={countersActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: EASE_SIZA }}
          className="text-center mb-8"
        >
          <p className="label-mono mb-2">OPEN SOURCE</p>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
            Shipped in the open.
          </h2>
        </motion.div>

        <div className={`grid gap-3 mb-6 ${showDownloads ? "grid-cols-3" : "grid-cols-2"}`}>
          {stats.map((stat, i) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              label={stat.label}
              index={i}
              active={countersActive}
              immediate={immediate}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={countersActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_SIZA, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {["MIT License", "Self-Hostable", "MCP Architecture", "No Vendor Lock-in"].map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1.5 rounded-full border border-forge-border bg-forge-surface px-3 py-1 text-xs text-forge-text-subtle"
            >
              <span className="h-1 w-1 rounded-full bg-forge-primary/60" />
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
