# Y Combinator Application — Summer 2026
**URL:** https://www.ycombinator.com/apply
**Deadline:** ~May 2026 (Summer 2026 batch)
**Status:** Draft — DO NOT SUBMIT before reviewing with co-founder (if any)
**Value:** $500K standard deal (7% equity), YC network, alumni office hours

---

> **Note:** YC is equity-based, not credits. Think carefully before applying solo.
> YC strongly prefers 2-person founding teams. A compelling solo application needs
> exceptional traction, technical depth, and a clear "why now" story.

---

## Company

**Company name:** Forge Space
**URL:** https://forgespace.co
**YC URL:** (leave blank until account created)

---

## Founders

**Founder 1:** Lucas Santana
**Role:** CEO / Solo Founder
**LinkedIn:** (add)
**GitHub:** (add)
**Time commitment:** Full-time

---

## Application Questions

### Describe what your company does in 50 words or less.
Forge Space is open-source infrastructure that adds governance, audit trails, and quality
scoring to AI-assisted software development. Our MCP Gateway routes AI requests across
providers with RBAC and compliance controls. forge-ai-init enforces governance policies in
CI/CD. Used in production by developer teams today.

### What is your company going to make? Please describe your product and what it does or will do.
Forge Space builds the governance layer that sits between development teams and AI code
generation tools.

The problem: As AI coding tools (Copilot, Cursor, Claude) become standard, engineering
organizations have no visibility into what AI produces, no audit trail for compliance, and
no way to enforce quality policies across teams. Large companies (Google, Meta) build
this in-house. Small teams cannot.

Our solution is two open-source products:

**MCP Gateway** — an open routing and orchestration layer for AI providers that implements
the Model Context Protocol (MCP) open standard. It adds circuit breaking, rate limiting,
RBAC, and cryptographic audit logging to every AI interaction. Teams deploy it on
Cloudflare Workers ($0/month) or self-host. Current production deployment: forgespace.co.

**forge-ai-init** — a governance CLI that scans repositories for AI quality violations,
generates compliance reports, and enforces policy gates in GitHub Actions. Think "ESLint
for AI code governance."

The business model: open-core. The self-hosted tools are MIT-licensed and free forever.
We monetize through Forge Space Cloud — managed multi-tenant infrastructure, SSO,
SOC 2 audit reports, and enterprise SLAs.

### Why did you pick this idea to work on? Do you have domain expertise in this area?
I spent years building developer infrastructure at scale. The governance gap in AI tooling
became obvious when I watched teams ship AI-generated code without any traceability,
audit trail, or quality enforcement — exactly the problems I had seen in supply chain
security and compliance engineering.

MCP (Model Context Protocol) is the key insight: Anthropic's open standard for AI tool
communication is becoming the TCP/IP of AI agents. Building governance infrastructure on
top of MCP means it works with every AI provider and every IDE — no lock-in, no
integration tax.

### What's new about what you're making? What substitutes do people have and why are they inferior?
Current alternatives:
- **Copilot for Business:** telemetry only, no governance, Microsoft lock-in
- **Snyk/Veracode:** security scanning, not AI governance
- **Internal tools:** large companies build bespoke — expensive, not shareable
- **Prompt engineering:** tribal knowledge, not auditable infrastructure

What's new: MCP-native governance that works across all AI providers with zero vendor
lock-in. The audit trail is cryptographic and immutable. The policy engine is declarative
and CI/CD-native. No comparable open-source project exists.

### How do or will you make money? How much could you make?
**Open-core SaaS model:**

Free tier: self-hosted MCP Gateway + forge-ai-init (MIT license, always free)
Forge Space Cloud: $49/seat/month — managed hosting, SOC 2 reports, SSO, SLA

TAM: The AI developer tools market is $3B+ today and growing 40% YoY. The governance
segment (compliance, audit, policy) is nascent but regulatory pressure (EU AI Act,
NIST AI RMF) is creating demand.

At 1,000 paying seats: ~$590K ARR
At 10,000 paying seats: ~$5.9M ARR

Land: open source drives inbound → free self-hosted deployment → Forge Space Cloud upsell.
Expand: seat count grows with team size. Enterprise: custom pricing for SOC 2, SSO, SLA.

### How far along are you?
- Live product: forgespace.co (MCP Gateway on Cloudflare Workers, production)
- 834 registered users
- forge-ai-init: published to npm, used in CI/CD by 3 teams
- All code open-source on GitHub
- $0 revenue (pre-monetization — cloud tier not yet launched)
- Solo founder, bootstrapped

### How long have you been working on this? How many lines of code have you written?
8 months full-time. ~45,000 lines of TypeScript/JavaScript across mcp-gateway,
forge-ai-init, siza-gen (design system), and forgespace.co.

### Are you looking for a co-founder?
Actively looking for a technical co-founder with backend/infrastructure background.
Ideal profile: distributed systems or cloud infrastructure experience, interested in
developer tooling and AI governance.

### What do you understand about your business that other companies in it just don't get?
The governance problem is not a security problem — it's an infrastructure problem.
Every team trying to govern AI output is reinventing the same wheel: logging prompts,
diffing outputs, enforcing policies, reporting to compliance. MCP makes it possible to
solve this once, at the protocol layer, for everyone.

The open-source distribution strategy is also misunderstood by competitors: free,
self-hostable infrastructure creates the trust that enterprise compliance buyers require.
You cannot sell governance tooling to a CISO if they don't trust where their audit logs go.

### Who are your competitors, and who might become competitors?
Current: No direct open-source MCP governance layer exists.
Adjacent competitors:
- LangSmith (LangChain) — AI observability, not governance/policy
- Portkey.ai — AI gateway, no governance layer, VC-funded
- PromptLayer — prompt tracking only

Potential: GitHub (Copilot enterprise), Anthropic (Claude for Enterprise), major cloud
providers (AWS Bedrock governance features). These are also potential acquirers.

### What's your monthly growth rate?
User registrations: ~15% MoM (organic, no paid acquisition until March 2026)
GitHub stars: growing, tracking in forgespace.co analytics

---

## Checklist

- [ ] Create YC account at ycombinator.com/apply
- [ ] Complete "Basics" section (company info, founders)
- [ ] Fill application questions using content above (personalize before submitting)
- [ ] Record 1-min video demo of MCP Gateway in action
- [ ] Record 1-min founder intro video
- [ ] Gather: GitHub link, live product URL, user count, growth metrics
- [ ] Submit before batch deadline (~May 2026 for S26)
- [ ] Update `startup-programs/application-status` memory with submission date
