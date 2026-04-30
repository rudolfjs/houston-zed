/**
 * Minimal types for the Zed theme JSON (schema v0.2.0).
 * See https://zed.dev/schema/themes/v0.2.0.json for the full schema.
 */

export type Hex = string;

export interface SyntaxStyle {
  color?: Hex;
  background_color?: Hex;
  font_style?: "italic" | "oblique" | "normal";
  font_weight?: number;
}

export interface PlayerColor {
  cursor: Hex;
  background: Hex | null;
  selection: Hex | null;
}

export type StyleValue =
  | Hex
  | null
  | Hex[]
  | Record<string, SyntaxStyle>
  | PlayerColor[]
  | undefined;

export interface ZedThemeStyle {
  [key: string]: StyleValue;
  syntax?: Record<string, SyntaxStyle>;
  players?: PlayerColor[];
  accents?: Hex[];
}

export interface ZedTheme {
  name: string;
  appearance: "dark" | "light";
  style: ZedThemeStyle;
}

export interface ZedThemeFamily {
  $schema: string;
  name: string;
  author: string;
  themes: ZedTheme[];
}
