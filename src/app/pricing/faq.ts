export interface PricingFaqItem {
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
    a: "Gemini (default on free tier), Claude, GPT-4o, and local models via Ollama. Pro and Team plans get access to priority models with faster response times.",
  },
  {
    q: "Is my API key secure?",
    a: "API keys are encrypted with AES-256 in your browser before being stored. We use client-side encryption — your keys never exist in plaintext on our servers.",
  },
  {
    q: "Can I bring my own API key on the free plan?",
    a: "BYOK is available on Pro and Team plans. The free tier uses Gemini with shared capacity.",
  },
  {
    q: "What happens if I exceed my generation limit?",
    a: "You'll be prompted to upgrade or wait until the next billing cycle. No overage charges — we don't surprise you with bills.",
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
