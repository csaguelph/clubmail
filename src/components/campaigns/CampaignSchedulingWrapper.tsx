"use client";

import { useRouter } from "next/navigation";

import CampaignSchedulingUI from "@/components/campaigns/CampaignSchedulingUI";
import { api } from "@/trpc/react";

interface CampaignSchedulingWrapperProps {
  campaignId: string;
  clubId: string;
  currentStatus:
    | "DRAFT"
    | "SCHEDULED"
    | "SENDING"
    | "SENT"
    | "FAILED"
    | "CANCELLED";
  scheduledFor?: Date | null;
}

export default function CampaignSchedulingWrapper({
  campaignId,
  clubId,
  currentStatus,
  scheduledFor,
}: CampaignSchedulingWrapperProps) {
  const router = useRouter();

  const scheduleMutation = api.campaigns.scheduleCampaign.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const cancelMutation = api.campaigns.cancelCampaign.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <CampaignSchedulingUI
      campaignId={campaignId}
      clubId={clubId}
      currentStatus={currentStatus}
      scheduledFor={scheduledFor}
      onSchedule={async (scheduledFor) => {
        await scheduleMutation.mutateAsync({
          clubId,
          campaignId,
          scheduledFor,
        });
      }}
      onCancel={async () => {
        await cancelMutation.mutateAsync({
          clubId,
          campaignId,
        });
      }}
    />
  );
}
