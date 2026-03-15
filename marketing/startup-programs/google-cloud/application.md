# Google Cloud for Startups Application
**URL:** https://cloud.google.com/startup
**Status:** Self-serve portal, rolling admissions
**Value:** Up to $200K Google Cloud credits (2 years), Vertex AI access, Firebase credits
**Track:** Google Cloud for Startups — Spark tier (pre-seed, no VC required)

---

## Application Form Answers

### Company name
Forge Space

### Website
https://forgespace.co

### Describe your startup (elevator pitch)
Forge Space is an open-source Internal Developer Platform that adds governance, quality
scoring, and audit trails to AI-assisted software development. We build the infrastructure
that lets small teams govern AI-generated code — using open standards (MCP) and zero-cost
self-hosting.

Our two core open-source products:
- **MCP Gateway** — AI routing and governance layer (circuit breaking, RBAC, audit logging)
- **forge-ai-init** — governance CLI for CI/CD quality gates

### Industry
Developer Tools / AI Infrastructure

### How will you use Google Cloud?
1. **Vertex AI** — Gemini model routing via MCP Gateway (Google as AI provider option),
   model evaluation for governance scoring
2. **Cloud Run** — serverless hosting for MCP Gateway self-hosted deployments
3. **Cloud Storage** — audit log archival and export for compliance workflows
4. **Artifact Registry** — container images for self-hosted MCP Gateway distributions
5. **Firebase** — authentication layer for the forgespace.co web app
6. **Cloud SQL (PostgreSQL)** — multi-tenant governance database

### Why Google Cloud?
Vertex AI's Gemini integration is a priority feature request from our users — they want
MCP Gateway to route to Gemini models with the same governance layer applied to OpenAI
and Anthropic. Google Cloud credits would directly fund this integration.

### Stage
Pre-seed, bootstrapped. Product live at forgespace.co.

### Employees
1 (solo founder)

### Funding
$0 raised. Bootstrapped.

---

## Supporting Materials

- **GitHub:** https://github.com/forgespace/mcp-gateway (open source)
- **Live product:** https://forgespace.co
- **MCP standard:** https://modelcontextprotocol.io

---

## Checklist

- [ ] Go to https://cloud.google.com/startup
- [ ] Click "Apply now" → Spark tier
- [ ] Fill form using content above
- [ ] Provide GitHub as proof of open-source working product
- [ ] After approval: enable Vertex AI, set up Cloud Run + Cloud Storage
- [ ] Implement Gemini provider in MCP Gateway using Vertex AI SDK
- [ ] Update `startup-programs/application-status` memory with approval date and credits
