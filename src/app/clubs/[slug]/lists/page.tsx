import { redirect } from "next/navigation";

import { ClubPageHeader } from "@/components/layout";
import PageContainer from "@/components/layout/PageContainer";
import { requireAuth } from "@/server/auth-utils";
import { api } from "@/trpc/server";
import EmailListsManager from "@/components/emailLists/EmailListsManager";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EmailListsPage({ params }: PageProps) {
  const { slug } = await params;
  await requireAuth();

  // Get club details with role info
  const clubInfo = await api.clubs.getClubBySlug({ slug });
  const club = await api.clubs.getClubDetails({ clubId: clubInfo.id });

  // Must be CLUB_EDITOR or CLUB_OWNER to manage lists
  const canEdit = club.myRole === "CLUB_OWNER" || club.myRole === "CLUB_EDITOR";

  if (!canEdit) {
    redirect(`/clubs/${slug}`);
  }

  return (
    <PageContainer>
      <ClubPageHeader
        clubName={club.name}
        clubSlug={slug}
        pageName="Email Lists"
        title="Email Lists"
        description={`Manage email lists for ${club.name}`}
      />

      <EmailListsManager clubId={club.id} />
    </PageContainer>
  );
}
