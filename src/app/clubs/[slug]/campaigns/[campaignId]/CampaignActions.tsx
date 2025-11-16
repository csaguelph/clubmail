"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Calendar, Clock, Mail, Send, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";

interface CampaignActionsProps {
  clubId: string;
  campaignId: string;
  clubSlug: string;
  canDelete: boolean;
}

export default function CampaignActions({
  clubId,
  campaignId,
  clubSlug,
  canDelete,
}: CampaignActionsProps) {
  const router = useRouter();
  const [showSendModal, setShowSendModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [sendMode, setSendMode] = useState<"now" | "schedule">("now");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [scheduleError, setScheduleError] = useState<string | null>(null);

  const sendCampaign = api.campaigns.sendCampaign.useMutation({
    onSuccess: () => {
      setShowSendModal(false);
      setSendMode("now");
      setSelectedDate("");
      setSelectedTime("");
      setScheduleError(null);
      router.refresh();
    },
  });

  const scheduleCampaign = api.campaigns.scheduleCampaign.useMutation({
    onSuccess: () => {
      setShowSendModal(false);
      setSendMode("now");
      setSelectedDate("");
      setSelectedTime("");
      setScheduleError(null);
      router.refresh();
    },
  });

  const sendTest = api.campaigns.sendTest.useMutation({
    onSuccess: () => {
      setShowTestModal(false);
      setTestEmail("");
    },
  });

  const deleteCampaign = api.campaigns.deleteCampaign.useMutation({
    onSuccess: () => {
      router.push(`/clubs/${clubSlug}/campaigns`);
    },
  });

  const handleSend = () => {
    if (sendMode === "now") {
      sendCampaign.mutate({ clubId, campaignId });
    } else {
      // Schedule mode
      setScheduleError(null);

      if (!selectedDate || !selectedTime) {
        setScheduleError("Please select both date and time");
        return;
      }

      // Combine date and time
      const scheduledDateTime = new Date(`${selectedDate}T${selectedTime}`);

      // Validate it's in the future
      const now = new Date();
      if (scheduledDateTime <= now) {
        setScheduleError("Scheduled time must be in the future");
        return;
      }

      // Must be at least 5 minutes from now
      const minTime = new Date(now.getTime() + 5 * 60 * 1000);
      if (scheduledDateTime < minTime) {
        setScheduleError("Scheduled time must be at least 5 minutes from now");
        return;
      }

      scheduleCampaign.mutate({
        clubId,
        campaignId,
        scheduledFor: scheduledDateTime,
      });
    }
  };

  const handleTestSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (testEmail) {
      sendTest.mutate({ clubId, campaignId, testEmail });
    }
  };

  const handleDelete = () => {
    deleteCampaign.mutate({ clubId, campaignId });
  };

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setShowTestModal(true)}
          className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
        >
          <Mail className="h-4 w-4" />
          Send Test
        </button>
        <button
          onClick={() => setShowSendModal(true)}
          className="inline-flex items-center gap-2 rounded-md bg-[#b1d135] px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-[#a0c030]"
        >
          <Send className="h-4 w-4" />
          Send Campaign
        </button>
        {canDelete && (
          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-red-300 ring-inset hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        )}
      </div>

      {/* Send Campaign Modal */}
      <Dialog
        open={showSendModal}
        onClose={() => {
          setShowSendModal(false);
          setSendMode("now");
          setSelectedDate("");
          setSelectedTime("");
          setScheduleError(null);
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-xl">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Send Campaign
            </DialogTitle>

            {/* Mode Selection */}
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => {
                  setSendMode("now");
                  setScheduleError(null);
                }}
                className={`flex-1 rounded-md border px-4 py-2 text-sm font-medium transition ${
                  sendMode === "now"
                    ? "border-[#b1d135] bg-[#b1d135]/10 text-gray-900"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Send className="mx-auto mb-1 h-5 w-5" />
                Send Now
              </button>
              <button
                onClick={() => {
                  setSendMode("schedule");
                  setScheduleError(null);
                }}
                className={`flex-1 rounded-md border px-4 py-2 text-sm font-medium transition ${
                  sendMode === "schedule"
                    ? "border-[#b1d135] bg-[#b1d135]/10 text-gray-900"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Calendar className="mx-auto mb-1 h-5 w-5" />
                Schedule
              </button>
            </div>

            {/* Send Now Content */}
            {sendMode === "now" && (
              <p className="mt-4 text-sm text-gray-600">
                Are you sure you want to send this campaign now? The campaign
                will be sent to all subscribers in the selected email list.
              </p>
            )}

            {/* Schedule Content */}
            {sendMode === "schedule" && (
              <div className="mt-4 space-y-3">
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
              </div>
            )}

            {/* Errors */}
            {(sendCampaign.error ??
              scheduleCampaign.error ??
              scheduleError) && (
              <p className="mt-3 text-sm text-red-600">
                {scheduleError ??
                  sendCampaign.error?.message ??
                  scheduleCampaign.error?.message}
              </p>
            )}

            {/* Actions */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowSendModal(false);
                  setSendMode("now");
                  setSelectedDate("");
                  setSelectedTime("");
                  setScheduleError(null);
                }}
                disabled={sendCampaign.isPending || scheduleCampaign.isPending}
                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={sendCampaign.isPending || scheduleCampaign.isPending}
                className="inline-flex items-center gap-2 rounded-md bg-[#b1d135] px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-[#a0c030] disabled:opacity-50"
              >
                {sendCampaign.isPending || scheduleCampaign.isPending ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {sendMode === "now" ? "Sending..." : "Scheduling..."}
                  </>
                ) : (
                  <>
                    {sendMode === "now" ? (
                      <>
                        <Send className="h-4 w-4" />
                        Send Now
                      </>
                    ) : (
                      <>
                        <Clock className="h-4 w-4" />
                        Schedule Campaign
                      </>
                    )}
                  </>
                )}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Test Email Modal */}
      <Dialog
        open={showTestModal}
        onClose={() => setShowTestModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-xl">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Send Test Email
            </DialogTitle>
            <form onSubmit={handleTestSend} className="mt-4">
              <label
                htmlFor="testEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="testEmail"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
              />
              {sendTest.error && (
                <p className="mt-2 text-sm text-red-600">
                  {sendTest.error.message}
                </p>
              )}
              {sendTest.isSuccess && (
                <p className="mt-2 text-sm text-green-600">
                  Test email sent successfully!
                </p>
              )}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowTestModal(false)}
                  disabled={sendTest.isPending}
                  className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sendTest.isPending}
                  className="inline-flex items-center gap-2 rounded-md bg-[#b1d135] px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-[#a0c030] disabled:opacity-50"
                >
                  {sendTest.isPending ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4" />
                      Send Test
                    </>
                  )}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Delete Campaign Modal */}
      <Dialog
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-xl">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Delete Campaign
            </DialogTitle>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete this campaign? This action cannot
              be undone.
            </p>
            {deleteCampaign.error && (
              <p className="mt-2 text-sm text-red-600">
                {deleteCampaign.error.message}
              </p>
            )}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={deleteCampaign.isPending}
                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteCampaign.isPending}
                className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 disabled:opacity-50"
              >
                {deleteCampaign.isPending ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
