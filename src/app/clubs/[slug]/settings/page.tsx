import { redirect } from "next/navigation";

import { ClubPageHeader } from "@/components/layout";
import PageContainer from "@/components/layout/PageContainer";
import { requireAuth } from "@/server/auth-utils";
import { api } from "@/trpc/server";
import SettingsForm from "./SettingsForm";

export default async function ClubSettingsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireAuth();

  const { slug } = await params;
  const clubInfo = await api.clubs.getClubBySlug({ slug });
  const club = await api.clubs.getClubDetails({ clubId: clubInfo.id });

  // Only owners and editors can edit settings
  const canEdit = club.myRole === "CLUB_OWNER" || club.myRole === "CLUB_EDITOR";

  if (!canEdit) {
    redirect(`/clubs/${slug}`);
  }

  const settings = await api.clubSettings.getSettings({ clubId: club.id });

  return (
    <PageContainer>
      <ClubPageHeader
        clubName={club.name}
        clubSlug={slug}
        pageName="Settings"
        title="Email Settings"
        description={`Configure how emails are sent from ${club.name}`}
      />

      <SettingsForm clubId={club.id} slug={slug} settings={settings} />
    </PageContainer>
  );
}
