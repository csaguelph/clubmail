import { redirect } from "next/navigation";

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
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <a href={`/clubs/${slug}`} className="hover:text-gray-700">
            {club.name}
          </a>
          <span>/</span>
          <span className="text-gray-900">Subscribers</span>
        </div>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Manage Subscribers
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Add, import, and manage email subscribers for {club.name}
        </p>
      </div>

      <SubscribersList clubId={club.id} slug={slug} emailLists={emailLists} />
    </PageContainer>
  );
}
