import Link from "next/link";

import { CampaignsList } from "@/components/campaigns/CampaignsList";
import { ClubPageHeader } from "@/components/layout";
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

  const canEdit = club.myRole === "CLUB_OWNER" || club.myRole === "CLUB_EDITOR";

  const { campaigns } = await api.campaigns.listCampaigns({
    clubId: club.id,
    limit: 50,
  });

  return (
    <PageContainer>
      <ClubPageHeader
        clubName={club.name}
        clubSlug={slug}
        pageName="Campaigns"
        title="Campaigns"
        description={`Create and manage email campaigns for ${club.name}`}
        action={
          canEdit ? (
            <Link
              href={`/clubs/${slug}/campaigns/new`}
              className="rounded-md bg-[#b1d135] px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-[#9fbc2f]"
            >
              New Campaign
            </Link>
          ) : undefined
        }
      />
      {/* Quick Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-5">
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
        <Link
          href={`/clubs/${slug}/campaigns/scheduled`}
          className="rounded-lg bg-white p-6 shadow transition hover:shadow-md"
        >
          <h3 className="text-sm font-medium text-gray-500">Scheduled</h3>
          <p className="mt-2 text-3xl font-semibold text-blue-600">
            {campaigns.filter((c) => c.status === "SCHEDULED").length}
          </p>
        </Link>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Sent</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {campaigns.filter((c) => c.status === "SENT").length}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Emails</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {campaigns.reduce((sum, c) => sum + c._count.emails, 0)}
          </p>
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
        <CampaignsList
          slug={slug}
          clubId={club.id}
          initialCampaigns={campaigns}
        />
      )}
    </PageContainer>
  );
}
