import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/cn";

const buttonVariants = cva(
  // Base styles shared by all variants
  [
    "inline-flex items-center justify-center gap-1.5",
    "font-sans text-sm font-medium",
    "rounded-md border-0 cursor-pointer",
    "transition-all duration-150 ease-out",
    "select-none outline-none",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    "focus-visible:ring-2 focus-visible:ring-teal-400/40 focus-visible:ring-offset-1 focus-visible:ring-offset-bg-1",
    "active:scale-[0.97]",
  ],
  {
    variants: {
      variant: {
        /** Teal — primary CTA */
        primary: [
          "bg-teal-400 text-bg-0",
          "hover:bg-teal-500",
        ],
        /** Red — recording state / stop */
        record: [
          "bg-red-500 text-white",
          "shadow-[0_0_12px_rgba(239,68,68,0.18)]",
          "hover:bg-red-600",
        ],
        /** Transparent with border */
        ghost: [
          "bg-transparent text-fg-1 border border-border",
          "hover:bg-bg-2 hover:text-fg-0",
        ],
        /** Filled neutral */
        subtle: [
          "bg-bg-3 text-fg-0",
          "hover:bg-bg-4",
        ],
        /** Destructive / danger */
        danger: [
          "bg-transparent text-red-400 border border-red-900",
          "hover:bg-red-900",
        ],
      },
      size: {
        sm: "h-7 px-2.5 text-xs rounded",
        md: "h-8 px-4 text-sm",
        lg: "h-10 px-5 text-base",
        icon: "h-8 w-8 p-0 rounded",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);

Button.displayName = "Button";
