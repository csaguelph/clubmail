"use client";

import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";

interface CancelScheduledCampaignProps {
  campaignId: string;
  clubId: string;
  scheduledFor: Date;
}

export default function CancelScheduledCampaign({
  campaignId,
  clubId,
  scheduledFor,
}: CancelScheduledCampaignProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const cancelMutation = api.campaigns.cancelCampaign.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleCancel = () => {
    setError(null);
    cancelMutation.mutate({ clubId, campaignId });
  };

  return (
    <div className="mb-8 rounded-lg border border-blue-300 bg-blue-50 p-6">
      <div className="mb-3 flex items-center gap-2 text-blue-900">
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h3 className="font-semibold">Campaign Scheduled</h3>
      </div>
      <p className="mb-4 text-sm text-blue-800">
        This campaign is scheduled to be sent on{" "}
        <strong>
          {new Date(scheduledFor).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          at{" "}
          {new Date(scheduledFor).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })}
        </strong>
      </p>
      <button
        onClick={handleCancel}
        disabled={cancelMutation.isPending}
        className="flex items-center gap-2 rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <XCircle className="h-4 w-4" />
        {cancelMutation.isPending
          ? "Cancelling..."
          : "Cancel Scheduled Delivery"}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
