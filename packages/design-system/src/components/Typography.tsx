/**
 * rec — Typography components
 *
 * Typed wrappers around semantic text styles. Each component maps to
 * a single CSS/Tailwind ruleset so copy is always consistent across the app.
 *
 * Usage:
 *   import { Heading1, SectionTitle, BodyText, LabelText, CapsLabel } from "@rec/design-system"
 */

import * as React from "react";
import { cn } from "../lib/cn";

type PolymorphicProps<E extends React.ElementType, P = object> = P &
  Omit<React.ComponentPropsWithRef<E>, keyof P> & { as?: E };

/* ── Heading1 ───────────────────────────────────────────────
   28px · semibold · tight tracking
   Use for: main window title, page headline on web viewer    */
export function Heading1({
  as,
  className,
  children,
  ...props
}: PolymorphicProps<"h1">) {
  const Tag = as ?? "h1";
  return (
    <Tag
      className={cn(
        "font-sans text-2xl font-semibold leading-tight tracking-tight text-fg-0",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ── SectionTitle ───────────────────────────────────────────
   22px · semibold · tight tracking
   Use for: panel headers, page section titles                */
export function SectionTitle({
  as,
  className,
  children,
  ...props
}: PolymorphicProps<"h2">) {
  const Tag = as ?? "h2";
  return (
    <Tag
      className={cn(
        "font-sans text-xl font-semibold leading-tight tracking-tight text-fg-0",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ── PanelTitle ─────────────────────────────────────────────
   18px · medium
   Use for: card titles, sidebar sections, settings groups   */
export function PanelTitle({
  as,
  className,
  children,
  ...props
}: PolymorphicProps<"h3">) {
  const Tag = as ?? "h3";
  return (
    <Tag
      className={cn(
        "font-sans text-lg font-medium leading-snug text-fg-0",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ── BodyText ───────────────────────────────────────────────
   14px · regular · relaxed leading
   Use for: descriptions, empty states, any prose copy       */
export function BodyText({
  as,
  className,
  children,
  ...props
}: PolymorphicProps<"p">) {
  const Tag = as ?? "p";
  return (
    <Tag
      className={cn(
        "font-sans text-base font-normal leading-normal text-fg-1",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ── LabelText ──────────────────────────────────────────────
   12px · medium
   Use for: form labels, sidebar items, list item text       */
export function LabelText({
  as,
  className,
  children,
  ...props
}: PolymorphicProps<"span">) {
  const Tag = as ?? "span";
  return (
    <Tag
      className={cn(
        "font-sans text-sm font-medium leading-normal text-fg-1",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ── CapsLabel ──────────────────────────────────────────────
   11px · semibold · uppercase · wide tracking
   Use for: section dividers, field group headers,
            status indicators, metadata rows                 */
export function CapsLabel({
  as,
  className,
  children,
  ...props
}: PolymorphicProps<"span">) {
  const Tag = as ?? "span";
  return (
    <Tag
      className={cn("text-caps", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ── MonoText ───────────────────────────────────────────────
   12px · mono · regular
   Use for: timestamps, file paths, file sizes, code        */
export function MonoText({
  as,
  className,
  children,
  ...props
}: PolymorphicProps<"span">) {
  const Tag = as ?? "span";
  return (
    <Tag
      className={cn(
        "font-mono text-sm font-normal text-fg-1",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
