"use client";

import PageContainer from "@/components/layout/PageContainer";
import {
  EmailEditor,
  generateDesignJSON,
  generateEmailHTML,
  type EmailBlock,
} from "@/lib/email-editor";
import { api } from "@/trpc/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function NewCampaignPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [preheaderText, setPreheaderText] = useState("");
  const [emailListId, setEmailListId] = useState("");
  const [blocks, setBlocks] = useState<EmailBlock[]>([]);

  const { data: club } = api.clubs.getClubBySlug.useQuery({
    slug: params.slug,
  });
  // club details query removed because it's not used in this page
  const { data: emailLists } = api.emailLists.listLists.useQuery(
    { clubId: club?.id ?? "" },
    { enabled: !!club?.id },
  );
  const { data: settings } = api.clubSettings.getSettings.useQuery(
    { clubId: club?.id ?? "" },
    { enabled: !!club?.id },
  );

  const createCampaign = api.campaigns.createCampaign.useMutation({
    onSuccess: () => {
      router.push(`/clubs/${params.slug}/campaigns`);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!club?.id || !settings) return;

    // Generate HTML from blocks
    const html = await generateEmailHTML(
      blocks,
      club.name,
      settings.brandColor,
      undefined, // unsubscribe URL will be injected when sending
    );

    const designJson = generateDesignJSON(blocks);

    createCampaign.mutate({
      clubId: club.id,
      name,
      subject,
      preheaderText: preheaderText || undefined,
      emailListId,
      designJson,
      html,
    });
  };

  if (!club) {
    return (
      <PageContainer>
        <div className="text-center">Loading...</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <a href={`/clubs/${params.slug}`} className="hover:text-gray-700">
            {club.name}
          </a>
          <span>/</span>
          <a
            href={`/clubs/${params.slug}/campaigns`}
            className="hover:text-gray-700"
          >
            Campaigns
          </a>
          <span>/</span>
          <span className="text-gray-900">New</span>
        </div>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Create Campaign
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Campaign Details */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Campaign Details
          </h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Campaign Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
                placeholder="e.g., November Newsletter"
              />
              <p className="mt-1 text-xs text-gray-500">
                Internal name for this campaign
              </p>
            </div>

            <div>
              <label
                htmlFor="emailList"
                className="block text-sm font-medium text-gray-700"
              >
                Email List *
              </label>
              <select
                id="emailList"
                required
                value={emailListId}
                onChange={(e) => setEmailListId(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
              >
                <option value="">Select an email list</option>
                {emailLists?.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.name} ({list._count.memberships} subscribers)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Email Content - Coming Soon */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Email Content
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject Line *
              </label>
              <input
                type="text"
                id="subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
                placeholder="Your email subject"
              />
            </div>
            <div>
              <label
                htmlFor="preheader"
                className="block text-sm font-medium text-gray-700"
              >
                Preheader Text (optional)
              </label>
              <input
                type="text"
                id="preheader"
                value={preheaderText}
                onChange={(e) => setPreheaderText(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
                placeholder="Preview text shown in email clients"
              />
              <p className="mt-1 text-xs text-gray-500">
                Appears after the subject in email inboxes
              </p>
            </div>
            <div className="pt-4">
              <EmailEditor
                blocks={blocks}
                onChange={setBlocks}
                clubName={club.name}
                brandColor={settings?.brandColor}
                clubId={club.id}
              />
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
            disabled={createCampaign.isPending}
            className="rounded-md bg-[#b1d135] px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-[#a0c030] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {createCampaign.isPending ? "Creating..." : "Create Campaign"}
          </button>
        </div>

        {createCampaign.error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-800">
            {createCampaign.error.message}
          </div>
        )}
      </form>
    </PageContainer>
  );
}
