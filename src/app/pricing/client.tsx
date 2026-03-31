"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, ArrowRight, ChevronDown, Minus } from "lucide-react";
import { EASE_SIZA } from "@/lib/constants";
import { FORGE_CTA_EVENTS, type ForgeCtaEvent } from "@/lib/analytics/ga4";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FAQ_ITEMS } from "./faq";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    callout: "Perfect for solo builders",
    description: "For individual developers exploring AI-assisted development.",
    features: [
      "10 generations / month",
      "2 projects",
      "Scorecard on every generation",
      "Policy checks in CI",
      "Community support",
    ],
    cta: "Get Started",
    href: "https://siza.forgespace.co/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    callout: "Best for power users",
    description: "For power users who generate daily and need full governance.",
    features: [
      "500 generations / month",
      "Unlimited projects",
      "Priority AI models",
      "BYOK (bring your own key)",
      "Audit log access",
      "Email support",
    ],
    cta: "Start Free Trial",
    href: "https://siza.forgespace.co/signup?plan=pro",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "/month",
    callout: "Built for teams",
    description: "For teams that need shared governance and collaboration.",
    features: [
      "Everything in Pro",
      "Team management",
      "Org-level policies",
      "Shared templates",
      "Scorecard trends dashboard",
      "Priority support",
    ],
    cta: "Contact Us",
    href: "mailto:support@forgespace.co",
    highlighted: false,
  },
];

type ComparisonValue = string | true | false;

const comparisonRows: {
  label: string;
  free: ComparisonValue;
  pro: ComparisonValue;
  team: ComparisonValue;
}[] = [
  { label: "Generations / month", free: "10", pro: "500", team: "Unlimited" },
  { label: "Projects", free: "2", pro: "Unlimited", team: "Unlimited" },
  { label: "BYOK", free: false, pro: true, team: true },
  { label: "Audit log", free: false, pro: true, team: true },
  { label: "Scorecard access", free: true, pro: true, team: true },
  { label: "Policy packs in CI", free: true, pro: true, team: true },
  { label: "Shared templates", free: false, pro: false, team: true },
  { label: "Support tier", free: "Community", pro: "Email", team: "Priority" },
];

function ComparisonCell({ value }: { value: ComparisonValue }) {
  if (value === true) {
    return (
      <span aria-label="Included">
        <Check className="w-4 h-4 text-emerald-400 mx-auto" aria-hidden />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center gap-1 text-xs text-forge-text-subtle" aria-label="Not included">
        <span aria-hidden className="opacity-50">✕</span>
        <span className="sr-only">Not included</span>
      </span>
    );
  }
  return <span className="text-sm text-foreground">{value}</span>;
}

