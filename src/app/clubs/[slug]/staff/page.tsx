import { redirect } from "next/navigation";

import PageContainer from "@/components/layout/PageContainer";
import { getCurrentUser } from "@/server/auth-utils";
import { api } from "@/trpc/server";
import ClubStaffManager from "./ClubStaffManager";

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
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <a href={`/clubs/${slug}`} className="hover:text-gray-700">
            {club.name}
          </a>
          <span>/</span>
          <span className="text-gray-900">Staff</span>
        </div>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Club Staff
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage staff members and permissions for {club.name}
        </p>
      </div>

      <ClubStaffManager clubId={club.id} currentUserId={user.id} />
    </PageContainer>
  );
}
