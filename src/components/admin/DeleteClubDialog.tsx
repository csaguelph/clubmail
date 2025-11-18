"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { cn } from "@/lib/utils";

interface DeleteClubDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  clubName: string;
  clubStats: {
    members: number;
    campaigns: number;
    subscribers: number;
  };
  isDeleting?: boolean;
}

export default function DeleteClubDialog({
  isOpen,
  onClose,
  onConfirm,
  clubName,
  clubStats,
  isDeleting = false,
}: DeleteClubDialogProps) {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmed = confirmText === clubName;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          {/* Warning Icon */}
          <div className="mb-4 flex items-center justify-center">
            <div className="rounded-full bg-red-100 p-3">
              <AlertTriangle
                className="h-6 w-6 text-red-600"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Title */}
          <DialogTitle className="mb-4 text-center text-xl font-bold text-gray-900">
            Delete Club: {clubName}
          </DialogTitle>

          {/* Warning Message */}
          <div className="mb-6 space-y-3">
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm font-medium text-red-800">
                ⚠️ This action is permanent and cannot be undone!
              </p>
            </div>

            <p className="text-sm text-gray-700">
              Deleting this club will permanently remove:
            </p>

            <ul className="space-y-2 text-sm text-gray-700" role="list">
              <li className="flex items-center">
                <span className="mr-2 font-semibold text-red-600">•</span>
                <span>
                  <strong>{clubStats.members}</strong> club member
                  {clubStats.members !== 1 ? "s" : ""} (staff access)
                </span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 font-semibold text-red-600">•</span>
                <span>
                  <strong>{clubStats.campaigns}</strong> campaign
                  {clubStats.campaigns !== 1 ? "s" : ""} (including all email
                  history)
                </span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 font-semibold text-red-600">•</span>
                <span>
                  <strong>{clubStats.subscribers}</strong> subscriber
                  {clubStats.subscribers !== 1 ? "s" : ""}
                </span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 font-semibold text-red-600">•</span>
                <span>All email lists and club settings</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 font-semibold text-red-600">•</span>
                <span>All media uploads</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 font-semibold text-red-600">•</span>
                <span>All tracking data (opens, clicks, bounces)</span>
              </li>
            </ul>
          </div>

          {/* Confirmation Input */}
          <div className="mb-6">
            <label
              htmlFor="confirm-text"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              To confirm deletion, type the club name:{" "}
              <span className="font-bold">{clubName}</span>
            </label>
            <Input
              id="confirm-text"
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={clubName}
              disabled={isDeleting}
              error={confirmText.length > 0 && !isConfirmed}
              aria-invalid={!isConfirmed}
              aria-describedby="confirm-text-error"
            />
            {confirmText.length > 0 && !isConfirmed && (
              <p
                id="confirm-text-error"
                className="mt-1 text-sm text-red-600"
                role="alert"
              >
                Club name does not match
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              onClick={onClose}
              disabled={isDeleting}
              variant="secondary"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={!isConfirmed || isDeleting}
              variant="danger"
              className="flex-1"
            >
              {isDeleting ? "Deleting..." : "Delete Club"}
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
