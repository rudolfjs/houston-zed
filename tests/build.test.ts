import { describe, expect, test } from "bun:test";
import { buildHoustonFamily, buildHoustonTheme } from "../src/build.ts";
import { palette } from "../src/palette.ts";
import type { Hex, SyntaxStyle, ZedThemeStyle } from "../src/types.ts";

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

const REQUIRED_UI_KEYS = [
  "background",
  "border",
  "editor.background",
  "editor.foreground",
  "editor.gutter.background",
  "editor.line_number",
  "editor.active_line.background",
  "editor.indent_guide",
  "tab_bar.background",
  "tab.active_background",
  "tab.inactive_background",
  "title_bar.background",
  "status_bar.background",
  "panel.background",
  "terminal.background",
  "terminal.ansi.black",
  "terminal.ansi.red",
  "terminal.ansi.green",
  "terminal.ansi.yellow",
  "terminal.ansi.blue",
  "terminal.ansi.magenta",
  "terminal.ansi.cyan",
  "terminal.ansi.white",
  "error",
  "warning",
  "info",
  "hint",
  "created",
  "modified",
  "deleted",
];

/** Walk every leaf hex value in the style object so we can assert validity. */
function* walkHexLeaves(style: ZedThemeStyle): Generator<{ path: string; value: string }> {
  for (const [key, value] of Object.entries(style)) {
    if (value == null) continue;
    if (typeof value === "string") {
      if (key === "background.appearance") continue;
      yield { path: key, value };
    } else if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const entry = value[i];
        if (typeof entry === "string") {
          yield { path: `${key}[${i}]`, value: entry };
        } else if (entry && typeof entry === "object") {
          for (const [pk, pv] of Object.entries(entry)) {
            if (typeof pv === "string") yield { path: `${key}[${i}].${pk}`, value: pv };
          }
        }
      }
    } else if (typeof value === "object") {
      for (const [synKey, synStyle] of Object.entries(value as Record<string, SyntaxStyle>)) {
        if (synStyle.color) yield { path: `${key}.${synKey}.color`, value: synStyle.color };
        if (synStyle.background_color)
          yield { path: `${key}.${synKey}.background_color`, value: synStyle.background_color };
      }
    }
  }
}

describe("Houston theme build", () => {
  const family = buildHoustonFamily();
  const theme = family.themes[0]!;
  const style = theme.style;

  test("family metadata is well-formed", () => {
    expect(family.$schema).toBe("https://zed.dev/schema/themes/v0.2.0.json");
    expect(family.name).toBe("Houston");
    expect(family.themes).toHaveLength(1);
    expect(theme.appearance).toBe("dark");
    expect(theme.name).toBe("Houston");
  });

  test("every required UI key is present and a valid hex", () => {
    for (const key of REQUIRED_UI_KEYS) {
      const value = style[key];
      expect(value, `missing or null: ${key}`).not.toBeNull();
      expect(typeof value, `wrong type: ${key}`).toBe("string");
      expect(value as Hex).toMatch(HEX);
    }
  });

  test("every leaf hex value parses", () => {
    for (const { path, value } of walkHexLeaves(style)) {
      expect(value, `bad hex at ${path}`).toMatch(HEX);
    }
  });

  test("panels use the Houston sidebar surface while editor and terminal stay dark", () => {
    expect(style["panel.background"]).toBe(palette.surface);
    expect(style["editor.background"]).toBe(palette.bg);
    expect(style["terminal.background"]).toBe(palette.bg);
  });

  test("accents are distinct and 7-long", () => {
    expect(style.accents).toBeDefined();
    expect(style.accents).toHaveLength(7);
    expect(new Set(style.accents).size).toBe(7);
    for (const a of style.accents ?? []) expect(a).toMatch(HEX);
  });

  test("players[0] is the local user with cursor + bg + selection", () => {
    expect(style.players).toBeDefined();
    expect(style.players!.length).toBeGreaterThanOrEqual(1);
    const p0 = style.players![0]!;
    expect(p0.cursor).toMatch(HEX);
    expect(p0.background).toMatch(HEX);
    expect(p0.selection).toMatch(HEX);
  });

  test("syntax includes core categories", () => {
    const required = [
      "comment",
      "keyword",
      "string",
      "function",
      "type",
      "variable",
      "punctuation",
      "operator",
    ];
    for (const k of required) expect(style.syntax?.[k]).toBeDefined();
  });

  test("no orphan hex literals — every syntax color comes from the palette", () => {
    const allowed = new Set(Object.values(palette).map((c) => c.toLowerCase()));
    const t = buildHoustonTheme();
    for (const [k, v] of Object.entries(t.style.syntax ?? {})) {
      if (!v.color) continue;
      const c = v.color.toLowerCase();
      // strip any alpha suffix before checking palette membership
      const base = c.length === 9 ? c.slice(0, 7) : c;
      expect(allowed.has(base), `syntax.${k} uses unnamed color ${v.color}`).toBe(true);
    }
  });
});
