import type * as React from "react";
import { cn } from "../lib/cn";

export type RecordingSourceType = "full" | "window" | "region" | "camera";

export interface SourceCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  selected?: boolean;
}

export function SourceCard({ icon, label, sublabel, selected = false, className, ...props }: SourceCardProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center gap-3 w-full text-left",
        "px-4 py-3.5 rounded-lg border",
        "font-sans cursor-pointer outline-none",
        "transition-all duration-150",
        "focus-visible:ring-2 focus-visible:ring-teal-400/40",
        selected
          ? "bg-teal-900/50 border-teal-400/30"
          : "bg-bg-2 border-border hover:bg-bg-3",
        className,
      )}
      {...props}
    >
      {/* icon container */}
      <div
        className={cn(
          "shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-lg",
          selected ? "bg-teal-900" : "bg-bg-3",
        )}
      >
        {icon}
      </div>

      {/* text */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-sm font-semibold text-fg-0 truncate">{label}</span>
        {sublabel && (
          <span className="text-xs text-fg-2 truncate">{sublabel}</span>
        )}
      </div>

      {/* selected dot */}
      {selected && (
        <span className="ml-auto shrink-0 w-2 h-2 rounded-full bg-teal-400" />
      )}
    </button>
  );
}
