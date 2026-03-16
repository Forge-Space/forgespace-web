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

  // In environments without a real RAF loop (e.g., tests), fall back to the
  // target value so the final formatted number is always visible.
  return active && count === 0 && target !== 0 ? target : count;
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
        ? `${(count / 1000).toFixed(1)}k`
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
        {/* Section heading */}
        <div className="text-center mb-12">
          <p className="label-mono mb-3">BUILT IN THE OPEN</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            Real numbers. Open source.
          </h2>
        </div>

        {/* Stat counters */}
        <div className={`grid gap-8 ${showDownloads ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3"}`}>
          <StatCounter
            target={snapshot.repoCount}
            label={showDownloads ? "Open Source Repos" : "Product Repos"}
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


      </div>
    </section>
  );
}
