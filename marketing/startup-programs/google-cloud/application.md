# Google for Startups Cloud Program Application
**URL:** https://cloud.google.com/startup
**Status:** Apply via online form
**Value:** Up to $350K GCP credits (AI-first track)
**Equity:** 0%
**Deadline:** Rolling (review takes 1–4 weeks)
**Note:** Already on Google Dev Program Premium — apply as AI-first for $350K tier

---

## Application Form Answers

### Company name
Forge Space

### Website
https://forgespace.co

### Company description (elevator pitch)
Forge Space is an open-source Internal Developer Platform that adds AI governance and quality scoring to software development teams. Our MCP-native architecture routes AI code generation through multiple providers including Google Gemini, with quality controls and audit trails.

### What GCP products do you use or plan to use?
- **Vertex AI / Gemini API** — Primary AI provider in mcp-gateway and siza-gen (already integrated via Gemini native provider added in v0.11.0)
- **Cloud Run** — Planned deployment target for mcp-gateway
- **Firebase / Firestore** — Potential future use for project config sync
- **BigQuery** — Analytics and usage telemetry

### How is your product AI-powered?
Forge Space is AI-native:
1. **siza-gen** uses Google Gemini natively for code generation (added in v0.11.0)
2. **mcp-gateway** routes requests across Gemini, OpenAI, Anthropic, and other providers
3. Quality scoring uses LLM-based code review
4. MCP protocol enables AI agent orchestration for developer workflows

### Funding stage
Pre-seed / bootstrapped. 834 registered users. Open-source across all repositories.

### What is your current MRR?
Pre-revenue. Growing user base (834 users).

### Why Google Cloud?
We're already using Gemini as a primary model provider. Google Cloud is the natural home for our AI inference workloads as we scale. GCP credits would let us increase our Gemini API usage, add Cloud Run deployments, and build out analytics infrastructure.

---

## Checklist
- [ ] Verify we qualify for AI-first track ($350K) vs standard track ($200K)
- [ ] Check if existing Google Dev Program Premium affects eligibility
- [ ] Note: Gemini integration in siza-gen is key differentiator for AI track
- [ ] Include GitHub org link: https://github.com/Forge-Space

## Notes
- AI-first track requires demonstrated AI workload — Gemini in siza-gen qualifies
- Mention existing Google Dev Program Premium membership
- Response time: 1–4 weeks for Google Cloud credits
- Credits cover: Vertex AI, Cloud Run, BigQuery, Firebase
