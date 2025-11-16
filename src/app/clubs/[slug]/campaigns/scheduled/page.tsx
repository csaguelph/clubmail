"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import ScheduledCampaignsCalendar from "@/components/campaigns/ScheduledCampaignsCalendar";
import { ClubPageHeader } from "@/components/layout";
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
      <ClubPageHeader
        clubName={club.name}
        clubSlug={clubSlug}
        breadcrumbs={[
          { label: "Campaigns", href: `/clubs/${clubSlug}/campaigns` },
          { label: "Scheduled" },
        ]}
        title="Scheduled Campaigns"
        description="View and manage campaigns scheduled for future delivery."
      />

      <ScheduledCampaignsCalendar
        campaigns={campaigns ?? []}
        clubSlug={clubSlug}
        isLoading={isLoading}
      />
    </PageContainer>
  );
}
