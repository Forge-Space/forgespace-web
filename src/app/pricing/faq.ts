interface PricingFaqItem {
  q: string;
  a: string;
}

export const FAQ_ITEMS: PricingFaqItem[] = [
  {
    q: "What counts as a generation?",
    a: "Each time you generate a component, page, form, or scaffold through Siza, it counts as one generation. Editing or refining an existing generation does not count.",
  },
  {
    q: "Can I self-host Forge Space?",
    a: "Yes. The entire stack is MIT licensed and runs with Docker. Self-hosted deployments have unlimited generations — the limits above apply to the hosted platform only.",
  },
  {
    q: "What AI models are supported?",
    a: "Gemini, Claude, GPT-4o, and local models via Ollama. Model availability depends on your current environment and configured providers.",
  },
  {
    q: "Is my API key secure?",
    a: "API keys are encrypted with AES-256 in your browser before being stored. We use client-side encryption — your keys never exist in plaintext on our servers.",
  },
  {
    q: "Can I bring my own API key on the free plan?",
    a: "BYOK availability depends on the active plan and environment configuration.",
  },
  {
    q: "What happens if I exceed my generation limit?",
    a: "Behavior depends on the active plan configuration and current capacity policy.",
  },
];

export function getPricingFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
