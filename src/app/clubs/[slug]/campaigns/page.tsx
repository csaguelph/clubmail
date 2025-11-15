import Link from "next/link";

import PageContainer from "@/components/layout/PageContainer";
import { requireAuth } from "@/server/auth-utils";
import { api } from "@/trpc/server";

export default async function CampaignsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireAuth();

  const { slug } = await params;
  const clubInfo = await api.clubs.getClubBySlug({ slug });
  const club = await api.clubs.getClubDetails({ clubId: clubInfo.id });
  
  const canEdit =
    club.myRole === "CLUB_OWNER" || club.myRole === "CLUB_EDITOR";

  const { campaigns } = await api.campaigns.listCampaigns({
    clubId: club.id,
    limit: 50,
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      DRAFT: "bg-gray-100 text-gray-800",
      SCHEDULED: "bg-blue-100 text-blue-800",
      SENDING: "bg-yellow-100 text-yellow-800",
      SENT: "bg-green-100 text-green-800",
      FAILED: "bg-red-100 text-red-800",
      CANCELLED: "bg-gray-100 text-gray-800",
    };
    return styles[status as keyof typeof styles] || styles.DRAFT;
  };

  return (
    <PageContainer>
      <div className="mb-8">
        <div className="mb-4">
          <Link
            href={`/clubs/${slug}`}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to {club.name}
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
            <p className="mt-2 text-sm text-gray-600">
              Create and manage email campaigns for {club.name}
            </p>
          </div>
          {canEdit && (
            <Link
              href={`/clubs/${slug}/campaigns/new`}
              className="rounded-md bg-[#b1d135] px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-[#9fbc2f]"
            >
              New Campaign
            </Link>
          )}
        </div>
      </div>
      {campaigns.length === 0 ? (
        <div className="rounded-lg bg-white px-6 py-12 text-center shadow">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No campaigns yet
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Get started by creating your first email campaign.
          </p>
          {canEdit && (
            <Link
              href={`/clubs/${slug}/campaigns/new`}
              className="mt-6 inline-block rounded-md bg-[#b1d135] px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-[#9fbc2f]"
            >
              Create Campaign
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <Link
              key={campaign.id}
              href={`/clubs/${slug}/campaigns/${campaign.id}`}
              className="block rounded-lg bg-white p-6 shadow hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {campaign.name}
                    </h3>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(campaign.status)}`}
                    >
                      {campaign.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-900">
                    {campaign.subject || "No subject"}
                  </p>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <span>To: {campaign.emailList.name}</span>
                    <span>•</span>
                    <span>
                      Created {new Date(campaign.createdAt).toLocaleDateString()}
                    </span>
                    {campaign.startedAt && (
                      <>
                        <span>•</span>
                        <span>
                          Sent {new Date(campaign.startedAt).toLocaleDateString()}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="ml-4 flex items-center space-x-4">
                  {campaign._count.emailEvents > 0 && (
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {campaign._count.emailEvents}
                      </p>
                      <p className="text-xs text-gray-500">recipients</p>
                    </div>
                  )}
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-8 grid gap-6 md:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Campaigns</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {campaigns.length}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Drafts</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {campaigns.filter((c) => c.status === "DRAFT").length}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Sent</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {campaigns.filter((c) => c.status === "SENT").length}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Emails</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {campaigns.reduce((sum, c) => sum + c._count.emailEvents, 0)}
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
