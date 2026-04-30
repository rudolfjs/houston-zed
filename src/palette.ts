/**
 * Named hex constants extracted from withastro/houston-vscode (themes/houston.json).
 * Source-of-truth for every color the generator emits — no hex literal should appear
 * outside this file.
 */

export const palette = {
  // ── neutrals: backgrounds ────────────────────────────────────────────────
  bg: "#17191e", // editor.background
  surface: "#23262d", // panels, dropdowns, inactive tabs
  surfaceElevated: "#2a2d34", // hover/selected surface
  surfaceHigh: "#343841", // active workspace bg, borders
  black: "#000000",

  // ── neutrals: borders / dividers ─────────────────────────────────────────
  border: "#343841",
  borderSubtle: "#494949",
  borderDim: "#454545",

  // ── neutrals: foregrounds ────────────────────────────────────────────────
  fg: "#eef0f9", // primary text
  fgBright: "#ffffff",
  fgSubtle: "#cccccc", // secondary text
  fgDim: "#bfc1c9", // tertiary
  fgMuted: "#858b98", // disabled / inactive
  comment: "#545864", // comments + bracket match bg

  // ── accents: signature mints / cyans / blues ─────────────────────────────
  mint: "#4bf3c8", // signature Houston accent
  mintDeep: "#31c19c", // hover variant of mint
  cyan: "#00daef", // functions / focus border
  cyanMid: "#24c0cf",
  blue: "#54b9ff", // operators / info / links
  blueDeep: "#2b7eca",
  blueAccent: "#0087ff",

  // ── accents: purples / lavenders ─────────────────────────────────────────
  lavender: "#acafff", // variables.special / constants
  purple: "#ad5dca", // selection bg
  purpleBright: "#cc75f4", // ANSI bright magenta

  // ── accents: warms ───────────────────────────────────────────────────────
  yellow: "#ffd493", // strings / modified
  yellowDeep: "#ffc368", // ANSI yellow
  amber: "#fbc23b", // warning
  orange: "#ee931e",
  orangeDeep: "#ea5c00",

  // ── accents: pinks / reds ────────────────────────────────────────────────
  pink: "#f06788", // deleted gutter
  pinkBright: "#f4587e", // error fg
  red: "#dc3657", // ANSI red
  redDeep: "#c74e39",

  // ── greens (terminal-only) ───────────────────────────────────────────────
  green: "#23d18b",
} as const;

export type PaletteKey = keyof typeof palette;

/**
 * Compose a hex color with an opacity. Accepts opacity in two disjoint forms:
 *   - fractional 0..1 (inclusive),       e.g. alpha("#4bf3c8", 0.25)  → "#4bf3c840"
 *   - integer    2..255 (inclusive),     e.g. alpha("#4bf3c8", 0x40)  → "#4bf3c840"
 * Values strictly between 1 and 2, and non-integer values above 1, are
 * rejected to keep the two forms unambiguous (1.5 is not "1.5/255" nor
 * "150% opaque" — it's a mistake). The boundary `1` is treated as fully
 * opaque (1.0), not as 1/255: there is no way to request ≈ 0.4% opacity
 * through this API. Source must be `#rrggbb`. Returns `#rrggbbaa`.
 */
export function alpha(hex: string, opacity: number): string {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) {
    throw new Error(`alpha() expects #rrggbb, got: ${hex}`);
  }
  if (!Number.isFinite(opacity) || opacity < 0 || opacity > 255) {
    throw new Error(`alpha out of range: ${opacity}`);
  }
  if (opacity > 1 && opacity < 2) {
    throw new Error(`alpha() rejects (1, 2): use a fraction <= 1 or integer >= 2, got: ${opacity}`);
  }
  if (opacity > 1 && !Number.isInteger(opacity)) {
    throw new Error(`alpha() expects integer >= 2 in 0..255 form, got: ${opacity}`);
  }
  const a = opacity <= 1 ? Math.round(opacity * 255) : opacity;
  return `${hex}${a.toString(16).padStart(2, "0")}`;
}

export const TRANSPARENT = "#00000000";
