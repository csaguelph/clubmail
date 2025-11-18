"use client";

import { AlertTriangle } from "lucide-react";
import { useState } from "react";

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="bg-opacity-50 absolute inset-0 bg-black"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        {/* Warning Icon */}
        <div className="mb-4 flex items-center justify-center">
          <div className="rounded-full bg-red-100 p-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-4 text-center text-xl font-bold text-gray-900">
          Delete Club: {clubName}
        </h2>

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

          <ul className="space-y-2 text-sm text-gray-700">
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
          <input
            id="confirm-text"
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none"
            placeholder={clubName}
            disabled={isDeleting}
          />
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!isConfirmed || isDeleting}
            className="flex-1 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete Club"}
          </button>
        </div>
      </div>
    </div>
  );
}
