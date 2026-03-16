"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  ShieldAlert,
  Users,
  TrendingDown,
  ClipboardCheck,
  Lock,
  Blocks,
  Rocket,
  GraduationCap,
  GitBranch,
  FlaskConical,
  Scale,
  Github,
} from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EASE_SIZA } from "@/lib/constants";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";
import { CTASection } from "@/components/landing/CTASection";

const PAIN_POINTS = [
  {
    icon: ShieldAlert,
    title: "AI Code Goes Ungoverned",
    desc: "Copilot and ChatGPT generate code fast — but nobody reviews it for security, quality, or compliance. Vulnerabilities ship silently.",
  },
  {
    icon: Users,
    title: "No Platform Engineer Budget",
    desc: "You can't hire a platform team at seed stage. But investors and enterprise customers expect governance from day one.",
  },
  {
    icon: TrendingDown,
    title: "Quality Debt Compounds Silently",
    desc: "Every ungoverned PR adds tech debt. By Series A, you're spending 40% of engineering time on rework instead of features.",
  },
];

const FEATURES = [
  {
    icon: ClipboardCheck,
    title: "Instant Governance",
    desc: "Scorecards on every PR — security, quality, and compliance checks run automatically. No manual review bottleneck.",
  },
  {
    icon: Lock,
    title: "Policy Packs",
    desc: "Zero-config security baseline. OWASP, dependency scanning, and secret detection out of the box.",
  },
  {
    icon: Blocks,
    title: "MCP Architecture",
    desc: "Extensible without a platform team. Add custom tools, integrations, and workflows through the Model Context Protocol.",
  },
  {
    icon: Rocket,
    title: "Zero-Cost Start",
    desc: "Free tier for teams under 15 devs. No credit card required. Upgrade only when you scale.",
  },
];

const ACCELERATOR_TIERS = [
  {
    name: "Cohort License",
    desc: "Free Pro tier for every startup in your cohort during the program.",
    icon: GraduationCap,
  },
  {
    name: "Demo Day Ready",
    desc: "Governance dashboards your startups can show investors as proof of engineering maturity.",
    icon: GitBranch,
  },
  {
    name: "Curriculum Integration",
    desc: "Workshop materials and onboarding guides tailored to your program's tech stack.",
    icon: FlaskConical,
  },
];

const STATS = [
  { value: "9", label: "Open-source repos" },
  { value: "MIT", label: "Licensed" },
  { value: "$0", label: "To start" },
  { value: "Self-Hostable", label: "No vendor lock-in" },
];

// Siza scorecard mockup rows
const SCORECARD_ROWS = [
  { status: "pass", label: "Security", score: "94/100" },
  { status: "pass", label: "Accessibility", score: "89/100" },
  { status: "pass", label: "Maintainability", score: "91/100" },
  { status: "warn", label: "Performance", score: "72/100" },
];

