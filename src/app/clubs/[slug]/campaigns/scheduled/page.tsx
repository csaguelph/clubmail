"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import ScheduledCampaignsCalendar from "@/components/campaigns/ScheduledCampaignsCalendar";
import PageContainer from "@/components/layout/PageContainer";
import { api } from "@/trpc/react";

export default function ScheduledCampaignsPage() {
  const params = useParams();
  const clubSlug = params.slug as string;

  // Get current month range
  const [dateRange] = useState(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
    );
    return { start: startOfMonth, end: endOfMonth };
  });

  // Get club details
  const { data: club } = api.clubs.getClubBySlug.useQuery({ slug: clubSlug });

  // Get scheduled campaigns
  const { data: campaigns, isLoading } =
    api.campaigns.getScheduledCampaigns.useQuery(
      {
        clubId: club?.id ?? "",
        startDate: dateRange.start,
        endDate: dateRange.end,
      },
      {
        enabled: !!club?.id,
      },
    );

  if (!club) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[#b1d135]" />
      </div>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Scheduled Campaigns
          </h1>
          <p className="mt-2 text-gray-600">
            View and manage campaigns scheduled for future delivery.
          </p>
        </div>

        <ScheduledCampaignsCalendar
          campaigns={campaigns ?? []}
          clubSlug={clubSlug}
          isLoading={isLoading}
        />
      </div>
    </PageContainer>
  );
}
