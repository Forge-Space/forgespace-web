const SITE_URL = "https://forgespace.co";

export const organizationJsonLd = {
  "@type": "Organization",
  name: "Forge Space",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  sameAs: [
    "https://github.com/Forge-Space",
  ],
};

export const websiteJsonLd = {
  "@type": "WebSite",
  name: "Forge Space",
  url: SITE_URL,
};

export const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Forge Space",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Cross-platform",
  description:
    "Open-source Internal Developer Platform. AI code generation with scorecards, policy packs, and audit trails.",
  url: SITE_URL,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "Forge Space",
    url: SITE_URL,
  },
};

export const globalStructuredData = {
  "@context": "https://schema.org",
  "@graph": [organizationJsonLd, websiteJsonLd],
};
