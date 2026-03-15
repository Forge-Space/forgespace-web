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
  Zap,
  Github,
} from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EASE_SIZA } from "@/lib/constants";
import { FORGE_CTA_EVENTS } from "@/lib/analytics/ga4";

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
  { value: "2,994+", label: "Tests passing" },
  { value: "MIT", label: "Licensed" },
  { value: "$0", label: "To start" },
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
        {/* Hero */}
        <PageSection
          label="FOR STARTUPS"
          title="Ship Faster Without a Platform Team"
          subtitle="Enterprise governance at startup speed. Free for teams under 15 devs."
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

        {/* Pain Points */}
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {PAIN_POINTS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    ease: EASE_SIZA,
                    delay: 0.1 + i * 0.08,
                  }}
                  className="rounded-xl border border-forge-border bg-forge-surface/50 p-6"
                >
                  <p.icon className="w-5 h-5 text-forge-primary mb-3" />
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    {p.title}
                  </h3>
                  <p className="text-sm text-forge-text-muted">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How Forge Space Helps */}
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
          </div>
        </section>

        {/* For Accelerator Programs */}
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {ACCELERATOR_TIERS.map((tier, i) => (
                  <motion.div
                    key={tier.name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      ease: EASE_SIZA,
                      delay: 0.15 + i * 0.08,
                    }}
                    className="rounded-lg border border-forge-border bg-background/50 p-5"
                  >
                    <tier.icon className="w-5 h-5 text-forge-primary mb-3" />
                    <h3 className="font-display font-semibold text-foreground text-sm mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-forge-text-muted">{tier.desc}</p>
                  </motion.div>
                ))}
              </div>

              <Button
                href="mailto:partnerships@forgespace.co"
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

        {/* Social Proof / Stats */}
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    ease: EASE_SIZA,
                    delay: 0.1 + i * 0.06,
                  }}
                  className="text-center rounded-xl border border-forge-border bg-forge-surface/50 p-6"
                >
                  <p className="text-3xl font-display font-bold text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-forge-text-muted">{stat.label}</p>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="outline">MIT Licensed</Badge>
              <Badge variant="outline">Open Source</Badge>
              <Badge variant="outline">No Vendor Lock-in</Badge>
              <Badge variant="outline">Self-Hostable</Badge>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 pb-24">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE_SIZA }}
              className="text-center"
            >
              <Zap className="w-6 h-6 text-forge-primary mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-foreground mb-3">
                Start shipping governed code today
              </h2>
              <p className="text-forge-text-muted mb-8 max-w-lg mx-auto">
                Free for teams under 15 devs. No credit card. No platform
                engineer required.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  href="https://siza.forgespace.co"
                  external
                  variant="primary"
                  size="lg"
                  ctaEvent={FORGE_CTA_EVENTS.SIZA}
                  ctaTarget="siza"
                  ctaLocation="startups_footer_start_free"
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
                  ctaLocation="startups_footer_github"
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
                  ctaLocation="startups_footer_talk_to_us"
                >
                  Talk to Us
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
