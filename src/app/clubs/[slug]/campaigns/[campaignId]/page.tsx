import { Pencil } from "lucide-react";
import Link from "next/link";

import CancelScheduledCampaign from "@/components/campaigns/CancelScheduledCampaign";
import { ClubPageHeader } from "@/components/layout";
import PageContainer from "@/components/layout/PageContainer";
import { env } from "@/env";
import { generateEmailHTML, parseDesignJSON } from "@/lib/email-editor/utils";
import { requireAuth } from "@/server/auth-utils";
import { api } from "@/trpc/server";
import { CampaignActions } from "@/components/campaigns/CampaignActions";
import { PreviewButton } from "@/components/campaigns/PreviewButton";

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ slug: string; campaignId: string }>;
}) {
  await requireAuth();

  const { slug, campaignId } = await params;
  const clubInfo = await api.clubs.getClubBySlug({ slug });
  const club = await api.clubs.getClubDetails({ clubId: clubInfo.id });

  const canEdit = club.myRole === "CLUB_OWNER" || club.myRole === "CLUB_EDITOR";

  const campaign = await api.campaigns.getCampaign({
    clubId: club.id,
    campaignId,
  });

  // Get club settings for brand color
  const settings = await api.clubSettings.getSettings({ clubId: club.id });

  // Regenerate HTML with current brand color for preview
  // This ensures the preview uses the latest rendering logic (like auto text color)
  // Include test unsubscribe URL so the preview shows the unsubscribe link
  const blocks = parseDesignJSON(campaign.designJson);
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;
  const testUnsubscribeUrl = `${baseUrl}/unsubscribe?token=test`;
  const previewHtml = await generateEmailHTML(
    blocks,
    club.name,
    settings.brandColor,
    testUnsubscribeUrl,
    (settings.socialLinks as Record<string, string> | null) ?? null,
  );

  const stats = await api.campaigns.getCampaignStats({
    clubId: club.id,
    campaignId,
  });

  // Get engagement stats if campaign has been sent
  let engagement = null;
  if (campaign.status === "SENT") {
    try {
      engagement = await api.campaigns.getCampaignEngagement({
        clubId: club.id,
        campaignId,
      });
    } catch (error) {
      console.error("Failed to load engagement stats:", error);
    }
  }

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

  const canEditCampaign =
    canEdit && (campaign.status === "DRAFT" || campaign.status === "SCHEDULED");
  const canSendCampaign = canEdit && campaign.status === "DRAFT";
  const canDeleteCampaign = canEdit && campaign.status === "DRAFT";

  return (
    <PageContainer>
      <ClubPageHeader
        clubName={club.name}
        clubSlug={slug}
        breadcrumbs={[
          { label: "Campaigns", href: `/clubs/${slug}/campaigns` },
          { label: campaign.name },
        ]}
        title={
          <div className="flex items-center space-x-3">
            <span>{campaign.name}</span>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusBadge(campaign.status)}`}
            >
              {campaign.status}
            </span>
          </div>
        }
        description="Campaign details and performance"
        action={
          <div className="flex items-center space-x-3">
            {canEditCampaign && (
              <Link
                href={`/clubs/${slug}/campaigns/${campaignId}/edit`}
                className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
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
        }
      />

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
                {campaign.subject ?? "No subject"}
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
            {campaign.scheduledFor && (
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Scheduled For
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(campaign.scheduledFor).toLocaleString()}
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
              <dt className="text-sm font-medium text-gray-500">
                Total Recipients
              </dt>
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
                  <dt className="text-sm font-medium text-gray-500">
                    Delivered
                  </dt>
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
                  <dt className="text-sm font-medium text-gray-500">
                    Complained
                  </dt>
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

      {/* Campaign Scheduling - Show cancel button for scheduled campaigns */}
      {canEdit && campaign.status === "SCHEDULED" && campaign.scheduledFor && (
        <CancelScheduledCampaign
          campaignId={campaign.id}
          clubId={club.id}
          scheduledFor={campaign.scheduledFor}
        />
      )}

      {/* Engagement Stats (if campaign is sent) */}
      {engagement && (
        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Engagement Statistics
          </h2>
          <div className="grid gap-6 md:grid-cols-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Opens</dt>
              <dd className="mt-1 text-2xl font-bold text-gray-900">
                {engagement.uniqueOpens}
              </dd>
              <dd className="mt-1 text-xs text-gray-500">
                {engagement.openRate.toFixed(1)}% open rate
              </dd>
              {engagement.totalOpens > engagement.uniqueOpens && (
                <dd className="mt-1 text-xs text-gray-500">
                  ({engagement.totalOpens} total opens)
                </dd>
              )}
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Clicks</dt>
              <dd className="mt-1 text-2xl font-bold text-gray-900">
                {engagement.uniqueClicks}
              </dd>
              <dd className="mt-1 text-xs text-gray-500">
                {engagement.clickRate.toFixed(1)}% click rate
              </dd>
              {engagement.totalClicks > engagement.uniqueClicks && (
                <dd className="mt-1 text-xs text-gray-500">
                  ({engagement.totalClicks} total clicks)
                </dd>
              )}
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Click-to-Open Rate
              </dt>
              <dd className="mt-1 text-2xl font-bold text-gray-900">
                {engagement.uniqueOpens > 0
                  ? (
                      (engagement.uniqueClicks / engagement.uniqueOpens) *
                      100
                    ).toFixed(1)
                  : "0"}
                %
              </dd>
              <dd className="mt-1 text-xs text-gray-500">
                of those who opened
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Total Sent</dt>
              <dd className="mt-1 text-2xl font-bold text-gray-900">
                {engagement.totalSent}
              </dd>
              <dd className="mt-1 text-xs text-gray-500">
                successfully delivered
              </dd>
            </div>
          </div>

          {/* Top Clicked URLs */}
          {engagement.topUrls.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">
                Top Clicked Links
              </h3>
              <div className="space-y-2">
                {engagement.topUrls.slice(0, 5).map((urlData, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md bg-gray-50 p-3"
                  >
                    <a
                      href={urlData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate text-sm text-blue-600 hover:underline"
                      style={{ maxWidth: "70%" }}
                    >
                      {urlData.url}
                    </a>
                    <span className="text-sm font-semibold text-gray-900">
                      {urlData.clicks}{" "}
                      {urlData.clicks === 1 ? "click" : "clicks"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* HTML Preview */}
      {campaign.html && (
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Email Preview
            </h2>
            <PreviewButton html={previewHtml} />
          </div>
          <div className="overflow-hidden rounded border border-gray-200">
            <iframe
              srcDoc={previewHtml}
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
