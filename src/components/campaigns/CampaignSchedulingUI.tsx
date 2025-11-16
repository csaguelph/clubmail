"use client";

import { Calendar, Clock, XCircle } from "lucide-react";
import { useState } from "react";

interface CampaignSchedulingUIProps {
  campaignId: string;
  clubId: string;
  currentStatus:
    | "DRAFT"
    | "SCHEDULED"
    | "SENDING"
    | "SENT"
    | "FAILED"
    | "CANCELLED";
  scheduledFor?: Date | null;
  onSchedule: (scheduledFor: Date) => Promise<void>;
  onCancel: () => Promise<void>;
}

export default function CampaignSchedulingUI({
  currentStatus,
  scheduledFor,
  onSchedule,
  onCancel,
}: CampaignSchedulingUIProps) {
  const [isScheduling, setIsScheduling] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Get minimum date (today)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const handleSchedule = async () => {
    setError(null);

    if (!selectedDate || !selectedTime) {
      setError("Please select both date and time");
      return;
    }

    // Combine date and time
    const scheduledDateTime = new Date(`${selectedDate}T${selectedTime}`);

    // Validate it's in the future
    const now = new Date();
    if (scheduledDateTime <= now) {
      setError("Scheduled time must be in the future");
      return;
    }

    // Must be at least 5 minutes from now
    const minTime = new Date(now.getTime() + 5 * 60 * 1000);
    if (scheduledDateTime < minTime) {
      setError("Scheduled time must be at least 5 minutes from now");
      return;
    }

    setIsScheduling(true);
    try {
      await onSchedule(scheduledDateTime);
      setSelectedDate("");
      setSelectedTime("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to schedule campaign",
      );
    } finally {
      setIsScheduling(false);
    }
  };

  const handleCancel = async () => {
    setIsCancelling(true);
    setError(null);
    try {
      await onCancel();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to cancel campaign",
      );
    } finally {
      setIsCancelling(false);
    }
  };

  // If campaign is already scheduled, show the scheduled time and cancel button
  if (currentStatus === "SCHEDULED" && scheduledFor) {
    return (
      <div className="rounded-lg border border-[#b1d135] bg-[#b1d135]/5 p-4">
        <div className="mb-3 flex items-center gap-2 text-[#b1d135]">
          <Calendar className="h-5 w-5" />
          <h3 className="font-semibold">Campaign Scheduled</h3>
        </div>
        <p className="mb-4 text-sm text-gray-700">
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
          disabled={isCancelling}
          className="flex items-center gap-2 rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <XCircle className="h-4 w-4" />
          {isCancelling ? "Cancelling..." : "Cancel Scheduled Delivery"}
        </button>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    );
  }

  // If campaign is draft, show scheduling interface
  if (currentStatus === "DRAFT") {
    return (
      <div className="rounded-lg border border-gray-300 bg-white p-4">
        <div className="mb-3 flex items-center gap-2 text-gray-700">
          <Clock className="h-5 w-5" />
          <h3 className="font-semibold">Schedule for Later</h3>
        </div>
        <p className="mb-4 text-sm text-gray-600">
          Schedule this campaign to be sent at a specific date and time.
        </p>

        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label
              htmlFor="schedule-date"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              type="date"
              id="schedule-date"
              min={getMinDate()}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="schedule-time"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Time
            </label>
            <input
              type="time"
              id="schedule-time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button
          onClick={handleSchedule}
          disabled={isScheduling || !selectedDate || !selectedTime}
          className="flex items-center gap-2 rounded-md bg-[#b1d135] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#a0c020] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Calendar className="h-4 w-4" />
          {isScheduling ? "Scheduling..." : "Schedule Campaign"}
        </button>
      </div>
    );
  }

  // For other statuses, don't show the scheduling UI
  return null;
}
