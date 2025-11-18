import { Search } from "lucide-react";
import { type InputHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";
import { Input, type InputProps } from "./Input";

export interface SearchInputProps extends Omit<InputProps, "type"> {
  placeholder?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, placeholder = "Search...", ...props }, ref) => {
    return (
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <Input
          ref={ref}
          type="search"
          placeholder={placeholder}
          className={cn("pl-10", className)}
          {...props}
        />
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
