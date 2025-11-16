import { redirect } from "next/navigation";

import { ClubPageHeader } from "@/components/layout";
import PageContainer from "@/components/layout/PageContainer";
import { requireAuth } from "@/server/auth-utils";
import { api } from "@/trpc/server";
import SubscribersList from "./SubscribersList";

export default async function SubscribersPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireAuth();

  const { slug } = await params;
  const clubInfo = await api.clubs.getClubBySlug({ slug });
  const club = await api.clubs.getClubDetails({ clubId: clubInfo.id });

  // Only editors and owners can manage subscribers
  const canEdit = club.myRole === "CLUB_OWNER" || club.myRole === "CLUB_EDITOR";

  if (!canEdit) {
    redirect(`/clubs/${slug}`);
  }

  // Get email lists for this club
  const emailLists = await api.emailLists.listLists({ clubId: club.id });

  return (
    <PageContainer>
      <ClubPageHeader
        clubName={club.name}
        clubSlug={slug}
        pageName="Subscribers"
        title="Manage Subscribers"
        description={`Add, import, and manage email subscribers for ${club.name}`}
      />

      <SubscribersList clubId={club.id} slug={slug} emailLists={emailLists} />
    </PageContainer>
  );
}
