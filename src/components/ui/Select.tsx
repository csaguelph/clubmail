import { type SelectHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "block w-full rounded-md border px-3 py-2 text-sm",
          "focus:ring-1 focus:outline-none",
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-[#b1d135] focus:ring-[#b1d135]",
          "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    );
  },
);

Select.displayName = "Select";
