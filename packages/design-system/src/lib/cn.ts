import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely, resolving conflicts.
 * Use this in every component instead of bare string concatenation.
 *
 * @example
 * cn("bg-bg-2 text-fg-0", isActive && "bg-bg-3", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
