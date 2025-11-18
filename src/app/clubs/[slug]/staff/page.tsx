import { redirect } from "next/navigation";

import { ClubPageHeader } from "@/components/layout";
import PageContainer from "@/components/layout/PageContainer";
import { getCurrentUser } from "@/server/auth-utils";
import { api } from "@/trpc/server";
import ClubStaffManager from "@/components/clubs/ClubStaffManager";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ClubStaffPage({ params }: PageProps) {
  const { slug } = await params;
  const user = await getCurrentUser();

  // Get club details with role info
  const clubInfo = await api.clubs.getClubBySlug({ slug });
  const club = await api.clubs.getClubDetails({ clubId: clubInfo.id });

  // Only CLUB_OWNER or ADMIN can manage staff
  const canManageStaff = user.role === "ADMIN" || club.myRole === "CLUB_OWNER";

  if (!canManageStaff) {
    redirect(`/clubs/${slug}`);
  }

  return (
    <PageContainer>
      <ClubPageHeader
        clubName={club.name}
        clubSlug={slug}
        pageName="Staff"
        title="Club Staff"
        description={`Manage staff members and permissions for ${club.name}`}
      />

      <ClubStaffManager clubId={club.id} currentUserId={user.id} />
    </PageContainer>
  );
}
