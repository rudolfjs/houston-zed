import { palette as p } from "./palette.ts";
import type { SyntaxStyle } from "./types.ts";

/**
 * Optional syntax overrides.
 *
 * These six syntax assignments are cases where the default choice is
 * ambiguous or context-dependent and a single correct answer doesn't exist.
 * Each entry is commented out by default; uncommenting an entry replaces the
 * corresponding default from `map-syntax.ts`. Colours must come from
 * `palette.ts` (e.g. `p.mint`, `p.lavender`, `p.cyan`, `p.blue`, `p.yellow`).
 *
 * To preview after edits:   bun run validate
 *                           cp themes/houston.json ~/.config/zed/themes/
 * Then in Zed: command palette → "theme selector: toggle" → "Houston".
 */
export const judgmentCalls: Record<string, SyntaxStyle> = {
  /**
   * 1. ATTRIBUTE — Houston used `#acafff` (lavender) for many decorators / HTML
   *    attributes (`@deprecated`, `<a href=…>`). Lavender matches the default;
   *    mint makes attributes more prominent; yellow brings them closer to the
   *    string value visually.
   */
  // attribute: { color: p.lavender },
  /**
   * 2. NUMBER + NUMBER.FLOAT — Houston has NO unique colour for numbers; they
   *    inherit `variable.constant` = `#ffd493` (yellow) in some contexts and
   *    lavender in others. Lavender feels more correct (constants ≈ numbers).
   *    Yellow merges numbers with strings and reads more "Houston-like";
   *    lavender keeps numbers visually grouped with other constants.
   */
  // number: { color: p.lavender },
  // "number.float": { color: p.lavender },
  /**
   * 3. CONSTANT.MACRO — Rust `println!`, C `#define`. Function-shaped (cyan)
   *    or constant-shaped (lavender)? Houston's TM rules don't take a side.
   */
  // "constant.macro": { color: p.cyan },
  /**
   * 4. KEYWORD.MODIFIER — `public`, `private`, `static`, `async`. Mint reads
   *    them as verbs (consistent with other keywords); lavender reads them
   *    as adjectives (closer to attributes).
   */
  // "keyword.modifier": { color: p.mint },
  /**
   * 5. PROPERTY — In Houston, CSS property names render `#ffd493` (yellow).
   *    But `obj.property` in JS lands on `variable.other.property` which is
   *    `fg`. Zed's `property` is one key for both, so we have to pick.
   *    Yellow keeps the CSS feel; cyan makes JS object access "feel callable".
   */
  // property: { color: p.yellow },
  /**
   * 6. VARIABLE.SPECIAL (`self`, `this`, `super`) — Houston uses `#acafff`
   *    (lavender) for these. Default in `map-syntax.ts` is `variable.builtin`
   *    = lavender. Override to mint to read `this`/`self` as keywords instead.
   */
  // "variable.special": { color: p.lavender },
};
