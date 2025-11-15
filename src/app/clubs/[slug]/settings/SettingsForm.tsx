"use client";

import { getTextColorForBackground } from "@/lib/color-utils";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SettingsFormProps {
  clubId: string;
  slug: string;
  settings: {
    fromName: string;
    replyToEmail: string | null;
    defaultSubjectPrefix: string | null;
    brandColor: string;
    enableTracking: boolean;
  };
}

export default function SettingsForm({
  clubId,
  slug,
  settings: initialSettings,
}: SettingsFormProps) {
  const router = useRouter();
  const [fromName, setFromName] = useState(initialSettings.fromName);
  const [replyToEmail, setReplyToEmail] = useState(
    initialSettings.replyToEmail ?? ""
  );
  const [defaultSubjectPrefix, setDefaultSubjectPrefix] = useState(
    initialSettings.defaultSubjectPrefix ?? ""
  );
  const [brandColor, setBrandColor] = useState(initialSettings.brandColor);
  const [enableTracking, setEnableTracking] = useState(
    initialSettings.enableTracking
  );

  const updateSettings = api.clubSettings.updateSettings.useMutation({
    onSuccess: () => {
      router.push(`/clubs/${slug}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateSettings.mutate({
      clubId,
      fromName,
      replyToEmail: replyToEmail || undefined,
      defaultSubjectPrefix: defaultSubjectPrefix || undefined,
      brandColor,
      enableTracking,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Sender Information */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Sender Information
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="fromName"
              className="block text-sm font-medium text-gray-700"
            >
              From Name *
            </label>
            <input
              type="text"
              id="fromName"
              required
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
              placeholder="Computer Science Club"
            />
            <p className="mt-1 text-xs text-gray-500">
              The name that will appear in the &quot;From&quot; field of emails
            </p>
          </div>

          <div>
            <label
              htmlFor="fromEmail"
              className="block text-sm font-medium text-gray-700"
            >
              From Email
            </label>
            <input
              type="email"
              id="fromEmail"
              value="noreply@csaonline.ca"
              disabled
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-500 shadow-sm cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-gray-500">
              All emails are sent from noreply@csaonline.ca
            </p>
          </div>

          <div>
            <label
              htmlFor="replyToEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Reply-To Email (optional)
            </label>
            <input
              type="email"
              id="replyToEmail"
              value={replyToEmail}
              onChange={(e) => setReplyToEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
              placeholder="contact@example.com"
            />
            <p className="mt-1 text-xs text-gray-500">
              Where should replies be sent? If not set, replies will go to noreply@csaonline.ca
            </p>
          </div>
        </div>
      </div>

      {/* Email Content */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Email Content
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="defaultSubjectPrefix"
              className="block text-sm font-medium text-gray-700"
            >
              Default Subject Prefix (optional)
            </label>
            <input
              type="text"
              id="defaultSubjectPrefix"
              value={defaultSubjectPrefix}
              onChange={(e) => setDefaultSubjectPrefix(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
              placeholder="[CS Club]"
            />
            <p className="mt-1 text-xs text-gray-500">
              Will be prepended to campaign subjects
            </p>
          </div>

          <div>
            <label
              htmlFor="brandColor"
              className="block text-sm font-medium text-gray-700"
            >
              Brand Color
            </label>
            <div className="mt-1 flex items-center gap-3">
              <input
                type="color"
                id="brandColor"
                value={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
                className="h-10 w-20 cursor-pointer rounded-md border border-gray-300"
              />
              <input
                type="text"
                value={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
                pattern="^#[0-9A-Fa-f]{6}$"
                className="block w-32 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
                placeholder="#b1d135"
              />
              <button
                type="button"
                onClick={() => setBrandColor("#b1d135")}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Reset to default
              </button>
            </div>
            
            {/* Preview */}
            <div className="mt-3 flex items-center gap-3">
              <span className="text-sm text-gray-600">Preview:</span>
              <button
                type="button"
                style={{
                  backgroundColor: brandColor,
                  color: getTextColorForBackground(brandColor),
                }}
                className="rounded-md px-4 py-2 text-sm font-semibold shadow-sm"
              >
                Sample Button
              </button>
            </div>
            
            <p className="mt-1 text-xs text-gray-500">
              Used for buttons and links in your emails (default: CSA green #b1d135)
            </p>
            <p className="mt-1 text-xs text-amber-600">
              Note: Changing the brand color will only affect new campaigns and draft campaigns that are edited and saved.
            </p>
          </div>

          <div>
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="enableTracking"
                  type="checkbox"
                  checked={enableTracking}
                  onChange={(e) => setEnableTracking(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#b1d135] focus:ring-[#b1d135]"
                />
              </div>
              <div className="ml-3">
                <label
                  htmlFor="enableTracking"
                  className="text-sm font-medium text-gray-700"
                >
                  Enable Email Tracking
                </label>
                <p className="text-xs text-gray-500">
                  Track email opens and link clicks for engagement analytics.
                  Tracking uses pixels and wrapped links (privacy-preserving).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={updateSettings.isPending}
          className="rounded-md bg-[#b1d135] px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-[#a0c030] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {updateSettings.isPending ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {updateSettings.error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-800">
          {updateSettings.error.message}
        </div>
      )}
    </form>
  );
}