function FAQItem({ q, a, itemId }: { q: string; a: string; itemId: string }) {
  const [open, setOpen] = useState(false);
  const triggerId = `pricing-faq-trigger-${itemId}`;
  const panelId = `pricing-faq-panel-${itemId}`;

  return (
    <div className="border-b border-forge-border last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        id={triggerId}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between py-6 text-left text-sm font-medium text-foreground transition-colors hover:text-forge-primary"
      >
        {q}
        <ChevronDown
          className={`w-4 h-4 text-forge-text-subtle shrink-0 ml-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div id={panelId} role="region" aria-labelledby={triggerId}>
          <p className="pb-4 text-sm text-forge-text-muted leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function PricingPage() {
  const getTierCtaEvent = (href: string): ForgeCtaEvent =>
    href.startsWith("mailto:")
      ? FORGE_CTA_EVENTS.CONTACT_SALES
      : FORGE_CTA_EVENTS.SIZA;

  const getTierCtaTarget = (href: string): string =>
    href.startsWith("mailto:") ? "contact_sales" : "siza";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <main id="main-content" className="relative max-w-5xl mx-auto px-6 py-24">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_SIZA }}
          className="relative text-center mb-6"
        >
          {/* Radial violet glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -translate-y-1/4 h-64 rounded-full mx-auto w-2/3"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(124,58,237,0.18) 0%, transparent 70%)",
            }}
          />

          <h1 className="relative text-display-lg font-display font-bold tracking-tight mb-4 leading-tight">
            Ship fast.{" "}
            <span className="text-forge-primary">Ship with confidence.</span>
          </h1>
          <p className="relative text-base text-forge-text-muted max-w-md mx-auto mb-6">
            AI governance for every team — from solo builders to enterprises.
          </p>

          <div className="relative flex items-center justify-center gap-2 flex-wrap" role="group" aria-label="MIT Licensed, Open Source">
            <Badge variant="outline">MIT Licensed</Badge>
            <Badge variant="outline">Open Source</Badge>
          </div>
        </motion.div>

        {/* Trust strip */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE_SIZA, delay: 0.2 }}
          className="text-center text-xs text-forge-text-subtle tracking-wide mb-16"
        >
          Flexible plans
          <span className="mx-2 opacity-40">·</span>
          MIT Licensed
          <span className="mx-2 opacity-40">·</span>
          Open Source
        </motion.p>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 items-start">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: EASE_SIZA,
                delay: 0.1 + i * 0.08,
              }}
              className={`relative rounded-xl border flex flex-col overflow-hidden ${
                tier.highlighted
                  ? "border-forge-primary bg-[rgba(124,58,237,0.04)] shadow-[0_0_30px_rgba(124,58,237,0.12)] md:scale-[1.02] md:z-10"
                  : "border-forge-border bg-forge-surface/50"
              }`}
            >
              {/* Top accent border */}
              <div
                className={`h-[2px] w-full ${
                  tier.highlighted
                    ? "bg-forge-primary"
                    : "bg-forge-border"
                }`}
              />

              <div className="p-8 flex flex-col flex-1">
                {tier.highlighted && (
                  <Badge
                    variant="solid"
                    className="absolute top-4 right-4"
                  >
                    Most Popular
                  </Badge>
                )}

                <h2 className="text-lg font-semibold mb-1">{tier.name}</h2>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                  {" "}
                  <span className="text-sm text-forge-text-muted">{tier.period}</span>
                </div>
                <p className="text-xs font-medium text-forge-text-subtle uppercase tracking-widest mb-1">
                  {tier.callout}
                </p>
                <p className="text-sm text-forge-text-muted mb-6">
                  {tier.description}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  href={tier.href}
                  external
                  variant={tier.highlighted ? "primary" : "outline"}
                  ctaEvent={getTierCtaEvent(tier.href)}
                  ctaTarget={getTierCtaTarget(tier.href)}
                  ctaLocation={`pricing_tier_${tier.name.toLowerCase()}`}
                  passAttribution
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature comparison strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_SIZA }}
          className="mb-16 rounded-xl border border-forge-border bg-forge-surface/30 overflow-hidden"
        >
          <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="border-b border-forge-border">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-widest text-forge-text-subtle w-1/2">
                  Feature
                </th>
                {tiers.map((tier) => (
                  <th
                    key={tier.name}
                    className={`px-4 py-4 text-center text-xs font-semibold uppercase tracking-widest ${
                      tier.highlighted ? "text-forge-primary" : "text-forge-text-subtle"
                    }`}
                  >
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={row.label}
                  className={`border-b border-forge-border last:border-b-0 ${
                    i % 2 === 1 ? "bg-white/[0.01]" : ""
                  }`}
                >
                  <td className="px-6 py-3 text-sm text-forge-text-muted">
                    {row.label}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <ComparisonCell value={row.free} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <ComparisonCell value={row.pro} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <ComparisonCell value={row.team} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_SIZA }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-center text-xs font-mono uppercase tracking-widest text-forge-text-subtle mb-3">
            Questions
          </p>
          <h2 className="text-2xl font-display font-bold tracking-tight text-center mb-8">
            Frequently asked questions
          </h2>
          <div className="rounded-xl border border-forge-border bg-forge-surface/30 px-6">
            {FAQ_ITEMS.map((item) => (
              <FAQItem
                key={item.q}
                q={item.q}
                a={item.a}
                itemId={item.q.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              />
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Platform highlights">
            <Badge variant="outline">MIT Licensed</Badge>
            <Badge variant="outline">BYOK Encryption</Badge>
          </div>
        </motion.div>

        {/* Footer contact */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE_SIZA, delay: 0.5 }}
          className="text-center text-sm text-forge-text-muted mt-12"
        >
          Need enterprise features?{" "}
          <a
            href="mailto:support@forgespace.co"
            data-fs-cta-event={FORGE_CTA_EVENTS.CONTACT_SALES}
            data-fs-cta-target="contact_sales"
            data-fs-cta-location="pricing_footer_contact"
            data-fs-pass-attribution="true"
            className="text-forge-primary hover:underline"
          >
            Contact us
          </a>
          .
        </motion.p>
      </main>
    </div>
  );
}
