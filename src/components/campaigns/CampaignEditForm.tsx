"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { EmailEditor } from "@/lib/email-editor";
import type { EmailBlock } from "@/lib/email-editor/types";
import {
  generateDesignJSON,
  generateEmailHTML,
  parseDesignJSON,
} from "@/lib/email-editor/utils";
import { api } from "@/trpc/react";

import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { Select } from "@/components/ui";

interface CampaignEditFormProps {
  clubId: string;
  clubSlug: string;
  campaign: {
    id: string;
    name: string;
    subject: string;
    preheaderText: string | null;
    emailListId: string;
    designJson: string;
    html: string;
  };
  emailLists: Array<{
    id: string;
    name: string;
  }>;
  clubName: string;
  brandColor: string;
}

export default function CampaignEditForm({
  clubId,
  clubSlug,
  campaign,
  emailLists,
  clubName,
  brandColor,
}: CampaignEditFormProps) {
  const router = useRouter();
  const [name, setName] = useState(campaign.name);
  const [subject, setSubject] = useState(campaign.subject);
  const [preheaderText, setPreheaderText] = useState(
    campaign.preheaderText ?? "",
  );
  const [emailListId] = useState(campaign.emailListId);
  const [blocks, setBlocks] = useState<EmailBlock[]>([]);

  // Parse design JSON on mount
  useEffect(() => {
    const parsedBlocks = parseDesignJSON(campaign.designJson);
    setBlocks(parsedBlocks);
  }, [campaign.designJson]);

  const updateCampaign = api.campaigns.updateCampaign.useMutation({
    onSuccess: () => {
      router.push(`/clubs/${clubSlug}/campaigns/${campaign.id}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Generate HTML from blocks
    const html = await generateEmailHTML(
      blocks,
      clubName,
      brandColor,
      undefined, // No unsubscribe token for draft
    );

    // Generate design JSON from blocks
    const designJson = generateDesignJSON(blocks);

    updateCampaign.mutate({
      clubId,
      campaignId: campaign.id,
      name,
      subject,
      preheaderText: preheaderText ?? null,
      designJson,
      html,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Details */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Campaign Details
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Campaign Name
            </label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1"
            />
            <p className="mt-1 text-sm text-gray-500">
              Internal name for this campaign (not visible to subscribers)
            </p>
          </div>

          <div>
            <label
              htmlFor="emailList"
              className="block text-sm font-medium text-gray-700"
            >
              Email List (cannot be changed)
            </label>
            <Select
              id="emailList"
              value={emailListId}
              disabled
              className="mt-1 bg-gray-50"
            >
              {emailLists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </Select>
            <p className="mt-1 text-sm text-gray-500">
              The email list cannot be changed after campaign creation
            </p>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject Line
            </label>
            <Input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              placeholder="Your email subject..."
              className="mt-1"
            />
          </div>

          <div>
            <label
              htmlFor="preheader"
              className="block text-sm font-medium text-gray-700"
            >
              Preheader Text (Optional)
            </label>
            <Input
              type="text"
              id="preheader"
              value={preheaderText}
              onChange={(e) => setPreheaderText(e.target.value)}
              placeholder="Preview text that appears after the subject..."
              className="mt-1"
            />
            <p className="mt-1 text-sm text-gray-500">
              This text appears next to the subject line in email clients
            </p>
          </div>
        </div>
      </div>

      {/* Email Editor */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Email Content
        </h2>
        <EmailEditor
          blocks={blocks}
          onChange={setBlocks}
          clubName={clubName}
          brandColor={brandColor}
          clubId={clubId}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-4">
        <Button
          type="button"
          onClick={() =>
            router.push(`/clubs/${clubSlug}/campaigns/${campaign.id}`)
          }
          variant="secondary"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={updateCampaign.isPending}
          variant="primary"
        >
          {updateCampaign.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {updateCampaign.error && (
        <div className="rounded-md bg-red-50 p-4" role="alert">
          <p className="text-sm text-red-800">
            Error: {updateCampaign.error.message}
          </p>
        </div>
      )}
    </form>
  );
}
