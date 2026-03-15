#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const rootPath = fileURLToPath(root);
const packages = [
  {
    name: "@forgespace/ui-mcp",
    repo: "ui-mcp",
    server: "io.github.forge-space/ui-mcp",
  },
  {
    name: "@forgespace/branding-mcp",
    repo: "branding-mcp",
    server: "io.github.forge-space/branding-mcp",
  },
];

function parseArgs(argv) {
  const outputIndex = argv.indexOf("--output-dir");
  const inputIndex = argv.indexOf("--input");
  return {
    outputDir:
      outputIndex === -1 || !argv[outputIndex + 1]
        ? path.resolve(rootPath, "artifacts", "distribution-weekly")
        : path.resolve(argv[outputIndex + 1]),
    input:
      inputIndex === -1 || !argv[inputIndex + 1]
        ? path.resolve(
            rootPath,
            "artifacts",
            "distribution-check",
            "report.json",
          )
        : path.resolve(argv[inputIndex + 1]),
  };
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }
  return response.json();
}

function pickRegistryEntry(results, server) {
  return results.servers?.find((item) => item.server?.name === server) ?? null;
}

function readMessageSpine() {
  const content = readFileSync(
    path.join(rootPath, "docs", "marketing", "free-channel-loop.md"),
    "utf8",
  );
  return content
    .split("\n")
    .filter((line) => /^\d+\.\s(?:Problem|Promise|Action):/.test(line))
    .map((line) => line.replace(/^\d+\.\s/, "").trim());
}

function buildDraft(distribution, packageSummaries, spine) {
  const healthyRoutes = distribution.routes.filter((route) => route.ok).length;
  const packageCopy = packageSummaries
    .map(
      (entry) =>
        `${entry.name} ${entry.latestVersion ?? "pending"} (${entry.registryStatus ?? "missing"})`,
    )
    .join("; ");
  return [
    spine[0] ??
      "Problem: AI codegen is fast but often hard to govern for small teams.",
    `${spine[1] ?? "Promise: Forge Space adds practical governance and visibility without heavy platform overhead."} This week Forge Space kept ${healthyRoutes}/${distribution.routes.length} owned-capture routes healthy while shipping package-first discovery for ${packageCopy}.`,
    spine[2] ??
      "Action: Start at forgespace.co and choose Docs, GitHub Discussions, or Siza beta signup.",
  ];
}

function buildOwnedUpdate(distribution, packageSummaries) {
  return [
    `Routes healthy: ${distribution.routes.filter((route) => route.ok).length}/${distribution.routes.length}.`,
    ...packageSummaries.map(
      (entry) =>
        `${entry.name}: npm ${entry.latestVersion ?? "pending"}, MCP Registry ${entry.registryVersion ?? "missing"}.`,
    ),
    "Next step: keep docs, discussions, and signup routing aligned with the same message spine.",
  ];
}

function renderMarkdown(report) {
  const lines = [
    "# Distribution Ops Weekly",
    "",
    `- Generated: ${report.generatedAt}`,
    "",
    "## Package Surfaces",
    "",
    ...report.packages.flatMap((entry) => [
      `- ${entry.name}: npm \`${entry.latestVersion ?? "pending"}\`, MCP Registry \`${entry.registryVersion ?? "missing"}\``,
      `  - npm: ${entry.packageUrl}`,
      `  - release: ${entry.releaseUrl}`,
      `  - registry: ${entry.registryUrl}`,
    ]),
    "",
    "## Owned Capture Routes",
    "",
    ...report.distribution.routes.map(
      (route) =>
        `- ${route.label}: ${route.ok ? "PASS" : "FAIL"} (${route.status ?? "error"}) -> ${route.finalUrl ?? route.url}`,
    ),
    "",
    "## Drafted Weekly Post",
    "",
    ...report.weeklyPost.map((line) => `- ${line}`),
    "",
    "## Drafted Owned Update",
    "",
    ...report.ownedUpdate.map((line) => `- ${line}`),
  ];
  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv);
  const distribution = JSON.parse(readFileSync(args.input, "utf8"));
  const spine = readMessageSpine();
  const packageSummaries = await Promise.all(
    packages.map(async (entry) => {
      const npmMetadata = await fetchJson(
        `https://registry.npmjs.org/${encodeURIComponent(entry.name)}`,
      ).catch(() => null);
      const registryResults = await fetchJson(
        `https://registry.modelcontextprotocol.io/v0.1/servers?search=${encodeURIComponent(entry.server)}`,
      ).catch(() => ({ servers: [] }));
      const registryEntry = pickRegistryEntry(registryResults, entry.server);
      const latestVersion = npmMetadata?.["dist-tags"]?.latest ?? null;
      return {
        ...entry,
        latestVersion,
        packageUrl: `https://www.npmjs.com/package/${encodeURIComponent(entry.name)}`,
        releaseUrl: latestVersion
          ? `https://github.com/Forge-Space/${entry.repo}/releases/tag/v${latestVersion}`
          : `https://github.com/Forge-Space/${entry.repo}/releases`,
        registryUrl: `https://registry.modelcontextprotocol.io/v0.1/servers?search=${encodeURIComponent(entry.server)}`,
        registryVersion: registryEntry?.server?.version ?? null,
        registryStatus:
          registryEntry?._meta?.["io.modelcontextprotocol.registry/official"]
            ?.status ?? null,
      };
    }),
  );
  const report = {
    generatedAt: new Date().toISOString(),
    distribution,
    packages: packageSummaries,
    weeklyPost: buildDraft(distribution, packageSummaries, spine),
    ownedUpdate: buildOwnedUpdate(distribution, packageSummaries),
  };
  mkdirSync(args.outputDir, { recursive: true });
  writeFileSync(
    path.join(args.outputDir, "report.json"),
    JSON.stringify(report, null, 2) + "\n",
  );
  writeFileSync(path.join(args.outputDir, "report.md"), renderMarkdown(report));
  console.log(path.join(args.outputDir, "report.md"));
}

await main();
