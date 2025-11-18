import { redirect } from "next/navigation";

import { ClubPageHeader } from "@/components/layout";
import PageContainer from "@/components/layout/PageContainer";
import { requireAuth } from "@/server/auth-utils";
import { api } from "@/trpc/server";
import CampaignEditForm from "@/components/campaigns/CampaignEditForm";

export default async function CampaignEditPage({
  params,
}: {
  params: Promise<{ slug: string; campaignId: string }>;
}) {
  await requireAuth();

  const { slug, campaignId } = await params;
  const clubInfo = await api.clubs.getClubBySlug({ slug });
  const club = await api.clubs.getClubDetails({ clubId: clubInfo.id });

  const canEdit = club.myRole === "CLUB_OWNER" || club.myRole === "CLUB_EDITOR";

  if (!canEdit) {
    redirect(`/clubs/${slug}/campaigns/${campaignId}`);
  }

  const campaign = await api.campaigns.getCampaign({
    clubId: club.id,
    campaignId,
  });

  // Only allow editing drafts and scheduled campaigns
  if (campaign.status !== "DRAFT" && campaign.status !== "SCHEDULED") {
    redirect(`/clubs/${slug}/campaigns/${campaignId}`);
  }

  const emailLists = await api.emailLists.listLists({
    clubId: club.id,
  });

  const settings = await api.clubSettings.getSettings({
    clubId: club.id,
  });

  return (
    <PageContainer>
      <ClubPageHeader
        clubName={club.name}
        clubSlug={slug}
        breadcrumbs={[
          { label: "Campaigns", href: `/clubs/${slug}/campaigns` },
          {
            label: campaign.name,
            href: `/clubs/${slug}/campaigns/${campaignId}`,
          },
          { label: "Edit" },
        ]}
        title="Edit Campaign"
        description="Update your campaign content and settings"
      />

      <CampaignEditForm
        clubId={club.id}
        clubSlug={slug}
        campaign={campaign}
        emailLists={emailLists}
        clubName={club.name}
        brandColor={settings.brandColor}
        socialLinks={
          (settings.socialLinks as Record<string, string> | null) ?? null
        }
      />
    </PageContainer>
  );
}
