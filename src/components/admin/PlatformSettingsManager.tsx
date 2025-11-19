"use client";

import { api } from "@/trpc/react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  Mail,
} from "lucide-react";
import { useEffect, useState } from "react";

export function PlatformSettingsManager() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"settings" | "stats" | "events">(
    "settings",
  );

  const {
    data: settings,
    isLoading: settingsLoading,
    refetch,
  } = api.platformSettings.get.useQuery();

  const { data: stats } = api.platformSettings.getStats.useQuery();

  const { data: recentEvents } = api.platformSettings.getRecentEvents.useQuery({
    limit: 20,
  });

  const [formData, setFormData] = useState({
    softBounceThreshold: 2,
    hardBounceAction: "BLOCK" as "BLOCK" | "UNSUBSCRIBE",
    complaintThreshold: 1,
    complaintAction: "UNSUBSCRIBE" as "BLOCK" | "UNSUBSCRIBE",
    enableAutoCleanup: true,
    maxEmailsPerDay: 50000,
    maxEmailsPerSecond: 14,
    enableRateLimiting: true,
  });

  const [isInitialized, setIsInitialized] = useState(false);

  // Update form data when settings first load
  useEffect(() => {
    if (settings && !isInitialized) {
      setFormData({
        softBounceThreshold: settings.softBounceThreshold,
        hardBounceAction: settings.hardBounceAction as "BLOCK" | "UNSUBSCRIBE",
        complaintThreshold: settings.complaintThreshold,
        complaintAction: settings.complaintAction as "BLOCK" | "UNSUBSCRIBE",
        enableAutoCleanup: settings.enableAutoCleanup,
        maxEmailsPerDay: settings.maxEmailsPerDay,
        maxEmailsPerSecond: settings.maxEmailsPerSecond,
        enableRateLimiting: settings.enableRateLimiting,
      });
      setIsInitialized(true);
    }
  }, [settings, isInitialized]);

  const updateSettings = api.platformSettings.update.useMutation({
    onSuccess: (data) => {
      setSuccessMessage("Settings updated successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
      // Update form data with the returned values to keep it in sync
      setFormData({
        softBounceThreshold: data.softBounceThreshold,
        hardBounceAction: data.hardBounceAction as "BLOCK" | "UNSUBSCRIBE",
        complaintThreshold: data.complaintThreshold,
        complaintAction: data.complaintAction as "BLOCK" | "UNSUBSCRIBE",
        enableAutoCleanup: data.enableAutoCleanup,
        maxEmailsPerDay: data.maxEmailsPerDay,
        maxEmailsPerSecond: data.maxEmailsPerSecond,
        enableRateLimiting: data.enableRateLimiting,
      });
      void refetch();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings.mutate(formData);
  };

  if (settingsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-500">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Platform Email Settings</h2>
        <p className="text-gray-600">
          Manage bounce and complaint handling for the entire platform
        </p>
      </div>

      {successMessage && (
        <div className="rounded-md border border-green-500 bg-green-50 p-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <p className="text-sm text-green-800">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("settings")}
            className={`border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === "settings"
                ? "border-[#b1d135] text-[#b1d135]"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            Settings
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === "stats"
                ? "border-[#b1d135] text-[#b1d135]"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            Statistics
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === "events"
                ? "border-[#b1d135] text-[#b1d135]"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            Recent Events
          </button>
        </nav>
      </div>

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Bounce Configuration */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-lg font-semibold">Bounce Configuration</h3>
              <p className="mt-1 text-sm text-gray-600">
                Configure how the system handles bounced emails
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Soft Bounce Threshold
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.softBounceThreshold}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        softBounceThreshold: parseInt(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Number of soft bounces before automatically unsubscribing
                    (recommended: 2)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Hard Bounce Action
                  </label>
                  <select
                    value={formData.hardBounceAction}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hardBounceAction: e.target.value as
                          | "BLOCK"
                          | "UNSUBSCRIBE",
                      })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
                  >
                    <option value="BLOCK">
                      Block (prevents re-subscription)
                    </option>
                    <option value="UNSUBSCRIBE">
                      Unsubscribe (allows re-subscription)
                    </option>
                  </select>
                  <p className="mt-1 text-sm text-gray-500">
                    Action to take when a hard bounce occurs (recommended:
                    Block)
                  </p>
                </div>
              </div>
            </div>

            {/* Complaint Configuration */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-lg font-semibold">Complaint Configuration</h3>
              <p className="mt-1 text-sm text-gray-600">
                Configure how the system handles spam complaints
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Complaint Threshold
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.complaintThreshold}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        complaintThreshold: parseInt(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Number of complaints before taking action (recommended: 1)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Complaint Action
                  </label>
                  <select
                    value={formData.complaintAction}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        complaintAction: e.target.value as
                          | "BLOCK"
                          | "UNSUBSCRIBE",
                      })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
                  >
                    <option value="BLOCK">
                      Block (prevents re-subscription)
                    </option>
                    <option value="UNSUBSCRIBE">
                      Unsubscribe (allows re-subscription)
                    </option>
                  </select>
                  <p className="mt-1 text-sm text-gray-500">
                    Action to take when complaint threshold is reached
                    (recommended: Unsubscribe)
                  </p>
                </div>
              </div>
            </div>

            {/* Rate Limiting Configuration */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-lg font-semibold">Rate Limiting (AWS SES)</h3>
              <p className="mt-1 text-sm text-gray-600">
                Configure email throughput limits to comply with AWS SES quotas
              </p>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Enable Rate Limiting
                    </p>
                    <p className="text-sm text-gray-500">
                      Enforce throughput limits to prevent SES rejections
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        enableRateLimiting: !formData.enableRateLimiting,
                      })
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-[#b1d135] focus:ring-offset-2 focus:outline-none ${
                      formData.enableRateLimiting
                        ? "bg-[#b1d135]"
                        : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        formData.enableRateLimiting
                          ? "translate-x-5"
                          : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Maximum Emails Per Day
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="1000000"
                    value={formData.maxEmailsPerDay}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxEmailsPerDay: parseInt(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    AWS SES sandbox: 200/day, Production: 50,000+/day (check
                    your SES quota)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Maximum Emails Per Second
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={formData.maxEmailsPerSecond}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setFormData({
                        ...formData,
                        maxEmailsPerSecond: Number.isNaN(value) ? 1 : value,
                      });
                    }}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    AWS SES sandbox: 1/second, Production: 14/second (default) -
                    check your SES sending rate
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Settings */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-lg font-semibold">Additional Settings</h3>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Enable Auto-Cleanup
                    </p>
                    <p className="text-sm text-gray-500">
                      Automatically process bounces and complaints
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        enableAutoCleanup: !formData.enableAutoCleanup,
                      })
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-[#b1d135] focus:ring-offset-2 focus:outline-none ${
                      formData.enableAutoCleanup
                        ? "bg-[#b1d135]"
                        : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        formData.enableAutoCleanup
                          ? "translate-x-5"
                          : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={updateSettings.isPending}
                className="rounded-md bg-[#b1d135] px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-[#9fbc2f] disabled:opacity-50"
              >
                {updateSettings.isPending ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </form>

          {/* Setup Instructions */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 shrink-0 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-900">
                  SNS Webhook Setup
                </h3>
                <p className="mt-2 text-sm text-blue-800">
                  To receive bounce and complaint notifications, configure AWS
                  SNS:
                </p>
                <ol className="mt-2 ml-4 list-decimal space-y-1 text-sm text-blue-800">
                  <li>Create an SNS topic in AWS</li>
                  <li>
                    Configure SES to send bounce/complaint notifications to this
                    topic
                  </li>
                  <li>
                    Subscribe this endpoint to the SNS topic:{" "}
                    <code className="rounded bg-blue-100 px-1 py-0.5">
                      {typeof window !== "undefined"
                        ? `${window.location.origin}/api/webhooks/ses`
                        : "/api/webhooks/ses"}
                    </code>
                  </li>
                  <li>
                    Confirm the subscription when AWS sends the confirmation
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Tab */}
      {activeTab === "stats" && stats && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">
                  Total Bounces
                </h3>
                <Mail className="h-4 w-4 text-gray-500" />
              </div>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {stats.bounces.total}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {stats.bounces.last7Days} in last 7 days
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">
                  Hard Bounces
                </h3>
                <AlertCircle className="h-4 w-4 text-red-500" />
              </div>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {stats.bounces.hard}
              </p>
              <p className="mt-1 text-xs text-gray-500">Permanent failures</p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">
                  Total Complaints
                </h3>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </div>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {stats.complaints.total}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {stats.complaints.last7Days} in last 7 days
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">
                  Blocked Subscribers
                </h3>
                <AlertCircle className="h-4 w-4 text-red-500" />
              </div>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {stats.subscribers.blocked}
              </p>
              <p className="mt-1 text-xs text-gray-500">Cannot re-subscribe</p>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-lg font-semibold">Bounce Breakdown</h3>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Soft Bounces (Temporary)</span>
                <span className="rounded-full border border-gray-300 px-2.5 py-0.5 text-xs font-medium">
                  {stats.bounces.soft}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Hard Bounces (Permanent)</span>
                <span className="rounded-full border border-red-300 bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700">
                  {stats.bounces.hard}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Events Tab */}
      {activeTab === "events" && recentEvents && (
        <div className="space-y-6">
          {recentEvents.bounces && recentEvents.bounces.length > 0 && (
            <div className="rounded-lg bg-white shadow">
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-semibold">Recent Bounces</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Campaign
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {recentEvents.bounces.map((bounce) => (
                      <tr key={bounce.id}>
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                          {new Date(bounce.createdAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                          {bounce.subscriber?.email ?? "Unknown"}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              bounce.bounceType === "HARD"
                                ? "border border-red-300 bg-red-50 text-red-700"
                                : "border border-gray-300 text-gray-700"
                            }`}
                          >
                            {bounce.bounceType}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                          {bounce.email?.campaign?.name ?? "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              bounce.subscriber?.status === "BLOCKED"
                                ? "border border-red-300 bg-red-50 text-red-700"
                                : "border border-gray-300 text-gray-700"
                            }`}
                          >
                            {bounce.subscriber?.status ?? "N/A"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {recentEvents.complaints && recentEvents.complaints.length > 0 && (
            <div className="rounded-lg bg-white shadow">
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-semibold">Recent Complaints</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Campaign
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {recentEvents.complaints.map((complaint) => (
                      <tr key={complaint.id}>
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                          {new Date(complaint.createdAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                          {complaint.subscriber?.email ?? "Unknown"}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                          {complaint.complaintFeedbackType ?? "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                          {complaint.email?.campaign?.name ?? "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              complaint.subscriber?.status === "BLOCKED"
                                ? "border border-red-300 bg-red-50 text-red-700"
                                : "border border-gray-300 text-gray-700"
                            }`}
                          >
                            {complaint.subscriber?.status ?? "N/A"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
