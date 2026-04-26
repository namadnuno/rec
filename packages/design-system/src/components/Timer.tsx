import * as React from "react";
import { cn } from "../lib/cn";

/** Formats seconds → HH:MM:SS */
function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

export interface TimerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Total elapsed seconds */
  seconds: number;
  /** When true, renders in red with a pulsing dot */
  recording?: boolean;
  /** "lg" = 48px display, "sm" = 22px compact (tray), "xs" = 18px inline */
  size?: "lg" | "sm" | "xs";
}

const sizeClasses = {
  lg: "text-timer",       // 48px — main window
  sm: "text-timer-sm",    // 22px — tray popup
  xs: "font-mono text-lg font-medium tracking-tight",
};

export function Timer({ seconds, recording = false, size = "lg", className, ...props }: TimerProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 tabular-nums",
        sizeClasses[size],
        recording ? "text-red-500" : "text-fg-0",
        className,
      )}
      {...props}
    >
      {recording && (
        <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-record-pulse shrink-0" />
      )}
      {formatDuration(seconds)}
    </div>
  );
}
