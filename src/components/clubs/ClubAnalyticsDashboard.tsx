"use client";

import { api } from "@/trpc/react";
import { Mail, MailOpen, MousePointerClick, Send } from "lucide-react";
import Link from "next/link";

interface ClubAnalyticsDashboardProps {
  clubId: string;
  clubSlug: string;
  initialAnalytics: {
    totalEmailsSent: number;
    emailsLast30Days: number;
    emailsLast7Days: number;
    avgOpenRate: number;
    avgClickRate: number;
    recentCampaigns: Array<{
      id: string;
      name: string;
      status: string;
      startedAt: Date | null;
      recipients: number;
      openRate: number;
      clickRate: number;
    }>;
    totalCampaigns: number;
    sentCampaigns: number;
  };
}

export function ClubAnalyticsDashboard({
  clubId,
  clubSlug,
  initialAnalytics,
}: ClubAnalyticsDashboardProps) {
  const { data: analytics } = api.clubs.getClubAnalytics.useQuery(
    { clubId },
    {
      placeholderData: initialAnalytics,
      refetchInterval: 30000, // Refetch every 30 seconds
    },
  );

  const stats = analytics ?? initialAnalytics;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Emails Sent
              </p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {stats.totalEmailsSent.toLocaleString()}
              </p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">Last 30 days:</span>
            <span className="ml-2 font-semibold text-gray-900">
              {stats.emailsLast30Days.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Sent Campaigns
              </p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {stats.sentCampaigns}
              </p>
            </div>
            <div className="rounded-full bg-emerald-100 p-3">
              <Send className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">Total campaigns:</span>
            <span className="ml-2 font-semibold text-gray-900">
              {stats.totalCampaigns}
            </span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Avg. Open Rate
              </p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {stats.avgOpenRate.toFixed(1)}%
              </p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <MailOpen className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">Across campaigns:</span>
            <span className="ml-2 font-semibold text-gray-900">
              {stats.sentCampaigns}
            </span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Avg. Click Rate
              </p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {stats.avgClickRate.toFixed(1)}%
              </p>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <MousePointerClick className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">Across campaigns:</span>
            <span className="ml-2 font-semibold text-gray-900">
              {stats.sentCampaigns}
            </span>
          </div>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Campaigns
          </h2>
          <Link
            href={`/clubs/${clubSlug}/campaigns`}
            className="text-sm font-medium text-[#b1d135] hover:text-[#9fbc2f]"
          >
            View all →
          </Link>
        </div>
        {stats.recentCampaigns.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500">
            No sent campaigns yet. Send your first campaign to see performance
            metrics here.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Campaign
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Sent
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Recipients
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Open Rate
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Click Rate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {stats.recentCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Link
                        href={`/clubs/${clubSlug}/campaigns/${campaign.id}`}
                        className="text-sm font-medium text-gray-900 hover:text-[#b1d135]"
                      >
                        {campaign.name}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-500">
                      {campaign.startedAt
                        ? new Date(campaign.startedAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-500">
                      {campaign.recipients.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-500">
                      {campaign.openRate.toFixed(1)}%
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-500">
                      {campaign.clickRate.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
