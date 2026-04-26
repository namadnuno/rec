import * as React from "react";
import { cn } from "../lib/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-caps">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full font-sans text-sm bg-bg-2 text-fg-0",
            "border border-border rounded-md px-2.5 py-2",
            "placeholder:text-fg-2 outline-none",
            "transition-[border-color,box-shadow] duration-150",
            "focus:border-teal-400 focus:shadow-[0_0_0_2px_rgba(45,212,191,0.12)]",
            error && "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_2px_rgba(239,68,68,0.12)]",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
        {hint && !error && <p className="text-xs text-fg-2">{hint}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, id, options, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={selectId} className="text-caps">
            {label}
          </label>
        )}
        <div className="relative w-full">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full appearance-none font-sans text-sm",
              "bg-bg-2 text-fg-0",
              "border border-border rounded-md px-2.5 py-2 pr-8",
              "outline-none cursor-pointer",
              "transition-[border-color,box-shadow] duration-150",
              "focus:border-teal-400 focus:shadow-[0_0_0_2px_rgba(45,212,191,0.12)]",
              error && "border-red-500",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              className,
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* chevron */}
          <svg
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-fg-2"
            width="12" height="12" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
          >
            <title>Chevron</title>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
        {hint && !error && <p className="text-xs text-fg-2">{hint}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";
