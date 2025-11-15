import { redirect } from "next/navigation";

import PageContainer from "@/components/layout/PageContainer";
import { getSession } from "@/server/better-auth/server";
import { api } from "@/trpc/server";
import EmailListsManager from "./EmailListsManager";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EmailListsPage({ params }: PageProps) {
  const { slug } = await params;
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  // Get club details with role info
  const clubInfo = await api.clubs.getClubBySlug({ slug });
  const club = await api.clubs.getClubDetails({ clubId: clubInfo.id });

  // Must be CLUB_EDITOR or CLUB_OWNER to manage lists
  const canEdit =
    club.myRole === "CLUB_OWNER" || club.myRole === "CLUB_EDITOR";

  if (!canEdit) {
    redirect(`/clubs/${slug}`);
  }

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Email Lists</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage email lists for {club.name}
        </p>
      </div>

      <EmailListsManager clubId={club.id} />
    </PageContainer>
  );
}
