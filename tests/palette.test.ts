import { describe, expect, test } from "bun:test";
import { alpha, palette } from "../src/palette.ts";

const HEX6 = /^#[0-9a-f]{6}$/i;
const HEX8 = /^#[0-9a-f]{8}$/i;

describe("palette", () => {
  test("every constant is a #rrggbb hex string", () => {
    for (const [name, value] of Object.entries(palette)) {
      expect(value, `palette.${name}`).toMatch(HEX6);
    }
  });

  test("no hex value is shared by more than 2 palette names (catches accidental copy-paste)", () => {
    const counts = new Map<string, string[]>();
    for (const [name, value] of Object.entries(palette)) {
      const list = counts.get(value) ?? [];
      list.push(name);
      counts.set(value, list);
    }
    for (const [hex, names] of counts) {
      expect(names.length, `${hex} is reused by ${names.join(", ")}`).toBeLessThanOrEqual(2);
    }
  });
});

describe("alpha()", () => {
  test("0..1 fractional input maps to correct two-digit suffix", () => {
    expect(alpha("#4bf3c8", 0)).toBe("#4bf3c800");
    expect(alpha("#4bf3c8", 0.5)).toBe("#4bf3c880");
    expect(alpha("#4bf3c8", 1)).toBe("#4bf3c8ff");
  });

  test("0..255 integer input is honoured", () => {
    expect(alpha("#4bf3c8", 0x40)).toBe("#4bf3c840");
    expect(alpha("#4bf3c8", 255)).toBe("#4bf3c8ff");
  });

  test("output is always 8-digit hex", () => {
    for (const op of [0, 0.05, 0.27, 0.5, 0.99, 1]) {
      expect(alpha("#17191e", op)).toMatch(HEX8);
    }
  });

  test("rejects non-#rrggbb input", () => {
    expect(() => alpha("4bf3c8", 0.5)).toThrow();
    expect(() => alpha("#4bf", 0.5)).toThrow();
    expect(() => alpha("#4bf3c8ff", 0.5)).toThrow();
  });

  test("rejects out-of-range opacity", () => {
    expect(() => alpha("#4bf3c8", -0.1)).toThrow();
    expect(() => alpha("#4bf3c8", 256)).toThrow();
  });

  test("rejects values in the (1, 2) gap and non-integer integer-form values", () => {
    expect(() => alpha("#4bf3c8", 1.1)).toThrow();
    expect(() => alpha("#4bf3c8", 1.99)).toThrow();
    expect(() => alpha("#4bf3c8", 2.5)).toThrow();
    expect(() => alpha("#4bf3c8", Number.NaN)).toThrow();
    // sanity: the boundary integers either side of the gap still work
    expect(alpha("#4bf3c8", 2)).toBe("#4bf3c802");
    expect(alpha("#4bf3c8", 1)).toBe("#4bf3c8ff");
  });
});
