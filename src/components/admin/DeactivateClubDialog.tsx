"use client";

import { Archive } from "lucide-react";

import { Button } from "@/components/ui";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui";

interface DeactivateClubDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  clubName: string;
  isDeactivating?: boolean;
}

export default function DeactivateClubDialog({
  isOpen,
  onClose,
  onConfirm,
  clubName,
  isDeactivating = false,
}: DeactivateClubDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} title="Deactivate Club" size="sm">
      <DialogContent>
        <p className="text-sm text-gray-700">
          Are you sure you want to deactivate <strong>{clubName}</strong>? This
          will remove all staff members, transfer ownership to{" "}
          <strong>csaclubs@uoguelph.ca</strong>, and hide the club from the
          frontend. The club can be reactivated later.
        </p>
      </DialogContent>
      <DialogFooter>
        <Button onClick={onClose} disabled={isDeactivating} variant="secondary">
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isDeactivating}
          variant="primary"
          className="inline-flex items-center gap-2"
        >
          {isDeactivating ? (
            <>
              <Archive className="h-4 w-4 animate-spin" aria-hidden="true" />
              Deactivating...
            </>
          ) : (
            <>
              <Archive className="h-4 w-4" aria-hidden="true" />
              Deactivate
            </>
          )}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
