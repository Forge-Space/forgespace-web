"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Headphones, Shield, Zap } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { EASE_SIZA } from "@/lib/constants";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";

const ENTERPRISE_FEATURES = [
  {
    icon: Headphones,
    title: "Dedicated support",
    desc: "Priority response and onboarding.",
  },
  {
    icon: Shield,
    title: "Security & compliance",
    desc: "SSO, audit logs, data residency.",
  },
  {
    icon: Zap,
    title: "Custom deployments",
    desc: "Self-hosted or private cloud.",
  },
];

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--forge-gradient-hero)" }}
        aria-hidden
      />
      <main id="main-content" className="relative">
        <PageSection
          label="ENTERPRISE"
          title="Enterprise Support Portal"
          subtitle="Custom plans for teams and organizations."
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {ENTERPRISE_FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: EASE_SIZA,
                  delay: 0.1 + i * 0.08,
                }}
                className="rounded-xl border border-forge-border bg-forge-surface/50 p-6"
              >
                <f.icon className="w-5 h-5 text-forge-primary mb-3" />
                <h3 className="font-display font-semibold text-foreground mb-1">
                  {f.title}
                </h3>
                <p className="text-sm text-forge-text-muted">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_SIZA, delay: 0.4 }}
          >
            <Link
              href="mailto:enterprise@forgespace.co"
              data-fs-cta-event={FORGE_CTA_EVENTS.CONTACT_SALES}
              data-fs-cta-target="contact_sales"
              data-fs-cta-location="enterprise_contact_sales"
              data-fs-pass-attribution="true"
              className="inline-flex items-center gap-2 bg-forge-primary hover:bg-forge-primary-hover text-white rounded-lg px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forge-bg)]"
            >
              Contact Sales
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </PageSection>
      </main>
    </div>
  );
}
