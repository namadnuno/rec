/**
 * rec — Design System Tokens
 * Typed JS constants mirroring the CSS @theme values.
 * Use in non-CSS contexts: canvas drawing, electron IPC payloads,
 * testing snapshots, etc.
 */

export const colors = {
  /* Surfaces */
  bg0: "#0a0a0a",
  bg1: "#111111",
  bg2: "#1c1c1c",
  bg3: "#262626",
  bg4: "#2e2e2e",

  /* Borders */
  border: "#242424",
  borderStrong: "#383838",

  /* Foreground */
  fg0: "#f2f2f2",
  fg1: "#a0a0a0",
  fg2: "#5c5c5c",
  fg3: "#333333",

  /* Teal — primary */
  teal400: "#2dd4bf",
  teal500: "#14b8a6",
  teal600: "#0d9488",
  teal900: "#0d2e2b",
  tealGlow: "rgba(45, 212, 191, 0.12)",

  /* Red — recording */
  red400: "#f87171",
  red500: "#ef4444",
  red600: "#dc2626",
  red900: "#2d1515",
  redGlow: "rgba(239, 68, 68, 0.18)",

  /* Green — success */
  green400: "#4ade80",
  green500: "#22c55e",
  green900: "#0f2d1a",

  /* Yellow — warning */
  yellow400: "#facc15",
  yellow900: "#2d2700",

  /* Semantic */
  primary: "#2dd4bf",
  primaryHover: "#14b8a6",
  record: "#ef4444",
  recordHover: "#dc2626",
  success: "#22c55e",
  warning: "#facc15",
  error: "#ef4444",
} as const;

export const fonts = {
  sans: '"Figtree", "Segoe UI", system-ui, sans-serif',
  mono: '"JetBrains Mono", "Fira Code", monospace',
} as const;

export const fontSizes = {
  xs:    "11px",
  sm:    "12px",
  base:  "14px",
  md:    "16px",
  lg:    "18px",
  xl:    "22px",
  "2xl": "28px",
  "3xl": "36px",
  timer: "48px",
} as const;

export const spacing = {
  1:  "4px",
  2:  "8px",
  3:  "12px",
  4:  "16px",
  5:  "20px",
  6:  "24px",
  8:  "32px",
  10: "40px",
  12: "48px",
  16: "64px",
} as const;

export const radii = {
  sm:   "4px",
  md:   "6px",
  lg:   "8px",
  xl:   "12px",
  full: "9999px",
} as const;

export const shadows = {
  sm:           "0 1px 3px rgba(0,0,0,0.3)",
  md:           "0 4px 12px rgba(0,0,0,0.4)",
  lg:           "0 8px 32px rgba(0,0,0,0.5)",
  tray:         "0 16px 48px rgba(0,0,0,0.6)",
  recordGlow:   "0 0 12px rgba(239,68,68,0.18)",
  primaryGlow:  "0 0 12px rgba(45,212,191,0.12)",
} as const;

export const transitions = {
  fast: "100ms ease",
  base: "150ms ease",
  slow: "250ms ease",
} as const;

export type Color = keyof typeof colors;
export type FontSize = keyof typeof fontSizes;
export type Spacing = keyof typeof spacing;
export type Radius = keyof typeof radii;
export type Shadow = keyof typeof shadows;
