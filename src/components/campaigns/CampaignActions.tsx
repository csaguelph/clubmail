"use client";

import { Mail, Send, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui";
import { DeleteCampaignDialog } from "@/components/campaigns/DeleteCampaignDialog";
import { SendCampaignDialog } from "@/components/campaigns/SendCampaignDialog";
import { TestEmailDialog } from "@/components/campaigns/TestEmailDialog";
import { api } from "@/trpc/react";

interface CampaignActionsProps {
  clubId: string;
  campaignId: string;
  clubSlug: string;
  canDelete: boolean;
}

export function CampaignActions({
  clubId,
  campaignId,
  clubSlug,
  canDelete,
}: CampaignActionsProps) {
  const router = useRouter();
  const [showSendModal, setShowSendModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const sendCampaign = api.campaigns.sendCampaign.useMutation({
    onSuccess: () => {
      setShowSendModal(false);
      router.refresh();
    },
  });

  const scheduleCampaign = api.campaigns.scheduleCampaign.useMutation({
    onSuccess: () => {
      setShowSendModal(false);
      router.refresh();
    },
  });

  const sendTest = api.campaigns.sendTest.useMutation({
    onSuccess: () => {
      setShowTestModal(false);
    },
  });

  const deleteCampaign = api.campaigns.deleteCampaign.useMutation({
    onSuccess: () => {
      router.push(`/clubs/${clubSlug}/campaigns`);
    },
  });

  const handleSend = () => {
    sendCampaign.mutate({ clubId, campaignId });
  };

  const handleSchedule = (scheduledFor: Date) => {
    scheduleCampaign.mutate({
      clubId,
      campaignId,
      scheduledFor,
    });
  };

  const handleTestSend = (email: string) => {
    sendTest.mutate({ clubId, campaignId, testEmail: email });
  };

  const handleDelete = () => {
    deleteCampaign.mutate({ clubId, campaignId });
  };

  return (
    <>
      <div className="flex items-center space-x-3">
        <Button
          onClick={() => setShowTestModal(true)}
          variant="secondary"
          size="md"
          className="inline-flex items-center gap-2"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          Send Test
        </Button>
        <Button
          onClick={() => setShowSendModal(true)}
          variant="primary"
          size="md"
          className="inline-flex items-center gap-2"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Send Campaign
        </Button>
        {canDelete && (
          <Button
            onClick={() => setShowDeleteModal(true)}
            variant="danger"
            size="md"
            className="inline-flex items-center gap-2 border border-red-300"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete
          </Button>
        )}
      </div>

      <SendCampaignDialog
        isOpen={showSendModal}
        onClose={() => setShowSendModal(false)}
        onSend={handleSend}
        onSchedule={handleSchedule}
        isSending={sendCampaign.isPending}
        isScheduling={scheduleCampaign.isPending}
        error={
          sendCampaign.error?.message ?? scheduleCampaign.error?.message ?? null
        }
      />

      <TestEmailDialog
        isOpen={showTestModal}
        onClose={() => setShowTestModal(false)}
        onSend={handleTestSend}
        isSending={sendTest.isPending}
        error={sendTest.error?.message ?? null}
        isSuccess={sendTest.isSuccess}
      />

      <DeleteCampaignDialog
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        isDeleting={deleteCampaign.isPending}
        error={deleteCampaign.error?.message ?? null}
      />
    </>
  );
}
