"use client";

import { useRouter } from "next/navigation";

import { CampaignCard } from "@/components/campaigns/CampaignCard";
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

  // Use the query to get live data
  const { data } = api.campaigns.listCampaigns.useQuery({
    clubId,
    limit: 50,
  });

  const campaigns = data?.campaigns ?? initialCampaigns;

  const duplicateMutation = api.campaigns.duplicateCampaign.useMutation({
    onSuccess: async (newCampaign) => {
      await utils.campaigns.listCampaigns.invalidate();
      router.push(`/clubs/${slug}/campaigns/${newCampaign.id}`);
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

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          campaign={campaign}
          slug={slug}
          onDuplicate={(e) => handleDuplicate(e, campaign.id, campaign.name)}
          isDuplicating={duplicateMutation.isPending}
        />
      ))}
    </div>
  );
}
