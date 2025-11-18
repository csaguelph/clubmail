"use client";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";

interface LinkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  onUrlChange: (url: string) => void;
  target: boolean;
  onTargetChange: (target: boolean) => void;
  onApply: () => void;
}

export function LinkDialog({
  isOpen,
  onClose,
  url,
  onUrlChange,
  target,
  onTargetChange,
  onApply,
}: LinkDialogProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onApply();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} title="Add/Edit Link" size="md">
      <DialogContent>
        <div>
          <label
            htmlFor="link-url"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            URL
          </label>
          <Input
            id="link-url"
            type="url"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="https://example.com"
            autoFocus
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="flex items-center">
          <input
            id="link-target"
            type="checkbox"
            checked={target}
            onChange={(e) => onTargetChange(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#b1d135] focus:ring-[#b1d135]"
          />
          <label htmlFor="link-target" className="ml-2 text-sm text-gray-700">
            Open in new tab
          </label>
        </div>
      </DialogContent>
      <DialogFooter>
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" variant="primary" onClick={onApply}>
          Apply
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
