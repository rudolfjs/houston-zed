import { TRANSPARENT, alpha, palette as p } from "./palette.ts";
import type { Hex, PlayerColor, ZedThemeStyle } from "./types.ts";

type StyleSansComputed = Omit<ZedThemeStyle, "syntax" | "players" | "accents">;

/**
 * Workspace chrome, panels, gutter, terminal, diagnostics — every Zed style key
 * that isn't `syntax`, `players`, or `accents`.
 *
 * Each value is sourced from `palette.ts`. A reader checking why something is
 * a particular shade can trace it: ui key → palette name → hex value.
 */
export function buildUi(): StyleSansComputed {
  return {
    "background.appearance": "opaque",

    background: p.bg,
    border: p.border,
    "border.variant": p.border,
    "border.focused": alpha(p.cyan, 0.4),
    "border.selected": p.surfaceHigh,
    "border.transparent": TRANSPARENT,
    "border.disabled": p.borderSubtle,

    "elevated_surface.background": p.surface,
    "surface.background": p.surface,

    "tab_bar.background": p.surface,
    "tab.active_background": p.bg,
    "tab.inactive_background": p.surface,
    "title_bar.background": p.bg,
    "title_bar.inactive_background": p.bg,
    "status_bar.background": p.bg,
    "toolbar.background": p.bg,
    "panel.background": p.surface,
    "panel.focused_border": null,
    "panel.indent_guide": p.border,
    "panel.indent_guide_active": p.fgMuted,
    "panel.indent_guide_hover": p.fgMuted,
    "panel.overlay_background": p.surface,

    "pane.focused_border": null,
    "pane_group.border": p.border,

    "element.background": p.surface,
    "element.hover": p.surfaceElevated,
    "element.active": p.surfaceHigh,
    "element.selected": p.surfaceHigh,
    "element.disabled": p.borderSubtle,
    "drop_target.background": alpha(p.cyan, 0.16),

    "ghost_element.background": null,
    "ghost_element.hover": p.surfaceElevated,
    "ghost_element.active": p.surfaceHigh,
    "ghost_element.selected": p.surfaceHigh,
    "ghost_element.disabled": p.borderSubtle,

    text: p.fg,
    "text.muted": p.fgMuted,
    "text.placeholder": p.fgMuted,
    "text.disabled": p.borderSubtle,
    "text.accent": p.cyan,
    "link_text.hover": p.cyan,

    icon: p.fgSubtle,
    "icon.muted": p.fgMuted,
    "icon.disabled": p.borderSubtle,
    "icon.placeholder": p.fgMuted,
    "icon.accent": p.cyan,

    "search.match_background": alpha(p.orangeDeep, 0.33),

    "scrollbar.thumb.background": alpha(p.fgMuted, 0.3),
    "scrollbar.thumb.hover_background": alpha(p.fgMuted, 0.5),
    "scrollbar.thumb.border": p.border,
    "scrollbar.track.background": p.bg,
    "scrollbar.track.border": p.border,

    "editor.foreground": p.fg,
    "editor.background": p.bg,
    "editor.gutter.background": p.bg,
    "editor.subheader.background": p.surface,
    "editor.active_line.background": p.surface,
    "editor.highlighted_line.background": p.surfaceElevated,
    "editor.line_number": p.borderSubtle,
    "editor.active_line_number": p.fg,
    "editor.invisible": p.borderSubtle,
    "editor.wrap_guide": p.border,
    "editor.active_wrap_guide": p.borderSubtle,
    "editor.indent_guide": p.border,
    "editor.indent_guide_active": p.fgMuted,
    "editor.document_highlight.read_background": alpha(p.cyan, 0.18),
    "editor.document_highlight.write_background": alpha(p.cyan, 0.28),
    "editor.document_highlight.bracket_background": p.surfaceHigh,

    "terminal.background": p.bg,
    "terminal.foreground": p.fgSubtle,
    "terminal.bright_foreground": p.fg,
    "terminal.dim_foreground": p.fgMuted,
    "terminal.ansi.background": p.bg,
    "terminal.ansi.black": p.bg,
    "terminal.ansi.bright_black": p.comment,
    "terminal.ansi.dim_black": null,
    "terminal.ansi.red": p.red,
    "terminal.ansi.bright_red": p.pinkBright,
    "terminal.ansi.dim_red": null,
    "terminal.ansi.green": p.green,
    "terminal.ansi.bright_green": p.mint,
    "terminal.ansi.dim_green": null,
    "terminal.ansi.yellow": p.yellowDeep,
    "terminal.ansi.bright_yellow": p.yellow,
    "terminal.ansi.dim_yellow": null,
    "terminal.ansi.blue": p.blueDeep,
    "terminal.ansi.bright_blue": p.blue,
    "terminal.ansi.dim_blue": null,
    "terminal.ansi.magenta": p.purple,
    "terminal.ansi.bright_magenta": p.purpleBright,
    "terminal.ansi.dim_magenta": null,
    "terminal.ansi.cyan": p.cyanMid,
    "terminal.ansi.bright_cyan": p.cyan,
    "terminal.ansi.dim_cyan": null,
    "terminal.ansi.white": p.fg,
    "terminal.ansi.bright_white": p.fgBright,
    "terminal.ansi.dim_white": null,

    created: p.mint,
    "created.background": alpha(p.mint, 0.14),
    "created.border": p.mint,
    modified: p.yellow,
    "modified.background": alpha(p.yellow, 0.14),
    "modified.border": p.yellow,
    deleted: p.pink,
    "deleted.background": alpha(p.pink, 0.14),
    "deleted.border": p.pink,
    renamed: p.lavender,
    "renamed.background": alpha(p.lavender, 0.14),
    "renamed.border": p.lavender,
    conflict: p.orange,
    "conflict.background": alpha(p.orange, 0.14),
    "conflict.border": p.orange,
    error: p.pinkBright,
    "error.background": alpha(p.pinkBright, 0.14),
    "error.border": p.pinkBright,
    warning: p.amber,
    "warning.background": alpha(p.amber, 0.14),
    "warning.border": p.amber,
    info: p.blue,
    "info.background": alpha(p.blue, 0.14),
    "info.border": p.blue,
    hint: p.cyan,
    "hint.background": alpha(p.cyan, 0.14),
    "hint.border": p.cyan,
    success: p.mint,
    "success.background": alpha(p.mint, 0.14),
    "success.border": p.mint,
    predictive: p.fgMuted,
    "predictive.background": alpha(p.fgMuted, 0.14),
    "predictive.border": p.fgMuted,
    ignored: p.fgMuted,
    "ignored.background": null,
    "ignored.border": p.fgMuted,
    hidden: p.fgMuted,
    "hidden.background": null,
    "hidden.border": p.fgMuted,
    unreachable: p.fgMuted,
    "unreachable.background": null,
    "unreachable.border": p.fgMuted,
  };
}

