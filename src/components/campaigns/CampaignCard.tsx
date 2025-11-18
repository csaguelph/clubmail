import { Archive, Copy, ChevronRight, Tag, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import type { RouterOutputs } from "@/trpc/react";

import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

type Campaign =
  RouterOutputs["campaigns"]["listCampaigns"]["campaigns"][number];

interface CampaignCardProps {
  campaign: Campaign;
  slug: string;
  clubId: string;
  onDuplicate: (e: React.MouseEvent, campaignId: string) => void;
  onArchive: (e: React.MouseEvent, campaignId: string) => void;
  isDuplicating?: boolean;
  isArchiving?: boolean;
}

export function CampaignCard({
  campaign,
  slug,
  clubId,
  onDuplicate,
  onArchive,
  isDuplicating = false,
  isArchiving = false,
}: CampaignCardProps) {
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const utils = api.useUtils();

  const updateTagsMutation = api.campaigns.updateCampaignTags.useMutation({
    onSuccess: async () => {
      await utils.campaigns.listCampaigns.invalidate();
      setIsEditingTags(false);
      setTagInput("");
    },
  });

  const tags = campaign.tags ?? [];
  const isArchived = !!campaign.archivedAt;

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const newTags = [...tags, tagInput.trim().toLowerCase()];
    updateTagsMutation.mutate({
      clubId,
      campaignId: campaign.id,
      tags: newTags,
    });
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    updateTagsMutation.mutate({
      clubId,
      campaignId: campaign.id,
      tags: newTags,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    } else if (e.key === "Escape") {
      setIsEditingTags(false);
      setTagInput("");
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg bg-white p-6 shadow transition hover:shadow-lg",
        isArchived && "opacity-60",
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Link href={`/clubs/${slug}/campaigns/${campaign.id}`}>
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold text-gray-900">
                {campaign.name}
              </h3>
              <CampaignStatusBadge status={campaign.status} />
              {isArchived && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                  <Archive className="h-3 w-3" />
                  Archived
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-900">
              {campaign.subject || "No subject"}
            </p>
            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
              <span>To: {campaign.emailList.name}</span>
              <span>•</span>
              <span>
                Created {new Date(campaign.createdAt).toLocaleDateString()}
              </span>
              {campaign.startedAt && (
                <>
                  <span>•</span>
                  <span>
                    Sent {new Date(campaign.startedAt).toLocaleDateString()}
                  </span>
                </>
              )}
            </div>
          </Link>

          {/* Tags Section */}
          <div className="mt-3 flex items-center gap-2">
            {!isEditingTags ? (
              <>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemoveTag(tag);
                          }}
                          className="ml-0.5 rounded-full p-0.5 hover:bg-gray-200"
                          title="Remove tag"
                          aria-label={`Remove tag ${tag}`}
                        >
                          <X className="h-2.5 w-2.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsEditingTags(true);
                  }}
                  className="text-xs text-gray-500 hover:text-gray-700"
                  title="Edit tags"
                >
                  {tags.length === 0 ? "Add tags" : "Edit"}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter tag and press Enter"
                  className="rounded-md border border-gray-300 px-2 py-1 text-xs focus:border-[#b1d135] focus:ring-1 focus:ring-[#b1d135] focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={handleAddTag}
                  disabled={!tagInput.trim() || updateTagsMutation.isPending}
                  className="rounded-md bg-[#b1d135] px-2 py-1 text-xs font-medium text-gray-900 hover:bg-[#9fbc2f] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setIsEditingTags(false);
                    setTagInput("");
                  }}
                  className="rounded-md px-2 py-1 text-xs text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="ml-4 flex items-center space-x-2">
          <button
            onClick={(e) => onArchive(e, campaign.id)}
            disabled={isArchiving}
            className={cn(
              "rounded-md p-2 text-gray-400 transition",
              "hover:bg-gray-100 hover:text-gray-600",
              "focus:ring-2 focus:ring-gray-500 focus:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50",
              isArchived && "text-gray-600",
            )}
            title={isArchived ? "Unarchive campaign" : "Archive campaign"}
            aria-label={
              isArchived
                ? `Unarchive ${campaign.name}`
                : `Archive ${campaign.name}`
            }
          >
            <Archive className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            onClick={(e) => onDuplicate(e, campaign.id)}
            disabled={isDuplicating}
            className={cn(
              "rounded-md p-2 text-gray-400 transition",
              "hover:bg-gray-100 hover:text-gray-600",
              "focus:ring-2 focus:ring-gray-500 focus:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
            title="Duplicate campaign"
            aria-label={`Duplicate ${campaign.name}`}
          >
            <Copy className="h-5 w-5" aria-hidden="true" />
          </button>
          {campaign._count.emails > 0 && (
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {campaign._count.emails}
              </p>
              <p className="text-xs text-gray-500">recipients</p>
            </div>
          )}
          <ChevronRight className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

interface CampaignStatusBadgeProps {
  status: Campaign["status"];
}

function CampaignStatusBadge({ status }: CampaignStatusBadgeProps) {
  const statusStyles = {
    DRAFT: "bg-gray-100 text-gray-800",
    SCHEDULED: "bg-blue-100 text-blue-800",
    SENDING: "bg-yellow-100 text-yellow-800",
    SENT: "bg-green-100 text-green-800",
    FAILED: "bg-red-100 text-red-800",
    CANCELLED: "bg-gray-100 text-gray-800",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        statusStyles[status] ?? statusStyles.DRAFT,
      )}
    >
      {status}
    </span>
  );
}
