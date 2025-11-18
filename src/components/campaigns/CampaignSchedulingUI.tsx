"use client";

import { Calendar, Clock, XCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import type { RouterOutputs } from "@/trpc/react";
import { cn } from "@/lib/utils";

type CampaignStatus = RouterOutputs["campaigns"]["getCampaign"]["status"];

interface CampaignSchedulingUIProps {
  campaignId: string;
  clubId: string;
  currentStatus: CampaignStatus;
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

  // Get minimum date (tomorrow)
  const getMinDate = (): string => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0] ?? "";
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
      <ScheduledState
        scheduledFor={scheduledFor}
        onCancel={handleCancel}
        isCancelling={isCancelling}
        error={error}
      />
    );
  }

  // If campaign is draft, show scheduling interface
  if (currentStatus === "DRAFT") {
    return (
      <ScheduleForm
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        onDateChange={setSelectedDate}
        onTimeChange={setSelectedTime}
        onSchedule={handleSchedule}
        isScheduling={isScheduling}
        error={error}
        minDate={getMinDate()}
      />
    );
  }

  // For other statuses, don't show the scheduling UI
  return null;
}

interface ScheduledStateProps {
  scheduledFor: Date;
  onCancel: () => Promise<void>;
  isCancelling: boolean;
  error: string | null;
}

function ScheduledState({
  scheduledFor,
  onCancel,
  isCancelling,
  error,
}: ScheduledStateProps) {
  return (
    <div className="rounded-lg border border-[#b1d135] bg-[#b1d135]/5 p-4">
      <div className="mb-3 flex items-center gap-2 text-[#b1d135]">
        <Calendar className="h-5 w-5" aria-hidden="true" />
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
      <Button
        onClick={onCancel}
        disabled={isCancelling}
        variant="secondary"
        className="flex items-center gap-2 border border-red-300 text-red-700 hover:bg-red-50"
      >
        <XCircle className="h-4 w-4" aria-hidden="true" />
        {isCancelling ? "Cancelling..." : "Cancel Scheduled Delivery"}
      </Button>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

interface ScheduleFormProps {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onSchedule: () => Promise<void>;
  isScheduling: boolean;
  error: string | null;
  minDate: string;
}

function ScheduleForm({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  onSchedule,
  isScheduling,
  error,
  minDate,
}: ScheduleFormProps) {
  return (
    <div className="rounded-lg border border-gray-300 bg-white p-4">
      <div className="mb-3 flex items-center gap-2 text-gray-700">
        <Clock className="h-5 w-5" aria-hidden="true" />
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
          <Input
            type="date"
            id="schedule-date"
            min={minDate}
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="schedule-time"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Time
          </label>
          <Input
            type="time"
            id="schedule-time"
            value={selectedTime}
            onChange={(e) => onTimeChange(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3" role="alert">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <Button
        onClick={onSchedule}
        disabled={isScheduling || !selectedDate || !selectedTime}
        variant="primary"
        className="flex items-center gap-2"
      >
        <Calendar className="h-4 w-4" aria-hidden="true" />
        {isScheduling ? "Scheduling..." : "Schedule Campaign"}
      </Button>
    </div>
  );
}
