"use client";

import { Archive, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { SearchInput } from "@/components/ui/SearchInput";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import type { RouterOutputs } from "@/trpc/react";

type Campaign =
  RouterOutputs["campaigns"]["listCampaigns"]["campaigns"][number];

interface CampaignsListProps {
  slug: string;
  clubId: string;
  initialCampaigns: Campaign[];
}

export function CampaignsList({
  slug,
  clubId,
  initialCampaigns,
}: CampaignsListProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const [searchQuery, setSearchQuery] = useState("");
  const [includeArchived, setIncludeArchived] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Use the query to get live data with filters
  const { data } = api.campaigns.listCampaigns.useQuery({
    clubId,
    limit: 100,
    search: searchQuery.trim() || undefined,
    includeArchived,
    tags: selectedTags.length > 0 ? selectedTags : undefined,
  });

  const campaigns = data?.campaigns ?? initialCampaigns;

  // Extract all unique tags from campaigns
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    campaigns.forEach((campaign) => {
      campaign.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [campaigns]);

  const duplicateMutation = api.campaigns.duplicateCampaign.useMutation({
    onSuccess: async (newCampaign) => {
      await utils.campaigns.listCampaigns.invalidate();
      router.push(`/clubs/${slug}/campaigns/${newCampaign.id}`);
    },
  });

  const archiveMutation = api.campaigns.archiveCampaign.useMutation({
    onSuccess: async () => {
      await utils.campaigns.listCampaigns.invalidate();
    },
  });

  const unarchiveMutation = api.campaigns.unarchiveCampaign.useMutation({
    onSuccess: async () => {
      await utils.campaigns.listCampaigns.invalidate();
    },
  });

  const handleDuplicate = (
    e: React.MouseEvent,
    campaignId: string,
    campaignName: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      confirm(
        `Duplicate "${campaignName}"? This will create a new draft campaign.`,
      )
    ) {
      duplicateMutation.mutate({
        clubId,
        campaignId,
      });
    }
  };

  const handleArchive = (
    e: React.MouseEvent,
    campaignId: string,
    isArchived: boolean,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (isArchived) {
      unarchiveMutation.mutate({ clubId, campaignId });
    } else {
      archiveMutation.mutate({ clubId, campaignId });
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="rounded-lg bg-white p-4 shadow">
        <div className="space-y-4">
          {/* Search Bar */}
          <div>
            <SearchInput
              placeholder="Search campaigns by name or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Archive Filter */}
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={includeArchived}
                onChange={(e) => setIncludeArchived(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#b1d135] focus:ring-[#b1d135]"
              />
              <span>Show archived campaigns</span>
            </label>
          </div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Filter by tags:
              </label>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition",
                        isSelected
                          ? "bg-[#b1d135] text-gray-900"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                      )}
                    >
                      {tag}
                      {isSelected && (
                        <X className="h-3 w-3" aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
                {selectedTags.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedTags([])}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Campaigns List */}
      {campaigns.length === 0 ? (
        <div className="rounded-lg bg-white px-6 py-12 text-center shadow">
          <Archive className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No campaigns found
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {searchQuery || selectedTags.length > 0
              ? "Try adjusting your search or filters."
              : "Get started by creating your first email campaign."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              slug={slug}
              clubId={clubId}
              onDuplicate={(e) =>
                handleDuplicate(e, campaign.id, campaign.name)
              }
              onArchive={(e) =>
                handleArchive(e, campaign.id, !!campaign.archivedAt)
              }
              isDuplicating={duplicateMutation.isPending}
              isArchiving={
                archiveMutation.isPending || unarchiveMutation.isPending
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
