import Link from "next/link";
import { redirect } from "next/navigation";

import PageContainer from "@/components/layout/PageContainer";
import { requireAuth } from "@/server/auth-utils";
import { api } from "@/trpc/server";
import CampaignEditForm from "./CampaignEditForm";

export default async function CampaignEditPage({
  params,
}: {
  params: Promise<{ slug: string; campaignId: string }>;
}) {
  await requireAuth();

  const { slug, campaignId } = await params;
  const clubInfo = await api.clubs.getClubBySlug({ slug });
  const club = await api.clubs.getClubDetails({ clubId: clubInfo.id });

  const canEdit =
    club.myRole === "CLUB_OWNER" || club.myRole === "CLUB_EDITOR";

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
      <div className="mb-8">
        <div className="mb-4">
          <Link
            href={`/clubs/${slug}/campaigns/${campaignId}`}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to Campaign
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Edit Campaign</h1>
        <p className="mt-2 text-sm text-gray-600">
          Update your campaign content and settings
        </p>
      </div>

      <CampaignEditForm
        clubId={club.id}
        clubSlug={slug}
        campaign={campaign}
        emailLists={emailLists}
        clubName={club.name}
        brandColor={settings.brandColor}
      />
    </PageContainer>
  );
}
