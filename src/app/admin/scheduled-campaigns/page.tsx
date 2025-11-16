"use client";

import { useState } from "react";

import AllScheduledCampaignsCalendar from "@/components/admin/AllScheduledCampaignsCalendar";
import { api } from "@/trpc/react";

export default function AdminScheduledCampaignsPage() {
  // Get current month range (can be extended to support date range selection)
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

  // Get all scheduled campaigns
  const { data: campaigns, isLoading } =
    api.admin.getAllScheduledCampaigns.useQuery({
      startDate: dateRange.start,
      endDate: dateRange.end,
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          All Scheduled Campaigns
        </h1>
        <p className="mt-2 text-gray-600">
          View all campaigns scheduled for delivery across the platform.
        </p>
      </div>

      <AllScheduledCampaignsCalendar
        campaigns={campaigns ?? []}
        isLoading={isLoading}
      />
    </div>
  );
}
