import { palette as p } from "./palette.ts";
import type { SyntaxStyle } from "./types.ts";

type SyntaxMap = Record<string, SyntaxStyle>;

/**
 * Houston's syntax DNA in 6 colours:
 *   mint     — keywords, regex chars, language verbs (the "doing" colour)
 *   blue     — operators, generics, types
 *   cyan     — functions, imports, std-library symbols
 *   lavender — special vars (this/self), constants, modules, decorators
 *   yellow   — strings, numbers (Houston used numbers as lavender too — see judgment-calls.ts), CSS property names
 *   fg       — punctuation and plain identifiers
 *
 * Every assignment here is a confident default. The handful of genuinely
 * subjective decisions live in `judgment-calls.ts` and are merged on top.
 */
export function buildSyntax(): SyntaxMap {
  return {
    // ── prose / structure ────────────────────────────────────────────────
    comment: { color: p.comment, font_style: "italic" },
    "comment.doc": { color: p.comment, font_style: "italic" },
    "comment.documentation": { color: p.comment, font_style: "italic" },
    "comment.note": { color: p.cyan },
    "comment.warning": { color: p.amber },
    "comment.error": { color: p.pinkBright },

    punctuation: { color: p.fg },
    "punctuation.bracket": { color: p.fg },
    "punctuation.delimiter": { color: p.fg },
    "punctuation.list_marker": { color: p.mint },
    "punctuation.special": { color: p.cyan },

    // ── keywords ─────────────────────────────────────────────────────────
    keyword: { color: p.mint },
    "keyword.conditional": { color: p.mint },
    "keyword.conditional.ternary": { color: p.mint },
    "keyword.return": { color: p.mint },
    "keyword.repeat": { color: p.mint },
    "keyword.exception": { color: p.mint },
    "keyword.import": { color: p.cyan },
    "keyword.export": { color: p.cyan },
    "keyword.type": { color: p.lavender },
    "keyword.function": { color: p.mint },
    "keyword.operator": { color: p.blue },
    "keyword.directive": { color: p.lavender },
    "keyword.directive.define": { color: p.lavender },
    "keyword.coroutine": { color: p.mint },
    "keyword.debug": { color: p.amber },

    // ── literals ─────────────────────────────────────────────────────────
    string: { color: p.yellow },
    "string.escape": { color: p.lavender },
    "string.regex": { color: p.mint },
    "string.regexp": { color: p.mint },
    "string.special": { color: p.lavender },
    "string.special.symbol": { color: p.lavender },
    "string.special.path": { color: p.cyan },
    "string.special.url": { color: p.cyan, font_style: "italic" },
    "string.doc": { color: p.yellow },
    "string.documentation": { color: p.yellow },

    boolean: { color: p.lavender },
    character: { color: p.yellow },
    "character.special": { color: p.lavender },

    // ── identifiers ──────────────────────────────────────────────────────
    variable: { color: p.fg },
    "variable.builtin": { color: p.lavender },
    "variable.parameter": { color: p.fg },
    "variable.member": { color: p.fg },

    constant: { color: p.lavender },
    "constant.builtin": { color: p.lavender },

    // ── types & functions ────────────────────────────────────────────────
    type: { color: p.blue },
    "type.builtin": { color: p.blue },
    "type.definition": { color: p.blue },
    "type.interface": { color: p.blue },
    "type.class.definition": { color: p.blue },
    "type.super": { color: p.lavender },
    enum: { color: p.lavender },
    variant: { color: p.fg },

    function: { color: p.cyan },
    "function.builtin": { color: p.cyan },
    "function.call": { color: p.cyan },
    "function.method": { color: p.cyan },
    "function.method.call": { color: p.cyan },
    "function.macro": { color: p.cyan },
    "function.decorator": { color: p.lavender },

    constructor: { color: p.cyan },
    namespace: { color: p.lavender },
    module: { color: p.lavender },

    operator: { color: p.fg },
    parameter: { color: p.fg },
    field: { color: p.fg },
    label: { color: p.amber },

    // ── markup / prose ───────────────────────────────────────────────────
    title: { color: p.cyan, font_weight: 700 },
    emphasis: { color: p.lavender, font_style: "italic" },
    "emphasis.strong": { color: p.lavender, font_weight: 700 },
    "text.literal": { color: p.yellow },
    link_text: { color: p.cyan, font_style: "italic" },
    link_uri: { color: p.cyan, font_style: "italic" },

    // ── tags (HTML / JSX / Astro) ────────────────────────────────────────
    tag: { color: p.mint },
    "tag.attribute": { color: p.lavender },
    "tag.delimiter": { color: p.fg },
    "tag.doctype": { color: p.fgMuted },

    // ── diff ─────────────────────────────────────────────────────────────
    "diff.plus": { color: p.mint },
    "diff.minus": { color: p.pink },

    // ── preprocessor / embedded ──────────────────────────────────────────
    preproc: { color: p.lavender },
    predoc: { color: p.lavender },
    embedded: { color: p.fg },
    primary: { color: p.fg },
    parent: { color: p.fg },
    concept: { color: p.lavender },
    symbol: { color: p.lavender },
  };
}
