"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui";
import { LoadingSpinner } from "@/components/ui";

interface DeleteCampaignDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  error?: string | null;
}

export function DeleteCampaignDialog({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  error,
}: DeleteCampaignDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} title="Delete Campaign" size="md">
      <DialogContent>
        <p className="text-sm text-gray-600">
          Are you sure you want to delete this campaign? This action cannot be
          undone.
        </p>
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </DialogContent>
      <DialogFooter>
        <Button onClick={onClose} disabled={isDeleting} variant="secondary">
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isDeleting}
          variant="danger"
          className="inline-flex items-center gap-2"
        >
          {isDeleting ? (
            <>
              <LoadingSpinner size="sm" />
              Deleting...
            </>
          ) : (
            <>
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Delete
            </>
          )}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
