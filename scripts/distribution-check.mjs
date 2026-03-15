#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const rootPath = fileURLToPath(root);
const routes = [
  { key: "docs", label: "Docs", url: "https://docs.forgespace.co/docs" },
  {
    key: "discussions",
    label: "GitHub Discussions",
    url: "https://github.com/Forge-Space/siza/discussions",
  },
  {
    key: "signin",
    label: "Siza sign-in",
    url: "https://siza.forgespace.co/signin",
  },
  {
    key: "signup",
    label: "Siza signup",
    url: "https://siza.forgespace.co/signup",
  },
];

function outputDir(argv) {
  const index = argv.indexOf("--output-dir");
  return index === -1 || !argv[index + 1]
    ? path.resolve(rootPath, "artifacts", "distribution-check")
    : path.resolve(argv[index + 1]);
}

function runCommand(label, command, args) {
  const result = spawnSync(command, args, { cwd: rootPath, encoding: "utf8" });
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`.trim();
  return {
    label,
    command: [command, ...args].join(" "),
    ok: result.status === 0,
    exitCode: result.status ?? 1,
    tail: output.split("\n").slice(-20),
  };
}

async function checkRoute(route) {
  try {
    const response = await fetch(route.url, { redirect: "follow" });
    return {
      ...route,
      ok: response.ok,
      status: response.status,
      finalUrl: response.url,
    };
  } catch (error) {
    return {
      ...route,
      ok: false,
      status: null,
      finalUrl: null,
      error: String(error),
    };
  }
}

function renderMarkdown(report) {
  const lines = [
    "# Distribution Check",
    "",
    `- Generated: ${report.generatedAt}`,
    `- Overall: ${report.ok ? "pass" : "fail"}`,
    "",
    "## Commands",
    "",
    ...report.commands.flatMap((command) => [
      `- ${command.label}: ${command.ok ? "PASS" : "FAIL"} (\`${command.command}\`)`,
      ...command.tail.map((line) => `  ${line}`),
    ]),
    "",
    "## Owned Capture Routes",
    "",
    ...report.routes.map(
      (route) =>
        `- ${route.label}: ${route.ok ? "PASS" : "FAIL"} (${route.status ?? "error"}) -> ${route.finalUrl ?? route.url}`,
    ),
  ];
  return `${lines.join("\n")}\n`;
}

async function main() {
  const reportPath = outputDir(process.argv);
  const commands = [
    runCommand("CTA tests", "npm", [
      "test",
      "--",
      "src/__tests__/Nav.test.tsx",
      "src/__tests__/Footer.test.tsx",
      "src/__tests__/landing.test.tsx",
    ]),
    runCommand("Production build", "npm", ["run", "build"]),
  ];
  const routeResults = await Promise.all(routes.map(checkRoute));
  const report = {
    generatedAt: new Date().toISOString(),
    ok:
      commands.every((command) => command.ok) &&
      routeResults.every((route) => route.ok),
    commands,
    routes: routeResults,
  };
  mkdirSync(reportPath, { recursive: true });
  writeFileSync(
    path.join(reportPath, "report.json"),
    JSON.stringify(report, null, 2) + "\n",
  );
  writeFileSync(path.join(reportPath, "report.md"), renderMarkdown(report));
  console.log(path.join(reportPath, "report.md"));
  process.exit(report.ok ? 0 : 1);
}

await main();
