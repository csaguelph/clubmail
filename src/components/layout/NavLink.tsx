import Link from "next/link";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils";

interface NavLinkProps extends ComponentProps<typeof Link> {
  isActive?: boolean;
}

export function NavLink({
  className,
  isActive = false,
  children,
  ...props
}: NavLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors",
        isActive
          ? "border-[#b1d135] text-gray-900"
          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
