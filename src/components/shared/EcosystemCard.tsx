"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { type LucideIcon } from "lucide-react";

import { EASE_SIZA } from "@/lib/constants";

interface EcosystemCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  external?: boolean;
}

export function EcosystemCard({
  icon: Icon,
  title,
  description,
  href,
  external = false,
}: EcosystemCardProps) {
  const content = (
    <>
      <Icon className="w-5 h-5 text-forge-primary mb-3" />
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-forge-text-muted">{description}</p>
    </>
  );

  const cardClasses =
    "block rounded-xl border border-forge-border bg-forge-surface/50 p-6 transition-all duration-200 hover:border-forge-primary/50 hover:shadow-[var(--forge-glow-primary-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)]";

  if (href) {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: EASE_SIZA }}
      >
        {external ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cardClasses}
          >
            {content}
          </a>
        ) : (
          <Link href={href} className={cardClasses}>
            {content}
          </Link>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: EASE_SIZA }}
      className={cardClasses}
    >
      {content}
    </motion.div>
  );
}
