#!/usr/bin/env tsx
// Proposal scaffold CLI — generates data layer, configurator component, and page entry

import { readFileSync, existsSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { parse as parseYAML } from "yaml";
import type { ProposalConfig } from "./lib/types";
import { validateConfig } from "./lib/validate";
import { generateDataLayer } from "./lib/generate-data";
import { generateConfigurator } from "./lib/generate-configurator";
import { generatePage } from "./lib/generate-page";

// ── CLI Args ──

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const positional = args.filter((a) => !a.startsWith("--"));

const force = flags.has("--force");
const dryRun = flags.has("--dry-run");

if (positional.length === 0) {
  console.error("Usage: npx tsx scripts/generate-proposal.ts <config.yaml> [--force] [--dry-run]");
  console.error("");
  console.error("  --force     Overwrite existing files without prompting");
  console.error("  --dry-run   Print generated code to stdout, don't write files");
  process.exit(1);
}

const configPath = resolve(positional[0]);

if (!existsSync(configPath)) {
  console.error(`Config file not found: ${configPath}`);
  process.exit(1);
}

// ── Load & Parse YAML ──

const raw = readFileSync(configPath, "utf-8");
let config: ProposalConfig;
try {
  config = parseYAML(raw) as ProposalConfig;
} catch (err) {
  console.error("Failed to parse YAML:", (err as Error).message);
  process.exit(1);
}

// ── Validate ──

const { errors, warnings } = validateConfig(config);

for (const w of warnings) {
  console.warn(`\x1b[33mWARN\x1b[0m ${w}`);
}

if (errors.length > 0) {
  for (const e of errors) {
    console.error(`\x1b[31mERROR\x1b[0m ${e}`);
  }
  process.exit(1);
}

console.log(`\x1b[32mConfig validated\x1b[0m — ${config.meta.slug}`);

// ── Generate ──

const dataContent = generateDataLayer(config);
const configuratorContent = generateConfigurator(config);
const pageContent = generatePage(config);

const slug = config.meta.slug;
const name = config.meta.componentName;

const outputs: { path: string; content: string; label: string }[] = [
  {
    path: resolve(`src/lib/budget-data/${slug}.ts`),
    content: dataContent,
    label: `src/lib/budget-data/${slug}.ts`,
  },
  {
    path: resolve(`src/app/${slug}/${name}Configurator.tsx`),
    content: configuratorContent,
    label: `src/app/${slug}/${name}Configurator.tsx`,
  },
  {
    path: resolve(`src/app/${slug}/page.tsx`),
    content: pageContent,
    label: `src/app/${slug}/page.tsx`,
  },
];

// ── Output ──

if (dryRun) {
  for (const out of outputs) {
    console.log(`\n${"=".repeat(60)}`);
    console.log(`FILE: ${out.label}`);
    console.log("=".repeat(60));
    console.log(out.content);
  }
  console.log(`\n\x1b[36mDry run complete\x1b[0m — no files written.`);
  process.exit(0);
}

// Check for conflicts
if (!force) {
  const conflicts = outputs.filter((o) => existsSync(o.path));
  if (conflicts.length > 0) {
    console.error("\nExisting files would be overwritten:");
    for (const c of conflicts) {
      console.error(`  ${c.label}`);
    }
    console.error("\nUse --force to overwrite.");
    process.exit(1);
  }
}

// Write files
for (const out of outputs) {
  const dir = dirname(out.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(out.path, out.content, "utf-8");
  console.log(`\x1b[32mCreated\x1b[0m ${out.label}`);
}

console.log(`\n\x1b[32mDone!\x1b[0m Scaffold for "${slug}" generated successfully.`);
console.log(`\nNext steps:`);
console.log(`  1. Review the generated files`);
console.log(`  2. Run \x1b[36mnpm run build\x1b[0m to verify`);
console.log(`  3. Visit \x1b[36m/${slug}/\x1b[0m to preview`);
