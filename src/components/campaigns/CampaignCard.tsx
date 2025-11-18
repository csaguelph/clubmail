import { Copy, ChevronRight } from "lucide-react";
import Link from "next/link";

import type { RouterOutputs } from "@/trpc/react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

type Campaign =
  RouterOutputs["campaigns"]["listCampaigns"]["campaigns"][number];

interface CampaignCardProps {
  campaign: Campaign;
  slug: string;
  onDuplicate: (e: React.MouseEvent, campaignId: string) => void;
  isDuplicating?: boolean;
}

export function CampaignCard({
  campaign,
  slug,
  onDuplicate,
  isDuplicating = false,
}: CampaignCardProps) {
  return (
    <Link
      href={`/clubs/${slug}/campaigns/${campaign.id}`}
      className="block rounded-lg bg-white p-6 shadow transition hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-gray-900">
              {campaign.name}
            </h3>
            <CampaignStatusBadge status={campaign.status} />
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
    </Link>
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
