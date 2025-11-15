"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SettingsFormProps {
  clubId: string;
  slug: string;
  settings: {
    fromName: string;
    fromEmail: string;
    replyToEmail: string | null;
    defaultSubjectPrefix: string | null;
    footerText: string | null;
    physicalAddress: string | null;
  };
}

export default function SettingsForm({
  clubId,
  slug,
  settings: initialSettings,
}: SettingsFormProps) {
  const router = useRouter();
  const [fromName, setFromName] = useState(initialSettings.fromName);
  const [fromEmail, setFromEmail] = useState(initialSettings.fromEmail);
  const [replyToEmail, setReplyToEmail] = useState(
    initialSettings.replyToEmail || ""
  );
  const [defaultSubjectPrefix, setDefaultSubjectPrefix] = useState(
    initialSettings.defaultSubjectPrefix || ""
  );
  const [footerText, setFooterText] = useState(initialSettings.footerText || "");
  const [physicalAddress, setPhysicalAddress] = useState(
    initialSettings.physicalAddress || ""
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
      fromEmail,
      replyToEmail: replyToEmail || undefined,
      defaultSubjectPrefix: defaultSubjectPrefix || undefined,
      footerText: footerText || undefined,
      physicalAddress: physicalAddress || undefined,
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
              The name that will appear in the "From" field of emails
            </p>
          </div>

          <div>
            <label
              htmlFor="fromEmail"
              className="block text-sm font-medium text-gray-700"
            >
              From Email *
            </label>
            <input
              type="email"
              id="fromEmail"
              required
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
              placeholder="noreply@csclub.example.com"
            />
            <p className="mt-1 text-xs text-gray-500">
              Must be verified in AWS SES
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
              placeholder="contact@csclub.example.com"
            />
            <p className="mt-1 text-xs text-gray-500">
              Email address for replies (if different from From Email)
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
              htmlFor="footerText"
              className="block text-sm font-medium text-gray-700"
            >
              Footer Text (optional)
            </label>
            <textarea
              id="footerText"
              value={footerText}
              onChange={(e) => setFooterText(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
              placeholder="You're receiving this email because you subscribed to our mailing list."
            />
            <p className="mt-1 text-xs text-gray-500">
              Additional text to include in email footers
            </p>
          </div>
        </div>
      </div>

      {/* Legal Information */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Legal Information
        </h2>
        <div>
          <label
            htmlFor="physicalAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Physical Address (optional)
          </label>
          <textarea
            id="physicalAddress"
            value={physicalAddress}
            onChange={(e) => setPhysicalAddress(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:outline-none focus:ring-1 focus:ring-[#b1d135]"
            placeholder="123 Main St, City, State ZIP"
          />
          <p className="mt-1 text-xs text-gray-500">
            Required by CAN-SPAM Act for commercial emails
          </p>
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
