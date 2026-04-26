import * as React from "react";
import { cn } from "../lib/cn";

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  sublabel?: string;
  disabled?: boolean;
  className?: string;
}

export function Toggle({ checked, onChange, label, sublabel, disabled = false, className }: ToggleProps) {
  return (
    <label
      className={cn(
        "flex items-center gap-3 cursor-pointer select-none",
        disabled && "opacity-40 cursor-not-allowed",
        className,
      )}
    >
      {/* track */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          "relative shrink-0 w-9 h-5 rounded-full border-0 outline-none",
          "transition-colors duration-150",
          "focus-visible:ring-2 focus-visible:ring-teal-400/40 focus-visible:ring-offset-1 focus-visible:ring-offset-bg-1",
          checked ? "bg-teal-400" : "bg-bg-4",
        )}
      >
        {/* thumb */}
        <span
          className={cn(
            "absolute top-0.5 w-4 h-4 rounded-full bg-white",
            "shadow-sm transition-[left] duration-150",
            checked ? "left-[18px]" : "left-0.5",
          )}
        />
      </button>

      {(label ?? sublabel) && (
        <div className="flex flex-col gap-0.5">
          {label && <span className="text-sm font-medium text-fg-0">{label}</span>}
          {sublabel && <span className="text-xs text-fg-2">{sublabel}</span>}
        </div>
      )}
    </label>
  );
}
