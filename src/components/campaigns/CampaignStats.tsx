"use client";

import { api } from "@/trpc/react";
import { useEffect, useState } from "react";

interface CampaignStatsProps {
  clubId: string;
  campaignId: string;
  initialStats: {
    total: number;
    queued: number;
    sent: number;
    delivered: number;
    bounced: number;
    complained: number;
    failed: number;
  };
  initialStatus: string;
}

export function CampaignStats({
  clubId,
  campaignId,
  initialStats,
  initialStatus,
}: CampaignStatsProps) {
  // Track current status to determine if we should poll
  const [currentStatus, setCurrentStatus] = useState(initialStatus);

  // Always fetch stats, but only poll when sending
  // Use placeholderData to ensure initial data is shown immediately
  const { data: currentStats } = api.campaigns.getCampaignStats.useQuery(
    {
      clubId,
      campaignId,
    },
    {
      placeholderData: initialStats,
      refetchInterval: currentStatus === "SENDING" ? 2000 : false, // Poll every 2 seconds when sending
    },
  );

  // Always fetch campaign status, but only poll when sending
  const { data: campaign } = api.campaigns.getCampaign.useQuery(
    {
      clubId,
      campaignId,
    },
    {
      refetchInterval: currentStatus === "SENDING" ? 2000 : false, // Poll every 2 seconds when sending
    },
  );

  // Update status when campaign data changes
  useEffect(() => {
    if (campaign?.status) {
      setCurrentStatus(campaign.status);
    }
  }, [campaign?.status]);

  // Use query data if available, otherwise fall back to initial data
  // This ensures we always have data to display
  const stats = currentStats ?? initialStats;
  const status = campaign?.status ?? currentStatus;

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Campaign Stats</h2>
        {status === "SENDING" && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-500"></span>
            </span>
            Sending...
          </div>
        )}
      </div>
      <dl className="space-y-3">
        <div>
          <dt className="text-sm font-medium text-gray-500">
            Total Recipients
          </dt>
          <dd className="mt-1 text-2xl font-bold text-gray-900">
            {stats.total}
          </dd>
        </div>
        {stats.total > 0 && (
          <>
            {stats.queued > 0 && (
              <div className="flex items-center justify-between">
                <dt className="text-sm font-medium text-gray-500">Queued</dt>
                <dd className="text-sm font-semibold text-blue-600">
                  {stats.queued}
                </dd>
              </div>
            )}
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-500">Sent</dt>
              <dd className="text-sm font-semibold text-green-600">
                {stats.sent}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-500">Delivered</dt>
              <dd className="text-sm font-semibold text-green-600">
                {stats.delivered}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-500">Bounced</dt>
              <dd className="text-sm font-semibold text-orange-600">
                {stats.bounced}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-500">Complained</dt>
              <dd className="text-sm font-semibold text-red-600">
                {stats.complained}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-500">Failed</dt>
              <dd className="text-sm font-semibold text-red-600">
                {stats.failed}
              </dd>
            </div>
          </>
        )}
      </dl>
    </div>
  );
}
