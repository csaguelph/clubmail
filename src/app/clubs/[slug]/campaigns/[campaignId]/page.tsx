import { Pencil } from "lucide-react";
import Link from "next/link";

import PageContainer from "@/components/layout/PageContainer";
import { requireAuth } from "@/server/auth-utils";
import { api } from "@/trpc/server";
import CampaignActions from "./CampaignActions";
import PreviewButton from "./PreviewButton";

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ slug: string; campaignId: string }>;
}) {
  await requireAuth();

  const { slug, campaignId } = await params;
  const clubInfo = await api.clubs.getClubBySlug({ slug });
  const club = await api.clubs.getClubDetails({ clubId: clubInfo.id });

  const canEdit =
    club.myRole === "CLUB_OWNER" || club.myRole === "CLUB_EDITOR";

  const campaign = await api.campaigns.getCampaign({
    clubId: club.id,
    campaignId,
  });

  const stats = await api.campaigns.getCampaignStats({
    clubId: club.id,
    campaignId,
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

  const canEditCampaign = canEdit && (campaign.status === "DRAFT" || campaign.status === "SCHEDULED");
  const canSendCampaign = canEdit && campaign.status === "DRAFT";
  const canDeleteCampaign = canEdit && campaign.status === "DRAFT";

  return (
    <PageContainer>
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4">
          <Link
            href={`/clubs/${slug}/campaigns`}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to Campaigns
          </Link>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold text-gray-900">
                {campaign.name}
              </h1>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusBadge(campaign.status)}`}
              >
                {campaign.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Campaign details and performance
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {canEditCampaign && (
              <Link
                href={`/clubs/${slug}/campaigns/${campaignId}/edit`}
                className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Link>
            )}
            {canSendCampaign && (
              <CampaignActions
                clubId={club.id}
                campaignId={campaign.id}
                clubSlug={slug}
                canDelete={canDeleteCampaign}
              />
            )}
          </div>
        </div>
      </div>

      {/* Campaign Content Preview */}
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Campaign Details
          </h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-sm font-medium text-gray-500">Subject</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {campaign.subject || "No subject"}
              </dd>
            </div>
            {campaign.preheaderText && (
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Preheader Text
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {campaign.preheaderText}
                </dd>
              </div>
            )}
            <div>
              <dt className="text-sm font-medium text-gray-500">Email List</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {campaign.emailList.name}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">From</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {campaign.fromName} &lt;{campaign.fromEmail}&gt;
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Created By</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {campaign.createdBy.name || campaign.createdBy.email}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Created</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(campaign.createdAt).toLocaleString()}
              </dd>
            </div>
            {campaign.startedAt && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Sent</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(campaign.startedAt).toLocaleString()}
                </dd>
              </div>
            )}
            {campaign.finishedAt && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Completed</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(campaign.finishedAt).toLocaleString()}
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Campaign Stats
          </h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-sm font-medium text-gray-500">Total Recipients</dt>
              <dd className="mt-1 text-2xl font-bold text-gray-900">
                {stats.total}
              </dd>
            </div>
            {stats.total > 0 && (
              <>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-500">Sent</dt>
                  <dd className="text-sm font-semibold text-green-600">
                    {stats.sent}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-500">Delivered</dt>
                  <dd className="text-sm font-semibold text-green-600">
                    {stats.delivered}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-500">Bounced</dt>
                  <dd className="text-sm font-semibold text-orange-600">
                    {stats.bounced}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-500">Complained</dt>
                  <dd className="text-sm font-semibold text-red-600">
                    {stats.complained}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-500">Failed</dt>
                  <dd className="text-sm font-semibold text-red-600">
                    {stats.failed}
                  </dd>
                </div>
              </>
            )}
          </dl>
        </div>
      </div>

      {/* HTML Preview */}
      {campaign.html && (
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Email Preview
            </h2>
            <PreviewButton html={campaign.html} />
          </div>
          <div className="rounded border border-gray-200 overflow-hidden">
            <iframe
              srcDoc={campaign.html}
              className="h-[600px] w-full"
              title="Email Preview"
              sandbox="allow-same-origin"
            />
          </div>
        </div>
      )}
    </PageContainer>
  );
}
