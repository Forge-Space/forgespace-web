# AWS Activate Application
**URL:** https://aws.amazon.com/activate/
**Status:** Self-serve portal, rolling admissions
**Value:** Up to $100K AWS credits (Founders tier), 1 year validity
**Track:** AWS Activate Founders (solo founder, early-stage)

---

## Application Form Answers

### Company name
Forge Space

### Website
https://forgespace.co

### What does your startup do?
Forge Space is an open-source Internal Developer Platform that adds governance, quality
scoring, and audit trails to AI-assisted software development. We give small teams the
engineering infrastructure that large companies build in-house — for free.

Our core products:
- **MCP Gateway** — open-source AI routing and governance layer implementing the Model
  Context Protocol standard, with circuit breaking, RBAC, and audit logging
- **forge-ai-init** — governance CLI that scans repos for quality violations and enforces
  gates in CI/CD pipelines

### How will you use AWS credits?
Primary use cases:
1. **Amazon Bedrock** — multi-model AI routing in MCP Gateway (Claude, Titan, Llama via
   Bedrock API as provider fallback)
2. **AWS Lambda** — serverless compute for governance job processing and webhook handlers
3. **Amazon S3** — audit log storage and long-term archival for compliance workflows
4. **Amazon ECR** — container registry for self-hosted MCP Gateway distributions
5. **Amazon CloudWatch** — observability and alerting for production MCP Gateway deployments
6. **Amazon RDS (PostgreSQL)** — multi-tenant database for governance audit trails

### Stage
Pre-seed, bootstrapped. Product in production at forgespace.co.

### Employees
1 (solo founder)

### Funding
$0 raised. Bootstrapped.

### Monthly AWS spend (current)
$0 — currently on free tier.

### Monthly AWS spend (projected in 12 months)
~$500–$2,000/month depending on Bedrock usage and customer growth.

---

## Supporting Materials

- **GitHub:** https://github.com/forgespace/mcp-gateway (open source)
- **Live product:** https://forgespace.co
- **MCP standard:** https://modelcontextprotocol.io (Anthropic-backed open standard)

---

## Checklist

- [ ] Go to https://aws.amazon.com/activate/
- [ ] Click "Apply for AWS Activate"
- [ ] Select "Founders" track (no VC requirement)
- [ ] Fill form using content above
- [ ] Provide GitHub link as proof of working open-source product
- [ ] After approval: activate credits, set up Bedrock + S3 + ECR
- [ ] Update `startup-programs/application-status` memory with approval date and credit amounts
