import PageContainer from "@/components/layout/PageContainer";
import { getSession } from "@/server/better-auth/server";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import SettingsForm from "./SettingsForm";

export default async function ClubSettingsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  const { slug } = await params;
  const clubInfo = await api.clubs.getClubBySlug({ slug });
  const club = await api.clubs.getClubDetails({ clubId: clubInfo.id });

  // Only owners and editors can edit settings
  const canEdit =
    club.myRole === "CLUB_OWNER" || club.myRole === "CLUB_EDITOR";

  if (!canEdit) {
    redirect(`/clubs/${slug}`);
  }

  const settings = await api.clubSettings.getSettings({ clubId: club.id });

  return (
    <PageContainer>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <a href={`/clubs/${slug}`} className="hover:text-gray-700">
            {club.name}
          </a>
          <span>/</span>
          <span className="text-gray-900">Settings</span>
        </div>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Email Settings
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Configure how emails are sent from {club.name}
        </p>
      </div>

      <SettingsForm clubId={club.id} slug={slug} settings={settings} />
    </PageContainer>
  );
}
