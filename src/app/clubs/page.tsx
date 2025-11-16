import MyClubsList from "@/components/clubs/MyClubsList";
import PageContainer from "@/components/layout/PageContainer";
import { requireAuth } from "@/server/auth-utils";

export default async function ClubsPage() {
  await requireAuth();

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Clubs</h1>
        <p className="mt-2 text-sm text-gray-600">
          View and manage your clubs, email lists, and campaigns
        </p>
      </div>
      <MyClubsList />
    </PageContainer>
  );
}
