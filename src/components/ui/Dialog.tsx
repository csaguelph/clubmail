import {
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { X } from "lucide-react";
import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  showCloseButton?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-full",
};

export function Dialog({
  open,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
  className,
}: DialogProps) {
  return (
    <HeadlessDialog open={open} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Dialog Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          className={cn(
            "w-full rounded-lg bg-white p-6 shadow-xl",
            sizeClasses[size],
            className,
          )}
        >
          {/* Header */}
          {(title != null || showCloseButton) && (
            <div className="mb-4 flex items-center justify-between">
              {title && (
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  {title}
                </DialogTitle>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="rounded text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                  aria-label="Close dialog"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          {children}
        </DialogPanel>
      </div>
    </HeadlessDialog>
  );
}

interface DialogContentProps {
  children: ReactNode;
  className?: string;
}

export function DialogContent({ children, className }: DialogContentProps) {
  return <div className={cn("space-y-4", className)}>{children}</div>;
}

interface DialogFooterProps {
  children: ReactNode;
  className?: string;
}

export function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div className={cn("mt-6 flex justify-end space-x-3", className)}>
      {children}
    </div>
  );
}
