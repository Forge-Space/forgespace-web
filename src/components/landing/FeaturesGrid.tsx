import {
  Sparkles,
  Plug,
  Shield,
  Gift,
  Server,
  Cpu,
  ShieldCheck,
  LayoutGrid,
  Compass,
  ArrowRightLeft,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeaturesGridProps {
  repoCount: number;
}

const FEATURES: Feature[] = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description:
      "Natural language to production UI. Describe a dashboard, form, or landing page and get structured, typed, reviewable code.",
  },
  {
    icon: Plug,
    title: "MCP-Native Architecture",
    description:
      "Generation, governance, branding, and migration capabilities are composed through MCP so each layer stays replaceable.",
  },
  {
    icon: Shield,
    title: "Privacy-First BYOK",
    description:
      "Bring your own API key with client-side AES-256 encryption. Your credentials never touch our servers.",
  },
  {
    icon: Gift,
    title: "Zero-Cost Start",
    description:
      "Start free with open-source defaults and scale into managed workflows only when your team needs them.",
  },
  {
    icon: Server,
    title: "Self-Hostable",
    description:
      "Run the stack locally with Docker under MIT licensing and keep full control over infrastructure and data.",
  },
  {
    icon: Cpu,
    title: "Multi-Model Workflows",
    description:
      "Switch between Gemini, Claude, GPT, and local models without rewriting your generation flow.",
  },
  {
    icon: ShieldCheck,
    title: "CI Quality Gates",
    description:
      "Integrate forge-ai-action in GitHub workflows for automatic scoring, PR annotations, and threshold enforcement.",
  },
  {
    icon: LayoutGrid,
    title: "Generation Gallery",
    description:
      "Browse high-quality examples, copy code, and reuse prompts to accelerate onboarding and internal standards.",
  },
  {
    icon: ArrowRightLeft,
    title: "Legacy Migration",
    description:
      "Assess legacy systems, identify safe boundaries, and generate phased modernization plans with measurable gates.",
  },
  {
    icon: Compass,
    title: "Guided Onboarding",
    description:
      "Built-in tours and curated defaults help new teams adopt the platform without separate setup playbooks.",
  },
];

export function FeaturesGrid({ repoCount }: FeaturesGridProps) {
  return (
    <section className="relative py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--forge-gradient-section)" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-forge-primary-hover">
            Features
          </p>
          <h2 className="mb-4 text-3xl font-display font-bold tracking-tight text-foreground sm:text-4xl">
            Built for developers who ship
          </h2>
          <p className="text-lg leading-relaxed text-forge-text-muted">
            A full delivery stack across {repoCount} actively maintained repositories, with
            governance built into the generation loop.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-forge-border bg-forge-surface p-6 transition-all duration-200 hover:border-forge-primary/40 hover:shadow-[var(--forge-glow-primary-sm)]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-forge-primary/20 text-forge-primary-hover transition-colors group-hover:bg-forge-primary/30">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-display font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-forge-text-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
