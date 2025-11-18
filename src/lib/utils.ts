import { type ClassValue, clsx } from "clsx";

/**
 * Utility function to merge Tailwind CSS classes with clsx
 * @example
 * cn("px-4", isActive && "bg-blue-500", className)
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
