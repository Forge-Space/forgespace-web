'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { EASE_SIZA } from '@/lib/constants';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'For individual developers exploring AI-assisted development.',
    features: [
      '10 generations / month',
      '2 projects',
      'Scorecard on every generation',
      'Policy checks in CI',
      'Community support',
    ],
    cta: 'Get Started',
    href: 'https://siza.forgespace.co/signup',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For power users who generate daily and need full governance.',
    features: [
      '500 generations / month',
      'Unlimited projects',
      'Priority AI models',
      'BYOK (bring your own key)',
      'Audit log access',
      'Email support',
    ],
    cta: 'Start Free Trial',
    href: 'https://siza.forgespace.co/signup?plan=pro',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$49',
    period: '/month',
    description: 'For teams that need shared governance and collaboration.',
    features: [
      'Everything in Pro',
      'Team management',
      'Org-level policies',
      'Shared templates',
      'Scorecard trends dashboard',
      'Priority support',
    ],
    cta: 'Contact Us',
    href: 'mailto:hello@forgespace.co',
    highlighted: false,
  },
];

export default function PricingPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <main className="relative max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: EASE_SIZA }
          }
          className="text-center mb-16"
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-forge-text-muted max-w-xl mx-auto">
            Start free. Upgrade when you need more generations or team features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.4, ease: EASE_SIZA, delay: 0.1 + i * 0.08 }
              }
              className={`relative rounded-xl border p-8 flex flex-col ${
                tier.highlighted
                  ? 'border-forge-primary bg-forge-primary/5 shadow-[var(--forge-glow-primary-sm)]'
                  : 'border-forge-border bg-forge-surface/50'
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-forge-primary px-3 py-1 text-xs font-medium text-white">
                  Most Popular
                </span>
              )}
              <h2 className="text-xl font-semibold mb-2">{tier.name}</h2>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-bold">{tier.price}</span>
                <span className="text-sm text-forge-text-muted">{tier.period}</span>
              </div>
              <p className="text-sm text-forge-text-muted mb-6">{tier.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-forge-primary mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.href}
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
                  tier.highlighted
                    ? 'bg-forge-primary hover:bg-forge-primary-hover text-white'
                    : 'border border-forge-border hover:bg-forge-surface text-foreground/90'
                }`}
              >
                {tier.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: EASE_SIZA, delay: 0.5 }
          }
          className="text-center text-sm text-forge-text-muted mt-12"
        >
          All plans include scorecard CI, policy checks, and open-source access.
          <br />
          Need enterprise features? <a href="mailto:hello@forgespace.co" className="text-forge-primary hover:underline">Contact us</a>.
        </motion.p>
      </main>
    </div>
  );
}
