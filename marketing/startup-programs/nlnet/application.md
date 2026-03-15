# NLnet NGI0 Commons Fund Application
**Deadline: April 1, 2026**
**Fund URL:** https://nlnet.nl/propose/
**Track:** NGI0 Commons Fund — open standards infrastructure
**Budget target:** EUR 25,000–50,000

---

## Project name
Forge Space — Open Governance Infrastructure for AI-Assisted Development

## Abstract (≤200 words)

Forge Space is open-source infrastructure that adds governance, quality scoring, and audit
trails to AI-assisted software development. As AI code generation tools become universal,
teams lack tooling to assess, track, and control what AI produces. Forge Space fills this
gap with a MIT-licensed, self-hostable platform built on the Model Context Protocol (MCP)
open standard.

The project consists of two core open components:
- **MCP Gateway** — an open routing and orchestration layer for AI providers, implementing
  the MCP standard with circuit breaking, rate limiting, RBAC, and audit logging
- **forge-ai-init** — a governance CLI that scans repositories for quality policy violations,
  generates migration reports, and enforces governance gates in CI/CD pipelines

Both components are provider-agnostic, fully self-hostable, and designed to work as shared
infrastructure that any organization can operate. The project is used in production by the
Siza workspace and the Forge Space IDP.

Funding would accelerate: MCP standard conformance testing, multi-tenant isolation
improvements, documentation for self-hosted operators, and community contributor tooling.

---

## Problem statement

AI code generation is now the default workflow for most developers. GitHub Copilot has 1.8M
paid subscribers; ChatGPT, Claude, and Gemini are used daily for code. Yet:

1. **No quality signal at generation time** — developers accept AI output without systematic
   quality assessment. Security vulnerabilities, policy violations, and technical debt are
   introduced silently.

2. **No open standard for AI tool orchestration** — every team builds bespoke LLM integration.
   The Model Context Protocol (MCP) exists as a standard but lacks production-grade open
   infrastructure for routing, auth, and observability.

3. **Governance is only available at enterprise scale** — Copilot for Business, Cursor Enterprise,
   and similar tools offer governance features but behind $20-50/seat paywalls. Small teams,
   open-source projects, and public-interest organizations cannot afford this.

The result: AI-generated code proliferates without quality gates, increasing software supply
chain risk across the ecosystem.

---

## Solution

Forge Space addresses this with three open components targeting the MCP standard:

### MCP Gateway (open routing layer)
- Implements the MCP JSON-RPC and streamable HTTP transport specifications
- Provider-agnostic: routes to Anthropic, OpenAI, Google, Ollama (local), and custom endpoints
- Production features: circuit breaker, provider failover, rate limiting per tenant, RBAC, audit log
- Self-hostable via Docker; Cloudflare Workers deployment available
- 1,042 tests, 13 Python modules, MIT licensed

### forge-ai-init (governance CLI)
- 119 scanner rules covering security, quality, and policy patterns
- Runs as a GitHub Action or local CLI: `forge-ai init assess`, `forge-ai init migrate`
- Generates scorecard reports with delta tracking between runs
- Test autogeneration workflow support (detects gaps, suggests test structure)
- 504 tests, MIT licensed

### siza-gen (generation quality engine)
- 528 curated code snippets for benchmarking AI output quality
- Provider-independent quality scoring against known patterns
- Lite runtime for edge deployment
- MIT licensed, published on npm

---

## Technical approach

**MCP standard compliance:** MCP Gateway implements the full MCP specification including
tool discovery, resource access, and prompt templates. We are building conformance tests
against the official MCP specification to ensure interoperability with any MCP-compliant
client.

**Self-hosted first:** All components run without external dependencies. mcp-gateway uses
SQLite for audit storage; forge-ai-init requires only Node.js. No vendor lock-in.

**Open governance model:** Policy rules in forge-ai-init are data files (YAML/JSON), not
compiled code. Organizations can contribute, fork, and customize rule sets without touching
the engine.

**Audit trail by design:** Every AI generation event is logged with provider, model, prompt
hash, quality score, and policy result. The audit log is append-only and exportable.

---

## Why this fits NGI0 Commons

The Model Context Protocol is emerging as the open standard for AI tool integration — similar
to how HTTP became the standard for web services. MCP Gateway provides the open infrastructure
layer that any organization needs to operate MCP in production: routing, auth, observability,
and reliability controls.

This is directly analogous to what nginx/Caddy are to HTTP or what Postfix is to SMTP: open
infrastructure that enables the standard to be used safely at scale without vendor dependency.

The alternative — each organization building their own AI routing layer — leads to fragmented,
insecure, and unauditable AI integration. Common infrastructure raises the floor for everyone.

---

## Prior work and current state

- **9 open-source repositories** under Forge-Space GitHub organization, MIT licensed
- **mcp-gateway v1.13.0** — production release, used in Siza workspace
- **forge-ai-init v0.26.0** — 119 scanner rules, GitHub Action published
- **siza-gen v0.11.0** — 533 tests, native Gemini provider, edge-compatible
- **Total test coverage:** 2,994+ tests across the ecosystem
- **Production deployment:** Cloudflare Workers + Supabase + Vercel, $0/month infrastructure cost
- **Active users:** 834 registered accounts on Siza workspace

---

## Team

**Lucas Santana** — Solo founder, full-stack engineer with 10+ years experience. Previously
led platform engineering at enterprise software companies. Building Forge Space as open
infrastructure for the AI development era.

Location: Brazil (Florianópolis, SC)
GitHub: https://github.com/Forge-Space
Website: https://forgespace.co

---

## Requested budget: EUR 30,000

| Work area | Budget | Deliverables |
|-----------|--------|--------------|
| MCP conformance test suite | EUR 8,000 | Public test suite validating MCP spec compliance; submitted to MCP community |
| Multi-tenant isolation hardening | EUR 7,000 | Namespace isolation, per-tenant audit scopes, tenant config API |
| Self-hosted operator documentation | EUR 6,000 | Full ops guide: Docker, K8s helm chart, backup/restore, upgrade path |
| forge-ai-init rule expansion | EUR 5,000 | 50+ new scanner rules for AI-specific patterns (prompt injection, context leakage) |
| Community contributor tooling | EUR 4,000 | Rule contribution guide, test harness, CI for community PRs |

---

## Impact metrics (12-month targets post-funding)

- MCP Gateway: 100+ self-hosted deployments
- forge-ai-init: 500+ repositories using the GitHub Action
- Conformance test suite: submitted to MCP open standard community
- Documentation: complete self-hosted operator guide published
- Scanner rules: 200+ rules covering OWASP AI/LLM top 10

---

## Relationship to internet standards

MCP (Model Context Protocol) is developed by Anthropic and released as an open standard
under the Apache 2.0 license. It is gaining rapid adoption as the interoperability layer
between AI assistants and developer tools. MCP Gateway implements this standard and provides
the production-grade open infrastructure needed for it to be adopted safely.

Without open infrastructure like MCP Gateway, organizations are forced to use proprietary
AI integration layers with no audit capability, no policy enforcement, and vendor dependency.
This directly undermines the goals of open, trustworthy, and accountable AI systems.

---

## Links

- Project website: https://forgespace.co
- GitHub organization: https://github.com/Forge-Space
- MCP Gateway: https://github.com/Forge-Space/mcp-gateway
- forge-ai-init: https://github.com/Forge-Space/forge-ai-init
- MCP specification: https://spec.modelcontextprotocol.io/
