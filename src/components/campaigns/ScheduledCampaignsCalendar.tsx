"use client";

import { Calendar, Clock, Mail, Users } from "lucide-react";
import Link from "next/link";

interface ScheduledCampaign {
  id: string;
  name: string;
  subject: string;
  scheduledFor: Date | null;
  emailList: {
    id: string;
    name: string;
  };
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  _count: {
    emails: number;
  };
}

interface ScheduledCampaignsCalendarProps {
  campaigns: ScheduledCampaign[];
  clubSlug: string;
  isLoading?: boolean;
}

export default function ScheduledCampaignsCalendar({
  campaigns,
  clubSlug,
  isLoading,
}: ScheduledCampaignsCalendarProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[#b1d135]" />
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
        <Calendar className="mx-auto mb-4 h-12 w-12 text-gray-400" />
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          No scheduled campaigns
        </h3>
        <p className="text-gray-600">
          You don't have any campaigns scheduled for delivery.
        </p>
      </div>
    );
  }

  // Group campaigns by date
  const campaignsByDate = campaigns.reduce(
    (acc, campaign) => {
      if (!campaign.scheduledFor) return acc;

      const dateKey = new Date(campaign.scheduledFor).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      );

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey]!.push(campaign);
      return acc;
    },
    {} as Record<string, ScheduledCampaign[]>,
  );

  // Sort dates
  const sortedDates = Object.keys(campaignsByDate).sort((a, b) => {
    const dateA = new Date(campaignsByDate[a]![0]!.scheduledFor!);
    const dateB = new Date(campaignsByDate[b]![0]!.scheduledFor!);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="space-y-6">
      {sortedDates.map((dateKey) => {
        const dateCampaigns = campaignsByDate[dateKey]!;
        const isToday =
          dateKey ===
          new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        const isPast = new Date(dateCampaigns[0]!.scheduledFor!) < new Date();

        return (
          <div
            key={dateKey}
            className="rounded-lg border border-gray-200 bg-white p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Calendar className="h-5 w-5 text-[#b1d135]" />
                {dateKey}
                {isToday && (
                  <span className="ml-2 rounded-full bg-[#b1d135] px-2 py-0.5 text-xs font-medium text-white">
                    Today
                  </span>
                )}
                {isPast && (
                  <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                    Past
                  </span>
                )}
              </h3>
              <span className="text-sm text-gray-500">
                {dateCampaigns.length}{" "}
                {dateCampaigns.length === 1 ? "campaign" : "campaigns"}
              </span>
            </div>

            <div className="space-y-3">
              {dateCampaigns
                .sort((a, b) => {
                  const timeA = new Date(a.scheduledFor!).getTime();
                  const timeB = new Date(b.scheduledFor!).getTime();
                  return timeA - timeB;
                })
                .map((campaign) => (
                  <Link
                    key={campaign.id}
                    href={`/clubs/${clubSlug}/campaigns/${campaign.id}`}
                    className="block rounded-md border border-gray-200 bg-gray-50 p-4 transition hover:border-[#b1d135] hover:bg-gray-100"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {new Date(
                              campaign.scheduledFor!,
                            ).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <h4 className="mb-1 font-semibold text-gray-900">
                          {campaign.name}
                        </h4>
                        <p className="mb-2 text-sm text-gray-600">
                          Subject: {campaign.subject}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {campaign.emailList.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {campaign._count.emails || 0} recipients
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
