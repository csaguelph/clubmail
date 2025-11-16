"use client";

import { Copy } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { api } from "@/trpc/react";

interface Campaign {
  id: string;
  name: string;
  subject: string;
  status: string;
  createdAt: Date;
  startedAt: Date | null;
  emailList: {
    id: string;
    name: string;
  };
  _count: {
    emails: number;
  };
}

interface CampaignsListProps {
  slug: string;
  clubId: string;
  initialCampaigns: Campaign[];
}

export default function CampaignsList({
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

  const getStatusBadge = (status: string) => {
    const styles = {
      DRAFT: "bg-gray-100 text-gray-800",
      SCHEDULED: "bg-blue-100 text-blue-800",
      SENDING: "bg-yellow-100 text-yellow-800",
      SENT: "bg-green-100 text-green-800",
      FAILED: "bg-red-100 text-red-800",
      CANCELLED: "bg-gray-100 text-gray-800",
    };
    return styles[status as keyof typeof styles] || styles.DRAFT;
  };

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
        <Link
          key={campaign.id}
          href={`/clubs/${slug}/campaigns/${campaign.id}`}
          className="block rounded-lg bg-white p-6 shadow transition hover:shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {campaign.name}
                </h3>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(campaign.status)}`}
                >
                  {campaign.status}
                </span>
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
            </div>
            <div className="ml-4 flex items-center space-x-4">
              <button
                onClick={(e) => handleDuplicate(e, campaign.id, campaign.name)}
                disabled={duplicateMutation.isPending}
                className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
                title="Duplicate campaign"
              >
                <Copy className="h-5 w-5" />
              </button>
              {campaign._count.emails > 0 && (
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {campaign._count.emails}
                  </p>
                  <p className="text-xs text-gray-500">recipients</p>
                </div>
              )}
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
