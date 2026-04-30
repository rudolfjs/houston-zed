/**
 * Generator entrypoint. Composes palette + UI + syntax + judgment-calls into a
 * Zed theme family JSON and writes it to `themes/houston.json`.
 *
 * Run with:  bun run build
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { judgmentCalls } from "./judgment-calls.ts";
import { buildSyntax } from "./map-syntax.ts";
import { buildAccents, buildPlayers, buildUi } from "./map-ui.ts";
import type { ZedTheme, ZedThemeFamily } from "./types.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_PATH = join(ROOT, "themes", "houston.json");
const SCHEMA = "https://zed.dev/schema/themes/v0.2.0.json";

export function buildHoustonTheme(): ZedTheme {
  const ui = buildUi();
  const syntax = { ...buildSyntax(), ...judgmentCalls };
  return {
    name: "Houston",
    appearance: "dark",
    style: {
      ...ui,
      accents: buildAccents(),
      players: buildPlayers(),
      syntax,
    },
  };
}

export function buildHoustonFamily(): ZedThemeFamily {
  return {
    $schema: SCHEMA,
    name: "Houston",
    author: "Astro · ported to Zed",
    themes: [buildHoustonTheme()],
  };
}

function main(): void {
  const family = buildHoustonFamily();
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, `${JSON.stringify(family, null, 2)}\n`, "utf-8");
  console.log(`wrote ${OUT_PATH}`);
}

if (import.meta.main) main();
