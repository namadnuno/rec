import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/cn";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5",
    "px-2 py-0.5 rounded-full",
    "text-xs font-semibold",
    "border",
  ],
  {
    variants: {
      variant: {
        default:   "bg-bg-3 text-fg-1 border-border",
        primary:   "bg-teal-900 text-teal-400 border-teal-400/20",
        record:    "bg-red-900 text-red-400 border-red-400/20",
        success:   "bg-green-900 text-green-400 border-green-400/20",
        warning:   "bg-yellow-900 text-yellow-400 border-yellow-400/20",
        ai:        "bg-teal-900/60 text-teal-400 border-teal-400/20 tracking-wide uppercase text-[10px]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Show a pulsing dot before the label (e.g. live recording indicator) */
  dot?: boolean;
}

export function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            "inline-block w-1.5 h-1.5 rounded-full",
            variant === "record" ? "bg-red-400 animate-record-pulse" : "bg-current",
          )}
        />
      )}
      {children}
    </span>
  );
}