/**
 * The 7 rainbow-indentation accent colors. Drawn from Houston's signature 6
 * accents, plus pink for variety. Order is meaningful — it's the cycle order
 * for nested indentation guides.
 */
export function buildAccents(): Hex[] {
  return [p.mint, p.cyan, p.blue, p.lavender, p.purple, p.yellow, p.pink];
}

/**
 * Player colours: index 0 is the local user, indices 1..7 are remote
 * collaborators (used by Zed's multiplayer / share features). Index 0
 * preserves Houston's signature selection: `#ad5dca44` (purple at 0x44),
 * with the cursor drawn in the bright foreground. The remote slots cycle
 * through Houston's six accents plus pink so each collaborator is
 * visually distinct.
 */
export function buildPlayers(): PlayerColor[] {
  const cursor = p.fgBright;
  return [
    { cursor, background: cursor, selection: alpha(p.purple, 0x44) },
    { cursor: p.mint, background: p.mint, selection: alpha(p.mint, 0.25) },
    { cursor: p.blue, background: p.blue, selection: alpha(p.blue, 0.25) },
    { cursor: p.lavender, background: p.lavender, selection: alpha(p.lavender, 0.25) },
    { cursor: p.yellow, background: p.yellow, selection: alpha(p.yellow, 0.25) },
    { cursor: p.cyan, background: p.cyan, selection: alpha(p.cyan, 0.25) },
    { cursor: p.purple, background: p.purple, selection: alpha(p.purple, 0.25) },
    { cursor: p.pink, background: p.pink, selection: alpha(p.pink, 0.25) },
  ];
}
