# Cloudflare for Startups Application
**URL:** https://cloudflare.com/forstartups/
**Status:** Self-serve portal, rolling admissions
**Value:** $5K–$250K credits (Workers AI $50K, R2 $10K caps)

---

## Application Form Answers

### Company name
Forge Space

### Website
https://forgespace.co

### What does your startup do? (1–3 sentences)
Forge Space is an open-source Internal Developer Platform that adds governance, quality
scoring, and audit trails to AI-assisted software development. We give small teams the
engineering infrastructure that large companies build in-house — for free. Our MCP Gateway
is already deployed on Cloudflare Workers in production.

### What Cloudflare products are you using or plan to use?
Currently using: Cloudflare Workers (mcp-gateway production deployment), Cloudflare DNS,
Cloudflare CDN.

Planned: Workers AI (for local model inference fallback), R2 (audit log storage and asset
delivery), Durable Objects (session state for MCP connections), Workers KV (rate limit
state).

### How does Cloudflare infrastructure support your product?
MCP Gateway — our AI routing and governance layer — runs entirely on Cloudflare Workers.
The zero-latency edge deployment enables us to deliver <50ms MCP request routing globally
with $0/month infrastructure cost at our current scale. This zero-cost architecture is
central to our open-source positioning: teams can self-host governance infrastructure
without paying for it.

Workers AI would allow us to add local model inference to the gateway, enabling fully
offline/air-gapped governance for enterprise customers.

### Stage of company
Early-stage / pre-seed. 834 registered users, product in production.

### Number of employees
1 (solo founder)

### Funding raised
$0 (bootstrapped)

---

## Checklist

- [ ] Go to https://cloudflare.com/forstartups/
- [ ] Click "Apply now"
- [ ] Fill form using content above
- [ ] Submit proof of: working product (forgespace.co + mcp-gateway on Workers)
- [ ] After approval: activate Workers AI credits, R2 credits
- [ ] Update memory `startup-programs/application-status` with approval date and credit amounts
