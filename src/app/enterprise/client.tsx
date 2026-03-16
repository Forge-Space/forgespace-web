"use client";

import { motion } from "motion/react";
import { EASE_SIZA } from "@/lib/constants";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";
import { Button } from "@/components/ui/Button";
import { TrustStrip } from "@/components/landing/TrustStrip";

// ─── Shared motion variants ──────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const transition = (delay = 0) => ({
  duration: 0.5,
  ease: EASE_SIZA,
  delay,
});

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative px-6 pt-20 pb-16 lg:px-16 lg:pt-28 lg:pb-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left — text */}
        <div>
          <motion.p
            className="label-mono mb-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={transition(0)}
          >
            ENTERPRISE
          </motion.p>

          <motion.h1
            className="font-display text-display-lg font-bold leading-[1.1] tracking-tight text-foreground mb-5"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={transition(0.07)}
          >
            AI governance /{" "}
            <span className="text-gradient-primary">at scale.</span>
          </motion.h1>

          <motion.p
            className="text-base lg:text-lg text-forge-text-muted leading-relaxed max-w-lg mb-8"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={transition(0.14)}
          >
            Custom deployment, dedicated support, and enterprise controls for
            teams that can&apos;t compromise on security.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={transition(0.21)}
          >
            <Button
              href="https://github.com/Forge-Space"
              external
              ctaEvent={FORGE_CTA_EVENTS.GITHUB}
              ctaTarget="github"
              ctaLocation="enterprise_github_primary"
              size="lg"
            >
              Explore on GitHub
            </Button>
            <Button
              href="mailto:support@forgespace.co"
              variant="outline"
              ctaEvent={FORGE_CTA_EVENTS.CONTACT_SALES}
              ctaTarget="contact_sales"
              ctaLocation="enterprise_hero_primary"
              passAttribution
              size="lg"
            >
              Contact Sales
            </Button>
          </motion.div>

          <motion.p
            className="text-xs text-forge-text-subtle font-mono tracking-wider"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={transition(0.28)}
          >
            DEDICATED SUPPORT · SELF-HOSTED · SOC 2 READY
          </motion.p>
        </div>

        {/* Right — security dashboard mockup */}
        <motion.div
          className="hidden lg:block"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={transition(0.18)}
        >
          <div className="bg-[#0d0d0f] border border-forge-border rounded-xl p-5 font-mono text-xs">
            {/* Window chrome */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-forge-border">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-forge-text-subtle tracking-wide">
                Forge Space Enterprise
              </span>
            </div>

            {/* Check rows */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-l-2 border-l-emerald-400 pl-3 py-1.5 bg-emerald-400/5 rounded-r">
                <span className="text-emerald-400">✓ SSO Authentication</span>
                <span className="text-forge-text-subtle">Enabled</span>
              </div>
              <div className="flex items-center justify-between border-l-2 border-l-emerald-400 pl-3 py-1.5 bg-emerald-400/5 rounded-r">
                <span className="text-emerald-400">✓ Audit Logs</span>
                <span className="text-forge-text-subtle">90 days</span>
              </div>
              <div className="flex items-center justify-between border-l-2 border-l-emerald-400 pl-3 py-1.5 bg-emerald-400/5 rounded-r">
                <span className="text-emerald-400">✓ BYOK Encryption</span>
                <span className="text-forge-text-subtle">AES-256-GCM</span>
              </div>
              <div className="flex items-center justify-between border-l-2 border-l-forge-primary pl-3 py-1.5 bg-forge-primary/5 rounded-r">
                <span className="text-forge-primary">⚙ Data Residency</span>
                <span className="text-forge-text-subtle">Configurable</span>
              </div>
            </div>

            {/* Footer bar */}
            <div className="mt-4 pt-3 border-t border-forge-border">
              <p className="bg-forge-primary/10 text-forge-primary text-xs font-mono rounded px-3 py-1.5 text-center tracking-wide">
                Enterprise plan · All controls enabled
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Feature Section shared shell ─────────────────────────────────────────────

interface FeatureItem {
  label: string;
  title: string;
  description: string;
  bullets: string[];
  visual: React.ReactNode;
  reverse?: boolean;
}

function FeatureSection({ label, title, description, bullets, visual, reverse = false }: FeatureItem) {
  const textCol = (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={transition(0)}
    >
      <p className="label-mono mb-3">{label}</p>
      <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground leading-snug mb-4">
        {title}
      </h2>
      <p className="text-forge-text-muted leading-relaxed mb-6">{description}</p>
      <ul className="space-y-2">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-foreground/80">
            <span className="text-forge-primary mt-0.5 shrink-0">→</span>
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  );

  const visualCol = (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={transition(0.12)}
    >
      {visual}
    </motion.div>
  );

  return (
    <section className="border-t border-forge-border px-6 lg:px-16 py-16 lg:py-24 max-w-7xl mx-auto">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? "lg:[&>*:first-child]:order-last" : ""}`}>
        {reverse ? <>{visualCol}{textCol}</> : <>{textCol}{visualCol}</>}
      </div>
    </section>
  );
}

// ─── Support mockup ───────────────────────────────────────────────────────────

function SupportMockup() {
  return (
    <div className="bg-[#0d0d0f] border border-forge-border rounded-xl p-5 font-mono text-xs">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-forge-border">
        <span className="text-forge-text-subtle tracking-wide">Support #ENT-0042</span>
        <span className="bg-emerald-400/10 text-emerald-400 rounded px-2 py-0.5">Open</span>
      </div>
      <div className="space-y-4">
        {/* Message 1 */}
        <div className="flex gap-3">
          <div className="w-7 h-7 rounded-full bg-forge-primary/20 border border-forge-primary/40 flex items-center justify-center text-forge-primary text-[10px] font-bold shrink-0">
            FE
          </div>
          <div className="flex-1">
            <p className="text-foreground/80 text-[11px] leading-relaxed mb-1">
              Hi! I&apos;m your dedicated engineer. I&apos;ll guide you through the initial setup. Let&apos;s start with SSO configuration.
            </p>
            <p className="text-forge-text-subtle text-[10px]">09:14 AM · Forge Engineer</p>
          </div>
        </div>
        {/* Message 2 */}
        <div className="flex gap-3">
          <div className="w-7 h-7 rounded-full bg-forge-surface border border-forge-border flex items-center justify-center text-forge-text-subtle text-[10px] font-bold shrink-0">
            YT
          </div>
          <div className="flex-1">
            <p className="text-foreground/80 text-[11px] leading-relaxed mb-1">
              Perfect. We&apos;re using Okta with SAML 2.0. Can you help with the metadata import?
            </p>
            <p className="text-forge-text-subtle text-[10px]">09:17 AM · Your Team</p>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-forge-border text-forge-text-subtle text-[10px] text-center">
        SLA: &lt;4h response · Dedicated Slack channel active
      </div>
    </div>
  );
}

// ─── Policy matrix mockup ─────────────────────────────────────────────────────

function PolicyMockup() {
  const roles = ["Admin", "Developer", "Viewer"];
  const perms: Record<string, [boolean, boolean, boolean]> = {
    Generate: [true, true, true],
    Publish: [true, true, false],
    Configure: [true, false, false],
  };

  return (
    <div className="bg-[#0d0d0f] border border-forge-border rounded-xl p-5 font-mono text-xs overflow-x-auto">
      <p className="text-forge-text-subtle tracking-wide mb-4 pb-3 border-b border-forge-border">
        Role Policy Matrix
      </p>
      <table className="w-full text-left text-[11px]">
        <thead>
          <tr>
            <th className="text-forge-text-subtle pb-2 pr-4 font-normal">Role</th>
            {Object.keys(perms).map((col) => (
              <th key={col} className="text-forge-text-subtle pb-2 pr-4 font-normal text-center">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {roles.map((role, ri) => (
            <tr key={role} className={ri < roles.length - 1 ? "border-b border-forge-border/50" : ""}>
              <td className="py-2 pr-4 text-foreground/70">{role}</td>
              {Object.values(perms).map((vals, ci) => (
                <td key={ci} className="py-2 pr-4 text-center">
                  {vals[ri] ? (
                    <span className="text-emerald-400 font-bold">✓</span>
                  ) : (
                    <span className="text-forge-text-subtle/50">✗</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 pt-3 border-t border-forge-border text-forge-text-subtle text-[10px] text-center">
        SAML/OIDC · RBAC · Full audit trail
      </div>
    </div>
  );
}

// ─── Deployment topology mockup ───────────────────────────────────────────────

function DeploymentMockup() {
  return (
    <div className="bg-[#0d0d0f] border border-forge-border rounded-xl p-5 font-mono text-xs">
      <p className="text-forge-text-subtle tracking-wide mb-5 pb-3 border-b border-forge-border">
        Deployment Topology
      </p>
      <div className="flex items-center justify-between gap-2">
        {/* Node 1 */}
        <div className="flex-1 border border-forge-border rounded-lg p-3 bg-forge-surface/40 text-center">
          <p className="text-foreground/90 mb-0.5">Your VPC</p>
          <p className="text-forge-text-subtle text-[10px]">Private network</p>
        </div>
        <span className="text-forge-primary text-base shrink-0">→</span>
        {/* Node 2 */}
        <div className="flex-1 border border-forge-primary/40 rounded-lg p-3 bg-forge-primary/5 text-center">
          <p className="text-forge-primary mb-0.5">Forge Space</p>
          <p className="text-forge-text-subtle text-[10px]">Self-hosted</p>
        </div>
        <span className="text-forge-primary text-base shrink-0">→</span>
        {/* Node 3 */}
        <div className="flex-1 border border-forge-border rounded-lg p-3 bg-forge-surface/40 text-center">
          <p className="text-foreground/90 mb-0.5">Your AI Provider</p>
          <p className="text-forge-text-subtle text-[10px]">BYOK routing</p>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-forge-border text-forge-text-subtle text-[10px] text-center">
        Docker + Helm · Network-isolated · Zero egress by default
      </div>
    </div>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

function CtaSection() {
  return (
    <section className="border-t border-forge-border px-6 lg:px-16 py-20 max-w-7xl mx-auto text-center">
      <motion.p
        className="label-mono mb-4"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={transition(0)}
      >
        GET STARTED
      </motion.p>

      <motion.h2
        className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={transition(0.07)}
      >
        Ready to talk enterprise?
      </motion.h2>

      <motion.p
        className="text-forge-text-muted max-w-md mx-auto mb-8"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={transition(0.14)}
      >
        Contact us to discuss custom pricing, deployment options, and dedicated
        support.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-3 justify-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={transition(0.21)}
      >
        <Button
          href="mailto:support@forgespace.co"
          ctaEvent={FORGE_CTA_EVENTS.CONTACT_SALES}
          ctaTarget="contact_sales"
          ctaLocation="enterprise_cta_primary"
          passAttribution
          size="lg"
        >
          Get in Touch
        </Button>
        <Button
          href="https://github.com/Forge-Space"
          external
          variant="outline"
          ctaEvent={FORGE_CTA_EVENTS.GITHUB}
          ctaTarget="github"
          ctaLocation="enterprise_cta_github"
          size="lg"
        >
          View GitHub
        </Button>
      </motion.div>
    </section>
  );
}

// ─── Page root ────────────────────────────────────────────────────────────────

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--forge-gradient-hero)" }}
        aria-hidden
      />
      <main id="main-content" className="relative">
        <HeroSection />

        <TrustStrip />

        <FeatureSection
          label="SUPPORT"
          title="White-glove onboarding and priority response."
          description="Your team gets a dedicated engineer, SLA-backed response times, and hands-on setup assistance."
          bullets={[
            "< 4h response SLA",
            "Dedicated Slack channel",
            "Quarterly business reviews",
          ]}
          visual={<SupportMockup />}
        />

        <FeatureSection
          label="SECURITY"
          title="Built for compliance from day one."
          description="SSO, RBAC, audit trails, and data residency controls so you can deploy Forge Space in regulated environments."
          bullets={[
            "SOC 2 Type II roadmap",
            "SAML/OIDC SSO",
            "Full audit log exports",
            "On-prem or private cloud",
          ]}
          visual={<PolicyMockup />}
          reverse
        />

        <FeatureSection
          label="DEPLOYMENT"
          title="Deploy anywhere your security team requires."
          description="Self-hosted on your own infrastructure or private cloud. Full control over data, models, and access."
          bullets={[
            "Docker + Helm charts included",
            "BYOK model routing",
            "Network-isolated deployment",
            "GitHub Enterprise support",
          ]}
          visual={<DeploymentMockup />}
        />

        <CtaSection />
      </main>
    </div>
  );
}