export default function StartupsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--forge-gradient-hero)" }}
        aria-hidden
      />

      <main id="main-content" className="relative">
        {/* Hero — 2-column split */}
        <section className="relative py-20 sm:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: existing PageSection hero content */}
              <div>
                <PageSection
                  label="IDP FOR STARTUPS"
                  title="The Dev Platform for Startups"
                  subtitle="Enterprise governance at startup speed — no platform team required. Free for teams under 15 devs."
                >
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE_SIZA, delay: 0.2 }}
                    className="flex flex-wrap gap-3"
                  >
                    <Button
                      href="https://siza.forgespace.co"
                      external
                      variant="primary"
                      size="lg"
                      ctaEvent={FORGE_CTA_EVENTS.SIZA}
                      ctaTarget="siza"
                      ctaLocation="startups_hero_start_free"
                      passAttribution
                    >
                      Start Free
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button
                      href="https://github.com/Forge-Space"
                      external
                      variant="outline"
                      size="lg"
                      ctaEvent={FORGE_CTA_EVENTS.GITHUB}
                      ctaTarget="github"
                      ctaLocation="startups_hero_github"
                    >
                      <Github className="w-4 h-4" />
                      View on GitHub
                    </Button>
                    <Button
                      href="/enterprise"
                      variant="ghost"
                      size="lg"
                      ctaEvent={FORGE_CTA_EVENTS.CONTACT_SALES}
                      ctaTarget="contact_sales"
                      ctaLocation="startups_hero_talk_to_us"
                    >
                      Talk to Us
                    </Button>
                  </motion.div>
                </PageSection>
              </div>

              {/* Right: Siza scorecard mockup */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: EASE_SIZA, delay: 0.3 }}
                className="hidden lg:block"
                aria-hidden
              >
                <div className="bg-[#0d0d0f] border border-[--forge-border] rounded-xl p-6 font-mono text-sm shadow-2xl shadow-black/40">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#3a3a3e]" />
                      <span className="w-3 h-3 rounded-full bg-[#3a3a3e]" />
                      <span className="w-3 h-3 rounded-full bg-[#3a3a3e]" />
                    </div>
                    <span className="ml-2 text-xs text-[#6b6b72]">forge-ai-action · PR #47</span>
                  </div>

                  <div className="border-t border-[--forge-border] pt-4 space-y-2.5">
                    {SCORECARD_ROWS.map((row) => (
                      <div key={row.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {row.status === "pass" ? (
                            <span className="text-emerald-400 text-xs">✓</span>
                          ) : (
                            <span className="text-amber-400 text-xs">⚠</span>
                          )}
                          <span className="text-[#c4c4cc] text-xs">{row.label}</span>
                        </div>
                        <span
                          className={
                            row.status === "pass"
                              ? "text-emerald-400 text-xs tabular-nums"
                              : "text-amber-400 text-xs tabular-nums"
                          }
                        >
                          {row.score}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[--forge-border] mt-4 pt-4 flex items-center justify-between">
                    <span className="text-[#6b6b72] text-xs">Overall</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#7c3aed] font-bold text-sm">A</span>
                      <span className="text-[#c4c4cc] text-xs tabular-nums">87/100</span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                        Passed
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pain Points — editorial numbered list */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE_SIZA }}
              className="text-sm font-mono text-forge-primary tracking-wider uppercase mb-4"
            >
              THE PROBLEM
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE_SIZA, delay: 0.05 }}
              className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-foreground mb-10"
            >
              Startups move fast — governance doesn&apos;t keep up
            </motion.h2>

            <div className="flex flex-col">
              {PAIN_POINTS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: EASE_SIZA, delay: 0.1 + i * 0.08 }}
                  className="border-t border-forge-border py-8 grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr] gap-6 items-start"
                >
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-forge-primary/30 leading-none pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <p.icon className="w-5 h-5 text-forge-primary flex-shrink-0" />
                      <h3 className="font-display font-semibold text-lg text-foreground leading-tight">
                        {p.title}
                      </h3>
                    </div>
                    <p className="text-forge-text-muted leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
              {/* closing bottom border */}
              <div className="border-t border-forge-border" />
            </div>
          </div>
        </section>

        {/* How Forge Space Helps — 2x2 with accents */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE_SIZA }}
              className="text-sm font-mono text-forge-primary tracking-wider uppercase mb-4"
            >
              THE SOLUTION
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE_SIZA, delay: 0.05 }}
              className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-foreground mb-10"
            >
              How Forge Space helps
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: EASE_SIZA, delay: 0.1 + i * 0.08 }}
                  className="rounded-xl border border-forge-border border-l-2 border-l-[color:color-mix(in_srgb,var(--forge-primary)_40%,transparent)] bg-forge-surface/50 p-6"
                >
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-forge-primary/10 mb-4">
                    <f.icon className="w-4 h-4 text-forge-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-forge-text-muted leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* For Accelerator Programs — numbered benefit list */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE_SIZA }}
              className="rounded-xl border border-forge-primary/30 bg-forge-primary/5 p-8 sm:p-10"
            >
              <div className="flex items-center gap-2 mb-4">
                <Scale className="w-5 h-5 text-forge-primary" />
                <p className="text-sm font-mono text-forge-primary tracking-wider uppercase">
                  FOR ACCELERATOR PROGRAMS
                </p>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-foreground mb-3">
                Give your cohort a competitive advantage
              </h2>
              <p className="text-forge-text-muted mb-8 max-w-2xl">
                Partner with Forge Space to give every startup in your program
                enterprise-grade governance from day one — at zero cost.
              </p>

              {/* Numbered benefit list */}
              <div className="flex flex-col mb-8">
                {ACCELERATOR_TIERS.map((tier, i) => (
                  <motion.div
                    key={tier.name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: EASE_SIZA, delay: 0.15 + i * 0.08 }}
                    className="border-t border-forge-primary/20 py-5 grid grid-cols-[2.5rem_1fr] gap-4 items-start"
                  >
                    <span className="font-mono text-sm font-bold text-forge-primary/50 leading-none pt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <span className="font-display font-semibold text-foreground">
                        {tier.name}
                      </span>
                      <span className="text-forge-text-muted ml-2">—</span>
                      <span className="text-forge-text-muted ml-2 text-sm">{tier.desc}</span>
                    </div>
                  </motion.div>
                ))}
                <div className="border-t border-forge-primary/20" />
              </div>

              <Button
                href="mailto:support@forgespace.co"
                external
                variant="primary"
                ctaEvent={FORGE_CTA_EVENTS.CONTACT_SALES}
                ctaTarget="contact_sales"
                ctaLocation="startups_accelerator_partner"
                passAttribution
              >
                Become a Partner
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Stats — single horizontal bar */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE_SIZA }}
              className="text-sm font-mono text-forge-primary tracking-wider uppercase mb-4 text-center"
            >
              BUILT IN THE OPEN
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE_SIZA, delay: 0.05 }}
              className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-foreground mb-10 text-center"
            >
              Zero-cost architecture, production-grade quality
            </motion.h2>

            {/* Horizontal stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE_SIZA, delay: 0.1 }}
              className="flex flex-wrap items-center justify-center gap-x-0 gap-y-4 mb-10 rounded-xl border border-forge-border bg-forge-surface/30 px-6 py-6"
            >
              {STATS.map((stat, i) => (
                <div key={stat.label} className="flex items-center">
                  <div className="flex items-baseline gap-2 px-5">
                    <span className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                      {stat.value}
                    </span>
                    <span className="text-sm text-forge-text-muted whitespace-nowrap">
                      {stat.label}
                    </span>
                  </div>
                  {i < STATS.length - 1 && (
                    <span className="text-forge-border text-lg font-light select-none">·</span>
                  )}
                </div>
              ))}
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="outline">MIT Licensed</Badge>
              <Badge variant="outline">Open Source</Badge>
              <Badge variant="outline">No Vendor Lock-in</Badge>
              <Badge variant="outline">Self-Hostable</Badge>
            </div>
          </div>
        </section>
      </main>

      <CTASection />
    </div>
  );
}
