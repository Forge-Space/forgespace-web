"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, ArrowRight, ChevronDown } from "lucide-react";
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
    description:
      "For power users who generate daily and need full governance.",
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
    description:
      "For teams that need shared governance and collaboration.",
    features: [
      "Everything in Pro",
      "Team management",
      "Org-level policies",
      "Shared templates",
      "Scorecard trends dashboard",
      "Priority support",
    ],
    cta: "Contact Us",
    href: "mailto:hello@forgespace.co",
    highlighted: false,
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-forge-border last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-foreground transition-colors hover:text-forge-primary"
      >
        {q}
        <ChevronDown
          className={`w-4 h-4 text-forge-text-subtle shrink-0 ml-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="pb-4 text-sm text-forge-text-muted leading-relaxed">
          {a}
        </p>
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
      <main className="relative max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_SIZA }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-forge-text-muted max-w-xl mx-auto">
            Start free. Upgrade when you need more generations or team
            features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
              className={`relative rounded-xl border p-8 flex flex-col ${
                tier.highlighted
                  ? "border-forge-primary bg-forge-primary/5 shadow-[var(--forge-glow-primary-sm)]"
                  : "border-forge-border bg-forge-surface/50"
              }`}
            >
              {tier.highlighted && (
                <Badge
                  variant="solid"
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                >
                  Most Popular
                </Badge>
              )}
              <h2 className="text-xl font-semibold mb-2">{tier.name}</h2>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-bold">{tier.price}</span>
                <span className="text-sm text-forge-text-muted">
                  {tier.period}
                </span>
              </div>
              <p className="text-sm text-forge-text-muted mb-6">
                {tier.description}
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm"
                  >
                    <Check className="w-4 h-4 text-forge-primary mt-0.5 shrink-0" />
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
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-20">
          <Badge variant="outline">MIT Licensed</Badge>
          <Badge variant="outline">SOC 2 Ready</Badge>
          <Badge variant="outline">BYOK Encryption</Badge>
          <Badge variant="outline">Self-Hostable</Badge>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_SIZA }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-display font-bold tracking-tight text-center mb-8">
            Frequently asked questions
          </h2>
          <div className="rounded-xl border border-forge-border bg-forge-surface/30 px-6">
            {FAQ_ITEMS.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE_SIZA, delay: 0.5 }}
          className="text-center text-sm text-forge-text-muted mt-12"
        >
          Need enterprise features?{" "}
          <a
            href="mailto:hello@forgespace.co"
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
