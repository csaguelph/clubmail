"use client";

import { Calendar, Clock, Send } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui";
import { Input } from "@/components/ui";
import { LoadingSpinner } from "@/components/ui";
import { cn } from "@/lib/utils";

interface SendCampaignDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: () => void;
  onSchedule: (date: Date) => void;
  isSending: boolean;
  isScheduling: boolean;
  error?: string | null;
}

export function SendCampaignDialog({
  isOpen,
  onClose,
  onSend,
  onSchedule,
  isSending,
  isScheduling,
  error,
}: SendCampaignDialogProps) {
  const [sendMode, setSendMode] = useState<"now" | "schedule">("now");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [scheduleError, setScheduleError] = useState<string | null>(null);

  const getMinDate = (): string => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0] ?? "";
  };

  const handleSchedule = () => {
    setScheduleError(null);

    if (!selectedDate || !selectedTime) {
      setScheduleError("Please select both date and time");
      return;
    }

    const scheduledDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const now = new Date();

    if (scheduledDateTime <= now) {
      setScheduleError("Scheduled time must be in the future");
      return;
    }

    const minTime = new Date(now.getTime() + 5 * 60 * 1000);
    if (scheduledDateTime < minTime) {
      setScheduleError("Scheduled time must be at least 5 minutes from now");
      return;
    }

    onSchedule(scheduledDateTime);
  };

  const handleClose = () => {
    setSendMode("now");
    setSelectedDate("");
    setSelectedTime("");
    setScheduleError(null);
    onClose();
  };

  const handleSubmit = () => {
    if (sendMode === "now") {
      onSend();
    } else {
      handleSchedule();
    }
  };

  const isLoading = isSending || isScheduling;
  const displayError = scheduleError ?? error;

  return (
    <Dialog open={isOpen} onClose={handleClose} title="Send Campaign" size="md">
      <DialogContent>
        {/* Mode Selection */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              setSendMode("now");
              setScheduleError(null);
            }}
            className={cn(
              "flex-1 rounded-md border px-4 py-2 text-sm font-medium transition",
              sendMode === "now"
                ? "border-[#b1d135] bg-[#b1d135]/10 text-gray-900"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
            )}
          >
            <Send className="mx-auto mb-1 h-5 w-5" aria-hidden="true" />
            Send Now
          </button>
          <button
            onClick={() => {
              setSendMode("schedule");
              setScheduleError(null);
            }}
            className={cn(
              "flex-1 rounded-md border px-4 py-2 text-sm font-medium transition",
              sendMode === "schedule"
                ? "border-[#b1d135] bg-[#b1d135]/10 text-gray-900"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
            )}
          >
            <Calendar className="mx-auto mb-1 h-5 w-5" aria-hidden="true" />
            Schedule
          </button>
        </div>

        {/* Send Now Content */}
        {sendMode === "now" && (
          <p className="text-sm text-gray-600">
            Are you sure you want to send this campaign now? The campaign will
            be sent to all subscribers in the selected email list.
          </p>
        )}

        {/* Schedule Content */}
        {sendMode === "schedule" && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Schedule this campaign to be sent at a specific date and time.
            </p>
            <div className="grid grid-cols-2 gap-3">
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
                  min={getMinDate()}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
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
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Errors */}
        {displayError && (
          <p className="text-sm text-red-600" role="alert">
            {displayError}
          </p>
        )}
      </DialogContent>
      <DialogFooter>
        <Button onClick={handleClose} disabled={isLoading} variant="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={
            isLoading ||
            (sendMode === "schedule" && (!selectedDate || !selectedTime))
          }
          variant="primary"
          className="inline-flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" />
              {sendMode === "now" ? "Sending..." : "Scheduling..."}
            </>
          ) : (
            <>
              {sendMode === "now" ? (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Send Now
                </>
              ) : (
                <>
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  Schedule Campaign
                </>
              )}
            </>
          )}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
